import { Provider, SmsProvider } from './sms-interfaces';
import { RunContextServer } from '../rc-server';
import { RedisWrapper } from '../cache';
export declare class GatewayScoring {
    private providers;
    private vRedis;
    constructor(rc: RunContextServer, trRedis: RedisWrapper, providers: Array<Provider>);
    get providerList(): Array<Provider>;
    /**
     * Populates the providers list for global use
     *
     * @param rc Run context
     * @param providers Array of providers
     *
     * @returns void
     */
    populateProviders(rc: RunContextServer, providers: Array<Provider>): void;
    /**
     * Finds the best fit provider
     *
     * @param rc Run context
     * @param ts timestamp to fetch provider score
     * @param excludedGws Providers to be excluded
     *
     * @returns name of the provider
     */
    findBestGatewayProvider(rc: RunContextServer, ts: number, excludedGws?: Array<string>): Promise<keyof typeof SmsProvider>;
    /**
     * Updates the downtime count of provider
     *
     * @param rc Run context
     * @param gw Name of provider whose downtime needs to be updated
     * @param failed Flag signifying if provider failed
     *
     * @returns void
     */
    updateGatewayDownTime(rc: RunContextServer, gw: string, failed: boolean): Promise<void>;
    /**
     * Updates the score of provider iff lock is available
     *
     * @param rc Run context
     * @param gw name of provider whose score needs to be updated
     * @param ts timestamp
     *
     * @returns void
     */
    updateGatewayProviderPerformance(rc: RunContextServer, gw: string, ts: number, msTaken: number): Promise<void>;
    private getAllGatewayProviders;
    private checkGatewayLock;
    private getGatewayProviderScore;
    private refreshGatewayProviderScore;
    private unlockGatewayScoring;
    private lockGatewayScoring;
    private getRedisKeyScore;
    private recentHHMM;
}
