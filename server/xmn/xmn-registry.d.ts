import { RunContextServer } from '../rc-server';
import { XmnRouterServer } from './xmn-router-server';
export interface EnrollmentInfo {
    name: string;
    isApi: boolean;
    parent: any;
    xmnInfo: any;
}
export declare class XmnRegistry {
    private static register;
    static enrollApi(name: string, parent: any, xmnInfo: any): void;
    static enrollEvent(name: string, parent: any, xmnInfo: any): void;
    static commitRegister(rc: RunContextServer, router: XmnRouterServer, providers: any[]): void;
    private static checkForProvider;
}
