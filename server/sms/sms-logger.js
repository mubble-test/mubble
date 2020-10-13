"use strict";
/*------------------------------------------------------------------------------
     About      : Logging and periodic archiving of information related to sms
     
     Created on : Mon Mar 02 2020
     Author     : Vedant Pandey
     
     Copyright (c) 2020 Obopay. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsLogger = void 0;
const request_1 = require("./request");
const bq_models_1 = require("./bq-models");
const sms_constants_1 = require("./sms-constants");
const lo = require("lodash");
class SmsLogger {
    constructor(rc, trRedis) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Initialize SMS logger.');
        this.trRedis = trRedis;
    }
    /**
     * Periodically logs the sms logs and pushes it to big query
     *
     * @param rc - Run context
     * @param service - The service currently using this module
     */
    async periodicSmsLogger(rc, service) {
        try {
            const refTime = Date.now() - (sms_constants_1.SmsConstants.SMS_LOGGER_MS + 1 * 60 * 1000), // 1 minute offset for safety
            userIds = await this.trRedis.rwZrangebyscore(sms_constants_1.SmsConstants.TREDIS_SMS_VERIFICATION_LOGS, refTime, '+inf', false, 0, sms_constants_1.SmsConstants.MAX_SMS_PER_ITERATION), keys = userIds.map(userId => service + sms_constants_1.SmsConstants.PIPE_SEPARATOR + userId), multi = this.trRedis.redisMulti(), smses = [];
            let unknown = 0, finished = 0, failed = 0;
            if (userIds.length) {
                const requestJSONs = await this.trRedis.redisCommand().hmget(sms_constants_1.SmsConstants.TREDIS_USER_REQUEST, ...keys);
                requestJSONs.forEach((requestJSON) => {
                    const request = JSON.parse(requestJSON);
                    if (request && request.gw) {
                        unknown++;
                        const smsLog = lo.cloneDeep(request);
                        delete smsLog.failedGw;
                        smsLog.status = sms_constants_1.SmsConstants.VERIFICATION_UNKNOWN;
                        smses.push(smsLog);
                    }
                });
                multi.hdel(sms_constants_1.SmsConstants.TREDIS_USER_REQUEST, ...keys);
                multi.zrem(sms_constants_1.SmsConstants.TREDIS_USER_SET, ...userIds);
                rc.isDebug() && rc.debug(rc.getName(this), `periodicSmsLogger,`, `Cleaning cache. Deleted user cache : ${userIds.length}.`);
            }
            const smsLogs = await this.trRedis.redisCommand().lrange(sms_constants_1.SmsConstants.TREDIS_SMS_VERIFICATION_LOGS, 0, sms_constants_1.SmsConstants.MAX_SMS_PER_ITERATION - 1);
            if (smsLogs.length) {
                smsLogs.forEach((smsData) => {
                    const smsLog = JSON.parse(smsData);
                    smses.push(smsLog);
                    if (smsLog.status === sms_constants_1.SmsConstants.VERIFICATION_UNKNOWN)
                        unknown++;
                    else if (smsLog.status === sms_constants_1.SmsConstants.VERIFICATION_SUCCESS)
                        finished++;
                    else if (smsLog.status === sms_constants_1.SmsConstants.VERIFICATION_FAILED)
                        failed++;
                });
                multi.ltrim(sms_constants_1.SmsConstants.TREDIS_SMS_VERIFICATION_LOGS, smsLogs.length, -1);
                rc.isDebug() && rc.debug(rc.getName(this), `periodicSmsLogger,`, `SMS results to be inserted to BigQuery : ${smses.length}.`, `SMS with status unknown : ${unknown},`, `finished successfully : ${finished}, and failed : ${failed}.`);
            }
            const bqArr = [];
            if (smses.length) {
                smses.forEach((sms) => {
                    const bqItem = new bq_models_1.BQSmsVerificationLog(rc);
                    bqItem.initModel(rc, sms.service, sms.userId, sms.mobNo, sms.tranId, sms.sms, sms.gwTranId, sms.gw, sms.status, sms.ts, sms.gwSendMs, sms.gwRespMs);
                    bqArr.push(bqItem);
                });
                const instance = new bq_models_1.BQSmsVerificationLog(rc);
                await Promise.all([instance.bulkInsert(rc, bqArr), this.trRedis.execRedisMulti(multi)]);
                rc.isDebug() && rc.debug(rc.getName(this), `periodicSmsLogger, ${smses.length} items inserted into Big Query.`);
            }
            else {
                rc.isDebug() && rc.debug(rc.getName(this), 'periodicSmsLogger, finished inserting items into Big Query.');
            }
        }
        catch (e) {
            rc.isError() && rc.error(rc.getName(this), 'periodicSmsLogger, Error in inserting items in BigQuery.');
        }
        finally {
            return;
        }
    }
    /**
     * To update and reset the active user request
     *
     * @param rc Run context
     * @param request Request to be updated as the currently active request
     * @param ts Timestamp of the request
     */
    async updateActiveUserRequest(rc, request, ts) {
        try {
            const userId = request.userId, key = request.service + sms_constants_1.SmsConstants.PIPE_SEPARATOR + userId, multi = this.trRedis.redisMulti();
            multi.hset(sms_constants_1.SmsConstants.TREDIS_USER_REQUEST, key, JSON.stringify(request));
            multi.zadd(sms_constants_1.SmsConstants.TREDIS_USER_SET, 'CH', ts, userId);
            rc.isDebug() && rc.debug(rc.getName(this), 'updateActiveUserRequest', key, request);
            await this.trRedis.execRedisMulti(multi);
        }
        catch (e) {
            rc.isError() && rc.error(rc.getName(this), `Error in updating ActiveUserRequest : ${e}`);
        }
        finally {
            return;
        }
    }
    /**
     * @method getLatestUserSetRecords
     */
    async getLatestUserSetRecords(rc) {
        return await this.trRedis.rwZrangebyscore(sms_constants_1.SmsConstants.TREDIS_USER_SET, Date.now() - sms_constants_1.SmsConstants.LATEST_RECORDS_MS, '+inf', true);
    }
    /**
     * Gets the current active user request
     *
     * @param rc Run context
     * @param smsInfo Object conataining service name, userId, smsTransId, and user mobile number
     */
    async getActiveUserRequest(rc, smsInfo) {
        const redisKey = smsInfo.service + sms_constants_1.SmsConstants.PIPE_SEPARATOR
            + smsInfo.userId + sms_constants_1.SmsConstants.PIPE_SEPARATOR
            + smsInfo.transactionId + sms_constants_1.SmsConstants.PIPE_SEPARATOR
            + smsInfo.mobileNo, parsedReq = JSON.parse(await this.trRedis.redisCommand()
            .hget(sms_constants_1.SmsConstants.TREDIS_USER_REQUEST, redisKey));
        const req = new request_1.ActiveUserRequest({
            service: smsInfo.service,
            userId: smsInfo.userId,
            mobileNo: smsInfo.mobileNo,
            transactionId: smsInfo.transactionId
        });
        if (parsedReq) {
            const keys = Object.keys(parsedReq);
            for (const key of keys) {
                req[key] = parsedReq[key];
            }
        }
        rc.isDebug() && rc.debug(rc.getName(this), 'getActiveUserRequest', redisKey, req);
        return req;
    }
    /**
     * Logs the verification status of the request
     *
     * @param rc Run context
     * @param request Request whose verification status needs to be logged
     * @param success Flag signifying the status of the request
     */
    async logVerificationStatus(rc, request, success) {
        let status;
        if (success === undefined) {
            status = sms_constants_1.SmsConstants.VERIFICATION_UNKNOWN;
        }
        else if (success === true) {
            status = sms_constants_1.SmsConstants.VERIFICATION_SUCCESS;
        }
        else {
            status = sms_constants_1.SmsConstants.VERIFICATION_FAILED;
        }
        const smsLog = { ...request, status };
        rc.isDebug() && rc.debug(rc.getName(this), 'logVerificationStatus', smsLog);
        return await this.trRedis.redisCommand()
            .rpush(sms_constants_1.SmsConstants.TREDIS_SMS_VERIFICATION_LOGS, JSON.stringify(smsLog));
    }
}
exports.SmsLogger = SmsLogger;
//# sourceMappingURL=sms-logger.js.map