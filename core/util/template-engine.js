"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Tue Apr 24 2018
   Author     : Raghvendra Varma
   
   Copyright (c) 2018 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expandTemplateObj = exports.expandTemplate = void 0;
var doT = __importStar(require("dot"));
// const dotSettings = {
//   evaluate: /<([\s\S]+?)>/g,
//   interpolate: /<=([\s\S]+?)>/g,
//   encode: /<!([\s\S]+?)>/g,
//   use: /<#([\s\S]+?)>/g,
//   useParams: /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
//   define: /<##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#>/g,
//   defineParams: /^\s*([\w$]+):([\s\S]+)/,
//   conditional: /<\?(\?)?\s*([\s\S]*?)\s*>/g,
//   iterate: /<~\s*(?:>|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*>)/g,
//   varname: 'it',
//   strip: false,
//   append: true,
//   selfcontained: false
// }
var dotSettings = {
    evaluate: /\{\{([\s\S]+?)\}\}/g,
    interpolate: /\{\{=([\s\S]+?)\}\}/g,
    encode: /\{\{!([\s\S]+?)\}\}/g,
    use: /\{\{#([\s\S]+?)\}\}/g,
    useParams: /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
    define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
    defineParams: /^\s*([\w$]+):([\s\S]+)/,
    conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
    iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
    varname: 'it',
    strip: true,
    append: true,
    selfcontained: false
};
function expandTemplate(template, data) {
    var fn = doT.template(template, dotSettings);
    return fn(data);
}
exports.expandTemplate = expandTemplate;
function expandTemplateObj(templateObj, data) {
    var keys = Object.keys(data);
    dotSettings.varname = keys.join(', ');
    var newObj = {};
    for (var _i = 0, _a = Object.keys(templateObj); _i < _a.length; _i++) {
        var key = _a[_i];
        if (typeof templateObj[key] === 'object') {
            var childObj = expandTemplateObj(templateObj[key], data);
            newObj[key] = childObj;
        }
        else {
            var fn = doT.template(templateObj[key], dotSettings);
            newObj[key] = fn.apply(doT, keys.map(function (key) { return data[key]; }));
        }
    }
    return newObj;
}
exports.expandTemplateObj = expandTemplateObj;
//# sourceMappingURL=template-engine.js.map