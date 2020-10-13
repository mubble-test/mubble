"use strict";
/*------------------------------------------------------------------------------
     About      : Active User Request
     
     Created on : Mon Mar 26 2018
     Author     : Vishal Sinha
     
     Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveUserRequest = void 0;
class ActiveUserRequest {
    constructor(smsInfo) {
        this.service = smsInfo.service;
        this.userId = smsInfo.userId;
        this.mobNo = smsInfo.mobileNo;
        this.tranId = smsInfo.transactionId;
        this.sms = '';
        this.ts = 0;
        this.gwTranId = '';
        this.gw = '';
        this.gwSendMs = 0;
        this.gwRespMs = 0;
        this.failedGws = [];
    }
    reinitializeRequest(rc, obj) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Re-initializing ActiveUserRequest.', this, obj);
        const keys = Object.keys(obj);
        for (const key of keys) {
            if (key === 'failedGws') {
                this.failedGws.push(...obj.failedGws);
                continue;
            }
            this[key] = obj[key];
        }
        return this;
    }
}
exports.ActiveUserRequest = ActiveUserRequest;
//# sourceMappingURL=request.js.map