import { RunContextServer } from '../rc-server';
import { Master } from './ma-base';
import { MasterRegistry } from './ma-registry';
export declare type MasterValidationRule = (rc: RunContextServer, reg: MasterRegistry, rec: any[]) => void;
export declare const MasterTsField = "modTs";
export declare abstract class ModelConfig {
    protected hasFileSource: boolean;
    protected cache: boolean;
    protected segment?: {
        key: string;
        cols: string[];
    };
    protected fkConstrains: Master.ForeignKeys;
    protected accompanyMasters: string[];
    protected masterTsField: string;
    protected cachedFields?: {
        fields: string[];
        cache: boolean;
    };
    protected destSynFields?: {
        fields: string[];
        cache: boolean;
    };
    protected srcValidationrules: MasterValidationRule[];
    getMasterTsField(): string;
    getSrcValidationrules(): MasterValidationRule[];
    getHasFileSource(): boolean;
    getDependencyMasters(): string[];
    getForeignKeys(): Master.ForeignKeys;
    getCached(): boolean;
    getCachedFields(): {
        fields: string[];
        cache: boolean;
    };
    getDestSynFields(): {
        fields: string[];
        cache: boolean;
    };
    getSegment(): {
        key: string;
        cols: string[];
    } | undefined;
}
export declare class MasterModelConfig extends ModelConfig {
    protected modConfigName: string;
    constructor(modConfigName: string);
}
