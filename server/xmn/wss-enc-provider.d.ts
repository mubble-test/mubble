/// <reference types="node" />
import { WireObject, WssProviderConfig } from '@mubble/core';
export declare class WssEncProvider {
    private privateKey;
    private reqAesKey;
    private respAesKey;
    constructor(privateKey: string);
    getRespAesKey(): string;
    encodeRequestUrl(tsMicro: number, wssConfig: WssProviderConfig, publicKey: string): string;
    decodeRequestUrl(encData: string, publicKey?: string): {
        tsMicro: number;
        wssConfig: WssProviderConfig;
    };
    encodeHandshakeMessage(wo: WireObject): Promise<Buffer>;
    decodeHandshakeMessage(totalBuf: Buffer): Promise<WireObject>;
    encodeBody(woArr: Array<WireObject>, app: boolean): Promise<Buffer>;
    decodeBody(totalBuf: Buffer, app: boolean): Promise<Array<WireObject>>;
    private encryptRequestConfig;
    private decryptRequestConfig;
    private encryptUsingPrivateKey;
    private decryptyUsingPrivateKey;
    private encryptUsingPublicKey;
    private decryptUsingPublicKey;
    private encryptUsingAesKey;
    private decryptUsingAesKey;
    private getNewAesKey;
    private getLeader;
    private encryptBinaryBody;
    private stringifyWireObjects;
    private parseWireObjectsString;
}
