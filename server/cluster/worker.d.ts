import { CONFIG } from './config';
import { RunContextServer } from '../rc-server';
export declare class ClusterWorker {
    workerIndex: number;
    restartCount: number;
    private pendingInitResolve;
    private config;
    constructor();
    start(rc: RunContextServer, config: CONFIG): Promise<void>;
    onMessage(rc: RunContextServer, msg: any): string | false | undefined;
    voluntaryExit(rc: RunContextServer): void;
}
export declare const clusterWorker: ClusterWorker;
