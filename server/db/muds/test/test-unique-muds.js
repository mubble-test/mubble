"use strict";
/*------------------------------------------------------------------------------
   About      : Test code for unique
   
   Created on : Fri Sep 20 2019
   Author     : Ajith KP
   
   Copyright (c) 2019 Obopay Mobile India Pvt Ltd. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestUniqueMuds = void 0;
const __1 = require("../..");
const models_1 = require("./models");
class TestUniqueMuds {
    async main(rc) {
        await this.cleanUp(rc);
        //await this.testCase1(rc)
        //await this.testCase2(rc)
        //await this.testCase3(rc)
        try {
            //await this.testCase4(rc)
        }
        catch (e) {
            rc.isError() && rc.error(rc.getName(this), 'Error in test case 4', e);
        }
        try {
            //Try to insert record which is already exist in DS.
            //await this.testCase5(rc)
        }
        catch (e) {
            rc.isError() && rc.error(rc.getName(this), 'Error in test case 5', e);
        }
        await this.testCase6(rc);
    }
    async testCase6(rc) {
        await __1.Muds.direct(rc, async (directIo) => {
            const curUser1 = directIo.getForInsert(__1.TestUser);
            curUser1.mobileNo = '98765432113';
            curUser1.email = 'test112@obopay.com';
            curUser1.name = 'test';
            const testEtc = new models_1.TestObopay(rc, directIo);
            testEtc.panNo = '1234';
            testEtc.adarNo = '1234';
            curUser1.etcInfo = testEtc;
            directIo.enqueueForUpsert(curUser1);
        });
    }
    async testCase5(rc) {
        await __1.Muds.direct(rc, async (directIo) => {
            const key = this.curUser.getSelfKey();
            console.log('ParentKey while insert --', key);
            const curUser1 = directIo.getForInsert(__1.TestUser, __1.Muds.getIntKey(key.value));
            curUser1.mobileNo = '98765432112';
            curUser1.email = 'test11@obopay.com';
            curUser1.name = 'updated';
            directIo.enqueueForUpsert(curUser1);
        });
    }
    /* Try to create parallel users it should throw error  */
    async testCase4(rc) {
        const req1 = __1.Muds.direct(rc, async (directIo) => {
            const curUser1 = await directIo.getForInsert(__1.TestUser);
            curUser1.mobileNo = '98765432112';
            curUser1.email = 'test11@obopay.com';
            directIo.enqueueForUpsert(curUser1);
        });
        const req2 = __1.Muds.direct(rc, async (directIo) => {
            const curUser2 = await directIo.getForInsert(__1.TestUser);
            curUser2.mobileNo = '98765432112';
            curUser2.email = 'test11@obopay.com';
            directIo.enqueueForUpsert(curUser2);
        });
        const data = await Promise.all([req1, req2]);
        console.log(data);
    }
    /* Updating the current record from the DB and not changing any values */
    async testCase3(rc) {
        const parentKey = this.curUser.getSelfKey();
        await __1.Muds.direct(rc, async (directIo) => {
            const curUser = await directIo.getForUpsert(__1.TestUser, __1.Muds.getIntKey(parentKey.value));
            curUser.mobileNo = '9876543211';
            curUser.email = 'test1@obopay.com';
            await directIo.enqueueForUpsert(curUser);
        });
    }
    /* Insert with ancestors
        and inserting the values with unique fields */
    async testCase2(rc) {
        this.curUser = await __1.Muds.direct(rc, async (directIo) => {
            const curUser = directIo.getForInsert(__1.TestUser);
            curUser.mobileNo = '9876543211';
            curUser.email = 'test1@obopay.com';
            curUser.name = 'aj';
            await directIo.enqueueForUpsert(curUser);
            return curUser;
        });
        const parentKey = this.curUser.getSelfKey();
        console.log('ParentKey after creation --', parentKey);
        const childUser = await __1.Muds.direct(rc, async (directIo) => {
            const childUser = directIo.getForInsert(models_1.ChildUser, __1.Muds.getIntKey(parentKey.value));
            childUser.name = 'TestUser';
            childUser.panNo = 'bkzpaqwer';
            await directIo.enqueueForUpsert(childUser);
            return childUser;
        });
        const childUserKey = childUser.getSelfKey();
        await __1.Muds.direct(rc, async (directIo) => {
            const updatedUser = await directIo.getForUpsert(models_1.ChildUser, __1.Muds.getIntKey(parentKey.value), __1.Muds.getIntKey(childUserKey.value));
            updatedUser.name = 'TestUser';
            updatedUser.panNo = 'bkzpaqwer';
            await directIo.enqueueForUpsert(updatedUser);
            return updatedUser;
        });
    }
    /*
      Normal case for inserting an unique value to ds
    */
    async testCase1(rc) {
        let curUser = await __1.Muds.direct(rc, async (directIo) => {
            const curUser = directIo.getForInsert(__1.TestUser);
            curUser.mobileNo = '9876543210';
            curUser.email = 'test@obopay.com';
            await directIo.enqueueForUpsert(curUser);
            return curUser;
        });
        const key = curUser.getSelfKey();
        curUser = await __1.Muds.direct(rc, async (directIo) => {
            const updatedUser = await directIo.getForUpsert(__1.TestUser, __1.Muds.getIntKey(key.value));
            updatedUser.mobileNo = '9876543210';
            updatedUser.email = 'test@obopay.com';
            await directIo.enqueueForUpsert(updatedUser);
            return updatedUser;
        });
    }
    /*
      Cleaning up all the values of test user and child user data
    */
    async cleanUp(rc) {
        const entitiesToDelete = [];
        await __1.Muds.direct(rc, async (directIo, now) => {
            const keyValQuery = directIo.query(__1.TestUser), parentQuery = directIo.query(models_1.ChildUser), keyVals = await keyValQuery.run(100), Parents = await parentQuery.run(100);
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
exports.TestUniqueMuds = TestUniqueMuds;
//# sourceMappingURL=test-unique-muds.js.map