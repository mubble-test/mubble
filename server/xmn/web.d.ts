/// <reference types="node" />
import * as http from 'http';
import * as https from 'https';
import { XmnRouterServer } from './xmn-router-server';
import { WssServer } from './wss-server';
import { RunContextServer } from '../rc-server';
export declare enum WEB_SERVER_TYPE {
    HTTP = 0,
    HTTPS = 1,
    WEB_SOCKET = 2
}
export interface WebConfig {
    port: number;
}
export interface HttpConfig extends WebConfig {
}
export interface WebsocketConfig extends WebConfig {
}
export interface WssConfig extends WebConfig {
    key: string;
    cert: string;
}
export interface HttpsConfig extends WebConfig {
    key: string;
    cert: string;
}
export declare class Web {
    private httpConfig;
    private websocketConfig;
    private httpsConfig;
    private thirdHttpsConfig;
    private httpServer;
    private wsHttpServer;
    private httpsServer;
    private thirdHttpServer;
    private router;
    wsReqManager: WssServer;
    constructor();
    init(rc: RunContextServer, router: XmnRouterServer, httpConfig?: HttpConfig, httpsConfig?: HttpsConfig, websocketConfig?: WebsocketConfig, thirdHttpConfig?: HttpConfig): void;
    start(rc: RunContextServer): Promise<void>;
    listen(rc: RunContextServer, httpServer: http.Server | https.Server, config: WebConfig): Promise<unknown>;
}
export declare const web: Web;
