"use strict";
/*------------------------------------------------------------------------------
   About      : Bigquery model decorators
   
   Created on : Thu Feb 27 2020
   Author     : Siddharth Garg
   
   Copyright (c) 2020 Obopay. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BqBase = void 0;
const bigquery_registry_1 = require("./bigquery-registry");
var BqBase;
(function (BqBase) {
    BqBase.FIELD_TYPE = {
        INTEGER: 'INTEGER',
        FLOAT: 'FLOAT',
        STRING: 'STRING',
        TIMESTAMP: 'TIMESTAMP',
        RECORD: 'RECORD'
    };
    BqBase.FIELD_MODE = {
        NULLABLE: 'NULLABLE',
        REPEATED: 'REPEATED'
    };
    /**
     *  Annotation to mark a Bq model.
     *  Make sure the table name is same as the name of the class in lower case.
     */
    function model(dataset, options, version) {
        return function (target) {
            bigquery_registry_1.BqRegistryManager.addEntity(dataset, target.name.toLowerCase(), options, version);
        };
    }
    BqBase.model = model;
    /**
     *  Annotation to mark a Bq model field.
     */
    function field(type = BqBase.FIELD_TYPE.STRING, mode = BqBase.FIELD_MODE.NULLABLE) {
        return function (target, propertyKey) {
            bigquery_registry_1.BqRegistryManager.addField(target.constructor.name.toLowerCase(), propertyKey, type, mode);
        };
    }
    BqBase.field = field;
    function recordField(parent, type = BqBase.FIELD_TYPE.STRING, mode = BqBase.FIELD_MODE.NULLABLE) {
        return function (target, propertyKey) {
            bigquery_registry_1.BqRegistryManager.addRecordField(target.constructor.name.toLowerCase(), parent, propertyKey, type, mode);
        };
    }
    BqBase.recordField = recordField;
})(BqBase = exports.BqBase || (exports.BqBase = {}));
//# sourceMappingURL=bigquery-base.js.map