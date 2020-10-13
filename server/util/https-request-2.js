"use strict";
/*------------------------------------------------------------------------------
   About      : Http & Https utils
   
   Created on : Tue May 23 2017
   Author     : Akash Dathan
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeHttpsRequestWithOptions = exports.httpRequest = exports.executeHttpResultResponse = exports.expandUrl = exports.executeHttpsWithOptions = exports.getStream = exports.executeHttpsRequest = void 0;
const core_1 = require("@mubble/core");
const _1 = require(".");
const https = require("https");
const http = require("http");
const zlib = require("zlib");
const url = require("url");
const request = require("request");
async function executeHttpsRequest(rc, urlStr, headers, encoding) {
    const traceId = 'executeHttpsRequest', ack = rc.startTraceSpan(traceId);
    try {
        return await new Promise((resolve, reject) => {
            const urlObj = url.parse(urlStr), httpObj = urlObj.protocol === 'https:' ? https : http;
            if (headers)
                urlObj.headers = headers;
            const req = httpObj.request(urlObj, (outputStream) => {
                outputStream.setEncoding(encoding || 'binary');
                switch (outputStream.headers['content-encoding']) {
                    case 'gzip':
                        outputStream = outputStream.pipe(zlib.createGunzip());
                        break;
                    case 'deflate':
                        outputStream = outputStream.pipe(zlib.createInflate());
                        break;
                }
                let response = '';
                outputStream.on('data', (chunk) => {
                    response += chunk;
                });
                outputStream.on('end', () => {
                    resolve(response);
                });
                outputStream.on('error', (err) => {
                    rc.isStatus() && rc.status(rc.getName(this), `Error : ${err}`);
                    reject(response);
                });
            });
            req.shouldKeepAlive = false;
            req.on('response', (res) => {
                const hostname = url.parse(urlStr).host;
                rc.isStatus() && rc.status(rc.getName(this), 'HTTP Response [' + hostname + '], Status Code: ' + res.statusCode, 'Content Length:', res.headers['content-length'], '/', res.headers['transfer-encoding']);
            });
            req.on('error', (err) => {
                rc.isStatus() && rc.status(rc.getName(this), err);
                if (err.errno && err.errno === 'ENOTFOUND')
                    return resolve(undefined);
                return reject(err);
            });
            req.end();
        });
    }
    finally {
        rc.endTraceSpan(traceId, ack);
    }
}
exports.executeHttpsRequest = executeHttpsRequest;
async function getStream(rc, urlStr, headers, encoding) {
    const traceId = 'executeHttpsRequest', ack = rc.startTraceSpan(traceId);
    try {
        return await new Promise((resolve, reject) => {
            const urlObj = url.parse(urlStr), httpObj = urlObj.protocol === 'https:' ? https : http;
            if (headers)
                urlObj.headers = headers;
            httpObj.request(urlObj, (outputStream) => {
                outputStream.setEncoding(encoding || 'binary');
                switch (outputStream.headers['content-encoding']) {
                    case 'gzip':
                        outputStream = outputStream.pipe(zlib.createGunzip());
                        break;
                    case 'deflate':
                        outputStream = outputStream.pipe(zlib.createInflate());
                        break;
                }
                resolve(outputStream);
            })
                .on('response', (res) => {
                const hostname = url.parse(urlStr).host;
                rc.isStatus() && rc.status(rc.getName(this), 'HTTP Response [' + hostname + '], Status Code: ' + res.statusCode, 'Content Length:', res.headers['content-length'], '/', res.headers['transfer-encoding']);
            })
                .on('error', (err) => {
                rc.isStatus() && rc.status(rc.getName(this), err);
                if (err.errno && err.errno === 'ENOTFOUND')
                    return resolve(undefined);
                return reject(err);
            })
                .end();
        });
    }
    finally {
        rc.endTraceSpan(traceId, ack);
    }
}
exports.getStream = getStream;
async function executeHttpsWithOptions(rc, urlObj, inputData) {
    const traceId = 'executeHttpsWithOptions', ack = rc.startTraceSpan(traceId);
    try {
        return await new Promise((resolve, reject) => {
            const httpObj = (urlObj.protocol === 'https:' || urlObj.port === '443') ? https : http;
            let statusCode = 200;
            if (inputData && !urlObj.headers['Content-Length'])
                urlObj.headers['Content-Length'] = Buffer.byteLength(inputData, 'utf8');
            if (httpObj === https)
                urlObj.agent = new https.Agent({ keepAlive: true });
            const req = httpObj.request(urlObj, (outputStream) => {
                switch (outputStream.headers['content-encoding']) {
                    case 'gzip':
                        outputStream = outputStream.pipe(zlib.createGunzip());
                        break;
                    case 'deflate':
                        outputStream = outputStream.pipe(zlib.createInflate());
                        break;
                }
                let response = '';
                outputStream.on('data', (chunk) => {
                    response += chunk;
                });
                outputStream.on('end', () => {
                    return resolve(response);
                });
                outputStream.on('error', (err) => {
                    rc.isStatus() && rc.status(rc.getName(this), `Error : ${err}`);
                    return reject(response);
                });
            });
            req.shouldKeepAlive = false;
            req.on('response', (res) => {
                rc.isStatus() && rc.status(rc.getName(this), 'HTTP Response [' + urlObj.host + '], Status Code: ' + res.statusCode);
                statusCode = res.statusCode;
            });
            req.on('error', (err) => {
                rc.isStatus() && rc.status(rc.getName(this), err);
                if (err.errno && err.errno === 'ENOTFOUND')
                    return resolve(undefined);
                return reject(err);
            });
            if (inputData)
                req.write(inputData);
            req.end();
        });
    }
    finally {
        rc.endTraceSpan(traceId, ack);
    }
}
exports.executeHttpsWithOptions = executeHttpsWithOptions;
async function expandUrl(rc, shortUrl) {
    const traceId = 'expandUrl', ack = rc.startTraceSpan(traceId), options = {
        headers: { 'User-Agent': 'Newschat/1.0' },
        method: "HEAD",
        url: shortUrl,
        followAllRedirects: true
    };
    try {
        return await new Promise((resolve, reject) => {
            request(options, (error, response) => {
                if (error)
                    reject(error);
                if (response && response.request) {
                    rc.isDebug() && rc.debug(rc.getName(this), `Expanded URL: ${response.request.href}`);
                    resolve(response.request.href);
                }
                else {
                    if (!response)
                        reject('No Response, No Error');
                    reject(response);
                }
            });
        });
    }
    catch (err) {
        rc.isWarn() && rc.warn(rc.getName(this), `Expanding URL Failed. Url: ${shortUrl}, Error: ${err}`);
        return;
    }
    finally {
        rc.endTraceSpan(traceId, ack);
    }
}
exports.expandUrl = expandUrl;
/**
 * This is recommended to be used for https request.
 * returns {error: string | undefined, statusCode: number | undefined, data: any}
 *
 * Caller has to process this result as per their need
 *
 * Execute http and return result data as well as response code.
 * Drupal SEO server data sync request fails with # 200 status code and error msg
 */
async function executeHttpResultResponse(rc, options, inputData, encoding) {
    let response;
    if (inputData && options.headers && !options.headers['Content-Length'])
        options.headers['Content-Length'] = Buffer.byteLength(inputData, 'utf-8');
    const traceId = 'executeHttpResultResponse', ack = rc.startTraceSpan(traceId);
    try {
        return await new Promise((resolve, reject) => {
            const httpObj = options.protocol === 'http:' ? http : https;
            const req = httpObj.request(options, (outputStream) => {
                switch (outputStream.headers['content-encoding']) {
                    case 'gzip':
                        outputStream = outputStream.pipe(zlib.createGunzip());
                        break;
                    case 'deflate':
                        outputStream = outputStream.pipe(zlib.createInflate());
                        break;
                }
                let data;
                outputStream.on('data', (chunk) => {
                    if (!data)
                        data = chunk;
                    else
                        data = Buffer.concat([data, chunk]);
                });
                outputStream.on('end', () => {
                    // If encoding is not defined . default is utf8
                    return resolve({ error: undefined, response: response, data: data.toString(encoding) });
                });
                outputStream.on('error', (err) => {
                    rc.isStatus() && rc.status(rc.getName(this), `Error : ${err}`);
                    return reject(response);
                });
            });
            req.shouldKeepAlive = false;
            req.on('response', (res) => {
                response = res;
            });
            req.on('error', (err) => {
                rc.isStatus() && rc.status(rc.getName(this), err);
                return resolve({ error: err, response: response, data: '' });
            });
            if (inputData)
                req.write(inputData);
            req.end();
        });
    }
    finally {
        rc.endTraceSpan(traceId, ack);
    }
}
exports.executeHttpResultResponse = executeHttpResultResponse;
async function httpRequest(rc, options) {
    const traceId = 'httpRequest', ack = rc.startTraceSpan(traceId);
    try {
        return await new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                resolve({ error: error, response: response, data: body });
            });
        });
    }
    finally {
        rc.endTraceSpan(traceId, ack);
    }
}
exports.httpRequest = httpRequest;
/**
 * http(s) request for passing http options along with url.
 * To pass query params, pass in urlObj.query as object.
 * To pass JSON, pass in data as JSON string.
 */
async function executeHttpsRequestWithOptions(rc, urlObj, options, data) {
    rc.isDebug() && rc.debug('executeHttpsRequestWithOptions', urlObj, options, data);
    const reqOptions = options ? options : urlObj;
    if (!reqOptions.headers)
        reqOptions.headers = {};
    if (data && !reqOptions.headers[core_1.HTTP.HeaderKey.contentLength]) {
        reqOptions.headers[core_1.HTTP.HeaderKey.contentLength] = data.length;
    }
    const urlStr = url.format(urlObj), resp = {};
    rc.isStatus() && rc.status('executeHttpsRequestWithOptions', 'http(s) request.', urlStr, reqOptions);
    const req = reqOptions.protocol === core_1.HTTP.Const.protocolHttp ? http.request(urlStr, reqOptions)
        : https.request(urlStr, reqOptions), writePromise = new core_1.Mubble.uPromise(), readPromise = new core_1.Mubble.uPromise(), writeStreams = [], readStreams = [];
    writeStreams.push(req);
    req.on('response', (res) => {
        rc.isDebug() && rc.debug('executeHttpsRequestWithOptions', 'Response headers.', urlStr, res.statusCode, res.headers);
        resp.statusCode = res.statusCode || 200;
        resp.headers = res.headers;
        readStreams.push(res);
        if (res.headers[core_1.HTTP.HeaderKey.contentEncoding]) {
            switch (res.headers[core_1.HTTP.HeaderKey.contentEncoding]) {
                case core_1.HTTP.HeaderValue.gzip:
                    readStreams.push(zlib.createGunzip());
                    break;
                case core_1.HTTP.HeaderValue.deflate:
                    readStreams.push(zlib.createInflate());
                    break;
            }
        }
        const readUStream = new _1.UStream.ReadStreams(rc, readStreams, readPromise);
        readUStream.read();
    });
    req.on('error', (err) => {
        rc.isError() && rc.error('executeHttpsRequestWithOptions', 'Error encountered in http(s) request.', err);
        writePromise.reject(err);
        readPromise.reject(err);
    });
    req.on('timeout', () => {
        rc.isError() && rc.error('executeHttpsRequestWithOptions', 'Request timed out.', reqOptions.timeout);
        req.abort();
    });
    const writeUStream = new _1.UStream.WriteStreams(rc, writeStreams, writePromise);
    data ? writeUStream.write(data) : writeUStream.write('');
    const [, output] = await Promise.all([writePromise.promise, readPromise.promise]);
    resp.response = output.toString();
    rc.isStatus() && rc.status('executeHttpsRequestWithOptions', 'http(s) request response.', urlStr, resp.response);
    return resp;
}
exports.executeHttpsRequestWithOptions = executeHttpsRequestWithOptions;
// example
async function testHttpRequest(rc) {
    const urlObj = {
        protocol: core_1.HTTP.Const.protocolHttp,
        hostname: 'localhost',
        port: 9003,
        pathname: '/obopay/serverEcho',
        query: { abc: 124, b: 'abc' }
    };
    const options = urlObj;
    options.method = core_1.HTTP.Method.POST;
    options.headers = { [core_1.HTTP.HeaderKey.contentType]: core_1.HTTP.HeaderValue.form };
    const resp = await executeHttpsRequestWithOptions(rc, urlObj, options);
    rc.isStatus() && rc.status(rc.getName(this), 'response', resp);
}
//# sourceMappingURL=https-request-2.js.map