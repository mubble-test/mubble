"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Fri Apr 21 2017
   Author     : Raghvendra Varma
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmnRouterServer = exports.InvokeStruct = void 0;
const core_1 = require("@mubble/core");
const connection_map_1 = require("./connection-map");
const cache_1 = require("../cache");
const xmn_registry_1 = require("./xmn-registry");
const https_third_server_1 = require("./https-third-server");
const EVENT_QUEUE = 'event-queue:';
class InvokeStruct {
    constructor(name, parent, xmnInfo) {
        this.name = name;
        this.parent = parent;
        this.xmnInfo = xmnInfo;
    }
    async executeFn(...params) {
        let fn = this.parent[this.name];
        if (fn)
            return await fn.call(this.parent, ...params);
        const obj = new this.parent();
        return await obj[this.name].call(obj, ...params);
    }
}
exports.InvokeStruct = InvokeStruct;
class XmnRouterServer {
    constructor(rc, reqRedis, serverId, ...apiProviders) {
        this.apiMap = {};
        this.eventMap = {};
        this.piggyfrontMap = new WeakMap();
        xmn_registry_1.XmnRegistry.commitRegister(rc, this, apiProviders);
        this.reqRedis = reqRedis;
        //ConnectionMap.init(serverId, reqRedis)
    }
    async verifyConnection(rc, ci, apiName) {
        //const rc : RunContextNcServer = refRc.copyConstruct('', refRc.contextName)
        const reqStruct = apiName ? this.apiMap[apiName] : null;
        await this.connectionOpened(rc, ci, reqStruct ? reqStruct.xmnInfo : null);
    }
    async sendEvent(rc, ci, eventName, data) {
        if (!ci.provider) {
            rc.isDebug() && rc.debug(rc.getName(this), 'Could not send event as connection closed', eventName);
            return;
        }
        const we = new core_1.WireEphEvent(eventName, data);
        await ci.provider.send(rc, [we]);
        rc.isDebug() && rc.debug(rc.getName(this), 'sendEvent', eventName);
    }
    piggyfrontEvent(rc, ci, eventName, data, invData) {
        const we = new core_1.WireEphEvent(eventName, data);
        this.insertIntoPiggyfrontMap(rc, we, invData);
    }
    insertIntoPiggyfrontMap(rc, we, invData) {
        const ar = this.piggyfrontMap.get(invData) || [];
        if (!ar.length)
            this.piggyfrontMap.set(invData, ar);
        ar.push(we);
        rc.isDebug() && rc.debug(rc.getName(this), 'queued event', invData.name, we.name);
    }
    getIp(req) {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '', i = ip.indexOf(','); // "127.0.0.1, 119.81.86.214"
        return i === -1 ? ip : ip.substr(i + 1).trim();
    }
    providerMessage(refRc, ci, arData) {
        for (const wo of arData) {
            if ([core_1.WIRE_TYPE.REQUEST, core_1.WIRE_TYPE.EVENT, core_1.WIRE_TYPE.EPH_EVENT].indexOf(wo.type) !== -1) {
                const rc = refRc.copyConstruct('', refRc.contextName);
                rc.isDebug() && rc.debug(rc.getName(this), 'providerMessage', wo);
                const wPrResp = wo.type === core_1.WIRE_TYPE.REQUEST ? this.routeRequest(rc, ci, wo)
                    : (wo.type === core_1.WIRE_TYPE.EVENT ? this.routeEvent(rc, ci, wo)
                        : this.routeEphemeralEvent(rc, ci, wo));
                wPrResp.then((resp) => {
                    rc.finish(ci, typeof resp === 'boolean' ? null : resp, wo);
                });
            }
        }
    }
    async providerFailed(rc, ci) {
        if (ci && ci.customData && ci.customData.clientId)
            await connection_map_1.ConnectionMap.removeActiveConnection(rc, ci.customData.clientId.toString());
        rc.isDebug() && rc.debug(rc.getName(this), 'providerFailed', ci);
        await this.connectionClosed(rc, ci);
        rc.finish(ci, null, null);
    }
    async providerClosed(rc, ci) {
        if (ci && ci.customData && ci.customData.clientId)
            await connection_map_1.ConnectionMap.removeActiveConnection(rc, ci.customData.clientId.toString());
        rc.isDebug() && rc.debug(rc.getName(this), 'providerClosed', ci);
        await this.connectionClosed(rc, ci);
        if (ci.protocol === core_1.Protocol.WEBSOCKET) {
            rc.finish(ci, null, null);
        }
        if (ci.provider)
            delete ci.provider;
    }
    async routeRequest(rc, ci, wo) {
        let wResp = null;
        const ir = {
            name: wo.name,
            ts: wo.ts + ci.msOffset,
            params: wo.data
        };
        try {
            const reqStruct = this.apiMap[wo.name];
            rc.isDebug() && rc.debug(rc.getName(this), 'Routing Request', wo, reqStruct);
            if (!reqStruct) {
                throw (Error(rc.error(rc.getName(this), 'Unknown api called', wo.name)));
            }
            const resp = await this.invokeXmnFunction(rc, ci, ir, reqStruct, false);
            wResp = new core_1.WireReqResp(ir.name, wo.ts, resp);
            await this.sendToProvider(rc, ci, wResp, ir);
        }
        catch (err) {
            rc.isError() && rc.error(rc.getName(this), err);
            const data = {
                errorCode: err.code || err.name,
                errorMessage: err.message,
                errorObject: err.obj
            };
            wResp = new core_1.WireReqResp(wo.name, wo.ts, data, err.code || err.name, err.message, err.obj, err);
            await this.sendToProvider(rc, ci, wResp, ir);
        }
        finally {
            return wResp;
        }
    }
    async routeEvent(rc, ci, wo) {
        let wResp = null;
        const ie = {
            name: wo.name,
            ts: wo.ts + ci.msOffset,
            params: wo.data
        };
        try {
            if (wo.ts > ci.lastEventTs) {
                const eventStruct = this.eventMap[wo.name];
                if (!eventStruct)
                    throw (Error(rc.error(rc.getName(this), 'Unknown event called', wo.name)));
                await this.invokeXmnFunction(rc, ci, ie, eventStruct, true);
            }
            wResp = new core_1.WireEventResp(wo.name, wo.ts);
            await this.sendEventResponse(rc, ci, wResp, ie);
        }
        catch (err) {
            rc.isError() && rc.error(rc.getName(this), err);
            const data = {
                errorCode: err.code || err.name,
                errorMessage: err.message,
                errorObject: err.obj
            };
            wResp = new core_1.WireEventResp(wo.name, wo.ts, data, err.code || err.name, err.message, err.obj, err);
            await this.sendEventResponse(rc, ci, wResp, ie);
        }
        return wResp;
    }
    async routeEphemeralEvent(rc, ci, wo) {
        try {
            const eventStruct = this.eventMap[wo.name];
            if (!eventStruct)
                throw (Error(rc.error(rc.getName(this), 'Unknown event called', wo.name)));
            const ie = {
                name: wo.name,
                ts: wo.ts + ci.msOffset,
                params: wo.data
            };
            await this.invokeXmnFunction(rc, ci, ie, eventStruct, true);
        }
        catch (err) {
            rc.isError() && rc.error(rc.getName(this), err);
        }
        return true;
    }
    closeConnection(rc, ci) {
        rc.isDebug() && rc.debug(rc.getName(this), 'closeConnection');
        if (ci.provider) {
            ci.provider.requestClose(rc);
        }
        else {
            rc.isDebug() && rc.debug(rc.getName(this), 'Cannot close the connection as provider is closed.');
        }
    }
    async invokeXmnFunction(rc, ci, invData, invStruct, isEvent) {
        return await invStruct.executeFn(rc, ci, invData, invStruct, isEvent);
    }
    async sendEventResponse(rc, ci, resp, invData) {
        if (ci.lastEventTs < resp.ts)
            ci.lastEventTs = resp.ts; // this is same as req.ts
        await this.sendToProvider(rc, ci, resp, invData);
    }
    async sendToProvider(rc, ci, response, invData) {
        if (ci.provider) {
            const ar = invData && this.piggyfrontMap.get(invData) || [];
            if (invData && ar.length)
                this.piggyfrontMap.delete(invData);
            ar.push(response);
            invData && rc.isDebug() && rc.debug(rc.getName(this), 'sendToProvider', invData.name, ar);
            const err = response.errorCode;
            // Do not send piggy front events if error api execution fails
            await ci.provider.send(rc, err ? [response] : ar);
        }
        else {
            rc.isStatus() && rc.status(rc.getName(this), 'Not sending response as provider is closed');
        }
    }
    // Preferred way is to use @xmnApi
    registerApi(rc, name, parent, xmnInfo) {
        const apiName = xmnInfo.name;
        if (this.apiMap[apiName]) {
            throw (Error(rc.error(rc.getName(this), 'Duplicate api:' + apiName)));
        }
        if (parent[name] || (parent.prototype && parent.prototype[name])) {
            if (rc.isDebug())
                this.logRegistration(rc, apiName, name, parent, true);
            this.apiMap[apiName] = new InvokeStruct(name, parent, xmnInfo);
        }
        else {
            throw (Error(rc.error(rc.getName(this), 'api', name, 'does not exit in', rc.getName(parent))));
        }
    }
    // Preferred way is to use @xmnEvent
    registerEvent(rc, name, parent, xmnInfo) {
        const apiName = xmnInfo.name;
        if (this.eventMap[apiName]) {
            throw (Error(rc.error(rc.getName(this), 'Duplicate event:' + apiName)));
        }
        if (parent[name] || (parent.prototype && parent.prototype[name])) {
            if (rc.isDebug())
                this.logRegistration(rc, apiName, name, parent, false);
            this.eventMap[apiName] = new InvokeStruct(name, parent, xmnInfo);
        }
        else {
            throw (Error(rc.error(rc.getName(this), 'event', name, 'does not exit in', rc.getName(parent))));
        }
    }
    addToProviderCollection(rc, clientId, provider) {
        // this.providerCollection.addActiveProvider(clientId, provider)
    }
    getClientProvider(rc, clientId) {
        // return this.providerCollection.getActiveProvider(clientId)
    }
    logRegistration(rc, apiName, fnName, parent, isApi) {
        // const pName  = rc.getName(parent),
        //       lpName = lo.lowerFirst(pName)
        // rc.debug(rc.getName(this), 'Registered', isApi ? 'api' : 'event', apiName ,  'like',
        //   parent[fnName] ? 
        //     (parent.prototype ? `'static ${pName}.${fnName}()'` : `'singleton ${lpName}.${fnName}()'`) : 
        //     `'new ${pName}().${fnName}()'`
        // )
    }
    publishToEventQueue(rc, eventObj) {
        rc.isStatus() && rc.status(rc.getName(this), 'Publishing event to event queue.', eventObj);
        const channel = EVENT_QUEUE + eventObj.workerId;
        this.reqRedis.publish(channel, JSON.stringify(eventObj));
    }
    async subscribeToEventQueueRedis(rc, redisUrl, workerId) {
        const eventQueueChannel = EVENT_QUEUE + workerId, channelArr = [eventQueueChannel];
        this.eventRedis = await cache_1.RedisWrapper.connect(rc, 'evqRedis', redisUrl);
        rc.isStatus() && rc.status(rc.getName(this), 'Subscribing evqRedis to event queue channels.', channelArr);
        await this.eventRedis.subscribe(channelArr, async (ch, msg) => {
            if (ch === eventQueueChannel) {
                const eventObj = JSON.parse(msg);
                await this.processEventObject(rc, eventObj);
            }
        });
    }
    async stopEventQueueSubscription() {
        await this.eventRedis.close();
    }
    async processEventObject(refRc, eventObj) {
        const rc = refRc.copyConstruct('', 'app-event');
        const co = await connection_map_1.ConnectionMap.getActiveConnection(rc, eventObj.connectionId), cond = !!(co && co.ci);
        rc.isDebug() && rc.debug(rc.getName(this), 'processEventObject', co);
        rc.isDebug() && rc.debug(rc.getName(this), 'Sending event to app?', eventObj, cond);
        if (co && co.ci) {
            await rc.router.sendEvent(rc, co.ci, eventObj.eventName, eventObj.eventParams);
        }
    }
    getCookies(ci) {
        if (ci.provider instanceof https_third_server_1.HttpsThirdServerProvider) {
            return ci.provider.getCookies();
        }
        return {};
    }
    setCookies(ci, cookies) {
        if (ci.provider instanceof https_third_server_1.HttpsThirdServerProvider) {
            return ci.provider.setCookies(cookies);
        }
    }
    async redirectTo(rc, ci, url) {
        if (ci.provider instanceof https_third_server_1.HttpsThirdServerProvider) {
            return await ci.provider.redirect(rc, url);
        }
        throw new Error('Cannot redirect. Invalid provider.');
    }
}
exports.XmnRouterServer = XmnRouterServer;
//# sourceMappingURL=xmn-router-server.js.map