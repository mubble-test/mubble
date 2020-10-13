/// <reference types="node" />
import { RunContextBase, LOG_LEVEL, RUN_MODE, InitConfig, RunState, RCLoggerBase, Mubble, MaskingDataParams } from '@mubble/core';
import { MasterMgr } from './master/ma-manager';
export { RUN_MODE, LOG_LEVEL } from '@mubble/core';
export declare class InitConfigServer extends InitConfig {
    accessLog?: boolean | undefined;
    constructor(logLevel?: LOG_LEVEL, tzMin?: number, accessLog?: boolean | undefined);
}
export declare class RunStateServer extends RunState {
    private runIdIndx;
    private stopping;
    getRunIdIndex(): number[];
    isStopping(): boolean;
    setStopping(): boolean;
}
export declare abstract class RunContextServer extends RunContextBase {
    initConfig: InitConfigServer;
    runState: RunStateServer;
    masterMgr: MasterMgr;
    initObj: Mubble.uObject<any>;
    private static initDone;
    static init(minNodeVersion: string): void;
    protected constructor(initConfig: InitConfigServer, runState: RunStateServer, contextId?: string, contextName?: string);
    getMaskingData(): MaskingDataParams[];
    clone(newRc: RunContextServer): void;
    getRunMode(): RUN_MODE;
    executePromise(promise: Promise<any>): void;
    protected getContextId(): string;
    setTimeout(contextName: string, fn: (...args: any[]) => any, ms: number, ...args: any[]): NodeJS.Timeout;
    setInterval(contextName: string, fn: (...args: any[]) => any, ms: number, ...args: any[]): NodeJS.Timeout;
    on(contextName: string, eventObj: any, eventName: string, fn: (...args: any[]) => any): void;
    _runFn(contextName: string, fn: (...args: any[]) => any, args: any[]): void;
    private freeRunId;
    startTraceSpan(id: string): number | undefined;
    endTraceSpan(id: string, ackNum: number | undefined): void;
    abstract isTraceEnabled(): boolean;
}
export declare class RCServerLogger extends RCLoggerBase {
    rc: RunContextServer;
    constructor(rc: RunContextServer);
    logToConsole(level: LOG_LEVEL, logStr: string): void;
}
