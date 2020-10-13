"use strict";
/*------------------------------------------------------------------------------
   About      : Vision Errors
   
   Created on : Tue Nov 19 2019
   Author     : Vishal Sinha
   
   Copyright (c) 2019 Obopay Mobile Technologies Pvt Ltd. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisionError = exports.VISION_ERROR_CODES = void 0;
exports.VISION_ERROR_CODES = {
    CROP_DETECTION_FAILED: 'CROP_DETECTION_FAILED',
    JIMP_FAILED_TO_READ: 'JIMP_FAILED_TO_READ',
    IMAGE_PROCESSING_FAILED: 'IMAGE_PROCESSING_FAILED',
    PALETTE_DETECTION_FAILED: 'PALETTE_DETECTION_FAILED'
};
class VisionError extends Error {
    constructor(name, msg) {
        super(msg);
        super['name'] = name;
    }
}
exports.VisionError = VisionError;
//# sourceMappingURL=error-codes.js.map