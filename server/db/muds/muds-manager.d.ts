import 'reflect-metadata';
import { Muds, FieldType, ArrayField, EntityType } from './muds';
import { MudsBaseEntity, MudsBaseStruct, FieldAccessor } from './muds-base-entity';
import { Mubble } from '@mubble/core';
import { RunContextServer } from '../..';
import { RedisWrapper } from '../../cache/redis-wrapper';
export declare class MeField {
    readonly fieldName: string;
    readonly fieldType: FieldType;
    readonly typeHint: ArrayField | undefined;
    readonly mandatory: boolean;
    readonly indexed: boolean;
    readonly unique: boolean;
    accessor: FieldAccessor;
    constructor(fieldName: string, fieldType: FieldType, typeHint: ArrayField | undefined, mandatory: boolean, indexed: boolean, unique: boolean);
}
export declare class MudsEntityInfo {
    readonly cons: {
        new (): MudsBaseEntity;
    };
    readonly version: number;
    readonly keyType: Muds.Pk;
    readonly entityType: EntityType;
    readonly entityName: string;
    readonly ancestors: MudsEntityInfo[];
    readonly fieldMap: Mubble.uObject<MeField>;
    readonly fieldNames: string[];
    readonly uniqueFields: {
        [i: string]: string[];
    };
    readonly compositeIndices: Mubble.uObject<Muds.Asc | Muds.Dsc>[];
    constructor(cons: {
        new (): MudsBaseEntity;
    }, version: number, keyType: Muds.Pk, entityType: EntityType);
}
export declare class MudsManager {
    private entityInfoMap;
    private datastore;
    private entityNames;
    private trRedis;
    private namespacePrefix;
    private tempAncestorMap;
    private tempEntityFieldsMap;
    private tempCompIndices;
    getDatastore(): any;
    getCacheReference(): RedisWrapper;
    getInfo(entityClass: Function | Muds.IBaseStruct<MudsBaseStruct> | Muds.IBaseEntity<MudsBaseEntity> | string): MudsEntityInfo;
    getInfoMap(): Mubble.uObject<MudsEntityInfo>;
    registerEntity<T extends Muds.BaseEntity>(version: number, pkType: Muds.Pk, entityType: EntityType, cons: {
        new (): T;
    }): void;
    registerAncestors<T extends Muds.BaseEntity>(ancestors: {
        new (): Muds.BaseEntity;
    }[], cons: {
        new (): T;
    }): void;
    registerCompositeIndex<T extends Muds.BaseEntity>(idxObj: Mubble.uObject<Muds.Asc | Muds.Dsc>, cons: {
        new (): T;
    }): void;
    registerField({ mandatory, typeHint, indexed, unique }: {
        mandatory?: boolean | undefined;
        typeHint?: undefined;
        indexed?: boolean | undefined;
        unique?: boolean | undefined;
    }, target: any, fieldName: string): {
        get: () => any;
        set: (value: any) => void;
    };
    private checkInitStatus;
    private validateType;
    init(rc: RunContextServer, gcloudEnv: any, trRedis: RedisWrapper, namespacePrefix?: string): void;
    getNamespacePrefix(): string;
    private extractFromMap;
    private valAndProvisionAncestors;
    private populateUniq;
    private valAndProvisionCompIndices;
    private validateIndices;
    private areFieldsIndexed;
    private hasUniqueField;
    private finalizeDataStructures;
}
