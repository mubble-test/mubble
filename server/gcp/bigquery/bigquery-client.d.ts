import { RunContextServer } from "../../rc-server";
import { BigQuery } from '@google-cloud/bigquery';
import { GcloudEnv } from "../gcloud-env";
export declare class BigQueryClient {
    static _bigQuery: BigQuery;
    private static initialized;
    constructor(rc: RunContextServer);
    static init(rc: RunContextServer, gcloudEnv: GcloudEnv): void;
}
