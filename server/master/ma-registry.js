"use strict";
/*------------------------------------------------------------------------------
   About      : Master Registry Information + associated classes to store master details
   
   Created on : Tue Jun 06 2017
   Author     : Gaurav Kulshreshtha
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterRegistry = exports.FieldInfo = exports.MASTERBASE = void 0;
require("reflect-metadata");
const lo = require("lodash");
const ma_util_1 = require("./ma-util");
const ma_base_1 = require("./ma-base");
const ma_reg_manager_1 = require("./ma-reg-manager");
const LOG_ID = 'MasterRegistry';
function MaRegistryLog(rc, ...args) {
    if (rc) {
        rc.isStatus() && rc.status(LOG_ID, ...args);
    }
    else {
        //log(LOG_ID , ...args)
    }
}
function debug(rc, ...args) {
    if (rc) {
        rc.isDebug && rc.debug(LOG_ID, ...args);
    }
    else {
        //log(LOG_ID , ...args)
    }
}
exports.MASTERBASE = 'masterbase'; //MasterBase.constructor.name.toLowerCase()
//export type MasterFieldType = String | Number | Boolean | Object
function getType(t) {
    switch (t) {
        case Number: return 'number';
        case String: return 'string';
        case Boolean: return 'boolean';
        case Object: return 'object';
        case Array: return 'array';
        default:
            ma_util_1.assert(false, 'Unknown field type ', t);
    }
    // Never reachable
    return 'object';
}
class FieldInfo {
    constructor(name, targetName, type, constraint) {
        this.rules = [];
        // Dont like using public specifier. For class members visibility
        this.name = name;
        this.targetName = targetName;
        this.type = type;
        if (ma_util_1.MaType.isPresent(constraint)) {
            this.constraint = constraint;
        }
    }
    toString() {
        return JSON.stringify({ name: this.name, type: this.type, constraint: ma_base_1.Master.FieldType[this.constraint], targetName: this.targetName });
    }
    // Is field inherited from master base
    isMasterBaseField() {
        return this.targetName === exports.MASTERBASE;
    }
}
exports.FieldInfo = FieldInfo;
class MasterRegistry {
    constructor(master) {
        this.pkFields = [];
        this.fieldsMap = {};
        this.autoFields = [];
        this.optionalFields = [];
        // Not inherited from masterbase
        this.ownFields = [];
        this.allFields = [];
        // fields which are cached in memory
        this.cachedFields = [];
        this.destSyncFields = [];
        debug(null, 'Creating Master ', master);
        this.mastername = master;
    }
    // Rules Array to verify fields type / value 
    // Equivalent of MasterConfig rules verification
    //rules                     : ((obj : any) => void) [] = []
    // Get id string from master rec
    getIdStr(src) {
        if (this.pkFields.length === 1) {
            ma_util_1.assert(src[this.pkFields[0]] != null, 'Id field value can not be null ', this.mastername, this.pkFields[0], src);
            return String(src[this.pkFields[0]]);
        }
        const id = {};
        this.pkFields.forEach(pk => {
            ma_util_1.assert(src[pk] != null, 'Id field value can not be null ', this.mastername, pk, src);
            id[pk] = src[pk];
        });
        return JSON.stringify(id);
    }
    getIdObject(src) {
        if (this.pkFields.length === 1) {
            ma_util_1.assert(src[this.pkFields[0]] != null, 'Id field value can not be null ', this.mastername, this.pkFields[0], src);
            return src[this.pkFields[0]];
        }
        const id = {};
        this.pkFields.forEach(pk => {
            ma_util_1.assert(src[pk] != null, 'Id field value can not be null ', this.mastername, pk, src);
            id[pk] = src[pk];
        });
        return id;
    }
    /*
    1. verify that field name must not contain the . or should not be empty
    2. Must have set at least 1 PK
    3. PK Fields can not be object
    5. It must be an Instance of MasterBase
   */
    verifyInternal(construct) {
        ma_util_1.assert(this.pkFields.length > 0, 'PK not set for master ', this.mastername);
        lo.forEach(this.fieldsMap, (finfo, key) => {
            // 1 check
            ma_util_1.assert(key.length > 0, 'Invalid key ', key, ma_util_1.masterDesc(this.mastername, key, null));
            if (finfo.constraint === ma_base_1.Master.FieldType.PRIMARY && finfo.type === 'object') {
                ma_util_1.throwError('PK ', key, 'can not be object ', this.mastername);
            }
        });
        ma_util_1.assert(construct != null && this.config != null, 'master class ', this.mastername, 'modelType definition missing');
        this.masterInstance = new construct(null, this.mastername);
        // check if this is an instance of master base
        ma_util_1.assert(this.masterInstance instanceof ma_base_1.MasterBase, this.mastername, 'is not an masterbase impl ');
    }
    verify(context) {
        // debug(context , 'Verifying ',this.mastername)
        // Todo
        /*
        4. Populate autofields + other populations
        8. verify configuration
        9. Check all dependency masters are present
        */
        this.allFields = lo.keysIn(this.fieldsMap);
        this.autoFields = lo.filter(this.fieldsMap, (finfo, key) => {
            return finfo.isMasterBaseField();
        }).map(info => info.name);
        const masterTsField = this.config.getMasterTsField();
        if (this.autoFields.indexOf(masterTsField) === -1) {
            this.autoFields.push(masterTsField);
        }
        // set optional fields
        this.optionalFields = lo.filter(this.fieldsMap, (finfo, key) => {
            return finfo.constraint === ma_base_1.Master.FieldType.OPTIONAL;
        }).map(info => info.name);
        this.ownFields = lo.filter(this.fieldsMap, (finfo, key) => {
            return !finfo.isMasterBaseField();
        }).map(info => info.name);
        lo.forEach(this.config.getDependencyMasters(), (parent) => {
            ma_util_1.assert(ma_reg_manager_1.MasterRegistryMgr.getMasterRegistry(parent) != null, 'parent ', parent, 'doesn\'t exists for master ', this.mastername);
        });
        // check FK contrains are okay
        const fkConst = this.config.getForeignKeys();
        lo.forEach(fkConst, (props, parent) => {
            const parentRegistry = ma_reg_manager_1.MasterRegistryMgr.getMasterRegistry(parent);
            // parent master must exists
            ma_util_1.assert(parentRegistry != null, 'parent ', parent, 'doesn\'t exists for master ', this.mastername);
            lo.forEach(props, (selfField, parentField) => {
                // self field must exist
                ma_util_1.assert(this.ownFields.indexOf(selfField) !== -1, 'FK field ', selfField, 'is not present in master ', this.mastername);
                // parent master field must exists
                ma_util_1.assert(lo.keysIn(parentRegistry.fieldsMap).indexOf(parentField) !== -1, 'Parent FK field ', parentField, 'is not present in parent ', parent, parentRegistry.ownFields);
                const selfInfo = this.fieldsMap[selfField];
                // can not be an optional field
                ma_util_1.assert(!selfInfo.isMasterBaseField() && selfInfo.constraint !== ma_base_1.Master.FieldType.OPTIONAL, 'FK field cant be optional or automatic', selfField, this.mastername);
                // can not be an array or object
                ma_util_1.assert(selfInfo.type !== 'object' && selfInfo.type !== 'array', 'FK field cant be object/array', selfField, this.mastername);
                // self field type must be same as parent field type
                ma_util_1.assert(selfInfo.type === parentRegistry.fieldsMap[parentField].type, 'FK field type must match parent field type ', selfField, selfInfo.type, this.mastername, parent, parentRegistry.fieldsMap[parentField].type);
            });
        });
        // cached fields check
        // should be own field
        const cachedFields = this.config.getCachedFields();
        cachedFields.fields.forEach((field) => {
            ma_util_1.assert(this.ownFields.indexOf(field) != -1, 'cached field', field, 'is not an own fields', this.ownFields, this.mastername);
        });
        // Populate Cached Fields
        if (cachedFields.cache) {
            this.cachedFields = lo.clone(cachedFields.fields);
        }
        else {
            this.cachedFields = this.ownFields.filter(fld => {
                return cachedFields.fields.indexOf(fld) === -1;
            });
        }
        ma_util_1.assert(this.cachedFields.length > 0 /*|| !this.config.getCached()*/, 'No cached fields for master ', this.mastername);
        // destination sync fields check
        // should be own field
        const destFields = this.config.getDestSynFields();
        destFields.fields.forEach((field) => {
            ma_util_1.assert(this.ownFields.indexOf(field) != -1, 'destSync field', field, 'is not an own fields', this.ownFields, this.mastername);
        });
        // Populate destination sync fields
        if (destFields.cache) {
            this.destSyncFields = lo.clone(destFields.fields);
        }
        else {
            this.destSyncFields = this.ownFields.filter(fld => {
                return destFields.fields.indexOf(fld) === -1;
            });
        }
        ma_util_1.assert(this.destSyncFields.length > 0, 'No destination sync fields for master ', this.mastername);
        // dest sync fields should be sublist of cached fields
        this.destSyncFields.forEach(fld => {
            ma_util_1.assert(this.cachedFields.indexOf(fld) !== -1, 'dest field ', fld, 'is not cached', this.cachedFields, this.mastername);
        });
    }
    addFieldRule(fieldName, target, rule) {
        debug(null, 'addFieldRule', this.mastername, fieldName);
        var t = Reflect.getMetadata("design:type", target, fieldName);
        ma_util_1.assert(t && t.name, ma_util_1.masterDesc(this.mastername, fieldName, null), 'field information is missing');
        let type = getType(t);
        let targetName = target.constructor.name.toLowerCase();
        let finfo = this.fieldsMap[fieldName];
        if (!finfo) {
            finfo = this.fieldsMap[fieldName] = new FieldInfo(fieldName, targetName, type);
        }
        ma_util_1.assert(finfo.targetName === targetName && finfo.type === type, 'mismatch in field rule validation ', this.mastername, fieldName);
        finfo.rules.push(rule);
    }
    addField(fieldName, masType, target) {
        debug(null, 'addField', this.mastername, fieldName, ma_base_1.Master.FieldType[masType]);
        var t = Reflect.getMetadata("design:type", target, fieldName);
        ma_util_1.assert(t && t.name, ma_util_1.masterDesc(this.mastername, fieldName, null), 'field information is missing');
        let type = getType(t);
        let targetName = target.constructor.name.toLowerCase();
        let finfo = this.fieldsMap[fieldName];
        if (!finfo) {
            finfo = this.fieldsMap[fieldName] = new FieldInfo(fieldName, targetName, type, masType);
        }
        else {
            // It was already created by addFieldRule
            ma_util_1.assert(finfo.constraint == null, 'contrain can not be populated before ', this.mastername, fieldName);
            finfo.constraint = masType;
        }
        ma_util_1.assert(finfo.targetName === targetName && finfo.type === type, 'mismatch in field rule validation ', this.mastername, fieldName);
    }
    isAllowedFileUpload() {
        ma_util_1.assert(this.config.getHasFileSource(), 'master', this.mastername, 'is not file sourced');
    }
    // Todo : create a model checksum
    getModelDigest() {
        return 'newschat:' + this.mastername;
    }
}
exports.MasterRegistry = MasterRegistry;
//# sourceMappingURL=ma-registry.js.map