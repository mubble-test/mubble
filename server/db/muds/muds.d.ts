/// <reference types="google-cloud__datastore" />
import { MudsBaseEntity, IMudsCacheEntity, MudsBaseStruct } from './muds-base-entity';
import { MudsTransaction, MudsDirectIo, MudsIo } from './muds-io';
import { MudsQuery } from './muds-query';
import { RunContextServer } from '../..';
import { Mubble } from '@mubble/core';
import { MudsUtil } from './muds-util';
import { RedisWrapper } from '../../cache/redis-wrapper';
import * as DsEntity from '@google-cloud/datastore/entity';
export declare type DatastoreInt = DsEntity.DatastoreInt;
export declare type DatastoreKey = DsEntity.DatastoreKey;
export declare type FieldType = StringConstructor | BooleanConstructor | NumberConstructor | ObjectConstructor | ArrayConstructor | Muds.IBaseStruct<MudsBaseStruct>;
export declare type ArrayField = StringConstructor | NumberConstructor | Muds.IBaseStruct<MudsBaseStruct>;
export declare type DsRec = Object & {
    [name: string]: string | number | boolean | MudsBaseStruct | Array<string | number | MudsBaseStruct>;
};
export declare enum EntityType {
    Dummy = 0,
    Struct = 1,
    Normal = 2
}
export declare class Muds {
    private static manager;
    /**
     * * Annotation to mark a class as Normal Muds Entity (Mandatory: one of entity / embeddedEntity / dummmy )
     * * Name of entity is fixed based on the class name. Entity classes cannot be minified or renamed
     * * Level: Class declaration
     */
    static entity(version: number, pkType: Muds.Pk): (target: any) => void;
    /**
     * * Annotation to mark a class as Dummy Muds Entity (Mandatory: one of entity / embeddedEntity / dummmy )
     * * A dummy entity that is kept just to build the hierarchical ancestor chain.  No IO is permitted on them directly
     * * Level: Class declaration
     */
    static dummy(pkType: Muds.Pk): (target: any) => void;
    /**
     * * Annotation to mark a class as Muds Struct (Mandatory: one of entity / Struct / dummmy )
     * * A struct allows field level validations when used in entity
     * * Level: Class declaration
     */
    static struct(): (target: any) => void;
    /**
     * * Optional annotation to provide ancestors of an entity
     * * You should list them in same order as in the key. Example => grandfather, father
     * * Level: Class declaration
     */
    static ancestors(...modelNames: (Function | {
        new (): Muds.BaseEntity;
    })[]): (target: any) => void;
    /**
     * * Optional annotation to provide composite indexes of an entity
     * * You should have a real good reason why you need this as composite indexes
     * * are sparingly available (total 200 for a project)
     *
     * Pending
     * * Check presence of composite index before running a query
     * * Allow composite index on embedded entity
     *
     * * Level: Class declaration
     */
    static compositeIndex(idxObj: Mubble.uObject<Muds.Asc | Muds.Dsc>): (target: any) => void;
    /**
     * * Annotation to mark a field of Muds Entity (Mandatory: one of field / indexed / embedded entity )
     * * presence=Muds.Opt, field is optional. Muds.Man means that field should atleast be set null
     * * typeHint=Field type when it cannot be auto detected example Array
     *
     * * Level: property declaration
     */
    static field(presence: Muds.Presence, typeHint?: ArrayField): (target: any, propertyKey: string) => void;
    /**
     * * Marks a property for as indexed in datastore.
     * * Read documentation of Muds.field
     * * For an indexed field, when presence is changed to 'false': we will need to run data migration
     * * Level: property declaration
     */
    static indexed(presence: Muds.Presence, typeHint?: ArrayField): (target: any, propertyKey: string) => void;
    /**
     * * Marks a property for as unique and indexed in datastore.
     * * Read documentation of Muds.field
     * * For a unique field, presence value cannot become true, if it was false earlier
     * * Level: property declaration
     */
    static unique(presence: Muds.Presence, typeHint?: ArrayField): (target: any, propertyKey: string) => void;
    /**
     * * Initialize Muds
     * * entities: All entities must be identified. To facilitate this list is taken as dummy input
     * * Level: property declaration
     */
    static init(rc: RunContextServer, gcloudEnv: any, trRedis: RedisWrapper, namespace?: string): void;
    static transaction(rc: RunContextServer, callback: (transaction: Muds.Transaction, now: number) => Promise<any>): Promise<any>;
    static direct(rc: RunContextServer, callback: (directIo: Muds.DirectIo, now: number) => Promise<any>): Promise<any>;
    /**
     * * Creates a numeric key that can be inserted into db
     * * As JS integer cannot handle full range of DS Integers, we only use
     * * This api is given for consistency in handling keys
     */
    static getIntKey(id: number | string): DatastoreInt;
}
export declare namespace Muds {
    const BaseEntity: typeof MudsBaseEntity;
    type BaseEntity = MudsBaseEntity;
    const BaseStruct: typeof MudsBaseStruct;
    type BaseStruct = MudsBaseStruct;
    const Transaction: typeof MudsTransaction;
    type Transaction = MudsTransaction;
    const DirectIo: typeof MudsDirectIo;
    type DirectIo = MudsDirectIo;
    const Query: typeof MudsQuery;
    type Query = MudsQuery<MudsBaseEntity>;
    const getMpoc: typeof MudsUtil.getMpoc;
    type ICacheEntity<T extends Muds.BaseEntity> = IMudsCacheEntity<T>;
    const NamespaceSeperator = ".";
    enum Pk {
        None = 0,
        Auto = 1,
        /**
         * ** WARNING ** Strongly discouraged when entity has no parent,
         * contiguous numbers create hot tablets.
        */
        Numeric = 2,
        String = 3
    }
    type Man = 'mandatory';
    type Opt = 'optional';
    const Man = "mandatory";
    const Opt = "optional";
    type Asc = 'ascending';
    type Dsc = 'descending';
    const Asc = "ascending";
    const Dsc = "descending";
    type Presence = Muds.Man | Muds.Opt;
    interface IBaseStruct<T extends Muds.BaseStruct> {
        new (rc: RunContextServer, io: MudsIo, recObj?: DsRec, fullRec?: boolean): T;
    }
    interface IBaseEntity<T extends Muds.BaseEntity> {
        new (rc: RunContextServer, io: MudsIo, ancestorKey: (string | DatastoreInt)[], selfKey?: (string | DatastoreInt), recObj?: DsRec, fullRec?: boolean): T;
    }
    const Error: Readonly<{
        RNF: string;
    }>;
}
