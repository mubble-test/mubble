import { SmsSendResponse, SmsProvider, ProviderConfigs } from './sms-interfaces';
import { ActiveUserRequest } from './request';
import { RunContextServer } from '../rc-server';
export declare class SmsSender {
    private providercredentials;
    private smsClientMap;
    constructor(rc: RunContextServer, providercredentials: ProviderConfigs, logDirectory: string);
    sendSms(rc: RunContextServer, gw: keyof typeof SmsProvider, request: ActiveUserRequest): Promise<SmsSendResponse>;
    private sendSmsRequest;
}
