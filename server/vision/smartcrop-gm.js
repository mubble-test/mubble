"use strict";
/*------------------------------------------------------------------------------
   About      : Smartcrop used with gm
   
   Created on : Wed Jan 17 2018
   Author     : Vishal SInha
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartCropGM = void 0;
const gMagic = require("gm");
const smartcrop = require('smartcrop');
class SmartCropGM {
    constructor(rc, width, height, useIm) {
        this.width = width;
        this.height = height;
        if (useIm) {
            this.iMagic = gMagic.subClass({ imageMagick: true });
        }
        else {
            this.iMagic = gMagic;
        }
    }
    async crop(img, options) {
        options = options || {};
        options.imageOperations = {
            open: this.open.bind(this),
            resample: this.resample,
            getData: this.getData
        };
        return smartcrop.crop(img, options);
    }
    async open(src) {
        return { width: this.width, height: this.height, _gm: this.iMagic(src) };
    }
    async resample(image, width, height) {
        return new Promise((resolve, reject) => {
            resolve({
                width: Math.floor(width),
                height: Math.floor(height),
                _gm: image._gm
            });
        });
    }
    async getData(image) {
        return new Promise((resolve, reject) => {
            image._gm
                .resize(image.width, image.height, '!')
                .toBuffer('RGBA', (err, buffer) => {
                if (err)
                    reject(err);
                resolve(new smartcrop.ImgData(image.width, image.height, buffer));
            });
        });
    }
}
exports.SmartCropGM = SmartCropGM;
//# sourceMappingURL=smartcrop-gm.js.map