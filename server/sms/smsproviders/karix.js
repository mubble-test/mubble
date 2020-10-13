"use strict";
/*------------------------------------------------------------------------------
   About      : Karix - SMS provider to send SMS request.
   
   Created on : Mon Sep 23 2019
   Author     : Vishal Sinha
   
   Copyright (c) 2019 Obopay Mobile Technologies Pvt Ltd. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Karix = void 0;
const sms_interfaces_1 = require("../sms-interfaces");
const core_1 = require("@mubble/core");
const util_1 = require("../../util");
const qs = require("querystring");
class Karix extends sms_interfaces_1.SmsProviderClient {
    constructor(rc, hostname, logDirectory) {
        super();
        this.httpsRequest = new util_1.HttpsRequest(rc, logDirectory, hostname);
    }
    async request(rc, request, info) {
        const karixKeys = info.creds, urlObj = {
            protocol: karixKeys.http ? core_1.HTTP.Const.protocolHttp : core_1.HTTP.Const.protocolHttps,
            hostname: karixKeys.host,
            port: karixKeys.port,
            pathname: karixKeys.path
        }, query = {
            targetDeviceId: request.mobNo,
            message: request.sms,
            messageData: '',
            smsPort: karixKeys.smsPort,
            class_id: karixKeys.classId,
            carrier_id: karixKeys.carrierId,
            appType: karixKeys.applicationType
        };
        const options = urlObj;
        options.method = core_1.HTTP.Method.POST;
        options.headers = { [core_1.HTTP.HeaderKey.contentType]: core_1.HTTP.HeaderValue.form };
        const resp = await this.httpsRequest.executeRequest(rc, urlObj, options, qs.stringify(query));
        return { success: true, gwTranId: resp.response };
    }
}
exports.Karix = Karix;
//# sourceMappingURL=karix.js.map