"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterModelConfig = exports.ModelConfig = exports.MasterTsField = void 0;
const ma_base_1 = require("./ma-base");
const lo = require("lodash");
const ma_util_1 = require("./ma-util");
exports.MasterTsField = 'modTs';
class ModelConfig {
    constructor() {
        this.hasFileSource = false;
        this.cache = false;
        this.fkConstrains = {};
        this.accompanyMasters = [];
        this.masterTsField = exports.MasterTsField;
    }
    getMasterTsField() {
        return this.masterTsField;
    }
    getSrcValidationrules() {
        return this.srcValidationrules;
    }
    getHasFileSource() {
        return this.hasFileSource;
    }
    getDependencyMasters() {
        let res = [];
        res = res.concat(this.accompanyMasters)
            .concat(lo.keysIn(this.fkConstrains))
            .map(ma => ma.toLowerCase());
        return lo.uniq(res);
    }
    getForeignKeys() {
        return lo.mapKeys(this.fkConstrains, (prop, parent) => {
            return parent.toLowerCase();
        });
    }
    getCached() {
        return this.cache;
    }
    getCachedFields() {
        return this.cachedFields || { fields: [], cache: false };
    }
    getDestSynFields() {
        return this.destSynFields || { fields: [], cache: false };
    }
    getSegment() {
        return this.segment;
    }
}
exports.ModelConfig = ModelConfig;
class MasterModelConfig extends ModelConfig {
    constructor(modConfigName) {
        super();
        this.modConfigName = modConfigName;
        this.cachedFields = { fields: [], cache: false };
        this.destSynFields = { fields: [], cache: false };
        // Todo
        this.srcValidationrules = [fieldTypeCheck];
    }
}
exports.MasterModelConfig = MasterModelConfig;
function fieldTypeCheck(rc, reg, records) {
    const autoCols = lo.clone(reg.autoFields), masterTsField = reg.config.getMasterTsField(), fieldsMap = lo.clone(reg.fieldsMap), optionalFields = lo.clone(reg.optionalFields), instance = reg.masterInstance, pkeys = lo.clone(reg.pkFields), ids = [], ownFields = lo.clone(reg.ownFields);
    records.forEach(rec => {
        // check all ids
        const idStr = reg.getIdStr(rec);
        ma_util_1.assert(ids.indexOf(idStr) === -1, reg.mastername, 'id is present more than once', idStr, rec);
        ids.push(idStr);
        lo.forEach(rec, (value, key) => {
            const fInfo = fieldsMap[key];
            if (!fInfo)
                ma_util_1.throwError(ma_util_1.masterDesc(reg.mastername, key, value), 'unknown field:', key, 'for pk', reg.getIdStr(rec));
            if (autoCols.indexOf(key) !== -1)
                ma_util_1.throwError(ma_util_1.masterDesc(reg.mastername, key, value), 'can not set auto field', key, reg.getIdStr(rec));
            // string , number , boolean , array check
            if ((typeof (value) === 'string' && fInfo.type !== 'string') ||
                (typeof (value) === 'boolean' && fInfo.type !== 'boolean') ||
                (typeof (value) === 'number' && fInfo.type !== 'number') ||
                (Array.isArray(value) && fInfo.type !== 'array'))
                ma_util_1.throwError(reg.mastername, 'has invalid value for colum ', key, rec, idStr, fInfo.type);
            // Object check
            if (!Array.isArray(value) && value && typeof (value) === 'object' && fInfo.type !== 'object') {
                ma_util_1.throwError(reg.mastername, 'has invalid value for colum ', key, rec, idStr, fInfo.type);
            }
            // PK Fields type can not object . Checked in verify
            // check PK and Mandatory Fields
            if (fInfo.constraint !== ma_base_1.Master.FieldType.OPTIONAL) {
                //[null , undefined , '' , 0] check only allowed for OPTIONAL Fields
                if (fInfo.type !== 'boolean' && !value)
                    ma_util_1.throwError(reg.mastername, 'column ', key, 'can not be null/empty', rec, idStr);
                if (fInfo.type === 'array' && lo.isEmpty(value)) {
                    ma_util_1.throwError(reg.mastername, 'column ', key, 'can not be empty array', rec, idStr);
                }
                else if (fInfo.type === 'object' && lo.isEmpty(value)) {
                    ma_util_1.throwError(reg.mastername, 'column ', key, 'can not be empty object', rec, idStr);
                }
            }
            else {
                // set value of optional fields if not found
                if (value === undefined) {
                    rec[key] = value = instance[key];
                    if (value === undefined)
                        ma_util_1.throwError(reg.mastername, 'default column value not set for column', key, rec);
                }
            }
            // todo : object field nested value can't be null or undefined
        });
        // check all the mandatory fields are present
        ownFields.forEach((field) => {
            ma_util_1.assert(optionalFields.indexOf(field) != -1 || lo.hasIn(rec, field), 'field', field, 'is missing in record ', idStr);
        });
    });
}
//# sourceMappingURL=ma-model-config.js.map