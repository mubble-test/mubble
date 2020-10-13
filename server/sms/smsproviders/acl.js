"use strict";
/*------------------------------------------------------------------------------
     About      : ACL - SMS provider to send SMS request.
     
     Created on : Mon Mar 26 2018
     Author     : Vishal Sinha
     
     Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Acl = void 0;
const sms_interfaces_1 = require("../sms-interfaces");
const util_1 = require("../../util");
const core_1 = require("@mubble/core");
class Acl extends sms_interfaces_1.SmsProviderClient {
    constructor(rc, hostname, logDirectory) {
        super();
        this.httpsRequest = new util_1.HttpsRequest(rc, logDirectory, hostname);
    }
    async request(rc, request, info) {
        const aclKeys = info.creds;
        let mobileNo = request.mobNo, message = request.sms;
        rc.isDebug() && rc.debug(rc.getName(this), 'Mobile number : ', mobileNo);
        rc.isDebug() && rc.debug(rc.getName(this), 'SMS : ', message);
        if (mobileNo.includes('+91'))
            mobileNo = mobileNo.substring(3, 13);
        const urlObj = {
            protocol: aclKeys.http ? core_1.HTTP.Const.protocolHttp : core_1.HTTP.Const.protocolHttps,
            hostname: aclKeys.host,
            port: aclKeys.port,
            pathname: aclKeys.path,
            query: {
                enterpriseId: aclKeys.enterpriseId,
                subEnterpriseId: aclKeys.subEnterpriseId,
                pusheid: aclKeys.pushId,
                pushepwd: aclKeys.pushpwd,
                sender: aclKeys.sender,
                msisdn: mobileNo,
                msgtext: message
            }
        };
        const options = urlObj;
        options.method = core_1.HTTP.Method.GET;
        options.headers = { [core_1.HTTP.HeaderKey.contentType]: core_1.HTTP.HeaderValue.json };
        rc.isStatus() && rc.status(rc.getName(this), 'RequestOptions : ', options);
        const resp = await this.httpsRequest.executeRequest(rc, urlObj, options);
        return { success: true, gwTranId: resp.response };
    }
}
exports.Acl = Acl;
//# sourceMappingURL=acl.js.map