"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
/*------------------------------------------------------------------------------
   About      : Index File to export Services as @mubble/server
   
   Created on : Wed Apr 12 2017
   Author     : Raghvendra Varma
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
var master_1 = require("./cluster/master");
Object.defineProperty(exports, "startCluster", { enumerable: true, get: function () { return master_1.startCluster; } });
Object.defineProperty(exports, "isClusterMaster", { enumerable: true, get: function () { return master_1.isClusterMaster; } });
Object.defineProperty(exports, "getWorkerIndex", { enumerable: true, get: function () { return master_1.getWorkerIndex; } });
Object.defineProperty(exports, "getWorkerRestartCount", { enumerable: true, get: function () { return master_1.getWorkerRestartCount; } });
__exportStar(require("./xmn"), exports);
__exportStar(require("./rc-server"), exports);
var repl_1 = require("./util/repl");
Object.defineProperty(exports, "Repl", { enumerable: true, get: function () { return repl_1.Repl; } });
Object.defineProperty(exports, "ReplProvider", { enumerable: true, get: function () { return repl_1.ReplProvider; } });
__exportStar(require("./util"), exports);
__exportStar(require("./db"), exports);
__exportStar(require("./cache/redis-wrapper"), exports);
__exportStar(require("./logger/server-ext-logger"), exports);
__exportStar(require("./master"), exports);
__exportStar(require("./gcp"), exports);
__exportStar(require("./vision"), exports);
__exportStar(require("./storage"), exports);
__exportStar(require("./gcp"), exports);
__exportStar(require("./sms"), exports);
__exportStar(require("./mail"), exports);
/* TODO:

  - Can add color support for logging. We will need to test it on linux to see it working
  - test wss for websocket communication
  - Core & Browser project is targeted at es2015. They will need to move to es5
  - Need to test app on old Alcatel phone
  - Tell rule of not coding function (must use arrow), must use class

*/
//# sourceMappingURL=index.js.map