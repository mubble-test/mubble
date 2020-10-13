"use strict";
/*------------------------------------------------------------------------------
     About      : Route-Mobile - SMS provider to send SMS request.
     
     Created on : Thu Oct 24 2019
     Author     : Vishal Sinha
     
     Copyright (c) 2019 Obopay Mobile Technologies Pvt Ltd. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteMobile = void 0;
const sms_interfaces_1 = require("../sms-interfaces");
const util_1 = require("../../util");
const core_1 = require("@mubble/core");
// http://<host>:8080/bulksms/bulksms?username=XXXX&password=YYYYY&type=Y&dlr=Z&destination=QQQQQQQQQ&source=RRRR&message=SSSSSSSS
const PORT = 8080, PATH = '/bulksms/bulksms', TYPE = 0, DLR = 0;
class RouteMobile extends sms_interfaces_1.SmsProviderClient {
    constructor(rc, hostname, logDirectory) {
        super();
        this.httpsRequest = new util_1.HttpsRequest(rc, logDirectory, hostname);
    }
    async request(rc, request, info) {
        const RMKeys = info.creds, urlObj = {
            protocol: core_1.HTTP.Const.protocolHttp,
            hostname: RMKeys.host,
            port: PORT,
            pathname: PATH,
            query: {
                username: RMKeys.username,
                password: RMKeys.password,
                type: TYPE,
                dlr: DLR,
                destination: request.mobNo,
                source: RMKeys.source,
                message: request.sms
            }
        };
        const options = urlObj;
        options.method = core_1.HTTP.Method.GET;
        const resp = await this.httpsRequest.executeRequest(rc, urlObj, options);
        return { success: true, gwTranId: resp.response };
    }
}
exports.RouteMobile = RouteMobile;
//# sourceMappingURL=route-mobile.js.map