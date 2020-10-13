import { RedisWrapper } from '../cache/redis-wrapper';
import { MasterBase } from './ma-base';
import { RunContextServer } from '../rc-server';
import { MasterInMemCache, DigestInfo } from './ma-mem-cache';
import { SyncRequest, SyncResponse, Mubble } from '@mubble/core';
export declare class SourceSyncData {
    mastername: string;
    source: Mubble.uObject<object>;
    redisData: Mubble.uObject<object>;
    inserts: Mubble.uObject<object>;
    updates: Mubble.uObject<object>;
    deletes: Mubble.uObject<object>;
    modifyTs: number;
    constructor(master: string, source: Mubble.uObject<object>, target: Mubble.uObject<object>, now: number);
}
export declare class MasterMgr {
    mredis: RedisWrapper;
    sredis: RedisWrapper;
    subRedis: RedisWrapper;
    masterCache: Mubble.uObject<MasterInMemCache>;
    rc: RunContextServer;
    dependencyMap: Mubble.uObject<string[]>;
    revDepMap: Mubble.uObject<string[]>;
    private masterChangeSubs;
    static created: boolean;
    constructor();
    /**
     * Get the master records stored in cache
     * @param mastername  name of the master
     * @param deleted whether you want the deleted records also. default false. Only non deleted
     */
    getMasterRecords<T extends MasterBase>(mastername: string, deleted?: boolean): T[];
    getMasterHashRecords<T extends MasterBase>(mastername: string): Mubble.uObject<T>;
    subscribeToMasterChange(rc: RunContextServer, mastername: string, cb: (newData: MasterBase[]) => void): void;
    init(rc: RunContextServer, mredisUrl: string, sredisUrl: string): Promise<any>;
    private buildDependencyMap;
    checkSlaveMasterSync(rc: RunContextServer, assertCheck: boolean): Promise<any>;
    setSubscriptions(rc: RunContextServer): Promise<void>;
    refreshSelectModels(masters: string[]): Promise<void>;
    refreshAModel(mastername: string, dinfo: DigestInfo): Promise<void>;
    syncMasterDataWithJson(rc: RunContextServer, master: string): Promise<void>;
    applyFileData(rc: RunContextServer, arModels: {
        master: string;
        source: string;
    }[]): Promise<void>;
    applySingleItem(rc: RunContextServer, master: string, srcRec: Object): Promise<void>;
    deleteSingleMaster(rc: RunContextServer, master: string, srcRec: Object): Promise<void>;
    applyFileDataFromPath(rc: RunContextServer, masters: {
        master: string;
        masterFilePath: string;
    }[]): Promise<void>;
    private setParentMapData;
    applyJsonData(rc: RunContextServer, mastername: string, jsonRecords: any[], redisRecords: Mubble.uObject<object>): Promise<object[] | undefined>;
    destinationSync(rc: RunContextServer, syncReq: SyncRequest): Promise<SyncResponse>;
    private applyData;
    private updateMRedis;
    private buildInMemoryCache;
    private getDigestMap;
    listAllMasterData(rc: RunContextServer, master: string): Promise<Mubble.uObject<object>>;
    listSingleMasterItem(rc: RunContextServer, master: string, key: string): Promise<object | null>;
    listActiveMasterData(rc: RunContextServer, master: string): Promise<Mubble.uObject<object>>;
    close(): Promise<void>;
    private static _getLatestRec;
}
