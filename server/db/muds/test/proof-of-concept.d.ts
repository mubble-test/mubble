import { RunContextServer } from '../../../rc-server';
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
export declare class POCTests {
    private static ts;
    /**
     * Test is the transaction is working when somebody updates the entity outside transaction
     */
    static testCase1(rc: RunContextServer): Promise<void>;
    /**
     * Test time taken in batching of 500 Vs 100 * 5 (Promise.all)
     */
    testCase2(): Promise<void>;
}
