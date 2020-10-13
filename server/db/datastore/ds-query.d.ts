import { RunContextServer } from '../../rc-server';
import { BaseDatastore, BASEDATASTORE_PROTECTED_FIELDS, DATASTORE_COMPARISON_SYMBOL } from './basedatastore';
export declare class DSQuery<T extends BaseDatastore<T>> {
    private datastore;
    private _query;
    private model;
    private namespace;
    private kindName;
    private indexed;
    constructor(rc: RunContextServer, datastore: any, kindName: string, model: any, namespace?: string);
    run(rc: RunContextServer): Promise<[T[], any] | undefined>;
    runCursor(rc: RunContextServer, pageCursor?: string): Promise<[T[], {
        moreResults?: any;
        endCursor?: any;
    }] | null>;
    runCursorTillNoMoreResults(rc: RunContextServer, filter?: (item: T) => boolean): Promise<T[]>;
    filter(key: keyof T | BASEDATASTORE_PROTECTED_FIELDS, value: T[keyof T] | number | boolean, symbol?: DATASTORE_COMPARISON_SYMBOL): DSQuery<T>;
    multiFilter(keyPairs: Array<{
        key: keyof T;
        value: T[keyof T] | number | boolean;
        symbol?: DATASTORE_COMPARISON_SYMBOL;
    }>): DSQuery<T>;
    order(key: keyof T | BASEDATASTORE_PROTECTED_FIELDS, descending?: boolean): DSQuery<T>;
    multiOrder(keyPairs: Array<{
        key: keyof T;
        descending: boolean;
    }>): DSQuery<T>;
    hasAncestor(key: any): DSQuery<T>;
    limit(val: number): DSQuery<T>;
    groupBy(val: keyof T): DSQuery<T>;
    select(val: Array<keyof T>): DSQuery<T>;
    mQueryOr(rc: RunContextServer, key: keyof T, values: Array<T[keyof T]>): Promise<T[]>;
}
