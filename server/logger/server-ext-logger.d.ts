import { LOG_LEVEL, ExternalLogger } from '@mubble/core';
export declare class RcServerExtLogger extends ExternalLogger {
    private logPath;
    private dateTs;
    private loggerMap;
    private timerId;
    init(logBaseDir?: string): Promise<void>;
    private setRotationTimer;
    private setLogger;
    private getNewFileEntry;
    log(level: LOG_LEVEL, logMsg: string): void;
    sessionLog(sessionLogBuf: string, sessionFileName: string): void;
    accessLog(logBuf: string): void;
    close(): Promise<void>;
}
