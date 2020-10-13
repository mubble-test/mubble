"use strict";
/*------------------------------------------------------------------------------
   About      : Redis Instance wrapper
   
   Created on : Wed May 24 2017
   Author     : Gaurav Kulshreshtha
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisWrapper = exports.RedisCmds = exports.IndexType = void 0;
const redis_1 = require("redis");
const ma_util_1 = require("../master/ma-util");
function redisLog(rc, ...args) {
    if (rc) {
        rc && rc.isStatus() && rc.status(LOG_ID, ...args);
    }
    else {
        ma_util_1.log(LOG_ID, ...args);
    }
}
const LOG_ID = 'RedisWrapper';
var IndexType;
(function (IndexType) {
    // startIdx, endIdx are position in set. Full Range 0 to -1
    // Ascending uses (ZRange) 0=>First 1=>Second -1=>last. 
    // Desc (ZREVRANGE)
    // limit is not valid in this case as indexes can be used to control the count
    IndexType[IndexType["Position"] = 0] = "Position";
    // startIdx, endIdx are scores in set. Full Range -inf to +inf
    // index: (1 : excluding 1
    // ZRANGEBYSCORE, ZREVRANGEBYSCORE
    IndexType[IndexType["Score"] = 1] = "Score";
    // Lexographical order of member, only works when all items are inserted with same score
    // startIdx, endIdx are scores in set. Full Range - +
    // index: (1 : excluding 1, [1 : including 1, 1 : invalid
    // ZRANGEBYLEX, ZREVRANGEBYLEX
    IndexType[IndexType["Member"] = 2] = "Member";
})(IndexType = exports.IndexType || (exports.IndexType = {}));
class RedisCmds {
    del(...args) { return true; }
    expire(key, seconds) { return true; }
    get(key) { return true; }
    set(key, value, ...options) { return true; }
    incr(...args) { return true; }
    watch(...args) { return true; }
    setex(key, seconds, value) { return true; }
    mget(...args) { return true; }
    mset(...args) { return true; }
    hdel(key, ...args) { return true; }
    hget(key, field) { return true; }
    hexists(key, field) { return true; }
    hgetall(key) { return true; }
    hscan(key, ...args) { return true; }
    hmget(key, ...args) { return true; }
    hmset(key, ...args) { return true; }
    hset(key, field, value) { return true; }
    hsetnx(key, field, value) { return true; }
    hincrby(key, field, incr) { return true; }
    lrange(key, start, stop) { return true; }
    ltrim(key, start, stop) { return true; }
    pubsub(...channelsAndPattern) { return true; }
    pexpire(key, ms) { return true; }
    rpush(key, field) { return true; }
    // set apis
    sadd(key, option, ...scoreValuePairs) { return true; }
    sunion(key, ...keys) { return true; }
    smembers(key) { return true; }
    // z sorted set apis 
    zadd(key, option, ...scoreValuePairs) { return true; }
    zrem(key, ...keys) { return true; }
    zcount(key, start, end) { return true; }
    zlexcount(key, start, end) { return true; }
    zcard(key) { return true; }
    zrange(key, start, end, withscore) { return true; }
    zrangebyscore(key, start, end, ...args) { return true; }
    zrevrangebyscore(key, start, end, ...args) { return true; }
    zremrangebyscore(key, start, end) { return true; }
    zrangebylex(key, start, end, ...args) { return true; }
    zrevrangebylex(key, start, end, ...args) { return true; }
    zremrangebylex(key, start, end) { return true; }
    exists(key, ...keys) { return true; }
    keys(pattern) { return true; }
}
exports.RedisCmds = RedisCmds;
function add(name) {
    name = name.toLowerCase();
    const rw = RedisWrapper.prototype;
    rw[name] = function (...params) {
        const _ = this;
        return _._execute(name, params);
    };
    const rdMulti = RedisMultiWrapper.prototype;
    rdMulti[name] = function (...params) {
        const _ = this;
        _.buff.push({ cmdName: name, params: params });
        return _.multi[name](params);
    };
    return add;
}
class RedisWrapper {
    constructor(name, rc) {
        this.name = name;
        this.rc = rc;
        this.monitoring = false;
        this.info = {};
    }
    // Unfortunately there is no static initializer like java in ts/js
    static init(rc) {
        if (RedisWrapper.inited)
            return;
        // ???? Raghu test
        // (RedisClient as any).addCommand('xadd') // needed as stream support in not there in node_redis 2.8
        const cmds = Object.getOwnPropertyNames(RedisCmds.prototype).filter((cmd) => {
            return (cmd !== 'constructor') && typeof (RedisCmds.prototype[cmd]) === 'function';
        });
        for (const cmd of cmds) {
            // we can find all the function (name) of RedisClient from reflection . check signature type
            add(cmd);
        }
        RedisWrapper.inited = true;
    }
    static async connect(rc, name, url, options) {
        const redisWrapper = new RedisWrapper(name, rc);
        await redisWrapper._connect(rc, url, options);
        return redisWrapper;
    }
    async _connect(rc, url, options) {
        await new Promise((resolve, reject) => {
            this.redis = redis_1.createClient(url, options);
            this.redis.on("connect", () => {
                redisLog(this.rc, this.name, 'connected to redis', url);
                resolve();
            });
            this.redis.on("error", (error) => {
                redisLog(this.rc, this.name, 'some error occurred', url, error);
                reject(error);
            });
        });
        await this._info();
        // rc.isAssert() && rc.assert(rc.getName(this), this.getRedisVersion().startsWith('5'), 
        //   'Please upgrade redis. Min version need 5.x')
    }
    getRedisVersion() {
        return this.info['redis_version'];
    }
    async subscribe(events, callback) {
        return new Promise((resolve, reject) => {
            this.redis.on('subscribe', (channel, count) => {
                redisLog(this.rc, this.name, ' subscribed to channel ', channel, count);
                // resolve when ? all events are subscribed
                resolve(count);
            });
            this.redis.on('message', (channel, message) => {
                callback(channel, message);
            });
            redisLog(this.rc, 'redis ', this.name, 'subscribing to channels ', events);
            this.redis.subscribe(events);
        });
    }
    async _info() {
        const _ = this, info = await this._execute('info'), ar = info.split('\n');
        ar.forEach(function (str) {
            const strParts = str.split(':');
            if (strParts.length !== 2)
                return;
            _.info[strParts[0]] = strParts[1].trim();
        });
    }
    async flushRedis() {
        return this._execute('flushall', []);
    }
    async _execute(cmd, args) {
        const redisw = this.redis;
        if (!redisw[cmd] || typeof redisw[cmd] !== 'function')
            throw Error('redis command ' + cmd + ' invalid');
        return new Promise((resolve, reject) => {
            redisw[cmd](args, (err, res) => {
                if (err) {
                    if (this.monitoring)
                        redisLog(this.rc, this.name, cmd, args, 'failed ', err);
                    reject(err);
                }
                if (this.monitoring)
                    redisLog(this.rc, this.name, cmd, args, 'success ', res);
                resolve(res);
            });
        });
    }
    isMaster() {
        return this.info['role'] === 'master';
    }
    isSlave() {
        return this.info['role'] === 'slave';
    }
    async rwScan(pattern, count) {
        return this._scan('scan', '', 0, pattern, count);
    }
    async rwSscan(key, pattern, count) {
        return this._scan('sscan', key, 0, pattern, count);
    }
    async rwHscan(key, pattern, count) {
        return this._hscan('hscan', key, 0, pattern, count);
    }
    async rwScanCb(params, cbFunc) {
        return this._scanCb('scan', '', params, cbFunc);
    }
    async rwHscanCb(key, params, cbFunc) {
        return this._scanCb('hscan', key, params, cbFunc);
    }
    async rwZscan(key, pattern, count) {
        return this._hscan('zscan', key, 0, pattern, count);
    }
    async rwZrange(key, start, end, withscore) {
        let redis_cmd = [key, start, end];
        if (withscore)
            redis_cmd.push('WITHSCORES');
        return this._execute('zrange', redis_cmd);
    }
    async rwZrevrange(key, start, end, withscore) {
        let redis_cmd = [key, start, end];
        if (withscore)
            redis_cmd.push('WITHSCORES');
        return this._execute('zrevrange', redis_cmd);
    }
    async rwZrangebyscore(key, start, end, withscore, offset, limit) {
        let redis_cmd = [key, start, end];
        if (withscore)
            redis_cmd.push('WITHSCORES');
        if (limit)
            redis_cmd = redis_cmd.concat(['LIMIT', offset, limit]);
        return this._execute('zrangebyscore', redis_cmd);
    }
    async rwZrevrangebyscore(key, start, end, withscore, offset, limit) {
        let redis_cmd = [key, start, end];
        if (withscore)
            redis_cmd.push('WITHSCORES');
        if (limit)
            redis_cmd = redis_cmd.concat(['LIMIT', offset, limit]);
        return this._execute('zrevrangebyscore', redis_cmd);
    }
    async rwZrangebylex(key, start, end, offset, limit) {
        let redis_cmd = [key, start, end];
        if (limit)
            redis_cmd = redis_cmd.concat(['LIMIT', offset, limit]);
        return this._execute('zrangebylex', redis_cmd);
    }
    async rwZrevrangebylex(key, start, end, offset, limit) {
        let redis_cmd = [key, start, end];
        if (limit)
            redis_cmd = redis_cmd.concat(['LIMIT', offset, limit]);
        return this._execute('zrevrangebylex', redis_cmd);
    }
    async rwZremrangebyscore(key, start, end) {
        let redis_cmd = [key, start, end];
        return this._execute('zremrangebyscore', redis_cmd);
    }
    async _scanCb(cmd, key, params, cbFunc) {
        let cursor = 0;
        const args = (cmd.toLowerCase() === 'scan') ? [cursor] : [key, cursor];
        const cursorIdx = (cmd.toLowerCase() === 'scan') ? 0 : 1;
        if (params.pattern)
            args.push('MATCH', params.pattern);
        if (params.count)
            args.push('COUNT', params.count);
        do {
            const res = await this._execute(cmd, args);
            cursor = Number(res[0]);
            if (cmd.toLowerCase() === 'scan') {
                const scanres = await this.redisCommand().mget(...res[1]);
                for (let idx in scanres)
                    cbFunc(idx, JSON.parse(scanres[idx]));
            }
            else if (cmd.toLowerCase() === 'sscan') {
                for (let idx in res[1])
                    cbFunc(idx, JSON.parse(res[1][idx]));
            }
            else {
                const resMapArr = res[1];
                for (let i = 0; i < resMapArr.length; i = i + 2)
                    cbFunc(resMapArr[i], JSON.parse(resMapArr[i + 1]));
            }
            args[cursorIdx] = cursor; // Update cursor in the command...
        } while (cursor);
    }
    async _scan(cmd, key, cursor, pattern, count, out) {
        const args = cmd === 'scan' ? [cursor] : [key, cursor];
        if (pattern)
            args.push('MATCH', pattern);
        if (count)
            args.push('COUNT', count);
        const res = await this._execute(cmd, args);
        cursor = Number(res[0]);
        if (!out)
            out = new Set();
        for (const mem of res[1])
            out.add(mem);
        if (cursor === 0)
            return out;
        return this._scan(cmd, key, cursor, pattern, count, out);
    }
    async _hscan(cmd, key, cursor, pattern, count, out) {
        const args = [key, cursor];
        if (pattern)
            args.push('MATCH', pattern);
        if (count)
            args.push('COUNT', count);
        const res = await this._execute(cmd, args);
        cursor = Number(res[0]);
        if (!out)
            out = new Map();
        const resMapArr = res[1];
        for (let i = 0; i < resMapArr.length; i = i + 2) {
            out.set(resMapArr[i], JSON.parse(resMapArr[i + 1]));
        }
        if (cursor === 0)
            return out;
        return this._hscan(cmd, key, cursor, pattern, count, out);
    }
    async execMulti(batchOrMulti) {
        const _ = this;
        return new Promise(function (resolve, reject) {
            batchOrMulti.exec(function (err, results) {
                if (_.monitoring)
                    redisLog(this.rc, 'multi/batch', { err }, 'results', results);
                if (err)
                    return reject(err);
                resolve(results);
            });
        });
    }
    // This is not an async api
    publish(channel, data) {
        this.redis.publish(channel, data);
    }
    redisCommand() {
        return this;
    }
    redisMulti() {
        return new RedisMultiWrapper(this);
    }
    async execRedisMulti(redisMulti) {
        this.rc.isAssert() && this.rc.assert(this.rc.getName(this), redisMulti instanceof RedisMultiWrapper, 'execRedisMulti can only exec redisMulti cmds');
        return this.execMulti(redisMulti.multi);
    }
    async close() {
        await this.redis.quit();
        redisLog(this.rc, 'closed redis connection ', this.name);
    }
}
exports.RedisWrapper = RedisWrapper;
RedisWrapper.inited = false;
class RedisMultiWrapper {
    constructor(rw) {
        this.rw = rw;
        this.buff = [];
        this.multi = rw.redis.multi();
    }
    toString() {
        let tempBuf = '';
        this.buff.forEach(x => {
            tempBuf += JSON.stringify(x) + '\n';
        });
        return tempBuf;
    }
}
//# sourceMappingURL=redis-wrapper.js.map