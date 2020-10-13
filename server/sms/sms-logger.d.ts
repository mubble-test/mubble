import { RunContextServer } from '../rc-server';
import { RedisWrapper } from '../cache';
import { ActiveUserRequest } from './request';
import { SmsTransactionInfo } from './sms-interfaces';
export declare class SmsLogger {
    private trRedis;
    constructor(rc: RunContextServer, trRedis: RedisWrapper);
    /**
     * Periodically logs the sms logs and pushes it to big query
     *
     * @param rc - Run context
     * @param service - The service currently using this module
     */
    periodicSmsLogger(rc: RunContextServer, service: string): Promise<void>;
    /**
     * To update and reset the active user request
     *
     * @param rc Run context
     * @param request Request to be updated as the currently active request
     * @param ts Timestamp of the request
     */
    updateActiveUserRequest(rc: RunContextServer, request: ActiveUserRequest, ts: number): Promise<void>;
    /**
     * @method getLatestUserSetRecords
     */
    getLatestUserSetRecords(rc: RunContextServer): Promise<any[]>;
    /**
     * Gets the current active user request
     *
     * @param rc Run context
     * @param smsInfo Object conataining service name, userId, smsTransId, and user mobile number
     */
    getActiveUserRequest(rc: RunContextServer, smsInfo: SmsTransactionInfo): Promise<ActiveUserRequest>;
    /**
     * Logs the verification status of the request
     *
     * @param rc Run context
     * @param request Request whose verification status needs to be logged
     * @param success Flag signifying the status of the request
     */
    logVerificationStatus(rc: RunContextServer, request: ActiveUserRequest, success?: boolean): Promise<number>;
}
