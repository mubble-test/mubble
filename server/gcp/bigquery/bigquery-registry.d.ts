import { BqBase, TABLE_OPTIONS } from './bigquery-base';
import { RunContextServer } from '../../rc-server';
export declare type BqFieldInfo = {
    name: string;
    type: BqBase.FIELD_TYPE;
    mode: BqBase.FIELD_MODE;
    parent?: string;
    fields?: BqFieldInfo[];
};
export declare class BigqueryRegistry {
    private dataset;
    private tableName;
    private partition;
    private version?;
    private fields;
    private tableOptions?;
    constructor(table: string);
    init(dataset: string, options?: TABLE_OPTIONS, version?: number): void;
    addField(field: BqFieldInfo): void;
    addRecordField(field: BqFieldInfo): void;
    getFields(): Array<BqFieldInfo>;
    getNotNullFields(): Array<BqFieldInfo>;
    getFieldNames(): Array<string>;
    getFieldInfo(field: string): BqFieldInfo;
    getDataset(): string;
    getTableName(): string;
    isPartition(): boolean;
    getVersion(): number | undefined;
    getOptions(): TABLE_OPTIONS | undefined;
}
export declare class BqRegistryManager {
    private static regMap;
    static init(rc: RunContextServer): void;
    static addEntity(dataset: string, tableName: string, options?: TABLE_OPTIONS, version?: number): void;
    static addField(tableName: string, fieldName: string, fieldType: BqBase.FIELD_TYPE, fieldMode: BqBase.FIELD_MODE): void;
    static addRecordField(tableName: string, parent: string, fieldName: string, fieldType: BqBase.FIELD_TYPE, fieldMode: BqBase.FIELD_MODE): void;
    static getRegistry(tableName: string): BigqueryRegistry;
}
