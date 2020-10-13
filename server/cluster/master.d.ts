/// <reference types="node" />
import * as cluster from 'cluster';
import { Mubble } from '@mubble/core';
import { CONFIG } from './config';
import { RunContextServer } from '../rc-server';
/**
 * This is the first API called. It start the platform with given configuration
 * @param minNodeVersion    Verify the node version before running
 * @param config            Configuration for the platform
 */
export declare function startCluster(rc: RunContextServer, config: CONFIG, initObj?: Mubble.uObject<any>): Promise<boolean>;
export declare function isClusterMaster(): boolean;
export declare function getWorkerIndex(): number;
export declare function getWorkerRestartCount(): number;
export declare class ClusterMaster {
    private workers;
    private userInfo;
    private config;
    private workerInitObj;
    constructor();
    start(rc: RunContextServer, config: CONFIG, initObj?: Mubble.uObject<any>): Promise<void>;
    validateConfig(rc: RunContextServer): void;
    checkRunning(rc: RunContextServer): Promise<void>;
    private createLockFile;
    private runCmdPS_P;
    private execCmd;
    startWorkers(rc: RunContextServer): void;
    eventWorkerExit(rc: RunContextServer, worker: cluster.Worker, code: number, signal: string): any;
    eventWorkerOnline(rc: RunContextServer, worker: cluster.Worker): any;
    eventWorkerMessage(rc: RunContextServer, worker: cluster.Worker, msg: any): any;
    private findWorkerInfo;
}
export declare const clusterMaster: ClusterMaster;
