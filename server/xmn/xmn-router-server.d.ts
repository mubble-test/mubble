import { ConnectionInfo, WireEventResp, WireObject, WireReqResp, InvocationData, Mubble, XmnProvider } from '@mubble/core';
import { RunContextServer } from '../rc-server';
import { RedisWrapper } from '../cache';
export declare type ClientEventObject = {
    workerId: string;
    connectionId: string;
    eventName: string;
    eventParams: Mubble.uObject<any>;
};
export declare class InvokeStruct {
    name: string;
    parent: any;
    xmnInfo: any;
    constructor(name: string, parent: any, xmnInfo: any);
    executeFn(...params: any[]): Promise<any>;
}
export declare abstract class XmnRouterServer {
    private apiMap;
    private eventMap;
    private piggyfrontMap;
    private reqRedis;
    private eventRedis;
    constructor(rc: RunContextServer, reqRedis: RedisWrapper, serverId: string, ...apiProviders: any[]);
    verifyConnection(rc: RunContextServer, ci: ConnectionInfo, apiName?: string): Promise<void>;
    sendEvent(rc: RunContextServer, ci: ConnectionInfo, eventName: string, data: object): Promise<void>;
    piggyfrontEvent(rc: RunContextServer, ci: ConnectionInfo, eventName: string, data: object, invData: InvocationData): void;
    private insertIntoPiggyfrontMap;
    getIp(req: any): any;
    providerMessage(refRc: RunContextServer, ci: ConnectionInfo, arData: WireObject[]): void;
    providerFailed(rc: RunContextServer, ci: ConnectionInfo): Promise<void>;
    providerClosed(rc: RunContextServer, ci: ConnectionInfo): Promise<void>;
    abstract connectionOpened(rc: RunContextServer, ci: ConnectionInfo, apiInfo: any): Promise<void>;
    abstract connectionClosed(rc: RunContextServer, ci: ConnectionInfo): void;
    routeRequest(rc: RunContextServer, ci: ConnectionInfo, wo: WireObject): Promise<WireReqResp>;
    routeEvent(rc: RunContextServer, ci: ConnectionInfo, wo: WireObject): Promise<WireEventResp>;
    routeEphemeralEvent(rc: RunContextServer, ci: ConnectionInfo, wo: WireObject): Promise<boolean>;
    closeConnection(rc: RunContextServer, ci: ConnectionInfo): void;
    invokeXmnFunction(rc: RunContextServer, ci: ConnectionInfo, invData: InvocationData, invStruct: InvokeStruct, isEvent: boolean): Promise<any>;
    private sendEventResponse;
    private sendToProvider;
    registerApi(rc: RunContextServer, name: string, parent: any, xmnInfo: any): void;
    registerEvent(rc: RunContextServer, name: string, parent: any, xmnInfo: any): void;
    addToProviderCollection(rc: RunContextServer, clientId: number, provider: XmnProvider): void;
    getClientProvider(rc: RunContextServer, clientId: number): void;
    private logRegistration;
    publishToEventQueue(rc: RunContextServer, eventObj: ClientEventObject): void;
    subscribeToEventQueueRedis(rc: RunContextServer, redisUrl: string, workerId: string): Promise<void>;
    stopEventQueueSubscription(): Promise<void>;
    private processEventObject;
    getCookies(ci: ConnectionInfo): Mubble.uObject<string>;
    setCookies(ci: ConnectionInfo, cookies: Mubble.uObject<string>): void;
    redirectTo(rc: RunContextServer, ci: ConnectionInfo, url: string): Promise<void>;
}
