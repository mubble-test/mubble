"use strict";
/*------------------------------------------------------------------------------
   About      : Wss Client
   
   Created on : Mon Apr 15 2019
   Author     : Vishal Sinha
   
   Copyright (c) 2019 Obopay Mobile Technologies Pvt Ltd. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.WssClient = void 0;
const core_1 = require("@mubble/core");
const obopay_wss_client_1 = require("./obopay-wss-client");
const ws = require("ws");
const lo = require("lodash");
const HANDSHAKE_ERROR = 'INVALID_HANDSHAKE_MESSAGE';
class WssClient {
    constructor(refRc, requestServer, wssConfig, selfId, unsecured) {
        this.refRc = refRc;
        this.requestServer = requestServer;
        this.wssConfig = wssConfig;
        this.selfId = selfId;
        this.unsecured = unsecured;
        this.handshakeEstablished = false;
        this.ongoingRequests = [];
        this.sending = false;
    }
    async sendRequest(rc, apiName, params) {
        rc.isStatus() && rc.status(rc.getName(this), 'sendRequest', this.requestServer.id, apiName, params);
        if (this.sending) {
            rc.isDebug() && rc.debug(rc.getName(this), 'Another send in progress.');
            return;
        }
        if (!this.socket && (this.socket != ws.OPEN || !this.handshakeEstablished)) {
            rc.isDebug() && rc.debug(rc.getName(this), 'Handshake not established.', this.handshakeEstablished);
            this.establishHandshake(rc);
            this.openPromise = new core_1.Mubble.uPromise();
            this.handshakePromise = new core_1.Mubble.uPromise();
            await Promise.all([this.openPromise.promise, this.handshakePromise.promise]);
        }
        return new Promise((resolve, reject) => {
            const wr = new core_1.WireRequest(apiName, params, undefined, resolve, reject);
            this.ongoingRequests.push(wr);
            this.sendInternal(rc, [wr]);
        });
    }
    closeConnection(rc) {
        rc.isStatus() && rc.status(rc.getName(this), 'Closing connection with', this.requestServer.id);
        this.socket.close();
        this.cleanUp(rc);
    }
    async sendInternal(rc, woArr) {
        rc.isDebug() && rc.debug(rc.getName(this), 'sendInternal', woArr);
        this.sending = true;
        const data = await this.encProvider.encodeBody(woArr, false);
        this.socket.send(data);
        this.sending = false;
    }
    establishHandshake(rc) {
        rc.isStatus() && rc.status(rc.getName(this), `Establishing handshake with ${this.requestServer.id}.`);
        this.encProvider = obopay_wss_client_1.ObopayWssClient.getEncProvider();
        const tsMicro = Date.now() * 1000, encData = this.encProvider.encodeRequestUrl(tsMicro, this.wssConfig, this.requestServer.syncHash), encDataUri = encodeURIComponent(encData), urlPath = `${this.unsecured ? 'ws' : 'wss'}://${this.requestServer.host}:${this.requestServer.port}/`
            + `${obopay_wss_client_1.HANDSHAKE}/${core_1.HTTP.CurrentProtocolVersion}/${this.selfId}/${encDataUri}`;
        this.socket = new ws(urlPath);
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onclose = this.onClose.bind(this);
        this.socket.onerror = this.onError.bind(this);
    }
    onOpen() {
        const rc = this.refRc;
        rc.isStatus() && rc.status(rc.getName(this), 'Connection open.');
        this.openPromise.resolve(true);
    }
    async onMessage(msgEvent) {
        const rc = this.refRc, data = Buffer.from(msgEvent.data);
        rc.isStatus() && rc.status(rc.getName(this), 'Message received.');
        if (!this.handshakeEstablished) { // data is handshake reply
            rc.isDebug() && rc.debug(rc.getName(this), 'Treating message as handshake reply.');
            const wo = await this.encProvider.decodeHandshakeMessage(data);
            if (wo.type != core_1.WIRE_TYPE.SYS_EVENT || wo.name != core_1.SYS_EVENT.WS_PROVIDER_CONFIG) {
                rc.isError() && rc.error(rc.getName(this), 'Invalid handshake response.', wo);
                this.socket.close();
                throw new core_1.Mubble.uError(HANDSHAKE_ERROR, 'Invalid handshake message received ' + JSON.stringify(wo));
            }
            this.wssConfig = wo.data;
            this.handshakeEstablished = true;
            this.handshakePromise.resolve(true);
            return;
        }
        // data is array of wire objects
        rc.isDebug() && rc.debug(rc.getName(this), 'Decrypting message.');
        const woArr = await this.encProvider.decodeBody(data, false);
        this.processMessage(rc, woArr);
    }
    onClose() {
        const rc = this.refRc;
        rc.isDebug() && rc.debug(rc.getName(this), 'Connection closed.');
        this.cleanUp(rc);
    }
    onError(err) {
        const rc = this.refRc;
        rc.isError() && rc.error(rc.getName(this), 'websocket error', err);
        this.cleanUp(rc);
    }
    processMessage(rc, woArr) {
        rc.isDebug() && rc.debug(rc.getName(this), 'processMessage', woArr);
        for (const wo of woArr) {
            if (wo.type != core_1.WIRE_TYPE.REQ_RESP) {
                rc.isWarn() && rc.warn(rc.getName(this), 'Not implemented yet.', wo);
                continue;
            }
            const resp = wo;
            const index = lo.findIndex(this.ongoingRequests, { ts: resp.ts });
            if (index === -1) {
                rc.isWarn() && rc.warn(rc.getName(this), 'Got response for not an ongoing request.', resp);
                continue;
            }
            this.finishRequest(rc, index, resp.data, resp.errorCode, resp.errorMessage);
        }
    }
    finishRequest(rc, index, data, errorCode, errorMessage) {
        const wr = this.ongoingRequests.splice(index, 1)[0];
        if (!wr.resolve) {
            rc.isWarn() && rc.warn(rc.getName(this), 'Request already finished ???', wr, errorCode, errorMessage, data);
            return;
        }
        if (errorCode && errorMessage) {
            rc.isError() && rc.error(rc.getName(this), 'Request failed', wr, errorCode, errorMessage);
            wr.reject(new core_1.Mubble.uError(errorCode, errorMessage));
        }
        else {
            rc.isStatus() && rc.status(rc.getName(this), 'Request succeeded', wr, data);
            wr.resolve(data);
        }
        wr.resolve = null;
        wr.reject = null;
    }
    cleanUp(rc) {
        rc.isStatus() && rc.status(rc.getName(this), 'Cleaning up connection.');
        if (this.socket && this.socket.readyState === ws.OPEN)
            this.socket.close();
        this.socket = null;
        this.encProvider = null;
        this.wssConfig = null;
        this.handshakeEstablished = false;
        this.ongoingRequests = [];
        this.sending = false;
    }
}
exports.WssClient = WssClient;
//# sourceMappingURL=wss-client.js.map