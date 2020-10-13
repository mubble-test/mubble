"use strict";
/*------------------------------------------------------------------------------
   About      : Obmop Manager
   
   Created on : Fri Jun 14 2019
   Author     : Vishal Sinha
   
   Copyright (c) 2019 Obopay Mobile Technologies Pvt Ltd. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObmopManager = exports.SORT_MODE = void 0;
const obmop_util_1 = require("./obmop-util");
const obmop_registry_1 = require("./obmop-registry");
const core_1 = require("@mubble/core");
const NUMBER_TYPE = 'Number';
var SORT_MODE;
(function (SORT_MODE) {
    SORT_MODE["ASC"] = "ASC";
    SORT_MODE["DESC"] = "DESC";
})(SORT_MODE = exports.SORT_MODE || (exports.SORT_MODE = {}));
class ObmopManager {
    constructor(rc, client) {
        this.client = client;
        rc.isDebug() && rc.debug(rc.getName(this), 'Constructing new obmop manager.');
    }
    async init(rc) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Initializing ObmopManager.');
        await this.client.init(rc);
    }
    async close(rc) {
        await this.client.close(rc);
    }
    /**
     * 	Function to fetch all row(s) of given table as per condition.
     */
    async query(rc, entityType, query, limit = -1, offset = 0, range, sort) {
        const tableName = new entityType(rc).getTableName(), fields = obmop_registry_1.ObmopRegistryManager.getRegistry(tableName).getFields();
        rc.isDebug() && rc.debug(rc.getName(this), 'Fetching data.', tableName, query, limit, offset, range, sort);
        if (query)
            query.queryStr = this.convertQueryFieldNamesToMappings(rc, query.queryStr, fields);
        try {
            const records = await this.client.query(rc, tableName, fields.map((f) => f.mapping), query, limit, offset, range, sort);
            const entities = records.entities.map((record) => {
                const entity = new entityType(rc);
                for (const field of fields) {
                    if (field.dataType === NUMBER_TYPE) {
                        entity[field.name] = Number(record[field.mapping]);
                    }
                    else {
                        entity[field.name] = record[field.mapping];
                    }
                }
                return entity;
            });
            const result = {
                entities,
                totalCount: records.totalCount
            };
            return result;
        }
        catch (err) {
            const mErr = new core_1.Mubble.uError(obmop_util_1.DB_ERROR_CODE, `Error in querying ${tableName}.`);
            rc.isError() && rc.error(rc.getName(this), err, mErr);
            throw mErr;
        }
    }
    /**
     * 	Function to fetch all row(s) of a given native SQL query.
     */
    async sql(rc, entityType, query, binds) {
        const name = new entityType(rc).getTableName(), fields = obmop_registry_1.ObmopRegistryManager.getRegistry(name).getFields();
        rc.isDebug() && rc.debug(rc.getName(this), 'Fetching data.', query, binds);
        try {
            const rows = await this.client.sql(rc, query, binds);
            const entities = rows.map((row) => {
                const entity = new entityType(rc);
                for (const field of fields) {
                    if (field.dataType === NUMBER_TYPE) {
                        entity[field.name] = Number(row[field.mapping]);
                    }
                    else {
                        entity[field.name] = row[field.mapping];
                    }
                }
                return entity;
            });
            return entities;
        }
        catch (err) {
            const mErr = new core_1.Mubble.uError(obmop_util_1.DB_ERROR_CODE, `Error in executing query.`);
            rc.isError() && rc.error(rc.getName(this), err, mErr, query);
            throw mErr;
        }
    }
    /**
   *  Function to insert a row of an obmop entity.
   */
    async insert(rc, entity) {
        const tableName = entity.getTableName(), entityObj = {}, registry = obmop_registry_1.ObmopRegistryManager.getRegistry(tableName), fields = registry.getFields();
        for (const field of fields) {
            if (entity.hasOwnProperty(field.name))
                entityObj[field.mapping] = entity[field.name];
        }
        const failed = this.verifyEntityBeforeInserting(rc, tableName, entityObj);
        if (failed) {
            throw new core_1.Mubble.uError(obmop_util_1.DB_ERROR_CODE, failed);
        }
        rc.isDebug() && rc.debug(rc.getName(this), 'Inserting data.', tableName, entity, '=>', entityObj);
        try {
            const sequenceFields = registry.getSequenceFields();
            if (sequenceFields.length) {
                let sequences = {};
                sequenceFields.forEach(sequenceField => {
                    if (sequenceField.sequence)
                        sequences[sequenceField.name] = sequenceField.sequence;
                });
                await this.client.insert(rc, tableName, entityObj, sequences);
            }
            else {
                await this.client.insert(rc, tableName, entityObj);
            }
        }
        catch (err) {
            const mErr = new core_1.Mubble.uError(obmop_util_1.DB_ERROR_CODE, `Error in inserting ${entity} into ${tableName}.`);
            rc.isError() && rc.error(rc.getName(this), err, mErr);
            throw mErr;
        }
    }
    /**
     *	Function to insert multiple rows into a table at once
     */
    async mInsert(rc, entities) {
        const tableName = entities[0].getTableName(), entitiesArr = [], registry = obmop_registry_1.ObmopRegistryManager.getRegistry(tableName), fields = registry.getFields();
        for (const entity of entities) {
            const entityObj = {};
            for (const field of fields) {
                if (entity.hasOwnProperty(field.name))
                    entityObj[field.mapping] = entity[field.name];
            }
            entitiesArr.push(entityObj);
        }
        entitiesArr.forEach(entityObj => {
            const failed = this.verifyEntityBeforeInserting(rc, tableName, entityObj);
            if (failed) {
                throw new core_1.Mubble.uError(obmop_util_1.DB_ERROR_CODE, failed);
            }
        });
        rc.isDebug() && rc.debug(rc.getName(this), 'Inserting multiple rows', tableName, entities, '=>', entitiesArr);
        const sequenceFields = registry.getSequenceFields();
        let sequences = undefined;
        if (sequenceFields.length) {
            sequences = {};
            sequenceFields.forEach(sequenceField => {
                if (sequences && sequenceField.sequence)
                    sequences[sequenceField.name] = sequenceField.sequence;
            });
        }
        try {
            await this.client.mInsert(rc, tableName, entitiesArr, sequences);
        }
        catch (e) {
            const mErr = new core_1.Mubble.uError(obmop_util_1.DB_ERROR_CODE, `Error in inserting ${entities} into ${tableName}.`);
            rc.isError() && rc.error(rc.getName(this), e, mErr);
            throw mErr;
        }
    }
    /**
   *  Function to update a row of an obmop entity.
     *  The fields to be updated are given in the updates object with the respective new values.
     *  The function also updates the entity.
   */
    async update(rc, entity, updates) {
        const tableName = entity.getTableName(), failed = this.verifyEntityBeforeUpdating(rc, tableName, updates), fields = obmop_registry_1.ObmopRegistryManager.getRegistry(tableName).getFields();
        if (failed) {
            throw new core_1.Mubble.uError(obmop_util_1.DB_ERROR_CODE, failed);
        }
        const primaryKey = obmop_registry_1.ObmopRegistryManager.getRegistry(tableName).getPrimaryKey(), primaryKeyValue = entity[primaryKey.name];
        rc.isDebug() && rc.debug(rc.getName(this), 'Updating data.', tableName, entity, '=>', updates);
        try {
            const newUpdates = {};
            for (const field of fields) {
                if (updates.hasOwnProperty(field.name))
                    newUpdates[field.mapping] = updates[field.name];
            }
            await this.client.update(rc, tableName, newUpdates, primaryKey.mapping, primaryKeyValue);
        }
        catch (err) {
            const mErr = new core_1.Mubble.uError(obmop_util_1.DB_ERROR_CODE, `Error in updating ${entity} with ${updates} into ${tableName}.`);
            rc.isError() && rc.error(rc.getName(this), err, mErr);
            throw mErr;
        }
        Object.assign(entity, updates);
    }
    /**
   *  Function to delete a row of an obmop entity.
     * 	There are no updates to the entity object.
     *  Make sure not to operate on a deleted entity.
   */
    async delete(rc, entity) {
        const tableName = entity.getTableName(), primaryKey = obmop_registry_1.ObmopRegistryManager.getRegistry(tableName).getPrimaryKey(), primaryKeyValue = entity[primaryKey.name];
        rc.isDebug() && rc.debug(rc.getName(this), 'Deleting data.', tableName, entity);
        try {
            await this.client.delete(rc, tableName, primaryKey.mapping, primaryKeyValue);
        }
        catch (err) {
            const mErr = new core_1.Mubble.uError(obmop_util_1.DB_ERROR_CODE, `Error in deleting ${entity} from ${tableName}.`);
            rc.isError() && rc.error(rc.getName(this), err, mErr);
            throw mErr;
        }
    }
    /**
   *  Function to delete multiple rows of an obmop entity.
     * 	There are no updates to the entity object.
     *  Make sure not to operate on a deleted entity.
   */
    async mDelete(rc, entities) {
        const tableName = entities[0].getTableName(), primaryKey = obmop_registry_1.ObmopRegistryManager.getRegistry(tableName).getPrimaryKey(), primaryKeyValues = entities.map(entity => entity[primaryKey.name]);
        rc.isDebug() && rc.debug(rc.getName(this), 'Deleting data.', tableName, entities);
        try {
            await this.client.mDelete(rc, tableName, primaryKey.mapping, primaryKeyValues);
        }
        catch (err) {
            const mErr = new core_1.Mubble.uError(obmop_util_1.DB_ERROR_CODE, `Error in deleting ${entities} from ${tableName}.`);
            rc.isError() && rc.error(rc.getName(this), err, mErr);
            throw mErr;
        }
    }
    /*------------------------------------------------------------------------------
         PRIVATE METHODS
    ------------------------------------------------------------------------------*/
    // Verifies entity object before inserting. Returns false if successfully verified or the error message.
    verifyEntityBeforeInserting(rc, entity, entityObj) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Verifying entity before insertion.', entity, entityObj);
        const registry = obmop_registry_1.ObmopRegistryManager.getRegistry(entity);
        // verifying if primary key is present if not serialized and not a sequence
        const primaryKey = registry.getPrimaryKeyInfo();
        if (!primaryKey.serial && !primaryKey.sequence && !entityObj[primaryKey.mapping]) {
            return obmop_util_1.ObmopErrorMessage.PK_INSERT;
        }
        // verifying if not null fields are present
        const notNullFields = registry.getNotNullFields(), notNullVerify = notNullFields.every((field) => {
            if (field.serial || field.sequence)
                return true;
            return (entityObj[field.mapping] === undefined || entityObj[field.mapping] === null);
        });
        if (notNullVerify) {
            return obmop_util_1.ObmopErrorMessage.NOT_NULL_INSERT;
        }
        // verifying if serial fields are inserted manually
        const serialFields = registry.getSerializedFields(), serialVerify = serialFields.every((field) => {
            return !entityObj[field.mapping];
        });
        if (!serialVerify) {
            return obmop_util_1.ObmopErrorMessage.SERIAL_INSERT;
        }
        // verifying if sequence fields are inserted manually
        const sequenceFields = registry.getSequenceFields(), sequenceVerify = sequenceFields.every((sequenceField) => {
            return !entityObj[sequenceField.mapping];
        });
        if (!sequenceVerify) {
            return obmop_util_1.ObmopErrorMessage.SEQUENCE_INSERT;
        }
        // TODO : verify uniqueness
        return false;
    }
    // Verifies updates object before updating. Returns false if successfully verified or the error message.
    verifyEntityBeforeUpdating(rc, entity, updates) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Verifying updates before updating.', entity, updates);
        const registry = obmop_registry_1.ObmopRegistryManager.getRegistry(entity);
        // verifying if updates also contains the primary key
        const primaryKey = registry.getPrimaryKeyInfo();
        if (updates[primaryKey.name]) {
            return obmop_util_1.ObmopErrorMessage.PK_UPDATE;
        }
        // verifying if serial fields are updated manually
        const serialFields = registry.getSerializedFields(), serialVerify = serialFields.every((serialField) => {
            return !updates[serialField.name];
        });
        if (!serialVerify) {
            return obmop_util_1.ObmopErrorMessage.SERIAL_UPDATE;
        }
        // verifying if sequence fields are updated manually
        const sequenceFields = registry.getSequenceFields(), sequenceVerify = sequenceFields.every((sequenceField) => {
            return !updates[sequenceField.name];
        });
        if (!sequenceVerify) {
            return obmop_util_1.ObmopErrorMessage.SEQUENCE_UPDATE;
        }
        // TODO : verify uniqueness
        return false;
    }
    convertQueryFieldNamesToMappings(rc, query, fields) {
        rc.isDebug() && rc.debug(rc.getName(this), 'convertQueryFieldNamesToMappings original string', query);
        let queryWithMappings = query;
        for (const field of fields) {
            queryWithMappings = queryWithMappings.replace(new RegExp(`[\(](${field.name})`, 'g'), `(${field.mapping}`);
        }
        rc.isDebug() && rc.debug(rc.getName(this), 'convertQueryFieldNamesToMappings converted string', queryWithMappings);
        return queryWithMappings;
    }
}
exports.ObmopManager = ObmopManager;
//# sourceMappingURL=obmop-manager.js.map