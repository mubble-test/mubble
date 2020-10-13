"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Wed May 16 2018
   Author     : Raghvendra Varma
   
   Copyright (c) 2018 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldAccessor = exports.MudsBaseEntity = exports.MudsBaseStruct = void 0;
const __1 = require("..");
const muds_util_1 = require("./muds-util");
const lo = require("lodash");
/*------------------------------------------------------------------------------
    MudsBaseStruct
------------------------------------------------------------------------------*/
class MudsBaseStruct {
    constructor(rc, io, recObj, fullRec) {
        this.rc = rc;
        this.io = io;
        this.entityInfo = this.io.getInfo(this.constructor);
        const fieldNames = this.entityInfo.fieldNames;
        for (const fieldName of fieldNames) {
            const meField = this.entityInfo.fieldMap[fieldName], accessor = meField.accessor, Cls = muds_util_1.MudsUtil.getStructClass(meField);
            let dsValue = recObj ? recObj[fieldName] : undefined, newValue = dsValue;
            if (dsValue && Cls) {
                if (meField.fieldType === Array) {
                    if (Array.isArray(dsValue)) {
                        newValue = dsValue.map(struct => new Cls(rc, io, struct, fullRec));
                    }
                    else {
                        rc.isWarn() && rc.warn(rc.getName(this), `${this.getLogId()}: array cannot be set to non-array type '${dsValue.constructor.name}'`);
                        newValue = dsValue = undefined;
                    }
                }
                else {
                    newValue = new Cls(rc, io, dsValue, fullRec);
                }
            }
            accessor.init(this.rc, this, newValue, dsValue, !!fullRec);
        }
    }
    getLogId() {
        return `MudsStruct: ${this.entityInfo.entityName}`;
    }
    getInfo() {
        return this.entityInfo;
    }
    checkMandatory(rc) {
        const entityInfo = this.entityInfo, thisObj = this;
        for (const fieldName of entityInfo.fieldNames) {
            const meField = entityInfo.fieldMap[fieldName];
            let value = thisObj[fieldName];
            if (value) {
                const Cls = muds_util_1.MudsUtil.getStructClass(meField);
                if (Cls) {
                    value = meField.fieldType === Array ? value : [value];
                    value.forEach((struct) => struct.checkMandatory(rc));
                }
            }
            else if (value === undefined) {
                rc.isAssert() && rc.assert(rc.getName(this), !meField.mandatory, `${this.getLogId()} ${fieldName} is mandatory`);
            }
        }
    }
    // Arrays can be edited outside of Muds control
    RecheckArrays(rc) {
        const entityInfo = this.entityInfo, thisObj = this;
        for (const fieldName of entityInfo.fieldNames) {
            const meField = entityInfo.fieldMap[fieldName], value = thisObj[fieldName];
            if (meField.fieldType === Array && value)
                meField.accessor.validateType(value);
        }
    }
    serialize() {
        const entityInfo = this.entityInfo, thisObj = this, data = {};
        for (const fieldName of entityInfo.fieldNames) {
            const meField = entityInfo.fieldMap[fieldName], value = thisObj[fieldName];
            if (value === undefined)
                continue;
            data[fieldName] = meField.accessor.serialize(this);
        }
        return data;
    }
    $dump() {
        console.log(this.toString());
    }
    // overloaded to print even the entity
    toString(indent = 0) {
        const entityInfo = this.entityInfo, thisObj = this, aks = thisObj.ancestorKeys, sk = thisObj.selfKey;
        let str = ' '.repeat(indent) + `------ ${entityInfo.entityName} -------\n`;
        if (aks && aks.length) {
            const ancestorsInfo = entityInfo.ancestors;
            str += this.$rowHead('ancestors', indent);
            for (const [index, info] of ancestorsInfo.entries()) {
                str += this.$key(info, aks[index]);
            }
            str += '\n';
        }
        if (sk) {
            str += this.$rowHead('key', indent) +
                `${this.$key(entityInfo, sk)}\n`;
        }
        for (const fieldName of entityInfo.fieldNames) {
            const meField = entityInfo.fieldMap[fieldName], headEntry = (meField.mandatory ? '*' : '')
                +
                    `${fieldName}/${meField.fieldType.name}` +
                (meField.unique ? '+' : (meField.indexed ? '@' : ''));
            str += this.$rowHead(headEntry, indent) +
                ` ${meField.accessor.$printField(this, indent)}\n`;
        }
        return str;
    }
    $key(info, key) {
        return ` ${info.entityName} (${key ? (info.keyType === __1.Muds.Pk.String ? `"${key}"` :
            ('Int: ' + key.value)) : key})`;
    }
    $rowHead(str, indent) {
        return lo.padEnd(' '.repeat(indent + 2) + str, 30 + indent) + ' => ';
    }
}
exports.MudsBaseStruct = MudsBaseStruct;
/*------------------------------------------------------------------------------
    MudsBaseEntity
------------------------------------------------------------------------------*/
class MudsBaseEntity extends MudsBaseStruct {
    constructor(rc, io, ancestorKeys, selfKey, recObj, fullRec) {
        super(rc, io, recObj, fullRec);
        this.ancestorKeys = ancestorKeys;
        this.selfKey = selfKey;
        if (recObj) {
            rc.isAssert() && rc.assert(rc.getName(this), this.selfKey, `cannot have rec without keys`);
        }
        else if (this.entityInfo.keyType !== __1.Muds.Pk.Auto) {
            rc.isAssert() && rc.assert(rc.getName(this), this.selfKey, `Cannot create entity without selfkey`);
        }
    }
    serializeToJson() {
        const entityInfo = this.entityInfo, thisObj = this, data = {};
        data._id = this.getStringKey(this.getSelfKey());
        for (const fieldName of entityInfo.fieldNames) {
            const meField = entityInfo.fieldMap[fieldName], value = thisObj[fieldName];
            //if (value === undefined) continue
            data[fieldName] = value === undefined ? undefined : meField.accessor.serialize(this);
        }
        return data;
    }
    hasValidKey() {
        return !!this.selfKey;
    }
    isModified() {
        const fieldNames = this.entityInfo.fieldNames;
        for (const fieldName of fieldNames) {
            const accessor = this.entityInfo.fieldMap[fieldName].accessor;
            if (accessor.isModified(this))
                return true;
        }
        return false;
    }
    // Tells whether the entity has been restored from ds during getForUpsert call
    hasData() {
        const fieldNames = this.entityInfo.fieldNames, thisObj = this;
        for (const fieldName of fieldNames) {
            if (thisObj[fieldName])
                return true;
        }
        return false;
    }
    // Has been queued up for saving. Another edit would not be permitted on this
    isSavePending() {
        return this.savePending;
    }
    getLogId() {
        const name = this.entityInfo.entityName, ansKey = this.ancestorKeys.map(val => val.value || val), self = this.selfKey ? (this.selfKey.value || this.selfKey) : '[none]';
        return `${name}:${ansKey}/${self}`;
    }
    getFullKey() {
        this.rc.isAssert() && this.rc.assert(this.rc.getName(this), this.ancestorKeys && this.selfKey);
        const ar = this.ancestorKeys.map(item => item);
        ar.push(this.selfKey);
        return ar;
    }
    getAncestorKey() {
        return this.ancestorKeys;
    }
    getSelfKey() {
        return this.selfKey;
    }
    getStringKey(key = this.selfKey) {
        if (!key)
            return;
        if (typeof key === 'string')
            return key;
        else
            return key.value;
    }
    /* ---------------------------------------------------------------------------
     P R I V A T E    C O D E    S E C T I O N     B E L O W
  
     D O   N O T   A C C E S S   D I R E C T L Y
    -----------------------------------------------------------------------------*/
    convertForUpsert(rc) {
        const entityInfo = this.entityInfo;
        // Entity does not allow wrong types to be inserted      
        rc.isAssert() && rc.assert(rc.getName(this), entityInfo.ancestors.length === this.ancestorKeys.length);
        const dsRec = {
            key: this.io.buildKeyForDs(rc, entityInfo.cons, this.ancestorKeys, this.selfKey),
            data: {},
            excludeFromIndexes: []
        };
        this.checkMandatory(rc);
        this.RecheckArrays(rc);
        dsRec.data = this.serialize();
        for (const fieldName of entityInfo.fieldNames) {
            const accessor = this.entityInfo.fieldMap[fieldName].accessor;
            accessor.buildExclusions(rc, this, dsRec.excludeFromIndexes);
        }
        //console.log('convertForUpsert: data', dsRec.data)
        //console.log('convertForUpsert: excludeFromIndexes', dsRec.excludeFromIndexes)
        return dsRec;
    }
    // The path may be of multiple undocumented form, handling all of them here
    commitUpsert(path) {
        const fieldNames = this.entityInfo.fieldNames, keyType = this.entityInfo.keyType, entityName = this.entityInfo.entityName;
        for (const fieldName of fieldNames) {
            const accessor = this.entityInfo.fieldMap[fieldName].accessor;
            accessor.commitUpsert(this); // erase old values as the record is committed to ds now
        }
        !this.selfKey && this.entityInfo.keyType !== __1.Muds.Pk.None &&
            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), path);
        if (!path)
            return;
        if (path.length)
            path = path[path.length - 1];
        if (typeof (path) === 'string') {
            this.selfKey = keyType === __1.Muds.Pk.String ? path : __1.Muds.getIntKey(path);
        }
        else if (path.id && keyType !== __1.Muds.Pk.String) {
            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), entityName === path.kind, path);
            this.selfKey = __1.Muds.getIntKey(path.id);
        }
        else if (path.name && keyType === __1.Muds.Pk.String) {
            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), entityName === path.kind, path);
            this.selfKey = path.name;
        }
        this.rc.isAssert() && this.rc.assert(this.rc.getName(this), this.selfKey, path);
    }
}
exports.MudsBaseEntity = MudsBaseEntity;
/* ---------------------------------------------------------------------------
  FieldAccessor: Does all field level I/O

  P R I V A T E    C O D E    S E C T I O N     C O N T I N U E S
-----------------------------------------------------------------------------*/
class FieldAccessor {
    constructor(entityName, fieldName, meField) {
        this.entityName = entityName;
        this.fieldName = fieldName;
        this.meField = meField;
        this.ovFieldName = '_$$_' + fieldName;
        this.cvFieldName = '_$_' + fieldName;
        this.basicType = [Number, String, Boolean].indexOf(meField.fieldType) !== -1;
    }
    // called by manager while registering the schema
    getAccessor() {
        const accessor = this;
        return {
            get: function () { return accessor.getter(this); },
            set: function (value) { accessor.setter(this, value); }
        };
    }
    getter(inEntity) {
        return inEntity[this.cvFieldName];
    }
    setter(inEntity, newValue) {
        const entity = inEntity;
        // when there is no change
        if (entity[this.cvFieldName] === newValue)
            return;
        const meField = this.meField;
        if (newValue === undefined) {
            if (meField.mandatory)
                throw (this.getId() + ' Mandatory field cannot be set to undefined');
        }
        else {
            this.validateType(newValue);
        }
        entity[this.cvFieldName] = newValue;
    }
    /* ---------------------------------------------------------------------------
      P R I V A T E    C O D E
    -----------------------------------------------------------------------------*/
    getId() {
        return `${this.entityName}/${this.fieldName}`;
    }
    getOriginal(inEntity) {
        return inEntity[this.ovFieldName].original;
    }
    setOriginal(inEntity, value) {
        const entity = inEntity;
        // JSON.stringify converts everything to string except undefined is left as is
        // string is quoted. We are stringify it so that modification of value does not
        // affect the old value
        entity[this.ovFieldName] = { original: JSON.stringify(value) };
    }
    validateType(newValue) {
        const meField = this.meField;
        if (meField.fieldType === Object)
            return; // all allowed
        if (newValue === null) {
            if (muds_util_1.MudsUtil.getStructClass(meField))
                return; // null is allowed for MudsStructs
            throw (`${this.getId()}: null is not allowed`);
        }
        if (meField.fieldType === Array) {
            if (!Array.isArray(newValue))
                throw (`${this.getId()}: '${newValue.constructor.name}' is not array`);
            newValue.forEach(val => this.validateInternal(val, meField.typeHint));
        }
        else {
            this.validateInternal(newValue, meField.fieldType);
        }
    }
    validateInternal(value, fieldType) {
        if (value.constructor !== fieldType) {
            throw (`${this.getId()}: ${fieldType.name} field cannot be set to ${value}/${typeof value}`);
        }
    }
    serialize(inEntity) {
        const entity = inEntity, meField = this.meField, Cls = muds_util_1.MudsUtil.getStructClass(meField), value = entity[this.fieldName];
        if (!Cls || !value)
            return value;
        if (meField.fieldType === Array) {
            return value.map(struct => struct.serialize());
        }
        return value.serialize();
    }
    buildExclusions(rc, inEntity, arExclude) {
        const entity = inEntity;
        const value = entity[this.cvFieldName];
        if (value === undefined)
            return;
        this.buildNestedExclusions(value, '', arExclude);
    }
    buildNestedExclusions(value, prefix, arExclude) {
        if (!this.meField.indexed) {
            arExclude.push((prefix ? prefix + '.' : '') + this.fieldName +
                (this.meField.fieldType === Array ? '[]' : ''));
            return;
        }
        if (lo.isEmpty(value) || !muds_util_1.MudsUtil.getStructClass(this.meField))
            return; // null, [] are all empty
        value = Array.isArray(value) ? value[0] : value;
        const info = value.getInfo();
        for (const cfName of info.fieldNames) {
            const accessor = info.fieldMap[cfName].accessor, cValue = value[this.fieldName];
            accessor.buildNestedExclusions(cValue, (prefix ? prefix + '.' : '') + this.fieldName +
                (this.meField.fieldType === Array ? '[]' : ''), arExclude);
        }
    }
    isModified(inEntity) {
        const entity = inEntity, ov = this.getOriginal(inEntity);
        let value = entity[this.fieldName];
        if (value && muds_util_1.MudsUtil.getStructClass(this.meField)) {
            value = this.meField.fieldType === Array ?
                value.map((x) => x.serialize()) :
                value.serialize();
        }
        return JSON.stringify(value) !== ov;
    }
    // Should be called only once while constructing the object
    init(rc, inEntity, newValue, dsValue, fullRec) {
        const entity = inEntity, meField = this.meField;
        if (newValue === dsValue) { // it has not been converted
            if (newValue === undefined) {
                if (meField.mandatory && fullRec)
                    rc.isWarn() && rc.warn(rc.getName(this), `${this.getId()}: Db returned undefined for mandatory field. Ignoring...`);
                return this.setOriginal(inEntity, undefined);
            }
            if (this.basicType) {
                if (newValue === null) {
                    rc.isWarn() && rc.warn(rc.getName(this), `${this.getId()}: Db returned null value for base data type. Ignoring...`);
                    return this.setOriginal(inEntity, undefined);
                }
                if (newValue.constructor !== meField.fieldType) {
                    rc.isWarn() && rc.warn(rc.getName(this), `${this.getId()}: ${meField.fieldType.name} came as ${newValue}/${typeof newValue} from db. Converting...`);
                    if (meField.fieldType === String)
                        newValue = String(newValue);
                    else if (meField.fieldType === Boolean)
                        newValue = !!newValue;
                    else { // Number
                        newValue = Number(newValue);
                        if (isNaN(newValue))
                            newValue = 0;
                    }
                }
                dsValue = newValue;
            }
            else if (meField.fieldType === Array) {
                if (!Array.isArray(newValue)) {
                    rc.isWarn() && rc.warn(rc.getName(this), `${this.getId()}: array cannot be set to non-array type '${newValue.constructor.name}'`);
                    newValue = dsValue = undefined;
                }
                else {
                    dsValue = newValue = newValue.map(item => this.meField.typeHint === String ? String(item) : Number(item));
                }
            }
        }
        entity[this.cvFieldName] = newValue;
        this.setOriginal(inEntity, dsValue);
    }
    commitUpsert(inEntity) {
        this.setOriginal(inEntity, this.serialize(inEntity));
    }
    $printField(inEntity, indent = 0) {
        const entity = inEntity, ov = this.getOriginal(inEntity);
        let value = entity[this.fieldName], s = '';
        if (value && muds_util_1.MudsUtil.getStructClass(this.meField)) {
            value = this.meField.fieldType === Array ? value : [value];
            value.forEach((struct) => {
                s += '\n' + struct.toString(indent + 2);
            });
        }
        else {
            s = JSON.stringify(value);
            if (s !== ov)
                s += ` (was: ${ov})`;
        }
        return s;
    }
}
exports.FieldAccessor = FieldAccessor;
//# sourceMappingURL=muds-base-entity.js.map