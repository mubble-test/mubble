"use strict";
/*------------------------------------------------------------------------------
   About      : Initialize google-cloud with the respective credentials,
                with respect to the run mode
   
   Created on : Thu Feb 20 2020
   Author     : Siddharth Garg
   
   Copyright (c) 2020 Obopay. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.GcloudEnv = void 0;
const rc_server_1 = require("../rc-server");
const index_1 = require("../index");
class GcloudEnv {
    constructor(namespace) {
        this.namespace = namespace;
    }
    static async init(rc, projectId, credentialsPath) {
        let gCloudEnv = new GcloudEnv(rc_server_1.RUN_MODE[rc_server_1.RUN_MODE.DEV]);
        gCloudEnv.projectId = projectId;
        gCloudEnv.credentialFilePath = credentialsPath;
        await this.initGcpComponents(rc, gCloudEnv);
        return gCloudEnv;
    }
    static async initGcpComponents(rc, gcloudEnv) {
        await index_1.BigQueryClient.init(rc, gcloudEnv);
    }
}
exports.GcloudEnv = GcloudEnv;
//# sourceMappingURL=gcloud-env.js.map