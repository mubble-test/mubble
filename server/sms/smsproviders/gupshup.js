"use strict";
/*------------------------------------------------------------------------------
     About      : GupShup - SMS provider to send SMS request.
     
     Created on : Mon Mar 26 2018
     Author     : Vishal Sinha
     
     Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gupshup = void 0;
const sms_interfaces_1 = require("../sms-interfaces");
const util_1 = require("../../util");
const core_1 = require("@mubble/core");
const VERSION = '1.1', MSG_TYPE = 'TEXT', AUTH_SCHEME = 'PLAIN';
class Gupshup extends sms_interfaces_1.SmsProviderClient {
    constructor(rc, hostname, logDirectory) {
        super();
        this.httpsRequest = new util_1.HttpsRequest(rc, logDirectory, hostname);
    }
    async request(rc, request, info) {
        const gupshupKeys = info.creds;
        let mobileNo = request.mobNo, message = request.sms;
        rc.isDebug() && rc.debug(rc.getName(this), 'Mobile number : ', mobileNo);
        rc.isDebug() && rc.debug(rc.getName(this), 'SMS : ', message);
        if (mobileNo.includes('+91'))
            mobileNo = mobileNo.substring(3, 13);
        const urlObj = {
            protocol: gupshupKeys.http ? core_1.HTTP.Const.protocolHttp : core_1.HTTP.Const.protocolHttps,
            hostname: gupshupKeys.host,
            port: gupshupKeys.port,
            pathname: gupshupKeys.path,
            query: {
                userId: gupshupKeys.userId,
                password: encodeURIComponent(gupshupKeys.password),
                msg: message,
                send_to: encodeURIComponent(mobileNo),
                v: VERSION,
                msg_type: MSG_TYPE,
                auth_scheme: AUTH_SCHEME,
                override_dnd: true
            }
        };
        const options = urlObj;
        options.method = core_1.HTTP.Method.GET;
        options.headers = { [core_1.HTTP.HeaderKey.contentType]: core_1.HTTP.HeaderValue.json };
        rc.isDebug() && rc.debug(rc.getName(this), 'UrlObj :', urlObj, 'Options :', options);
        const resp = await this.httpsRequest.executeRequest(rc, urlObj, options);
        return { success: true, gwTranId: resp.response };
    }
}
exports.Gupshup = Gupshup;
//# sourceMappingURL=gupshup.js.map