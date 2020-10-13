declare type UnionKeyToValue<U extends string> = {
    [K in U]: K;
};
export declare type TABLE_OPTIONS = {
    timePartitioning?: {
        type: 'DAY' | 'HOUR';
        field: string;
    };
    requirePartitionFilter?: boolean;
};
export declare namespace BqBase {
    type FIELD_TYPE = 'INTEGER' | 'FLOAT' | 'STRING' | 'TIMESTAMP' | 'RECORD';
    const FIELD_TYPE: UnionKeyToValue<FIELD_TYPE>;
    type FIELD_MODE = 'NULLABLE' | 'REPEATED';
    const FIELD_MODE: UnionKeyToValue<FIELD_MODE>;
    /**
     *  Annotation to mark a Bq model.
     *  Make sure the table name is same as the name of the class in lower case.
     */
    function model(dataset: string, options?: TABLE_OPTIONS, version?: number): (target: any) => void;
    /**
     *  Annotation to mark a Bq model field.
     */
    function field(type?: FIELD_TYPE, mode?: FIELD_MODE): (target: any, propertyKey: string) => void;
    function recordField(parent: string, type?: FIELD_TYPE, mode?: FIELD_MODE): (target: any, propertyKey: string) => void;
}
export {};
