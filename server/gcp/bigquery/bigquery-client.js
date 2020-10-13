"use strict";
/*------------------------------------------------------------------------------
   About      : Initialize google-cloud with the respective credentials
   
   Created on : Thu Feb 20 2020
   Author     : Siddharth Garg
   
   Copyright (c) 2020 Obopay. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigQueryClient = void 0;
const bigquery_1 = require("@google-cloud/bigquery");
class BigQueryClient {
    constructor(rc) { }
    static init(rc, gcloudEnv) {
        if (this.initialized) {
            rc.isError() && rc.error(rc.getName(this), 'Calling init twice.');
            throw new Error('Calling init twice.');
        }
        gcloudEnv.bigQuery = new bigquery_1.BigQuery({
            projectId: gcloudEnv.projectId,
            keyFilename: gcloudEnv.credentialFilePath
        });
        this._bigQuery = gcloudEnv.bigQuery;
        this.initialized = true;
    }
}
exports.BigQueryClient = BigQueryClient;
BigQueryClient.initialized = false;
//# sourceMappingURL=bigquery-client.js.map