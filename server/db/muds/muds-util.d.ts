import { Muds } from './muds';
import { MudsEntityInfo, MeField } from './muds-manager';
import { MudsBaseStruct } from './muds-base-entity';
import { Mubble } from '@mubble/core';
import { RunContextServer } from '../..';
export declare class MudsUtil {
    private static targetDateTs;
    static isClassStruct(cls: any): boolean;
    static getStructClass(me: MeField): Muds.IBaseStruct<MudsBaseStruct> | null;
    static checkIndexed(rc: RunContextServer, entityInfoMap: Mubble.uObject<MudsEntityInfo>, dottedStr: string, inEntityName: string): MeField | undefined;
    static getReferredField(rc: RunContextServer, entityInfoMap: Mubble.uObject<MudsEntityInfo>, dottedStr: string, inEntityName: string): MeField | undefined;
    static getMpoc(ts?: number): number;
    static getUniques(rc: RunContextServer, entity: MudsBaseStruct, uniques: Array<Object>, prefix?: string): number;
}
