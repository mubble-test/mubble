"use strict";
/*------------------------------------------------------------------------------
   About      : Obmop registry and registry manager
   
   Created on : Thu Jun 20 2019
   Author     : Vishal Sinha
   
   Copyright (c) 2019 Obopay Mobile Technologies Pvt Ltd. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObmopRegistryManager = exports.ObmopRegistry = void 0;
const obmop_base_1 = require("./obmop-base");
const obmop_util_1 = require("./obmop-util");
const core_1 = require("@mubble/core");
/*------------------------------------------------------------------------------
   Obmop Registry
------------------------------------------------------------------------------*/
class ObmopRegistry {
    constructor(table) {
        this.fields = [];
        this.tableName = table;
    }
    addField(field) {
        if (field.type === obmop_base_1.Obmop.FieldType.PRIMARY) {
            if (this.primaryKey) {
                throw new core_1.Mubble.uError(obmop_util_1.DB_ERROR_CODE, `Trying to add more than one primary key in table ${this.tableName}.`);
            }
            this.primaryKey = field.name;
            this.primaryKeyMapping = field.mapping;
        }
        this.fields.push(field);
    }
    getPrimaryKey() {
        return { name: this.primaryKey, mapping: this.primaryKeyMapping };
    }
    getPrimaryKeyInfo() {
        const info = this.fields.find((f) => f.name === this.primaryKey);
        if (!info) {
            throw new core_1.Mubble.uError(obmop_util_1.DB_ERROR_CODE, `Primary key doesnot exsist in table ${this.tableName}.`);
        }
        return info;
    }
    getFields() {
        return this.fields;
    }
    getFieldMapping(name) {
        const field = this.fields.find((f) => f.name === name);
        if (!field) {
            throw new core_1.Mubble.uError(obmop_util_1.DB_ERROR_CODE, `Field doesnot exsist in table ${this.tableName}.`);
        }
        return field.mapping;
    }
    getSerializedFields() {
        return this.fields.filter((field) => field.serial);
    }
    getSequenceFields() {
        return this.fields.filter((field) => field.sequence);
    }
    getNotNullFields() {
        return this.fields.filter((field) => field.type != obmop_base_1.Obmop.FieldType.OPTIONAL);
    }
    getFieldInfo(field) {
        const info = this.fields.find((f) => f.mapping === field);
        if (!info) {
            throw new core_1.Mubble.uError(obmop_util_1.DB_ERROR_CODE, `Field ${field} doesnot exsist in table ${this.tableName}.`);
        }
        return info;
    }
}
exports.ObmopRegistry = ObmopRegistry;
/*------------------------------------------------------------------------------
   Obmop Registry Manager
------------------------------------------------------------------------------*/
class ObmopRegistryManager {
    static init(rc) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Initializing ObmopRegistryManager.');
        this.regMap = {};
    }
    static addEntity(entity) {
        this.regMap[entity] = new ObmopRegistry(entity);
    }
    static addField(entity, fieldName, fieldType, dataType, unique, indexed, serial, sequence) {
        const registry = this.getRegistry(entity), fieldInfo = {
            name: fieldName,
            mapping: fieldName.toLowerCase(),
            type: fieldType,
            dataType,
            unique,
            indexed,
            serial,
            sequence
        };
        registry.addField(fieldInfo);
    }
    static getRegistry(entity) {
        if (!this.regMap[entity])
            this.regMap[entity] = new ObmopRegistry(entity);
        return this.regMap[entity];
    }
}
exports.ObmopRegistryManager = ObmopRegistryManager;
ObmopRegistryManager.regMap = {};
//# sourceMappingURL=obmop-registry.js.map