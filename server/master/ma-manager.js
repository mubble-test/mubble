"use strict";
/*------------------------------------------------------------------------------
   About      : Manager class for master data (upload / sync)
   
   Created on : Thu May 25 2017
   Author     : Gaurav Kulshreshtha
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterMgr = exports.SourceSyncData = void 0;
const lo = require("lodash");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const redis_wrapper_1 = require("../cache/redis-wrapper");
const ma_base_1 = require("./ma-base");
const ma_util_1 = require("./ma-util");
const ma_reg_manager_1 = require("./ma-reg-manager");
const ma_mem_cache_1 = require("./ma-mem-cache");
const LOG_ID = 'MasterMgr';
function MaMgrLog(rc, ...args) {
    if (rc) {
        rc.isStatus() && rc.status(LOG_ID, ...args);
    }
    else {
        ma_util_1.log(LOG_ID, ...args);
    }
}
function debug(rc, ...args) {
    if (rc) {
        rc.isDebug && rc.debug(LOG_ID, ...args);
    }
    else {
        ma_util_1.log(LOG_ID, ...args);
    }
}
var CONST = {
    REDIS_NS: 'ncmaster:',
    REDIS_TS_SET: 'ts:',
    REDIS_DATA_HASH: 'data:',
    REDIS_DIGEST_KEY: 'digest',
    REDIS_CHANNEL: 'ncmaster:updates',
    DIGEST_REMOTE: 'remote',
    // Redis Commands options consts
    WITHSCORES: 'WITHSCORES',
    MINUS_INFINITY: '-inf',
    PLUS_INFINITY: '+inf'
};
class SourceSyncData {
    constructor(master, source, target, now) {
        this.inserts = {};
        this.updates = {};
        this.deletes = {};
        this.mastername = master;
        this.source = source;
        this.redisData = target;
        this.modifyTs = now;
    }
}
exports.SourceSyncData = SourceSyncData;
class MasterMgr {
    // Todo : make sure singleton instance
    constructor() {
        this.masterCache = {};
        this.dependencyMap = {};
        this.revDepMap = {};
        this.masterChangeSubs = {};
        if (MasterMgr.created) {
            throw new Error('master manager can only be singleton');
        }
        MasterMgr.created = true;
    }
    /**
     * Get the master records stored in cache
     * @param mastername  name of the master
     * @param deleted whether you want the deleted records also. default false. Only non deleted
     */
    getMasterRecords(mastername, deleted) {
        mastername = mastername.toLocaleLowerCase();
        const memCache = this.masterCache[mastername];
        ma_util_1.assert(memCache != null, 'master ', mastername, 'is not present');
        ma_util_1.assert(memCache.cache, 'master ', mastername, 'is not not cached');
        return deleted ? lo.clone(memCache.records) : memCache.records.filter((rec) => !rec.deleted);
    }
    getMasterHashRecords(mastername) {
        mastername = mastername.toLocaleLowerCase();
        const memCache = this.masterCache[mastername];
        ma_util_1.assert(memCache != null, 'master ', mastername, 'is not present');
        ma_util_1.assert(memCache.cache, 'master ', mastername, 'is not not cached');
        return memCache.hash;
    }
    subscribeToMasterChange(rc, mastername, cb) {
        mastername = mastername.toLowerCase();
        const memCache = this.masterCache[mastername];
        ma_util_1.assert(memCache != null, 'master ', mastername, 'is not present');
        ma_util_1.assert(memCache.cache, 'master ', mastername, 'is not not cached');
        if (!this.masterChangeSubs[mastername]) {
            this.masterChangeSubs[mastername] = [];
        }
        // rc.isDebug() && rc.debug(rc.getName(this), 'subscribeToMasterChange adding master cb change', mastername , cb)
        const subs = this.masterChangeSubs[mastername], cbStr = cb.toString();
        if (subs.some((sub) => {
            return sub.toString() === cbStr;
        }))
            throw 'subscription added again for master ' + mastername + ' ' + cbStr;
        subs.push(cb);
        rc.isDebug() && rc.debug(rc.getName(this), 'total change cb listeners for master ' + mastername, subs.length);
    }
    /*
    Actions :
    0. MasterRegistry init. Verify all master registries
    1. redis wrapper init
    2. setup mredis (connect)
    3. setup sredis (connect)
    4. mredis and sredis data sync verify
    5. sredis subscribe to events master changes
    6. xxx setup auto refresh
    7. build cache from sredis
    */
    async init(rc, mredisUrl, sredisUrl) {
        if (this.rc || this.mredis || this.sredis) {
            throw new Error('master mgr inited again');
        }
        this.rc = rc;
        ma_reg_manager_1.MasterRegistryMgr.init(rc);
        // Init the redis wrapper
        redis_wrapper_1.RedisWrapper.init(rc);
        this.mredis = await redis_wrapper_1.RedisWrapper.connect(rc, 'MasterRedis', mredisUrl);
        this.sredis = await redis_wrapper_1.RedisWrapper.connect(rc, 'SlaveRedis', sredisUrl);
        this.subRedis = await redis_wrapper_1.RedisWrapper.connect(rc, 'SubscriptionRedis', sredisUrl);
        // assert(this.mredis.isMaster() && this.sredis.isSlave() , 'mRedis & sRedis are not master slave' , mredisUrl , sredisUrl)
        this.buildDependencyMap(rc);
        await this.checkSlaveMasterSync(rc, false);
        await this.setSubscriptions(rc);
        await this.buildInMemoryCache(rc);
    }
    buildDependencyMap(rc) {
        const dMap = this.dependencyMap;
        const rdMap = this.revDepMap;
        function getDepMasters(mas) {
            if (dMap[mas])
                return dMap[mas];
            return ma_reg_manager_1.MasterRegistryMgr.regMap[mas].config.getDependencyMasters();
        }
        ma_reg_manager_1.MasterRegistryMgr.masterList().forEach(mas => {
            let dArr = getDepMasters(mas);
            let dlen = dArr.length, mdlen = 0;
            // we need to get all dependencies of nth level 
            // (dependencies of dependencies of ...) recursively
            while (dlen !== mdlen) {
                dlen = dArr.length;
                lo.clone(dArr).forEach(dep => {
                    const depMas = getDepMasters(dep);
                    //dArr = lo.uniq(dArr.concat(depMas))
                    depMas.forEach(depM => {
                        if (dArr.indexOf(depM) === -1)
                            dArr.push(depM);
                    });
                });
                mdlen = dArr.length;
            }
            dMap[mas] = dArr;
            //MaRegMgrLog('buildDependencyMap 1',mas , dArr)
            //MaRegMgrLog('buildDependencyMap 2',dMap)
            // Reverse Mapping
            dArr.forEach(depMas => {
                let rArr = rdMap[depMas];
                if (rArr == null) {
                    rArr = [];
                    rdMap[depMas] = rArr;
                }
                rArr.push(mas);
            });
        });
        // Todo : remove empty array values masters / master with no dependency
        debug(rc, 'build Dependency Map finished');
        debug(rc, 'build Reverse Dependency Map finished');
    }
    async checkSlaveMasterSync(rc, assertCheck) {
        debug(rc, 'Check Slave Master Sync started');
        for (const master of ma_reg_manager_1.MasterRegistryMgr.masterList()) {
            const mDetail = await MasterMgr._getLatestRec(this.mredis, master);
            const sDetail = await MasterMgr._getLatestRec(this.sredis, master);
            if (lo.isEmpty(mDetail) && lo.isEmpty(sDetail)) {
                debug(rc, 'Master Slave Sync No records for master:', master);
            }
            else if (!lo.isEqual(mDetail, sDetail)) {
                // should not happen
                if (assertCheck)
                    ma_util_1.assert(false, 'master slave data sync mismatch', mDetail, sDetail);
                MaMgrLog(rc, 'Master-Slave sync mismatch for', mDetail, sDetail, master, 'will wait for 15 seconds');
                await ma_util_1.FuncUtil.sleep(15 * 1000);
                return this.checkSlaveMasterSync(rc, false);
            }
        }
        debug(rc, 'Check Slave Master Sync finished');
    }
    // sRedis subscribing to master publish records
    async setSubscriptions(rc) {
        MaMgrLog(rc, "Subscribing sredis to master ", CONST.REDIS_CHANNEL);
        await this.subRedis.subscribe([CONST.REDIS_CHANNEL], async (channel, msg) => {
            MaMgrLog(rc, 'Sredis', 'on', channel, 'channel received message', msg);
            if (channel !== CONST.REDIS_CHANNEL)
                return;
            const masters = JSON.parse(msg);
            ma_util_1.assert(Array.isArray(masters), 'invalid masters array received ', msg);
            await this.refreshSelectModels(masters);
            if (lo.isEmpty(this.masterChangeSubs))
                return;
            // Notify the all master change listeners
            for (const master of masters) {
                if (!this.masterChangeSubs[master])
                    continue;
                const subs = this.masterChangeSubs[master], data = this.getMasterRecords(master);
                for (const cb of subs) {
                    await cb(data);
                }
            }
        });
    }
    async refreshSelectModels(masters) {
        MaMgrLog(this.rc, 'refreshing masters list', masters);
        const all = ma_reg_manager_1.MasterRegistryMgr.masterList();
        masters.forEach((mas) => {
            ma_util_1.assert(all.indexOf(mas) !== -1, 'Invalid Master Obtained from Publish', mas, masters);
        });
        const digestMap = await this.getDigestMap();
        for (const mas of masters) {
            await this.refreshAModel(mas, digestMap[mas]);
        }
    }
    async refreshAModel(mastername, dinfo) {
        MaMgrLog(this.rc, 'refreshing master', mastername);
        const redis = this.sredis, memcache = this.masterCache[mastername], redisTsKey = CONST.REDIS_NS + CONST.REDIS_TS_SET + mastername, redisDataKey = CONST.REDIS_NS + CONST.REDIS_DATA_HASH + mastername, lastTs = memcache.latestRecTs(), resultWithTsScore = await redis.rwZrangebyscore(redisTsKey, '(' + lastTs, CONST.PLUS_INFINITY, true), resultKeys = resultWithTsScore.filter((val, index) => { return index % 2 === 0; }), resultScores = resultWithTsScore.filter((val, index) => { return index % 2 !== 0; });
        if (!resultKeys.length) {
            MaMgrLog(this.rc, 'refreshAModel no records to update');
            return;
        }
        const uniqueScores = lo.uniq(resultScores);
        ma_util_1.assert(uniqueScores.length === 1, 'model refresh inconsistency ', mastername, uniqueScores, dinfo);
        ma_util_1.assert(lo.toNumber(uniqueScores[0]) === dinfo.modTs, 'model refresh inconsistency ', mastername, uniqueScores, dinfo);
        MaMgrLog(this.rc, 'refreshAModel info', { mastername, lastTs }, resultKeys.length, resultKeys);
        const recs = await redis.redisCommand().hmget(redisDataKey, ...resultKeys);
        MaMgrLog(this.rc, 'refreshAModel ', mastername, 'refreshed records:', recs.length /*, recs*/);
        ma_util_1.assert(resultKeys.length === recs.length, 'invalid result from refresg redis', resultKeys.length, recs.length);
        const newData = {};
        for (let i = 0; i < resultKeys.length; i++) {
            const pk = resultKeys[i], val = JSON.parse(recs[i]);
            newData[pk] = val;
        }
        const res = memcache.update(this.rc, newData, dinfo);
        MaMgrLog(null, 'refreshAModel result ', res);
    }
    async syncMasterDataWithJson(rc, master) {
        master = master.toLowerCase();
        const registry = ma_reg_manager_1.MasterRegistryMgr.getMasterRegistry(master);
        ma_util_1.assert(registry != null, 'Unknow master ', master, 'for sync');
        const jsonFile = path.join(process.cwd(), 'master-data', master + '.json');
        ma_util_1.assert(await fs.existsSync(jsonFile), 'file ', jsonFile, 'does\'not exist');
        const buff = await fs.readFileSync(jsonFile), jsonData = JSON.parse(buff.toString('utf8')), redisData = await this.listAllMasterData(rc, master);
        const sourceIdsMap = ma_util_1.FuncUtil.maArrayMap(jsonData, (rec) => {
            return { key: registry.getIdStr(rec), value: rec };
        });
        const ssd = ma_reg_manager_1.MasterRegistryMgr.verifyRedisDataWithJson(rc, registry, sourceIdsMap, redisData);
        if (lo.isEmpty(ssd.deletes) && lo.isEmpty(ssd.inserts) && lo.isEmpty(ssd.updates)) {
            rc.isDebug() && rc.debug(rc.getName(this), master, 'is in sync');
        }
        else {
            rc.isDebug() && rc.debug(rc.getName(this), master, 'needs sync', ssd.inserts, ssd.updates, ssd.deletes);
        }
    }
    async applyFileData(rc, arModels) {
        const results = [];
        const digestMap = await this.getDigestMap(), masterCache = {}, todoModelz = {}, 
        // all masters update records will have same timestamp
        now = lo.now();
        // debug(rc , 'digestMap:',digestMap , arModels.map((x)=> x.master) )     
        for (let i = 0; i < arModels.length; i++) {
            const oModel = arModels[i];
            const registry = ma_reg_manager_1.MasterRegistryMgr.getMasterRegistry(oModel.master.toLowerCase());
            ma_util_1.assert(registry != null, 'Unknow master ', oModel.master.toLowerCase(), 'for file upload');
            registry.isAllowedFileUpload();
            //debug(rc , 'applyFileData', oModel.master.toLowerCase() , oModel.source)
            const master = oModel.master.toLowerCase(), mDigest = digestMap[master] ? digestMap[master].fileDigest : '', json = eval(oModel.source), //typeof(oModel.source) === 'object' ? oModel.source as any : JSON.parse(oModel.source),
            fDigest = crypto.createHash('md5').update(JSON.stringify(json) /*oModel.source*/).digest('hex');
            ma_util_1.assert(Array.isArray(json), 'master ', master, 'file upload is not an Array');
            // debug(rc , master , 'mDigest:',mDigest , 'fDigest:',fDigest)
            if (lo.isEqual(mDigest, fDigest)) {
                results.push({ name: master, error: 'skipping as file is unchanged' });
                continue;
            }
            const redisData = await this.listAllMasterData(rc, master), ssd = await ma_reg_manager_1.MasterRegistryMgr.validateBeforeSourceSync(rc, master, json, redisData, now);
            MaMgrLog(rc, 'applyFileData', master, 'inserts:', lo.size(ssd.inserts), 'updates:', lo.size(ssd.updates), 'deletes:', lo.size(ssd.deletes));
            this.setParentMapData(rc, master, masterCache, ssd);
            todoModelz[master] = { ssd: ssd, fDigest: fDigest, modelDigest: registry.getModelDigest() };
        }
        if (lo.size(todoModelz))
            await this.applyData(rc, results, masterCache, todoModelz);
        results.forEach(result => {
            MaMgrLog(rc, 'applyData', result);
        });
    }
    async applySingleItem(rc, master, srcRec) {
        master = master.toLowerCase();
        const todoModelz = {}, registry = ma_reg_manager_1.MasterRegistryMgr.getMasterRegistry(master);
        ma_util_1.assert(registry != null, 'Unknow master ', master, 'for applySingleItem');
        const pk = registry.getIdStr(srcRec);
        const targetMasterItem = await this.listSingleMasterItem(rc, master, pk), ssd = await ma_reg_manager_1.MasterRegistryMgr.verifySingleModification(rc, registry, srcRec, targetMasterItem, Date.now());
        MaMgrLog(rc, 'applySingleItem', 'ssd', ssd);
        todoModelz[master] = { ssd, fDigest: `${master}fDigest`, modelDigest: `${master}modelDigest` };
        const results = [];
        await this.applyData(rc, results, {}, todoModelz);
        MaMgrLog(rc, 'applySingleItem', 'results', results);
    }
    async deleteSingleMaster(rc, master, srcRec) {
        master = master.toLowerCase();
        const todoModelz = {}, registry = ma_reg_manager_1.MasterRegistryMgr.getMasterRegistry(master);
        ma_util_1.assert(registry != null, 'Unknow master ', master, 'for deleteSingleMaster');
        const pk = registry.getIdStr(srcRec);
        const targetMasterItem = await this.listSingleMasterItem(rc, master, pk), ssd = await ma_reg_manager_1.MasterRegistryMgr.deleteSingleMaster(rc, registry, pk, targetMasterItem, Date.now());
        MaMgrLog(rc, 'deleteSingleMaster', 'ssd', ssd);
        todoModelz[master] = { ssd, fDigest: `${master}fDigest`, modelDigest: `${master}modelDigest` };
        const results = [];
        await this.applyData(rc, results, {}, todoModelz);
        MaMgrLog(rc, 'deleteSingleMaster', 'results', results);
    }
    async applyFileDataFromPath(rc, masters) {
        MaMgrLog(rc, 'applyFileDataFromPath ', masters);
        const arModels = [];
        for (let i = 0; i < masters.length; i++) {
            const master = masters[i].master;
            ma_util_1.assert(await fs.existsSync(masters[i].masterFilePath), 'file ', masters[i].masterFilePath, 'does\'not exits');
            const buff = await fs.readFileSync(masters[i].masterFilePath);
            arModels.push({ master: master, source: buff.toString('utf8') });
        }
        /*
        for(const mod of arModels){
          console.log('mod is',mod , typeof(mod.source))
        }*/
        return this.applyFileData(rc, arModels);
    }
    setParentMapData(rc, master, masterCache, ssd) {
        // master dependency data settings      
        if ((lo.hasIn(masterCache, master) && masterCache[master])) {
            const depMap = masterCache[master];
            MaMgrLog(rc, master, 'overriding source ', lo.size(depMap), lo.size(ssd.source));
            masterCache[master] = ssd.source;
        }
        else {
            masterCache[master] = ssd.source;
            MaMgrLog(rc, 'setParentMapData', master, 'source size', lo.size(ssd.source));
        }
        if (lo.hasIn(this.dependencyMap, master)) {
            const depMasters = this.dependencyMap[master];
            depMasters.forEach((depMas) => {
                if (!lo.hasIn(masterCache, depMas))
                    masterCache[depMas] = null;
            });
        }
        if (lo.hasIn(this.revDepMap, master)) {
            const depMasters = this.revDepMap[master];
            depMasters.forEach((depMas) => {
                if (!lo.hasIn(masterCache, depMas))
                    masterCache[depMas] = null;
            });
        }
    }
    // Used for all source sync apis (partial , full , multi)
    async applyJsonData(rc, mastername, jsonRecords, redisRecords) {
        mastername = mastername.toLowerCase();
        const results = [], masterCache = {}, todoModelz = {}, digestMap = await this.getDigestMap(), mDigest = digestMap[mastername] ? digestMap[mastername].fileDigest : '', registry = ma_reg_manager_1.MasterRegistryMgr.getMasterRegistry(mastername), fDigest = crypto.createHash('md5').update(JSON.stringify(jsonRecords) /*oModel.source*/).digest('hex');
        ma_util_1.assert(registry != null, 'Unknow master ', mastername, 'for applySingleItem');
        if (lo.isEqual(mDigest, fDigest)) {
            MaMgrLog(rc, { name: mastername, error: 'skipping as data is unchanged' });
            return;
        }
        if (!redisRecords)
            redisRecords = await this.listAllMasterData(rc, mastername);
        const ssd = await ma_reg_manager_1.MasterRegistryMgr.validateBeforeSourceSync(rc, mastername, jsonRecords, redisRecords, Date.now());
        this.setParentMapData(rc, mastername, masterCache, ssd);
        todoModelz[mastername] = { ssd: ssd, fDigest: fDigest, modelDigest: registry.getModelDigest() };
        const resp = await this.applyData(rc, results, masterCache, todoModelz);
        return resp;
    }
    async destinationSync(rc, syncReq) {
        const resp = {};
        // check if there is any new data sync required
        const dataSyncRequired = [], purgeRequired = [];
        lo.forEach(syncReq.hash, (synInfo, mastername) => {
            const memcache = this.masterCache[mastername];
            //assert(memcache!=null , 'Unknown master data sync request ',mastername)
            if (memcache == null) {
                rc.isDebug() && rc.debug(rc.getName(this), 'Unknown master data sync request ', mastername);
                return;
            }
            ma_util_1.assert(synInfo.ts <= memcache.latestRecTs(), 'syncInfo ts can not be greater than master max ts ', mastername, synInfo.ts, memcache.latestRecTs());
            if (memcache.cache && !memcache.hasRecords() && !memcache.latestRecTs()) {
                // No Data in this master
                ma_util_1.assert(synInfo.ts === 0, 'No data in master ', mastername, 'last ts can not ', synInfo.ts);
            }
            else if ( /*synInfo.modelDigest !== memcache.digestInfo.modelDigest ||*/synInfo.ts && ((synInfo.ts < memcache.getMinTS()) ||
                (memcache.cache && !memcache.hasRecords() && (synInfo.ts < memcache.latestRecTs())))) {
                MaMgrLog(rc, 'master digest change purging all', mastername, memcache.digestInfo.modelDigest);
                synInfo.ts = 0;
                dataSyncRequired.push(mastername);
                purgeRequired.push(mastername);
            }
            else if (synInfo.ts < memcache.latestRecTs()) {
                // sync required
                dataSyncRequired.push(mastername);
            }
            else {
                // Both are in sync
                ma_util_1.assert(synInfo.ts === memcache.latestRecTs(), "syncInfo ts and master Latest Ts not in match", mastername, memcache.records.length, synInfo.ts, memcache.latestRecTs(), memcache.getMinTS(), memcache.getMaxTS());
            }
        });
        //rc.isDebug() && rc.debug(rc.getName(this), 'dataSyncRequired',dataSyncRequired)
        if (!dataSyncRequired.length)
            return resp;
        for (const mastername of dataSyncRequired) {
            const memcache = this.masterCache[mastername];
            if (memcache.cache) {
                resp[mastername] = memcache.syncCachedData(rc, syncReq.segments, syncReq.hash[mastername], purgeRequired.indexOf(mastername) !== -1);
            }
            else {
                const masterData = await this.listAllMasterData(rc, mastername);
                resp[mastername] = memcache.syncNonCachedData(rc, syncReq.segments, masterData, syncReq.hash[mastername], purgeRequired.indexOf(mastername) !== -1);
            }
        }
        return resp;
    }
    // Update the mredis with required changes 
    async applyData(rc, results, masterCache, todoModelz) {
        MaMgrLog(rc, 'applyData results', results, 'mastercache keys:', lo.keysIn(masterCache), 'TodoModels keys:', lo.keysIn(todoModelz));
        for (const depMaster of lo.keysIn(masterCache)) {
            if (masterCache[depMaster])
                continue;
            // Populate the dependent masters
            masterCache[depMaster] = await this.listActiveMasterData(rc, depMaster);
            //debug('dependent master ',depMaster , 'size:', lo.size(masterCache[depMaster]) )
        }
        // verify all dependencies
        lo.forEach(todoModelz, (value, master) => {
            ma_reg_manager_1.MasterRegistryMgr.verifyAllDependency(rc, master, masterCache);
        });
        // verification done . Update the redis
        await this.updateMRedis(rc, results, todoModelz);
        return results;
    }
    async updateMRedis(rc, results, todoModelz) {
        const multi = this.mredis.redisMulti();
        for (const master of lo.keysIn(todoModelz)) {
            const modData = todoModelz[master], inserts = modData.ssd.inserts, updates = modData.ssd.updates, deletes = modData.ssd.deletes, ts = modData.ssd.modifyTs;
            const modifications = ma_util_1.FuncUtil.toStringifyMap(lo.assign({}, inserts, updates, deletes));
            lo.forEach(modifications, (recStr, pk) => {
                //const recStr : string = JSON.stringify(value)
                multi.zadd(CONST.REDIS_NS + CONST.REDIS_TS_SET + master, 'CH', ts, pk);
                multi.hset(CONST.REDIS_NS + CONST.REDIS_DATA_HASH + master, pk, recStr);
            });
            // todo : Calculate Data Digest and other digest
            multi.hset(CONST.REDIS_NS + CONST.REDIS_DIGEST_KEY, master, JSON.stringify(new ma_mem_cache_1.DigestInfo(modData.fDigest, modData.modelDigest, ts, '', {})));
            // result objects with info
            results.push({ name: master, inserts: lo.size(inserts), updates: lo.size(updates), deletes: lo.size(deletes), modTs: ts });
        }
        MaMgrLog(rc, 'updating MRedis');
        const res = await this.mredis.execRedisMulti(multi);
        MaMgrLog(rc, 'mredis publishing to channel', CONST.REDIS_CHANNEL, res);
        await this.mredis.publish(CONST.REDIS_CHANNEL, JSON.stringify(lo.keysIn(todoModelz)));
    }
    async buildInMemoryCache(rc) {
        debug(rc, 'Build InMemory Cache Started');
        const digestMap = await this.getDigestMap();
        for (const mastername of ma_reg_manager_1.MasterRegistryMgr.masterList()) {
            ma_util_1.assert(!lo.hasIn(this.masterCache, mastername), 'mastercache already present for ', mastername);
            const masterData = await this.listAllMasterData(rc, mastername);
            this.masterCache[mastername] = new ma_mem_cache_1.MasterInMemCache(rc, mastername, masterData, digestMap[mastername]);
        }
        debug(rc, 'Build InMemory Cache Finished');
    }
    async getDigestMap() {
        const digestKey = CONST.REDIS_NS + CONST.REDIS_DIGEST_KEY, stringMap = await this.mredis.redisCommand().hgetall(digestKey), genMap = ma_util_1.FuncUtil.toParseObjectMap(stringMap);
        // Empty      
        if (!stringMap)
            return {};
        return lo.mapValues(genMap, (val, masterKey) => {
            return ma_mem_cache_1.DigestInfo.getDigest(val, masterKey);
        });
    }
    async listAllMasterData(rc, master) {
        const masterKey = CONST.REDIS_NS + CONST.REDIS_DATA_HASH + master;
        const map = await this.mredis.redisCommand().hgetall(masterKey);
        // Parse the string value to object
        return ma_util_1.FuncUtil.toParseObjectMap(map);
    }
    async listSingleMasterItem(rc, master, key) {
        const masterKey = CONST.REDIS_NS + CONST.REDIS_DATA_HASH + master;
        const results = await this.mredis.redisCommand().hmget(masterKey, ...[key]), itemStr = results[0];
        // Parse the string value to object
        return itemStr ? JSON.parse(itemStr) : null;
    }
    async listActiveMasterData(rc, master) {
        const masterKey = CONST.REDIS_NS + CONST.REDIS_DATA_HASH + master;
        let map = await this.mredis.redisCommand().hgetall(masterKey);
        // Parse the string value to object
        let pMap = ma_util_1.FuncUtil.toParseObjectMap(map);
        // remove deleted
        return lo.omitBy(pMap, (val, key) => {
            return (val[ma_base_1.MasterBaseFields.Deleted] === true);
        });
    }
    async close() {
        await this.sredis.close();
        await this.subRedis.close();
        await this.mredis.close();
    }
    static async _getLatestRec(redis, master, oldest = false) {
        const redisTskey = CONST.REDIS_NS + CONST.REDIS_TS_SET + master;
        const position = oldest ? 0 : -1;
        const res = await redis.redisCommand().zrange(redisTskey, position, position, CONST.WITHSCORES);
        if (res.length)
            ma_util_1.assert(res.length === 2, '_getLatestRec invalid result ', res, master);
        else
            return {};
        ma_util_1.assert(lo.isNumber(lo.toNumber(res[1])), '_getLatestRec invalid result ', res, master);
        return { key: res[0], ts: lo.toNumber(res[1]) };
    }
}
exports.MasterMgr = MasterMgr;
MasterMgr.created = false;
//# sourceMappingURL=ma-manager.js.map