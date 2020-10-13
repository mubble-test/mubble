"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_masker_1 = require("@mubble/core/src/data-masker");
describe('DataMasker', () => {
    it('maskData works', () => {
        const maskedData = data_masker_1.DataMasker.maskData({
            maskKey: 'key',
            maskWith: '*',
            startSkipCount: 2,
            endSkipCount: 2
        }, 'HelloWorld');
        expect(maskedData).toBe("He******ld");
    });
    it('maskData with default params', () => {
        const maskedData = data_masker_1.DataMasker.maskData({
            maskKey: 'key'
        }, 'HelloWorld');
        expect(maskedData).toBe("**********");
    });
    it('maskData with invalid skip params', () => {
        const maskedData = data_masker_1.DataMasker.maskData({
            maskKey: 'key',
            startSkipCount: 10,
            endSkipCount: 10
        }, 'HelloWorld');
        expect(maskedData).not.toBe('HelloWorld');
    });
});
//# sourceMappingURL=test-symlink.js.map