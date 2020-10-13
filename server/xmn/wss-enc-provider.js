"use strict";
/*------------------------------------------------------------------------------
   About      : Encryption-decryption provider for wss server
   
   Created on : Fri Jan 04 2019
   Author     : Vishal Sinha
   
   Copyright (c) 2019 Obopay Mobile Technologies Pvt Ltd. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.WssEncProvider = void 0;
const core_1 = require("@mubble/core");
const crypto = require("crypto");
const zlib = require("zlib");
const BASE64 = 'base64', SYM_ALGO = 'aes-256-cbc', IV = Buffer.from([0x01, 0x00, 0x03, 0x00, 0x01, 0x00, 0x00, 0x00,
    0x01, 0x00, 0x09, 0x00, 0x07, 0x00, 0x00, 0x00]), TS_LEN = 44, REQ_KEY_LEN = 344;
class WssEncProvider {
    constructor(privateKey) {
        this.privateKey = privateKey;
    }
    getRespAesKey() {
        if (!this.respAesKey)
            this.respAesKey = this.getNewAesKey();
        return this.respAesKey.toString(BASE64);
    }
    encodeRequestUrl(tsMicro, wssConfig, publicKey) {
        if (!this.reqAesKey)
            this.reqAesKey = this.getNewAesKey();
        const encTsMicroBuf = this.encryptUsingPrivateKey(Buffer.from(tsMicro.toString())), encReqKeyBuf = this.encryptUsingPublicKey(this.reqAesKey, publicKey), encWssConfigBuf = this.encryptRequestConfig(wssConfig), encTsMicro = encTsMicroBuf.toString(BASE64), encReqKey = encReqKeyBuf.toString(BASE64), encWssConfig = encWssConfigBuf.toString(BASE64);
        return `${encTsMicro}${encReqKey}${encWssConfig}`;
    }
    decodeRequestUrl(encData, publicKey) {
        const tsLen = publicKey ? REQ_KEY_LEN : TS_LEN, encTsMicro = encData.slice(0, tsLen), encReqKey = encData.slice(tsLen, tsLen + REQ_KEY_LEN), encWssConfig = encData.slice(tsLen + REQ_KEY_LEN), encTsMicroBuf = Buffer.from(encTsMicro, BASE64), encReqKeyBuf = Buffer.from(encReqKey, BASE64), encWssConfigBuf = Buffer.from(encWssConfig, BASE64);
        this.reqAesKey = this.decryptyUsingPrivateKey(encReqKeyBuf);
        const wssConfig = this.decryptRequestConfig(encWssConfigBuf);
        let tsMicro;
        if (publicKey) {
            tsMicro = Number(this.decryptUsingPublicKey(encTsMicroBuf, publicKey).toString());
        }
        else {
            tsMicro = Number(this.decryptUsingAesKey(this.reqAesKey, encTsMicroBuf).toString());
        }
        return { tsMicro, wssConfig };
    }
    async encodeHandshakeMessage(wo) {
        const woStr = wo.stringify();
        let leader = core_1.DataLeader.ENC_JSON, dataBuf = Buffer.from(woStr);
        if (woStr.length > core_1.Encoder.MIN_SIZE_TO_COMPRESS) {
            dataBuf = await core_1.Mubble.uPromise.execFn(zlib.deflate, zlib, woStr);
            leader = core_1.DataLeader.ENC_DEF_JSON;
        }
        const encDataBuf = this.encryptUsingAesKey(this.reqAesKey, dataBuf), leaderBuf = Buffer.from([leader]), totalBuf = Buffer.concat([leaderBuf, encDataBuf]);
        return totalBuf;
    }
    async decodeHandshakeMessage(totalBuf) {
        const leaderBuf = totalBuf.slice(0, 1), encDataBuf = totalBuf.slice(1), leader = leaderBuf[0];
        let dataBuf = this.decryptUsingAesKey(this.reqAesKey, encDataBuf);
        if (leader === core_1.DataLeader.ENC_DEF_JSON) {
            dataBuf = await core_1.Mubble.uPromise.execFn(zlib.inflate, zlib, encDataBuf);
        }
        const woStr = dataBuf.toString(), wo = JSON.parse(woStr);
        this.respAesKey = Buffer.from(wo.data.key, BASE64);
        return wo;
    }
    async encodeBody(woArr, app) {
        const dataStr = app ? this.stringifyWireObjects(woArr) : JSON.stringify(woArr);
        let leader = core_1.DataLeader.ENC_JSON, dataBuf = Buffer.from(dataStr);
        if (dataStr.length >= core_1.Encoder.MIN_SIZE_TO_COMPRESS) {
            dataBuf = await core_1.Mubble.uPromise.execFn(zlib.deflate, zlib, dataStr);
            leader = core_1.DataLeader.ENC_DEF_JSON;
        }
        const encDataBuf = this.encryptUsingAesKey(this.respAesKey, dataBuf), leaderBuf = Buffer.from([leader]), totalBuf = Buffer.concat([leaderBuf, encDataBuf]);
        return totalBuf;
    }
    async decodeBody(totalBuf, app) {
        const leaderBuf = totalBuf.slice(0, 1), leader = [...leaderBuf][0];
        let dataBuf = totalBuf.slice(1);
        switch (leader) {
            case core_1.DataLeader.ENC_DEF_JSON:
                dataBuf = this.decryptUsingAesKey(this.respAesKey, dataBuf);
            case core_1.DataLeader.DEF_JSON:
                dataBuf = await core_1.Mubble.uPromise.execFn(zlib.inflate, zlib, dataBuf);
                break;
            case core_1.DataLeader.ENC_JSON:
                dataBuf = this.decryptUsingAesKey(this.respAesKey, dataBuf);
                break;
        }
        const dataStr = dataBuf.toString(), woArr = app ? this.parseWireObjectsString(dataStr) : JSON.parse(dataStr);
        return woArr;
    }
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
       PRIVATE METHODS
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    encryptRequestConfig(wssConfig) {
        const wssConfigStr = JSON.stringify(wssConfig), wssConfigBuf = Buffer.from(wssConfigStr), encWssConfig = this.encryptUsingAesKey(this.reqAesKey, wssConfigBuf);
        return encWssConfig;
    }
    decryptRequestConfig(encWssConfig) {
        const wssConfigBuf = this.decryptUsingAesKey(this.reqAesKey, encWssConfig), wssConfigStr = wssConfigBuf.toString(), wssConfig = JSON.parse(wssConfigStr);
        return wssConfig;
    }
    encryptUsingPrivateKey(data) {
        const encData = crypto.privateEncrypt(this.privateKey, data);
        return encData;
    }
    decryptyUsingPrivateKey(encData) {
        const data = crypto.privateDecrypt(this.privateKey, encData);
        return data;
    }
    encryptUsingPublicKey(data, publicKey) {
        const encDataBuf = crypto.publicEncrypt(publicKey, data);
        return encDataBuf;
    }
    decryptUsingPublicKey(encData, publicKey) {
        const data = crypto.publicDecrypt(publicKey, encData);
        return data;
    }
    encryptUsingAesKey(key, data) {
        const cipher = crypto.createCipheriv(SYM_ALGO, key, IV), buff1 = cipher.update(data), buff2 = cipher.final();
        return buff2.length ? Buffer.concat([buff1, buff2]) : buff1;
    }
    decryptUsingAesKey(key, encData) {
        const decipher = crypto.createDecipheriv(SYM_ALGO, key, IV), buff1 = decipher.update(encData), buff2 = decipher.final();
        return buff2.length ? Buffer.concat([buff1, buff2]) : buff1;
    }
    getNewAesKey() {
        const key = crypto.randomBytes(32);
        return key;
    }
    getLeader(compress, encrypt, binary) {
        const leader = binary ? encrypt ? core_1.DataLeader.ENC_BINARY
            : core_1.DataLeader.BINARY
            : compress ? encrypt ? core_1.DataLeader.ENC_DEF_JSON
                : core_1.DataLeader.DEF_JSON
                : encrypt ? core_1.DataLeader.ENC_JSON
                    : core_1.DataLeader.JSON;
        return leader;
    }
    encryptBinaryBody(data) {
        const dataBuf = Buffer.concat([Buffer.from(data.stringify() + '\n'), data.data]), encDataBuf = this.encryptUsingAesKey(this.respAesKey, dataBuf);
        return encDataBuf;
    }
    stringifyWireObjects(woArr) {
        const strArr = woArr.map(wo => wo.stringify()), str = JSON.stringify(strArr);
        return str;
    }
    parseWireObjectsString(str) {
        const inJson = JSON.parse(str), arData = Array.isArray(inJson) ? inJson : [inJson];
        return arData;
    }
}
exports.WssEncProvider = WssEncProvider;
//# sourceMappingURL=wss-enc-provider.js.map