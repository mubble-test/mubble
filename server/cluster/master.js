"use strict";
/*------------------------------------------------------------------------------
   About      : Starts the platform clustered. The cluster manager watches the
                workers
   
   Created on : Thu Apr 06 2017
   Author     : Raghvendra Varma
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.clusterMaster = exports.ClusterMaster = exports.getWorkerRestartCount = exports.getWorkerIndex = exports.isClusterMaster = exports.startCluster = void 0;
// Import from node
const cluster = require("cluster");
const crypto = require("crypto");
const path = require("path");
const os = require("os");
const fs = require("fs");
const childProcess = require("child_process");
// Import from external modules with types
const lo = require("lodash");
// Import from external modules without types
const posix = require('posix'); // https://github.com/ohmu/node-posix
// Internal imports
const core_1 = require("@mubble/core");
const ipc = require("./ipc-message");
const worker_1 = require("./worker");
const rc_server_1 = require("../rc-server");
/**
 * This is the first API called. It start the platform with given configuration
 * @param minNodeVersion    Verify the node version before running
 * @param config            Configuration for the platform
 */
async function startCluster(rc, config, initObj) {
    if (cluster.isMaster) {
        await exports.clusterMaster.start(rc, config, initObj);
    }
    else {
        await worker_1.clusterWorker.start(rc, config);
    }
    return cluster.isMaster;
}
exports.startCluster = startCluster;
function isClusterMaster() {
    return cluster.isMaster;
}
exports.isClusterMaster = isClusterMaster;
function getWorkerIndex() {
    return worker_1.clusterWorker.workerIndex;
}
exports.getWorkerIndex = getWorkerIndex;
function getWorkerRestartCount() {
    return worker_1.clusterWorker.restartCount;
}
exports.getWorkerRestartCount = getWorkerRestartCount;
/*------------------------------------------------------------------------------
  ClusterMaster
------------------------------------------------------------------------------*/
class ClusterMaster {
    constructor() {
        this.workers = [];
        this.userInfo = null;
        if (exports.clusterMaster)
            throw ('ClusterMaster is singleton. It cannot be instantiated again');
    }
    async start(rc, config, initObj) {
        if (!cluster.isMaster) {
            throw ('ClusterMaster cannot be started in the cluster.worker process');
        }
        this.config = config;
        if (initObj)
            this.workerInitObj = initObj;
        rc.isDebug() && rc.debug(rc.getName(this), 'Starting cluster master with config', config);
        this.validateConfig(rc);
        // Set this process title to same as server name
        process.title = this.config.SERVER_NAME;
        // check if server is already running
        await this.checkRunning(rc);
        // We capture the events at the master level, although we can also do it at the worker
        // level, this is to avoid receiving the events from the workers that have been removed 
        // from the workers array
        rc.on('ExitMsg', cluster, 'exit', this.eventWorkerExit.bind(this));
        rc.on('OnlMsg', cluster, 'online', this.eventWorkerOnline.bind(this));
        rc.on('ClusterMsg', cluster, 'message', this.eventWorkerMessage.bind(this));
        // start Workers
        this.startWorkers(rc);
    }
    validateConfig(rc) {
        const conf = this.config;
        if (!core_1.Validator.isValidName(conf.SERVER_NAME)) {
            throw ('Invalid server name: ' + conf.SERVER_NAME);
        }
        // if (!Validator.isValidName(conf.RUN_AS)) {
        //   throw('Invalid user name in RUN_AS: ' + conf.RUN_AS)
        // }
        try {
            if (!(this.userInfo = posix.getpwnam(conf.RUN_AS))) {
                throw ('library bug: posix.getpwnam did not return user info');
            }
        }
        catch (e) {
            rc.isError() && rc.error(rc.getName(this), 'posix.getpwnam', e);
            throw ('Could not find the RUN_AS user name on system: ' + conf.RUN_AS);
        }
        // Figure out the user id that is used to start this process
        // If we have been started with sudo, need to find the sudoer
        const uid = process.getuid() === 0 ? Number(process.env.SUDO_UID) : process.getuid();
        if (this.userInfo.uid !== uid) {
            throw ('You must run server from user-id: ' + conf.RUN_AS);
        }
    }
    async checkRunning(rc) {
        const serverName = this.config.SERVER_NAME, fileName = crypto.createHash('md5').update(serverName).digest('hex') + '_' + serverName, fullPath = path.join(os.tmpdir(), fileName);
        // we create a file in temp folder with content as pid of the cluster process.
        // ps -p pid : lists the process with the pid
        try {
            fs.statSync(fullPath);
        }
        catch (e) {
            if (e.code === 'ENOENT') {
                return this.createLockFile(fullPath);
            }
            else {
                rc.isError() && rc.error(rc.getName(this), e);
                throw ('checkRunning failed while fs.statSync on ' + fullPath);
            }
        }
        // If we are here, means file exists
        const strPid = fs.readFileSync(fullPath, 'utf8'), out = await this.runCmdPS_P('ps -p ' + strPid);
        if (out.indexOf(serverName) !== -1) {
            throw ('Server is already running with pid: ' + strPid);
        }
        // All well, let's create the lock file
        this.createLockFile(fullPath);
    }
    createLockFile(lockFile) {
        fs.writeFileSync(lockFile, String(process.pid));
        if (!process.getuid() && this.userInfo) {
            fs.chownSync(lockFile, this.userInfo.uid, this.userInfo.gid);
        }
    }
    runCmdPS_P(cmd) {
        return this.execCmd(cmd).catch(() => {
            return '';
        });
    }
    execCmd(cmd) {
        return new Promise(function (resolve, reject) {
            childProcess.exec(cmd, function (err, stdout, stderr) {
                if (err)
                    return reject(err);
                if (stderr)
                    return reject(stderr);
                resolve(stdout);
            });
        });
    }
    startWorkers(rc) {
        const conf = this.config, argv = process.execArgv, execArgv = [];
        if (rc.getRunMode() === rc_server_1.RUN_MODE.DEV) {
            if (argv.indexOf('--debug') !== -1) {
                execArgv.push(argv.indexOf('--debug-brk') === -1 ? '--debug' : '--debug-brk');
            }
            if (argv.indexOf('--expose-gc') !== -1) {
                execArgv.push('--expose-gc');
            }
            if (execArgv.length) {
                rc.isDebug() && rc.debug(rc.getName(this), 'execArgv', execArgv);
                cluster.setupMaster({
                    args: execArgv
                });
            }
        }
        const instances = conf.INSTANCES ||
            ((rc.getRunMode() === rc_server_1.RUN_MODE.PROD || rc.getRunMode() === rc_server_1.RUN_MODE.PRE_PROD) ? os.cpus().length : 1);
        for (let workerIndex = 0; workerIndex < instances; workerIndex++) {
            const workerInfo = new WorkerInfo(rc, this, workerIndex, this.workerInitObj);
            this.workers.push(workerInfo);
            workerInfo.fork(rc);
        }
    }
    eventWorkerExit(rc, worker, code, signal) {
        // This is typically when worker has decided to exit, clusterManager is always aware of these
        // situations. Hence no action here
        if (code === ipc.CODE.VOLUNTARY_DEATH)
            return;
        // We wrap everything in try catch to avoid cluster from going down
        const [workerIndex, workerInfo] = this.findWorkerInfo(worker);
        try {
            if (!workerInfo) {
                return rc.isWarn() && rc.warn(rc.getName(this), 'Multiple notifications? Got exit message from a missing worker. forkId:', worker.id);
            }
            rc.isWarn() && rc.warn(rc.getName(this), 'Worker died', { exitCode: code, signal }, workerInfo);
            // If all the workers die voluntarily means server could not start
            workerInfo.substitute(rc, true);
        }
        catch (err) {
            rc.isError() && rc.error(rc.getName(this), 'cluster.on/exit - Caught global exception to avoid process shutdown: ', err);
        }
    }
    eventWorkerOnline(rc, worker) {
        try {
            const [workerIndex, workerInfo] = this.findWorkerInfo(worker);
            if (!workerInfo) {
                return rc.isWarn() && rc.warn(rc.getName(this), 'Got online from a missing worker. forkId:', worker.id);
            }
            workerInfo.online(rc);
        }
        catch (err) {
            rc.isError() && rc.error(rc.getName(this), 'cluster.on/exit - Caught global exception to avoid process shutdown: ', err);
        }
    }
    eventWorkerMessage(rc, worker, msg) {
        const [workerIndex, workerInfo] = this.findWorkerInfo(worker);
        try {
            if (!workerInfo) {
                return rc.isWarn() && rc.warn(rc.getName(this), 'Got msg from a missing worker. forkId:', worker.id, msg);
            }
            workerInfo.message(rc, msg);
        }
        catch (err) {
            rc.isError() && rc.error(rc.getName(this), 'cluster.on/exit - Caught global exception to avoid process shutdown: ', err);
        }
    }
    findWorkerInfo(worker) {
        const workerIndex = lo.findIndex(this.workers, { forkId: worker.id });
        return workerIndex === -1 ? [-1, null] : [workerIndex, this.workers[workerIndex]];
    }
}
exports.ClusterMaster = ClusterMaster;
exports.clusterMaster = new ClusterMaster();
/*------------------------------------------------------------------------------
  WorkerInfo
------------------------------------------------------------------------------*/
var WORKER_STATE;
(function (WORKER_STATE) {
    WORKER_STATE[WORKER_STATE["INIT"] = 0] = "INIT";
    WORKER_STATE[WORKER_STATE["START_WAIT"] = 1] = "START_WAIT";
    WORKER_STATE[WORKER_STATE["STARTED"] = 2] = "STARTED";
    WORKER_STATE[WORKER_STATE["ONLINE"] = 3] = "ONLINE";
    WORKER_STATE[WORKER_STATE["FAILED"] = 4] = "FAILED";
})(WORKER_STATE || (WORKER_STATE = {}));
const CONST = {
    MS_BETWEEN_RESTARTS: 30 * 1000
};
class WorkerInfo {
    constructor(rc, clusterMaster, workerIndex, // index of clusterMaster.workers
    workerInitObj) {
        this.clusterMaster = clusterMaster;
        this.workerIndex = workerIndex;
        this.workerInitObj = workerInitObj;
        this.worker = null;
        this.forkId = 0;
        this.lastStartTS = 0;
        this.restartCount = 0;
        this.state = WORKER_STATE.INIT;
    }
    // this is called when system has ascertained that the worker needs to be forked
    // either in case of fresh start, death, reload (code change or excessive memory usage) 
    fork(rc) {
        this.worker = cluster.fork();
        this.forkId = this.worker.id;
        this.lastStartTS = Date.now();
        this.state = WORKER_STATE.STARTED;
        rc.isDebug() && rc.debug(rc.getName(this), 'Forking worker with index', this.workerIndex);
    }
    restart(rc) {
        if (this.state !== WORKER_STATE.INIT) {
            return rc.isError() && rc.error(rc.getName(this), 'Restart requested in wrong state', this);
        }
        this.state = WORKER_STATE.START_WAIT;
        const msToRestart = this.lastStartTS + CONST.MS_BETWEEN_RESTARTS - Date.now();
        rc.setTimeout('StartTimer', (rc) => {
            this.fork(rc);
            this.restartCount++;
            rc.isStatus() && rc.status(rc.getName(this), 'Restarted worker', this);
        }, msToRestart > 0 ? msToRestart : 0);
    }
    online(rc) {
        this.state = WORKER_STATE.ONLINE;
        const msgObj = new ipc.CWInitializeWorker(this.workerIndex, rc.getRunMode(), this.restartCount, this.workerInitObj);
        msgObj.send(this.worker);
    }
    failed(rc) {
        this.worker = null;
        this.forkId = 0;
        this.state = WORKER_STATE.FAILED;
    }
    substitute(rc, onDeath) {
        if (!onDeath) {
            const msgObj = new ipc.CWRequestStop();
            msgObj.send(this.worker);
        }
        this.state = WORKER_STATE.INIT;
        this.worker = null;
        this.forkId = 0;
        onDeath ? this.restart(rc) : this.fork(rc);
    }
    message(rc, msg) {
    }
    toString() {
        return `Worker #${this.workerIndex} state: ${this.state} forkId:${this.forkId} started at:${this.lastStartTS} restarts:${this.restartCount}`;
    }
}
//# sourceMappingURL=master.js.map