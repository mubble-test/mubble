"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Fri Apr 14 2017
   Author     : Raghvendra Varma
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplProvider = exports.Repl = void 0;
const core_1 = require("@mubble/core");
const repl = require("repl");
const path = require("path");
const fs = require("fs");
const lo = require("lodash");
// Import from external modules without types
const replHistory = require('repl.history'); // https://github.com/ohmu/node-posix
class Repl {
    constructor(rc, clientIdentity) {
        this.rc = rc;
        this.clientIdentity = clientIdentity;
        this.ci = this.getConnectionInfo();
        this.provider = this.ci.provider;
    }
    init(context) {
        return new Promise((resolve, reject) => {
            if (!context)
                context = {};
            context.fs = fs;
            context.path = path;
            context.lo = lo;
            context.$ = this;
            context.rc = this.rc;
            context.ci = this.ci;
            this.replServer = repl.start({ prompt: 'mubble > ', useGlobal: true });
            replHistory(this.replServer, process.env.HOME + '/.mubble-repl');
            Object.assign(this.replServer.context, context);
            this.replServer.on('exit', function () {
                resolve();
            });
            this.replServer.on('error', (err) => {
                reject(err);
            });
        });
    }
    _print(...args) {
        args.forEach((val, index) => {
            this.rc.status('repl', val, typeof (val));
        });
    }
    print(pr) {
        let _ = this, ts = Date.now();
        return pr.then(function () {
            console.log('Success...', Date.now() - ts, 'ms');
            _._print(...arguments);
        }, function () {
            console.log('Failed!', Date.now() - ts, 'ms');
            _._print(...arguments);
        });
    }
    set pr(pr) {
        this.print(pr);
    }
    createNewConnectionInfo(clientIdentity) {
        this.ci = this.getConnectionInfo();
        this.ci.customData = clientIdentity;
        this.provider = this.ci.provider;
    }
    getConnectionInfo() {
        const ci = {
            shortName: '',
            protocol: core_1.Protocol.WEBSOCKET,
            host: 'localhost',
            port: 1234,
            url: '/api/DummyApi',
            headers: {},
            ip: 'localhost',
            msOffset: 0,
            lastEventTs: 0,
            customData: this.clientIdentity,
            protocolVersion: core_1.HTTP.CurrentProtocolVersion,
        };
        const provider = new ReplProvider(this.rc, ci, this.rc.router);
        ci.provider = provider;
        return ci;
    }
}
exports.Repl = Repl;
class ReplProvider {
    constructor(refRc, ci, router) {
        this.refRc = refRc;
        this.ci = ci;
        this.router = router;
        this.configSent = false;
    }
    start(rc, wo) {
        const apiSignature = wo.name + ':' + wo.ts;
        if (!this.requests)
            this.requests = {};
        return new Promise((resolve, reject) => {
            this.requests[apiSignature] = { rejecter: reject, resolver: resolve };
        });
    }
    async routeRequest(rc, apiName, param) {
        const wo = {
            name: apiName,
            type: core_1.WIRE_TYPE.REQUEST,
            ts: Date.now(),
            data: param
        };
        try {
            let promise = this.start(rc, wo);
            await this.router.routeRequest(rc, this.ci, wo);
            const res = await promise;
            return res;
        }
        catch (err) {
            console.log('Error routing Request', err);
            //throw e
            return { data: { error: err } };
        }
    }
    async routeEvent(rc, eventName, param) {
        const wo = {
            name: eventName,
            type: core_1.WIRE_TYPE.EVENT,
            ts: Date.now(),
            data: param
        };
        try {
            let promise = this.start(rc, wo);
            await this.router.routeEvent(rc, this.ci, wo);
            const res = await promise;
            return res;
        }
        catch (e) {
            console.log('Error routing event', e);
            throw e;
        }
    }
    send(rc, data) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Sending to Client:', data.length, 'messages.');
        data.forEach((wo, idx) => this.sendOneMessage(rc, wo, idx));
    }
    requestClose() {
    }
    sendOneMessage(rc, wo, idx) {
        if (wo.type == core_1.WIRE_TYPE.SYS_EVENT && wo.name == 'UPGRADE_CLIENT_IDENTITY') {
            this.ci.customData = wo.data;
            rc.isStatus() && rc.status(rc.getName(this), 'Updated Client Identity: ', JSON.stringify(this.ci.customData));
            return;
        }
        const apiSignature = wo.name + ':' + wo.ts;
        if (wo && wo.error) {
            rc.isDebug() && rc.debug(rc.getName(this), 'Send Error to client: ', wo);
            this.requests[apiSignature].rejecter(wo._err);
            delete this.requests[apiSignature];
        }
        else if (!wo.data) {
            rc.isWarn() && rc.warn(rc.getName(this), 'Invalid Response to client: WireObject data is undefined', JSON.stringify(wo));
            this.requests[apiSignature].rejecter('Invalid Response to client: WireObject data is undefined');
            delete this.requests[apiSignature];
        }
        else {
            rc.isDebug() && rc.debug(rc.getName(this), 'Sending Response to client: ', wo);
            switch (wo.type) {
                case 'REQ_RESP':
                case 'EVENT_RESP':
                    this.requests[apiSignature].resolver(wo);
                    delete this.requests[apiSignature];
                case 'EVENT':
                default:
                    break;
            }
        }
    }
}
exports.ReplProvider = ReplProvider;
//# sourceMappingURL=repl.js.map