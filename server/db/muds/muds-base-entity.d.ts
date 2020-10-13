/// <reference types="google-cloud__datastore" />
import { MeField, MudsEntityInfo } from './muds-manager';
import { DatastoreInt, DsRec } from '..';
import { MudsIo } from './muds-io';
import { RunContextServer } from '../../rc-server';
import { Mubble } from '@mubble/core';
import * as DsEntity from '@google-cloud/datastore/entity';
export declare type IMudsCacheEntity<T extends MudsBaseStruct> = T;
export declare class MudsBaseStruct {
    protected rc: RunContextServer;
    protected io: MudsIo;
    protected entityInfo: MudsEntityInfo;
    constructor(rc: RunContextServer, io: MudsIo, recObj?: Mubble.uObject<any>, fullRec?: boolean);
    getLogId(): string;
    getInfo(): MudsEntityInfo;
    protected checkMandatory(rc: RunContextServer): void;
    protected RecheckArrays(rc: RunContextServer): void;
    serialize(): Mubble.uObject<any>;
    $dump(): void;
    toString(indent?: number): string;
    private $key;
    private $rowHead;
}
export declare type DatastorePayload = {
    key: DsEntity.DatastoreKey;
    data: DsRec;
    excludeFromIndexes: string[];
};
export declare class MudsBaseEntity extends MudsBaseStruct {
    private ancestorKeys;
    private selfKey?;
    private savePending;
    _id: string;
    constructor(rc: RunContextServer, io: MudsIo, ancestorKeys: (string | DatastoreInt)[], selfKey?: string | DsEntity.DatastoreInt | undefined, recObj?: Mubble.uObject<any>, fullRec?: boolean);
    serializeToJson<T extends MudsBaseStruct>(): T;
    hasValidKey(): boolean;
    isModified(): boolean;
    hasData(): boolean;
    isSavePending(): boolean;
    getLogId(): string;
    getFullKey(): (string | DatastoreInt)[];
    getAncestorKey(): (string | DsEntity.DatastoreInt)[];
    getSelfKey(): string | DsEntity.DatastoreInt | undefined;
    getStringKey(key?: DatastoreInt | string | undefined): string | undefined;
    convertForUpsert(rc: RunContextServer): DatastorePayload;
    commitUpsert(path: any): void;
}
export declare class FieldAccessor {
    private entityName;
    private fieldName;
    private meField;
    readonly ovFieldName: string;
    readonly cvFieldName: string;
    readonly basicType: boolean;
    constructor(entityName: string, fieldName: string, meField: MeField);
    getAccessor(): {
        get: () => any;
        set: (value: any) => void;
    };
    getter(inEntity: MudsBaseStruct): any;
    setter(inEntity: MudsBaseStruct, newValue: any): void;
    private getId;
    private getOriginal;
    private setOriginal;
    validateType(newValue: any): void;
    validateInternal(value: any, fieldType: any): void;
    serialize(inEntity: MudsBaseStruct): any;
    buildExclusions(rc: RunContextServer, inEntity: MudsBaseStruct, arExclude: string[]): void;
    private buildNestedExclusions;
    isModified(inEntity: MudsBaseStruct): boolean;
    init(rc: RunContextServer, inEntity: MudsBaseStruct, newValue: any, dsValue: any, fullRec: boolean): void;
    commitUpsert(inEntity: MudsBaseStruct): void;
    $printField(inEntity: MudsBaseStruct, indent?: number): string;
}
