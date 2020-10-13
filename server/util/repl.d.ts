import { ConnectionInfo, WireObject, XmnProvider, Mubble, CustomData } from '@mubble/core';
import { RunContextServer } from '../rc-server';
import { XmnRouterServer } from '../xmn/xmn-router-server';
export declare abstract class Repl {
    protected rc: RunContextServer;
    private clientIdentity;
    protected ci: ConnectionInfo;
    protected replServer: any;
    protected provider: ReplProvider;
    constructor(rc: RunContextServer, clientIdentity: Mubble.uObject<any>);
    abstract callApi(apiName: string, param: object, ncInstanceId?: number, userLinkId?: string): Promise<any>;
    init(context?: any): Promise<unknown>;
    _print(...args: any[]): void;
    print(pr: Promise<any>): Promise<void>;
    set pr(pr: Promise<any>);
    createNewConnectionInfo(clientIdentity: CustomData): void;
    getConnectionInfo(): ConnectionInfo;
}
export declare class ReplProvider implements XmnProvider {
    private refRc;
    private ci;
    private router;
    private configSent;
    private requests;
    constructor(refRc: RunContextServer, ci: ConnectionInfo, router: XmnRouterServer);
    start(rc: RunContextServer, wo: WireObject): Promise<{
        data: any;
    }>;
    routeRequest(rc: RunContextServer, apiName: string, param: object): Promise<{
        data: any;
    }>;
    routeEvent(rc: RunContextServer, eventName: string, param: object): Promise<{
        data: any;
    }>;
    send(rc: RunContextServer, data: WireObject[]): void;
    requestClose(): void;
    sendOneMessage(rc: RunContextServer, wo: WireObject, idx: number): void;
}
