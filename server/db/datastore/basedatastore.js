"use strict";
/*------------------------------------------------------------------------------
   About      : Access point from which all the datastore functionalities are
                accessed.
   
   Created on : Mon Apr 24 2017
   Author     : Akash Dathan
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDatastore = void 0;
const datastore = require('@google-cloud/datastore');
const error_codes_1 = require("./error-codes");
const ds_query_1 = require("./ds-query");
const dst_query_1 = require("./dst-query");
const ds_transaction_1 = require("./ds-transaction");
const lo = require("lodash");
const GLOBAL_NAMESPACE = undefined, MAX_DS_ITEMS_AT_A_TIME = 450, MAX_DS_TRANSACTIONS_AT_A_TIME = 5;
class BaseDatastore {
    constructor(id) {
        this.deleted = false;
        if (id)
            this._id = id;
    }
    /*------------------------------------------------------------------------------
      - Get a list of Fields which need to be checked for Uniqueness.
      - The difference from the above is that these keys are prefixed by keyNames.
      - Return Values is an array of
        - field Name in this Entity
      - Example:
        return ['mobileNo', 'emailId']
    ------------------------------------------------------------------------------*/
    getUniqueConstraintValues(rc, updRec) {
        return [];
    }
    /*------------------------------------------------------------------------------
      - Get Child Entities
      - Return Values is an object with
        - field Name of the childEntity within this Entity (Parent Entity)
        - value = Object containing an instance of the Child Entity & an indicator if the object is an array
      - Example:
        return { 'userLink': { model: new UserLink(rc), isArray: true }}
    ------------------------------------------------------------------------------*/
    // abstract getChildLinks(rc : RunContextServer) : [string] 
    // abstract isChildOf (rc : RunContextServer) : BaseDatastore 
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                          INITIALIZATION FUNCTION
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    static init(rc, gcloudEnv) {
        if (gcloudEnv.authKey) {
            gcloudEnv.datastore = datastore({
                projectId: gcloudEnv.projectId,
                credentials: gcloudEnv.authKey
            });
        }
        else {
            gcloudEnv.datastore = datastore({
                projectId: gcloudEnv.projectId
            });
        }
        this._namespace = gcloudEnv.namespace;
        this._datastore = gcloudEnv.datastore;
    }
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                NAMESPACE RELATED
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /*------------------------------------------------------------------------------
      - Tells whether this model is using global namespace or machine env specific namespace (local)
      - Defaults to false , which means machine env namespace will be used.
      - Models wish to be global namespace can override this and return true
    ------------------------------------------------------------------------------*/
    isGlobalNamespace(rc) {
        return false;
    }
    /*------------------------------------------------------------------------------
      - Get the namespace string depending upon whether namespace is global or local
    ------------------------------------------------------------------------------*/
    getNamespace(rc) {
        return this.isGlobalNamespace(rc) ? GLOBAL_NAMESPACE : BaseDatastore._namespace;
    }
    setNamespace(rc, namespace) {
        BaseDatastore._namespace = namespace;
    }
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                BASIC DB OPERATIONS
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /*------------------------------------------------------------------------------
      - Get by primary key
    ------------------------------------------------------------------------------*/
    async get(rc, id, ignoreRNF) {
        const traceId = `${rc.getName(this)}:get:${this.constructor.name}`, ack = rc.startTraceSpan(traceId);
        try {
            const key = this.getDatastoreKey(rc, id), kindName = this._kindName || this.constructor._kindName;
            rc.assert(rc.getName(this), !!id, 'ID Cannot be Null/Undefined [Kind = ' + kindName + ']');
            const entityRec = await BaseDatastore._datastore.get(key);
            if (!entityRec[0]) {
                if (ignoreRNF)
                    return false;
                throw (new error_codes_1.DSError(error_codes_1.ERROR_CODES.RECORD_NOT_FOUND, `Id: ${id}`));
            }
            this.deserialize(rc, entityRec[0]);
            return true;
        }
        catch (err) {
            if (err.code)
                rc.isError() && rc.error(rc.getName(this), '[Error Code:' + err.code + '], Error Message:', err.message);
            else
                rc.isError() && rc.error(err);
            throw (new Error(error_codes_1.ERROR_CODES.GCP_ERROR));
        }
        finally {
            rc.endTraceSpan(traceId, ack);
        }
    }
    /*------------------------------------------------------------------------------
      - Multi Get
    ------------------------------------------------------------------------------*/
    static async mGet(rc, ignoreRNF, ...recs) {
        rc.isAssert() && rc.assert(rc.getName(this), !lo.isEmpty(recs), 'mGet models invalid');
        const models = lo.clone(recs); // Clone to ensure that the recs array is not spliced!
        while (models.length) {
            await this.mGetInternal(rc, ignoreRNF, ...models.splice(0, MAX_DS_ITEMS_AT_A_TIME));
        }
        return true;
    }
    static async mGetInternal(rc, ignoreRNF, ...models) {
        const traceId = `${rc.getName(this)}:mget${models.length ? ':' + models[0].constructor.name : ''}`, ack = rc.startTraceSpan(traceId);
        let result = true;
        try {
            const keys = [];
            models.forEach((model) => {
                rc.isAssert() && rc.assert(rc.getName(this), model instanceof BaseDatastore, 'Model:', model, ', is not a valid BaseDataStore Model');
                rc.isAssert() && rc.assert(rc.getName(this), model.getId(rc), 'model id not set', model);
                keys.push(model.getDatastoreKey(rc, model.getId(rc)));
            });
            const res = await BaseDatastore._datastore.get(keys), entityRecords = res[0];
            if (entityRecords.length !== models.length) {
                if (!ignoreRNF)
                    throw (new error_codes_1.DSError(error_codes_1.ERROR_CODES.RECORD_NOT_FOUND, `Keys: ${keys}`));
                result = false;
            }
            for (let i = 0; i < entityRecords.length; i++) {
                const id = BaseDatastore.getIdFromResult(rc, entityRecords[i]);
                // missing model result  are not present as undefined
                // we have to check the matching by id
                const model = models.find((mod) => { return mod.getId(rc) === id; });
                rc.isAssert() && rc.assert(rc.getName(this), model, 'model not found for ', entityRecords[i][BaseDatastore._datastore.KEY]);
                model.deserialize(rc, entityRecords[i]);
            }
        }
        catch (err) {
            if (err.code)
                rc.isError() && rc.error(rc.getName(this), '[Error Code:' + err.code + '], Error Message:', err.message);
            else
                rc.isError() && rc.error(err);
            throw (new Error(error_codes_1.ERROR_CODES.GCP_ERROR));
        }
        finally {
            rc.endTraceSpan(traceId, ack);
        }
        return result;
    }
    /*------------------------------------------------------------------------------
      - Multi Insert
    ------------------------------------------------------------------------------*/
    static async mInsert(rc, insertTime, allowDupRec, ...recs) {
        rc.isAssert() && rc.assert(rc.getName(this), !lo.isEmpty(recs), 'mInsert models invalid');
        const models = lo.clone(recs); // Clone to ensure that the recs array is not spliced!
        while (models.length) {
            await this.mInsertInternal(rc, insertTime, allowDupRec, ...models.splice(0, MAX_DS_TRANSACTIONS_AT_A_TIME));
        }
        return true;
    }
    static async mInsertInternal(rc, insertTime, allowDupRec, ...models) {
        const traceId = `${rc.getName(this)}:mInsert${models.length ? ':' + models[0].constructor.name : ''}`, ack = rc.startTraceSpan(traceId), transaction = this.createTransaction(rc);
        try {
            await transaction.start(rc);
            await transaction.mInsert(rc, insertTime, ...models);
            await transaction.commit(rc);
            return true;
        }
        catch (err) {
            rc.isError() && rc.error(rc.getName(this), (err.code) ? '[Error Code:' + err.code + ']' : '', 'Error Message:', err.message);
            await transaction.rollback(rc);
            throw (new Error(error_codes_1.ERROR_CODES.GCP_ERROR));
        }
        finally {
            rc.endTraceSpan(traceId, ack);
        }
    }
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      Blind Update, Use with Care! Not checking for Constraints!
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    static async mUpdate(rc, ...recs) {
        rc.isAssert() && rc.assert(rc.getName(this), !lo.isEmpty(recs), 'mUpdate models invalid');
        // this.hasUniqueChanged (rc, recs)  // TODO: [CG] Dont allow changing of unique keys!   
        const models = lo.clone(recs); // Clone to ensure that the recs array is not spliced!
        while (models.length) {
            await this.mUpdateInternal(rc, ...models.splice(0, MAX_DS_TRANSACTIONS_AT_A_TIME));
        }
        return true;
    }
    static async mUpdateInternal(rc, ...models) {
        const traceId = `${rc.getName(this)}:mUpdate${models.length ? ':' + models[0].constructor.name : ''}`, ack = rc.startTraceSpan(traceId), transaction = this.createTransaction(rc), clones = models.map(m => m.clone(rc, true));
        try {
            await transaction.start(rc);
            await transaction.mGet(rc, true, ...clones);
            for (const i in models) {
                Object.assign(clones[i], models[i]);
            }
            await transaction.mUpdate(rc, ...clones);
            await transaction.commit(rc);
            return true;
        }
        catch (err) {
            rc.isError() && rc.error(rc.getName(this), (err.code) ? '[Error Code:' + err.code + ']' : '', 'Error Message:', err.message);
            await transaction.rollback(rc);
            throw (new Error(error_codes_1.ERROR_CODES.GCP_ERROR));
        }
        finally {
            rc.endTraceSpan(traceId, ack);
        }
    }
    /*------------------------------------------------------------------------------
      - Multi Delete
    ------------------------------------------------------------------------------*/
    static async mDelete(rc, ...recs) {
        rc.isAssert() && rc.assert(rc.getName(this), !lo.isEmpty(recs), 'mDelete models invalid');
        const models = lo.clone(recs); // Clone to ensure that the recs array is not spliced!
        while (models.length) {
            await this.mDeleteInternal(rc, ...models.splice(0, MAX_DS_TRANSACTIONS_AT_A_TIME));
        }
        return true;
    }
    static async mDeleteInternal(rc, ...models) {
        const traceId = `${rc.getName(this)}:mDelete`, ack = rc.startTraceSpan(traceId), transaction = this.createTransaction(rc);
        try {
            await transaction.start(rc);
            await transaction.mDelete(rc, ...models);
            await transaction.commit(rc);
            return true;
        }
        catch (err) {
            rc.isError() && rc.error(rc.getName(this), (err.code) ? '[Error Code:' + err.code + ']' : '', 'Error Message:', err.message);
            await transaction.rollback(rc);
            throw (new Error(error_codes_1.ERROR_CODES.GCP_ERROR));
        }
        finally {
            rc.endTraceSpan(traceId, ack);
        }
    }
    /*------------------------------------------------------------------------------
      - Multi Soft Delete
    ------------------------------------------------------------------------------*/
    static async mSoftDelete(rc, ...recs) {
        rc.isAssert() && rc.assert(rc.getName(this), !lo.isEmpty(recs), 'mSoftDelete models invalid');
        const models = lo.clone(recs); // Clone to ensure that the recs array is not spliced!
        while (models.length) {
            await this.mSoftDeleteInternal(rc, ...models.splice(0, MAX_DS_TRANSACTIONS_AT_A_TIME));
        }
        return true;
    }
    static async mSoftDeleteInternal(rc, ...models) {
        const traceId = `${rc.getName(this)}:mDelete`, ack = rc.startTraceSpan(traceId), transaction = this.createTransaction(rc);
        try {
            await transaction.start(rc);
            await transaction.mGet(rc, false, ...models);
            await transaction.mUniqueDelete(rc, ...models);
            for (const model of models) {
                model.deleted = true;
            }
            await transaction.mUpdate(rc, ...models);
            await transaction.commit(rc);
            return true;
        }
        catch (err) {
            rc.isError() && rc.error(rc.getName(this), (err.code) ? '[Error Code:' + err.code + ']' : '', 'Error Message:', err.message);
            await transaction.rollback(rc);
            throw (new Error(error_codes_1.ERROR_CODES.GCP_ERROR));
        }
        finally {
            rc.endTraceSpan(traceId, ack);
        }
    }
    /*------------------------------------------------------------------------------
      - Insert to datastore
    
      Parameters:
      - insertTime     = Default is now()
      - ignoreDupRec   = Default is true [Ignore Duplicates... Ignore the Duplicate Error]
      - noChildren     = Default is true [No Children]
    ------------------------------------------------------------------------------*/
    async insert(rc, insertTime, allowDupRec) {
        // Re-direction to DS Transaction!
        const traceId = `${rc.getName(this)}:insert:${this.constructor.name}`, transaction = this.constructor.createTransaction(rc), ack = rc.startTraceSpan(traceId);
        try {
            //await transaction.start(rc)
            //await transaction.insert(rc, this)
            //await transaction.commit(rc)
            return true;
        }
        catch (err) {
            if (err.name !== error_codes_1.ERROR_CODES.UNIQUE_KEY_EXISTS) {
                rc.isWarn() && rc.warn(rc.getName(this), '[Error Code:' + err.code + '], Error Message:', err.message);
            }
            //await transaction.rollback (rc)
            throw err;
        }
        finally {
            rc.endTraceSpan(traceId, ack);
        }
    }
    /*------------------------------------------------------------------------------
      - Update
    ------------------------------------------------------------------------------*/
    async update(rc, id, updRec, ignoreRNF) {
        // Re-direction to DS Transaction!
        const traceId = `${rc.getName(this)}:update:${this.constructor.name}`, transaction = this.constructor.createTransaction(rc), ack = rc.startTraceSpan(traceId);
        try {
            this._id = id;
            //await transaction.start(rc)
            //await transaction.get(rc, this)
            //await transaction.update(rc, this, updRec)
            //await transaction.commit(rc)
            return this;
        }
        catch (err) {
            //await transaction.rollback (rc)
            throw err;
        }
        finally {
            rc.endTraceSpan(traceId, ack);
        }
    }
    /*------------------------------------------------------------------------------
      - Soft Delete
      - The 'deleted' param will be set as true
      - The unique param is deleted, if set
      - Optional params to be modified can be provided
    ------------------------------------------------------------------------------*/
    async softDelete(rc, id, params, ignoreRNF) {
        const traceId = `${rc.getName(this)}:softDelete:${this.constructor.name}`, ack = rc.startTraceSpan(traceId), transaction = this.constructor.createTransaction(rc);
        try {
            this._id = id;
            //await transaction.start(rc)
            //await transaction.get(rc, this)
            //await transaction.mUniqueDelete(rc, this)
            // TODO: Need to add the unique Constraint Fields with undefined value to params...
            this.deleted = true;
            if (params)
                Object.assign(this, params);
            //await transaction.update(rc, this) // Dont Check Constraints. mUniqueDelete Done...
            //await transaction.commit (rc)
            return true;
        }
        catch (err) {
            rc.isError() && rc.error(rc.getName(this), '[Error Code:' + err.code + '], Error Message:', err.message);
            //await transaction.rollback (rc)
            throw (new error_codes_1.DSError(error_codes_1.ERROR_CODES.GCP_ERROR, err.message));
        }
        finally {
            rc.endTraceSpan(traceId, ack);
        }
    }
    /*------------------------------------------------------------------------------
      - Get kind Name
    ------------------------------------------------------------------------------*/
    static getKindName(rc) {
        return this._kindName;
    }
    /*------------------------------------------------------------------------------
      - Get Create Ts
    ------------------------------------------------------------------------------*/
    getCreateTs(rc) {
        return this.createTs;
    }
    /*------------------------------------------------------------------------------
      - Get deleted Flag
    ------------------------------------------------------------------------------*/
    isDeleted(rc) {
        return this.deleted;
    }
    /*------------------------------------------------------------------------------
      - Get ID from result
      - ID is not returned while getting object or while querying
    ------------------------------------------------------------------------------*/
    static getIdFromResult(rc, res) {
        if (res instanceof BaseDatastore && res._id)
            return res._id;
        const key = res[BaseDatastore._datastore.KEY];
        if (key.id)
            return Number(key.id);
        return key.name;
    }
    /*------------------------------------------------------------------------------
      - Get KEY from result
    ------------------------------------------------------------------------------*/
    static getKeyFromResult(rc, res) {
        return res[BaseDatastore._datastore.KEY];
    }
    /*------------------------------------------------------------------------------
      - Get the primary key
    ------------------------------------------------------------------------------*/
    getId(rc) {
        return this._id;
    }
    setId(id) {
        this._id = id;
    }
    /*------------------------------------------------------------------------------
      - Set the primary key
    ------------------------------------------------------------------------------*/
    setIdFromResult(rc, res) {
        const id = BaseDatastore.getIdFromResult(rc, res);
        this._id = id;
    }
    /*------------------------------------------------------------------------------
      - Set the primary key
    ------------------------------------------------------------------------------*/
    setIdFromKey(rc, key) {
        if (key.id)
            this._id = Number(key.id);
        else
            this._id = key.name;
    }
    /*------------------------------------------------------------------------------
      - Create Query
    ------------------------------------------------------------------------------*/
    createQuery(rc, transaction) {
        const kindname = this.constructor._kindName;
        if (!kindname)
            rc.warn(rc.getName(this), 'KindName: ', kindname);
        const model = new this.constructor();
        if (transaction)
            return new dst_query_1.DSTQuery(rc, transaction.getTransaction(rc), model.getNamespace(rc), kindname);
        return new ds_query_1.DSQuery(rc, BaseDatastore._datastore, kindname, model);
    }
    static createQueryWithNamespace(rc, namespace) {
        const model = new this();
        return new ds_query_1.DSQuery(rc, BaseDatastore._datastore, this._kindName, model, namespace);
    }
    /*------------------------------------------------------------------------------
      - Create Transaction
    ------------------------------------------------------------------------------*/
    static createTransaction(rc) {
        const model = new this();
        return new ds_transaction_1.DSTransaction(rc, this._datastore, model.getNamespace(rc), this._kindName);
    }
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                UTILITY FUNCTIONS
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /*------------------------------------------------------------------------------
      - Unique params are identified and set as a primary key in a different
        collection to avoid duplication
      - Unique params are defined in the model
    ------------------------------------------------------------------------------*/
    static getUniqueEntities(rc, ...models) {
        let entities = [];
        for (const model of models) {
            const uniqueConstraints = model.getUniqueConstraints(rc), kindName = model._kindName || model.constructor._kindName, tEntities = lo.flatMap(uniqueConstraints, (prop) => {
                if (model[prop] === undefined || model[prop] === null)
                    return [];
                const value = model[prop];
                return [{ key: model.getDatastoreKey(rc, value, true), data: '' }];
            });
            entities = entities.concat(tEntities);
            const uPrefixedConstraints = model.getUniqueConstraintValues(rc), tuEntities = lo.flatMap(uPrefixedConstraints, (propValue) => {
                if (propValue === undefined || propValue === null)
                    return [];
                return [{ key: model.getDatastoreKey(rc, propValue, true), data: '' }];
            });
            entities = entities.concat(tuEntities);
        }
        return entities;
    }
    static getUniqueEntitiesForUpdate(rc, model, ...updRecs) {
        rc.isAssert() && rc.assert(rc.getName(this), !lo.isEmpty(updRecs), 'CheckUnique: mUnique models invalid');
        const uniqueConstraints = model.getUniqueConstraints(rc);
        let entities = [];
        for (const updRec of updRecs) {
            const uPrefixedConstraints = model.getUniqueConstraintValues(rc, updRec);
            uniqueConstraints.forEach((prop) => {
                if (prop in updRec && model[prop]) { // If Constraint Changes...
                    throw (new error_codes_1.DSError(error_codes_1.ERROR_CODES.UNSUPPORTED_UPDATE_FIELDS, 'Unique Constraint Field has Changed, ' +
                        prop + ':' + model[prop] + '=>' + updRec[prop] + ', ID:' + model._id));
                }
                if (updRec[prop])
                    entities.push({ key: model.getDatastoreKey(rc, updRec[prop], true), data: '' });
            });
            const tuEntities = lo.flatMap(uPrefixedConstraints, (propValue) => {
                if (propValue === undefined || propValue === null)
                    return [];
                return [{ key: model.getDatastoreKey(rc, propValue, true), data: '' }];
            });
            entities = entities.concat(tuEntities);
        }
        return entities;
    }
    /*------------------------------------------------------------------------------
      - Create the datastore key from the id, kindName and parent key path
      - Key should be in the format
        {
          namespace : 'namespace',
          path      : [The complete path]
        }
    ------------------------------------------------------------------------------*/
    getDatastoreKey(rc, id, unique, parentKey) {
        let datastoreKey;
        if (!id)
            id = this._id;
        // if(!id) throw new DSError(ERROR_CODES.ID_NOT_FOUND, `${id}`) // TODO : Investigate
        let kindName = this._kindName || this.constructor._kindName;
        if (unique)
            kindName += '_unique';
        if (!parentKey) {
            datastoreKey = BaseDatastore._datastore.key({
                namespace: this.getNamespace(rc),
                path: ([kindName, id])
            });
        }
        else {
            datastoreKey = BaseDatastore._datastore.key({
                namespace: this.getNamespace(rc),
                path: (parentKey.path.concat([kindName, id]))
            });
        }
        return datastoreKey;
    }
    /*------------------------------------------------------------------------------
      - Allocate Id
    ------------------------------------------------------------------------------*/
    async allocateId(rc) {
        const incompleteKey = this.getDatastoreKey(rc), keys = await BaseDatastore._datastore.allocateIds(incompleteKey, 1), newKey = keys[0][0], id = Number(newKey.id);
        this._id = id;
        return id;
    }
    /*------------------------------------------------------------------------------
      - Deserialize: Assign the values of the object passed to the respective fields
    ------------------------------------------------------------------------------*/
    deserialize(rc, value) {
        this._id = BaseDatastore.getIdFromResult(rc, value);
        for (let prop in value) {
            let val = value[prop], dVal = this[prop];
            if (prop.substr(0, 1) === '_' || val === undefined || typeof (val) === 'function' /*val instanceof Function*/)
                continue;
            if (dVal && typeof (dVal) === 'object' && dVal.deserialize instanceof Function) {
                this[prop] = dVal.deserialize(val);
            }
            else {
                this[prop] = val;
            }
        }
        return this;
    }
    clone(rc, onlyId) {
        const newInstance = new this.constructor(rc);
        newInstance._id = this._id;
        if (!onlyId)
            newInstance.deserialize(rc, this);
        return newInstance;
    }
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                INTERNAL FUNCTIONS
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /*------------------------------------------------------------------------------
     - Records are to be converted to a format accepted by datastore
     - 'insertRec' can be a model rec or a normal object
     - The whole model class along with fixed params defined in datastore is
       taken if 'insertRec' is not provided
   ------------------------------------------------------------------------------*/
    getInsertRec(rc, insertTime, insertRec) {
        let retArr = [];
        insertRec = insertRec || this;
        insertTime = insertTime || Date.now();
        if (Array.isArray(insertRec)) {
            for (let rec of insertRec) {
                rec.createTs = insertTime;
                rec.modTs = insertTime;
                retArr = retArr.concat(this.serialize(rc, rec));
            }
            return retArr;
        }
        else {
            insertRec.createTs = insertTime;
            insertRec.modTs = insertTime;
            return this.serialize(rc, insertRec);
        }
    }
    /*------------------------------------------------------------------------------
      - Records are to be converted to a format accepted by datastore
    ------------------------------------------------------------------------------*/
    getUpdateRec(rc, updateRec, updateTime) {
        let retArr = [];
        if (!updateRec)
            updateRec = this;
        if (Array.isArray(updateRec)) {
            for (let rec of updateRec) {
                rec.modTs = updateTime || Date.now();
                retArr = retArr.concat(this.serialize(rc, rec));
            }
            return retArr;
        }
        else {
            updateRec.modTs = updateTime || Date.now();
            return this.serialize(rc, updateRec);
        }
    }
    /*------------------------------------------------------------------------------
      - Serialize is towards Datastore. Need to convert it to Data format
    ------------------------------------------------------------------------------*/
    serialize(rc, value) {
        const rec = [];
        for (let prop in value) {
            const indexedFields = [...BaseDatastore._indexedFields, ...this.getIndexedFields(rc)];
            let val = value[prop];
            if (prop.substr(0, 1) === '_' || val === undefined || val instanceof Function)
                continue;
            if (val && typeof (val) === 'object' && val.serialize instanceof Function)
                val = val.serialize(rc);
            rec.push({ name: prop, value: val, excludeFromIndexes: (indexedFields.indexOf(prop) === -1) });
        }
        return rec;
    }
}
exports.BaseDatastore = BaseDatastore;
BaseDatastore._autoFields = ['createTs', 'deleted', 'modTs', 'modUid'];
BaseDatastore._indexedFields = ['createTs', 'deleted', 'modTs'];
//# sourceMappingURL=basedatastore.js.map