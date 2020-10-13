"use strict";
/*------------------------------------------------------------------------------
   About      : Obopay Wss Client
   
   Created on : Fri Jan 04 2019
   Author     : Vishal Sinha
   
   Copyright (c) 2019 Obopay Mobile Technologies Pvt Ltd. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObopayWssClient = exports.HANDSHAKE = void 0;
const core_1 = require("@mubble/core");
const wss_enc_provider_1 = require("./wss-enc-provider");
const wss_client_1 = require("./wss-client");
exports.HANDSHAKE = '__handshake__';
var ObopayWssClient;
(function (ObopayWssClient) {
    const CLASS_NAME = 'ObopayWssClient';
    let selfId, defaultConfig, serverRegistry, appRegistry, privateKey, wssClient;
    function init(rc, selfIdentifier, wssConfig, aRegistry, sRegistry, pk) {
        rc.isDebug() && rc.debug(CLASS_NAME, 'Initializing ObopayWssClient.');
        if (selfId)
            throw new Error('Calling init twice.');
        selfId = selfIdentifier;
        defaultConfig = wssConfig;
        appRegistry = aRegistry;
        serverRegistry = sRegistry;
        privateKey = pk;
        Object.freeze(defaultConfig); // Default wss config cannot change
    }
    ObopayWssClient.init = init;
    async function obopayApi(rc, serverId, apiName, params, custom, unsecured) {
        rc.isStatus() && rc.status(CLASS_NAME, 'obopayApi', serverId, apiName, params);
        if (!selfId && !defaultConfig && !serverRegistry && !privateKey) {
            throw new Error('ObopayWssClient not initialized.');
        }
        custom = custom || {};
        if (!wssClient) {
            const wsConfig = {
                maxOpenSecs: defaultConfig.maxOpenSecs,
                pingSecs: defaultConfig.pingSecs,
                toleranceSecs: defaultConfig.toleranceSecs,
                custom: custom
            }, requestServer = serverRegistry.getCredential(serverId);
            if (!requestServer || !requestServer.syncHash || !requestServer.host || !requestServer.port)
                throw new Error('requestServer not defined.');
            wssClient = new wss_client_1.WssClient(rc, requestServer, wsConfig, selfId, unsecured);
        }
        return await wssClient.sendRequest(rc, apiName, params);
    }
    ObopayWssClient.obopayApi = obopayApi;
    function closeConnection(rc) {
        rc.isStatus() && rc.status(CLASS_NAME, 'closeConnection');
        wssClient.closeConnection(rc);
        wssClient = null;
    }
    ObopayWssClient.closeConnection = closeConnection;
    function getWssConfig(incomingConfig, encProvider) {
        // TODO : Logic for pingSecs, maxOpenSecs and toleranceSecs
        const wssConfig = {};
        wssConfig.pingSecs = incomingConfig.pingSecs < defaultConfig.pingSecs
            ? incomingConfig.pingSecs
            : defaultConfig.pingSecs;
        wssConfig.maxOpenSecs = incomingConfig.maxOpenSecs < defaultConfig.pingSecs
            ? incomingConfig.maxOpenSecs
            : defaultConfig.maxOpenSecs;
        wssConfig.toleranceSecs = incomingConfig.toleranceSecs;
        wssConfig.key = encProvider.getRespAesKey();
        wssConfig.custom = incomingConfig.custom;
        return wssConfig;
    }
    ObopayWssClient.getWssConfig = getWssConfig;
    function getEncProvider() {
        if (!privateKey)
            throw new Error('ObopayWssClient not initialized.');
        return new wss_enc_provider_1.WssEncProvider(privateKey);
    }
    ObopayWssClient.getEncProvider = getEncProvider;
    function verifyClientRequest(rc, version, clientId) {
        rc.isDebug() && rc.debug(CLASS_NAME, 'Verifying client request.', `version : ${version}, clientId : ${clientId}`);
        if (!verifyVersion(version))
            throw new Error(`Unknown version ${version}.`);
        if (!verifyClientId(clientId))
            throw new Error(`Unknown clientId ${clientId}.`);
        return isAppClient(clientId);
    }
    ObopayWssClient.verifyClientRequest = verifyClientRequest;
    function verifyVersion(version) {
        return version === core_1.HTTP.CurrentProtocolVersion;
    }
    ObopayWssClient.verifyVersion = verifyVersion;
    function verifyClientId(clientId) {
        return (isAppClient(clientId) || isServerClient(clientId));
    }
    ObopayWssClient.verifyClientId = verifyClientId;
    function isAppClient(clientId) {
        const record = appRegistry.getCredential(clientId);
        return !!(record && record.appShortName);
    }
    ObopayWssClient.isAppClient = isAppClient;
    function isServerClient(clientId) {
        const record = serverRegistry.getCredential(clientId);
        return !!(record && record.id);
    }
    ObopayWssClient.isServerClient = isServerClient;
    function getClientPublicKey(clientId) {
        const record = serverRegistry.getCredential(clientId);
        if (!record || !record.syncHash)
            throw new Error(`Client ${clientId} doesn't have a public key in registry.`);
        return record.syncHash;
    }
    ObopayWssClient.getClientPublicKey = getClientPublicKey;
    // export function verifyRequestTs(requestTs     : number,
    //                                 lastRequestTs : number,
    //                                 wssConfig     : WssProviderConfig) : boolean {
    //   const toleranceMicroS = wssConfig.toleranceSecs * MICRO_MULT,
    //         pingThreshold   = lastRequestTs + (wssConfig.pingSecs * MICRO_MULT) + toleranceMicroS,
    //         openThreshold   = maxOpenTs - toleranceMicroS
    //   return (requestTs < pingThreshold && requestTs < openThreshold)
    // }
})(ObopayWssClient = exports.ObopayWssClient || (exports.ObopayWssClient = {}));
//# sourceMappingURL=obopay-wss-client.js.map