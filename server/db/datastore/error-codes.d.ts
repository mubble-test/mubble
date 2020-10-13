export declare const ERROR_CODES: {
    RECORD_NOT_FOUND: string;
    RECORD_ALREADY_EXISTS: string;
    UNIQUE_KEY_EXISTS: string;
    PK_NOT_SET: string;
    GCP_ERROR: string;
    TRANSACTION_ERROR: string;
    UNSUPPORTED_UPDATE_FIELDS: string;
    MOD_TS_MISMATCH: string;
    UNDEFINED_QUERY_FIELD: string;
    FIELD_NOT_INDEXED: string;
    ID_NOT_FOUND: string;
};
export declare class DSError extends Error {
    constructor(name: string, msg: string);
}
