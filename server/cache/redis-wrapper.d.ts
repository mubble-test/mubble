import { RedisClient } from 'redis';
import { RunContextServer } from '../rc-server';
import { Mubble } from '@mubble/core';
export declare enum IndexType {
    Position = 0,
    Score = 1,
    Member = 2
}
export interface ZRangeGetOpt {
    key: string;
    idxType: IndexType;
    startIdx: string;
    endIdx: string;
    descending: boolean;
    withoutScore: boolean;
    offset: number;
    limit: number;
}
export interface ZResult {
    member: string;
    score: number;
}
export declare class RedisCmds {
    del(...args: string[]): Promise<number>;
    expire(key: string, seconds: number): Promise<void>;
    get(key: string): Promise<string>;
    set(key: string, value: any, ...options: string[]): Promise<string>;
    incr(...args: string[]): Promise<void>;
    watch(...args: string[]): Promise<string[]>;
    setex(key: string, seconds: number, value: any): Promise<string>;
    mget(...args: string[]): Promise<string[]>;
    mset(...args: string[]): Promise<string>;
    hdel(key: string, ...args: string[]): Promise<void>;
    hget(key: string, field: string): Promise<string>;
    hexists(key: string, field: string): Promise<number>;
    hgetall(key: string): Promise<{
        [key: string]: string;
    }>;
    hscan(key: string, ...args: string[]): Promise<[string, string[]]>;
    hmget(key: string, ...args: string[]): Promise<string[]>;
    hmset(key: string, ...args: string[]): Promise<void>;
    hset(key: string, field: string, value: string | number): Promise<number>;
    hsetnx(key: string, field: string, value: string | number): Promise<number>;
    hincrby(key: string, field: string, incr: number): Promise<number>;
    lrange(key: string, start: number, stop: number): Promise<string[]>;
    ltrim(key: string, start: number, stop: number): Promise<string[]>;
    pubsub(...channelsAndPattern: string[]): Promise<string[]>;
    pexpire(key: string, ms: number): Promise<void>;
    rpush(key: string, field: string): Promise<number>;
    sadd(key: string, option: string, ...scoreValuePairs: any[]): Promise<number>;
    sunion(key: string, ...keys: string[]): Promise<{
        [key: string]: string;
    }>;
    smembers(key: string): Promise<string[]>;
    zadd(key: string, option: string, ...scoreValuePairs: any[]): Promise<number>;
    zrem(key: string, ...keys: string[]): Promise<void>;
    zcount(key: string, start: string, end: string): Promise<number>;
    zlexcount(key: string, start: string, end: string): Promise<number>;
    zcard(key: string): Promise<number>;
    zrange(key: string, start: number, end: number, withscore?: string): Promise<string[]>;
    zrangebyscore(key: string, start: number, end: number, ...args: string[]): Promise<string[]>;
    zrevrangebyscore(key: string, start: string, end: string, ...args: string[]): Promise<string[]>;
    zremrangebyscore(key: string, start: string, end: string): Promise<void>;
    zrangebylex(key: string, start: string, end: string, ...args: string[]): Promise<string[]>;
    zrevrangebylex(key: string, start: string, end: string, ...args: string[]): Promise<string[]>;
    zremrangebylex(key: string, start: string, end: string): Promise<void>;
    exists(key: string, ...keys: string[]): Promise<boolean>;
    keys(pattern: string): Promise<string[]>;
}
export declare type RedisMulti = RedisCmds;
export declare class RedisWrapper {
    private name;
    private rc;
    redis: RedisClient;
    monitoring: boolean;
    info: Mubble.uObject<string>;
    static inited: boolean;
    constructor(name: string, rc: RunContextServer);
    static init(rc: RunContextServer): void;
    static connect(rc: RunContextServer, name: string, url: string, options?: {
        max_attempts?: number;
        connect_timeout?: number;
    }): Promise<RedisWrapper>;
    private _connect;
    getRedisVersion(): string;
    subscribe(events: string[], callback: (channel: string, message: string) => void): Promise<number>;
    _info(): Promise<void>;
    flushRedis(): Promise<any>;
    _execute(cmd: string, args?: any[]): Promise<any>;
    isMaster(): boolean;
    isSlave(): boolean;
    rwScan(pattern?: string, count?: number): Promise<Set<string>>;
    rwSscan(key: string, pattern?: string, count?: number): Promise<Set<string>>;
    rwHscan(key: string, pattern?: string, count?: number): Promise<Map<string, object>>;
    rwScanCb(params: any, cbFunc: (key: string, value: any) => void): Promise<void>;
    rwHscanCb(key: string, params: any, cbFunc: (key: string, value: any) => void): Promise<void>;
    rwZscan(key: string, pattern?: string, count?: number): Promise<Map<string, object>>;
    rwZrange(key: string, start: string | number, end: string | number, withscore: boolean): Promise<Array<any>>;
    rwZrevrange(key: string, start: string | number, end: string | number, withscore: boolean): Promise<Array<any>>;
    rwZrangebyscore(key: string, start: string | number, end: string | number, withscore: boolean, offset?: number, limit?: number): Promise<Array<any>>;
    rwZrevrangebyscore(key: string, start: string | number, end: string | number, withscore: boolean, offset?: number, limit?: number): Promise<Array<any>>;
    rwZrangebylex(key: string, start: string, end: string, offset?: number, limit?: number): Promise<Array<any>>;
    rwZrevrangebylex(key: string, start: string, end: string, offset?: number, limit?: number): Promise<Array<any>>;
    rwZremrangebyscore(key: string, start: string | number, end: string | number): Promise<Array<any>>;
    _scanCb(cmd: string, key: string, params: any, cbFunc: (key: string, value: any) => void): Promise<void>;
    _scan(cmd: string, key: string, cursor: number, pattern?: string, count?: number, out?: Set<string>): Promise<Set<string>>;
    _hscan(cmd: string, key: string, cursor: number, pattern?: string, count?: number, out?: Map<string, object>): Promise<Map<string, object>>;
    private execMulti;
    publish(channel: string, data: any): void;
    redisCommand(): RedisCmds;
    redisMulti(): RedisMulti;
    execRedisMulti(redisMulti: RedisMulti): Promise<any[]>;
    close(): Promise<void>;
}
