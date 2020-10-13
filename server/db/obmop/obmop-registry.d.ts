import { RunContextServer } from '../../rc-server';
import { Obmop } from './obmop-base';
export declare type ObmopFieldInfo = {
    name: string;
    mapping: string;
    type: Obmop.FieldType;
    dataType: string;
    unique: boolean;
    indexed: boolean;
    serial: boolean;
    sequence?: string;
};
export declare type ObmopFieldNameMapping = {
    name: string;
    mapping: string;
};
export declare class ObmopRegistry {
    private tableName;
    private fields;
    private primaryKey;
    private primaryKeyMapping;
    constructor(table: string);
    addField(field: ObmopFieldInfo): void;
    getPrimaryKey(): {
        name: string;
        mapping: string;
    };
    getPrimaryKeyInfo(): ObmopFieldInfo;
    getFields(): Array<ObmopFieldInfo>;
    getFieldMapping(name: string): string;
    getSerializedFields(): Array<ObmopFieldInfo>;
    getSequenceFields(): Array<ObmopFieldInfo>;
    getNotNullFields(): Array<ObmopFieldInfo>;
    getFieldInfo(field: string): ObmopFieldInfo;
}
export declare class ObmopRegistryManager {
    private static regMap;
    static init(rc: RunContextServer): void;
    static addEntity(entity: string): void;
    static addField(entity: string, fieldName: string, fieldType: Obmop.FieldType, dataType: string, unique: boolean, indexed: boolean, serial: boolean, sequence?: string): void;
    static getRegistry(entity: string): ObmopRegistry;
}
