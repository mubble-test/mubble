import { RunContextServer } from '../../rc-server';
import { BaseDatastore, BASEDATASTORE_PROTECTED_FIELDS, DATASTORE_COMPARISON_SYMBOL } from './basedatastore';
export declare class DSTQuery<T extends BaseDatastore<T>> {
    private transaction;
    private namespace;
    private kindName;
    private _tQuery;
    constructor(rc: RunContextServer, transaction: any, namespace: string, kindName: string);
    run(rc: RunContextServer): Promise<[T[], any] | undefined>;
    runCursor(rc: RunContextServer, pageCursor?: string): Promise<[T[], {
        moreResults?: any;
        endCursor?: any;
    }] | null>;
    filter(key: keyof T | BASEDATASTORE_PROTECTED_FIELDS, value: T[keyof T] | number | boolean, symbol?: DATASTORE_COMPARISON_SYMBOL): DSTQuery<T>;
    multiFilter(keyPairs: Array<{
        [index: string]: {
            key: string;
            value: any;
            symbol?: DATASTORE_COMPARISON_SYMBOL;
        };
    }>): DSTQuery<T>;
    order(key: keyof T | BASEDATASTORE_PROTECTED_FIELDS, descending?: boolean): DSTQuery<T>;
    multiOrder(keyPairs: Array<{
        [index: string]: {
            key: string;
            descending: boolean;
        };
    }>): DSTQuery<T>;
    hasAncestor(key: any): DSTQuery<T>;
    limit(val: number): DSTQuery<T>;
    groupBy(val: keyof T): DSTQuery<T>;
    select(val: Array<keyof T>): DSTQuery<T>;
}
