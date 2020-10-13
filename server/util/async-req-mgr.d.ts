import { RunContextServer } from '../rc-server';
export declare type NcAsyncReq = {
    id: string;
    reqTs: number;
    rc: RunContextServer;
    func: any;
    args: any[];
    resolve: (val: any) => void;
    reject: (val: any) => void;
};
export declare class AsyncReqManager {
    private rc;
    private name;
    private maxParallelReqCount;
    private load?;
    private static k;
    private static buff;
    private requests;
    private activeReqCount;
    private startTimeEntries;
    private promiseArr;
    constructor(rc: RunContextServer, name: string, maxParallelReqCount: number, load?: {
        count: number;
        duration: number;
    } | undefined);
    makeRequest<T>(rc: RunContextServer, asyncFunc: (...args: any[]) => Promise<T>, thisObj: any, ...funcArgs: any[]): Promise<T>;
    waitTillAllFinished(): Promise<void>;
    canStartRequest(rc: RunContextServer): NcAsyncReq;
    private startRequest;
    private finish;
    reset(): void;
}
