"use strict";
/*------------------------------------------------------------------------------
   About      : Obopay Https Client
   
   Created on : Tue Dec 18 2018
   Author     : Vishal Sinha
   
   Copyright (c) 2018 Obopay Mobile Technologies Pvt Ltd. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObopayHttpsClient = void 0;
const core_1 = require("@mubble/core");
const https_enc_provider_1 = require("./https-enc-provider");
const security_errors_1 = require("./security-errors");
const util_1 = require("../util");
const https = require("https");
const http = require("http");
const fs = require("fs");
const lo = require("lodash");
const urlModule = require("url");
const REQUEST_TS_RANGE = 15 * 60 * 1000 * 1000, // 15 minutes in micro seconds
REQUEST_EXPIRY_SECS = 30 * 60, // 30 minutes in seconds
PIPE_SEP = ' | ';
var ObopayHttpsClient;
(function (ObopayHttpsClient) {
    ObopayHttpsClient.OBOPAY_STR = 'obopay';
    ObopayHttpsClient.API_STR = 'api';
    const CLASS_NAME = 'ObopayHttpsClient', POST = 'POST';
    let selfId, credentialRegistry, privateKey, requestMem;
    function init(rc, selfIdentity, registry, pk, requestRedis) {
        rc.isDebug() && rc.debug(CLASS_NAME, 'Initializing ObopayHttpsClient.');
        if (selfId)
            throw new Error('Calling init twice.');
        selfId = selfIdentity;
        credentialRegistry = registry;
        privateKey = pk;
        requestMem = requestRedis;
    }
    ObopayHttpsClient.init = init;
    async function obopayApi(rc, apiName, params, serverId, syncHashPath) {
        if (!selfId || !credentialRegistry)
            throw new Error('ObopayHttpsClient not initialized.');
        const requestServer = credentialRegistry.getCredential(serverId);
        if (!requestServer || !requestServer.syncHash || !requestServer.host || !requestServer.port)
            throw new Error('requestServer not defined.');
        const syncHash = syncHashPath ? fs.readFileSync(syncHashPath).toString()
            : requestServer.syncHash, requestTs = Date.now() * 1000, headers = {};
        rc.isDebug() && rc.debug(CLASS_NAME, 'requestTs', requestTs);
        const encProvider = new https_enc_provider_1.HttpsEncProvider(privateKey);
        headers[core_1.HTTP.HeaderKey.clientId] = selfId;
        headers[core_1.HTTP.HeaderKey.versionNumber] = core_1.HTTP.CurrentProtocolVersion;
        headers[core_1.HTTP.HeaderKey.contentType] = core_1.HTTP.HeaderValue.stream;
        headers[core_1.HTTP.HeaderKey.symmKey] = encProvider.encodeRequestKey(syncHash);
        headers[core_1.HTTP.HeaderKey.requestTs] = encProvider.encodeRequestTs(requestTs);
        rc.isDebug() && rc.debug(rc.getName(this), 'Encoding body.', params);
        const encBodyObj = encProvider.encodeBody(params, false);
        headers[core_1.HTTP.HeaderKey.bodyEncoding] = encBodyObj.bodyEncoding;
        if (!encBodyObj.contentLength) {
            headers[core_1.HTTP.HeaderKey.transferEncoding] = core_1.HTTP.HeaderValue.chunked;
        }
        let unsecuredConn = requestServer.unsecured;
        rc.isDebug() && rc.debug(CLASS_NAME, `http${unsecuredConn ? '' : 's'} request headers.`, headers);
        const urlObj = {
            protocol: unsecuredConn ? core_1.HTTP.Const.protocolHttp : core_1.HTTP.Const.protocolHttps,
            hostname: requestServer.host,
            port: requestServer.port,
            pathname: `/${apiName}`
        };
        const options = {
            method: POST,
            protocol: unsecuredConn ? core_1.HTTP.Const.protocolHttp : core_1.HTTP.Const.protocolHttps,
            hostname: requestServer.host,
            port: requestServer.port,
            path: `/${apiName}`,
            headers: headers
        };
        return await request(rc, urlModule.format(urlObj), options, syncHash, encProvider, encBodyObj.streams, encBodyObj.dataStr, unsecuredConn);
    }
    ObopayHttpsClient.obopayApi = obopayApi;
    async function request(rc, url, options, serverPubKey, encProvider, writeStreams, dataStr, unsecured) {
        rc.isDebug() && rc.debug(CLASS_NAME, `${unsecured ? 'http' : 'https'} request to server.`, url, options);
        const req = unsecured ? http.request(url, options) : https.request(options), writePromise = new core_1.Mubble.uPromise(), readPromise = new core_1.Mubble.uPromise();
        writeStreams.push(req);
        req.on('response', (resp) => {
            rc.isDebug() && rc.debug(CLASS_NAME, `http${unsecured ? '' : 's'} response headers.`, resp.headers);
            if (!resp.headers[core_1.HTTP.HeaderKey.symmKey]) {
                const err = new Error(`${core_1.HTTP.HeaderKey.symmKey} missing in response headers.`);
                writePromise.reject(err);
                readPromise.reject(err);
                return;
            }
            if (!resp.headers[core_1.HTTP.HeaderKey.bodyEncoding])
                resp.headers[core_1.HTTP.HeaderKey.bodyEncoding] = core_1.HTTP.HeaderValue.identity;
            encProvider.decodeResponseKey(serverPubKey, resp.headers[core_1.HTTP.HeaderKey.symmKey]);
            const readStreams = encProvider.decodeBody([resp], resp.headers[core_1.HTTP.HeaderKey.bodyEncoding], true);
            const readUstream = new util_1.UStream.ReadStreams(rc, readStreams, readPromise);
            readUstream.read();
        });
        req.on('error', (err) => {
            rc.isError() && rc.error(CLASS_NAME, `http${unsecured ? '' : 's'} request error.`, err);
            writePromise.reject(err);
            readPromise.reject(err);
        });
        const writeUstream = new util_1.UStream.WriteStreams(rc, writeStreams, writePromise);
        writeUstream.write(dataStr);
        rc.isStatus() && rc.status(CLASS_NAME, `http${unsecured ? '' : 's'} request.`, options);
        const [, output] = await Promise.all([writePromise.promise,
            readPromise.promise]);
        rc.isStatus() && rc.status(CLASS_NAME, `http${unsecured ? '' : 's'} response.`, output.toString());
        const result = JSON.parse(output.toString());
        return result;
    }
    ObopayHttpsClient.request = request;
    function getEncProvider() {
        return new https_enc_provider_1.HttpsEncProvider(privateKey);
    }
    ObopayHttpsClient.getEncProvider = getEncProvider;
    function verifyClientRequest(rc, clientId, version, encProvider, headers, clientIp) {
        rc.isDebug() && rc.debug(CLASS_NAME, 'Verifying client request headers.', headers, clientIp);
        if (!headers[core_1.HTTP.HeaderKey.symmKey]) {
            throw new Error(`${core_1.HTTP.HeaderKey.symmKey} missing in request headers.`);
        }
        encProvider.decodeRequestKey(headers[core_1.HTTP.HeaderKey.symmKey]);
        const clientCredentials = credentialRegistry.getCredential(clientId);
        if (clientCredentials && clientCredentials.syncHash) {
            if (!ObopayHttpsClient.verifyVersion(version)) {
                throw new core_1.Mubble.uError(security_errors_1.SecurityErrorCodes.INVALID_VERSION, 'Invalid protocol version : ' + version);
            }
            if (!ObopayHttpsClient.verifyClientId(clientId)) {
                throw new core_1.Mubble.uError(security_errors_1.SecurityErrorCodes.INVALID_CLIENT, 'Invalid clientId ' + clientId);
            }
            if (!verifyIp(lo.cloneDeep(clientCredentials.permittedIps), clientIp)) {
                throw new core_1.Mubble.uError(security_errors_1.SecurityErrorCodes.INVALID_CLIENT, `Client IP not permitted: ${clientIp}`);
            }
            if (!headers[core_1.HTTP.HeaderKey.bodyEncoding])
                headers[core_1.HTTP.HeaderKey.bodyEncoding] = core_1.HTTP.HeaderValue.identity;
            const requestTs = encProvider.decodeRequestTs(clientCredentials.syncHash, headers[core_1.HTTP.HeaderKey.requestTs]);
            rc.isDebug() && rc.debug(CLASS_NAME, 'requestTs', requestTs);
            if (!verifyRequestTs(requestTs)) {
                throw new core_1.Mubble.uError(security_errors_1.SecurityErrorCodes.INVALID_REQUEST_TS, 'requestTs out of range.');
            }
            return true;
        }
        throw new core_1.Mubble.uError(security_errors_1.SecurityErrorCodes.INVALID_CLIENT, 'Client not found in registry.');
    }
    ObopayHttpsClient.verifyClientRequest = verifyClientRequest;
    function verifyClientId(clientId) {
        const clientCredentials = credentialRegistry.getCredential(clientId);
        return !!clientCredentials;
    }
    ObopayHttpsClient.verifyClientId = verifyClientId;
    function verifyIp(permittedIps, ip) {
        if (!permittedIps || !permittedIps.length)
            return true;
        permittedIps.forEach((permittedIp) => permittedIps.push('::ffff:' + permittedIp));
        return lo.includes(permittedIps, ip);
    }
    ObopayHttpsClient.verifyIp = verifyIp;
    function verifyVersion(version) {
        return version === core_1.HTTP.CurrentProtocolVersion;
    }
    ObopayHttpsClient.verifyVersion = verifyVersion;
    function verifyModule(module, apiName) {
        // TODO : Add module and apiName check
        return true;
    }
    ObopayHttpsClient.verifyModule = verifyModule;
    function verifyRequestTs(requestTs) {
        const serverTsMicro = Date.now() * 1000;
        return (serverTsMicro + REQUEST_TS_RANGE) > requestTs
            && (serverTsMicro - REQUEST_TS_RANGE) < requestTs;
    }
    ObopayHttpsClient.verifyRequestTs = verifyRequestTs;
    async function addRequestToMemory(xObopayTs, xObopayCid, apiName, messageBody) {
        const key = xObopayTs + PIPE_SEP +
            xObopayCid + PIPE_SEP +
            apiName + PIPE_SEP +
            messageBody, replay = await verifyRequestReplay(key);
        if (replay)
            throw new core_1.Mubble.uError(security_errors_1.SecurityErrorCodes.REQUEST_REPLAY, 'Replay attack ???');
        const multi = requestMem.redisMulti();
        multi.set(key, Date.now());
        multi.expire(key, REQUEST_EXPIRY_SECS);
        await requestMem.execRedisMulti(multi);
    }
    ObopayHttpsClient.addRequestToMemory = addRequestToMemory;
    // Verifies request-replay, returns true for replay attacks.
    async function verifyRequestReplay(requestKey) {
        const exists = await requestMem.redisCommand().exists(requestKey);
        return exists;
    }
    ObopayHttpsClient.verifyRequestReplay = verifyRequestReplay;
    function getThirdPartyRequestUrl(rc, credentials, apiName, apiParams, unsecured) {
        const encProvider = getEncProvider(), requestPath = encProvider.encodeThirdPartyRequestPath(apiParams), encRequestPath = encodeURIComponent(requestPath), urlObj = {
            protocol: unsecured ? core_1.HTTP.Const.protocolHttp : core_1.HTTP.Const.protocolHttps,
            hostname: credentials.host,
            port: credentials.port,
            pathname: `/${ObopayHttpsClient.OBOPAY_STR}/${apiName}/${encRequestPath}`
        }, url = urlModule.format(urlObj);
        rc.isStatus() && rc.status(CLASS_NAME, 'getThirdPartyRequestUrl', url);
        return url;
    }
    ObopayHttpsClient.getThirdPartyRequestUrl = getThirdPartyRequestUrl;
})(ObopayHttpsClient = exports.ObopayHttpsClient || (exports.ObopayHttpsClient = {}));
//# sourceMappingURL=obopay-https-client.js.map