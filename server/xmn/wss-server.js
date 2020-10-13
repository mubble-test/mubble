"use strict";
/*------------------------------------------------------------------------------
   About      : WebSocket based request handler
   
   Created on : Fri Jan 04 2019
   Author     : Vishal Sinha
   
   Copyright (c) 2019 Obopay Mobile Technologies Pvt Ltd. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.WssServerProvider = exports.WssServer = void 0;
const core_1 = require("@mubble/core");
const obopay_wss_client_1 = require("./obopay-wss-client");
const ws = require("ws");
const urlModule = require("url");
const lo = require("lodash");
const SLASH_SEP = '/', PING_FREQUENCY_MS = 29 * 1000; // 29 seconds
class WssServer {
    constructor(refRc, router, httpsServer) {
        this.refRc = refRc;
        this.router = router;
        this.socketMap = new Map();
        this.server = new ws.Server({
            server: httpsServer
        });
        this.server.on('connection', this.establishHandshake.bind(this));
        setInterval(this.cbTimerPing.bind(this), PING_FREQUENCY_MS);
    }
    async establishHandshake(socket, req) {
        const rc = this.refRc.copyConstruct('', 'handshake');
        rc.isStatus() && rc.status(rc.getName(this), 'Received a new connection. Establishing handshake.');
        try {
            if (!req.url)
                throw new Error('Request URL absent.');
            const url = urlModule.parse(req.url), path = url.pathname || '', [host, port] = (req.headers.host || '').split(':');
            const [, handshake, version, clientId, encDataUri] = path.split(SLASH_SEP);
            if (!handshake || handshake != obopay_wss_client_1.HANDSHAKE || !version || !clientId || !encDataUri)
                throw new Error(`Invalid URL path ${path}.`);
            const encData = decodeURIComponent(encDataUri), isAppClient = obopay_wss_client_1.ObopayWssClient.verifyClientRequest(rc, version, clientId), publicKey = isAppClient ? undefined
                : obopay_wss_client_1.ObopayWssClient.getClientPublicKey(clientId), encProvider = obopay_wss_client_1.ObopayWssClient.getEncProvider(), body = encProvider.decodeRequestUrl(encData, publicKey), diff = Math.abs((Date.now() * 1000) - body.tsMicro), // ts difference in microseconds
            wssConfig = obopay_wss_client_1.ObopayWssClient.getWssConfig(body.wssConfig, encProvider), ci = {};
            ci.shortName = clientId;
            ci.protocol = core_1.Protocol.WEBSOCKET;
            ci.host = host;
            ci.port = Number(port) || (url.protocol === 'wss' ? 443 : 80);
            ci.url = path;
            ci.headers = req.headers;
            ci.ip = this.router.getIp(req);
            ci.msOffset = diff > 5000000 ? diff : 0; // 5 seconds difference is negligible
            ci.lastEventTs = 0;
            ci.lastRequestTs = body.tsMicro;
            ci.customData = wssConfig.custom;
            const wssProvider = new WssServerProvider(rc, socket, ci, this.router, encProvider, wssConfig, isAppClient, this);
            ci.provider = wssProvider;
            try {
                await this.router.verifyConnection(rc, ci);
            }
            catch (e) {
                const errData = {
                    code: e.code || e.message,
                    msg: e.code ? e.message : ''
                };
                const woJson = { type: core_1.WIRE_TYPE.SYS_EVENT, name: core_1.SYS_EVENT.ERROR, data: errData }, respWo = core_1.WireObject.getWireObject(woJson), encConfig = await encProvider.encodeHandshakeMessage(respWo);
                rc.isDebug() && rc.debug(rc.getName(this), 'sending', respWo);
                socket.send(encConfig);
                return;
            }
            wssConfig.custom = ci.customData;
            const woJson = { type: core_1.WIRE_TYPE.SYS_EVENT, name: core_1.SYS_EVENT.WS_PROVIDER_CONFIG, data: wssConfig }, respWo = core_1.WireObject.getWireObject(woJson), encConfig = await encProvider.encodeHandshakeMessage(respWo);
            rc.isDebug() && rc.debug(rc.getName(this), 'sending', respWo);
            socket.send(encConfig);
            this.markActive(wssProvider);
        }
        catch (err) {
            rc.isError() && rc.error(rc.getName(this), 'Error in establishing handshake.', err);
            socket.close();
        }
    }
    markActive(wssProvider) {
        this.socketMap.set(wssProvider, Date.now() * 1000);
    }
    markClosed(wssProvider) {
        this.socketMap.delete(wssProvider);
    }
    async sendEventToAll(rc, wo) {
        for (const [webSocket, lastTs] of this.socketMap) {
            webSocket.send(rc, [wo]);
        }
    }
    async sendEventToUserLinkId(rc, wo, userLinkId) {
        for (const [webSocket, lastTs] of this.socketMap) {
            const socketUserLinkId = webSocket.getUserLinkId();
            if (socketUserLinkId && socketUserLinkId === userLinkId) {
                webSocket.send(rc, [wo]);
            }
        }
    }
    cbTimerPing() {
        const notBefore = Date.now() - PING_FREQUENCY_MS - 5000, /* extra time for network delays */ notBeforeMicro = notBefore * 1000, rc = this.refRc, len = this.socketMap.size;
        for (const [webSocket, lastTs] of this.socketMap) {
            if (lastTs < notBeforeMicro) {
                rc.isDebug() && rc.debug(rc.getName(this), 'Cleaning up a connection as no ping or close.');
                webSocket.requestClose(rc);
            }
            else if (rc.isDebug() && len === 1) {
                rc.isDebug() && rc.debug(rc.getName(this), 'Connection checked and found active.');
            }
        }
    }
}
exports.WssServer = WssServer;
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   Wss Server Provider
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
class WssServerProvider {
    constructor(refRc, socket, ci, router, encProvider, wssConfig, appClient, wssServer) {
        this.refRc = refRc;
        this.socket = socket;
        this.ci = ci;
        this.router = router;
        this.encProvider = encProvider;
        this.wssConfig = wssConfig;
        this.appClient = appClient;
        this.wssServer = wssServer;
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onclose = this.onClose.bind(this);
        this.socket.onerror = this.onError.bind(this);
    }
    getUserLinkId() {
        return this.ci.customData.userLinkId;
    }
    async send(rc, woArr) {
        const data = await this.encProvider.encodeBody(woArr, this.appClient);
        rc.isStatus() && rc.status(rc.getName(this), 'sending', woArr);
        this.ci.lastRequestTs = woArr[woArr.length - 1].ts;
        this.socket.send(data);
    }
    requestClose(rc) {
        rc.isDebug() && rc.debug(rc.getName(this), 'requestClose');
        this.socket.close();
        this.closeInternal(rc);
    }
    onOpen() {
        const rc = this.refRc.copyConstruct('', 'wss' + +lo.random(1000, 9999, false));
        rc.isDebug() && rc.debug(rc.getName(this), 'WebSocket onopen()');
    }
    onMessage(msgEvent) {
        const rc = this.refRc.copyConstruct('', 'wss-request');
        rc.isDebug() && rc.debug(rc.getName(this), 'WebSocket onmessage()');
        const data = msgEvent.data;
        this.processMessage(rc, data);
    }
    async processMessage(rc, data) {
        const woArr = await this.encProvider.decodeBody(data, this.appClient);
        rc.isDebug() && rc.debug(rc.getName(this), 'processing', woArr);
        // TODO : Verify requestTs
        // const tsVerified = woArr.every((wo : WireObject) => {
        //   return ObopayWssClient.verifyRequestTs(wo.ts, this.ci.lastRequestTs, this.wssConfig)
        // })
        // if(!tsVerified) {
        //   this.socket.close()
        //   this.closeInternal(rc)
        //   return
        // }
        this.wssServer.markActive(this);
        this.router.providerMessage(rc, this.ci, woArr);
    }
    onClose() {
        const rc = this.refRc;
        rc.isDebug() && rc.debug(rc.getName(this), 'WebSocket onclose()');
        this.closeInternal(rc);
    }
    onError(err) {
        this.wssServer.markClosed(this);
        const rc = this.refRc;
        rc.isError() && rc.error(rc.getName(this), 'WebSocket onerror()', err);
        this.router.providerFailed(rc, this.ci);
    }
    closeInternal(rc) {
        rc.isDebug() && rc.debug(rc.getName(this), 'closeInternal');
        this.wssServer.markClosed(this);
        this.router.providerClosed(rc, this.ci);
    }
}
exports.WssServerProvider = WssServerProvider;
//# sourceMappingURL=wss-server.js.map