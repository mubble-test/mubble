import { Mubble, ConnectionInfo } from '@mubble/core';
import { RunContextServer } from '../rc-server';
export declare type ConnectionObject = {
    ci: ConnectionInfo;
    obj: Mubble.uObject<any>;
};
export declare namespace ConnectionMap {
    function addActiveConnection(rc: RunContextServer, id: number | string, co: ConnectionObject): void;
    function getActiveConnection(rc: RunContextServer, id: number | string): ConnectionObject | undefined;
    function removeActiveConnection(rc: RunContextServer, id: number | string): void;
}
