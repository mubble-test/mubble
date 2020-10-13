"use strict";
/*------------------------------------------------------------------------------
     About      : Big query model for logging sms informtion
     
     Created on : Tue Mar 03 2020
     Author     : Vedant Pandey
     
     Copyright (c) 2020 Obopay. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BQSmsVerificationLog = void 0;
const gcp_1 = require("../../gcp");
// @BigqueryBase.model('')
class BQSmsVerificationLog extends gcp_1.BqBaseModel {
    constructor(rc) {
        super(rc);
    }
    initModel(rc, service, userId, mobNo, tranId, sms, gwTranId, gw, status, ts, gwSendMs, gwRespMs) {
        this.service = service;
        this.userId = userId;
        this.mobNo = mobNo;
        this.tranId = tranId;
        this.sms = sms;
        this.gwTranId = gwTranId;
        this.gw = gw;
        this.status = status;
        this.ts = ts;
        this.gwSendMs = gwSendMs;
        this.gwRespMs = gwRespMs;
    }
    fieldsError(rc) {
        return null;
    }
}
exports.BQSmsVerificationLog = BQSmsVerificationLog;
//# sourceMappingURL=bq-sms-log.js.map