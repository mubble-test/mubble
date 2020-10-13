/// <reference types="google-cloud__datastore" />
import * as DsEntity from '@google-cloud/datastore/entity';
import { Query as DsQuery, QueryResult as DsQueryResult } from '@google-cloud/datastore/query';
import { RunContextServer } from '../../rc-server';
import { Muds } from './muds';
import { MudsBaseEntity } from './muds-base-entity';
import { MudsIo } from './muds-io';
export declare type Comparator = '=' | '>' | '>=' | '<' | '<=';
export declare type KEY = '__key__';
export declare const KEY = "__key__";
export declare class MudsQuery<T extends MudsBaseEntity> {
    private rc;
    private io;
    private ancestorKeys;
    private entityClass;
    private readonly entityInfo;
    private readonly filters;
    private readonly orders;
    private readonly selects;
    private readonly groupBys;
    private result;
    constructor(rc: RunContextServer, io: MudsIo, ancestorKeys: DsEntity.DatastoreKey | null, entityClass: Muds.IBaseEntity<T>);
    select(fieldName: keyof T | KEY): this;
    groupBy(fieldName: keyof T | KEY): this;
    filter(fieldName: keyof T | KEY | string, comparator: Comparator, value: any): MudsQuery<T>;
    order(fieldName: keyof T | KEY, ascending?: boolean): this;
    private verifyCriterion;
    private verifyStatusAndFieldName;
    runBasedOnMultipleKeys(keys: string[] | number[]): Promise<MudsQueryResult<T>>;
    run(limit: number, offset?: number): Promise<MudsQueryResult<T>>;
}
export declare class MudsQueryResult<T extends MudsBaseEntity> implements AsyncIterable<T> {
    private rc;
    private io;
    private entityClass;
    private dsQuery;
    private limit;
    private onlySelectedCols;
    private records;
    private endCursor;
    private hasMore;
    private iterator;
    constructor(rc: RunContextServer, io: MudsIo, entityClass: Muds.IBaseEntity<T>, dsQuery: DsQuery, limit: number, result: DsQueryResult, onlySelectedCols: boolean);
    private loadData;
    getCurrentRecs(): T[];
    [Symbol.asyncIterator](): AsyncIterator<T>;
    getNext(): Promise<T | undefined>;
    $dump(): Promise<void>;
}
