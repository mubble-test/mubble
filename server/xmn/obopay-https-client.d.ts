/// <reference types="node" />
import { Mubble } from '@mubble/core';
import { CredentialRegistry, ServerCredentials } from './credential-registry';
import { RunContextServer } from '../rc-server';
import { HttpsEncProvider } from './https-enc-provider';
import { RedisWrapper } from '../cache';
import * as https from 'https';
import * as stream from 'stream';
export declare namespace ObopayHttpsClient {
    const OBOPAY_STR = "obopay";
    const API_STR = "api";
    type ResultStruct = {
        error: null | string;
        data: number | string | Mubble.uObject<any>;
        errorObj?: Mubble.uObject<any>;
    };
    function init(rc: RunContextServer, selfIdentity: string, registry: CredentialRegistry, pk: string, requestRedis: RedisWrapper): void;
    function obopayApi(rc: RunContextServer, apiName: string, params: Mubble.uObject<any>, serverId: string, syncHashPath?: string): Promise<ResultStruct>;
    function request(rc: RunContextServer, url: string, options: https.RequestOptions, serverPubKey: string, encProvider: HttpsEncProvider, writeStreams: Array<stream.Writable>, dataStr: string, unsecured?: boolean): Promise<ResultStruct>;
    function getEncProvider(): HttpsEncProvider;
    function verifyClientRequest(rc: RunContextServer, clientId: string, version: string, encProvider: HttpsEncProvider, headers: Mubble.uObject<any>, clientIp: string): boolean;
    function verifyClientId(clientId: string): boolean;
    function verifyIp(permittedIps: Array<string>, ip: string): boolean;
    function verifyVersion(version: string): boolean;
    function verifyModule(module: string, apiName: string): boolean;
    function verifyRequestTs(requestTs: number): boolean;
    function addRequestToMemory(xObopayTs: string, xObopayCid: string, apiName: string, messageBody: string): Promise<void>;
    function verifyRequestReplay(requestKey: string): Promise<boolean>;
    function getThirdPartyRequestUrl(rc: RunContextServer, credentials: ServerCredentials, apiName: string, apiParams: Mubble.uObject<any>, unsecured?: boolean): string;
}
