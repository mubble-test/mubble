import { WssProviderConfig, Mubble } from '@mubble/core';
import { CredentialRegistry, AppRegistry } from './credential-registry';
import { RunContextServer } from '../rc-server';
import { WssEncProvider } from './wss-enc-provider';
export declare const HANDSHAKE = "__handshake__";
export declare namespace ObopayWssClient {
    type DefaultWssConfig = {
        pingSecs: number;
        maxOpenSecs: number;
        toleranceSecs: number;
    };
    function init(rc: RunContextServer, selfIdentifier: string, wssConfig: DefaultWssConfig, aRegistry: AppRegistry, sRegistry: CredentialRegistry, pk: string): void;
    function obopayApi(rc: RunContextServer, serverId: string, apiName: string, params: Mubble.uObject<any>, custom?: Mubble.uObject<any>, unsecured?: boolean): Promise<unknown>;
    function closeConnection(rc: RunContextServer): void;
    function getWssConfig(incomingConfig: WssProviderConfig, encProvider: WssEncProvider): WssProviderConfig;
    function getEncProvider(): WssEncProvider;
    function verifyClientRequest(rc: RunContextServer, version: string, clientId: string): boolean;
    function verifyVersion(version: string): boolean;
    function verifyClientId(clientId: string): boolean;
    function isAppClient(clientId: string): boolean;
    function isServerClient(clientId: string): boolean;
    function getClientPublicKey(clientId: string): string;
}
