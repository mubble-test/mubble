import { SmsProviderClient, SmsSendResponse, ClientInfo } from '../sms-interfaces';
import { RunContextServer } from '../../rc-server';
import { ActiveUserRequest } from '../request';
import { HttpsRequest } from '../../util';
export declare class Gupshup extends SmsProviderClient {
    httpsRequest: HttpsRequest;
    constructor(rc: RunContextServer, hostname: string, logDirectory: string);
    request<T extends ClientInfo>(rc: RunContextServer, request: ActiveUserRequest, info: T): Promise<SmsSendResponse>;
}
