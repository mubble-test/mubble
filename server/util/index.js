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
   About      : Index File to export Utilities as @mubble/server
   
   Created on : Mon Mar 19 2017
   Author     : Christy George
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
var repl_1 = require("./repl");
Object.defineProperty(exports, "Repl", { enumerable: true, get: function () { return repl_1.Repl; } });
Object.defineProperty(exports, "ReplProvider", { enumerable: true, get: function () { return repl_1.ReplProvider; } });
__exportStar(require("./user-info"), exports);
__exportStar(require("./execute"), exports);
__exportStar(require("./script"), exports);
__exportStar(require("./https-request-2"), exports);
__exportStar(require("./trie"), exports);
__exportStar(require("./async-req-mgr"), exports);
__exportStar(require("./nudi-convert"), exports);
__exportStar(require("./mammoth"), exports);
__exportStar(require("./mubble-stream"), exports);
__exportStar(require("./misc"), exports);
__exportStar(require("./mailer"), exports);
__exportStar(require("./https-request"), exports);
/* TODO:

- Can add color support for logging. We will need to test it on linux to see it working
- test wss for websocket communication
- Core & Browser project is targeted at es2015. They will need to move to es5
- Need to test app on old Alcatel phone
- Tell rule of not coding function (must use arrow), must use class

*/
//# sourceMappingURL=index.js.map