/// <reference types="node" />
import { Mubble } from '@mubble/core';
import * as stream from 'stream';
export declare class HttpsEncProvider {
    private reqAesKey;
    private respAesKey;
    private privateKey;
    constructor(pk: string);
    encodeRequestKey(publicKey: string): string;
    decodeRequestKey(encKey: string): Buffer;
    encodeRequestTs(ts: number): string;
    decodeRequestTs(publicKey: string, encReqTs: string): number;
    encodeBody(data: Mubble.uObject<any>, response: boolean): {
        streams: Array<stream.Writable>;
        dataStr: string;
        bodyEncoding: string;
        contentLength?: number;
    };
    decodeBody(streams: Array<stream.Readable>, encoding: string, response: boolean): Array<stream.Readable>;
    encodeResponseKey(): string;
    decodeResponseKey(publicKey: string, encKey: string): Buffer;
    encodeThirdPartyRequestPath(data: Mubble.uObject<any>): string;
    decodeThirdPartyRequestPath(encDataStr: string): Mubble.uObject<any>;
    private encryptRequestTs;
    private decryptRequestTs;
    private encryptBody;
    private decryptBody;
    private getNewAesKey;
    private getCipher;
    private getDecipher;
    private encryptUsingReqAesKey;
    private decryptUsingReqAesKey;
    private getFinalContentLength;
    private encryptUsingPublicKey;
    private decryptUsingPublicKey;
    private encryptUsingPrivateKey;
    private decryptUsingPrivateKey;
}
