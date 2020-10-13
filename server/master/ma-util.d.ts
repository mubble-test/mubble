import { Mubble } from '@mubble/core';
export declare function concat(...args: any[]): string;
export declare function throwError(...args: any[]): void;
export declare function assert(assertion: boolean, ...errorMsg: any[]): void;
export declare function masterDesc(master: string, prop: string, value: any): string;
export declare function log(logId: string, ...args: any[]): void;
export declare function logErr(logId: string, ...args: any[]): void;
export declare namespace MaType {
    function isNumber(x: any): x is number;
    function isString(x: any): x is string;
    function isBoolean(x: any): x is boolean;
    function isObject(x: any): x is object;
    function isNull(x: any): x is null;
    function isPresent<T>(x: any): x is T;
}
export declare namespace FuncUtil {
    function sleep(ms: number): Promise<void>;
    function maArrayMap<T>(arr: T[], mapFn: (rec: T) => {
        key: string;
        value: T;
    }): Mubble.uObject<T>;
    /**
     * Select only those properties from a object which satisfy the criteria
     */
    function reduce<T>(obj: Mubble.uObject<T>, reduceFn: (value: T, key?: string) => boolean): Mubble.uObject<T>;
    function toParseObjectMap(srcObj: Mubble.uObject<string>): Mubble.uObject<object>;
    function toStringifyMap(srcObj: Mubble.uObject<object>): Mubble.uObject<string>;
}
