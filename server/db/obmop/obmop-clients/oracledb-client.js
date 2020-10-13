"use strict";
/*------------------------------------------------------------------------------
   About      : Oracle DB client to interact with oracle DB server
   
   Created on : Thu Jun 20 2019
   Author     : Vishal Sinha
   
   Copyright (c) 2019 Obopay Mobile Technologies Pvt Ltd. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.OracleDbClient = void 0;
const obmop_util_1 = require("../obmop-util");
const core_1 = require("@mubble/core");
const oracledb = require("oracledb");
/*------------------------------------------------------------------------------
   OracleDb Client
------------------------------------------------------------------------------*/
class OracleDbClient {
    constructor(rc, config) {
        this.initialized = false;
        rc.isDebug() && rc.debug(rc.getName(this), 'Constructing new OracleDbClient.');
        this.poolConfig = config;
    }
    async init(rc) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Initializing OracleDbClient.');
        this.clientPool = await new Promise((resolve, reject) => {
            oracledb.createPool(this.poolConfig, (err, pool) => {
                if (err)
                    reject(err);
                resolve(pool);
            });
        });
        this.initialized = true;
    }
    async close(rc) {
        if (!this.initialized)
            return;
        rc.isDebug() && rc.debug(rc.getName(this), 'Closing OracleDbClient.');
        await this.clientPool.close();
        this.initialized = false;
    }
    async query(rc, table, fields, query, limit = -1, offset = 0, range, sort) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Fetching from table,', table);
        let c = query ? query.binds.length : 0;
        const fieldString = fields.join(', '), binds = query ? query.binds : [], addQuery = query && query.queryStr ? range ? ` WHERE ${query.queryStr} AND`
            : ` WHERE ${query.queryStr}`
            : range ? ' WHERE'
                : '', addRange = range ? ` ${range.key} BETWEEN ${range.low} AND ${range.high}`
            : '', addSort = sort ? ` ORDER BY ${sort.key} ${sort.order}`
            : '';
        let queryString = `SELECT ${fieldString} FROM ${table}` + addQuery + addRange + addSort;
        if (limit !== -1) {
            queryString = `SELECT ${fieldString}, totcount FROM (`
                + `SELECT COUNT(*) OVER() AS TOTCOUNT, T1.* FROM ${table} T1`
                + addQuery
                + addRange
                + addSort
                + `) OFFSET :${++c} ROWS FETCH NEXT :${++c} ROWS ONLY`;
            binds.push(`${offset}`);
            binds.push(`${limit}`);
        }
        const entities = this.convertResultArray(await this.bindsQuery(rc, queryString, binds));
        const result = {
            entities,
            totalCount: entities.length
        };
        if (limit !== -1 && entities.length)
            result.totalCount = entities[0].totcount;
        return result;
    }
    async sql(rc, query, binds) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Executing query.', query, binds);
        const entities = this.convertResultArray(await this.bindsQuery(rc, query, binds));
        return entities;
    }
    async insert(rc, table, entity, sequences) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Inserting into table, ' + table + '.', entity);
        const keys = Object.keys(entity), values = [];
        for (const key of keys) {
            values.push(`:${key}`);
        }
        if (sequences) {
            const sequenceKeys = Object.keys(sequences), sequenceVals = Object.values(sequences);
            keys.push(...sequenceKeys);
            values.push(...sequenceVals.map(sequenceName => `${sequenceName}.NEXTVAL`));
        }
        const queryString = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${values.join(', ')})`;
        await this.bindsQuery(rc, queryString, entity);
    }
    async mInsert(rc, table, entities, sequences) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Inserting multiple rows into table, ' + table + '.' + entities);
        const binds = [], keys = Object.keys(entities[0]), bindsKeys = keys.map(key => `:${key}`);
        if (sequences) {
            const sequenceKeys = Object.keys(sequences), sequenceVals = Object.values(sequences);
            keys.push(...sequenceKeys);
            bindsKeys.push(...sequenceVals.map(sequenceName => `${sequenceName}.NEXTVAL`));
        }
        for (const entity of entities) {
            const bind = {};
            for (const key in entity) {
                if (entity.hasOwnProperty(key)) {
                    bind[key] = entity[key];
                }
            }
            binds.push(bind);
        }
        const queryString = `INSERT INTO ${table} (${keys.join(', ')})`
            + ` values (${bindsKeys.join(', ')})`;
        await this.bindsQuery(rc, queryString, binds, true);
    }
    async update(rc, table, updates, queryKey, queryValue, sequences) {
        rc.isDebug() && rc.debug(rc.getName(this), `Updating ${table} with updates : ${updates} for ${queryKey} : ${queryValue}.`);
        const updateKeys = Object.keys(updates), changes = [], binds = [];
        let c = 1;
        for (const key of updateKeys) {
            changes.push(`${key} = :${c++}`);
            binds.push(updates[key]);
        }
        if (sequences) {
            for (const key in sequences) {
                if (sequences.hasOwnProperty(key)) {
                    changes.push(`${key} = ${sequences[key]}.NEXTVAL`);
                }
            }
        }
        const queryString = `UPDATE ${table} `
            + `SET ${changes.join(', ')} `
            + `WHERE ${queryKey} = :${c}`;
        binds.push(queryValue);
        await this.bindsQuery(rc, queryString, binds);
    }
    async delete(rc, table, queryKey, queryValue) {
        rc.isDebug() && rc.debug(rc.getName(this), `Deleting from ${table}, ${queryKey} : ${queryValue}.`);
        const queryString = `DELETE FROM ${table} WHERE ${queryKey} = :1`, binds = [];
        binds.push(queryValue);
        await this.bindsQuery(rc, queryString, binds);
    }
    async mDelete(rc, table, queryKey, queryValues) {
        rc.isDebug() && rc.debug(rc.getName(this), `Deleting from ${table}, ${queryKey} : ${queryValues}.`);
        const binds = [];
        let c = 0, bindKeys = [];
        for (const qValue of queryValues) {
            bindKeys.push(`:${++c}`);
            binds.push(qValue);
        }
        const queryString = `DELETE FROM ${table} WHERE ${queryKey} IN (${bindKeys.join(', ')})`;
        await this.bindsQuery(rc, queryString, binds);
    }
    /*------------------------------------------------------------------------------
         PRIVATE METHODS
    ------------------------------------------------------------------------------*/
    async bindsQuery(rc, queryString, binds, multiple) {
        rc.isDebug() && rc.debug(rc.getName(this), 'bindQuery', queryString, binds);
        if (!this.initialized)
            await this.init(rc);
        const connection = await this.clientPool.getConnection(), options = { autoCommit: true };
        try {
            const result = await new Promise((resolve, reject) => {
                if (multiple) {
                    connection.executeMany(queryString, binds, options, (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(result);
                    });
                }
                else {
                    connection.execute(queryString, binds, options, (err, result) => {
                        if (err)
                            return reject(err);
                        return resolve(result);
                    });
                }
            });
            return result;
        }
        catch (e) {
            rc.isError() && rc.error(rc.getName(this), 'Error in executing query.', e, queryString);
            throw new core_1.Mubble.uError(obmop_util_1.DB_ERROR_CODE, e.message);
        }
        finally {
            await connection.close();
        }
    }
    convertResultArray(result) {
        const metadata = result.metaData || [], rows = result.rows || [], finArr = [];
        for (const row of rows) {
            const elem = {};
            for (const index in metadata) {
                elem[metadata[index].name.toLowerCase()] = row[index];
            }
            finArr.push(elem);
        }
        return finArr;
    }
}
exports.OracleDbClient = OracleDbClient;
//# sourceMappingURL=oracledb-client.js.map