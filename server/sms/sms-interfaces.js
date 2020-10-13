"use strict";
/*------------------------------------------------------------------------------
     About      : Types and definitions used for SMS verification and requests.
     
     Created on : Tue Mar 27 2018
     Author     : Vishal Sinha
     
     Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsProviderClient = exports.SmsProvider = void 0;
/*------------------------------------------------------------------------------
    SMS Provider Configs
------------------------------------------------------------------------------*/
var SmsProvider;
(function (SmsProvider) {
    SmsProvider["ACL"] = "ACL";
    SmsProvider["GUPSHUP"] = "GUPSHUP";
    SmsProvider["KARIX"] = "KARIX";
    SmsProvider["ROUTE_MOBILE"] = "ROUTE_MOBILE";
})(SmsProvider = exports.SmsProvider || (exports.SmsProvider = {}));
class SmsProviderClient {
}
exports.SmsProviderClient = SmsProviderClient;
//# sourceMappingURL=sms-interfaces.js.map