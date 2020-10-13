(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common'), require('@angular/flex-layout'), require('@angular/material/core'), require('@angular/material/checkbox'), require('@angular/material/datepicker'), require('@angular/material/form-field'), require('@angular/material/input'), require('@angular/material/select'), require('@angular/material/autocomplete'), require('@angular/material/radio'), require('@angular/material/progress-bar'), require('@angular/material/slider'), require('@angular/material/slide-toggle'), require('@angular/material/button-toggle'), require('@angular/material/menu'), require('@angular/material/card'), require('@angular/material/divider'), require('@angular/router'), require('hashids'), require('@mubble/core'), require('lodash'), require('lodash/isEqual'), require('@angular/animations'), require('lodash/debounce'), require('rxjs/operators'), require('dexie'), require('lodash/findIndex'), require('reflect-metadata')) :
    typeof define === 'function' && define.amd ? define('@mubble/browser', ['exports', '@angular/core', '@angular/forms', '@angular/common', '@angular/flex-layout', '@angular/material/core', '@angular/material/checkbox', '@angular/material/datepicker', '@angular/material/form-field', '@angular/material/input', '@angular/material/select', '@angular/material/autocomplete', '@angular/material/radio', '@angular/material/progress-bar', '@angular/material/slider', '@angular/material/slide-toggle', '@angular/material/button-toggle', '@angular/material/menu', '@angular/material/card', '@angular/material/divider', '@angular/router', 'hashids', '@mubble/core', 'lodash', 'lodash/isEqual', '@angular/animations', 'lodash/debounce', 'rxjs/operators', 'dexie', 'lodash/findIndex', 'reflect-metadata'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.mubble = global.mubble || {}, global.mubble.browser = {}), global.ng.core, global.ng.forms, global.ng.common, global.ng.flexLayout, global.ng.material.core, global.ng.material.checkbox, global.ng.material.datepicker, global.ng.material.formField, global.ng.material.input, global.ng.material.select, global.ng.material.autocomplete, global.ng.material.radio, global.ng.material.progressBar, global.ng.material.slider, global.ng.material.slideToggle, global.ng.material.buttonToggle, global.ng.material.menu, global.ng.material.card, global.ng.material.divider, global.ng.router, global.Hashids, global['@mubble/core'], global.lodash, global.isEqual, global.ng.animations, global.debounce, global.rxjs.operators, global.Dexie, global.findIndex));
}(this, (function (exports, i0, forms, common, flexLayout, core$1, checkbox, datepicker, formField, input, select, autocomplete, radio, progressBar, slider, slideToggle, buttonToggle, menu, card, divider, router, Hashids, core, lodash, isEqual, animations, debounce, operators, Dexie, findIndex) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Hashids__default = /*#__PURE__*/_interopDefaultLegacy(Hashids);
    var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);
    var debounce__default = /*#__PURE__*/_interopDefaultLegacy(debounce);
    var Dexie__default = /*#__PURE__*/_interopDefaultLegacy(Dexie);
    var findIndex__default = /*#__PURE__*/_interopDefaultLegacy(findIndex);

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MuBrowser = /** @class */ (function () {
        function MuBrowser() {
        }
        return MuBrowser;
    }());
    MuBrowser.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    MuBrowser.ctorParameters = function () { return []; };
    /** @nocollapse */ MuBrowser.ɵprov = i0.ɵɵdefineInjectable({ factory: function MuBrowser_Factory() { return new MuBrowser(); }, token: MuBrowser, providedIn: "root" });

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    function __createBinding(o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    }
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                exports[p] = m[p];
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    result[k] = mod[k];
        result.default = mod;
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /*------------------------------------------------------------------------------
       About        : <Write about the file here>
       
       Created on   : Sat Jul 15 2017
       Author       : Raghvendra Varma
       
       Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
    ------------------------------------------------------------------------------*/
    /** @type {?} */
    var EVENT_PREFIX = 'mui-event';
    (function (EventSystem) {
        /**
         * @param {?} rc
         * @param {?} eventName
         * @param {?=} data
         * @return {?}
         */
        function broadcast(rc, eventName, data) {
            data = data || {};
            /** @type {?} */
            var fullName = eventName.startsWith(EVENT_PREFIX) ? "" + eventName : EVENT_PREFIX + "-" + eventName;
            /** @type {?} */
            var nodeList = document.querySelectorAll('.' + fullName);
            /** @type {?} */
            var event = new CustomEvent(fullName, { detail: { data: data, rc: rc } });
            for (var index = 0; index < nodeList.length; index++) {
                /** @type {?} */
                var element = nodeList[index];
                element.dispatchEvent(event);
            }
            window.dispatchEvent(event);
            rc.isStatus() && rc.status('EventSystem.broadcast', 'Completed broadcast of', fullName, 'to', nodeList.length, 'dom element(s) and to global components via window');
        }
        EventSystem.broadcast = broadcast;
        /**
         * @param {?} rc
         * @param {?} eventName
         * @param {?} elementClassName
         * @param {?} data
         * @return {?}
         */
        function eventToElements(rc, eventName, elementClassName, data) {
            /** @type {?} */
            var fullName = eventName.startsWith(EVENT_PREFIX) ? "" + eventName : EVENT_PREFIX + "-" + eventName;
            /** @type {?} */
            var nodeList = document.querySelectorAll('.' + elementClassName);
            /** @type {?} */
            var event = new CustomEvent(fullName, { detail: { data: data, rc: rc } });
            for (var index = 0; index < nodeList.length; index++) {
                /** @type {?} */
                var element = nodeList[index];
                element.dispatchEvent(event);
            }
            rc.isStatus() && rc.status('EventSystem.eventToElement', 'Completed event dispatch of', fullName, 'to', nodeList.length, 'dom element(s)');
        }
        EventSystem.eventToElements = eventToElements;
        // Allows subscription of event for an element (when Angular syntax cannot be used)
        // UnSubscribe is automatic on element destroy
        /**
         * @param {?} element
         * @param {?} eventName
         * @param {?} cb
         * @return {?}
         */
        function elementSubscribe(element, eventName, cb) {
            if (!eventName.startsWith(EVENT_PREFIX))
                eventName = EVENT_PREFIX + "-" + eventName;
            /** @type {?} */
            var classes = element.className.split(' ');
            if (classes.indexOf(eventName) === -1) {
                classes.push(eventName);
                element.className = classes.join(' ');
            }
            else {
                element.removeEventListener(eventName, cb);
            }
            element.addEventListener(eventName, cb);
        }
        EventSystem.elementSubscribe = elementSubscribe;
        // Any class whose object is globally alive in the app should use this 
        // since it does not unsubscribe for the events
        // UnSubscribe is ********* NEVER *********
        /**
         * @param {?} eventName
         * @param {?} cb
         * @param {?=} options
         * @return {?}
         */
        function subscribe(eventName, cb, options) {
            if (!eventName.startsWith(EVENT_PREFIX))
                eventName = EVENT_PREFIX + "-" + eventName;
            window.addEventListener(eventName, cb, options);
        }
        EventSystem.subscribe = subscribe;
        /**
         * @param {?} eventNames
         * @param {?} cb
         * @return {?}
         */
        function subscribeAll(eventNames, cb) {
            eventNames.forEach(( /**
             * @param {?} eventName
             * @return {?}
             */function (eventName) {
                if (!eventName.startsWith(EVENT_PREFIX))
                    eventName = EVENT_PREFIX + "-" + eventName;
                window.addEventListener(eventName, cb.bind(null, eventName));
            }));
        }
        EventSystem.subscribeAll = subscribeAll;
    })(exports.EventSystem || (exports.EventSystem = {}));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /*------------------------------------------------------------------------------
       About      : <Write about the file here>
       
       Created on : Tue Jul 25 2017
       Author     : Raghvendra Varma
       
       Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
    ------------------------------------------------------------------------------*/
    /** @type {?} */
    var QUICK_ANIM_MS = 'none' // (1000/60) + 'ms'
    ;
    // (1000/60) + 'ms'
    var DomHelper = /** @class */ (function () {
        function DomHelper() {
        }
        /**
         * @param {?} className
         * @return {?}
         */
        DomHelper.addClass = function (className) {
        };
        /**
         * @param {?} xPixel
         * @param {?} yPixel
         * @param {?} zPixel
         * @return {?}
         */
        DomHelper.getTransform = function (xPixel, yPixel, zPixel) {
            return { transform: "translate3d(" + xPixel + "px, " + yPixel + "px, " + zPixel + "px)" };
        };
        /**
         * @param {?} xPercent
         * @param {?} yPercent
         * @return {?}
         */
        DomHelper.getPercentTransform = function (xPercent, yPercent) {
            return { transform: "translate3d(" + xPercent + "%, " + yPercent + "%, 0)" };
        };
        /**
         * @param {?} elem
         * @param {?} xPixel
         * @param {?} yPixel
         * @param {?} zPixel
         * @return {?}
         */
        DomHelper.setTransform = function (elem, xPixel, yPixel, zPixel) {
            elem.style.transform = DomHelper.getTransform(xPixel, yPixel, zPixel).transform;
        };
        /**
         * @param {?} elem
         * @param {?} xPercent
         * @param {?} yPercent
         * @return {?}
         */
        DomHelper.setPercentTransform = function (elem, xPercent, yPercent) {
            elem.style.transform = DomHelper.getPercentTransform(xPercent, yPercent).transform;
        };
        /**
         * @return {?}
         */
        DomHelper.getQuickAnim = function () {
            return QUICK_ANIM_MS;
        };
        return DomHelper;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /*------------------------------------------------------------------------------
       About      : Utility class which makes use of HashIds for encrypting strings
                    to hashes using a pre determined key. https://hashids.org/
       
       Created on : Thur May 24 2018
       Author     : Siddharth Garg
       
       Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
    ------------------------------------------------------------------------------*/
    var HashidConverter = /** @class */ (function () {
        function HashidConverter() {
        }
        /**
         * @param {?} key
         * @param {?} str
         * @return {?}
         */
        HashidConverter.encodeString = function (key, str) {
            /** @type {?} */
            var hashids = new Hashids__default['default'](key);
            /** @type {?} */
            var charCodes = [];
            for (var i = 0; i < str.length; i++) {
                /** @type {?} */
                var code = str.charCodeAt(i);
                charCodes.push(code);
            }
            return hashids.encode(charCodes);
        };
        /**
         * @param {?} key
         * @param {?} hashid
         * @return {?}
         */
        HashidConverter.decodeHashids = function (key, hashid) {
            /** @type {?} */
            var hashids = new Hashids__default['default'](key);
            /** @type {?} */
            var charCodes = hashids.decode(hashid);
            /** @type {?} */
            var str = '';
            charCodes.forEach(( /**
             * @param {?} charCode
             * @return {?}
             */function (charCode) {
                str += String.fromCharCode(charCode);
            }));
            return str;
        };
        return HashidConverter;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /*------------------------------------------------------------------------------
       About      : Class responsible for playing audio files in the app.
       
       Created on : Sat Sep 02 2017
       Author     : Raghvendra Varma
       
       Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
    ------------------------------------------------------------------------------*/
    var AudioFile = /** @class */ (function () {
        /**
         * @param {?} fileName
         * @param {?=} volume
         */
        function AudioFile(fileName, volume) {
            this.fileName = fileName;
            this.volume = volume;
            this.fileName = 'sounds/' + fileName;
            this.volume = volume || .8;
        }
        return AudioFile;
    }());
    if (false) {
        /** @type {?} */
        AudioFile.prototype.fileName;
        /** @type {?} */
        AudioFile.prototype.volume;
    }
    var AudioPlayer = /** @class */ (function () {
        /**
         * @param {?} rc
         */
        function AudioPlayer(rc) {
            this.rc = rc;
            this.SELECT = new AudioFile('select.mp3', 0.4);
            this.audioMap = {};
            this.rc.setupLogger(this, 'AudioFile');
        }
        /**
         * @param {?} file
         * @return {?}
         */
        AudioPlayer.prototype.play = function (file) {
            /** @type {?} */
            var control = this.audioMap[file.fileName];
            if (!control) {
                control = this.audioMap[file.fileName] = new Audio(file.fileName);
                control.load();
                control.volume = file.volume;
            }
            else {
                /** @type {?} */
                var isPlaying = control.currentTime > 0 && !control.paused && !control.ended && control.readyState > 2;
                if (isPlaying) {
                    control.pause();
                    control.currentTime = 0;
                }
            }
            try {
                control.play();
            }
            catch (err) {
                this.rc.isError() && this.rc.error(this.rc.getName(this), { fileName: file.fileName }, err);
            }
        };
        return AudioPlayer;
    }());
    if (false) {
        /** @type {?} */
        AudioPlayer.prototype.SELECT;
        /**
         * @type {?}
         * @private
         */
        AudioPlayer.prototype.audioMap;
        /**
         * @type {?}
         * @private
         */
        AudioPlayer.prototype.rc;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var BoundedValue = /** @class */ (function () {
        /**
         * @param {?} initState
         * @param {?} finalState
         * @param {?} contInitState
         * @param {?} contFinalState
         */
        function BoundedValue(initState, finalState, contInitState, contFinalState) {
            // for the element
            this.value = initState;
            this.elemDirUp = (initState < finalState);
            this.elemLow = this.elemDirUp ? initState : finalState;
            this.elemHigh = this.elemDirUp ? finalState : initState;
            // for the controller
            this.contDirUp = (contInitState < contFinalState);
            this.contLow = this.contDirUp ? contInitState : contFinalState;
            this.contHigh = this.contDirUp ? contFinalState : contInitState;
        }
        /**
         * @param {?} contValue
         * @return {?}
         */
        BoundedValue.prototype.compute = function (contValue) {
            /** @type {?} */
            var oldValue = this.value;
            if (contValue <= this.contLow) {
                this.value = this.elemDirUp ? this.elemLow : this.elemHigh;
            }
            else if (contValue >= this.contHigh) {
                this.value = this.elemDirUp ? this.elemHigh : this.elemLow;
            }
            else {
                /** @type {?} */
                var totalDiff = this.contHigh - this.contLow;
                /** @type {?} */
                var thisDiff = contValue - this.contLow;
                /** @type {?} */
                var elemDiff = this.elemHigh - this.elemLow;
                if (this.elemDirUp) {
                    this.value = this.elemLow + elemDiff * thisDiff / totalDiff;
                }
                else {
                    this.value = this.elemHigh - elemDiff * thisDiff / totalDiff;
                }
            }
            return this.value !== oldValue;
        };
        /**
         * @param {?=} digitsAfterDecimal
         * @return {?}
         */
        BoundedValue.prototype.getDecimalValue = function (digitsAfterDecimal) {
            return Number(this.value.toFixed(digitsAfterDecimal || 0));
        };
        /**
         * @return {?}
         */
        BoundedValue.prototype.isCloserToInit = function () {
            /** @type {?} */
            var lowDiff = this.value - this.elemLow;
            /** @type {?} */
            var highDiff = this.elemHigh - this.value;
            if (lowDiff < highDiff) {
                return this.elemDirUp;
            }
            else {
                return !this.elemDirUp;
            }
        };
        return BoundedValue;
    }());
    if (false) {
        /** @type {?} */
        BoundedValue.prototype.value;
        /**
         * @type {?}
         * @private
         */
        BoundedValue.prototype.elemDirUp;
        /**
         * @type {?}
         * @private
         */
        BoundedValue.prototype.contDirUp;
        /**
         * @type {?}
         * @private
         */
        BoundedValue.prototype.elemLow;
        /**
         * @type {?}
         * @private
         */
        BoundedValue.prototype.elemHigh;
        /**
         * @type {?}
         * @private
         */
        BoundedValue.prototype.contLow;
        /**
         * @type {?}
         * @private
         */
        BoundedValue.prototype.contHigh;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MultiStepValue = /** @class */ (function () {
        /**
         * @param {?} minVal
         * @param {?} viewSize
         * @param {?} count
         * @param {?=} applyTol
         * @param {?=} quickMove
         */
        function MultiStepValue(minVal, viewSize, count, applyTol, quickMove) {
            this.minVal = minVal;
            this.viewSize = viewSize;
            this.count = count;
            this.applyTol = applyTol;
            this.quickMove = quickMove;
            this.currentIndex = 0;
            this.currentValue = 0;
            this.tolerance = 0;
            this.maxVal = minVal + viewSize * (count - 1); // -1 is done so that last item is displayed in view
            if (applyTol)
                this.tolerance = viewSize * .25;
        }
        /**
         * @param {?} delta
         * @return {?}
         */
        MultiStepValue.prototype.transition = function (delta) {
            /** @type {?} */
            var newValue = this.currentValue - delta;
            if (newValue < this.minVal - this.tolerance)
                return this.minVal - this.tolerance;
            if (newValue > this.maxVal + this.tolerance)
                return this.maxVal + this.tolerance;
            return newValue;
        };
        /**
         * @param {?} viewSize
         * @return {?}
         */
        MultiStepValue.prototype.updateViewSize = function (viewSize) {
            this.viewSize = viewSize;
            /** @type {?} */
            var maxVal = this.minVal + this.viewSize * (this.count - 1);
            this.currentValue = (this.currentValue * maxVal) / this.maxVal;
            this.maxVal = maxVal;
        };
        /**
         * @param {?} count
         * @return {?}
         */
        MultiStepValue.prototype.updateCount = function (count) {
            this.count = count;
            this.maxVal = this.minVal + this.viewSize * (count - 1);
        };
        /**
         * @param {?} delta
         * @param {?} speed
         * @param {?=} quickRatio
         * @return {?}
         */
        MultiStepValue.prototype.final = function (delta, speed, quickRatio) {
            /** @type {?} */
            var newValue = this.transition(delta);
            /** @type {?} */
            var chgNeeded = (speed >= .2 ? .1 : .25) * this.viewSize;
            /** @type {?} */
            var lowerBound = this.currentIndex * this.viewSize + this.minVal;
            /** @type {?} */
            var newIndex;
            if (delta > 0) { // trying to reduce index
                if (this.quickMove) {
                    newIndex = (quickRatio && quickRatio > 0) ? Math.round(quickRatio * this.count) : Math.ceil((lowerBound - newValue) / this.viewSize);
                }
                if ((lowerBound - newValue) >= chgNeeded) {
                    this.currentIndex -= this.quickMove ? newIndex : Math.abs(Math.ceil((lowerBound - newValue) / this.viewSize));
                    if (this.currentIndex < 0) {
                        this.currentIndex = 0;
                    }
                    this.currentValue = this.currentIndex * this.viewSize + this.minVal;
                }
            }
            else {
                if (this.quickMove) {
                    newIndex = (quickRatio && quickRatio > 0) ? Math.round(quickRatio * this.count) : Math.ceil((newValue - lowerBound) / this.viewSize);
                }
                if ((newValue - lowerBound) >= chgNeeded) {
                    this.currentIndex += this.quickMove ? newIndex : Math.ceil((newValue - lowerBound) / this.viewSize);
                    if (this.currentIndex >= this.count) {
                        this.currentIndex = this.count - 1;
                    }
                    this.currentValue = this.currentIndex * this.viewSize + this.minVal;
                }
            }
        };
        return MultiStepValue;
    }());
    if (false) {
        /** @type {?} */
        MultiStepValue.prototype.currentIndex;
        /** @type {?} */
        MultiStepValue.prototype.currentValue;
        /**
         * @type {?}
         * @private
         */
        MultiStepValue.prototype.maxVal;
        /**
         * @type {?}
         * @private
         */
        MultiStepValue.prototype.tolerance;
        /**
         * @type {?}
         * @private
         */
        MultiStepValue.prototype.minVal;
        /**
         * @type {?}
         * @private
         */
        MultiStepValue.prototype.viewSize;
        /**
         * @type {?}
         * @private
         */
        MultiStepValue.prototype.count;
        /**
         * @type {?}
         * @private
         */
        MultiStepValue.prototype.applyTol;
        /**
         * @type {?}
         * @private
         */
        MultiStepValue.prototype.quickMove;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var UrlHelper = /** @class */ (function () {
        function UrlHelper() {
        }
        /**
         * @param {?} genericUrl
         * @return {?}
         */
        UrlHelper.getUrlParams = function (genericUrl) {
            /** @type {?} */
            var idx = genericUrl.indexOf('?');
            if (idx === -1)
                return null;
            /** @type {?} */
            var url = genericUrl.substring(idx + 1);
            /** @type {?} */
            var queries = url.split('&');
            /** @type {?} */
            var params = {};
            for (var i = 0; i < queries.length; i++) {
                /** @type {?} */
                var split = queries[i].split('=');
                params[split[0]] = split[1];
            }
            return params;
        };
        /**
         * @param {?} key
         * @param {?} hashids
         * @return {?}
         */
        UrlHelper.decodeStringFromHashids = function (key, hashids) {
            return HashidConverter.decodeHashids(key, hashids);
        };
        /**
         * @param {?} key
         * @param {?} hashids
         * @return {?}
         */
        UrlHelper.encodeStringAsHashids = function (key, hashids) {
            return HashidConverter.encodeString(key, hashids);
        };
        return UrlHelper;
    }());

    var MuUtility = /** @class */ (function () {
        function MuUtility() {
        }
        /**
         * @param {?} errObj
         * @return {?}
         */
        MuUtility.prototype.isOfTypeUiError = function (errObj) {
            return errObj.hasOwnProperty('errorCode');
        };
        /**
         * @param {?} rc
         * @return {?}
         */
        MuUtility.prototype.isNetworkUnhealthy = function (rc) {
            if (rc.bridge.isRunningInBrowser()) {
                return !navigator.onLine;
            }
            else {
                /** @type {?} */
                var netType = rc.bridge.getCordovaNetworkType();
                return netType === core.NetworkType.absent ||
                    (netType === core.NetworkType.unknown && !navigator.onLine);
            }
        };
        /**
         * @param {?} number
         * @return {?}
         */
        MuUtility.prototype.isValidIndianMobNum = function (number) {
            number = this.sanitizeNumber(number);
            return new RegExp('^\\+91[9876]\\d{9}$').test(number);
        };
        /**
         * @param {?} number
         * @return {?}
         */
        MuUtility.prototype.get10digitMobNumber = function (number) {
            /** @type {?} */
            var num = this.sanitizeNumber(number);
            if (num.startsWith('+91'))
                return num.substring(3);
            if (num.startsWith('91'))
                return num.substring(2);
            else if (num.startsWith('0'))
                return num.substring(1);
            else
                return num;
        };
        /**
         * @param {?} number
         * @return {?}
         */
        MuUtility.prototype.sanitizeNumber = function (number) {
            /** @type {?} */
            var temp = number;
            if (!temp)
                return null;
            /** @type {?} */
            var startsWithPlus = temp.startsWith('+91');
            if (startsWithPlus)
                return temp;
            // check for indian or international i.e. 0 or 00
            if (temp.startsWith('0')) {
                temp = temp.substring(1);
                if (temp.startsWith('0')) {
                    return '+' + temp.substring(1);
                }
                else if (temp.length === 10) {
                    return '+91' + temp;
                }
                else {
                    return '0' + temp;
                }
                // 10 digit mobile/landline number case return with +91
            }
            else if (temp.length == 10) {
                return '+91' + temp;
            }
            return temp;
        };
        /**
         * @param {?} rc
         * @return {?}
         */
        MuUtility.prototype.getNetworkType = function (rc) {
            return rc.bridge.isRunningInBrowser()
                ? navigator.onLine ? core.NetworkType.wifi : core.NetworkType.absent
                : rc.bridge.getCordovaNetworkType();
        };
        /**
         * @param {?} rc
         * @param {?} transServ
         * @param {?} errorMessage
         * @return {?}
         */
        MuUtility.prototype.getErrorText = function (rc, transServ, errorMessage) {
            /** @type {?} */
            var errorText;
            switch (errorMessage) {
                case core.XmnError.NetworkNotPresent:
                    errorText = transServ.instant('cmn_toast_err_net_off');
                    break;
                case core.XmnError.ConnectionFailed:
                    if (this.isNetworkUnhealthy(rc)) {
                        errorText = transServ.instant('cmn_toast_err_net_off');
                    }
                    else {
                        errorText = transServ.instant('cmn_toast_err_con_failed');
                    }
                    break;
                case core.XmnError.RequestTimedOut:
                case core.XmnError.SendTimedOut:
                    errorText = transServ.instant('cmn_toast_err_timeout');
                    break;
                default:
                    errorText = transServ.instant('cmn_toast_err_unknown');
            }
            return errorText;
        };
        /**
         * @param {?} rc
         * @return {?}
         */
        MuUtility.prototype.getLocation = function (rc) {
            if (rc.bridge.isRunningInBrowser()) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(( /**
                     * @param {?} position
                     * @return {?}
                     */function (position) {
                        return JSON.stringify({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        });
                    }));
                }
                else {
                    return '{}';
                }
            }
            else {
                return rc.bridge.getLocation();
            }
        };
        /**
         * @param {?} template
         * @param {?} data
         * @return {?}
         */
        MuUtility.prototype.expandTemplate = function (template, data) {
            return core.expandTemplate(template, data);
        };
        /**
         * @param {?} templateObj
         * @param {?} data
         * @return {?}
         */
        MuUtility.prototype.expandTemplateObj = function (templateObj, data) {
            return core.expandTemplateObj(templateObj, data);
        };
        /**
         * @param {?} parser
         * @return {?}
         */
        MuUtility.prototype.parseURLForRouter = function (parser) {
            if (parser.protocol !== 'http' || parser.protocol !== 'https') {
                parser.href = parser.href.replace(/.*\:\/\//, 'http://');
            }
            /** @type {?} */
            var searchObject = {};
            /** @type {?} */
            var queries = parser.search.replace(/^\?/, '').split('&');
            for (var i = 0; i < queries.length; i++) {
                if (!queries[i])
                    continue;
                /** @type {?} */
                var split = queries[i].split('=');
                searchObject[split[0]] = decodeURIComponent(split[1]);
            }
            /** @type {?} */
            var pathname = parser.pathname.startsWith('/')
                ? parser.pathname.substring(1)
                : parser.pathname;
            return {
                protocol: parser.protocol,
                host: parser.host,
                hostname: parser.hostname,
                port: parser.port,
                pathname: pathname,
                search: parser.search,
                searchObject: searchObject,
                hash: parser.hash
            };
        };
        /**
         * @param {?} genericUrl
         * @return {?}
         */
        MuUtility.prototype.getUrlParams = function (genericUrl) {
            return UrlHelper.getUrlParams(genericUrl);
        };
        /**
         * @param {?} errorMessage
         * @return {?}
         */
        MuUtility.prototype.getErrorScreenState = function (errorMessage) {
            /** @type {?} */
            var errorCode;
            switch (errorMessage) {
                case core.XmnError.NetworkNotPresent:
                    errorCode = 'NoNet';
                    break;
                case core.XmnError.ConnectionFailed:
                    errorCode = 'ConnFail';
                    break;
                case core.XmnError.RequestTimedOut:
                case core.XmnError.SendTimedOut:
                    errorCode = 'TimedOut';
                    break;
                case core.XmnError.UnAuthorized:
                    errorCode = 'UnAuthorized';
                default:
                    errorCode = errorMessage.substring(0, Math.min(32, errorMessage.length));
            }
            return errorCode;
        };
        /**
         * @param {?} file
         * @return {?}
         */
        MuUtility.prototype.getBase64 = function (file) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(( /**
                         * @param {?} resolve
                         * @param {?} reject
                         * @return {?}
                         */function (resolve, reject) {
                            /** @type {?} */
                            var reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = ( /**
                             * @return {?}
                             */function () { return resolve(( /** @type {?} */(reader.result))); });
                            reader.onerror = ( /**
                             * @param {?} error
                             * @return {?}
                             */function (/**
                             * @param {?} error
                             * @return {?}
                             */ error) { return reject(error); });
                        }))];
                });
            });
        };
        /**
         * @param {?} message
         * @return {?}
         */
        MuUtility.prototype.getCheckSum = function (message) {
            return __awaiter(this, void 0, void 0, function () {
                var encoder, data, buffer, hexString;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            encoder = new TextEncoder();
                            data = encoder.encode(message);
                            return [4 /*yield*/, window.crypto.subtle.digest('SHA-256', data)];
                        case 1:
                            buffer = _a.sent();
                            hexString = this.hexString(buffer);
                            return [2 /*return*/, hexString];
                    }
                });
            });
        };
        /**
         * @param {?} buffer
         * @return {?}
         */
        MuUtility.prototype.hexString = function (buffer) {
            /** @type {?} */
            var byteArray = new Uint8Array(buffer);
            /** @type {?} */
            var hexCode = '';
            /** @type {?} */
            var value;
            for (var i = 0; i < byteArray.length; i++) {
                value = byteArray[i].toString(16),
                    hexCode += (value.length === 1 ? '0' + value : value);
            }
            return hexCode;
        };
        /**
         * @param {?} file
         * @param {?=} changeOrientation
         * @return {?}
         */
        MuUtility.prototype.getCompressedImage = function (file, changeOrientation) {
            if (changeOrientation === void 0) { changeOrientation = false; }
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(( /**
                         * @param {?} resolve
                         * @param {?} reject
                         * @return {?}
                         */function (resolve, reject) {
                            /** @type {?} */
                            var reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = ( /**
                             * @param {?} readerEvent
                             * @return {?}
                             */function (readerEvent) {
                                /** @type {?} */
                                var image = new Image();
                                image.src = readerEvent.target.result;
                                image.onload = ( /**
                                 * @param {?} imageEvent
                                 * @return {?}
                                 */function (imageEvent) {
                                    /** @type {?} */
                                    var exif = window['EXIF'];
                                    if (exif) {
                                        exif.getData(file, ( /**
                                         * @return {?}
                                         */function () {
                                            /** @type {?} */
                                            var orientation = changeOrientation ? file.exifdata.Orientation : undefined;
                                            return resolve(_this.getCanvasImage(image, orientation));
                                        }));
                                    }
                                    else {
                                        return resolve(_this.getCanvasImage(image));
                                    }
                                });
                            });
                            reader.onerror = ( /**
                             * @param {?} error
                             * @return {?}
                             */function (/**
                             * @param {?} error
                             * @return {?}
                             */ error) { return reject(error); });
                        }))];
                });
            });
        };
        /**
         * @param {?} image
         * @param {?=} orientation
         * @return {?}
         */
        MuUtility.prototype.getCanvasImage = function (image, orientation) {
            /** @type {?} */
            var canvas = document.createElement('canvas');
            /** @type {?} */
            var ctx = canvas.getContext('2d');
            /** @type {?} */
            var maxSize = 800;
            /** @type {?} */
            var width = image.width;
            /** @type {?} */
            var height = image.height;
            if (width > height) {
                if (width > maxSize) {
                    height *= maxSize / width;
                    width = maxSize;
                }
            }
            else if (height > maxSize) {
                width *= maxSize / height;
                height = maxSize;
            }
            canvas.width = width;
            canvas.height = height;
            if (orientation) {
                if (orientation > 4) {
                    canvas.width = height;
                    canvas.height = width;
                }
                switch (orientation) {
                    case 2:
                        ctx.translate(width, 0);
                        ctx.scale(-1, 1);
                        break;
                    case 3:
                        ctx.translate(width, height);
                        ctx.rotate(Math.PI);
                        break;
                    case 4:
                        ctx.translate(0, height);
                        ctx.scale(1, -1);
                        break;
                    case 5:
                        ctx.rotate(0.5 * Math.PI);
                        ctx.scale(1, -1);
                        break;
                    case 6:
                        ctx.rotate(0.5 * Math.PI);
                        ctx.translate(0, -height);
                        break;
                    case 7:
                        ctx.rotate(0.5 * Math.PI);
                        ctx.translate(width, -height);
                        ctx.scale(-1, 1);
                        break;
                    case 8:
                        ctx.rotate(-0.5 * Math.PI);
                        ctx.translate(-width, 0);
                        break;
                }
            }
            ctx.drawImage(image, 0, 0, width, height);
            ctx.restore();
            /** @type {?} */
            var backgroundColor = 'white';
            /** @type {?} */
            var compositeOperation = ctx.globalCompositeOperation;
            ctx.globalCompositeOperation = "destination-over";
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = compositeOperation;
            /** @type {?} */
            var resizedImage = canvas.toDataURL('image/jpeg', 0.7);
            return resizedImage;
        };
        //base64 without mime type
        /**
         * @param {?} base64
         * @return {?}
         */
        MuUtility.prototype.getBase64Size = function (base64) {
            /** @type {?} */
            var slicedBase64 = base64.includes('base64') ? base64.split(',')[1] : base64;
            /** @type {?} */
            var padding = 0;
            if (slicedBase64.endsWith('==')) {
                padding = 2;
            }
            else if (slicedBase64.endsWith('=')) {
                padding = 1;
            }
            /** @type {?} */
            var size = (slicedBase64.length * (0.75)) - padding;
            return (size / 1024);
        };
        // used to create a url with params
        /**
         * @param {?} url
         * @param {?} object
         * @return {?}
         */
        MuUtility.prototype.createNavUrl = function (url, object) {
            var e_1, _a;
            /** @type {?} */
            var navUrl = url.split('?')[0];
            /** @type {?} */
            var tempUrl = url.split('?')[1];
            /** @type {?} */
            var urlObj = JSON.parse('{"' + decodeURI(tempUrl).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
            try {
                for (var _b = __values(Object.keys(urlObj)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    if (key in object) {
                        urlObj[key] = object[key];
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            /** @type {?} */
            var completeUrl = navUrl + '?' + Object.keys(urlObj).map(( /**
             * @param {?} key
             * @return {?}
             */function (/**
             * @param {?} key
             * @return {?}
             */ key) { return key + '=' + urlObj[key]; })).join('&');
            return completeUrl;
        };
        return MuUtility;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /*------------------------------------------------------------------------------
       About      : Class to manage the data of the mu-data table durig lazy load
       
       Created on : Thu Nov 07 2019
       Author     : Pulkit Chaturvedi
       
       Copyright (c) 2019 Obopay. All rights reserved.
    ------------------------------------------------------------------------------*/
    /**
     * @record
     */
    function TableDataMgrListener() { }
    if (false) {
        /**
         * @param {?} lastIndex
         * @return {?}
         */
        TableDataMgrListener.prototype.loadMore = function (lastIndex) { };
    }
    /**
     * @record
     */
    function TableDataManagerParams() { }
    if (false) {
        /** @type {?} */
        TableDataManagerParams.prototype.data;
        /** @type {?} */
        TableDataManagerParams.prototype.lastIndex;
    }
    var TableDataManager = /** @class */ (function () {
        /**
         * @param {?} parentInst
         * @param {?} tableInst
         */
        function TableDataManager(parentInst, tableInst) {
            this.parentInst = parentInst;
            this.tableInst = tableInst;
            this.dataParams = ( /** @type {?} */({}));
            this.currentKeyIndex = 0;
            this.dataObject = {};
        }
        /**
         * Method to get the table config and get the dispRows and totalDataCount and data
         * @param {?} tableConfig : To set the table config in the data table
         * @param {?} lastIndex
         * @return {?}
         */
        TableDataManager.prototype.init = function (tableConfig, lastIndex) {
            this.dataParams.data = [];
            this.dispRows = tableConfig.dispRows || 0;
            this.totalDataCount = tableConfig.totalRecords || 0;
            /** @type {?} */
            var params = {
                lastIndex: lastIndex,
                data: tableConfig.data
            };
            /** @type {?} */
            var data = tableConfig.data.slice(0, this.dispRows);
            tableConfig.data = data;
            // this.tableInst.setTableConfig(tableConfig)
            this.updateData(params);
        };
        /**
         * parent will populate the data, moreAvailable and lastIndex in this method
         * @param {?} params : Updating the params by the parent so  that the data can be populated into the manager
         * @return {?}
         */
        TableDataManager.prototype.updateData = function (params) {
            this.dataParams.data = params.data;
            this.dataParams.lastIndex = params.lastIndex;
            this.mapData(0);
        };
        /**
         * mapping the data into the data object
         * @private
         * @param {?} index : Index to set as key in the data object
         * @return {?}
         */
        TableDataManager.prototype.mapData = function (index) {
            /** @type {?} */
            var addingIndex = this.currentKeyIndex;
            while (addingIndex < this.dataParams.lastIndex) {
                if (this.dataObject[addingIndex] && this.dataObject[addingIndex].length === this.dispRows) {
                    addingIndex += this.dispRows;
                    continue;
                }
                this.dataObject[addingIndex] = this.dataParams.data.slice(index, (this.dispRows + index));
                index += this.dispRows;
                addingIndex += this.dispRows;
            }
            if (this.pendingRequest)
                this.setTableData();
        };
        /**
         * Calls table instance function to set table data
         * (calls TableDataMgrListener's loadMore if data is not present)
         * @param {?=} index
         * @return {?}
         */
        TableDataManager.prototype.setTableData = function (index) {
            var _this = this;
            if (index >= 0)
                this.currentKeyIndex = index;
            /** @type {?} */
            var keys = Object.keys(this.dataObject);
            /** @type {?} */
            var dataKey = keys.find(( /**
             * @param {?} key
             * @return {?}
             */function (key) {
                return Number(key) === _this.currentKeyIndex;
            }));
            if (dataKey) {
                /** @type {?} */
                var data = this.dataObject[dataKey];
                if (data.length === this.dispRows || (this.totalDataCount - this.currentKeyIndex) < this.dispRows) {
                    // this.tableInst.setDisplayData(data)
                    this.lastKeyIndex = Number(dataKey);
                }
                else {
                    /** @type {?} */
                    var index_1 = this.currentKeyIndex + data.length;
                    this.parentInst.loadMore(index_1);
                    this.pendingRequest = true;
                }
                return;
            }
            this.parentInst.loadMore(this.currentKeyIndex);
            this.pendingRequest = true;
        };
        /**
         * Call from parent, clears all the data inside the manager
         * @return {?}
         */
        TableDataManager.prototype.clearData = function () {
            this.totalDataCount = 0;
            this.dispRows = 0;
            this.currentKeyIndex = 0;
            this.dataParams = ( /** @type {?} */({}));
            this.dataObject = {};
            this.pendingRequest = false;
        };
        /**
         * Method to update the data if parent wants to change any particular data in the data table
         * @param {?} data : data on which the action should be done
         * @param {?} index : index where the data is present
         * @return {?}
         */
        TableDataManager.prototype.updateDataStatus = function (data, index) {
            /** @type {?} */
            var dataIndex = index - this.currentKeyIndex;
            this.dataObject[this.currentKeyIndex][dataIndex] = data;
            this.setTableData();
        };
        /**
         * Method called by parent when error occur in parent
         * @return {?}
         */
        TableDataManager.prototype.errorOccur = function () {
            this.pendingRequest = false;
            this.currentKeyIndex = this.lastKeyIndex;
            // this.tableInst.onUiError()
            this.setTableData();
        };
        /**
         * Method called by parent
         * user selects different data in the data table to pass whether the data should be selectable or not
         * @param {?} data : To select the data in the data table
         * @return {?}
         */
        TableDataManager.prototype.setSelectableData = function (data) {
            // this.tableInst.setSelectedItems(data)
        };
        return TableDataManager;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        TableDataManager.prototype.dataParams;
        /**
         * @type {?}
         * @private
         */
        TableDataManager.prototype.dispRows;
        /**
         * @type {?}
         * @private
         */
        TableDataManager.prototype.totalDataCount;
        /**
         * @type {?}
         * @private
         */
        TableDataManager.prototype.currentKeyIndex;
        /**
         * @type {?}
         * @private
         */
        TableDataManager.prototype.lastKeyIndex;
        /**
         * @type {?}
         * @private
         */
        TableDataManager.prototype.pendingRequest;
        /**
         * @type {?}
         * @private
         */
        TableDataManager.prototype.dataObject;
        /**
         * @type {?}
         * @private
         */
        TableDataManager.prototype.parentInst;
        /** @type {?} */
        TableDataManager.prototype.tableInst;
    }

    /** @type {?} */
    var CYCLE_STEP = '_cycle_';
    var PerformanceMetrics = /** @class */ (function () {
        /**
         * @param {?} taskName
         */
        function PerformanceMetrics(taskName) {
            this.taskName = taskName;
            this.cycles = [];
            this.startTs = this.now();
        }
        /**
         * @param {?} stepName
         * @return {?}
         */
        PerformanceMetrics.prototype.startStep = function (stepName) {
            /** @type {?} */
            var now = this.now();
            if (!this.cycle || this.cycle.stepMap[stepName]) {
                if (this.cycle) {
                    this.cycle.endTs = now;
                    this.cycles.push(this.cycle);
                }
                this.cycle = new Cycle(this.cycles.length, now, stepName);
            }
            else {
                this.cycle.stepMap[stepName] = new Step(now);
            }
        };
        /**
         * @param {?} stepName
         * @return {?}
         */
        PerformanceMetrics.prototype.endStep = function (stepName) {
            /** @type {?} */
            var step = this.cycle.stepMap[stepName];
            if (!step) {
                console.error(stepName, 'ended without start for', this.taskName);
                return;
            }
            step.endTs = this.now();
        };
        /**
         * @return {?}
         */
        PerformanceMetrics.prototype.finish = function () {
            var e_1, _a;
            /** @type {?} */
            var now = this.now();
            /** @type {?} */
            var output = {
                task: this.taskName,
                totalMs: now - this.startTs,
                cycleCount: this.cycles.length,
                cyclePerf: new ResultEntry(),
                stepPerf: ( /** @type {?} */({}))
            };
            if (this.cycle) {
                this.cycle.endTs = now;
                this.cycles.push(this.cycle);
            }
            for (var index = 0; index < this.cycles.length; index++) {
                /** @type {?} */
                var cycle = this.cycles[index];
                output.cyclePerf = this.markEntry(cycle.endTs - cycle.startTs, index, output.cyclePerf);
                for (var stepName in cycle.stepMap) {
                    /** @type {?} */
                    var step = cycle.stepMap[stepName];
                    /** @type {?} */
                    var perf = output.stepPerf[stepName];
                    if (!step.endTs) {
                        console.error('You forgot to call endStep for ' + stepName + ' for cycle index:' + index);
                        continue;
                    }
                    output.stepPerf[stepName] = this.markEntry(step.endTs - step.startTs, index, perf);
                }
            }
            console.info('Result summary ', output);
            /** @type {?} */
            var marks = [];
            this.logEntry('all cycles', output.cyclePerf, marks);
            for (var stepName in output.stepPerf) {
                this.logEntry(stepName, output.stepPerf[stepName], marks);
            }
            marks = lodash.sortBy(marks, 'startTs');
            console.info('Highlighted cycles (having min/max cycle/step time) >>');
            try {
                for (var marks_1 = __values(marks), marks_1_1 = marks_1.next(); !marks_1_1.done; marks_1_1 = marks_1.next()) {
                    var mark = marks_1_1.value;
                    console.info(mark.toString());
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (marks_1_1 && !marks_1_1.done && (_a = marks_1.return)) _a.call(marks_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            console.info('all cycles to deep dive >>', this.cycles);
        };
        /**
         * @private
         * @param {?} ts
         * @param {?} index
         * @param {?} entry
         * @return {?}
         */
        PerformanceMetrics.prototype.markEntry = function (ts, index, entry) {
            entry = entry || new ResultEntry();
            if (entry.min > ts) {
                entry.min = ts;
                entry.minIdx = index;
            }
            if (entry.count && entry.max < ts) {
                entry.max = ts;
                entry.maxIdx = index;
            }
            entry.total += ts;
            entry.count++;
            return entry;
        };
        /**
         * @private
         * @return {?}
         */
        PerformanceMetrics.prototype.now = function () {
            return performance ? performance.timing.navigationStart + performance.now() : Date.now();
        };
        /**
         * @private
         * @param {?} name
         * @param {?} entry
         * @param {?} insertInto
         * @return {?}
         */
        PerformanceMetrics.prototype.logEntry = function (name, entry, insertInto) {
            console.info(name + ' performance >> ' + entry);
            if (entry.minIdx !== -1) {
                /** @type {?} */
                var cycle = this.cycles[entry.minIdx];
                if (insertInto.indexOf(cycle) === -1)
                    insertInto.push(cycle);
            }
            if (entry.maxIdx !== -1) {
                /** @type {?} */
                var cycle = this.cycles[entry.maxIdx];
                if (insertInto.indexOf(cycle) === -1)
                    insertInto.push(cycle);
            }
        };
        return PerformanceMetrics;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        PerformanceMetrics.prototype.startTs;
        /**
         * @type {?}
         * @private
         */
        PerformanceMetrics.prototype.cycles;
        /**
         * @type {?}
         * @private
         */
        PerformanceMetrics.prototype.cycle;
        /**
         * @type {?}
         * @private
         */
        PerformanceMetrics.prototype.taskName;
    }
    var BaseTime = /** @class */ (function () {
        /**
         * @param {?} startTs
         */
        function BaseTime(startTs) {
            this.startTs = startTs;
        }
        return BaseTime;
    }());
    if (false) {
        /** @type {?} */
        BaseTime.prototype.startTs;
        /** @type {?} */
        BaseTime.prototype.endTs;
    }
    var Step = /** @class */ (function (_super) {
        __extends(Step, _super);
        function Step() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Step;
    }(BaseTime));
    var Cycle = /** @class */ (function (_super) {
        __extends(Cycle, _super);
        /**
         * @param {?} index
         * @param {?} now
         * @param {?} step
         */
        function Cycle(index, now, step) {
            var _a;
            var _this = _super.call(this, now) || this;
            _this.index = index;
            _this.stepMap = (_a = {}, _a[step] = new Step(now), _a);
            return _this;
        }
        /**
         * @return {?}
         */
        Cycle.prototype.toString = function () {
            /** @type {?} */
            var ts = this.endTs - this.startTs;
            return "Cycle(" + this.index + ") @ " + core.format(this.startTs, '%hh%:%mm%:%ss% %ms%') + " timeTaken: " + ts.toFixed(3) + "ms";
        };
        return Cycle;
    }(BaseTime));
    if (false) {
        /** @type {?} */
        Cycle.prototype.index;
        /** @type {?} */
        Cycle.prototype.stepMap;
    }
    var ResultEntry = /** @class */ (function () {
        function ResultEntry() {
            this.count = 0;
            this.min = Number.MAX_SAFE_INTEGER;
            this.max = -1;
            this.total = 0;
            this.minIdx = -1;
            this.maxIdx = -1;
        }
        /**
         * @return {?}
         */
        ResultEntry.prototype.toString = function () {
            /** @type {?} */
            var average = this.count ? this.total / this.count : 0;
            return "minMs: " + this.min.toFixed(3) + " " + (this.max !== -1 ? 'maxMs: ' + this.max.toFixed(3) : '') + " avgMs: " + average.toFixed(3) + " count: " + this.count + " " + (this.minIdx !== -1 ? 'minIdx: ' + this.minIdx : '') + " " + (this.maxIdx !== -1 ? 'maxIdx: ' + this.maxIdx : '');
        };
        return ResultEntry;
    }());
    if (false) {
        /** @type {?} */
        ResultEntry.prototype.count;
        /** @type {?} */
        ResultEntry.prototype.min;
        /** @type {?} */
        ResultEntry.prototype.max;
        /** @type {?} */
        ResultEntry.prototype.total;
        /** @type {?} */
        ResultEntry.prototype.minIdx;
        /** @type {?} */
        ResultEntry.prototype.maxIdx;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /*------------------------------------------------------------------------------
       About      : <Write about the file here>
       
       Created on : Mon Jun 19 2017
       Author     : Raghvendra Varma
       
       Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
    ------------------------------------------------------------------------------*/
    // To lock panning on axis, this threshold should be met, example if user moves 5 pixel in x, his movement
    // should be 1 pixel or below on y axis
    /** @type {?} */
    var THRESHOLD = .8;
    // Gutter width: we support gutters on x axis. Gutter touches are reported as a separate callback
    // Gutter is always configured wrt to page dimensions, not component dimensions
    /** @type {?} */
    var GUTTER_WIDTH = 10;
    /**
     * @record
     */
    function NailConfig() { }
    if (false) {
        /** @type {?} */
        NailConfig.prototype.axisX;
        /** @type {?} */
        NailConfig.prototype.axisY;
        /** @type {?|undefined} */
        NailConfig.prototype.threshold;
        /** @type {?|undefined} */
        NailConfig.prototype.gutterWidth;
        /** @type {?|undefined} */
        NailConfig.prototype.gutterLeft;
        /** @type {?|undefined} */
        NailConfig.prototype.gutterRight;
        /** @type {?|undefined} */
        NailConfig.prototype.disallowLeft;
        /** @type {?|undefined} */
        NailConfig.prototype.disallowRight;
    }
    /** @enum {number} */
    var DIRECTION = {
        UP: 1,
        RIGHT: 2,
        DOWN: 4,
        LEFT: 8 // absolute direction wrt touch start, would mean that we are deltaX is negative
        ,
    };
    DIRECTION[DIRECTION.UP] = 'UP';
    DIRECTION[DIRECTION.RIGHT] = 'RIGHT';
    DIRECTION[DIRECTION.DOWN] = 'DOWN';
    DIRECTION[DIRECTION.LEFT] = 'LEFT';
    /** @enum {number} */
    var AXIS = {
        X: 1,
        Y: 2,
    };
    AXIS[AXIS.X] = 'X';
    AXIS[AXIS.Y] = 'Y';
    /**
     * @record
     */
    function NailInterface() { }
    if (false) {
        /**
         * @param {?} event
         * @return {?}
         */
        NailInterface.prototype.onTouchStart = function (event) { };
        /**
         * @param {?} event
         * @return {?}
         */
        NailInterface.prototype.onPanStart = function (event) { };
        /**
         * @param {?} event
         * @return {?}
         */
        NailInterface.prototype.onPanMove = function (event) { };
        /**
         * @param {?} event
         * @return {?}
         */
        NailInterface.prototype.onPanEnd = function (event) { };
        /**
         * @param {?} event
         * @return {?}
         */
        NailInterface.prototype.onTouchEnd = function (event) { };
        /**
         * @param {...?} animateParam
         * @return {?}
         */
        NailInterface.prototype.onPanAnimate = function (animateParam) { };
    }

    /** @type {?} */
    var CONSOLE_FN_MAP = [];
    CONSOLE_FN_MAP[core.LOG_LEVEL.DEBUG] = console.log;
    CONSOLE_FN_MAP[core.LOG_LEVEL.STATUS] = console.info || console.log;
    CONSOLE_FN_MAP[core.LOG_LEVEL.WARN] = console.warn || console.log;
    CONSOLE_FN_MAP[core.LOG_LEVEL.ERROR] = console.error || console.log;
    var InitConfigBrowser = /** @class */ (function (_super) {
        __extends(InitConfigBrowser, _super);
        /**
         * @param {?} runMode
         * @param {?} logLevel
         * @param {?=} tzMin
         */
        function InitConfigBrowser(runMode, logLevel, tzMin) {
            var _this = _super.call(this, logLevel, logLevel !== core.LOG_LEVEL.NONE, tzMin) || this;
            if ((runMode === core.RUN_MODE.PROD || runMode === core.RUN_MODE.PRE_PROD) && logLevel !== core.LOG_LEVEL.NONE) {
                console.log('You must turn off logging in production mode');
            }
            return _this;
        }
        return InitConfigBrowser;
    }(core.InitConfig));
    var RunStateBrowser = /** @class */ (function (_super) {
        __extends(RunStateBrowser, _super);
        function RunStateBrowser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return RunStateBrowser;
    }(core.RunState));
    var RCBrowserLogger = /** @class */ (function (_super) {
        __extends(RCBrowserLogger, _super);
        /**
         * @param {?} rc
         */
        function RCBrowserLogger(rc) {
            var _this = _super.call(this, rc) || this;
            _this.rc = rc;
            return _this;
        }
        /**
         * @param {?} level
         * @param {?} logStr
         * @return {?}
         */
        RCBrowserLogger.prototype.logToConsole = function (level, logStr) {
            /** @type {?} */
            var fn = CONSOLE_FN_MAP[level];
            fn.call(console, logStr);
        };
        return RCBrowserLogger;
    }(core.RCLoggerBase));
    if (false) {
        /** @type {?} */
        RCBrowserLogger.prototype.rc;
    }
    /**
     * @abstract
     */
    var RunContextBrowser = /** @class */ (function (_super) {
        __extends(RunContextBrowser, _super);
        // Stores the old error handler
        // private oldOnError    : any
        /**
         * @protected
         * @param {?} initConfig
         * @param {?} runState
         * @param {?=} contextId
         * @param {?=} contextName
         */
        function RunContextBrowser(initConfig, runState, contextId, contextName) {
            var _this = _super.call(this, initConfig, runState, contextId, contextName) || this;
            _this.initConfig = initConfig;
            _this.runState = runState;
            return _this;
        }
        /**
         * @return {?}
         */
        RunContextBrowser.prototype.preInit = function () {
            _super.prototype.init.call(this);
            this.logger = new RCBrowserLogger(this);
        };
        return RunContextBrowser;
    }(core.RunContextBase));
    if (false) {
        /** @type {?} */
        RunContextBrowser.prototype.lang;
        /** @type {?} */
        RunContextBrowser.prototype.globalKeyVal;
        /** @type {?} */
        RunContextBrowser.prototype.userKeyVal;
        /** @type {?} */
        RunContextBrowser.prototype.router;
        /** @type {?} */
        RunContextBrowser.prototype.bridge;
        /** @type {?} */
        RunContextBrowser.prototype.gcConfigKeyVal;
        /** @type {?} */
        RunContextBrowser.prototype.userEvent;
        /** @type {?} */
        RunContextBrowser.prototype.uiRouter;
        /** @type {?} */
        RunContextBrowser.prototype.audio;
        /** @type {?} */
        RunContextBrowser.prototype.utils;
        /** @type {?} */
        RunContextBrowser.prototype.initConfig;
        /** @type {?} */
        RunContextBrowser.prototype.runState;
    }

    /** @type {?} */
    var NEXT_SESSION_ID = 1;
    var TouchSession = /** @class */ (function () {
        function TouchSession() {
            this.startX = -1; // indicates a uninitialized TouchSession
            this.id = NEXT_SESSION_ID++;
        }
        return TouchSession;
    }());
    if (false) {
        /** @type {?} */
        TouchSession.prototype.ignore;
        /** @type {?} */
        TouchSession.prototype.startX;
        /** @type {?} */
        TouchSession.prototype.startY;
        /** @type {?} */
        TouchSession.prototype.startTs;
        /** @type {?} */
        TouchSession.prototype.lastX;
        /** @type {?} */
        TouchSession.prototype.lastY;
        /** @type {?} */
        TouchSession.prototype.ifNail;
        /** @type {?} */
        TouchSession.prototype.axis;
        /** @type {?} */
        TouchSession.prototype.perf;
        /** @type {?} */
        TouchSession.prototype.id;
        /** @type {?} */
        TouchSession.prototype.animateParam;
        /** @type {?} */
        TouchSession.prototype.animHandle;
        /** @type {?} */
        TouchSession.prototype.animSessionId;
    }
    // later these will be configured by looking at dom capabilities
    /** @type {?} */
    var TOUCH_EVENT = {
        START: 'touchstart',
        MOVE: 'touchmove',
        END: 'touchend',
        CANCEL: 'touchcancel'
    };
    // const TOUCH_EVENT = {
    //   START   : 'pointerdown',
    //   MOVE    : 'pointermove',
    //   END     : 'pointerup',
    //   CANCEL  : 'pointercancel'
    // }
    /** @type {?} */
    var THRESHOLD_PIXELS = 1;
    /** @type {?} */
    var MAX_THRESHOLD_PIXELS = 10;
    /** @type {?} */
    var FAST_MIN_SPEED = 2;
    /** @type {?} */
    var FAST_MAX_SPEED = 8;
    var Nail = /** @class */ (function () {
        /**
         * @param {?} rc
         * @param {?} element
         * @param {?} appComponent
         * @param {?} renderer
         * @param {?} config
         */
        function Nail(rc, element, appComponent, renderer, config) {
            this.rc = rc;
            this.element = element;
            this.appComponent = appComponent;
            this.renderer = renderer;
            this.measure = false;
            this.handlers = [];
            rc.setupLogger(this, 'Nail', core.LOG_LEVEL.STATUS);
            this.compName = appComponent.constructor ? appComponent.constructor.name : '?';
            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), config.axisX || config.axisY, 'Nail needs to be configured for at least one axes');
            this.setConfig(config);
            this.pageWidth = document.body.clientWidth;
            /** @type {?} */
            var panEventHandler = this.onNailEvent.bind(this);
            this.handlers.push(renderer.listen(element, TOUCH_EVENT.START, panEventHandler), renderer.listen(element, TOUCH_EVENT.MOVE, panEventHandler), renderer.listen(element, TOUCH_EVENT.END, panEventHandler), renderer.listen(element, TOUCH_EVENT.CANCEL, panEventHandler));
            this.animateFn = this.onRunAnimation.bind(this);
            rc.isStatus() && rc.status(rc.getName(this), 'Nail events are being monitored for', this.compName, 'with config', config);
        }
        /**
         * @param {?} config
         * @return {?}
         */
        Nail.prototype.changeConfig = function (config) {
            this.setConfig(config);
            // See if we can create a DOM Event object ???? TODO
            if (this.session)
                this.panEndEvent({ type: 'simulatedPanEnd' });
        };
        /**
         * @param {...?} animateParam
         * @return {?}
         */
        Nail.prototype.requestAnimate = function () {
            var animateParam = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                animateParam[_i] = arguments[_i];
            }
            if (this.session) {
                this.session.animateParam = animateParam;
                if (this.session.animHandle)
                    window.cancelAnimationFrame(this.session.animHandle);
                this.session.animHandle = window.requestAnimationFrame(this.animateFn);
                this.session.animSessionId = this.session.id;
            }
        };
        /**
         * @param {?} disallowLeft
         * @param {?} disallowRight
         * @return {?}
         */
        Nail.prototype.setDirections = function (disallowLeft, disallowRight) {
            this.config.disallowLeft = disallowLeft;
            this.config.disallowRight = disallowRight;
        };
        /**
         * @private
         * @param {?} config
         * @return {?}
         */
        Nail.prototype.setConfig = function (config) {
            config.threshold = config.threshold || THRESHOLD;
            config.gutterWidth = config.gutterWidth || GUTTER_WIDTH;
            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), config.threshold <= 1, 'Threshold cannot be more than 1');
            this.config = config;
        };
        /**
         * @param {?} event
         * @return {?}
         */
        Nail.prototype.onNailEvent = function (event) {
            /** @type {?} */
            var session = this.session;
            /** @type {?} */
            var config = this.config;
            // console.log(event.type, 'with',  event.touches.length, 'touches')
            // no axis is being monitored
            if (!(this.config.axisX || this.config.axisY))
                return;
            if (event.type === TOUCH_EVENT.START) {
                if (event.touches && event.touches.length !== 1)
                    return;
                if (this.session)
                    this.panEndEvent({ type: 'simulatedPanEnd' });
                this.session = new TouchSession();
                this.extractEventAttr(event);
                if (this.measure) {
                    this.session.perf = new PerformanceMetrics('nail-' + this.compName);
                }
                if (this.appComponent.onTouchStart)
                    this.appComponent.onTouchStart(event);
                this.rc.isDebug() && this.rc.debug(this.rc.getName(this), this.compName, event.type, 'received');
            }
            else if (event.type === TOUCH_EVENT.MOVE) {
                if (!session || session.ignore)
                    return;
                if (event.touches && event.touches.length !== 1) {
                    session.ignore = true;
                    return;
                }
                this.extractEventAttr(event);
                /** @type {?} */
                var deltaX = session.lastX - session.startX;
                /** @type {?} */
                var deltaY = session.lastY - session.startY;
                if (!session.axis) { // we try to find if we can establish the direction of movement
                    if (this.measure)
                        this.session.perf.startStep('ascertain');
                    /** @type {?} */
                    var ascertained = this.ascertainDirection(event, deltaX, deltaY);
                    if (this.measure)
                        this.session.perf.endStep('ascertain');
                    if (!ascertained)
                        return;
                }
                if (this.measure)
                    this.session.perf.startStep(TOUCH_EVENT.MOVE);
                event.axis = session.axis;
                if (session.axis === AXIS.X) {
                    event.deltaX = deltaX;
                    event.deltaY = 0;
                    event.direction = deltaX > 0 ? DIRECTION.RIGHT : DIRECTION.LEFT;
                }
                else {
                    event.deltaX = 0;
                    event.deltaY = deltaY;
                    event.direction = deltaY > 0 ? DIRECTION.DOWN : DIRECTION.UP;
                }
                if (this.measure)
                    this.session.perf.startStep('onPanMove');
                /** @type {?} */
                var consumed = session.ifNail.onPanMove(event);
                if (this.measure)
                    this.session.perf.endStep('onPanMove');
                if (this.measure)
                    this.session.perf.endStep(TOUCH_EVENT.MOVE);
                if (consumed) {
                    this.rc.isDebug() && this.rc.debug(this.rc.getName(this), this.compName, event.type, 'consumed event', { deltaX: deltaX, deltaY: deltaY, eventY: event.deltaY, session: session });
                    event.preventDefault();
                    event.stopPropagation();
                    return true;
                }
                else {
                    this.rc.isDebug() && this.rc.debug(this.rc.getName(this), this.compName, event.type, 'ignored event', { deltaX: deltaX, deltaY: deltaY, eventY: event.deltaY, session: session });
                }
            }
            else { // end or cancel event
                this.rc.isDebug() && this.rc.debug(this.rc.getName(this), this.compName, event.type, 'received');
                if (this.session)
                    this.panEndEvent(event);
            }
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        Nail.prototype.panEndEvent = function (event) {
            if (this.measure)
                this.session.perf.startStep(event.type);
            /** @type {?} */
            var session = this.session;
            // If we have not ascertained
            if (session.axis) {
                event.axis = session.axis;
                /** @type {?} */
                var deltaMs = Date.now() - session.startTs;
                event.deltaY = session.lastY - session.startY;
                event.deltaX = session.lastX - session.startX;
                /** @type {?} */
                var change = Math.abs(session.axis === AXIS.X ? event.deltaX : event.deltaY);
                /** @type {?} */
                var speed = deltaMs ? (change * 1000 / (deltaMs * deltaMs)) : 0;
                /** @type {?} */
                var quickRatio = (speed - FAST_MIN_SPEED) / (FAST_MAX_SPEED - FAST_MIN_SPEED);
                quickRatio = quickRatio < 0 ? 0 : (quickRatio > 0.5 ? 0.5 : quickRatio);
                event.quickRatio = quickRatio;
                event.speed = speed;
                event.timeTaken = deltaMs;
                // this.rc.isWarn() && this.rc.warn(this.rc.getName(this), {change, deltaMs, speed, 
                //   quickRatio, FAST_MIN_SPEED, FAST_MAX_SPEED})
                if (this.measure)
                    this.session.perf.startStep('onPanEnd');
                session.ifNail.onPanEnd(event);
                if (this.measure)
                    this.session.perf.endStep('onPanEnd');
            }
            else if (this.appComponent.onTouchEnd) {
                this.appComponent.onTouchEnd(event);
            }
            if (this.measure)
                this.session.perf.endStep(event.type);
            if (this.measure)
                this.session.perf.finish();
            this.session = null;
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        Nail.prototype.extractEventAttr = function (event) {
            /** @type {?} */
            var session = this.session;
            /** @type {?} */
            var touch = event.touches[0];
            session.lastX = touch.pageX;
            session.lastY = touch.pageY;
            if (session.startX === -1) {
                session.startX = session.lastX;
                session.startY = session.lastY;
                session.startTs = Date.now();
            }
        };
        // figure out direction of movement
        /**
         * @private
         * @param {?} event
         * @param {?} deltaX
         * @param {?} deltaY
         * @return {?}
         */
        Nail.prototype.ascertainDirection = function (event, deltaX, deltaY) {
            /** @type {?} */
            var session = this.session;
            /** @type {?} */
            var config = this.config;
            /** @type {?} */
            var posDx = Math.abs(deltaX);
            /** @type {?} */
            var posDy = Math.abs(deltaY);
            /** @type {?} */
            var axis = 0;
            if (posDx >= THRESHOLD_PIXELS && (config.threshold > (posDy / posDx))) {
                axis = AXIS.X;
            }
            else if (Math.abs(posDy) >= THRESHOLD_PIXELS && (config.threshold > (posDx / posDy))) {
                axis = AXIS.Y;
            }
            else if (posDx > MAX_THRESHOLD_PIXELS) {
                axis = AXIS.X;
            }
            else if (posDy > MAX_THRESHOLD_PIXELS) {
                axis = AXIS.Y;
            }
            if (!axis)
                return false;
            if (!((axis === AXIS.X && config.axisX) || (axis === AXIS.Y && config.axisY))) {
                this.rc.isStatus() && this.rc.status(this.rc.getName(this), this.compName, 'Cancelling ascertain as we locked incorrect axis');
                session.ignore = true;
                return;
            }
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), this.compName, event.type, 'Ascertained', axis, { deltaX: deltaX, deltaY: deltaY });
            session.axis = axis;
            if (((session.startX < config.gutterWidth) || (deltaX > 0 && config.disallowRight)) && config.gutterLeft) {
                session.ifNail = config.gutterLeft;
            }
            else if (((session.startX > (this.pageWidth - config.gutterWidth)) || (deltaX < 0 && config.disallowLeft)) && config.gutterRight) {
                session.ifNail = config.gutterRight;
            }
            else {
                session.ifNail = this.appComponent;
            }
            event.axis = session.axis;
            event.deltaX = deltaX;
            event.deltaY = deltaY;
            if (this.session.ifNail.onPanStart) {
                if (this.measure)
                    this.session.perf.startStep('onPanStart');
                this.session.ifNail.onPanStart(event);
                if (this.measure)
                    this.session.perf.endStep('onPanStart');
            }
            return true;
        };
        /**
         * @private
         * @return {?}
         */
        Nail.prototype.onRunAnimation = function () {
            var _a;
            /** @type {?} */
            var session = this.session;
            if (!session)
                return;
            this.session.animHandle = null;
            if (session.ignore || session.animSessionId !== session.id)
                return;
            (_a = session.ifNail).onPanAnimate.apply(_a, __spread(session.animateParam));
        };
        /**
         * @return {?}
         */
        Nail.prototype.destroy = function () {
            var e_1, _a;
            try {
                for (var _b = __values(this.handlers), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var handler = _c.value;
                    handler();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.handlers = [];
            this.config = null;
            this.session = null;
        };
        return Nail;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        Nail.prototype.config;
        /**
         * @type {?}
         * @private
         */
        Nail.prototype.session;
        /**
         * @type {?}
         * @private
         */
        Nail.prototype.pageWidth;
        /**
         * @type {?}
         * @private
         */
        Nail.prototype.compName;
        /**
         * @type {?}
         * @private
         */
        Nail.prototype.measure;
        /**
         * @type {?}
         * @private
         */
        Nail.prototype.animateFn;
        /**
         * @type {?}
         * @private
         */
        Nail.prototype.handlers;
        /**
         * @type {?}
         * @private
         */
        Nail.prototype.rc;
        /**
         * @type {?}
         * @private
         */
        Nail.prototype.element;
        /**
         * @type {?}
         * @private
         */
        Nail.prototype.appComponent;
        /**
         * @type {?}
         * @private
         */
        Nail.prototype.renderer;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /*------------------------------------------------------------------------------
       About      : <Write about the file here>
       
       Created on : Fri Jun 23 2017
       Author     : Raghvendra Varma
       
       Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
    ------------------------------------------------------------------------------*/
    /** @type {?} */
    var INJECTION_PARAM = {
        CALLER: 'caller',
        INJECT: 'inject'
    };
    /**
     * @record
     */
    function InjectionCaller() { }
    if (false) {
        /**
         * @param {?} calleeId
         * @param {?} result
         * @return {?}
         */
        InjectionCaller.prototype.setResult = function (calleeId, result) { };
    }
    /**
     * @record
     */
    function InjectionParent() { }
    if (false) {
        /**
         * @return {?}
         */
        InjectionParent.prototype.close = function () { };
    }
    /**
     * @record
     */
    function InjectedChild() { }
    if (false) {
        /**
         * @param {?} ip
         * @param {?} showTitle
         * @return {?}
         */
        InjectedChild.prototype.initFromParent = function (ip, showTitle) { };
        /**
         * @param {?} caller
         * @return {?}
         */
        InjectedChild.prototype.setCaller = function (caller) { };
        /**
         * @param {?} params
         * @return {?}
         */
        InjectedChild.prototype.setParam = function (params) { };
        /**
         * @return {?}
         */
        InjectedChild.prototype.closeFromParent = function () { };
        /**
         * @return {?}
         */
        InjectedChild.prototype.ngOnDestroy = function () { };
        /**
         * @return {?}
         */
        InjectedChild.prototype.canGoBack = function () { };
        /**
         * @return {?}
         */
        InjectedChild.prototype.onBackPressed = function () { };
    }
    /**
     * @record
     */
    function BottomInInterface() { }
    if (false) {
        /**
         * @return {?}
         */
        BottomInInterface.prototype.getHalfHeight = function () { };
        /**
         * @return {?}
         */
        BottomInInterface.prototype.getTitle = function () { };
        /**
         * @return {?}
         */
        BottomInInterface.prototype.getDefaultState = function () { };
    }
    /**
     * @record
     */
    function ModalInterface() { }
    if (false) {
        /**
         * @return {?}
         */
        ModalInterface.prototype.getWidth = function () { };
        /**
         * @return {?}
         */
        ModalInterface.prototype.getCssClassName = function () { };
        /**
         * @return {?}
         */
        ModalInterface.prototype.isNotDismissable = function () { };
        /**
         * @return {?}
         */
        ModalInterface.prototype.isNotScrollable = function () { };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /*------------------------------------------------------------------------------
       About      : Any component be it routable or not which needs to be tracked
                    for analytics must extent this class. All actions performed
                    on sub components / HTML elements in this kind of component
                    will be logged under the trackable screen name.

       Created on : Sat Nov 03 2018
       Author     : Sid
       
       Copyright (c) 2018 Obopay. All rights reserved.
    ------------------------------------------------------------------------------*/
    /**
     * @abstract
     */
    var TrackableScreen = /** @class */ (function () {
        /**
         * @param {?} rc
         */
        function TrackableScreen(rc) {
            this.rc = rc;
        }
        /**
         * @param {?} success
         * @return {?}
         */
        TrackableScreen.prototype.onApiComplete = function (success) {
        };
        /**
         * @return {?}
         */
        TrackableScreen.prototype.ngOnDestroy = function () {
            // if (this.rc.userKeyVal.clientId && this.isUserVisited()) {
            //   const key = Object.keys(ComponentRoute)
            //     .find(key => ComponentRoute[key] === this.getRouteName())
            //    this.rc.userKeyVal.setScreenVisited(key)
            // }
        };
        return TrackableScreen;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        TrackableScreen.prototype.rc;
        /**
         * @abstract
         * @return {?}
         */
        TrackableScreen.prototype.getRouteName = function () { };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var ComponentRoutes = {
        Modal: 'modal',
        BottomIn: 'bottomIn',
        LoadingOverlay: 'loadingOvr',
        Alert: 'alert',
        Filter: 'filter'
    };

    /**
     * @record
     */
    function AlertDialogParams() { }
    if (false) {
        /** @type {?} */
        AlertDialogParams.prototype.message;
        /** @type {?} */
        AlertDialogParams.prototype.positiveActText;
        /** @type {?|undefined} */
        AlertDialogParams.prototype.title;
        /** @type {?|undefined} */
        AlertDialogParams.prototype.negativeActText;
        /** @type {?|undefined} */
        AlertDialogParams.prototype.contextId;
        /** @type {?|undefined} */
        AlertDialogParams.prototype.canGoBack;
        /** @type {?|undefined} */
        AlertDialogParams.prototype.showCloseBtn;
        /** @type {?|undefined} */
        AlertDialogParams.prototype.positiveLink;
    }
    /**
     * @record
     */
    function AlertDialogResult() { }
    if (false) {
        /** @type {?} */
        AlertDialogResult.prototype.result;
        /** @type {?|undefined} */
        AlertDialogResult.prototype.contextId;
        /** @type {?|undefined} */
        AlertDialogResult.prototype.positiveLink;
    }
    /** @enum {string} */
    var DIALOG_RESULT = {
        YES: 'YES',
        NO: 'NO',
    };
    var AlertDialogComponent = /** @class */ (function (_super) {
        __extends(AlertDialogComponent, _super);
        /**
         * @param {?} rc
         */
        function AlertDialogComponent(rc) {
            var _this = _super.call(this, rc) || this;
            _this.rc = rc;
            return _this;
        }
        /**
         * @return {?}
         */
        AlertDialogComponent.prototype.getWidth = function () {
            return '80vw';
        };
        /**
         * @return {?}
         */
        AlertDialogComponent.prototype.getRouteName = function () {
            return ComponentRoutes.Alert;
        };
        /**
         * @return {?}
         */
        AlertDialogComponent.prototype.isUserVisited = function () {
            return true;
        };
        /*=====================================================================
                                          CALLBACKS
          =====================================================================*/
        /**
         * @param {?} queryParams
         * @return {?}
         */
        AlertDialogComponent.prototype.setParam = function (queryParams) {
            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), queryParams['message'] &&
                queryParams['positiveActText'], "missing queryparams " + queryParams);
            this.title = queryParams['title'];
            this.message = queryParams['message'];
            this.positiveActText = queryParams['positiveActText'];
            this.negativeActText = queryParams['negativeActText'] || '';
            this.contextId = queryParams['contextId'] || '';
            this.allowBack = queryParams['canGoBack'];
            this.showCloseBtn = queryParams['showCloseBtn'] || false;
            this.positiveLink = queryParams['positiveLink'];
        };
        /**
         * @param {?} caller
         * @return {?}
         */
        AlertDialogComponent.prototype.setCaller = function (caller) {
            this.caller = caller;
        };
        /**
         * @param {?} ip
         * @param {?} showTitle
         * @return {?}
         */
        AlertDialogComponent.prototype.initFromParent = function (ip, showTitle) {
            this.myParent = ip;
        };
        /**
         * @return {?}
         */
        AlertDialogComponent.prototype.close = function () {
            this.myParent.close();
        };
        /**
         * @return {?}
         */
        AlertDialogComponent.prototype.closeFromParent = function () {
            /** @type {?} */
            var result = {
                result: this.result,
                contextId: this.contextId,
                positiveLink: this.positiveLink
            };
            this.caller.setResult(this.getRouteName(), result);
        };
        /**
         * @return {?}
         */
        AlertDialogComponent.prototype.isNotDismissable = function () {
            return true;
        };
        /**
         * @return {?}
         */
        AlertDialogComponent.prototype.canGoBack = function () {
            /** @type {?} */
            var canGoBack = this.allowBack !== undefined;
            return canGoBack ? this.allowBack : true;
        };
        /*=====================================================================
                                      HTML FUNCTIONS
          =====================================================================*/
        /**
         * @return {?}
         */
        AlertDialogComponent.prototype.onCancel = function () {
            this.result = DIALOG_RESULT.NO;
            this.close();
        };
        /**
         * @return {?}
         */
        AlertDialogComponent.prototype.onContinue = function () {
            this.result = DIALOG_RESULT.YES;
            this.allowBack = true;
            this.close();
        };
        return AlertDialogComponent;
    }(TrackableScreen));
    AlertDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-alert-dialog',
                    template: "<div class=\"alert-dialog-comp\"\n  [ngClass.xl]=\"['web-alerts-dialog']\"\n  [ngClass.lg]=\"['web-alerts-dialog']\"\n  [ngClass.md]=\"['web-alerts-dialog']\"\n  [ngClass.sm]=\"['web-alerts-dialog']\">\n  <header class=\"header txt-xl-med-norm border\" *ngIf=\"title\">\n    <div class=\"header-title\">\n      {{ title }}\n    </div>\n    <div class=\"close-btn\" *ngIf=\"showCloseBtn\"\n      (click)=\"onCancel()\">\n      <i class=\"fa fa-lg fa-times\"></i>\n    </div>\n  </header>\n  <div class=\"content txt-xl-med-norm\">\n    {{ message }}\n  </div>\n  <footer class=\"footer\" [style.justifyContent]=\"negativeActText ? 'space-between' : 'center'\">\n    <button *ngIf='negativeActText' class=\"button-primary-small btn\" (click)=\"onCancel()\">\n      {{ negativeActText }}\n    </button>\n    <button class=\"button-primary-small btn\" (click)=\"onContinue()\">\n      {{ positiveActText }}\n    </button>\n  </footer>  \n</div>   ",
                    styles: [".alert-dialog-comp{padding:2vw;position:relative}.header{border-bottom-style:solid;border-bottom-width:1px;display:flex;justify-content:space-between;padding-bottom:2vw}.content,.header{position:relative}.content{padding:2vw 0}.footer{align-items:center;display:flex;padding:4vw 0}.btn,.footer{position:relative}.btn{width:30vw}.web-alerts-dialog{padding:20px}.web-alerts-dialog .header{padding-bottom:20px}.web-alerts-dialog .content{padding:20px 0;position:relative}.web-alerts-dialog .footer{padding:20px 0}.web-alerts-dialog .btn{width:150px}"]
                }] }
    ];
    /** @nocollapse */
    AlertDialogComponent.ctorParameters = function () { return [
        { type: RunContextBrowser, decorators: [{ type: i0.Inject, args: ['RunContext',] }] }
    ]; };
    if (false) {
        /**
         * @type {?}
         * @private
         */
        AlertDialogComponent.prototype.caller;
        /**
         * @type {?}
         * @private
         */
        AlertDialogComponent.prototype.myParent;
        /**
         * @type {?}
         * @private
         */
        AlertDialogComponent.prototype.result;
        /**
         * @type {?}
         * @private
         */
        AlertDialogComponent.prototype.contextId;
        /**
         * @type {?}
         * @private
         */
        AlertDialogComponent.prototype.allowBack;
        /** @type {?} */
        AlertDialogComponent.prototype.showCloseBtn;
        /** @type {?} */
        AlertDialogComponent.prototype.title;
        /** @type {?} */
        AlertDialogComponent.prototype.message;
        /** @type {?} */
        AlertDialogComponent.prototype.positiveActText;
        /** @type {?} */
        AlertDialogComponent.prototype.negativeActText;
        /** @type {?} */
        AlertDialogComponent.prototype.positiveLink;
        /**
         * @type {?}
         * @protected
         */
        AlertDialogComponent.prototype.rc;
    }

    /** @type {?} */
    var ROOT_URL = '#/?launched=true';
    /** @type {?} */
    var hashIndex = location.href.indexOf('#');
    /** @type {?} */
    var baseHref = hashIndex !== -1 ? location.href.substr(0, hashIndex) : location.href;
    /** @type {?} */
    var BASE_HREF = baseHref;
    /** @type {?} */
    var PRIMARY_OUTLET = 'primary';
    /** @type {?} */
    var MODAL_OUTLET = 'modal';
    /** @enum {number} */
    var TOAST_POSITION = {
        TOP: 1, MIDDLE: 2, BOTTOM: 3,
    };
    TOAST_POSITION[TOAST_POSITION.TOP] = 'TOP';
    TOAST_POSITION[TOAST_POSITION.MIDDLE] = 'MIDDLE';
    TOAST_POSITION[TOAST_POSITION.BOTTOM] = 'BOTTOM';
    /** @enum {number} */
    var NavMethod = {
        NEXT: 1, CURRENT: 2, POP: 3,
    };
    NavMethod[NavMethod.NEXT] = 'NEXT';
    NavMethod[NavMethod.CURRENT] = 'CURRENT';
    NavMethod[NavMethod.POP] = 'POP';
    /**
     * @record
     */
    function NcNavigationExtras() { }
    if (false) {
        /** @type {?|undefined} */
        NcNavigationExtras.prototype.replaceIndex;
        /** @type {?|undefined} */
        NcNavigationExtras.prototype.paramsId;
        /** @type {?|undefined} */
        NcNavigationExtras.prototype.replaceAllUrls;
    }
    var StackItem = /** @class */ (function () {
        function StackItem() {
        }
        return StackItem;
    }());
    if (false) {
        /** @type {?} */
        StackItem.prototype.url;
        /** @type {?} */
        StackItem.prototype.qpId;
        /** @type {?} */
        StackItem.prototype.queryParam;
        /** @type {?} */
        StackItem.prototype.outlet;
    }
    var OutletEntry = /** @class */ (function () {
        /**
         * @param {?} component
         */
        function OutletEntry(component) {
            this.component = null;
            this.invCount = 0;
            this.component = component;
        }
        return OutletEntry;
    }());
    if (false) {
        /** @type {?} */
        OutletEntry.prototype.component;
        /** @type {?} */
        OutletEntry.prototype.invCount;
        /** @type {?} */
        OutletEntry.prototype.lastParams;
    }
    var UiRouter = /** @class */ (function () {
        /**
         * @param {?} rcBrowser
         * @param {?} router
         */
        function UiRouter(rcBrowser, router) {
            this.rcBrowser = rcBrowser;
            this.router = router;
            this.componentRegistry = {};
            // variables for navigation
            this.urlStack = [];
            this.warnedUser = false;
            this.firstNavDone = false;
            this.browserStack = [];
            this.lastNavMethod = 0;
            this.lastPopIndex = -1;
            this.lastNavUrl = '';
            this.lastGoingBack = false;
            this.currentQpId = '';
            this.curCompMap = {};
            this.codePop = false;
            this.runningInBrowser = false;
            this.isSdkApp = false;
            this.iframeHistLength = 0;
        }
        /**
         * @param {?} runningInBrowser
         * @param {?=} isSdkApp
         * @return {?}
         */
        UiRouter.prototype.init = function (runningInBrowser, isSdkApp) {
            if (isSdkApp === void 0) { isSdkApp = false; }
            this.runningInBrowser = runningInBrowser;
            this.isSdkApp = isSdkApp;
            this.historyWrapper = new HistoryWrapper(this.rcBrowser, this.isSdkApp);
            this.urlStack[0] = new StackItem();
            this.urlStack[0].url = (location.hash || '').substr(1);
            this.historyWrapper.replaceState({ index: -1 }, document.title, baseHref + ROOT_URL);
            this.historyWrapper.pushState({ index: 0 }, document.title, baseHref);
            if (!this.isSdkApp)
                window.addEventListener('popstate', this.onPopState.bind(this));
            this.browserStack[0] = this.urlStack[0].url;
            this.router.events.subscribe(this.onNavEnd.bind(this));
            this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'initialized with', {
                url: this.urlStack[0].url
            });
        };
        /**
         * @param {?} routeTo
         * @param {?=} extras
         * @return {?}
         */
        UiRouter.prototype.navigate = function (routeTo, extras) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (extras && extras.replaceAllUrls) {
                                if (this.urlStack.length - 1 > 0) {
                                    extras.replaceIndex = 1;
                                }
                            }
                            return [4 /*yield*/, this.navigateByUrl([{ outlets: { primary: routeTo, modal: null } }], extras, PRIMARY_OUTLET)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * @param {?} routeTo
         * @param {?=} extras
         * @return {?}
         */
        UiRouter.prototype.rootNavigate = function (routeTo, extras) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.rcBrowser.isStatus() && this.rcBrowser.status(this.rcBrowser.getName(this), 'Inside RootNavigate', routeTo);
                            if (!extras)
                                extras = {};
                            extras.replaceIndex = 0;
                            return [4 /*yield*/, this.navigateByUrl([{ outlets: { primary: routeTo, modal: null } }], extras, PRIMARY_OUTLET)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        UiRouter.prototype.areWeGoingBack = function () {
            return this.lastGoingBack;
        };
        /**
         * @return {?}
         */
        UiRouter.prototype.isModalActive = function () {
            return Object.keys(this.curCompMap).length !== 1;
        };
        /**
         * @return {?}
         */
        UiRouter.prototype.isShowingPopup = function () {
            return this.curOutlet !== PRIMARY_OUTLET;
        };
        /**
         * @private
         * @param {?} urlOrCommand
         * @param {?=} extras
         * @param {?=} outlet
         * @return {?}
         */
        UiRouter.prototype.navigateByUrl = function (urlOrCommand, extras, outlet) {
            return __awaiter(this, void 0, void 0, function () {
                var nc_paramsId, modalRoute, url;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!extras)
                                extras = {};
                            if (!extras.queryParams)
                                extras.queryParams = {};
                            this.lastNavMethod && this.rcBrowser.isError() && this.rcBrowser.error(this.rcBrowser.getName(this), 'Navigating while last navigation not complete, possibly double nav...');
                            if (extras.replaceIndex === undefined) {
                                this.lastNavMethod = extras.replaceUrl ? NavMethod.CURRENT : NavMethod.NEXT;
                                this.lastPopIndex = -1;
                                this.rcBrowser.isStatus() && this.rcBrowser.status(this.rcBrowser.getName(this), 'Routing to', urlOrCommand, 'with', extras);
                                this.lastGoingBack = false;
                            }
                            else {
                                this.lastGoingBack = true;
                                if (extras.replaceIndex >= this.urlStack.length) {
                                    this.rcBrowser.isError() && this.rcBrowser.error(this.rcBrowser.getName(this), 'Ignoring navigation to replaceIndex that is more than number of items in stack', { replaceIndex: extras.replaceIndex, urlStackLength: this.urlStack.length });
                                    extras.replaceIndex = this.urlStack.length - 1;
                                }
                                this.lastNavMethod = NavMethod.POP;
                                this.lastPopIndex = extras.replaceIndex;
                                this.rcBrowser.isStatus() && this.rcBrowser.status(this.rcBrowser.getName(this), 'navigateByUrl: Route back by', extras.replaceIndex - this.urlStack.length + 1, 'to url', urlOrCommand);
                            }
                            // prepare extras
                            delete extras.replaceUrl;
                            extras.skipLocationChange = true;
                            nc_paramsId = extras.paramsId || 'qp' + Date.now();
                            if (extras.queryParams) {
                                modalRoute = extras.queryParams.modalRoute;
                            }
                            this.currentQpId = nc_paramsId;
                            this.curQueryParam = extras.queryParams;
                            extras.queryParams = modalRoute ? { nc_paramsId: nc_paramsId, modalRoute: modalRoute } : { nc_paramsId: nc_paramsId };
                            this.curOutlet = outlet || PRIMARY_OUTLET;
                            url = Array.isArray(urlOrCommand) ? this.router.createUrlTree(urlOrCommand, extras) : urlOrCommand;
                            this.lastNavUrl = typeof url === 'string' ? url : this.router.serializeUrl(url);
                            return [4 /*yield*/, this.router.navigateByUrl(url, extras)];
                        case 1:
                            if (_a.sent()) {
                                return [2 /*return*/, true];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?} component
         * @param {?} componentRoute
         * @param {?=} queryParams
         * @param {?=} replaceUrl
         * @param {?=} caller
         * @return {?}
         */
        UiRouter.prototype.popupBottomIn = function (component, componentRoute, queryParams, replaceUrl, caller) {
            if (!queryParams)
                queryParams = {};
            /** @type {?} */
            var repUrl = replaceUrl || false;
            this.showInModal(component, componentRoute, queryParams, ComponentRoutes.BottomIn, caller, repUrl);
        };
        /**
         * @param {?} component
         * @param {?} componentRoute
         * @param {?=} queryParams
         * @param {?=} replaceUrl
         * @param {?=} caller
         * @return {?}
         */
        UiRouter.prototype.popupModal = function (component, componentRoute, queryParams, replaceUrl, caller) {
            if (!queryParams)
                queryParams = {};
            /** @type {?} */
            var repUrl = replaceUrl || false;
            this.showInModal(component, componentRoute, queryParams, ComponentRoutes.Modal, caller, repUrl);
        };
        /**
         * @param {?} queryParams
         * @param {?} caller
         * @param {?=} replaceUrl
         * @return {?}
         */
        UiRouter.prototype.showAlertDialog = function (queryParams, caller, replaceUrl) {
            this.popupModal(AlertDialogComponent, ComponentRoutes.Alert, queryParams, replaceUrl, caller);
        };
        /**
         * @param {?} params
         * @return {?}
         */
        UiRouter.prototype.hasQueryParamsById = function (params) {
            return !!params.nc_paramsId;
        };
        /**
         * @return {?}
         */
        UiRouter.prototype.getUrlStackLength = function () {
            return this.urlStack.length;
        };
        /**
         * @param {?=} outlet
         * @return {?}
         */
        UiRouter.prototype.getCurrentComponent = function (outlet) {
            if (outlet === void 0) { outlet = PRIMARY_OUTLET; }
            return this.curCompMap[outlet];
        };
        /**
         * @return {?}
         */
        UiRouter.prototype.getCurrentRouteName = function () {
            /** @type {?} */
            var topUrl = this.urlStack[this.urlStack.length - 1].url;
            return this.getRouteName(topUrl);
        };
        /**
         * @return {?}
         */
        UiRouter.prototype.onNavCancel = function () {
            this.lastNavMethod = 0;
        };
        /**
         * @return {?}
         */
        UiRouter.prototype.getCurQueryParams = function () {
            return this.curQueryParam;
        };
        /**
         * @param {?} url
         * @return {?}
         */
        UiRouter.prototype.getRouteName = function (url) {
            /** @type {?} */
            var urlTree = this.router.parseUrl(url);
            /** @type {?} */
            var segments = urlTree.root.children.primary ? urlTree.root.children.primary.segments : undefined;
            if (!segments) {
                //we are adding dummy url (#/?launched=true) in the beginning.
                this.rcBrowser.isWarn() && this.rcBrowser.warn(this.rcBrowser.getName(this), "received invalid url " + url);
                return '';
            }
            if (segments.length > 1) {
                /** @type {?} */
                var path_1 = '';
                segments.forEach(( /**
                 * @param {?} segment
                 * @param {?} index
                 * @return {?}
                 */function (segment, index) {
                    path_1 += segment + (index < segments.length - 1 ? '/' : '');
                }));
                return path_1;
            }
            return segments[0].path;
        };
        /**
         * @param {?} url
         * @return {?}
         */
        UiRouter.prototype.getModuleName = function (url) {
            /** @type {?} */
            var urlTree = this.router.parseUrl(url);
            /** @type {?} */
            var segments = urlTree.root.children.primary.segments;
            return segments[0].path;
        };
        /**
         * @return {?}
         */
        UiRouter.prototype.getCurrentQueryParams = function () {
            return this.curQueryParam;
        };
        /**
         * @param {?} params
         * @return {?}
         */
        UiRouter.prototype.getQueryParams = function (params) {
            /** @type {?} */
            var nc_paramsId = params.nc_paramsId;
            this.rcBrowser.isAssert() && this.rcBrowser.assert(this.rcBrowser.getName(this), nc_paramsId && nc_paramsId === this.currentQpId, 'Trying to retrieve non-existent params', params, this.currentQpId);
            return this.curQueryParam;
        };
        /**
         * @return {?}
         */
        UiRouter.prototype.clearHisory = function () {
            /** @type {?} */
            var distanceFromRoot = -1 * this.historyWrapper.getState().index - 1;
            this.historyWrapper.go(distanceFromRoot);
        };
        /**
         * @param {?} length
         * @return {?}
         */
        UiRouter.prototype.setIframeHistLength = function (length) {
            this.iframeHistLength = length;
        };
        /**
         * @param {?} name
         * @param {?} value
         * @return {?}
         */
        UiRouter.prototype.updateQueryParam = function (name, value) {
            /** @type {?} */
            var stackItem = this.urlStack[this.urlStack.length - 1];
            /** @type {?} */
            var queryParam = stackItem.queryParam;
            this.rcBrowser.isAssert() && this.rcBrowser.assert(this.rcBrowser.getName(this), queryParam, 'Your component does not get params by id');
            queryParam[name] = value;
        };
        /**
         * @param {?} component
         * @param {?=} outlet
         * @return {?}
         */
        UiRouter.prototype.setComponentForOutlet = function (component, outlet) {
            outlet = outlet || PRIMARY_OUTLET;
            this.rcBrowser.isAssert() && this.rcBrowser.assert(this.rcBrowser.getName(this), component);
            /** @type {?} */
            var oldEntry = this.curCompMap[outlet];
            if (oldEntry && oldEntry.component === component)
                return;
            this.curCompMap[outlet] = new OutletEntry(component);
        };
        /**
         * @param {?} component
         * @param {?=} outlet
         * @return {?}
         */
        UiRouter.prototype.removeComponentForOutlet = function (component, outlet) {
            outlet = outlet || PRIMARY_OUTLET;
            this.rcBrowser.isAssert() && this.rcBrowser.assert(this.rcBrowser.getName(this), this.curCompMap[outlet].component === component);
            delete this.curCompMap[outlet];
        };
        /**
         * @private
         * @param {?} component
         * @param {?} componentRoute
         * @param {?} queryParams
         * @param {?} type
         * @param {?=} caller
         * @param {?=} replaceUrl
         * @return {?}
         */
        UiRouter.prototype.showInModal = function (component, componentRoute, queryParams, type, caller, replaceUrl) {
            /** @type {?} */
            var compName = component.name;
            this.registerComponent(compName, component);
            queryParams[INJECTION_PARAM.INJECT] = compName;
            if (caller)
                queryParams[INJECTION_PARAM.CALLER] = caller;
            queryParams.modalRoute = '(' + componentRoute + ')';
            /** @type {?} */
            var repUrl = replaceUrl || false;
            this.rcBrowser.isStatus() && this.rcBrowser.status(this.rcBrowser.getName(this), "Popping up " + type + " for " + compName);
            this.navigateByUrl([{ outlets: { modal: type } }], { replaceUrl: repUrl,
                queryParams: queryParams }, MODAL_OUTLET);
        };
        /**
         * @param {?} componentRoute
         * @param {?} queryParams
         * @param {?=} replaceUrl
         * @return {?}
         */
        UiRouter.prototype.showModalPage = function (componentRoute, queryParams, replaceUrl) {
            queryParams.modalRoute = '(' + componentRoute + ')';
            /** @type {?} */
            var repUrl = replaceUrl || false;
            this.navigateByUrl([{ outlets: { modal: componentRoute } }], { replaceUrl: repUrl, queryParams: queryParams }, MODAL_OUTLET);
        };
        /**
         * @param {?=} whereOrByHowMuch
         * @return {?}
         */
        UiRouter.prototype.goBack = function (whereOrByHowMuch) {
            if (!this.canGoBack())
                return;
            if (this.isModalActive()) {
                this.onPopUpClosed();
            }
            return this.goBackInternal(whereOrByHowMuch);
        };
        /**
         * @param {?=} whereOrByHowMuch
         * @return {?}
         */
        UiRouter.prototype.goBackInternal = function (whereOrByHowMuch) {
            /** @type {?} */
            var stackLen = this.urlStack.length;
            /** @type {?} */
            var index = typeof whereOrByHowMuch === 'number' ? stackLen + whereOrByHowMuch - 1 : stackLen - 2;
            /** @type {?} */
            var where = typeof whereOrByHowMuch === 'string' ? whereOrByHowMuch : '';
            this.rcBrowser.isAssert() && this.rcBrowser.assert(this.rcBrowser.getName(this), index >= 0 && index < stackLen, { stackLen: stackLen, whereOrByHowMuch: whereOrByHowMuch, where: where, index: index });
            if (where) {
                if (!where.startsWith('/'))
                    where = '/' + where;
                for (; index >= 0; index--) {
                    if (this.urlStack[index].url.startsWith(where))
                        break;
                }
                if (index === -1) {
                    this.rcBrowser.isError() && this.rcBrowser.error(this.rcBrowser.getName(this), 'Could not find the desired url:', where, this.urlStack);
                    throw (new Error('Could not find the desired url: ' + where));
                }
            }
            /** @type {?} */
            var urlStack = this.urlStack[index];
            /** @type {?} */
            var ne = { replaceUrl: true };
            if (urlStack.qpId) {
                ne.paramsId = urlStack.qpId;
                ne.queryParams = urlStack.queryParam;
            }
            ne.replaceIndex = index;
            this.navigateByUrl(urlStack.url, ne, urlStack.outlet);
        };
        /*--------------------------------------------------------------------------------------------------------------
            History Stack management
          --------------------------------------------------------------------------------------------------------------*/
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        UiRouter.prototype.onPopState = function (e) {
            /** @type {?} */
            var index = this.historyWrapper.getState().index;
            /** @type {?} */
            var stackLen = this.urlStack.length;
            this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'onPopState', { stackLen: stackLen, index: index });
            this.rcBrowser.isAssert() && this.rcBrowser.assert(this.rcBrowser.getName(this), typeof index === 'number' &&
                index < (stackLen - 1), { stackLen: stackLen, index: index });
            if (index === -1) {
                if (!this.codePop) {
                    if (!this.canCompGoBack()) {
                        return;
                    }
                    if (this.warnedUser || this.runningInBrowser) {
                        this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'onPopState: Exiting the app', this.historyWrapper.getLength());
                        this.notifyAppClose();
                        if (!this.runningInBrowser)
                            this.notifyAppClose();
                        else
                            location.reload();
                        return;
                    }
                    else {
                        this.warnedUser = this.notifyUserBackPress();
                    }
                }
                else {
                    this.codePop = false;
                }
                this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'onPopState: Winding up stack on back to first item');
                for (var i = 0; i < stackLen; i++) {
                    this.browserStack[i] = this.urlStack[i].url;
                    this.historyWrapper.pushState({ index: i }, '', BASE_HREF + '#' + this.urlStack[i].url);
                }
                this.browserStack.length = stackLen;
            }
            else {
                if (!this.canCompGoBack()) {
                    return;
                }
                if (this.isModalActive()) {
                    this.onPopUpClosed();
                }
                /** @type {?} */
                var goBackBy = index - stackLen + 1;
                this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'onPopState: Going back by', { index: index, goBackBy: goBackBy });
                this.goBackInternal(goBackBy);
            }
        };
        /**
         * @private
         * @return {?}
         */
        UiRouter.prototype.canCompGoBack = function () {
            if (!this.canGoBack() || this.isToolTipShown()) {
                /** @type {?} */
                var lastIdx = this.urlStack.length - 1;
                /** @type {?} */
                var lastItem = this.urlStack[lastIdx];
                this.historyWrapper.pushState({ index: lastIdx }, '', BASE_HREF + '#' + lastItem.url);
                this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'not going back');
                return false;
            }
            return true;
        };
        /**
         * @private
         * @return {?}
         */
        UiRouter.prototype.onPopUpClosed = function () {
            /** @type {?} */
            var lastIdx = this.urlStack.length - 1;
            /** @type {?} */
            var lastItem = this.urlStack[lastIdx];
            if (!lastItem)
                return;
            /** @type {?} */
            var comp = this.curCompMap[lastItem.outlet];
            if (!comp || !comp.component.onBackPressed)
                return;
            comp.component.onBackPressed();
        };
        /**
         * @protected
         * @return {?}
         */
        UiRouter.prototype.canGoBack = function () {
            /** @type {?} */
            var lastIdx = this.urlStack.length - 1;
            /** @type {?} */
            var lastItem = this.urlStack[lastIdx];
            if (!lastItem)
                return true;
            /** @type {?} */
            var comp = this.curCompMap[lastItem.outlet];
            if (!comp || !comp.component.canGoBack) {
                this.removeOverlayIfExists();
                return true;
            }
            if (!comp.component.canGoBack()) {
                this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'Skipping back as component dis-allowed back press');
                return false;
            }
            else {
                this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'Going back as component allowed back press');
                return true;
            }
        };
        /**
         * @private
         * @param {?=} event
         * @return {?}
         */
        UiRouter.prototype.onNavEnd = function (event) {
            if (!(event instanceof router.NavigationEnd)) {
                return;
            }
            if (!this.firstNavDone) {
                this.firstNavDone = true;
                if (!this.lastNavMethod) {
                    this.lastNavMethod = NavMethod.CURRENT;
                    this.lastNavUrl = event.url;
                    this.curOutlet = PRIMARY_OUTLET;
                }
                /** @type {?} */
                var url = location.href;
                /** @type {?} */
                var hashPtr = url.indexOf('#');
                /** @type {?} */
                var urlPrefix = hashPtr === -1 ? url : url.substr(0, hashPtr);
            }
            this.rcBrowser.isStatus() && this.rcBrowser.status(this.rcBrowser.getName(this), 'NavigationEnd', {
                url: event.url,
                lastNavMethod: NavMethod[this.lastNavMethod],
                lastPopIndex: this.lastPopIndex,
                lastNavUrl: this.lastNavUrl,
                stackLength: this.urlStack.length
            });
            this.lastNavUrl !== event.url && this.rcBrowser.isError() && this.rcBrowser.error(this.rcBrowser.getName(this), 'onNavEnd without matching url desired:' + this.lastNavUrl + ' actual:' + event.url);
            /** @type {?} */
            var refIndex;
            if (this.lastNavMethod === NavMethod.POP) {
                refIndex = this.lastPopIndex;
            }
            else if (this.lastNavMethod === NavMethod.NEXT) {
                refIndex = this.urlStack.length;
            }
            else if (this.lastNavMethod === NavMethod.CURRENT) {
                refIndex = this.urlStack.length - 1;
            }
            else {
                this.rcBrowser.isError() && this.rcBrowser.error(this.rcBrowser.getName(this), 'Got a navigation without navMethod', this.urlStack, location.href);
                throw ('Got a navigation without navMethod');
            }
            /** @type {?} */
            var outletEntry = this.curCompMap[this.curOutlet];
            if (!outletEntry) {
                this.rcBrowser.isError() && this.rcBrowser.error(this.rcBrowser.getName(this), 'Current component is not known', {
                    url: event.url,
                    lastNavMethod: NavMethod[this.lastNavMethod],
                    lastPopIndex: this.lastPopIndex,
                    stackLength: this.urlStack.length
                });
            }
            this.onMubbleScreenChange(event.url, this.curOutlet, this.lastNavMethod);
            if (this.urlStack.length === refIndex)
                this.urlStack[refIndex] = new StackItem();
            /** @type {?} */
            var urlStack = this.urlStack[refIndex];
            urlStack.url = event.url;
            urlStack.qpId = this.currentQpId;
            urlStack.queryParam = this.curQueryParam;
            urlStack.outlet = this.curOutlet;
            this.urlStack.length = refIndex + 1;
            this.rcBrowser.isStatus() && this.rcBrowser.status(this.rcBrowser.getName(this), 'Current Url stack', this.urlStack[refIndex].url);
            this.lastNavMethod = 0;
            this.lastPopIndex = -1;
            this.lastNavUrl = '';
            this.curOutlet = null;
            this.setComponentParams(outletEntry);
            // When we remove the getParamsById function
            // this.currentQpId    = ''
            // this.curQueryParam  = null
            if (this.warnedUser)
                this.warnedUser = false;
            if (!this.isSdkApp)
                this.syncBrowserHistory();
            this.onMubbleScreenNavEnd(event.url, this.lastNavMethod);
        };
        /**
         * @private
         * @param {?} outletEntry
         * @return {?}
         */
        UiRouter.prototype.setComponentParams = function (outletEntry) {
            if (!outletEntry.component.onRouterInit)
                return;
            /** @type {?} */
            var params = this.router.routerState.root.snapshot.queryParams;
            /** @type {?} */
            var qp = params.nc_paramsId ? this.curQueryParam : params;
            if (isEqual__default['default'](qp, outletEntry.lastParams)) {
                this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'Skipping onRouterInit as parameters are same');
                return;
            }
            outletEntry.component.onRouterInit(qp, !outletEntry.invCount);
            outletEntry.invCount++;
            outletEntry.lastParams = qp;
        };
        /**
         * @private
         * @return {?}
         */
        UiRouter.prototype.syncBrowserHistory = function () {
            /** @type {?} */
            var browserStack = this.browserStack;
            /** @type {?} */
            var urlStack = this.urlStack;
            /** @type {?} */
            var stackLen = urlStack.length;
            /** @type {?} */
            var fromIndex = -1;
            // sync browserStack
            for (var index = 0; index < stackLen; index++) {
                if (fromIndex === -1 &&
                    (browserStack.length === index || browserStack[index] !== urlStack[index].url)) {
                    fromIndex = index;
                    break;
                }
            }
            this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'syncBrowserHistory', { fromIndex: fromIndex, stackLen: stackLen, browserStackLen: browserStack.length });
            if (fromIndex === -1) {
                if (urlStack.length !== browserStack.length)
                    this.browserGotoRoot();
            }
            else if (fromIndex === (stackLen - 1)) {
                if (browserStack.length === urlStack.length) {
                    this.historyWrapper.replaceState({ index: fromIndex }, '', BASE_HREF + '#' + urlStack[fromIndex]);
                    browserStack[fromIndex] = urlStack[fromIndex].url;
                }
                else if (browserStack.length + 1 === urlStack.length) {
                    this.historyWrapper.pushState({ index: fromIndex }, '', BASE_HREF + '#' + urlStack[fromIndex]);
                    browserStack[fromIndex] = urlStack[fromIndex].url;
                }
                else {
                    this.browserGotoRoot();
                }
            }
            else {
                this.browserGotoRoot();
            }
        };
        /**
         * @private
         * @return {?}
         */
        UiRouter.prototype.browserGotoRoot = function () {
            this.rcBrowser.isAssert() && this.rcBrowser.assert(this.rcBrowser.getName(this), this.historyWrapper.getState().index >= 0);
            /** @type {?} */
            var totalDistance = this.historyWrapper.getState().index;
            /** @type {?} */
            var distanceFromRoot = -1 * totalDistance - 1;
            this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'browserGotoRoot', {
                distanceFromRoot: distanceFromRoot,
                stackLen: this.urlStack.length,
                browserStackLen: this.browserStack.length
            });
            this.codePop = true;
            this.historyWrapper.go(distanceFromRoot);
            if (this.iframeHistLength)
                this.iframeHistLength = 0;
        };
        /*--------------------------------------------------------------------------------------------------------------
            Register components for reference by rest of the system
          --------------------------------------------------------------------------------------------------------------*/
        /**
         * @param {?} compName
         * @param {?} component
         * @return {?}
         */
        UiRouter.prototype.registerComponent = function (compName, component) {
            /** @type {?} */
            var oldComponent = this.componentRegistry[compName];
            if (oldComponent === component)
                return;
            this.componentRegistry[compName] = component;
            this.rcBrowser.isStatus() && this.rcBrowser.status(this.rcBrowser.getName(this), 'Registered component with name', compName);
        };
        /**
         * @param {?} compName
         * @return {?}
         */
        UiRouter.prototype.getComponent = function (compName) {
            return this.componentRegistry[compName];
        };
        /**
         * @param {?} url
         * @param {?} outlet
         * @param {?} lastNavMethod
         * @return {?}
         */
        UiRouter.prototype.onMubbleScreenChange = function (url, outlet, lastNavMethod) {
        };
        /**
         * @param {?} url
         * @param {?} lastNavMethod
         * @return {?}
         */
        UiRouter.prototype.onMubbleScreenNavEnd = function (url, lastNavMethod) {
        };
        /**
         * @return {?}
         */
        UiRouter.prototype.notifyUserBackPress = function () {
            return true;
        };
        /**
         * @return {?}
         */
        UiRouter.prototype.notifyAppClose = function () {
        };
        /**
         * @return {?}
         */
        UiRouter.prototype.isToolTipShown = function () {
            return true;
        };
        /**
         * @return {?}
         */
        UiRouter.prototype.removeOverlayIfExists = function () {
        };
        return UiRouter;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        UiRouter.prototype.historyWrapper;
        /**
         * @type {?}
         * @private
         */
        UiRouter.prototype.componentRegistry;
        /**
         * @type {?}
         * @protected
         */
        UiRouter.prototype.urlStack;
        /**
         * @type {?}
         * @protected
         */
        UiRouter.prototype.warnedUser;
        /**
         * @type {?}
         * @private
         */
        UiRouter.prototype.firstNavDone;
        /**
         * @type {?}
         * @private
         */
        UiRouter.prototype.browserStack;
        /**
         * @type {?}
         * @private
         */
        UiRouter.prototype.lastNavMethod;
        /**
         * @type {?}
         * @private
         */
        UiRouter.prototype.lastPopIndex;
        /**
         * @type {?}
         * @private
         */
        UiRouter.prototype.lastNavUrl;
        /**
         * @type {?}
         * @private
         */
        UiRouter.prototype.lastGoingBack;
        /**
         * @type {?}
         * @private
         */
        UiRouter.prototype.curOutlet;
        /**
         * @type {?}
         * @private
         */
        UiRouter.prototype.currentQpId;
        /**
         * @type {?}
         * @private
         */
        UiRouter.prototype.curQueryParam;
        /**
         * @type {?}
         * @private
         */
        UiRouter.prototype.curCompMap;
        /**
         * @type {?}
         * @private
         */
        UiRouter.prototype.codePop;
        /**
         * @type {?}
         * @private
         */
        UiRouter.prototype.runningInBrowser;
        /**
         * @type {?}
         * @private
         */
        UiRouter.prototype.isSdkApp;
        /**
         * @type {?}
         * @private
         */
        UiRouter.prototype.iframeHistLength;
        /**
         * @type {?}
         * @private
         */
        UiRouter.prototype.rcBrowser;
        /**
         * @type {?}
         * @protected
         */
        UiRouter.prototype.router;
    }
    var HistoryWrapper = /** @class */ (function () {
        /**
         * @param {?} rc
         * @param {?} isSdkApp
         */
        function HistoryWrapper(rc, isSdkApp) {
            this.rc = rc;
            this.isSdkApp = isSdkApp;
            rc.setupLogger(this, 'HistoryWrapper');
        }
        /**
         * @param {?} state
         * @param {?} title
         * @param {?} url
         * @return {?}
         */
        HistoryWrapper.prototype.pushState = function (state, title, url) {
            if (this.isSdkApp)
                return;
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'before pushState', {
                historyLength: history.length,
                historyState: history.state,
                newState: state
            });
            history.pushState(state, title, url);
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'after pushState', {
                historyLength: history.length,
                historyState: history.state
            });
        };
        /**
         * @param {?} state
         * @param {?} title
         * @param {?} url
         * @return {?}
         */
        HistoryWrapper.prototype.replaceState = function (state, title, url) {
            if (this.isSdkApp)
                return;
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'before replaceState', {
                historyLength: history.length,
                historyState: history.state,
                title: title,
                url: url,
                newState: state
            });
            history.replaceState(state, title, url);
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'after replaceState', {
                historyLength: history.length,
                historyState: history.state
            });
        };
        /**
         * @param {?} delta
         * @return {?}
         */
        HistoryWrapper.prototype.go = function (delta) {
            if (this.isSdkApp)
                return;
            history.go(delta);
        };
        /**
         * @return {?}
         */
        HistoryWrapper.prototype.getState = function () {
            if (this.isSdkApp)
                return;
            return history.state;
        };
        /**
         * @return {?}
         */
        HistoryWrapper.prototype.getLength = function () {
            if (this.isSdkApp)
                return;
            return history.length;
        };
        return HistoryWrapper;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        HistoryWrapper.prototype.rc;
        /**
         * @type {?}
         * @private
         */
        HistoryWrapper.prototype.isSdkApp;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var InjectionParentBase = /** @class */ (function () {
        /**
         * @param {?} rc
         * @param {?} router
         * @param {?} componentFactoryResolver
         * @param {?} route
         */
        function InjectionParentBase(rc, router, componentFactoryResolver, route) {
            this.rc = rc;
            this.router = router;
            this.componentFactoryResolver = componentFactoryResolver;
            this.route = route;
        }
        /**
         * @param {?} params
         * @param {?} injectAt
         * @param {?} showTitle
         * @return {?}
         */
        InjectionParentBase.prototype.onRouterInit = function (params, injectAt, showTitle) {
            this.rc.isStatus() && this.rc.status(this.rc.getName(this), 'onRouterInit called with', params);
            if (!this.injectedComponent) {
                this.injectComponent(params.inject, injectAt);
                this.caller = params[INJECTION_PARAM.CALLER];
                if (this.injectedComponent.initFromParent)
                    this.injectedComponent.initFromParent(this, showTitle);
                if (this.caller && this.injectedComponent.setCaller)
                    this.injectedComponent.setCaller(this.caller);
            }
            if (this.injectedComponent.setParam)
                this.injectedComponent.setParam(params);
        };
        // onInit(injectAt: ViewContainerRef, showTitle: boolean) {
        //   this.querySub = this.route.queryParams.subscribe(inParams => {
        //     const params = this.router.getQueryParams(inParams)
        //     this.rc.isStatus() && this.rc.status(this.rc.getName(this), 'ngOnInit called with', params)
        //     if (!this.injectedComponent) {
        //       this.injectComponent(params.inject, injectAt)
        //       this.caller = params[INJECTION_PARAM.CALLER]
        //       if (this.injectedComponent.initFromParent) this.injectedComponent.initFromParent(this, showTitle)
        //       if (this.caller && this.injectedComponent.setCaller) this.injectedComponent.setCaller(this.caller)
        //     }
        //     if (this.injectedComponent.setParam) this.injectedComponent.setParam(params)
        //   })
        // }
        /**
         * @private
         * @param {?} compName
         * @param {?} injectAt
         * @return {?}
         */
        InjectionParentBase.prototype.injectComponent = function (compName, injectAt) {
            /** @type {?} */
            var component = this.router.getComponent(compName);
            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), component);
            /** @type {?} */
            var factory = this.componentFactoryResolver.resolveComponentFactory(component);
            this.icRef = injectAt.createComponent(factory);
            this.icRef.changeDetectorRef.detectChanges();
            this.injectedComponent = this.icRef.instance;
            this.rc.isStatus() && this.rc.status(this.rc.getName(this), 'Injected component with', { injected: !!this.injectedComponent, factory: !!factory });
        };
        /**
         * @return {?}
         */
        InjectionParentBase.prototype.close = function () {
            this.childRequestedClose = true;
            this.router.goBack();
        };
        /**
         * @return {?}
         */
        InjectionParentBase.prototype.ngOnDestroy = function () {
            if (this.icRef)
                this.icRef.destroy();
        };
        return InjectionParentBase;
    }());
    if (false) {
        /** @type {?} */
        InjectionParentBase.prototype.childRequestedClose;
        /** @type {?} */
        InjectionParentBase.prototype.injectedComponent;
        /**
         * @type {?}
         * @private
         */
        InjectionParentBase.prototype.icRef;
        /** @type {?} */
        InjectionParentBase.prototype.caller;
        /** @type {?} */
        InjectionParentBase.prototype.rc;
        /** @type {?} */
        InjectionParentBase.prototype.router;
        /**
         * @type {?}
         * @private
         */
        InjectionParentBase.prototype.componentFactoryResolver;
        /**
         * @type {?}
         * @private
         */
        InjectionParentBase.prototype.route;
    }

    /** @type {?} */
    var STATE = { HALF: 'HALF', FULL: 'FULL' };
    /** @type {?} */
    var ROUTE_ANIM_MS = 400;
    /** @type {?} */
    var PAN_ANIM_MS = '300ms';
    /** @type {?} */
    var QUICK_ANIM_MS$1 = DomHelper.getQuickAnim();
    /** @type {?} */
    var COMMIT_RATIO = 1 / 3;
    /** @type {?} */
    var FAST_COMMIT_RATIO = COMMIT_RATIO / 2;
    /** @type {?} */
    var QUICK_SPEED = .3;
    var BottomInComponent = /** @class */ (function (_super) {
        __extends(BottomInComponent, _super);
        /**
         * @param {?} rc
         * @param {?} router
         * @param {?} route
         * @param {?} componentFactoryResolver
         * @param {?} renderer
         * @param {?} ref
         */
        function BottomInComponent(rc, router, route, componentFactoryResolver, renderer, ref) {
            var _this = _super.call(this, rc, router, componentFactoryResolver, route) || this;
            _this.renderer = renderer;
            _this.ref = ref;
            _this.__routeAnimation = null;
            _this.animElem = true;
            _this.title = '';
            _this.state = STATE.HALF;
            _this.allowFullPage = true;
            _this.routeEndProcessed = false;
            rc.setupLogger(_this, 'BottomIn', core.LOG_LEVEL.DEBUG);
            _this.rc.isDebug() && _this.rc.debug(_this.rc.getName(_this), 'constructor');
            if (rc.getGlobalLogLevel() === core.LOG_LEVEL.DEBUG) {
                window['bi'] = _this;
            }
            return _this;
        }
        // @HostBinding('style.z-index')   zIndex   = 2000
        /**
         * @param {?} event
         * @return {?}
         */
        BottomInComponent.prototype.onHostClick = function (event) {
            if (this.state === STATE.HALF) {
                this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Dismissing bottom-in due to host click');
                this.animateClose();
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        BottomInComponent.prototype.onRouteAnimationStart = function (event) {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onRouteAnimation-start', event);
            // console.log(event)
        };
        /**
         * @param {?} event
         * @return {?}
         */
        BottomInComponent.prototype.onRouteAnimationDone = function (event) {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onRouteAnimation-end', event);
            // console.log(event)
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onRouteAnimation-end', event);
            if (this.childRequestedClose && this.injectedComponent.closeFromParent) {
                if (this.routeEndProcessed)
                    return;
                this.routeEndProcessed = true;
                this.injectedComponent.closeFromParent();
            }
            else if (this.backPressed && this.injectedComponent.onBackPressed) {
                if (this.routeEndProcessed)
                    return;
                this.routeEndProcessed = true;
                this.injectedComponent.onBackPressed();
            }
        };
        /**
         * @param {?} params
         * @return {?}
         */
        BottomInComponent.prototype.onRouterInit = function (params) {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onRouterInit');
            _super.prototype.onRouterInit.call(this, params, this.injectAt, false);
            this.title = this.injectedComponent.getTitle();
            /** @type {?} */
            var halfHeight = this.injectedComponent.getHalfHeight();
            if (this.injectedComponent.getDefaultState) {
                this.state = this.injectedComponent.getDefaultState();
            }
            if (this.state === STATE.FULL) {
                halfHeight = document.body.clientHeight;
            }
            else if (halfHeight) {
                if (halfHeight > document.body.clientHeight) {
                    this.rc.isError() && this.rc.error(this.rc.getName(this), 'Half height passed is incorrect', { halfHeight: halfHeight, clientHeight: document.body.clientHeight });
                    halfHeight = 0.8 * document.body.clientHeight;
                }
                this.top = document.body.clientHeight - halfHeight;
            }
            else {
                this.allowFullPage = false;
            }
        };
        /**
         * @return {?}
         */
        BottomInComponent.prototype.ngAfterViewInit = function () {
            // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'ngAfterViewInit')
            this.panYMax = document.body.clientHeight;
            /** @type {?} */
            var $compCont = this.compContainer.nativeElement;
            /** @type {?} */
            var compHeight = $compCont.clientHeight;
            /** @type {?} */
            var headerHeight = this.header.nativeElement.getBoundingClientRect().height;
            if (this.allowFullPage) {
                this.panYMin = 0;
                $compCont.style.height = document.body.clientHeight - headerHeight;
            }
            else {
                this.top = document.body.clientHeight - (compHeight + headerHeight);
                this.panYMin = this.top;
            }
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'ngAfterViewInit: Component container', {
                clientHeight: document.body.clientHeight,
                compHeight: compHeight, headerHeight: headerHeight,
                top: this.top
            });
            this.main.nativeElement.style.transform = DomHelper.getTransform(0, this.top, 0).transform;
            this.nail = new Nail(this.rc, this.main.nativeElement, this, this.renderer, { axisX: false, axisY: true });
            this.ref.detectChanges();
        };
        /**
         * @return {?}
         */
        BottomInComponent.prototype.onPanStart = function () {
            this.startTop = this.compContainer.nativeElement.scrollTop;
            // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onPanStart', {
            //   panY: this.panY, state: this.state})
        };
        /**
         * @param {?} event
         * @return {?}
         */
        BottomInComponent.prototype.onPanMove = function (event) {
            /** @type {?} */
            var deltaY = event.deltaY;
            if (this.compContainer.nativeElement.scrollTop) {
                this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'cancelling panMove', { scrollTop: this.compContainer.nativeElement.scrollTop });
                return false;
            }
            if (deltaY > 0)
                deltaY -= this.startTop;
            /** @type {?} */
            var y = (this.state === STATE.HALF ? this.top : this.panYMin) + deltaY;
            if (y < this.panYMin) {
                y = this.panYMin;
            }
            else if (y > this.panYMax) {
                y = this.panYMax;
            }
            // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onPanMove', {
            //   type: event.type, deltaY, y, panY: this.panY, state: this.state
            // })
            /** @type {?} */
            var needAnimate = this.panY !== y;
            if (needAnimate)
                this.nail.requestAnimate(y);
            return needAnimate;
        };
        /**
         * @param {?} y
         * @return {?}
         */
        BottomInComponent.prototype.onPanAnimate = function (y) {
            this.animateChange(y, false);
        };
        /**
         * @param {?} event
         * @return {?}
         */
        BottomInComponent.prototype.onPanEnd = function (event) {
            // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onPanEnd', {
            //   type: event.type, panY: this.panY, top: this.top, speed: event.speed
            // })
            if (this.state === STATE.HALF) {
                if (this.panY > this.top) {
                    this.animateClose();
                }
                else if (this.panY < this.top) {
                    this.onFull(true);
                }
                else {
                    this.onHalf(true);
                }
            }
            else { // full
                if (this.panY > this.panYMin) {
                    this.animateClose();
                }
                else {
                    this.onFull(true);
                }
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        BottomInComponent.prototype.onClick = function (event) {
            event.preventDefault();
            event.stopPropagation();
        };
        /**
         * @return {?}
         */
        BottomInComponent.prototype.ngOnDestroy = function () {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'ngOnDestroy');
            _super.prototype.ngOnDestroy.call(this);
            if (this.nail)
                this.nail.destroy();
        };
        /**
         * @param {?} runAnimation
         * @return {?}
         */
        BottomInComponent.prototype.onHalf = function (runAnimation) {
            this.state = STATE.HALF;
            this.animateChange(this.top, runAnimation);
        };
        /**
         * @param {?} runAnimation
         * @return {?}
         */
        BottomInComponent.prototype.onFull = function (runAnimation) {
            this.state = STATE.FULL;
            this.animateChange(this.panYMin, runAnimation);
        };
        /**
         * @param {?} y
         * @param {?} runAnimation
         * @return {?}
         */
        BottomInComponent.prototype.animateChange = function (y, runAnimation) {
            if (this.panY !== y) {
                this.panY = y;
                /** @type {?} */
                var animValue = runAnimation ? PAN_ANIM_MS : QUICK_ANIM_MS$1;
                if (this.animValue !== animValue) {
                    this.animValue = animValue;
                    this.main.nativeElement.style.transition = animValue;
                }
                DomHelper.setTransform(this.main.nativeElement, 0, y, 0);
            }
        };
        /**
         * @return {?}
         */
        BottomInComponent.prototype.animateClose = function () {
            this.injectedComponent.closeFromParent();
            this.router.goBack();
        };
        /**
         * @return {?}
         */
        BottomInComponent.prototype.onBackPressed = function () {
            this.backPressed = true;
        };
        return BottomInComponent;
    }(InjectionParentBase));
    BottomInComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'bottom-in',
                    template: "<div class=\"bottom-in-comp\">\n  <div class=\"main bottom-in-container glb-animated-element\" (click)=\"onClick($event)\" #main>\n\n    <div #header>\n\n      <header *ngIf=\"allowFullPage\" class=\"test-bottom-in-toolabr bottom-in-toolbar-outline nc-toolbar\">\n        <span class=\"toolbar-title title text-body-supp text-size-medium test-bottom-in-title\">{{title}}</span>\n\n        <div *ngIf=\"state !== 'FULL'\" (click)=\"onFull(true)\" class=\"toolbar-right-ic-btn\">\n          <i class=\"modal-right-ic test-bottom-in-more fa fa-angle-up\" aria-hidden=\"true\"></i>\n        </div>\n        <div *ngIf=\"state === 'FULL'\" (click)=\"animateClose()\" class=\"toolbar-right-ic-btn\">\n          <i class=\"modal-right-ic test-bottom-in-more fa fa-angle-down\" aria-hidden=\"true\"></i>\n        </div>\n      </header>\n\n      <header *ngIf=\"!allowFullPage && title\" class=\"nc-small-toolbar text-heading\">\n        <span class=\"title test-bottom-in-title\">{{title}}</span>\n      </header>\n\n    </div>\n\n    <div class=\"component-container\" #compContainer>\n      <ng-template #injectAt></ng-template>\n    </div>\n\n  </div>\n</div>\n",
                    animations: [
                        animations.trigger('routeAnimation', [
                            animations.transition(':enter', [
                                animations.group([
                                    animations.query(':self', [
                                        animations.style({
                                            opacity: 0
                                        }),
                                        animations.animate(ROUTE_ANIM_MS, animations.style({
                                            opacity: 1
                                        }))
                                    ]),
                                    animations.query('div.main', [
                                        animations.style(DomHelper.getPercentTransform(0, 100)),
                                        animations.animate(ROUTE_ANIM_MS, animations.style('*'))
                                    ])
                                ])
                            ]),
                            animations.transition(':leave', [
                                animations.group([
                                    animations.animate(ROUTE_ANIM_MS, animations.style({
                                        opacity: 0
                                    })),
                                    animations.query('div.main', [
                                        animations.animate(ROUTE_ANIM_MS, animations.style({
                                            transform: 'translate3d(0, 100%, 0)'
                                        }))
                                    ])
                                ])
                            ])
                        ])
                    ],
                    styles: [".main{box-sizing:border-box;min-height:100vh;perspective:1000px;perspective-origin:50%;position:absolute;transform:translateZ(100px);width:100vw}.icon-align-right{float:right}.title{margin-left:2vw}.left-button,.right-button{flex-grow:0}.component-container{overflow-y:auto;width:100%}.bottom-in-container{width:100%}"]
                }] }
    ];
    /** @nocollapse */
    BottomInComponent.ctorParameters = function () { return [
        { type: RunContextBrowser, decorators: [{ type: i0.Inject, args: ['RunContext',] }] },
        { type: UiRouter },
        { type: router.ActivatedRoute },
        { type: i0.ComponentFactoryResolver },
        { type: i0.Renderer2 },
        { type: i0.ChangeDetectorRef }
    ]; };
    BottomInComponent.propDecorators = {
        __routeAnimation: [{ type: i0.HostBinding, args: ['@routeAnimation',] }],
        animElem: [{ type: i0.HostBinding, args: ['class.glb-animated-element',] }],
        onHostClick: [{ type: i0.HostListener, args: ['click', ['$event.target'],] }],
        onRouteAnimationStart: [{ type: i0.HostListener, args: ['@routeAnimation.start', ['$event'],] }],
        onRouteAnimationDone: [{ type: i0.HostListener, args: ['@routeAnimation.done', ['$event'],] }],
        main: [{ type: i0.ViewChild, args: ['main', { static: true },] }],
        header: [{ type: i0.ViewChild, args: ['header', { static: true },] }],
        compContainer: [{ type: i0.ViewChild, args: ['compContainer', { static: true },] }],
        injectAt: [{ type: i0.ViewChild, args: ['injectAt', { read: i0.ViewContainerRef, static: true },] }],
        title: [{ type: i0.Input }],
        state: [{ type: i0.Input }],
        allowFullPage: [{ type: i0.Input }]
    };
    if (false) {
        /** @type {?} */
        BottomInComponent.prototype.__routeAnimation;
        /** @type {?} */
        BottomInComponent.prototype.animElem;
        /** @type {?} */
        BottomInComponent.prototype.main;
        /** @type {?} */
        BottomInComponent.prototype.header;
        /** @type {?} */
        BottomInComponent.prototype.compContainer;
        /** @type {?} */
        BottomInComponent.prototype.injectAt;
        /** @type {?} */
        BottomInComponent.prototype.injectedComponent;
        /**
         * @type {?}
         * @private
         */
        BottomInComponent.prototype.top;
        /** @type {?} */
        BottomInComponent.prototype.title;
        /** @type {?} */
        BottomInComponent.prototype.state;
        /** @type {?} */
        BottomInComponent.prototype.allowFullPage;
        /**
         * @type {?}
         * @private
         */
        BottomInComponent.prototype.panY;
        /**
         * @type {?}
         * @private
         */
        BottomInComponent.prototype.animValue;
        /**
         * @type {?}
         * @private
         */
        BottomInComponent.prototype.panYMin;
        /**
         * @type {?}
         * @private
         */
        BottomInComponent.prototype.panYMax;
        /**
         * @type {?}
         * @private
         */
        BottomInComponent.prototype.nail;
        /**
         * @type {?}
         * @private
         */
        BottomInComponent.prototype.routeName;
        /**
         * @type {?}
         * @private
         */
        BottomInComponent.prototype.startTop;
        /**
         * @type {?}
         * @private
         */
        BottomInComponent.prototype.backPressed;
        /**
         * @type {?}
         * @private
         */
        BottomInComponent.prototype.routeEndProcessed;
        /**
         * @type {?}
         * @private
         */
        BottomInComponent.prototype.renderer;
        /**
         * @type {?}
         * @private
         */
        BottomInComponent.prototype.ref;
    }

    /** @type {?} */
    var ROUTE_ANIM_MS$1 = 400;
    var ModalPopupComponent = /** @class */ (function (_super) {
        __extends(ModalPopupComponent, _super);
        /**
         * @param {?} rc
         * @param {?} router
         * @param {?} route
         * @param {?} componentFactoryResolver
         * @param {?} renderer
         * @param {?} ref
         */
        function ModalPopupComponent(rc, router, route, componentFactoryResolver, renderer, ref) {
            var _this = _super.call(this, rc, router, componentFactoryResolver, route) || this;
            _this.renderer = renderer;
            _this.ref = ref;
            _this.__routeAnimation = true;
            _this.animElem = true;
            _this.routeEndProcessed = false;
            _this.width = "75vw";
            rc.setupLogger(_this, 'ModalPopup', core.LOG_LEVEL.DEBUG);
            _this.rc.isDebug() && _this.rc.debug(_this.rc.getName(_this), 'constructor');
            return _this;
        }
        // @HostBinding('style.z-index')   zIndex   = 3000;
        // @HostBinding('style.background-color') bg   = 'rgba(0,0,0,.5)'
        /**
         * @param {?} event
         * @return {?}
         */
        ModalPopupComponent.prototype.onHostClick = function (event) {
            this.animateClose();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        ModalPopupComponent.prototype.onRouteAnimationStart = function (event) {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onRouteAnimation-start', event);
        };
        /**
         * @param {?} event
         * @return {?}
         */
        ModalPopupComponent.prototype.onRouteAnimationDone = function (event) {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onRouteAnimation-end', event);
            if (this.childRequestedClose && this.injectedComponent.closeFromParent) {
                if (this.routeEndProcessed)
                    return;
                this.routeEndProcessed = true;
                this.injectedComponent.closeFromParent();
            }
            else if (this.backPressed && this.injectedComponent.onBackPressed) {
                if (this.routeEndProcessed)
                    return;
                this.routeEndProcessed = true;
                this.injectedComponent.onBackPressed();
            }
        };
        /**
         * @param {?} params
         * @return {?}
         */
        ModalPopupComponent.prototype.onRouterInit = function (params) {
            _super.prototype.onRouterInit.call(this, params, this.injectAt, true);
            this.width = this.injectedComponent.getWidth();
            if (this.injectedComponent.getCssClassName) {
                this.className = this.injectedComponent.getCssClassName();
            }
        };
        /**
         * @return {?}
         */
        ModalPopupComponent.prototype.ngAfterViewInit = function () {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'ngAfterViewInit');
        };
        /**
         * @param {?} event
         * @return {?}
         */
        ModalPopupComponent.prototype.onClick = function (event) {
            event.preventDefault();
            event.stopPropagation();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        ModalPopupComponent.prototype.ignoreScroll = function (event) {
            /** @type {?} */
            var notScrollable = this.injectedComponent.isNotScrollable
                && this.injectedComponent.isNotScrollable();
            if (notScrollable) {
                event.preventDefault();
                event.stopPropagation();
            }
        };
        /**
         * @return {?}
         */
        ModalPopupComponent.prototype.ngOnDestroy = function () {
            _super.prototype.ngOnDestroy.call(this);
            this.rc.isStatus() && this.rc.status(this.rc.getName(this), 'ngOnDestroy');
        };
        /**
         * @return {?}
         */
        ModalPopupComponent.prototype.animateClose = function () {
            if (this.injectedComponent.isNotDismissable &&
                this.injectedComponent.isNotDismissable()) {
                this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Wont dismiss popup');
            }
            else {
                this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Dismissing modal popup in due to host click');
                this.router.goBack();
            }
        };
        /**
         * @return {?}
         */
        ModalPopupComponent.prototype.onBackPressed = function () {
            this.backPressed = true;
        };
        /**
         * @return {?}
         */
        ModalPopupComponent.prototype.canGoBack = function () {
            /** @type {?} */
            var childComponent = this.injectedComponent;
            return childComponent.canGoBack ? childComponent.canGoBack() : true;
        };
        return ModalPopupComponent;
    }(InjectionParentBase));
    ModalPopupComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'modal-popup',
                    template: "<div class=\"modal-popup-comp\" (touchmove)=\"ignoreScroll($event)\">\n  <div class=\"modal-root-div component-container rounded-borders\"\n      [style.width]=\"width\" \n      (click)=\"onClick($event)\"\n      [ncClass]=\"className\"\n      (touchmove)=\"ignoreScroll($event)\"\n      #componentContainer>\n      \n      <ng-template #injectAt></ng-template>\n  </div>\n</div>",
                    animations: [
                        // trigger('routeAnimation', [
                        //   state('*', 
                        //     style({
                        //       'background-color': 'rgba(31,30,76, 0.6)', //primary color's 900 shade
                        //       opacity: 1
                        //     })
                        //   ),
                        //   transition(':enter', [
                        //     style({
                        //       'background-color': 'rgba(0,0,0,0)',
                        //       opacity: 1
                        //     }),
                        //     animate('1500ms')
                        //   ]),
                        //   transition(':leave', [
                        //     animate('500ms', style({
                        //       'background-color': 'rgba(0,0,0,0)',
                        //       opacity: 0
                        //     }))
                        //   ])
                        // ]),
                        // trigger('ccAnimate', [
                        //   state('*',
                        //     style({
                        //       'transform': 'rotateX(0deg)',
                        //     })
                        //   ),
                        //   transition(':enter', [
                        //     style({
                        //       'transform': 'rotateX(90deg)',
                        //     }),
                        //     animate('300ms cubic-bezier(0.55, 0.055, 0.675, 0.19)')
                        //   ])
                        // ])    
                        animations.trigger('routeAnimation', [
                            animations.transition(':enter', [
                                animations.group([
                                    animations.query(':self', [
                                        animations.style({
                                            opacity: 0
                                        }),
                                        animations.animate(ROUTE_ANIM_MS$1, animations.style({
                                            opacity: 1
                                        }))
                                    ]),
                                    animations.query('div.modal-root-div', [
                                        animations.style({
                                            transform: 'rotateX(90deg)'
                                        }),
                                        animations.animate(ROUTE_ANIM_MS$1, animations.style('*'))
                                    ])
                                ])
                            ]),
                            animations.transition(':leave', [
                                animations.group([
                                    animations.animate(ROUTE_ANIM_MS$1, animations.style({
                                        opacity: 0
                                    }))
                                ])
                            ])
                        ])
                    ],
                    styles: [".component-container{-webkit-transform-style:preserve-3d;max-width:500px;perspective:600px;perspective-origin:0 100%;transform-style:preserve-3d}.rounded-borders{border:0 solid transparent;border-radius:6px}"]
                }] }
    ];
    /** @nocollapse */
    ModalPopupComponent.ctorParameters = function () { return [
        { type: RunContextBrowser, decorators: [{ type: i0.Inject, args: ['RunContext',] }] },
        { type: UiRouter },
        { type: router.ActivatedRoute },
        { type: i0.ComponentFactoryResolver },
        { type: i0.Renderer2 },
        { type: i0.ChangeDetectorRef }
    ]; };
    ModalPopupComponent.propDecorators = {
        true: [{ type: i0.HostBinding, args: ['class.glb-flex-centered',] }],
        __routeAnimation: [{ type: i0.HostBinding, args: ['@routeAnimation',] }],
        animElem: [{ type: i0.HostBinding, args: ['class.glb-animated-element',] }],
        onHostClick: [{ type: i0.HostListener, args: ['click', ['$event.target'],] }],
        onRouteAnimationStart: [{ type: i0.HostListener, args: ['@routeAnimation.start', ['$event'],] }],
        onRouteAnimationDone: [{ type: i0.HostListener, args: ['@routeAnimation.done', ['$event'],] }],
        componentContainer: [{ type: i0.ViewChild, args: ['componentContainer', { static: true },] }],
        injectAt: [{ type: i0.ViewChild, args: ['injectAt', { read: i0.ViewContainerRef, static: true },] }],
        width: [{ type: i0.Input }],
        className: [{ type: i0.Input }]
    };
    if (false) {
        /** @type {?} */
        ModalPopupComponent.prototype.true;
        /** @type {?} */
        ModalPopupComponent.prototype.__routeAnimation;
        /** @type {?} */
        ModalPopupComponent.prototype.animElem;
        /** @type {?} */
        ModalPopupComponent.prototype.componentContainer;
        /** @type {?} */
        ModalPopupComponent.prototype.injectAt;
        /** @type {?} */
        ModalPopupComponent.prototype.injectedComponent;
        /**
         * @type {?}
         * @private
         */
        ModalPopupComponent.prototype.backPressed;
        /**
         * @type {?}
         * @private
         */
        ModalPopupComponent.prototype.routeEndProcessed;
        /** @type {?} */
        ModalPopupComponent.prototype.width;
        /** @type {?} */
        ModalPopupComponent.prototype.className;
        /**
         * @type {?}
         * @private
         */
        ModalPopupComponent.prototype.renderer;
        /**
         * @type {?}
         * @private
         */
        ModalPopupComponent.prototype.ref;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LoadingOverlayComponent = /** @class */ (function () {
        function LoadingOverlayComponent() {
        }
        return LoadingOverlayComponent;
    }());
    LoadingOverlayComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'loading-overlay',
                    template: "<div class=\"loading-overlay-comp loading-overlay-root\">\n  <div class=\"component-loader\"\n      [ngClass.xl]=\"['web-comp-width']\"\n      [ngClass.lg]=\"['web-comp-width']\"\n      [ngClass.md]=\"['web-comp-width']\"\n      [ngClass.sm]=\"['web-comp-width']\">\n      <div class=\"spinner-cont\">\n        <i class=\"spinner fa fa-spinner fa-pulse fa-3x fa-fw text-color-primary\"></i>\n      </div>\n      <div class=\"loading-text txt-xl-med-norm\">{{loadingText}}</div>\n  </div>\n</div>",
                    styles: [".loading-overlay-root{background-color:rgba(0,0,0,.2);height:100vh;position:absolute;top:0;width:100vw;z-index:60}.component-loader{align-items:center;border-color:transparent;border-radius:10px;border-style:solid;display:flex;flex-flow:row;height:14vh;margin:0 auto;position:relative;top:45%;width:90%}.spinner-cont{flex:0 0 30%}.loading-text{flex:0 0 70%}.spinner{margin:0 auto 0 10%}.web-comp-width{min-width:300px;width:20%}"]
                }] }
    ];
    /** @nocollapse */
    LoadingOverlayComponent.ctorParameters = function () { return []; };
    LoadingOverlayComponent.propDecorators = {
        loadingText: [{ type: i0.Input }]
    };
    if (false) {
        /** @type {?} */
        LoadingOverlayComponent.prototype.loadingText;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /*------------------------------------------------------------------------------
       About      : Contains English translations. Before writing any translation,
                    make sure you append mu to the key.
                    Do not hard code any strings in component that are shown to the user.
       
       Created on : Fri Jun 28 2019
       Author     : Sid
       
       Copyright (c) 2019 Obopay. All rights reserved.
    ------------------------------------------------------------------------------*/
    /** @type {?} */
    var LANG_EN_TRANS = {
        //Input Container Component
        'mu_inpt_cont_futr_date_err': 'Future dates are invalid',
        'mu_inpt_cont_min_amnt_err': 'Minimum amount should be greater than 0',
        'mu_inpt_cont_strt_date_err': 'Provide a start date',
        'mu_inpt_cont_end_date_err': 'Provide an end date',
        'mu_inpt_cont_date_err': 'Start date should not exceed end date',
        'mu_inpt_cont_amnt_err': 'Minimum amount should not exceed maximum amount',
        'mu_inpt_cont_val_err': 'Please enter valid value',
        'mu_fil_upl_retake_photo': 'Retake Photo',
        'mu_fil_upl_take_photo': 'Take Photo',
        'mu_fil_upl_change_text': 'Change photo',
        'mu_fil_upl_upload_photo': 'Upload Photo',
        'mu_fil_upl_upload_err': 'Please upload valid photo',
        'mu_fil_upl_unknow_err': 'Could not capture photo',
        'mu_inpt_cont_sel_err': 'Please select valid value',
        //Filter Component
        'mu_fltr_sub_titl': 'Filter By :',
        'mu_fltr_aply_fltr': 'Apply Filters',
        'mu_fltr_clr_fltr': 'Clear Filters',
        'mu_fltr_rqrd': '*',
        'mu_fltr_clr_all': 'Clear all',
        //Data table
        'mu_dt_tbl_edit': 'Edit',
        'mu_dt_tbl_save': 'Save',
        'mu_dt_tbl_empty_state': 'No data to display',
        //Page Not Found
        'page_not_fond_vist_home': 'Visit Home'
    };

    var _a;
    /** @type {?} */
    var muDictionary = (_a = {},
        _a[core.Mubble.Lang.English] = LANG_EN_TRANS,
        _a);

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var TRANSLATIONS = new i0.InjectionToken('translations');
    var ɵ0 = muDictionary;
    /** @type {?} */
    var TRANSLATION_PROVIDERS = [
        { provide: TRANSLATIONS, useValue: ɵ0, multi: true },
    ];
    /**
     * @param {?} dictionary
     * @return {?}
     */
    function getTranslations(dictionary) {
        return mergeDictionaries(muDictionary, dictionary);
    }
    /**
     * @param {?} muDictionary
     * @param {?} dictionary
     * @return {?}
     */
    function mergeDictionaries(muDictionary, dictionary) {
        Object.keys(muDictionary).forEach(( /**
         * @param {?} key
         * @return {?}
         */function (key) {
            /** @type {?} */
            var value = muDictionary[key];
            if (dictionary[key])
                muDictionary[key] = Object.assign(value, dictionary[key]);
        }));
        return muDictionary;
    }

    /** @type {?} */
    var PLACEHOLDER = '%';
    var TranslateService = /** @class */ (function () {
        /**
         * @param {?} rc
         * @param {?} _translations
         */
        function TranslateService(rc, _translations) {
            var e_1, _a, e_2, _b;
            this.rc = rc;
            this._translations = _translations;
            this.defaultLang = core.Mubble.Lang.English;
            this.fallback = true;
            if (Array.isArray(this._translations)) {
                /** @type {?} */
                var obj = {};
                try {
                    for (var _c = __values(this._translations), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var translate = _d.value;
                        /** @type {?} */
                        var keys = Object.keys(translate);
                        try {
                            for (var keys_1 = (e_2 = void 0, __values(keys)), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                                var key = keys_1_1.value;
                                if (!obj[key]) {
                                    obj[key] = translate[key];
                                }
                                else {
                                    Object.assign(obj[key], translate[key]);
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (keys_1_1 && !keys_1_1.done && (_b = keys_1.return)) _b.call(keys_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                this._translations = obj;
            }
            else {
                throw new Error("Translations Error. Expected type array. Actual " + typeof this._translations + " " + JSON.stringify(this._translations));
            }
        }
        /**
         * @return {?}
         */
        TranslateService.prototype.getCurrentLanguage = function () {
            return this.currentLang || this.defaultLang;
        };
        /**
         * @param {?} lang
         * @return {?}
         */
        TranslateService.prototype.setDefaultLanguage = function (lang) {
            this.defaultLang = lang;
        };
        /**
         * @param {?} enable
         * @return {?}
         */
        TranslateService.prototype.enableFallback = function (enable) {
            this.fallback = enable;
        };
        /**
         * @param {?} lang
         * @return {?}
         */
        TranslateService.prototype.use = function (lang) {
            this.currentLang = lang;
        };
        /**
         * @private
         * @param {?} key
         * @return {?}
         */
        TranslateService.prototype.translate = function (key) {
            /** @type {?} */
            var translation = key;
            // found in current language
            if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
                return this._translations[this.currentLang][key];
            }
            // fallback disabled
            if (!this.fallback) {
                return translation;
            }
            // found in default language
            if (this._translations[this.defaultLang] && this._translations[this.defaultLang][key]) {
                return this._translations[this.defaultLang][key];
            }
            return translation;
        };
        /**
         * @param {?} langObj
         * @param {?} lang
         * @return {?}
         */
        TranslateService.prototype.addTranslations = function (langObj, lang) {
            Object.assign(this._translations[lang], langObj);
        };
        /**
         * @param {?} key
         * @param {?=} words
         * @return {?}
         */
        TranslateService.prototype.instant = function (key, words) {
            // add optional parameter
            /** @type {?} */
            var translation = this.translate(key);
            if (!words)
                return translation;
            return this.replace(translation, words);
        };
        /**
         * @param {?=} word
         * @param {?=} words
         * @return {?}
         */
        TranslateService.prototype.replace = function (word, words) {
            if (word === void 0) { word = ''; }
            if (words === void 0) { words = ''; }
            /** @type {?} */
            var translation = word;
            /** @type {?} */
            var values = [].concat(words);
            values.forEach(( /**
             * @param {?} e
             * @param {?} i
             * @return {?}
             */function (e, i) {
                translation = translation.replace(PLACEHOLDER.concat(( /** @type {?} */(i))), e);
            }));
            return translation;
        };
        /**
         * @param {?} langObj
         * @param {?} lang
         * @return {?}
         */
        TranslateService.prototype.addMoreTranslations = function (langObj, lang) {
            this._translations[lang] = Object.assign(Object.assign({}, langObj), this._translations[lang]);
        };
        return TranslateService;
    }());
    TranslateService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    TranslateService.ctorParameters = function () { return [
        { type: RunContextBrowser, decorators: [{ type: i0.Inject, args: ['RunContext',] }] },
        { type: undefined, decorators: [{ type: i0.Inject, args: [TRANSLATIONS,] }] }
    ]; };
    /** @nocollapse */ TranslateService.ɵprov = i0.ɵɵdefineInjectable({ factory: function TranslateService_Factory() { return new TranslateService(i0.ɵɵinject("RunContext"), i0.ɵɵinject(TRANSLATIONS)); }, token: TranslateService, providedIn: "root" });
    if (false) {
        /**
         * @type {?}
         * @private
         */
        TranslateService.prototype.defaultLang;
        /**
         * @type {?}
         * @private
         */
        TranslateService.prototype.currentLang;
        /**
         * @type {?}
         * @private
         */
        TranslateService.prototype.fallback;
        /**
         * @type {?}
         * @private
         */
        TranslateService.prototype.rc;
        /**
         * @type {?}
         * @private
         */
        TranslateService.prototype._translations;
    }

    /** @enum {number} */
    var CONTEXT = {
        INIT: 0,
        CLEAR: 1,
        UPDATE: 2,
    };
    CONTEXT[CONTEXT.INIT] = 'INIT';
    CONTEXT[CONTEXT.CLEAR] = 'CLEAR';
    CONTEXT[CONTEXT.UPDATE] = 'UPDATE';
    /**
     * @record
     */
    function SelectedFilter() { }
    if (false) {
        /** @type {?} */
        SelectedFilter.prototype.id;
        /** @type {?} */
        SelectedFilter.prototype.mode;
        /** @type {?} */
        SelectedFilter.prototype.value;
        /** @type {?|undefined} */
        SelectedFilter.prototype.displayType;
    }
    /**
     * @record
     */
    function DateRangeInterface() { }
    if (false) {
        /** @type {?} */
        DateRangeInterface.prototype.startDate;
        /** @type {?|undefined} */
        DateRangeInterface.prototype.endDate;
    }
    /**
     * @record
     */
    function NumberRangeInterface() { }
    if (false) {
        /** @type {?} */
        NumberRangeInterface.prototype.minAmount;
        /** @type {?|undefined} */
        NumberRangeInterface.prototype.maxAmount;
    }
    var FilterComponent = /** @class */ (function () {
        /**
         * @param {?} rc
         * @param {?} translate
         */
        function FilterComponent(rc, translate) {
            this.rc = rc;
            this.translate = translate;
            this.filterItems = [];
            this.webMode = false; //if we want to use filter component as full page
            //if we want to use filter component as full page
            this.displayCount = 1;
            this.displayMode = core.DISPLAY_MODE.HORIZONTAL;
            this.selectedFilter = new i0.EventEmitter();
            this.stepSelectedFilter = new i0.EventEmitter();
            this.filters = [];
            this.DISPLAY_MODE = core.DISPLAY_MODE;
            this.filterChips = [];
        }
        /**
         * @return {?}
         */
        FilterComponent.prototype.ngOnInit = function () {
            this.applyBtnText = this.applyBtnTitle ? this.applyBtnTitle
                : this.translate.instant('mu_fltr_aply_fltr');
            this.initialize(CONTEXT.INIT);
        };
        /*=====================================================================
                                      UTILS
          =====================================================================*/
        /**
         * @param {?} lastFilters
         * @return {?}
         */
        FilterComponent.prototype.updateLastAppliedFilters = function (lastFilters) {
            this.filterItems = lastFilters;
            this.initialize(CONTEXT.UPDATE);
        };
        /*=====================================================================
                                          HTML
          =====================================================================*/
        /**
         * @return {?}
         */
        FilterComponent.prototype.applyFilters = function () {
            this.filterChips = [];
            /** @type {?} */
            var inputContInstances = this.inputContInstances.toArray();
            inputContInstances.forEach(( /**
             * @param {?} inputContInstance
             * @return {?}
             */function (/**
             * @param {?} inputContInstance
             * @return {?}
             */ inputContInstance) {
                inputContInstance.onSubmit();
            }));
            if (this.hasError())
                return;
            if (!this.valueChanged()) {
                this.selectedFilter.emit([]); //empty array indicates that the previous filters and current filters are same
                return;
            }
            this.selectedFilter.emit(this.filters);
        };
        /**
         * @return {?}
         */
        FilterComponent.prototype.clearFilters = function () {
            /** @type {?} */
            var inputContInstances = this.inputContInstances.toArray();
            inputContInstances.forEach(( /**
             * @param {?} inputContInstance
             * @return {?}
             */function (/**
             * @param {?} inputContInstance
             * @return {?}
             */ inputContInstance) {
                inputContInstance.onSubmit();
            }));
            this.initialize(CONTEXT.CLEAR);
            this.filterChips = [];
            this.selectedFilter.emit(undefined); //on clearing, we just return undefined
        };
        /**
         * @param {?} event
         * @return {?}
         */
        FilterComponent.prototype.setFilterItems = function (event) {
            this.setFilterChips(event);
            /** @type {?} */
            var index = this.filters.findIndex(( /**
             * @param {?} element
             * @return {?}
             */function (/**
             * @param {?} element
             * @return {?}
             */ element) { return element.id === event.id; }));
            this.filters[index].value = event.value;
        };
        /**
         * @param {?} event
         * @return {?}
         */
        FilterComponent.prototype.onFilterSelected = function (event) {
            this.stepSelectedFilter.emit(event);
        };
        /**
         * @param {?} filterItems
         * @return {?}
         */
        FilterComponent.prototype.resetFilters = function (filterItems) {
            var e_1, _a;
            var _loop_1 = function (fItem) {
                /** @type {?} */
                var currentIdx = this_1.filterItems.findIndex(( /**
                 * @param {?} val
                 * @return {?}
                 */function (/**
                 * @param {?} val
                 * @return {?}
                 */ val) { return val.params.id === fItem.params.id; }));
                if (currentIdx == -1)
                    return "continue";
                this_1.filterItems.splice(currentIdx, 1, fItem);
            };
            var this_1 = this;
            try {
                for (var filterItems_1 = __values(filterItems), filterItems_1_1 = filterItems_1.next(); !filterItems_1_1.done; filterItems_1_1 = filterItems_1.next()) {
                    var fItem = filterItems_1_1.value;
                    _loop_1(fItem);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (filterItems_1_1 && !filterItems_1_1.done && (_a = filterItems_1.return)) _a.call(filterItems_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        /*=====================================================================
                                          PRIVATE
          =====================================================================*/
        /**
         * @private
         * @return {?}
         */
        FilterComponent.prototype.hasError = function () {
            /** @type {?} */
            var inputContInstances = this.inputContInstances.toArray();
            return inputContInstances.some(( /**
             * @param {?} inputContInstance
             * @return {?}
             */function (/**
             * @param {?} inputContInstance
             * @return {?}
             */ inputContInstance) {
                return inputContInstance.hasError();
            }));
        };
        /**
         * @private
         * @return {?}
         */
        FilterComponent.prototype.valueChanged = function () {
            var e_2, _a;
            var _loop_2 = function (fItem) {
                /** @type {?} */
                var index = this_2.filters.findIndex(( /**
                 * @param {?} element
                 * @return {?}
                 */function (/**
                 * @param {?} element
                 * @return {?}
                 */ element) { return element.id === fItem.params.id; }));
                /** @type {?} */
                var changed = false;
                //checking if the previous filter value has changed or not according to the display type
                switch (fItem.params.displayType) {
                    case core.DISPLAY_TYPE.CALENDAR_BOX:
                    case core.DISPLAY_TYPE.INPUT_BOX:
                    case core.DISPLAY_TYPE.SELECTION_BOX:
                    case core.DISPLAY_TYPE.ROW_INPUT_BOX:
                    case core.DISPLAY_TYPE.MULTI_CHECK_BOX:
                    case core.DISPLAY_TYPE.DROPDOWN_MULTI_CHECK_BOX:
                    case core.DISPLAY_TYPE.RADIO:
                    case core.DISPLAY_TYPE.AUTOCOMPLETE_SELECT:
                    case core.DISPLAY_TYPE.SLIDER:
                        (!fItem.params.value && !this_2.filters[index].value)
                            ? changed = false
                            : changed = fItem.params.value !== this_2.filters[index].value;
                        break;
                    case core.DISPLAY_TYPE.DATE_RANGE:
                        /** @type {?} */
                        var dateRangeKeys = fItem.params.rangeKeys || ['startDate', 'endDate'];
                        ((!fItem.params.value[dateRangeKeys[0]] && !this_2.filters[index].value[dateRangeKeys[0]]) &&
                            (!fItem.params.value[dateRangeKeys[1]] && !this_2.filters[index].value[dateRangeKeys[1]]))
                            ? changed = false
                            : changed = (fItem.params.value[dateRangeKeys[0]] !== this_2.filters[index].value[dateRangeKeys[0]]) ||
                                (fItem.params.value[dateRangeKeys[1]] !== this_2.filters[index].value[dateRangeKeys[1]]);
                        break;
                    case core.DISPLAY_TYPE.NUMBER_RANGE:
                        /** @type {?} */
                        var numRangeKeys = fItem.params.rangeKeys || ['minAmount', 'maxAmount'];
                        ((!fItem.params.value[numRangeKeys[0]] && !this_2.filters[index].value[numRangeKeys[0]]) &&
                            (!fItem.params.value[numRangeKeys[1]] && !this_2.filters[index].value[numRangeKeys[1]]))
                            ? changed = false
                            : changed = (fItem.params.value[numRangeKeys[0]] !== this_2.filters[index].value[numRangeKeys[0]]) ||
                                (fItem.params.value[numRangeKeys[1]] !== this_2.filters[index].value[numRangeKeys[1]]);
                        break;
                }
                // isEqual(existingFilterItems, this.filters), changed)
                if (changed)
                    return { value: changed };
            };
            var this_2 = this;
            try {
                // const existingFilterItems = []
                // for (const filterItem of this.filterItems) {
                //   const muSelectedFilter : MuSelectedFilter  = {
                //     id          : filterItem.params.id,
                //     mode        : filterItem.mode,
                //     value       : filterItem.params.value || null,
                //     displayType : filterItem.params.displayType
                //   }
                //   existingFilterItems.push(muSelectedFilter)
                // }
                // console.log('isEqual',isEqual(existingFilterItems, this.filters))
                for (var _b = __values(this.filterItems), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var fItem = _c.value;
                    var state_1 = _loop_2(fItem);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return false;
        };
        /**
         * @private
         * @param {?} context
         * @return {?}
         */
        FilterComponent.prototype.initialize = function (context) {
            var e_3, _a, e_4, _b, e_5, _c;
            if (context === CONTEXT.INIT) {
                try {
                    for (var _d = __values(this.filterItems), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var fItem = _e.value;
                        this.filters.push({ id: fItem.params.id, value: fItem.params.value, mode: fItem.mode, displayType: fItem.params.displayType });
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            else if (context === CONTEXT.CLEAR) {
                this.filters = [];
                /** @type {?} */
                var fItems = [];
                try {
                    for (var _f = __values(this.filterItems), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var fItem = _g.value;
                        /** @type {?} */
                        var setNull = fItem.params.displayType === core.DISPLAY_TYPE.DATE_RANGE
                            ? { startDate: null, endDate: null }
                            : fItem.params.displayType === core.DISPLAY_TYPE.NUMBER_RANGE
                                ? { minAmount: null, maxAmount: null }
                                : null;
                        fItem.params.value = setNull;
                        fItems.push({
                            params: fItem.params,
                            mode: fItem.mode
                        });
                        this.filters.push({ id: fItem.params.id, value: setNull, mode: fItem.mode, displayType: fItem.params.displayType });
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                this.filterItems = [];
                this.filterItems = fItems;
            }
            else {
                /** @type {?} */
                var fItems = [];
                /** @type {?} */
                var filters = [];
                var _loop_3 = function (fItem) {
                    /** @type {?} */
                    var currentValue = this_3.filters.find(( /**
                     * @param {?} val
                     * @return {?}
                     */function (/**
                     * @param {?} val
                     * @return {?}
                     */ val) { return val.id === fItem.params.id && fItem.params.value; }));
                    fItem.params.value = currentValue ? currentValue.value : null;
                    fItems.push({
                        params: fItem.params,
                        mode: fItem.mode,
                    });
                    filters.push({ id: fItem.params.id, value: fItem.params.value, mode: fItem.mode, displayType: fItem.params.displayType });
                };
                var this_3 = this;
                try {
                    for (var _h = __values(this.filterItems), _j = _h.next(); !_j.done; _j = _h.next()) {
                        var fItem = _j.value;
                        _loop_3(fItem);
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                this.filterItems = [];
                this.filterItems = fItems;
                this.filters = filters;
            }
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        FilterComponent.prototype.setFilterChips = function (event) {
            var _this = this;
            switch (event.displayType) {
                case core.DISPLAY_TYPE.CALENDAR_BOX:
                    //Do we need it?
                    break;
                case core.DISPLAY_TYPE.INPUT_BOX:
                case core.DISPLAY_TYPE.ROW_INPUT_BOX:
                    if (event.value)
                        this.filterChips.push(event.value);
                    break;
                case core.DISPLAY_TYPE.MULTI_CHECK_BOX:
                case core.DISPLAY_TYPE.DROPDOWN_MULTI_CHECK_BOX:
                    if (event.value) {
                        /** @type {?} */
                        var checkboxValues = event.value;
                        checkboxValues.forEach(( /**
                         * @param {?} val
                         * @return {?}
                         */function (/**
                         * @param {?} val
                         * @return {?}
                         */ val) {
                            _this.filterChips.push(val.value);
                        }));
                    }
                    break;
                case core.DISPLAY_TYPE.SELECTION_BOX:
                case core.DISPLAY_TYPE.RADIO:
                case core.DISPLAY_TYPE.AUTOCOMPLETE_SELECT:
                case core.DISPLAY_TYPE.SLIDER:
                    if (event.value)
                        this.filterChips.push(event.value.value);
                    break;
                case core.DISPLAY_TYPE.DATE_RANGE:
                    //Do we need it?
                    break;
                case core.DISPLAY_TYPE.NUMBER_RANGE:
                    //Do we need it?
                    break;
            }
        };
        return FilterComponent;
    }());
    FilterComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'filter',
                    template: "<div  [ngClass]=\"webMode ? 'nc-web-view-filter-comp' : 'filter-comp'\"\n      [class.vertical-mode]=\"displayMode === DISPLAY_MODE.VERTICAL\"\n      [ngClass.xl]=\"webMode ? 'web-view-filter-comp' : 'web-filter-comp'\" \n      [ngClass.lg]=\"webMode ? 'web-view-filter-comp' : 'web-filter-comp'\" \n      [ngClass.md]=\"webMode ? 'web-view-filter-comp' : 'web-filter-comp'\"\n      [ngClass.sm]=\"webMode ? 'web-view-filter-comp' : 'web-filter-comp'\" mweb #parent>\n\n  <div class=\"filter-subtitle  primary-bg-light\">\n    <div class=\"head-cont\">\n      <span class=\"txt-xl-med-dark\"> {{ 'mu_fltr_sub_titl' | translate }} </span> \n      <span *ngIf=\"displayMode === DISPLAY_MODE.VERTICAL\" (click)=\"clearFilters()\"\n        class=\"txt-lg-med-norm\">\n        {{ 'mu_fltr_clr_all' | translate }} \n      </span>\n    </div>\n    <div class=\"chip-list\" *ngIf=\"filterChips.length\">\n      <div class=\"chip txt-lg-reg-dark\" *ngFor=\"let chip of filterChips\">\n          {{ chip }}\n      </div>\n    </div>\n  </div>\n\n  <div class=\"filter-content-body\">\n\n    <div class=\"single-filter-cont\" *ngFor=\"let fItem of filterItems; let i = index\"\n      adjustElements [displayInSingleRow]=\"displayCount\" [elementIndex]=\"i\" [webMode]=\"webMode\">\n      <div class=\"input-title txt-lg-bld-dark\">\n        {{ fItem.params.label }}\n\n        <span class=\"txt-lg-reg-norm error-text\" *ngIf=\"fItem.params.isRequired\">\n          {{ 'mu_fltr_rqrd' | translate }}\n        </span>\n      </div>\n\n      <div class=\"single-input-cont\">\n        <input-container\n          [inputParams]=\"fItem.params\"\n          [displayMode]=\"displayMode\"\n          [screen]=\"screen\"\n          [displayLabel]=\"false\"\n          [webMode]=\"webMode\"\n          [parentCont]=\"parent\"\n          (value)=\"setFilterItems($event)\"\n          (stepSelectedFilter)=\"onFilterSelected($event)\"\n          #inputCont>\n        </input-container>\n      </div>\n    </div>\n  </div>\n\n  <footer class=\"footer\">\n    <button class=\"button-primary btn sdk-button\" (click)=\"applyFilters()\">\n      {{ applyBtnText }}\n    </button>\n\n    <button class=\"button-primary btn sdk-button\" (click)=\"clearFilters()\"\n      *ngIf=\"displayMode !== DISPLAY_MODE.VERTICAL\">\n      {{ 'mu_fltr_clr_fltr' | translate }}\n    </button>\n  </footer>\n\n</div>",
                    styles: [".filter-comp{display:flex;flex-direction:column;height:100%;width:100%}.input-title{padding:3vw 4vw 0}.filter-content-body{max-height:70%;overflow-y:auto}.filter-content-body::-webkit-scrollbar{width:5px}.filter-subtitle,.footer{padding:2% 4%}.footer{bottom:0;display:flex;justify-content:space-between;left:0;position:absolute;width:92%}.footer .button-primary{margin:0!important}.btn{width:46%}.web-filter-comp{display:flex;flex-direction:column;overflow-y:auto}.web-filter-comp .input-title{padding:10px 0 0 4%;width:120px}.web-filter-comp .filter-subtitle{padding:10px 4%}.web-filter-comp .filter-content-body{flex-direction:row}.web-filter-comp .single-input-cont{width:calc(100% - 120px)}.web-filter-comp .single-filter-cont{align-items:baseline;display:flex;flex-direction:row}.web-filter-comp .footer{display:flex;justify-content:space-between;margin:auto;padding:2% 1%;position:relative;width:98%}.web-filter-comp .footer .button-primary{margin:0 auto!important}.web-filter-comp .btn{width:43%}.web-view-filter-comp{display:flex;flex-direction:column;height:auto!important;overflow-y:auto}.web-view-filter-comp .filter-subtitle{height:10%;max-height:10%;padding:4px 6px}.web-view-filter-comp .filter-content-body{display:flex;flex-wrap:wrap;height:auto;overflow-y:auto}.web-view-filter-comp .filter-content-body::-webkit-scrollbar{width:2px}.web-view-filter-comp .btn{width:auto}.web-view-filter-comp .single-filter-cont{align-items:center;display:flex;flex-direction:row;justify-content:space-between}.web-view-filter-comp .input-title{padding:6px;width:90px}.web-view-filter-comp .single-input-cont{padding:4px 0;width:calc(100% - 90px)}.web-view-filter-comp .left{margin-left:24px;width:calc(33% - 24px)}.web-view-filter-comp .right{margin-right:24px;width:calc(33% - 24px)}.web-view-filter-comp .middle{margin:0 12px;width:calc(33% - 24px)}.web-view-filter-comp .footer{display:block;height:20%;padding:1%;position:relative;width:98%}.web-view-filter-comp .footer .button-primary{float:right;height:2rem;margin:1px 6px!important;padding:6px}.nc-web-view-filter-comp{display:flex;flex-direction:column;height:auto!important;overflow-y:auto}.nc-web-view-filter-comp .filter-subtitle{padding:2vw 5vw}.nc-web-view-filter-comp .filter-content-body{display:flex;flex-wrap:wrap;height:auto;overflow-y:auto;padding:0 5vw}.nc-web-view-filter-comp .single-filter-cont{align-items:center;display:flex;flex-direction:row;width:50%}.nc-web-view-filter-comp .input-title{width:90px}.nc-web-view-filter-comp .single-input-cont{width:calc(100% - 90px)}.nc-web-view-filter-comp .start{padding-left:4vw}.nc-web-view-filter-comp .end{padding-right:4vw}.nc-web-view-filter-comp .footer{display:flex;height:auto;padding:2vw 5vw;position:relative;width:100%}.nc-web-view-filter-comp .footer .button-primary{height:2rem;margin:1px 6px!important;padding:6px}.web-filter-comp .head-cont{display:flex;justify-content:space-between}.web-filter-comp .chip-list{display:flex;flex-wrap:wrap;padding:10px 0 0}.web-filter-comp .chip{background-color:#d8d8d8;border-radius:5px;margin:2px;padding:7px 10px;word-break:break-word}.web-view-filter-comp .head-cont{display:flex;justify-content:space-between}.web-view-filter-comp .chip-list{display:flex;flex-wrap:wrap;padding:10px 0 0}.web-view-filter-comp .chip{background-color:#d8d8d8;border-radius:5px;margin:2px;padding:7px 10px;word-break:break-word}.vertical-mode{box-shadow:0 2px 5px 0 rgba(0,0,0,.2);max-height:100%!important}.vertical-mode .filter-content-body{max-height:none!important}.vertical-mode .single-filter-cont{align-items:flex-start;border-bottom:1px solid #dedede;flex-direction:column!important;padding:0 10px;width:calc(100% - 20px)!important}.vertical-mode .checkbox{padding:5px 0!important}.vertical-mode .input-title{padding-left:0;padding-top:10px!important}.vertical-mode .button-primary{height:1rem;width:calc(100% - 12px)}.vertical-mode .single-input-cont{width:100%}"]
                }] }
    ];
    /** @nocollapse */
    FilterComponent.ctorParameters = function () { return [
        { type: RunContextBrowser, decorators: [{ type: i0.Inject, args: ['RunContext',] }] },
        { type: TranslateService }
    ]; };
    FilterComponent.propDecorators = {
        inputContInstances: [{ type: i0.ViewChildren, args: ['inputCont',] }],
        filterItems: [{ type: i0.Input }],
        screen: [{ type: i0.Input }],
        webMode: [{ type: i0.Input }],
        displayCount: [{ type: i0.Input }],
        displayMode: [{ type: i0.Input }],
        applyBtnTitle: [{ type: i0.Input }],
        selectedFilter: [{ type: i0.Output }],
        stepSelectedFilter: [{ type: i0.Output }]
    };
    if (false) {
        /** @type {?} */
        FilterComponent.prototype.inputContInstances;
        /** @type {?} */
        FilterComponent.prototype.filterItems;
        /** @type {?} */
        FilterComponent.prototype.screen;
        /** @type {?} */
        FilterComponent.prototype.webMode;
        /** @type {?} */
        FilterComponent.prototype.displayCount;
        /** @type {?} */
        FilterComponent.prototype.displayMode;
        /** @type {?} */
        FilterComponent.prototype.applyBtnTitle;
        /** @type {?} */
        FilterComponent.prototype.selectedFilter;
        /** @type {?} */
        FilterComponent.prototype.stepSelectedFilter;
        /** @type {?} */
        FilterComponent.prototype.filters;
        /** @type {?} */
        FilterComponent.prototype.DISPLAY_MODE;
        /** @type {?} */
        FilterComponent.prototype.filterChips;
        /** @type {?} */
        FilterComponent.prototype.applyBtnText;
        /**
         * @type {?}
         * @protected
         */
        FilterComponent.prototype.rc;
        /**
         * @type {?}
         * @private
         */
        FilterComponent.prototype.translate;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var routes = [
        {
            path: ComponentRoutes.LoadingOverlay,
            component: LoadingOverlayComponent
        },
        {
            path: ComponentRoutes.Modal,
            component: ModalPopupComponent,
            outlet: 'modal'
        },
        {
            path: ComponentRoutes.BottomIn,
            component: BottomInComponent,
            outlet: 'modal'
        },
        {
            path: ComponentRoutes.Filter,
            component: FilterComponent
        }
    ];
    var MuComponentsRoutingModule = /** @class */ (function () {
        function MuComponentsRoutingModule() {
        }
        return MuComponentsRoutingModule;
    }());
    MuComponentsRoutingModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [
                        router.RouterModule.forChild(routes)
                    ],
                    exports: [
                        router.RouterModule
                    ]
                },] }
    ];

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TranslatePipe = /** @class */ (function () {
        /**
         * @param {?} _translate
         */
        function TranslatePipe(_translate) {
            this._translate = _translate;
        }
        /**
         * @param {?} value
         * @param {?=} args
         * @return {?}
         */
        TranslatePipe.prototype.transform = function (value, args) {
            if (!value)
                return;
            return this._translate.instant(value, args); // pass in args
        };
        return TranslatePipe;
    }());
    TranslatePipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'translate',
                    pure: false
                },] }
    ];
    /** @nocollapse */
    TranslatePipe.ctorParameters = function () { return [
        { type: TranslateService }
    ]; };
    if (false) {
        /**
         * @type {?}
         * @private
         */
        TranslatePipe.prototype._translate;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var CUSTOM_BREAKPOINTS = [
        {
            alias: "sm",
            suffix: "sm",
            mediaQuery: "screen and (min-width: 780px) and (max-width: 959px)",
            overlapping: false
        }
    ];
    var ɵ0$1 = CUSTOM_BREAKPOINTS;
    /** @type {?} */
    var CustomBreakPointsProvider = {
        provide: flexLayout.BREAKPOINT,
        useValue: ɵ0$1,
        multi: true
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NcAutoFocusDirective = /** @class */ (function () {
        /**
         * @param {?} element
         * @param {?} changeRef
         */
        function NcAutoFocusDirective(element, changeRef) {
            this.element = element;
            this.changeRef = changeRef;
        }
        /**
         * @return {?}
         */
        NcAutoFocusDirective.prototype.ngAfterViewInit = function () {
            this.element.nativeElement.focus();
            this.changeRef.detectChanges();
        };
        return NcAutoFocusDirective;
    }());
    NcAutoFocusDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[ncAutoFocus]'
                },] }
    ];
    /** @nocollapse */
    NcAutoFocusDirective.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: i0.ChangeDetectorRef }
    ]; };
    if (false) {
        /**
         * @type {?}
         * @private
         */
        NcAutoFocusDirective.prototype.element;
        /**
         * @type {?}
         * @private
         */
        NcAutoFocusDirective.prototype.changeRef;
    }

    /** @type {?} */
    var KEY_UP = 'keyup';
    /** @type {?} */
    var PASTE = 'paste';
    /** @type {?} */
    var CUT = 'cut';
    /** @type {?} */
    var NUMERIC = 'numeric';
    /** @type {?} */
    var BACKSPACE = 'Backspace';
    /** @type {?} */
    var pattern = /[\/\- ]/;
    var NcMaxLengthDirective = /** @class */ (function () {
        /**
         * @param {?} element
         * @param {?} renderer
         * @param {?} ngZone
         */
        function NcMaxLengthDirective(element, renderer, ngZone) {
            this.element = element;
            this.renderer = renderer;
            this.ngZone = ngZone;
            this.maxLength = 0;
            this.updatedValue = new i0.EventEmitter();
            this.eventHandlers = [];
        }
        /**
         * @return {?}
         */
        NcMaxLengthDirective.prototype.ngAfterViewInit = function () {
            this.maxLength = Number(this.maxLength);
            if (typeof this.maxLength !== 'number')
                return;
            this.eventHandlers.push(this.renderer.listen(this.element.nativeElement, KEY_UP, this.eventHandler.bind(this)), this.renderer.listen(this.element.nativeElement, PASTE, this.clipBoardEventHandler.bind(this)), this.renderer.listen(this.element.nativeElement, CUT, this.clipBoardEventHandler.bind(this)));
        };
        /**
         * @protected
         * @param {?} event
         * @return {?}
         */
        NcMaxLengthDirective.prototype.handleEvent = function (event) {
            this.eventHandler(event);
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        NcMaxLengthDirective.prototype.clipBoardEventHandler = function (event) {
            var _this = this;
            setTimeout(( /**
             * @return {?}
             */function () {
                _this.ngZone.runOutsideAngular(( /**
                 * @return {?}
                 */function () {
                    _this.eventHandler(event);
                }));
            }), 0);
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        NcMaxLengthDirective.prototype.eventHandler = function (event) {
            var _this = this;
            this.ngZone.runOutsideAngular(( /**
             * @return {?}
             */function () {
                /** @type {?} */
                var element = event.srcElement;
                if (element.inputMode) {
                    /** @type {?} */
                    var validInput = element.inputMode === NUMERIC && element.value.trim().length
                        && !isNaN(element.value);
                    if (validInput === false) {
                        /** @type {?} */
                        var currentValue = ( /** @type {?} */(element.value));
                        /** @type {?} */
                        var invalidIndex = currentValue.indexOf(event.key);
                        element.value = (( /** @type {?} */(element.value))).substring(0, invalidIndex);
                        event.srcElement.value = element.value;
                        return;
                    }
                }
                if (event.key === BACKSPACE) {
                    _this.emitUpdatedValue(element.value);
                    return;
                }
                if (element.value.length > _this.maxLength) {
                    event.preventDefault();
                    element.value = element.value.substring(0, _this.maxLength);
                }
                if (_this.format) {
                    /** @type {?} */
                    var formatStr = _this.format;
                    /** @type {?} */
                    var val = element.value;
                    for (var i = 0; i < element.value.length; i++) {
                        if (pattern.test(formatStr[i + 1]) && val[i + 1] !== formatStr[i + 1]) {
                            val = val.substr(0, i + 1) + formatStr[i + 1] + val.substr(i + 1);
                        }
                    }
                    element.value = val;
                }
                /** @type {?} */
                var scrollHeight = element.scrollHeight;
                /** @type {?} */
                var clientHeight = element.clientHeight;
                if (scrollHeight > clientHeight && element.scrollTop !== scrollHeight - clientHeight) {
                    element.scrollTop = scrollHeight - clientHeight;
                }
                _this.emitUpdatedValue(element.value);
                event.srcElement.value = element.value;
                return;
            }));
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        NcMaxLengthDirective.prototype.emitUpdatedValue = function (value) {
            var _this = this;
            this.ngZone.run(( /**
             * @return {?}
             */function () {
                _this.updatedValue.emit(value);
            }));
        };
        /**
         * @return {?}
         */
        NcMaxLengthDirective.prototype.ngOnDestroy = function () {
            var e_1, _a;
            try {
                for (var _b = __values(this.eventHandlers), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var eventHandler = _c.value;
                    eventHandler();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.eventHandlers = [];
        };
        return NcMaxLengthDirective;
    }());
    NcMaxLengthDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[ncMaxLength]'
                },] }
    ];
    /** @nocollapse */
    NcMaxLengthDirective.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: i0.Renderer2 },
        { type: i0.NgZone }
    ]; };
    NcMaxLengthDirective.propDecorators = {
        maxLength: [{ type: i0.Input, args: ['ncMaxLength',] }],
        format: [{ type: i0.Input, args: ['format',] }],
        updatedValue: [{ type: i0.Output }]
    };
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        NcMaxLengthDirective.prototype.maxLength;
        /** @type {?} */
        NcMaxLengthDirective.prototype.format;
        /** @type {?} */
        NcMaxLengthDirective.prototype.updatedValue;
        /**
         * @type {?}
         * @private
         */
        NcMaxLengthDirective.prototype.eventHandlers;
        /**
         * @type {?}
         * @protected
         */
        NcMaxLengthDirective.prototype.element;
        /**
         * @type {?}
         * @protected
         */
        NcMaxLengthDirective.prototype.renderer;
        /**
         * @type {?}
         * @protected
         */
        NcMaxLengthDirective.prototype.ngZone;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LongPressDirective = /** @class */ (function () {
        function LongPressDirective() {
            this.timeoutId = null;
            this.intervalId = null;
            this.onLongPress = new i0.EventEmitter();
            this.onLongPressing = new i0.EventEmitter();
            this.isTouching = new i0.EventEmitter();
            this.timeout = 1000;
        }
        Object.defineProperty(LongPressDirective.prototype, "press", {
            /**
             * @return {?}
             */
            get: function () {
                return this.isPressing;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LongPressDirective.prototype, "longPress", {
            /**
             * @return {?}
             */
            get: function () {
                return this.isLongPressing;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @param {?} event
         * @return {?}
         */
        LongPressDirective.prototype.onMouseDown = function (event) {
            var _this = this;
            this.isPressing = true;
            this.isTouching.emit(true);
            this.isLongPressing = false;
            this.timeoutId = (( /** @type {?} */(window))).setTimeout(( /**
             * @return {?}
             */function () {
                _this.isLongPressing = true;
                _this.onLongPress.emit(event);
                _this.intervalId = (( /** @type {?} */(window))).setInterval(( /**
                 * @return {?}
                 */function () {
                    _this.onLongPressing.emit(event);
                }), 30);
            }), this.timeout);
        };
        /**
         * @return {?}
         */
        LongPressDirective.prototype.onMouseLeave = function () {
            this.endPress();
        };
        /**
         * @private
         * @return {?}
         */
        LongPressDirective.prototype.endPress = function () {
            if (this.timeoutId !== null)
                clearTimeout(this.timeoutId);
            if (this.intervalId !== null)
                clearInterval(this.intervalId);
            this.isLongPressing = false;
            this.isPressing = false;
            this.isTouching.emit(false);
        };
        return LongPressDirective;
    }());
    LongPressDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[long-press]'
                },] }
    ];
    LongPressDirective.propDecorators = {
        onLongPress: [{ type: i0.Output }],
        onLongPressing: [{ type: i0.Output }],
        isTouching: [{ type: i0.Output }],
        timeout: [{ type: i0.Input }],
        press: [{ type: i0.HostBinding, args: ['class.press',] }],
        longPress: [{ type: i0.HostBinding, args: ['class.long-press',] }],
        onMouseDown: [{ type: i0.HostListener, args: ['touchstart', ['$event'],] }],
        onMouseLeave: [{ type: i0.HostListener, args: ['touchend', ['$event'],] }]
    };
    if (false) {
        /**
         * @type {?}
         * @private
         */
        LongPressDirective.prototype.timeoutId;
        /**
         * @type {?}
         * @private
         */
        LongPressDirective.prototype.intervalId;
        /**
         * @type {?}
         * @private
         */
        LongPressDirective.prototype.isLongPressing;
        /**
         * @type {?}
         * @private
         */
        LongPressDirective.prototype.isPressing;
        /** @type {?} */
        LongPressDirective.prototype.onLongPress;
        /** @type {?} */
        LongPressDirective.prototype.onLongPressing;
        /** @type {?} */
        LongPressDirective.prototype.isTouching;
        /** @type {?} */
        LongPressDirective.prototype.timeout;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NcStyleClassDirective = /** @class */ (function () {
        /**
         * @param {?} element
         * @param {?} renderer
         */
        function NcStyleClassDirective(element, renderer) {
            this.element = element;
            this.renderer = renderer;
        }
        /**
         * @return {?}
         */
        NcStyleClassDirective.prototype.ngAfterViewInit = function () {
            this.renderer.addClass(this.element.nativeElement, this.ncClass);
        };
        return NcStyleClassDirective;
    }());
    NcStyleClassDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[ncClass]'
                },] }
    ];
    /** @nocollapse */
    NcStyleClassDirective.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: i0.Renderer2 }
    ]; };
    NcStyleClassDirective.propDecorators = {
        ncClass: [{ type: i0.Input, args: ['ncClass',] }]
    };
    if (false) {
        /** @type {?} */
        NcStyleClassDirective.prototype.ncClass;
        /**
         * @type {?}
         * @private
         */
        NcStyleClassDirective.prototype.element;
        /**
         * @type {?}
         * @private
         */
        NcStyleClassDirective.prototype.renderer;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function WebModeCss() { }
    if (false) {
        /** @type {?} */
        WebModeCss.prototype.width;
        /** @type {?|undefined} */
        WebModeCss.prototype.marginRight;
        /** @type {?|undefined} */
        WebModeCss.prototype.maxWidth;
    }
    var AdjustElementsDirective = /** @class */ (function () {
        //if implemented in web mode, only then will this adjust otherwise it will take 100% width
        /**
         * @param {?} element
         */
        function AdjustElementsDirective(element) {
            this.element = element;
            this.displayCount = 1; //number of elements to be displayed in a single row
            //element index
            this.webMode = false; //if implemented in web mode, only then will this adjust otherwise it will take 100% width
        }
        /**
         * @return {?}
         */
        AdjustElementsDirective.prototype.ngAfterViewInit = function () {
            /** @type {?} */
            var webModeCss = this.calcWidth();
            if ((this.index + 1) % this.displayCount !== 0) {
                this.element.nativeElement.style.width = webModeCss.width;
                this.element.nativeElement.style.marginRight = webModeCss.marginRight;
                this.element.nativeElement.style.maxWidth = webModeCss.maxWidth;
            }
            else {
                this.element.nativeElement.style.width = webModeCss.width;
                this.element.nativeElement.style.maxWidth = webModeCss.maxWidth;
            }
        };
        /**
         * @private
         * @return {?}
         */
        AdjustElementsDirective.prototype.calcWidth = function () {
            /** @type {?} */
            var webModeCss = ( /** @type {?} */({}));
            if (!this.webMode) {
                webModeCss.width = '100%';
                return webModeCss;
            }
            switch (this.displayCount) {
                /* If the situation says that the parent wants to display 1 or 2 elements per row, we
                are assigning it manually. Otherwise we are iterating the 100% width in the for loop. */
                case 1:
                    webModeCss.width = '60%';
                    webModeCss.maxWidth = '400px';
                    break;
                case 2:
                    webModeCss.width = '45%';
                    webModeCss.marginRight = '10%';
                    webModeCss.maxWidth = '400px';
                    break;
                case 3:
                    webModeCss.width = '30%';
                    webModeCss.marginRight = '3%';
                default:
                    /** @type {?} */
                    var width = void 0;
                    /** @type {?} */
                    var marginRight = void 0;
                    /** @type {?} */
                    var index 
                    /* Considering the full width to be 100%, we are looping from 99 to get the maximum
                    width and minimum margin. The total width of the element container should be a
                    multiple of display count where as the total margin width should be a multiple of
                    (display count - 1).

                    This is because we are not providing the margin to the last container but giving a
                    margin right to other divs. If the total width of element container is x% then
                    total margin width becomes (100 - x)%. For eg. say our display count is 4.

                    For display count 4, there are 4 elements and 3 empty spaces in one row. Largest
                    number closest to 100 is assigned to total width where are largest number closest
                    to 0 is assigned to total margin. This helps us show the content in the maximum
                    space and give minimum possible space between them.

                    Here we are not starting the loop from 100 because if the display count is a factor
                    of 100 then it won't provide any margin hence making it difficult to distinguish
                    between two adjacent divs.

                    For display count = 4, we calculate from the loop that maximum width of each element
                    is 19% and margin between any two consecutive elements will be 8%. Hence, (4 * 19) +
                    (3 * 8) = 76 + 24 = 100% width is covered.
                    
                    While checking for margin, we are keeping one more check that margin to be given on
                    right should be more than the total elements to be displayed in single row.*/
                    = void 0;
                    /* Considering the full width to be 100%, we are looping from 99 to get the maximum
                    width and minimum margin. The total width of the element container should be a
                    multiple of display count where as the total margin width should be a multiple of
                    (display count - 1).

                    This is because we are not providing the margin to the last container but giving a
                    margin right to other divs. If the total width of element container is x% then
                    total margin width becomes (100 - x)%. For eg. say our display count is 4.

                    For display count 4, there are 4 elements and 3 empty spaces in one row. Largest
                    number closest to 100 is assigned to total width where are largest number closest
                    to 0 is assigned to total margin. This helps us show the content in the maximum
                    space and give minimum possible space between them.

                    Here we are not starting the loop from 100 because if the display count is a factor
                    of 100 then it won't provide any margin hence making it difficult to distinguish
                    between two adjacent divs.

                    For display count = 4, we calculate from the loop that maximum width of each element
                    is 19% and margin between any two consecutive elements will be 8%. Hence, (4 * 19) +
                    (3 * 8) = 76 + 24 = 100% width is covered.
                    
                    While checking for margin, we are keeping one more check that margin to be given on
                    right should be more than the total elements to be displayed in single row.*/
                    for (index = 99; index > 1; index--) {
                        if ((index % this.displayCount === 0) &&
                            (((100 - index) % (this.displayCount - 1) === 0) &&
                                ((100 - index) / (this.displayCount - 1) > this.displayCount))) {
                            width = (index / this.displayCount).toString().concat('%');
                            marginRight = ((100 - index) / (this.displayCount - 1)).toString().concat('%');
                            break;
                        }
                    }
                    webModeCss.width = width;
                    webModeCss.marginRight = marginRight;
                    break;
            }
            return webModeCss;
        };
        return AdjustElementsDirective;
    }());
    AdjustElementsDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[adjustElements]'
                },] }
    ];
    /** @nocollapse */
    AdjustElementsDirective.ctorParameters = function () { return [
        { type: i0.ElementRef }
    ]; };
    AdjustElementsDirective.propDecorators = {
        displayCount: [{ type: i0.Input, args: ['displayInSingleRow',] }],
        index: [{ type: i0.Input, args: ['elementIndex',] }],
        webMode: [{ type: i0.Input, args: ['webMode',] }]
    };
    if (false) {
        /** @type {?} */
        AdjustElementsDirective.prototype.displayCount;
        /** @type {?} */
        AdjustElementsDirective.prototype.index;
        /** @type {?} */
        AdjustElementsDirective.prototype.webMode;
        /**
         * @type {?}
         * @private
         */
        AdjustElementsDirective.prototype.element;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NcFallbackCharDirective = /** @class */ (function () {
        /**
         * @param {?} element
         */
        function NcFallbackCharDirective(element) {
            this.element = element;
            this.dynamicColorObj = {};
        }
        /**
         * @return {?}
         */
        NcFallbackCharDirective.prototype.ngAfterViewInit = function () {
            this.createDynamicColor();
            this.initialChar = this.getFirstCharacter(this.data);
            this.setColor(this.initialChar);
        };
        /**
         * @return {?}
         */
        NcFallbackCharDirective.prototype.createDynamicColor = function () {
            /** @type {?} */
            var l = '60%';
            /** @type {?} */
            var cac = 64;
            /** @type {?} */
            var spH = 0;
            /** @type {?} */
            var spL = 0;
            for (var i = 1; i <= 26; i++) {
                /** @type {?} */
                var h = spH + 10;
                spH += 10;
                for (var j = 0; j <= 26; j++) {
                    /** @type {?} */
                    var s = j ? spL + 3 : 60;
                    spL += 3;
                    /** @type {?} */
                    var col = "hsl(" + h + ", " + s + "%, " + l + ")";
                    if (j) {
                        this.dynamicColorObj["" + String.fromCharCode(cac + i) + String.fromCharCode(cac + j)] = col;
                    }
                    else {
                        this.dynamicColorObj[String.fromCharCode(cac + i)] = col;
                    }
                }
                spL = 0;
            }
        };
        /**
         * @param {?} str
         * @return {?}
         */
        NcFallbackCharDirective.prototype.getFirstCharacter = function (str) {
            /** @type {?} */
            var strArr = str.split(' ');
            /** @type {?} */
            var regExp = new RegExp('[a-zA-Z][a-zA-Z ]*');
            /** @type {?} */
            var charStr = strArr.filter(( /**
             * @param {?} str
             * @return {?}
             */function (str) {
                return regExp.test(str);
            }));
            /** @type {?} */
            var initials;
            if (this.needOneChar) {
                return initials = charStr[0].charAt(0).toUpperCase();
            }
            if (charStr.length > 1) {
                initials = (charStr[0].charAt(0) + strArr[1].charAt(0)).toUpperCase();
            }
            else {
                initials = charStr[0].charAt(0).toUpperCase();
            }
            return initials;
        };
        /**
         * @param {?} key
         * @return {?}
         */
        NcFallbackCharDirective.prototype.setColor = function (key) {
            ( /** @type {?} */(this.dynamicColorObj[key]));
            this.element.nativeElement.innerHTML = this.initialChar;
            this.element.nativeElement.style.background = ( /** @type {?} */(this.dynamicColorObj[key]));
        };
        return NcFallbackCharDirective;
    }());
    NcFallbackCharDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[ncFallbackChar]'
                },] }
    ];
    /** @nocollapse */
    NcFallbackCharDirective.ctorParameters = function () { return [
        { type: i0.ElementRef }
    ]; };
    NcFallbackCharDirective.propDecorators = {
        data: [{ type: i0.Input, args: ['ncFallbackChar',] }],
        needOneChar: [{ type: i0.Input, args: ['needOneChar',] }]
    };
    if (false) {
        /**
         * @type {?}
         * @private
         */
        NcFallbackCharDirective.prototype.dynamicColorObj;
        /**
         * @type {?}
         * @private
         */
        NcFallbackCharDirective.prototype.initialChar;
        /** @type {?} */
        NcFallbackCharDirective.prototype.data;
        /** @type {?} */
        NcFallbackCharDirective.prototype.needOneChar;
        /**
         * @type {?}
         * @private
         */
        NcFallbackCharDirective.prototype.element;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var KeyboardDirective = /** @class */ (function () {
        /**
         * @param {?} rc
         * @param {?} element
         * @param {?} renderer
         */
        function KeyboardDirective(rc, element, renderer) {
            this.rc = rc;
            this.element = element;
            this.renderer = renderer;
        }
        /**
         * @return {?}
         */
        KeyboardDirective.prototype.ngAfterViewInit = function () {
            if (!this.parentDiv)
                return;
            if (this.isHeghtAuto === undefined) {
                this.isHeghtAuto = !this.parentDiv.style.height.length;
            }
            this.renderer.addClass(this.element.nativeElement, 'mui-event-adjust-pan-screen');
            this.renderer.listen(this.element.nativeElement, 'mui-event-adjust-pan-screen', this.onCustomEvent.bind(this));
            this.renderer.listen(this.element.nativeElement, 'focus', this.onCustomEvent.bind(this));
            this.renderer.listen(this.element.nativeElement, 'blur', this.onBlur.bind(this));
            if (this.rc.bridge.isRunningInMWeb()) {
                this.handleKeyBoardEvents();
                window.addEventListener('resize', debounce__default['default'](this.handleKeyBoardEvents.bind(this), 300));
            }
        };
        /**
         * @private
         * @return {?}
         */
        KeyboardDirective.prototype.handleKeyBoardEvents = function () {
            /** @type {?} */
            var bodyHeight = document.body.getBoundingClientRect().height;
            if (!this.originalBodyHeight)
                this.originalBodyHeight = bodyHeight;
            /** @type {?} */
            var keyboardHeight = this.originalBodyHeight - bodyHeight;
            this.rc.bridge.currKeyboardHt = -keyboardHeight;
            this.onCustomEvent();
        };
        /**
         * @private
         * @return {?}
         */
        KeyboardDirective.prototype.onBlur = function () {
            if (this.rc.bridge.isRunningInBrowser() && !this.rc.bridge.isRunningInMWeb())
                return;
            if (this.isHeghtAuto) {
                this.renderer.removeStyle(this.parentDiv, 'height');
            }
            else {
                this.parentDiv.style.height = this.originalParentHeight + 'px';
            }
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), "onBlur original Height " + this.originalParentHeight);
            if (this.rc.bridge.isRunningInMWeb()) {
                window.scrollTo(0, 0);
            }
        };
        /**
         * @private
         * @return {?}
         */
        KeyboardDirective.prototype.onCustomEvent = function () {
            if (this.rc.bridge.isRunningInBrowser() && !this.rc.bridge.isRunningInMWeb())
                return;
            /** @type {?} */
            var keyboardHeight = this.rc.bridge.currKeyboardHt;
            /** @type {?} */
            var parentDiv = this.parentDiv;
            /** @type {?} */
            var parentDivRect = parentDiv.getBoundingClientRect();
            if (document.activeElement !== this.element.nativeElement)
                return;
            if (keyboardHeight < 0) {
                this.originalParentHeight = this.parentDiv.getBoundingClientRect().height;
                parentDiv.style.height = (parentDivRect.height - keyboardHeight) + 'px';
                /** @type {?} */
                var scrollOptions = {
                    behaviour: 'smooth',
                    block: 'center',
                    inline: 'start'
                };
                this.element.nativeElement.scrollIntoView(scrollOptions);
                if (this.rc.bridge.isRunningInMWeb()) {
                    window.scrollTo(0, 0);
                }
            }
            else {
                this.onBlur();
            }
        };
        /**
         * @return {?}
         */
        KeyboardDirective.prototype.ngOnDestroy = function () {
            this.renderer.removeClass(this.element.nativeElement, 'mui-event-adjust-pan-screen');
        };
        return KeyboardDirective;
    }());
    KeyboardDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[keyboard]'
                },] }
    ];
    /** @nocollapse */
    KeyboardDirective.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ['RunContext',] }] },
        { type: i0.ElementRef },
        { type: i0.Renderer2 }
    ]; };
    KeyboardDirective.propDecorators = {
        parentDiv: [{ type: i0.Input, args: ['keyboard',] }]
    };
    if (false) {
        /** @type {?} */
        KeyboardDirective.prototype.parentDiv;
        /**
         * @type {?}
         * @private
         */
        KeyboardDirective.prototype.originalParentHeight;
        /**
         * @type {?}
         * @private
         */
        KeyboardDirective.prototype.originalBodyHeight;
        /**
         * @type {?}
         * @private
         */
        KeyboardDirective.prototype.isHeghtAuto;
        /**
         * @type {?}
         * @protected
         */
        KeyboardDirective.prototype.rc;
        /**
         * @type {?}
         * @private
         */
        KeyboardDirective.prototype.element;
        /**
         * @type {?}
         * @private
         */
        KeyboardDirective.prototype.renderer;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NextInpFocusDirective = /** @class */ (function () {
        /**
         * @param {?} rc
         */
        function NextInpFocusDirective(rc) {
            this.rc = rc;
            this.onSubmit = new i0.EventEmitter();
        }
        /**
         * @param {?} event
         * @return {?}
         */
        NextInpFocusDirective.prototype.onHostSubmit = function (event) {
            this.onEnter(event);
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        NextInpFocusDirective.prototype.onEnter = function (event) {
            if (this.nextInpFocusElem) {
                this.nextInpFocusElem.focus();
            }
            else {
                this.onSubmit.emit(event);
            }
        };
        return NextInpFocusDirective;
    }());
    NextInpFocusDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[nextInpFocus]'
                },] }
    ];
    /** @nocollapse */
    NextInpFocusDirective.ctorParameters = function () { return [
        { type: RunContextBrowser, decorators: [{ type: i0.Inject, args: ['RunContext',] }] }
    ]; };
    NextInpFocusDirective.propDecorators = {
        onHostSubmit: [{ type: i0.HostListener, args: ['keydown.enter', ['$event.target'],] }],
        nextInpFocusElem: [{ type: i0.Input, args: ['nextInpFocus',] }],
        onSubmit: [{ type: i0.Output }]
    };
    if (false) {
        /** @type {?} */
        NextInpFocusDirective.prototype.nextInpFocusElem;
        /** @type {?} */
        NextInpFocusDirective.prototype.onSubmit;
        /**
         * @type {?}
         * @protected
         */
        NextInpFocusDirective.prototype.rc;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var ALLOW_CLICK_DELAY = 1000;
    /** @type {?} */
    var BUTTON = 'BUTTON';
    var NcAllowSingleClickDirective = /** @class */ (function () {
        /**
         * @param {?} rc
         * @param {?} element
         * @param {?} renderer
         */
        function NcAllowSingleClickDirective(rc, element, renderer) {
            this.rc = rc;
            this.element = element;
            this.renderer = renderer;
            this.ncClick = new i0.EventEmitter();
            this.clickEnabled = true;
            this.originialColor = '';
        }
        /**
         * @return {?}
         */
        NcAllowSingleClickDirective.prototype.onMouseOver = function () {
            if (this.element.nativeElement.tagName === BUTTON || !this.rc.bridge.isRunningInBrowser())
                return;
            if (!this.originialColor) {
                this.originialColor = window.getComputedStyle(this.element.nativeElement, null).getPropertyValue('background-color');
            }
            this.element.nativeElement.style.background = '#f2f5f7';
        };
        /**
         * @param {?} $event
         * @return {?}
         */
        NcAllowSingleClickDirective.prototype.onClick = function ($event) {
            this.applyOriginalBg();
            if (!this.clickEnabled)
                return;
            this.clickEnabled = false;
            this.allowClickDelay = this.allowClickDelay || ALLOW_CLICK_DELAY;
            setTimeout(this.allowClick.bind(this), this.allowClickDelay);
            this.ncClick.emit($event);
        };
        /**
         * @return {?}
         */
        NcAllowSingleClickDirective.prototype.ngAfterViewInit = function () {
            this.element.nativeElement.style.cursor = 'pointer';
            this.renderer.listen(this.element.nativeElement, 'mouseover', this.onMouseOver.bind(this));
            this.renderer.listen(this.element.nativeElement, 'mouseout', this.applyOriginalBg.bind(this));
            this.renderer.listen(this.element.nativeElement, 'click', this.applyOriginalBg.bind(this));
        };
        /**
         * @return {?}
         */
        NcAllowSingleClickDirective.prototype.allowClick = function () {
            this.clickEnabled = true;
        };
        /*=====================================================================
                                      PRIVATE
          =====================================================================*/
        /**
         * @private
         * @return {?}
         */
        NcAllowSingleClickDirective.prototype.applyOriginalBg = function () {
            if (this.element.nativeElement.tagName === BUTTON || !this.rc.bridge.isRunningInBrowser())
                return;
            this.element.nativeElement.style.background = this.originialColor || 'initial';
        };
        return NcAllowSingleClickDirective;
    }());
    NcAllowSingleClickDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[ncAllowSingleClick]'
                },] }
    ];
    /** @nocollapse */
    NcAllowSingleClickDirective.ctorParameters = function () { return [
        { type: RunContextBrowser, decorators: [{ type: i0.Inject, args: ['RunContext',] }] },
        { type: i0.ElementRef },
        { type: i0.Renderer2 }
    ]; };
    NcAllowSingleClickDirective.propDecorators = {
        allowClickDelay: [{ type: i0.Input, args: ['ncPreventDoubleClick',] }],
        ncClick: [{ type: i0.Output }],
        onClick: [{ type: i0.HostListener, args: ['click', ['$event'],] }]
    };
    if (false) {
        /** @type {?} */
        NcAllowSingleClickDirective.prototype.allowClickDelay;
        /** @type {?} */
        NcAllowSingleClickDirective.prototype.ncClick;
        /**
         * @type {?}
         * @private
         */
        NcAllowSingleClickDirective.prototype.clickEnabled;
        /**
         * @type {?}
         * @private
         */
        NcAllowSingleClickDirective.prototype.originialColor;
        /**
         * @type {?}
         * @protected
         */
        NcAllowSingleClickDirective.prototype.rc;
        /**
         * @type {?}
         * @private
         */
        NcAllowSingleClickDirective.prototype.element;
        /**
         * @type {?}
         * @private
         */
        NcAllowSingleClickDirective.prototype.renderer;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var IMAGE_TYPE = {
        WALLET: 'WALLET',
        APP: 'APP',
        BANK: 'BANK',
        PROFILE: 'PROFILE',
    };
    /** @type {?} */
    var APP_ICON = 'images/app-logo-hoz.jpg';
    /** @type {?} */
    var WALLET_ICON = 'svg-icons/ic-primary-wallet.svg';
    /** @type {?} */
    var BANK_ICON = 'svg-icons/ic-bank-activity-fill.svg';
    /** @type {?} */
    var PROFILE_ICON = 'svg-icons/ic-user-gray.svg';
    var NcImgFallbackDirective = /** @class */ (function () {
        /**
         * @param {?} element
         */
        function NcImgFallbackDirective(element) {
            this.element = element;
        }
        /**
         * @return {?}
         */
        NcImgFallbackDirective.prototype.onError = function () {
            if (!Array.isArray(this.data)) {
                this.setFallbackImage(this.data);
                return;
            }
            if (this.data[1] && this.data[1].r && this.data[1].g && this.data[1].b) {
                this.element.nativeElement.style.background = this.getColor(this.data[1]);
                return;
            }
            this.setFallbackImage(this.data[0]);
        };
        /**
         * @private
         * @param {?} type
         * @return {?}
         */
        NcImgFallbackDirective.prototype.setFallbackImage = function (type) {
            switch (type) {
                case IMAGE_TYPE.WALLET:
                    this.element.nativeElement.src = WALLET_ICON;
                    break;
                case IMAGE_TYPE.APP:
                    this.element.nativeElement.src = APP_ICON;
                    break;
                case IMAGE_TYPE.BANK:
                    this.element.nativeElement.src = BANK_ICON;
                    break;
                case IMAGE_TYPE.PROFILE:
                    this.element.nativeElement.src = PROFILE_ICON;
                    break;
                default:
                    this.element.nativeElement.src = APP_ICON;
            }
        };
        /**
         * @private
         * @param {?} color
         * @return {?}
         */
        NcImgFallbackDirective.prototype.getColor = function (color) {
            return "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
        };
        return NcImgFallbackDirective;
    }());
    NcImgFallbackDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[ncImgFallback]'
                },] }
    ];
    /** @nocollapse */
    NcImgFallbackDirective.ctorParameters = function () { return [
        { type: i0.ElementRef }
    ]; };
    NcImgFallbackDirective.propDecorators = {
        data: [{ type: i0.Input }],
        onError: [{ type: i0.HostListener, args: ['error',] }]
    };
    if (false) {
        /** @type {?} */
        NcImgFallbackDirective.prototype.data;
        /**
         * @type {?}
         * @private
         */
        NcImgFallbackDirective.prototype.element;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ValidateImgDirective = /** @class */ (function () {
        /**
         * @param {?} element
         * @param {?} renderer
         */
        function ValidateImgDirective(element, renderer) {
            this.element = element;
            this.renderer = renderer;
            // { base64: string, ...args }
            this.imgLoaded = new i0.EventEmitter();
            this.imgError = new i0.EventEmitter();
        }
        /**
         * @return {?}
         */
        ValidateImgDirective.prototype.ngAfterViewInit = function () {
            this.renderer.addClass(this.element.nativeElement, 'img-validator');
            this.element.nativeElement.src = this.payload.base64;
        };
        /**
         * @return {?}
         */
        ValidateImgDirective.prototype.onError = function () {
            this.imgError.emit(this.payload);
        };
        /**
         * @return {?}
         */
        ValidateImgDirective.prototype.onLoad = function () {
            this.imgLoaded.emit(this.payload);
        };
        return ValidateImgDirective;
    }());
    ValidateImgDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[validateImg]'
                },] }
    ];
    /** @nocollapse */
    ValidateImgDirective.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: i0.Renderer2 }
    ]; };
    ValidateImgDirective.propDecorators = {
        payload: [{ type: i0.Input }],
        imgLoaded: [{ type: i0.Output }],
        imgError: [{ type: i0.Output }],
        onError: [{ type: i0.HostListener, args: ['error',] }],
        onLoad: [{ type: i0.HostListener, args: ['load',] }]
    };
    if (false) {
        /** @type {?} */
        ValidateImgDirective.prototype.payload;
        /** @type {?} */
        ValidateImgDirective.prototype.imgLoaded;
        /** @type {?} */
        ValidateImgDirective.prototype.imgError;
        /**
         * @type {?}
         * @private
         */
        ValidateImgDirective.prototype.element;
        /**
         * @type {?}
         * @private
         */
        ValidateImgDirective.prototype.renderer;
    }

    var GenericPipe = /** @class */ (function () {
        /**
         * @param {?} rc
         * @param {?} injector
         */
        function GenericPipe(rc, injector) {
            this.rc = rc;
            this.injector = injector;
        }
        /**
         * @param {?} value
         * @param {?} pipeName
         * @param {?} pipeParams
         * @return {?}
         */
        GenericPipe.prototype.transform = function (value, pipeName, pipeParams) {
            if (!pipeName)
                return value;
            /** @type {?} */
            var pipe = this.injector.get(( /** @type {?} */(pipeName)));
            if (pipe.transform && typeof pipe.transform === 'function') {
                if (pipeParams)
                    return pipe.transform.apply(pipe, __spread([value], pipeParams));
                return pipe.transform(value);
            }
            return value;
        };
        return GenericPipe;
    }());
    GenericPipe.decorators = [
        { type: i0.Pipe, args: [{ name: 'genericPipe' },] }
    ];
    /** @nocollapse */
    GenericPipe.ctorParameters = function () { return [
        { type: RunContextBrowser, decorators: [{ type: i0.Inject, args: ['RunContext',] }] },
        { type: i0.Injector }
    ]; };
    if (false) {
        /**
         * @type {?}
         * @private
         */
        GenericPipe.prototype.rc;
        /**
         * @type {?}
         * @private
         */
        GenericPipe.prototype.injector;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ExtractMobileNoPipe = /** @class */ (function () {
        /**
         * @param {?} rc
         */
        function ExtractMobileNoPipe(rc) {
            this.rc = rc;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        ExtractMobileNoPipe.prototype.transform = function (value) {
            return this.rc.utils.get10digitMobNumber(value);
        };
        return ExtractMobileNoPipe;
    }());
    ExtractMobileNoPipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'extractMobileNo'
                },] }
    ];
    /** @nocollapse */
    ExtractMobileNoPipe.ctorParameters = function () { return [
        { type: RunContextBrowser, decorators: [{ type: i0.Inject, args: ['RunContext',] }] }
    ]; };
    if (false) {
        /**
         * @type {?}
         * @private
         */
        ExtractMobileNoPipe.prototype.rc;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var INR = 'INR';
    /** @type {?} */
    var CURRENCY = 'currency';
    var CurrencyPipe = /** @class */ (function () {
        /**
         * @param {?} rc
         */
        function CurrencyPipe(rc) {
            this.rc = rc;
        }
        /**
         * @param {?} value
         * @param {?=} decimalReq
         * @return {?}
         */
        CurrencyPipe.prototype.transform = function (value, decimalReq) {
            if (decimalReq === void 0) { decimalReq = true; }
            if (value === undefined)
                return;
            /** @type {?} */
            var options = ( /** @type {?} */({
                currency: INR,
                style: CURRENCY,
                maximumFractionDigits: 2
            }));
            /** @type {?} */
            var formattedNumber = value.toLocaleString('en-IN', options);
            return decimalReq ? formattedNumber : formattedNumber.split('.')[0];
        };
        return CurrencyPipe;
    }());
    CurrencyPipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'inrcurrency'
                },] }
    ];
    /** @nocollapse */
    CurrencyPipe.ctorParameters = function () { return [
        { type: RunContextBrowser, decorators: [{ type: i0.Inject, args: ['RunContext',] }] }
    ]; };
    if (false) {
        /**
         * @type {?}
         * @private
         */
        CurrencyPipe.prototype.rc;
    }

    var DropDownMultiSelectComponent = /** @class */ (function () {
        /**
         * @param {?} rc
         * @param {?} changeRef
         */
        function DropDownMultiSelectComponent(rc, changeRef) {
            this.rc = rc;
            this.changeRef = changeRef;
            this.isDropDownOpen = false;
            this.isSelectAll = false;
            this.showPlaceHolder = true;
            this.listOptions = [];
            this.selectedItems = new i0.EventEmitter();
            this.selectedAll = new i0.EventEmitter();
        }
        /**
         * @return {?}
         */
        DropDownMultiSelectComponent.prototype.ngOnInit = function () {
            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), this.options, "missing options " + this.options);
            this.listOptions = JSON.parse(JSON.stringify(this.options));
        };
        /*=====================================================================
                                      UTILS
          =====================================================================*/
        /**
         * @param {?} element
         * @return {?}
         */
        DropDownMultiSelectComponent.prototype.onHostClick = function (element) {
            var e_1, _a;
            /** @type {?} */
            var calExpStr = ['drop-down-list', 'checkbox-cont'];
            /** @type {?} */
            var isMatched = false;
            if (this.showDropDown) {
                try {
                    for (var calExpStr_1 = __values(calExpStr), calExpStr_1_1 = calExpStr_1.next(); !calExpStr_1_1.done; calExpStr_1_1 = calExpStr_1.next()) {
                        var exp = calExpStr_1_1.value;
                        /** @type {?} */
                        var calExp = new RegExp(exp);
                        isMatched = calExp.test(element.target.offsetParent.className);
                        if (isMatched)
                            return;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (calExpStr_1_1 && !calExpStr_1_1.done && (_a = calExpStr_1.return)) _a.call(calExpStr_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                if (!this.isDropDownOpen) {
                    this.showDropDown = false;
                }
                else {
                    this.isDropDownOpen = false;
                }
            }
        };
        /*=====================================================================
                                      PRIVATE
          =====================================================================*/
        /**
         * @private
         * @return {?}
         */
        DropDownMultiSelectComponent.prototype.handlePlaceHolder = function () {
            /** @type {?} */
            var index = this.listOptions.findIndex(( /**
             * @param {?} option
             * @return {?}
             */function (option) {
                return option.selected;
            }));
            if (index !== -1)
                this.showPlaceHolder = false;
            else
                this.showPlaceHolder = true;
        };
        /*=====================================================================
                                      HTML
          =====================================================================*/
        /**
         * @return {?}
         */
        DropDownMultiSelectComponent.prototype.handleDropDown = function () {
            this.showDropDown = !this.showDropDown;
            this.isDropDownOpen = !this.isDropDownOpen;
        };
        /**
         * @param {?} event
         * @param {?} option
         * @return {?}
         */
        DropDownMultiSelectComponent.prototype.onCheckBoxClick = function (event, option) {
            if (event.checked) {
                option.selected = true;
                this.showPlaceHolder = false;
            }
            else {
                option.selected = false;
                this.handlePlaceHolder();
            }
            this.changeRef.detectChanges();
            this.selectedItems.emit(option);
        };
        /**
         * @param {?} event
         * @return {?}
         */
        DropDownMultiSelectComponent.prototype.onSelectAll = function (event) {
            if (event.checked) {
                this.showPlaceHolder = false;
                this.listOptions.forEach(( /**
                 * @param {?} option
                 * @return {?}
                 */function (option) {
                    option.selected = true;
                }));
                this.isSelectAll = true;
            }
            else {
                this.listOptions.forEach(( /**
                 * @param {?} option
                 * @return {?}
                 */function (option) {
                    option.selected = false;
                }));
                this.isSelectAll = false;
                this.handlePlaceHolder();
            }
            this.selectedAll.emit(event);
        };
        return DropDownMultiSelectComponent;
    }());
    DropDownMultiSelectComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'drop-down-multi-select',
                    template: "<div class=\"drop-down-multi-select-comp\"\n  [ngClass.xl]=\"['web-drop-down-multi-select']\"\n  [ngClass.lg]=\"['web-drop-down-multi-select']\"\n  [ngClass.md]=\"['web-drop-down-multi-select']\"\n  [ngClass.sm]=\"['web-drop-down-multi-select']\">\n\n  <div class=\"drop-box-cont border-primary\">\n\n    <div class=\"placeholder txt-md-med-light\" *ngIf=\"placeholder && showPlaceHolder\">\n      {{ placeholder }}\n    </div>\n\n    <div class=\"sel-items-cont\" *ngIf=\"!showPlaceHolder\">\n\n      <ng-container *ngFor=\"let option of listOptions\">\n        <div class=\"sel-item txt-sm-med-dark grey-bg\" *ngIf=\"option.selected\">\n          {{ option.value }}\n        </div>\n      </ng-container>\n\n    </div>\n\n    <div class=\"arrow-cont\">\n      <div class=\"arrow\" (click)=\"handleDropDown()\">\n        <i class=\"fa fa-2x fa-angle-down\" aria-hidden=\"true\"></i>\n      </div>\n    </div>\n\n  </div>\n\n  <div class=\"drop-down-list bg-white\" *ngIf=\"showDropDown\">\n\n    <div class=\"checkbox-cont\">\n      <mat-checkbox *ngIf=\"showSelectAll\" [value]=\"'ALL'\"\n        class=\"txt-md-med-norm checkbox\"\n        [checked]=\"isSelectAll\"\n        (change)=\"onSelectAll($event)\">\n        Select All\n      </mat-checkbox>\n\n      <mat-checkbox *ngFor=\"let option of listOptions\" [value]=\"option\"\n        class=\"txt-md-med-norm checkbox\"\n        [checked]=\"option.selected\"\n        (change)=\"onCheckBoxClick($event, option)\">\n        {{ option.value }}\n      </mat-checkbox>\n\n    </div>\n  \n  </div>\n\n</div>",
                    styles: [".drop-box-cont{border-style:solid;border-width:2px;display:flex;justify-content:space-between;padding:4px 8px}.drop-down-list{border-radius:4px;box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);max-height:200px;overflow-y:auto;padding:0 10px;position:absolute;width:calc(24% - 12px);z-index:200}.sel-items-cont{display:flex;overflow-y:auto;width:calc(100% - 24px)}.placeholder,.sel-item{align-items:center;display:flex}.sel-item{margin-right:10px;padding:0 4px}.checkbox{padding:1vw 0}.checkbox-cont{display:flex;flex-direction:column;position:relative}@media screen and (max-width:1500px) and (min-width:900px){.drop-down-list{width:calc(22% - 20px)}}"]
                }] }
    ];
    /** @nocollapse */
    DropDownMultiSelectComponent.ctorParameters = function () { return [
        { type: RunContextBrowser, decorators: [{ type: i0.Inject, args: ['RunContext',] }] },
        { type: i0.ChangeDetectorRef }
    ]; };
    DropDownMultiSelectComponent.propDecorators = {
        options: [{ type: i0.Input }],
        showSelectAll: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        selectedItems: [{ type: i0.Output }],
        selectedAll: [{ type: i0.Output }],
        onHostClick: [{ type: i0.HostListener, args: ['document:click', ['$event'],] }]
    };
    if (false) {
        /** @type {?} */
        DropDownMultiSelectComponent.prototype.showDropDown;
        /** @type {?} */
        DropDownMultiSelectComponent.prototype.isDropDownOpen;
        /** @type {?} */
        DropDownMultiSelectComponent.prototype.isSelectAll;
        /** @type {?} */
        DropDownMultiSelectComponent.prototype.showPlaceHolder;
        /** @type {?} */
        DropDownMultiSelectComponent.prototype.listOptions;
        /** @type {?} */
        DropDownMultiSelectComponent.prototype.options;
        /** @type {?} */
        DropDownMultiSelectComponent.prototype.showSelectAll;
        /** @type {?} */
        DropDownMultiSelectComponent.prototype.placeholder;
        /** @type {?} */
        DropDownMultiSelectComponent.prototype.selectedItems;
        /** @type {?} */
        DropDownMultiSelectComponent.prototype.selectedAll;
        /**
         * @type {?}
         * @protected
         */
        DropDownMultiSelectComponent.prototype.rc;
        /**
         * @type {?}
         * @private
         */
        DropDownMultiSelectComponent.prototype.changeRef;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LoadingComponent = /** @class */ (function () {
        /**
         * @param {?} rc
         */
        function LoadingComponent(rc) {
            this.rc = rc;
        }
        /**
         * @return {?}
         */
        LoadingComponent.prototype.ngOnInit = function () {
            if (this.apiLoadingBottomIn === undefined)
                this.apiLoadingBottomIn = false;
        };
        return LoadingComponent;
    }());
    LoadingComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'loading',
                    template: "<div class=\"loading-comp\">\n\n  <div class=\"mu-loading-root\" [ngClass]=\"customClass || 'bg-white'\"\n    [ngClass.xl]=\"['web-mu-content-div', customClass || 'bg-white']\"\n    [ngClass.lg]=\"['web-mu-content-div', customClass || 'bg-white']\"\n    [ngClass.md]=\"['web-mu-content-div', customClass || 'bg-white']\"\n    [ngClass.sm]=\"['web-mu-content-div', customClass || 'bg-white']\">\n\n    <div class=\"loading-cont\">\n\n      <div class=\"spinner-cont\" [class.spinner-cont-top]=\"apiLoadingBottomIn\">\n        <img *ngIf=\"graphicUrl\" src=\"{{graphicUrl}}\">\n        <i *ngIf=\"!graphicUrl\" class=\"spinner fa fa-spinner fa-pulse fa-3x fa-fw text-color-primary\"></i>\n      </div>\n      \n      <div class=\"loading-text txt-xl-med-norm\">\n        {{apiLoadingText}}\n      </div>\n\n    </div>\n\n  </div>\n\n</div>",
                    styles: [".mu-loading-root{align-items:center;display:flex;justify-content:center}.loading-text{padding:2vw}.loading-cont{align-items:center;display:flex;flex-direction:column;justify-content:center}.web-mu-content-div{height:100%!important;width:100%!important}.web-mu-content-div .loading-text{padding:10px}"]
                }] }
    ];
    /** @nocollapse */
    LoadingComponent.ctorParameters = function () { return [
        { type: RunContextBrowser, decorators: [{ type: i0.Inject, args: ['RunContext',] }] }
    ]; };
    LoadingComponent.propDecorators = {
        apiLoadingText: [{ type: i0.Input }],
        apiLoadingBottomIn: [{ type: i0.Input }],
        customClass: [{ type: i0.Input }],
        graphicUrl: [{ type: i0.Input }]
    };
    if (false) {
        /** @type {?} */
        LoadingComponent.prototype.apiLoadingText;
        /** @type {?} */
        LoadingComponent.prototype.apiLoadingBottomIn;
        /** @type {?} */
        LoadingComponent.prototype.customClass;
        /** @type {?} */
        LoadingComponent.prototype.graphicUrl;
        /**
         * @type {?}
         * @private
         */
        LoadingComponent.prototype.rc;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LoadingErrorComponent = /** @class */ (function () {
        /**
         * @param {?} rc
         */
        function LoadingErrorComponent(rc) {
            this.rc = rc;
            this.apiErrorAction = new i0.EventEmitter();
        }
        /**
         * @return {?}
         */
        LoadingErrorComponent.prototype.onErrorAction = function () {
            this.apiErrorAction.emit();
        };
        return LoadingErrorComponent;
    }());
    LoadingErrorComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'loading-error',
                    template: "<div class=\"loading-error-comp\"\n[ngClass.xl]=\"['web-loading-error']\"\n[ngClass.lg]=\"['web-loading-error']\"\n[ngClass.md]=\"['web-loading-error']\"\n[ngClass.sm]=\"['web-loading-error']\">\n  <div class=\"mu-loading-root\">\n    <div class=\"txt-xl-med-norm error-text-cont\">\n      {{apiErrorText}}\n    </div>\n\n    <div class=\"error-btn-cont\" *ngIf=\"apiCanRetry\">\n      <button class=\"error-btn button-primary\" \n        (click)=\"onErrorAction()\">\n        {{apiRetryText}}\n      </button>\n    </div>\n  </div>\n</div>",
                    styles: [".mu-loading-root{align-items:center;display:flex;flex-direction:column;justify-content:center}.error-text-cont{margin-left:5%;margin-right:5%;position:relative}.error-btn-cont{margin-top:10vh;position:relative}.error-btn{width:70vw}.web-loading-error .mu-loading-root{height:100%;width:100%}.web-loading-error .error-btn-cont{width:100%}.web-loading-error .error-btn{width:50%}.web-loading-error .error-text-cont{overflow-wrap:break-word}"]
                }] }
    ];
    /** @nocollapse */
    LoadingErrorComponent.ctorParameters = function () { return [
        { type: RunContextBrowser, decorators: [{ type: i0.Inject, args: ['RunContext',] }] }
    ]; };
    LoadingErrorComponent.propDecorators = {
        apiErrorText: [{ type: i0.Input }],
        apiCanRetry: [{ type: i0.Input }],
        apiRetryText: [{ type: i0.Input }],
        apiErrorAction: [{ type: i0.Output }]
    };
    if (false) {
        /** @type {?} */
        LoadingErrorComponent.prototype.apiErrorText;
        /** @type {?} */
        LoadingErrorComponent.prototype.apiCanRetry;
        /** @type {?} */
        LoadingErrorComponent.prototype.apiRetryText;
        /** @type {?} */
        LoadingErrorComponent.prototype.apiErrorAction;
        /**
         * @type {?}
         * @private
         */
        LoadingErrorComponent.prototype.rc;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ToastComponent = /** @class */ (function () {
        function ToastComponent() {
        }
        return ToastComponent;
    }());
    ToastComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'toast',
                    template: "<div class=\"toast-comp\" [@visibilityChanged]>\n  <div class=\"toast\"\n    [ngClass.xl]=\"['web-toast']\"\n    [ngClass.lg]=\"['web-toast']\"\n    [ngClass.md]=\"['web-toast']\"\n    [ngClass.sm]=\"['web-toast']\">\n    <span class=\"txt-xl-reg-norm toast-text\">{{toastMessage}}</span>\n  </div>\n</div>",
                    animations: [
                        animations.trigger('visibilityChanged', [
                            animations.transition(':enter', [
                                animations.style({ 'opacity': 0 }),
                                animations.animate('500ms', animations.style({ 'opacity': 1 }))
                            ]),
                            animations.transition(':leave', [
                                animations.style({ 'opacity': 1 }),
                                animations.animate('500ms', animations.style({ 'opacity': 0 }))
                            ])
                        ]),
                    ],
                    styles: [".toast{border-radius:25px;margin:0 auto;max-width:85vw;min-width:50vw;padding-bottom:10px;padding-top:10px;text-align:center}.web-toast{max-width:500px!important;min-width:401px!important}"]
                }] }
    ];
    ToastComponent.propDecorators = {
        toastMessage: [{ type: i0.Input }]
    };
    if (false) {
        /** @type {?} */
        ToastComponent.prototype.toastMessage;
    }

    /** @type {?} */
    var SCROLL_EVENT = 'scroll';
    /**
     * @record
     */
    function ListItem() { }
    if (false) {
        /** @type {?} */
        ListItem.prototype.type;
        /** @type {?} */
        ListItem.prototype.params;
    }
    var InfiniteScrollComponent = /** @class */ (function () {
        /**
         * @param {?} element
         * @param {?} ngZone
         * @param {?} renderer
         */
        function InfiniteScrollComponent(element, ngZone, renderer) {
            this.element = element;
            this.ngZone = ngZone;
            this.renderer = renderer;
            this.items = []; //Items that have to be loaded into html in chunks
            //Items that have to be loaded into html in chunks
            this.upperBufferCount = 50; //min no. of elements that should be loaded at the top before we start removing items
            //min no. of elements that should be loaded at the top before we start removing items
            this.lowerBufferCount = 10; //min no. of elements that should be loaded at the bottom
            this.listEnd = new i0.EventEmitter(); // list ended event to the parent 
            // list ended event to the parent 
            this.activeElement = new i0.EventEmitter(); // active element event to the parent
            // container holding scrollable div
            this.viewPortItems = []; // these are the items that are loaded in html
            // these are the items that are loaded in html
            //the indices which slices the main items list
            this.previousStartIdx = 0;
            this.previousEndIdx = -1;
            this.itemsHeight = {}; //caching each divs height to translate the scrollable div
            //caching each divs height to translate the scrollable div
            this.translateY = 0;
            this.lastScrolledTop = 0;
            this.currActiveElemIndex = 0;
            this.lastActiveElemIndex = -1;
        }
        /**
         * @return {?}
         */
        InfiniteScrollComponent.prototype.ngOnInit = function () {
            this.viewPortItems = this.items.slice(this.previousStartIdx, this.lowerBufferCount);
            this.scrollHandler = this.renderer.listen(this.element.nativeElement, SCROLL_EVENT, this.refreshList.bind(this));
        };
        /**
         * @return {?}
         */
        InfiniteScrollComponent.prototype.ngOnChanges = function () {
            this.refreshList();
        };
        /**
         * @return {?}
         */
        InfiniteScrollComponent.prototype.ngAfterViewInit = function () {
            this.setInitHolderHeight();
        };
        /**
         * @return {?}
         */
        InfiniteScrollComponent.prototype.ngOnDestroy = function () {
            if (this.scrollHandler) {
                this.scrollHandler();
            }
        };
        /*=====================================================================
                                      PRIVATE METHODS
          =====================================================================*/
        /**
         * @private
         * @return {?}
         */
        InfiniteScrollComponent.prototype.setInitHolderHeight = function () {
            /** @type {?} */
            var viewPortChildren = this.scrollCont.nativeElement.children;
            /** @type {?} */
            var holderHeight = this.calculateHeight() / viewPortChildren.length * this.viewPortItems.length;
            this.renderer.setStyle(this.contentHolder.nativeElement, 'height', holderHeight + "px");
        };
        /**
         * @private
         * @return {?}
         */
        InfiniteScrollComponent.prototype.calculateHeight = function () {
            /** @type {?} */
            var viewPortChildren = this.scrollCont.nativeElement.children;
            /** @type {?} */
            var totalHeight = 0;
            for (var i = 0; i < viewPortChildren.length; i++) {
                /** @type {?} */
                var height = viewPortChildren[i].getBoundingClientRect().height;
                totalHeight += height;
            }
            return Math.ceil(totalHeight);
        };
        /**
         * @private
         * @return {?}
         */
        InfiniteScrollComponent.prototype.cacheViewedItemsHeight = function () {
            var e_1, _a;
            /** @type {?} */
            var viewPortChildren = this.scrollCont.nativeElement.children;
            /** @type {?} */
            var i = this.previousStartIdx;
            try {
                for (var viewPortChildren_1 = __values(viewPortChildren), viewPortChildren_1_1 = viewPortChildren_1.next(); !viewPortChildren_1_1.done; viewPortChildren_1_1 = viewPortChildren_1.next()) {
                    var child = viewPortChildren_1_1.value;
                    /** @type {?} */
                    var height = child.getBoundingClientRect().height;
                    this.itemsHeight[i] = height;
                    i++;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (viewPortChildren_1_1 && !viewPortChildren_1_1.done && (_a = viewPortChildren_1.return)) _a.call(viewPortChildren_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        /**
         * @private
         * @return {?}
         */
        InfiniteScrollComponent.prototype.updateViewPortItems = function () {
            var _this = this;
            /** @type {?} */
            var viewPortChildren = this.scrollCont.nativeElement.children;
            /** @type {?} */
            var viewPortItemsHeight = this.calculateHeight();
            /** @type {?} */
            var averageHeight = Math.ceil(viewPortItemsHeight / viewPortChildren.length);
            /** @type {?} */
            var scrollTop = this.element.nativeElement.scrollTop;
            /** @type {?} */
            var containerHeight = this.element.nativeElement.getBoundingClientRect().height;
            this.cacheViewedItemsHeight();
            /** @type {?} */
            var start = this.previousStartIdx;
            /** @type {?} */
            var end = this.previousEndIdx;
            /** @type {?} */
            var elementsScrolled = Math.ceil(scrollTop / averageHeight);
            /** @type {?} */
            var elementsVisible = Math.ceil(containerHeight / averageHeight);
            start = elementsScrolled - this.upperBufferCount + elementsVisible;
            end = elementsScrolled + elementsVisible + this.lowerBufferCount;
            start = Math.max(0, start);
            end = Math.min(this.items.length, end >= 0 ? end : Infinity);
            /** @type {?} */
            var height = 0;
            if (start > this.previousStartIdx) {
                //scrolling down
                for (var i = this.previousStartIdx; i < start; i++) {
                    height += this.itemsHeight[i] || averageHeight;
                }
                this.translateY += height;
            }
            else if (start < this.previousStartIdx) {
                //scrolling up
                for (var i = start; i < this.previousStartIdx; i++) {
                    height += this.itemsHeight[i] || averageHeight;
                }
                this.translateY -= height;
            }
            /** @type {?} */
            var currentHolderHeight = Math.ceil(viewPortItemsHeight + this.translateY);
            /** @type {?} */
            var holderHeight = Math.ceil((averageHeight * (this.items.length - end) + currentHolderHeight));
            this.renderer.setStyle(this.contentHolder.nativeElement, 'height', holderHeight + "px");
            DomHelper.setTransform(this.scrollCont.nativeElement, 0, this.translateY, 0);
            if (start !== this.previousStartIdx || end !== this.previousEndIdx) {
                this.ngZone.run(( /**
                 * @return {?}
                 */function () {
                    _this.previousStartIdx = start;
                    _this.previousEndIdx = end;
                    _this.viewPortItems = _this.items.slice(start, end);
                    if (_this.previousEndIdx === _this.items.length)
                        _this.listEnd.emit(_this.items.length);
                }));
            }
        };
        /**
         * @private
         * @param {?} index
         * @param {?=} highlight
         * @return {?}
         */
        InfiniteScrollComponent.prototype.scrollTo = function (index, highlight) {
            if (highlight === void 0) { highlight = false; }
            /** @type {?} */
            var totalHeight = 0;
            for (var i = 0; i < index; i++) {
                totalHeight += this.itemsHeight[i];
            }
            this.element.nativeElement.scrollTop = totalHeight;
            if (highlight) {
                //TODO: add bg color and delay
            }
            this.refreshList();
        };
        /**
         * @private
         * @param {?} element
         * @return {?}
         */
        InfiniteScrollComponent.prototype.isElementInViewPort = function (element) {
            /** @type {?} */
            var parentElem = this.element.nativeElement;
            /** @type {?} */
            var viewPortTop = parentElem.scrollTop;
            /** @type {?} */
            var viewPortBottom = viewPortTop + parentElem.clientHeight;
            /** @type {?} */
            var elemTop = element.offsetTop + (0.1 * element.clientHeight);
            /** @type {?} */
            var elemBottom = element.offsetTop + (0.9 * element.clientHeight);
            return (elemBottom <= viewPortBottom) && (elemTop >= viewPortTop);
        };
        /*
            if scrolling down, the first visible element from top is currentActive element else
            the last visible element is currentActive element
          */
        /**
         * @private
         * @return {?}
         */
        InfiniteScrollComponent.prototype.updateCurrActiveElemIdx = function () {
            /** @type {?} */
            var parentElem = this.element.nativeElement;
            /** @type {?} */
            var viewPortElements = parentElem.children[1].children;
            /** @type {?} */
            var scrolledDown = parentElem.scrollTop > this.lastScrolledTop;
            for (var index = 0; index < viewPortElements.length; index++) {
                /** @type {?} */
                var elementVisible = this.isElementInViewPort(viewPortElements[index]);
                /** @type {?} */
                var anchorId = this.viewPortItems[index].anchorId || null;
                if (elementVisible && anchorId) {
                    this.currActiveElemIndex = this.previousStartIdx + index;
                    if (scrolledDown)
                        break;
                }
            }
            this.lastScrolledTop = parentElem.scrollTop;
        };
        /*=====================================================================
                                            UTILS
          =====================================================================*/
        /**
         * @return {?}
         */
        InfiniteScrollComponent.prototype.scrollToTop = function () {
            this.element.nativeElement.scrollTop = 0;
            this.refreshList();
        };
        /**
         * @param {?} index
         * @param {?=} highlight
         * @return {?}
         */
        InfiniteScrollComponent.prototype.scrollToItem = function (index, highlight) {
            var _this = this;
            if (highlight === void 0) { highlight = false; }
            if (this.itemsHeight[index]) {
                this.scrollTo(index, highlight);
            }
            else {
                if (index < this.items.length) {
                    this.viewPortItems = this.items.slice(0, index + this.lowerBufferCount);
                    this.refreshList();
                    setTimeout(( /**
                     * @return {?}
                     */function () {
                        _this.scrollTo(index, highlight);
                    }), 0);
                }
            }
        };
        /**
         * @return {?}
         */
        InfiniteScrollComponent.prototype.getScrollableElement = function () {
            return this.element;
        };
        // getSkippedElementsId() : string[] {
        //   const skippedElementsId = []
        //   if (this.lastActiveElemIndex > this.currActiveElemIndex) {
        //     for (let i = this.currActiveElemIndex; i < this.lastActiveElemIndex; i++) {
        //       const anchorId = this.items[i].anchorId || null
        //       if (anchorId) skippedElementsId.push(anchorId)
        //     }
        //   } else if (this.lastActiveElemIndex < this.currActiveElemIndex) {
        //     for (let i = this.lastActiveElemIndex; i < this.currActiveElemIndex; i++) {
        //       const anchorId = this.items[i].anchorId || null
        //       if (anchorId) skippedElementsId.push(anchorId)
        //     }
        //   }
        //   return skippedElementsId
        // }
        /**
         * @return {?}
         */
        InfiniteScrollComponent.prototype.getViewedElementsId = function () {
            /** @type {?} */
            var parentElem = this.element.nativeElement;
            /** @type {?} */
            var viewPortElements = parentElem.children[1].children;
            /** @type {?} */
            var viewedElementsIds = [];
            this.lastActiveElemIndex = this.currActiveElemIndex;
            for (var index = 0; index < viewPortElements.length; index++) {
                /** @type {?} */
                var elementVisible = this.isElementInViewPort(viewPortElements[index]);
                /** @type {?} */
                var anchorId = this.viewPortItems[index].anchorId || null;
                if (elementVisible && anchorId) {
                    viewedElementsIds.push(anchorId);
                }
            }
            this.updateCurrActiveElemIdx();
            return viewedElementsIds;
        };
        /**
         * @param {?=} firstElem
         * @return {?}
         */
        InfiniteScrollComponent.prototype.getActiveElementId = function (firstElem) {
            if (firstElem === void 0) { firstElem = false; }
            /** @type {?} */
            var parentElem = this.element.nativeElement;
            /** @type {?} */
            var viewPortElements = parentElem.children[1].children;
            /** @type {?} */
            var activeElementId;
            for (var index = 0; index < viewPortElements.length; index++) {
                /** @type {?} */
                var elementVisible = this.isElementInViewPort(viewPortElements[index]);
                /** @type {?} */
                var anchorId = this.viewPortItems[index].anchorId || null;
                if (elementVisible && anchorId) {
                    activeElementId = anchorId;
                }
            }
            return activeElementId;
        };
        /*=====================================================================
                                      HTML FUNCTIONS
          =====================================================================*/
        /**
         * @return {?}
         */
        InfiniteScrollComponent.prototype.refreshList = function () {
            var _this = this;
            this.ngZone.runOutsideAngular(( /**
             * @return {?}
             */function () {
                requestAnimationFrame(( /**
                 * @return {?}
                 */function () {
                    _this.updateViewPortItems();
                }));
            }));
        };
        return InfiniteScrollComponent;
    }());
    InfiniteScrollComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'infinite-scroll',
                    template: "<div class=\"content-holder\" #contentHolder></div>\n<div class=\"content-div\" #scrollCont\n  [ngClass]=\"customClass || 'bg-primary-light'\"\n  (scroll)=\"refreshList()\">\n  <ng-content></ng-content>\n</div> ",
                    styles: [":host{display:block;overflow-x:hidden;overflow-y:auto;position:relative}.content-div,:host{height:100%;width:100%}.content-div{left:0;position:absolute;top:0}.content-div::-webkit-scrollbar{display:none}.content-holder{position:relative;width:1px}"]
                }] }
    ];
    /** @nocollapse */
    InfiniteScrollComponent.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: i0.NgZone },
        { type: i0.Renderer2 }
    ]; };
    InfiniteScrollComponent.propDecorators = {
        items: [{ type: i0.Input }],
        upperBufferCount: [{ type: i0.Input }],
        lowerBufferCount: [{ type: i0.Input }],
        customClass: [{ type: i0.Input }],
        listEnd: [{ type: i0.Output }],
        activeElement: [{ type: i0.Output }],
        scrollCont: [{ type: i0.ViewChild, args: ['scrollCont', { static: true },] }],
        contentHolder: [{ type: i0.ViewChild, args: ['contentHolder', { static: true },] }]
    };
    if (false) {
        /** @type {?} */
        InfiniteScrollComponent.prototype.items;
        /** @type {?} */
        InfiniteScrollComponent.prototype.upperBufferCount;
        /** @type {?} */
        InfiniteScrollComponent.prototype.lowerBufferCount;
        /** @type {?} */
        InfiniteScrollComponent.prototype.customClass;
        /** @type {?} */
        InfiniteScrollComponent.prototype.listEnd;
        /** @type {?} */
        InfiniteScrollComponent.prototype.activeElement;
        /** @type {?} */
        InfiniteScrollComponent.prototype.scrollCont;
        /** @type {?} */
        InfiniteScrollComponent.prototype.contentHolder;
        /** @type {?} */
        InfiniteScrollComponent.prototype.viewPortItems;
        /** @type {?} */
        InfiniteScrollComponent.prototype.previousStartIdx;
        /** @type {?} */
        InfiniteScrollComponent.prototype.previousEndIdx;
        /** @type {?} */
        InfiniteScrollComponent.prototype.itemsHeight;
        /**
         * @type {?}
         * @private
         */
        InfiniteScrollComponent.prototype.translateY;
        /**
         * @type {?}
         * @private
         */
        InfiniteScrollComponent.prototype.scrollHandler;
        /**
         * @type {?}
         * @private
         */
        InfiniteScrollComponent.prototype.lastScrolledTop;
        /**
         * @type {?}
         * @private
         */
        InfiniteScrollComponent.prototype.currActiveElemIndex;
        /**
         * @type {?}
         * @private
         */
        InfiniteScrollComponent.prototype.lastActiveElemIndex;
        /**
         * @type {?}
         * @private
         */
        InfiniteScrollComponent.prototype.element;
        /**
         * @type {?}
         * @private
         */
        InfiniteScrollComponent.prototype.ngZone;
        /**
         * @type {?}
         * @private
         */
        InfiniteScrollComponent.prototype.renderer;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var InputValidator = /** @class */ (function () {
        function InputValidator() {
        }
        /**
         * @param {?} control
         * @return {?}
         */
        InputValidator.dateValidator = function (control) {
            /** @type {?} */
            var startDateTS = control.get('startDate').value;
            /** @type {?} */
            var endDateTS = control.get('endDate').value;
            if (startDateTS) {
                /** @type {?} */
                var isDate = void 0;
                switch (typeof startDateTS) {
                    case "string":
                        isDate = !isNaN(Date.parse(startDateTS));
                        break;
                    case "object":
                        isDate = startDateTS instanceof Date
                            ? !isNaN(startDateTS.getTime())
                            : false;
                        break;
                    default: isDate = false;
                }
                if (isDate) {
                    startDateTS = startDateTS.getTime();
                }
                else {
                    startDateTS = startDateTS.toDate().getTime();
                }
            }
            if (endDateTS) {
                /** @type {?} */
                var isDate = void 0;
                switch (typeof endDateTS) {
                    case "string":
                        isDate = !isNaN(Date.parse(endDateTS));
                        break;
                    case "object":
                        isDate = endDateTS instanceof Date
                            ? !isNaN(endDateTS.getTime())
                            : false;
                        break;
                    default: isDate = false;
                }
                if (isDate) {
                    endDateTS = endDateTS.getTime();
                }
                else {
                    endDateTS = endDateTS.toDate().getTime();
                }
            }
            if (!startDateTS && endDateTS) {
                control.get('startDate').setErrors({ noStartDate: true });
            }
            else if (endDateTS && startDateTS && (endDateTS - startDateTS < 0)) {
                control.get('startDate').setErrors({ startDateExceed: true });
            }
            else {
                return null;
            }
        };
        /**
         * @param {?} control
         * @return {?}
         */
        InputValidator.futureDateValidatorIfAllowed = function (control) {
            /** @type {?} */
            var startDateTS = control.get('startDate').value;
            /** @type {?} */
            var endDateTS = control.get('endDate').value;
            /** @type {?} */
            var dateNowTS = Date.now();
            if (startDateTS) {
                /** @type {?} */
                var isDate = void 0;
                switch (typeof startDateTS) {
                    case "string":
                        isDate = !isNaN(Date.parse(startDateTS));
                        break;
                    case "object":
                        isDate = startDateTS instanceof Date
                            ? !isNaN(startDateTS.getTime())
                            : false;
                        break;
                    default: isDate = false;
                }
                if (isDate) {
                    startDateTS = startDateTS.getTime();
                }
                else {
                    startDateTS = startDateTS.toDate().getTime();
                }
            }
            if (endDateTS) {
                /** @type {?} */
                var isDate = void 0;
                switch (typeof endDateTS) {
                    case "string":
                        isDate = !isNaN(Date.parse(endDateTS));
                        break;
                    case "object":
                        isDate = endDateTS instanceof Date
                            ? !isNaN(endDateTS.getTime())
                            : false;
                        break;
                    default: isDate = false;
                }
                if (isDate) {
                    endDateTS = endDateTS.getTime();
                }
                else {
                    endDateTS = endDateTS.toDate().getTime();
                }
            }
            if (endDateTS && (dateNowTS - endDateTS) < 0) {
                control.get('endDate').setErrors({ futureDate: true });
            }
            else if (startDateTS && (dateNowTS - startDateTS) < 0) {
                control.get('startDate').setErrors({ futureDate: true });
            }
        };
        /**
         * @param {?} control
         * @return {?}
         */
        InputValidator.amountValidator = function (control) {
            /** @type {?} */
            var minAmount = control.get('minAmount').value
                ? control.get('minAmount').value
                : null;
            /** @type {?} */
            var maxAmount = control.get('maxAmount').value
                ? control.get('maxAmount').value
                : null;
            if (!minAmount && maxAmount) {
                control.get('minAmount').setErrors({ noMinAmount: true });
            }
            else if (maxAmount && minAmount && (maxAmount - minAmount < 0)) {
                control.get('minAmount').setErrors({ minAmountExceed: true });
            }
            else {
                return null;
            }
        };
        /**
         * @param {?} control
         * @return {?}
         */
        InputValidator.futureDateValidator = function (control) {
            if (!control.value)
                return null;
            /** @type {?} */
            var dateNowTS = Date.now();
            /** @type {?} */
            var date = control.value;
            if (date) {
                /** @type {?} */
                var isDate = void 0;
                switch (typeof date) {
                    case "string":
                        isDate = !isNaN(Date.parse(date));
                        break;
                    case "object":
                        isDate = date instanceof Date
                            ? !isNaN(date.getTime())
                            : false;
                        break;
                    default: isDate = false;
                }
                if (isDate) {
                    date = date.getTime();
                }
                else {
                    date = date.toDate().getTime();
                }
            }
            if (date && (dateNowTS - date) < 0) {
                return { futureDate: true };
            }
            else {
                return null;
            }
        };
        return InputValidator;
    }());

    /** @type {?} */
    var PERMISSION = {
        CAMERA: 'CAMERA'
    };
    /**
     * @record
     */
    function UploadedDocParams() { }
    if (false) {
        /** @type {?} */
        UploadedDocParams.prototype.base64;
        /** @type {?} */
        UploadedDocParams.prototype.checksum;
        /** @type {?} */
        UploadedDocParams.prototype.mimeType;
    }
    var FileUploadComponent = /** @class */ (function () {
        /*rc type is any since it is of type RuncontextApp and it is app specific
            and should not be imported here
          */
        /**
         * @param {?} rc
         * @param {?} translate
         */
        function FileUploadComponent(rc, translate) {
            this.rc = rc;
            this.translate = translate;
            this.value = new i0.EventEmitter();
        }
        /**
         * @return {?}
         */
        FileUploadComponent.prototype.ngOnInit = function () {
        };
        /**
         * @return {?}
         */
        FileUploadComponent.prototype.ngAfterViewInit = function () {
            if (this.rc.bridge.isRunningInBrowser()) {
                if (this.uploadFileCont)
                    this.uploadFileCont.nativeElement.addEventListener('change', this.onFileUpload.bind(this));
            }
        };
        /*=====================================================================
                                      PRIVATE
          =====================================================================*/
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        FileUploadComponent.prototype.onFileUpload = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var file, errorText, warnText, base64, strippedBase64, uploadDoc, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            file = event.target.files[0];
                            if (!file.type.includes('image')) {
                                errorText = this.translate.instant('upl_invalid_mime_type');
                                this.rc.uiRouter.showToast(errorText);
                                return [2 /*return*/];
                            }
                            if (file.size > 512000) {
                                warnText = this.translate.instant('upl_max_size_err');
                                this.rc.uiRouter.showToast(warnText);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.rc.utils.getBase64(file)];
                        case 1:
                            base64 = ( /** @type {?} */(_b.sent()));
                            strippedBase64 = base64.replace("data:" + file.type + ";base64,", '');
                            _a = {
                                base64: strippedBase64,
                                mimeType: file.type
                            };
                            return [4 /*yield*/, this.rc.utils.getCheckSum(strippedBase64)];
                        case 2:
                            uploadDoc = (_a.checksum = _b.sent(),
                                _a);
                            if (!this.uploadedDocParams)
                                this.uploadedDocParams = ( /** @type {?} */({}));
                            this.uploadedDocParams = uploadDoc;
                            this.uploadFileCont.nativeElement.value = null;
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @private
         * @return {?}
         */
        FileUploadComponent.prototype.updatePicture = function () {
            return __awaiter(this, void 0, void 0, function () {
                var resp, uploadDoc, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.rc.bridge.takePictureFromCamera()];
                        case 1:
                            resp = _b.sent();
                            if (!resp['success']) {
                                this.rc.uiRouter.showToast(this.translate.instant('mu_fil_upl_unknow_err'));
                                return [2 /*return*/];
                            }
                            _a = {
                                base64: resp['base64'],
                                mimeType: resp['mimeType']
                            };
                            return [4 /*yield*/, this.rc.utils.getCheckSum(resp['base64'])];
                        case 2:
                            uploadDoc = (_a.checksum = _b.sent(),
                                _a);
                            if (!this.uploadedDocParams)
                                this.uploadedDocParams = ( /** @type {?} */({}));
                            this.uploadedDocParams = uploadDoc;
                            if (this.eventPropagate) {
                                this.onSubmit();
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /*=====================================================================
                                      HTML
          =====================================================================*/
        /**
         * @return {?}
         */
        FileUploadComponent.prototype.takePicture = function () {
            return __awaiter(this, void 0, void 0, function () {
                var resp;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.rc.bridge.isRunningInBrowser())
                                return [2 /*return*/];
                            return [4 /*yield*/, this.rc.bridge.getPermission(PERMISSION.CAMERA, false)];
                        case 1:
                            resp = _a.sent();
                            if (!resp.permGiven) {
                                return [2 /*return*/];
                            }
                            this.rc.bridge(PERMISSION.CAMERA).then(( /**
                             * @param {?} permResp
                             * @return {?}
                             */function (permResp) {
                                if (permResp.permGiven)
                                    _this.updatePicture();
                            }));
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        FileUploadComponent.prototype.uploadFile = function () {
            return __awaiter(this, void 0, void 0, function () {
                var event, docObj, uploadDoc;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.rc.bridge.isRunningInBrowser()) {
                                event = new MouseEvent('click', { bubbles: false });
                                this.uploadFileCont.nativeElement.dispatchEvent(event);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.rc.bridge.selectDocumentFile()];
                        case 1:
                            docObj = _a.sent();
                            if (docObj['error'])
                                return [2 /*return*/];
                            if (!docObj['base64']) {
                                this.rc.uiRouter.showToast(this.translate.instant('cmn_toast_err_unknown'));
                                return [2 /*return*/];
                            }
                            uploadDoc = {
                                base64: docObj['base64'],
                                checksum: docObj['checksum'],
                                mimeType: docObj['mimeType']
                            };
                            if (!this.uploadedDocParams)
                                this.uploadedDocParams = ( /** @type {?} */({}));
                            this.uploadedDocParams = uploadDoc;
                            if (this.eventPropagate) {
                                this.onSubmit();
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        FileUploadComponent.prototype.onSubmit = function () {
            if (this.isRequired && (!this.uploadedDocParams || !Object.keys(this.uploadedDocParams).length)) {
                this.rc.uiRouter.showToast(this.translate.instant('mu_fil_upl_upload_err'));
            }
            else {
                this.value.emit(this.uploadedDocParams);
            }
        };
        return FileUploadComponent;
    }());
    FileUploadComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'file-upload',
                    template: "<div class=\"upload-file-comp\"\n  [ngClass.xl]=\"['web-upl-fil-cont-div']\"\n  [ngClass.lg]=\"['web-upl-fil-cont-div']\"\n  [ngClass.md]=\"['web-upl-fil-cont-div']\"\n  [ngClass.sm]=\"['web-upl-fil-cont-div']\">\n\n  <div class=\"btn-cont\">\n    <button class=\"button-primary-small btn\" (click)=\"takePicture()\" >\n      {{ (uploadedDocParams ? 'mu_fil_upl_retake_photo' : 'mu_fil_upl_take_photo') | translate }}\n      <input class=\"upload-file\" type=\"file\" accept=\"image/*\" capture=\"camera\" #cameraCont>\n    </button>\n    <button class=\"button-primary-small btn\" (click)=\"uploadFile()\">\n      {{ (uploadedDocParams ? 'mu_fil_upl_change_text' : 'mu_fil_upl_upload_photo') | translate }}\n      <input *ngIf=\"rc.bridge.isRunningInBrowser()\" class=\"upload-file\" type=\"file\"\n        accept=\".jpg, .jpeg, .png\" #uploadFileCont>\n    </button> \n  </div>\n\n  <div class=\"preview\" *ngIf=\"uploadedDocParams\">\n    <div class=\"uploaded-document-image-cont\">\n      <img class=\"upl-doc-img\" src=\"data:image/jpg;base64,{{uploadedDocParams.base64}}\">\n    </div>\n  </div>\n\n  <!-- <div class=\"progress-bar-cont\" *ngIf=\"uploadedStatus && uploadedStatus.uploadedPercent\">\n    <mat-progress-bar\n      class=\"progress-bar\"\n      [mode]=\"'determinate'\"\n      [value]=\"uploadedStatus?.uploadedPercent\">\n    </mat-progress-bar>\n  </div> -->\n\n</div>",
                    styles: [".upload-file-comp{margin:4vw 0;position:relative}.btn-cont{align-items:center;display:flex;justify-content:space-between;position:relative}.uploaded-document-image-cont{margin:0 4vw;position:relative}.upl-doc-img{width:100%}.upload-file{opacity:0;position:absolute;width:100%;z-index:-1}.preview{align-items:center;display:flex;justify-content:center;margin:6vw 0;position:relative}.doc-name{margin:4vw 0;position:relative}.progress-bar-cont{margin:10vw 0;position:relative}.btn{padding:0 2vw}.web-upl-fil-cont-div,.web-upl-fil-cont-div .progress-bar-cont{margin:20px 0}.web-upl-fil-cont-div .doc-name{margin:10px 0}.web-upl-fil-cont-div .preview{margin:20px 0}.web-upl-fil-cont-div .uploaded-document-image-cont{margin:0 20px}.web-upl-fil-cont-div .btn{max-width:45%;padding:0 10px;width:45%}"]
                }] }
    ];
    /** @nocollapse */
    FileUploadComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ['RunContext',] }] },
        { type: TranslateService }
    ]; };
    FileUploadComponent.propDecorators = {
        uploadFileCont: [{ type: i0.ViewChild, args: ['uploadFileCont', { static: false },] }],
        screen: [{ type: i0.Input }],
        eventPropagate: [{ type: i0.Input }],
        isRequired: [{ type: i0.Input }],
        value: [{ type: i0.Output }]
    };
    if (false) {
        /** @type {?} */
        FileUploadComponent.prototype.uploadFileCont;
        /** @type {?} */
        FileUploadComponent.prototype.screen;
        /** @type {?} */
        FileUploadComponent.prototype.eventPropagate;
        /** @type {?} */
        FileUploadComponent.prototype.isRequired;
        /** @type {?} */
        FileUploadComponent.prototype.value;
        /** @type {?} */
        FileUploadComponent.prototype.uploadedDocParams;
        /** @type {?} */
        FileUploadComponent.prototype.rc;
        /**
         * @type {?}
         * @private
         */
        FileUploadComponent.prototype.translate;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var InputContainerComponent = /** @class */ (function () {
        /**
         * @param {?} rc
         * @param {?} formBuilder
         */
        function InputContainerComponent(rc, formBuilder) {
            var _this = this;
            this.rc = rc;
            this.formBuilder = formBuilder;
            this.eventPropagate = false;
            this.displayLabel = true;
            this.value = new i0.EventEmitter();
            this.dropdownOpen = new i0.EventEmitter();
            this.stepSelectedFilter = new i0.EventEmitter();
            this.DISPLAY_TYPE = core.DISPLAY_TYPE;
            this.DISPLAY_MODE = core.DISPLAY_MODE;
            this.formatLabel = ( /**
             * @param {?} value
             * @return {?}
             */function (value) {
                return value + _this.sliderLabel;
            });
        }
        /**
         * @return {?}
         */
        InputContainerComponent.prototype.ngOnChanges = function () {
            this.initialize();
        };
        /**
         * @return {?}
         */
        InputContainerComponent.prototype.ngOnInit = function () {
            this.initialize();
        };
        /**
         * @return {?}
         */
        InputContainerComponent.prototype.getFilterId = function () {
            return this.inputParams.id;
        };
        /**
         * @param {?} inputParams
         * @return {?}
         */
        InputContainerComponent.prototype.reset = function (inputParams) {
            this.inputParams = inputParams;
            this.initialize();
        };
        /*=====================================================================
                                      UTILS
          =====================================================================*/
        /**
         * @return {?}
         */
        InputContainerComponent.prototype.onSubmit = function () {
            if (this.inputForm && (this.inputParams.validators || this.inputParams.isRequired))
                this.inputForm.markAsTouched();
            if (this.dateRange && (this.inputParams.isRequired || this.inputParams.validators)) {
                this.dateRange.controls.startDate.markAsTouched();
                this.dateRange.controls.endDate.markAsTouched();
            }
            if (this.numberRange && (this.inputParams.isRequired || this.inputParams.validators)) {
                this.numberRange.controls.minAmount.markAsTouched();
                this.numberRange.controls.maxAmount.markAsTouched();
            }
            if (this.hasError())
                return;
            /** @type {?} */
            var params;
            /** @type {?} */
            var emitValue = true;
            switch (this.inputParams.displayType) {
                case core.DISPLAY_TYPE.CALENDAR_BOX:
                    params = {
                        id: this.inputParams.id,
                        value: this.inputForm.value ? this.inputForm.value.getTime() : null,
                        displayType: this.inputParams.displayType
                    };
                    break;
                case core.DISPLAY_TYPE.INPUT_BOX:
                case core.DISPLAY_TYPE.SELECTION_BOX:
                case core.DISPLAY_TYPE.AUTOCOMPLETE_SELECT:
                case core.DISPLAY_TYPE.TEXT_AREA:
                case core.DISPLAY_TYPE.TOGGLE:
                case core.DISPLAY_TYPE.BUTTON_TOGGLE:
                case core.DISPLAY_TYPE.ROW_INPUT_BOX:
                case core.DISPLAY_TYPE.SLIDER:
                    params = {
                        id: this.inputParams.id,
                        value: this.inputForm.value,
                        displayType: this.inputParams.displayType
                    };
                    break;
                case core.DISPLAY_TYPE.DATE_RANGE:
                    /** @type {?} */
                    var dateRangeKeys = this.inputParams.rangeKeys || ['startDate', 'endDate'];
                    /** @type {?} */
                    var dateRangeValue = {};
                    dateRangeValue[dateRangeKeys[0]] = this.dateRange.controls.startDate.value
                        ? this.dateRange.controls.startDate.value.getTime()
                        : null;
                    dateRangeValue[dateRangeKeys[1]] = this.dateRange.controls.endDate.value
                        ? this.dateRange.controls.endDate.value.getTime()
                        : null;
                    params = {
                        id: this.inputParams.id,
                        value: dateRangeValue,
                        displayType: this.inputParams.displayType
                    };
                    break;
                case core.DISPLAY_TYPE.NUMBER_RANGE:
                    /** @type {?} */
                    var numRangeKeys = this.inputParams.rangeKeys || ['minAmount', 'maxAmount'];
                    /** @type {?} */
                    var numRangeValue = {};
                    numRangeValue[numRangeKeys[0]] = this.numberRange.controls.minAmount.value;
                    numRangeValue[numRangeKeys[1]] = this.numberRange.controls.maxAmount.value;
                    params = {
                        id: this.inputParams.id,
                        value: numRangeValue,
                        displayType: this.inputParams.displayType
                    };
                    break;
                case core.DISPLAY_TYPE.IMAGE_UPLOAD:
                    params = {
                        id: this.inputParams.id,
                        value: this.fileUploadParams,
                        displayType: this.inputParams.displayType
                    };
                    break;
                case core.DISPLAY_TYPE.RADIO:
                case core.DISPLAY_TYPE.ROW_RADIO:
                    params = {
                        id: this.inputParams.id,
                        value: this.inputForm.value ? this.inputForm.value : null,
                        displayType: this.inputParams.displayType
                    };
                    break;
                case core.DISPLAY_TYPE.MULTI_CHECK_BOX:
                case core.DISPLAY_TYPE.DROPDOWN_MULTI_CHECK_BOX:
                    params = {
                        id: this.inputParams.id,
                        value: this.inputForm.value,
                        displayType: this.inputParams.displayType
                    };
                    break;
            }
            if (emitValue)
                this.value.emit(params);
        };
        /**
         * @return {?}
         */
        InputContainerComponent.prototype.isCalanderOpen = function () {
            return this.picker.opened;
        };
        /**
         * @return {?}
         */
        InputContainerComponent.prototype.closeCalander = function () {
            this.picker.close();
        };
        /*=====================================================================
                                      HTML
          =====================================================================*/
        /**
         * @param {?} event
         * @return {?}
         */
        InputContainerComponent.prototype.selectedOption = function (event) {
            if (event.value === 'ALL') {
                /** @type {?} */
                var values = this.inputParams.options;
                this.inputParams.options.forEach(( /**
                 * @param {?} option
                 * @return {?}
                 */function (option) { return option.selected = true; }));
                this.inputForm.setValue(values);
                this.emitStepSelection(values);
            }
            else {
                this.inputForm.setValue(event.value);
                this.emitStepSelection(event.value);
            }
            if (this.eventPropagate)
                this.onSubmit();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        InputContainerComponent.prototype.onToggleChane = function (event) {
            this.inputForm.setValue(event.checked);
            if (this.eventPropagate)
                this.onSubmit();
        };
        /**
         * @param {?} event
         * @param {?=} index
         * @return {?}
         */
        InputContainerComponent.prototype.onBtnToggleChange = function (event, index) {
            this.inputForm.setValue(event.value);
            if (this.eventPropagate)
                this.onSubmit();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        InputContainerComponent.prototype.fileUploadValue = function (event) {
            this.fileUploadParams = event;
            if (this.eventPropagate)
                this.onSubmit();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        InputContainerComponent.prototype.checkAllOptions = function (event) {
            if (event.checked) { // Check All options
                // Check All options
                /** @type {?} */
                var values = this.inputParams.options;
                this.inputParams.options.forEach(( /**
                 * @param {?} option
                 * @return {?}
                 */function (option) { return option.selected = true; }));
                this.inputForm.setValue(values);
                this.emitStepSelection(values);
            }
            else { // Uncheck all options
                this.inputParams.options.forEach(( /**
                 * @param {?} option
                 * @return {?}
                 */function (option) { return option.selected = false; }));
                this.inputForm.setValue([]);
                this.emitStepSelection([]);
            }
            if (this.eventPropagate)
                this.onSubmit();
        };
        /**
         * @param {?} option
         * @return {?}
         */
        InputContainerComponent.prototype.checkedOption = function (option) {
            /** @type {?} */
            var value = ( /** @type {?} */(this.inputForm.value));
            if (value) {
                /** @type {?} */
                var idIndex = value.findIndex(( /**
                 * @param {?} val
                 * @return {?}
                 */function (/**
                 * @param {?} val
                 * @return {?}
                 */ val) { return val.id === option.id; }));
                if (idIndex !== -1) {
                    value.splice(idIndex, 1);
                    this.inputForm.setValue(value);
                    this.emitStepSelection(value);
                }
                else {
                    value.push(option);
                    this.inputForm.setValue(value);
                    this.emitStepSelection(value);
                }
            }
            else {
                this.inputForm.setValue([option]);
                this.emitStepSelection([option]);
            }
            if (this.eventPropagate)
                this.onSubmit();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        InputContainerComponent.prototype.setChangedValues = function (event) {
            this.inputForm.setValue(event);
            if (this.eventPropagate)
                this.onSubmit();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        InputContainerComponent.prototype.setDate = function (event) {
            /** @type {?} */
            var value = event.value;
            value && !this.isDateObj(value) ? this.inputForm.setValue(value.toDate())
                : this.inputForm.setValue(value);
            if (this.eventPropagate)
                this.onSubmit();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        InputContainerComponent.prototype.setDateRange = function (event) {
            /** @type {?} */
            var sDate = this.dateRange.controls.startDate.value;
            /** @type {?} */
            var eDate = this.dateRange.controls.endDate.value;
            sDate && !this.isDateObj(sDate) ? this.dateRange.controls.startDate.setValue(sDate.toDate())
                : this.dateRange.controls.startDate.setValue(sDate);
            eDate && !this.isDateObj(eDate) ? this.dateRange.controls.endDate.setValue(eDate.toDate())
                : this.dateRange.controls.endDate.setValue(eDate);
            if (this.eventPropagate)
                this.onSubmit();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        InputContainerComponent.prototype.setNumberRange = function (event) {
            this.numberRange.controls.minAmount.setValue(this.numberRange.controls.minAmount.value);
            this.numberRange.controls.maxAmount.setValue(this.numberRange.controls.maxAmount.value);
            if (this.eventPropagate)
                this.onSubmit();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        InputContainerComponent.prototype.setAutocompleteValue = function (event) {
            this.inputForm.setValue(event.option.value);
            if (this.eventPropagate)
                this.onSubmit();
        };
        /**
         * @param {?} value
         * @return {?}
         */
        InputContainerComponent.prototype.displayFn = function (value) {
            return value && typeof value === 'object' ? value.value : value;
        };
        /**
         * @param {?} event
         * @return {?}
         */
        InputContainerComponent.prototype.onSliderValueChange = function (event) {
            this.inputForm.setValue({ minValue: event.source.min, maxValue: event.value });
        };
        /**
         * @return {?}
         */
        InputContainerComponent.prototype.hasError = function () {
            /** @type {?} */
            var hasError = false;
            switch (this.inputParams.displayType) {
                case core.DISPLAY_TYPE.CALENDAR_BOX:
                case core.DISPLAY_TYPE.INPUT_BOX:
                case core.DISPLAY_TYPE.SELECTION_BOX:
                case core.DISPLAY_TYPE.AUTOCOMPLETE_SELECT:
                case core.DISPLAY_TYPE.TEXT_AREA:
                case core.DISPLAY_TYPE.MULTI_CHECK_BOX:
                case core.DISPLAY_TYPE.RADIO:
                case core.DISPLAY_TYPE.ROW_RADIO:
                case core.DISPLAY_TYPE.TOGGLE:
                case core.DISPLAY_TYPE.BUTTON_TOGGLE:
                case core.DISPLAY_TYPE.ROW_INPUT_BOX:
                    hasError = this.inputParams.isRequired
                        ? this.inputForm.invalid
                        : this.inputForm.value && this.inputForm.invalid;
                    break;
                case core.DISPLAY_TYPE.DATE_RANGE:
                    hasError = this.inputParams.isRequired
                        ? this.dateRange.invalid
                        : ((this.dateRange.controls.startDate.value && this.dateRange.controls.startDate.invalid)
                            || (this.dateRange.controls.startDate.value && !this.dateRange.controls.endDate.value)
                            || (this.dateRange.controls.endDate.value && this.dateRange.controls.endDate.invalid));
                    break;
                case core.DISPLAY_TYPE.NUMBER_RANGE:
                    hasError = this.inputParams.isRequired
                        ? this.numberRange.invalid
                        : ((this.numberRange.controls.minAmount.value && this.numberRange.controls.minAmount.invalid)
                            || (this.numberRange.controls.minAmount.value && !this.numberRange.controls.maxAmount.value)
                            || (this.numberRange.controls.maxAmount.value && this.numberRange.controls.maxAmount.invalid));
                    break;
                case core.DISPLAY_TYPE.IMAGE_UPLOAD:
                    this.fileUplInst.onSubmit();
                    hasError = this.inputParams.isRequired
                        ? (!this.fileUploadParams || Object.keys(this.fileUploadParams).length === 0)
                        : false;
            }
            return hasError;
        };
        /**
         * @param {?} event
         * @return {?}
         */
        InputContainerComponent.prototype.dropDownToggle = function (event) {
            this.dropdownOpen.emit(event);
        };
        /**
         * @param {?} value
         * @return {?}
         */
        InputContainerComponent.prototype.valueEntered = function (value) {
            if (this.inputParams.displayType === core.DISPLAY_TYPE.AUTOCOMPLETE_SELECT) {
                /** @type {?} */
                var option = this.inputParams.options.find(( /**
                 * @param {?} option
                 * @return {?}
                 */function (/**
                 * @param {?} option
                 * @return {?}
                 */ option) { return option.value === value; }));
                option ? this.inputForm.setValue(option)
                    : this.inputForm.setValue({ id: value, value: value });
                if (this.eventPropagate)
                    this.onSubmit();
            }
        };
        /*=====================================================================
                                      PRIVATE
          =====================================================================*/
        /**
         * @private
         * @return {?}
         */
        InputContainerComponent.prototype.initialize = function () {
            var _this = this;
            /** @type {?} */
            var params = this.inputParams;
            /** @type {?} */
            var formValidations = [];
            if (params.isRequired)
                formValidations.push(forms.Validators.required);
            if (params.validators)
                formValidations.push(forms.Validators.pattern(params.validators.validation));
            switch (params.displayType) {
                case core.DISPLAY_TYPE.INPUT_BOX:
                case core.DISPLAY_TYPE.TEXT_AREA:
                case core.DISPLAY_TYPE.RADIO:
                case core.DISPLAY_TYPE.ROW_RADIO:
                case core.DISPLAY_TYPE.SELECTION_BOX:
                case core.DISPLAY_TYPE.TOGGLE:
                case core.DISPLAY_TYPE.MULTI_CHECK_BOX:
                case core.DISPLAY_TYPE.BUTTON_TOGGLE:
                case core.DISPLAY_TYPE.ROW_INPUT_BOX:
                case core.DISPLAY_TYPE.DROPDOWN_MULTI_CHECK_BOX:
                    this.inputForm = new forms.FormControl(params.value || null, formValidations);
                    if (params.options && params.options.length) {
                        /** @type {?} */
                        var selectedValues_1 = [];
                        params.options.forEach(( /**
                         * @param {?} opt
                         * @return {?}
                         */function (/**
                         * @param {?} opt
                         * @return {?}
                         */ opt) {
                            if (opt.selected)
                                selectedValues_1.push(opt);
                        }));
                        if (selectedValues_1.length)
                            this.inputForm.setValue(selectedValues_1);
                    }
                    if (params.value)
                        this.inputForm.setValue(params.value);
                    this.setDisabled(params.isDisabled);
                    break;
                case core.DISPLAY_TYPE.AUTOCOMPLETE_SELECT:
                    this.inputForm = new forms.FormControl(params.value || null, formValidations);
                    this.filteredOptions = this.inputForm.valueChanges.pipe(operators.startWith(''), operators.map(( /**
                     * @param {?} value
                     * @return {?}
                     */function (/**
                     * @param {?} value
                     * @return {?}
                     */ value) { return typeof value === 'string' ? value : value.value; })), operators.map(( /**
                     * @param {?} value
                     * @return {?}
                     */function (/**
                     * @param {?} value
                     * @return {?}
                     */ value) { return value ? _this.filterOptions(value)
                        : _this.inputParams.options.slice(); })));
                    this.setDisabled(params.isDisabled);
                    break;
                case core.DISPLAY_TYPE.CALENDAR_BOX:
                    if (params.value)
                        params.value = new Date(params.value);
                    formValidations.push(InputValidator.futureDateValidator);
                    this.inputForm = new forms.FormControl(params.value || null, formValidations);
                    this.setDisabled(params.isDisabled);
                    break;
                case core.DISPLAY_TYPE.DATE_RANGE:
                    /** @type {?} */
                    var dateRangeKeys = params.rangeKeys || ['startDate', 'endDate'];
                    if (params.value) {
                        if (params.value[dateRangeKeys[0]])
                            params.value[dateRangeKeys[0]] = new Date(params.value[dateRangeKeys[0]]);
                        if (params.value[dateRangeKeys[1]])
                            params.value[dateRangeKeys[1]] = new Date(params.value[dateRangeKeys[1]]);
                    }
                    else {
                        params.value = {};
                    }
                    this.dateRange = this.formBuilder.group({
                        startDate: [params.value[dateRangeKeys[0]] || null, formValidations],
                        endDate: [params.value[dateRangeKeys[1]] || null, formValidations]
                    });
                    /** @type {?} */
                    var valiArr = [InputValidator.dateValidator];
                    if (!params.validators || !params.validators.allowFutureDate)
                        valiArr.push(InputValidator.futureDateValidatorIfAllowed);
                    this.dateRange.setValidators(valiArr);
                    if (params.isDisabled)
                        this.dateRange.disable();
                    break;
                case core.DISPLAY_TYPE.NUMBER_RANGE:
                    if (params.value) {
                        /** @type {?} */
                        var numRangeKeys = params.rangeKeys || ['minAmount', 'maxAmount'];
                        this.numberRange = this.formBuilder.group({
                            minAmount: [params.value[numRangeKeys[0]] || null, formValidations],
                            maxAmount: [params.value[numRangeKeys[1]] || null, formValidations]
                        }, {
                            validator: [InputValidator.amountValidator]
                        });
                    }
                    else {
                        params.value = {};
                    }
                    if (params.isDisabled)
                        this.numberRange.disable();
                    break;
                case core.DISPLAY_TYPE.SLIDER:
                    // this.numberRange = this.formBuilder.group({
                    //   minAmount : [params.value['minAmount'] || null, formValidations],
                    //   maxAmount : [params.value['maxAmount'] || null, formValidations]
                    // },
                    // {
                    //   validator : [InputValidator.amountValidator]
                    // })
                    // if (params.isDisabled) this.numberRange.disable()
                    this.inputForm = new forms.FormControl(params.value || null, formValidations);
                    if (params.options && params.options.length) {
                        /** @type {?} */
                        var selectedValues_2 = [];
                        params.options.forEach(( /**
                         * @param {?} opt
                         * @return {?}
                         */function (/**
                         * @param {?} opt
                         * @return {?}
                         */ opt) {
                            if (opt.selected)
                                selectedValues_2.push(opt);
                            _this.sliderLabel = opt.id === 'formatLabel' ? ( /** @type {?} */(opt.value)) : '';
                        }));
                        if (selectedValues_2.length)
                            this.inputForm.setValue(selectedValues_2);
                    }
                    this.setDisabled(params.isDisabled);
                    break;
            }
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        InputContainerComponent.prototype.emitStepSelection = function (value) {
            /** @type {?} */
            var selFilter = {
                id: this.inputParams.id,
                value: value
            };
            this.stepSelectedFilter.emit(selFilter);
        };
        /**
         * @private
         * @param {?} inputText
         * @return {?}
         */
        InputContainerComponent.prototype.filterOptions = function (inputText) {
            /** @type {?} */
            var filterValue = inputText.toLowerCase();
            return this.inputParams.options.filter(( /**
             * @param {?} option
             * @return {?}
             */function (/**
             * @param {?} option
             * @return {?}
             */ option) { return (( /** @type {?} */(option.value))).toLowerCase().includes(filterValue); }));
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        InputContainerComponent.prototype.setDisabled = function (value) {
            value ? this.inputForm.disable() : this.inputForm.enable();
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        InputContainerComponent.prototype.isDateObj = function (value) {
            /** @type {?} */
            var isDate;
            switch (typeof value) {
                case "string":
                    isDate = !isNaN(Date.parse(value));
                    break;
                case "object":
                    isDate = value instanceof Date
                        ? !isNaN(value.getTime())
                        : false;
                    break;
                default: isDate = false;
            }
            return isDate;
        };
        return InputContainerComponent;
    }());
    InputContainerComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'input-container',
                    template: "<div [ngClass]=\"webMode ? ['web-view-input-comp'] : ['input-cont-comp']\"\n  [class.vertical-mode]=\"displayMode === DISPLAY_MODE.VERTICAL\"\n  [ngClass.xl]=\"webMode ? ['web-view-input-comp'] : ['web-input-cont-comp']\"\n  [ngClass.lg]=\"webMode ? ['web-view-input-comp'] : ['web-input-cont-comp']\"\n  [ngClass.md]=\"webMode ? ['web-view-input-comp'] : ['web-input-cont-comp']\"\n  [ngClass.sm]=\"webMode ? ['web-view-input-comp'] : ['web-input-cont-comp']\">\n\n  <div class=\"label-txt txt-md-reg-norm\" *ngIf=\"displayLabel && inputParams.label && inputParams.displayType !== DISPLAY_TYPE.ROW_INPUT_BOX\">\n    {{ inputParams.label }}\n  </div>\n\n  <ng-container [ngSwitch]=\"inputParams.displayType\">\n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.INPUT_BOX\">\n\n      <div class=\"onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParams.isDisabled\">\n        <div class=\"prefix-image\" *ngIf=\"inputParams?.image?.prefixParams\">\n          <i class=\"{{ inputParams.image.prefixParams?.iconClass }}\"></i>\n          <img src=\"{{ inputParams.image.prefixParams?.imgUrl }}\">\n        </div>\n        <input matInput\n          placeholder=\"{{inputParams.placeHolder}}\"\n          type=\"{{inputParams.inputType}}\"\n          (updatedValue)=\"setChangedValues($event)\"\n          class=\"txt-md-med-norm input-cont\" \n          [formControl]=\"inputForm\"\n          name=\"input-text\"\n          [ncMaxLength]=\"inputParams.maxLength || 1000\"\n          (updatedValue)=\"inputForm.setValue($event)\"\n          textSecurity=\"inputParams.isPassword\"\n          [class.num-password-input]=\"inputParams.isPassword\"\n          autocomplete=\"off\"\n          [keyboard]=\"parentCont\"\n          >\n          <div class=\"suffix-image\" *ngIf=\"inputParams?.image?.suffixParams\">\n            <i class=\"{{ inputParams.image.suffixParams?.iconClass }}\"></i>\n            <img src=\"{{ inputParams.image.suffixParams?.imgUrl }}\">\n          </div>\n      </div>\n  \n    </ng-container> \n    \n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.TEXT_AREA\">\n\n      <div class=\"onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParams.isDisabled\">\n        <textarea matInput\n          placeholder=\"{{inputParams.placeHolder}}\"\n          type=\"{{inputParams.inputType}}\"\n          (updatedValue)=\"setChangedValues($event)\"\n          class=\"txt-md-med-norm input-cont\" \n          [formControl]=\"inputForm\"\n          name=\"input-text\"\n          [ncMaxLength]=\"inputParams.maxLength || 1000\"\n          (updatedValue)=\"inputForm.setValue($event)\"\n          textSecurity=\"inputParams.isPassword\"\n          [class.num-password-input]=\"inputParams.isPassword\"\n          autocomplete=\"off\"\n          [keyboard]=\"parentCont\"\n          >\n        </textarea> \n      </div>\n\n    </ng-container>  \n  \n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.SELECTION_BOX\">\n\n      <div class=\"onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParams.isDisabled\">\n        <mat-select [formControl]=\"inputForm\"\n          placeholder=\"{{inputParams.placeHolder}}\" \n          class=\"txt-md-med-norm input-cont\"\n          (selectionChange)=\"selectedOption($event)\"\n          (openedChange)=\"dropDownToggle($event)\">\n          <mat-option *ngIf=\"inputParams.selectAll\" [value]=\"'ALL'\"\n            class=\"txt-md-med-norm\">\n            All\n          </mat-option>\n          <mat-option *ngFor=\"let option of inputParams.options\" [value]=\"option\"\n            class=\"txt-md-med-norm\">\n            {{ option.value }}\n          </mat-option>\n        </mat-select>\n      </div>\n\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.MULTI_CHECK_BOX\">\n\n      <div class=\"checkbox-cont\">\n\n        <mat-checkbox *ngIf=\"inputParams.selectAll\" [value]=\"'ALL'\"\n          class=\"txt-md-med-norm checkbox\"\n          (change)=\"checkAllOptions($event)\">\n          Select All\n        </mat-checkbox>\n\n        <mat-checkbox *ngFor=\"let option of inputParams.options\" [value]=\"option\"\n          class=\"txt-md-med-norm checkbox\"\n          [checked]=\"option.selected\"\n          (change)=\"checkedOption(option)\">\n          {{ option.value }}\n        </mat-checkbox>\n      </div>\n  \n    </ng-container>\n    \n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.RADIO\">\n\n      <mat-radio-group [formControl]=\"inputForm\"\n        class=\"txt-md-med-norm input-cont radio-group\"\n        (change)=\"selectedOption($event)\">\n        <mat-radio-button  *ngFor=\"let option of inputParams.options\" [value]=\"option\" \n          class=\"txt-md-med-norm radio-button\"\n          [checked]=\"option.selected\">\n          {{ option.value }}\n        </mat-radio-button>\n      </mat-radio-group>\n\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.ROW_RADIO\">\n\n      <mat-radio-group [formControl]=\"inputForm\"\n        class=\"txt-md-med-norm vert-input-cont vert-radio-group\"\n        (change)=\"selectedOption($event)\">\n        <mat-radio-button  *ngFor=\"let option of inputParams.options\" [value]=\"option\" \n          class=\"txt-md-med-norm radio-button\"\n          [checked]=\"option.selected\">\n          {{ option.value }}\n        </mat-radio-button>\n      </mat-radio-group>\n\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.TOGGLE\">\n      <mat-slide-toggle class=\"toggle-cont txt-md-med-norm\"\n        [labelPosition]=\"'after'\"\n        (change)=\"onToggleChane($event)\">\n        {{ inputParams.label }}\n      </mat-slide-toggle>\n\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.CALENDAR_BOX\">\n      <div class=\"onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParams.isDisabled\">\n        <input matInput\n          [formControl]=\"inputForm\"\n          [matDatepicker]=\"picker\" \n          (dateChange)=\"setDate($event)\"\n          placeholder=\"{{inputParams.placeHolder}}\"\n          class=\"txt-md-med-norm input-cont\"\n          [keyboard]=\"parentCont\">\n        <mat-datepicker-toggle matSuffix [for]=\"picker\" disableRipple=\"false\"></mat-datepicker-toggle>\n        <mat-datepicker touchUi #picker></mat-datepicker>\n      </div>\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.DATE_RANGE\" [formGroup]=\"dateRange\">\n      <div class=\"range\">\n        <div class=\"range-onb-input-box-cont border-primary\">\n          <input matInput\n            formControlName=\"startDate\"\n            [matDatepicker]=\"startPicker\" \n            (dateChange)=\"setDateRange($event)\"\n            placeholder=\"{{inputParams.placeHolder[0]}}\"\n            class=\"txt-md-med-norm input-cont\"\n            [keyboard]=\"parentCont\">\n          <mat-datepicker-toggle matSuffix [for]=\"startPicker\" disableRipple=\"false\"></mat-datepicker-toggle>\n          <mat-datepicker touchUi #startPicker></mat-datepicker>\n        </div>\n\n        <div class=\"range-onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParams.isDisabled\">\n          <input matInput\n            formControlName=\"endDate\"\n            [matDatepicker]=\"endPicker\" \n            (dateChange)=\"setDateRange($event)\"\n            placeholder=\"{{inputParams.placeHolder[1]}}\"\n            class=\"txt-md-med-norm input-cont\"\n            [keyboard]=\"parentCont\">\n          <mat-datepicker-toggle matSuffix [for]=\"endPicker\" disableRipple=\"false\"></mat-datepicker-toggle>\n          <mat-datepicker touchUi #endPicker></mat-datepicker>\n        </div>\n      </div>\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.NUMBER_RANGE\" [formGroup]=\"numberRange\">\n      <div class=\"range\">\n        <div class=\"range-onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParams.isDisabled\">\n          <input matInput\n            placeholder=\"{{inputParams.placeHolder[0]}}\"\n            type=\"number\"\n            (input)=\"setNumberRange($event)\"\n            class=\"txt-md-med-norm input-cont\" \n            formControlName=\"minAmount\"\n            name=\"input-text\"\n            textSecurity=\"inputParams.isPassword\"\n            [class.num-password-input]=\"inputParams.isPassword\"\n            autocomplete=\"off\"\n            [keyboard]=\"parentCont\"\n            >\n        </div>\n    \n        <div class=\"range-onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParams.isDisabled\">\n          <input matInput\n            placeholder=\"{{inputParams.placeHolder[1]}}\"\n            type=\"number\"\n            (input)=\"setNumberRange($event)\"\n            class=\"txt-md-med-norm input-cont\" \n            formControlName=\"maxAmount\"\n            name=\"input-text\"\n            textSecurity=\"inputParams.isPassword\"\n            [class.num-password-input]=\"inputParams.isPassword\"\n            autocomplete=\"off\"\n            [keyboard]=\"parentCont\"\n            >\n        </div>\n      </div>\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.AUTOCOMPLETE_SELECT\">\n      <div class=\"onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParams.isDisabled\">\n        <input matInput #autoCompInput\n          type=\"text\"\n          class=\"txt-md-med-norm input-cont\" \n          placeholder=\"{{inputParams.placeHolder}}\"\n          [formControl]=\"inputForm\"\n          [matAutocomplete]=\"auto\"\n          [keyboard]=\"parentCont\"\n          (blur)=\"valueEntered(autoCompInput.value)\">\n\n        <mat-autocomplete #auto=\"matAutocomplete\" [displayWith]=\"displayFn\"\n          (optionSelected)=\"setAutocompleteValue($event)\"\n          class=\"txt-xl-med-norm input-cont\">\n          <mat-option *ngFor=\"let option of filteredOptions | async\" [value]=\"option\"\n            class=\"txt-md-med-norm\">\n            {{ option.value }}\n          </mat-option>\n        </mat-autocomplete>\n      </div>\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.BUTTON_TOGGLE\">\n      <mat-button-toggle-group name=\"toggle\" class=\"button-toggle\" #group=\"matButtonToggleGroup\">\n\n        <ng-container *ngFor=\"let option of inputParams.options ; let i = index\">\n\n          <mat-button-toggle value=\"{{option.id}}\" class=\"txt-md-reg-norm\"\n            [checked]=\"option.selected\"\n            [ngClass]=\"{ 'primary-bg' : group.value === option.id, 'text-color-white' : group.value === option.id}\"\n            (change)=\"onBtnToggleChange($event)\">\n            {{ option.value }}\n          </mat-button-toggle>\n        </ng-container>\n      </mat-button-toggle-group>\n\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.ROW_INPUT_BOX\">\n      <div class=\"input-container\">\n\n        <div class=\"label-txt txt-md-reg-norm\" *ngIf=\"displayLabel && inputParams.label\">\n          {{ inputParams.label }}\n        </div>\n\n        <div class=\"onb-input-box-cont border-primary small-box\" [class.border-disabled]=\"inputParams.isDisabled\">\n          <input matInput\n            placeholder=\"{{inputParams.placeHolder}}\"\n            type=\"{{inputParams.inputType}}\"\n            (updatedValue)=\"setChangedValues($event)\"\n            class=\"txt-md-med-norm input-cont\" \n            [formControl]=\"inputForm\"\n            name=\"input-text\"\n            [ncMaxLength]=\"inputParams.maxLength || 1000\"\n            (updatedValue)=\"inputForm.setValue($event)\"\n            textSecurity=\"inputParams.isPassword\"\n            [class.num-password-input]=\"inputParams.isPassword\"\n            autocomplete=\"off\"\n            [keyboard]=\"parentCont\">\n        </div>\n\n      </div>  \n    </ng-container>  \n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.IMAGE_UPLOAD\">\n      <file-upload\n        [screen]=\"screen\"\n        (value)=\"fileUploadValue($event)\"\n        [isRequired]=\"inputParams.isRequired\">\n      </file-upload>  \n    </ng-container> \n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.SLIDER\">\n      <mat-slider\n        thumbLabel=\"true\"\n        [displayWith]=\"formatLabel\"\n        [disabled]=\"inputParams.isDisabled\"\n        tickInterval=\"1\"\n        min=\"inputParams.options[0].value\"\n        max=\"inputParams.options[1].value\"\n        class=\"txt-md-med-norm\"\n        (change)=\"onSliderValueChange($event)\">\n        {{ inputParams.label }}\n      </mat-slider>\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.DROPDOWN_MULTI_CHECK_BOX\">\n      <drop-down-multi-select\n        [options]=\"inputParams.options\"\n        [placeholder]=\"inputParams.placeHolder\"\n        [showSelectAll]=\"inputParams.selectAll\"\n        (selectedItems)=\"checkedOption($event)\"\n        (selectedAll)=\"checkAllOptions($event)\">\n      </drop-down-multi-select>\n    </ng-container>\n\n  </ng-container>  \n\n  <div *ngIf=\"inputForm\" class=\"errors-list\">\n    <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputForm.touched && inputParams.isRequired && \n      inputForm.hasError('required')\">\n      <span *ngIf=\"inputParams.displayType === DISPLAY_TYPE.RADIO || \n        inputParams.displayType === DISPLAY_TYPE.SELECTION_BOX ||\n        inputParams.displayType === DISPLAY_TYPE.MULTI_CHECK_BOX ; else default\" class=\"err-text\">\n        {{ inputParams.validators ? inputParams.validators.validationError : ('mu_inpt_cont_sel_err' | translate) }}\n      </span>\n      <ng-template #default>\n        {{ inputParams.validators ? inputParams.validators.validationError : ('mu_inpt_cont_val_err' | translate) }}\n      </ng-template>\n    </mat-error>\n\n    <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputForm.touched && inputForm.value &&\n      inputForm.hasError('pattern')\">\n      {{ inputParams.validators ? inputParams.validators.validationError : ('mu_inpt_cont_val_err' | translate) }}\n    </mat-error>\n\n    <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputForm.touched && inputForm.errors && \n      inputForm.hasError('futureDate')\">\n      {{ 'mu_inpt_cont_futr_date_err' | translate }}\n    </mat-error>\n  </div>\n\n  <div *ngIf=\"dateRange\" class=\"errors-list\">\n    <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"dateRange.get('startDate').hasError('noStartDate')\">\n      {{ 'mu_inpt_cont_strt_date_err' | translate }}\n    </mat-error>\n  \n    <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"dateRange.get('startDate').hasError('startDateExceed')\">\n      {{ 'mu_inpt_cont_date_err' | translate }}\n    </mat-error>\n\n    <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"dateRange.get('startDate').hasError('futureDate') || \n      dateRange.get('endDate').hasError('futureDate')\">\n      {{ 'mu_inpt_cont_futr_date_err' | translate }}\n    </mat-error>\n\n    <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputParams.isRequired && \n      (dateRange.get('startDate').touched && dateRange.get('endDate').touched) &&\n      (dateRange.get('startDate').hasError('required') || dateRange.get('endDate').hasError('required'))\">\n      {{ inputParams.validators ? inputParams.validators.validationError : ('mu_inpt_cont_val_err' | translate) }}\n    </mat-error>\n\n    <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\" (dateRange.get('startDate').touched && \n      dateRange.get('endDate').touched) && dateRange.get('startDate').value && !dateRange.get('endDate').value\">\n      {{ 'mu_inpt_cont_end_date_err' | translate }}\n    </mat-error>\n  </div>\n  \n  <div *ngIf=\"numberRange\" class=\"errors-list\">\n    <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"numberRange.get('minAmount').hasError('noMinAmount')\">\n      {{ 'mu_inpt_cont_min_amnt_err' | translate }}\n    </mat-error>\n  \n    <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"numberRange.get('minAmount').hasError('minAmountExceed')\">\n      {{ 'mu_inpt_cont_amnt_err' | translate }}\n    </mat-error>\n\n    <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputParams.isRequired && \n      (numberRange.get('minAmount').touched || numberRange.get('maxAmount').touched) &&\n      (numberRange.get('minAmount').hasError('required') || numberRange.get('maxAmount').hasError('required'))\">\n      {{ inputParams.validators ? inputParams.validators.validationError : ('mu_inpt_cont_val_err' | translate) }}\n    </mat-error>\n  </div>\n\n</div>",
                    styles: [".onb-input-box-cont{align-items:center;border-style:solid;border-width:2px;display:flex;margin:2% 0 0;position:relative}.button-toggle{margin:2vw 0}.input-container{align-items:center;display:flex;justify-content:space-between;position:relative}.input-container .label-txt{margin-right:2vw;width:72vw}.input-container .small-box{width:14vw}.input-container .input-cont{text-align:center}.radio-button{padding-bottom:2vw!important}.radio-group{display:flex;flex-direction:column;padding:3vw 0 0 2vw!important}.checkbox,.checkbox-cont{padding:1vw 0}.checkbox-cont{display:flex;flex-direction:column;position:relative}.range-onb-input-box-cont{align-items:center;border-style:solid;border-width:2px;display:flex;position:relative;width:46%}.input-cont,.range-onb-input-box-cont .input-cont{background:none;border:0;padding:4vw;position:relative;width:100%}.toggle-cont{margin:2vw 0}.input-cont-comp{margin:2vw 4vw;position:relative}.range{display:flex;flex-direction:row;justify-content:space-between}.errors-list{display:flex;flex-direction:column;padding-top:1vw}.web-input-cont-comp{margin:10px 20px}.web-input-cont-comp .input-cont,.web-input-cont-comp .range-onb-input-box-cont .input-cont{background:none;border:0;padding:15px;position:relative;width:100%}.web-input-cont-comp .errors-list{padding-top:5px}.web-input-cont-comp .radio-button{padding-bottom:10px!important}.web-input-cont-comp .radio-group{padding:5px 0!important}.web-view-input-comp .onb-input-box-cont{align-items:center;border-style:solid;border-width:2px;display:flex;margin:2% 0;position:relative}.web-view-input-comp .range-onb-input-box-cont{align-items:center;border-style:solid;border-width:2px;display:flex;margin:.5% 0;position:relative;width:48%}.web-view-input-comp .input-cont{background:none;border:0;padding:12px 8px;position:relative;width:100%}.web-view-input-comp .errors-list{padding-top:5px}.web-view-input-comp .radio-button{padding-bottom:10px!important}.web-view-input-comp .radio-group{padding:5px 0!important}.web-view-input-comp .vert-radio-group{padding:8px 0!important}.web-view-input-comp .vert-radio-group .radio-button{padding-right:10px!important}.vertical-mode .checkbox,.vertical-mode .radio-group{padding:5px 0!important}.vertical-mode .radio-button{padding:8px 0!important}.vertical-mode .checkbox-cont{padding:5px 0}.prefix-image,.suffix-image{padding:0 10px}"]
                }] }
    ];
    /** @nocollapse */
    InputContainerComponent.ctorParameters = function () { return [
        { type: RunContextBrowser, decorators: [{ type: i0.Inject, args: ['RunContext',] }] },
        { type: forms.FormBuilder }
    ]; };
    InputContainerComponent.propDecorators = {
        picker: [{ type: i0.ViewChild, args: [datepicker.MatDatepicker, { static: false },] }],
        fileUplInst: [{ type: i0.ViewChild, args: [FileUploadComponent, { static: false },] }],
        inputParams: [{ type: i0.Input }],
        screen: [{ type: i0.Input }],
        webMode: [{ type: i0.Input }],
        parentCont: [{ type: i0.Input }],
        eventPropagate: [{ type: i0.Input }],
        displayMode: [{ type: i0.Input }],
        displayLabel: [{ type: i0.Input }],
        value: [{ type: i0.Output }],
        dropdownOpen: [{ type: i0.Output }],
        stepSelectedFilter: [{ type: i0.Output }]
    };
    if (false) {
        /** @type {?} */
        InputContainerComponent.prototype.picker;
        /** @type {?} */
        InputContainerComponent.prototype.fileUplInst;
        /** @type {?} */
        InputContainerComponent.prototype.inputParams;
        /** @type {?} */
        InputContainerComponent.prototype.screen;
        /** @type {?} */
        InputContainerComponent.prototype.webMode;
        /** @type {?} */
        InputContainerComponent.prototype.parentCont;
        /** @type {?} */
        InputContainerComponent.prototype.eventPropagate;
        /** @type {?} */
        InputContainerComponent.prototype.displayMode;
        /** @type {?} */
        InputContainerComponent.prototype.displayLabel;
        /** @type {?} */
        InputContainerComponent.prototype.value;
        /** @type {?} */
        InputContainerComponent.prototype.dropdownOpen;
        /** @type {?} */
        InputContainerComponent.prototype.stepSelectedFilter;
        /** @type {?} */
        InputContainerComponent.prototype.inputForm;
        /** @type {?} */
        InputContainerComponent.prototype.dateRange;
        /** @type {?} */
        InputContainerComponent.prototype.numberRange;
        /** @type {?} */
        InputContainerComponent.prototype.filteredOptions;
        /** @type {?} */
        InputContainerComponent.prototype.sliderLabel;
        /** @type {?} */
        InputContainerComponent.prototype.DISPLAY_TYPE;
        /** @type {?} */
        InputContainerComponent.prototype.DISPLAY_MODE;
        /**
         * @type {?}
         * @private
         */
        InputContainerComponent.prototype.fileUploadParams;
        /** @type {?} */
        InputContainerComponent.prototype.formatLabel;
        /**
         * @type {?}
         * @protected
         */
        InputContainerComponent.prototype.rc;
        /**
         * @type {?}
         * @private
         */
        InputContainerComponent.prototype.formBuilder;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var ANIM_TRANSITION = 600;
    /** @type {?} */
    var KEY_ANIM_TRANS = 200;
    /** @type {?} */
    var EVENT_TIME_TAKEN = 250;
    /**
     * @record
     */
    function DialerOptions() { }
    if (false) {
        /** @type {?} */
        DialerOptions.prototype.id;
        /** @type {?} */
        DialerOptions.prototype.value;
    }
    /**
     * @record
     */
    function DialerCssClasses() { }
    if (false) {
        /** @type {?|undefined} */
        DialerCssClasses.prototype.bgColor;
        /** @type {?|undefined} */
        DialerCssClasses.prototype.activeColor;
        /** @type {?|undefined} */
        DialerCssClasses.prototype.inActiveColor;
    }
    /**
     * @record
     */
    function DialerParams() { }
    if (false) {
        /** @type {?} */
        DialerParams.prototype.dialerOptions;
        /** @type {?|undefined} */
        DialerParams.prototype.isCircular;
        /** @type {?|undefined} */
        DialerParams.prototype.highlightPos;
        /** @type {?|undefined} */
        DialerParams.prototype.dialerCssClasses;
        /** @type {?|undefined} */
        DialerParams.prototype.selectedItem;
    }
    var DialerComponent = /** @class */ (function () {
        /**
         * @param {?} rc
         * @param {?} renderer
         * @param {?} ngZone
         */
        function DialerComponent(rc, renderer, ngZone) {
            this.rc = rc;
            this.renderer = renderer;
            this.ngZone = ngZone;
            this.eventPropagte = false;
            this.value = new i0.EventEmitter();
            // window['dialer']    = this
            // user howler for sound if being implemented in mobile 
            //( https://cdnjs.cloudflare.com/ajax/libs/howler/2.1.2/howler.core.min.js)
            // this.sound = new (window as any).Howl({
            //   src     : ['sounds/select.mp3'],
            //   volume  : 0.15
            // });
        }
        /**
         * @param {?} event
         * @return {?}
         */
        DialerComponent.prototype.onHostKeyup = function (event) {
            this.onKeyDown(event);
        };
        /**
         * @return {?}
         */
        DialerComponent.prototype.ngOnInit = function () {
            /** @type {?} */
            var slicedItems = this.dialerParams.dialerOptions.slice(0);
            this.viewPortItems = slicedItems;
            this.selectedItem = this.dialerParams.selectedItem || this.viewPortItems[0];
        };
        /**
         * @return {?}
         */
        DialerComponent.prototype.ngAfterViewInit = function () {
            /** @type {?} */
            var scrollElem = this.scrollCont.nativeElement;
            /** @type {?} */
            var viewPortChildren = scrollElem.children;
            /** @type {?} */
            var rect = viewPortChildren[1].getBoundingClientRect();
            /** @type {?} */
            var width = rect.width;
            this.contentHolder.nativeElement.style.height = rect.height + "px";
            this.contentHolder.nativeElement.style.width = width + "px";
            this.contentHolder.nativeElement.style.top = this.dialerParams.highlightPos
                ? "(" + this.dialerParams.highlightPos + " * " + rect.height + ")px"
                : rect.height + "px";
            this.scrollCont.nativeElement.style.top = this.dialerParams.highlightPos
                ? "(" + this.dialerParams.highlightPos + " * " + rect.height + ")px"
                : rect.height + "px";
            this.nail = new Nail(this.rc, this.scrollCont.nativeElement, this, this.renderer, { axisX: false, axisY: true });
            this.multiStepVal = new MultiStepValue(0, rect.height, this.dialerParams.dialerOptions.length, false, true);
        };
        /**
         * @return {?}
         */
        DialerComponent.prototype.ngOnDestroy = function () {
        };
        /*=====================================================================
                                      PRIVATE
          =====================================================================*/
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        DialerComponent.prototype.onKeyDown = function (event) {
            /** @type {?} */
            var scrollElem = this.scrollCont.nativeElement;
            /** @type {?} */
            var viewPortChildren = scrollElem.children;
            /** @type {?} */
            var rect = viewPortChildren[1].getBoundingClientRect();
            /** @type {?} */
            var lastIndex = this.lastIndex;
            if (event.which === 38) {
                this.multiStepVal.final(rect.height, 0.2);
            }
            else if (event.which === 40) {
                this.multiStepVal.final(-rect.height, 0.2);
            }
            else {
                return;
            }
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
            /** @type {?} */
            var currentIndex = this.multiStepVal.currentIndex;
            if (currentIndex === lastIndex)
                return;
            this.scrollCont.nativeElement.style.transition = KEY_ANIM_TRANS + "ms";
            DomHelper.setTransform(this.scrollCont.nativeElement, 0, -this.multiStepVal.currentValue, 0);
            this.lastIndex = this.multiStepVal.currentIndex;
            this.selectedItem = this.dialerParams.dialerOptions[this.lastIndex];
            // this.rc.audio.play(this.rc.audio.SELECT)
            if (this.sound)
                this.sound.play();
            if (this.eventPropagte)
                this.value.emit(this.selectedItem);
        };
        /*=====================================================================
                                      CALLBACKS
          =====================================================================*/
        /**
         * @return {?}
         */
        DialerComponent.prototype.onPanStart = function () {
            this.scrollCont.nativeElement.style.transition = 'none';
        };
        /**
         * @param {?} event
         * @return {?}
         */
        DialerComponent.prototype.onPanMove = function (event) {
            var _this = this;
            this.ngZone.runOutsideAngular(( /**
             * @return {?}
             */function () {
                /** @type {?} */
                var scrollElem = _this.scrollCont.nativeElement;
                /** @type {?} */
                var viewPortChildren = scrollElem.children;
                /** @type {?} */
                var rect = viewPortChildren[1].getBoundingClientRect();
                /** @type {?} */
                var deltaY = event.deltaY;
                /** @type {?} */
                var value = _this.multiStepVal.transition(deltaY);
                /** @type {?} */
                var lastIndex = _this.lastIndex;
                /** @type {?} */
                var newIndex = Math.round(value / rect.height);
                if (lastIndex !== newIndex) {
                    if (_this.sound)
                        _this.sound.play();
                    _this.lastIndex = newIndex;
                }
                _this.nail.requestAnimate(value);
                _this.rc.isDebug() && _this.rc.debug(_this.rc.getName(_this), "onPanMove " + JSON.stringify({ event: event, lastIndex: _this.lastIndex }));
                _this.selectedItem = _this.dialerParams.dialerOptions[_this.lastIndex];
            }));
            return true;
        };
        /**
         * @param {?} value
         * @return {?}
         */
        DialerComponent.prototype.onPanAnimate = function (value) {
            var _this = this;
            this.ngZone.run(( /**
             * @return {?}
             */function () {
                DomHelper.setTransform(_this.scrollCont.nativeElement, 0, -value, 0);
            }));
        };
        /**
         * @param {?} event
         * @return {?}
         */
        DialerComponent.prototype.onPanEnd = function (event) {
            var _this = this;
            this.ngZone.runOutsideAngular(( /**
             * @return {?}
             */function () {
                /** @type {?} */
                var deltaY = event.deltaY;
                /** @type {?} */
                var scrollElem = _this.scrollCont.nativeElement;
                /** @type {?} */
                var viewPortChildren = scrollElem.children;
                /** @type {?} */
                var rect = viewPortChildren[1].getBoundingClientRect();
                /** @type {?} */
                var value = _this.multiStepVal.transition(deltaY);
                /** @type {?} */
                var currentIndex = _this.multiStepVal.currentIndex;
                _this.multiStepVal.final(deltaY, event.speed, event.quickRatio);
                /** @type {?} */
                var latestIndex = _this.multiStepVal.currentIndex;
                /** @type {?} */
                var newIndex = Math.round(value / rect.height);
                _this.rc.isDebug() && _this.rc.debug(_this.rc.getName(_this), "onPanEnd " + JSON.stringify({ event: event, lastIndex: _this.lastIndex, newIndex: newIndex, currentIndex: currentIndex, latestIndex: latestIndex }));
                if (currentIndex === latestIndex)
                    return;
                _this.scrollCont.nativeElement.style.transition = ANIM_TRANSITION + "ms";
                /** @type {?} */
                var totalDisplacement = Math.abs((event.timeTaken < EVENT_TIME_TAKEN ? currentIndex : newIndex) - latestIndex) || 1;
                _this.rc.isDebug() && _this.rc.debug(_this.rc.getName(_this), "totalDisplacement " + JSON.stringify(totalDisplacement));
                /** @type {?} */
                var interval = setInterval(( /**
                 * @return {?}
                 */function () {
                    if (_this.sound)
                        _this.sound.play();
                }), ANIM_TRANSITION / totalDisplacement);
                if (latestIndex >= currentIndex) {
                    for (var i = currentIndex; i <= latestIndex; i = i + 0.25) {
                        DomHelper.setTransform(_this.scrollCont.nativeElement, 0, -rect.height * i, 0);
                    }
                }
                else {
                    for (var i = latestIndex; i < currentIndex; i = i + 0.25) {
                        DomHelper.setTransform(_this.scrollCont.nativeElement, 0, rect.height * i, 0);
                    }
                }
                setTimeout(( /**
                 * @return {?}
                 */function () {
                    clearInterval(interval);
                }), ANIM_TRANSITION);
            }));
            this.ngZone.run(( /**
             * @return {?}
             */function () {
                DomHelper.setTransform(_this.scrollCont.nativeElement, 0, -_this.multiStepVal.currentValue, 0);
                _this.lastIndex = _this.multiStepVal.currentIndex;
                _this.selectedItem = _this.dialerParams.dialerOptions[_this.lastIndex];
                if (_this.eventPropagte)
                    _this.value.emit(_this.selectedItem);
            }));
        };
        /*=====================================================================
                                      UTILS
          =====================================================================*/
        /**
         * @return {?}
         */
        DialerComponent.prototype.getSelectedItem = function () {
            this.value.emit(this.selectedItem);
        };
        /**
         * @param {?} index
         * @return {?}
         */
        DialerComponent.prototype.scrollToElem = function (index) {
            if (index === this.multiStepVal.currentIndex)
                return;
            /** @type {?} */
            var scrollElem = this.scrollCont.nativeElement;
            /** @type {?} */
            var viewPortChildren = scrollElem.children;
            /** @type {?} */
            var rect = viewPortChildren[1].getBoundingClientRect();
            if (index > this.multiStepVal.currentIndex) {
                this.multiStepVal.final(-rect.height, 0.2);
            }
            else {
                this.multiStepVal.final(rect.height, 0.2);
            }
            this.scrollCont.nativeElement.style.transition = KEY_ANIM_TRANS + "ms";
            DomHelper.setTransform(this.scrollCont.nativeElement, 0, -this.multiStepVal.currentValue, 0);
            this.lastIndex = this.multiStepVal.currentIndex;
            this.selectedItem = this.dialerParams.dialerOptions[this.lastIndex];
            // this.rc.audio.play(this.rc.audio.SELECT)
            if (this.sound)
                this.sound.play();
            if (this.eventPropagte)
                this.value.emit(this.selectedItem);
        };
        return DialerComponent;
    }());
    DialerComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'dialer',
                    template: "\n<div class=\"dialer-comp primary-bg\" #contentHolder></div>\n\n<div class=\"dialer-cont\" #scrollCont>\n\n  <ng-container *ngFor=\"let option of viewPortItems; let i = index\">\n\n    <div class=\"dialer-value txt-lg-reg-norm\" (click)=\"scrollToElem(i)\"\n    [class.text-color-white]=\"selectedItem.id === option.id\" tabindex=\"-1\">\n      {{ option.value }}\n    </div>  \n  </ng-container>\n\n</div>\n",
                    styles: [":host{display:block;height:100%;overflow-x:hidden;overflow-y:hidden;position:relative;text-align:center;width:100%}.dialer-value{padding:2vw}.dialer-cont{overflow-x:hidden;overflow-y:hidden;position:relative;width:100%}.dialer-cont::-webkit-scrollbar{display:none}.dialer-comp{position:absolute;width:100%}.dialer-holder{position:relative}"]
                }] }
    ];
    /** @nocollapse */
    DialerComponent.ctorParameters = function () { return [
        { type: RunContextBrowser, decorators: [{ type: i0.Inject, args: ['RunContext',] }] },
        { type: i0.Renderer2 },
        { type: i0.NgZone }
    ]; };
    DialerComponent.propDecorators = {
        onHostKeyup: [{ type: i0.HostListener, args: ['keydown', ['$event'],] }],
        scrollCont: [{ type: i0.ViewChild, args: ['scrollCont', { static: true },] }],
        contentHolder: [{ type: i0.ViewChild, args: ['contentHolder', { static: true },] }],
        parentDiv: [{ type: i0.Input }],
        dialerParams: [{ type: i0.Input }],
        eventPropagte: [{ type: i0.Input }],
        value: [{ type: i0.Output }]
    };
    if (false) {
        /** @type {?} */
        DialerComponent.prototype.scrollCont;
        /** @type {?} */
        DialerComponent.prototype.contentHolder;
        /** @type {?} */
        DialerComponent.prototype.parentDiv;
        /** @type {?} */
        DialerComponent.prototype.dialerParams;
        /** @type {?} */
        DialerComponent.prototype.eventPropagte;
        /** @type {?} */
        DialerComponent.prototype.value;
        /** @type {?} */
        DialerComponent.prototype.viewPortItems;
        /** @type {?} */
        DialerComponent.prototype.selectedItem;
        /**
         * @type {?}
         * @private
         */
        DialerComponent.prototype.nail;
        /**
         * @type {?}
         * @private
         */
        DialerComponent.prototype.multiStepVal;
        /**
         * @type {?}
         * @private
         */
        DialerComponent.prototype.lastIndex;
        /**
         * @type {?}
         * @private
         */
        DialerComponent.prototype.sound;
        /**
         * @type {?}
         * @protected
         */
        DialerComponent.prototype.rc;
        /**
         * @type {?}
         * @private
         */
        DialerComponent.prototype.renderer;
        /**
         * @type {?}
         * @private
         */
        DialerComponent.prototype.ngZone;
    }

    var MuFormContainerComponent = /** @class */ (function () {
        /**
         * @param {?} rc
         * @param {?} formBuilder
         * @param {?} changeRef
         */
        function MuFormContainerComponent(rc, formBuilder, changeRef) {
            this.rc = rc;
            this.formBuilder = formBuilder;
            this.changeRef = changeRef;
            this.eventPropagate = false;
            this.displayLabel = true;
            this.value = new i0.EventEmitter();
            this.dropdownOpen = new i0.EventEmitter();
            this.lastInpField = new i0.EventEmitter();
            this.inputForm = ( /** @type {?} */({}));
            this.DISPLAY_TYPE = core.DISPLAY_TYPE;
            this.DISPLAY_MODE = core.DISPLAY_MODE;
            this.maxDate = new Date();
            this.inputForm = this.formBuilder.group({});
        }
        /**
         * @return {?}
         */
        MuFormContainerComponent.prototype.ngOnChanges = function () {
            this.initialize();
        };
        /**
         * @return {?}
         */
        MuFormContainerComponent.prototype.ngOnInit = function () {
            this.initialize();
        };
        /**
         * @return {?}
         */
        MuFormContainerComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            setTimeout(( /**
             * @return {?}
             */function () {
                _this.inputContainers = _this.inputCont.toArray().map(( /**
                 * @param {?} val
                 * @return {?}
                 */function (/**
                 * @param {?} val
                 * @return {?}
                 */ val) { return val.nativeElement; }));
            }), 10);
        };
        /*=====================================================================
                                      UTILS
          =====================================================================*/
        /**
         * @param {?=} manual
         * @param {?=} id
         * @return {?}
         */
        MuFormContainerComponent.prototype.onSubmit = function (manual, id) {
            var e_1, _a, e_2, _b;
            if (manual === void 0) { manual = true; }
            try {
                for (var _c = __values(this.formParams.inputParams), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var inputParams = _d.value;
                    if (this.inputForm && (inputParams.validators || inputParams.isRequired) && manual)
                        this.inputForm.get(inputParams.id).markAsTouched();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (manual && this.hasError())
                return false;
            /** @type {?} */
            var formOutputParams = ( /** @type {?} */({}));
            try {
                for (var _e = __values(this.formParams.inputParams), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var inputParams = _f.value;
                    if (id && id !== inputParams.id)
                        continue;
                    /** @type {?} */
                    var params = void 0;
                    switch (inputParams.displayType) {
                        case core.DISPLAY_TYPE.CALENDAR_BOX:
                            params = {
                                value: this.inputForm.get(inputParams.id).value ? this.inputForm.get(inputParams.id).value.getTime() : null,
                                displayType: inputParams.displayType
                            };
                            break;
                        case core.DISPLAY_TYPE.INPUT_BOX:
                        case core.DISPLAY_TYPE.SELECTION_BOX:
                        case core.DISPLAY_TYPE.AUTOCOMPLETE_SELECT:
                        case core.DISPLAY_TYPE.TEXT_AREA:
                        case core.DISPLAY_TYPE.TOGGLE:
                        case core.DISPLAY_TYPE.BUTTON_TOGGLE:
                        case core.DISPLAY_TYPE.ROW_INPUT_BOX:
                        case core.DISPLAY_TYPE.TIME:
                            params = {
                                value: this.inputForm.get(inputParams.id).value,
                                displayType: inputParams.displayType
                            };
                            break;
                        case core.DISPLAY_TYPE.DATE_RANGE:
                            /** @type {?} */
                            var dateFormGroup = ( /** @type {?} */(this.inputForm.get(inputParams.id)));
                            /** @type {?} */
                            var dateRangeKeys = inputParams.rangeKeys || ['startDate', 'endDate'];
                            /** @type {?} */
                            var dateValue = {};
                            dateValue[dateRangeKeys[0]] = dateFormGroup.controls.startDate.value
                                ? dateFormGroup.controls.startDate.value.getTime()
                                : null;
                            dateValue[dateRangeKeys[1]] = dateFormGroup.controls.endDate.value
                                ? dateFormGroup.controls.endDate.value.getTime()
                                : null;
                            params = {
                                value: dateValue,
                                displayType: inputParams.displayType
                            };
                            break;
                        case core.DISPLAY_TYPE.NUMBER_RANGE:
                            /** @type {?} */
                            var numFormGroup = ( /** @type {?} */(this.inputForm.get(inputParams.id)));
                            /** @type {?} */
                            var numRangeKeys = inputParams.rangeKeys || ['minAmount', 'maxAmount'];
                            /** @type {?} */
                            var numRangeValue = {};
                            numRangeValue[numRangeKeys[0]] = numFormGroup.controls.minAmount.value,
                                numRangeValue[numRangeKeys[1]] = numFormGroup.controls.maxAmount.value;
                            params = {
                                value: numRangeValue,
                                displayType: inputParams.displayType
                            };
                            break;
                        case core.DISPLAY_TYPE.IMAGE_UPLOAD:
                            params = {
                                value: this.fileUploadParams,
                                displayType: inputParams.displayType
                            };
                            break;
                        case core.DISPLAY_TYPE.RADIO:
                        case core.DISPLAY_TYPE.ROW_RADIO:
                            params = {
                                value: this.inputForm.get(inputParams.id).value || null,
                                displayType: inputParams.displayType
                            };
                            break;
                        case core.DISPLAY_TYPE.MULTI_CHECK_BOX:
                            params = {
                                value: this.inputForm.get(inputParams.id).value,
                                displayType: inputParams.displayType
                            };
                            break;
                    }
                    formOutputParams[inputParams.id] = params;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
            this.value.emit(formOutputParams);
            return true;
        };
        /**
         * @return {?}
         */
        MuFormContainerComponent.prototype.isCalanderOpen = function () {
            /** @type {?} */
            var pickers = this.picker.toArray();
            return pickers.some(( /**
             * @param {?} val
             * @return {?}
             */function (/**
             * @param {?} val
             * @return {?}
             */ val) { return val.opened; }));
        };
        /**
         * @return {?}
         */
        MuFormContainerComponent.prototype.closeCalander = function () {
            /** @type {?} */
            var pickers = this.picker.toArray();
            /** @type {?} */
            var length = pickers.length;
            for (var i = 0; i < length; i++) {
                if (pickers[i].opened) {
                    pickers[i].close();
                    break;
                }
            }
        };
        /**
         * @return {?}
         */
        MuFormContainerComponent.prototype.clearForm = function () {
            this.inputForm.reset();
        };
        /*=====================================================================
                                      HTML
          =====================================================================*/
        /**
         * @param {?} event
         * @param {?} i
         * @return {?}
         */
        MuFormContainerComponent.prototype.selectedOption = function (event, i) {
            /** @type {?} */
            var inputParams = this.formParams.inputParams[i];
            this.inputForm.get(inputParams.id).setValue(event.value);
            if (this.eventPropagate)
                this.onSubmit(false, inputParams.id);
        };
        /**
         * @param {?} event
         * @param {?} i
         * @return {?}
         */
        MuFormContainerComponent.prototype.onToggleChane = function (event, i) {
            /** @type {?} */
            var inputParams = this.formParams.inputParams[i];
            this.inputForm.get(inputParams.id).setValue(event.checked);
            if (this.eventPropagate)
                this.onSubmit(false, inputParams.id);
        };
        /**
         * @param {?} event
         * @param {?} i
         * @return {?}
         */
        MuFormContainerComponent.prototype.onBtnToggleChange = function (event, i) {
            /** @type {?} */
            var inputParams = this.formParams.inputParams[i];
            this.inputForm.get(inputParams.id).setValue(event.value);
            if (this.eventPropagate)
                this.onSubmit(false, inputParams.id);
        };
        /**
         * @param {?} event
         * @param {?} id
         * @return {?}
         */
        MuFormContainerComponent.prototype.fileUploadValue = function (event, id) {
            this.fileUploadParams = event;
            if (this.eventPropagate)
                this.onSubmit(false, id);
        };
        /**
         * @param {?} event
         * @param {?} option
         * @param {?} i
         * @return {?}
         */
        MuFormContainerComponent.prototype.checkedOption = function (event, option, i) {
            /** @type {?} */
            var inputParams = this.formParams.inputParams[i];
            /** @type {?} */
            var value = ( /** @type {?} */(this.inputForm.get(inputParams.id).value));
            if (value) {
                /** @type {?} */
                var idIndex = value.findIndex(( /**
                 * @param {?} val
                 * @return {?}
                 */function (/**
                 * @param {?} val
                 * @return {?}
                 */ val) { return val.id === option.id; }));
                if (idIndex !== -1) {
                    value.splice(idIndex, 1);
                    this.inputForm.get(inputParams.id).setValue(value);
                }
                else {
                    value.push(option);
                    this.inputForm.get(inputParams.id).setValue(value);
                }
            }
            else {
                this.inputForm.get(inputParams.id).setValue([option]);
            }
            if (this.eventPropagate)
                this.onSubmit(false, inputParams.id);
        };
        /**
         * @param {?} event
         * @param {?} i
         * @return {?}
         */
        MuFormContainerComponent.prototype.setChangedValues = function (event, i) {
            /** @type {?} */
            var inputParams = this.formParams.inputParams[i];
            this.inputForm.get(inputParams.id).setValue(event);
            if (this.eventPropagate)
                this.onSubmit(false, inputParams.id);
        };
        /**
         * @param {?} event
         * @param {?} i
         * @return {?}
         */
        MuFormContainerComponent.prototype.setDate = function (event, i) {
            /** @type {?} */
            var value = event.value;
            /** @type {?} */
            var inputParams = this.formParams.inputParams[i];
            value && !this.isDateObj(value) ? this.inputForm.get(inputParams.id).setValue(value.toDate())
                : this.inputForm.get(inputParams.id).setValue(value);
            if (this.eventPropagate)
                this.onSubmit(false, inputParams.id);
        };
        /**
         * @param {?} event
         * @param {?} i
         * @return {?}
         */
        MuFormContainerComponent.prototype.setDateRange = function (event, i) {
            /** @type {?} */
            var formName = this.formParams.inputParams[i].id;
            /** @type {?} */
            var dateGroup = ( /** @type {?} */(this.inputForm.get(formName)));
            /** @type {?} */
            var sDate = dateGroup.controls.startDate.value;
            /** @type {?} */
            var eDate = dateGroup.controls.endDate.value;
            sDate && !this.isDateObj(sDate) ? dateGroup.controls.startDate.setValue(sDate.toDate())
                : dateGroup.controls.startDate.setValue(sDate);
            eDate && !this.isDateObj(eDate) ? dateGroup.controls.endDate.setValue(eDate.toDate())
                : dateGroup.controls.endDate.setValue(eDate);
            if (this.eventPropagate)
                this.onSubmit(false, formName);
        };
        /**
         * @param {?} event
         * @param {?} i
         * @return {?}
         */
        MuFormContainerComponent.prototype.setNumberRange = function (event, i) {
            /** @type {?} */
            var formName = this.formParams.inputParams[i].id;
            /** @type {?} */
            var numGroup = ( /** @type {?} */(this.inputForm.get(formName)));
            numGroup.controls.minAmount.setValue(numGroup.controls.minAmount.value);
            numGroup.controls.maxAmount.setValue(numGroup.controls.maxAmount.value);
            if (this.eventPropagate)
                this.onSubmit(false, formName);
        };
        /**
         * @param {?} event
         * @param {?} i
         * @return {?}
         */
        MuFormContainerComponent.prototype.setAutocompleteValue = function (event, i) {
            /** @type {?} */
            var inputParams = this.formParams.inputParams[i];
            this.inputForm.get(inputParams.id).setValue(event.option.value);
            if (this.eventPropagate)
                this.onSubmit(false, inputParams.id);
        };
        /**
         * @param {?} value
         * @return {?}
         */
        MuFormContainerComponent.prototype.displayFn = function (value) {
            return value && typeof value === 'object' ? value.value : value;
        };
        /**
         * @return {?}
         */
        MuFormContainerComponent.prototype.hasError = function () {
            var e_3, _a;
            /** @type {?} */
            var hasError = false;
            try {
                for (var _b = __values(this.formParams.inputParams), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var inputParams = _c.value;
                    switch (inputParams.displayType) {
                        case core.DISPLAY_TYPE.CALENDAR_BOX:
                        case core.DISPLAY_TYPE.INPUT_BOX:
                        case core.DISPLAY_TYPE.SELECTION_BOX:
                        case core.DISPLAY_TYPE.AUTOCOMPLETE_SELECT:
                        case core.DISPLAY_TYPE.TEXT_AREA:
                        case core.DISPLAY_TYPE.MULTI_CHECK_BOX:
                        case core.DISPLAY_TYPE.RADIO:
                        case core.DISPLAY_TYPE.ROW_RADIO:
                        case core.DISPLAY_TYPE.TOGGLE:
                        case core.DISPLAY_TYPE.BUTTON_TOGGLE:
                        case core.DISPLAY_TYPE.ROW_INPUT_BOX:
                        case core.DISPLAY_TYPE.TIME:
                            hasError = inputParams.isRequired
                                ? this.inputForm.invalid
                                : this.inputForm.get(inputParams.id).value && this.inputForm.invalid;
                            break;
                        case core.DISPLAY_TYPE.DATE_RANGE:
                            /** @type {?} */
                            var dateFormGroup = ( /** @type {?} */(this.inputForm.get(inputParams.id)));
                            hasError = inputParams.isRequired
                                ? dateFormGroup.invalid
                                : ((dateFormGroup.controls.startDate.value && dateFormGroup.controls.startDate.invalid)
                                    || (dateFormGroup.controls.startDate.value && !dateFormGroup.controls.endDate.value)
                                    || (dateFormGroup.controls.endDate.value && dateFormGroup.controls.endDate.invalid));
                            break;
                        case core.DISPLAY_TYPE.NUMBER_RANGE:
                            /** @type {?} */
                            var numFormGroup = ( /** @type {?} */(this.inputForm.get(inputParams.id)));
                            hasError = inputParams.isRequired
                                ? numFormGroup.invalid
                                : ((numFormGroup.controls.minAmount.value && numFormGroup.controls.minAmount.invalid)
                                    || (numFormGroup.controls.minAmount.value && !numFormGroup.controls.maxAmount.value)
                                    || (numFormGroup.controls.maxAmount.value && numFormGroup.controls.maxAmount.invalid));
                            break;
                        case core.DISPLAY_TYPE.IMAGE_UPLOAD:
                            this.fileUplInst.onSubmit();
                            hasError = inputParams.isRequired
                                ? (!this.fileUploadParams || Object.keys(this.fileUploadParams).length === 0)
                                : false;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return hasError;
        };
        /**
         * @param {?} event
         * @param {?} index
         * @return {?}
         */
        MuFormContainerComponent.prototype.dropDownToggle = function (event, index) {
            /** @type {?} */
            var inputParams = this.formParams.inputParams[index];
            if (!event && this.inputForm.get(inputParams.id).value) {
                if (this.inputContainers[index + 1]) {
                    this.inputContainers[index + 1].focus();
                }
                else {
                    this.lastInpField.emit();
                }
            }
            this.dropdownOpen.emit(event);
        };
        /**
         * @param {?} value
         * @param {?} i
         * @return {?}
         */
        MuFormContainerComponent.prototype.valueEntered = function (value, i) {
            /** @type {?} */
            var inputParams = this.formParams.inputParams[i];
            if (inputParams.displayType === core.DISPLAY_TYPE.AUTOCOMPLETE_SELECT) {
                /** @type {?} */
                var option = inputParams.options.find(( /**
                 * @param {?} option
                 * @return {?}
                 */function (/**
                 * @param {?} option
                 * @return {?}
                 */ option) { return option.value === value; }));
                option ? this.inputForm.get(inputParams.id).setValue(option)
                    : this.inputForm.get(inputParams.id).setValue({ id: value, value: value });
                if (this.eventPropagate)
                    this.onSubmit(false, inputParams.id);
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        MuFormContainerComponent.prototype.enterOnLastInput = function (event) {
            this.lastInpField.emit(event);
        };
        /*=====================================================================
                                      PRIVATE
          =====================================================================*/
        /**
         * @private
         * @return {?}
         */
        MuFormContainerComponent.prototype.initialize = function () {
            var e_4, _a;
            var _this = this;
            var _loop_1 = function (params) {
                /** @type {?} */
                var formValidations = [];
                if (params.isRequired)
                    formValidations.push(forms.Validators.required);
                if (params.validators)
                    formValidations.push(forms.Validators.pattern(params.validators.validation));
                switch (params.displayType) {
                    case core.DISPLAY_TYPE.INPUT_BOX:
                    case core.DISPLAY_TYPE.TEXT_AREA:
                    case core.DISPLAY_TYPE.RADIO:
                    case core.DISPLAY_TYPE.ROW_RADIO:
                    case core.DISPLAY_TYPE.SELECTION_BOX:
                    case core.DISPLAY_TYPE.TOGGLE:
                    case core.DISPLAY_TYPE.MULTI_CHECK_BOX:
                    case core.DISPLAY_TYPE.BUTTON_TOGGLE:
                    case core.DISPLAY_TYPE.ROW_INPUT_BOX:
                    case core.DISPLAY_TYPE.TIME:
                        this_1.inputForm.addControl(params.id, new forms.FormControl(params.value || null, formValidations));
                        if (params.options && params.options.length) {
                            /** @type {?} */
                            var selectedValues_1 = [];
                            params.options.forEach(( /**
                             * @param {?} opt
                             * @return {?}
                             */function (/**
                             * @param {?} opt
                             * @return {?}
                             */ opt) {
                                if (opt.selected)
                                    selectedValues_1.push(opt);
                            }));
                            if (selectedValues_1.length)
                                this_1.inputForm.get(params.id).setValue(selectedValues_1[0]);
                        }
                        this_1.setInputDisabled(params.id, params.isDisabled);
                        break;
                    case core.DISPLAY_TYPE.AUTOCOMPLETE_SELECT:
                        this_1.inputForm.addControl(params.id, new forms.FormControl(params.value || null, formValidations));
                        this_1.filteredOptions = this_1.inputForm.valueChanges.pipe(operators.startWith(''), operators.map(( /**
                         * @param {?} value
                         * @return {?}
                         */function (/**
                         * @param {?} value
                         * @return {?}
                         */ value) { return typeof value === 'string' ? value : value.value; })), operators.map(( /**
                         * @param {?} value
                         * @return {?}
                         */function (/**
                         * @param {?} value
                         * @return {?}
                         */ value) { return value ? _this.filterOptions(value, params)
                            : params.options.slice(); })));
                        this_1.setInputDisabled(params.id, params.isDisabled);
                        break;
                    case core.DISPLAY_TYPE.CALENDAR_BOX:
                        if (params.value)
                            params.value = new Date(params.value);
                        formValidations.push(InputValidator.futureDateValidator);
                        this_1.inputForm.addControl(params.id, new forms.FormControl(params.value || null, formValidations));
                        this_1.setInputDisabled(params.id, params.isDisabled);
                        break;
                    case core.DISPLAY_TYPE.DATE_RANGE:
                        if (!params.value)
                            params.value = {};
                        /** @type {?} */
                        var valiArr = [InputValidator.dateValidator];
                        if (!params.validators || !params.validators.allowFutureDate)
                            valiArr.push(InputValidator.futureDateValidatorIfAllowed);
                        this_1.inputForm.addControl(params.id, new forms.FormGroup({
                            startDate: new forms.FormControl(params.value['startDate'] ? new Date(params.value.startDate)
                                : null, formValidations),
                            endDate: new forms.FormControl(params.value['endDate'] ? new Date(params.value.endDate)
                                : null, formValidations),
                        }, {
                            validators: valiArr
                        }));
                        this_1.setInputDisabled(params.id, params.isDisabled);
                        break;
                    case core.DISPLAY_TYPE.NUMBER_RANGE:
                        if (!params.value)
                            params.value = {};
                        this_1.inputForm.addControl(params.id, new forms.FormGroup({
                            minAmount: new forms.FormControl(params.value['minAmount'] || null, formValidations),
                            maxAmount: new forms.FormControl(params.value['maxAmount'] || null, formValidations),
                        }, {
                            validators: [InputValidator.amountValidator]
                        }));
                        this_1.setInputDisabled(params.id, params.isDisabled);
                        break;
                }
            };
            var this_1 = this;
            try {
                for (var _b = __values(this.formParams.inputParams), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var params = _c.value;
                    _loop_1(params);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
            if (this.formParams.formValidators)
                this.inputForm.setValidators(this.formParams.formValidators.validation);
        };
        /**
         * @private
         * @param {?} inputText
         * @param {?} params
         * @return {?}
         */
        MuFormContainerComponent.prototype.filterOptions = function (inputText, params) {
            /** @type {?} */
            var filterValue = inputText.toLowerCase();
            return params.options.filter(( /**
             * @param {?} option
             * @return {?}
             */function (/**
             * @param {?} option
             * @return {?}
             */ option) { return (( /** @type {?} */(option.value))).toLowerCase().includes(filterValue); }));
        };
        /**
         * @private
         * @param {?} id
         * @param {?} value
         * @return {?}
         */
        MuFormContainerComponent.prototype.setInputDisabled = function (id, value) {
            value ? this.inputForm.get(id).disable() : this.inputForm.get(id).enable();
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        MuFormContainerComponent.prototype.isDateObj = function (value) {
            /** @type {?} */
            var isDate;
            switch (typeof value) {
                case "string":
                    isDate = !isNaN(Date.parse(value));
                    break;
                case "object":
                    isDate = value instanceof Date
                        ? !isNaN(value.getTime())
                        : false;
                    break;
                default: isDate = false;
            }
            return isDate;
        };
        /*=====================================================================
                                      UTILS
          =====================================================================*/
        /**
         * @param {?} index
         * @return {?}
         */
        MuFormContainerComponent.prototype.focusElement = function (index) {
            this.inputContainers[index].focus();
        };
        /**
         * @param {?} formIds
         * @return {?}
         */
        MuFormContainerComponent.prototype.updateValidators = function (formIds) {
            var _loop_2 = function (i) {
                /** @type {?} */
                var form = this_2.inputForm.get(formIds[i]);
                if (form) {
                    /** @type {?} */
                    var params = this_2.formParams.inputParams.find(( /**
                     * @param {?} val
                     * @return {?}
                     */function (/**
                     * @param {?} val
                     * @return {?}
                     */ val) { return val.id === formIds[i]; }));
                    if (params) {
                        if (params.isDisabled) {
                            form.disable();
                        }
                        else {
                            form.enable();
                        }
                    }
                }
            };
            var this_2 = this;
            for (var i = 0; i < formIds.length; i++) {
                _loop_2(i);
            }
        };
        return MuFormContainerComponent;
    }());
    MuFormContainerComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mu-form-container',
                    template: "<div class=\"mu-form-container-comp\" [formGroup]=\"inputForm\"\n[class.vertical-mode]=\"displayMode === DISPLAY_MODE.VERTICAL\"\n[ngClass.xl]=\"webMode ? ['web-form-container-comp'] : ['web-view-input-comp']\"\n[ngClass.lg]=\"webMode ? ['web-form-container-comp'] : ['web-view-input-comp']\"\n[ngClass.md]=\"webMode ? ['web-form-container-comp'] : ['web-view-input-comp']\"\n[ngClass.sm]=\"webMode ? ['web-form-container-comp'] : ['web-view-input-comp']\">\n\n  <ng-container *ngFor=\"let inputParam of formParams.inputParams; let i = index\">\n    <div *ngIf=\"(inputParam.isVisible === undefined || inputParam.isVisible)\" class=\"main-input-cont\"  \n      adjustElements [displayInSingleRow]=\"displayCount\" [elementIndex]=\"i\" [webMode]=\"webMode\">\n\n      <div class=\"label-txt txt-lg-reg-norm\"\n        *ngIf=\"displayLabel && inputParam.label && inputParam.displayType !== DISPLAY_TYPE.ROW_INPUT_BOX\">\n        {{ inputParam.label }}\n        <span class=\"red-asterix error-text\" *ngIf=\"inputParam.isRequired\">\n          *\n        </span>\n      </div>\n\n      <ng-container [ngSwitch]=\"inputParam.displayType\">\n\n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.INPUT_BOX\">\n\n          <div *ngIf=\"!inputParam.withoutBorder\" \n          class=\"onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParam.isDisabled\">\n\n            <div class=\"prefix-image\" *ngIf=\"inputParam?.image?.prefixParams\">\n              <i class=\"{{ inputParam.image.prefixParams?.iconClass }}\"></i>\n              <img src=\"{{ inputParam.image.prefixParams?.imgUrl }}\">\n            </div>\n\n            <input matInput #inputCont\n            \n              placeholder=\"{{inputParam.placeHolder}}\"\n              type=\"{{inputParam.inputType || 'text'}}\"\n              [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n              (onSubmit)=\"enterOnLastInput($event)\"\n              (updatedValue)=\"setChangedValues($event, i)\"\n              class=\"txt-lg-med-norm input-cont\" \n              formControlName=\"{{ inputParam.id }}\"\n              name=\"{{ inputParam.name || 'input-text' }}\"\n              [ncMaxLength]=\"inputParam.maxLength || 1000\"\n              textSecurity=\"inputParam.isPassword\"\n              format=\"{{ inputParam.format }}\"\n              [class.num-password-input]=\"inputParam.isPassword\"\n              autocomplete=\"{{ inputParam.autoComplete || 'off'}}\"\n              [keyboard]=\"parentCont\">\n\n            <div class=\"suffix-image\" *ngIf=\"inputParam?.image?.suffixParams\">\n              <i class=\"{{ inputParam.image.suffixParams?.iconClass }}\"></i>\n              <img src=\"{{ inputParam.image.suffixParams?.imgUrl }}\">\n            </div>\n\n          </div>\n\n          <mat-form-field *ngIf=\"inputParam.withoutBorder\" class=\"onb-input-box-cont mat-input-box-cont\" \n            [class.border-disabled]=\"inputParam.isDisabled\">\n\n            <div class=\"prefix-image\" *ngIf=\"inputParam?.image?.prefixParams\">\n              <i class=\"{{ inputParam.image.prefixParams?.iconClass }}\"></i>\n              <img src=\"{{ inputParam.image.prefixParams?.imgUrl }}\">\n            </div>\n\n\n            <input matInput #inputCont\n              placeholder=\"{{inputParam.placeHolder}}\"\n              type=\"{{inputParam.inputType || 'text'}}\"\n              [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n              (onSubmit)=\"enterOnLastInput($event)\"\n              (updatedValue)=\"setChangedValues($event, i)\"\n              class=\"txt-lg-med-norm input-cont mat-input-cont\" \n              formControlName=\"{{ inputParam.id }}\"\n              name=\"{{ inputParam.name || 'input-text' }}\"\n              [ncMaxLength]=\"inputParam.maxLength || 1000\"\n              format=\"{{ inputParam.format }}\"\n              textSecurity=\"inputParam.isPassword\"\n              [class.num-password-input]=\"inputParam.isPassword\"\n              autocomplete=\"{{ inputParam.autoComplete || 'off'}}\"\n              [keyboard]=\"parentCont>\n\n            <div class=\"suffix-image\" *ngIf=\"inputParam?.image?.suffixParams\">\n              <i class=\"{{ inputParam.image.suffixParams?.iconClass }}\"></i>\n              <img src=\"{{ inputParam.image.suffixParams?.imgUrl }}\">\n            </div>\n\n          </mat-form-field>\n          \n        </ng-container> \n        \n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.TIME\">\n\n          <div *ngIf=\"!inputParam.withoutBorder\" class=\"onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParam.isDisabled\">\n\n            <input matInput #inputCont\n            \n              placeholder=\"{{inputParam.placeHolder}}\"\n              type=\"time\"\n              [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n              (onSubmit)=\"enterOnLastInput($event)\"\n              (updatedValue)=\"setChangedValues($event, i)\"\n              class=\"txt-lg-med-norm input-cont\" \n              formControlName=\"{{ inputParam.id }}\"\n              name=\"{{ inputParam.name || 'input-time' }}\"\n              [keyboard]=\"parentCont\"\n              step=\"1\">\n\n          </div>\n        </ng-container> \n        \n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.TEXT_AREA\">\n          <div class=\"onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParam.isDisabled\">\n            <textarea matInput #inputCont\n              placeholder=\"{{ inputParam.placeHolder }}\"\n              type=\"{{ inputParam.inputType || 'text' }}\"\n              (updatedValue)=\"setChangedValues($event, i)\"\n              class=\"txt-lg-med-norm input-cont\" \n              formControlName=\"{{ inputParam.id }}\"\n              name=\"{{ inputParam.name || 'input-text' }}\"\n              [ncMaxLength]=\"inputParam.maxLength || 1000\"\n              format=\"{{ inputParam.format }}\"\n              textSecurity=\"inputParam.isPassword\"\n              [class.num-password-input]=\"inputParam.isPassword\"\n              autocomplete=\"off\"\n              [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n              (onSubmit)=\"enterOnLastInput($event)\"\n              [keyboard]=\"parentCont\">\n            </textarea> \n          </div>\n        </ng-container>  \n      \n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.SELECTION_BOX\">\n\n          <ng-template #selectBox>\n\n            <mat-select #inputCont\n              formControlName=\"{{ inputParam.id }}\"\n              customTrigger=\"inputCont\"\n              [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n              (onSubmit)=\"enterOnLastInput($event)\"\n              placeholder=\"{{ inputParam.placeHolder }}\" \n              class=\"txt-lg-med-norm input-cont\"\n              (selectionChange)=\"selectedOption($event, i)\"\n              (openedChange)=\"dropDownToggle($event, i)\">\n              <mat-option *ngFor=\"let option of inputParam.options\" [value]=\"option\"\n                class=\"txt-lg-med-norm\">\n                {{ option.value }}\n              </mat-option>\n            </mat-select>\n          </ng-template>\n\n          <div *ngIf=\"!inputParam.withoutBorder\" class=\"onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParam.isDisabled\">\n\n            <ng-container>\n\n              <ng-container \n                *ngTemplateOutlet=\"selectBox\">\n              </ng-container>\n\n            </ng-container>\n\n          </div>  \n\n          <ng-container *ngIf=\"inputParam.withoutBorder\">\n\n            <mat-form-field class=\"onb-input-box-cont mat-input-box-cont\">\n\n              <mat-select #inputCont\n                formControlName=\"{{ inputParam.id }}\"\n                customTrigger=\"inputCont\"\n                [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n                (onSubmit)=\"enterOnLastInput($event)\"\n                placeholder=\"{{ inputParam.placeHolder }}\" \n                class=\"txt-lg-med-norm input-cont mat-input-cont\"\n                (selectionChange)=\"selectedOption($event, i)\"\n                (openedChange)=\"dropDownToggle($event, i)\">\n                <mat-option *ngFor=\"let option of inputParam.options\" [value]=\"option\"\n                  class=\"txt-lg-med-norm\">\n                  {{ option.value }}\n                </mat-option>\n                \n              </mat-select>\n\n            </mat-form-field>\n\n          </ng-container>\n\n        </ng-container>\n\n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.MULTI_CHECK_BOX\">\n          <div class=\"checkbox-cont\">\n            <mat-checkbox *ngFor=\"let option of inputParam.options\" [value]=\"option\"\n              class=\"txt-lg-med-norm checkbox\"\n              [checked]=\"option.selected\"\n              (change)=\"checkedOption($event, option, i)\">\n              {{ option.value }}\n            </mat-checkbox>\n          </div>\n        </ng-container>\n        \n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.RADIO\">\n          <mat-radio-group\n            formControlName=\"{{ inputParam.id }}\"\n            class=\"txt-lg-med-norm input-cont radio-group\"\n            (change)=\"selectedOption($event, i)\">\n            <mat-radio-button *ngFor=\"let option of inputParam.options\" [value]=\"option\" \n              class=\"txt-lg-med-norm radio-button\"\n              [checked]=\"option.selected\">\n              {{ option.value }}\n            </mat-radio-button>\n          </mat-radio-group>\n        </ng-container>\n\n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.ROW_RADIO\">\n          <mat-radio-group \n            formControlName=\"{{ inputParam.id }}\"\n            class=\"txt-lg-med-norm vert-input-cont vert-radio-group\"\n            (change)=\"selectedOption($event, i)\">\n            <mat-radio-button  *ngFor=\"let option of inputParam.options\" [value]=\"option\" \n              class=\"txt-lg-med-norm radio-button\"\n              [checked]=\"option.selected\">\n              {{ option.value }}\n            </mat-radio-button>\n          </mat-radio-group>\n        </ng-container>\n\n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.TOGGLE\">\n          <mat-slide-toggle class=\"toggle-cont\"\n            (change)=\"onToggleChane($event, i)\">\n          </mat-slide-toggle>\n        </ng-container>\n\n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.CALENDAR_BOX\">\n          <div class=\"onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParam.isDisabled\">\n            <input matInput #inputCont\n              formControlName=\"{{ inputParam.id }}\"\n              [matDatepicker]=\"picker\" \n              (dateChange)=\"setDate($event, i)\"\n              [max]=\"inputParam.validators && inputParam.validators.allowFutureDate ? null : maxDate\"\n              placeholder=\"{{ inputParam.placeHolder }}\"\n              class=\"txt-lg-med-norm input-cont\"\n              name=\"{{ inputParam.name || 'input-text' }}\"\n              [ncMaxLength]=\"inputParam.maxLength || 10\"\n              format=\"{{ inputParam.format }}\"\n              [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n              (onSubmit)=\"enterOnLastInput($event)\"\n              autocomplete=\"{{ inputParam.autoComplete || 'off'}}\"\n              [keyboard]=\"parentCont\">\n            <mat-datepicker-toggle matSuffix [for]=\"picker\" \n            disableRipple=\"false\"></mat-datepicker-toggle>\n            <mat-datepicker touchUi #picker></mat-datepicker>\n          </div>\n        </ng-container>\n\n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.DATE_RANGE\" formGroupName=\"{{ inputParam.id }}\">\n          <div class=\"range\">\n            <div class=\"range-onb-input-box-cont border-primary\">\n              <input matInput #inputCont\n                formControlName=\"startDate\"\n                [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n                [matDatepicker]=\"startPicker\" \n                (dateChange)=\"setDateRange($event, i)\"\n                placeholder=\"{{ inputParam.placeHolder[0] }}\"\n                class=\"txt-lg-med-norm input-cont\"\n                name=\"{{ inputParam.name || 'input-text' }}\"\n                autocomplete=\"{{ inputParam.autoComplete || 'off'}}\"\n                [keyboard]=\"parentCont\">\n              <mat-datepicker-toggle matSuffix [for]=\"startPicker\" disableRipple=\"false\"></mat-datepicker-toggle>\n              <mat-datepicker touchUi #startPicker></mat-datepicker>\n            </div>\n\n            <div class=\"range-onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParam.isDisabled\">\n              <input matInput #inputCont\n                formControlName=\"endDate\"\n                [matDatepicker]=\"endPicker\" \n                [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n                (dateChange)=\"setDateRange($event, i)\"\n                placeholder=\"{{ inputParam.placeHolder[1] }}\"\n                class=\"txt-lg-med-norm input-cont\"\n                [keyboard]=\"parentCont\">\n              <mat-datepicker-toggle matSuffix [for]=\"endPicker\" disableRipple=\"false\"></mat-datepicker-toggle>\n              <mat-datepicker touchUi #endPicker></mat-datepicker>\n            </div>\n          </div>\n        </ng-container>\n\n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.NUMBER_RANGE\" formGroupName=\"{{ inputParam.id }}\">\n          <div class=\"range\">\n            <div class=\"range-onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParam.isDisabled\">\n              <input matInput #inputCont\n                placeholder=\"{{ inputParam.placeHolder[0] }}\"\n                type=\"number\"\n                (input)=\"setNumberRange($event, i)\"\n                class=\"txt-lg-med-norm input-cont\" \n                formControlName=\"minAmount\"\n                name=\"{{ inputParam.name || 'input-text' }}\"\n                textSecurity=\"inputParam.isPassword\"\n                [class.num-password-input]=\"inputParam.isPassword\"\n                autocomplete=\"{{ inputParam.autoComplete || 'off'}}\"\n                [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n                [keyboard]=\"parentCont\">\n            </div>\n        \n            <div class=\"range-onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParam.isDisabled\">\n              <input matInput #inputCont\n                placeholder=\"{{ inputParam.placeHolder[1] }}\"\n                type=\"number\"\n                (input)=\"setNumberRange($event, i)\"\n                class=\"txt-lg-med-norm input-cont\" \n                formControlName=\"maxAmount\"\n                name=\"{{ inputParam.name || 'input-text' }}\"\n                textSecurity=\"inputParam.isPassword\"\n                [class.num-password-input]=\"inputParam.isPassword\"\n                autocomplete=\"{{ inputParam.autoComplete || 'off'}}\"\n                [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n                [keyboard]=\"parentCont\">\n            </div>\n          </div>\n        </ng-container>\n\n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.AUTOCOMPLETE_SELECT\">\n          <div class=\"onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParam.isDisabled\">\n            <input matInput #autoCompInput #inputCont\n              type=\"text\"\n              class=\"txt-lg-med-norm input-cont\" \n              placeholder=\"{{ inputParam.placeHolder }}\"\n              formControlName=\"{{ inputParam.id }}\"\n              [matAutocomplete]=\"auto\"\n              [keyboard]=\"parentCont\"\n              name=\"{{ inputParam.name || 'input-text' }}\"\n              autocomplete=\"{{ inputParam.autoComplete || 'off'}}\"\n              [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n              (onSubmit)=\"enterOnLastInput($event)\"\n              (blur)=\"valueEntered(autoCompInput.value, i)\">\n\n            <mat-autocomplete #auto=\"matAutocomplete\" [displayWith]=\"displayFn\"\n              (optionSelected)=\"setAutocompleteValue($event, i)\"\n              class=\"txt-xl-med-norm input-cont\">\n              <mat-option *ngFor=\"let option of filteredOptions | async\" [value]=\"option\"\n                class=\"txt-lg-med-norm\">\n                {{ option.value }}\n              </mat-option>\n            </mat-autocomplete>\n          </div>\n        </ng-container>\n\n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.BUTTON_TOGGLE\">\n          <mat-button-toggle-group name=\"toggle\" class=\"button-toggle\" #group=\"matButtonToggleGroup\">\n\n            <ng-container *ngFor=\"let option of inputParam.options ; let j = index\">\n              <mat-button-toggle value=\"{{ option.id }}\" class=\"txt-lg-reg-norm\"\n                [checked]=\"option.selected\"\n                [ngClass]=\"{ 'primary-bg' : group.value === option.id, 'text-color-white' : group.value === option.id}\"\n                (change)=\"onBtnToggleChange($event, i)\">\n                {{ option.value }}\n              </mat-button-toggle>\n            </ng-container>\n\n          </mat-button-toggle-group>\n\n        </ng-container>\n\n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.ROW_INPUT_BOX\">\n          \n          <div class=\"input-container\">\n\n            <div class=\"label-txt txt-lg-reg-norm\" *ngIf=\"displayLabel && inputParam.label\">\n              {{ inputParam.label }} \n              <span class=\"red-asterix error-text\" *ngIf=\"inputParam.isRequired\">\n                *\n              </span>  \n            </div>\n\n            <div class=\"onb-input-box-cont border-primary small-box\" [class.border-disabled]=\"inputParam.isDisabled\">\n              <input matInput inputCont\n                placeholder=\"{{ inputParam.placeHolder }}\"\n                type=\"{{inputParam.inputType || 'text'}}\"\n                (updatedValue)=\"setChangedValues($event, i)\"\n                class=\"txt-lg-med-norm input-cont\" \n                formControlName=\"{{ inputParam.id }}\"\n                name=\"{{ inputParam.name || 'input-text' }}\"\n                [ncMaxLength]=\"inputParam.maxLength || 1000\"\n                format=\"{{ inputParam.format }}\"\n                textSecurity=\"inputParam.isPassword\"\n                [class.num-password-input]=\"inputParam.isPassword\"\n                autocomplete=\"{{ inputParam.autoComplete || 'off'}}\"\n                [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n                (onSubmit)=\"enterOnLastInput($event)\"\n                [keyboard]=\"parentCont\">\n            </div>\n\n          </div>  \n        </ng-container>\n\n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.IMAGE_UPLOAD\">\n          <file-upload\n            [screen]=\"screen\"\n            (value)=\"fileUploadValue($event, inputParam.id)\"\n            [isRequired]=\"inputParam.isRequired\">\n          </file-upload>  \n        </ng-container> \n\n      </ng-container>\n\n      <div *ngIf=\"inputParam.displayType !== DISPLAY_TYPE.DATE_RANGE &&\n        inputParam.displayType !== DISPLAY_TYPE.NUMBER_RANGE\" class=\"errors-list\" [class.mat-errors-list]=\"inputParam.withoutBorder\">\n\n        <mat-error class=\"txt-sm-reg-norm error-text\"\n          *ngIf=\"inputForm.get(inputParam.id).touched && inputParam.isRequired && \n          inputForm.get(inputParam.id).hasError('required')\">\n          <span *ngIf=\"inputParam.displayType === DISPLAY_TYPE.RADIO || \n            inputParam.displayType === DISPLAY_TYPE.SELECTION_BOX ||\n            inputParam.displayType === DISPLAY_TYPE.MULTI_CHECK_BOX ; else default\" class=\"err-text\">\n            {{ inputParam.validators ? inputParam.validators.validationError : ('mu_inpt_cont_sel_err' | translate) }}\n          </span>\n          <ng-template #default>\n            {{ inputParam.validators ? inputParam.validators.validationError : ('mu_inpt_cont_val_err' | translate) }}\n          </ng-template>\n        </mat-error>\n\n        <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputForm.get(inputParam.id).touched\n          && inputForm.get(inputParam.id).value && inputForm.get(inputParam.id).hasError('pattern')\">\n          {{ inputParam.validators ? inputParam.validators.validationError : ('mu_inpt_cont_val_err' | translate) }}\n        </mat-error>\n\n        <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputForm.get(inputParam.id).touched\n          && inputForm.get(inputParam.id).value && inputForm.get(inputParam.id).hasError('invalid') \n          && !inputForm.get(inputParam.id).hasError('pattern')\">\n          {{ formParams.formValidators.errorMsg }}\n        </mat-error>\n\n        <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputForm.get(inputParam.id).touched &&\n          inputForm.get(inputParam.id).errors && inputForm.get(inputParam.id).hasError('futureDate')\">\n          {{ 'mu_inpt_cont_futr_date_err' | translate }}\n        </mat-error>\n      </div>\n\n      <div *ngIf=\"inputParam.displayType === DISPLAY_TYPE.DATE_RANGE\" class=\"errors-list\">\n        <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputForm.get(inputParam.id).hasError('noStartDate')\">\n          {{ 'mu_inpt_cont_strt_date_err' | translate }}\n        </mat-error>\n\n        <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputForm.get(inputParam.id).hasError('startDateExceed')\">\n          {{ 'mu_inpt_cont_date_err' | translate }}\n        </mat-error>\n\n        <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputForm.get(inputParam.id).hasError('futureDate') || \n          inputForm.get(inputParam.id).hasError('futureDate')\">\n          {{ 'mu_inpt_cont_futr_date_err' | translate }}\n        </mat-error>\n\n        <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputParam.isRequired && \n          inputForm.get(inputParam.id).touched && inputForm.get(inputParam.id).hasError('required')\">\n          {{ inputParam.validators ? inputParam.validators.validationError : ('mu_inpt_cont_val_err' | translate) }}\n        </mat-error>\n      </div>\n\n      <div *ngIf=\"inputParam.displayType === DISPLAY_TYPE.NUMBER_RANGE\" class=\"errors-list\">\n        <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputForm.get(inputParam.id).hasError('noMinAmount')\">\n          {{ 'mu_inpt_cont_min_amnt_err' | translate }}\n        </mat-error>\n      \n        <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputForm.get(inputParam.id).hasError('minAmountExceed')\">\n          {{ 'mu_inpt_cont_amnt_err' | translate }}\n        </mat-error>\n\n        <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputParam.isRequired && \n          inputForm.get(inputParam.id).touched && inputForm.get(inputParam.id).hasError('required')\">\n          {{ inputParam.validators ? inputParam.validators.validationError : ('mu_inpt_cont_val_err' | translate) }}\n        </mat-error>\n      </div>\n\n\n      <!-- <div *ngIf=\"inputForm && inputParam.displayType === DISPLAY_TYPE.DATE_RANGE\" class=\"errors-list\">\n        <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\" (inputForm.get('startDate').touched && \n          inputForm.get('endDate').touched) && inputForm.get('startDate').value && !inputForm.get('endDate').value\">\n          {{ 'mu_inpt_cont_end_date_err' | translate }}\n        </mat-error>\n      </div> -->\n\n    </div>\n  </ng-container>  \n\n</div>",
                    styles: [":host{width:100%}.onb-input-box-cont{align-items:center;border-style:solid;border-width:2px;display:flex;margin:2% 0 0;position:relative}.mat-errors-list{bottom:0;left:0;position:absolute}.mat-input-box-cont{border:none!important}.mu-form-container-comp{display:flex;flex-direction:row;flex-wrap:wrap;position:relative}.button-toggle{margin:2vw 0}.main-input-cont{margin:2vw 0;position:relative}.input-container{align-items:center;display:flex;justify-content:space-between;position:relative}.input-container .label-txt{margin-right:2vw;width:72vw}.input-container .small-box{width:14vw}.input-container .input-cont,.input-container .mat-input-cont{text-align:center}.radio-button{padding-bottom:2vw!important}.radio-group{display:flex;flex-direction:column;padding:3vw 0 0 2vw!important}.checkbox,.checkbox-cont{padding:1vw 0}.checkbox-cont{display:flex;flex-direction:column;position:relative}.range-onb-input-box-cont{align-items:center;border-style:solid;border-width:2px;display:flex;position:relative;width:46%}.input-cont,.range-onb-input-box-cont .input-cont{background:none;border:0;padding:4vw;position:relative;width:100%}.mat-input-cont{padding:0!important}.toggle-cont{margin:2vw 0}.input-cont-comp{margin:2vw 4vw;position:relative}.range{display:flex;flex-direction:row;justify-content:space-between}.errors-list{display:flex;flex-direction:column;padding-top:1vw}.web-form-container-comp .main-input-cont{margin:10px 0}.web-form-container-comp .input-cont,.web-form-container-comp .range-onb-input-box-cont .input-cont{background:none;border:0;padding:15px;position:relative;width:100%}.web-form-container-comp .main-input-cont{padding:0}.web-form-container-comp .errors-list{padding-top:5px}.web-form-container-comp .radio-button{padding-bottom:10px!important}.web-form-container-comp .radio-group{padding:5px 0!important}.web-view-input-comp .main-input-cont{margin:10px 0}.web-view-input-comp .range-onb-input-box-cont{align-items:center;border-style:solid;border-width:2px;display:flex;margin:.5% 0;position:relative;width:48%}.web-view-input-comp .mat-input-box{border:0!important}.web-view-input-comp .input-cont{background:none;border:0;padding:15px;position:relative;width:100%}.web-view-input-comp .errors-list{padding-top:5px}.web-view-input-comp .radio-button{padding-bottom:10px!important}.web-view-input-comp .radio-group{padding:5px 0!important}.web-view-input-comp .vert-radio-group{padding:8px 0!important}.web-view-input-comp .vert-radio-group .radio-button{padding-right:10px!important}.vertical-mode .checkbox,.vertical-mode .radio-group{padding:5px 0!important}.vertical-mode .radio-button{padding:8px 0!important}.vertical-mode .checkbox-cont{padding:5px 0}.prefix-image,.suffix-image{padding:0 10px}"]
                }] }
    ];
    /** @nocollapse */
    MuFormContainerComponent.ctorParameters = function () { return [
        { type: RunContextBrowser, decorators: [{ type: i0.Inject, args: ['RunContext',] }] },
        { type: forms.FormBuilder },
        { type: i0.ChangeDetectorRef }
    ]; };
    MuFormContainerComponent.propDecorators = {
        picker: [{ type: i0.ViewChildren, args: [datepicker.MatDatepicker,] }],
        fileUplInst: [{ type: i0.ViewChild, args: [FileUploadComponent, { static: false },] }],
        inputCont: [{ type: i0.ViewChildren, args: ['inputCont',] }],
        formParams: [{ type: i0.Input }],
        screen: [{ type: i0.Input }],
        webMode: [{ type: i0.Input }],
        parentCont: [{ type: i0.Input }],
        eventPropagate: [{ type: i0.Input }],
        displayMode: [{ type: i0.Input }],
        displayLabel: [{ type: i0.Input }],
        displayCount: [{ type: i0.Input }],
        value: [{ type: i0.Output }],
        dropdownOpen: [{ type: i0.Output }],
        lastInpField: [{ type: i0.Output }]
    };
    if (false) {
        /** @type {?} */
        MuFormContainerComponent.prototype.picker;
        /** @type {?} */
        MuFormContainerComponent.prototype.fileUplInst;
        /** @type {?} */
        MuFormContainerComponent.prototype.inputCont;
        /** @type {?} */
        MuFormContainerComponent.prototype.formParams;
        /** @type {?} */
        MuFormContainerComponent.prototype.screen;
        /** @type {?} */
        MuFormContainerComponent.prototype.webMode;
        /** @type {?} */
        MuFormContainerComponent.prototype.parentCont;
        /** @type {?} */
        MuFormContainerComponent.prototype.eventPropagate;
        /** @type {?} */
        MuFormContainerComponent.prototype.displayMode;
        /** @type {?} */
        MuFormContainerComponent.prototype.displayLabel;
        /** @type {?} */
        MuFormContainerComponent.prototype.displayCount;
        /** @type {?} */
        MuFormContainerComponent.prototype.value;
        /** @type {?} */
        MuFormContainerComponent.prototype.dropdownOpen;
        /** @type {?} */
        MuFormContainerComponent.prototype.lastInpField;
        /** @type {?} */
        MuFormContainerComponent.prototype.inputForm;
        /** @type {?} */
        MuFormContainerComponent.prototype.filteredOptions;
        /** @type {?} */
        MuFormContainerComponent.prototype.DISPLAY_TYPE;
        /** @type {?} */
        MuFormContainerComponent.prototype.DISPLAY_MODE;
        /** @type {?} */
        MuFormContainerComponent.prototype.maxDate;
        /** @type {?} */
        MuFormContainerComponent.prototype.inputContainers;
        /**
         * @type {?}
         * @private
         */
        MuFormContainerComponent.prototype.fileUploadParams;
        /**
         * @type {?}
         * @protected
         */
        MuFormContainerComponent.prototype.rc;
        /**
         * @type {?}
         * @private
         */
        MuFormContainerComponent.prototype.formBuilder;
        /**
         * @type {?}
         * @private
         */
        MuFormContainerComponent.prototype.changeRef;
    }

    /**
     * @record
     */
    function TableConfig() { }
    if (false) {
        /** @type {?} */
        TableConfig.prototype.headers;
        /** @type {?} */
        TableConfig.prototype.data;
        /** @type {?|undefined} */
        TableConfig.prototype.dispRows;
        /** @type {?|undefined} */
        TableConfig.prototype.enableSelect;
        /** @type {?|undefined} */
        TableConfig.prototype.enableRadio;
        /** @type {?|undefined} */
        TableConfig.prototype.enableFilter;
        /** @type {?|undefined} */
        TableConfig.prototype.enableDownload;
        /** @type {?|undefined} */
        TableConfig.prototype.selectedIndexes;
        /** @type {?|undefined} */
        TableConfig.prototype.lazyLoad;
        /** @type {?|undefined} */
        TableConfig.prototype.totalRecords;
        /** @type {?|undefined} */
        TableConfig.prototype.horizFilterParams;
        /** @type {?|undefined} */
        TableConfig.prototype.vertFilterParams;
        /** @type {?|undefined} */
        TableConfig.prototype.downloadFormats;
        /** @type {?|undefined} */
        TableConfig.prototype.stickyConfig;
    }
    /**
     * @record
     */
    function MuTableRowSelEvent() { }
    if (false) {
        /** @type {?} */
        MuTableRowSelEvent.prototype.rowIndex;
        /** @type {?} */
        MuTableRowSelEvent.prototype.rowData;
        /** @type {?} */
        MuTableRowSelEvent.prototype.isSelected;
        /** @type {?} */
        MuTableRowSelEvent.prototype.browserEvent;
    }
    /**
     * @record
     */
    function MuTableDetailEvent() { }
    if (false) {
        /** @type {?} */
        MuTableDetailEvent.prototype.id;
        /** @type {?} */
        MuTableDetailEvent.prototype.rowData;
    }
    /**
     * @record
     */
    function MuTableSelAllEvent() { }
    if (false) {
        /** @type {?} */
        MuTableSelAllEvent.prototype.selectedRows;
        /** @type {?} */
        MuTableSelAllEvent.prototype.isSelected;
    }
    /**
     * @record
     */
    function MuTableClickEvent() { }
    if (false) {
        /** @type {?} */
        MuTableClickEvent.prototype.rowIndex;
        /** @type {?} */
        MuTableClickEvent.prototype.headerKey;
        /** @type {?|undefined} */
        MuTableClickEvent.prototype.rowData;
        /** @type {?|undefined} */
        MuTableClickEvent.prototype.navInfo;
    }
    /**
     * @record
     */
    function MuTableMoreDetail() { }
    if (false) {
        /** @type {?} */
        MuTableMoreDetail.prototype.id;
        /** @type {?} */
        MuTableMoreDetail.prototype.value;
    }
    /**
     * @record
     */
    function MuTableEditEvent() { }
    if (false) {
        /** @type {?} */
        MuTableEditEvent.prototype.rowIndex;
        /** @type {?} */
        MuTableEditEvent.prototype.rowData;
        /** @type {?} */
        MuTableEditEvent.prototype.editedValues;
    }
    var MuDataTableComponent = /** @class */ (function () {
        /**
         * @param {?} rc
         * @param {?} changeDet
         */
        function MuDataTableComponent(rc, changeDet) {
            this.rc = rc;
            this.changeDet = changeDet;
            this.loadMoreData = new i0.EventEmitter();
            this.onRowSelect = new i0.EventEmitter();
            this.onSelectAll = new i0.EventEmitter();
            this.onDetailClick = new i0.EventEmitter();
            this.onCellClick = new i0.EventEmitter();
            this.onRowEdit = new i0.EventEmitter();
            this.onDownload = new i0.EventEmitter();
            this.selectedFilter = new i0.EventEmitter();
            this.selectedIndexes = {};
            this.selAllMap = {};
            this.headerFields = [];
            this.dataToDisplay = [];
            this.pageNumbers = [];
            this.filterFields = [];
            this.dataMap = {};
            this.editForm = new forms.FormGroup({});
            this.COL_TYPE = core.COL_TYPE;
            this.DISPLAY_MODE = core.DISPLAY_MODE;
            if (rc.getLogLevel() === core.LOG_LEVEL.DEBUG)
                window['datatable'] = this;
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        MuDataTableComponent.prototype.ngOnChanges = function (changes) {
            this.tableConfig = changes['tableConfig'].currentValue;
            this.setUpTable();
        };
        /**
         * @return {?}
         */
        MuDataTableComponent.prototype.ngOnInit = function () {
            this.setUpTable();
        };
        /**
         * @return {?}
         */
        MuDataTableComponent.prototype.ngAfterViewInit = function () {
            /** @type {?} */
            var top = this.filterCont.nativeElement.offsetTop;
            this.filterCont.nativeElement.style.maxHeight = "calc(100% - " + top + "px)";
        };
        /*=====================================================================
                                      PRIVATE
          =====================================================================*/
        /**
         * @private
         * @return {?}
         */
        MuDataTableComponent.prototype.setUpTable = function () {
            var e_1, _a, e_2, _b;
            var _this = this;
            if (this.tableConfig) {
                try {
                    for (var _c = __values(this.tableConfig.headers), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var header = _d.value;
                        if (header.colType === core.COL_TYPE.TOGGLE)
                            this.isTogglePresent = true;
                        if (header.isEditable)
                            this.editForm.addControl(header.dataKey, new forms.FormControl());
                        this.headerFields.push(header.dataKey);
                        if (this.tableConfig.enableFilter &&
                            (header.colType === core.COL_TYPE.HYPER_LINK ||
                                header.colType === core.COL_TYPE.TEXT)) {
                            this.filterFields.push(header.dataKey);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                if (this.tableConfig.selectedIndexes)
                    this.tableConfig.selectedIndexes.map(( /**
                     * @param {?} index
                     * @return {?}
                     */function (/**
                     * @param {?} index
                     * @return {?}
                     */ index) { return _this.selectedIndexes[index] = true; }));
                this.tableConfig.totalRecords = this.tableConfig.totalRecords || this.tableConfig.data.length;
                this.tableConfig.dispRows = this.tableConfig.dispRows || this.tableConfig.data.length;
                this.createDataMap(this.tableConfig.data, 0);
                this.createPageNumbers();
            }
            if (this.tableConfig.stickyConfig && this.tableConfig.stickyConfig.noOfCols > 0) {
                this.stickyInfo = this.tableConfig.stickyConfig;
                if (this.stickyInfo && !this.stickyInfo.nonStickyWidth) {
                    // Use 200% width for default, so table can scroll max double of its width
                    this.stickyInfo.nonStickyWidth = 200 - this.stickyInfo.stickyWidth;
                }
                /** @type {?} */
                var nSColWidth = this.stickyInfo.nonStickyWidth / (this.tableConfig.headers.length - this.stickyInfo.noOfCols);
                try {
                    for (var _e = __values(this.tableConfig.headers), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var header = _f.value;
                        if (header.widthPerc) {
                            this.stickyInfo.nonStickyWidth += header.widthPerc - nSColWidth;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                this.stickyInfo.nonStickyWidth = Math.max((100 - this.stickyInfo.stickyWidth), this.stickyInfo.nonStickyWidth);
            }
        };
        /**
         * Creates the page numbers needed for pagination
         * Called during initialization of table and updation of data inside table
         * @private
         * @return {?}
         */
        MuDataTableComponent.prototype.createPageNumbers = function () {
            this.pageNumbers = [];
            this.currPageIndex = this.prevPageIndex = this.pageIndex = 0;
            /** @type {?} */
            var totalPages = this.tableConfig.totalRecords / this.tableConfig.dispRows;
            if (this.tableConfig.totalRecords % this.tableConfig.dispRows)
                totalPages++;
            for (var pageNumber = 1; pageNumber <= totalPages; pageNumber++)
                this.pageNumbers.push(pageNumber);
        };
        /**
         * changes the pagenumbers according to the current selected page number
         * @private
         * @param {?} pageIndex
         * @return {?}
         */
        MuDataTableComponent.prototype.updatePageNumbers = function (pageIndex) {
            this.pageIndex = pageIndex - 2;
            if (this.pageIndex <= 0) {
                this.pageIndex = 0;
            }
            else {
                if (this.pageIndex >= (this.pageNumbers.length - 4))
                    this.pageIndex = this.pageNumbers.length - 5;
            }
        };
        /**
         * sends a callback to parent with main event and row data on click of radio button, checkbox or
         * toggle button so that parent can stop the default action
         * @param {?} event
         * @param {?} rowData
         * @return {?}
         */
        MuDataTableComponent.prototype.rowClick = function (event, rowData) {
            /** @type {?} */
            var selEvent = {
                rowData: rowData,
                rowIndex: rowData['rowIndex'],
                isSelected: this.selectedIndexes[rowData['rowIndex']] ? false : true,
                browserEvent: event
            };
            this.onRowSelect.emit(selEvent);
        };
        /**
         * Changes the select all indexes map according to user preference on click of checkbox
         * @param {?} event
         * @param {?} rowData
         * @return {?}
         */
        MuDataTableComponent.prototype.rowSelect = function (event, rowData) {
            if (event.checked) {
                this.selectedIndexes[rowData['rowIndex']] = true;
            }
            else {
                this.slctAllBox.checked = false;
                this.selAllMap[this.currPageIndex] = false;
                this.selectedIndexes[rowData['rowIndex']] = false;
            }
        };
        /**
         * Selects all the rows in the page that is being displayed and a callback is
         * sent to the parent with the rows that are selected.
         * @param {?} event
         * @return {?}
         */
        MuDataTableComponent.prototype.selectAll = function (event) {
            this.slctAllBox.checked = event.checked;
            this.selAllMap[this.currPageIndex] = event.checked;
            for (var index = 0; index < (this.currPageIndex + this.tableConfig.dispRows); index++)
                this.selectedIndexes[index + (this.currPageIndex * this.tableConfig.dispRows)] = event.checked;
            /** @type {?} */
            var selAllEvent = {
                selectedRows: this.dataMap[this.currPageIndex],
                isSelected: event.checked
            };
            this.onSelectAll.emit(selAllEvent);
        };
        /**
         * Changes the select all indexes map according to user preference on click of radio button
         * @param {?} event
         * @param {?} rowData
         * @return {?}
         */
        MuDataTableComponent.prototype.radioSelect = function (event, rowData) {
            this.selectedIndexes = {};
            /** @type {?} */
            var selectedIndex = rowData['rowIndex'];
            this.selectedIndexes[selectedIndex] = true;
        };
        /**
         * Sends call back to the parent on click of an option inside moredetails along with
         * the ID of the option and rowData
         * @param {?} detKey
         * @param {?} rowData
         * @return {?}
         */
        MuDataTableComponent.prototype.moreDetailsClick = function (detKey, rowData) {
            /** @type {?} */
            var moreSelEvent = {
                id: detKey,
                rowData: rowData
            };
            this.onDetailClick.emit(moreSelEvent);
        };
        /**
         * Changes the select all indexes map according to user preference on click of toggle button
         * @param {?} event
         * @param {?} rowData
         * @return {?}
         */
        MuDataTableComponent.prototype.toggleRow = function (event, rowData) {
            this.selectedIndexes[rowData['rowIndex']] = event.checked;
        };
        /**
         * mapData creates a map of row objects that needs to be displayed in the table
         * with index as the key and array of objects as its value
         * @param {?} data the data that needs to be mapped
         * @param {?} startPageIndex - index from which data needs to be mapped
         * @return {?}
         */
        MuDataTableComponent.prototype.createDataMap = function (data, startPageIndex) {
            /** @type {?} */
            var dataSetCount = Math.ceil(data.length / this.tableConfig.dispRows);
            /** @type {?} */
            var currData = JSON.parse(JSON.stringify(data));
            for (var index = 0; index < currData.length; index++)
                currData[index]['rowIndex'] = index + (startPageIndex * this.tableConfig.dispRows);
            for (var i = 0; i < dataSetCount; i++) {
                /** @type {?} */
                var mapData = currData.splice(0, this.tableConfig.dispRows);
                /** @type {?} */
                var mapKey = startPageIndex + i;
                if (mapData.length === this.tableConfig.dispRows
                    || !this.tableConfig.lazyLoad
                    || (this.tableConfig.lazyLoad && this.tableConfig.totalRecords <= ((mapKey * this.tableConfig.dispRows) + mapData.length)))
                    this.dataMap[mapKey] = mapData;
            }
            this.dataToDisplay = this.dataMap[startPageIndex] || [];
            this.changeDet.detectChanges();
        };
        /**
         * Called when user clicked on a page with its index as parameter.
         * Displays the data of that index from the data map, if the data does not exists,
         * a callback is given to the parent to load more data.
         * @param {?} pageIndex
         * @return {?}
         */
        MuDataTableComponent.prototype.onPageClick = function (pageIndex) {
            if (pageIndex >= this.pageNumbers.length) {
                pageIndex = this.pageNumbers.length - 1;
            }
            else if (pageIndex < 0) {
                pageIndex = 0;
            }
            this.prevPageIndex = this.currPageIndex;
            this.currPageIndex = pageIndex;
            if (this.slctAllBox) {
                this.slctAllBox.checked = this.selAllMap[this.currPageIndex] || false;
            }
            //Handling page numbers change
            if (this.pageNumbers.length > 5)
                this.updatePageNumbers(pageIndex);
            //Handling data change
            if (this.dataMap[this.currPageIndex]) {
                this.dataToDisplay = this.dataMap[pageIndex];
            }
            else {
                this.loadMoreData.emit(pageIndex * this.tableConfig.dispRows);
            }
        };
        /**
         * Updates the table data with new data, an optional parameter currentIndex should
         * be sent as '0' inorder to clear the refresh the table.
         * @param {?} data
         * @param {?=} currentIndex
         * @param {?=} totalRecords
         * @return {?}
         */
        MuDataTableComponent.prototype.updateData = function (data, currentIndex, totalRecords) {
            if (currentIndex === 0) {
                this.currPageIndex = currentIndex;
                this.dataMap = {};
                this.createPageNumbers();
            }
            if (totalRecords)
                this.tableConfig.totalRecords = totalRecords;
            else if (!this.tableConfig.lazyLoad)
                this.tableConfig.totalRecords = data.length;
            this.createDataMap(data, this.currPageIndex);
        };
        /**
         * Method invoked by the parent in case of api loading failure which brings back
         * the table to previous state
         * @param {?=} lastAppliedFilters
         * @param {?=} isHzFilters
         * @return {?}
         */
        MuDataTableComponent.prototype.loadingFailed = function (lastAppliedFilters, isHzFilters) {
            this.currPageIndex = this.prevPageIndex;
            this.updatePageNumbers(this.currPageIndex);
            if (lastAppliedFilters) {
                /** @type {?} */
                var index = isHzFilters ? 0 : 1;
                /** @type {?} */
                var filterInsts = this.filterCompChildren.toArray();
                filterInsts[index].updateLastAppliedFilters(lastAppliedFilters);
            }
        };
        /**
         * Sends callback to the parent when the user clicks on hyperlink
         * @param {?} rowData
         * @param {?} header
         * @return {?}
         */
        MuDataTableComponent.prototype.cellClick = function (rowData, header) {
            /** @type {?} */
            var buttonEvent = {
                headerKey: header.colType === core.COL_TYPE.MULTI_LINE ? header.dataKeyArr[0] : header.dataKey,
                rowIndex: rowData['rowIndex']
            };
            if (header.navInfo) {
                /** @type {?} */
                var navUrl = JSON.parse(JSON.stringify(header.navInfo.navUrl));
                /** @type {?} */
                var utility = new MuUtility();
                header.navInfo.navUrl = utility.createNavUrl(navUrl, rowData);
                buttonEvent.navInfo = header.navInfo;
            }
            else {
                buttonEvent.rowData = rowData;
            }
            this.onCellClick.emit(buttonEvent);
        };
        /**
         * performs search operation on the data available in the table only if table
         * is not lazy loaded. In case of lazy loading a callback is given to parent.
         * @param {?=} inputText
         * @return {?}
         */
        MuDataTableComponent.prototype.search = function (inputText) {
            var _this = this;
            this.dataMap = {};
            /** @type {?} */
            var filteredData = [];
            if (!inputText) {
                filteredData = this.tableConfig.data;
            }
            else {
                filteredData = this.tableConfig.data.filter(( /**
                 * @param {?} dataRow
                 * @return {?}
                 */function (/**
                 * @param {?} dataRow
                 * @return {?}
                 */ dataRow) {
                    if (_this.filterFields.filter(( /**
                     * @param {?} header
                     * @return {?}
                     */function (/**
                     * @param {?} header
                     * @return {?}
                     */ header) { return dataRow[header] && dataRow[header].toString().toLowerCase()
                        .includes(inputText.toString().toLowerCase()); }))
                        .length)
                        return true;
                }));
            }
            this.tableConfig.totalRecords = filteredData.length;
            this.createDataMap(filteredData, 0);
            this.createPageNumbers();
        };
        /**
         * Inserts a data row at the beginning of the table by clearing the datamap
         * @param {?} obj - data object that needs to be inserted
         * @return {?}
         */
        MuDataTableComponent.prototype.insertRow = function (obj) {
            var e_3, _a;
            /** @type {?} */
            var newData = [];
            if (!this.tableConfig.lazyLoad) {
                this.tableConfig.data.unshift(obj);
                newData = this.tableConfig.data;
                //Need to verify
                /** @type {?} */
                var newIndexes = {};
                try {
                    for (var _b = __values(Object.keys(this.selectedIndexes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var index = _c.value;
                        newIndexes[Number(index) + 1] = true;
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                this.selectedIndexes = {};
                this.selectedIndexes = newIndexes;
            }
            else {
                /** @type {?} */
                var firstPageData = this.dataMap[0];
                firstPageData.unshift(obj);
                firstPageData.pop();
                newData = firstPageData;
            }
            this.dataMap = {};
            this.tableConfig.totalRecords++;
            this.createDataMap(newData, 0);
            this.createPageNumbers();
        };
        /**
         * Deletes a row of given row index assuming that the index which is to deleted is currently
         * being displayed. Checks whether next page data exists in the map and reorders the sequence by
         * shifting the data, if not a callback is sent to parent to load data for that index.
         * @param {?} rowIndex - index of the data which needs to be deleted
         * @return {?}
         */
        MuDataTableComponent.prototype.deleteRow = function (rowIndex) {
            var e_4, _a, e_5, _b;
            if (!this.tableConfig.lazyLoad) {
                this.tableConfig.data.splice(rowIndex, 1);
                this.dataMap = {};
                this.createDataMap(this.tableConfig.data, 0);
                this.tableConfig.totalRecords--;
                this.createPageNumbers();
                //Need to verify
                /** @type {?} */
                var newIndexes = {};
                try {
                    for (var _c = __values(Object.keys(this.selectedIndexes)), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var index = _d.value;
                        newIndexes[Number(index) - 1] = true;
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                this.selectedIndexes = {};
                this.selectedIndexes = newIndexes;
                return;
            }
            if (this.dataMap[this.currPageIndex + 1]) {
                this.dataMap[this.currPageIndex].splice(rowIndex % this.tableConfig.dispRows, 1);
                this.dataMap[this.currPageIndex].push(this.dataMap[this.currPageIndex + 1][0]);
            }
            else if (this.tableConfig.totalRecords <= this.tableConfig.dispRows) {
                this.tableConfig.totalRecords--;
                this.dataMap[this.currPageIndex].splice(rowIndex % this.tableConfig.dispRows, 1);
            }
            else {
                this.loadMoreData.emit(this.currPageIndex * this.tableConfig.dispRows);
            }
            if (this.tableConfig.enableSelect)
                this.selectedIndexes = {};
            /** @type {?} */
            var keys = Object.keys(this.dataMap);
            try {
                for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                    var key = keys_1_1.value;
                    if (Number(key) > this.currPageIndex)
                        delete this.dataMap[key];
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (keys_1_1 && !keys_1_1.done && (_b = keys_1.return)) _b.call(keys_1);
                }
                finally { if (e_5) throw e_5.error; }
            }
            this.changeDet.detectChanges();
        };
        /**
         * Enables editing the data for editable coloumns when the user clicks on edit button.
         * Sends callback to the parent with new values when user saves the data.
         * @param {?} rowData
         * @param {?} isEdit
         * @return {?}
         */
        MuDataTableComponent.prototype.editRow = function (rowData, isEdit) {
            this.selectedIndexes = {};
            if (isEdit) {
                this.selectedIndexes[rowData['rowIndex']] = true;
            }
            else {
                /** @type {?} */
                var editEvent = {
                    editedValues: this.editForm.value,
                    rowData: rowData,
                    rowIndex: rowData['rowIndex']
                };
                this.onRowEdit.emit(editEvent);
            }
            this.editForm.reset();
        };
        /**
         * updates the data of given rowIndex, usually called after editing the data.
         * @param {?} rowIndex
         * @param {?} data
         * @return {?}
         */
        MuDataTableComponent.prototype.updateRow = function (rowIndex, data) {
            this.dataMap[this.currPageIndex][rowIndex % this.tableConfig.dispRows] = data;
        };
        /**
         * Call back from filter component on applying filters that was directly passed
         * back to the parent
         * @param {?} event
         * @return {?}
         */
        MuDataTableComponent.prototype.applyFilter = function (event) {
            /*
            If data table has all the data, filters are applied by the table itself
            instead of making an api call
            */
            if (!this.tableConfig.lazyLoad) {
                if (event && event[0])
                    this.search(event[0].value.toString());
                else
                    this.search();
                return;
            }
            this.changeDet.detectChanges();
            this.selectedFilter.emit(event);
        };
        /**
         * Method invoked by parent to unselect the rows
         * @param {?} rowIndexes
         * @return {?}
         */
        MuDataTableComponent.prototype.unselectIndexes = function (rowIndexes) {
            var e_6, _a;
            try {
                for (var rowIndexes_1 = __values(rowIndexes), rowIndexes_1_1 = rowIndexes_1.next(); !rowIndexes_1_1.done; rowIndexes_1_1 = rowIndexes_1.next()) {
                    var index = rowIndexes_1_1.value;
                    this.selectedIndexes[index] = false;
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (rowIndexes_1_1 && !rowIndexes_1_1.done && (_a = rowIndexes_1.return)) _a.call(rowIndexes_1);
                }
                finally { if (e_6) throw e_6.error; }
            }
            if (this.slctAllBox)
                this.slctAllBox.checked = false;
            this.selAllMap[this.currPageIndex] = false;
        };
        /**
         * Method invoked by parent to unselect the rows
         * @return {?}
         */
        MuDataTableComponent.prototype.downloadTableData = function () { };
        /**
         * @return {?}
         */
        MuDataTableComponent.prototype.getEditedRows = function () {
            var _this = this;
            /** @type {?} */
            var editedRows = [];
            Object.keys(this.dataMap).forEach(( /**
             * @param {?} index
             * @return {?}
             */function (/**
             * @param {?} index
             * @return {?}
             */ index) {
                _this.dataMap[index].forEach(( /**
                 * @param {?} rowObject
                 * @return {?}
                 */function (/**
                 * @param {?} rowObject
                 * @return {?}
                 */ rowObject) {
                    editedRows.push(rowObject);
                }));
            }));
            return editedRows;
        };
        /**
         * Method invoked by parent to download the records in XLSX, CSV or XLS format
         * @return {?}
         */
        MuDataTableComponent.prototype.onDownloadClick = function () {
            this.menuTrigger.closeMenu();
            if (this.tableConfig.downloadFormats.length === 1) {
                this.onSelectingFormat(this.tableConfig.downloadFormats[0]);
            }
            else {
                this.menuTrigger.openMenu();
            }
        };
        /**
         * @param {?} fileFormat
         * @return {?}
         */
        MuDataTableComponent.prototype.onSelectingFormat = function (fileFormat) {
            this.onDownload.emit(fileFormat);
        };
        return MuDataTableComponent;
    }());
    MuDataTableComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mu-data-table',
                    template: "\n<div class=\"horz-filter\" *ngIf=\"tableConfig.horizFilterParams\">\n  <filter\n    [filterItems]=\"tableConfig.horizFilterParams\"\n    [webMode]=\"true\"\n    [displayCount]=\"3\"\n    (selectedFilter)=\"applyFilter($event)\">\n  </filter>\n</div>\n\n<div [ngClass]=\"tableConfig.vertFilterParams ? 'filter-cont' : ''\" #filterCont>\n  <div  class=\"bg-white mu-table-cont border-light\" #muTableCont>\n    \n    <div class=\"table-extras bg-white\" #tableExtras>\n      <div class=\"search-input txt-lg-med-dark text-color-primary\" \n            *ngIf=\"dataToDisplay.length && pageNumbers.length === 1\">\n        \n        Total Records : {{ tableConfig.totalRecords }}  \n      </div>\n\n      <div class=\"search-input txt-lg-med-dark text-color-primary\" \n            *ngIf=\"dataToDisplay.length && pageNumbers.length > 1\">\n\n        {{ currPageIndex * tableConfig.dispRows + 1 }} to \n        {{ ((currPageIndex + 1) * tableConfig.dispRows) <= tableConfig.totalRecords ? ((currPageIndex + 1) * tableConfig.dispRows) : tableConfig.totalRecords }} \n        of {{ tableConfig.totalRecords }} records \n      </div>\n\n      <div class=\"download text-color-primary\"  \n        [matMenuTriggerFor]=\"menu\"\n        #menuTrigger=\"matMenuTrigger\"          \n        (click)=\"onDownloadClick()\">\n        <i *ngIf=\"dataToDisplay.length && tableConfig.downloadFormats\"\n        class=\"fa fa-download\" aria-hidden=\"true\"></i>\n      </div>\n\n      <div class=\"show-menu\">\n        <mat-menu #menu=\"matMenu\"\n          [xPosition]=\"'before'\"\n          [yPosition]=\"'below'\">\n    \n          <div class=\"txt-lg-bld-norm\" *ngFor=\"let format of tableConfig.downloadFormats\">\n            <button mat-menu-item (click)=\"onSelectingFormat(format)\">\n              {{ format }}\n            </button>\n          </div>    \n        </mat-menu>\n      </div>\n    \n      <div class=\"paginator text-color-primary\" *ngIf=\"pageNumbers.length > 1\">\n        <div [ngClass]=\"{'text-color-disable' : currPageIndex === 0}\" class=\"fast-backward pagenumber\"\n            (click)=\"onPageClick(0)\">\n          <i class=\"fa fa-fast-backward\" aria-hidden=\"true\"></i>\n        </div> \n        <div [ngClass]=\"{'text-color-disable' : currPageIndex === 0}\" class=\"firstPage\" class=\"pagenumber\"\n            (click)=\"onPageClick(currPageIndex - 1)\">\n          <i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i>\n        </div>\n        <div class=\"pagenumber txt-lg-reg-dark\" *ngFor=\"let pageNumber of pageNumbers.slice(pageIndex, pageIndex + 5)\"\n          (click)=\"onPageClick(pageNumber - 1)\"\n          [ngClass]=\"currPageIndex === pageNumber - 1 ? 'sel-ind' : ''\">\n          {{ pageNumber }}\n        </div>\n        <div [ngClass]=\"{ 'text-color-disable' : currPageIndex === pageNumbers.length - 1 }\" \n            class=\"lastPage\" class=\"pagenumber\" (click)=\"onPageClick(currPageIndex + 1)\">\n          <i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i>\n        </div>\n        <div [ngClass]=\"{ 'text-color-disable' : currPageIndex === pageNumbers.length - 1 }\" \n            class=\"fast-forward pagenumber\" (click)=\"onPageClick(pageNumbers.length - 1)\">\n          <i class=\"fa fa-fast-forward\" aria-hidden=\"true\"></i>\n        </div>\n\n      </div>\n    </div>\n\n    <ng-template *ngIf=\"(stickyInfo); then stickyConfig else defaultConfig\"></ng-template>\n\n    <ng-template #stickyConfig>\n      <div class=\"sticky-container\">\n        <ng-container *ngTemplateOutlet=\"innerContent\"></ng-container>\n      </div>\n    </ng-template>\n\n    <ng-template #defaultConfig>\n      <ng-container *ngTemplateOutlet=\"innerContent\"></ng-container>\n    </ng-template>\n\n\n    <ng-template #innerContent>\n        <div class=\"primary-bg border-light\"\n        [ngClass]=\" stickyInfo ? 'headers-cont-sticky' : 'headers-cont'\"\n        [style.width]=\"stickyInfo ? (stickyInfo.stickyWidth + stickyInfo.nonStickyWidth) + '%' : ''\"\n        [style.top]=\"!stickyInfo ? tableExtras.getBoundingClientRect().height.toFixed(2)+ 'px' : ''\">\n          <div class=\"radio-btn\" *ngIf=\"tableConfig?.enableRadio\"></div>\n          <div class=\"checkbox\" *ngIf=\"tableConfig?.enableSelect && dataToDisplay.length\" >\n            <mat-checkbox (change)=\"selectAll($event)\" #slctAllBox></mat-checkbox>\n          </div>\n\n          <ng-container *ngFor=\"let header of tableConfig.headers; index as i\">\n            <div \n            class=\"txt-xl-bld-dark text-color-white\"\n            [style.position]=\"stickyInfo && (i <= (stickyInfo.noOfCols - 1)) ? 'sticky' : ''\"\n            [style.left]=\"stickyInfo && (i <= (stickyInfo.noOfCols - 1)) ? \n              (i*(stickyInfo.stickyWidth/stickyInfo.noOfCols))+'%' : ''\"\n            [style.width]=\"stickyInfo ? \n              (\n                i <= (stickyInfo.noOfCols - 1) ? \n                (stickyInfo.stickyWidth/stickyInfo.noOfCols) + '%' :\n                (header.widthPerc || stickyInfo.nonStickyWidth/(tableConfig.headers.length - stickyInfo.noOfCols)) + '%'\n                )\n              : \n              (header.widthPerc || 100/tableConfig.headers.length)+'%'\n              \"\n            [ngClass]=\"stickyInfo ? \n            (i == (stickyInfo.noOfCols - 1) ? 'header-sticky last-sticky' : 'header-sticky')\n            :\n            'header'\n            \">\n              {{ header.header }}\n            </div>\n          </ng-container>\n        </div>\n\n        <div class=\"border-light\" *ngFor=\"let rowData of dataToDisplay\"\n          [ngClass]=\"stickyInfo ? 'table-row-cont-sticky' : 'table-row-cont'\"\n          [style.width]=\"stickyInfo ? (stickyInfo.stickyWidth + stickyInfo.nonStickyWidth) + '%' : ''\"\n          [class.row-active]=\"selectedIndexes[rowData['rowIndex']] && !isTogglePresent\">\n\n          <div class=\"radio-btn\" *ngIf=\"tableConfig.enableRadio\">\n            <mat-radio-group name=\"rowRadio\">\n              <mat-radio-button \n                value=\"{{ rowData['rowIndex'] }}\" \n                (click)=\"rowClick($event, rowData)\"\n                (change)=\"radioSelect($event, rowData)\"\n                [checked]=\"selectedIndexes[rowData['rowIndex']]\">\n              </mat-radio-button>\n            </mat-radio-group>\n          </div>\n\n          <div class=\"checkbox\" *ngIf=\"tableConfig.enableSelect\">\n            <mat-checkbox\n              (click)=\"rowClick($event, rowData)\"\n              [checked]=\"selectedIndexes[rowData['rowIndex']]\"\n              (change)=\"rowSelect($event, rowData)\">\n            </mat-checkbox>\n          </div>\n\n        <ng-container *ngIf=\"dataToDisplay\">\n\n          <ng-container *ngFor=\"let header of tableConfig.headers; index as ind\">\n            <div\n              class=\"txt-md-med-norm\" \n              [style.position]=\"stickyInfo && (ind <= (stickyInfo.noOfCols - 1)) ? 'sticky' : ''\"\n              [style.left]=\"stickyInfo && (ind <= (stickyInfo.noOfCols - 1)) ? \n                (ind*(stickyInfo.stickyWidth/stickyInfo.noOfCols))+'%' : ''\"\n              [style.width]=\"stickyInfo ? \n              (\n                ind <= (stickyInfo.noOfCols - 1) ? \n                (stickyInfo.stickyWidth/stickyInfo.noOfCols) + '%' :\n                (header.widthPerc || stickyInfo.nonStickyWidth/(tableConfig.headers.length - stickyInfo.noOfCols)) + '%'\n                )\n              : \n              (header.widthPerc || 100/tableConfig.headers.length)+'%'\n              \"\n              [ngClass]=\"stickyInfo ? \n              ind == (stickyInfo.noOfCols - 1) ? 'last-sticky row-data-sticky header.customStyle' : 'row-data-sticky header.customStyle' :\n              'row-data header.customStyle'\n              \">\n          \n          <ng-container [ngSwitch]=\"header.colType\" [formGroup]=\"editForm\">\n\n            <div *ngSwitchCase=\"COL_TYPE.TEXT\" [ngClass]=\"header.elementStyle\">\n              \n              <span *ngIf=\"!(selectedIndexes[rowData['rowIndex']] && header.isEditable)\" class=\"text-cls\"> \n                {{ header.constValue || rowData[header.dataKey] | genericPipe : header.pipeParams?.pipeName : [header.pipeParams?.value] }}\n              </span> \n              <input *ngIf=\"selectedIndexes[rowData['rowIndex']] && header.isEditable\" \n                formControlName=\"{{ header.dataKey }}\"\n                value=\"{{ rowData[header.dataKey] | genericPipe : header.pipeParams?.pipeName : [header.pipeParams?.value] }}\" type=\"text\">\n            </div>\n\n            <div *ngSwitchCase=\"COL_TYPE.INPUT_EDIT\" [ngClass]=\"header.elementStyle\">\n              <input *ngIf=\"header.isEditable\" class=\"edit-input border-light\"\n                [(ngModel)]=\"rowData[header.dataKey]\" type=\"text\" \n                [ngModelOptions]=\"{standalone: true}\">\n            </div>\n            \n            <!-- Column to display multi line text along with image and icon -->\n            <div class=\"multi-line click-item\" *ngSwitchCase=\"COL_TYPE.MULTI_LINE\" [ngClass]=\"header.elementStyle\"\n                (click)=\"cellClick(rowData, header)\">\n              <div class=\"multi-line-text-align\" *ngFor=\"let colType of header.dataKeyType; let i = index\">\n                <div *ngIf=\"colType === COL_TYPE.IMAGE\">\n                  <img src=\"{{ header.multiLineKey[i] }}\">\n                </div>\n                <div *ngIf=\"colType === COL_TYPE.ICON\">\n                  <i class=\"{{ rowData[header.multiLineKey[i]] }}\"></i>\n                </div>\n                <div *ngIf=\"colType === COL_TYPE.TEXT\">\n                  <div *ngFor=\"let data of header.dataKeyArr; let j = index\" class=\"profile-align\">\n                    <div class=\"multi-line\">\n                      <div *ngIf=\"header.headerArr\"\n                        class=\"text-color-primary txt-md-med-norm header-width\"> \n                        {{ header.headerArr[j] }} \n                      </div>\n                      <div *ngIf=\"header.headerArr\" class=\"colon-width\">\n                        :\n                      </div>\n                      <div class=\"txt-md-med-norm data-width\">\n                        {{ rowData[data] }}\n                      </div>\n                    </div>  \n                  </div>\n                </div>\n              </div>\n            </div>\n            \n              <div *ngSwitchCase=\"COL_TYPE.IMAGE\" [ngClass]=\"header.elementStyle\">\n                <img src=\"{{ header.constValue || rowData[header.dataKey] }}\">\n              </div>\n\n              <div *ngSwitchCase=\"COL_TYPE.HYPER_LINK\" (click)=\"cellClick(rowData, header)\"\n                class=\"click-item text-color-primary\" [ngClass]=\"header.elementStyle\">\n                {{ header.constValue || rowData[header.dataKey] | genericPipe : header.pipeParams?.pipeName : [header.pipeParams?.value] }}\n              </div>\n\n              <div *ngSwitchCase=\"COL_TYPE.ICON\" (click)=\"cellClick(rowData, header)\" class=\"click-item\"\n                [ngClass]=\"header.elementStyle\">\n                <i class=\"{{ header.constValue || rowData[header.dataKey] }}\"></i>\n              </div>\n\n              <div *ngSwitchCase=\"COL_TYPE.BUTTON\" (click)=\"cellClick(rowData, header)\"\n                [ngClass]=\"header.elementStyle\">\n                <button class=\"table-button curs-pointer txt-lg-med-norm primary-bg\">\n                  {{ header.constValue || rowData[header.dataKey] }}\n                </button>\n              </div>\n\n              <div *ngSwitchCase=\"COL_TYPE.TOGGLE\" [ngClass]=\"header.elementStyle\">\n                <mat-slide-toggle \n                  (click)=\"rowClick($event, rowData)\"\n                  (change)=\"toggleRow($event, rowData)\"\n                  [checked]=\"selectedIndexes[rowData['rowIndex']]\">\n                </mat-slide-toggle>\n              </div>\n\n              <div *ngSwitchCase=\"COL_TYPE.MORE_DETAILS\" [ngClass]=\"header.elementStyle\">\n                <i class=\"click-item fa fa-ellipsis-v more-icon\" [matMenuTriggerFor]=\"menu\" aria-hidden=\"true\"></i>\n                <mat-menu #menu=\"matMenu\" yPosition=\"below\" xPosition=\"before\">\n                  <button mat-menu-item *ngFor=\"let option of header.constValue\" class=\"txt-lg-med-norm\" \n                  (click)=\"moreDetailsClick(option.id, rowData)\"> \n                    <span> {{ option.value }}</span>\n                  </button>\n                </mat-menu>\n              </div>\n\n              <div *ngSwitchCase=\"COL_TYPE.EDIT\" [ngClass]=\"header.elementStyle\">\n                <span class=\"click-item\" (click)=\"editRow(rowData, true)\"\n\n                *ngIf=\"!selectedIndexes[rowData['rowIndex']]\">\n                  {{ 'mu_dt_tbl_edit' | translate }}\n                </span>\n\n                <span class=\"click-item\" (click)=\"editRow(rowData, false)\"\n                *ngIf=\"selectedIndexes[rowData['rowIndex']]\">\n                  {{ 'mu_dt_tbl_save' | translate }}\n\n                </span>\n              </div>\n            </ng-container>\n          </div>\n          </ng-container>\n        </ng-container>\n      </div>\n\n      <ng-container *ngIf=\"!dataToDisplay.length\">\n        <div class=\"no-data txt-lg-med-norm\">\n          {{ 'mu_dt_tbl_empty_state' | translate }}\n        </div>\n      </ng-container>\n    </ng-template>\n\n  </div>\n\n  <div class=\"vert-filter\" *ngIf=\"tableConfig.vertFilterParams\">\n    <filter\n      [filterItems]=\"tableConfig.vertFilterParams\"\n      [displayMode]=\"DISPLAY_MODE.VERTICAL\"\n      [webMode]=\"true\"\n      [displayCount]=\"1\"\n      (selectedFilter)=\"applyFilter($event)\">\n    </filter>\n  </div>\n</div>\n\n\n",
                    styles: [":host{position:relative;width:100%}.mu-table-cont{border-style:solid;border-width:1px;box-shadow:0 2px 5px 0 rgba(0,0,0,.2);display:flex;flex-direction:column;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}.filter-cont{display:flex;height:auto;overflow-y:auto}.filter-cont ::-webkit-scrollbar{display:none}.filter-cont .mu-table-cont{height:100%;overflow-y:auto;width:85%}.filter-cont::-webkit-scrollbar{display:none}.headers-cont{align-items:center;padding:10px}.headers-cont,.headers-cont-sticky{border-bottom-style:solid;border-bottom-width:1px;display:flex;justify-content:space-between;position:-webkit-sticky;position:sticky;z-index:10}.checkbox{margin-left:20px}.checkbox,.radio-btn{margin-right:20px}.table-row-cont{align-items:center;justify-content:space-between;padding:10px}.table-row-cont,.table-row-cont-sticky{border-bottom-style:solid;border-bottom-width:1px;display:flex}.row-data{padding:5px}.row-data,.row-data-sticky{align-items:center;display:flex;justify-content:flex-start;word-break:break-word}.row-data-sticky{background:#fff;padding:20px 15px}.header{padding:0 5px}.header,.header-sticky{align-items:center;display:flex;justify-content:flex-start;word-break:break-word}.header-sticky{background:#203882!important;padding:10px 15px}.sticky-container::-webkit-scrollbar{height:8px}.sticky-container{overflow:auto;scrollbar-width:8px}.last-sticky{border-right:1px solid #9a9a9a;box-shadow:1px 1px 3px -1px #888}img{width:75px}.table-button{border:none;box-shadow:1px 1px 1px 1px #dadada;color:#fff!important;height:2rem;padding:0 20px;width:100%}.click-item{cursor:pointer;padding:5px 10px}.click-item:hover{background:#d2d2d2;border-radius:5px}.curs-pointer{cursor:pointer}.row-active{background:#d2d2d2}:host::ng-deep .mat-checkbox-inner-container{height:20px;width:20px}.radio-btn{width:0}.more-icon{cursor:pointer;font-size:1.5rem}.paginator{display:flex;float:right;justify-content:space-around}.pagenumber{align-items:center;cursor:pointer;display:flex;justify-content:center;padding:10px;width:2.5%}.sel-ind{background:#add8e6}.table-row{display:flex}.table-extras{background:#fff;border-bottom:1px solid #d2d2d2;position:-webkit-sticky;position:sticky;top:0;z-index:11}input{background:#eaeaea!important;border:none;height:70%;margin:5px;padding:5px;width:100%}.row-data input{background:#f2f5f7!important}.no-data{align-items:center;border-top:1px solid #d2d2d2;display:flex;justify-content:center;padding:10px;word-break:break-word}.search-input{float:left;margin:10px}.vert-filter{margin-left:1%;width:14%}.text-cls{-moz-user-select:text;-ms-user-select:text;-webkit-user-select:text;user-select:text}.multi-line{display:flex;flex-direction:row}.header-width{width:65px}.data-width{width:100px}.row-margin{margin-top:10px}.colon-width{width:10px}.profile-align{display:flex;flex-direction:column;justify-content:center;margin-left:20px;text-align:left}.multi-line-text-align{align-items:center;display:flex}.edit-input{border:1px solid}.show-menu{position:relative}.download{cursor:pointer;float:left;margin:10px 0 0 10px}"]
                }] }
    ];
    /** @nocollapse */
    MuDataTableComponent.ctorParameters = function () { return [
        { type: RunContextBrowser, decorators: [{ type: i0.Inject, args: ['RunContext',] }] },
        { type: i0.ChangeDetectorRef }
    ]; };
    MuDataTableComponent.propDecorators = {
        slctAllBox: [{ type: i0.ViewChild, args: ['slctAllBox', { static: false },] }],
        filterCont: [{ type: i0.ViewChild, args: ['filterCont', { static: false },] }],
        muTableCont: [{ type: i0.ViewChild, args: ['muTableCont', { static: false },] }],
        menuTrigger: [{ type: i0.ViewChild, args: ['menuTrigger', { static: true },] }],
        filterCompChildren: [{ type: i0.ViewChildren, args: [FilterComponent,] }],
        tableConfig: [{ type: i0.Input }],
        loadMoreData: [{ type: i0.Output }],
        onRowSelect: [{ type: i0.Output }],
        onSelectAll: [{ type: i0.Output }],
        onDetailClick: [{ type: i0.Output }],
        onCellClick: [{ type: i0.Output }],
        onRowEdit: [{ type: i0.Output }],
        onDownload: [{ type: i0.Output }],
        selectedFilter: [{ type: i0.Output }]
    };
    if (false) {
        /** @type {?} */
        MuDataTableComponent.prototype.slctAllBox;
        /** @type {?} */
        MuDataTableComponent.prototype.filterCont;
        /** @type {?} */
        MuDataTableComponent.prototype.muTableCont;
        /** @type {?} */
        MuDataTableComponent.prototype.menuTrigger;
        /** @type {?} */
        MuDataTableComponent.prototype.filterCompChildren;
        /** @type {?} */
        MuDataTableComponent.prototype.tableConfig;
        /** @type {?} */
        MuDataTableComponent.prototype.loadMoreData;
        /** @type {?} */
        MuDataTableComponent.prototype.onRowSelect;
        /** @type {?} */
        MuDataTableComponent.prototype.onSelectAll;
        /** @type {?} */
        MuDataTableComponent.prototype.onDetailClick;
        /** @type {?} */
        MuDataTableComponent.prototype.onCellClick;
        /** @type {?} */
        MuDataTableComponent.prototype.onRowEdit;
        /** @type {?} */
        MuDataTableComponent.prototype.onDownload;
        /** @type {?} */
        MuDataTableComponent.prototype.selectedFilter;
        /** @type {?} */
        MuDataTableComponent.prototype.pageIndex;
        /** @type {?} */
        MuDataTableComponent.prototype.currPageIndex;
        /** @type {?} */
        MuDataTableComponent.prototype.prevPageIndex;
        /** @type {?} */
        MuDataTableComponent.prototype.isTogglePresent;
        /** @type {?} */
        MuDataTableComponent.prototype.selectedIndexes;
        /** @type {?} */
        MuDataTableComponent.prototype.selAllMap;
        /** @type {?} */
        MuDataTableComponent.prototype.headerFields;
        /** @type {?} */
        MuDataTableComponent.prototype.dataToDisplay;
        /** @type {?} */
        MuDataTableComponent.prototype.pageNumbers;
        /** @type {?} */
        MuDataTableComponent.prototype.stickyInfo;
        /**
         * @type {?}
         * @private
         */
        MuDataTableComponent.prototype.filterFields;
        /**
         * @type {?}
         * @private
         */
        MuDataTableComponent.prototype.dataMap;
        /** @type {?} */
        MuDataTableComponent.prototype.editForm;
        /** @type {?} */
        MuDataTableComponent.prototype.COL_TYPE;
        /** @type {?} */
        MuDataTableComponent.prototype.DISPLAY_MODE;
        /**
         * @type {?}
         * @protected
         */
        MuDataTableComponent.prototype.rc;
        /**
         * @type {?}
         * @private
         */
        MuDataTableComponent.prototype.changeDet;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var KEYBOARD_MODE = {
        NORMAL: 'NORMAL',
        SHOW_DOT: 'SHOW_DOT',
    };
    /** @enum {string} */
    var KEY_TYPE = {
        NUMBER: 'NUMBER',
        BACK: 'BACK',
        DONE: 'DONE',
        DOT: 'DOT',
    };
    /**
     * @record
     */
    function KeyPressData() { }
    if (false) {
        /** @type {?} */
        KeyPressData.prototype.keyType;
        /** @type {?} */
        KeyPressData.prototype.key;
    }
    var KeypadComponent = /** @class */ (function () {
        /**
         * @param {?} rc
         */
        function KeypadComponent(rc) {
            this.rc = rc;
            this.keyPress = new i0.EventEmitter();
            this.KEYBOARD_MODE = KEYBOARD_MODE;
        }
        /**
         * @return {?}
         */
        KeypadComponent.prototype.ngOnInit = function () {
            if (!this.mode)
                this.mode = KEYBOARD_MODE.NORMAL;
        };
        /**
         * @param {?} inputNum
         * @return {?}
         */
        KeypadComponent.prototype.keyClick = function (inputNum) {
            /** @type {?} */
            var data = { key: inputNum, keyType: KEY_TYPE.NUMBER };
            this.keyPress.emit(data);
        };
        /**
         * @return {?}
         */
        KeypadComponent.prototype.onKeyBoardBack = function () {
            /** @type {?} */
            var data = { key: null, keyType: KEY_TYPE.BACK };
            this.keyPress.emit(data);
        };
        /**
         * @return {?}
         */
        KeypadComponent.prototype.onKeyBoardOk = function () {
            /** @type {?} */
            var data = { key: null, keyType: KEY_TYPE.DONE };
            this.keyPress.emit(data);
        };
        /**
         * @return {?}
         */
        KeypadComponent.prototype.onKeyBoardDot = function () {
            /** @type {?} */
            var data = { key: '.', keyType: KEY_TYPE.DOT };
            this.keyPress.emit(data);
        };
        return KeypadComponent;
    }());
    KeypadComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'keypad',
                    template: "<div class=\"keypad txt-xxl-med-dark\">\n  \n  <div class=\"first-row\">\n    <div matRipple class=\"key key-one\" \n      [ngClass]=\"mode === KEYBOARD_MODE.NORMAL ? 'key-normal' : 'key-dot'\"\n      (click)=\"keyClick('1')\">\n      <span class=\"text-color-primary\">1</span>\n    </div>\n    <div matRipple class=\"key key-two\" \n      [ngClass]=\"mode === KEYBOARD_MODE.NORMAL ? 'key-normal' : 'key-dot'\"\n      (click)=\"keyClick('2')\">\n      <span class=\"text-color-primary\">2</span>\n    </div>\n    <div matRipple class=\"key key-three\" \n      [ngClass]=\"mode === KEYBOARD_MODE.NORMAL ? 'key-normal' : 'key-dot'\"\n      (click)=\"keyClick('3')\">\n      <span class=\"text-color-primary\">3</span>\n    </div>\n\n    <div *ngIf=\"mode !== KEYBOARD_MODE.NORMAL\"  class=\"key key-empty\">\n      \n    </div>\n  </div>\n\n  <div class=\"second-row\">\n    <div matRipple class=\"key key-four\" \n      [ngClass]=\"mode === KEYBOARD_MODE.NORMAL ? 'key-normal' : 'key-dot'\"\n      (click)=\"keyClick('4')\">\n      <span class=\"text-color-primary\">4</span>\n    </div>\n    <div matRipple class=\"key key-five\" \n      [ngClass]=\"mode === KEYBOARD_MODE.NORMAL ? 'key-normal' : 'key-dot'\"\n      (click)=\"keyClick('5')\">\n      <span class=\"text-color-primary\">5</span>\n    </div>\n    <div matRipple class=\"key key-six\" \n      [ngClass]=\"mode === KEYBOARD_MODE.NORMAL ? 'key-normal' : 'key-dot'\"\n      (click)=\"keyClick('6')\">\n      <span class=\"text-color-primary\" >6</span>\n    </div>\n    <div *ngIf=\"mode !== KEYBOARD_MODE.NORMAL\"  class=\"key key-empty\">\n      \n    </div>\n  </div>\n\n  <div class=\"third-row\">\n    <div matRipple class=\"key key-seven\" \n      [ngClass]=\"mode === KEYBOARD_MODE.NORMAL ? 'key-normal' : 'key-dot'\"\n      (click)=\"keyClick('7')\">\n      <span class=\"text-color-primary\">7</span>\n    </div>\n    <div matRipple class=\"key key-eight\" \n      [ngClass]=\"mode === KEYBOARD_MODE.NORMAL ? 'key-normal' : 'key-dot'\"\n      (click)=\"keyClick('8')\">\n      <span class=\"text-color-primary\">8</span>\n    </div>\n    <div matRipple class=\"key key-nine\" \n      [ngClass]=\"mode === KEYBOARD_MODE.NORMAL ? 'key-normal' : 'key-dot'\"\n      (click)=\"keyClick('9')\">\n      <span class=\"text-color-primary\">9</span>\n    </div>\n    <div *ngIf=\"mode !== KEYBOARD_MODE.NORMAL\"  class=\"key key-empty\">\n      \n    </div>\n  </div>\n\n  <div class=\"fourth-row\">\n    <div matRipple class=\"key key-back\" \n      [ngClass]=\"mode === KEYBOARD_MODE.NORMAL ? 'key-normal' : 'key-dot'\"\n      (click)=\"onKeyBoardBack()\">\n      <span class=\"text-color-primary\">\n        <i class=\"fa fa-arrow-left fa-lg\" aria-hidden=\"true\"></i>\n      </span>\n    </div>\n    <div matRipple class=\"key key-zero\" \n      [ngClass]=\"mode === KEYBOARD_MODE.NORMAL ? 'key-normal' : 'key-dot'\"\n      (click)=\"keyClick('0')\">\n      <span class=\"text-color-primary\">0</span>\n    </div>\n    <div *ngIf=\"mode !== KEYBOARD_MODE.NORMAL\" \n      matRipple class=\"key key-dot\" \n      [ngClass]=\"'key-dot'\"\n      (click)=\"onKeyBoardDot()\">\n      <span class=\"text-color-primary\">.</span>\n    </div>\n    <div matRipple class=\"key\" \n      [ngClass]=\"mode === KEYBOARD_MODE.NORMAL ? 'key-normal' : 'key-ok'\"\n      (click)=\"onKeyBoardOk()\">\n      <span class=\"text-color-primary\">\n        <i class=\"fa fa-check fa-lg\" aria-hidden=\"true\"></i>\n      </span>\n    </div>\n  </div>\n\n</div>",
                    styles: [".keypad{flex-direction:column;width:100vw}.zero-row{display:flex;flex-direction:row;justify-content:flex-end;padding:0 8vw 2vh}.first-row,.fourth-row,.second-row,.third-row,.zero-row{display:flex;flex-direction:row;justify-content:center;width:100vw}.typed-text-view{height:100%;width:100%}.key{padding:1vh 0}.key span{border-radius:50%;height:12vw;width:12vw}.flex-center,.key,.keypad,.key span,.typed-text-view{align-items:center;display:flex;justify-content:center}.key-normal{width:33.33vw!important}.key-dot{width:28vw}.key-empty,.key-ok{width:16vw!important}"]
                }] }
    ];
    /** @nocollapse */
    KeypadComponent.ctorParameters = function () { return [
        { type: RunContextBrowser, decorators: [{ type: i0.Inject, args: ['RunContext',] }] }
    ]; };
    KeypadComponent.propDecorators = {
        mode: [{ type: i0.Input, args: ['mode',] }],
        keyPress: [{ type: i0.Output, args: ['keyPress',] }]
    };
    if (false) {
        /** @type {?} */
        KeypadComponent.prototype.mode;
        /** @type {?} */
        KeypadComponent.prototype.keyPress;
        /** @type {?} */
        KeypadComponent.prototype.KEYBOARD_MODE;
        /** @type {?} */
        KeypadComponent.prototype.rc;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PageNotFoundComponent = /** @class */ (function () {
        /**
         * @param {?} rc
         */
        function PageNotFoundComponent(rc) {
            this.rc = rc;
        }
        /**
         * @return {?}
         */
        PageNotFoundComponent.prototype.ngOnInit = function () {
        };
        /*=====================================================================
                                          HTML
          =====================================================================*/
        /**
         * @return {?}
         */
        PageNotFoundComponent.prototype.onHomeClick = function () {
            // this.rc.uiRouter.rootNavigate(ComponentRoute.LandingProxy)
        };
        return PageNotFoundComponent;
    }());
    PageNotFoundComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'page-not-found',
                    template: "<div class=\"nc-root-div page-not-found-comp\"\n  [ngClass.xl]=\"['web-root-div']\"\n  [ngClass.lg]=\"['web-root-div']\"\n  [ngClass.md]=\"['web-root-div']\"\n  [ngClass.sm]=\"['web-root-div']\">\n  \n  <div class=\"nc-content-div bg-pnf\"\n    [ngClass.xl]=\"['web-content-div']\"\n    [ngClass.lg]=\"['web-content-div']\"\n    [ngClass.md]=\"['web-content-div']\"\n    [ngClass.sm]=\"['web-content-div']\">\n\n    <div class=\"web-img-cont\">\n      <img class=\"pnf-img\" src='images/pnf.png'>\n    </div>\n\n    <div class=\"img-cont\">\n      <img class=\"mob-pnf-img\" src='images/pnf-mobile.png'>\n    </div>\n\n    <footer class=\"footer\">\n      <button class=\"button bg-white txt-lg-reg-dark text-color-primary\" (click)=\"onHomeClick()\">\n        {{ 'page_not_fond_vist_home' | translate }}\n      </button>\n    </footer>\n\n  </div>\n  \n</div>\n",
                    styles: [".nc-content-div{height:100vh}.web-img-cont{display:none}.img-cont{height:100%}.footer{bottom:30vh;display:flex;justify-content:center;position:absolute;width:100vw}.button{height:3rem;width:92vw}.mob-pnf-img{height:100vh;width:100vw}.web-content-div{height:100%;max-height:100%!important}.web-content-div .web-img-cont{display:block;height:100%;overflow:hidden;width:100%}.web-content-div .pnf-img{height:100%;width:100%}.web-content-div .footer{top:84%;width:100%}.web-content-div .img-cont{display:none}.web-content-div .button{width:16%}"]
                }] }
    ];
    /** @nocollapse */
    PageNotFoundComponent.ctorParameters = function () { return [
        { type: RunContextBrowser, decorators: [{ type: i0.Inject, args: ['RunContext',] }] }
    ]; };
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        PageNotFoundComponent.prototype.rc;
    }

    /** @type {?} */
    var KEY_UP$1 = 'keyup';
    /** @type {?} */
    var BACKSPACE$1 = 'Backspace';
    /**
     * @record
     */
    function MaskingParams() { }
    if (false) {
        /** @type {?} */
        MaskingParams.prototype.maxLength;
        /** @type {?} */
        MaskingParams.prototype.maskedLength;
        /** @type {?|undefined} */
        MaskingParams.prototype.maskWith;
        /** @type {?|undefined} */
        MaskingParams.prototype.startSkipCount;
        /** @type {?|undefined} */
        MaskingParams.prototype.endSkipCount;
    }
    var MaskingValueDirective = /** @class */ (function (_super) {
        __extends(MaskingValueDirective, _super);
        /**
         * @param {?} element
         * @param {?} renderer
         * @param {?} ngZone
         */
        function MaskingValueDirective(element, renderer, ngZone) {
            var _this = _super.call(this, element, renderer, ngZone) || this;
            _this.element = element;
            _this.renderer = renderer;
            _this.ngZone = ngZone;
            _this.maskedValue = new i0.EventEmitter();
            _this.updatedString = '';
            window['mask'] = _this;
            return _this;
        }
        /**
         * @return {?}
         */
        MaskingValueDirective.prototype.ngOnInit = function () {
            this.maxLength = this.maskingParams.maxLength;
        };
        /**
         * @return {?}
         */
        MaskingValueDirective.prototype.ngAfterViewInit = function () {
            /** @type {?} */
            var clonedInputNode = this.element.nativeElement.cloneNode(true);
            /** @type {?} */
            var parentElem = this.element.nativeElement.parentElement;
            this.renderer.appendChild(parentElem, clonedInputNode);
            this.element.nativeElement.hidden = true;
            _super.prototype.ngAfterViewInit.call(this);
            if (this.element.nativeElement.value) {
                /** @type {?} */
                var value = this.element.nativeElement.value;
                /** @type {?} */
                var maskingParams = this.maskingParams;
                /** @type {?} */
                var startSkipCount = maskingParams.startSkipCount || 0;
                /** @type {?} */
                var totalSkipCount = startSkipCount + (maskingParams.endSkipCount || 0);
                this.value(value, startSkipCount, totalSkipCount);
                this.updatedString = value;
            }
            this.renderer.listen(this.element.nativeElement.nextSibling, KEY_UP$1, this.handelEvent.bind(this));
        };
        /*=====================================================================
                                      PRIVATE
          =====================================================================*/
        /**
         * @private
         * @param {?} value
         * @param {?} startSkipCount
         * @param {?} totalSkipCount
         * @return {?}
         */
        MaskingValueDirective.prototype.value = function (value, startSkipCount, totalSkipCount) {
            value = value.substring(0, startSkipCount)
                + value.substring(startSkipCount, totalSkipCount + 1).replace(/\w+/g, this.maskingParams.maskWith || '*')
                + value.substring(totalSkipCount + 1);
            return value;
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        MaskingValueDirective.prototype.handelEvent = function (event) {
            _super.prototype.handleEvent.call(this, event);
            /** @type {?} */
            var startSkipCount = this.maskingParams.startSkipCount || 0;
            /** @type {?} */
            var endSkipCount = this.maskingParams.endSkipCount || 0;
            /** @type {?} */
            var value = event.srcElement.value;
            /** @type {?} */
            var totalSkipCount = startSkipCount + endSkipCount;
            length = value.length;
            /** @type {?} */
            var isBackPressed = event.key === BACKSPACE$1;
            if (!isBackPressed && this.updatedString.length === this.maskingParams.maxLength) {
                return;
            }
            if (isBackPressed) {
                this.updatedString = this.updatedString.substr(0, length);
                return;
            }
            if (length <= startSkipCount) {
                this.updatedString = value.substr(0, startSkipCount);
            }
            if (length > startSkipCount && length <= totalSkipCount) {
                this.updatedString = this.updatedString.substr(0) +
                    value.substr(this.updatedString.length, length);
            }
            if (length > totalSkipCount && length <= this.maskingParams.maxLength) {
                this.updatedString = this.updatedString.substr(0) + value.substr(length - 1);
            }
            event.srcElement.value = this.value(value, startSkipCount, totalSkipCount);
            this.element.nativeElement.value = this.updatedString;
            this.maskedValue.emit(this.updatedString);
        };
        return MaskingValueDirective;
    }(NcMaxLengthDirective));
    MaskingValueDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[maskingValue]'
                },] }
    ];
    /** @nocollapse */
    MaskingValueDirective.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: i0.Renderer2 },
        { type: i0.NgZone }
    ]; };
    MaskingValueDirective.propDecorators = {
        maskingParams: [{ type: i0.Input, args: ['maskingValue',] }],
        maskedValue: [{ type: i0.Output }]
    };
    if (false) {
        /** @type {?} */
        MaskingValueDirective.prototype.maskingParams;
        /** @type {?} */
        MaskingValueDirective.prototype.maskedValue;
        /**
         * @type {?}
         * @private
         */
        MaskingValueDirective.prototype.updatedString;
        /**
         * @type {?}
         * @protected
         */
        MaskingValueDirective.prototype.element;
        /**
         * @type {?}
         * @protected
         */
        MaskingValueDirective.prototype.renderer;
        /**
         * @type {?}
         * @protected
         */
        MaskingValueDirective.prototype.ngZone;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MuBrowserModule = /** @class */ (function () {
        function MuBrowserModule() {
        }
        /**
         * @return {?}
         */
        MuBrowserModule.forRoot = function () {
            return {
                ngModule: MuBrowserModule,
                providers: [
                    TRANSLATION_PROVIDERS,
                ]
            };
        };
        return MuBrowserModule;
    }());
    MuBrowserModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        forms.FormsModule,
                        forms.ReactiveFormsModule,
                        flexLayout.FlexLayoutModule,
                        MuComponentsRoutingModule,
                        formField.MatFormFieldModule,
                        datepicker.MatDatepickerModule,
                        input.MatInputModule,
                        select.MatSelectModule,
                        autocomplete.MatAutocompleteModule,
                        checkbox.MatCheckboxModule,
                        progressBar.MatProgressBarModule,
                        radio.MatRadioModule,
                        slider.MatSliderModule,
                        slideToggle.MatSlideToggleModule,
                        buttonToggle.MatButtonToggleModule,
                        menu.MatMenuModule,
                        card.MatCardModule,
                        core$1.MatRippleModule,
                        divider.MatDividerModule
                    ],
                    declarations: [
                        BottomInComponent,
                        ModalPopupComponent,
                        LoadingComponent,
                        LoadingErrorComponent,
                        LoadingOverlayComponent,
                        ToastComponent,
                        AlertDialogComponent,
                        InfiniteScrollComponent,
                        FilterComponent,
                        InputContainerComponent,
                        MuDataTableComponent,
                        DialerComponent,
                        FileUploadComponent,
                        MuFormContainerComponent,
                        PageNotFoundComponent,
                        DropDownMultiSelectComponent,
                        NcAutoFocusDirective,
                        NcMaxLengthDirective,
                        LongPressDirective,
                        NcStyleClassDirective,
                        NextInpFocusDirective,
                        AdjustElementsDirective,
                        NcFallbackCharDirective,
                        KeyboardDirective,
                        MaskingValueDirective,
                        NcAllowSingleClickDirective,
                        NcImgFallbackDirective,
                        ValidateImgDirective,
                        TranslatePipe,
                        GenericPipe,
                        CurrencyPipe,
                        KeypadComponent,
                        ExtractMobileNoPipe
                    ],
                    entryComponents: [
                        AlertDialogComponent,
                        KeypadComponent
                    ],
                    exports: [
                        BottomInComponent,
                        ModalPopupComponent,
                        LoadingComponent,
                        LoadingErrorComponent,
                        LoadingOverlayComponent,
                        ToastComponent,
                        InfiniteScrollComponent,
                        FilterComponent,
                        InputContainerComponent,
                        MuDataTableComponent,
                        DialerComponent,
                        KeypadComponent,
                        MuFormContainerComponent,
                        PageNotFoundComponent,
                        DropDownMultiSelectComponent,
                        NcAutoFocusDirective,
                        NcMaxLengthDirective,
                        LongPressDirective,
                        NcStyleClassDirective,
                        NextInpFocusDirective,
                        AdjustElementsDirective,
                        NcFallbackCharDirective,
                        KeyboardDirective,
                        MaskingValueDirective,
                        NcAllowSingleClickDirective,
                        NcImgFallbackDirective,
                        ValidateImgDirective,
                        TranslatePipe,
                        GenericPipe,
                        ExtractMobileNoPipe,
                        CurrencyPipe,
                        //Angular imports
                        common.CommonModule,
                        forms.FormsModule,
                        forms.ReactiveFormsModule,
                        flexLayout.FlexLayoutModule,
                        checkbox.MatCheckboxModule,
                        datepicker.MatDatepickerModule,
                        formField.MatFormFieldModule,
                        input.MatInputModule,
                        select.MatSelectModule,
                        autocomplete.MatAutocompleteModule,
                        radio.MatRadioModule,
                        progressBar.MatProgressBarModule,
                        slider.MatSliderModule,
                        slideToggle.MatSlideToggleModule,
                        buttonToggle.MatButtonToggleModule,
                        menu.MatMenuModule,
                        card.MatCardModule,
                        divider.MatDividerModule
                    ],
                    providers: [
                        CustomBreakPointsProvider,
                        TRANSLATION_PROVIDERS,
                    ]
                },] }
    ];

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var utf8Encodings = ['utf8', 'utf-8'];
    var TextEncDec = /** @class */ (function () {
        /**
         * @param {?} encFormat
         */
        function TextEncDec(encFormat) {
            if (utf8Encodings.indexOf(encFormat) < 0 && typeof encFormat !== 'undefined' && encFormat != null) {
                throw new RangeError('Invalid encoding type. Only utf-8 is supported');
            }
        }
        /**
         * @param {?} str
         * @return {?}
         */
        TextEncDec.prototype.encode = function (str) {
            if (typeof str !== 'string') {
                throw new TypeError('passed argument must be of tye string');
            }
            /** @type {?} */
            var binstr = unescape(encodeURIComponent(str));
            /** @type {?} */
            var uar = new Uint8Array(binstr.length);
            /** @type {?} */
            var split = binstr.split('');
            for (var i = 0; i < split.length; i++) {
                uar[i] = split[i].charCodeAt(0);
            }
            return uar;
        };
        /**
         * @param {?} uar
         * @return {?}
         */
        TextEncDec.prototype.decode = function (uar) {
            if (typeof uar === 'undefined') {
                return '';
            }
            if (!ArrayBuffer.isView(uar)) {
                throw new TypeError('passed argument must be an array buffer view');
            }
            else {
                /** @type {?} */
                var arr = new Uint8Array(uar.buffer, uar.byteOffset, uar.byteLength);
                /** @type {?} */
                var charArr = new Array(arr.length);
                for (var i = 0; i < arr.length; i++) {
                    charArr[i] = String.fromCharCode(arr[i]);
                }
                return decodeURIComponent(escape(charArr.join('')));
            }
        };
        return TextEncDec;
    }());

    /** @type {?} */
    var ASYM_ALGO = { name: 'RSA-OAEP', hash: { name: 'SHA-1' } };
    /** @type {?} */
    var arShortCode;
    /** @type {?} */
    var arUniqueId;
    /** @type {?} */
    var pwc;
    var EncryptionBrowser = /** @class */ (function () {
        /**
         * @param {?} rc
         * @param {?} ci
         * @param {?} rsaPubKey
         * @param {?} iv
         */
        function EncryptionBrowser(rc, ci, rsaPubKey, iv) {
            this.rc = rc;
            this.ci = ci;
            this.rsaPubKey = rsaPubKey;
            this.iv = iv;
            rc.setupLogger(this, 'EncryptionBrowser');
            this.symAlgo = { name: "AES-CBC", length: 256, iv: this.iv };
            if (!arShortCode)
                this.extractShortCode(rc, ci.shortName);
            if (!arUniqueId)
                this.extractUniqueId(rc, ci.customData.jsVersion);
            if (!pwc)
                pwc = new PakoWorkerClient(rc);
        }
        /**
         * @return {?}
         */
        EncryptionBrowser.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this;
                            return [4 /*yield*/, crypto.subtle.generateKey(this.symAlgo, true, ['encrypt', 'decrypt'])];
                        case 1:
                            _a.syncKey = _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?} wsConfig
         * @return {?}
         */
        EncryptionBrowser.prototype.encodeHeader = function (wsConfig) {
            return __awaiter(this, void 0, void 0, function () {
                var now, tsBuffer, encTs, tsB64, keyBuffer, encKey, keyB64, configBuffer, encConfig, configB64;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            now = Date.now() * 1000;
                            return [4 /*yield*/, this.encrypt(this.strToUnit8Ar(now.toString()))];
                        case 1:
                            tsBuffer = _a.sent();
                            encTs = ( /** @type {?} */(new Uint8Array(tsBuffer)));
                            tsB64 = btoa(String.fromCharCode.apply(String, __spread(encTs)));
                            return [4 /*yield*/, this.encryptSymKey()];
                        case 2:
                            keyBuffer = _a.sent();
                            encKey = ( /** @type {?} */(new Uint8Array(keyBuffer)));
                            keyB64 = btoa(String.fromCharCode.apply(String, __spread(encKey)));
                            return [4 /*yield*/, this.encrypt(this.strToUnit8Ar(JSON.stringify(wsConfig)))];
                        case 3:
                            configBuffer = _a.sent();
                            encConfig = ( /** @type {?} */(new Uint8Array(configBuffer)));
                            configB64 = btoa(String.fromCharCode.apply(String, __spread(encConfig)));
                            return [2 /*return*/, "" + tsB64 + keyB64 + configB64];
                    }
                });
            });
        };
        /**
         * @private
         * @return {?}
         */
        EncryptionBrowser.prototype.encryptSymKey = function () {
            return __awaiter(this, void 0, void 0, function () {
                var buffer, key, encKey;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, crypto.subtle.exportKey('raw', this.syncKey)];
                        case 1:
                            buffer = _a.sent();
                            return [4 /*yield*/, crypto.subtle.importKey('spki', this.rsaPubKey, ASYM_ALGO, false, ['encrypt'])];
                        case 2:
                            key = _a.sent();
                            return [4 /*yield*/, crypto.subtle.encrypt(ASYM_ALGO, key, buffer)];
                        case 3:
                            encKey = _a.sent();
                            return [2 /*return*/, encKey];
                    }
                });
            });
        };
        /**
         * @private
         * @param {?} ar
         * @return {?}
         */
        EncryptionBrowser.prototype.encrypt = function (ar) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, crypto.subtle.encrypt(this.symAlgo, this.syncKey, ar)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * @private
         * @param {?} ar
         * @return {?}
         */
        EncryptionBrowser.prototype.decrypt = function (ar) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, crypto.subtle.decrypt(this.symAlgo, this.syncKey, ar)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * @private
         * @param {?} ar
         * @return {?}
         */
        EncryptionBrowser.prototype.getArrayBuffer = function (ar) {
            if (ar.byteOffset === 0 && ar.byteLength === ar.buffer.byteLength)
                return ( /** @type {?} */(ar.buffer));
            return ( /** @type {?} */(ar.buffer.slice(ar.byteOffset, ar.byteOffset + ar.byteLength)));
        };
        /**
         * @param {?} data
         * @return {?}
         */
        EncryptionBrowser.prototype.encodeBody = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var str, firstPassArray, leader, deflate, ar, secondPassArray, _a, arOut;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            str = this.stringifyWireObjects(data);
                            leader = -1;
                            deflate = false;
                            if (!(str.length > core.Encoder.MIN_SIZE_TO_COMPRESS)) return [3 /*break*/, 2];
                            return [4 /*yield*/, pwc.deflate(str)];
                        case 1:
                            ar = _b.sent();
                            if (ar.length < str.length) {
                                firstPassArray = ar;
                                deflate = true;
                            }
                            _b.label = 2;
                        case 2:
                            if (!firstPassArray) {
                                firstPassArray = this.strToUnit8Ar(str);
                            }
                            _a = Uint8Array.bind;
                            return [4 /*yield*/, this.encrypt(firstPassArray)];
                        case 3:
                            secondPassArray = new (_a.apply(Uint8Array, [void 0, _b.sent()]))();
                            arOut = new Uint8Array(secondPassArray.byteLength + 1);
                            leader = deflate ? core.DataLeader.ENC_DEF_JSON : core.DataLeader.ENC_JSON;
                            arOut.set([leader]);
                            arOut.set(secondPassArray, 1);
                            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'encodeBody', {
                                first: data[0].name,
                                messages: data.length,
                                json: str.length,
                                wire: arOut.byteLength,
                                encrypted: true,
                                compressed: deflate,
                            });
                            return [2 /*return*/, arOut];
                    }
                });
            });
        };
        /**
         * @private
         * @param {?} objects
         * @return {?}
         */
        EncryptionBrowser.prototype.stringifyWireObjects = function (objects) {
            /** @type {?} */
            var strArray = objects.map(( /**
             * @param {?} wm
             * @return {?}
             */function (/**
             * @param {?} wm
             * @return {?}
             */ wm) { return wm.stringify(); }));
            return "[" + strArray.join(', ') + "]";
        };
        /**
         * @param {?} data
         * @return {?}
         */
        EncryptionBrowser.prototype.decodeBody = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var inAr, ar, leader, temp, _a, arData, index, decLen, deflated, newLineCode, jsonStr, wo, outAr, inJsonStr, _b, inJson;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            inAr = new Uint8Array(data, 1);
                            ar = new Uint8Array(data, 0, 1);
                            leader = ar[0];
                            _a = Uint8Array.bind;
                            return [4 /*yield*/, this.decrypt(inAr)];
                        case 1:
                            temp = new (_a.apply(Uint8Array, [void 0, _c.sent()]))();
                            deflated = false;
                            if (!(leader === core.DataLeader.BINARY)) return [3 /*break*/, 2];
                            newLineCode = '\n'.charCodeAt(0);
                            for (index = 0; index < temp.length; index++)
                                if (temp[index] === newLineCode)
                                    break;
                            jsonStr = String.fromCharCode.apply(String, __spread(( /** @type {?} */(temp.slice(0, index)))));
                            wo = ( /** @type {?} */(core.WireObject.getWireObject(JSON.parse(jsonStr))));
                            outAr = temp.slice(index + 1);
                            wo.data = outAr;
                            arData = [wo];
                            decLen = outAr.byteLength;
                            return [3 /*break*/, 6];
                        case 2:
                            deflated = leader === core.DataLeader.DEF_JSON || leader === core.DataLeader.ENC_DEF_JSON;
                            if (!deflated) return [3 /*break*/, 4];
                            return [4 /*yield*/, pwc.inflate(temp)];
                        case 3:
                            _b = _c.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            _b = this.uint8ArToStr(temp);
                            _c.label = 5;
                        case 5:
                            inJsonStr = _b;
                            inJson = JSON.parse(inJsonStr);
                            decLen = inJsonStr.length;
                            arData = Array.isArray(inJson) ? inJson : [inJsonStr];
                            for (index = 0; index < arData.length; index++) {
                                arData[index] = core.WireObject.getWireObject(JSON.parse(arData[index]));
                            }
                            _c.label = 6;
                        case 6:
                            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'decodeBody', {
                                first: arData[0].name,
                                messages: arData.length,
                                wire: data.byteLength,
                                message: decLen,
                                encrypted: leader === core.DataLeader.ENC_JSON || leader === core.DataLeader.ENC_BINARY || leader === core.DataLeader.ENC_DEF_JSON, compressed: leader === core.DataLeader.BINARY ? 'binary' : deflated
                            });
                            return [2 /*return*/, ( /** @type {?} */(arData))];
                    }
                });
            });
        };
        /**
         * @param {?} syncKey
         * @return {?}
         */
        EncryptionBrowser.prototype.setNewKey = function (syncKey) {
            return __awaiter(this, void 0, void 0, function () {
                var arEncNewKey, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            arEncNewKey = this.binToUnit8Ar(atob(syncKey));
                            _a = this;
                            return [4 /*yield*/, crypto.subtle.importKey('raw', arEncNewKey, this.symAlgo, true, ['encrypt', 'decrypt'])];
                        case 1:
                            _a.syncKey = _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        EncryptionBrowser.prototype.getSyncKeyB64 = function () {
            return __awaiter(this, void 0, void 0, function () {
                var buffer, arr;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, crypto.subtle.exportKey('raw', this.syncKey)];
                        case 1:
                            buffer = _a.sent();
                            arr = ( /** @type {?} */(new Uint8Array(buffer)));
                            return [2 /*return*/, btoa(String.fromCharCode.apply(String, __spread(arr)))];
                    }
                });
            });
        };
        /**
         * @param {?} binStr
         * @return {?}
         */
        EncryptionBrowser.prototype.binToUnit8Ar = function (binStr) {
            /** @type {?} */
            var cls = Uint8Array;
            return cls.from(binStr, ( /**
             * @param {?} c
             * @return {?}
             */function (c) { return c.charCodeAt(0); }));
        };
        /**
         * @param {?} str
         * @return {?}
         */
        EncryptionBrowser.prototype.strToUnit8Ar = function (str) {
            /** @type {?} */
            var TextEncoder = (( /** @type {?} */(window))).TextEncoder;
            return TextEncoder ? new TextEncoder('utf-8').encode(str) : new TextEncDec('utf-8').encode(str);
        };
        /**
         * @param {?} uar
         * @return {?}
         */
        EncryptionBrowser.prototype.uint8ArToStr = function (uar) {
            /** @type {?} */
            var TextDecoder = (( /** @type {?} */(window))).TextDecoder;
            return TextDecoder ? new TextDecoder('utf-8').decode(uar) : new TextEncDec('utf-8').decode(uar);
        };
        /**
         * @private
         * @param {?} rc
         * @param {?} code
         * @return {?}
         */
        EncryptionBrowser.prototype.extractShortCode = function (rc, code) {
            rc.isAssert() && rc.assert(rc.getName(this), code.length <= 4);
            arShortCode = new Uint8Array(4);
            for (var index = 0; index < code.length; index++) {
                /** @type {?} */
                var str = code.charAt(index);
                rc.isAssert() && rc.assert(rc.getName(this), str.match(/[a-zA-Z0-9]/));
                arShortCode[index] = str.charCodeAt(0) - 40;
            }
        };
        /**
         * @private
         * @param {?} rc
         * @param {?} id
         * @return {?}
         */
        EncryptionBrowser.prototype.extractUniqueId = function (rc, id) {
            /** @type {?} */
            var ar = id.split('.').map(( /**
             * @param {?} i
             * @return {?}
             */function (/**
             * @param {?} i
             * @return {?}
             */ i) { return Number(i); }));
            if (ar.length > 1) {
                rc.isAssert() && rc.assert(rc.getName(this), ar.length === 3 &&
                    !isNaN(ar[0]) && !isNaN(ar[1]) && !isNaN(ar[2]));
            }
            else {
                /** @type {?} */
                var num = Number(ar[0]);
                rc.isAssert() && rc.assert(rc.getName(this), !isNaN(num) && num <= 999999);
                ar[2] = num % 100;
                num = Math.floor(num / 100);
                ar[1] = num % 100;
                ar[0] = Math.floor(num / 100);
            }
            arUniqueId = Uint8Array.from(ar);
        };
        return EncryptionBrowser;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        EncryptionBrowser.prototype.syncKey;
        /**
         * @type {?}
         * @private
         */
        EncryptionBrowser.prototype.symAlgo;
        /**
         * @type {?}
         * @private
         */
        EncryptionBrowser.prototype.rc;
        /**
         * @type {?}
         * @private
         */
        EncryptionBrowser.prototype.ci;
        /**
         * @type {?}
         * @private
         */
        EncryptionBrowser.prototype.rsaPubKey;
        /**
         * @type {?}
         * @private
         */
        EncryptionBrowser.prototype.iv;
    }
    var AsyncRequest = /** @class */ (function () {
        /**
         * @param {?} apiName
         */
        function AsyncRequest(apiName) {
            var _this = this;
            this.apiName = apiName;
            this.requestId = AsyncRequest.nextRequestId++;
            this.promise = new Promise(( /**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */function (resolve, reject) {
                _this.resolve = resolve;
                _this.reject = reject;
            }));
        }
        return AsyncRequest;
    }());
    AsyncRequest.nextRequestId = 1;
    if (false) {
        /** @type {?} */
        AsyncRequest.nextRequestId;
        /** @type {?} */
        AsyncRequest.prototype.requestId;
        /** @type {?} */
        AsyncRequest.prototype.promise;
        /** @type {?} */
        AsyncRequest.prototype.resolve;
        /** @type {?} */
        AsyncRequest.prototype.reject;
        /** @type {?} */
        AsyncRequest.prototype.apiName;
    }
    var PakoWorkerClient = /** @class */ (function () {
        /**
         * @param {?} rc
         */
        function PakoWorkerClient(rc) {
            this.rc = rc;
            this.reqMap = {};
            /** @type {?} */
            var worker = this.worker = new Worker('js/pwc.js');
            worker.onmessage = this.onMessage.bind(this);
        }
        /**
         * @param {?} inU8Array
         * @return {?}
         */
        PakoWorkerClient.prototype.inflate = function (inU8Array) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendMessage('inflate', inU8Array, { to: 'string' })];
                        case 1: return [2 /*return*/, ( /** @type {?} */(_a.sent()))];
                    }
                });
            });
        };
        /**
         * @param {?} str
         * @return {?}
         */
        PakoWorkerClient.prototype.deflate = function (str) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendMessage('deflate', str)];
                        case 1: return [2 /*return*/, ( /** @type {?} */(_a.sent()))];
                    }
                });
            });
        };
        /**
         * @private
         * @param {?} apiName
         * @param {...?} params
         * @return {?}
         */
        PakoWorkerClient.prototype.sendMessage = function (apiName) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            /** @type {?} */
            var asyncRequest = new AsyncRequest(apiName);
            this.reqMap[asyncRequest.requestId] = asyncRequest;
            this.worker.postMessage(__spread([asyncRequest.requestId, apiName], params));
            return asyncRequest.promise;
        };
        /**
         * @param {?} event
         * @return {?}
         */
        PakoWorkerClient.prototype.onMessage = function (event) {
            var _a = __read(event.data), reqId = _a[0], resp = _a.slice(1);
            /** @type {?} */
            var asyncRequest = this.reqMap[reqId];
            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), asyncRequest);
            delete this.reqMap[reqId];
            asyncRequest.resolve.apply(asyncRequest, __spread(resp));
        };
        return PakoWorkerClient;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        PakoWorkerClient.prototype.worker;
        /**
         * @type {?}
         * @private
         */
        PakoWorkerClient.prototype.reqMap;
        /**
         * @type {?}
         * @private
         */
        PakoWorkerClient.prototype.rc;
    }

    /** @type {?} */
    var PING_SECS = 29;
    /** @type {?} */
    var TOLERANCE_SECS = 5;
    /** @type {?} */
    var RFRSH_LAST_REQ_SECS = 60;
    var WsBrowser = /** @class */ (function () {
        /**
         * @param {?} rc
         * @param {?} ci
         * @param {?} router
         */
        function WsBrowser(rc, ci, router) {
            this.rc = rc;
            this.ci = ci;
            this.router = router;
            this.socketCreateTs = 0;
            this.lastMessageTs = 0;
            this.sending = false;
            this.configured = false;
            this.connExpired = false;
            this.lastRequestTs = 0;
            this.ephemeralEvents = [];
            rc.setupLogger(this, 'WsBrowser');
            this.timerPing = rc.timer.register('ws-ping', this.cbTimerPing.bind(this));
            this.lastRequestTimer = rc.timer.register('ws-request', this.cbRequestTimer.bind(this));
            rc.isDebug() && rc.debug(rc.getName(this), 'constructor');
        }
        /**
         * @private
         * @param {?} ar
         * @return {?}
         */
        WsBrowser.prototype.uiArToB64 = function (ar) {
            return btoa(String.fromCharCode.apply(String, __spread(ar)));
        };
        /**
         * @param {?} event
         * @return {?}
         */
        WsBrowser.prototype.sendEphemeralEvent = function (event) {
            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), this.ci.provider);
            if (this.ephemeralEvents.length >= 20) {
                this.rc.isWarn() && this.rc.warn(this.rc.getName(this), 'Too many ephemeralEvents. Sizing to 20');
                while (this.ephemeralEvents.length >= 20)
                    this.ephemeralEvents.shift();
            }
            this.ephemeralEvents.push(event);
        };
        /**
         * @param {?} rc
         * @param {?} data
         * @return {?}
         */
        WsBrowser.prototype.send = function (rc, data) {
            /** @type {?} */
            var ws = this.ws;
            if (this.sending ||
                (ws && (ws.readyState !== WebSocket.OPEN || !this.configured || ws.bufferedAmount))) {
                rc.isStatus() && rc.status(rc.getName(this), 'Websocket is not ready right now', {
                    anotherSendInProgress: this.sending,
                    configured: this.configured,
                    readyState: this.ws ? this.ws.readyState : 'to be created',
                    bufferedAmount: this.ws.bufferedAmount
                });
                return core.XmnError._NotReady;
            }
            /** @type {?} */
            var objects = Array.isArray(data) ? data : [data];
            if (this.ephemeralEvents.length) {
                objects.push.apply(objects, __spread(this.ephemeralEvents));
                this.ephemeralEvents.length = 0;
            }
            this.sendInternal(rc, objects);
            return null;
        };
        /**
         * @return {?}
         */
        WsBrowser.prototype.requestClose = function () {
            /** @type {?} */
            var ws = this.ws;
            if (ws && ws.readyState !== WebSocket.CLOSED)
                ws.close();
        };
        /**
         * @private
         * @param {?} rc
         * @param {?} data
         * @return {?}
         */
        WsBrowser.prototype.sendInternal = function (rc, data) {
            return __awaiter(this, void 0, void 0, function () {
                var messageBody, _a, _b, url, header, wireObjIsOfReq;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            this.sending = true;
                            if (!!this.ws) return [3 /*break*/, 6];
                            this.pendingMessage = data;
                            if (!!this.encProvider) return [3 /*break*/, 2];
                            this.encProvider = new EncryptionBrowser(rc, this.ci, this.router.getPubKey(), this.router.getEncIV());
                            return [4 /*yield*/, this.encProvider.init()];
                        case 1:
                            _c.sent();
                            _c.label = 2;
                        case 2:
                            if (!!this.wsProviderConfig) return [3 /*break*/, 4];
                            _a = this;
                            _b = {
                                pingSecs: PING_SECS,
                                maxOpenSecs: this.router.getMaxOpenSecs(),
                                toleranceSecs: TOLERANCE_SECS
                            };
                            return [4 /*yield*/, this.encProvider.getSyncKeyB64()];
                        case 3:
                            _a.wsProviderConfig = (_b.key = _c.sent(),
                                _b.custom = this.ci.customData,
                                _b);
                            _c.label = 4;
                        case 4:
                            url = (this.ci.port === 443 || this.router.runAlwaysAsSecure(this.rc)
                                ? 'wss' : 'ws') + "://" + this.ci.host + ":" + this.ci.port + "/" + core.HANDSHAKE + "/" + this.ci.protocolVersion + "/" + this.ci.shortName + "/";
                            return [4 /*yield*/, this.encProvider.encodeHeader(this.wsProviderConfig)];
                        case 5:
                            header = _c.sent();
                            messageBody = encodeURIComponent(header);
                            this.ws = new WebSocket(url + messageBody);
                            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Opened socket with url', url + messageBody);
                            this.ws.binaryType = 'arraybuffer';
                            this.ws.onopen = this.onOpen.bind(this);
                            this.ws.onmessage = this.onMessage.bind(this);
                            this.ws.onclose = this.onClose.bind(this);
                            this.ws.onerror = this.onError.bind(this);
                            this.socketCreateTs = Date.now();
                            return [3 /*break*/, 8];
                        case 6:
                            if (!this.isConnWithinPing(Date.now())) { // Connection expired
                                rc.isDebug() && rc.debug(rc.getName(this), "Connection expired..requesting Socket close.");
                                this.sending = false;
                                this.connExpired = true;
                                this.requestClose();
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.encProvider.encodeBody(data)];
                        case 7:
                            messageBody = _c.sent();
                            this.ws.send(messageBody);
                            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Sent message', { msgLen: messageBody.length,
                                messages: data.length, firstMsg: data[0].name });
                            _c.label = 8;
                        case 8:
                            wireObjIsOfReq = data.some(( /**
                             * @param {?} wireObject
                             * @return {?}
                             */function (/**
                             * @param {?} wireObject
                             * @return {?}
                             */ wireObject) { return wireObject.type === core.WIRE_TYPE.REQUEST; }));
                            if (wireObjIsOfReq && this.router.canStrtLastReqTimer(this.rc)) {
                                this.setLastReqTimer(rc);
                            }
                            this.setupTimer(rc);
                            this.sending = false;
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        WsBrowser.prototype.onOpen = function () {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onOpen() in', Date.now() - this.socketCreateTs, 'ms');
            this.router.providerReady();
        };
        /**
         * @param {?} msgEvent
         * @return {?}
         */
        WsBrowser.prototype.onMessage = function (msgEvent) {
            return __awaiter(this, void 0, void 0, function () {
                var data, messages;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            data = msgEvent.data;
                            return [4 /*yield*/, this.encProvider.decodeBody(data)];
                        case 1:
                            messages = _a.sent();
                            return [4 /*yield*/, this.router.providerMessage(this.rc, messages)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?} err
         * @return {?}
         */
        WsBrowser.prototype.onError = function (err) {
            this.rc.isWarn() && this.rc.warn(this.rc.getName(this), 'Websocket onError()', err);
            if (this.ci.provider) {
                this.cleanup();
                this.router.providerFailed();
            }
        };
        /**
         * @return {?}
         */
        WsBrowser.prototype.onClose = function () {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Websocket onClose()');
            if (this.ci.provider) {
                this.cleanup();
                this.router.providerFailed(this.connExpired ? core.XmnError._ConnectionExpired : null);
            }
        };
        /**
         * @param {?} rc
         * @param {?} se
         * @return {?}
         */
        WsBrowser.prototype.processSysEvent = function (rc, se) {
            return __awaiter(this, void 0, void 0, function () {
                var config, msPingSecs, errMsg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(se.name === core.SYS_EVENT.WS_PROVIDER_CONFIG)) return [3 /*break*/, 5];
                            config = ( /** @type {?} */(se.data));
                            msPingSecs = config.pingSecs;
                            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), msPingSecs && Number.isInteger(msPingSecs), msPingSecs);
                            Object.assign(this.wsProviderConfig, config);
                            if (!config.key) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.encProvider.setNewKey(config.key)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'First message in', Date.now() - this.socketCreateTs, 'ms');
                            this.configured = true;
                            if (!this.pendingMessage) return [3 /*break*/, 4];
                            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), "Sending Pending Message...");
                            return [4 /*yield*/, this.send(this.rc, this.pendingMessage)];
                        case 3:
                            _a.sent();
                            this.pendingMessage = null;
                            _a.label = 4;
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            if (se.name === core.SYS_EVENT.ERROR) {
                                errMsg = ( /** @type {?} */(se.data));
                                rc.isWarn() && rc.warn(rc.getName(this), 'processSysEvent', errMsg);
                                if (this.ci.provider) {
                                    this.cleanup();
                                    this.router.providerFailed(errMsg.code);
                                }
                            }
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @private
         * @param {?} requestTs
         * @return {?}
         */
        WsBrowser.prototype.isConnWithinPing = function (requestTs) {
            /** @type {?} */
            var wsConfig = this.wsProviderConfig;
            /** @type {?} */
            var pingTh = this.lastMessageTs + (wsConfig.pingSecs + wsConfig.toleranceSecs) * 1000;
            /** @type {?} */
            var openTh = this.socketCreateTs + (wsConfig.maxOpenSecs - wsConfig.toleranceSecs) * 1000;
            return requestTs < pingTh && requestTs < openTh;
        };
        /**
         * @private
         * @param {?} rc
         * @return {?}
         */
        WsBrowser.prototype.setLastReqTimer = function (rc) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.lastRequestTs = Date.now();
                            this.lastRequestTimer.tickAfter(RFRSH_LAST_REQ_SECS * 1000, true);
                            if (!!this.sessionTimedoutSecs) return [3 /*break*/, 2];
                            _a = this;
                            return [4 /*yield*/, this.router.getSessionTimeOutSecs(rc)];
                        case 1:
                            _a.sessionTimedoutSecs = _b.sent();
                            _b.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @private
         * @param {?} rc
         * @return {?}
         */
        WsBrowser.prototype.setupTimer = function (rc) {
            this.lastMessageTs = Date.now();
            this.timerPing.tickAfter(this.wsProviderConfig.pingSecs * 1000, true);
        };
        /**
         * @private
         * @return {?}
         */
        WsBrowser.prototype.cbRequestTimer = function () {
            if (!this.ci.provider)
                return 0;
            /** @type {?} */
            var now = Date.now();
            /** @type {?} */
            var diff = now - this.lastRequestTs;
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), "cbRequestTimer " + diff + ", " + this.sessionTimedoutSecs);
            if (diff >= (this.sessionTimedoutSecs * 1000)) {
                this.rc.isDebug() && this.rc.debug(this.rc.getName(this), "Session timed out. Closing session");
                this.router.sessionTimedOut(this.rc);
                this.requestClose();
                return RFRSH_LAST_REQ_SECS * 1000;
            }
            return diff;
        };
        /**
         * @private
         * @return {?}
         */
        WsBrowser.prototype.cbTimerPing = function () {
            if (!this.ci.provider)
                return 0;
            /** @type {?} */
            var now = Date.now();
            /** @type {?} */
            var diff = this.lastMessageTs + this.wsProviderConfig.pingSecs * 1000 - now;
            if (diff <= 0) {
                this.send(this.rc, [new core.WireSysEvent(core.SYS_EVENT.PING, {})]);
                return this.wsProviderConfig.pingSecs * 1000;
            }
            return diff;
        };
        /**
         * @private
         * @return {?}
         */
        WsBrowser.prototype.cleanup = function () {
            if (!this.ci.provider)
                return;
            try {
                this.timerPing.remove();
                this.lastRequestTimer.remove();
                this.encProvider = ( /** @type {?} */(null));
                this.ci.provider = ( /** @type {?} */(null));
                if (this.ws)
                    this.ws.close();
                this.ws = ( /** @type {?} */(null));
            }
            catch (e) { }
        };
        return WsBrowser;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        WsBrowser.prototype.ws;
        /**
         * @type {?}
         * @private
         */
        WsBrowser.prototype.encProvider;
        /**
         * @type {?}
         * @private
         */
        WsBrowser.prototype.timerPing;
        /**
         * @type {?}
         * @private
         */
        WsBrowser.prototype.lastRequestTimer;
        /**
         * @type {?}
         * @private
         */
        WsBrowser.prototype.wsProviderConfig;
        /**
         * @type {?}
         * @private
         */
        WsBrowser.prototype.pendingMessage;
        /**
         * @type {?}
         * @private
         */
        WsBrowser.prototype.socketCreateTs;
        /**
         * @type {?}
         * @private
         */
        WsBrowser.prototype.lastMessageTs;
        /**
         * @type {?}
         * @private
         */
        WsBrowser.prototype.sending;
        /**
         * @type {?}
         * @private
         */
        WsBrowser.prototype.configured;
        /**
         * @type {?}
         * @private
         */
        WsBrowser.prototype.connExpired;
        /**
         * @type {?}
         * @private
         */
        WsBrowser.prototype.lastRequestTs;
        /**
         * @type {?}
         * @private
         */
        WsBrowser.prototype.ephemeralEvents;
        /**
         * @type {?}
         * @private
         */
        WsBrowser.prototype.sessionTimedoutSecs;
        /**
         * @type {?}
         * @private
         */
        WsBrowser.prototype.rc;
        /**
         * @type {?}
         * @private
         */
        WsBrowser.prototype.ci;
        /**
         * @type {?}
         * @private
         */
        WsBrowser.prototype.router;
    }

    /** @type {?} */
    var TIMEOUT_MS = 30000;
    /** @type {?} */
    var SEND_RETRY_MS = 1000;
    /** @type {?} */
    var SEND_TIMEOUT = 10000;
    /** @type {?} */
    var EVENT_SEND_DELAY = 1000;
    /** @type {?} */
    var MAX_EVENTS_TO_SEND = 5;
    /**
     * @record
     */
    function BrowserConnectionInfo() { }
    if (false) {
        /** @type {?} */
        BrowserConnectionInfo.prototype.provider;
    }
    /**
     * @abstract
     */
    var XmnRouterBrowser = /** @class */ (function () {
        /**
         * @param {?} rc
         * @param {?} serverUrl
         * @param {?} ci
         * @param {?} pubKey
         * @param {?} encIV
         */
        function XmnRouterBrowser(rc, serverUrl, ci, pubKey, encIV) {
            this.rc = rc;
            this.ongoingRequests = [];
            this.eventSubMap = {};
            // This flag indicates that events can be sent. This is to allow application to
            // have control when events are being sent. Normally, events are sent after 
            // getting client identity or login. But in background runs, events can be sent 
            // immediately
            this.lastEventTs = 0;
            this.lastEventSendTs = 0;
            /** @type {?} */
            var urlParser = document.createElement('a');
            urlParser.href = serverUrl;
            this.ci = ( /** @type {?} */(ci));
            this.ci.protocol = core.Protocol.WEBSOCKET;
            this.ci.host = urlParser.hostname;
            this.ci.port = Number(urlParser.port) || (urlParser.protocol === 'https:' ? 443 : 80);
            /** @type {?} */
            var cls = Uint8Array;
            this.pubKey = cls.from(atob(pubKey), ( /**
             * @param {?} c
             * @return {?}
             */function (c) { return c.charCodeAt(0); }));
            this.encIV = encIV;
            this.timerReqResend = rc.timer.register('router-resend', this.cbTimerReqResend.bind(this));
            this.timerReqTimeout = rc.timer.register('router-req-timeout', this.cbTimerReqTimeout.bind(this));
            this.timerEventTimeout = rc.timer.register('router-event-timeout', this.cbTimerEventTimeout.bind(this));
            rc.isDebug() && rc.debug(rc.getName(this), 'constructor');
        }
        /**
         * @return {?}
         */
        XmnRouterBrowser.prototype.getPubKey = function () { return this.pubKey; };
        /**
         * @return {?}
         */
        XmnRouterBrowser.prototype.getEncIV = function () { return this.encIV; };
        /**
         * @param {?} rc
         * @param {?} apiName
         * @param {?} data
         * @param {?=} timeoutMS
         * @return {?}
         */
        XmnRouterBrowser.prototype.sendRequest = function (rc, apiName, data, timeoutMS) {
            return __awaiter(this, void 0, void 0, function () {
                var timeout;
                var _this = this;
                return __generator(this, function (_a) {
                    timeout = timeoutMS || TIMEOUT_MS;
                    return [2 /*return*/, new Promise(( /**
                         * @param {?} resolve
                         * @param {?} reject
                         * @return {?}
                         */function (resolve, reject) {
                            /** @type {?} */
                            var wr = new core.WireRequest(apiName, data, 0, resolve, reject);
                            _this.ongoingRequests.push(wr);
                            if (!_this.ci.provider)
                                _this.prepareConnection(rc);
                            if (!_this.ci.provider.send(rc, [wr])) {
                                wr._isSent = true;
                                rc.isDebug() && rc.debug(rc.getName(_this), 'sent request', wr);
                                _this.timerReqTimeout.tickAfter(timeout);
                            }
                            else {
                                rc.isStatus() && rc.status(rc.getName(_this), 'send to be retried', wr);
                                _this.timerReqResend.tickAfter(SEND_RETRY_MS);
                            }
                        }))];
                });
            });
        };
        /**
         * @protected
         * @param {?} rc
         * @param {?} eventName
         * @param {?} data
         * @return {?}
         */
        XmnRouterBrowser.prototype.sendPersistentEvent = function (rc, eventName, data) {
            return __awaiter(this, void 0, void 0, function () {
                var customData, event, eventTable;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.ci.provider)
                                this.prepareConnection(rc);
                            customData = this.ci.customData;
                            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'sendPersistentEvent', eventName, 'customData', customData && customData.clientId);
                            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), customData && customData.clientId, 'You cannot send events without clientId');
                            return [4 /*yield*/, this.initEvents()];
                        case 1:
                            if (!_a.sent()) return [3 /*break*/, 4];
                            event = new core.WireEvent(eventName, data);
                            eventTable = new EventTable(event);
                            return [4 /*yield*/, eventTable.save(this.db)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.trySendingEvents(rc)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @protected
         * @param {?} rc
         * @param {?} eventName
         * @param {?} data
         * @return {?}
         */
        XmnRouterBrowser.prototype.sendEphemeralEvent = function (rc, eventName, data) {
            return __awaiter(this, void 0, void 0, function () {
                var customData, event;
                return __generator(this, function (_a) {
                    if (!this.ci.provider)
                        this.prepareConnection(rc);
                    customData = this.ci.customData;
                    this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'sendEphemeralEvent', eventName, 'customData', customData && customData.clientId);
                    this.rc.isAssert() && this.rc.assert(this.rc.getName(this), customData && customData.clientId, 'You cannot send events without clientId');
                    event = new core.WireEphEvent(eventName, data);
                    this.ci.provider.sendEphemeralEvent(event);
                    return [2 /*return*/];
                });
            });
        };
        /**
         * @param {?} eventName
         * @param {?} eventHandler
         * @return {?}
         */
        XmnRouterBrowser.prototype.subscribeEvent = function (eventName, eventHandler) {
            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), eventName && eventHandler);
            this.eventSubMap[eventName] = eventHandler;
        };
        /**
         * @param {?} rc
         * @return {?}
         */
        XmnRouterBrowser.prototype.prepareConnection = function (rc) {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'prepareConnection', !!this.ci.provider);
            this.ci.customData = this.getCustomData(rc);
            this.ci.customData.networkType = this.getNetworkType(rc);
            this.ci.customData.networkType = this.getLocation(rc);
            if (!this.ci.provider)
                this.ci.provider = new WsBrowser(rc, this.ci, this);
        };
        /**
         * @private
         * @return {?}
         */
        XmnRouterBrowser.prototype.initEvents = function () {
            return __awaiter(this, void 0, void 0, function () {
                var customData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            customData = this.ci.customData;
                            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'initEvents', !!this.db);
                            if (!(!this.db && customData && customData.clientId)) return [3 /*break*/, 2];
                            this.db = new XmnDb(this.ci.customData.clientId);
                            return [4 /*yield*/, EventTable.removeOldByTs(this.rc, this.db, Date.now() - 7 * 24 * 3600000 /* 7 days */)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/, !!this.db];
                    }
                });
            });
        };
        /**
         * @private
         * @param {?} rc
         * @return {?}
         */
        XmnRouterBrowser.prototype.trySendingEvents = function (rc) {
            return __awaiter(this, void 0, void 0, function () {
                var arEvent, index, eventTable, wireEvent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.ci.customData.networkType || this.lastEventTs) {
                                rc.isDebug() && rc.debug(rc.getName(this), 'Skipping sending event as not ready', {
                                    networkType: this.ci.customData.networkType,
                                    lastEventTs: this.lastEventTs
                                });
                                return [2 /*return*/];
                            }
                            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'trySendingEvents', !!this.db);
                            return [4 /*yield*/, EventTable.getOldEvents(rc, this.db)];
                        case 1:
                            arEvent = _a.sent();
                            if (!arEvent.length)
                                return [2 /*return*/];
                            // We need to guard trigger from the timeout timer, while waiting to get data from event table, earlier trySendingEvents
                            // has succeeded
                            if (this.lastEventTs)
                                return [2 /*return*/];
                            index = 0;
                            _a.label = 2;
                        case 2:
                            if (!(index < arEvent.length)) return [3 /*break*/, 5];
                            if (!this.ci.provider)
                                this.prepareConnection(rc);
                            eventTable = arEvent[index];
                            wireEvent = new core.WireEvent(eventTable.name, JSON.parse(eventTable.data), eventTable.ts);
                            if (this.ci.provider.send(rc, [wireEvent]))
                                return [3 /*break*/, 5]; // failed to send
                            rc.isDebug() && rc.debug(rc.getName(this), 'sent event', wireEvent);
                            this.lastEventTs = wireEvent.ts / 1000;
                            this.lastEventSendTs = Date.now();
                            this.timerEventTimeout.tickAfter(TIMEOUT_MS, true);
                            return [4 /*yield*/, core.Mubble.uPromise.delayedPromise(EVENT_SEND_DELAY)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            index++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        XmnRouterBrowser.prototype.providerReady = function () {
            return __awaiter(this, void 0, void 0, function () {
                var customData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.cbTimerReqResend();
                            customData = this.ci.customData;
                            if (!(customData && customData.clientId)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.initEvents()];
                        case 1:
                            if (_a.sent())
                                this.trySendingEvents(this.rc); // not awaiting as it will introduce delay
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?=} errCode
         * @return {?}
         */
        XmnRouterBrowser.prototype.providerFailed = function (errCode) {
            // finishRequest removed the item from ongoingRequests array
            while (this.ongoingRequests.length) {
                /** @type {?} */
                var wr = this.ongoingRequests[0];
                this.finishRequest(this.rc, 0, errCode || core.XmnError.ConnectionFailed, null);
            }
            this.ongoingRequests = [];
            this.lastEventTs = 0;
            this.lastEventSendTs = 0;
        };
        /**
         * @param {?} rc
         * @param {?} arData
         * @return {?}
         */
        XmnRouterBrowser.prototype.providerMessage = function (rc, arData) {
            return __awaiter(this, void 0, void 0, function () {
                var index, wo, _a, handler, eventResp, resp, index_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            index = 0;
                            _b.label = 1;
                        case 1:
                            if (!(index < arData.length)) return [3 /*break*/, 17];
                            wo = arData[index];
                            rc.isDebug() && rc.debug(rc.getName(this), "providerMessage@" + index, wo);
                            _a = wo.type;
                            switch (_a) {
                                case core.WIRE_TYPE.REQUEST: return [3 /*break*/, 2];
                                case core.WIRE_TYPE.EPH_EVENT: return [3 /*break*/, 3];
                                case core.WIRE_TYPE.EVENT_RESP: return [3 /*break*/, 7];
                                case core.WIRE_TYPE.REQ_RESP: return [3 /*break*/, 11];
                                case core.WIRE_TYPE.SYS_EVENT: return [3 /*break*/, 13];
                            }
                            return [3 /*break*/, 15];
                        case 2:
                            this.rc.isError() && this.rc.error(this.rc.getName(this), 'Not implemented', wo);
                            return [3 /*break*/, 16];
                        case 3:
                            handler = this.eventSubMap[wo.name];
                            if (!handler) return [3 /*break*/, 5];
                            return [4 /*yield*/, handler(rc, wo.name, wo.data)];
                        case 4:
                            _b.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            exports.EventSystem.broadcast(rc, wo.name, wo.data);
                            _b.label = 6;
                        case 6: return [3 /*break*/, 16];
                        case 7:
                            eventResp = ( /** @type {?} */(wo));
                            rc.isAssert() && rc.assert(rc.getName(this), eventResp.ts / 1000);
                            return [4 /*yield*/, EventTable.removeOldByTs(rc, this.db, eventResp.ts / 1000)];
                        case 8:
                            _b.sent();
                            if (!(this.lastEventTs === eventResp.ts / 1000)) return [3 /*break*/, 10];
                            this.lastEventTs = 0;
                            this.lastEventSendTs = 0;
                            this.timerEventTimeout.remove();
                            return [4 /*yield*/, this.trySendingEvents(rc)];
                        case 9:
                            _b.sent();
                            _b.label = 10;
                        case 10: return [3 /*break*/, 16];
                        case 11:
                            resp = ( /** @type {?} */(wo));
                            index_1 = findIndex__default['default'](this.ongoingRequests, { ts: resp.ts });
                            if (index_1 === -1) {
                                this.rc.isStatus() && this.rc.status(this.rc.getName(this), 'Got response for request that is not in progress... timed-out?', resp.name, 'sent at', new Date(resp.ts / 1000));
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.finishRequest(this.rc, index_1, resp.errorCode, resp.errorMessage, resp.data)];
                        case 12:
                            _b.sent();
                            return [3 /*break*/, 16];
                        case 13: return [4 /*yield*/, this.processSysEvent(this.rc, wo)];
                        case 14:
                            _b.sent();
                            return [3 /*break*/, 16];
                        case 15:
                            this.rc.isError() && this.rc.error(this.rc.getName(this), 'Unknown message', wo);
                            _b.label = 16;
                        case 16:
                            index++;
                            return [3 /*break*/, 1];
                        case 17: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        XmnRouterBrowser.prototype.requestClose = function () {
            this.ci.provider.requestClose();
        };
        /**
         * @private
         * @param {?} rc
         * @param {?} se
         * @return {?}
         */
        XmnRouterBrowser.prototype.processSysEvent = function (rc, se) {
            return __awaiter(this, void 0, void 0, function () {
                var newConfig;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(se.name === core.SYS_EVENT.WS_PROVIDER_CONFIG)) return [3 /*break*/, 2];
                            newConfig = ( /** @type {?} */(se.data));
                            return [4 /*yield*/, this.updateCustomData(rc, newConfig.custom)];
                        case 1:
                            _a.sent();
                            this.prepareConnection(rc);
                            _a.label = 2;
                        case 2: return [4 /*yield*/, this.ci.provider.processSysEvent(this.rc, se)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @private
         * @return {?}
         */
        XmnRouterBrowser.prototype.cbTimerReqResend = function () {
            /** @type {?} */
            var wr = this.ongoingRequests.find(( /**
             * @param {?} wr
             * @return {?}
             */function (/**
             * @param {?} wr
             * @return {?}
             */ wr) { return !wr._isSent; }));
            if (!wr || !this.ci.provider)
                return 0;
            if (!this.ci.provider.send(this.rc, wr)) {
                wr._isSent = true;
                this.timerReqTimeout.tickAfter(TIMEOUT_MS);
            }
            else if ((Date.now() - wr.ts / 1000) > SEND_TIMEOUT) {
                this.finishRequest(this.rc, this.ongoingRequests.indexOf(wr), core.XmnError.SendTimedOut, null);
            }
            else {
                return SEND_RETRY_MS;
            }
            // We need to see if there are still messages left to be sent
            return this.ongoingRequests.find(( /**
             * @param {?} wr
             * @return {?}
             */function (/**
             * @param {?} wr
             * @return {?}
             */ wr) { return !wr._isSent; })) ? SEND_RETRY_MS : 0;
        };
        /**
         * @private
         * @return {?}
         */
        XmnRouterBrowser.prototype.cbTimerReqTimeout = function () {
            /** @type {?} */
            var now = Date.now();
            /** @type {?} */
            var nextTimeout = Number.MAX_SAFE_INTEGER;
            for (var index = 0; index < this.ongoingRequests.length; index++) {
                /** @type {?} */
                var wr = this.ongoingRequests[index];
                /** @type {?} */
                var timeoutAt = wr.ts / 1000 + TIMEOUT_MS;
                if (wr._isSent) {
                    if (now >= timeoutAt) {
                        this.finishRequest(this.rc, index--, core.XmnError.RequestTimedOut, null);
                    }
                    else {
                        if (nextTimeout > timeoutAt)
                            nextTimeout = timeoutAt;
                    }
                }
            }
            return nextTimeout === Number.MAX_SAFE_INTEGER ? 0 : nextTimeout - now;
        };
        /**
         * @private
         * @return {?}
         */
        XmnRouterBrowser.prototype.cbTimerEventTimeout = function () {
            if (!this.lastEventSendTs)
                return 0;
            /** @type {?} */
            var diff = this.lastEventSendTs + TIMEOUT_MS - Date.now();
            if (diff > 0)
                return diff;
            this.lastEventTs = 0;
            this.lastEventSendTs = 0;
            this.trySendingEvents(this.rc);
            return TIMEOUT_MS;
        };
        /**
         * @private
         * @param {?} rc
         * @param {?} index
         * @param {?} errorCode
         * @param {?} errorMessage
         * @param {?=} data
         * @return {?}
         */
        XmnRouterBrowser.prototype.finishRequest = function (rc, index, errorCode, errorMessage, data) {
            /** @type {?} */
            var wr = this.ongoingRequests[index];
            /** @type {?} */
            var now = Date.now();
            this.ongoingRequests.splice(index, 1);
            if (!wr.resolve) {
                rc.isStatus() && rc.status(rc.getName(this), 'Trying to finish already finished request', errorCode, wr.name, 'created at', new Date(wr.ts / 1000), 'timeTaken', now - wr.ts / 1000, 'ms');
                return;
            }
            if (errorCode) {
                rc.isStatus() && rc.status(rc.getName(this), 'Request failed with code', errorCode, wr.name, 'created at', new Date(wr.ts / 1000), 'timeTaken', now - wr.ts / 1000, 'ms');
                wr.reject(new core.Mubble.uError(errorCode, errorMessage || ''));
            }
            else {
                rc.isStatus() && rc.status(rc.getName(this), 'Request succeeded', wr.name, 'created at', new Date(wr.ts / 1000), 'timeTaken', now - wr.ts / 1000, 'ms');
                wr.resolve(data);
            }
            wr.reject = null;
            wr.resolve = null;
        };
        return XmnRouterBrowser;
    }()); // end of class
    if (false) {
        /**
         * @type {?}
         * @private
         */
        XmnRouterBrowser.prototype.ci;
        /**
         * @type {?}
         * @private
         */
        XmnRouterBrowser.prototype.ongoingRequests;
        /**
         * @type {?}
         * @private
         */
        XmnRouterBrowser.prototype.eventSubMap;
        /**
         * @type {?}
         * @private
         */
        XmnRouterBrowser.prototype.timerReqResend;
        /**
         * @type {?}
         * @private
         */
        XmnRouterBrowser.prototype.timerReqTimeout;
        /**
         * @type {?}
         * @private
         */
        XmnRouterBrowser.prototype.timerEventTimeout;
        /**
         * @type {?}
         * @private
         */
        XmnRouterBrowser.prototype.db;
        /**
         * @type {?}
         * @private
         */
        XmnRouterBrowser.prototype.lastEventTs;
        /**
         * @type {?}
         * @private
         */
        XmnRouterBrowser.prototype.lastEventSendTs;
        /**
         * @type {?}
         * @private
         */
        XmnRouterBrowser.prototype.pubKey;
        /**
         * @type {?}
         * @private
         */
        XmnRouterBrowser.prototype.encIV;
        /**
         * @type {?}
         * @private
         */
        XmnRouterBrowser.prototype.rc;
        /**
         * @abstract
         * @param {?} rc
         * @return {?}
         */
        XmnRouterBrowser.prototype.getNetworkType = function (rc) { };
        /**
         * @abstract
         * @param {?} rc
         * @return {?}
         */
        XmnRouterBrowser.prototype.getLocation = function (rc) { };
        /**
         * @abstract
         * @return {?}
         */
        XmnRouterBrowser.prototype.getMaxOpenSecs = function () { };
        /**
         * @abstract
         * @param {?} rc
         * @return {?}
         */
        XmnRouterBrowser.prototype.getCustomData = function (rc) { };
        /**
         * @abstract
         * @param {?} rc
         * @param {?} customData
         * @return {?}
         */
        XmnRouterBrowser.prototype.updateCustomData = function (rc, customData) { };
        /**
         * @abstract
         * @param {?} rc
         * @return {?}
         */
        XmnRouterBrowser.prototype.canStrtLastReqTimer = function (rc) { };
        /**
         * @abstract
         * @param {?} rc
         * @return {?}
         */
        XmnRouterBrowser.prototype.getSessionTimeOutSecs = function (rc) { };
        /**
         * @abstract
         * @param {?} rc
         * @return {?}
         */
        XmnRouterBrowser.prototype.sessionTimedOut = function (rc) { };
        /**
         * @abstract
         * @param {?} rc
         * @return {?}
         */
        XmnRouterBrowser.prototype.runAlwaysAsSecure = function (rc) { };
    }
    // end of class
    var EventTable = /** @class */ (function () {
        /**
         * @param {?=} event
         */
        function EventTable(event) {
            if (!event)
                return;
            this.ts = event.ts / 1000;
            this.name = event.name;
            this.data = JSON.stringify(event.data);
        }
        /**
         * @param {?} db
         * @return {?}
         */
        EventTable.prototype.save = function (db) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, db.transaction('rw', db.events, ( /**
                             * @return {?}
                             */function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, db.events.put(this)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Static functions for io
         * @param {?} rc
         * @param {?} db
         * @return {?}
         */
        EventTable.getOldEvents = function (rc, db) {
            return __awaiter(this, void 0, void 0, function () {
                var ar, arEt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, db.events.orderBy('ts').limit(MAX_EVENTS_TO_SEND).toArray()];
                        case 1:
                            ar = _a.sent();
                            arEt = ar.map(( /**
                             * @param {?} item
                             * @return {?}
                             */function (/**
                             * @param {?} item
                             * @return {?}
                             */ item) {
                                /** @type {?} */
                                var et = new EventTable();
                                et.ts = item.ts;
                                et.name = item.name;
                                et.data = item.data;
                                return et;
                            }));
                            rc.isDebug() && rc.debug(rc.getName(this), 'Retrieved events from db, count:', arEt.length);
                            return [2 /*return*/, arEt];
                    }
                });
            });
        };
        /**
         * @param {?} rc
         * @param {?} db
         * @param {?} ts
         * @return {?}
         */
        EventTable.removeOldByTs = function (rc, db, ts) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, db.transaction('rw', db.events, ( /**
                             * @return {?}
                             */function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, db.events.where('ts').belowOrEqual(ts).delete()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                        case 1:
                            _a.sent();
                            rc.isDebug() && rc.debug(rc.getName(this), 'Deleted events from db with ts belowOrEqual:', ts);
                            return [2 /*return*/];
                    }
                });
            });
        };
        return EventTable;
    }());
    if (false) {
        /** @type {?} */
        EventTable.prototype.ts;
        /** @type {?} */
        EventTable.prototype.name;
        /** @type {?} */
        EventTable.prototype.data;
    }
    // http://dexie.org/docs/Typescript.html
    var XmnDb = /** @class */ (function (_super) {
        __extends(XmnDb, _super);
        // number: type of primary key
        /**
         * @param {?} clientId
         */
        function XmnDb(clientId) {
            var _this = _super.call(this, 'xmn-' + clientId) || this;
            _this.version(1).stores({
                events: 'ts'
            });
            _this.events.mapToClass(EventTable);
            return _this;
        }
        return XmnDb;
    }(Dexie__default['default']));
    if (false) {
        /** @type {?} */
        XmnDb.prototype.events;
    }

    /** @type {?} */
    var LAST_USER = 'lastUser';
    /** @type {?} */
    var USERS = 'users';
    /**
     * @abstract
     */
    var UserKeyValue = /** @class */ (function () {
        /**
         * @param {?} rc
         * @param {?} storage
         */
        function UserKeyValue(rc, storage) {
            this.rc = rc;
            this.storage = storage;
            this.users = {};
        }
        /**
         * @return {?}
         */
        UserKeyValue.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var users, cid;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.storage.getUserKeyValue(this.rc, USERS)];
                        case 1:
                            users = _a.sent();
                            if (!users)
                                return [2 /*return*/];
                            this.users = JSON.parse(users);
                            return [4 /*yield*/, this.storage.getUserKeyValue(this.rc, LAST_USER)];
                        case 2:
                            cid = _a.sent();
                            this.lastClientId = Number(cid);
                            if (!this.lastClientId)
                                return [2 /*return*/];
                            this.deserialize(this.users[this.lastClientId]);
                            return [2 /*return*/, this];
                    }
                });
            });
        };
        /**
         * @param {?} clientId
         * @param {?} userLinkId
         * @param {?} userName
         * @return {?}
         */
        UserKeyValue.prototype.registerNewUser = function (clientId, userLinkId, userName) {
            return __awaiter(this, void 0, void 0, function () {
                var obj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            obj = { clientId: clientId, userLinkId: userLinkId, userName: userName };
                            this.users[clientId] = obj;
                            return [4 /*yield*/, this.storage.setUserKeyValue(this.rc, USERS, JSON.stringify(this.users))];
                        case 1:
                            _a.sent();
                            if (!(this.lastClientId !== clientId)) return [3 /*break*/, 3];
                            this.lastClientId = clientId;
                            return [4 /*yield*/, this.storage.setUserKeyValue(this.rc, LAST_USER, String(this.lastClientId))];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            this.deserialize(obj);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?} routeName
         * @return {?}
         */
        UserKeyValue.prototype.setScreenVisited = function (routeName) {
            if (!this.screenVisitedStates)
                this.screenVisitedStates = {};
            if (this.screenVisitedStates[routeName])
                return;
            this.screenVisitedStates[routeName] = true;
            this.rc.isStatus() && this.rc.status(this.rc.getName(this), 'visited screen', routeName);
            this.save(this.rc);
        };
        /**
         * @param {?} rc
         * @param {?} base64
         * @return {?}
         */
        UserKeyValue.prototype.setWebProfilePicBase64 = function (rc, base64) {
            this._webProfilePicBase64 = base64;
            this.save(rc);
        };
        /**
         * @return {?}
         */
        UserKeyValue.prototype.logOutCurrentUser = function () {
            return __awaiter(this, void 0, void 0, function () {
                var lastClientId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), this._sessionId || this._userLinkId, 'Trying to logout a user who is not registered');
                            delete this.users[this._clientId];
                            return [4 /*yield*/, this.storage.setUserKeyValue(this.rc, USERS, JSON.stringify(this.users))];
                        case 1:
                            _a.sent();
                            if (!(Object.keys(this.users).length > 0)) return [3 /*break*/, 3];
                            lastClientId = Number(Object.keys(this.users)[0]);
                            return [4 /*yield*/, this.switchUserOnCurrRun(lastClientId)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, this.storage.setUserKeyValue(this.rc, LAST_USER, null)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?} clientId
         * @return {?}
         */
        UserKeyValue.prototype.switchUserOnCurrRun = function (clientId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.lastClientId = clientId;
                            return [4 /*yield*/, this.storage.setUserKeyValue(this.rc, LAST_USER, String(this.lastClientId))];
                        case 1:
                            _a.sent();
                            this.deserialize(this.users[this.lastClientId]);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        UserKeyValue.prototype.getAllUserLinkIds = function () {
            var e_1, _a;
            /** @type {?} */
            var ids = [];
            try {
                for (var _b = __values(Object.keys(this.users)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var i = _c.value;
                    ids.push(this.users[i]['userLinkId']);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return ids;
        };
        /**
         * @param {?} reqUserLinkId
         * @return {?}
         */
        UserKeyValue.prototype.getClientIdForUserLink = function (reqUserLinkId) {
            for (var clientId in this.users) {
                /** @type {?} */
                var userLinkId = this.users[clientId]['userLinkId'];
                if (userLinkId === reqUserLinkId)
                    return Number(clientId);
            }
            return 0;
        };
        /**
         * @param {?} rc
         * @return {?}
         */
        UserKeyValue.prototype.save = function (rc) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            rc.isAssert() && rc.assert(rc.getName(this), this._clientId, 'Came to save userKeyVal before clientId');
                            if (!this._sessionId && !this._userLinkId) {
                                rc.isStatus() && rc.status(rc.getName(this), "not saving rc, as user session / userLinkId not present \n        " + JSON.stringify({ sessionId: this._sessionId,
                                    userLinkId: this._userLinkId }));
                                return [2 /*return*/];
                            }
                            rc.isDebug() && rc.debug(rc.getName(this), "saving rc obj " + rc);
                            this.users[this._clientId] = this.serialize();
                            return [4 /*yield*/, this.storage.setUserKeyValue(this.rc, USERS, JSON.stringify(this.users))];
                        case 1:
                            _a.sent();
                            if (!(this.lastClientId !== this._clientId)) return [3 /*break*/, 3];
                            this.lastClientId = this._clientId;
                            return [4 /*yield*/, this.storage.setUserKeyValue(this.rc, LAST_USER, String(this.lastClientId))];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?} clientId
         * @return {?}
         */
        UserKeyValue.prototype.getWebProfilePicBase64 = function (clientId) {
            return this.users[clientId]['webProfilePicBase64'];
        };
        /**
         * @return {?}
         */
        UserKeyValue.prototype.getAllClientIds = function () { return Object.keys(this.users).map(Number); };
        /**
         * @param {?} clientId
         * @return {?}
         */
        UserKeyValue.prototype.getUserInfo = function (clientId) { return this.users[clientId]; };
        Object.defineProperty(UserKeyValue.prototype, "clientId", {
            // Client Id
            /**
             * @return {?}
             */
            get: function () { return this._clientId; },
            /**
             * @param {?} clientId
             * @return {?}
             */
            set: function (clientId) {
                if (clientId === this._clientId)
                    return;
                if (this._clientId && (this._sessionId || this._userLinkId)) {
                    throw new core.Mubble.uError('INVALID_CLIENT_ID', 'Cannot change clientId once sessionId/userLinkId is set: ' +
                        JSON.stringify({ new: clientId, existing: this._clientId,
                            sessionId: this._sessionId, userLinkId: this._userLinkId }));
                }
                this._clientId = clientId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserKeyValue.prototype, "deviceId", {
            /**
             * @return {?}
             */
            get: function () { return this._deviceId; },
            /**
             * @param {?} deviceId
             * @return {?}
             */
            set: function (deviceId) {
                if (deviceId === this._deviceId)
                    return;
                this._deviceId = deviceId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserKeyValue.prototype, "sessionId", {
            /**
             * @return {?}
             */
            get: function () { return this._sessionId; },
            /**
             * @param {?} sessionId
             * @return {?}
             */
            set: function (sessionId) {
                if (sessionId === this._sessionId)
                    return;
                this._sessionId = sessionId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserKeyValue.prototype, "obopayId", {
            /**
             * @return {?}
             */
            get: function () { return this._obopayId; },
            /**
             * @param {?} obopayId
             * @return {?}
             */
            set: function (obopayId) {
                if (obopayId === this._obopayId)
                    return;
                if (this._obopayId && !obopayId === null)
                    throw new core.Mubble.uError('INVALID_OBOPAY_ID', 'Cannot set obopayId when it is already set: ' + JSON.stringify({ obopayId: obopayId, existing: this._obopayId }));
                this._obopayId = obopayId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserKeyValue.prototype, "userLinkId", {
            /**
             * @return {?}
             */
            get: function () { return this._userLinkId; },
            /**
             * @param {?} userLinkId
             * @return {?}
             */
            set: function (userLinkId) {
                if (userLinkId === this._userLinkId)
                    return;
                if (this._userLinkId && !userLinkId === null)
                    throw new core.Mubble.uError('INVALID_USER_LINK_ID', 'Cannot set userLinkId when it is already set: ' + JSON.stringify({ userLinkId: userLinkId, existing: this._userLinkId }));
                this._userLinkId = userLinkId;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @return {?}
         */
        UserKeyValue.prototype.serialize = function () {
            return {
                clientId: this._clientId,
                userLinkId: this._userLinkId,
                sessionId: this._sessionId,
                obopayId: this._obopayId,
                deviceId: this._deviceId,
                userName: this.userName,
                webProfilePicBase64: this._webProfilePicBase64,
                screenVisitedStates: this.screenVisitedStates
            };
        };
        /**
         * @param {?} obj
         * @return {?}
         */
        UserKeyValue.prototype.deserialize = function (obj) {
            this._clientId = obj.clientId;
            this._userLinkId = obj.userLinkId;
            this._deviceId = obj.deviceId;
            this._sessionId = obj.sessionId;
            this._obopayId = obj.obopayId;
            this.userName = obj.userName;
            this._webProfilePicBase64 = obj.webProfilePicBase64;
            this.screenVisitedStates = obj.screenVisitedStates;
        };
        /**
         * @return {?}
         */
        UserKeyValue.prototype.$dump = function () {
            var e_2, _a;
            /** @type {?} */
            var keys = Object.getOwnPropertyNames(this);
            try {
                for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                    var key = keys_1_1.value;
                    console.info(key + "=" + JSON.stringify(this[key]));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        return UserKeyValue;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        UserKeyValue.prototype._clientId;
        /**
         * @type {?}
         * @private
         */
        UserKeyValue.prototype._obopayId;
        /**
         * @type {?}
         * @private
         */
        UserKeyValue.prototype._sessionId;
        /**
         * @type {?}
         * @private
         */
        UserKeyValue.prototype._deviceId;
        /**
         * @type {?}
         * @private
         */
        UserKeyValue.prototype._userLinkId;
        /**
         * @type {?}
         * @private
         */
        UserKeyValue.prototype._webProfilePicBase64;
        /** @type {?} */
        UserKeyValue.prototype.userName;
        /** @type {?} */
        UserKeyValue.prototype.mobileNo;
        /** @type {?} */
        UserKeyValue.prototype.screenVisitedStates;
        /**
         * @type {?}
         * @private
         */
        UserKeyValue.prototype.users;
        /**
         * @type {?}
         * @private
         */
        UserKeyValue.prototype.lastClientId;
        /**
         * @type {?}
         * @protected
         */
        UserKeyValue.prototype.rc;
        /**
         * @type {?}
         * @private
         */
        UserKeyValue.prototype.storage;
    }

    /** @type {?} */
    var META_KEY = 'autoStore';
    /** @type {?} */
    var VALID_TYPES = [String, Number, Boolean, Object];
    /**
     * @abstract
     */
    var GlobalKeyValue = /** @class */ (function () {
        /**
         * @param {?} rc
         * @param {?} storage
         */
        function GlobalKeyValue(rc, storage) {
            this.rc = rc;
            this.storage = storage;
        }
        /**
         * @return {?}
         */
        GlobalKeyValue.autoStore = function () {
            /** @type {?} */
            var functionResult = ( /**
             * @param {?} target
             * @param {?} propertyKey
             * @return {?}
             */function (target, propertyKey) {
                Reflect.defineMetadata(META_KEY, true, target, propertyKey);
                return {
                    get: ( /**
                     * @return {?}
                     */function () {
                        /** @type {?} */
                        var value = this['_' + propertyKey];
                        /** @type {?} */
                        var rc = this.rc;
                        rc.isAssert() && rc.assert(rc.getName(this), value !== undefined, "You are trying to fetch " + propertyKey + "=" + value + " before init");
                        return value;
                    }),
                    set: ( /**
                     * @param {?} value
                     * @return {?}
                     */function (value) {
                        /** @type {?} */
                        var fieldType = Reflect.getMetadata('design:type', target, propertyKey);
                        /** @type {?} */
                        var rc = this['rc'];
                        rc.isDebug() && rc.debug(rc.getName(this), "autoStore.set: propertyKey: " + propertyKey + ", value: " + value + ", fieldType: " + fieldType);
                        rc.isAssert() && rc.assert(rc.getName(this), value !== undefined);
                        rc.isAssert() && rc.assert(rc.getName(this), VALID_TYPES.indexOf(fieldType) !== -1, "Not a valid propertyKey: " + propertyKey + ", fieldType: " + fieldType);
                        rc.isAssert() && rc.assert(rc.getName(this), value === null ? fieldType === Object : value.constructor === fieldType, "You are trying to set " + propertyKey + "=" + value + " with invalid type " + typeof (value));
                        /** @type {?} */
                        var strValue = fieldType === Object ? JSON.stringify(value) : String(value);
                        /** @type {?} */
                        var oldValue = this['_' + propertyKey];
                        // undefined indicates that GlobalKeyValue has not been initialized
                        if (oldValue === undefined) {
                            rc.isDebug() && rc.debug(rc.getName(this), "Remembering default " + propertyKey + "=" + value);
                            GlobalKeyValue.fieldMap[propertyKey] = { type: fieldType, strValue: strValue };
                            return;
                        }
                        /** @type {?} */
                        var strOldValue = this['_$' + propertyKey];
                        /** @type {?} */
                        var key = propertyKey;
                        if (strOldValue === strValue)
                            return;
                        this['_' + propertyKey] = value;
                        this['_$' + propertyKey] = strValue;
                        this.storage.setGlobalKeyValue(rc, key, strValue);
                        if (rc && rc.isDebug) {
                            rc.isDebug() && rc.debug('GlobalKeyValue', "Saved key " + key + "=" + strValue);
                        }
                    })
                };
            });
            return functionResult;
        };
        /**
         * @return {?}
         */
        GlobalKeyValue.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var rc, _a, _b, name, field, strSavedValue, strDefaultValue, strValue, value, e_1_1;
                var e_1, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            rc = this.rc;
                            this.extractFields(this, GlobalKeyValue.fieldMap);
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 6, 7, 8]);
                            _a = __values(Object.keys(GlobalKeyValue.fieldMap)), _b = _a.next();
                            _d.label = 2;
                        case 2:
                            if (!!_b.done) return [3 /*break*/, 5];
                            name = _b.value;
                            field = GlobalKeyValue.fieldMap[name];
                            return [4 /*yield*/, this.storage.getGlobalKeyValue(rc, name)];
                        case 3:
                            strSavedValue = _d.sent();
                            strDefaultValue = field.strValue;
                            strValue = strSavedValue || strDefaultValue;
                            value = void 0;
                            switch (field.type) {
                                case String:
                                    value = strValue ? strValue : '';
                                    break;
                                case Number:
                                    value = strValue ? Number(strValue) : 0;
                                    break;
                                case Boolean:
                                    value = strValue ? strValue === String(true) : false;
                                    break;
                                case Object:
                                    value = strValue ? JSON.parse(strValue) : null;
                                    break;
                            }
                            this['_' + name] = value;
                            this['_$' + name] = field.type === Object ? JSON.stringify(value) : String(value);
                            _d.label = 4;
                        case 4:
                            _b = _a.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_1_1 = _d.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_1) throw e_1.error; }
                            return [7 /*endfinally*/];
                        case 8: return [2 /*return*/, this];
                    }
                });
            });
        };
        // Need to be called only for fields of type object, when some internal property
        // has been changed
        /**
         * @return {?}
         */
        GlobalKeyValue.prototype.detectSaveChanges = function () {
            var e_2, _a;
            try {
                for (var _b = __values(Object.keys(GlobalKeyValue.fieldMap)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var name = _c.value;
                    /** @type {?} */
                    var field = GlobalKeyValue.fieldMap[name];
                    /** @type {?} */
                    var type = (( /** @type {?} */(field.type))).name;
                    if (field.type !== Object)
                        continue;
                    this[name] = this[name]; // forces the set function to get called
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        /**
         * @private
         * @param {?} proto
         * @param {?} fieldz
         * @return {?}
         */
        GlobalKeyValue.prototype.extractFields = function (proto, fieldz) {
            var e_3, _a;
            if (proto === null)
                return;
            /** @type {?} */
            var keys = Object.getOwnPropertyNames(proto);
            try {
                for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                    var key = keys_1_1.value;
                    if (fieldz[key])
                        continue;
                    try {
                        if (Reflect.getMetadata(META_KEY, proto, key)) {
                            // console.log('GlobalKeyValue:extractFields()', key)
                            fieldz[key] = { type: Reflect.getMetadata('design:type', proto, key) };
                        }
                    }
                    catch (err) {
                        console.info('GlobalKeyValue:extractFields()', 'failed for', key);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return this.extractFields(Object.getPrototypeOf(proto), fieldz);
        };
        /**
         * @return {?}
         */
        GlobalKeyValue.prototype.$dump = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, name, field, type, memory, store, e_4_1;
                var e_4, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 5, 6, 7]);
                            _a = __values(Object.keys(GlobalKeyValue.fieldMap)), _b = _a.next();
                            _d.label = 1;
                        case 1:
                            if (!!_b.done) return [3 /*break*/, 4];
                            name = _b.value;
                            field = GlobalKeyValue.fieldMap[name];
                            type = (( /** @type {?} */(field.type))).name;
                            memory = this[name];
                            return [4 /*yield*/, this.storage.getGlobalKeyValue(this.rc, name)];
                        case 2:
                            store = _d.sent();
                            console.info({ name: name, type: type, memory: memory, store: store });
                            _d.label = 3;
                        case 3:
                            _b = _a.next();
                            return [3 /*break*/, 1];
                        case 4: return [3 /*break*/, 7];
                        case 5:
                            e_4_1 = _d.sent();
                            e_4 = { error: e_4_1 };
                            return [3 /*break*/, 7];
                        case 6:
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_4) throw e_4.error; }
                            return [7 /*endfinally*/];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        return GlobalKeyValue;
    }());
    GlobalKeyValue.fieldMap = {};
    __decorate([
        GlobalKeyValue.autoStore(),
        __metadata("design:type", Object)
    ], GlobalKeyValue.prototype, "syncSegments", void 0);
    __decorate([
        GlobalKeyValue.autoStore(),
        __metadata("design:type", String)
    ], GlobalKeyValue.prototype, "jsVersion", void 0);
    __decorate([
        GlobalKeyValue.autoStore(),
        __metadata("design:type", Number)
    ], GlobalKeyValue.prototype, "logLevel", void 0);
    __decorate([
        GlobalKeyValue.autoStore(),
        __metadata("design:type", String)
    ], GlobalKeyValue.prototype, "deviceId", void 0);
    __decorate([
        GlobalKeyValue.autoStore(),
        __metadata("design:type", Object)
    ], GlobalKeyValue.prototype, "envConfig", void 0);
    if (false) {
        /**
         * @type {?}
         * @private
         */
        GlobalKeyValue.fieldMap;
        /** @type {?} */
        GlobalKeyValue.prototype.syncSegments;
        /** @type {?} */
        GlobalKeyValue.prototype.jsVersion;
        /** @type {?} */
        GlobalKeyValue.prototype.logLevel;
        /** @type {?} */
        GlobalKeyValue.prototype.deviceId;
        /** @type {?} */
        GlobalKeyValue.prototype.envConfig;
        /**
         * @type {?}
         * @private
         */
        GlobalKeyValue.prototype.rc;
        /**
         * @type {?}
         * @private
         */
        GlobalKeyValue.prototype.storage;
    }

    /** @type {?} */
    var Segment = {
        version: 'version'
    };
    /** @type {?} */
    var SYNC_HASH = 'syncHashTable';
    var ModelField = /** @class */ (function () {
        /**
         * @param {?} name
         * @param {?} type
         * @param {?} optional
         */
        function ModelField(name, type, optional) {
            this.name = name;
            this.type = type;
            this.optional = optional;
        }
        /**
         * @return {?}
         */
        ModelField.prototype.toString = function () {
            return this.name + "(" + this.type + ")" + (this.optional ? ': optional' : '');
        };
        return ModelField;
    }());
    if (false) {
        /** @type {?} */
        ModelField.prototype.name;
        /** @type {?} */
        ModelField.prototype.type;
        /** @type {?} */
        ModelField.prototype.optional;
    }
    (( /** @type {?} */(Dexie__default['default']))).debug = true;
    // @dynamic
    /**
     * @abstract
     */
    var MasterDb = /** @class */ (function (_super) {
        __extends(MasterDb, _super);
        /**
         * @param {?} rc
         * @param {?} version
         * @param {?} versionSchema
         */
        function MasterDb(rc, version, versionSchema) {
            var _this = _super.call(this, 'MasterDb') || this;
            _this.syncHashModels = {};
            /** @type {?} */
            var modelsWithKeys = Object.keys(MasterDb.schemaKey).length;
            /** @type {?} */
            var modelsWithFields = Object.keys(MasterDb.schemaField).length;
            rc.isAssert() && rc.assert(rc.getName(_this), modelsWithKeys && modelsWithFields
                && modelsWithKeys >= modelsWithFields, { modelsWithKeys: modelsWithKeys, modelsWithFields: modelsWithFields });
            rc.isAssert() && rc.assert(rc.getName(_this), versionSchema[0].version === 1);
            /*
              TODO ???? validate accumulated versionSchema with this.buildSchema(schema)
            */
            versionSchema[0].tableSchema[SYNC_HASH] = 'model';
            _this.verifySegmentVersion(rc, version);
            return _this;
        }
        /**
         * @param {?} modelName
         * @param {?} classFn
         * @return {?}
         */
        MasterDb.registerModelClass = function (modelName, classFn) {
            this.classMap.set(classFn, modelName);
        };
        /**
         * @param {?} classFn
         * @return {?}
         */
        MasterDb.getModelName = function (classFn) {
            return this.classMap.get(classFn);
        };
        /**
         * @param {?} modelName
         * @param {?} fieldName
         * @param {?} isPrimaryKey
         * @param {?} fieldType
         * @param {?} optional
         * @return {?}
         */
        MasterDb.registerSchema = function (modelName, fieldName, isPrimaryKey, fieldType, optional) {
            /** @type {?} */
            var field = new ModelField(fieldName, fieldType, optional);
            /** @type {?} */
            var collection = isPrimaryKey ? this.schemaKey : this.schemaField;
            /** @type {?} */
            var fields = collection[modelName];
            if (!fields)
                fields = collection[modelName] = {};
            fields[field.name] = field;
            // console.log(`${modelName}: added ${isPrimaryKey ? 'key' : 'field'} + ${field}`)
        };
        /**
         * @param {?} rc
         * @return {?}
         */
        MasterDb.prototype.init = function (rc) {
            return __awaiter(this, void 0, void 0, function () {
                var ar, modelMap, models, _loop_1, this_1, models_1, models_1_1, modelName;
                var e_1, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this[SYNC_HASH].toArray()];
                        case 1:
                            ar = _b.sent();
                            modelMap = MasterDb.schemaKey;
                            models = Object.keys(modelMap);
                            _loop_1 = function (modelName) {
                                /** @type {?} */
                                var st = ar.find(( /**
                                 * @param {?} item
                                 * @return {?}
                                 */function (/**
                                 * @param {?} item
                                 * @return {?}
                                 */ item) { return item.model === modelName; }));
                                this_1.syncHashModels[modelName] = st ? st.hash : { ts: 0 };
                            };
                            this_1 = this;
                            try {
                                for (models_1 = __values(models), models_1_1 = models_1.next(); !models_1_1.done; models_1_1 = models_1.next()) {
                                    modelName = models_1_1.value;
                                    _loop_1(modelName);
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (models_1_1 && !models_1_1.done && (_a = models_1.return)) _a.call(models_1);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                            rc.isDebug() && rc.debug(rc.getName(this), 'restored syncHashModels', this.syncHashModels);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?} rc
         * @return {?}
         */
        MasterDb.prototype.onRouterAvailable = function (rc) {
            /** @type {?} */
            var rcb = rc;
            rcb.router.subscribeEvent(core.MASTER_UPDATE_EVENT, this.onMasterUpdate.bind(this));
        };
        /**
         * @param {?} rc
         * @return {?}
         */
        MasterDb.prototype.getSyncRequest = function (rc) {
            rc.isAssert() && rc.assert(rc.getName(this), Object.keys(this.syncHashModels).length);
            return { hash: this.syncHashModels, segments: (( /** @type {?} */(rc.globalKeyVal.syncSegments))) };
        };
        /**
         * @param {?} rc
         * @param {?} classFn
         * @return {?}
         */
        MasterDb.prototype.getTableForClass = function (rc, classFn) {
            /** @type {?} */
            var modelName = MasterDb.getModelName(classFn);
            rc.isAssert() && rc.assert(rc.getName(this), modelName, 'unknown class object', classFn);
            return this.getTable(rc, modelName);
        };
        /**
         * @private
         * @param {?} rc
         * @param {?} version
         * @return {?}
         */
        MasterDb.prototype.verifySegmentVersion = function (rc, version) {
            /** @type {?} */
            var segments = ( /** @type {?} */(rc.globalKeyVal.syncSegments));
            if (!segments)
                segments = {};
            if (!segments[Segment.version])
                segments[Segment.version] = [['']];
            var _a = __read(segments[Segment.version], 1), _b = __read(_a[0], 1), oldVersion = _b[0];
            if (oldVersion !== version) {
                rc.isDebug() && rc.debug(rc.getName(this), 'version changed', { last: oldVersion, current: version });
                segments[Segment.version] = [[version]];
                rc.globalKeyVal.syncSegments = segments;
            }
            else {
                rc.isDebug() && rc.debug(rc.getName(this), 'Versions are same', { last: oldVersion, current: version });
            }
        };
        /**
         * @private
         * @param {?} schema
         * @return {?}
         */
        MasterDb.prototype.buildSchema = function (schema) {
            var e_2, _a;
            /** @type {?} */
            var modelMap = MasterDb.schemaKey;
            try {
                for (var _b = __values(Object.keys(modelMap)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var modelName = _c.value;
                    /** @type {?} */
                    var ar = Object.keys(modelMap[modelName]);
                    /** @type {?} */
                    var keyStr = ar.length === 1 ? ar[0] : "[" + ar.join('+') + "]";
                    schema[modelName + 'Table'] = keyStr;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        /**
         * @param {?} rc
         * @param {?} eventName
         * @param {?} data
         * @return {?}
         */
        MasterDb.prototype.onMasterUpdate = function (rc, eventName, data) {
            return __awaiter(this, void 0, void 0, function () {
                var syncResponse, updated, _a, _b, modelName, modelData, e_3_1, e_4, data_1;
                var e_3, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 11, , 12]);
                            syncResponse = data;
                            rc.isDebug() && rc.debug(rc.getName(this), 'onMasterUpdate', JSON.stringify(syncResponse));
                            updated = false;
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 6, 7, 8]);
                            _a = __values(Object.keys(syncResponse)), _b = _a.next();
                            _d.label = 2;
                        case 2:
                            if (!!_b.done) return [3 /*break*/, 5];
                            modelName = _b.value;
                            if (!(( /** @type {?} */(syncResponse))).hasOwnProperty(modelName))
                                return [3 /*break*/, 4];
                            modelData = syncResponse[modelName];
                            return [4 /*yield*/, this.applyMasterData(rc, modelName, modelData)];
                        case 3:
                            if (_d.sent())
                                updated = true;
                            _d.label = 4;
                        case 4:
                            _b = _a.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_3_1 = _d.sent();
                            e_3 = { error: e_3_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_3) throw e_3.error; }
                            return [7 /*endfinally*/];
                        case 8:
                            if (!updated) return [3 /*break*/, 10];
                            return [4 /*yield*/, this.afterMasterUpdate(rc)];
                        case 9:
                            _d.sent();
                            _d.label = 10;
                        case 10: return [3 /*break*/, 12];
                        case 11:
                            e_4 = _d.sent();
                            data_1 = { errorMsg: e_4.message };
                            exports.EventSystem.broadcast(rc, "client-error", data_1);
                            throw new Error(e_4);
                        case 12: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @private
         * @param {?} rc
         * @param {?} modelName
         * @param {?} modelData
         * @return {?}
         */
        MasterDb.prototype.applyMasterData = function (rc, modelName, modelData) {
            return __awaiter(this, void 0, void 0, function () {
                var syncHashTable;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!modelData.purge) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.clear(rc, modelName)];
                        case 1:
                            _a.sent();
                            rc.isDebug() && rc.debug(rc.getName(this), modelName, 'purged');
                            return [3 /*break*/, 4];
                        case 2:
                            if (!(modelData.del && modelData.del.length)) return [3 /*break*/, 4];
                            rc.isDebug() && rc.debug(rc.getName(this), modelName, 'going to delete', modelData.del.length);
                            return [4 /*yield*/, this.bulkDelete(rc, modelName, modelData.del)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            if (!(modelData.mod && modelData.mod.length)) return [3 /*break*/, 6];
                            rc.isDebug() && rc.debug(rc.getName(this), modelName, 'going to upsert', modelData.mod.length);
                            return [4 /*yield*/, this.bulkPut(rc, modelName, modelData.mod)];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6:
                            this.syncHashModels[modelName] = modelData.hash;
                            syncHashTable = this[SYNC_HASH];
                            return [4 /*yield*/, this.transaction('rw', syncHashTable, ( /**
                                 * @return {?}
                                 */function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                rc.isDebug() && rc.debug(rc.getName(this), modelName, 'going to save hash', modelData.hash);
                                                return [4 /*yield*/, syncHashTable.put({ model: modelName, hash: modelData.hash })];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 7:
                            _a.sent();
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        /**
         * @private
         * @param {?} rc
         * @param {?} modelName
         * @return {?}
         */
        MasterDb.prototype.clear = function (rc, modelName) {
            return __awaiter(this, void 0, void 0, function () {
                var modelTable;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            modelTable = this.getTable(rc, modelName);
                            return [4 /*yield*/, this.transaction('rw', modelTable, ( /**
                                 * @return {?}
                                 */function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, modelTable.clear()];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        //   private async bulkPut(rc: RunContextBrowser, modelName: string, arMod: object[]) {
        //     const modelTable = this.getTable(rc, modelName)
        //     try {
        //       await this.transaction('rw', modelTable, async() => {
        //       for (const modelRec of arMod) {
        //         const rec = this.buildFullRec(rc, modelName, modelRec)
        //         rc.isDebug() && rc.debug(rc.getName(this), 'going to put', rec)
        //           await modelTable.put(rec)
        //       }
        //     })
        //   } catch (err) {
        //     const x = JSON.stringify(arMod)
        //     console.log('bombed while writing', x.length, 'bytes')
        //     console.log(x)
        //     console.log('Dexie error stack', err.stack)
        //     throw(err)
        //   }
        //   console.log('wrote', JSON.stringify(arMod).length, 'bytes successfully')
        // }
        /**
         * @private
         * @param {?} rc
         * @param {?} modelName
         * @param {?} arMod
         * @return {?}
         */
        MasterDb.prototype.bulkPut = function (rc, modelName, arMod) {
            return __awaiter(this, void 0, void 0, function () {
                var modelTable, arMod_1, arMod_1_1, modelRec, rec, err_1, x, e_5_1;
                var e_5, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            modelTable = this.getTable(rc, modelName);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 8, 9, 10]);
                            arMod_1 = __values(arMod), arMod_1_1 = arMod_1.next();
                            _b.label = 2;
                        case 2:
                            if (!!arMod_1_1.done) return [3 /*break*/, 7];
                            modelRec = arMod_1_1.value;
                            rec = this.buildFullRec(rc, modelName, modelRec);
                            rc.isDebug() && rc.debug(rc.getName(this), 'going to put with debug ', rec);
                            _b.label = 3;
                        case 3:
                            _b.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, modelTable.put(rec)];
                        case 4:
                            _b.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            err_1 = _b.sent();
                            x = JSON.stringify(arMod);
                            console.log('bombed while writing', x.length, 'bytes');
                            console.log(x);
                            console.log('Dexie error stack', err_1.stack);
                            throw (err_1);
                        case 6:
                            arMod_1_1 = arMod_1.next();
                            return [3 /*break*/, 2];
                        case 7: return [3 /*break*/, 10];
                        case 8:
                            e_5_1 = _b.sent();
                            e_5 = { error: e_5_1 };
                            return [3 /*break*/, 10];
                        case 9:
                            try {
                                if (arMod_1_1 && !arMod_1_1.done && (_a = arMod_1.return)) _a.call(arMod_1);
                            }
                            finally { if (e_5) throw e_5.error; }
                            return [7 /*endfinally*/];
                        case 10:
                            console.log('wrote', JSON.stringify(arMod).length, 'bytes successfully');
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @private
         * @param {?} rc
         * @param {?} modelName
         * @param {?} rec
         * @return {?}
         */
        MasterDb.prototype.buildKeyRec = function (rc, modelName, rec) {
            /** @type {?} */
            var keyMap = MasterDb.schemaKey[modelName];
            /** @type {?} */
            var outRec = {};
            for (var keyName in keyMap) {
                /** @type {?} */
                var key = keyMap[keyName];
                rc.isAssert() && rc.assert(rc.getName(this), rec[keyName] !== undefined, 'Rec missing PK', keyName, rec);
                outRec[keyName] = rec[keyName];
            }
            return outRec;
        };
        /**
         * @private
         * @param {?} rc
         * @param {?} modelName
         * @param {?} rec
         * @return {?}
         */
        MasterDb.prototype.buildFullRec = function (rc, modelName, rec) {
            /** @type {?} */
            var fieldMap = MasterDb.schemaField[modelName];
            /** @type {?} */
            var outRec = this.buildKeyRec(rc, modelName, rec);
            for (var fieldName in fieldMap) {
                /** @type {?} */
                var field = fieldMap[fieldName];
                /** @type {?} */
                var value = rec[fieldName];
                rc.isAssert() && rc.assert(rc.getName(this), field.optional && value === undefined ||
                    this.validateType(field.type, value), 'Invalid value for field', fieldName, rec);
                outRec[fieldName] = rec[fieldName];
            }
            return outRec;
        };
        /**
         * @private
         * @param {?} type
         * @param {?} value
         * @return {?}
         */
        MasterDb.prototype.validateType = function (type, value) {
            switch (type) {
                case 'string':
                case 'number':
                case 'boolean':
                    return typeof (value) === type;
                case 'array':
                    return Array.isArray(value);
                case 'object':
                    return value && typeof (value) === type;
                default:
                    return false;
            }
        };
        /**
         * @private
         * @param {?} rc
         * @param {?} modelName
         * @param {?} arDel
         * @return {?}
         */
        MasterDb.prototype.bulkDelete = function (rc, modelName, arDel) {
            return __awaiter(this, void 0, void 0, function () {
                var modelTable;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            modelTable = this.getTable(rc, modelName);
                            return [4 /*yield*/, this.transaction('rw', modelTable, ( /**
                                 * @return {?}
                                 */function () { return __awaiter(_this, void 0, void 0, function () {
                                    var _loop_2, this_2, arDel_1, arDel_1_1, modelRec, e_6_1;
                                    var e_6, _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                _loop_2 = function (modelRec) {
                                                    var keyObj;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                keyObj = this_2.buildKeyRec(rc, modelName, modelRec);
                                                                rc.isDebug() && rc.debug(rc.getName(this_2), 'bulkDelete', modelName, keyObj);
                                                                return [4 /*yield*/, modelTable.delete(Object.keys(keyObj).map(( /**
                                                                     * @param {?} key
                                                                     * @return {?}
                                                                     */function (/**
                                                                     * @param {?} key
                                                                     * @return {?}
                                                                     */ key) { return keyObj[key]; })))];
                                                            case 1:
                                                                _a.sent();
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                };
                                                this_2 = this;
                                                _b.label = 1;
                                            case 1:
                                                _b.trys.push([1, 6, 7, 8]);
                                                arDel_1 = __values(arDel), arDel_1_1 = arDel_1.next();
                                                _b.label = 2;
                                            case 2:
                                                if (!!arDel_1_1.done) return [3 /*break*/, 5];
                                                modelRec = arDel_1_1.value;
                                                return [5 /*yield**/, _loop_2(modelRec)];
                                            case 3:
                                                _b.sent();
                                                _b.label = 4;
                                            case 4:
                                                arDel_1_1 = arDel_1.next();
                                                return [3 /*break*/, 2];
                                            case 5: return [3 /*break*/, 8];
                                            case 6:
                                                e_6_1 = _b.sent();
                                                e_6 = { error: e_6_1 };
                                                return [3 /*break*/, 8];
                                            case 7:
                                                try {
                                                    if (arDel_1_1 && !arDel_1_1.done && (_a = arDel_1.return)) _a.call(arDel_1);
                                                }
                                                finally { if (e_6) throw e_6.error; }
                                                return [7 /*endfinally*/];
                                            case 8: return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @private
         * @param {?} rc
         * @param {?} modelName
         * @return {?}
         */
        MasterDb.prototype.getTable = function (rc, modelName) {
            /** @type {?} */
            var modelTable = this[modelName + 'Table'];
            rc.isAssert() && rc.assert(rc.getName(this), modelTable, 'unknown model', modelName);
            return modelTable;
        };
        // debug functions
        /**
         * @private
         * @param {?} rc
         * @param {?} modelName
         * @return {?}
         */
        MasterDb.prototype.$all = function (rc, modelName) {
            return __awaiter(this, void 0, void 0, function () {
                var modelTable, ar;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            modelTable = this.getTable(rc, modelName);
                            return [4 /*yield*/, modelTable.toArray()];
                        case 1:
                            ar = _a.sent();
                            console.info(ar);
                            return [2 /*return*/];
                    }
                });
            });
        };
        return MasterDb;
    }(Dexie__default['default']));
    MasterDb.schemaKey = {};
    MasterDb.schemaField = {};
    MasterDb.classMap = new Map();
    if (false) {
        /** @type {?} */
        MasterDb.schemaKey;
        /** @type {?} */
        MasterDb.schemaField;
        /** @type {?} */
        MasterDb.classMap;
        /** @type {?} */
        MasterDb.prototype.syncHashModels;
        /**
         * @abstract
         * @param {?} rc
         * @return {?}
         */
        MasterDb.prototype.afterMasterUpdate = function (rc) { };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Master = /** @class */ (function () {
        function Master() {
        }
        /**
         * @param {?=} optional
         * @return {?}
         */
        Master.field = function (optional) {
            /** @type {?} */
            var functionResult = ( /**
             * @param {?} target
             * @param {?} propertyKey
             * @return {?}
             */function (target, propertyKey) {
                /** @type {?} */
                var type = Reflect.getMetadata('design:type', target, propertyKey);
                /** @type {?} */
                var name = MasterDb.getModelName(target.constructor);
                MasterDb.registerSchema(name, propertyKey, false, Master.getType(type), !!optional);
            });
            return functionResult;
        };
        /**
         * @param {?=} modelName
         * @return {?}
         */
        Master.key = function (modelName) {
            /** @type {?} */
            var functionResult = ( /**
             * @param {?} target
             * @param {?} propertyKey
             * @return {?}
             */function (target, propertyKey) {
                if (modelName)
                    MasterDb.registerModelClass(modelName, target.constructor);
                /** @type {?} */
                var type = Reflect.getMetadata('design:type', target, propertyKey);
                /** @type {?} */
                var name = MasterDb.getModelName(target.constructor);
                MasterDb.registerSchema(name, propertyKey, true, Master.getType(type), false);
            });
            return functionResult;
        };
        /**
         * @private
         * @param {?} fieldType
         * @return {?}
         */
        Master.getType = function (fieldType) {
            switch (fieldType) {
                case String: return 'string';
                case Number: return 'number';
                case Boolean: return 'boolean';
                case Array: return 'array';
                case Object: return 'object';
                default:
                    /** @type {?} */
                    var msg = 'getType: unknown field type - ' + fieldType;
                    // console.log(msg)
                    throw (new Error(msg));
            }
        };
        return Master;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @type {?} */
    var GLOBAL_PREFIX = 'global';
    /** @type {?} */
    var CONFIG_PREFIX = 'config';
    var StorageProvider = /** @class */ (function () {
        function StorageProvider() {
        }
        /**
         * @param {?} rc
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        StorageProvider.prototype.setGlobalKeyValue = function (rc, key, value) {
            /** @type {?} */
            var storageKey = GLOBAL_PREFIX + '.' + key;
            localStorage.setItem(storageKey, value);
        };
        /**
         * @param {?} rc
         * @param {?} key
         * @return {?}
         */
        StorageProvider.prototype.getGlobalKeyValue = function (rc, key) {
            return __awaiter(this, void 0, void 0, function () {
                var storageKey;
                return __generator(this, function (_a) {
                    storageKey = GLOBAL_PREFIX + '.' + key;
                    return [2 /*return*/, localStorage.getItem(storageKey)];
                });
            });
        };
        /**
         * @param {?} rc
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        StorageProvider.prototype.setUserKeyValue = function (rc, key, value) {
            localStorage.setItem(key, value);
        };
        /**
         * @param {?} rc
         * @param {?} key
         * @return {?}
         */
        StorageProvider.prototype.getUserKeyValue = function (rc, key) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, localStorage.getItem(key)];
                });
            });
        };
        /**
         * @param {?} rc
         * @param {?} config
         * @return {?}
         */
        StorageProvider.prototype.setGcConfig = function (rc, config) {
            config.forEach(( /**
             * @param {?} entry
             * @return {?}
             */function (entry) {
                /** @type {?} */
                var storageKey = CONFIG_PREFIX + "." + entry.category + "|" + entry.key;
                localStorage.setItem(storageKey, JSON.stringify(entry.value));
                // if (rc && rc.isDebug) {
                //   rc.isDebug() && rc.debug('GcConfigKeyValue', 
                //     `Saved key ${storageKey}=${JSON.stringify(entry.value)}`)
                // }
            }));
        };
        /**
         * @param {?} rc
         * @param {?} category
         * @param {?} key
         * @return {?}
         */
        StorageProvider.prototype.getGcConfig = function (rc, category, key) {
            return __awaiter(this, void 0, void 0, function () {
                var storageKey;
                return __generator(this, function (_a) {
                    storageKey = CONFIG_PREFIX + "." + category + "|" + key;
                    return [2 /*return*/, localStorage.getItem(storageKey)];
                });
            });
        };
        return StorageProvider;
    }());

    var ConfigKeyVal = /** @class */ (function () {
        /**
         * @param {?} rc
         * @param {?} storage
         */
        function ConfigKeyVal(rc, storage) {
            this.rc = rc;
            this.storage = storage;
        }
        /**
         * @param {?} config
         * @return {?}
         */
        ConfigKeyVal.prototype.setConfig = function (config) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.storage.setGcConfig(this.rc, config)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?} category
         * @param {?} key
         * @return {?}
         */
        ConfigKeyVal.prototype.getConfig = function (category, key) {
            return __awaiter(this, void 0, void 0, function () {
                var value;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.storage.getGcConfig(this.rc, category, key)];
                        case 1:
                            value = _a.sent();
                            if (!value) {
                                this.rc.isWarn() && this.rc.warn(this.rc.getName(this), "No config found for category " + category + ", key " + key);
                                return [2 /*return*/, null];
                            }
                            return [2 /*return*/, JSON.parse(value)];
                    }
                });
            });
        };
        return ConfigKeyVal;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        ConfigKeyVal.prototype.rc;
        /**
         * @type {?}
         * @private
         */
        ConfigKeyVal.prototype.storage;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var RoutingStrategy = /** @class */ (function () {
        function RoutingStrategy() {
            this.preserveComponents = [];
            this.myStore = {};
            this.logging = false;
        }
        /**
         * @param {?} route
         * @return {?}
         */
        RoutingStrategy.prototype.shouldDetach = function (route) {
            if (this.logging)
                console.info('RoutingStrategy:shouldDetach', this.logSnapshot(route), route);
            return this.isRemembered(route);
        };
        /**
         * @param {?} route
         * @param {?} handle
         * @return {?}
         */
        RoutingStrategy.prototype.store = function (route, handle) {
            if (this.logging)
                console.info('RoutingStrategy:store', this.logSnapshot(route), route);
            /** @type {?} */
            var name = this.getName(route);
            if (!name)
                return;
            this.myStore[name] = handle;
        };
        /**
         * @param {?} route
         * @return {?}
         */
        RoutingStrategy.prototype.shouldAttach = function (route) {
            if (this.logging)
                console.info('RoutingStrategy:shouldAttach', this.logSnapshot(route), route);
            // return this.isRemembered(route)
            /** @type {?} */
            var name = this.getName(route);
            return name ? !!this.myStore[name] : false;
        };
        /**
         * @param {?} route
         * @return {?}
         */
        RoutingStrategy.prototype.retrieve = function (route) {
            if (this.logging)
                console.info('RoutingStrategy:retrieve', this.logSnapshot(route), route);
            /** @type {?} */
            var name = this.getName(route);
            if (!name)
                return null;
            return this.myStore[name];
        };
        /**
         * @param {?} future
         * @param {?} curr
         * @return {?}
         */
        RoutingStrategy.prototype.shouldReuseRoute = function (future, curr) {
            if (this.logging)
                console.info('RoutingStrategy:shouldReuseRoute', future, this.logSnapshot(future), curr, this.logSnapshot(curr));
            return future.routeConfig === curr.routeConfig;
        };
        /**
         * @private
         * @param {?} route
         * @return {?}
         */
        RoutingStrategy.prototype.logSnapshot = function (route) {
            /** @type {?} */
            var name = this.getName(route);
            return (name || 'null') + ':' +
                (route.url && route.url.length ? route.url[0] : 'none');
        };
        /**
         * @private
         * @param {?} route
         * @return {?}
         */
        RoutingStrategy.prototype.isRemembered = function (route) {
            /** @type {?} */
            var name = this.getName(route);
            return name ? this.preserveComponents.indexOf(name) !== -1 : false;
        };
        /**
         * @private
         * @param {?} route
         * @return {?}
         */
        RoutingStrategy.prototype.getName = function (route) {
            if (!route.component)
                return '';
            return (( /** @type {?} */(route.component))).name;
        };
        return RoutingStrategy;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        RoutingStrategy.prototype.preserveComponents;
        /**
         * @type {?}
         * @private
         */
        RoutingStrategy.prototype.myStore;
        /**
         * @type {?}
         * @private
         */
        RoutingStrategy.prototype.logging;
    }

    var NcPlatformLocation = /** @class */ (function (_super) {
        __extends(NcPlatformLocation, _super);
        /**
         * @param {?} rc
         */
        function NcPlatformLocation(rc) {
            var _this = _super.call(this) || this;
            _this.rc = rc;
            rc.setupLogger(_this, 'NcPlatformLocation');
            return _this;
            // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'constructor()')
        }
        Object.defineProperty(NcPlatformLocation.prototype, "location", {
            /**
             * @return {?}
             */
            get: function () {
                this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'get location()');
                return location;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @return {?}
         */
        NcPlatformLocation.prototype.getState = function () {
        };
        /**
         * @return {?}
         */
        NcPlatformLocation.prototype.getBaseHrefFromDOM = function () {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'getBaseHrefFromDOM()');
            return '.';
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NcPlatformLocation.prototype.onPopState = function (fn) {
            // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onPopState() ignored')
            // window.addEventListener('popstate', fn, false);
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NcPlatformLocation.prototype.onHashChange = function (fn) {
            // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onHashChange() ignored')
            // window.addEventListener('hashchange', fn, false);
        };
        Object.defineProperty(NcPlatformLocation.prototype, "hostname", {
            /**
             * @return {?}
             */
            get: function () {
                return location.hostname;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NcPlatformLocation.prototype, "port", {
            /**
             * @return {?}
             */
            get: function () {
                return location.port;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NcPlatformLocation.prototype, "href", {
            /**
             * @return {?}
             */
            get: function () {
                return location.href;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NcPlatformLocation.prototype, "protocol", {
            /**
             * @return {?}
             */
            get: function () {
                return location.protocol;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NcPlatformLocation.prototype, "pathname", {
            /**
             * @return {?}
             */
            get: function () {
                this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'get pathname()');
                return location.pathname;
            },
            /**
             * @param {?} newPath
             * @return {?}
             */
            set: function (newPath) {
                // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'set pathname()')
                // location.pathname = newPath 
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NcPlatformLocation.prototype, "search", {
            /**
             * @return {?}
             */
            get: function () {
                this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'get search()');
                return location.search;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NcPlatformLocation.prototype, "hash", {
            /**
             * @return {?}
             */
            get: function () {
                this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'get hash()');
                return location.hash;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @param {?} state
         * @param {?} title
         * @param {?} url
         * @return {?}
         */
        NcPlatformLocation.prototype.pushState = function (state, title, url) {
            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), false, 'pushState', 'First navigation was not done in root ngInit()');
        };
        /**
         * @param {?} state
         * @param {?} title
         * @param {?} url
         * @return {?}
         */
        NcPlatformLocation.prototype.replaceState = function (state, title, url) {
            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), false, 'replaceState', 'First navigation was not done in root ngInit()');
        };
        /**
         * @return {?}
         */
        NcPlatformLocation.prototype.forward = function () {
            // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'forward()')
            // history.forward()
        };
        /**
         * @return {?}
         */
        NcPlatformLocation.prototype.back = function () {
            // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'back()')
            // history.back()
        };
        return NcPlatformLocation;
    }(common.PlatformLocation));
    NcPlatformLocation.decorators = [
        { type: i0.Injectable }
    ];
    /** @nocollapse */
    NcPlatformLocation.ctorParameters = function () { return [
        { type: RunContextBrowser, decorators: [{ type: i0.Inject, args: ['RunContext',] }] }
    ]; };
    if (false) {
        /**
         * @type {?}
         * @private
         */
        NcPlatformLocation.prototype.rc;
    }

    /**
     * @abstract
     */
    var RoutableScreen = /** @class */ (function (_super) {
        __extends(RoutableScreen, _super);
        /**
         * @param {?} rc
         */
        function RoutableScreen(rc) {
            var _this = _super.call(this, rc) || this;
            _this.rc = rc;
            return _this;
        }
        return RoutableScreen;
    }(TrackableScreen));
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        RoutableScreen.prototype.rc;
        /**
         * @abstract
         * @param {?} queryParams
         * @param {?} firstInvocation
         * @return {?}
         */
        RoutableScreen.prototype.onRouterInit = function (queryParams, firstInvocation) { };
    }

    var AppLocationStrategy = /** @class */ (function (_super) {
        __extends(AppLocationStrategy, _super);
        /**
         * @param {?} rc
         */
        function AppLocationStrategy(rc) {
            var _this = _super.call(this) || this;
            _this.rc = rc;
            return _this;
        }
        /**
         * @return {?}
         */
        AppLocationStrategy.prototype.getBaseHref = function () {
            return '.';
        };
        /**
         * @return {?}
         */
        AppLocationStrategy.prototype.path = function () {
            return location.pathname;
        };
        /**
         * @return {?}
         */
        AppLocationStrategy.prototype.prepareExternalUrl = function () {
            return '';
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        AppLocationStrategy.prototype.onPopState = function (fn) {
        };
        /**
         * @param {?} state
         * @param {?} title
         * @param {?} path
         * @param {?} queryParams
         * @return {?}
         */
        AppLocationStrategy.prototype.pushState = function (state, title, path, queryParams) {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), "ignoring push state \n      " + state + " , " + title + ", " + path + ", " + queryParams);
        };
        /**
         * @param {?} state
         * @param {?} title
         * @param {?} path
         * @param {?} queryParams
         * @return {?}
         */
        AppLocationStrategy.prototype.replaceState = function (state, title, path, queryParams) {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), "ignoring replace state\n      " + state + " , " + title + ", " + path + ", " + queryParams);
        };
        /**
         * @return {?}
         */
        AppLocationStrategy.prototype.forward = function () {
        };
        /**
         * @return {?}
         */
        AppLocationStrategy.prototype.back = function () {
        };
        return AppLocationStrategy;
    }(common.LocationStrategy));
    AppLocationStrategy.decorators = [
        { type: i0.Injectable }
    ];
    /** @nocollapse */
    AppLocationStrategy.ctorParameters = function () { return [
        { type: RunContextBrowser, decorators: [{ type: i0.Inject, args: ['RunContext',] }] }
    ]; };
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        AppLocationStrategy.prototype.rc;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var API_STATE = {
        PROGRESS: 1,
        ERROR: 2,
        SUCCESS: 3,
    };
    API_STATE[API_STATE.PROGRESS] = 'PROGRESS';
    API_STATE[API_STATE.ERROR] = 'ERROR';
    API_STATE[API_STATE.SUCCESS] = 'SUCCESS';
    var ApiState = /** @class */ (function () {
        /**
         * @param {?} rc
         * @param {?} translate
         */
        function ApiState(rc, translate) {
            this.rc = rc;
            this.translate = translate;
            this.retryOnFailure = false;
            this.loadingText = translate.instant('cmn_loading');
            this.errorText = translate.instant('cmn_toast_err_unknown');
            this.retryButtonText = translate.instant('cmn_btn_retry');
        }
        return ApiState;
    }());
    if (false) {
        /** @type {?} */
        ApiState.prototype.currentState;
        /** @type {?} */
        ApiState.prototype.loadingText;
        /** @type {?} */
        ApiState.prototype.emptyDataText;
        /** @type {?} */
        ApiState.prototype.errorText;
        /** @type {?} */
        ApiState.prototype.retryButtonText;
        /** @type {?} */
        ApiState.prototype.retryOnFailure;
        /** @type {?} */
        ApiState.prototype.errorCode;
        /**
         * @type {?}
         * @private
         */
        ApiState.prototype.rc;
        /**
         * @type {?}
         * @private
         */
        ApiState.prototype.translate;
    }
    var ApiStateBuilder = /** @class */ (function () {
        /**
         * @param {?} rc
         * @param {?} translate
         */
        function ApiStateBuilder(rc, translate) {
            this.rc = rc;
            this.translate = translate;
            this.instance = new ApiState(rc, translate);
        }
        /**
         * @param {?} state
         * @return {?}
         */
        ApiStateBuilder.prototype.setCurrentState = function (state) {
            this.instance.currentState = state;
            return this;
        };
        /**
         * @param {?} text
         * @return {?}
         */
        ApiStateBuilder.prototype.setLoadingText = function (text) {
            this.instance.loadingText = text;
            return this;
        };
        /**
         * @param {?} text
         * @return {?}
         */
        ApiStateBuilder.prototype.setEmptyDataText = function (text) {
            this.instance.emptyDataText = text;
            return this;
        };
        /**
         * @param {?} text
         * @return {?}
         */
        ApiStateBuilder.prototype.setErrorText = function (text) {
            this.instance.errorText = text;
            return this;
        };
        /**
         * @param {?} text
         * @return {?}
         */
        ApiStateBuilder.prototype.setRetryButtonText = function (text) {
            this.instance.retryButtonText = text;
            return this;
        };
        /**
         * @template THIS
         * @this {THIS}
         * @return {THIS}
         */
        ApiStateBuilder.prototype.retryOnFailure = function () {
            ( /** @type {?} */(this)).instance.retryOnFailure = true;
            return ( /** @type {?} */(this));
        };
        /**
         * @param {?} code
         * @return {?}
         */
        ApiStateBuilder.prototype.setErrorCode = function (code) {
            this.instance.errorCode = code;
            return this;
        };
        /**
         * @return {?}
         */
        ApiStateBuilder.prototype.build = function () {
            return this.instance;
        };
        return ApiStateBuilder;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        ApiStateBuilder.prototype.instance;
        /**
         * @type {?}
         * @private
         */
        ApiStateBuilder.prototype.rc;
        /**
         * @type {?}
         * @private
         */
        ApiStateBuilder.prototype.translate;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    (function (NavTransition) {
        NavTransition.ANIM_DURATION = 400;
        NavTransition.PAGE_TRANSITION_DURATION = NavTransition.ANIM_DURATION + 'ms';
        NavTransition.IDLE = 'idle';
        NavTransition.FORWARD = 'forward';
        NavTransition.BACKWARD = 'backward';
        NavTransition.ANIMATION_STYLE = 'ease-out';
        NavTransition.pageTransition = animations.trigger('pageTransition', [
            animations.transition(NavTransition.IDLE + " => " + NavTransition.FORWARD, [
                animations.query(':enter, :leave', animations.style({ position: 'fixed', width: '100%' }), { optional: true }),
                animations.group([
                    animations.query(':leave', [
                        animations.style({ transform: 'translate3d(0, 0, 0)', zIndex: 0 })
                    ], { optional: true }),
                    animations.query(':enter', [
                        animations.style({ transform: 'translate3d(100%, 0, 0)', zIndex: 100 }),
                        animations.animate(NavTransition.PAGE_TRANSITION_DURATION + " " + NavTransition.ANIMATION_STYLE, animations.style({
                            transform: 'translate3d(0, 0, 0)',
                            zIndex: 100
                        }))
                    ], { optional: true })
                ])
            ]),
            animations.transition(NavTransition.IDLE + " => " + NavTransition.BACKWARD, [
                animations.query(':enter, :leave', animations.style({ position: 'fixed', width: '100%' }), { optional: true }),
                animations.group([
                    animations.query(':leave', [
                        animations.style({ transform: 'translate3d(0, 0, 0)', zIndex: 100 }),
                        animations.animate(NavTransition.PAGE_TRANSITION_DURATION + " " + NavTransition.ANIMATION_STYLE, animations.style({
                            transform: 'translate3d(100%, 0, 0)',
                            zIndex: 100
                        }))
                    ], { optional: true }),
                    animations.query(':enter', [
                        animations.style({ transform: 'translate3d(0, 0, 0)', zIndex: 0 })
                    ], { optional: true })
                ])
            ])
        ]);
    })(exports.NavTransition || (exports.NavTransition = {}));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    (function (BottomFlyIn) {
        BottomFlyIn.ANIM_DURATION = '.4s';
        BottomFlyIn.STAGGER_DURATION = 50;
        BottomFlyIn.ANIMATION_STYLE = 'ease-out';
        BottomFlyIn.FLY_STATE = 'fly';
        BottomFlyIn.DONT_FLY_STATE = 'dontFly';
        BottomFlyIn.bottomFlyIn = animations.trigger('bottomFlyIn', [
            animations.transition("* => " + BottomFlyIn.FLY_STATE, [
                animations.query('.flex-box-child', [
                    animations.style({
                        transform: 'translate3d(0, 200%, 0)',
                        opacity: 0
                    }),
                    animations.stagger(BottomFlyIn.STAGGER_DURATION, [
                        animations.animate(BottomFlyIn.ANIM_DURATION + " " + BottomFlyIn.ANIMATION_STYLE, animations.style({
                            transform: 'translate3d(0, 0, 0)',
                            opacity: 1
                        }))
                    ])
                ], { optional: true })
            ])
        ]);
    })(exports.BottomFlyIn || (exports.BottomFlyIn = {}));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var TIME = {
        MILL_IN_SEC: 1000,
        MILL_IN_MINUTE: 60 * 1000,
        MILL_IN_HOUR: 60 * 60 * 1000,
        MILL_IN_DAY: 24 * 60 * 60 * 1000
    };
    /** @type {?} */
    var TYPEOF = {
        STRING: 'string',
        NUMBER: 'number'
    };
    /**
     * @record
     */
    function VerificationSettings() { }
    if (false) {
        /** @type {?} */
        VerificationSettings.prototype.startTs;
        /** @type {?} */
        VerificationSettings.prototype.numbers;
    }
    /**
     * @record
     */
    function VerificationNumber() { }
    if (false) {
        /** @type {?} */
        VerificationNumber.prototype.clTrId;
        /** @type {?} */
        VerificationNumber.prototype.attempts;
    }
    /** @type {?} */
    var VerificationSettingsExp = {
        TIME_DEBUG: 5 * 60 * 1000,
        TIME_PROD: 60 * 60 * 1000
    };
    /** @type {?} */
    var VerificationError = {
        ERR_INTERNET: 'ERR_INTERNET',
        ERR_INVALID_NUM: 'ERR_INVALID_NUM',
        ERR_NUM_LIMIT: 'ERR_NUM_LIMIT',
        ERR_ATTEMPTS_LIMIT: 'ERR_ATTEMPTS_LIMIT',
        ERR_TIMEOUT: 'ERR_TIMEOUT',
        ERR_NONE: 'ERR_NONE',
        ERR_MSISDN_FAIL: 'ERR_MSISDN_FAIL'
    };
    /** @type {?} */
    var GcCategory = {
        Notification: 'NOTIFICATION',
        FeedbackEmail: 'FEEDBACK_EMAIL',
        SmsVerification: 'SMS_VERIFICATION',
        Help: 'HELP',
        Session: 'SESSION'
    };
    /** @type {?} */
    var FcCategory = {
        Help: 'HELP',
        Session: 'SESSION'
    };
    /** @type {?} */
    var GcKey = {
        GeneralConfig: 'GENERAL_CONFIG',
        FeedbackEmail: 'FEEDBACK_EMAIL'
    };
    /** @type {?} */
    var FcKey = {
        GeneralConfig: 'GENERAL_CONFIG',
        UiConfig: 'UI_CONFIG'
    };
    /** @type {?} */
    var GcValue = {
        FeedbackEmail: {
            email: 'email',
            topics: 'topics',
            topicsValue: {
                privacy: 'privacy',
                default: 'default',
                notification: 'notification',
                settings: 'settings',
                createStance: 'createStance'
            }
        },
        Help: {
            customerCareNo: 'custCareNo'
        }
    };
    /**
     * @record
     */
    function SessionGC() { }
    if (false) {
        /** @type {?} */
        SessionGC.prototype.bgTimeoutSec;
        /** @type {?} */
        SessionGC.prototype.fgTimeoutSec;
    }
    /**
     * @record
     */
    function UiFlavourConfig() { }
    if (false) {
        /** @type {?} */
        UiFlavourConfig.prototype.w2bActive;
        /** @type {?} */
        UiFlavourConfig.prototype.isVeri5Enabled;
    }
    /**
     * @record
     */
    function HelpFlavourConfig() { }
    if (false) {
        /** @type {?} */
        HelpFlavourConfig.prototype.custCareEmail;
        /** @type {?} */
        HelpFlavourConfig.prototype.custCareNo;
    }
    /** @type {?} */
    var HashidParams = {
        LogLevel: '__logLevel',
        DisableCaptcha: '__disableCaptcha'
    };
    /**
     * @record
     */
    function Color() { }
    if (false) {
        /** @type {?} */
        Color.prototype.name;
        /** @type {?} */
        Color.prototype.hex;
        /** @type {?} */
        Color.prototype.darkContrast;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /*------------------------------------------------------------------------------
       About      : Constants with native platform
       
       Created on : Fri Nov 02 2018
       Author     : Sid
       
       Copyright (c) 2018 Obopay. All rights reserved.
    ------------------------------------------------------------------------------*/
    /** @type {?} */
    var TOAST_DURATION = 5000;
    /** @type {?} */
    var TOAST_DURATION_DEBUG = 10000;
    /** @type {?} */
    var LAUNCH_CONTEXT = {
        TYPE: 'type',
        MODE: 'mode',
        DATA: 'data'
    };
    /** @type {?} */
    var LaunchContextMode = {
        BUSINESS: 'business'
    };
    /** @type {?} */
    var ANDROID_PERM = {
        STORAGE: 'android.permission.WRITE_EXTERNAL_STORAGE',
        CAMERA: 'android.permission.CAMERA',
        LOCATION: 'android.permission.ACCESS_FINE_LOCATION',
        CONTACTS: 'android.permission.READ_CONTACTS',
        SMS: 'android.permission.READ_SMS',
        GALLERY: 'android.permission.WRITE_EXTERNAL_STORAGE',
    };
    /** @type {?} */
    var IOS_PERM = {
        STORAGE: 'STORAGE',
        CAMERA: 'CAMERA',
        LOCATION: 'LOCATION',
        CONTACTS: 'CONTACTS',
        SMS: 'SMS',
        GALLERY: 'PHOTOS'
    };
    /** @type {?} */
    var BROWSER_PERM = {
        STORAGE: 'STORAGE',
        CAMERA: 'CAMERA',
        LOCATION: 'LOCATION',
        CONTACTS: 'CONTACTS',
        SMS: 'SMS',
        GALLERY: 'STORAGE'
    };
    /** @enum {string} */
    var Permission = {
        STORAGE: 'STORAGE',
        CAMERA: 'CAMERA',
        LOCATION: 'LOCATION',
        CONTACTS: 'CONTACTS',
        SMS: 'SMS',
        GALLERY: 'GALLERY',
    };
    (function (MobileSdkResponse) {
        var CollectRequest;
        (function (CollectRequest) {
            var Response;
            (function (Response) {
                Response["ACKNOWLEDGED"] = "ACKNOWLEDGED";
                Response["COMPLETED"] = "COMPLETED";
                Response["DECLINED"] = "DECLINED";
            })(Response = CollectRequest.Response || (CollectRequest.Response = {}));
        })(CollectRequest = MobileSdkResponse.CollectRequest || (MobileSdkResponse.CollectRequest = {}));
    })(exports.MobileSdkResponse || (exports.MobileSdkResponse = {}));
    /**
     * @record
     */
    function NativeRouterResponse() { }
    if (false) {
        /** @type {?} */
        NativeRouterResponse.prototype.errorCode;
        /** @type {?} */
        NativeRouterResponse.prototype.errorMessage;
        /** @type {?} */
        NativeRouterResponse.prototype.data;
        /** @type {?} */
        NativeRouterResponse.prototype.events;
    }

    var MuWebApi = /** @class */ (function () {
        /**
         * @param {?} rc
         */
        function MuWebApi(rc) {
            this.rc = rc;
        }
        /**
         * @param {?} permission
         * @return {?}
         */
        MuWebApi.prototype.hasPermission = function (permission) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.checkPermission(permission)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * @param {?} permission
         * @return {?}
         */
        MuWebApi.prototype.checkPermission = function (permission) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, permissionStatus;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = permission;
                            switch (_a) {
                                case BROWSER_PERM.CAMERA: return [3 /*break*/, 1];
                                case BROWSER_PERM.GALLERY: return [3 /*break*/, 3];
                            }
                            return [3 /*break*/, 4];
                        case 1: return [4 /*yield*/, (( /** @type {?} */(navigator))).permissions.query({ name: 'camera' })];
                        case 2:
                            permissionStatus = _b.sent();
                            return [2 /*return*/, (permissionStatus.state === 'granted')];
                        case 3: return [2 /*return*/, true];
                        case 4:
                            if (this.rc.getGlobalLogLevel() !== core.LOG_LEVEL.NONE)
                                this.rc.uiRouter.showToast(permission + " permission to be implemented");
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        /**
         * @param {?} permission
         * @return {?}
         */
        MuWebApi.prototype.getPermission = function (permission) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, err_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = permission;
                            switch (_a) {
                                case BROWSER_PERM.CAMERA: return [3 /*break*/, 1];
                                case BROWSER_PERM.GALLERY: return [3 /*break*/, 4];
                            }
                            return [3 /*break*/, 5];
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, navigator.mediaDevices.getUserMedia({ video: true, audio: false })];
                        case 2:
                            _b.sent();
                            return [2 /*return*/, true];
                        case 3:
                            err_1 = _b.sent();
                            return [2 /*return*/, false];
                        case 4: return [2 /*return*/, true];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        MuWebApi.prototype.getPictureFromCamera = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // return await this.rc.uiRouter.getRoot().captureWebCamera()
                    return [2 /*return*/, ( /** @type {?} */({}))];
                });
            });
        };
        return MuWebApi;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        MuWebApi.prototype.rc;
    }

    var MuWebBridge = /** @class */ (function () {
        /**
         * @param {?} rc
         */
        function MuWebBridge(rc) {
            this.rc = rc;
            this.webApi = new MuWebApi(rc);
        }
        /**
         * @param {?} requestId
         * @param {?} apiName
         * @param {...?} params
         * @return {?}
         */
        MuWebBridge.prototype.handleRequest = function (requestId, apiName) {
            var params = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                params[_i - 2] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var obj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this[apiName]) {
                                throw new Error("Missing API " + apiName + " implementation in Web bridge.");
                            }
                            return [4 /*yield*/, this[apiName](params[0])];
                        case 1:
                            obj = _a.sent();
                            this.rc.bridge.asyncResponseFromNative(requestId, obj);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /*==============================================================================
                                  FIREBASE
        ==============================================================================*/
        /**
         * @param {?} userId
         * @return {?}
         */
        MuWebBridge.prototype.setUserId = function (userId) {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), "Setting userId " + userId);
        };
        /**
         * @param {?} eventName
         * @param {?} eventDataStr
         * @return {?}
         */
        MuWebBridge.prototype.logEvent = function (eventName, eventDataStr) {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), "Logging event: " + eventName + " Data: " + eventDataStr);
        };
        /**
         * @param {?} propName
         * @param {?} value
         * @return {?}
         */
        MuWebBridge.prototype.setUserProperty = function (propName, value) {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), "Setting userProperty: " + propName + " Value: " + value);
        };
        /**
         * @protected
         * @return {?}
         */
        MuWebBridge.prototype.fingerprintScan = function () {
            // this.rc.uiRouter.showToast('fingerprintScan Feature not supported for Browser')
            return;
        };
        /**
         * @protected
         * @return {?}
         */
        MuWebBridge.prototype.scanBarcode = function () {
            // this.rc.uiRouter.showToast('scanBarcode Feature not supported for Browser')
            return null;
        };
        /**
         * @protected
         * @return {?}
         */
        MuWebBridge.prototype.payViaQr = function () {
            this.rc.uiRouter.showToast('payViaQr Feature not supported for Browser');
            return null;
        };
        /**
         * @protected
         * @param {?} url
         * @return {?}
         */
        MuWebBridge.prototype.openInMobileBrowser = function (url) {
            window.open(url);
        };
        /**
         * @protected
         * @return {?}
         */
        MuWebBridge.prototype.getNativeMigrationInfo = function () {
            // this.rc.uiRouter.showToast('get native migration info not supported for Browser')
            return null;
        };
        /**
         * @protected
         * @return {?}
         */
        MuWebBridge.prototype.getCurrentLocation = function () {
            if (navigator.geolocation) {
                // check if geolocation is supported/enabled on current browser
                navigator.geolocation.getCurrentPosition(( /**
                 * @param {?} position
                 * @return {?}
                 */function success(position) {
                    // for when getting location is a success
                    return {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                }), ( /**
                 * @param {?} error_message
                 * @return {?}
                 */function error(error_message) { }));
            }
            return null;
        };
        /**
         * @protected
         * @return {?}
         */
        MuWebBridge.prototype.closeMobileBrowser = function () {
        };
        /**
         * @protected
         * @return {?}
         */
        MuWebBridge.prototype.getPhoneContacts = function () {
            return { contacts: [] };
        };
        /**
         * @protected
         * @param {?} params
         * @return {?}
         */
        MuWebBridge.prototype.hasPermission = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var permission, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            permission = params[0];
                            _a = {};
                            _b = 'hasPerm';
                            return [4 /*yield*/, this.webApi.hasPermission(permission)];
                        case 1: return [2 /*return*/, (_a[_b] = _c.sent(), _a)];
                    }
                });
            });
        };
        /**
         * @protected
         * @return {?}
         */
        MuWebBridge.prototype.requestMobNumHint = function () {
            this.rc.uiRouter.showToast('requestMobNumHint Feature not supported for Browser');
            return null;
        };
        /**
         * @protected
         * @return {?}
         */
        MuWebBridge.prototype.takePictureFromCamera = function () {
            return __awaiter(this, void 0, void 0, function () {
                var resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.rc.uiRouter.showToast('takePictureFromCamera Feature not supported for Browser');
                            return [4 /*yield*/, this.webApi.getPictureFromCamera()];
                        case 1:
                            resp = _a.sent();
                            return [2 /*return*/, resp];
                    }
                });
            });
        };
        /**
         * @protected
         * @return {?}
         */
        MuWebBridge.prototype.selectDocumentFile = function () {
            this.rc.uiRouter.showToast('selectDocumentFile Feature not supported for Browser');
            return { 'success': false };
        };
        /**
         * @protected
         * @return {?}
         */
        MuWebBridge.prototype.selectPictureFromGallery = function () {
            this.rc.uiRouter.showToast('selectPictureFromGallery Feature not supported for Browser');
            return { 'success': false };
        };
        /**
         * @protected
         * @param {?} params
         * @return {?}
         */
        MuWebBridge.prototype.getPermission = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var permission, showRationale, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            permission = params[0];
                            showRationale = params[1] || true;
                            _a = {};
                            return [4 /*yield*/, this.webApi.getPermission(permission)];
                        case 1: return [2 /*return*/, (_a.permissionGiven = _b.sent(), _a.dialogShown = true, _a)];
                    }
                });
            });
        };
        /**
         * @protected
         * @param {?} base64Data
         * @return {?}
         */
        MuWebBridge.prototype.writeExternalStyles = function (base64Data) {
            this.rc.uiRouter.showToast('writeExternalStyles Feature not supported for Browser');
            return true;
        };
        /**
         * @protected
         * @param {?} filePath
         * @param {?} fileName
         * @param {?} base64Data
         * @return {?}
         */
        MuWebBridge.prototype.saveBinaryFile = function (filePath /* embeds ncInstanceId */, fileName, base64Data) {
            this.rc.uiRouter.showToast('saveBinaryFile Feature not supported for Browser');
            return true;
        };
        /**
         * @protected
         * @param {?} config
         * @return {?}
         */
        MuWebBridge.prototype.setNotificationConfig = function (config) {
        };
        /**
         * @protected
         * @return {?}
         */
        MuWebBridge.prototype.closeApp = function () {
            window.location.reload();
        };
        /**
         * @protected
         * @param {?=} packageName
         * @return {?}
         */
        MuWebBridge.prototype.launchAppMarket = function (packageName) {
            window.open("https://play.google.com/store/apps/details?id=" + packageName);
        };
        /**
         * @protected
         * @param {?=} email
         * @param {?=} subject
         * @param {?=} body
         * @return {?}
         */
        MuWebBridge.prototype.sendMail = function (email, subject, body) {
            this.rc.uiRouter.showToast("SendMail Feature not supported for Browser");
        };
        /**
         * @protected
         * @param {?} mobileNumber
         * @return {?}
         */
        MuWebBridge.prototype.placeCall = function (mobileNumber) {
            this.rc.uiRouter.showToast("PlaceCall Feature not supported for Browser");
        };
        /**
         * @protected
         * @param {?} pkgName
         * @return {?}
         */
        MuWebBridge.prototype.checkIfPkgInstalled = function (pkgName) {
            this.rc.uiRouter.showToast("checkIfPkgInstalled Feature not supported for Browser");
            return false;
        };
        /**
         * @protected
         * @return {?}
         */
        MuWebBridge.prototype.listenForSmsCode = function () {
        };
        /**
         * @protected
         * @param {?} clientTransactionId
         * @return {?}
         */
        MuWebBridge.prototype.setVerStringToken = function (clientTransactionId) {
        };
        /**
         * @protected
         * @param {?} text
         * @return {?}
         */
        MuWebBridge.prototype.copyToClipBoard = function (text) {
            this.rc.uiRouter.showToast("copyToClipBoard Feature not supported for Browser");
            return false;
        };
        /**
         * @protected
         * @return {?}
         */
        MuWebBridge.prototype.openSoftInputKeyboard = function () {
        };
        /**
         * @protected
         * @return {?}
         */
        MuWebBridge.prototype.hideSoftInputKeyboard = function () {
        };
        /**
         * @protected
         * @return {?}
         */
        MuWebBridge.prototype.canAuthWithFingerprint = function () {
            return { canAuth: false };
        };
        /**
         * @protected
         * @return {?}
         */
        MuWebBridge.prototype.logOutCurrentUser = function () {
            window.location.reload();
        };
        /**
         * @protected
         * @return {?}
         */
        MuWebBridge.prototype.resetApp = function () {
            localStorage.clear();
            window.location.reload();
        };
        /**
         * @protected
         * @return {?}
         */
        MuWebBridge.prototype.getDeviceInfo = function () {
            return '{}';
        };
        /**
         * @protected
         * @return {?}
         */
        MuWebBridge.prototype.setDebuggable = function () {
        };
        return MuWebBridge;
    }());
    if (false) {
        /** @type {?} */
        MuWebBridge.prototype.webApi;
        /**
         * @type {?}
         * @protected
         */
        MuWebBridge.prototype.rc;
    }

    /** @type {?} */
    var ANDROID = 'Android';
    /** @type {?} */
    var IPAD = 'iPad';
    /**
     * @record
     */
    function ReferrerParams() { }
    if (false) {
        /** @type {?} */
        ReferrerParams.prototype.utm_source;
        /** @type {?} */
        ReferrerParams.prototype.utm_medium;
        /** @type {?} */
        ReferrerParams.prototype.utm_campaign;
        /** @type {?} */
        ReferrerParams.prototype.utm_term;
        /** @type {?} */
        ReferrerParams.prototype.utm_content;
        /** @type {?} */
        ReferrerParams.prototype.gclid;
        /** @type {?} */
        ReferrerParams.prototype.mode;
    }
    /** @enum {number} */
    var State = {
        LOADING: 0,
        INITIALIZED: 1,
        SHOWN: 2 // UI being displayed, albeit busy in server requests
        ,
    };
    State[State.LOADING] = 'LOADING';
    State[State.INITIALIZED] = 'INITIALIZED';
    State[State.SHOWN] = 'SHOWN';
    /** @enum {string} */
    var SDK_TYPE = {
        MOBILE: 'MOBILE',
        WEB: 'WEB',
        CORDOVA: 'CORDOVA' // mobile SDK with Obopay app not installed; web invocation
        ,
    };
    /** @enum {string} */
    var UserAgent = {
        BROWSER: 'BROWSER',
        ANDROID: 'ANDROID',
        IOS: 'IOS',
    };
    /**
     * @record
     */
    function Location() { }
    if (false) {
        /** @type {?} */
        Location.prototype.lat;
        /** @type {?} */
        Location.prototype.lng;
    }
    /**
     * @record
     */
    function MobileSdkParams() { }
    if (false) {
        /** @type {?} */
        MobileSdkParams.prototype.source;
        /** @type {?} */
        MobileSdkParams.prototype.requestId;
    }
    var InitConfig = /** @class */ (function () {
        /**
         * @param {?} remoteUrl
         */
        function InitConfig(remoteUrl) {
            this.appVersion = '';
            this.localStoragePath = '';
            this.appChannel = 'WEB';
            this.pseudoId = '';
            this.fcmId = '';
            this.adId = '';
            this.deviceId = '';
            this.appInstallTs = Date.now();
            this.remoteUrl = remoteUrl;
        }
        return InitConfig;
    }());
    if (false) {
        /** @type {?} */
        InitConfig.prototype.remoteUrl;
        /** @type {?} */
        InitConfig.prototype.appVersion;
        /** @type {?} */
        InitConfig.prototype.localStoragePath;
        /** @type {?} */
        InitConfig.prototype.appChannel;
        /** @type {?} */
        InitConfig.prototype.pseudoId;
        /** @type {?} */
        InitConfig.prototype.fcmId;
        /** @type {?} */
        InitConfig.prototype.adId;
        /** @type {?} */
        InitConfig.prototype.deviceId;
        /** @type {?} */
        InitConfig.prototype.appInstallTs;
        /** @type {?} */
        InitConfig.prototype.migrationInfo;
    }
    var LaunchContext = /** @class */ (function () {
        function LaunchContext() {
            // mobile SDK package name 
            this.referrerParams = ( /** @type {?} */({}));
            this.isUpgrade = false;
        }
        return LaunchContext;
    }());
    if (false) {
        /** @type {?} */
        LaunchContext.prototype.directLink;
        /** @type {?} */
        LaunchContext.prototype.source;
        /** @type {?} */
        LaunchContext.prototype.referrerParams;
        /** @type {?} */
        LaunchContext.prototype.isUpgrade;
    }
    var MuBridge = /** @class */ (function () {
        /**
         * @param {?} rc
         * @param {?} ngZone
         */
        function MuBridge(rc, ngZone) {
            this.rc = rc;
            this.ngZone = ngZone;
            this.runningInBrowser = false;
            this.nextRequestId = 1;
            this.requestMap = {};
            this.launchContext = new LaunchContext();
            this.mobileSdkParams = ( /** @type {?} */({}));
        }
        // WARNING: rc is not initied at this stage. Do not use
        /**
         * @param {?} remoteUrl
         * @return {?}
         */
        MuBridge.prototype.preInit = function (remoteUrl) {
            this.initConfig = new InitConfig(remoteUrl);
            if (window['webkit'] && window['webkit'].messageHandlers.cordova) {
                this.userAgent = UserAgent.IOS;
                this.permObj = IOS_PERM;
            }
            else if (window['cordova']) {
                this.userAgent = UserAgent.ANDROID;
                this.permObj = ANDROID_PERM;
            }
            else {
                this.userAgent = UserAgent.BROWSER;
                this.webBridge = new MuWebBridge(this.rc);
                this.permObj = BROWSER_PERM;
            }
            this.runningInBrowser = this.userAgent === UserAgent.BROWSER;
            this.state = State.INITIALIZED;
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data, connAttr;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.userAgent === UserAgent.BROWSER)) return [3 /*break*/, 1];
                            this.onConnectionAttr(navigator.onLine ? core.NetworkType.wifi : null, null);
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, this.sendAsyncRequest('getInitData')];
                        case 2:
                            data = _a.sent();
                            this.initConfig = data['initConfig'];
                            this.launchContext = data['launchContext'];
                            connAttr = data['connAttr'];
                            this.onConnectionAttr(connAttr['netType'], connAttr['location']);
                            _a.label = 3;
                        case 3:
                            if (this.launchContext.referrerParams &&
                                this.launchContext.referrerParams.mode === LaunchContextMode.BUSINESS) {
                                this.sdkType = SDK_TYPE.MOBILE;
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.isRunningInDev = function () {
            return this.initConfig.remoteUrl == 'http://localhost';
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.isRunningInBrowser = function () {
            return this.runningInBrowser;
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.isRunningInMWeb = function () {
            return window.navigator.userAgent.includes(ANDROID) && this.isRunningInBrowser();
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.isRunningInIPad = function () {
            return window.navigator.userAgent.includes(IPAD);
        };
        Object.defineProperty(MuBridge.prototype, "state", {
            /*==============================================================================
                                                STATE
            ==============================================================================*/
            /**
             * @return {?}
             */
            get: function () {
                return this._state;
            },
            /**
             * @param {?} newState
             * @return {?}
             */
            set: function (newState) {
                this._state = newState;
                if (this.userAgent !== UserAgent.BROWSER) {
                    this.sendAsyncRequest('setStateFromJs', State[this._state]);
                }
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @return {?}
         */
        MuBridge.prototype.setStateShown = function () {
            this.state = State.SHOWN;
        };
        /*==============================================================================
                                      LAUNCH CONTEXT
        ==============================================================================*/
        /**
         * @return {?}
         */
        MuBridge.prototype.getDirectLink = function () {
            return this.launchContext.directLink;
        };
        /**
         * @param {?} directLink
         * @return {?}
         */
        MuBridge.prototype.setWebDirectLink = function (directLink) {
            this.launchContext.directLink = directLink;
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.resetDirectLink = function () {
            this.launchContext.directLink = null;
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.getReferrerParams = function () {
            return this.launchContext.referrerParams;
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.isUpgrade = function () {
            return this.launchContext.isUpgrade;
        };
        /*==============================================================================
                                       INIT CONFIG
        ==============================================================================*/
        /**
         * @return {?}
         */
        MuBridge.prototype.getUserAgent = function () {
            return this.userAgent;
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.getRemoteUrl = function () {
            return this.initConfig.remoteUrl;
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.getAppVersion = function () {
            return this.initConfig.appVersion;
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.getAppChannel = function () {
            return this.initConfig.appChannel;
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.getPseudoId = function () {
            return this.initConfig.pseudoId;
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.getFcmId = function () {
            return this.initConfig.fcmId;
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.getAdId = function () {
            return this.initConfig.adId;
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.getAppInstallTime = function () {
            return this.initConfig.appInstallTs;
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.getDeviceId = function () {
            return '';
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.getLocation = function () {
            return JSON.stringify(this.location);
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.getCordovaNetworkType = function () {
            return this.netType;
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.getLocalStoragePath = function () {
            return this.initConfig.localStoragePath;
        };
        /*==============================================================================
                                  FIREBASE
        ==============================================================================*/
        /**
         * @param {?} userId
         * @return {?}
         */
        MuBridge.prototype.setUserId = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('setUserId', String(userId))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?} eventName
         * @param {?} eventDataStr
         * @return {?}
         */
        MuBridge.prototype.logEvent = function (eventName, eventDataStr) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('logEvent', eventName, eventDataStr)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?} propName
         * @param {?} value
         * @return {?}
         */
        MuBridge.prototype.setUserProperty = function (propName, value) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('setUserProperty', propName, value)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /*==============================================================================
                                         SDK
        ==============================================================================*/
        /**
         * @return {?}
         */
        MuBridge.prototype.isWebSdkInvocation = function () {
            return this.sdkType === SDK_TYPE.WEB || this.sdkType === SDK_TYPE.CORDOVA;
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.isMobileSdkInvocation = function () {
            return this.sdkType === SDK_TYPE.MOBILE;
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.isSdkInvocation = function () {
            return !!this.sdkType;
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.getSdkType = function () {
            return this.sdkType;
        };
        /**
         * @param {?} source
         * @param {?} requestId
         * @return {?}
         */
        MuBridge.prototype.setMobileSdkParams = function (source, requestId) {
            this.mobileSdkParams.source = source;
            this.mobileSdkParams.requestId = Number(requestId);
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.getMobileSdkSource = function () {
            return this.mobileSdkParams.source;
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.getMobileSdkRequestId = function () {
            return this.mobileSdkParams.requestId;
        };
        /**
         * This will only get invoked for Sdk type Mobile since this is the main app and
         * any SDK invocation would happen wrt a direct link and response via Intent broadcast
         * in Android
         * @param {?} requestId
         * @param {?=} data
         * @param {?=} closeApp
         * @return {?}
         */
        MuBridge.prototype.onSdkSuccessResponse = function (requestId, data, closeApp) {
            if (data === void 0) { data = null; }
            if (closeApp === void 0) { closeApp = true; }
            return __awaiter(this, void 0, void 0, function () {
                var resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), requestId, "RequestId is not defined");
                            if (this.sdkType !== SDK_TYPE.MOBILE) {
                                this.rc.isWarn() && this.rc.warn(this.rc.getName(this), "Came to Bridge SDK response for inv other than SDK Type Mobile, returning...");
                                return [2 /*return*/];
                            }
                            resp = Object.assign({ code: 'SUCCESS' }, data);
                            return [4 /*yield*/, this.onMobileSdkResponse(requestId, resp, closeApp)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?} requestId
         * @param {?} data
         * @param {?} uiError
         * @param {?=} closeApp
         * @return {?}
         */
        MuBridge.prototype.onSdkFailureResponse = function (requestId, data, uiError, closeApp) {
            if (closeApp === void 0) { closeApp = true; }
            return __awaiter(this, void 0, void 0, function () {
                var resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), requestId, "RequestId is not defined");
                            if (this.sdkType !== SDK_TYPE.MOBILE) {
                                this.rc.isWarn() && this.rc.warn(this.rc.getName(this), "Came to Bridge SDK response for inv other than SDK Type Mobile, returning...");
                                return [2 /*return*/];
                            }
                            resp = Object.assign({ code: 'FAILURE' }, data);
                            resp = Object.assign(uiError, resp);
                            return [4 /*yield*/, this.onMobileSdkResponse(requestId, resp, closeApp)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @protected
         * @param {?} requestId
         * @param {?} data
         * @param {?=} closeApp
         * @return {?}
         */
        MuBridge.prototype.onMobileSdkResponse = function (requestId, data, closeApp) {
            if (closeApp === void 0) { closeApp = true; }
            return __awaiter(this, void 0, void 0, function () {
                var obj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            obj = Object.assign({ requestId: requestId, source: this.getMobileSdkSource() }, data);
                            return [4 /*yield*/, this.sendAsyncRequest('onMobileSdkResponse', JSON.stringify(obj), closeApp)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /*==============================================================================
                                    STORAGE CORDOVA
        ==============================================================================*/
        /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        MuBridge.prototype.setGlobalKeyValue = function (key, value) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('setGlobalKeyValue', key, value)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?} key
         * @return {?}
         */
        MuBridge.prototype.getGlobalKeyValue = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var object;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('getGlobalKeyValue', key)];
                        case 1:
                            object = _a.sent();
                            return [2 /*return*/, object['value']];
                    }
                });
            });
        };
        /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        MuBridge.prototype.setUserKeyValue = function (key, value) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('setUserKeyValue', key, value)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?} key
         * @return {?}
         */
        MuBridge.prototype.getUserKeyValue = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var object;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('getUserKeyValue', key)];
                        case 1:
                            object = _a.sent();
                            return [2 /*return*/, object['value']];
                    }
                });
            });
        };
        /**
         * @param {?} config
         * @return {?}
         */
        MuBridge.prototype.setGcConfig = function (config) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('setGcConfig', config)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?} category
         * @param {?} key
         * @return {?}
         */
        MuBridge.prototype.getGcConfig = function (category, key) {
            return __awaiter(this, void 0, void 0, function () {
                var object;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('getGcConfig', category, key)];
                        case 1:
                            object = _a.sent();
                            return [2 /*return*/, object['value']];
                    }
                });
            });
        };
        /*==============================================================================
                                    CORDOVA ROUTER
        ==============================================================================*/
        /**
         * @return {?}
         */
        MuBridge.prototype.prepareConnection = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('prepareConnection')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?} api
         * @param {?} params
         * @return {?}
         */
        MuBridge.prototype.sendRouterRequest = function (api, params) {
            return __awaiter(this, void 0, void 0, function () {
                var obj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('sendRequest', api, JSON.stringify(params))];
                        case 1:
                            obj = _a.sent();
                            return [2 /*return*/, ( /** @type {?} */(obj))];
                    }
                });
            });
        };
        /**
         * @param {?} name
         * @param {?} params
         * @param {?} ephemeral
         * @return {?}
         */
        MuBridge.prototype.sendRouterEvent = function (name, params, ephemeral) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('sendEvent', name, JSON.stringify(params), ephemeral)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /*==============================================================================
                                      BRIDGE UTILS
        ==============================================================================*/
        /**
         * @return {?}
         */
        MuBridge.prototype.isAndroid = function () {
            return (this.userAgent === UserAgent.ANDROID);
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.isIos = function () {
            return (this.userAgent === UserAgent.IOS);
        };
        /**
         * @param {?} clientId
         * @param {?=} profilePicFileName
         * @return {?}
         */
        MuBridge.prototype.getUserProfilePicUrl = function (clientId, profilePicFileName) {
            if (!this.rc.userKeyVal.getWebProfilePicBase64(clientId))
                return null;
            if (this.runningInBrowser) {
                return 'data:image/jpeg;base64,' + this.rc.userKeyVal.getWebProfilePicBase64(clientId);
            }
            // TODO - fix profile pic file name
            // const profPicFileName = profilePicFileName || this.rc.userKeyVal.profilePicFileName
            /** @type {?} */
            var profPicFileName = profilePicFileName;
            /** @type {?} */
            var url = this.getLocalStoragePath() + "/" +
                ("users/" + String(clientId)) + "/" +
                profPicFileName +
                '?random+\=' + Math.random();
            return '';
        };
        /*==============================================================================
                                 ASYNC REQUESTS TO CORDOVA
        ==============================================================================*/
        /**
         * @return {?}
         */
        MuBridge.prototype.getDeviceInfo = function () {
            return __awaiter(this, void 0, void 0, function () {
                var obj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('getDeviceInfo')];
                        case 1:
                            obj = _a.sent();
                            return [2 /*return*/, obj];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.getSessionInfo = function () {
            return __awaiter(this, void 0, void 0, function () {
                var obj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('getSessionInfo')];
                        case 1:
                            obj = _a.sent();
                            return [2 /*return*/, ( /** @type {?} */(obj))];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.recreateSession = function () {
            return __awaiter(this, void 0, void 0, function () {
                var obj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('recreateSession')];
                        case 1:
                            obj = _a.sent();
                            return [2 /*return*/, ( /** @type {?} */(obj))];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.getCurrentLocation = function () {
            return __awaiter(this, void 0, void 0, function () {
                var json;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('getCurrentLocation')];
                        case 1:
                            json = _a.sent();
                            return [2 /*return*/, {
                                    lat: json['lat'],
                                    lng: json['lng']
                                }];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.requestMobNumHint = function () {
            return __awaiter(this, void 0, void 0, function () {
                var resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.userAgent !== UserAgent.ANDROID)
                                return [2 /*return*/, null];
                            return [4 /*yield*/, this.sendAsyncRequest('requestMobNumHint')];
                        case 1:
                            resp = _a.sent();
                            return [2 /*return*/, resp ? resp['selectedId'] : null];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.getPhoneContacts = function () {
            return __awaiter(this, void 0, void 0, function () {
                var obj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('getPhoneContacts')];
                        case 1:
                            obj = _a.sent();
                            return [2 /*return*/, obj['contacts']];
                    }
                });
            });
        };
        // /**
        //  * @returns { success: boolean, base64: string, mimeType: string, cropped: boolean, failureCode: string }
        //  */
        /**
         * @return {?}
         */
        MuBridge.prototype.takePictureFromCamera = function () {
            return __awaiter(this, void 0, void 0, function () {
                var obj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('takePictureFromCamera')];
                        case 1:
                            obj = _a.sent();
                            return [2 /*return*/, obj];
                    }
                });
            });
        };
        // /**
        //  * @returns { success: boolean, base64: string, mimeType: string, cropped: boolean, failureCode: string }
        //  */
        /**
         * @return {?}
         */
        MuBridge.prototype.selectPictureFromGallery = function () {
            return __awaiter(this, void 0, void 0, function () {
                var obj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('selectPictureFromGallery')];
                        case 1:
                            obj = _a.sent();
                            return [2 /*return*/, obj];
                    }
                });
            });
        };
        // /**
        //  * @returns { base64: string, checkSum: string, mimeType: string }
        //  */
        /**
         * @return {?}
         */
        MuBridge.prototype.selectDocumentFile = function () {
            return __awaiter(this, void 0, void 0, function () {
                var obj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('selectDocumentFile')];
                        case 1:
                            obj = _a.sent();
                            return [2 /*return*/, obj];
                    }
                });
            });
        };
        /**
         * @param {?} permission
         * @param {?=} showRationale
         * @return {?}
         */
        MuBridge.prototype.getPermission = function (permission, showRationale) {
            if (showRationale === void 0) { showRationale = true; }
            return __awaiter(this, void 0, void 0, function () {
                var json;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('getPermission', this.permObj[permission], showRationale)];
                        case 1:
                            json = _a.sent();
                            return [2 /*return*/, { permGiven: json['permissionGiven'], dialogShown: json['dialogShown'] }];
                    }
                });
            });
        };
        /**
         * @param {?} base64Data
         * @return {?}
         */
        MuBridge.prototype.writeExternalStyles = function (base64Data) {
            return __awaiter(this, void 0, void 0, function () {
                var json;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('writeExternalStyles', base64Data)];
                        case 1:
                            json = _a.sent();
                            return [2 /*return*/, json['success']];
                    }
                });
            });
        };
        /**
         * @param {?} filePath
         * @param {?} fileName
         * @param {?} base64Data
         * @return {?}
         */
        MuBridge.prototype.saveBinaryFile = function (filePath /* embeds ncInstanceId */, fileName, base64Data) {
            return __awaiter(this, void 0, void 0, function () {
                var json;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('saveBinaryFile', filePath, fileName, base64Data)];
                        case 1:
                            json = _a.sent();
                            return [2 /*return*/, json['success']];
                    }
                });
            });
        };
        /**
         * //  * \@returns { action: string, result: string }
         *
         * Eg. action : SAVED_PAYEES, DISMISS, SCAN
         * result : Scanned result if action is SCAN
         * @param {?} invSource
         * @return {?}
         */
        MuBridge.prototype.payViaQr = function (invSource) {
            return __awaiter(this, void 0, void 0, function () {
                var object;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('payViaQr', invSource)];
                        case 1:
                            object = _a.sent();
                            return [2 /*return*/, object];
                    }
                });
            });
        };
        /**
         * @param {?} invSource
         * @param {?} title
         * @return {?}
         */
        MuBridge.prototype.scanQrCode = function (invSource, title) {
            return __awaiter(this, void 0, void 0, function () {
                var object, scanResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('scanQrCode', invSource, title)];
                        case 1:
                            object = _a.sent();
                            scanResult = {
                                result: object['result'],
                                action: object['action']
                            };
                            return [2 /*return*/, scanResult];
                    }
                });
            });
        };
        /**
         * @param {?} invSource
         * @return {?}
         */
        MuBridge.prototype.scanBarcode = function (invSource) {
            return __awaiter(this, void 0, void 0, function () {
                var resp, obj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.hasPermission(Permission.CAMERA)];
                        case 1:
                            if (!!(_a.sent())) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.getPermission(Permission.CAMERA)];
                        case 2:
                            resp = _a.sent();
                            if (!resp.permGiven) {
                                this.rc.uiRouter.showToast('Can\'t scan Barcode without Camera permission');
                                return [2 /*return*/, null];
                            }
                            _a.label = 3;
                        case 3: return [4 /*yield*/, this.sendAsyncRequest('scanBarcode', invSource)];
                        case 4:
                            obj = _a.sent();
                            return [2 /*return*/, obj];
                    }
                });
            });
        };
        // async fingerprintScan() {
        //   await this.sendAsyncRequest('fingerprintScan')
        // }
        // async canAuthWithFingerprint(): Promise<boolean> {
        //   const obj = await this.sendAsyncRequest('canAuthWithFingerprint')
        //   return obj['canAuth']
        // }
        /**
         * @param {?} url
         * @return {?}
         */
        MuBridge.prototype.openInMobileBrowser = function (url) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('openInMobileBrowser', url)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.closeMobileBrowser = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('closeMobileBrowser')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.enableDebug = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.rc.setGlobalLogLevel(core.LOG_LEVEL.DEBUG);
                            this.rc.globalKeyVal.logLevel = core.LOG_LEVEL.DEBUG;
                            return [4 /*yield*/, this.sendAsyncRequest('setDebuggable')];
                        case 1:
                            _a.sent();
                            this.rc.uiRouter.showToast('Log level changed to debug');
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.updateGcConfig = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.userAgent !== UserAgent.BROWSER)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.sendAsyncRequest('updateGcConfig')];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.closeApp = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('closeApp')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.logoutUser = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('logoutUser')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.forgetUser = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('forgetUser')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?=} packageName
         * @return {?}
         */
        MuBridge.prototype.launchAppMarket = function (packageName) {
            if (packageName === void 0) { packageName = ''; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('launchAppMarket', packageName)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?=} email
         * @param {?=} subject
         * @param {?=} body
         * @return {?}
         */
        MuBridge.prototype.sendMail = function (email, subject, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), { email: email, subject: subject });
                            return [4 /*yield*/, this.sendAsyncRequest('sendMail', email || '', subject || '', body || '')];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * @param {?} mobileNumber
         * @return {?}
         */
        MuBridge.prototype.placeCall = function (mobileNumber) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), "Placing call with number " + mobileNumber);
                            return [4 /*yield*/, this.sendAsyncRequest('placeCall', mobileNumber)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?} pkgName
         * @return {?}
         */
        MuBridge.prototype.checkIfPkgInstalled = function (pkgName) {
            return __awaiter(this, void 0, void 0, function () {
                var obj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('checkIfPkgInstalled', pkgName)];
                        case 1:
                            obj = _a.sent();
                            return [2 /*return*/, obj['installed']];
                    }
                });
            });
        };
        /**
         * @param {?} permission
         * @return {?}
         */
        MuBridge.prototype.hasPermission = function (permission) {
            return __awaiter(this, void 0, void 0, function () {
                var obj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('hasPermission', this.permObj[permission])];
                        case 1:
                            obj = _a.sent();
                            return [2 /*return*/, obj['hasPerm']];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.listenForSmsCode = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('listenForSmsCode')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?} clientTransactionId
         * @return {?}
         */
        MuBridge.prototype.setVerStringToken = function (clientTransactionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('setVerStringToken', clientTransactionId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?} text
         * @return {?}
         */
        MuBridge.prototype.copyToClipBoard = function (text) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('copyToClipBoard', text)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.openSoftInputKeyboard = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.userAgent === UserAgent.ANDROID)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.sendAsyncRequest('openSoftInputKeyboard')];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.hideSoftInputKeyboard = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.userAgent === UserAgent.ANDROID)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.sendAsyncRequest('hideSoftInputKeyboard')];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.logOutCurrentUser = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.rc.userKeyVal.logOutCurrentUser()];
                        case 1:
                            _a.sent();
                            // const params: LogoutUser.params = {}
                            //await this.rc.router.sendRequest(this.rc, LogoutUser.name, params)
                            return [4 /*yield*/, this.sendAsyncRequest('logoutUser')];
                        case 2:
                            // const params: LogoutUser.params = {}
                            //await this.rc.router.sendRequest(this.rc, LogoutUser.name, params)
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        MuBridge.prototype.resetApp = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendAsyncRequest('resetApp')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /*------------------------------------------------------------------------------
          F R O M    N A T I V E
        ------------------------------------------------------------------------------*/
        /**
         * @param {?} fnName
         * @param {?} requestTag
         * @param {...?} params
         * @return {?}
         */
        MuBridge.prototype.asyncRequestFromNative = function (fnName, requestTag) {
            var params = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                params[_i - 2] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    this.ngZone.run(( /**
                     * @return {?}
                     */function () {
                        _this.asyncRequestFromNativeInternal(fnName, requestTag, params);
                    }));
                    return [2 /*return*/];
                });
            });
        };
        /**
         * @private
         * @param {?} fnName
         * @param {?} requestTag
         * @param {...?} params
         * @return {?}
         */
        MuBridge.prototype.asyncRequestFromNativeInternal = function (fnName, requestTag) {
            var params = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                params[_i - 2] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var fn, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            fn = this[fnName];
                            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), typeof fn === 'function', fnName);
                            return [4 /*yield*/, fn.apply(this, params)];
                        case 1:
                            resp = _a.sent();
                            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), resp && (typeof resp === 'object'), resp);
                            if (this.userAgent !== UserAgent.BROWSER) {
                                this.sendAsyncRequest('asyncRequestResponseFromJs', requestTag, JSON.stringify(resp));
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?} eventName
         * @param {...?} params
         * @return {?}
         */
        MuBridge.prototype.eventFromNative = function (eventName) {
            var _this = this;
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            this.ngZone.run(( /**
             * @return {?}
             */function () {
                /** @type {?} */
                var fnName = "on" + eventName;
                /** @type {?} */
                var fn = _this[fnName];
                _this.rc.isAssert() && _this.rc.assert(_this.rc.getName(_this), typeof fn === 'function', fnName);
                fn.apply(_this, params);
            }));
        };
        /*------------------------------------------------------------------------------
          E V E N T S   F R O M   N A T I V E
        ------------------------------------------------------------------------------*/
        /**
         * @private
         * @param {?} json
         * @return {?}
         */
        MuBridge.prototype.onUpdateCustomData = function (json) {
            this.rc.router.updateCustomData(this.rc, ( /** @type {?} */(json)));
        };
        /**
         * @private
         * @param {?} wo
         * @return {?}
         */
        MuBridge.prototype.onEphEvent = function (wo) {
            this.rc.router.providerMessage(this.rc, [( /** @type {?} */(wo))]);
        };
        /**
         * @private
         * @param {?} smsBody
         * @return {?}
         */
        MuBridge.prototype.onVerSmsCode = function (smsBody) {
            // this.rc.uiRouter.getRoot().onVerificationSmsCode(smsBody)
        };
        /**
         * @private
         * @return {?}
         */
        MuBridge.prototype.onVerSmsTimeout = function () {
        };
        /**
         * @private
         * @return {?}
         */
        MuBridge.prototype.onMobileBrowserClosed = function () {
            // EventSystem.broadcast(this.rc, APP_UI_EVENT.MOBILE_BROWSER_CLOSED)
        };
        /**
         * @private
         * @param {?} factorHeight
         * @return {?}
         */
        MuBridge.prototype.onAdjustPan = function (factorHeight) {
            this.currKeyboardHt = factorHeight;
            // EventSystem.broadcast(this.rc, APP_UI_EVENT.ADJUST_PAN_FOR_SCREEN)
        };
        /**
         * @private
         * @param {?} result
         * @return {?}
         */
        MuBridge.prototype.onFingerprintScanResult = function (result) {
            // EventSystem.broadcast(this.rc, APP_UI_EVENT.FINGERPRINT_SCAN_RESULT, JSON.parse(result))
        };
        /**
         * @private
         * @param {?} netType
         * @param {?} location
         * @return {?}
         */
        MuBridge.prototype.onConnectionAttr = function (netType, location) {
            if (netType)
                this.netType = netType;
            if (!location)
                return;
            /** @type {?} */
            var lat = location['lat'];
            /** @type {?} */
            var lng = location['lng'];
            if (lat && lng) {
                this.location = location;
                // if (this.rc.router && this.rc.userKeyVal.clientId) {
                //   const locUpdReq: LocationUpdateEvent.params = { lat, lng }
                //   this.rc.router.sendEvent(this.rc, LocationUpdateEvent.name, locUpdReq, 
                //     LocationUpdateEvent.ephemeral)
                // }
            }
        };
        /**
         * @private
         * @return {?}
         */
        MuBridge.prototype.onScreenPause = function () {
            // EventSystem.broadcast(this.rc, APP_UI_EVENT.CORDOVA_SCREEN_PAUSE)
        };
        /**
         * @private
         * @return {?}
         */
        MuBridge.prototype.onScreenResume = function () {
            // EventSystem.broadcast(this.rc, APP_UI_EVENT.CORDOVA_SCREEN_RESUME)
        };
        // onLaunch(directLink: string) {
        //   if (!directLink) return
        //   this.launchContext.directLink = directLink
        //   this.rc.uiRouter.getRoot().showLanding(false, false)
        // }
        /**
         * @param {?} directLink
         * @return {?}
         */
        MuBridge.prototype.setDirectLink = function (directLink) {
            if (!directLink)
                return;
            this.launchContext.directLink = directLink;
        };
        /*------------------------------------------------------------------------------
          A P P  R E Q U E S T
        ------------------------------------------------------------------------------*/
        /**
         * Request has a response to be given back to JS mapped with requestId
         * @protected
         * @param {?} apiName
         * @param {...?} params arguments for the API
         * @return {?}
         */
        MuBridge.prototype.sendAsyncRequest = function (apiName) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var nar;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            nar = new NativeAsyncRequest(this.nextRequestId++, apiName);
                            this.requestMap[nar.requestId] = nar;
                            switch (this.userAgent) {
                                case UserAgent.ANDROID:
                                    (_a = window['cordova'])[apiName].apply(_a, __spread([nar.requestId], params));
                                    break;
                                case UserAgent.IOS:
                                    window['webkit'].messageHandlers.cordova.postMessage({ requestId: nar.requestId,
                                        method: apiName, args: params });
                                    break;
                                case UserAgent.BROWSER:
                                    this.webBridge.handleRequest(nar.requestId, apiName, params);
                                    break;
                            }
                            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), "Response received for sendAsyncRequest: requestid: " + nar.requestId + ", \n      apiName: " + apiName);
                            return [4 /*yield*/, nar.promise];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        // TODO: make private, web-bridge dependency
        /**
         * @param {?} requestId
         * @param {?} json
         * @return {?}
         */
        MuBridge.prototype.asyncResponseFromNative = function (requestId, json) {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), "asyncResponseFromNative requestId:" + requestId + " Response:" + JSON.stringify(json));
            /** @type {?} */
            var nar = this.requestMap[requestId];
            if (!nar) {
                this.rc.isError() && this.rc.error(this.rc.getName(this), 'Request id', requestId, 'is missing in request map');
                return;
            }
            delete this.requestMap[requestId];
            nar.resolve(json);
        };
        return MuBridge;
    }());
    if (false) {
        /** @type {?} */
        MuBridge.prototype.currKeyboardHt;
        /**
         * @type {?}
         * @protected
         */
        MuBridge.prototype.runningInBrowser;
        /**
         * @type {?}
         * @private
         */
        MuBridge.prototype.nextRequestId;
        /**
         * @type {?}
         * @private
         */
        MuBridge.prototype.requestMap;
        /**
         * @type {?}
         * @private
         */
        MuBridge.prototype.location;
        /**
         * @type {?}
         * @private
         */
        MuBridge.prototype.netType;
        /**
         * @type {?}
         * @private
         */
        MuBridge.prototype._state;
        /**
         * @type {?}
         * @protected
         */
        MuBridge.prototype.userAgent;
        /**
         * @type {?}
         * @protected
         */
        MuBridge.prototype.permObj;
        /**
         * @type {?}
         * @private
         */
        MuBridge.prototype.initConfig;
        /**
         * @type {?}
         * @protected
         */
        MuBridge.prototype.launchContext;
        /**
         * @type {?}
         * @protected
         */
        MuBridge.prototype.webBridge;
        /**
         * @type {?}
         * @protected
         */
        MuBridge.prototype.sdkType;
        /**
         * @type {?}
         * @protected
         */
        MuBridge.prototype.mobileSdkParams;
        /**
         * @type {?}
         * @protected
         */
        MuBridge.prototype.rc;
        /**
         * @type {?}
         * @protected
         */
        MuBridge.prototype.ngZone;
    }
    var NativeAsyncRequest = /** @class */ (function () {
        /**
         * @param {?} requestId
         * @param {?} apiName
         */
        function NativeAsyncRequest(requestId, apiName) {
            var _this = this;
            this.requestId = requestId;
            this.apiName = apiName;
            this.promise = new Promise(( /**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */function (resolve, reject) {
                _this.resolve = resolve;
                _this.reject = reject;
            }));
        }
        return NativeAsyncRequest;
    }());
    if (false) {
        /** @type {?} */
        NativeAsyncRequest.prototype.promise;
        /** @type {?} */
        NativeAsyncRequest.prototype.resolve;
        /** @type {?} */
        NativeAsyncRequest.prototype.reject;
        /** @type {?} */
        NativeAsyncRequest.prototype.requestId;
        /** @type {?} */
        NativeAsyncRequest.prototype.apiName;
    }

    /**
     * @record
     */
    function WebSessionInitData() { }
    if (false) {
        /** @type {?} */
        WebSessionInitData.prototype.version;
        /** @type {?} */
        WebSessionInitData.prototype.mobileNo;
        /** @type {?} */
        WebSessionInitData.prototype.authKey;
        /** @type {?} */
        WebSessionInitData.prototype.businessLogoUrl;
        /** @type {?} */
        WebSessionInitData.prototype.businessName;
        /** @type {?|undefined} */
        WebSessionInitData.prototype.businessRegId;
        /** @type {?|undefined} */
        WebSessionInitData.prototype.businessId;
        /** @type {?|undefined} */
        WebSessionInitData.prototype.businessColorHex;
        /** @type {?|undefined} */
        WebSessionInitData.prototype.isRunningInCordova;
    }
    /** @enum {string} */
    var RequestMessageId = {
        REQUEST_SESSION: 'REQUEST_SESSION',
        DIRECT_LINK: 'DIRECT_LINK',
        API_REQUEST: 'API_REQUEST',
    };
    /**
     * @record
     */
    function WindowMessage() { }
    if (false) {
        /** @type {?} */
        WindowMessage.prototype.requestId;
        /** @type {?} */
        WindowMessage.prototype.messageId;
        /** @type {?|undefined} */
        WindowMessage.prototype.data;
    }
    var MuSdkBridge = /** @class */ (function (_super_1) {
        __extends(MuSdkBridge, _super_1);
        /**
         * @param {?} rc
         * @param {?} ngZone
         */
        function MuSdkBridge(rc, ngZone) {
            var _this = _super_1.call(this, rc, ngZone) || this;
            _this.reqMap = {};
            return _this;
        }
        /**
         * @return {?}
         */
        MuSdkBridge.prototype.preInit = function () {
            if (window['webkit'] && window['webkit'].messageHandlers.sdkCordova) {
                this.userAgent = UserAgent.IOS;
                this.permObj = IOS_PERM;
            }
            else if (window['sdkCordova']) {
                this.userAgent = UserAgent.ANDROID;
                this.permObj = ANDROID_PERM;
            }
            else {
                this.userAgent = UserAgent.BROWSER;
                this.webBridge = new MuWebBridge(this.rc);
                this.permObj = BROWSER_PERM;
            }
            this.runningInBrowser = this.userAgent === UserAgent.BROWSER;
            this.state = State.INITIALIZED;
        };
        /**
         * @return {?}
         */
        MuSdkBridge.prototype.init = function () {
            var _super = Object.create(null, {
                init: { get: function () { return _super_1.prototype.init; } }
            });
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _super.init.call(this)];
                        case 1:
                            _a.sent();
                            this.initSdkType();
                            window.onmessage = this.onIframeMessage.bind(this);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @private
         * @return {?}
         */
        MuSdkBridge.prototype.initSdkType = function () {
            this.sdkType = this.userAgent === UserAgent.BROWSER ? SDK_TYPE.WEB : SDK_TYPE.CORDOVA;
        };
        /*==============================================================================
                                    MESSAGING
        ==============================================================================*/
        /**
         * @param {?} event
         * @return {?}
         */
        MuSdkBridge.prototype.onIframeMessage = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        /**
         * @param {?} requestId
         * @param {?} messageId
         * @param {?} code
         * @param {?=} data
         * @return {?}
         */
        MuSdkBridge.prototype.postMessage = function (requestId, messageId, code, data) {
            if (this.sdkType === SDK_TYPE.CORDOVA) {
                this.postMessageToCordova(requestId, messageId, code, data);
                return;
            }
            if (window === parent)
                return;
            /** @type {?} */
            var response = { code: code, data: data };
            /** @type {?} */
            var message = { requestId: requestId, messageId: messageId, response: response };
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), "postMessage from App " + JSON.stringify(message));
            window.parent.postMessage(message, '*');
        };
        /**
         * @param {?} requestId
         * @param {?=} data
         * @return {?}
         */
        MuSdkBridge.prototype.onCordovaMessage = function (requestId, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        /**
         * @param {?} requestId
         * @param {?} messageId
         * @param {?} code
         * @param {?=} data
         * @return {?}
         */
        MuSdkBridge.prototype.postMessageToCordova = function (requestId, messageId, code, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        /**
         * @param {?} requestId
         * @param {?=} data
         * @param {?=} closeApp
         * @return {?}
         */
        MuSdkBridge.prototype.onSdkSuccessResponse = function (requestId, data, closeApp) {
            if (data === void 0) { data = null; }
            if (closeApp === void 0) { closeApp = true; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        /**
         * @param {?} requestId
         * @param {?} data
         * @param {?} uiError
         * @param {?=} closeApp
         * @return {?}
         */
        MuSdkBridge.prototype.onSdkFailureResponse = function (requestId, data, uiError, closeApp) {
            if (closeApp === void 0) { closeApp = true; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        return MuSdkBridge;
    }(MuBridge));
    if (false) {
        /** @type {?} */
        MuSdkBridge.prototype.initData;
        /**
         * @type {?}
         * @private
         */
        MuSdkBridge.prototype.reqMap;
    }
    var CordovaAsyncRequest = /** @class */ (function () {
        /**
         * @param {?} requestId
         */
        function CordovaAsyncRequest(requestId) {
            var _this = this;
            this.requestId = requestId;
            this.promise = new Promise(( /**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */function (resolve, reject) {
                _this.resolve = resolve;
                _this.reject = reject;
            }));
        }
        return CordovaAsyncRequest;
    }());
    if (false) {
        /** @type {?} */
        CordovaAsyncRequest.prototype.promise;
        /** @type {?} */
        CordovaAsyncRequest.prototype.resolve;
        /** @type {?} */
        CordovaAsyncRequest.prototype.reject;
        /** @type {?} */
        CordovaAsyncRequest.prototype.requestId;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    var MuRouterApp = /** @class */ (function (_super_1) {
        __extends(MuRouterApp, _super_1);
        /**
         * @param {?} rc
         * @param {?} serverUrl
         * @param {?} ci
         * @param {?} pubKey
         * @param {?} encIV
         */
        function MuRouterApp(rc, serverUrl, ci, pubKey, encIV) {
            var _this = _super_1.call(this, rc, serverUrl, ci, pubKey, encIV) || this;
            rc.setupLogger(_this, 'RouterApp', core.LOG_LEVEL.DEBUG);
            return _this;
        }
        /**
         * @param {?} rc
         * @return {?}
         */
        MuRouterApp.prototype.getNetworkType = function (rc) {
            return rc.utils.getNetworkType(rc);
        };
        /**
         * @param {?} rc
         * @return {?}
         */
        MuRouterApp.prototype.getLocation = function (rc) {
            return rc.utils.getLocation(rc);
        };
        /**
         * @return {?}
         */
        MuRouterApp.prototype.getMaxOpenSecs = function () {
            return 100;
        };
        /**
         * @param {?} rc
         * @return {?}
         */
        MuRouterApp.prototype.getCustomData = function (rc) {
            return ( /** @type {?} */({}));
        };
        /**
         * @return {?}
         */
        MuRouterApp.prototype.canStrtLastReqTimer = function () {
            return this.userLoggedIn;
        };
        /**
         * @param {?} rc
         * @return {?}
         */
        MuRouterApp.prototype.runAlwaysAsSecure = function (rc) {
            return false;
        };
        /**
         * @param {?} rc
         * @return {?}
         */
        MuRouterApp.prototype.getSessionTimeOutSecs = function (rc) {
            return __awaiter(this, void 0, void 0, function () {
                var gcConfig, sessionGc;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, rc.gcConfigKeyVal.getConfig(GcCategory.Session, GcKey.GeneralConfig)];
                        case 1:
                            gcConfig = ( /** @type {?} */(_a.sent()));
                            sessionGc = ( /** @type {?} */(Object.assign({}, gcConfig)));
                            return [2 /*return*/, rc.getGlobalLogLevel() === core.LOG_LEVEL.DEBUG ? 20000 : sessionGc.fgTimeoutSec];
                    }
                });
            });
        };
        /**
         * @param {?} rc
         * @return {?}
         */
        MuRouterApp.prototype.sessionTimedOut = function (rc) {
            rc.isStatus() && rc.status(rc.getName(this), "session timed out.");
            this.isSessionTimedout = true;
        };
        /**
         * @param {?} rc
         * @param {?} inp
         * @return {?}
         */
        MuRouterApp.prototype.updateCustomData = function (rc, inp) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        /**
         * @param {?} rc
         * @return {?}
         */
        MuRouterApp.prototype.prepareConnection = function (rc) {
            var _super = Object.create(null, {
                prepareConnection: { get: function () { return _super_1.prototype.prepareConnection; } }
            });
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!rc.bridge.isRunningInBrowser()) return [3 /*break*/, 1];
                            _super.prepareConnection.call(this, rc);
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, rc.bridge.prepareConnection()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /*==============================================================================
                                    API CALLS
        ===============================================================================*/
        // Never throws
        /**
         * @param {?} rc
         * @param {?} api
         * @param {?} params
         * @return {?}
         */
        MuRouterApp.prototype.sendRequest = function (rc, api, params) {
            return __awaiter(this, void 0, void 0, function () {
                var error, resp, resp, error;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!api || !params)
                                throw new Error("Invalid argument for sendRequest api: " + api + " params: " + params);
                            if (rc.utils.isNetworkUnhealthy(rc)) {
                                error = {
                                    errorCode: core.XmnError.NetworkNotPresent
                                };
                                return [2 /*return*/, error];
                            }
                            if (!rc.bridge.isRunningInBrowser()) return [3 /*break*/, 5];
                            if (this.isSessionTimedout) {
                                location.reload();
                            }
                            return [4 /*yield*/, this.sendBrowserRequest(rc, api, params)];
                        case 1:
                            resp = _a.sent();
                            if (!(rc.utils.isOfTypeUiError(resp) && resp['errorCode'] === core.XmnError._ConnectionExpired)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.sendRequest(rc, api, params)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3: return [2 /*return*/, resp];
                        case 4: return [3 /*break*/, 9];
                        case 5: return [4 /*yield*/, rc.bridge.sendRouterRequest(api, params)];
                        case 6:
                            resp = _a.sent();
                            if (resp.errorCode) {
                                error = {
                                    errorCode: resp.errorCode,
                                    errorMessage: resp.errorMessage
                                };
                                return [2 /*return*/, ( /** @type {?} */(error))];
                            }
                            if (!resp.events) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.handleCordovaRouterEvents(rc, resp.events)];
                        case 7:
                            _a.sent();
                            _a.label = 8;
                        case 8: return [2 /*return*/, resp.data];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        // async startSession(rc: RunContextBrowser, reset: boolean): Promise<string> {
        //   return rc.bridge.isRunningInBrowser() 
        //     ? await this.startBrowserSession(rc) 
        //     : await this.startCordovaSession(rc, reset)
        // }
        // private async startBrowserSession(rc: RunContextBrowser): Promise<string> {
        //   const req : StartSession.params = {
        //     fcmId     : rc.bridge.getFcmId(), 
        //     adId      : rc.bridge.getAdId(),
        //     psuedoId  : rc.bridge.getPseudoId(),
        //     referrer  : rc.bridge.getReferrerParams()
        //   }
        //   const resp: StartSession.retval | UiError = await this.sendRequest(rc, 
        //       StartSession.name, req) as (StartSession.retval | UiError)
        //   if (rc.utils.isOfTypeUiError(resp)) throw new Error(resp.errorCode)
        //   await this.onNcInstanceId(rc, resp.clientId, resp.appSettings, resp.settingsMd5)
        //   return resp.navUrl
        // }
        // private async startCordovaSession(rc: RunContextBrowser, reset: boolean): Promise<string> {
        //   const resp = reset ? await rc.bridge.recreateSession() 
        //                      : await rc.bridge.getSessionInfo()
        //   if (resp.errorCode) {
        //     rc.isDebug() && rc.debug(rc.getName(this), `Got error in startCordovaSession`)
        //     throw new Error(resp.errorCode)
        //   }
        //   if (resp.events) await this.handleCordovaRouterEvents(rc, resp.events)
        //   const retval = resp.data as StartSession.retval
        //   await this.onNcInstanceId(rc, retval.clientId, retval.appSettings, retval.settingsMd5)
        //   return retval.navUrl
        // }
        /*==============================================================================
                                    EVENTS
        ===============================================================================*/
        /**
         * @param {?} rc
         * @param {?} name
         * @param {?} params
         * @param {?} ephemeral
         * @return {?}
         */
        MuRouterApp.prototype.sendEvent = function (rc, name, params, ephemeral) {
            if (!rc.bridge.isRunningInBrowser()) {
                rc.bridge.sendRouterEvent(name, params, ephemeral);
                return;
            }
            if (ephemeral) {
                this.sendEphemeralEvent(rc, name, params);
            }
            else {
                this.sendPersistentEvent(rc, name, params);
            }
        };
        /*==============================================================================
                                    MEMBER FUNCTIONS
        ===============================================================================*/
        /**
         * @protected
         * @param {?} rc
         * @param {?} events
         * @return {?}
         */
        MuRouterApp.prototype.handleCordovaRouterEvents = function (rc, events) {
            return __awaiter(this, void 0, void 0, function () {
                var event;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!events.length) return [3 /*break*/, 4];
                            event = ( /** @type {?} */(( /** @type {?} */(events.shift()))));
                            if (!(event.type === core.WIRE_TYPE.SYS_EVENT)) return [3 /*break*/, 1];
                            rc.isAssert() && rc.assert(rc.getName(this), "Platform should handle SysEvents on its own");
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, this.providerMessage(rc, [core.WireObject.getWireObject(event)])];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [3 /*break*/, 0];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @protected
         * @param {?} rc
         * @param {?} api
         * @param {?} params
         * @return {?}
         */
        MuRouterApp.prototype.sendBrowserRequest = function (rc, api, params) {
            var _super = Object.create(null, {
                sendRequest: { get: function () { return _super_1.prototype.sendRequest; } }
            });
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _super.sendRequest.call(this, rc, api, params)
                                .catch(( /**
                         * @param {?} err
                         * @return {?}
                         */function (/**
                         * @param {?} err
                         * @return {?}
                         */ err) {
                                /** @type {?} */
                                var error = {
                                    errorCode: err.code || err.message,
                                    errorMessage: err.message || ''
                                };
                                return error;
                            }))];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return MuRouterApp;
    }(XmnRouterBrowser));
    if (false) {
        /**
         * @type {?}
         * @private
         */
        MuRouterApp.prototype.userLoggedIn;
        /**
         * @type {?}
         * @private
         */
        MuRouterApp.prototype.isSessionTimedout;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var ANALYTICS_EVENT = {
        APP_LAUNCH: 'appLaunch',
        APP_SHARE: 'appShare',
    };
    /** @type {?} */
    var ANALYTICS_EVENT_PARAMS = {
        SCREEN: 'screen',
        ACTION: 'action',
        SCREEN_STATE: 'screenState',
        SCREEN_STATE_ERROR: 'error',
        SCREEN_STATE_SUCCESS: 'success',
        SCREEN_STATE_NO_DATA: 'noData',
        BTN_RETRY_ERR: 'retryErr'
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AnalyticsScreenInfo = /** @class */ (function () {
        /**
         * @param {?} rc
         * @param {?} screenName
         * @param {?} invocationSource
         * @param {?=} navMode
         * @param {?=} modal
         */
        function AnalyticsScreenInfo(rc, screenName, invocationSource, navMode, modal) {
            this.rc = rc;
            this.screenName = screenName;
            this.invocationSource = invocationSource;
            this.modal = false;
            this.eventData = ( /** @type {?} */({}));
            rc.setupLogger(this, 'AnalyticsScreenInfo');
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Creating new AnalyticsScreen State:', screenName, 'Invocation:', invocationSource);
            this.invocationTs = Date.now();
            this.navMode = navMode !== undefined ? navMode : 'unknown';
            this.modal = modal;
        }
        /**
         * @return {?}
         */
        AnalyticsScreenInfo.prototype.getInvocationSource = function () { return this.invocationSource; };
        /**
         * @return {?}
         */
        AnalyticsScreenInfo.prototype.getScreenName = function () { return this.screenName; };
        /**
         * @return {?}
         */
        AnalyticsScreenInfo.prototype.onScreenDestroy = function () {
            /** @type {?} */
            var eventName = this.modal ? 'mod_' : '';
            eventName += this.screenName + '_screen';
            this.eventData['from'] = this.invocationSource;
            this.eventData['inv_ts'] = this.invocationTs,
                this.eventData['stay_time'] = Date.now() - this.invocationTs;
            this.eventData['nav_mode'] = this.navMode;
            this.rc.userEvent.logEvent(eventName, this.eventData);
        };
        /**
         * @param {?} stateName
         * @param {?} stateValue
         * @return {?}
         */
        AnalyticsScreenInfo.prototype.setScreenState = function (stateName, stateValue) {
            this.eventData[stateName] = stateValue;
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), "Screen state: " + stateName + ", value: " + stateValue);
        };
        /**
         * @param {?} actionName
         * @return {?}
         */
        AnalyticsScreenInfo.prototype.setScreenAction = function (actionName) {
            if (this.eventData.hasOwnProperty(actionName)) {
                /** @type {?} */
                var count = this.eventData[actionName];
                this.eventData[actionName] = ++count;
            }
            else {
                this.eventData[actionName] = 1;
            }
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Screen Action:', actionName, 'Count: ', this.eventData[actionName]);
        };
        /**
         * @param {?} direction
         * @return {?}
         */
        AnalyticsScreenInfo.prototype.setScreenActionScroll = function (direction) {
            switch (direction) {
                case DIRECTION.LEFT:
                    this.eventData['scrollLeft'] = 1;
                    break;
                case DIRECTION.UP:
                    this.eventData['scrollUp'] = 1;
                    break;
                case DIRECTION.RIGHT:
                    this.eventData['scrollRight'] = 1;
                    break;
                case DIRECTION.DOWN:
                    this.eventData['scrollDown'] = 1;
                    break;
            }
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Screen Scroll:', direction);
        };
        return AnalyticsScreenInfo;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        AnalyticsScreenInfo.prototype.invocationTs;
        /**
         * @type {?}
         * @private
         */
        AnalyticsScreenInfo.prototype.navMode;
        /**
         * @type {?}
         * @private
         */
        AnalyticsScreenInfo.prototype.modal;
        /**
         * @type {?}
         * @private
         */
        AnalyticsScreenInfo.prototype.eventData;
        /**
         * @type {?}
         * @private
         */
        AnalyticsScreenInfo.prototype.rc;
        /**
         * @type {?}
         * @private
         */
        AnalyticsScreenInfo.prototype.screenName;
        /**
         * @type {?}
         * @private
         */
        AnalyticsScreenInfo.prototype.invocationSource;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var _EVENT_PREFIX = EVENT_PREFIX + '-';
    /** @type {?} */
    var MAX_LOG_NAME_SIZE = 32;
    /** @type {?} */
    var MAX_KEY_NAME_SIZE = 24;
    /** @type {?} */
    var MAX_VALUE_NAME_SIZE = 36;
    /** @type {?} */
    var USER_PROPERTIES = {
        USER_LINK_ID: 'user_link_id',
        EMAIL_ID: 'email_id',
        APP_LANG: 'app_lng'
    };
    var AnalyticsEventLogger = /** @class */ (function () {
        /**
         * @param {?} rc
         */
        function AnalyticsEventLogger(rc) {
            this.rc = rc;
            this.allowLogging = false;
            if (this.rc.userKeyVal.clientId)
                this.initLogging();
        }
        /**
         * @return {?}
         */
        AnalyticsEventLogger.prototype.initLogging = function () {
            this.allowLogging = true;
            this.setUserId(this.rc.userKeyVal.clientId);
            this.setAllUserProperties();
            this.sendSessionEvents();
            // EventSystem.subscribeAll([
            //   APP_UI_EVENT.UPDATE_USER_EMAIL] , this.handleEvent.bind(this))
        };
        /**
         * @private
         * @param {?} eventName
         * @return {?}
         */
        AnalyticsEventLogger.prototype.handleEvent = function (eventName) {
            switch (eventName) {
                // case _EVENT_PREFIX + APP_UI_EVENT.UPDATE_USER_EMAIL:
                //   this.setUserProperty(USER_PROPERTIES.EMAIL_ID, this.rc.userKeyVal.emailId)
                //   break
            }
        };
        /**
         * @private
         * @return {?}
         */
        AnalyticsEventLogger.prototype.setAllUserProperties = function () {
            if (this.rc.userKeyVal.userLinkId) {
                this.setUserProperty(USER_PROPERTIES.USER_LINK_ID, this.rc.userKeyVal.userLinkId);
                // this.setUserProperty(USER_PROPERTIES.EMAIL_ID, this.rc.userKeyVal.emailId)
            }
        };
        /**
         * @private
         * @return {?}
         */
        AnalyticsEventLogger.prototype.sendSessionEvents = function () {
            // Sending app launch session event
            this.logEvent(ANALYTICS_EVENT.APP_LAUNCH, null);
        };
        /**
         * @private
         * @param {?} userId
         * @return {?}
         */
        AnalyticsEventLogger.prototype.setUserId = function (userId) {
            if (!this.allowLogging || !userId)
                return;
            this.rc.isStatus() && this.rc.status(this.rc.getName(this), 'Firebase userId: ', userId);
            this.rc.bridge.setUserId(userId);
        };
        /**
         * @private
         * @param {?} propName
         * @param {?} value
         * @return {?}
         */
        AnalyticsEventLogger.prototype.setUserProperty = function (propName, value) {
            if (!this.allowLogging)
                return;
            /** @type {?} */
            var valid = propName != null && propName.length > 0 &&
                propName.length <= MAX_KEY_NAME_SIZE && value != null &&
                value.length > 0 && value.length <= MAX_VALUE_NAME_SIZE;
            if (!valid) {
                this.rc.isWarn() && this.rc.warn('NcFirebase', 'Invalid Firebase User Property:', propName, value);
                return;
            }
            this.rc.isStatus() && this.rc.status(this.rc.getName(this), 'Firebase userProperty:: Name: ', propName, 'Value: ', value);
            this.rc.bridge.setUserProperty(propName, value);
        };
        /**
         * @param {?} routeName
         * @param {?} sharePkg
         * @return {?}
         */
        AnalyticsEventLogger.prototype.logAppShare = function (routeName, sharePkg) {
            /** @type {?} */
            var eventData = ( /** @type {?} */({}));
            eventData[ANALYTICS_EVENT_PARAMS.SCREEN] = routeName;
            this.logEvent(ANALYTICS_EVENT.APP_SHARE, eventData);
        };
        /**
         * @param {?} eventName
         * @param {?} eventData
         * @return {?}
         */
        AnalyticsEventLogger.prototype.logEvent = function (eventName, eventData) {
            if (!this.allowLogging) {
                this.rc.isStatus() && this.rc.status(this.rc.getName(this), 'Cannot send Firebase event, Allow logging false');
                return;
            }
            this.logPublicEvent(eventName, eventData);
        };
        /**
         * @param {?} eventName
         * @param {?} eventData
         * @return {?}
         */
        AnalyticsEventLogger.prototype.logPublicEvent = function (eventName, eventData) {
            if (eventName == null || eventName.length === 0 || eventName.length >= MAX_LOG_NAME_SIZE) {
                this.rc.isWarn() && this.rc.warn('NcFirebase', 'Firebase eventName invalid: empty OR length > 32 characters, exiting...');
                return;
            }
            eventData = this.checkNValidateBundle(eventData);
            this.rc.isStatus() && this.rc.status('NcFirebase', 'Logging Firebase event:', eventName, JSON.stringify(eventData));
            this.rc.bridge.logEvent(eventName, JSON.stringify(eventData));
        };
        /**
         * @private
         * @param {?} bundle
         * @return {?}
         */
        AnalyticsEventLogger.prototype.checkNValidateBundle = function (bundle) {
            if (bundle === null)
                return ( /** @type {?} */({}));
            /** @type {?} */
            var eventData = ( /** @type {?} */({}));
            for (var key in bundle) {
                /** @type {?} */
                var val = bundle[key];
                /** @type {?} */
                var inValidKey = key !== this.validKey(key);
                /** @type {?} */
                var inValidValue = typeof (val) === 'string' && val !== this.validStringValue(String(val));
                /** @type {?} */
                var inValidValueType = !(typeof (val) === 'string' || typeof (val) === 'number');
                if (inValidKey || inValidValue || inValidValueType) {
                    /** @type {?} */
                    var objVal = inValidKey ? key : String(val);
                    this.rc.isWarn() && this.rc.warn('NcFirebase', 'Invalid key : value pair inside event:', objVal, inValidValue, inValidValueType);
                }
                else {
                    eventData[key] = bundle[key];
                }
            }
            return eventData;
        };
        /**
         * @private
         * @param {?} key
         * @return {?}
         */
        AnalyticsEventLogger.prototype.validKey = function (key) {
            if (key.length > 0 && key.length <= MAX_KEY_NAME_SIZE)
                return key;
            this.rc.isWarn() && this.rc.warn('NcFirebase', 'FireBase Key length is 0 || > 24 Characters...');
            return key.substring(0, MAX_KEY_NAME_SIZE);
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        AnalyticsEventLogger.prototype.validStringValue = function (value) {
            if (value.length > 0 && value.length <= MAX_VALUE_NAME_SIZE)
                return value;
            this.rc.isWarn() && this.rc.warn('NcFirebase', 'FireBase Value length is 0 || > 36 Characters...');
            return value.substring(0, MAX_VALUE_NAME_SIZE);
        };
        return AnalyticsEventLogger;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        AnalyticsEventLogger.prototype.allowLogging;
        /**
         * @type {?}
         * @protected
         */
        AnalyticsEventLogger.prototype.rc;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NavMode = {
        Launch: 'page_launch',
        Next: 'page_next',
        Back: 'page_back',
        Dialog: 'page_dialog'
    };
    /** @type {?} */
    var INVOCATION_LAUNCH = 'launch';
    /** @type {?} */
    var INVOCATION_RELAUNCH = 'relaunch';
    var AnalyticsScreenManager = /** @class */ (function () {
        /**
         * @param {?} rc
         */
        function AnalyticsScreenManager(rc) {
            this.rc = rc;
            this.pendingTabActions = {};
            this.pendingTabStates = {};
            rc.setupLogger(this, 'AnalyticsScreenManager');
            this.lastScreenName = '';
            this.currModalState = null;
            // EventSystem.subscribe(APP_UI_EVENT.CORDOVA_SCREEN_PAUSE, this.onScreenPause.bind(this))
            // EventSystem.subscribe(APP_UI_EVENT.CORDOVA_SCREEN_RESUME, this.onScreenResume.bind(this))
            if (rc.getGlobalLogLevel() === core.LOG_LEVEL.DEBUG)
                window['screenmanager'] = this;
        }
        /**
         * @return {?}
         */
        AnalyticsScreenManager.prototype.getCurrentScreenName = function () {
            return this.currModalState != null ? this.currModalState.getScreenName()
                : this.currScreenState.getScreenName();
        };
        /**
         * @param {?} eventUrl
         * @param {?} outlet
         * @param {?} lastNavMethod
         * @return {?}
         */
        AnalyticsScreenManager.prototype.onNavEnd = function (eventUrl, outlet, lastNavMethod) {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Inside onNavEnd', eventUrl, lastNavMethod);
            /** @type {?} */
            var screenName;
            if (eventUrl.startsWith('/')) {
                screenName = this.getFbaseScreenName(eventUrl.substring(1));
                this.rc.isStatus() && this.rc.status(this.rc.getName(this), 'Found screenName: ', screenName);
            }
            if (this.lastScreenName === screenName) {
                // Same page is invoked but with diff query params..add stay time
                this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Same page invoked, Ignoring...');
                if (this.currModalState) {
                    this.currModalState.onScreenDestroy();
                    this.currModalState = null;
                }
                return;
            }
            // Handling modal outlet
            if (outlet === MODAL_OUTLET) {
                this.rc.isAssert() && this.rc.assert(this.rc.getName(this), this.currModalState === null, 'Already tracking a modal...');
                /** @type {?} */
                var modalName = eventUrl.match(/.*=\((.*)\)/)[1];
                modalName = this.getFbaseScreenName(modalName);
                this.currModalState = new AnalyticsScreenInfo(this.rc, modalName, this.currScreenState.getScreenName(), NavMode.Dialog, true);
                this.lastModalName = eventUrl;
                return;
            }
            else if (this.currModalState) {
                this.currModalState.onScreenDestroy();
                this.currModalState = null;
            }
            /** @type {?} */
            var navMode;
            /** @type {?} */
            var invSrc;
            if (this.currScreenState) {
                this.currScreenState.onScreenDestroy();
                navMode = lastNavMethod === NavMethod.POP ? NavMode.Back : NavMode.Next;
                invSrc = this.currTabScreenState ? this.currTabScreenState.getScreenName()
                    : this.currScreenState.getScreenName();
            }
            else {
                navMode = NavMode.Launch;
                invSrc = INVOCATION_LAUNCH;
            }
            this.currScreenState = new AnalyticsScreenInfo(this.rc, screenName, invSrc, navMode);
            this.lastScreenName = screenName;
        };
        /**
         * @param {?} tabRoutes
         * @return {?}
         */
        AnalyticsScreenManager.prototype.setCurrentTabRoutes = function (tabRoutes) {
            this.currTabRoutes = tabRoutes;
        };
        /**
         * @param {?} currScreenName
         * @param {?} tabIndex
         * @return {?}
         */
        AnalyticsScreenManager.prototype.onTabNavEnd = function (currScreenName, tabIndex) {
            /** @type {?} */
            var tabScreenName = this.getFbaseScreenName(currScreenName);
            if (this.currTabScreenState)
                this.currTabScreenState.onScreenDestroy();
            this.lastTabSceenName = this.currTabRoutes[tabIndex];
            /** @type {?} */
            var invSource = this.currTabScreenState ? this.currTabScreenState.getScreenName()
                : INVOCATION_LAUNCH;
            this.currTabScreenState = new AnalyticsScreenInfo(this.rc, tabScreenName, invSource);
            this.digestPendingTabScreen(tabIndex);
        };
        /**
         * @return {?}
         */
        AnalyticsScreenManager.prototype.onTabDestroy = function () {
            this.currTabScreenState.onScreenDestroy();
            this.currTabScreenState = null;
        };
        /**
         * @param {?} screenName
         * @param {?} direction
         * @return {?}
         */
        AnalyticsScreenManager.prototype.logScreenActionScroll = function (screenName, direction) {
            screenName = this.getFbaseScreenName(screenName);
            if (this.currModalState && this.currModalState.getScreenName() === screenName) {
                this.currModalState.setScreenActionScroll(direction);
            }
            else {
                this.currScreenState.setScreenActionScroll(direction);
            }
        };
        /**
         * @param {?} screenName
         * @param {?} actionName
         * @return {?}
         */
        AnalyticsScreenManager.prototype.logScreenAction = function (screenName, actionName) {
            screenName = this.getFbaseScreenName(screenName);
            if (this.currModalState && this.currModalState.getScreenName() === screenName) {
                this.currModalState.setScreenAction(actionName);
            }
            else if (this.currScreenState.getScreenName() === screenName) {
                this.currScreenState.setScreenAction(actionName);
            }
            else if (this.currTabRoutes) {
                this.onTabScreenAction(screenName, actionName);
            }
            else {
                this.rc.isAssert() && this.rc.assert(this.rc.getName(this), false, 'Invalid screen action', screenName, actionName, 'Expected screen', this.currScreenState.getScreenName());
            }
        };
        /**
         * @param {?} screenName
         * @param {?} stateName
         * @param {?} stateValue
         * @return {?}
         */
        AnalyticsScreenManager.prototype.logScreenState = function (screenName, stateName, stateValue) {
            screenName = this.getFbaseScreenName(screenName);
            if (this.currModalState && this.currModalState.getScreenName() === screenName) {
                this.currModalState.setScreenState(stateName, stateValue);
            }
            else if (this.currScreenState.getScreenName() === screenName) {
                this.currScreenState.setScreenState(stateName, stateValue);
            }
            else if (this.currTabRoutes) {
                this.onTabScreenState(screenName, stateName, stateValue);
            }
            else {
                this.rc.isError() && this.rc.error(this.rc.getName(this), "Invalid screen state', " + screenName + ", " + stateName + ", 'Expected screen name ', " + this.currScreenState.getScreenName());
            }
        };
        /**
         * @private
         * @param {?} screenName
         * @param {?} actionName
         * @return {?}
         */
        AnalyticsScreenManager.prototype.onTabScreenAction = function (screenName, actionName) {
            if (this.lastTabSceenName === screenName && this.currTabScreenState) {
                this.currTabScreenState.setScreenAction(actionName);
            }
            else {
                this.rc.isAssert() && this.rc.assert(this.rc.getName(this), this.currTabRoutes.indexOf(screenName) !== -1, "invalid tab screen name " + screenName + " " + actionName);
                /** @type {?} */
                var actions = this.pendingTabActions[screenName];
                if (!actions)
                    actions = [];
                actions.push(actionName);
                this.pendingTabActions[screenName] = actions;
            }
        };
        /**
         * @private
         * @param {?} screenName
         * @param {?} stateName
         * @param {?} stateValue
         * @return {?}
         */
        AnalyticsScreenManager.prototype.onTabScreenState = function (screenName, stateName, stateValue) {
            if (this.lastTabSceenName === screenName && this.currTabScreenState) {
                this.currTabScreenState.setScreenState(stateName, stateValue);
            }
            else {
                this.rc.isAssert() && this.rc.assert(this.rc.getName(this), this.currTabRoutes.indexOf(screenName) !== -1, "invalid tab screen name " + screenName + " " + stateName);
                /** @type {?} */
                var routeTabState = this.pendingTabStates[screenName];
                if (!routeTabState)
                    routeTabState = {};
                routeTabState[stateName] = stateValue;
                this.pendingTabStates[screenName] = routeTabState;
            }
        };
        /**
         * @private
         * @param {?} tabIndex
         * @return {?}
         */
        AnalyticsScreenManager.prototype.digestPendingTabScreen = function (tabIndex) {
            var _this = this;
            /** @type {?} */
            var currScreenName = this.currTabRoutes[tabIndex];
            // Digest route Actions
            /** @type {?} */
            var actions = this.pendingTabActions[currScreenName];
            if (actions) {
                actions.forEach(( /**
                 * @param {?} action
                 * @return {?}
                 */function (/**
                 * @param {?} action
                 * @return {?}
                 */ action) {
                    _this.currTabScreenState.setScreenAction(action);
                }));
                this.pendingTabActions[currScreenName] = [];
            }
            // Digest route States
            /** @type {?} */
            var states = this.pendingTabStates[currScreenName];
            if (states) {
                for (var key in states) {
                    this.currTabScreenState.setScreenState(key, states[key]);
                }
                this.pendingTabStates[currScreenName] = {};
            }
        };
        /**
         * @return {?}
         */
        AnalyticsScreenManager.prototype.onScreenPause = function () {
            if (this.currModalState)
                this.currModalState.onScreenDestroy();
            if (this.currTabScreenState)
                this.currTabScreenState.onScreenDestroy();
            this.currScreenState.onScreenDestroy();
        };
        /**
         * @private
         * @return {?}
         */
        AnalyticsScreenManager.prototype.onScreenResume = function () {
            if (this.currModalState)
                this.currModalState = new AnalyticsScreenInfo(this.rc, this.currModalState.getScreenName(), this.currModalState.getInvocationSource(), INVOCATION_RELAUNCH, true);
            if (this.currTabScreenState)
                this.currTabScreenState = new AnalyticsScreenInfo(this.rc, this.currTabScreenState.getScreenName(), this.currTabScreenState.getInvocationSource(), INVOCATION_RELAUNCH);
            this.currScreenState = new AnalyticsScreenInfo(this.rc, this.currScreenState.getScreenName(), this.currScreenState.getInvocationSource(), INVOCATION_RELAUNCH);
        };
        /**
         * @private
         * @param {?} url
         * @return {?}
         */
        AnalyticsScreenManager.prototype.getFbaseScreenName = function (url) {
            /** @type {?} */
            var screenName;
            /** @type {?} */
            var paramIdx = url.indexOf('?');
            screenName = url.substring(0, paramIdx > 0 ? paramIdx : url.length).replace('%2F', '/');
            /** @type {?} */
            var moduleIdx = screenName.indexOf('/');
            if (moduleIdx !== -1)
                screenName = screenName.substring(moduleIdx + 1, screenName.length);
            return screenName;
        };
        return AnalyticsScreenManager;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        AnalyticsScreenManager.prototype.currScreenState;
        /**
         * @type {?}
         * @private
         */
        AnalyticsScreenManager.prototype.currModalState;
        /**
         * @type {?}
         * @private
         */
        AnalyticsScreenManager.prototype.currTabScreenState;
        /**
         * @type {?}
         * @private
         */
        AnalyticsScreenManager.prototype.currTabRoutes;
        /**
         * @type {?}
         * @private
         */
        AnalyticsScreenManager.prototype.lastModalName;
        /**
         * @type {?}
         * @private
         */
        AnalyticsScreenManager.prototype.lastTabSceenName;
        /**
         * @type {?}
         * @private
         */
        AnalyticsScreenManager.prototype.lastScreenName;
        /**
         * @type {?}
         * @private
         */
        AnalyticsScreenManager.prototype.pendingTabActions;
        /**
         * @type {?}
         * @private
         */
        AnalyticsScreenManager.prototype.pendingTabStates;
        /**
         * @type {?}
         * @private
         */
        AnalyticsScreenManager.prototype.rc;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @record
     */
    function RoutingInfo() { }
    if (false) {
        /** @type {?} */
        RoutingInfo.prototype.routeTo;
        /** @type {?} */
        RoutingInfo.prototype.queryParams;
        /** @type {?} */
        RoutingInfo.prototype.hostName;
    }
    var MuUiRouter = /** @class */ (function (_super) {
        __extends(MuUiRouter, _super);
        /**
         * @param {?} rc
         * @param {?} router
         * @param {?} translate
         */
        function MuUiRouter(rc, router, translate) {
            var _this = _super.call(this, rc, router) || this;
            _this.rc = rc;
            _this.translate = translate;
            rc.setupLogger(_this, 'AppUiRouter', core.LOG_LEVEL.DEBUG);
            if (rc.getGlobalLogLevel() === core.LOG_LEVEL.DEBUG) {
                window['uiRouter'] = _this;
            }
            rc.uiRouter = _this;
            _this.analyticsScreenMgr = new AnalyticsScreenManager(rc);
            return _this;
        }
        /**
         * @param {?} appProtocol
         * @param {?} appHost
         * @return {?}
         */
        MuUiRouter.prototype.setAppProtoAndHost = function (appProtocol, appHost) {
            this.appHost = appHost;
            this.appProtocol = appProtocol;
        };
        /**
         * @param {?} toastMessage
         * @param {?=} stay
         * @param {?=} position
         * @return {?}
         */
        MuUiRouter.prototype.showToast = function (toastMessage, stay, position) {
        };
        /**
         * @param {?=} overlayText
         * @return {?}
         */
        MuUiRouter.prototype.showOverlay = function (overlayText) {
            if (overlayText === void 0) { overlayText = this.translate.instant('cmn_loading'); }
            //   this.rootComp.showOverlay(overlayText)
        };
        /**
         * @return {?}
         */
        MuUiRouter.prototype.removeOverlay = function () {
            // this.rootComp.removeOverlay()
        };
        /**
         * Parse URL of the form route?params
         * @param {?} navUrl
         * @return {?}
         */
        MuUiRouter.prototype.getRoutingInfoForNavUrl = function (navUrl) {
            navUrl = this.appProtocol + "://" + this.appHost + "/" + navUrl;
            return this.getRoutingInfo(navUrl);
        };
        /**
         * Parse URL of the form protocol://host/route?params
         * @param {?} directLink
         * @return {?}
         */
        MuUiRouter.prototype.getRoutingInfo = function (directLink) {
            /** @type {?} */
            var dlObj = this.rc.utils.parseURLForRouter(directLink);
            /** @type {?} */
            var routingInfo = {
                routeTo: dlObj.pathname,
                queryParams: dlObj.searchObject || {},
                hostName: dlObj.hostname
            };
            if (routingInfo.queryParams[HashidParams.LogLevel]) {
                /** @type {?} */
                var logLevel = Number(routingInfo.queryParams[HashidParams.LogLevel]);
                if (this.rc.globalKeyVal.logLevel !== logLevel && logLevel === core.LOG_LEVEL.DEBUG) {
                    this.rc.bridge.enableDebug();
                }
            }
            return routingInfo;
        };
        /**
         * @param {?} directLink
         * @param {?=} ncExtracs
         * @return {?}
         */
        MuUiRouter.prototype.navigateByDirectLink = function (directLink, ncExtracs) {
            /** @type {?} */
            var routingInfo = this.getRoutingInfoForNavUrl(directLink);
            ncExtracs = ncExtracs || {};
            /** @type {?} */
            var params = {
                queryParams: routingInfo.queryParams
            };
            for (var key in ncExtracs) {
                if (!params[key]) {
                    params[key] = ncExtracs[key];
                }
            }
            this.navigate(routingInfo.routeTo, params);
        };
        // navigateForInfo(screen: TrackableScreen, navInfo: NavInfo, ncExtras ?: NcNavigationExtras) {
        //   if (!navInfo) return
        //   this.rc.isAssert() && this.rc.assert(this.rc.getName(this), 
        //     navInfo.navUrl && navInfo.logName, `missing navUrl or logName 
        //     ${navInfo.logName}, ${navInfo.navUrl}`)
        //   this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 
        //     `Came to navigate: LogName-${navInfo.logName}, Url-${navInfo.navUrl}`)
        //   this.logScreenAction(screen, navInfo.logName)
        //   this.navigateByDirectLink(navInfo.navUrl, ncExtras)
        // }
        /*--------------------------------------------------------------------------------------------------------------
            History Stack management
          --------------------------------------------------------------------------------------------------------------*/
        /**
         * @return {?}
         */
        MuUiRouter.prototype.onDeviceBack = function () {
            var _this = this;
            this.rc.isStatus() && this.rc.status(this.rc.getName(this), 'Device back');
            window.setTimeout(( /**
             * @return {?}
             */function () {
                if (_this.urlStack.length === 1) {
                    if (_this.warnedUser) {
                        _this.analyticsScreenMgr.logScreenAction(_this.analyticsScreenMgr.getCurrentScreenName(), 'close_app');
                        _this.notifyAppClose();
                    }
                    else {
                        _this.showToast(_this.translate.instant('cmn_press_back'));
                        _this.warnedUser = true;
                    }
                }
                else {
                    _this.analyticsScreenMgr.logScreenAction(_this.analyticsScreenMgr.getCurrentScreenName(), 'sys_back');
                    _this.goBack();
                }
            }), 0);
        };
        /**
         * @param {?} tabRoutes
         * @return {?}
         */
        MuUiRouter.prototype.setCurrentTabRoutes = function (tabRoutes) {
            this.analyticsScreenMgr.setCurrentTabRoutes(tabRoutes);
        };
        /**
         * @param {?} currScreenName
         * @param {?} currentIndex
         * @return {?}
         */
        MuUiRouter.prototype.onTabNavEnd = function (currScreenName, currentIndex) {
            this.analyticsScreenMgr.onTabNavEnd(currScreenName, currentIndex);
        };
        /**
         * @return {?}
         */
        MuUiRouter.prototype.onTabDestroy = function () {
            this.analyticsScreenMgr.onTabDestroy();
        };
        /**
         * @param {?} screen
         * @param {?} direction
         * @return {?}
         */
        MuUiRouter.prototype.logScreenActionScroll = function (screen, direction) {
            this.analyticsScreenMgr.logScreenActionScroll(screen.getRouteName(), direction);
        };
        /**
         * @param {?} screen
         * @param {?} actionName
         * @return {?}
         */
        MuUiRouter.prototype.logScreenAction = function (screen, actionName) {
            this.analyticsScreenMgr.logScreenAction(screen.getRouteName(), actionName);
        };
        /**
         * @param {?} screen
         * @param {?} stateName
         * @param {?} stateValue
         * @return {?}
         */
        MuUiRouter.prototype.logScreenState = function (screen, stateName, stateValue) {
            this.analyticsScreenMgr.logScreenState(screen.getRouteName(), stateName, stateValue);
        };
        /**
         * @return {?}
         */
        MuUiRouter.prototype.getRoot = function () {
            return {
                /**
                 * @return {?}
                 */
                getBusinessId: function () {
                    return '';
                },
                /**
                 * @param {?} data
                 * @return {?}
                 */
                onPayUResponse: function (data) {
                },
                /**
                 * @param {?} e
                 * @return {?}
                 */
                handleError: function (e) {
                    // YTODO - should implement handle error
                    this.rc.isStatus() && this.rc.status(this.rc.getName(this), "Came to handleError inside library: " + e);
                    // this.showError(e.message)
                    // this.showJS()
                }
            };
        };
        return MuUiRouter;
    }(UiRouter));
    MuUiRouter.decorators = [
        { type: i0.Injectable }
    ];
    /** @nocollapse */
    MuUiRouter.ctorParameters = function () { return [
        { type: RunContextBrowser, decorators: [{ type: i0.Inject, args: ['RunContext',] }] },
        { type: router.Router },
        { type: TranslateService }
    ]; };
    if (false) {
        /** @type {?} */
        MuUiRouter.prototype.analyticsScreenMgr;
        /**
         * @type {?}
         * @protected
         */
        MuUiRouter.prototype.appProtocol;
        /**
         * @type {?}
         * @protected
         */
        MuUiRouter.prototype.appHost;
        /**
         * @type {?}
         * @protected
         */
        MuUiRouter.prototype.rc;
        /**
         * @type {?}
         * @protected
         */
        MuUiRouter.prototype.translate;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var APP_UI_EVENT = {
        USER_CARD_ACTIVATED: 'user-card-activated',
        YSE_RESPONSE: 'yse-response'
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    var RunContextJest = /** @class */ (function (_super) {
        __extends(RunContextJest, _super);
        /**
         * @param {?} initConfig
         * @param {?} runState
         * @param {?=} contextId
         * @param {?=} contextName
         */
        function RunContextJest(initConfig, runState, contextId, contextName) {
            return _super.call(this, initConfig, runState, contextId, contextName) || this;
        }
        /**
         * @param {?=} contextId
         * @param {?=} contextName
         * @return {?}
         */
        RunContextJest.prototype.copyConstruct = function (contextId, contextName) {
            /** @type {?} */
            var newRc = new RunContextJest(this.initConfig, this.runState, contextId, contextName);
            this.clone(newRc);
            return newRc;
        };
        return RunContextJest;
    }(RunContextBrowser));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    Object.defineProperty(exports, 'LOG_LEVEL', {
        enumerable: true,
        get: function () {
            return core.LOG_LEVEL;
        }
    });
    Object.defineProperty(exports, 'RUN_MODE', {
        enumerable: true,
        get: function () {
            return core.RUN_MODE;
        }
    });
    exports.ANALYTICS_EVENT = ANALYTICS_EVENT;
    exports.ANALYTICS_EVENT_PARAMS = ANALYTICS_EVENT_PARAMS;
    exports.ANDROID_PERM = ANDROID_PERM;
    exports.API_STATE = API_STATE;
    exports.APP_UI_EVENT = APP_UI_EVENT;
    exports.AXIS = AXIS;
    exports.AdjustElementsDirective = AdjustElementsDirective;
    exports.AlertDialogComponent = AlertDialogComponent;
    exports.AnalyticsEventLogger = AnalyticsEventLogger;
    exports.AnalyticsScreenInfo = AnalyticsScreenInfo;
    exports.AnalyticsScreenManager = AnalyticsScreenManager;
    exports.ApiState = ApiState;
    exports.ApiStateBuilder = ApiStateBuilder;
    exports.AppLocationStrategy = AppLocationStrategy;
    exports.AudioPlayer = AudioPlayer;
    exports.BROWSER_PERM = BROWSER_PERM;
    exports.BottomInComponent = BottomInComponent;
    exports.BoundedValue = BoundedValue;
    exports.ComponentRoutes = ComponentRoutes;
    exports.ConfigKeyVal = ConfigKeyVal;
    exports.CurrencyPipe = CurrencyPipe;
    exports.CustomBreakPointsProvider = CustomBreakPointsProvider;
    exports.DIALOG_RESULT = DIALOG_RESULT;
    exports.DIRECTION = DIRECTION;
    exports.DialerComponent = DialerComponent;
    exports.DomHelper = DomHelper;
    exports.DropDownMultiSelectComponent = DropDownMultiSelectComponent;
    exports.EVENT_PREFIX = EVENT_PREFIX;
    exports.EncryptionBrowser = EncryptionBrowser;
    exports.ExtractMobileNoPipe = ExtractMobileNoPipe;
    exports.FcCategory = FcCategory;
    exports.FcKey = FcKey;
    exports.FileUploadComponent = FileUploadComponent;
    exports.FilterComponent = FilterComponent;
    exports.GUTTER_WIDTH = GUTTER_WIDTH;
    exports.GcCategory = GcCategory;
    exports.GcKey = GcKey;
    exports.GcValue = GcValue;
    exports.GenericPipe = GenericPipe;
    exports.GlobalKeyValue = GlobalKeyValue;
    exports.HashidConverter = HashidConverter;
    exports.HashidParams = HashidParams;
    exports.IMAGE_TYPE = IMAGE_TYPE;
    exports.INJECTION_PARAM = INJECTION_PARAM;
    exports.IOS_PERM = IOS_PERM;
    exports.InfiniteScrollComponent = InfiniteScrollComponent;
    exports.InitConfigBrowser = InitConfigBrowser;
    exports.InjectionParentBase = InjectionParentBase;
    exports.InputContainerComponent = InputContainerComponent;
    exports.InputValidator = InputValidator;
    exports.KEYBOARD_MODE = KEYBOARD_MODE;
    exports.KEY_TYPE = KEY_TYPE;
    exports.KeyboardDirective = KeyboardDirective;
    exports.KeypadComponent = KeypadComponent;
    exports.LANG_EN_TRANS = LANG_EN_TRANS;
    exports.LAUNCH_CONTEXT = LAUNCH_CONTEXT;
    exports.LaunchContextMode = LaunchContextMode;
    exports.LoadingComponent = LoadingComponent;
    exports.LoadingErrorComponent = LoadingErrorComponent;
    exports.LoadingOverlayComponent = LoadingOverlayComponent;
    exports.LongPressDirective = LongPressDirective;
    exports.MODAL_OUTLET = MODAL_OUTLET;
    exports.MaskingValueDirective = MaskingValueDirective;
    exports.Master = Master;
    exports.MasterDb = MasterDb;
    exports.ModalPopupComponent = ModalPopupComponent;
    exports.MuBridge = MuBridge;
    exports.MuBrowser = MuBrowser;
    exports.MuBrowserModule = MuBrowserModule;
    exports.MuComponentsRoutingModule = MuComponentsRoutingModule;
    exports.MuDataTableComponent = MuDataTableComponent;
    exports.MuFormContainerComponent = MuFormContainerComponent;
    exports.MuRouterApp = MuRouterApp;
    exports.MuSdkBridge = MuSdkBridge;
    exports.MuUiRouter = MuUiRouter;
    exports.MuUtility = MuUtility;
    exports.MuWebApi = MuWebApi;
    exports.MuWebBridge = MuWebBridge;
    exports.MultiStepValue = MultiStepValue;
    exports.Nail = Nail;
    exports.NavMethod = NavMethod;
    exports.NcAllowSingleClickDirective = NcAllowSingleClickDirective;
    exports.NcAutoFocusDirective = NcAutoFocusDirective;
    exports.NcFallbackCharDirective = NcFallbackCharDirective;
    exports.NcImgFallbackDirective = NcImgFallbackDirective;
    exports.NcMaxLengthDirective = NcMaxLengthDirective;
    exports.NcPlatformLocation = NcPlatformLocation;
    exports.NcStyleClassDirective = NcStyleClassDirective;
    exports.NextInpFocusDirective = NextInpFocusDirective;
    exports.PERMISSION = PERMISSION;
    exports.PRIMARY_OUTLET = PRIMARY_OUTLET;
    exports.PageNotFoundComponent = PageNotFoundComponent;
    exports.PerformanceMetrics = PerformanceMetrics;
    exports.Permission = Permission;
    exports.RCBrowserLogger = RCBrowserLogger;
    exports.RoutableScreen = RoutableScreen;
    exports.RoutingStrategy = RoutingStrategy;
    exports.RunContextBrowser = RunContextBrowser;
    exports.RunContextJest = RunContextJest;
    exports.RunStateBrowser = RunStateBrowser;
    exports.SDK_TYPE = SDK_TYPE;
    exports.STATE = STATE;
    exports.Segment = Segment;
    exports.State = State;
    exports.StorageProvider = StorageProvider;
    exports.THRESHOLD = THRESHOLD;
    exports.TIME = TIME;
    exports.TOAST_DURATION = TOAST_DURATION;
    exports.TOAST_DURATION_DEBUG = TOAST_DURATION_DEBUG;
    exports.TOAST_POSITION = TOAST_POSITION;
    exports.TRANSLATIONS = TRANSLATIONS;
    exports.TRANSLATION_PROVIDERS = TRANSLATION_PROVIDERS;
    exports.TYPEOF = TYPEOF;
    exports.TableDataManager = TableDataManager;
    exports.TextEncDec = TextEncDec;
    exports.ToastComponent = ToastComponent;
    exports.TrackableScreen = TrackableScreen;
    exports.TranslatePipe = TranslatePipe;
    exports.TranslateService = TranslateService;
    exports.USERS = USERS;
    exports.UiRouter = UiRouter;
    exports.UrlHelper = UrlHelper;
    exports.UserAgent = UserAgent;
    exports.UserKeyValue = UserKeyValue;
    exports.ValidateImgDirective = ValidateImgDirective;
    exports.VerificationError = VerificationError;
    exports.VerificationSettingsExp = VerificationSettingsExp;
    exports.WsBrowser = WsBrowser;
    exports.XmnRouterBrowser = XmnRouterBrowser;
    exports.getTranslations = getTranslations;
    exports.mergeDictionaries = mergeDictionaries;
    exports.muDictionary = muDictionary;
    exports.ɵa = XmnRouterBrowser;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mubble-browser.umd.js.map
