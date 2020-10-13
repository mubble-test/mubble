"use strict";
/*------------------------------------------------------------------------------
   About      : Utils
   
   Created on : Mon Jul 02 2018
   Author     : Akash Dathan
   
   Copyright (c) 2018 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestUtils = void 0;
const muds_1 = require("../muds");
const models = require("./models");
class TestUtils {
    static async updateKeyValue(rc, parentId, id, updateRec) {
        return await muds_1.Muds.transaction(rc, async (transaction, now) => {
            const keyVal = await transaction.getForUpsert(models.KeyValue, muds_1.Muds.getIntKey(parentId), muds_1.Muds.getIntKey(id));
            Object.assign(keyVal, updateRec);
            await transaction.enqueueForUpsert(keyVal);
        });
    }
    /**
     * Populate the db wrt the provided parent and children keys
     *
     */
    static async prepareData(rc, parentKey, ...childrenKeys) {
        return await muds_1.Muds.direct(rc, async (directIo, now) => {
            const parent = await directIo.getForUpsert(models.Parent, muds_1.Muds.getIntKey(parentKey));
            await parent.populateDummyValues(rc);
            await directIo.enqueueForUpsert(parent);
            if (!childrenKeys)
                return;
            for (const childrenKey of childrenKeys) {
                const keyVal = await directIo.getForUpsert(models.KeyValue, muds_1.Muds.getIntKey(parentKey), muds_1.Muds.getIntKey(childrenKey));
                await keyVal.populateDummyValues(rc);
                await directIo.enqueueForUpsert(keyVal);
            }
        });
    }
    /**
     * Delete all the Parent and KeyValue Entries
     *
     */
    static async cleanUp(rc) {
        const entitiesToDelete = [];
        await muds_1.Muds.direct(rc, async (directIo, now) => {
            const keyValQuery = directIo.query(models.KeyValue), parentQuery = directIo.query(models.Parent), keyVals = await keyValQuery.run(100), Parents = await parentQuery.run(100);
            let keyVal;
            while (keyVal = await keyVals.getNext())
                entitiesToDelete.push(keyVal);
            let parent;
            while (parent = await Parents.getNext())
                entitiesToDelete.push(parent);
            if (entitiesToDelete.length)
                directIo.delete(...entitiesToDelete);
        });
    }
}
exports.TestUtils = TestUtils;
//# sourceMappingURL=utils.js.map