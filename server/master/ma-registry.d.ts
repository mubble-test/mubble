import "reflect-metadata";
import { RunContextServer } from '../rc-server';
import { Master, MasterBase } from './ma-base';
import { ModelConfig } from './ma-model-config';
import { Mubble } from '@mubble/core';
export declare const MASTERBASE: string;
export declare type MasterFieldType = 'string' | 'object' | 'number' | 'boolean' | 'array';
export declare class FieldInfo {
    name: string;
    type: MasterFieldType;
    constraint: Master.FieldType;
    targetName: string;
    rules: ((obj: any) => void)[];
    constructor(name: string, targetName: string, type: MasterFieldType, constraint?: Master.FieldType);
    toString(): string;
    isMasterBaseField(): boolean;
}
export declare class MasterRegistry {
    constructor(master: string);
    mastername: string;
    masterInstance: MasterBase;
    pkFields: string[];
    fieldsMap: Mubble.uObject<FieldInfo>;
    config: ModelConfig;
    autoFields: string[];
    optionalFields: string[];
    ownFields: string[];
    allFields: string[];
    cachedFields: string[];
    destSyncFields: string[];
    getIdStr(src: any): string;
    getIdObject(src: any): any;
    verifyInternal(construct: any): void;
    verify(context: RunContextServer): void;
    addFieldRule(fieldName: string, target: object, rule: ((obj: any) => void)): void;
    addField(fieldName: string, masType: Master.FieldType, target: object): void;
    isAllowedFileUpload(): void;
    getModelDigest(): string;
}
