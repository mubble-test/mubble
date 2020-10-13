"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Wed Feb 26 2020
   Author     : Siddharth Garg
   
   Copyright (c) 2020 Obopay. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BqQueryBuilder = exports.QUERY_FIELD_FUNCTION = exports.EXTRACT_PART = void 0;
const bigquery_registry_1 = require("./bigquery-registry");
exports.EXTRACT_PART = {
    DAYOFWEEK: 'DAYOFWEEK',
    DAY: 'DAY',
    DAYOFYEAR: 'DAYOFYEAR',
    WEEK: 'WEEK',
    ISOWEEK: 'ISOWEEK',
    MONTH: 'MONTH',
    QUARTER: 'QUARTER',
    YEAR: 'YEAR',
    ISOYEAR: 'ISOYEAR'
};
exports.QUERY_FIELD_FUNCTION = {
    COUNTIF: 'COUNTIF',
    TEMPLATE: 'TEMPLATE',
    CONVERT_TO_DATETIME: 'CONVERT_TO_DATETIME',
    CONVERT_TO_DATE: 'CONVERT_TO_DATE',
    CONVERT_TO_DATE_MINUTE: 'CONVERT_TO_DATE_MINUTE',
    ROUND: 'ROUND',
    SUM: 'SUM',
    DISTINCT: 'DISTINCT',
    COUNT: 'COUNT',
    EXTRACT: 'EXTRACT',
    CAST_STRING: 'CAST_STRING',
    CAST_NUMERIC: 'CAST_NUMERIC',
    STRING_AGG: 'STRING_AGG',
    ARRAY_AGG: 'ARRAY_AGG',
    ARRAY_AGG_OFFSET_0: 'ARRAY_AGG_OFFSET_0',
    DATE: 'DATE',
    IFNULL: 'IFNULL',
    ARR_AGG_OFF_0_ID_DESC: 'ARR_AGG_OFF_0_ID_DESC'
};
var BqQueryBuilder;
(function (BqQueryBuilder) {
    /**
   * @param rc RunContext, used for logging.
   * @param key key or field name.
   * @param value Value(s) of that field.
   * @param operator Conditional operator compatible with Bigquery. By default it is '='.
   * @param upper optional for case insensitive search. By default it is false.
   */
    function newCondition(rc, key, value, operator = '=', stringVal = true) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Creating new condition.', key, value, operator);
        let queryStr, conds = [];
        if (value instanceof Array) {
            for (const val of value) {
                conds.push(typeof val === 'string' ? `\'${val}\'` : `${val}`);
            }
            if (operator === 'BETWEEN') {
                queryStr = `(${key} ${operator} ${conds[0]} AND ${conds[1]})`;
            }
            else if (operator === 'NOT IN') {
                queryStr = `NOT ${key} IN (${conds.join(', ')})`;
            }
            else {
                queryStr = `(${key} ${operator} (${conds.join(', ')}))`;
            }
        }
        else if (value === undefined || value === null) {
            queryStr = `(${key} ${operator})`;
        }
        else {
            queryStr = `(${key} ${operator} (${typeof value === 'string' && stringVal ? `\'${value}\'` : value}))`;
        }
        rc.isDebug() && rc.debug(rc.getName(this), 'newCondition', queryStr);
        return queryStr;
    }
    BqQueryBuilder.newCondition = newCondition;
    /**
     * @param rc RunContext, used for logging.
     * @param conditions array of ObmopQueryCondition.
     * @param separator separator to join conditions.
     */
    function joinConditions(rc, conditions, separator) {
        rc.isDebug() && rc.debug(rc.getName(this), 'joinConditons', conditions, separator);
        if (conditions.length === 0)
            return '';
        const queryString = `(${conditions.join(` ${separator} \n `)})`;
        return queryString;
    }
    BqQueryBuilder.joinConditions = joinConditions;
    /**
     *
     * @param allowEmpty : If set to true, it allows rows with null / empty array fields
     */
    function query(rc, projectId, table, fields, allowEmpty, condition, orderBy, groupBy, limit) {
        const registry = bigquery_registry_1.BqRegistryManager.getRegistry(table), regFields = registry.getFields(), nestedFields = {};
        let select = 'SELECT \n';
        const from = `FROM \`${projectId}.${registry.getDataset()}.${registry.getTableName()}\` \n`;
        for (const fld of fields) {
            // Checking for TemplateField
            if (isOfTypeTemplateField(fld)) {
                for (let i = 0; i < fld.fields.length; i++) {
                    const tempField = fld.fields[i], regField = regFields.find((regField) => regField.name === tempField);
                    rc.isAssert() && rc.assert(rc.getName(this), regField, `Field ${tempField} does not exist on schema`);
                    let value;
                    if (regField.parent) {
                        if (!nestedFields[regField.parent])
                            nestedFields[regField.parent] = [];
                        value = `unnest_${regField.parent}.${tempField}`;
                    }
                    else {
                        value = tempField;
                    }
                    //fld.template = fld.template.replace(`%${i}%`, `${value}`)
                    fld.template = fld.template.split(`%${i}%`).join(`${value}`);
                }
                select += `${fld.template} as ${fld.as}, `;
            }
            else if (isOfTypeDummyField(fld)) {
                select += `${fld.dummyValue} as ${fld.dummyName}, `;
            }
            else {
                // Normalizing to QueryField
                let field;
                if (typeof fld === 'string') {
                    field = {
                        name: fld,
                        functions: []
                    };
                }
                else if (isOfTypeQueryField(fld)) {
                    field = fld;
                }
                const regField = regFields.find((regField) => regField.name === field.name);
                rc.isAssert() && rc.assert(rc.getName(this), regField, `Field ${field.name} does not exist on schema`);
                if (regField.parent) {
                    if (!nestedFields[regField.parent])
                        nestedFields[regField.parent] = [];
                    const nestedField = {
                        field: regField,
                        functions: field.functions || [],
                        as: field.as
                    };
                    let selectField = `unnest_${regField.parent}.${nestedField.field.name}`;
                    for (const func of nestedField.functions) {
                        selectField = BqQueryHelper.applyBqFunction(selectField, func);
                    }
                    const sel = nestedField.as || nestedField.field.name;
                    select += selectField !== sel ? `${selectField} as ${nestedField.as || nestedField.field.name}, `
                        : `${selectField}, `;
                    nestedFields[regField.parent].push(nestedField);
                }
                else {
                    let selectField = field.name;
                    if (field.functions) {
                        for (const func of field.functions) {
                            selectField = BqQueryHelper.applyBqFunction(selectField, func);
                        }
                    }
                    const sel = field.as || field.name;
                    select += selectField !== sel ? `${selectField} as ${field.as || field.name}, `
                        : `${selectField}, `;
                }
            }
        }
        // For record
        let unnest = '';
        for (const key in nestedFields) {
            unnest += allowEmpty ? `LEFT JOIN UNNEST (${key}) as unnest_${key} \n`
                : `, UNNEST (${key}) as unnest_${key} \n`;
            /* for (const nestedField of nestedFields[key]) {
      
              let selectField = `unnest_${key}.${nestedField.field.name}`
              for (const func of nestedField.functions) {
                selectField = BqQueryHelper.applyBqFunction(selectField, func)
              }
              const sel = nestedField.as || nestedField.field.name
              select += selectField !== sel ? `${selectField} as ${nestedField.as || nestedField.field.name}, `
                                            : `${selectField}, `
            } */
        }
        let retval = `${select} ${from} ${unnest}`;
        if (condition)
            retval += `WHERE ${condition} \n`;
        if (groupBy)
            retval += `GROUP BY ${groupBy} \n`;
        if (orderBy) {
            let str = '';
            for (let i = 0; i < orderBy.length; i++) {
                if (i > 0)
                    str += ', ';
                const val = orderBy[i];
                str += `${val.field} ${val.type} `;
            }
            retval += `ORDER BY ${str} \n`;
        }
        if (limit)
            retval += `LIMIT ${limit} \n`;
        return retval;
    }
    BqQueryBuilder.query = query;
    function isOfTypeQueryField(object) {
        return object.hasOwnProperty('name');
    }
    function isOfTypeTemplateField(object) {
        return object.hasOwnProperty('template');
    }
    function isOfTypeDummyField(object) {
        return object.hasOwnProperty('dummyName');
    }
    /**
     * Field names are not checked in schema.
     * Does not support UNNEST
     */
    function nestedQuery(rc, fields, query, condition, orderBy, groupBy, limit) {
        let select = 'SELECT \n';
        const from = `FROM ( ${query} ) \n`;
        if (fields.length == 0) {
            select += '* ';
        }
        else {
            for (const fld of fields) {
                // Checking for TemplateField
                if (isOfTypeTemplateField(fld)) {
                    for (let i = 0; i < fld.fields.length; i++) {
                        fld.template = fld.template.split(`%${i}%`).join(`${fld.fields[i]}`);
                    }
                    select += `${fld.template} as ${fld.as}, `;
                }
                else if (isOfTypeDummyField(fld)) {
                    select += `${fld.dummyValue} as ${fld.dummyName}, `;
                }
                else {
                    // Normalizing to QueryField
                    let field;
                    if (typeof fld !== 'string') {
                        field = fld;
                    }
                    else {
                        field = {
                            name: fld,
                            functions: []
                        };
                    }
                    let selectField = field.name;
                    if (field.functions) {
                        for (const func of field.functions) {
                            selectField = BqQueryHelper.applyBqFunction(selectField, func);
                        }
                    }
                    const sel = field.as || field.name;
                    select += selectField !== sel ? `${selectField} as ${sel}, `
                        : `${selectField}, `;
                }
            }
        }
        let retval = `${select} ${from} `;
        if (condition)
            retval += `WHERE ${condition} \n`;
        if (groupBy)
            retval += `GROUP BY ${groupBy} \n`;
        if (orderBy) {
            let str = '';
            for (let i = 0; i < orderBy.length; i++) {
                if (i > 0)
                    str += ', ';
                const val = orderBy[i];
                str += `${val.field} ${val.type} `;
            }
            retval += `ORDER BY ${str} \n`;
        }
        if (limit)
            retval += `LIMIT ${limit} \n`;
        return retval;
    }
    BqQueryBuilder.nestedQuery = nestedQuery;
    function unionQuery(rc, queries, unionAll = true) {
        if (!queries.length) {
            return '';
        }
        let retval = '';
        queries.forEach((query, index) => {
            retval = retval + (query + ((index != queries.length - 1) ? (unionAll ? ` UNION ALL ` : ` UNION `) : ''));
        });
        return retval;
    }
    BqQueryBuilder.unionQuery = unionQuery;
    function addVariable(query, variable) {
        const str = `DECLARE ${variable.name} ${variable.type} DEFAULT ${variable.type === 'STRING' ? `\'${variable.value}\'` : variable.value};`;
        return `${str} \n ${query}`;
    }
    BqQueryBuilder.addVariable = addVariable;
    class BqQueryHelper {
        static applyBqFunction(field, func, ignoreNull = true) {
            switch (func) {
                case exports.QUERY_FIELD_FUNCTION.CONVERT_TO_DATETIME:
                    return `FORMAT_DATETIME("%d/%m/%Y %H:%M:%S", DATETIME(${field}, "Asia/Kolkata"))`;
                case exports.QUERY_FIELD_FUNCTION.CONVERT_TO_DATE:
                    return `FORMAT_DATETIME("%d/%m/%Y", DATETIME(${field}, "Asia/Kolkata"))`;
                case exports.QUERY_FIELD_FUNCTION.CONVERT_TO_DATE_MINUTE:
                    return `FORMAT_DATETIME("%d/%m/%Y %H:%M", DATETIME(${field}, "Asia/Kolkata"))`;
                case exports.QUERY_FIELD_FUNCTION.CAST_STRING:
                    return `CAST((${field}) AS STRING)`;
                case exports.QUERY_FIELD_FUNCTION.CAST_NUMERIC:
                    return `CAST((${field}) AS NUMERIC)`;
                case exports.QUERY_FIELD_FUNCTION.ROUND:
                    return `ROUND (${field}, 2)`;
                case exports.QUERY_FIELD_FUNCTION.STRING_AGG:
                    return `STRING_AGG(CAST(${field} AS STRING), ',')`;
                case exports.QUERY_FIELD_FUNCTION.ARRAY_AGG:
                    return `ARRAY_AGG(${field} ${ignoreNull ? 'IGNORE NULLS' : ''})`;
                case exports.QUERY_FIELD_FUNCTION.ARRAY_AGG_OFFSET_0:
                    return `ARRAY_AGG(${field} ${ignoreNull ? 'IGNORE NULLS' : ''})[OFFSET(0)]`;
                case exports.QUERY_FIELD_FUNCTION.ARR_AGG_OFF_0_ID_DESC:
                    return `ARRAY_AGG(${field} ${ignoreNull ? 'IGNORE NULLS ORDER by insert_id desc ' : ''})[OFFSET(0)]`;
                case exports.QUERY_FIELD_FUNCTION.IFNULL:
                    return `IFNULL (${field}, 0)`;
                default:
                    return `${func}(${field})`;
            }
        }
    }
})(BqQueryBuilder = exports.BqQueryBuilder || (exports.BqQueryBuilder = {}));
//# sourceMappingURL=bq-query.js.map