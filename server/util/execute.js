"use strict";
/*------------------------------------------------------------------------------
   About      : Execute a linux command
   
   Created on : Thu Apr 20 2017
   Author     : Akash Dathan
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.execCmd = void 0;
const child_process = require("child_process");
function execCmd(cmd, ignoreStdErr, ignoreErr) {
    const exec = child_process.exec;
    return new Promise(function (resolve, reject) {
        exec(cmd, { maxBuffer: 1024 * 500 }, function (err, stdout, stderr) {
            if (err && !ignoreErr)
                return reject(err);
            if (!ignoreStdErr && stderr)
                return reject(stderr);
            return stdout ? resolve(stdout) : resolve('');
        });
    });
}
exports.execCmd = execCmd;
//# sourceMappingURL=execute.js.map