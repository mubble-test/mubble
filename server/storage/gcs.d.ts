/// <reference types="node" />
import { SaveOptions } from '@google-cloud/storage';
import { RunContextServer } from '../rc-server';
export declare type SaveFileOptions = SaveOptions;
export declare class GoogleCloudStorage {
    private static storage;
    private static initialized;
    static init(rc: RunContextServer, projectId: string, credentialsPath: string): void;
    static close(rc: RunContextServer): void;
    static saveFile(rc: RunContextServer, bucket: string, filePath: string, fileData: Buffer, options?: SaveFileOptions): Promise<string>;
    static deleteFile(rc: RunContextServer, bucket: string, filePath: string): Promise<void>;
    static fileExists(rc: RunContextServer, bucket: string, filePath: string): Promise<boolean>;
}
