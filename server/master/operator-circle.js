"use strict";
/*------------------------------------------------------------------------------
   About      : Dummy Master Data Classes using master decorators
   
   Created on : Thu Jun 01 2017
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
var Operator_1, Circle_1, OperatorCircle_1, SampleOperatorPlan_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleOperatorPlan = exports.OperatorCircle = exports.Circle = exports.Operator = void 0;
const ma_base_1 = require("./ma-base");
let Operator = Operator_1 = class Operator extends ma_base_1.MasterBase {
    constructor(opr) {
        super(null, Operator_1.constructor.name.toLowerCase());
        this.name = opr;
    }
};
__decorate([
    ma_base_1.Master.primaryKey(),
    __metadata("design:type", String)
], Operator.prototype, "name", void 0);
Operator = Operator_1 = __decorate([
    ma_base_1.Master.modelType(ma_base_1.Master.getDefaultConfig()),
    __metadata("design:paramtypes", [String])
], Operator);
exports.Operator = Operator;
let Circle = Circle_1 = class Circle extends ma_base_1.MasterBase {
    constructor(circle) {
        super(null, Circle_1.constructor.name.toLowerCase());
        this.name = circle;
    }
};
__decorate([
    ma_base_1.Master.primaryKey(),
    __metadata("design:type", String)
], Circle.prototype, "name", void 0);
Circle = Circle_1 = __decorate([
    ma_base_1.Master.modelType(ma_base_1.Master.getDefaultConfig()),
    __metadata("design:paramtypes", [String])
], Circle);
exports.Circle = Circle;
let OperatorCircle = OperatorCircle_1 = class OperatorCircle extends ma_base_1.MasterBase {
    constructor(opr, cir) {
        super(null, OperatorCircle_1.constructor.name.toLowerCase());
        this.operator = opr;
        this.circle = cir;
    }
};
__decorate([
    ma_base_1.Master.primaryKey(),
    __metadata("design:type", String)
], OperatorCircle.prototype, "operator", void 0);
__decorate([
    ma_base_1.Master.primaryKey(),
    __metadata("design:type", String)
], OperatorCircle.prototype, "circle", void 0);
OperatorCircle = OperatorCircle_1 = __decorate([
    ma_base_1.Master.modelType(ma_base_1.Master.getDefaultConfig(undefined, {
        operator: { name: 'operator' },
        circle: { name: 'circle' }
    })),
    __metadata("design:paramtypes", [String, String])
], OperatorCircle);
exports.OperatorCircle = OperatorCircle;
let SampleOperatorPlan = SampleOperatorPlan_1 = class SampleOperatorPlan extends ma_base_1.MasterBase {
    constructor() {
        super(null, SampleOperatorPlan_1.constructor.name.toLowerCase());
    }
};
// Please declare your primary keys first
// ensure that you observe the order of keys
// order of keys once declared cannot be changed
SampleOperatorPlan.checksum = '7543a7ad90a863d71d04173bfb552e20280676e7';
__decorate([
    ma_base_1.Master.primaryKey(),
    __metadata("design:type", String)
], SampleOperatorPlan.prototype, "operator", void 0);
__decorate([
    ma_base_1.Master.primaryKey(),
    __metadata("design:type", String)
], SampleOperatorPlan.prototype, "circle", void 0);
__decorate([
    ma_base_1.Master.primaryKey(),
    __metadata("design:type", Number)
], SampleOperatorPlan.prototype, "rc", void 0);
__decorate([
    ma_base_1.Master.primaryKey(),
    __metadata("design:type", String)
], SampleOperatorPlan.prototype, "mode", void 0);
__decorate([
    ma_base_1.Master.field(),
    __metadata("design:type", Object)
], SampleOperatorPlan.prototype, "currentPlan", void 0);
__decorate([
    ma_base_1.Master.field(ma_base_1.Master.FieldType.OPTIONAL),
    __metadata("design:type", Object)
], SampleOperatorPlan.prototype, "currentPlanEdited", void 0);
__decorate([
    ma_base_1.Master.field(),
    ma_base_1.Master.inRange(2000, 2018),
    __metadata("design:type", Number)
], SampleOperatorPlan.prototype, "validFrom", void 0);
__decorate([
    ma_base_1.Master.field(),
    __metadata("design:type", Number)
], SampleOperatorPlan.prototype, "validTill", void 0);
SampleOperatorPlan = SampleOperatorPlan_1 = __decorate([
    ma_base_1.Master.modelType(ma_base_1.Master.getDefaultConfig(undefined, {
        operator: { name: 'operator' },
        circle: { name: 'circle' },
        operatorCircle: { operator: 'operator', circle: 'circle' }
    })),
    __metadata("design:paramtypes", [])
], SampleOperatorPlan);
exports.SampleOperatorPlan = SampleOperatorPlan;
//# sourceMappingURL=operator-circle.js.map