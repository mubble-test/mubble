"use strict";
/*------------------------------------------------------------------------------
   About      : Encryption-decryption provider for https server
   
   Created on : Thu Dec 27 2018
   Author     : Vishal Sinha
   
   Copyright (c) 2018 Obopay Mobile Technologies Pvt Ltd. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpsEncProvider = void 0;
const core_1 = require("@mubble/core");
const security_errors_1 = require("./security-errors");
const crypto = require("crypto");
const zlib = require("zlib");
const SYM_ALGO = 'aes-256-cbc', IV = Buffer.from([0x01, 0x00, 0x03, 0x00, 0x01, 0x00, 0x00, 0x00,
    0x01, 0x00, 0x09, 0x00, 0x07, 0x00, 0x00, 0x00]), MIN_SIZE_TO_COMPRESS = 1000, AES_KEY_SIZE = 32, BASE64 = 'base64', SIXTEEN = 16;
class HttpsEncProvider {
    constructor(pk) {
        this.privateKey = pk;
    }
    encodeRequestKey(publicKey) {
        if (!this.reqAesKey)
            this.reqAesKey = this.getNewAesKey();
        const encKeyBuf = this.encryptUsingPublicKey(publicKey, this.reqAesKey), encKey = encKeyBuf.toString(BASE64);
        return encKey;
    }
    decodeRequestKey(encKey) {
        const encKeyBuf = Buffer.from(encKey, BASE64);
        this.reqAesKey = this.decryptUsingPrivateKey(encKeyBuf);
        return this.reqAesKey;
    }
    encodeRequestTs(ts) {
        const encReqTs = this.encryptRequestTs(ts);
        return encReqTs;
    }
    decodeRequestTs(publicKey, encReqTs) {
        const requestTs = this.decryptRequestTs(publicKey, encReqTs);
        return requestTs;
    }
    encodeBody(data, response) {
        return this.encryptBody(data, response);
    }
    decodeBody(streams, encoding, response) {
        return this.decryptBody(streams, encoding, response);
    }
    encodeResponseKey() {
        if (!this.respAesKey)
            this.respAesKey = this.getNewAesKey();
        const encKeyBufTemp = this.encryptUsingReqAesKey(this.respAesKey), encKeyBufFin = this.encryptUsingPrivateKey(encKeyBufTemp), encKey = encKeyBufFin.toString(BASE64);
        return encKey;
    }
    decodeResponseKey(publicKey, encKey) {
        const encKeyBuf = Buffer.from(encKey, BASE64), decKey = this.decryptUsingPublicKey(publicKey, encKeyBuf);
        this.respAesKey = this.decryptUsingReqAesKey(decKey);
        return this.respAesKey;
    }
    encodeThirdPartyRequestPath(data) {
        return JSON.stringify(data);
    }
    decodeThirdPartyRequestPath(encDataStr) {
        return JSON.parse(encDataStr);
    }
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
       PRIVATE METHODS
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    encryptRequestTs(tsMicro) {
        const encReqTs = this.encryptUsingPrivateKey(Buffer.from(tsMicro.toString()));
        return encReqTs.toString(BASE64);
    }
    decryptRequestTs(publicKey, encReqTs) {
        const encReqTsBuf = Buffer.from(encReqTs, BASE64), reqTsBuf = this.decryptUsingPublicKey(publicKey, encReqTsBuf), requestTs = Number(reqTsBuf.toString());
        return requestTs;
    }
    encryptBody(json, response) {
        const jsonStr = JSON.stringify(json), streams = [];
        let bodyEncoding = core_1.HTTP.HeaderValue.identity, contentLength;
        if (jsonStr.length > MIN_SIZE_TO_COMPRESS) {
            bodyEncoding = core_1.HTTP.HeaderValue.deflate;
            streams.push(zlib.createDeflate());
        }
        else {
            contentLength = this.getFinalContentLength(jsonStr.length);
        }
        if (!this.reqAesKey)
            this.reqAesKey = this.getNewAesKey();
        if (!this.respAesKey)
            this.respAesKey = this.getNewAesKey();
        const key = response ? this.respAesKey : this.reqAesKey;
        streams.push(this.getCipher(key));
        return { streams, dataStr: jsonStr, bodyEncoding, contentLength };
    }
    decryptBody(streams, encoding, response) {
        const key = response ? this.respAesKey : this.reqAesKey, decipher = this.getDecipher(key);
        streams.push(decipher);
        switch (encoding) {
            case core_1.HTTP.HeaderValue.deflate:
                streams.push(zlib.createInflate());
                break;
            case core_1.HTTP.HeaderValue.gzip:
                streams.push(zlib.createGunzip());
                break;
            case core_1.HTTP.HeaderValue.identity:
                break;
            default:
                throw new core_1.Mubble.uError(security_errors_1.SecurityErrorCodes.INVALID_ENCODING, 'Unknown compression factor.');
        }
        return streams;
    }
    getNewAesKey() {
        const key = crypto.randomBytes(AES_KEY_SIZE);
        return key;
    }
    getCipher(key) {
        const cipher = crypto.createCipheriv(SYM_ALGO, key, IV);
        return cipher;
    }
    getDecipher(key) {
        const decipher = crypto.createDecipheriv(SYM_ALGO, key, IV);
        return decipher;
    }
    encryptUsingReqAesKey(data) {
        const cipher = this.getCipher(this.reqAesKey), buff1 = cipher.update(data), buff2 = cipher.final();
        return buff2.length ? Buffer.concat([buff1, buff2]) : buff1;
    }
    decryptUsingReqAesKey(encData) {
        const decipher = this.getDecipher(this.reqAesKey), buff1 = decipher.update(encData), buff2 = decipher.final();
        return buff2.length ? Buffer.concat([buff1, buff2]) : buff1;
    }
    getFinalContentLength(contentLength) {
        const rem = contentLength % SIXTEEN, finalLength = contentLength - rem + SIXTEEN;
        return finalLength;
    }
    encryptUsingPublicKey(publicKey, data) {
        const encData = crypto.publicEncrypt(publicKey, data);
        return encData;
    }
    decryptUsingPublicKey(publicKey, encData) {
        const data = crypto.publicDecrypt(publicKey, encData);
        return data;
    }
    encryptUsingPrivateKey(data) {
        const encData = crypto.privateEncrypt(this.privateKey, data);
        return encData;
    }
    decryptUsingPrivateKey(encData) {
        const data = crypto.privateDecrypt(this.privateKey, encData);
        return data;
    }
}
exports.HttpsEncProvider = HttpsEncProvider;
//# sourceMappingURL=https-enc-provider.js.map