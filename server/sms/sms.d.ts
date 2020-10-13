import { SmsProviderConfig, SendSmsResponse, SmsTransactionInfo } from './sms-interfaces';
import { RunContextServer } from '../rc-server';
import { RedisWrapper } from '../cache';
import { ActiveUserRequest } from './request';
export declare class Sms {
    private smsLogger;
    private smsSender;
    private gwScorer;
    private logDirectory;
    private inited;
    constructor(rc: RunContextServer, config: SmsProviderConfig, trRedis: RedisWrapper, logDirectory: string);
    init(rc: RunContextServer): void;
    close(rc: RunContextServer): void;
    /**
     * To be called when config changes
     */
    onConfigChange(rc: RunContextServer, config: SmsProviderConfig): void;
    /**
     * Api to send the verification sms.
     *
     * @param rc Run context
     * @param smsInfo Object conataining service name, userId, smsTransId, and user mobile number
     * @param sms Sms to be sent to user
     */
    sendSms(rc: RunContextServer, smsInfo: SmsTransactionInfo, sms: string): Promise<SendSmsResponse>;
    /**
     * Api called when sms was sent succesfully
     *
     * @param rc Run context
     * @param smsInfo Object conataining service name, userId, smsTransId, and user mobile number
     * @param msTaken Time taken by the provider to sed the sms
     * @param manual flag signifying if the otp verification was manual or automatic
     * @param cb callback to be used after internal tasks completed
     * @param args argument(s) if required for callback
     *
     * @returns The retval returned by the callback
     */
    smsSuccess<T>(rc: RunContextServer, smsInfo: SmsTransactionInfo, msTaken: number, manual: boolean, cb?: (...args: Array<any>) => Promise<T>, ...args: Array<any>): Promise<T | void>;
    /**
     * Api called when sms was not sent succesfully
     *
     * @param rc Run context
     * @param smsInfo Object conataining service name, userId, smsTransId, and user mobile number
     * @param cb Callback function to be called after internal tasks completed
     * @param args argument(s) if required for callback
     *
     * @returns The retval returned by the callback
     */
    smsFailed<T>(rc: RunContextServer, smsInfo: SmsTransactionInfo, cb?: (...args: Array<any>) => Promise<T>, ...args: Array<any>): Promise<T | void>;
    private verifySmsProviderConfig;
    checkRequestInfo(rc: RunContextServer, request: ActiveUserRequest, mobileNo: string, smsTransId: string): boolean;
    private containsDuplicates;
}
