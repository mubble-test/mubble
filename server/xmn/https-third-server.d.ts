/// <reference types="node" />
import { XmnProvider, ConnectionInfo, Mubble } from '@mubble/core';
import { RunContextServer } from '../rc-server';
import { XmnRouterServer } from './xmn-router-server';
import * as http from 'http';
export declare class HttpsThirdServer {
    private refRc;
    private router;
    private providerMap;
    constructor(refRc: RunContextServer, router: XmnRouterServer);
    requestHandler(req: http.IncomingMessage, res: http.ServerResponse): Promise<void>;
    markFinished(provider: HttpsThirdServerProvider): void;
    cbTimerPing(): void;
    private endRequestWithNotFound;
}
export declare class HttpsThirdServerProvider implements XmnProvider {
    private refRc;
    private router;
    private ci;
    private req;
    private res;
    private server;
    private responseHeaders;
    private finished;
    constructor(refRc: RunContextServer, router: XmnRouterServer, ci: ConnectionInfo, req: http.IncomingMessage, res: http.ServerResponse, server: HttpsThirdServer);
    processRequest(rc: RunContextServer, apiName: string, apiParams: Mubble.uObject<any>, query: string, reqId: number): Promise<void>;
    send(rc: RunContextServer, data: any): void;
    requestClose(): void;
    getCookies(): Mubble.uObject<string>;
    setCookies(cookies: Mubble.uObject<string>): void;
    redirect(rc: RunContextServer, url: string): void;
    private parseBody;
    private appendParams;
    private parseQuery;
}
