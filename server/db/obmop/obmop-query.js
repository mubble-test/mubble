"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Wed Feb 04 2020
   Author     : Yatharth Patel
   
   Copyright (c) 2020 Obopay. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObmopQueryBuilder = void 0;
const lo = require("lodash");
var ObmopQueryBuilder;
(function (ObmopQueryBuilder) {
    /**
     * @param rc RunContext, used for logging.
     * @param key key or field name.
     * @param value Value of that field.
     * @param operator Conditional operator compatible with SQL databases. By default it is '='.
     * @param upper optional for case insensitive search. By default it is false.
     */
    function newCondition(rc, key, value, operator = '=', upper = false) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Creating new condition.', key, value, operator, upper);
        const binds = [], conds = [];
        let queryStr, c = 1;
        if (value instanceof Array) {
            for (const val of value) {
                conds.push(`:${c++}`);
                binds.push(val);
            }
            queryStr = upper ? `(UPPER(${key}) ${operator} (${conds.join(', ')}))`
                : `(${key} ${operator} (${conds.join(', ')}))`;
        }
        else if (value === undefined || value === null) {
            queryStr = upper ? `(UPPER(${key}) ${operator})`
                : `(${key} ${operator})`;
        }
        else {
            binds.push(value);
            queryStr = upper ? `(UPPER(${key}) ${operator} :${c++})`
                : `(${key} ${operator} :${c++})`;
        }
        rc.isDebug() && rc.debug(rc.getName(this), 'newCondition', queryStr, binds);
        return { queryStr, binds };
    }
    ObmopQueryBuilder.newCondition = newCondition;
    /**
     * @param rc RunContext, used for logging.
     * @param conditions array of ObmopQueryCondition.
     * @param separator separator to join conditions.
     */
    function joinConditions(rc, conditions, separator) {
        rc.isDebug() && rc.debug(rc.getName(this), 'joinConditons', conditions, separator);
        if (!conditions.length) {
            return { queryStr: '', binds: [] };
        }
        let count = 0;
        const queryStrings = lo.concat([], conditions.map(cond => cond.queryStr)), binds = lo.flattenDeep(lo.concat([], conditions.map(cond => cond.binds))), queryString = `(${queryStrings.join(` ${separator} `)})`;
        const queryStr = queryString.split(' ').map(char => {
            if (char.match(/:[0-9]+/) !== null) {
                count++;
                return char.replace(/:[0-9]+/, `:${count}`);
            }
            return char;
        }).join(' ');
        return { queryStr, binds };
    }
    ObmopQueryBuilder.joinConditions = joinConditions;
})(ObmopQueryBuilder = exports.ObmopQueryBuilder || (exports.ObmopQueryBuilder = {}));
//# sourceMappingURL=obmop-query.js.map