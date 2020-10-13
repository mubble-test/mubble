/// <reference types="node" />
import { WireObject, XmnProvider, ConnectionInfo, WssProviderConfig } from '@mubble/core';
import { RunContextServer } from '../rc-server';
import { XmnRouterServer } from './xmn-router-server';
import { WssEncProvider } from './wss-enc-provider';
import * as https from 'https';
import * as http from 'http';
export declare class WssServer {
    private refRc;
    private router;
    private server;
    private socketMap;
    constructor(refRc: RunContextServer, router: XmnRouterServer, httpsServer: http.Server | https.Server);
    private establishHandshake;
    markActive(wssProvider: WssServerProvider): void;
    markClosed(wssProvider: WssServerProvider): void;
    sendEventToAll(rc: RunContextServer, wo: WireObject): Promise<void>;
    sendEventToUserLinkId(rc: RunContextServer, wo: WireObject, userLinkId: string): Promise<void>;
    private cbTimerPing;
}
export declare class WssServerProvider implements XmnProvider {
    private refRc;
    private socket;
    private ci;
    private router;
    private encProvider;
    private wssConfig;
    private appClient;
    private wssServer;
    constructor(refRc: RunContextServer, socket: any, ci: ConnectionInfo, router: XmnRouterServer, encProvider: WssEncProvider, wssConfig: WssProviderConfig, appClient: boolean, wssServer: WssServer);
    getUserLinkId(): string;
    send(rc: RunContextServer, woArr: Array<WireObject>): Promise<void>;
    requestClose(rc: RunContextServer): void;
    private onOpen;
    private onMessage;
    private processMessage;
    private onClose;
    private onError;
    private closeInternal;
}
