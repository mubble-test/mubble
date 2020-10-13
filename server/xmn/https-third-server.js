"use strict";
/*------------------------------------------------------------------------------
   About      : Https server for third party who are not following our protocol
   
   Created on : Mon Feb 25 2019
   Author     : Vishal Sinha
   
   Copyright (c) 2019 Obopay Mobile Technologies Pvt Ltd. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpsThirdServerProvider = exports.HttpsThirdServer = void 0;
const core_1 = require("@mubble/core");
const obopay_https_client_1 = require("./obopay-https-client");
const util_1 = require("../util");
const urlModule = require("url");
const querystring = require("querystring");
const lo = require("lodash");
const TIMER_FREQUENCY_MS = 10 * 1000, // to detect timed-out requests
HTTP_TIMEOUT_MS = 60 * 1000, // timeout in ms
GET = 'GET', POST = 'POST';
class HttpsThirdServer {
    constructor(refRc, router) {
        this.refRc = refRc;
        this.router = router;
        this.providerMap = new Map();
        setInterval(this.cbTimerPing.bind(this), TIMER_FREQUENCY_MS);
    }
    async requestHandler(req, res) {
        const rc = this.refRc.copyConstruct('', 'https-third-' + lo.random(1000, 9999, false));
        rc.isStatus() && rc.status(rc.getName(this), 'Received third party https request.', req.url);
        const urlObj = urlModule.parse(req.url || ''), pathName = urlObj.pathname || '', ar = (pathName.startsWith('/') ? pathName.substr(1) : pathName).split('/'), obopayStr = ar[0], apiName = ar[1], encRequestPath = ar[2];
        if (obopayStr !== obopay_https_client_1.ObopayHttpsClient.OBOPAY_STR) {
            rc.isWarn() && rc.warn(rc.getName(this), 'Ending request with 404 response.');
            this.endRequestWithNotFound(res);
            return;
        }
        const ci = {}, [host, port] = (req.headers.host || '').split(':');
        ci.protocol = core_1.Protocol.HTTP_THIRD;
        ci.host = host;
        ci.port = Number(port) || urlObj.protocol === 'https:' ? 443 : 80;
        ci.url = req.url || '';
        ci.headers = req.headers;
        ci.ip = this.router.getIp(req);
        ci.customData = {};
        try {
            await this.router.verifyConnection(rc, ci, apiName);
        }
        catch (err) {
            rc.isWarn() && rc.warn(rc.getName(this), 'Ending request with 404 response.', err);
            this.endRequestWithNotFound(res);
            return;
        }
        let apiParams = {};
        if (encRequestPath) {
            const requestPath = decodeURIComponent(encRequestPath), encProvider = obopay_https_client_1.ObopayHttpsClient.getEncProvider();
            apiParams = encProvider.decodeThirdPartyRequestPath(requestPath);
        }
        const httpsProvider = new HttpsThirdServerProvider(rc, this.router, ci, req, res, this);
        ci.provider = httpsProvider;
        const now = Date.now(), reqId = now * 1000, query = urlObj.query || '';
        this.providerMap.set(httpsProvider, now);
        await httpsProvider.processRequest(rc, apiName, apiParams, query, reqId);
    }
    markFinished(provider) {
        this.providerMap.delete(provider);
    }
    cbTimerPing() {
        const notBefore = Date.now() - HTTP_TIMEOUT_MS, rc = this.refRc, len = this.providerMap.size;
        for (const [provider, lastTs] of this.providerMap) {
            if (lastTs < notBefore) {
                rc.isDebug() && rc.debug(rc.getName(this), 'Timing out a request');
                provider.send(rc, core_1.XmnError.RequestTimedOut);
            }
            else if (len === 1) {
                rc.isDebug() && rc.debug(rc.getName(this), 'Requests checked and found active');
            }
        }
    }
    endRequestWithNotFound(res) {
        res.writeHead(404, {
            [core_1.HTTP.HeaderKey.contentLength]: 0,
            connection: 'close'
        });
        res.end();
    }
}
exports.HttpsThirdServer = HttpsThirdServer;
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   Https Server Provider
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
class HttpsThirdServerProvider {
    constructor(refRc, router, ci, req, res, server) {
        this.refRc = refRc;
        this.router = router;
        this.ci = ci;
        this.req = req;
        this.res = res;
        this.server = server;
        this.responseHeaders = {};
        this.finished = false;
    }
    async processRequest(rc, apiName, apiParams, query, reqId) {
        let extraParams = {};
        rc.isDebug() && rc.debug(rc.getName(this), 'Request method.', this.req.method);
        switch (this.req.method) {
            case GET:
                extraParams = this.parseQuery(rc, query);
                break;
            case POST:
                extraParams = await this.parseBody(rc);
                break;
            default:
                rc.isWarn() && rc.warn(rc.getName(this), 'Rejecting request with invalid method', this.req.method, apiName);
        }
        apiParams = this.appendParams(rc, apiParams, extraParams);
        const wo = new core_1.WireRequest(apiName, apiParams, reqId);
        this.router.providerMessage(rc, this.ci, [wo]);
    }
    send(rc, data) {
        if (this.finished) {
            rc.isWarn() && rc.warn(rc.getName(this), `Request already processed.`);
            return;
        }
        rc.isStatus() && rc.status(rc.getName(this), 'sending', data);
        this.res.writeHead(200, this.responseHeaders);
        if (!(data instanceof Buffer) || typeof data != 'string')
            data = Buffer.from(JSON.stringify(data));
        const streams = [this.res], uStream = new util_1.UStream.WriteStreams(rc, streams);
        uStream.write(data);
        this.finished = true;
        this.server.markFinished(this);
        // this.router.providerClosed(rc, this.ci)
    }
    requestClose() {
    }
    getCookies() {
        const cookies = {};
        if (!this.ci.headers.cookie)
            return cookies;
        const headerCookie = this.ci.headers.cookie, pairs = headerCookie.split(';');
        for (const pair of pairs) {
            const parts = pair.split('='), partsKey = parts.shift();
            if (partsKey === undefined)
                return cookies;
            const cookieKey = decodeURIComponent(partsKey.trim()), cookieValue = decodeURIComponent(parts.join('='));
            cookies[cookieKey] = cookieValue;
        }
        return cookies;
    }
    setCookies(cookies) {
        const pairs = [];
        for (const key in cookies) {
            const cookieKey = encodeURIComponent(key), cookieValue = encodeURIComponent(cookies[key]), path = '; path="/"', expiry = `; expires=${new Date(Date.now() + 10 * 365 * 60 * 60 * 1000).toUTCString()} UTC`, pair = [cookieKey, cookieValue].join('=') + expiry + path;
            pairs.push(pair);
        }
        this.responseHeaders[core_1.HTTP.HeaderKey.setCookie] = pairs;
    }
    redirect(rc, url) {
        rc.isStatus() && rc.status(rc.getName(this), 'Redirecting to :', url, this.responseHeaders);
        this.responseHeaders[core_1.HTTP.HeaderKey.location] = url;
        this.res.writeHead(302, this.responseHeaders);
        this.res.end();
        this.finished = true;
        this.server.markFinished(this);
    }
    async parseBody(rc) {
        const data = (await new util_1.UStream.ReadStreams(rc, [this.req]).read()).toString(), headers = this.ci.headers;
        switch (headers[core_1.HTTP.HeaderKey.contentType]) {
            case core_1.HTTP.HeaderValue.form:
                return this.parseQuery(rc, data);
            default:
                try {
                    return JSON.parse(data);
                }
                catch (err) {
                    rc.isDebug() && rc.debug(rc.getName(this), 'Could not parse post data as json', data);
                    return { data };
                }
        }
    }
    appendParams(rc, apiParams, extraParams) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Appending to api params.', apiParams, extraParams);
        for (const key in extraParams) {
            apiParams[key] = extraParams[key];
        }
        rc.isDebug() && rc.debug(rc.getName(this), 'Final api params.', apiParams);
        return apiParams;
    }
    parseQuery(rc, query) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Parsing query.', query);
        const obj = querystring.parse(query), keywords = {
            true: true,
            false: false,
            null: null,
            undefined: undefined,
            '': undefined
        };
        for (const key of Object.keys(obj)) {
            const value = obj[key];
            if (value in keywords) {
                obj[key] = keywords[value];
            }
        }
        rc.isDebug() && rc.debug(rc.getName(this), 'Query parsed.', query, obj);
        return obj;
    }
}
exports.HttpsThirdServerProvider = HttpsThirdServerProvider;
//# sourceMappingURL=https-third-server.js.map