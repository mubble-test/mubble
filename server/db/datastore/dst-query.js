"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Fri Jun 16 2017
   Author     : Akash Dathan
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.DSTQuery = void 0;
const error_codes_1 = require("./error-codes");
class DSTQuery {
    constructor(rc, transaction, namespace, kindName) {
        this.transaction = transaction;
        this.namespace = namespace;
        this.kindName = kindName;
        this._tQuery = this.transaction.createQuery(namespace, kindName);
    }
    async run(rc) {
        const res = await this.transaction.runQuery(this._tQuery);
        return res;
    }
    async runCursor(rc, pageCursor) {
        if (pageCursor) {
            this._tQuery = this._tQuery.start(pageCursor);
        }
        const res = await this.transaction.runQuery(this._tQuery);
        return res;
    }
    filter(key, value, symbol) {
        if (value === undefined)
            throw (error_codes_1.ERROR_CODES.UNDEFINED_QUERY_FIELD, 'Filter key:', key);
        if (!symbol)
            symbol = '=';
        this._tQuery = this._tQuery.filter(key, symbol, value);
        return this;
    }
    multiFilter(keyPairs) {
        for (let filter of keyPairs) {
            if (filter.value === undefined)
                throw (error_codes_1.ERROR_CODES.UNDEFINED_QUERY_FIELD, 'Filter key:', filter.key);
            this._tQuery = this._tQuery.filter(filter.key, filter.symbol || '=', filter.value);
        }
        return this;
    }
    order(key, descending) {
        if (!descending)
            this._tQuery = this._tQuery.order(key);
        else
            this._tQuery = this._tQuery.order(key, { descending: true });
        return this;
    }
    multiOrder(keyPairs) {
        for (let filter of keyPairs) {
            if (!filter.descending)
                this._tQuery = this._tQuery.order(filter.key);
            else
                this._tQuery = this._tQuery.order(filter.key, { descending: true });
        }
        return this;
    }
    hasAncestor(key) {
        this._tQuery = this._tQuery.hasAncestor(key);
        return this;
    }
    limit(val) {
        this._tQuery = this._tQuery.limit(val);
        return this;
    }
    groupBy(val) {
        this._tQuery = this._tQuery.groupBy(val);
        return this;
    }
    select(val) {
        this._tQuery = this._tQuery.select(val);
        return this;
    }
}
exports.DSTQuery = DSTQuery;
//# sourceMappingURL=dst-query.js.map