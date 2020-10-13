"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WCRequestReplace = exports.CWRequestStop = exports.CWInitializeWorker = exports.BaseIpcMsg = exports.CODE = void 0;
exports.CODE = {
    VOLUNTARY_DEATH: 13
};
// Base class for all ipc messages
class BaseIpcMsg {
    constructor(id) {
        this.id = id;
    }
    send(worker) {
        if (!worker)
            return;
        worker.send(this);
    }
}
exports.BaseIpcMsg = BaseIpcMsg;
// Used to pass the initial startup params to worker
class CWInitializeWorker extends BaseIpcMsg {
    constructor(workerIndex, runMode, restartCount, initObj) {
        super(CWInitializeWorker.name);
        this.workerIndex = workerIndex;
        this.runMode = runMode;
        this.restartCount = restartCount;
        this.initObj = initObj;
    }
}
exports.CWInitializeWorker = CWInitializeWorker;
// Used when administrator wants to restart the service gracefully
class CWRequestStop extends BaseIpcMsg {
    constructor() {
        super(CWRequestStop.name);
    }
}
exports.CWRequestStop = CWRequestStop;
// Used when memory goes up
class WCRequestReplace extends BaseIpcMsg {
    constructor() {
        super(CWRequestStop.name);
    }
}
exports.WCRequestReplace = WCRequestReplace;
//# sourceMappingURL=ipc-message.js.map