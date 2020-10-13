"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Sun May 20 2018
   Author     : Raghvendra Varma
   
   Copyright (c) 2018 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.MudsManager = exports.MudsEntityInfo = exports.MeField = void 0;
require("reflect-metadata");
const muds_1 = require("./muds");
const muds_base_entity_1 = require("./muds-base-entity");
const muds_util_1 = require("./muds-util");
const { Datastore } = require('@google-cloud/datastore');
class MeField {
    constructor(fieldName, fieldType, typeHint, mandatory, indexed, unique) {
        this.fieldName = fieldName;
        this.fieldType = fieldType;
        this.typeHint = typeHint;
        this.mandatory = mandatory;
        this.indexed = indexed;
        this.unique = unique;
        if (unique && !indexed)
            throw ('Field cannot be unique without being indexed');
    }
}
exports.MeField = MeField;
class MudsEntityInfo {
    constructor(cons, version, keyType, entityType) {
        this.cons = cons;
        this.version = version;
        this.keyType = keyType;
        this.entityType = entityType;
        this.ancestors = [];
        this.fieldMap = {};
        this.fieldNames = [];
        this.uniqueFields = {};
        this.compositeIndices = [];
        this.entityName = cons.name;
    }
}
exports.MudsEntityInfo = MudsEntityInfo;
class MudsManager {
    constructor() {
        this.entityInfoMap = {};
        // Temporary members while store schema is built, they are removed after init
        this.tempAncestorMap = {};
        this.tempEntityFieldsMap = {};
        this.tempCompIndices = {};
    }
    /* ---------------------------------------------------------------------------
     P R I V A T E    C O D E    S E C T I O N     B E L O W
  
     D O   N O T   A C C E S S   D I R E C T L Y
    -----------------------------------------------------------------------------*/
    getDatastore() {
        return this.datastore;
    }
    getCacheReference() {
        return this.trRedis;
    }
    getInfo(entityClass) {
        const entityName = typeof entityClass === 'string' ? entityClass : entityClass.name;
        return this.entityInfoMap[entityName];
    }
    getInfoMap() {
        return this.entityInfoMap;
    }
    registerEntity(version, pkType, entityType, cons) {
        this.checkInitStatus('registerEntity');
        const entityName = cons.name;
        if (this.entityInfoMap[entityName])
            throw (`Double annotation of entity for ${entityName}?`);
        this.entityInfoMap[entityName] = new MudsEntityInfo(cons, version, pkType, entityType);
    }
    registerAncestors(ancestors, cons) {
        this.checkInitStatus('registerAncestors');
        const entityName = cons.name;
        if (this.tempAncestorMap[entityName])
            throw (`Double annotation of ancestors for ${entityName}?`);
        this.tempAncestorMap[entityName] = Object.freeze(ancestors);
    }
    registerCompositeIndex(idxObj, cons) {
        this.checkInitStatus('registerCompositeIndex');
        const entityName = cons.name, strIdx = JSON.stringify(idxObj), arCompIdx = this.tempCompIndices[entityName] || (this.tempCompIndices[cons.name] = []);
        if (arCompIdx.find(item => JSON.stringify(item) === strIdx)) {
            throw (`Double annotation of composite index ${strIdx} for ${entityName}?`);
        }
        arCompIdx.push(Object.freeze(idxObj));
    }
    registerField({ mandatory = false, typeHint = undefined, indexed = false, unique = false }, target, fieldName) {
        this.checkInitStatus('registerField');
        const entityName = target.constructor.name, fieldType = Reflect.getMetadata('design:type', target, fieldName);
        if (fieldType === Array) {
            this.validateType(entityName, fieldName, typeHint, true);
        }
        else {
            this.validateType(entityName, fieldName, fieldType);
        }
        if (fieldType === Object) {
            if (indexed)
                throw (`${entityName}/${fieldName}: Plain objects cannot be indexed`);
        }
        const tempMap = this.tempEntityFieldsMap, entityObj = tempMap[entityName] || (tempMap[entityName] = {}), field = new MeField(fieldName, fieldType, typeHint, mandatory, indexed, unique);
        field.accessor = new muds_base_entity_1.FieldAccessor(entityName, fieldName, field);
        if (entityObj[fieldName])
            throw (`${entityName}/${fieldName}: has been annotated twice?`);
        entityObj[fieldName] = Object.freeze(field);
        return field.accessor.getAccessor();
    }
    checkInitStatus(actName) {
        if (!this.tempEntityFieldsMap) {
            throw (`Trying to ${actName} after Muds.init(). Forgot to add to entities collection?`);
        }
    }
    validateType(entityName, fieldName, fieldType, insideArray) {
        // can happen only for array
        const id = `${entityName}/${fieldName}: `;
        if (!fieldType)
            throw (id + 'typeHint is mandatory');
        if ([String, Number].indexOf(fieldType) !== -1)
            return;
        if (!insideArray && [Boolean, Object].indexOf(fieldType) !== -1)
            return;
        if (muds_base_entity_1.MudsBaseStruct.prototype.isPrototypeOf(fieldType.prototype)) {
            if (fieldType === muds_base_entity_1.MudsBaseEntity || fieldType === muds_base_entity_1.MudsBaseStruct)
                throw (id +
                    'Cannot be Muds.BaseEntity/Muds.BaseStruct. Use drived class of Muds.BaseStruct');
            if (muds_base_entity_1.MudsBaseEntity.prototype.isPrototypeOf(fieldType.prototype))
                throw (id +
                    'Cannot be of type Muds.BaseEntity. Use Muds.BaseStruct');
            return;
        }
        throw (`${id}unknown type: ${fieldType.name}`);
    }
    init(rc, gcloudEnv, trRedis, namespacePrefix) {
        this.trRedis = trRedis;
        this.namespacePrefix = namespacePrefix || '';
        if (!this.tempEntityFieldsMap)
            throw (`Second attempt at Muds.init()?`);
        this.entityNames = Object.keys(this.entityInfoMap);
        for (const entityName of this.entityNames) {
            const ancestors = this.extractFromMap(this.tempAncestorMap, entityName), fieldsMap = this.extractFromMap(this.tempEntityFieldsMap, entityName), compIndices = this.extractFromMap(this.tempCompIndices, entityName), entityInfo = this.entityInfoMap[entityName];
            if (entityInfo.entityType === muds_1.EntityType.Dummy) {
                rc.isAssert() && rc.assert(rc.getName(this), !(ancestors || fieldsMap || compIndices), `dummy cannot have any other annotation ${entityName}?`);
            }
            else {
                rc.isAssert() && rc.assert(rc.getName(this), fieldsMap, `no fields found for ${entityName}?`);
            }
            if (ancestors)
                this.valAndProvisionAncestors(rc, ancestors, entityInfo);
            this.populateUniq(rc, entityInfo);
            // As fields are readonly, info is copied into them
            Object.assign(entityInfo.fieldMap, fieldsMap);
            entityInfo.fieldNames.push(...Object.keys(entityInfo.fieldMap));
            entityInfo.uniqueFields;
            if (compIndices)
                this.valAndProvisionCompIndices(rc, compIndices, entityInfo);
        }
        this.validateIndices(rc);
        gcloudEnv.namespace = this.namespacePrefix;
        this.datastore = new Datastore(gcloudEnv);
        rc.isDebug() && rc.debug(rc.getName(this), `Muds initialized with ${Object.keys(this.entityInfoMap).length} entities`);
        this.finalizeDataStructures(rc);
    }
    getNamespacePrefix() {
        return this.namespacePrefix;
    }
    extractFromMap(obj, prop) {
        const val = obj[prop];
        delete obj[prop];
        return val;
    }
    valAndProvisionAncestors(rc, ancestors, entityInfo) {
        const id = `valAndProvisionAncestors ${entityInfo.entityName}:`;
        for (const ancestor of ancestors) {
            const ancestorInfo = this.entityInfoMap[ancestor.name];
            rc.isAssert() && rc.assert(rc.getName(this), ancestorInfo, `${id} Missing dummy/entity annotation on ${ancestor.name}?`);
            rc.isAssert() && rc.assert(rc.getName(this), ancestorInfo.entityType !== muds_1.EntityType.Struct, `${id}: Cannot have struct ${ancestor.name} as ancestor?`);
            entityInfo.ancestors.push(ancestorInfo);
        }
    }
    populateUniq(rc, entityInfo, prefix) {
        entityInfo.fieldMap;
        for (let fieldName in entityInfo.fieldMap) {
            const field = entityInfo.fieldMap[fieldName];
            if (field.unique) {
                const uniqueKey = prefix ? `${prefix}.${field.fieldName}` : field.fieldName, Cls = muds_util_1.MudsUtil.getStructClass(field);
                if (Cls && field.indexed) {
                    //TODO(AD) : fix
                    // this.populateUniq(rc, uniques, uniqueKey)
                }
                entityInfo.uniqueFields[uniqueKey] = uniqueKey.split('.');
            }
        }
    }
    valAndProvisionCompIndices(rc, compIndices, entityInfo) {
        for (const compIdx of compIndices) {
            const idxs = Object.keys(compIdx);
            for (const idx of idxs) {
                muds_util_1.MudsUtil.checkIndexed(rc, this.entityInfoMap, idx, entityInfo.entityName);
            }
            entityInfo.compositeIndices.push(compIdx);
        }
        Object.freeze(entityInfo.compositeIndices);
    }
    validateIndices(rc) {
        for (const entityName of this.entityNames) {
            const info = this.entityInfoMap[entityName];
            for (const fieldName of info.fieldNames) {
                const me = info.fieldMap[fieldName], cls = muds_util_1.MudsUtil.getStructClass(me);
                if (cls) {
                    const structName = cls.name, indexedFields = this.areFieldsIndexed(rc, structName, entityName), uniqueField = this.hasUniqueField(rc, structName, entityName), strIndexed = (indexedFields ? '' : 'un') + 'indexed';
                    rc.isAssert() && rc.assert(rc.getName(this), !(Number(me.indexed) ^ Number(indexedFields)), `${entityName}/${fieldName} should be '${strIndexed}' as struct is '${strIndexed}'`);
                    uniqueField && rc.isAssert() && rc.assert(rc.getName(this), me.fieldType !== Array, `${entityName}/${fieldName} array cannot have unique members`);
                }
            }
        }
    }
    areFieldsIndexed(rc, structName, entityName) {
        const structInfo = this.entityInfoMap[structName];
        rc.isAssert() && rc.assert(rc.getName(this), structInfo, `${structName}' is not annotated as MudsStruct. Used in ${entityName}`);
        for (const sf of structInfo.fieldNames) {
            const sfm = structInfo.fieldMap[sf];
            if (sfm.indexed)
                return true;
        }
        return false;
    }
    hasUniqueField(rc, structName, entityName) {
        const structInfo = this.entityInfoMap[structName];
        rc.isAssert() && rc.assert(rc.getName(this), structInfo, `${structName}' is not annotated as MudsStruct. Used in ${entityName}`);
        for (const sf of structInfo.fieldNames) {
            const sfm = structInfo.fieldMap[sf];
            if (sfm.unique)
                return true;
        }
        return false;
    }
    finalizeDataStructures(rc) {
        const props = ['tempEntityFieldsMap', 'tempAncestorMap', 'tempCompIndices'], obj = this;
        for (const prop of props) {
            const keys = Object.keys(obj[prop]);
            rc.isAssert() && rc.assert(rc.getName(this), !keys.length, ` ${prop} is not empty. Has: ${keys}`);
            obj[prop] = null;
        }
        Object.freeze(this.entityInfoMap);
        Object.freeze(this);
    }
}
exports.MudsManager = MudsManager;
//# sourceMappingURL=muds-manager.js.map