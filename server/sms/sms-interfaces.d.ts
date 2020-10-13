import { Acl, RouteMobile, Karix, Gupshup } from './smsproviders';
import { ActiveUserRequest } from './request';
import { RunContextServer } from '../rc-server';
export interface SendSmsResponse {
    isIndianNumber: boolean;
    smsSent: boolean;
    smsSendingFailureReason?: string;
    msTaken?: number;
}
export interface SmsProviderConfig {
    PROVIDERS: Array<Provider>;
    PROVIDER_KEYS: ProviderConfigs;
}
export interface Provider {
    name: string;
    enabled: boolean;
}
export interface SmsTransactionInfo {
    service: string;
    userId: string;
    transactionId: string;
    mobileNo: string;
}
export interface SmsVerficationLog {
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
    status: string;
}
export declare enum SmsProvider {
    ACL = "ACL",
    GUPSHUP = "GUPSHUP",
    KARIX = "KARIX",
    ROUTE_MOBILE = "ROUTE_MOBILE"
}
export declare type Credentials = AclCredentials | GupshupCredentials | KarixCredentials | RouteMobileCredentials;
export declare type ProviderConfigs = {
    [key in SmsProvider]?: Credentials;
};
export declare type ClientMap = {
    [key in SmsProvider]?: Client;
};
export declare type Client = Acl | Gupshup | Karix | RouteMobile;
export declare type ClientInfo = {
    client: Client;
    creds: Credentials;
};
export declare abstract class SmsProviderClient {
    abstract request<T extends ClientInfo>(rc: RunContextServer, request: ActiveUserRequest, info: T): Promise<SmsSendResponse>;
}
export interface SmsSendResponse {
    success: boolean;
    gwTranId: string;
}
export interface GupshupCredentials {
    http: boolean;
    host: string;
    port: number;
    path: string;
    userId: number;
    password: string;
}
export interface AclCredentials {
    http: boolean;
    port: number;
    host: string;
    path: string;
    enterpriseId: string;
    subEnterpriseId: string;
    pushId: string;
    pushpwd: string;
    sender: string;
}
export interface KarixCredentials {
    http: boolean;
    host: string;
    port?: number;
    path?: string;
    classId: string;
    applicationType: string;
    carrierId: string;
    smsPort: string;
}
export interface RouteMobileCredentials {
    host: string;
    port: number;
    username: string;
    password: string;
    source: string;
}
