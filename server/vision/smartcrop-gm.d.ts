import { RunContextServer } from '../rc-server';
export declare class SmartCropGM {
    private width;
    private height;
    private iMagic;
    constructor(rc: RunContextServer, width: number, height: number, useIm?: boolean);
    crop(img: any, options: any): Promise<any>;
    private open;
    private resample;
    private getData;
}
