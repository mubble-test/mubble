export declare namespace SmsConstants {
    const RX_INDIAN_MOBILE: RegExp, PROVIDER_SEND_FAILURE = "PROVIDER_SEND_FAILURE", REDIS_PROVIDER_DOWN = "smsgw:down:", // suffixed by gw name making key keeping contiguous failure counts
    REDIS_PROVIDER_HHMM_SCORE = "smsgw:score:", // suffixed by gw name and hh:mm making key keeping scores at provider level
    REDIS_PROVIDER_HHMM_LOCK = "smsgw:lock:", // suffixed by gw name and hh:mm to update scores with a lock
    REDIS_SEP = ":", // Default seperator
    REDIS_DOWN_EXPIRY_MS: number, // 10 minutes
    REDIS_SCORE_EXPIRY_MS: number, // 13 hours
    HIGHEST_WEIGHTAGE = 24, // For current scores
    LOWEST_WEIGHTAGE = 0, // For 12 hours ago scores
    TOTAL_WEIGHTAGE = 300, // 0 + 1 + 2 + .. + 24
    TWELVE_HOUR_MS: number, // 12 hours
    THIRTY_MINUTE_MS: number, // 30 minutes
    SCORE_LOCK_MS: number, // 30 seconds
    MAX_GW_FAIL_COUNT = 5, // Max fail counts acceptable
    SMS_LOGGER_MS: number, // Sms send results will be logged every 10 minutes
    TREDIS_USER_REQUEST = "smsuser:user:request", // Ongoing user request. It is hash of service | userId and value is JSON of ActiveUserRequest.
    TREDIS_USER_SET = "smsuser:user:set", TREDIS_SMS_VERIFICATION_LOGS = "smsuser:verification:logs", LATEST_RECORDS_MS: number, MAX_SMS_PER_ITERATION = 50, VERIFICATION_SUCCESS = "SUCCESS", VERIFICATION_FAILED = "FAILED", VERIFICATION_UNKNOWN = "UNKNOWN", PIPE_SEPARATOR = " | ";
}
