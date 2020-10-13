/// <reference types="node" />
import { Response } from './https-request';
import { RunContextServer } from '../rc-server';
import * as http from 'http';
import * as url from 'url';
import * as request from 'request';
import * as stream from 'stream';
export declare type NCRequestOptions = request.UrlOptions & request.CoreOptions;
export declare function executeHttpsRequest(rc: RunContextServer, urlStr: string, headers?: any, encoding?: string): Promise<string>;
export declare function getStream(rc: RunContextServer, urlStr: string, headers?: any, encoding?: string): Promise<stream>;
export declare function executeHttpsWithOptions(rc: RunContextServer, urlObj: any, inputData?: string): Promise<string>;
export declare function expandUrl(rc: RunContextServer, shortUrl: string): Promise<string | undefined>;
/**
 * This is recommended to be used for https request.
 * returns {error: string | undefined, statusCode: number | undefined, data: any}
 *
 * Caller has to process this result as per their need
 *
 * Execute http and return result data as well as response code.
 * Drupal SEO server data sync request fails with # 200 status code and error msg
 */
export declare function executeHttpResultResponse(rc: RunContextServer, options: http.RequestOptions, inputData?: string, encoding?: string): Promise<{
    error: string | undefined;
    response: any;
    data: string;
}>;
export declare function httpRequest(rc: RunContextServer, options: NCRequestOptions): Promise<{
    error: string | undefined;
    response: any;
    data: string | any;
}>;
/**
 * http(s) request for passing http options along with url.
 * To pass query params, pass in urlObj.query as object.
 * To pass JSON, pass in data as JSON string.
 */
export declare function executeHttpsRequestWithOptions(rc: RunContextServer, urlObj: url.UrlObject, options?: http.RequestOptions, data?: string): Promise<Response>;
