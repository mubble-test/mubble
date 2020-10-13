"use strict";
/*------------------------------------------------------------------------------
   About      : Https server for other obopay servers
   
   Created on : Mon Dec 31 2018
   Author     : Vishal Sinha
   
   Copyright (c) 2018 Obopay Mobile Technologies Pvt Ltd. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpsServerProvider = exports.HttpsServer = void 0;
const core_1 = require("@mubble/core");
const security_errors_1 = require("./security-errors");
const obopay_https_client_1 = require("./obopay-https-client");
const util_1 = require("../util");
const urlModule = require("url");
const querystring = require("querystring");
const lo = require("lodash");
const TIMER_FREQUENCY_MS = 10 * 1000, // to detect timed-out requests
HTTP_TIMEOUT_MS = 60 * 1000, // timeout in ms
GET = 'GET', POST = 'POST', SUCCESS = 'success', OBOPAY_STR = 'obopay-java';
class HttpsServer {
    constructor(refRc, router) {
        this.refRc = refRc;
        this.router = router;
        this.providerMap = new Map();
        setInterval(this.cbTimerPing.bind(this), TIMER_FREQUENCY_MS);
    }
    async requestHandler(req, res) {
        const rc = this.refRc.copyConstruct('', 'https-' + lo.random(1000, 9999, false));
        const urlObj = urlModule.parse(req.url || ''), pathNameRaw = urlObj.pathname || '', pathName = pathNameRaw.startsWith('/') ? pathNameRaw.substr(1) : pathNameRaw;
        if (pathName === 'raghuEcho') {
            const data = await raghuEcho(req, urlObj);
            // rc.isStatus() && rc.status(rc.getName(this), 'Sending response.', pathName, data)
            res.writeHead(200, {
                [core_1.HTTP.HeaderKey.contentType]: core_1.HTTP.HeaderValue.json,
                connection: 'close'
            });
            res.end(JSON.stringify(data));
            return;
        }
        rc.isStatus() && rc.status(rc.getName(this), 'Recieved a new request.', req.url);
        const [apiStr, moduleName, apiName] = pathName.split('/');
        const ci = {}, [host, port] = (req.headers.host || '').split(':');
        ci.protocol = urlObj.protocol === 'https:' ? core_1.Protocol.HTTPS : core_1.Protocol.HTTP;
        ci.host = host;
        ci.port = Number(port) || urlObj.protocol === 'https:' ? 443 : 80;
        ci.url = req.url || '';
        ci.headers = req.headers;
        ci.ip = this.router.getIp(req);
        ci.msOffset = 0;
        ci.lastEventTs = 0;
        ci.customData = {};
        rc.isDebug() && rc.debug(rc.getName(this), 'ci', ci);
        const clientId = ci.headers[core_1.HTTP.HeaderKey.clientId], version = ci.headers[core_1.HTTP.HeaderKey.versionNumber];
        try {
            if (apiStr !== obopay_https_client_1.ObopayHttpsClient.API_STR && (apiStr !== OBOPAY_STR)) // TODO : Change this
                throw new Error('Invalid path in request url ' + apiStr);
            if (!obopay_https_client_1.ObopayHttpsClient.verifyModule(moduleName, apiName))
                throw new Error('Invalid module ' + moduleName + ' or api ' + apiName);
            await this.router.verifyConnection(rc, ci, apiName);
        }
        catch (err) {
            rc.isWarn() && rc.warn(rc.getName(this), 'Error in verifying connection. Sending 404 response.', err);
            res.writeHead(404, {
                [core_1.HTTP.HeaderKey.contentLength]: 0,
                connection: 'close'
            });
            res.end();
            return;
        }
        const encProvider = obopay_https_client_1.ObopayHttpsClient.getEncProvider(), httpsProvider = new HttpsServerProvider(rc, ci, this.router, res, encProvider, this);
        ci.provider = httpsProvider;
        const reqId = Date.now(), apiParams = {};
        try {
            if (req.method != POST)
                throw new core_1.Mubble.uError(security_errors_1.SecurityErrorCodes.INVALID_REQUEST_METHOD, `${req.method} not supported.`);
            obopay_https_client_1.ObopayHttpsClient.verifyClientRequest(rc, clientId, version, encProvider, ci.headers, ci.ip);
            const streams = encProvider.decodeBody([req], ci.headers[core_1.HTTP.HeaderKey.bodyEncoding], false), stream = new util_1.UStream.ReadStreams(rc, streams), bodyStr = (await stream.read()).toString(), body = JSON.parse(bodyStr);
            rc.isDebug() && rc.debug(rc.getName(this), 'Incoming request body.', body);
            await obopay_https_client_1.ObopayHttpsClient.addRequestToMemory(ci.headers[core_1.HTTP.HeaderKey.requestTs], ci.headers[core_1.HTTP.HeaderKey.clientId], apiName, bodyStr);
            Object.assign(apiParams, body);
        }
        catch (err) {
            this.refRc.isError() && this.refRc.error(this.refRc.getName(this), 'Error in verifying client request.', err);
            if (err.code in security_errors_1.SecurityErrorCodes) {
                httpsProvider.sendProtocolErrorResponse(rc, err.code, apiName, reqId);
            }
            else {
                res.writeHead(500, {
                    [core_1.HTTP.HeaderKey.contentLength]: 0,
                    connection: 'close'
                });
                res.end();
            }
            return;
        }
        this.providerMap.set(httpsProvider, reqId);
        httpsProvider.processRequest(rc, apiName, apiParams, reqId);
    }
    markFinished(provider) {
        this.providerMap.delete(provider);
    }
    cbTimerPing() {
        const notBefore = Date.now() - HTTP_TIMEOUT_MS, rc = this.refRc, len = this.providerMap.size;
        for (const [provider, lastTs] of this.providerMap) {
            if (lastTs < notBefore) {
                rc.isDebug() && rc.debug(rc.getName(this), 'Timing out a request');
                provider.sendErrorResponse(rc, core_1.XmnError.RequestTimedOut, 'REQUEST_TIMED_OUT', lastTs);
            }
            else if (len === 1) {
                rc.isDebug() && rc.debug(rc.getName(this), 'Requests checked and found active');
            }
        }
    }
}
exports.HttpsServer = HttpsServer;
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   Https Server Provider
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
class HttpsServerProvider {
    constructor(refRc, ci, router, res, encProvider, server) {
        this.refRc = refRc;
        this.ci = ci;
        this.router = router;
        this.res = res;
        this.encProvider = encProvider;
        this.server = server;
        this.finished = false;
    }
    send(rc, woArr) {
        const wo = woArr[0];
        if (this.finished) {
            rc.isWarn() && rc.warn(rc.getName(this), `Request ${wo.name} already processed.`);
            return;
        }
        rc.isStatus() && rc.status(rc.getName(this), 'Sending response.', wo);
        const headers = {
            [core_1.HTTP.HeaderKey.clientId]: this.ci.headers[core_1.HTTP.HeaderKey.clientId],
            [core_1.HTTP.HeaderKey.versionNumber]: this.ci.headers[core_1.HTTP.HeaderKey.versionNumber],
            [core_1.HTTP.HeaderKey.symmKey]: this.encProvider.encodeResponseKey(),
            [core_1.HTTP.HeaderKey.contentType]: core_1.HTTP.HeaderValue.stream
        };
        const body = wo.errorCode
            ? wo.errorCode === SUCCESS
                ? { error: wo.errorCode, data: wo.data }
                : { error: wo.errorCode, data: wo.errorMessage, errorObj: wo.errorObject }
            : { data: wo.data }, encBodyObj = this.encProvider.encodeBody(body, true);
        headers[core_1.HTTP.HeaderKey.bodyEncoding] = encBodyObj.bodyEncoding;
        if (!encBodyObj.contentLength) {
            headers[core_1.HTTP.HeaderKey.transferEncoding] = core_1.HTTP.HeaderValue.chunked;
        }
        this.res.writeHead(200, headers);
        encBodyObj.streams.push(this.res);
        const stream = new util_1.UStream.WriteStreams(rc, encBodyObj.streams);
        stream.write(encBodyObj.dataStr);
        this.finished = true;
        this.server.markFinished(this);
        rc.isDebug() && rc.debug(rc.getName(this), 'Closing provider');
        this.router.providerClosed(rc, this.ci);
    }
    requestClose() {
    }
    processRequest(rc, apiName, apiParams, reqId) {
        this.wireRequest = new core_1.WireRequest(apiName, apiParams, reqId);
        this.router.providerMessage(rc, this.ci, [this.wireRequest]);
    }
    sendErrorResponse(rc, errorCode, apiName, reqId) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Sending error response.', this.wireRequest, errorCode);
        const wo = new core_1.WireReqResp(apiName || this.wireRequest.name, reqId || this.wireRequest.ts, {}, errorCode);
        this.send(rc, [wo]);
    }
    sendProtocolErrorResponse(rc, errorCode, apiName, reqId) {
        const wo = new core_1.WireReqResp(apiName || this.wireRequest.name, reqId || this.wireRequest.ts, security_errors_1.SecurityError[errorCode], SUCCESS);
        this.send(rc, [wo]);
    }
}
exports.HttpsServerProvider = HttpsServerProvider;
async function raghuEcho(req, urlObj) {
    const query = urlObj.query || '', contentType = req.headers[core_1.HTTP.HeaderKey.contentType];
    let data = {};
    switch (req.method) {
        case GET:
            data = querystring.parse(query);
            break;
        case POST:
            data = await parseBody(req, contentType);
            break;
    }
    return data;
}
async function parseBody(req, contentType) {
    const data = (await readData(req)).toString();
    switch (contentType) {
        case core_1.HTTP.HeaderValue.form:
            return querystring.parse(data);
        default:
            try {
                return JSON.parse(data);
            }
            catch (err) {
                console.log('Could not parse data as JSON.', data, err);
                return { data };
            }
    }
}
async function readData(req) {
    const buf = await new Promise((resolve, reject) => {
        let data;
        req.addListener('data', (chunk) => {
            if (!data) {
                data = chunk;
            }
            else {
                if (chunk instanceof Buffer)
                    data = Buffer.concat([data, chunk]);
                else
                    data = data + chunk;
            }
        });
        req.addListener('end', () => {
            if (typeof data === 'string')
                resolve(Buffer.from(data));
            resolve(data);
        });
        req.addListener('error', (err) => {
            reject(err);
        });
    });
    return buf;
}
//# sourceMappingURL=https-server.js.map