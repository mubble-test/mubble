"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Thu Apr 20 2017
   Author     : Akash Dathan
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHomeDir = exports.getDatastoreNamespace = exports.getSystemUserId = void 0;
const os = require("os");
function getSystemUserId() {
    return os.userInfo().username;
}
exports.getSystemUserId = getSystemUserId;
function getDatastoreNamespace() {
    const username = os.userInfo().username;
    if (username.toLowerCase() === 'mubble')
        return os.hostname().split('.').join('-');
    return username;
}
exports.getDatastoreNamespace = getDatastoreNamespace;
function getHomeDir() {
    return os.userInfo().homedir;
}
exports.getHomeDir = getHomeDir;
//# sourceMappingURL=user-info.js.map