"use strict";
/*------------------------------------------------------------------------------
   About      : Vision Base
   
   Created on : Tue Nov 19 2019
   Author     : Vishal Sinha
   
   Copyright (c) 2019 Obopay Mobile Technologies Pvt Ltd. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisionBase = void 0;
const error_codes_1 = require("./error-codes");
const smartcrop_gm_1 = require("./smartcrop-gm");
const util_1 = require("../util");
const gMagic = require("gm");
const mime = require("mime-types");
const lo = require("lodash");
const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
class VisionBase {
    static init(rc, useIm) {
        rc.isDebug() && rc.debug(rc.getName(this), 'Initializing VisionBase.');
        this.useImageMagick = !!useIm;
        if (useIm) {
            VisionBase.iMagic = gMagic.subClass({ imageMagick: true });
        }
        else {
            VisionBase.iMagic = gMagic;
        }
    }
    static async processData(rc, imageData, imageOptions, resBase64) {
        const processedReturnVal = await VisionBase.processImage(rc, imageData, imageOptions), retVal = {};
        Object.assign(retVal, processedReturnVal);
        const uStream = new util_1.UStream.ReadStreams(rc, [processedReturnVal.stream]), buffer = await uStream.read(util_1.UStream.Encoding.bin);
        retVal.data = resBase64 ? buffer.toString('base64') : buffer;
        return retVal;
    }
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                INTERNAL  FUNCTIONS
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    static async processImage(rc, imageData, imageOptions) {
        const retVal = {};
        try {
            const gmImage = VisionBase.iMagic(imageData).setFormat('jpeg'), croppedImage = imageOptions.ratio
                ? await VisionBase.processRatio(rc, gmImage, imageOptions.ratio)
                : gmImage, shrunkImage = imageOptions.shrink
                ? await VisionBase.shrinkImage(rc, croppedImage, imageOptions.shrink)
                : croppedImage, finalImage = imageOptions.progressive
                ? await VisionBase.getProgressiveImage(rc, shrunkImage, imageOptions)
                : shrunkImage, dimensions = await VisionBase.getDimensions(rc, lo.cloneDeep(finalImage));
            retVal.width = dimensions.width;
            retVal.height = dimensions.height;
            retVal.mime = await VisionBase.getGmMime(rc, lo.cloneDeep(finalImage));
            retVal.palette = await VisionBase.getTopColors(rc, lo.cloneDeep(finalImage));
            finalImage.setFormat('jpeg');
            retVal.stream = finalImage.stream();
            return retVal;
        }
        catch (error) {
            rc.isError() && rc.error(rc.getName(this), 'Error in processing image.', error);
            throw (error);
        }
    }
    static async getProgressiveImage(rc, gmImage, imageOptions) {
        const gmImageBuffer = await VisionBase.getGmBuffer(rc, gmImage), quality = imageOptions.quality || 100, progressiveBuffer = await imagemin.buffer(gmImageBuffer, { plugins: [imageminMozjpeg({ quality, progressive: true })] });
        return VisionBase.iMagic(progressiveBuffer);
    }
    static async processRatio(rc, gmImage, ratio) {
        const bufferImage = await VisionBase.getGmBuffer(rc, lo.cloneDeep(gmImage)), dimensions = await VisionBase.getDimensions(rc, lo.cloneDeep(gmImage)), w = dimensions.width, h = dimensions.height, maxW = (w / ratio > h) ? h * ratio : w, maxH = (w / ratio < h) ? w / ratio : h, scgm = new smartcrop_gm_1.SmartCropGM(rc, dimensions.width, dimensions.height, VisionBase.useImageMagick), crop = (await scgm.crop(bufferImage, { width: 100, height: 100 })).topCrop, x = (maxW + crop.x > w) ? (crop.x - ((maxW + crop.x) - w)) : crop.x, y = (maxH + crop.y > h) ? (crop.y - ((maxH + crop.y) - h)) : crop.y;
        return gmImage.crop(maxW, maxH, x, y);
    }
    static async shrinkImage(rc, gmImage, shrink) {
        const dimensions = await VisionBase.getDimensions(rc, lo.cloneDeep(gmImage));
        if (shrink && shrink.w && shrink.h && shrink.w <= dimensions.width && shrink.h <= dimensions.height) {
            return gmImage.resize(shrink.w, shrink.h, '!');
        }
        return gmImage;
    }
    static async getDimensions(rc, gmImage) {
        return await new Promise((resolve, reject) => {
            gmImage.identify((err, value) => {
                if (err) {
                    rc.isError() && rc.error(rc.getName(this), 'Error in identifying image buffer.', err);
                    reject(err);
                }
                resolve({ width: value.size.width, height: value.size.height });
            });
        });
    }
    static async getGmBuffer(rc, gmImage) {
        return new Promise((resolve, reject) => {
            gmImage.toBuffer((error, buffer) => {
                if (error) {
                    rc.isError() && rc.error(rc.getName(this), 'Error in converting gm image to buffer.', error);
                    reject(error_codes_1.VISION_ERROR_CODES.IMAGE_PROCESSING_FAILED);
                }
                resolve(buffer);
            });
        });
    }
    static async getGmMime(rc, gmImage) {
        return new Promise((resolve, reject) => {
            gmImage.format((error, data) => {
                if (error) {
                    rc.isError() && rc.error(rc.getName(this), 'Error in formating gm image to mime.', error);
                    reject(error_codes_1.VISION_ERROR_CODES.IMAGE_PROCESSING_FAILED);
                }
                resolve(mime.lookup(data) || '');
            });
        });
    }
    static async getTopColors(rc, gmImage, count = 8) {
        const HIST_START = 'comment={', HIST_END = '\x0A}';
        const strData = await new Promise((resolve, reject) => {
            gmImage
                .noProfile()
                .colors(count)
                .toBuffer('histogram', (error, buffer) => {
                error && rc.isWarn() && rc.warn(rc.getName(this), `${error_codes_1.VISION_ERROR_CODES.PALETTE_DETECTION_FAILED} : ${error}`);
                if (!buffer)
                    return resolve('');
                resolve(buffer.toString());
            });
        });
        const beginIndex = strData.indexOf(HIST_START) + HIST_START.length + 1, endIndex = strData.indexOf(HIST_END), cData = strData.slice(beginIndex, endIndex).split('\n');
        if (cData.length > count)
            cData.splice(0, cData.length - count);
        if (beginIndex === -1 || endIndex === -1)
            return [];
        return lo.map(cData, VisionBase.parseHistogramLine);
    }
    static parseHistogramLine(xs) {
        xs = xs.trim().split(':');
        if (xs.length !== 2)
            return null;
        const res = xs[1].split('(')[1].split(')')[0].split(',');
        return {
            r: Number(res[0]),
            g: Number(res[1]),
            b: Number(res[2])
        };
    }
}
exports.VisionBase = VisionBase;
//# sourceMappingURL=vision-base.js.map