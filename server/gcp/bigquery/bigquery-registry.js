"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Thu Feb 27 2020
   Author     : Siddharth Garg
   
   Copyright (c) 2020 Obopay. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BqRegistryManager = exports.BigqueryRegistry = void 0;
const bigquery_base_1 = require("./bigquery-base");
const core_1 = require("@mubble/core");
/*------------------------------------------------------------------------------
   Obmop Registry
------------------------------------------------------------------------------*/
class BigqueryRegistry {
    constructor(table) {
        this.partition = false;
        this.fields = [];
        this.tableName = table;
    }
    init(dataset, options, version) {
        this.dataset = dataset;
        this.partition = false;
        if (options) {
            this.partition = options.timePartitioning ? true : false;
            this.tableOptions = options;
        }
        this.version = version;
    }
    addField(field) {
        if (field.name != field.name.toLowerCase()) {
            throw new core_1.Mubble.uError("BQ_ERROR_CODE", `Field ${field.name} has upper case characters in table ${this.tableName}.`);
        }
        this.fields.push(field);
    }
    addRecordField(field) {
        if (field.name != field.name.toLowerCase()) {
            throw new core_1.Mubble.uError("BQ_ERROR_CODE", `Field ${field.name} has upper case characters in table ${this.tableName}.`);
        }
        this.fields.push(field);
    }
    getFields() {
        return this.fields;
    }
    getNotNullFields() {
        return this.fields.filter((field) => field.mode != bigquery_base_1.BqBase.FIELD_MODE.NULLABLE);
    }
    getFieldNames() {
        return this.fields.map((field) => field.name);
    }
    getFieldInfo(field) {
        const info = this.fields.find((f) => f.name === field);
        if (!info) {
            throw new core_1.Mubble.uError(`BQ_SCHEMA_MISMATCH`, `Field ${field} doesnot exsist in table ${this.tableName}.`);
        }
        return info;
    }
    getDataset() {
        return this.dataset;
    }
    getTableName() {
        return this.tableName;
    }
    isPartition() {
        return this.partition;
    }
    getVersion() {
        return this.version;
    }
    getOptions() {
        return this.tableOptions;
    }
}
exports.BigqueryRegistry = BigqueryRegistry;
/*------------------------------------------------------------------------------
   Obmop Registry Manager
------------------------------------------------------------------------------*/
class BqRegistryManager {
    static init(rc) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Initializing BqRegistryManager.');
        this.regMap = {};
    }
    static addEntity(dataset, tableName, options, version) {
        const registry = this.getRegistry(tableName);
        registry.init(dataset, options, version);
    }
    static addField(tableName, fieldName, fieldType, fieldMode) {
        const registry = this.getRegistry(tableName), fieldInfo = {
            name: fieldName,
            type: fieldType,
            mode: fieldMode
        };
        registry.addField(fieldInfo);
    }
    static addRecordField(tableName, parent, fieldName, fieldType, fieldMode) {
        const registry = this.getRegistry(tableName), fieldInfo = {
            name: fieldName,
            type: fieldType,
            mode: fieldMode,
            parent: parent
        };
        registry.addRecordField(fieldInfo);
    }
    static getRegistry(tableName) {
        if (!this.regMap[tableName])
            this.regMap[tableName] = new BigqueryRegistry(tableName);
        return this.regMap[tableName];
    }
}
exports.BqRegistryManager = BqRegistryManager;
BqRegistryManager.regMap = {};
//# sourceMappingURL=bigquery-registry.js.map