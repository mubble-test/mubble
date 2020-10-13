"use strict";
/*------------------------------------------------------------------------------
   About      : Models Used for Testing
   
   Created on : Fri Jun 29 2018
   Author     : Akash Dathan
   
   Copyright (c) 2018 Mubble Networks Private Limited. All rights reserved.
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
exports.ChildUser = exports.TestUser = exports.TestObopay = exports.getRandom = exports.KeyValue = exports.Parent = void 0;
const __1 = require("../..");
let Parent = class Parent extends __1.Muds.BaseEntity {
    async populateDummyValues(rc) {
        const strValues = ['a', 'b', 'c'];
        this.name = getRandom(strValues);
    }
};
__decorate([
    __1.Muds.indexed(__1.Muds.Opt),
    __metadata("design:type", String)
], Parent.prototype, "name", void 0);
Parent = __decorate([
    __1.Muds.entity(1, __1.Muds.Pk.Auto)
], Parent);
exports.Parent = Parent;
let KeyValue = class KeyValue extends __1.Muds.BaseEntity {
    async populateDummyValues(rc) {
        const boolValues = [true, false], strValues = ['a', 'b', 'c'];
        this.boolValue = getRandom(boolValues);
        this.numValue = Math.floor(Math.random() * 90 + 10);
        this.strValue = getRandom(strValues);
        this.arValue = strValues;
    }
};
__decorate([
    __1.Muds.field(__1.Muds.Opt),
    __metadata("design:type", Boolean)
], KeyValue.prototype, "boolValue", void 0);
__decorate([
    __1.Muds.indexed(__1.Muds.Opt),
    __metadata("design:type", Number)
], KeyValue.prototype, "numValue", void 0);
__decorate([
    __1.Muds.unique(__1.Muds.Opt),
    __metadata("design:type", String)
], KeyValue.prototype, "strValue", void 0);
__decorate([
    __1.Muds.field(__1.Muds.Opt, String),
    __metadata("design:type", Array)
], KeyValue.prototype, "arValue", void 0);
KeyValue = __decorate([
    __1.Muds.entity(1, __1.Muds.Pk.Auto),
    __1.Muds.ancestors(Parent),
    __1.Muds.compositeIndex({ numValue: __1.Muds.Asc, strValue: __1.Muds.Dsc })
], KeyValue);
exports.KeyValue = KeyValue;
function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
exports.getRandom = getRandom;
let TestObopay = class TestObopay extends __1.Muds.BaseStruct {
};
__decorate([
    __1.Muds.unique(__1.Muds.Man),
    __metadata("design:type", String)
], TestObopay.prototype, "panNo", void 0);
__decorate([
    __1.Muds.unique(__1.Muds.Man),
    __metadata("design:type", String)
], TestObopay.prototype, "adarNo", void 0);
TestObopay = __decorate([
    __1.Muds.struct()
], TestObopay);
exports.TestObopay = TestObopay;
let TestUser = class TestUser extends __1.Muds.BaseEntity {
};
__decorate([
    __1.Muds.unique(__1.Muds.Man),
    __metadata("design:type", String)
], TestUser.prototype, "email", void 0);
__decorate([
    __1.Muds.unique(__1.Muds.Man),
    __metadata("design:type", String)
], TestUser.prototype, "mobileNo", void 0);
__decorate([
    __1.Muds.field(__1.Muds.Opt),
    __metadata("design:type", String)
], TestUser.prototype, "name", void 0);
__decorate([
    __1.Muds.indexed(__1.Muds.Man),
    __metadata("design:type", TestObopay)
], TestUser.prototype, "etcInfo", void 0);
TestUser = __decorate([
    __1.Muds.entity(1, __1.Muds.Pk.Auto)
], TestUser);
exports.TestUser = TestUser;
let ChildUser = class ChildUser extends __1.Muds.BaseEntity {
};
__decorate([
    __1.Muds.unique(__1.Muds.Man),
    __metadata("design:type", String)
], ChildUser.prototype, "panNo", void 0);
__decorate([
    __1.Muds.field(__1.Muds.Man),
    __metadata("design:type", String)
], ChildUser.prototype, "name", void 0);
__decorate([
    __1.Muds.field(__1.Muds.Opt),
    __metadata("design:type", Number)
], ChildUser.prototype, "dob", void 0);
ChildUser = __decorate([
    __1.Muds.entity(1, __1.Muds.Pk.Auto),
    __1.Muds.ancestors(TestUser)
], ChildUser);
exports.ChildUser = ChildUser;
/* ---------------------------------------------------------------------------
   C L I    C O M M A N D S
-----------------------------------------------------------------------------*/
/*

function await(pr) {
  pr.then(result => {
    global['_pr'] = result
  })
}
var Muds = require('@mubble/server').Muds
var Entities = require('./build/muds-entities/index.js')
var di = new Muds.DirectIo($.rc, Muds.manager)


var q = di.query(Entities.UserKeyValue)
q.filter('childValue.inNum', '=', 1)



var uk = di.getForInsert(Entities.UserKeyValue, Muds.getIntKey(1), Muds.getIntKey(2))

uk.boolValue = false
uk.strValue  = 'a'
uk.arValue = ['a']
uk.childValue = di.newStruct(Entities.ChildEntity)
uk.childValue.inNum = 1
uk.childValue.unStr = 'c'

uk.$dump()
await(di.upsert(uk))




var queue = di.getterQueue()
queue.add(Entities.UserKeyValue, Muds.getIntKey(1), Muds.getIntKey(2), Muds.getIntKey(3))
queue.add(Entities.UserKeyValue, Muds.getIntKey(1), Muds.getIntKey(2), Muds.getIntKey('5629499534213120'))
await(di.getEntities(queue))



var uk = di.getForInsert(Entities.UserKeyValue, Muds.getIntKey(1), Muds.getIntKey(2), Muds.getIntKey(7))
await(di.upsert(uk))


q.filter('childValue.inNum', '=', 1)
q.filter('arIdx.inNum', '=', 11)

var q = di.query(Entities.UserKeyValue)
await(q.run(10))

var entities = _pr.getCurrentRecs()
var uk = entities[0]

uk.arIdx[0].inNum = 11
uk.$dump()

await(di.upsert(uk))


_pr.$dump()
await(di.delete(...entities))
*/ 
//# sourceMappingURL=models.js.map