"use strict";
/*------------------------------------------------------------------------------
   About      : Logger Utility Class
   
   Created on : Thu Jun 15 2017
   Author     : Gaurav Kulshreshtha
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.RcServerExtLogger = void 0;
const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");
const core_1 = require("@mubble/core");
const ONE_DAY_MS = 1 * 24 * 60 * 60 * 1000, ONE_MINUTE_MS = 1 * 60 * 1000;
const TZ_OFF_SET = -330;
const ROTATION = {
    PER_DAY: { TIMESTAMP_FORMAT: '%yy%-%mm%-%dd%', MS: ONE_DAY_MS },
    PER_MINUTE: { TIMESTAMP_FORMAT: '%yy%-%mm%-%dd%-%hh%:%MM%', MS: ONE_MINUTE_MS },
    PER_FIVE_MINUTE: { TIMESTAMP_FORMAT: '%yy%-%mm%-%dd%-%hh%:%MM%', MS: ONE_MINUTE_MS * 5 }
};
const ROTATION_LOGIC = 'PER_DAY';
const LOG_LEVEL_ACCESS = 10;
const Log_Level_Map = [];
class RcServerExtLogger extends core_1.ExternalLogger {
    constructor() {
        super(...arguments);
        this.dateTs = '';
        this.loggerMap = [];
    }
    async init(logBaseDir) {
        this.logPath = logBaseDir ? logBaseDir : path.join(process.cwd(), 'log');
        await mkdirp.sync(path.join(this.logPath, 'debug'));
        await mkdirp.sync(path.join(this.logPath, 'error'));
        await mkdirp.sync(path.join(this.logPath, 'access'));
        await mkdirp.sync(path.join(this.logPath, 'session'));
        Log_Level_Map[core_1.LOG_LEVEL.DEBUG] = [core_1.LOG_LEVEL.DEBUG];
        Log_Level_Map[core_1.LOG_LEVEL.STATUS] = [core_1.LOG_LEVEL.DEBUG];
        Log_Level_Map[core_1.LOG_LEVEL.WARN] = [core_1.LOG_LEVEL.DEBUG, core_1.LOG_LEVEL.ERROR];
        Log_Level_Map[core_1.LOG_LEVEL.ERROR] = [core_1.LOG_LEVEL.DEBUG, core_1.LOG_LEVEL.ERROR];
        // No logging for Log level NONE
        Log_Level_Map[core_1.LOG_LEVEL.NONE] = [];
        Log_Level_Map[LOG_LEVEL_ACCESS] = [LOG_LEVEL_ACCESS];
        this.setLogger();
    }
    setRotationTimer() {
        const currDate = new Date(), currTime = currDate.getTime() + (currDate.getTimezoneOffset() - TZ_OFF_SET) * 60 * 1000;
        const rem = ROTATION[ROTATION_LOGIC].MS - (currTime % ROTATION[ROTATION_LOGIC].MS);
        //console.log('setRotationTimer ', format(new Date(), '%dd%/%mm% %hh%:%MM%:%ss%.%ms%' , TZ_OFF_SET) , rem , Date.now())
        this.timerId = setTimeout(this.setLogger.bind(this), rem + 2000); // +2 second to be on safe side
    }
    setLogger() {
        const dateStr = core_1.format(new Date(), ROTATION[ROTATION_LOGIC].TIMESTAMP_FORMAT, TZ_OFF_SET);
        //console.log('date str is ',dateStr , this.dateTs , format(new Date(), '%dd%/%mm% %hh%:%MM%:%ss%.%ms%' , TZ_OFF_SET) )
        if (dateStr === this.dateTs) {
            this.setRotationTimer();
            return;
        }
        this.dateTs = dateStr;
        const oldLoggerMap = this.loggerMap;
        this.loggerMap = [];
        const debugLogEntry = this.getNewFileEntry(dateStr, 'debug'), errLogentry = this.getNewFileEntry(dateStr, 'error'), accLogEntry = this.getNewFileEntry(dateStr, 'access');
        this.loggerMap[core_1.LOG_LEVEL.DEBUG] = debugLogEntry;
        this.loggerMap[core_1.LOG_LEVEL.ERROR] = errLogentry;
        this.loggerMap[LOG_LEVEL_ACCESS] = accLogEntry;
        oldLoggerMap.forEach((entry) => {
            if (entry)
                entry.closeEntry();
        });
        this.setRotationTimer();
    }
    getNewFileEntry(dateStr, loglevel) {
        const filename = path.join(this.logPath, loglevel, dateStr) + '.log';
        return new FileEntry(filename, dateStr);
    }
    log(level, logMsg) {
        const loggerIndexes = Log_Level_Map[level];
        loggerIndexes.forEach((index) => {
            const entry = this.loggerMap[index];
            if (!entry) {
                // most probabaly roration is in place
                console.error('logger entry not found ', level, logMsg);
                return;
            }
            const stream = entry.stream;
            if (!entry.destroyed && stream) {
                // Todo : Put try catch
                stream.write(logMsg + '\n');
            }
            else {
                // create again the stream which might have been closed
                if (entry.destroyed) {
                    console.error('entry destroyed', logMsg);
                    return;
                }
                else if (!stream) {
                    console.error('write stream closed. creating again', entry.fileName);
                    if (entry.createStream(entry.fileName)) {
                        entry.stream.write(logMsg + '\n');
                    }
                }
            }
        });
    }
    sessionLog(sessionLogBuf, sessionFileName) {
        const filename = path.join(this.logPath, 'session', sessionFileName) + '.log';
        fs.writeFile(filename, sessionLogBuf, { flag: 'a' }, (err) => {
            if (err) {
                console.error('log writing error', err);
            }
        });
    }
    accessLog(logBuf) {
        this.log(LOG_LEVEL_ACCESS, logBuf);
    }
    async close() {
        for (const entry of this.loggerMap) {
            if (entry)
                await entry.closeStream();
        }
        clearTimeout(this.timerId);
    }
}
exports.RcServerExtLogger = RcServerExtLogger;
class FileEntry {
    constructor(filename, dateStr) {
        this.fileName = filename;
        this.dateStr = dateStr;
        this.destroyed = false;
        this.createStream(this.fileName);
    }
    createStream(filename) {
        let stream = null;
        try {
            stream = fs.createWriteStream(filename, { flags: 'a' });
            stream.on('error', (err) => {
                console.error('received error:' + err, 'while writing log:' + this.fileName);
                if (this.stream) {
                    try {
                        this.stream.close();
                    }
                    catch (err) {
                        console.error('stream closing error ', err, this.fileName);
                    }
                }
                this.stream = null;
            });
        }
        catch (err) {
            console.error('Write stream creation error ', err, filename);
            return null;
        }
        this.stream = stream;
        return stream;
    }
    async closeEntry() {
        //console.log('closing entry',this.fileName)
        try {
            this.destroyed = true;
            this.fileName = null;
            this.dateStr = null;
            if (this.stream) {
                this.stream.end();
                this.stream.close();
                this.stream = null;
            }
        }
        catch (err) {
            console.error('received error:' + err, 'while closing log file:' + this.fileName);
        }
    }
    async closeStream() {
        try {
            await this.stream.close();
        }
        catch (err) {
            console.log('stream closure failure', this.fileName);
        }
        this.destroyed = true;
        this.fileName = null;
        this.dateStr = null;
    }
}
//# sourceMappingURL=server-ext-logger.js.map