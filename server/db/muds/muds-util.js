"use strict";
/*------------------------------------------------------------------------------
   About      : Utility functions used in Muds
   
   Created on : Mon Jun 18 2018
   Author     : Raghvendra Varma
   
   Copyright (c) 2018 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.MudsUtil = void 0;
const muds_1 = require("./muds");
class MudsUtil {
    static isClassStruct(cls) {
        return muds_1.Muds.BaseStruct.prototype.isPrototypeOf(cls.prototype);
    }
    // Either array or a field can be MudsStruct
    static getStructClass(me) {
        if (MudsUtil.isClassStruct(me.fieldType))
            return me.fieldType;
        if (me.fieldType === Array && MudsUtil.isClassStruct(me.typeHint))
            return me.typeHint;
        return null;
    }
    // verifies in a dotted field whether the whole path is indexed
    static checkIndexed(rc, entityInfoMap, dottedStr, inEntityName) {
        const props = dottedStr.split('.');
        let entityName = inEntityName, meField;
        for (let index = 0; index < props.length; index++) {
            const prop = props[index], info = entityInfoMap[entityName];
            rc.isAssert() && rc.assert(rc.getName(this), info, `'${entityName}' is not found in entityInfo. Used in '${dottedStr}' of entity '${inEntityName}'`);
            meField = info.fieldMap[prop];
            const Cls = this.getStructClass(meField);
            rc.isAssert() && rc.assert(rc.getName(this), meField.indexed, `'${prop}' is not indexed in path '${dottedStr}' of entity '${inEntityName}'`);
            !Cls && rc.isAssert() && rc.assert(rc.getName(this), index === props.length - 1, `'${prop}' is not indexed in path '${dottedStr}' of entity '${inEntityName}'`);
            if (Cls)
                entityName = Cls.name;
        }
        return meField;
    }
    static getReferredField(rc, entityInfoMap, dottedStr, inEntityName) {
        return this.checkIndexed(rc, entityInfoMap, dottedStr, inEntityName);
    }
    static getMpoc(ts) {
        return MudsUtil.targetDateTs - (ts || Date.now());
    }
    static getUniques(rc, entity, uniques, prefix) {
        const entityInfo = entity.getInfo();
        for (const fieldName of entityInfo.fieldNames) {
            const meField = entityInfo.fieldMap[fieldName];
            let value = entity[fieldName];
            if (value && meField.unique) {
                const uniqueKey = prefix ? `${prefix}.${meField.fieldName}` : meField.fieldName, Cls = MudsUtil.getStructClass(meField);
                if (Cls && meField.indexed) {
                    value = meField.fieldType === Array ? value : [value];
                    value.forEach((struct) => this.getUniques(rc, struct, uniques, uniqueKey));
                }
                uniques.push({ entity: entity, key: uniqueKey, value: value });
            }
        }
        return uniques.length;
    }
}
exports.MudsUtil = MudsUtil;
MudsUtil.targetDateTs = 2544912000000; //24-8-2050 (GMT)
//# sourceMappingURL=muds-util.js.map