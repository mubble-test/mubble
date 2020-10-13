"use strict";
/*------------------------------------------------------------------------------
   About      : Error Codes Enum
   
   Created on : Mon Dec 31 2018
   Author     : Vishal Sinha
   
   Copyright (c) 2018 Obopay Mobile Technologies Pvt Ltd. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityErrorCodes = exports.SecurityError = void 0;
var SecurityError;
(function (SecurityError) {
    SecurityError[SecurityError["INVALID_CLIENT"] = 1] = "INVALID_CLIENT";
    SecurityError[SecurityError["INVALID_VERSION"] = 2] = "INVALID_VERSION";
    SecurityError[SecurityError["INVALID_REQUEST_TS"] = 3] = "INVALID_REQUEST_TS";
    SecurityError[SecurityError["INVALID_ENCODING"] = 4] = "INVALID_ENCODING";
    SecurityError[SecurityError["INVALID_REQUEST_METHOD"] = 5] = "INVALID_REQUEST_METHOD";
    SecurityError[SecurityError["AES_KEY_MISSING"] = 6] = "AES_KEY_MISSING";
    SecurityError[SecurityError["REQUEST_REPLAY"] = 7] = "REQUEST_REPLAY";
})(SecurityError = exports.SecurityError || (exports.SecurityError = {}));
exports.SecurityErrorCodes = {
    INVALID_CLIENT: 'INVALID_CLIENT',
    INVALID_VERSION: 'INVALID_VERSION',
    INVALID_REQUEST_TS: 'INVALID_REQUEST_TS',
    INVALID_ENCODING: 'INVALID_ENCODING',
    INVALID_REQUEST_METHOD: 'INVALID_REQUEST_METHOD',
    AES_KEY_MISSING: 'AES_KEY_MISSING',
    REQUEST_REPLAY: 'REQUEST_REPLAY'
};
//# sourceMappingURL=security-errors.js.map