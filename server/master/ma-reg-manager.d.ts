import { RunContextServer } from '../rc-server';
import { Master } from './ma-base';
import { MasterRegistry } from './ma-registry';
import { ModelConfig } from './ma-model-config';
import { SourceSyncData } from './ma-manager';
import { MasterCache } from './ma-types';
import { Mubble } from '@mubble/core';
/**
 * Class Maintaining the Registry of all masters & their field types
 * All Methods are static
 */
export declare class MasterRegistryMgr {
    static regMap: Mubble.uObject<MasterRegistry>;
    static masterList(): string[];
    static masterField(target: any, propKey: string, maType: Master.FieldType): void;
    static addMaster(constructor: any, config: ModelConfig): void;
    static fieldValidationRule(target: any, propKey: string, rule: (obj: any) => void): void;
    static getMasterRegistry(master: string, create?: boolean): MasterRegistry;
    static init(rc: RunContextServer): void;
    static validateBeforeSourceSync(rc: RunContextServer, mastername: string, source: Array<object>, redisData: Mubble.uObject<object>, now: number): Promise<SourceSyncData>;
    static verifyAllDependency(rc: RunContextServer, mastername: string, masterCache: MasterCache): void;
    private static verifySourceRecords;
    private static verifyModifications;
    static verifySingleModification(rc: RunContextServer, registry: MasterRegistry, source: object, target: object | null, now: number): Promise<SourceSyncData>;
    static deleteSingleMaster(rc: RunContextServer, registry: MasterRegistry, pk: string, target: object, now: number): Promise<SourceSyncData>;
    static verifyRedisDataWithJson(rc: RunContextServer, registry: MasterRegistry, jsonSourceIds: Mubble.uObject<object>, redisDataMap: Mubble.uObject<object>): SourceSyncData;
    private static isModified;
}
