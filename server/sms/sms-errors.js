"use strict";
/*------------------------------------------------------------------------------
   About      : Sms error library
   
   Created on : Tue Mar 03 2020
   Author     : Vedant Pandey
   
   Copyright (c) 2020 Obopay. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsError = exports.SmsErrorMessages = exports.SmsErrorCodes = void 0;
const core_1 = require("@mubble/core");
var SmsErrorCodes;
(function (SmsErrorCodes) {
    SmsErrorCodes["NOT_INDIAN_MOBILE_NUMBER"] = "NOT_INDIAN_MOBILE_NUMBER";
    SmsErrorCodes["SMS_SERVICE_NOT_INITIALIZED"] = "SMS_SERVICE_NOT_INITIALIZED";
    SmsErrorCodes["NO_ACTIVE_USER_REQUEST"] = "NO_ACTIVE_USER_REQUEST";
    SmsErrorCodes["DUPLICATED_REQUEST"] = "DUPLICATED_REQUEST";
    SmsErrorCodes["PROVIDER_NOT_AVAILABLE"] = "PROVIDER_NOT_AVAILABLE";
    SmsErrorCodes["REQUEST_INFO_MISMATCH"] = "REQUEST_INFO_MISMATCH";
    SmsErrorCodes["INVALID_SMS_CONFIG"] = "INVALID_SMS_CONFIG";
    SmsErrorCodes["INVALID_GW_NAME"] = "INVALID_GW_NAME";
    SmsErrorCodes["PROVIDER_NOT_INITIALIZED"] = "PROVIDER_NOT_INITIALIZED";
})(SmsErrorCodes = exports.SmsErrorCodes || (exports.SmsErrorCodes = {}));
var SmsErrorMessages;
(function (SmsErrorMessages) {
    SmsErrorMessages["NOT_INDIAN_MOBILE_NUMBER"] = "The mobile number provided is not Indian, please enter an indian mobile number.";
    SmsErrorMessages["SMS_SERVICE_NOT_INITIALIZED"] = "Sms service is not initialized.";
    SmsErrorMessages["NO_ACTIVE_USER_REQUEST"] = "Some error occured. Please try again later.";
    SmsErrorMessages["DUPLICATED_REQUEST"] = "The request made is duplicated. Please wait and try again.";
    SmsErrorMessages["PROVIDER_NOT_AVAILABLE"] = "Some error occured. Please try again later.";
    SmsErrorMessages["REQUEST_INFO_MISMATCH"] = "Skipping entry in SMS verification logs due to mismatch.";
    SmsErrorMessages["INVALID_SMS_CONFIG"] = "Invalid server config.";
    SmsErrorMessages["INVALID_GW_NAME"] = "The gateway name provided was not valid, or disabled.";
    SmsErrorMessages["PROVIDER_NOT_INITIALIZED"] = "The sms gateway provider requested was not initialized.";
})(SmsErrorMessages = exports.SmsErrorMessages || (exports.SmsErrorMessages = {}));
class SmsError extends core_1.Mubble.uError {
    constructor(name, msg) {
        super(name, msg);
        Object.setPrototypeOf(this, SmsError.prototype);
    }
}
exports.SmsError = SmsError;
//# sourceMappingURL=sms-errors.js.map