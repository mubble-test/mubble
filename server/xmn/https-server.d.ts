/// <reference types="node" />
import { ConnectionInfo, XmnProvider, Mubble, WireObject } from '@mubble/core';
import { SecurityError } from './security-errors';
import { RunContextServer } from '../rc-server';
import { XmnRouterServer } from './xmn-router-server';
import { HttpsEncProvider } from './https-enc-provider';
import * as http from 'http';
export declare class HttpsServer {
    private refRc;
    private router;
    private providerMap;
    constructor(refRc: RunContextServer, router: XmnRouterServer);
    requestHandler(req: http.IncomingMessage, res: http.ServerResponse): Promise<void>;
    markFinished(provider: HttpsServerProvider): void;
    cbTimerPing(): void;
}
export declare class HttpsServerProvider implements XmnProvider {
    private refRc;
    private ci;
    private router;
    private res;
    private encProvider;
    private server;
    private finished;
    private wireRequest;
    constructor(refRc: RunContextServer, ci: ConnectionInfo, router: XmnRouterServer, res: http.ServerResponse, encProvider: HttpsEncProvider, server: HttpsServer);
    send(rc: RunContextServer, woArr: Array<WireObject>): void;
    requestClose(): void;
    processRequest(rc: RunContextServer, apiName: string, apiParams: Mubble.uObject<any>, reqId: number): void;
    sendErrorResponse(rc: RunContextServer, errorCode: string, apiName?: string, reqId?: number): void;
    sendProtocolErrorResponse(rc: RunContextServer, errorCode: SecurityError, apiName?: string, reqId?: number): void;
}
