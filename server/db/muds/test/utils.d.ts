import { RunContextServer } from '../../../rc-server';
import * as models from './models';
export declare class TestUtils {
    static updateKeyValue(rc: RunContextServer, parentId: number, id: number, updateRec: {
        [i: string]: any;
    }): Promise<any>;
    /**
     * Populate the db wrt the provided parent and children keys
     *
     */
    static prepareData(rc: RunContextServer, parentKey: any, ...childrenKeys: any[]): Promise<models.KeyValue>;
    /**
     * Delete all the Parent and KeyValue Entries
     *
     */
    static cleanUp(rc: RunContextServer): Promise<void>;
}
