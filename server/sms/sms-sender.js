"use strict";
/*------------------------------------------------------------------------------
   About      : Sends SMS request using a SMS provider.
   
   Created on : Tue Mar 27 2018
   Author     : Vishal Sinha
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsSender = void 0;
const smsproviders_1 = require("./smsproviders");
const sms_errors_1 = require("./sms-errors");
class SmsSender {
    constructor(rc, providercredentials, logDirectory) {
        this.smsClientMap = {};
        rc.isDebug() && rc.debug(rc.getName(this), 'Initializing SMS sender.', providercredentials);
        if (providercredentials.ACL) {
            this.smsClientMap.ACL = new smsproviders_1.Acl(rc, providercredentials.ACL.host, logDirectory);
        }
        if (providercredentials.KARIX) {
            this.smsClientMap.KARIX = new smsproviders_1.Karix(rc, providercredentials.KARIX.host, logDirectory);
        }
        if (providercredentials.GUPSHUP) {
            this.smsClientMap.GUPSHUP = new smsproviders_1.Gupshup(rc, providercredentials.GUPSHUP.host, logDirectory);
        }
        if (providercredentials.ROUTE_MOBILE) {
            this.smsClientMap.ROUTE_MOBILE = new smsproviders_1.RouteMobile(rc, providercredentials.ROUTE_MOBILE.host, logDirectory);
        }
        this.providercredentials = providercredentials;
    }
    async sendSms(rc, gw, request) {
        try {
            return await this.sendSmsRequest(rc, gw, request);
        }
        catch (err) {
            rc.isError() && rc.error(rc.getName(this), err);
            return { success: false, gwTranId: gw + '_' + Date.now() };
        }
    }
    async sendSmsRequest(rc, gw, request) {
        rc.isDebug() && rc.debug(rc.getName(this), `Sending SMS using ${gw}.`);
        const client = this.smsClientMap[gw], creds = this.providercredentials[gw];
        if (!client) {
            rc.isError() && rc.error(rc.getName(this), 'Requesting provider without initialization.');
            throw new sms_errors_1.SmsError(sms_errors_1.SmsErrorCodes.PROVIDER_NOT_INITIALIZED, sms_errors_1.SmsErrorMessages.PROVIDER_NOT_INITIALIZED);
        }
        if (!creds) {
            throw new sms_errors_1.SmsError(sms_errors_1.SmsErrorCodes.INVALID_SMS_CONFIG, sms_errors_1.SmsErrorMessages.INVALID_SMS_CONFIG);
        }
        return await client.request(rc, request, { client, creds });
    }
}
exports.SmsSender = SmsSender;
//# sourceMappingURL=sms-sender.js.map