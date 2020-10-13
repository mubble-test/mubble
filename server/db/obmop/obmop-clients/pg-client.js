"use strict";
/*------------------------------------------------------------------------------
   About      : Postgres client to interact with postgres DB server
   
   Created on : Thu Jun 20 2019
   Author     : Vishal Sinha
   
   Copyright (c) 2019 Obopay Mobile Technologies Pvt Ltd. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresClient = void 0;
const obmop_util_1 = require("../obmop-util");
const core_1 = require("@mubble/core");
const pg = require("pg");
/*------------------------------------------------------------------------------
   Postgres Client
------------------------------------------------------------------------------*/
class PostgresClient {
    constructor(rc, config) {
        this.initialized = false;
        rc.isDebug() && rc.debug(rc.getName(this), 'Constructing new PostgresClient.');
        const pgConfig = config;
        pgConfig.statement_timeout = config.statementTimeout;
        this.pgConfig = pgConfig;
    }
    async init(rc) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Initializing PostgresClient.');
        this.clientPool = new pg.Pool(this.pgConfig);
        this.clientPool.on('error', (err) => {
            rc.isError() && rc.error(rc.getName(this), 'Some unexpected error occured in postgres client pool.', err);
            this.initialized = false;
        });
        this.initialized = true;
    }
    async close(rc) {
        if (!this.initialized)
            return;
        rc.isDebug() && rc.debug(rc.getName(this), 'Closing PostgresClient.');
        await this.clientPool.end();
        this.initialized = false;
    }
    async query(rc, table, fields, query, limit = -1, offset = 0, range, sort) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Fetching from table,', table);
        let c = query ? query.binds.length : 0;
        const fieldString = fields.join(', '), binds = query ? query.binds : [], addQuery = query ? range ? ` WHERE ${query.queryStr.replace(/:/g, '$')} AND`
            : ` WHERE ${query.queryStr.replace(/:/g, '$')}`
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
                + `) AS x OFFSET $${++c} ROWS FETCH NEXT $${++c} ROWS ONLY`;
            binds.push(`${offset}`);
            binds.push(`${limit}`);
        }
        const result = await this.bindsQuery(rc, queryString, binds);
        const retval = {
            entities: result.rows,
            totalCount: result.rows.length
        };
        if (limit !== -1 && retval.entities.length)
            retval.totalCount = retval.entities[0].totcount;
        return retval;
    }
    async sql(rc, query, binds) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Executing query.', query, binds);
        const result = await this.bindsQuery(rc, query, binds);
        return result.rows;
    }
    async insert(rc, table, entity, sequences) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Inserting into table, ' + table + '.', entity);
        const keys = Object.keys(entity), bindKeys = [], binds = [];
        let c = 1;
        for (const key of keys) {
            bindKeys.push(`$${c++}`);
            binds.push(entity[key]);
        }
        if (sequences) {
            const sequenceKeys = Object.keys(sequences), sequenceVals = Object.values(sequences);
            keys.push(...sequenceKeys);
            bindKeys.push(...sequenceVals.map(sequenceName => `NEXTVAL('${sequenceName}')`));
        }
        const queryString = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${bindKeys.join(', ')})`;
        await this.bindsQuery(rc, queryString, binds);
    }
    async mInsert(rc, table, entities, sequences) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Inserting multiple rows into table ' + table + '.' + entities);
        const binds = [], sequenceKeys = sequences ? Object.keys(sequences) : [], sequenceVals = sequences ? Object.values(sequences)
            .map(sequence => `NEXTVAL('${sequence}')`)
            : [], bindsValues = [], keys = Object.keys(entities[0]);
        let c = 0;
        entities.forEach(entity => {
            const bindValues = [];
            for (const key in entity) {
                if (entity.hasOwnProperty(key)) {
                    binds.push(entity[key]);
                    bindValues.push(`$${++c}`);
                }
            }
            sequenceVals.forEach(sequenceVal => bindValues.push(`${sequenceVal}`));
            bindsValues.push(`(${bindValues.join(', ')})`);
        });
        const queryString = `INSERT INTO ${table} (${[...keys, ...sequenceKeys].join(', ')})`
            + ` VALUES ${bindsValues.join(', ')}`;
        await this.bindsQuery(rc, queryString, binds);
    }
    async update(rc, table, updates, queryKey, queryValue, sequences) {
        rc.isDebug() && rc.debug(rc.getName(this), `Updating ${table} with updates :`, updates, `for ${queryKey} : ${queryValue}.`);
        const keys = Object.keys(updates), changes = [], binds = [];
        let c = 1;
        for (const key of keys) {
            changes.push(`${key} = $${c++}`);
            binds.push(updates[key]);
        }
        if (sequences) {
            for (const key in sequences) {
                if (sequences.hasOwnProperty(key)) {
                    changes.push(`${key} = NEXTVAL('${sequences[key]}')`);
                }
            }
        }
        const queryString = `UPDATE ${table} `
            + `SET ${changes.join(', ')} `
            + `WHERE ${queryKey} = $${c}`;
        binds.push(queryValue);
        await this.bindsQuery(rc, queryString, binds);
    }
    async delete(rc, table, queryKey, queryValue) {
        rc.isDebug() && rc.debug(rc.getName(this), `Deleting from ${table}, ${queryKey} : ${queryValue}.`);
        const queryString = `DELETE FROM ${table} WHERE ${queryKey} = $1`, binds = [];
        binds.push(queryValue);
        await this.bindsQuery(rc, queryString, binds);
    }
    async mDelete(rc, table, queryKey, queryValues) {
        rc.isDebug() && rc.debug(rc.getName(this), `Deleting from ${table}, ${queryKey} : ${queryValues}.`);
        const binds = [];
        let c = 0, bindKeys = [];
        for (const qValue of queryValues) {
            bindKeys.push(`$${++c}`);
            binds.push(qValue);
        }
        const queryString = `DELETE FROM ${table} WHERE ${queryKey} IN (${bindKeys.join(', ')})`;
        await this.bindsQuery(rc, queryString, binds);
    }
    /*------------------------------------------------------------------------------
         PRIVATE METHODS
    ------------------------------------------------------------------------------*/
    async bindsQuery(rc, queryString, binds) {
        rc.isDebug() && rc.debug(rc.getName(this), 'bindsQuery executing', queryString, binds);
        if (!this.initialized)
            await this.init(rc);
        const client = await this.clientPool.connect();
        try {
            const result = await new Promise((resolve, reject) => {
                client.query(queryString, binds, (err, result) => {
                    err ? reject(err)
                        : resolve(result);
                });
            });
            rc.isDebug() && rc.debug(rc.getName(this), 'bindsQuery executed', queryString, binds);
            return result;
        }
        catch (e) {
            rc.isError() && rc.error(rc.getName(this), 'Error in executing query.', queryString, binds, e);
            throw new core_1.Mubble.uError(obmop_util_1.DB_ERROR_CODE, e.message);
        }
        finally {
            client.release();
        }
    }
}
exports.PostgresClient = PostgresClient;
//# sourceMappingURL=pg-client.js.map