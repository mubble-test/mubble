import { RunContextServer } from '../rc-server';
import { ModelConfig } from './ma-model-config';
import { Mubble } from '@mubble/core';
import { MasterCache } from './ma-types';
export declare namespace Master {
    type IDType = object | number | string;
    function modelType(config: ModelConfig): (target: any) => void;
    enum FieldType {
        PRIMARY = 1,
        MANDATORY = 2,
        OPTIONAL = 3
    }
    function field(type?: FieldType): (target: any, propertyKey: string) => void;
    function primaryKey(): (target: any, propertyKey: string) => void;
    function validityRule(validFromFld: string, validTillFld: string): (target: any) => void;
    function versionField(prototype: any, propKey: string): void;
    function withinList(list: any[]): (prototype: any, propKey: string) => void;
    function objPropertiesIn(list: string[]): (prototype: any, propKey: string) => void;
    function objectStructure(struc: any): (prototype: any, propKey: string) => void;
    function inRange(minVal: number, maxVal: number, defaultIgnoreVal?: number): (prototype: any, propKey: string) => void;
    type ForeignKeys = Mubble.uObject<Mubble.uObject<string>>;
    function getDefaultConfig(segment?: {
        key: string;
        cols: string[];
    }, fk?: ForeignKeys, fileSource?: boolean): ModelConfig;
}
export declare var MasterBaseFields: {
    Deleted: string;
    CreateTs: string;
    ModTs: string;
};
export declare class MasterBase {
    createTs: number;
    modTs: number;
    deleted: boolean;
    _mastername: string;
    _rc: RunContextServer;
    constructor(context: RunContextServer, masterName: string);
    verifyRecord(rc: RunContextServer, newObj: object, oldObj?: object): Promise<boolean>;
    verifyAllDependency(context: RunContextServer, masterCache: MasterCache): (string | undefined);
    syncGetModifications(context: RunContextServer, oRet: {
        mod: any[];
        del: any[];
    }): {
        mod: any[];
        del: any[];
    };
    matchSegment(context: RunContextServer, arClientSeg: any[][], colSeg: string[], rec: any): boolean;
    static matchSegmentStartEndVersion(rc: RunContextServer, arClientSeg: any[][], colSeg: string[], rec: any): boolean;
}
