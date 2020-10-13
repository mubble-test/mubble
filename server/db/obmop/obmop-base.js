"use strict";
/*------------------------------------------------------------------------------
   About      : Obmop base functions and utilities
   
   Created on : Wed Jun 19 2019
   Author     : Vishal Sinha
   
   Copyright (c) 2019 Obopay Mobile Technologies Pvt Ltd. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObmopBaseEntity = exports.Obmop = void 0;
const obmop_registry_1 = require("./obmop-registry");
/*------------------------------------------------------------------------------
   Obmop Decorator Functions
------------------------------------------------------------------------------*/
var Obmop;
(function (Obmop) {
    let FieldType;
    (function (FieldType) {
        FieldType[FieldType["PRIMARY"] = 1] = "PRIMARY";
        FieldType[FieldType["MANDATORY"] = 2] = "MANDATORY";
        FieldType[FieldType["OPTIONAL"] = 3] = "OPTIONAL";
    })(FieldType = Obmop.FieldType || (Obmop.FieldType = {}));
    /**
     *  Annotation to mark a obmop model.
     *  Make sure the table name is same as the name of the class in lower case.
     */
    function model() {
        return function (target) {
            const table = target.constructor.name.toLowerCase();
            obmop_registry_1.ObmopRegistryManager.addEntity(table);
        };
    }
    Obmop.model = model;
    /**
     *  Annotation to mark a obmop model field.
     *  Make sure the table name is same as the name of the class in lower case.
     */
    function field(type = FieldType.OPTIONAL, unique = false, indexed = false, serial = false, sequence) {
        return function (target, propertyKey) {
            const table = target.constructor.name.toLowerCase(), reflectType = Reflect.getMetadata('design:type', target, propertyKey);
            obmop_registry_1.ObmopRegistryManager.addField(table, propertyKey, type, reflectType.name, unique, indexed, serial, sequence);
        };
    }
    Obmop.field = field;
    /**
     *  Annotation to mark a obmop model primary key.
     *  Make sure the table name is same as the name of the class in lower case.
     */
    function primaryKey(serial = false, sequence) {
        return function (target, propertyKey) {
            const table = target.constructor.name.toLowerCase(), reflectType = Reflect.getMetadata('design:type', target, propertyKey);
            obmop_registry_1.ObmopRegistryManager.addField(table, propertyKey, FieldType.PRIMARY, reflectType.name, true, true, serial, sequence);
        };
    }
    Obmop.primaryKey = primaryKey;
})(Obmop = exports.Obmop || (exports.Obmop = {}));
/*------------------------------------------------------------------------------
   Obmop Base Entity
------------------------------------------------------------------------------*/
/**
 *  All obmop model entities to be extended from this entity.
 *  Make sure the table name is same as the name of the class in lower case.
 */
class ObmopBaseEntity {
    constructor(rc, table) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Constructing new obmop entity.', table);
        this._tableName = table.toLowerCase();
    }
    getTableName() {
        return this._tableName;
    }
}
exports.ObmopBaseEntity = ObmopBaseEntity;
//# sourceMappingURL=obmop-base.js.map