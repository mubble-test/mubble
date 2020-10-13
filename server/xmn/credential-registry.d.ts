export interface ServerCredentials {
    id: string;
    syncHash: string;
    host: string;
    port: number;
    permittedIps: Array<string>;
    unsecured: boolean;
}
export interface CredentialRegistry {
    getCredential(id: string): ServerCredentials | undefined;
}
export interface AppCredentials {
    appShortName: string;
    permittedIps: Array<string>;
}
export interface AppRegistry {
    getCredential(appShortName: string): AppCredentials | undefined;
}
