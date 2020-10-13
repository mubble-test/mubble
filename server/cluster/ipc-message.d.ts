/// <reference types="node" />
import * as cluster from 'cluster';
import { Mubble } from '@mubble/core';
export declare const CODE: {
    VOLUNTARY_DEATH: number;
};
export declare abstract class BaseIpcMsg {
    id: string;
    constructor(id: string);
    send(worker: cluster.Worker | null): void;
}
export declare class CWInitializeWorker extends BaseIpcMsg {
    workerIndex: number;
    runMode: number;
    restartCount: number;
    initObj: Mubble.uObject<any>;
    constructor(workerIndex: number, runMode: number, restartCount: number, initObj: Mubble.uObject<any>);
}
export declare class CWRequestStop extends BaseIpcMsg {
    constructor();
}
export declare class WCRequestReplace extends BaseIpcMsg {
    constructor();
}
