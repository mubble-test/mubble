"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncUtil = exports.MaType = exports.logErr = exports.log = exports.masterDesc = exports.assert = exports.throwError = exports.concat = void 0;
/*------------------------------------------------------------------------------
   About      : Utility functions for Master Module
   
   Created on : Fri Jun 02 2017
   Author     : Gaurav Kulshreshtha
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
const lo = require("lodash");
const LOG_ID = 'Master-Util';
function concat(...args) {
    let buff = '';
    args.forEach((item) => {
        buff += typeof (item) !== 'object' ? item + ' ' : JSON.stringify(item) + ' ';
    });
    return buff;
}
exports.concat = concat;
function throwError(...args) {
    throw new Error(concat(...args));
}
exports.throwError = throwError;
// assertion 
function assert(assertion, ...errorMsg) {
    if (assertion)
        return;
    const errStr = concat(...errorMsg);
    logErr(LOG_ID, errStr);
    //log(LOG_ID , new Error().stack)
    throw (new Error(errStr));
}
exports.assert = assert;
// Util logging function
// short desc of master property
function masterDesc(master, prop, value) {
    return `master:${master} property:${prop} value:${value}`;
}
exports.masterDesc = masterDesc;
// Logging
function log(logId, ...args) {
    console.log(logId, ...args);
}
exports.log = log;
function logErr(logId, ...args) {
    console.trace(logId, ...args);
}
exports.logErr = logErr;
// type checking
var MaType;
(function (MaType) {
    function isNumber(x) {
        return typeof x === "number";
    }
    MaType.isNumber = isNumber;
    function isString(x) {
        return typeof x === "string";
    }
    MaType.isString = isString;
    function isBoolean(x) {
        return typeof x === "boolean";
    }
    MaType.isBoolean = isBoolean;
    function isObject(x) {
        return typeof x === "object";
    }
    MaType.isObject = isObject;
    function isNull(x) {
        return (x === null);
    }
    MaType.isNull = isNull;
    function isPresent(x) {
        return !(x === undefined);
    }
    MaType.isPresent = isPresent;
})(MaType = exports.MaType || (exports.MaType = {}));
var FuncUtil;
(function (FuncUtil) {
    async function sleep(ms) {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(ms);
            }, ms);
        });
    }
    FuncUtil.sleep = sleep;
    // create a map from array based on mapping function for each item
    function maArrayMap(arr, mapFn) {
        const res = {};
        arr.forEach((item) => {
            const val = mapFn(item);
            res[val.key] = val.value;
        });
        return res;
    }
    FuncUtil.maArrayMap = maArrayMap;
    /**
     * Select only those properties from a object which satisfy the criteria
     */
    function reduce(obj, reduceFn) {
        return lo.reduce(obj, (memo, value, key) => {
            // If key value pairs satisfy the condition
            // set them in result function
            if (reduceFn(value, key))
                memo[key] = value;
            return memo;
        }, {});
    }
    FuncUtil.reduce = reduce;
    /*
    // Object to map
    export function toMap<T>(obj : Mubble.uObject<T> ) : Map<string , T> {
      const map : Map<string , T> = new Map()
      lo.forEach(obj , (value : T , key : string)=>{
        map.set(key , value)
      })
      return map
    }
  
   // Map to object
   export function toObject<T> (map : Map<string , T>) : Mubble.uObject<T> {
    const res : Mubble.uObject<T> = {}
  
    map.forEach((value : T , key : string)=>{
      res[key] = value
    })
  
    return res
   }
   */
    function toParseObjectMap(srcObj) {
        return lo.mapValues(srcObj, (val) => {
            return JSON.parse(val);
        });
    }
    FuncUtil.toParseObjectMap = toParseObjectMap;
    function toStringifyMap(srcObj) {
        return lo.mapValues(srcObj, (val) => {
            return JSON.stringify(val);
        });
    }
    FuncUtil.toStringifyMap = toStringifyMap;
})(FuncUtil = exports.FuncUtil || (exports.FuncUtil = {}));
//# sourceMappingURL=ma-util.js.map