import { RunContextServer } from '../../rc-server';
import { ObmopBaseEntity } from './obmop-base';
export declare type ObmopSeparator = 'AND' | 'OR';
export declare type ObmopOperator = '=' | '!=' | '<' | '>' | '<=' | '>=' | 'IN' | 'LIKE' | 'IS NULL' | 'IS NOT NULL';
export declare type ObmopQueryCondition<T extends ObmopBaseEntity> = {
    queryStr: string;
    binds: Array<any>;
};
export declare namespace ObmopQueryBuilder {
    /**
     * @param rc RunContext, used for logging.
     * @param key key or field name.
     * @param value Value of that field.
     * @param operator Conditional operator compatible with SQL databases. By default it is '='.
     * @param upper optional for case insensitive search. By default it is false.
     */
    function newCondition<T extends ObmopBaseEntity>(rc: RunContextServer, key: keyof T, value?: any, operator?: ObmopOperator, upper?: boolean): ObmopQueryCondition<T>;
    /**
     * @param rc RunContext, used for logging.
     * @param conditions array of ObmopQueryCondition.
     * @param separator separator to join conditions.
     */
    function joinConditions<T extends ObmopBaseEntity>(rc: RunContextServer, conditions: Array<ObmopQueryCondition<T>>, separator: ObmopSeparator): ObmopQueryCondition<T>;
}
