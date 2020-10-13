"use strict";
/*------------------------------------------------------------------------------
    About      : Sms providers scoring
    
    Created on : Mon Mar 02 2020
    Author     : Vedant Pandey
    
    Copyright (c) 2020 Obopay. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayScoring = void 0;
const sms_errors_1 = require("./sms-errors");
const core_1 = require("@mubble/core");
const sms_constants_1 = require("./sms-constants");
const lo = require("lodash");
class GatewayScoring {
    constructor(rc, trRedis, providers) {
        this.providers = providers;
        this.vRedis = trRedis;
    }
    get providerList() {
        return this.providers;
    }
    /**
     * Populates the providers list for global use
     *
     * @param rc Run context
     * @param providers Array of providers
     *
     * @returns void
     */
    populateProviders(rc, providers) {
        this.providers = providers;
    }
    /**
     * Finds the best fit provider
     *
     * @param rc Run context
     * @param ts timestamp to fetch provider score
     * @param excludedGws Providers to be excluded
     *
     * @returns name of the provider
     */
    async findBestGatewayProvider(rc, ts, excludedGws) {
        const providers = this.getAllGatewayProviders();
        if (!providers.length) {
            rc.isError() && rc.error(rc.getName(this), 'No provider available', providers);
            throw new sms_errors_1.SmsError(sms_errors_1.SmsErrorCodes.PROVIDER_NOT_AVAILABLE, sms_errors_1.SmsErrorMessages.PROVIDER_NOT_AVAILABLE);
        }
        if (excludedGws && excludedGws.length) {
            lo.pullAll(providers, excludedGws);
            rc.isDebug() && rc.debug(rc.getName(this), `Excluded ${excludedGws.length} from consideration,`, `since they failed earlier. ${excludedGws}`);
        }
        if (providers.length === 1)
            return providers[0];
        let filteredProviders;
        try {
            const resp = await this.vRedis.redisCommand().mget(...(providers.map(provider => sms_constants_1.SmsConstants.REDIS_PROVIDER_DOWN + provider)));
            filteredProviders = providers.filter((_, index) => (resp[index] || 0) <= sms_constants_1.SmsConstants.MAX_GW_FAIL_COUNT);
        }
        catch (e) {
            rc.isError() && rc.error(rc.getName(this), 'No working provider available.', filteredProviders);
            throw new sms_errors_1.SmsError(sms_errors_1.SmsErrorCodes.PROVIDER_NOT_AVAILABLE, sms_errors_1.SmsErrorMessages.PROVIDER_NOT_AVAILABLE);
        }
        if (filteredProviders.length > 0) {
            if (filteredProviders.length === 1) {
                rc.isDebug() && rc.debug(rc.getName(this), `After performance consideration, only one provider left, returning ${filteredProviders[0]}`);
                return filteredProviders[0];
            }
            const scores = await Promise.all(filteredProviders.map(provider => this.getGatewayProviderScore(rc, provider, ts)));
            lo.sortBy(scores, (score) => score.score);
            let winningScore = scores[0].score, winningGw = scores[0].provider;
            rc.isDebug() && rc.debug(rc.getName(this), `Best gw provider : ${winningGw} with score : ${winningScore}.`);
            return winningGw;
        }
        else {
            rc.isError() && rc.error(rc.getName(this), 'No working provider available.', filteredProviders);
            throw new sms_errors_1.SmsError(sms_errors_1.SmsErrorCodes.PROVIDER_NOT_AVAILABLE, sms_errors_1.SmsErrorMessages.PROVIDER_NOT_AVAILABLE);
        }
    }
    /**
     * Updates the downtime count of provider
     *
     * @param rc Run context
     * @param gw Name of provider whose downtime needs to be updated
     * @param failed Flag signifying if provider failed
     *
     * @returns void
     */
    async updateGatewayDownTime(rc, gw, failed) {
        const key = sms_constants_1.SmsConstants.REDIS_PROVIDER_DOWN + gw, multi = this.vRedis.redisMulti();
        try {
            rc.isDebug() && rc.debug(rc.getName(this), 'updateGatewayDownTime', { gw: gw, failed: failed });
            if (failed) {
                multi.incr(key); // Increase downtime if failed
            }
            else {
                multi.set(key, 0); // Otherwise reset the downtime to zero
            }
            multi.expire(key, sms_constants_1.SmsConstants.REDIS_DOWN_EXPIRY_MS / 1000);
            await this.vRedis.execRedisMulti(multi);
        }
        catch (e) {
            rc.isError() && rc.error(rc.getName(this), `Error in updating gw down time : ${e}`);
        }
    }
    /**
     * Updates the score of provider iff lock is available
     *
     * @param rc Run context
     * @param gw name of provider whose score needs to be updated
     * @param ts timestamp
     *
     * @returns void
     */
    async updateGatewayProviderPerformance(rc, gw, ts, msTaken) {
        const providerLocked = await this.checkGatewayLock(rc, gw, ts);
        if (providerLocked)
            return;
        const hhmm = this.recentHHMM(rc, ts), key = sms_constants_1.SmsConstants.REDIS_PROVIDER_HHMM_SCORE + gw + sms_constants_1.SmsConstants.REDIS_SEP + hhmm, multi = this.vRedis.redisMulti();
        try {
            rc.isDebug() && rc.debug(rc.getName(this), 'updateGatewayProviderPerformance', { gw, ts, msTaken });
            {
                (await this.vRedis.redisCommand().exists(key)) // Check if the key is present in redis
                    ||
                        (await this.refreshGatewayProviderScore(rc, gw, ts)); // Iff key is not present then refresh the gateway score
            }
            const scoreObj = JSON.parse(await this.vRedis.redisCommand().get(key));
            scoreObj.currentTotal += msTaken;
            scoreObj.currentCount++;
            multi.set(key, JSON.stringify(scoreObj));
            multi.expire(key, sms_constants_1.SmsConstants.REDIS_SCORE_EXPIRY_MS / 1000);
            await this.vRedis.execRedisMulti(multi);
        }
        catch (e) {
            rc.isError() && rc.error(rc.getName(this), `Error in updating gw provider performance : ${e}.`);
        }
    }
    /*----------------------------------------------------------------------------
                                                        INTERNAL SUPPORT FUNCTIONS
    ----------------------------------------------------------------------------*/
    // Fetches all the providers in the system
    getAllGatewayProviders() {
        const providers = Object.keys(this.providers);
        return providers;
    }
    // Checks if the provider score is currently locked
    async checkGatewayLock(rc, gw, ts) {
        const key = sms_constants_1.SmsConstants.REDIS_PROVIDER_HHMM_LOCK + gw + sms_constants_1.SmsConstants.REDIS_SEP + this.recentHHMM(rc, ts);
        return await this.vRedis.redisCommand().exists(key);
    }
    // Returns the current score of any gw provider
    async getGatewayProviderScore(rc, gw, ts) {
        const hhmm = this.recentHHMM(rc, ts), key = sms_constants_1.SmsConstants.REDIS_PROVIDER_HHMM_SCORE + gw + sms_constants_1.SmsConstants.REDIS_SEP + hhmm, found = await this.vRedis.redisCommand().exists(key);
        if (!found)
            await this.refreshGatewayProviderScore(rc, gw, ts);
        return { provider: gw, score: await this.getRedisKeyScore(rc, key) };
    }
    // Refreshes gw provider score or creates new if doesn't already exist
    async refreshGatewayProviderScore(rc, gw, ts) {
        try {
            await this.lockGatewayScoring(rc, gw, ts);
            let score = 0, newTs = ts - sms_constants_1.SmsConstants.TWELVE_HOUR_MS, weightageFactor = sms_constants_1.SmsConstants.LOWEST_WEIGHTAGE;
            while (weightageFactor <= sms_constants_1.SmsConstants.HIGHEST_WEIGHTAGE) {
                const hhmm = this.recentHHMM(rc, newTs), key = sms_constants_1.SmsConstants.REDIS_PROVIDER_HHMM_SCORE + gw + sms_constants_1.SmsConstants.REDIS_SEP + hhmm, found = await this.vRedis.redisCommand().exists(key);
                let thisScore = 0;
                if (found)
                    thisScore = await this.getRedisKeyScore(rc, key);
                score += (thisScore * weightageFactor);
                newTs += sms_constants_1.SmsConstants.THIRTY_MINUTE_MS;
                weightageFactor++;
            }
            score = score / sms_constants_1.SmsConstants.TOTAL_WEIGHTAGE;
            const scoreObj = {
                lastWeightedAverage: score,
                currentTotal: 0,
                currentCount: 0
            };
            const hhmm = this.recentHHMM(rc, ts), key = sms_constants_1.SmsConstants.REDIS_PROVIDER_HHMM_SCORE + gw + sms_constants_1.SmsConstants.REDIS_SEP + hhmm, multi = this.vRedis.redisMulti();
            multi.set(key, JSON.stringify(scoreObj));
            multi.expire(key, sms_constants_1.SmsConstants.REDIS_SCORE_EXPIRY_MS / 1000);
            await this.vRedis.execRedisMulti(multi);
            await this.unlockGatewayScoring(rc, gw, ts);
        }
        catch (err) {
            rc.isError() && rc.error(rc.getName(this), `Error in refreshing gw provider score : ${err}.`);
        }
    }
    // Unlock the provider for editing the score
    async unlockGatewayScoring(rc, gw, ts) {
        const key = sms_constants_1.SmsConstants.REDIS_PROVIDER_HHMM_LOCK + gw + sms_constants_1.SmsConstants.REDIS_SEP + this.recentHHMM(rc, ts);
        return await this.vRedis.redisCommand().del(key);
    }
    // Lock the provider for editing the score
    async lockGatewayScoring(rc, gw, ts) {
        const key = sms_constants_1.SmsConstants.REDIS_PROVIDER_HHMM_LOCK + gw + sms_constants_1.SmsConstants.REDIS_SEP + this.recentHHMM(rc, ts), multi = this.vRedis.redisMulti();
        multi.set(key, Date.now() + sms_constants_1.SmsConstants.SCORE_LOCK_MS, 'NX');
        multi.expire(key, sms_constants_1.SmsConstants.SCORE_LOCK_MS / 1000);
        return await this.vRedis.execRedisMulti(multi);
    }
    // Get the score of the redis key
    async getRedisKeyScore(rc, redisKey) {
        const scoreObj = JSON.parse(await this.vRedis.redisCommand().get(redisKey));
        if (scoreObj.currentCount > 0) {
            return ((scoreObj.lastWeightedAverage * (sms_constants_1.SmsConstants.TOTAL_WEIGHTAGE - sms_constants_1.SmsConstants.HIGHEST_WEIGHTAGE))
                + ((scoreObj.currentTotal * sms_constants_1.SmsConstants.HIGHEST_WEIGHTAGE) / scoreObj.currentCount)) / sms_constants_1.SmsConstants.TOTAL_WEIGHTAGE;
        }
        else {
            return scoreObj.lastWeightedAverage;
        }
    }
    // Get the HH:MM nearest to the timestamp
    recentHHMM(rc, ts) {
        if (!ts)
            ts = Date.now();
        const nearest30minTS = ts - (ts % sms_constants_1.SmsConstants.THIRTY_MINUTE_MS);
        return core_1.format(new Date(nearest30minTS), '%hh%:%MM%');
    }
}
exports.GatewayScoring = GatewayScoring;
//# sourceMappingURL=gw-scoring.js.map