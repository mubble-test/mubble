import { RunContextServer } from '../rc-server';
import { SmsTransactionInfo } from './sms-interfaces';
import { Mubble } from '@mubble/core';
export declare class ActiveUserRequest {
    service: string;
    userId: string;
    mobNo: string;
    tranId: string;
    sms: string;
    ts: number;
    gwTranId: string;
    gw: string;
    gwSendMs: number;
    gwRespMs: number;
    failedGws: Array<string>;
    constructor(smsInfo: SmsTransactionInfo);
    reinitializeRequest(rc: RunContextServer, obj: Mubble.uChildObject<ActiveUserRequest>): this;
}
