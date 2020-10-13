import { BqBaseModel } from '../../gcp';
import { RunContextServer } from '../../rc-server';
export declare class BQSmsVerificationLog extends BqBaseModel {
    service: string;
    userId: string;
    mobNo: string;
    tranId: string;
    sms: string;
    gwTranId: string;
    gw: string;
    status: string;
    ts: number;
    gwSendMs: number;
    gwRespMs: number;
    constructor(rc: RunContextServer);
    initModel(rc: RunContextServer, service: string, userId: string, mobNo: string, tranId: string, sms: string, gwTranId: string, gw: string, status: string, ts: number, gwSendMs: number, gwRespMs: number): void;
    fieldsError(rc: RunContextServer): string | null;
}
