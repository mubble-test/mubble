import { MasterBase } from './ma-base';
export declare class Operator extends MasterBase {
    name: string;
    constructor(opr: string);
}
export declare class Circle extends MasterBase {
    name: string;
    constructor(circle: string);
}
export declare class OperatorCircle extends MasterBase {
    operator: string;
    circle: string;
    constructor(opr: string, cir: string);
}
export declare class SampleOperatorPlan extends MasterBase {
    static checksum: string;
    operator: string;
    circle: string;
    rc: number;
    mode: string;
    currentPlan: object;
    currentPlanEdited: object;
    validFrom: number;
    validTill: number;
    constructor();
}
