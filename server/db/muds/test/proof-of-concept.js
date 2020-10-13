"use strict";
/*------------------------------------------------------------------------------
   About      : One time test for Proof Of Concept
   
   Created on : Wed Jul 11 2018
   Author     : Akash Dathan
   
   Copyright (c) 2018 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.POCTests = void 0;
const muds_1 = require("../muds");
const models = require("./models");
/**
 *
 * 1) Test against playground-india {count:0, hasMore:false, moreResults:"MORE_RESULTS_AFTER_LIMIT”})
 *    * Observation : {count:1, hasMore:false, moreResults:"NO_MORE_RESULTS"}
 *
 * 2) Content table index assume is 'number of microsecs from 1 Jan 2050' (mpoch).
 *    When we ask for content by content type, asc order __key__. This should not need index.
 *    * Observation : Order by __Key__ does not work, but the default order is ascending
 *
 * 3) object.freeze: try modifying manager data.
 *    * Observation : works, data modification  failed.
 */
class POCTests {
    /**
     * Test is the transaction is working when somebody updates the entity outside transaction
     */
    static async testCase1(rc) {
        const testString = 'Updates the entity outside transaction.';
        rc.isDebug() && rc.debug(rc.getName(this), `1) ${testString}`);
        try {
            const transactionPromise = muds_1.Muds.transaction(rc, async (transaction, now) => {
                const parentKey = muds_1.Muds.getIntKey(this.ts), keyVal1 = await transaction.getForUpsert(models.KeyValue, parentKey, muds_1.Muds.getIntKey(this.ts + 1));
                keyVal1.strValue = 'Updated String Value';
                await transaction.enqueueForUpsert(keyVal1);
            });
            const directIoPromise = muds_1.Muds.direct(rc, async (directIo, now) => {
                const parentKey = muds_1.Muds.getIntKey(this.ts), keyVal1 = await directIo.getForUpsert(models.KeyValue, parentKey, muds_1.Muds.getIntKey(this.ts + 1));
                keyVal1.strValue = 'Updated String Value';
                await directIo.enqueueForUpsert(keyVal1);
            });
            await Promise.all([transactionPromise, directIoPromise]);
            /**
             * Observations :
             * MudsTransaction(Init): transaction failed with error {code:10, metadata:{_internal_repr:{}},
             * details:"too much contention on these datastore entities. ..}
             * Error: 10 ABORTED: too much contention on these datastore entities. please try again.
             * entity groups: [(app=j~playground-india, Parent, 1531469471537)]
             */
            rc.isDebug() && rc.debug(rc.getName(this), `Success : ${testString}`);
        }
        catch (error) {
            rc.isError() && rc.error(rc.getName(this), testString, error);
        }
    }
    /**
     * Test time taken in batching of 500 Vs 100 * 5 (Promise.all)
     */
    async testCase2() {
    }
}
exports.POCTests = POCTests;
POCTests.ts = Date.now();
//# sourceMappingURL=proof-of-concept.js.map