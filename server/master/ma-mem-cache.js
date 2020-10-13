"use strict";
/*------------------------------------------------------------------------------
   About      : Master In Memory cache class required for destination sync
   
   Created on : Mon Jun 12 2017
   Author     : Gaurav Kulshreshtha
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterInMemCache = exports.DigestInfo = exports.SyncInfo = void 0;
const lo = require("lodash");
const crypto = require("crypto");
const ma_base_1 = require("./ma-base");
const ma_util_1 = require("./ma-util");
const ma_reg_manager_1 = require("./ma-reg-manager");
const LOG_ID = 'MasterInMemCache';
function MaInMemCacheLog(rc, ...args) {
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
class SyncInfo {
}
exports.SyncInfo = SyncInfo;
class DigestInfo {
    constructor(fDigest, modelDigest, ts, dDigest, segMap) {
        this.segDigestMap = {};
        this.fileDigest = fDigest;
        this.modelDigest = modelDigest;
        this.modTs = ts;
        this.dataDigest = dDigest;
        this.segDigestMap = segMap;
    }
    static getDigest(val, masterKey) {
        ma_util_1.assert(lo.hasIn(val, 'fileDigest') && lo.hasIn(val, 'modelDigest') && lo.hasIn(val, 'modTs') && lo.hasIn(val, 'dataDigest') && lo.hasIn(val, 'segDigestMap'), 'DigestInfo ', val, 'is corrupt for master ', masterKey);
        ma_util_1.assert(ma_util_1.MaType.isString(val['fileDigest']) &&
            ma_util_1.MaType.isString(val['modelDigest']) &&
            ma_util_1.MaType.isNumber(val['modTs']) &&
            ma_util_1.MaType.isString(val['dataDigest']), 'DigestInfo ', val, 'is corrupt for master ', masterKey);
        return new DigestInfo(val['fileDigest'], val['modelDigest'], val['modTs'], val['dataDigest'], val['segDigestMap']);
    }
}
exports.DigestInfo = DigestInfo;
class MasterInMemCache {
    constructor(rc, mastername, data, dInfo) {
        this.mastername = mastername;
        this.cache = false;
        // records in sorted order
        this.records = [];
        // hash key / record
        this.hash = {};
        this.modTSField = ma_base_1.MasterBaseFields.ModTs;
        this.digestInfo = new DigestInfo('', '', 0, '', {});
        const registry = ma_reg_manager_1.MasterRegistryMgr.getMasterRegistry(mastername);
        this.cache = registry.config.getCached();
        this.modTSField = registry.config.getMasterTsField();
        if (this.cache) {
            const size = lo.size(data);
            if (size)
                ma_util_1.assert(dInfo != null, 'Digest Info Missing for master with data', mastername, size);
            else
                ma_util_1.assert((dInfo == null) || dInfo.fileDigest === (crypto.createHash('md5').update(JSON.stringify([])).digest('hex')), 'Digest Info present for master without data', dInfo, mastername);
            if (!size) {
                if (dInfo != null)
                    this.digestInfo = dInfo;
                debug(rc, 'Nothing to populate in memory cache for master', mastername);
                return;
            }
            this.digestInfo = dInfo;
        }
        else {
            debug(rc, 'caching is disabled for master ', mastername);
            if (dInfo != null)
                this.digestInfo = dInfo;
            return;
        }
        // Populate cache
        // Fields which needs to be cached
        const allCachedFields = lo.uniq(registry.cachedFields.concat(registry.autoFields));
        // MaInMemCacheLog(rc , 'allCachedFields ', allCachedFields , 'destSyncFields', registry.destSyncFields )
        this.hash = lo.mapValues(data, (val, key) => {
            return lo.pick(val, allCachedFields);
        });
        // sort them by modTs field descending order
        this.records = lo.sortBy(lo.valuesIn(this.hash), [this.modTSField]).reverse();
        ma_util_1.assert(this.getMaxTS() === this.digestInfo.modTs, mastername, 'Digest Info data inconsistency ', this.getMaxTS(), this.digestInfo);
        // Freeze the records
        this.records.forEach((rec) => { Object.freeze(rec); });
        debug(rc, `MasterInMemCache loading finished for ${mastername}, Count: ${this.records.length}`);
    }
    //public lastUpdateTS        : number = lo.now()
    getMaxTS() {
        return this.records.length ? lo.nth(this.records, 0)[this.modTSField] : 0;
    }
    // This has to be saved for non -cache data
    getMinTS() {
        return this.records.length ? lo.nth(this.records, -1)[this.modTSField] : 0;
    }
    hasRecords() {
        return (this.records.length > 0);
    }
    latestRecTs() {
        return this.digestInfo.modTs;
    }
    update(rc, newData, dInfo) {
        debug(rc, 'update ', this.mastername, lo.size(newData), dInfo, lo.size(this.hash));
        const registry = ma_reg_manager_1.MasterRegistryMgr.getMasterRegistry(this.mastername);
        this.digestInfo = dInfo;
        const result = { inserts: 0, updates: 0, cache: this.cache };
        if (!this.cache)
            return result;
        // Fields which needs to be cached
        const allCachedFields = lo.uniq(registry.cachedFields.concat(registry.autoFields));
        const cacheNewData = lo.mapValues(newData, (val, key) => {
            return lo.pick(val, allCachedFields);
        });
        // Ensure that all the data available is modified
        lo.forEach(cacheNewData, (newData, newPk) => {
            if (!lo.hasIn(this.hash, newPk)) {
                // new data
                result.inserts++;
                return;
            }
            ma_util_1.assert(!lo.isEqual(cacheNewData, this.hash[newPk]), 'same data given for memory cache update ', newPk, newData);
            result.updates++;
        });
        this.hash = lo.assign({}, this.hash, cacheNewData);
        // sort them by modTs field descending order
        this.records = lo.sortBy(lo.valuesIn(this.hash), [this.modTSField]).reverse();
        ma_util_1.assert(this.getMaxTS() === this.digestInfo.modTs, this.mastername, 'Digest Info data inconsistency ', this.getMaxTS(), this.digestInfo);
        this.records.forEach((rec) => { Object.freeze(rec); });
        debug(rc, 'MasterInMemCache update finished', this.mastername, this.records);
        return result;
    }
    syncCachedData(rc, segments, syncInfo, purge) {
        const registry = ma_reg_manager_1.MasterRegistryMgr.getMasterRegistry(this.mastername), config = registry.config, configSegment = config.getSegment();
        debug(rc, 'syncCachedData request', registry.mastername, syncInfo, purge);
        let segRef = configSegment ? (segments || {})[configSegment.key] : [];
        segRef = segRef || [];
        let modelSeg = syncInfo.ts ? (syncInfo.seg || []) : [];
        let arrSame = [], arrPlus = [], arrMinus = [];
        if (configSegment)
            this.arrayDiff(segRef, modelSeg, arrPlus, arrMinus, arrSame);
        const updates = [], deletes = [], segEqual = (arrPlus.length > 0) || (arrMinus.length > 0);
        let data = { mod: updates, del: deletes };
        if (arrMinus.length && syncInfo.ts) { // some segments have been removed
            syncInfo.ts = 0;
            purge = true;
            rc.isWarn() && rc.warn(rc.getName(this), 'destination sync remove old data', segRef, { model: registry.mastername, minus: arrMinus });
        }
        else if (syncInfo.ts && arrPlus.length) {
            rc.isWarn() && rc.warn(rc.getName(this), 'destinationSync: add new data. Removing Old', segRef, { modelName: registry.mastername, plus: arrPlus });
            // Not doing match segment for arrsame for ts > syncInfo.ts & arrPlus for ts > 0
            // App is data heavy . why be so frugal with data
            syncInfo.ts = 0;
            purge = true;
        }
        for (const rec of this.records) {
            // should this be just < . let = comparison be there to be on safe side
            if (segEqual && syncInfo.ts && rec[this.modTSField] <= syncInfo.ts)
                break;
            if (configSegment) {
                if (!registry.masterInstance.matchSegment(rc, segRef, configSegment.cols, rec))
                    continue; // segment does not match
            }
            if (rec[ma_base_1.MasterBaseFields.Deleted] === true) {
                // All the Pk's field might not be understood by client.
                // send him only the pk fields , which he understands (dest sync)
                deletes.push(lo.pick(rec, lo.intersection(registry.pkFields, registry.destSyncFields)));
            }
            else {
                const destRec = lo.pick(rec, registry.destSyncFields);
                updates.push(destRec);
            }
        }
        ma_util_1.assert(configSegment != null || (deletes.length !== 0 || updates.length !== 0), 'syncData Invalid results', this.mastername, syncInfo, this.digestInfo);
        const synHash = {
            ts: this.digestInfo.modTs
            /*modelDigest   : this.digestInfo.modelDigest ,
            dataDigest    : this.digestInfo.dataDigest,*/
        };
        if (configSegment)
            synHash.seg = segRef;
        data = registry.masterInstance.syncGetModifications(rc, data);
        const syncResp = {
            mod: data.mod,
            del: data.del,
            purge: purge,
            hash: synHash
        };
        debug(rc, 'syncCachedData response', registry.mastername, synHash, updates.length, deletes.length);
        debug(rc, 'syncCachedData updates response', registry.mastername, updates.length, updates);
        debug(rc, 'syncCachedData deletes response', registry.mastername, deletes.length, deletes);
        return syncResp;
    }
    /*
    private addModDelRecs(rc : RunContextServer , modelObj : MasterBase, refTS : number , arSeg : SegmentType , colSeg : any[] , oRet : {mod : any [] , del : any []} , checkDuplicate : boolean ) {
  
  
    }*/
    arrayDiff(arMain, arModel, arPlus, arMinus, arSame) {
        arMain.forEach(function (item) {
            if (arModel.find((seg) => { return lo.isEqual(seg, item); })) {
                arSame.push(item);
            }
            else {
                arPlus.push(item);
            }
        });
        arModel.forEach(function (item) {
            if (arMain.find((seg) => { return lo.isEqual(seg, item); })) {
                arMinus.push(item);
            }
        });
    }
    syncNonCachedData(rc, segments, masterData, syncInfo, purge) {
        debug(rc, 'syncNonCachedData', syncInfo, purge);
        const registry = ma_reg_manager_1.MasterRegistryMgr.getMasterRegistry(this.mastername);
        // Get all the items >= syncInfo.ts
        const updates = [], deletes = [];
        let data = { mod: updates, del: deletes };
        lo.forEach(masterData, (rec, pk) => {
            // should this be just < . let = comparison be there to be on safe side
            if (rec[this.modTSField] <= syncInfo.ts)
                return;
            if (rec[ma_base_1.MasterBaseFields.Deleted] === true) {
                deletes.push(lo.pick(rec, registry.pkFields));
            }
            else {
                const destRec = lo.pick(rec, registry.destSyncFields);
                updates.push(destRec);
            }
        });
        ma_util_1.assert(deletes.length !== 0 || updates.length !== 0, 'syncData Invalid results', this.mastername, syncInfo, this.digestInfo);
        const synHash = {
            ts: this.digestInfo.modTs,
            seg: syncInfo.seg
            /*modelDigest   : this.digestInfo.modelDigest ,
            dataDigest    : this.digestInfo.dataDigest,*/
        };
        data = registry.masterInstance.syncGetModifications(rc, data);
        const syncResp = {
            mod: data.mod,
            del: data.del,
            purge: purge,
            hash: synHash
        };
        debug(rc, 'syncNonCachedData', synHash, updates.length, deletes.length, updates, deletes);
        return syncResp;
    }
}
exports.MasterInMemCache = MasterInMemCache;
//# sourceMappingURL=ma-mem-cache.js.map