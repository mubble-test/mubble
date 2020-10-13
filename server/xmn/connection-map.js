"use strict";
/*------------------------------------------------------------------------------
   About      : Connection Map
   
   Created on : Wed Feb 27 2019
   Author     : Vishal Sinha
   
   Copyright (c) 2019 Obopay Mobile Technologies Pvt Ltd. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionMap = void 0;
const CLASS_NAME = 'ConnectionMap';
var ConnectionMap;
(function (ConnectionMap) {
    const activeConnectionMap = new Map();
    function addActiveConnection(rc, id, co) {
        rc.isDebug() && rc.debug(CLASS_NAME, 'addActiveConnection', id, co);
        if (isActiveConnection(id)) {
            rc.isWarn() && rc.warn(CLASS_NAME, 'Active connection already present.', id);
            return;
        }
        activeConnectionMap.set(id, co);
    }
    ConnectionMap.addActiveConnection = addActiveConnection;
    function getActiveConnection(rc, id) {
        const co = activeConnectionMap.get(id);
        rc.isDebug() && rc.debug(CLASS_NAME, 'getActiveConnection', id, co);
        return co;
    }
    ConnectionMap.getActiveConnection = getActiveConnection;
    function removeActiveConnection(rc, id) {
        rc.isDebug() && rc.debug(CLASS_NAME, 'removeActiveConnection', id);
        if (!isActiveConnection(id)) {
            rc.isWarn() && rc.warn(CLASS_NAME, 'No active connection present.', id);
            return;
        }
        activeConnectionMap.delete(id);
    }
    ConnectionMap.removeActiveConnection = removeActiveConnection;
    // private method
    function isActiveConnection(id) {
        return activeConnectionMap.has(id);
    }
})(ConnectionMap = exports.ConnectionMap || (exports.ConnectionMap = {}));
//# sourceMappingURL=connection-map.js.map