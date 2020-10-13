"use strict";
/*------------------------------------------------------------------------------
   About      : Error Codes
   
   Created on : Fri Apr 21 2017
   Author     : Akash Dathan
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.DSError = exports.ERROR_CODES = void 0;
exports.ERROR_CODES = {
    RECORD_NOT_FOUND: 'RECORD_NOT_FOUND',
    RECORD_ALREADY_EXISTS: 'RECORD_ALREADY_EXISTS',
    UNIQUE_KEY_EXISTS: 'UNIQUE_KEY_EXISTS',
    PK_NOT_SET: 'PK_NOT_SET',
    GCP_ERROR: 'GCP_ERROR',
    TRANSACTION_ERROR: 'TRANSACTION_ERROR',
    UNSUPPORTED_UPDATE_FIELDS: 'UNSUPPORTED_UPDATE_FIELDS',
    MOD_TS_MISMATCH: 'MOD_TS_MISMATCH',
    UNDEFINED_QUERY_FIELD: 'UNDEFINED_QUERY_FIELD',
    FIELD_NOT_INDEXED: 'FIELD_NOT_INDEXED',
    ID_NOT_FOUND: 'ID_NOT_FOUND'
};
class DSError extends Error {
    constructor(name, msg) {
        super(msg);
        super['name'] = name;
    }
}
exports.DSError = DSError;
//# sourceMappingURL=error-codes.js.map