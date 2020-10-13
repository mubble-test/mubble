"use strict";
/*------------------------------------------------------------------------------
   About      : Typescript Typings for Mammmoth
   
   Created on : Mon Jan 15 2018
   Author     : Christy George
   
   Copyright (c) 2018 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.MVerticalAlignment = exports.MType = exports.mammoth = void 0;
exports.mammoth = require('mammoth');
var MType;
(function (MType) {
    MType["document"] = "document";
    MType["paragraph"] = "paragraph";
    MType["run"] = "run";
    MType["text"] = "text";
    MType["tab"] = "tab";
    MType["hyperlink"] = "hyperlink";
    MType["noteReference"] = "noteReference";
    MType["image"] = "image";
    MType["note"] = "note";
    MType["commentReference"] = "commentReference";
    MType["comment"] = "comment";
    MType["table"] = "table";
    MType["tableRow"] = "tableRow";
    MType["tableCell"] = "tableCell";
    MType["break"] = "break";
    MType["bookmarkStart"] = "bookmarkStart";
})(MType = exports.MType || (exports.MType = {}));
var MVerticalAlignment;
(function (MVerticalAlignment) {
    MVerticalAlignment["baseline"] = "baseline";
    MVerticalAlignment["superscript"] = "superscript";
    MVerticalAlignment["subscript"] = "subscript";
})(MVerticalAlignment = exports.MVerticalAlignment || (exports.MVerticalAlignment = {}));
;
//# sourceMappingURL=mammoth.js.map