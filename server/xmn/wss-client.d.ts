import { WssProviderConfig, Mubble } from '@mubble/core';
import { RunContextServer } from '../rc-server';
import { ServerCredentials } from './credential-registry';
export declare class WssClient {
    private refRc;
    private requestServer;
    private wssConfig;
    private selfId;
    private unsecured?;
    private socket;
    private encProvider;
    private ongoingRequests;
    private handshakeEstablished;
    private sending;
    private openPromise;
    private handshakePromise;
    constructor(refRc: RunContextServer, requestServer: ServerCredentials, wssConfig: WssProviderConfig, selfId: string, unsecured?: boolean | undefined);
    sendRequest(rc: RunContextServer, apiName: string, params: Mubble.uObject<any>): Promise<unknown>;
    closeConnection(rc: RunContextServer): void;
    private sendInternal;
    private establishHandshake;
    private onOpen;
    private onMessage;
    private onClose;
    private onError;
    private processMessage;
    private finishRequest;
    private cleanUp;
}
