/// <reference types="node" />
import { VisionParameters, ProcessedReturn } from './types';
import { RunContextServer } from '../rc-server';
import * as gMagic from 'gm';
export declare class VisionBase {
    private static iMagic;
    private static useImageMagick;
    static init(rc: RunContextServer, useIm?: boolean): void;
    static processData(rc: RunContextServer, imageData: Buffer, imageOptions: VisionParameters, resBase64: boolean): Promise<ProcessedReturn>;
    private static processImage;
    private static getProgressiveImage;
    private static processRatio;
    private static shrinkImage;
    private static getDimensions;
    private static getGmBuffer;
    private static getGmMime;
    static getTopColors(rc: RunContextServer, gmImage: gMagic.State, count?: number): Promise<({
        r: number;
        g: number;
        b: number;
    } | null)[]>;
    private static parseHistogramLine;
}
