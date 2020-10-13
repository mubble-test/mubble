/// <reference types="node" />
import { ObmopBaseClient, QueryRetval, QueryCondition, QueryRange, QuerySort } from '../obmop-base';
import { RunContextServer } from '../../../rc-server';
import { Mubble } from '@mubble/core';
import * as stream from 'stream';
export declare type PostgresConfig = {
    user: string;
    database: string;
    password: string;
    port: number;
    host: string;
    connectionString?: string;
    keepAlive?: boolean;
    stream?: stream.Duplex;
    statementTimeout?: false | number;
    ssl?: boolean;
};
export declare class PostgresClient implements ObmopBaseClient {
    private clientPool;
    private initialized;
    private pgConfig;
    constructor(rc: RunContextServer, config: PostgresConfig);
    init(rc: RunContextServer): Promise<void>;
    close(rc: RunContextServer): Promise<void>;
    query(rc: RunContextServer, table: string, fields: Array<string>, query?: QueryCondition, limit?: number, offset?: number, range?: QueryRange, sort?: QuerySort): Promise<QueryRetval>;
    sql(rc: RunContextServer, query: string, binds: Array<any>): Promise<Array<Mubble.uObject<any>>>;
    insert(rc: RunContextServer, table: string, entity: Mubble.uObject<any>, sequences?: Mubble.uObject<string>): Promise<void>;
    mInsert(rc: RunContextServer, table: string, entities: Mubble.uObject<any>[], sequences?: Mubble.uObject<string>): Promise<void>;
    update(rc: RunContextServer, table: string, updates: Mubble.uObject<any>, queryKey: string, queryValue: any, sequences?: Mubble.uObject<string>): Promise<void>;
    delete(rc: RunContextServer, table: string, queryKey: string, queryValue: any): Promise<void>;
    mDelete(rc: RunContextServer, table: string, queryKey: string, queryValues: Array<any>): Promise<void>;
    private bindsQuery;
}
