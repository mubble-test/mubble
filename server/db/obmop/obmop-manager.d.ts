import { ObmopBaseEntity, ObmopBaseClient } from './obmop-base';
import { ObmopQueryCondition } from './obmop-query';
import { RunContextServer } from '../../rc-server';
import { Mubble } from '@mubble/core';
export declare type ObmopQueryRetval<T> = {
    entities: Array<T>;
    totalCount: number;
};
export declare type ObmopRange<T> = {
    key: keyof T;
    low: any;
    high: any;
};
export declare enum SORT_MODE {
    ASC = "ASC",
    DESC = "DESC"
}
export declare type ObmopSort<T> = {
    key: keyof T;
    order: SORT_MODE;
};
export declare class ObmopManager {
    private client;
    constructor(rc: RunContextServer, client: ObmopBaseClient);
    init(rc: RunContextServer): Promise<void>;
    close(rc: RunContextServer): Promise<void>;
    /**
     * 	Function to fetch all row(s) of given table as per condition.
     */
    query<T extends ObmopBaseEntity>(rc: RunContextServer, entityType: new (rc: RunContextServer) => T, query?: ObmopQueryCondition<T>, limit?: number, offset?: number, range?: ObmopRange<T>, sort?: ObmopSort<T>): Promise<ObmopQueryRetval<T>>;
    /**
     * 	Function to fetch all row(s) of a given native SQL query.
     */
    sql<T extends ObmopBaseEntity>(rc: RunContextServer, entityType: new (rc: RunContextServer) => T, query: string, binds: Array<any>): Promise<Array<T>>;
    /**
   *  Function to insert a row of an obmop entity.
   */
    insert<T extends ObmopBaseEntity>(rc: RunContextServer, entity: T): Promise<void>;
    /**
     *	Function to insert multiple rows into a table at once
     */
    mInsert<T extends ObmopBaseEntity>(rc: RunContextServer, entities: T[]): Promise<void>;
    /**
   *  Function to update a row of an obmop entity.
     *  The fields to be updated are given in the updates object with the respective new values.
     *  The function also updates the entity.
   */
    update<T extends ObmopBaseEntity>(rc: RunContextServer, entity: T, updates: Mubble.uChildObject<T>): Promise<void>;
    /**
   *  Function to delete a row of an obmop entity.
     * 	There are no updates to the entity object.
     *  Make sure not to operate on a deleted entity.
   */
    delete<T extends ObmopBaseEntity>(rc: RunContextServer, entity: T): Promise<void>;
    /**
   *  Function to delete multiple rows of an obmop entity.
     * 	There are no updates to the entity object.
     *  Make sure not to operate on a deleted entity.
   */
    mDelete<T extends ObmopBaseEntity>(rc: RunContextServer, entities: T[]): Promise<void>;
    private verifyEntityBeforeInserting;
    private verifyEntityBeforeUpdating;
    private convertQueryFieldNamesToMappings;
}
