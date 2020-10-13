import { RunContextServer } from '../rc-server';
import { BigQuery } from '@google-cloud/bigquery';
export declare class GcloudEnv {
    namespace: string;
    bigQuery: BigQuery;
    projectId: string;
    credentialFilePath: string;
    constructor(namespace: string);
    static init(rc: RunContextServer, projectId: string, credentialsPath: string): Promise<GcloudEnv>;
    private static initGcpComponents;
}
