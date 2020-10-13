"use strict";
/*------------------------------------------------------------------------------
     About      : Sms service
     
     Created on : Mon Mar 02 2020
     Author     : Vedant Pandey
     
     Copyright (c) 2020 Obopay. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sms = void 0;
const sms_errors_1 = require("./sms-errors");
const sms_logger_1 = require("./sms-logger");
const gw_scoring_1 = require("./gw-scoring");
const sms_sender_1 = require("./sms-sender");
const sms_constants_1 = require("./sms-constants");
const lo = require("lodash");
class Sms {
    constructor(rc, config, trRedis, logDirectory) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Constructing new Sms instance.');
        this.verifySmsProviderConfig(rc, config);
        this.smsSender = new sms_sender_1.SmsSender(rc, config.PROVIDER_KEYS, logDirectory);
        this.smsLogger = new sms_logger_1.SmsLogger(rc, trRedis);
        this.gwScorer = new gw_scoring_1.GatewayScoring(rc, trRedis, config.PROVIDERS);
    }
    init(rc) {
        if (this.inited) {
            throw Error('Calling init twice!');
        }
        // TODO : Init sms-logger
        this.inited = true;
    }
    close(rc) {
        if (!this.inited) {
            rc.isWarn() && rc.warn(rc.getName(this), 'Sms not initialized. Not closing.');
            return;
        }
        // TODO : Call sms-logger close
        this.smsLogger = null;
        this.smsSender = null;
        this.gwScorer = null;
        this.inited = false;
    }
    /**
     * To be called when config changes
     */
    onConfigChange(rc, config) {
        if (!this.inited) {
            rc.isError() && rc.error(rc.getName(this), 'Sms service was not initialized.');
            throw new sms_errors_1.SmsError(sms_errors_1.SmsErrorCodes.SMS_SERVICE_NOT_INITIALIZED, sms_errors_1.SmsErrorMessages.SMS_SERVICE_NOT_INITIALIZED);
        }
        this.verifySmsProviderConfig(rc, config);
        this.smsSender = new sms_sender_1.SmsSender(rc, config.PROVIDER_KEYS, this.logDirectory);
        this.gwScorer.populateProviders(rc, config.PROVIDERS);
    }
    /*----------------------------------------------------------------------------
                                                                    API FUNCTIONS
    ----------------------------------------------------------------------------*/
    /**
     * Api to send the verification sms.
     *
     * @param rc Run context
     * @param smsInfo Object conataining service name, userId, smsTransId, and user mobile number
     * @param sms Sms to be sent to user
     */
    async sendSms(rc, smsInfo, sms) {
        if (!this.inited) {
            rc.isError() && rc.error(rc.getName(this), 'Sms not initialized.');
            throw new sms_errors_1.SmsError(sms_errors_1.SmsErrorCodes.SMS_SERVICE_NOT_INITIALIZED, sms_errors_1.SmsErrorMessages.SMS_SERVICE_NOT_INITIALIZED);
        }
        const isIndianNumber = sms_constants_1.SmsConstants.RX_INDIAN_MOBILE.test(smsInfo.mobileNo);
        if (!isIndianNumber) {
            rc.isError() && rc.error(rc.getName(this), 'sendSms non Indian mobile number provided.');
            throw new sms_errors_1.SmsError(sms_errors_1.SmsErrorCodes.NOT_INDIAN_MOBILE_NUMBER, sms_errors_1.SmsErrorMessages.NOT_INDIAN_MOBILE_NUMBER);
        }
        try {
            const request = await this.smsLogger.getActiveUserRequest(rc, smsInfo);
            if (request.gw) {
                await this.smsLogger.logVerificationStatus(rc, request);
                request.reinitializeRequest(rc, { ts: 0, gw: '', gwTranId: '', gwRespMs: 0, gwSendMs: 0 });
            }
            else if (request.failedGws.length) {
                await this.smsLogger.logVerificationStatus(rc, request, false);
            }
            else {
                rc.isError() && rc.error(rc.getName(this), 'sendSms Duplicated request.');
                throw new sms_errors_1.SmsError(sms_errors_1.SmsErrorCodes.DUPLICATED_REQUEST, sms_errors_1.SmsErrorMessages.DUPLICATED_REQUEST);
            }
            const ts = Date.now(), gw = await this.gwScorer.findBestGatewayProvider(rc, ts, request.failedGws), start = Date.now(), { success, gwTranId } = await this.smsSender.sendSms(rc, gw, request), now = Date.now(), result = {};
            result.isIndianNumber = isIndianNumber;
            result.smsSent = success;
            await this.gwScorer.updateGatewayDownTime(rc, gw, !success);
            if (success) {
                rc.isDebug() && rc.debug(rc.getName(this), `Successfully sent SMS using ${gw}, SMS : ${request.sms}`);
                request.reinitializeRequest(rc, { ts, gw, gwTranId, gwRespMs: now - start, gwSendMs: -1 });
                await this.smsLogger.updateActiveUserRequest(rc, request, now);
                result.msTaken = now - start;
                return result;
            }
            request.failedGws.push(gw);
            result.smsSendingFailureReason = sms_constants_1.SmsConstants.PROVIDER_SEND_FAILURE;
            await this.smsLogger.updateActiveUserRequest(rc, request, now);
            rc.isDebug() && rc.debug(rc.getName(this), `Failure in sending SMS using ${gw}, SMS : ${request.sms}`);
            if (request.failedGws.length < this.gwScorer.providerList.length) {
                return await this.sendSms(rc, smsInfo, sms);
            }
            return result;
        }
        catch (e) {
            rc.isError() && rc.error(rc.getName(this), `Error in verifying number : ${e}.`, e);
            return { isIndianNumber, smsSent: false, smsSendingFailureReason: `${e}` };
        }
    }
    /**
     * Api called when sms was sent succesfully
     *
     * @param rc Run context
     * @param smsInfo Object conataining service name, userId, smsTransId, and user mobile number
     * @param msTaken Time taken by the provider to sed the sms
     * @param manual flag signifying if the otp verification was manual or automatic
     * @param cb callback to be used after internal tasks completed
     * @param args argument(s) if required for callback
     *
     * @returns The retval returned by the callback
     */
    async smsSuccess(rc, smsInfo, msTaken, manual, cb, ...args) {
        const isIndianNumber = sms_constants_1.SmsConstants.RX_INDIAN_MOBILE.test(smsInfo.mobileNo);
        if (!isIndianNumber) {
            rc.isError() && rc.error(rc.getName(this), 'sendVerificationSms non Indian mobile number provided.');
            throw new sms_errors_1.SmsError(sms_errors_1.SmsErrorCodes.NOT_INDIAN_MOBILE_NUMBER, sms_errors_1.SmsErrorMessages.NOT_INDIAN_MOBILE_NUMBER);
        }
        if (!this.gwScorer || !this.smsSender) {
            rc.isError() && rc.error(rc.getName(this), 'sendVerificationSms config not initialized.');
            throw new sms_errors_1.SmsError(sms_errors_1.SmsErrorCodes.SMS_SERVICE_NOT_INITIALIZED, sms_errors_1.SmsErrorMessages.SMS_SERVICE_NOT_INITIALIZED);
        }
        let request = await this.smsLogger.getActiveUserRequest(rc, smsInfo);
        if (!request) {
            rc.isError() && rc.error(rc.getName(this), `Request for user ${smsInfo.userId} not found in cache.`);
            throw new sms_errors_1.SmsError(sms_errors_1.SmsErrorCodes.NO_ACTIVE_USER_REQUEST, sms_errors_1.SmsErrorMessages.NO_ACTIVE_USER_REQUEST);
        }
        if (manual) {
            const latestRecords = await this.smsLogger.getLatestUserSetRecords(rc), userIdExists = (lo.indexOf(latestRecords, smsInfo.userId) !== -1);
            if (!userIdExists) {
                rc.isError() && rc.error(rc.getName(this), `Request for user ${smsInfo.userId} not found in cache.`);
                throw new sms_errors_1.SmsError(sms_errors_1.SmsErrorCodes.NO_ACTIVE_USER_REQUEST, sms_errors_1.SmsErrorMessages.NO_ACTIVE_USER_REQUEST);
            }
        }
        request.gwSendMs = msTaken;
        Promise.all([
            this.gwScorer.updateGatewayProviderPerformance(rc, request.gw, request.ts, msTaken),
            this.smsLogger.logVerificationStatus(rc, request, true),
        ]);
        await this.smsLogger.updateActiveUserRequest(rc, request.reinitializeRequest(rc, { ts: 0, gw: '', gwRespMs: 0, gwSendMs: 0, failedGws: [] }), Date.now());
        if (cb)
            return await cb(...args);
    }
    /**
     * Api called when sms was not sent succesfully
     *
     * @param rc Run context
     * @param smsInfo Object conataining service name, userId, smsTransId, and user mobile number
     * @param cb Callback function to be called after internal tasks completed
     * @param args argument(s) if required for callback
     *
     * @returns The retval returned by the callback
     */
    async smsFailed(rc, smsInfo, cb, ...args) {
        let request = await this.smsLogger.getActiveUserRequest(rc, smsInfo);
        const { service, userId, transactionId: smsTransId, mobileNo } = smsInfo;
        if (!this.gwScorer || !this.smsSender) {
            rc.isError() && rc.error(rc.getName(this), 'sendVerificationSms config not initialized.');
            throw new sms_errors_1.SmsError(sms_errors_1.SmsErrorCodes.SMS_SERVICE_NOT_INITIALIZED, sms_errors_1.SmsErrorMessages.SMS_SERVICE_NOT_INITIALIZED);
        }
        if (!request || request.service !== service) {
            rc.isError() && rc.error(rc.getName(this), `Request for user ${userId} not found in cache`);
            throw new sms_errors_1.SmsError(sms_errors_1.SmsErrorCodes.NO_ACTIVE_USER_REQUEST, sms_errors_1.SmsErrorMessages.NO_ACTIVE_USER_REQUEST);
        }
        if (!this.checkRequestInfo(rc, request, mobileNo, smsTransId)) {
            rc.isError() && rc.error(rc.getName(this), 'Skipping entry in SMS verification logs due to mismatch.', request, { tranId: smsTransId, mobNo: mobileNo });
            throw new sms_errors_1.SmsError(sms_errors_1.SmsErrorCodes.REQUEST_INFO_MISMATCH, sms_errors_1.SmsErrorMessages.REQUEST_INFO_MISMATCH);
        }
        Promise.all([
            this.smsLogger.logVerificationStatus(rc, request, false),
            this.gwScorer.updateGatewayProviderPerformance(rc, request.gw, request.ts, Date.now() - request.ts),
        ]);
        await this.smsLogger.updateActiveUserRequest(rc, request.reinitializeRequest(rc, { ts: 0, gw: '', gwTranId: '', failedGws: [request.gw] }), Date.now());
        if (cb)
            return await cb(...args);
    }
    /*----------------------------------------------------------------------------
                                                                PRIVATE FUNCTIONS
    ----------------------------------------------------------------------------*/
    verifySmsProviderConfig(rc, smsProviderConfig) {
        const providers = smsProviderConfig.PROVIDERS, providerKeys = smsProviderConfig.PROVIDER_KEYS;
        if (!smsProviderConfig || !providers.length || !providerKeys) {
            rc.isError() && rc.error(rc.getName(this), 'SMS provider config not present or invalid.', smsProviderConfig, providers, providerKeys);
            throw new sms_errors_1.SmsError(sms_errors_1.SmsErrorCodes.INVALID_SMS_CONFIG, sms_errors_1.SmsErrorMessages.INVALID_SMS_CONFIG);
        }
        for (const provider of providers) {
            if (!provider.name || provider.enabled === undefined) {
                rc.isError() && rc.error(rc.getName(this), 'Invalid provider config.', provider);
                throw new sms_errors_1.SmsError(sms_errors_1.SmsErrorCodes.INVALID_SMS_CONFIG, sms_errors_1.SmsErrorMessages.INVALID_SMS_CONFIG);
            }
        }
        const allProvidersDisabled = providers.every((provider) => provider.enabled === false);
        if (allProvidersDisabled) {
            rc.isError() && rc.error(rc.getName(this), 'All providers disabled.', providers);
            throw new sms_errors_1.SmsError(sms_errors_1.SmsErrorCodes.INVALID_SMS_CONFIG, sms_errors_1.SmsErrorMessages.INVALID_SMS_CONFIG);
        }
        const providerNames = [];
        providers.forEach((provider) => providerNames.push(provider.name));
        if (this.containsDuplicates(providerNames)) {
            rc.isError() && rc.error(rc.getName(this), 'Duplicate config for one or more providers.', providerNames);
            throw new sms_errors_1.SmsError(sms_errors_1.SmsErrorCodes.INVALID_SMS_CONFIG, sms_errors_1.SmsErrorMessages.INVALID_SMS_CONFIG);
        }
        for (const provider of providers) {
            if (provider.enabled && !Object.keys(smsProviderConfig.PROVIDER_KEYS).length) {
                throw new sms_errors_1.SmsError(sms_errors_1.SmsErrorCodes.INVALID_SMS_CONFIG, sms_errors_1.SmsErrorMessages.INVALID_SMS_CONFIG);
            }
        }
    }
    checkRequestInfo(rc, request, mobileNo, smsTransId) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Checking request info mismatch...');
        return request.mobNo === mobileNo && request.tranId === smsTransId;
    }
    // Returns true if duplicates present in arr
    containsDuplicates(arr) {
        const uniqueArray = lo.uniq(arr);
        return (arr.length !== uniqueArray.length);
    }
}
exports.Sms = Sms;
//# sourceMappingURL=sms.js.map