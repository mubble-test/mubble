import { Muds } from '../..';
import { RunContextServer } from '../../../rc-server';
export declare class Parent extends Muds.BaseEntity {
    name: string;
    populateDummyValues(rc: RunContextServer): Promise<void>;
}
export declare class KeyValue extends Muds.BaseEntity {
    boolValue: boolean;
    numValue: number;
    strValue: string;
    arValue: string[];
    populateDummyValues(rc: RunContextServer): Promise<void>;
}
export declare function getRandom(arr: any[]): any;
export declare class TestObopay extends Muds.BaseStruct {
    panNo: string;
    adarNo: string;
}
export declare class TestUser extends Muds.BaseEntity {
    email: string;
    mobileNo: string;
    name: string;
    etcInfo: TestObopay;
}
export declare class ChildUser extends Muds.BaseEntity {
    panNo: string;
    name: string;
    dob: number;
}
