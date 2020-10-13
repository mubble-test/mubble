"use strict";
/*------------------------------------------------------------------------------
   About      : Class maintaing all the registry information (through decorators) of all masterbase models
   
   Created on : Wed May 31 2017
   Author     : Gaurav Kulshreshtha
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterRegistryMgr = void 0;
const lo = require("lodash");
const ma_base_1 = require("./ma-base");
const ma_registry_1 = require("./ma-registry");
const ma_manager_1 = require("./ma-manager");
const ma_util_1 = require("./ma-util");
const LOG_ID = 'MasterRegistryMgr';
function MaRegMgrLog(rc, ...args) {
    if (rc) {
        rc.isStatus() && rc.status(LOG_ID, ...args);
    }
    else {
        //log(LOG_ID , ...args)
    }
}
function debug(rc, ...args) {
    if (rc) {
        rc.isDebug && rc.debug(LOG_ID, ...args);
    }
    else {
        //log(LOG_ID , ...args)
    }
}
/**
 * Class Maintaining the Registry of all masters & their field types
 * All Methods are static
 */
class MasterRegistryMgr {
    static masterList() {
        return lo.keysIn(this.regMap).filter((mas) => {
            return mas !== ma_registry_1.MASTERBASE;
        });
    }
    static masterField(target, propKey, maType) {
        const master = target.constructor.name.toLowerCase(), maReg = MasterRegistryMgr.getMasterRegistry(master, true);
        MaRegMgrLog(null, 'masterField ', master, propKey, ma_base_1.Master.FieldType[maType]);
        maReg.addField(propKey, maType, target);
        if (maType === ma_base_1.Master.FieldType.PRIMARY) {
            ma_util_1.assert(maReg.pkFields.indexOf(propKey) === -1, 'pk added twice');
            maReg.pkFields.push(propKey);
        }
    }
    static addMaster(constructor, config) {
        const master = constructor.name.toLowerCase(), maReg = MasterRegistryMgr.getMasterRegistry(master);
        //MaRegMgrLog('addMaster ',master , constructor)
        MaRegMgrLog(null, 'addMaster config ', master, config);
        ma_util_1.assert(maReg.config == null && maReg.masterInstance == null, 'master ', master, 'registered twice');
        maReg.config = config;
        maReg.verifyInternal(constructor);
    }
    static fieldValidationRule(target, propKey, rule) {
        const master = target.constructor.name.toLowerCase(), maReg = MasterRegistryMgr.getMasterRegistry(master, true);
        //MaRegMgrLog('fieldValidationRule ',master , propKey , rule)
        //maReg.rules.push(rule)
        maReg.addFieldRule(propKey, target, rule);
    }
    static getMasterRegistry(master, create = false) {
        if (MasterRegistryMgr.regMap[master])
            return MasterRegistryMgr.regMap[master];
        if (create) {
            MasterRegistryMgr.regMap[master] = new ma_registry_1.MasterRegistry(master);
        }
        return MasterRegistryMgr.regMap[master];
    }
    // Verify all the MasterRegistry for data sanity
    static init(rc) {
        MaRegMgrLog(rc, '....Done....');
        // check masterbase registry exists
        const masterbaseReg = MasterRegistryMgr.regMap[ma_registry_1.MASTERBASE];
        ma_util_1.assert(masterbaseReg != null, ma_registry_1.MASTERBASE, 'Registry missing');
        const masterbaseFields = lo.keysIn(masterbaseReg.fieldsMap);
        const customMasters = lo.filter(MasterRegistryMgr.regMap, (maReg, master) => {
            return master !== ma_registry_1.MASTERBASE;
        });
        customMasters.forEach((maReg) => {
            const maFields = lo.keysIn(maReg.fieldsMap);
            ma_util_1.assert(lo.isEmpty(lo.intersection(masterbaseFields, maFields)), maReg.mastername, 'has masterbase fields ', maFields, masterbaseFields);
            maReg.fieldsMap = lo.assignIn(maReg.fieldsMap, masterbaseReg.fieldsMap);
        });
        // verify all custom masters
        customMasters.forEach((maReg) => {
            maReg.verify(rc);
        });
    }
    static validateBeforeSourceSync(rc, mastername, source, redisData, now) {
        const registry = this.getMasterRegistry(mastername);
        this.verifySourceRecords(rc, registry, source);
        //todo : accompny master check
        const sourceIdsMap = ma_util_1.FuncUtil.maArrayMap(source, (rec) => {
            return { key: registry.getIdStr(rec), value: rec };
        });
        return this.verifyModifications(rc, this.getMasterRegistry(mastername), sourceIdsMap, redisData, now);
    }
    static verifyAllDependency(rc, mastername, masterCache) {
        MaRegMgrLog(rc, 'verifyAllDependency for master', mastername);
        //if(lo.stubTrue()) return
        const registry = this.getMasterRegistry(mastername), fkConst = registry.config.getForeignKeys(), selfData = masterCache[mastername];
        //debug('fk for master',mastername , fkConst)
        lo.forEach(fkConst, (props, parent) => {
            ma_util_1.assert(lo.hasIn(masterCache, parent), 'parent mastercache', parent, 'is missing for master', mastername);
            const parentData = masterCache[parent];
            //debug('parent size ',lo.size(parentData))
            lo.forEach(props, (selfField, parentField) => {
                //debug('selfField',selfField , 'parent', parentField , selfData)
                // verify self data field with parent data
                lo.forEach(selfData, (selfRec, pk) => {
                    //debug('selfRec',selfRec , 'pk',pk)
                    const selfVal = selfRec[selfField];
                    ma_util_1.assert(selfVal != null, 'dependency field data null', selfRec, pk, selfField);
                    const found = lo.some(parentData, (parentRec, parentPk) => {
                        return lo.isEqual(selfVal, parentRec[parentField]);
                    });
                    ma_util_1.assert(found, 'dependency field ', selfField, 'value:', selfVal, 'for master:', mastername, 'pk:', pk, 'not found in parent master:', parent, 'field:', parentField);
                });
            });
        });
    }
    // Private methods
    static verifySourceRecords(rc, maReg, source) {
        const mastername = maReg.mastername;
        // remove deleted recoreds
        source = source.filter((src) => {
            if (src[ma_base_1.MasterBaseFields.Deleted])
                MaRegMgrLog(rc, 'master', mastername, 'verifySourceRecords', 'removed from src', maReg.getIdStr(src));
            return !(src[ma_base_1.MasterBaseFields.Deleted] === true);
        });
        // Field Type sanity validation rules
        maReg.config.getSrcValidationrules().forEach((srcValidationRule) => {
            MaRegMgrLog(rc, 'applying SrcValidation Rule rule ', srcValidationRule.name, 'on master', maReg.mastername);
            srcValidationRule(rc, maReg, source);
        });
        // class level Config Rules Check
        /*
        maReg.rules.forEach(  (configRule : (obj : any) => void ) => {
          MaRegMgrLog('applying Config rule ', configRule.constructor.name , 'on master', maReg.mastername)
          source.forEach((rec:any)=>{
            configRule(rec)
          })
        } )*/
        lo.valuesIn(maReg.fieldsMap).forEach((finfo) => {
            finfo.rules.forEach((fieldRule) => {
                MaRegMgrLog(rc, 'applying Field rule ', fieldRule.name, 'on field', finfo.name, ' master', maReg.mastername);
                source.forEach((rec) => {
                    fieldRule(rec);
                });
            });
        });
    }
    static async verifyModifications(rc, registry, sourceIds, targetMap, now) {
        MaRegMgrLog(rc, 'verifyModifications', registry.mastername, 'source size:', lo.size(sourceIds), 'target size:', lo.size(targetMap));
        const config = registry.config, masTsField = config.getMasterTsField(), fldMap = registry.fieldsMap, ssd = new ma_manager_1.SourceSyncData(registry.mastername, sourceIds, targetMap, now), instanceObj = registry.masterInstance;
        for (const pk in sourceIds) {
            const srcRec = sourceIds[pk], ref = targetMap[pk];
            if (!ref) {
                // this is an new record
                // check allow insert . allow all
                await instanceObj.verifyRecord(rc, srcRec);
                //if(lo.hasIn(fldMap , MasterBaseFields.Deleted )) srcRec[MasterBaseFields.Deleted] = false
                srcRec[ma_base_1.MasterBaseFields.Deleted] = false;
                srcRec[ma_base_1.MasterBaseFields.CreateTs] = srcRec[masTsField] = now;
                ssd.inserts[pk] = srcRec;
            }
            else if (ref[ma_base_1.MasterBaseFields.Deleted] || this.isModified(rc, registry, masTsField, ref, srcRec)) {
                await instanceObj.verifyRecord(rc, srcRec, ref);
                //if(lo.hasIn(fldMap , MasterBaseFields.Deleted)) srcRec[MasterBaseFields.Deleted] = false
                srcRec[ma_base_1.MasterBaseFields.Deleted] = false;
                srcRec[masTsField] = now;
                srcRec[ma_base_1.MasterBaseFields.CreateTs] = ref[ma_base_1.MasterBaseFields.CreateTs];
                ssd.updates[pk] = srcRec;
            }
        }
        // Check if there are any records deleted
        lo.forEach(targetMap, (ref, id) => {
            // Ignore already deleted
            if (ref[ma_base_1.MasterBaseFields.Deleted])
                return;
            const src = sourceIds[id];
            if (!src) {
                // This record is deleted
                const delRec = lo.cloneDeep(ref);
                delRec[ma_base_1.MasterBaseFields.Deleted] = true;
                delRec[masTsField] = now;
                ssd.deletes[id] = delRec;
            }
        });
        return ssd;
    }
    static async verifySingleModification(rc, registry, source, target, now) {
        MaRegMgrLog(rc, 'verifySingleModification', registry.mastername, 'source', source, 'target', target);
        const config = registry.config, masTsField = config.getMasterTsField(), fldMap = registry.fieldsMap, ssd = new ma_manager_1.SourceSyncData(registry.mastername, {}, {}, now), instanceObj = registry.masterInstance, pk = registry.getIdStr(source);
        const srcRec = source, ref = target;
        if (!ref) {
            // this is an new record
            // check allow insert . allow all
            await instanceObj.verifyRecord(rc, srcRec);
            //if(lo.hasIn(fldMap , MasterBaseFields.Deleted )) srcRec[MasterBaseFields.Deleted] = false
            srcRec[ma_base_1.MasterBaseFields.Deleted] = false;
            srcRec[ma_base_1.MasterBaseFields.CreateTs] = srcRec[masTsField] = now;
            ssd.inserts[pk] = srcRec;
        }
        else if (ref[ma_base_1.MasterBaseFields.Deleted] || this.isModified(rc, registry, masTsField, ref, srcRec)) {
            await instanceObj.verifyRecord(rc, srcRec, ref);
            //if(lo.hasIn(fldMap , MasterBaseFields.Deleted)) srcRec[MasterBaseFields.Deleted] = false
            srcRec[ma_base_1.MasterBaseFields.Deleted] = false;
            srcRec[masTsField] = now;
            srcRec[ma_base_1.MasterBaseFields.CreateTs] = ref[ma_base_1.MasterBaseFields.CreateTs];
            ssd.updates[pk] = srcRec;
        }
        return ssd;
    }
    static async deleteSingleMaster(rc, registry, pk, target, now) {
        MaRegMgrLog(rc, 'deleteSingleModification', registry.mastername, 'target', target);
        const config = registry.config, masTsField = config.getMasterTsField(), fldMap = registry.fieldsMap, ssd = new ma_manager_1.SourceSyncData(registry.mastername, {}, {}, now), instanceObj = registry.masterInstance;
        const delRec = lo.cloneDeep(target);
        delRec[ma_base_1.MasterBaseFields.Deleted] = true;
        delRec[masTsField] = now;
        ssd.deletes[pk] = delRec;
        return ssd;
    }
    static verifyRedisDataWithJson(rc, registry, jsonSourceIds, redisDataMap) {
        function getJsonRecFromRedisData(redisRec) {
            const redisRecClone = lo.cloneDeep(redisRec);
            delete redisRecClone[ma_base_1.MasterBaseFields.Deleted];
            delete redisRecClone[ma_base_1.MasterBaseFields.CreateTs];
            delete redisRecClone[masTsField];
            return redisRecClone;
        }
        const ssd = new ma_manager_1.SourceSyncData(registry.mastername, jsonSourceIds, redisDataMap, Date.now()), config = registry.config, masTsField = config.getMasterTsField();
        lo.forEach(redisDataMap, (redisRec, pk) => {
            const jRef = jsonSourceIds[pk];
            if (!jRef) {
                // record not present in json
                if (redisRec[ma_base_1.MasterBaseFields.Deleted])
                    return; // record is deleted
                ssd.inserts[pk] = getJsonRecFromRedisData(redisRec);
            }
            else {
                if (redisRec[ma_base_1.MasterBaseFields.Deleted]) {
                    if (!jRef[ma_base_1.MasterBaseFields.Deleted])
                        ssd.deletes[pk] = jRef;
                }
                else {
                    if (this.isModified(rc, registry, masTsField, redisRec, jRef))
                        ssd.updates[pk] = getJsonRecFromRedisData(redisRec);
                }
            }
        });
        lo.forEach(jsonSourceIds, (jRef, pk) => {
            const redisRec = redisDataMap[pk];
            if (!redisRec)
                ssd.deletes[pk] = jRef;
        });
        return ssd;
    }
    static isModified(rc, registry, masterTs, ref, src) {
        //debug('isModified', 'all:',allFields , 'own:',ownFields , 'masterTs:',masterTs)
        let res = registry.ownFields.some((key) => {
            if (key === masterTs)
                return false;
            const val = src[key], refVal = ref[key];
            if (registry.optionalFields.indexOf(key) == -1 && lo.isUndefined(val))
                return true;
            return !lo.isEqual(val, refVal);
        });
        //if(res) debug('isModified results 1',src , ref)
        if (res)
            return true;
        res = lo.some(ref, (refval, refKey) => {
            return registry.allFields.indexOf(refKey) === -1;
        });
        //if(res) debug('isModified results 2',src , ref)
        return res;
    }
}
exports.MasterRegistryMgr = MasterRegistryMgr;
MasterRegistryMgr.regMap = {};
//# sourceMappingURL=ma-reg-manager.js.map