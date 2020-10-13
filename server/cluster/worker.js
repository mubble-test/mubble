"use strict";
/*------------------------------------------------------------------------------
   About      : This class hosts the server in clustered environment
   
   Created on : Mon Apr 10 2017
   Author     : Raghvendra Varma
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.clusterWorker = exports.ClusterWorker = void 0;
// Import from node
const cluster = require("cluster");
// Import from external modules with types
const _ = require("lodash");
// Internal imports
const ipc = require("./ipc-message");
const CONST = {
    MS_WAIT_FOR_INIT: 30000
};
class ClusterWorker {
    constructor() {
        this.workerIndex = -1;
        this.restartCount = -1;
        if (exports.clusterWorker)
            throw ('ClusterWorker is singleton. It cannot be instantiated again');
    }
    async start(rc, config) {
        if (cluster.isMaster) {
            throw ('ClusterWorker cannot be started in the cluster.master process');
        }
        this.config = config;
        rc.on('ClusterMsg', process, 'message', this.onMessage.bind(this));
        await new Promise((resolve, reject) => {
            this.pendingInitResolve = resolve;
            setTimeout(() => {
                if (this.pendingInitResolve) { // indicates promise is not fulfilled
                    rc.isError() && rc.error(rc.getName(this), 'Could not get worker index in stipulated ms', CONST.MS_WAIT_FOR_INIT);
                    process.exit(ipc.CODE.VOLUNTARY_DEATH);
                }
            }, CONST.MS_WAIT_FOR_INIT);
        });
        rc.initObj = globalInitObj;
        return;
    }
    onMessage(rc, msg) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Received message.', msg);
        if (!_.isPlainObject(msg)) {
            return rc.isError() && rc.error(rc.getName(this), 'Received invalid message', msg);
        }
        switch (msg.id) {
            case ipc.CWInitializeWorker.name:
                const wMsg = msg;
                this.workerIndex = wMsg.workerIndex;
                this.restartCount = wMsg.restartCount;
                rc.initConfig.runMode = wMsg.runMode;
                process.title = this.config.SERVER_NAME + '_' + this.workerIndex;
                const fn = this.pendingInitResolve;
                this.pendingInitResolve = null;
                globalInitObj = wMsg.initObj;
                fn(); // resolve so that we can go ahead with further init
                rc.isStatus() && rc.status(rc.getName(this), 'Started worker with index', this.workerIndex, 'RunMode', wMsg.runMode);
                break;
        }
    }
    voluntaryExit(rc) {
        rc.isStatus() && rc.status(rc.getName(this), 'Voluntarily exiting the worker process');
        process.exit(ipc.CODE.VOLUNTARY_DEATH);
    }
}
exports.ClusterWorker = ClusterWorker;
exports.clusterWorker = new ClusterWorker();
let globalInitObj;
//# sourceMappingURL=worker.js.map