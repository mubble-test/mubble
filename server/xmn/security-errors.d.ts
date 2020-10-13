export declare enum SecurityError {
    INVALID_CLIENT = 1,
    INVALID_VERSION = 2,
    INVALID_REQUEST_TS = 3,
    INVALID_ENCODING = 4,
    INVALID_REQUEST_METHOD = 5,
    AES_KEY_MISSING = 6,
    REQUEST_REPLAY = 7
}
export declare const SecurityErrorCodes: {
    INVALID_CLIENT: string;
    INVALID_VERSION: string;
    INVALID_REQUEST_TS: string;
    INVALID_ENCODING: string;
    INVALID_REQUEST_METHOD: string;
    AES_KEY_MISSING: string;
    REQUEST_REPLAY: string;
};
