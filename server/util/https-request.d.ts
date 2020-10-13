/// <reference types="node" />
import { Mubble } from '@mubble/core';
import { RunContextServer } from '../rc-server';
import * as http from 'http';
import * as url from 'url';
export declare type Response = {
    timeTakenMs: number;
    response: string;
    statusCode: number;
    headers: Mubble.uObject<any>;
};
export declare type LogResult = {
    requestId: string;
    requestTs: number;
    url: string;
    requestTimeoutTs: number;
    requestHeaders?: Mubble.uObject<any>;
    payload: string;
    timeTakenMs: number;
    responseTs?: number;
    status?: number;
    responseHeaders?: Mubble.uObject<any>;
    response?: string;
    error?: Error;
    timedOut?: boolean;
    extraLogInfo?: string;
};
export declare class HttpsRequest {
    private hostname;
    private logger;
    private logPath;
    /**
     * Creates HttpsRequest.
     * @param rc RunContext, used for logging.
     * @param logBaseDir Directory path for http(s) logger.
     * @param hostname Hostname for http(s) logger.
     */
    constructor(rc: RunContextServer, logBaseDir: string, hostname: string);
    /**
     * Function to execute http(s) request.
     * @param rc RunContext, used for logging.
     * @param urlObj URL object for http(s) request.
     * @param options Options for http(s) request.
     * @param data Request payload.
     * @param extraLogInfo Any extra info for http(s) logger.
     */
    executeRequest(rc: RunContextServer, urlObj: url.UrlObject, options?: http.RequestOptions, data?: Mubble.uObject<any> | string, extraLogInfo?: string): Promise<Response>;
    /**
     * Function to extract results from log files. The request time and response time will be in UTC.
     * @param rc RunContext, used for logging.
     * @param fromTs Start timestamp to fetch results from.
     * @param toTs End timestamp to fetch results upto.
     */
    extractResults(rc: RunContextServer, fromTs: number, toTs: number): Array<LogResult>;
    private createLogger;
    private log;
    private convertLinesToRows;
    private convertToLogResult;
    private convertDateTimeToTs;
    private getDoubleDigits;
}
