"use strict";
/*------------------------------------------------------------------------------
   About      : Base class to be used to persist data in redis and master data verification
   
   Created on : Thu May 25 2017
   Author     : Gaurav Kulshreshtha
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterBase = exports.MasterBaseFields = exports.Master = void 0;
const lo = require("lodash");
const semver = require("semver");
const ma_model_config_1 = require("./ma-model-config");
const ma_reg_manager_1 = require("./ma-reg-manager");
const ma_util_1 = require("./ma-util");
const LOG_ID = 'MasterBase';
function mbLog(...args) {
    ma_util_1.log(LOG_ID, ...args);
}
var Master;
(function (Master) {
    function modelType(config) {
        return function (target) {
            // Make Registry of all the models here
            ma_reg_manager_1.MasterRegistryMgr.addMaster(target, config);
        };
    }
    Master.modelType = modelType;
    let FieldType;
    (function (FieldType) {
        FieldType[FieldType["PRIMARY"] = 1] = "PRIMARY";
        FieldType[FieldType["MANDATORY"] = 2] = "MANDATORY";
        FieldType[FieldType["OPTIONAL"] = 3] = "OPTIONAL";
        //AUTO
    })(FieldType = Master.FieldType || (Master.FieldType = {}));
    function field(type) {
        return function (target, propertyKey) {
            if (!type)
                type = FieldType.MANDATORY;
            ma_reg_manager_1.MasterRegistryMgr.masterField(target, propertyKey, type);
        };
    }
    Master.field = field;
    function primaryKey() {
        return function (target, propertyKey) {
            ma_reg_manager_1.MasterRegistryMgr.masterField(target, propertyKey, FieldType.PRIMARY);
        };
    }
    Master.primaryKey = primaryKey;
    // Class level rule
    function validityRule(validFromFld, validTillFld) {
        return function (target) {
        };
    }
    Master.validityRule = validityRule;
    // field level Rule
    function versionField(prototype, propKey) {
        function versionFieldCheck(rec) {
            const mastername = prototype.constructor.name;
            const val = rec[propKey];
            ma_util_1.assert(!val || semver.valid(val) != null, ma_util_1.masterDesc(mastername, propKey, val), 'is not a version field');
        }
        ma_reg_manager_1.MasterRegistryMgr.fieldValidationRule(prototype, propKey, versionFieldCheck);
    }
    Master.versionField = versionField;
    function withinList(list) {
        return function (prototype, propKey) {
            function withinListCheck(rec) {
                const mastername = prototype.constructor.name;
                const val = rec[propKey];
                ma_util_1.assert(val != null, ma_util_1.masterDesc(mastername, propKey, val), 'is null');
                ma_util_1.assert(list.indexOf(val) != -1, ma_util_1.masterDesc(mastername, propKey, val), 'not in list', list.toString());
            }
            ma_reg_manager_1.MasterRegistryMgr.fieldValidationRule(prototype, propKey, withinListCheck);
        };
    }
    Master.withinList = withinList;
    function objPropertiesIn(list) {
        return function (prototype, propKey) {
            ma_util_1.assert(list.length > 0, 'Object Properties is empty');
            function objPropertiesInCheck(rec) {
                const mastername = prototype.constructor.name;
                const val = rec[propKey];
                ma_util_1.assert(ma_util_1.MaType.isObject(val) != null, ma_util_1.masterDesc(mastername, propKey, val), 'is not an object');
                for (const key of Object.keys(val)) {
                    ma_util_1.assert(list.indexOf(key) !== -1, ma_util_1.masterDesc(mastername, propKey, val), 'key:', key, 'is missing in the properties list', list);
                }
            }
            ma_reg_manager_1.MasterRegistryMgr.fieldValidationRule(prototype, propKey, objPropertiesInCheck);
        };
    }
    Master.objPropertiesIn = objPropertiesIn;
    function objectStructure(struc) {
        return function (prototype, propKey) {
            function objectStructureCheck(rec) {
                const mastername = prototype.constructor.name;
                const val = rec[propKey];
                ma_util_1.assert(val != null, ma_util_1.masterDesc(mastername, propKey, val), 'is null');
                ma_util_1.assert(false, 'Todo: Not Done Yet');
                // This is wrong. Have to check each field manually , recursively
                //assert( val instanceof struc , masterDesc(mastername,propKey,val) , 'is null')  
            }
            ma_reg_manager_1.MasterRegistryMgr.fieldValidationRule(prototype, propKey, objectStructureCheck);
        };
    }
    Master.objectStructure = objectStructure;
    function inRange(minVal, maxVal, defaultIgnoreVal) {
        return function (prototype, propKey) {
            function inRangeCheck(rec) {
                const mastername = prototype.constructor.name;
                const val = rec[propKey];
                if (defaultIgnoreVal != null && val === defaultIgnoreVal)
                    return;
                ma_util_1.assert(val >= minVal && val <= maxVal, ma_util_1.masterDesc(mastername, propKey, val), 'Not in range', minVal + '-' + maxVal, rec);
            }
            ma_reg_manager_1.MasterRegistryMgr.fieldValidationRule(prototype, propKey, inRangeCheck);
        };
    }
    Master.inRange = inRange;
    function getDefaultConfig(segment, fk, fileSource) {
        //const masConfig : ModelConfig = new MasterModelConfig('Sample')
        const masConfig = new class TestModelConfig extends ma_model_config_1.MasterModelConfig {
            constructor() {
                super('Sample');
                this.segment = segment;
                if (ma_util_1.MaType.isObject(fk))
                    this.fkConstrains = fk;
                this.hasFileSource = fileSource !== undefined ? fileSource : true;
                this.cache = true;
            }
        };
        //return {segment : segment , startVersion : startVersion , endVersion : endVersion , fkConstrains : fk }
        return masConfig;
    }
    Master.getDefaultConfig = getDefaultConfig;
})(Master = exports.Master || (exports.Master = {}));
exports.MasterBaseFields = {
    Deleted: 'deleted',
    CreateTs: 'createTs',
    ModTs: 'modTs'
};
class MasterBase {
    constructor(context, masterName) {
        // RunContextServer should have the redis instance 
        this._rc = context;
        this._mastername = masterName;
    }
    async verifyRecord(rc, newObj, oldObj) {
        return true;
    }
    // Each master can override this
    verifyAllDependency(context, masterCache) {
        return;
    }
    syncGetModifications(context, oRet) {
        return oRet;
    }
    matchSegment(context, arClientSeg, colSeg, rec) {
        if (!colSeg || !colSeg.length)
            return true; // No segment
        const arrVal = colSeg.map((val) => rec[val]);
        return !!arClientSeg.find((seg) => {
            return lo.isEqual(seg, arrVal);
        });
    }
    static matchSegmentStartEndVersion(rc, arClientSeg, colSeg, rec) {
        if (!Array.isArray(arClientSeg) || !Array.isArray(arClientSeg[0]))
            return false;
        const clientVersion = arClientSeg[0][0];
        if (semver.lt(clientVersion, rec.startVersion))
            return false;
        if (rec.endVersion && semver.gt(clientVersion, rec.endVersion))
            return false;
        return true;
    }
}
__decorate([
    Master.field(),
    __metadata("design:type", Number)
], MasterBase.prototype, "createTs", void 0);
__decorate([
    Master.field(),
    __metadata("design:type", Number)
], MasterBase.prototype, "modTs", void 0);
__decorate([
    Master.field(),
    __metadata("design:type", Boolean)
], MasterBase.prototype, "deleted", void 0);
exports.MasterBase = MasterBase;
//# sourceMappingURL=ma-base.js.map