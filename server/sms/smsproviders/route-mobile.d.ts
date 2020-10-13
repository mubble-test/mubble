import { SmsProviderClient, SmsSendResponse, ClientInfo } from '../sms-interfaces';
import { ActiveUserRequest } from '../request';
import { RunContextServer } from '../../rc-server';
import { HttpsRequest } from '../../util';
export declare class RouteMobile extends SmsProviderClient {
    httpsRequest: HttpsRequest;
    constructor(rc: RunContextServer, hostname: string, logDirectory: string);
    request<T extends ClientInfo>(rc: RunContextServer, request: ActiveUserRequest, info: T): Promise<SmsSendResponse>;
}
