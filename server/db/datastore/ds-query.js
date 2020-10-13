"use strict";
/*------------------------------------------------------------------------------
   About      : query support for datastore
   
   Created on : Mon May 22 2017
   Author     : Akash Dathan
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.DSQuery = void 0;
const error_codes_1 = require("./error-codes");
const basedatastore_1 = require("./basedatastore");
class DSQuery {
    constructor(rc, datastore, kindName, model, namespace) {
        this.datastore = datastore;
        this.namespace = namespace || model.getNamespace(rc);
        this.model = model;
        this.kindName = kindName;
        this.indexed = model.getIndexedFields(rc).concat(basedatastore_1.BaseDatastore._indexedFields);
        this._query = this.datastore.createQuery(this.namespace, this.kindName);
    }
    async run(rc) {
        const traceId = rc.getName(this) + ':' + this.kindName, ack = rc.startTraceSpan(traceId);
        let res;
        try {
            res = await this.datastore.runQuery(this._query);
        }
        finally {
            rc.endTraceSpan(traceId, ack);
            return res;
        }
    }
    async runCursor(rc, pageCursor) {
        if (pageCursor) {
            this._query = this._query.start(pageCursor);
        }
        const res = await this.datastore.runQuery(this._query);
        return res;
    }
    async runCursorTillNoMoreResults(rc, filter) {
        let items = [], results = await this.runCursor(rc), constructor = this.model.constructor;
        while (results) {
            const msgs = results[0], info = results[1];
            let serializedMsges = msgs.map(msg => new constructor().deserialize(rc, msg));
            if (filter)
                serializedMsges = serializedMsges.filter(msg => filter(msg));
            items = items.concat(serializedMsges);
            results = null;
            if (info.moreResults !== basedatastore_1.BaseDatastore._datastore.NO_MORE_RESULTS)
                results = await this.runCursor(rc, info.endCursor);
        }
        return items;
    }
    filter(key, value, symbol) {
        if (this.indexed.indexOf(key) === -1)
            throw new Error(error_codes_1.ERROR_CODES.FIELD_NOT_INDEXED + ' Filter key:' + key);
        if (value === undefined)
            throw new Error(error_codes_1.ERROR_CODES.UNDEFINED_QUERY_FIELD + ' Filter key:' + key);
        if (!symbol)
            symbol = '=';
        this._query = this._query.filter(key, symbol, value);
        return this;
    }
    multiFilter(keyPairs) {
        for (const filter of keyPairs) {
            if (this.indexed.indexOf(filter.key) === -1)
                throw new Error(error_codes_1.ERROR_CODES.FIELD_NOT_INDEXED + ' Filter key:' + filter.key);
            if (filter.value === undefined)
                throw new Error(error_codes_1.ERROR_CODES.UNDEFINED_QUERY_FIELD + ' Filter key:' + filter.key);
            this._query = this._query.filter(filter.key, filter.symbol || '=', filter.value);
        }
        return this;
    }
    order(key, descending) {
        if (this.indexed.indexOf(key) === -1)
            throw new Error(error_codes_1.ERROR_CODES.FIELD_NOT_INDEXED + ' Order key:' + key);
        if (!descending)
            this._query = this._query.order(key);
        else
            this._query = this._query.order(key, { descending: true });
        return this;
    }
    multiOrder(keyPairs) {
        for (let filter of keyPairs) {
            if (this.indexed.indexOf(filter.key) === -1)
                throw new Error(error_codes_1.ERROR_CODES.FIELD_NOT_INDEXED + ' Order key:' + filter.key);
            if (!filter.descending)
                this._query = this._query.order(filter.key);
            else
                this._query = this._query.order(filter.key, { descending: true });
        }
        return this;
    }
    hasAncestor(key) {
        this._query = this._query.hasAncestor(key);
        return this;
    }
    limit(val) {
        this._query = this._query.limit(val);
        return this;
    }
    groupBy(val) {
        if (this.indexed.indexOf(val) == -1)
            throw new Error(error_codes_1.ERROR_CODES.FIELD_NOT_INDEXED + ' GroupBy key:' + val);
        this._query = this._query.groupBy(val);
        return this;
    }
    select(val) {
        this._query = this._query.select(val);
        return this;
    }
    async mQueryOr(rc, key, values) {
        const traceId = rc.getName(this) + ':' + 'mQueryOr', ack = rc.startTraceSpan(traceId), queries = [], models = [];
        try {
            for (const value of values) {
                const query = this.datastore.createQuery(this.namespace, this.kindName);
                query.filter(key, '=', value);
                queries.push(query);
            }
            const results = await Promise.all(queries.map(query => this.datastore.runQuery(query)));
            for (const result of results) {
                if (result && result[0] && result[0].length) {
                    const entities = result[0], len = entities.length;
                    for (let i = 0; i < len; i++) {
                        const model = new basedatastore_1.BaseDatastore();
                        model.deserialize(rc, entities.pop());
                        models.push(model);
                    }
                }
            }
            return models;
        }
        catch (err) {
            if (err.code)
                rc.isError() && rc.error(rc.getName(this), '[Error Code:' + err.code + '], Error Message:', err.message);
            else
                rc.isError() && rc.error(err);
            throw (new error_codes_1.DSError(error_codes_1.ERROR_CODES.GCP_ERROR, err.message));
        }
        finally {
            rc.endTraceSpan(traceId, ack);
        }
    }
}
exports.DSQuery = DSQuery;
//# sourceMappingURL=ds-query.js.map