"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Thu Apr 13 2017
   Author     : Raghvendra Varma
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.RCServerLogger = exports.RunContextServer = exports.RunStateServer = exports.InitConfigServer = void 0;
const core_1 = require("@mubble/core");
const semver = require("semver");
const lo = require("lodash");
// Import from external modules without types
const colors = require('colors/safe'); // https://github.com/marak/colors.js/
colors.setTheme({
    DEBUG: 'grey',
    WARN: 'magenta',
    ERROR: 'red'
});
const CONS = "BCDFGHJKLMNPQRSTVWXYZ", VOWS = "AEIOU";
var core_2 = require("@mubble/core");
Object.defineProperty(exports, "RUN_MODE", { enumerable: true, get: function () { return core_2.RUN_MODE; } });
Object.defineProperty(exports, "LOG_LEVEL", { enumerable: true, get: function () { return core_2.LOG_LEVEL; } });
class InitConfigServer extends core_1.InitConfig {
    constructor(logLevel, tzMin, accessLog) {
        super(logLevel || core_1.LOG_LEVEL.STATUS, !!process.stdout.isTTY, tzMin);
        this.accessLog = accessLog;
        if (accessLog === undefined)
            this.accessLog = true;
    }
}
exports.InitConfigServer = InitConfigServer;
class RunStateServer extends core_1.RunState {
    constructor() {
        super(...arguments);
        this.runIdIndx = [lo.random(0, CONS.length - 1),
            lo.random(0, VOWS.length - 1),
            lo.random(0, CONS.length - 1)];
        // mark worker is going down via this variable
        this.stopping = false;
    }
    getRunIdIndex() {
        return this.runIdIndx;
    }
    isStopping() {
        return this.stopping;
    }
    setStopping() {
        return this.stopping === true;
    }
}
exports.RunStateServer = RunStateServer;
class RunContextServer extends core_1.RunContextBase {
    constructor(initConfig, runState, contextId, contextName) {
        super(initConfig, runState, contextId, contextName);
        this.initConfig = initConfig;
        this.runState = runState;
    }
    static init(minNodeVersion) {
        if (!semver.gte(process.version, minNodeVersion)) {
            throw (`Node version mismatch. Needed:${minNodeVersion} found:${process.version}`);
        }
        RunContextServer.initDone = true;
    }
    getMaskingData() {
        return [];
    }
    clone(newRc) {
        newRc.initObj = this.initObj;
        super.clone(newRc);
    }
    getRunMode() {
        return this.initConfig.runMode;
    }
    executePromise(promise) {
        promise.then((ret) => {
            this.freeRunId();
            return ret;
        }, (err) => {
            this.isError() && this.error(this.getName(this), 'Run context', this.contextId, 'failed with error', err);
            this.freeRunId();
            throw (err);
        });
    }
    getContextId() {
        const arRunIndex = this.runState.getRunIdIndex(), contextId = CONS.charAt(arRunIndex[0]) +
            VOWS.charAt(arRunIndex[1]) +
            CONS.charAt(arRunIndex[2]++);
        if (arRunIndex[2] === CONS.length) {
            arRunIndex[2] = 0;
            arRunIndex[1]++;
            if (arRunIndex[1] === VOWS.length) {
                arRunIndex[1] = 0;
                arRunIndex[0]++;
                if (arRunIndex[0] === CONS.length) {
                    arRunIndex[0] = 0;
                }
            }
        }
        return contextId;
    }
    setTimeout(contextName, fn, ms, ...args) {
        return setTimeout(() => {
            this._runFn(contextName, fn, args);
        }, ms);
    }
    setInterval(contextName, fn, ms, ...args) {
        return setInterval(() => {
            this._runFn(contextName, fn, args);
        }, ms);
    }
    on(contextName, eventObj, eventName, fn) {
        eventObj.on(eventName, (...args) => {
            this._runFn(contextName, fn, args);
        });
    }
    _runFn(contextName, fn, args) {
        const rc = this.copyConstruct(this.getContextId(), contextName);
        rc.executePromise(Promise.resolve().then(() => {
            fn(rc, ...args);
        }));
    }
    freeRunId() {
        this.isStatus() && this.hasLogged() && this.status(this.getName(this), '....Done....');
    }
    startTraceSpan(id) {
        if (!this.isTraceEnabled())
            return;
        return this.logger.startTraceSpan(id);
    }
    endTraceSpan(id, ackNum) {
        if (!this.isTraceEnabled())
            return;
        this.logger.endTraceSpan(id, ackNum);
    }
}
exports.RunContextServer = RunContextServer;
class RCServerLogger extends core_1.RCLoggerBase {
    constructor(rc) {
        super(rc);
        this.rc = rc;
    }
    logToConsole(level, logStr) {
        const fn = colors[core_1.LOG_LEVEL[level]];
        console.log(fn ? fn(logStr) : logStr);
    }
}
exports.RCServerLogger = RCServerLogger;
//# sourceMappingURL=rc-server.js.map