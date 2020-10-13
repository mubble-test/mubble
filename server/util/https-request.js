"use strict";
/*------------------------------------------------------------------------------
   About      : Https utils
   
   Created on : Thu Mar 05 2020
   Author     : Yatharth Patel
   
   Copyright (c) 2020 Obopay. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpsRequest = void 0;
const core_1 = require("@mubble/core");
const _1 = require(".");
const http = require("http");
const https = require("https");
const winston = require("winston");
const url = require("url");
const zlib = require("zlib");
const DailyRotateFile = require("winston-daily-rotate-file");
const lo = require("lodash");
const path = require("path");
const fs = require("fs");
const STRING_TYPE = 'string', OBJECT_TYPE = 'object', DEFAULT_TIMEOUT_MS = 60000, ECONNRESET = 'ECONNRESET', NO_EXTRA_LOG_INFO = 'NO_EXTRA_LOG_INFO', DATE_TIME_FORMAT = '%dd%/%mm%/%yyyy% %hh%:%nn%:%ss%.%ms%';
var LOG_ID;
(function (LOG_ID) {
    LOG_ID["REQUEST"] = "REQUEST";
    LOG_ID["RESPONSE"] = "RESPONSE";
    LOG_ID["TIMEOUT"] = "TIMEOUT";
    LOG_ID["ERROR"] = "ERROR";
})(LOG_ID || (LOG_ID = {}));
class HttpsRequest {
    /**
     * Creates HttpsRequest.
     * @param rc RunContext, used for logging.
     * @param logBaseDir Directory path for http(s) logger.
     * @param hostname Hostname for http(s) logger.
     */
    constructor(rc, logBaseDir, hostname) {
        this.hostname = hostname;
        rc.isDebug() && rc.debug(rc.getName(this), 'Constructing HttpsRequest.');
        this.logPath = logBaseDir;
        this.hostname = hostname.replace(/\./g, '-');
        this.createLogger();
    }
    /**
     * Function to execute http(s) request.
     * @param rc RunContext, used for logging.
     * @param urlObj URL object for http(s) request.
     * @param options Options for http(s) request.
     * @param data Request payload.
     * @param extraLogInfo Any extra info for http(s) logger.
     */
    async executeRequest(rc, urlObj, options, data, extraLogInfo) {
        const requestId = `req-${lo.random(100000, 999999, false)}`;
        rc.isDebug() && rc.debug(rc.getName(this), requestId, 'executeHttpRequest', urlObj, options, data);
        const request = {}, start = Date.now(), reqOptions = options ? options : urlObj, dataStr = data
            ? typeof data === STRING_TYPE ? data
                : JSON.stringify(data)
            : '';
        const extraLogInfoStr = extraLogInfo ? extraLogInfo : NO_EXTRA_LOG_INFO;
        request.options = reqOptions;
        request.data = dataStr;
        if (!reqOptions.headers)
            reqOptions.headers = {};
        if (dataStr && !reqOptions.headers[core_1.HTTP.HeaderKey.contentLength]) {
            reqOptions.headers[core_1.HTTP.HeaderKey.contentLength] = dataStr.length;
        }
        if (data && typeof data === OBJECT_TYPE && !reqOptions.headers[core_1.HTTP.HeaderKey.contentType]) {
            reqOptions.headers[core_1.HTTP.HeaderKey.contentType] = core_1.HTTP.HeaderValue.json;
        }
        if (!reqOptions.timeout)
            reqOptions.timeout = DEFAULT_TIMEOUT_MS;
        const urlStr = url.format(urlObj), resp = {};
        request.url = urlStr;
        rc.isStatus() && rc.status(rc.getName(this), requestId, 'http(s) request.', urlStr, reqOptions, dataStr);
        this.log(requestId, LOG_ID.REQUEST, extraLogInfoStr, request);
        const req = reqOptions.protocol === core_1.HTTP.Const.protocolHttp
            ? http.request(urlStr, reqOptions)
            : https.request(urlStr, reqOptions), writePromise = new core_1.Mubble.uPromise(), readPromise = new core_1.Mubble.uPromise(), writeStreams = [], readStreams = [];
        writeStreams.push(req);
        req.on('response', (res) => {
            rc.isDebug() && rc.debug(rc.getName(this), requestId, 'http(s) response headers.', urlStr, res.statusCode, res.headers);
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
                }
            }
            const readUStream = new _1.UStream.ReadStreams(rc, readStreams, readPromise);
            readUStream.read();
        });
        req.on('error', (err) => {
            rc.isError() && rc.error(rc.getName(this), requestId, 'Error encountered in http(s) request.', err);
            const timeTakenMs = Date.now() - start;
            const errorResp = {
                timeTakenMs,
                error: err
            };
            const timeoutCond = err.code === ECONNRESET && reqOptions.timeout && timeTakenMs > reqOptions.timeout;
            if (!timeoutCond) {
                this.log(requestId, LOG_ID.ERROR, extraLogInfoStr, request, errorResp);
            }
            writePromise.reject(err);
            readPromise.reject(err);
        });
        req.on('timeout', () => {
            const timeTakenMs = Date.now() - start;
            rc.isError() && rc.error(rc.getName(this), requestId, 'http(s) request timed out.', reqOptions.timeout, timeTakenMs);
            const timeout = {
                timeTakenMs,
                timeoutMs: reqOptions.timeout || DEFAULT_TIMEOUT_MS
            };
            this.log(requestId, LOG_ID.TIMEOUT, extraLogInfoStr, request, timeout);
            req.abort();
        });
        const writeUStream = new _1.UStream.WriteStreams(rc, writeStreams, writePromise);
        writeUStream.write(dataStr);
        const [, output] = await Promise.all([writePromise.promise, readPromise.promise]);
        resp.response = output.toString();
        resp.timeTakenMs = Date.now() - start;
        rc.isStatus() && rc.status(rc.getName(this), requestId, 'http(s) request response.', urlStr, resp.response);
        this.log(requestId, LOG_ID.RESPONSE, extraLogInfoStr, request, resp);
        return resp;
    }
    /**
     * Function to extract results from log files. The request time and response time will be in UTC.
     * @param rc RunContext, used for logging.
     * @param fromTs Start timestamp to fetch results from.
     * @param toTs End timestamp to fetch results upto.
     */
    extractResults(rc, fromTs, toTs) {
        const finalLinesArr = [];
        let ts = fromTs, prevFilePath = '';
        while (ts <= toTs) {
            const fileDate = core_1.format(ts, '%yyyy%-%mm%-%dd%'), filePath = path.join(this.logPath, `${this.hostname}-${fileDate}.log`);
            if (filePath === prevFilePath) {
                break;
            }
            else {
                prevFilePath = filePath;
            }
            if (fs.existsSync(filePath)) {
                const dataFromFile = fs.readFileSync(filePath).toString();
                if (dataFromFile) {
                    dataFromFile.trim().split('\n').map(line => {
                        const wordsArr = line.split(' '), dateArr = wordsArr.shift().split('/'), timeArr = wordsArr.shift().split(':'), msecArr = timeArr[2].split('.'), timestamp = new Date(Number(dateArr[2]), Number(dateArr[1]) - 1, Number(dateArr[0]), Number(timeArr[0]), Number(timeArr[1]), Number(msecArr[0]), Number(msecArr[1])).getTime();
                        if (timestamp >= fromTs && timestamp <= toTs) {
                            finalLinesArr.push(line);
                        }
                    });
                }
            }
            if (ts === toTs)
                break;
            ts += 24 * 3600 * 1000;
            if (ts > toTs)
                ts = toTs;
        }
        rc.isDebug() && rc.debug(rc.getName(this), 'extractResults', 'Converting lines to rows.', finalLinesArr.length);
        const rowsArr = this.convertLinesToRows(finalLinesArr), rows = lo.groupBy(rowsArr, 'requestId'), requestIds = Object.keys(rows), logResults = [];
        for (const requestId of requestIds) {
            const row = rows[requestId];
            try {
                const logResult = this.convertToLogResult(requestId, row);
                logResults.push(logResult);
            }
            catch (e) {
                rc.isWarn() && rc.warn(rc.getName(this), 'Error in converting to log result. Not pushing in array', row, e);
            }
        }
        return logResults;
    }
    /*------------------------------------------------------------------------------
                              PRIVATE FUNCTIONS
    ------------------------------------------------------------------------------*/
    createLogger() {
        const logFormat = winston.format.combine(winston.format.splat(), winston.format.printf(info => `${info.message}`)), transport = new DailyRotateFile({
            dirname: this.logPath,
            filename: `${this.hostname}-%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            level: 'info',
            json: true,
            utc: true
        });
        this.logger = winston.createLogger({
            format: logFormat,
            transports: transport
        });
    }
    log(requestId, logId, extraLogInfo, request, otherObj) {
        if (otherObj) {
            this.logger.info('%s %s %s %s %s %s', core_1.format(Date.now(), DATE_TIME_FORMAT, 0), requestId, logId, extraLogInfo, JSON.stringify(request), JSON.stringify(otherObj));
        }
        else {
            this.logger.info('%s %s %s %s %s', core_1.format(Date.now(), DATE_TIME_FORMAT, 0), requestId, logId, extraLogInfo, JSON.stringify(request));
        }
    }
    convertLinesToRows(linesArr) {
        const requestIdMap = {}, rowsArr = [];
        for (const line of linesArr) {
            const words = line.split(' '), date = words.shift(), time = words.shift(), requestId = words.shift(), logId = words.shift(), restOfTheLog = words.join(' '), restOfTheWords = restOfTheLog.split(' {'), extraLogInfo = restOfTheWords.shift(), objsStr = '{' + restOfTheWords.join(' {');
            if (logId === LOG_ID.REQUEST) {
                let reqId = requestId + this.getDoubleDigits(0);
                for (let i = 1; i < 100; i++) {
                    if (requestIdMap[reqId] === undefined) {
                        break;
                    }
                    reqId = requestId + this.getDoubleDigits(i);
                }
                requestIdMap[reqId] = false;
                const logData = {
                    date,
                    time,
                    requestId: reqId,
                    logId,
                    extraLogInfo: extraLogInfo === NO_EXTRA_LOG_INFO ? undefined : extraLogInfo,
                    requestObj: JSON.parse(objsStr.trim())
                };
                rowsArr.push(logData);
                continue;
            }
            const regex = /\{.*\}\ /g, found = objsStr.match(regex);
            if (found) {
                let reqId = requestId + this.getDoubleDigits(0);
                for (let i = 1; i < 100; i++) {
                    if (requestIdMap[reqId] === false) {
                        const requestObj = JSON.parse(found[0].trim()), otherObj = JSON.parse(objsStr.split(found[0])[1]);
                        const logData = {
                            date,
                            time,
                            requestId: reqId,
                            logId,
                            extraLogInfo,
                            requestObj,
                            otherObj
                        };
                        rowsArr.push(logData);
                        requestIdMap[reqId] = true;
                    }
                    reqId = requestId + this.getDoubleDigits(i);
                }
            }
        }
        return rowsArr;
    }
    convertToLogResult(requestId, arr) {
        const requestLogData = arr.find((ld) => ld.logId === LOG_ID.REQUEST);
        if (!requestLogData) {
            throw new Error(`Request log not present for requestId ${requestId}.`);
        }
        const logResult = {
            requestId,
            requestTs: this.convertDateTimeToTs(requestLogData.date, requestLogData.time),
            url: requestLogData.requestObj.url,
            requestTimeoutTs: requestLogData.requestObj.options.timeout || DEFAULT_TIMEOUT_MS,
            requestHeaders: requestLogData.requestObj.options.headers,
            payload: requestLogData.requestObj.data,
            timeTakenMs: 0,
            extraLogInfo: requestLogData.extraLogInfo
        };
        const respLogData = arr.find((ld) => ld.logId === LOG_ID.RESPONSE);
        if (respLogData && respLogData.otherObj) {
            const responseObj = respLogData.otherObj;
            logResult.timeTakenMs = responseObj.timeTakenMs;
            logResult.responseTs = this.convertDateTimeToTs(respLogData.date, respLogData.time);
            logResult.status = responseObj.statusCode;
            logResult.responseHeaders = responseObj.headers;
            logResult.response = responseObj.response;
        }
        const timeoutLogData = arr.find((ld) => ld.logId === LOG_ID.TIMEOUT);
        if (timeoutLogData && timeoutLogData.otherObj) {
            const timeoutObj = timeoutLogData.otherObj;
            logResult.timeTakenMs = timeoutObj.timeTakenMs;
            logResult.timedOut = true;
        }
        const errorLogData = arr.find((ld) => ld.logId === LOG_ID.ERROR);
        if (errorLogData && errorLogData.otherObj) {
            const errObj = errorLogData.otherObj;
            logResult.timeTakenMs = errObj.timeTakenMs;
            logResult.error = errObj.error;
        }
        return logResult;
    }
    convertDateTimeToTs(date, time) {
        const [dd, mm, yyyy] = date.split('/'), dtStr = [yyyy, mm, dd].join('-');
        return new Date(dtStr + 'T' + time).getTime();
    }
    getDoubleDigits(no) {
        if (no < 10)
            return '0' + no;
        return no.toString();
    }
}
exports.HttpsRequest = HttpsRequest;
//# sourceMappingURL=https-request.js.map