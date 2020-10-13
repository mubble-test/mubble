"use strict";
/*------------------------------------------------------------------------------
   About      : Google Cloud Storage
   
   Created on : Tue Nov 19 2019
   Author     : Vishal Sinha
   
   Copyright (c) 2019 Obopay Mobile Technologies Pvt Ltd. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleCloudStorage = void 0;
const storage_1 = require("@google-cloud/storage");
class GoogleCloudStorage {
    static init(rc, projectId, credentialsPath) {
        if (this.initialized) {
            rc.isError() && rc.error(rc.getName(this), 'Calling init twice.');
            throw new Error('Calling init twice.');
        }
        this.storage = new storage_1.Storage({ projectId, keyFilename: credentialsPath });
        this.initialized = true;
    }
    static close(rc) {
        if (!this.initialized) {
            rc.isError() && rc.error(rc.getName(this), 'GCS not initialized.');
            throw new Error('GCS not initialized.');
        }
        this.storage = undefined;
        this.initialized = false;
    }
    static async saveFile(rc, bucket, filePath, fileData, options) {
        if (!this.initialized) {
            rc.isError() && rc.error(rc.getName(this), 'GCS not initialized.');
            throw new Error('GCS not initialized.');
        }
        rc.isDebug() && rc.debug(rc.getName(this), 'Saving file in GCS.', bucket, filePath, options);
        const file = this.storage.bucket(bucket).file(filePath);
        await file.save(fileData, options);
        return filePath;
    }
    static async deleteFile(rc, bucket, filePath) {
        const file = this.storage.bucket(bucket).file(filePath);
        await file.delete();
    }
    static async fileExists(rc, bucket, filePath) {
        if (!this.initialized) {
            rc.isError() && rc.error(rc.getName(this), 'GCS not initialized.');
            throw new Error('GCS not initialized.');
        }
        rc.isDebug() && rc.debug(rc.getName(this), 'Checking if file exists in GCS.', bucket, filePath);
        const file = this.storage.bucket(bucket).file(filePath), exists = await file.exists();
        return exists[0];
    }
}
exports.GoogleCloudStorage = GoogleCloudStorage;
GoogleCloudStorage.initialized = false;
//# sourceMappingURL=gcs.js.map