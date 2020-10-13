import { RunContextServer } from '../rc-server';
import { SyncHashModel, Segments, SyncModelResponse, Mubble } from '@mubble/core';
export declare class SyncInfo {
    ts: number;
    seg: object;
    dataDigest: string;
    modelDigest: string;
}
export declare class DigestInfo {
    fileDigest: string;
    modelDigest: string;
    modTs: number;
    dataDigest: string;
    segDigestMap: Mubble.uObject<string>;
    constructor(fDigest: string, modelDigest: string, ts: number, dDigest: string, segMap: Mubble.uObject<string>);
    static getDigest(val: any, masterKey: string): DigestInfo;
}
export declare class MasterInMemCache {
    mastername: string;
    cache: boolean;
    records: any[];
    hash: Mubble.uObject<object>;
    modTSField: string;
    digestInfo: DigestInfo;
    getMaxTS(): number;
    getMinTS(): number;
    hasRecords(): boolean;
    latestRecTs(): number;
    constructor(rc: RunContextServer, mastername: string, data: Mubble.uObject<object>, dInfo: DigestInfo);
    update(rc: RunContextServer, newData: Mubble.uObject<object>, dInfo: DigestInfo): {
        inserts: number;
        updates: number;
    };
    syncCachedData(rc: RunContextServer, segments: Segments, syncInfo: SyncHashModel, purge: boolean): SyncModelResponse;
    private arrayDiff;
    syncNonCachedData(rc: RunContextServer, segments: Segments, masterData: Mubble.uObject<object>, syncInfo: SyncHashModel, purge: boolean): SyncModelResponse;
}
