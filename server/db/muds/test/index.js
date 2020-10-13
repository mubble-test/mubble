"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Mon Jul 02 2018
   Author     : Akash Dathan
   
   Copyright (c) 2018 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
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
exports.MudsTests = void 0;
const muds_1 = require("../muds");
const utils_1 = require("./utils");
const proof_of_concept_1 = require("./proof-of-concept");
const models = require("./models");
__exportStar(require("./test-unique-muds"), exports);
class MudsTests {
    constructor() {
        this.ts = Date.now();
    }
    async run(rc) {
        try {
            await utils_1.TestUtils.cleanUp(rc);
            await utils_1.TestUtils.prepareData(rc, this.ts, this.ts + 1, this.ts + 2);
            await proof_of_concept_1.POCTests.testCase1(rc);
            // await this.testCase1(rc)
            // await this.testCase2(rc)
            // await this.testCase3(rc)
        }
        catch (error) {
            rc.isError() && rc.error(rc.getName(this), 'Tests Runnning Failed', error);
        }
        finally {
            await utils_1.TestUtils.cleanUp(rc);
        }
    }
    /**
     * Simultaneous update test
     * - try to update the inserted record simultaneously from two transactions.
     *
     * Models Used
     *  - Parent   -> Parent model
     *  - KeyValue -> child model
     *
     *  - Update the KeyVal entry with key = (ts + 1)
     */
    async testCase1(rc) {
        const testString = 'Update the inserted record simultaneously from two transactions';
        rc.isDebug() && rc.debug(rc.getName(this), `1) ${testString}`);
        try {
            await Promise.all([
                utils_1.TestUtils.updateKeyValue(rc, this.ts, this.ts + 1, { strValue: 'From First update function' }),
                utils_1.TestUtils.updateKeyValue(rc, this.ts, this.ts + 1, { strValue: 'From Second update function' })
            ]);
            /**
             * Transaction Failed With The Following Error.
             *
             * MudsTransaction(Init): transaction failed with error
             * {code:10, metadata:{_internal_repr:{}}, details:"too much contention on these datastore entities. ..}
             * Error: 10 ABORTED: too much contention on these datastore entities. please try again.
             * entity groups: [(app=j~playground-india, Parent, 1530598737095)]
             */
        }
        catch (error) {
            rc.isError() && rc.error(rc.getName(this), testString, error);
        }
    }
    /**
     * Multiple entities of same ancestor are updated in the same transaction.
     *
     * Models Used
     *  - Parent   -> Parent model
     *  - KeyValue -> child model
     *
     *  - Update the KeyVal entry with key = (ts + 1) and (ts + 2)
     */
    async testCase2(rc) {
        const testString = 'Multiple entities of same ancestor update test.';
        rc.isDebug() && rc.debug(rc.getName(this), `2) ${testString}`);
        try {
            const updateRec = { strValue: 'Updated String Value' };
            await muds_1.Muds.transaction(rc, async (transaction, now) => {
                const parentKey = muds_1.Muds.getIntKey(this.ts), keyVal1 = await transaction.getForUpsert(models.KeyValue, parentKey, muds_1.Muds.getIntKey(this.ts + 1)), keyVal2 = await transaction.getForUpsert(models.KeyValue, parentKey, muds_1.Muds.getIntKey(this.ts + 2));
                Object.assign(keyVal1, updateRec);
                Object.assign(keyVal2, updateRec);
                transaction.enqueueForUpsert(keyVal1);
                transaction.enqueueForUpsert(keyVal2);
            });
            /**
             * Transaction Successfull
             */
            rc.isDebug() && rc.debug(rc.getName(this), `Success : ${testString}`);
        }
        catch (error) {
            rc.isError() && rc.error(rc.getName(this), testString, error);
        }
    }
    /**
     * Insert same id from two transactions, after get.
     *
     * Models Used
     *  - Parent   -> Parent model
     *  - KeyValue -> child model
     *
     *  - get For key 1234
     *  - insert (ts + 3) and (ts + 4)
     */
    async testCase3(rc) {
        const testString = 'Insert same id from two transactions, after get.';
        rc.isDebug() && rc.debug(rc.getName(this), `3) ${testString}`);
        try {
            await Promise.all([
                this.case3Helper(rc, this.ts + 3, '3) From First Transaction'),
                this.case3Helper(rc, this.ts + 4, '3) From Second Transaction')
            ]);
            /**
             * Failed With The Following Error
             *
             * MudsTransaction(Init): transaction failed with error
             * {code:10, metadata:{_internal_repr:{}}, details:"too much contention on these datastore entities. ..}
             * Error: 10 ABORTED: too much contention on these datastore entities. please try again.
             * entity groups: [(app=j~playground-india, Parent, 1530599704535)]
             */
        }
        catch (error) {
            rc.isError() && rc.error(rc.getName(this), testString, error);
        }
    }
    /**
     * Updates the `strValue` field with a provided string after trying to get a
     * non existant entity, in a transaction.
     */
    async case3Helper(rc, id, strValue) {
        await muds_1.Muds.transaction(rc, async (transaction, now) => {
            const tempId = 1234, parentKey = muds_1.Muds.getIntKey(this.ts);
            await transaction.getEntityIfExists(models.KeyValue, parentKey, muds_1.Muds.getIntKey(tempId));
            const keyVal = await transaction.getForUpsert(models.KeyValue, parentKey, muds_1.Muds.getIntKey(this.ts + 3));
            keyVal.populateDummyValues(rc);
            keyVal.strValue = strValue;
            transaction.enqueueForUpsert(keyVal);
        });
    }
}
exports.MudsTests = MudsTests;
//# sourceMappingURL=index.js.map