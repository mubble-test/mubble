import { RunContextServer } from '../../../rc-server';
export * from './test-unique-muds';
export declare class MudsTests {
    private ts;
    run(rc: RunContextServer): Promise<void>;
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
    private testCase1;
    /**
     * Multiple entities of same ancestor are updated in the same transaction.
     *
     * Models Used
     *  - Parent   -> Parent model
     *  - KeyValue -> child model
     *
     *  - Update the KeyVal entry with key = (ts + 1) and (ts + 2)
     */
    private testCase2;
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
    private testCase3;
    /**
     * Updates the `strValue` field with a provided string after trying to get a
     * non existant entity, in a transaction.
     */
    private case3Helper;
}
