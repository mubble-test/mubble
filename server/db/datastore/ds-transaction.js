"use strict";
/*------------------------------------------------------------------------------
   About      : Transaction support for datastore
   
   Created on : Tue Jun 06 2017
   Author     : Akash Dathan
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.DSTransaction = void 0;
const error_codes_1 = require("./error-codes");
const basedatastore_1 = require("./basedatastore");
const lo = require("lodash");
class DSTransaction {
    constructor(rc, datastore, namespace, kindname) {
        this.tranSteps = [];
        this._transaction = datastore.transaction();
        this._namespace = namespace;
        this._kindname = kindname;
        this._datastore = datastore;
        this.tranId = 'transaction_' + this._kindname + '_' + Date.now();
        this.ack = rc.startTraceSpan(this.tranId);
    }
    /*------------------------------------------------------------------------------
      - Get the datastore transaction Instance. Used in DSTQuery
    ------------------------------------------------------------------------------*/
    getTransaction(rc) {
        return this._transaction;
    }
    /*------------------------------------------------------------------------------
      - Get an id, which can be assigned to a entity before insert
    ------------------------------------------------------------------------------*/
    async getIdFromTransaction(rc, model, parentKey) {
        const datastoreKey = model.getDatastoreKey(rc, null, false, parentKey), key = await this._transaction.allocateIds(datastoreKey, 1);
        model.setId(Number(key[0][0].id));
        return Number(key[0][0].id);
    }
    /*------------------------------------------------------------------------------
      - Start a transaction
      - Needed only if we use a transaction outside models.
    ------------------------------------------------------------------------------*/
    async start(rc) {
        const traceId = this.tranId + '_start', ack = rc.startTraceSpan(traceId);
        this.tranSteps.push(traceId);
        rc.isDebug() && rc.debug(rc.getName(this), traceId + '=> Transaction Step Started');
        try {
            await this._transaction.run();
        }
        catch (err) {
            if (err.code)
                rc.isError() && rc.error(rc.getName(this), traceId + '[Error Code:' + err.code + '], Error Message:', err.message);
            else
                rc.isError() && rc.error(rc.getName(this), traceId + '=> Unable to start transaction', err);
            throw (new error_codes_1.DSError(error_codes_1.ERROR_CODES.TRANSACTION_ERROR, err.message));
        }
        finally {
            rc.endTraceSpan(traceId, ack);
        }
    }
    /*------------------------------------------------------------------------------
      - Complete a transaction
      - Needed only if we use a transaction outside models.
    ------------------------------------------------------------------------------*/
    async commit(rc) {
        const traceId = this.tranId + '_commit', ack = rc.startTraceSpan(traceId);
        this.tranSteps.push(traceId);
        rc.isDebug() && rc.debug(rc.getName(this), traceId + '=> Transaction Step Started');
        try {
            await this._transaction.commit();
        }
        catch (err) {
            // Commit failed, Rolled back by DS.
            rc.isError() && rc.error(rc.getName(this), traceId + '=> Commit Failed', err);
            throw (new error_codes_1.DSError(error_codes_1.ERROR_CODES.TRANSACTION_ERROR, err.message));
        }
        finally {
            rc.endTraceSpan(traceId, ack);
            rc.endTraceSpan(this.tranId, this.ack);
        }
    }
    /*------------------------------------------------------------------------------
      - Abandon a transaction
    ------------------------------------------------------------------------------*/
    async rollback(rc) {
        const traceId = this.tranId + '_rollback', ack = rc.startTraceSpan(traceId);
        this.tranSteps.push(traceId);
        rc.isDebug() && rc.debug(rc.getName(this), traceId + '=> Transaction Step Started');
        try {
            const resp = await this._transaction.rollback();
        }
        catch (err) {
            rc.isWarn() && rc.warn(rc.getName(this), 'Transaction Steps before Rollback', JSON.stringify(this.tranSteps));
            rc.isWarn() && rc.warn(rc.getName(this), traceId + '=> Ignoring Rollback Error:', !!this._transaction, err);
        }
        finally {
            rc.endTraceSpan(traceId, ack);
            //rc.endTraceSpan(this.tranId, this.ack) // This is already done in commit
        }
    }
    /*------------------------------------------------------------------------------
      - Create a query
      - This only works for sub-entities = [Entities with a parent key]
    ------------------------------------------------------------------------------*/
    async createQuery(rc, namespace, kindName) {
        return this._transaction.createQuery(namespace, kindName);
    }
    /*------------------------------------------------------------------------------
      - Get with Transaction
    ------------------------------------------------------------------------------*/
    async get(rc, model, ignoreRNF, parentKey) {
        const traceId = this.tranId + '_get', ack = rc.startTraceSpan(traceId);
        this.tranSteps.push(traceId);
        rc.isDebug() && rc.debug(rc.getName(this), traceId + '=> Transaction Step Started');
        try {
            const mId = model.getId(rc), kindName = model._kindName || model.constructor._kindName;
            rc.isAssert() && rc.assert(rc.getName(this), !!mId, traceId + '=> ID Cannot be Null/Undefined [Kind = ' + kindName + ']');
            const key = model.getDatastoreKey(rc, mId, false, parentKey), entityRec = await this._transaction.get(key);
            if (!entityRec[0]) {
                if (!ignoreRNF)
                    throw (new error_codes_1.DSError(error_codes_1.ERROR_CODES.RECORD_NOT_FOUND, `[Kind: ${kindName}, Id: ${mId}]`));
                return false;
            }
            model.deserialize(rc, entityRec[0]);
            return true;
        }
        finally {
            rc.endTraceSpan(traceId, ack);
        }
    }
    /*------------------------------------------------------------------------------
      - Get multiple entities
      - multiple models to be passed as an array
    ------------------------------------------------------------------------------*/
    async mGet(rc, ignoreRNF, ...models) {
        const traceId = this.tranId + '_mget', ack = rc.startTraceSpan(traceId);
        this.tranSteps.push(traceId);
        rc.isDebug() && rc.debug(rc.getName(this), traceId + '=> Transaction Step Started');
        const keys = [];
        models.forEach((model) => {
            rc.isAssert() && rc.assert(rc.getName(this), model instanceof basedatastore_1.BaseDatastore, 'model:', model, ', is not a valid BaseDataStore Model');
            rc.isAssert() && rc.assert(rc.getName(this), model.getId(rc), 'model id not set', model);
            keys.push(model.getDatastoreKey(rc, model.getId(rc)));
        });
        try {
            const res = await this._transaction.get(keys), entityRecords = res[0];
            if (entityRecords.length !== models.length) {
                if (!ignoreRNF)
                    throw (new error_codes_1.DSError(error_codes_1.ERROR_CODES.RECORD_NOT_FOUND, `Keys: ${keys}`));
                return false;
            }
            for (const entityRecord of entityRecords) {
                const id = basedatastore_1.BaseDatastore.getIdFromResult(rc, entityRecord);
                // missing model result  are not present as undefined
                // we have to check the matching by id
                let model = models.find((mod) => {
                    return mod.getId(rc) === id;
                });
                rc.isAssert() && rc.assert(rc.getName(this), model, 'model not found for ', entityRecord[basedatastore_1.BaseDatastore._datastore.KEY]);
                model.deserialize(rc, entityRecord);
            }
            return true;
        }
        finally {
            rc.endTraceSpan(traceId, ack);
        }
    }
    /*------------------------------------------------------------------------------
      - Insert with Transaction
    ------------------------------------------------------------------------------*/
    async insert(rc, model, parentKey, insertTime) {
        const traceId = this.tranId + '_insert', ack = rc.startTraceSpan(traceId);
        this.tranSteps.push(traceId);
        rc.isDebug() && rc.debug(rc.getName(this), traceId + '=> Transaction Step Started');
        const id = model.getId(rc) || await this.getIdFromTransaction(rc, model, parentKey), datastoreKey = model.getDatastoreKey(rc, id, false, parentKey);
        try {
            model.setId(id);
            await this.mUniqueInsert(rc, model);
            this._transaction.save({ key: datastoreKey, data: model.getInsertRec(rc, insertTime) });
        }
        finally {
            rc.endTraceSpan(traceId, ack);
        }
    }
    /*------------------------------------------------------------------------------
      - Bulk Insert with Transaction
    ------------------------------------------------------------------------------*/
    async mInsert(rc, insertTime, ...recs) {
        rc.isAssert() && rc.assert(rc.getName(this), !lo.isEmpty(recs), 'mInsert models invalid');
        const models = lo.clone(recs); // Clone to ensure that the recs array is not spliced!
        await this.mInsertInternal(rc, insertTime, ...models);
        return true;
    }
    async mInsertInternal(rc, insertTime, ...models) {
        const traceId = this.tranId + '_minsert', ack = rc.startTraceSpan(traceId);
        this.tranSteps.push(traceId);
        rc.isDebug() && rc.debug(rc.getName(this), traceId + '=> Transaction Step Started');
        const entities = [];
        try {
            for (const model of models) {
                const mId = model.getId(rc) || await this.getIdFromTransaction(rc, model), kindName = model._kindName || model.constructor._kindName;
                model.setId(mId);
                rc.isAssert() && rc.assert(rc.getName(this), !!mId, `ID Cannot be Null/Undefined [Kind: ${kindName}]`);
                entities.push({ key: model.getDatastoreKey(rc, mId, false), data: model.getInsertRec(rc, insertTime) });
            }
            await this.mUniqueInsert(rc, ...models);
            this._transaction.save(entities);
        }
        finally {
            rc.endTraceSpan(traceId, ack);
        }
    }
    /*------------------------------------------------------------------------------
      - Update with Transaction. [Unique Check will only happen if updRec is passed]
    ------------------------------------------------------------------------------*/
    async update(rc, model, updRec, parentKey) {
        const traceId = this.tranId + '_update', ack = rc.startTraceSpan(traceId);
        this.tranSteps.push(traceId);
        rc.isDebug() && rc.debug(rc.getName(this), traceId + '=> Transaction Step Started');
        const mId = model.getId(rc), kindName = model._kindName || model.constructor._kindName;
        try {
            if (updRec) { // Check Unique Constraints!
                await this.mUniqueUpdate(rc, model, updRec);
                Object.assign(model, updRec);
            }
            rc.isAssert() && rc.assert(rc.getName(this), !!mId, `ID Cannot be Null/Undefined [Kind: ${kindName}]`);
            this._transaction.save({ key: model.getDatastoreKey(rc, mId, false, parentKey), data: model.getUpdateRec(rc) });
        }
        finally {
            rc.endTraceSpan(traceId, ack);
        }
    }
    /*------------------------------------------------------------------------------
      - Bulk Update with Transaction
    ------------------------------------------------------------------------------*/
    mUpdate(rc, ...recs) {
        rc.isAssert() && rc.assert(rc.getName(this), !lo.isEmpty(recs), 'mUpdate models invalid');
        const models = lo.clone(recs); // Clone to ensure that the recs array is not spliced!
        this.mUpdateInternal(rc, ...models);
        return true;
    }
    mUpdateInternal(rc, ...models) {
        const traceId = this.tranId + '_mupdate', ack = rc.startTraceSpan(traceId);
        this.tranSteps.push(traceId);
        rc.isDebug() && rc.debug(rc.getName(this), traceId + '=> Transaction Step Started');
        const entities = [];
        try {
            for (const model of models) {
                const mId = model.getId(rc), kindName = model._kindName || model.constructor._kindName;
                rc.isAssert() && rc.assert(rc.getName(this), !!mId, `ID Cannot be Null/Undefined [Kind: ${kindName}]`);
                entities.push({ key: model.getDatastoreKey(rc, mId), data: model.getUpdateRec(rc) });
            }
            this._transaction.save(entities);
        }
        finally {
            rc.endTraceSpan(traceId, ack);
        }
    }
    /*------------------------------------------------------------------------------
      - Delete with Transaction
    ------------------------------------------------------------------------------*/
    delete(rc, model, parentKey) {
        const traceId = this.tranId + '_delete', ack = rc.startTraceSpan(traceId);
        this.tranSteps.push(traceId);
        rc.isDebug() && rc.debug(rc.getName(this), traceId + '=> Transaction Step Started');
        const mId = model.getId(rc), kindName = model._kindName || model.constructor._kindName;
        try {
            rc.isAssert() && rc.assert(rc.getName(this), !!mId, 'ID Cannot be Null/Undefined [Kind = ' + kindName + ']');
            this.mUniqueDelete(rc, model);
            this._transaction.delete(model.getDatastoreKey(rc, mId, false, parentKey));
        }
        finally {
            rc.endTraceSpan(traceId, ack);
        }
    }
    /*------------------------------------------------------------------------------
      - Bulk Delete with Transaction
    ------------------------------------------------------------------------------*/
    mDelete(rc, ...models) {
        const traceId = this.tranId + '_mdelete', ack = rc.startTraceSpan(traceId);
        this.tranSteps.push(traceId);
        rc.isDebug() && rc.debug(rc.getName(this), traceId + '=> Transaction Step Started');
        const keys = [];
        try {
            for (const model of models) {
                const mId = model.getId(rc), kindName = model._kindName || model.constructor._kindName;
                rc.isAssert() && rc.assert(rc.getName(this), !!mId, 'ID Cannot be Null/Undefined [Kind = ' + kindName + ']');
                keys.push(model.getDatastoreKey(rc, mId, false));
            }
            this.mUniqueDelete(rc, ...models);
            this._transaction.delete(keys);
        }
        finally {
            rc.endTraceSpan(traceId, ack);
        }
    }
    /*------------------------------------------------------------------------------
      - Bulk Unique with Transaction
    ------------------------------------------------------------------------------*/
    /*------------------------------------------------------------------------------
      - Unique params are identified and set as a primary key in a different
        collection to avoid duplication
      - Unique params are defined in the model
    ------------------------------------------------------------------------------*/
    async mUniqueInsert(rc, ...models) {
        rc.isAssert() && rc.assert(rc.getName(this), !lo.isEmpty(models), 'mUnique: Number of Models to be Inserted: ZERO');
        const uniqueEntities = basedatastore_1.BaseDatastore.getUniqueEntities(rc, ...models);
        if (!uniqueEntities || !uniqueEntities.length)
            return true;
        const keys = uniqueEntities.map((entity) => entity.key), res = await this._transaction.get(keys), entityRecords = res[0], resKeys = entityRecords.map((entity) => basedatastore_1.BaseDatastore.getIdFromResult(rc, entity));
        if (entityRecords.length !== 0) { // Not Unique!
            rc.isWarn() && rc.warn(rc.getName(this), `One or more Unique Keys Exist [INS] : ${JSON.stringify(resKeys)}`);
            throw (new error_codes_1.DSError(error_codes_1.ERROR_CODES.UNIQUE_KEY_EXISTS, 'Unable to Insert, One or more Unique Keys Exist'));
        }
        this._transaction.save(uniqueEntities);
        return true;
    }
    async mUniqueUpdate(rc, model, ...recs) {
        rc.isAssert() && rc.assert(rc.getName(this), !lo.isEmpty(recs), 'mUnique: Number of Records to be Updated: ZERO');
        const uniqueEntities = basedatastore_1.BaseDatastore.getUniqueEntitiesForUpdate(rc, model, ...recs);
        if (!uniqueEntities || !uniqueEntities.length)
            return true;
        const keys = uniqueEntities.map((entity) => entity.key), res = await this._transaction.get(keys), entityRecords = res[0], resKeys = entityRecords.map((entity) => basedatastore_1.BaseDatastore.getIdFromResult(rc, entity));
        if (entityRecords.length !== 0) { // Not Unique!
            rc.isWarn() && rc.warn(rc.getName(this), `One or more Unique Keys Exist [UPD] : ${JSON.stringify(resKeys)}`);
            throw (new error_codes_1.DSError(error_codes_1.ERROR_CODES.UNIQUE_KEY_EXISTS, 'Unable to Update, One or more Unique Keys Exist'));
        }
        this._transaction.save(uniqueEntities);
        return true;
    }
    mUniqueDelete(rc, ...models) {
        rc.isAssert() && rc.assert(rc.getName(this), !lo.isEmpty(models), 'mUnique: Number of Records to be Deleted: ZERO');
        const uniqueEntities = basedatastore_1.BaseDatastore.getUniqueEntities(rc, ...models);
        if (!uniqueEntities || !uniqueEntities.length)
            return true;
        const delKeys = uniqueEntities.map((entity) => entity.key);
        this._transaction.delete(delKeys);
        return true;
    }
}
exports.DSTransaction = DSTransaction;
//# sourceMappingURL=ds-transaction.js.map