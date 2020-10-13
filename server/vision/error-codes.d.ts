export declare const VISION_ERROR_CODES: {
    CROP_DETECTION_FAILED: string;
    JIMP_FAILED_TO_READ: string;
    IMAGE_PROCESSING_FAILED: string;
    PALETTE_DETECTION_FAILED: string;
};
export declare class VisionError extends Error {
    constructor(name: string, msg: string);
}
