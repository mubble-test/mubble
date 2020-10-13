import { RunContextServer } from '../../rc-server';
import { BqFieldInfo } from './bigquery-registry';
declare type UnionKeyToValue<U extends string> = {
    [K in U]: K;
};
export declare type BqSeparator = 'AND' | 'OR';
export declare type BqOperator = '=' | '!=' | '<' | '>' | '<=' | '>=' | 'IN' | 'LIKE' | 'IS NULL' | 'NOT NULL' | 'BETWEEN' | 'NOT IN' | 'IS NOT NULL';
export declare type EXTRACT_PART = 'DAYOFWEEK' | 'DAY' | 'DAYOFYEAR' | 'WEEK' | 'ISOWEEK' | 'MONTH' | 'QUARTER' | 'YEAR' | 'ISOYEAR';
export declare const EXTRACT_PART: UnionKeyToValue<EXTRACT_PART>;
export declare type QUERY_FIELD_FUNCTION = 'TEMPLATE' | 'CONVERT_TO_DATETIME' | 'ROUND' | 'SUM' | 'DISTINCT' | 'COUNT' | 'EXTRACT' | 'CAST_STRING' | 'CAST_NUMERIC' | 'COUNTIF' | 'STRING_AGG' | 'DATE' | 'ARRAY_AGG' | 'ARRAY_AGG_OFFSET_0' | 'CONVERT_TO_DATE' | 'CONVERT_TO_DATE_MINUTE' | 'IFNULL' | 'ARR_AGG_OFF_0_ID_DESC';
export declare const QUERY_FIELD_FUNCTION: UnionKeyToValue<QUERY_FIELD_FUNCTION>;
export interface QueryField {
    name: string;
    functions?: (QUERY_FIELD_FUNCTION | string)[];
    extract?: EXTRACT_PART;
    as?: string;
}
export interface QueryVariable {
    name: string;
    type: 'STRING' | 'NUMERIC';
    value: any;
}
export interface TemplateField {
    template: string;
    fields: string[];
    as: string;
}
export interface DummyField {
    dummyValue: any;
    dummyName: string;
}
export interface NestedField {
    field: BqFieldInfo;
    functions: (QUERY_FIELD_FUNCTION | string)[];
    extract?: EXTRACT_PART;
    as?: string;
}
export interface OrderBy {
    field: string;
    type: 'DESC' | 'ASC';
}
export declare namespace BqQueryBuilder {
    /**
   * @param rc RunContext, used for logging.
   * @param key key or field name.
   * @param value Value(s) of that field.
   * @param operator Conditional operator compatible with Bigquery. By default it is '='.
   * @param upper optional for case insensitive search. By default it is false.
   */
    function newCondition(rc: RunContextServer, key: string, value?: any, operator?: BqOperator, stringVal?: boolean): string;
    /**
     * @param rc RunContext, used for logging.
     * @param conditions array of ObmopQueryCondition.
     * @param separator separator to join conditions.
     */
    function joinConditions(rc: RunContextServer, conditions: Array<string>, separator: BqSeparator): string;
    /**
     *
     * @param allowEmpty : If set to true, it allows rows with null / empty array fields
     */
    function query(rc: RunContextServer, projectId: string, table: string, fields: Array<string | QueryField | TemplateField | DummyField>, allowEmpty: boolean, condition?: string, orderBy?: OrderBy[], groupBy?: string[], limit?: number): string;
    /**
     * Field names are not checked in schema.
     * Does not support UNNEST
     */
    function nestedQuery(rc: RunContextServer, fields: Array<string | QueryField | TemplateField | DummyField>, query: string, condition?: string, orderBy?: OrderBy[], groupBy?: string[], limit?: number): string;
    function unionQuery(rc: RunContextServer, queries: string[], unionAll?: boolean): string;
    function addVariable(query: string, variable: QueryVariable): string;
}
export {};
