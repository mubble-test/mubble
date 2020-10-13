/// <reference types="node" />
import * as stream from 'stream';
export declare type VisionParameters = {
    ratio?: number;
    quality?: number;
    shrink?: {
        h: number;
        w: number;
    };
    progressive?: boolean;
};
export declare type ProcessedReturn = {
    data: string | Buffer;
    mime: string;
    height: number;
    width: number;
    palette: rgb[];
};
export declare type SmartCropProcessReturn = {
    mime: string;
    height: number;
    width: number;
    palette: rgb[];
    stream: stream.Readable;
};
export declare type rgb = {
    r: number;
    g: number;
    b: number;
};
