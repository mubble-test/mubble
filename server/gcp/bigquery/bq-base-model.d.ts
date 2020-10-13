import { RunContextServer } from '../../rc-server';
import { Dataset, Table, InsertRowsOptions } from '@google-cloud/bigquery';
import { BigqueryRegistry } from './bigquery-registry';
export declare type TABLE_CREATE_OPTIONS = {
    schema: any;
    timePartitioning?: any;
    requirePartitionFilter?: boolean;
};
export declare function CheckUndefined(obj: any, nestingLevel?: number): void;
export declare abstract class BqBaseModel {
    abstract fieldsError(rc: RunContextServer): string | null;
    static DATE_FORMAT: string;
    private options;
    private insertOptions;
    constructor(rc: RunContextServer);
    protected copyConstruct(bqItem: any): void;
    getTableName(rc: RunContextServer): string;
    getDatasetName(rc: RunContextServer): string;
    tableExists(rc: RunContextServer): Promise<boolean>;
    getTableOptions(rc: RunContextServer): TABLE_CREATE_OPTIONS;
    getTableInsertOptions(rc: RunContextServer): InsertRowsOptions;
    init(rc: RunContextServer): Promise<void>;
    getDataStoreTable(rc: RunContextServer): Promise<any>;
    insert(rc: RunContextServer): Promise<void>;
    streamBulkInsert<T extends BQInsertObject>(rc: RunContextServer, items: T[]): Promise<void>;
    streamInsert(rc: RunContextServer): Promise<void>;
    static getTableData(rc: RunContextServer, query: any, useLegacySql?: boolean): Promise<import("@google-cloud/bigquery").SimpleQueryRowsResponse>;
    bulkInsert<T extends BqBaseModel>(rc: RunContextServer, items: T[]): Promise<void>;
    static listTables(rc: RunContextServer, dsName: string): Promise<Table[]>;
    static deleteTable(rc: RunContextServer, id: string, dsName: string): Promise<void>;
    getDataset(rc: RunContextServer, registry: BigqueryRegistry): Promise<Dataset>;
}
export interface BQInsertObject {
    insertId: string;
    json: any;
}
