import { Injectable, ɵɵdefineInjectable, Component, Inject, ComponentFactoryResolver, Renderer2, ChangeDetectorRef, HostBinding, HostListener, ViewChild, ViewContainerRef, Input, InjectionToken, ɵɵinject, EventEmitter, ViewChildren, Output, NgModule, Pipe, Directive, ElementRef, NgZone, Injector } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, PlatformLocation, LocationStrategy } from '@angular/common';
import { BREAKPOINT, FlexLayoutModule } from '@angular/flex-layout';
import { MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { NavigationEnd, ActivatedRoute, RouterModule, Router } from '@angular/router';
import Hashids from 'hashids';
import { __awaiter, __decorate, __metadata } from 'tslib';
import { NetworkType, XmnError, expandTemplate, expandTemplateObj, format, LOG_LEVEL, InitConfig as InitConfig$1, RUN_MODE, RunState, RCLoggerBase, RunContextBase, Mubble, DISPLAY_MODE, DISPLAY_TYPE, COL_TYPE, Encoder, DataLeader, WireObject, HANDSHAKE, WIRE_TYPE, SYS_EVENT, WireSysEvent, Protocol, WireRequest, WireEvent, WireEphEvent, MASTER_UPDATE_EVENT } from '@mubble/core';
export { LOG_LEVEL, RUN_MODE } from '@mubble/core';
import { sortBy } from 'lodash';
import isEqual from 'lodash/isEqual';
import { trigger, transition, group, query, style, animate, stagger } from '@angular/animations';
import debounce from 'lodash/debounce';
import { startWith, map } from 'rxjs/operators';
import Dexie from 'dexie';
import findIndex from 'lodash/findIndex';
import 'reflect-metadata';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MuBrowser {
    constructor() { }
}
MuBrowser.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
MuBrowser.ctorParameters = () => [];
/** @nocollapse */ MuBrowser.ɵprov = ɵɵdefineInjectable({ factory: function MuBrowser_Factory() { return new MuBrowser(); }, token: MuBrowser, providedIn: "root" });

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
const EVENT_PREFIX = 'mui-event';
var EventSystem;
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
        const fullName = eventName.startsWith(EVENT_PREFIX) ? `${eventName}` : `${EVENT_PREFIX}-${eventName}`;
        /** @type {?} */
        const nodeList = document.querySelectorAll('.' + fullName);
        /** @type {?} */
        const event = new CustomEvent(fullName, { detail: { data, rc } });
        for (let index = 0; index < nodeList.length; index++) {
            /** @type {?} */
            const element = nodeList[index];
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
        const fullName = eventName.startsWith(EVENT_PREFIX) ? `${eventName}` : `${EVENT_PREFIX}-${eventName}`;
        /** @type {?} */
        const nodeList = document.querySelectorAll('.' + elementClassName);
        /** @type {?} */
        const event = new CustomEvent(fullName, { detail: { data, rc } });
        for (let index = 0; index < nodeList.length; index++) {
            /** @type {?} */
            const element = nodeList[index];
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
            eventName = `${EVENT_PREFIX}-${eventName}`;
        /** @type {?} */
        const classes = element.className.split(' ');
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
            eventName = `${EVENT_PREFIX}-${eventName}`;
        window.addEventListener(eventName, cb, options);
    }
    EventSystem.subscribe = subscribe;
    /**
     * @param {?} eventNames
     * @param {?} cb
     * @return {?}
     */
    function subscribeAll(eventNames, cb) {
        eventNames.forEach((/**
         * @param {?} eventName
         * @return {?}
         */
        (eventName) => {
            if (!eventName.startsWith(EVENT_PREFIX))
                eventName = `${EVENT_PREFIX}-${eventName}`;
            window.addEventListener(eventName, cb.bind(null, eventName));
        }));
    }
    EventSystem.subscribeAll = subscribeAll;
})(EventSystem || (EventSystem = {}));

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
const QUICK_ANIM_MS = 'none' // (1000/60) + 'ms'
;
// (1000/60) + 'ms'
class DomHelper {
    /**
     * @param {?} className
     * @return {?}
     */
    static addClass(className) {
    }
    /**
     * @param {?} xPixel
     * @param {?} yPixel
     * @param {?} zPixel
     * @return {?}
     */
    static getTransform(xPixel, yPixel, zPixel) {
        return { transform: `translate3d(${xPixel}px, ${yPixel}px, ${zPixel}px)` };
    }
    /**
     * @param {?} xPercent
     * @param {?} yPercent
     * @return {?}
     */
    static getPercentTransform(xPercent, yPercent) {
        return { transform: `translate3d(${xPercent}%, ${yPercent}%, 0)` };
    }
    /**
     * @param {?} elem
     * @param {?} xPixel
     * @param {?} yPixel
     * @param {?} zPixel
     * @return {?}
     */
    static setTransform(elem, xPixel, yPixel, zPixel) {
        elem.style.transform = DomHelper.getTransform(xPixel, yPixel, zPixel).transform;
    }
    /**
     * @param {?} elem
     * @param {?} xPercent
     * @param {?} yPercent
     * @return {?}
     */
    static setPercentTransform(elem, xPercent, yPercent) {
        elem.style.transform = DomHelper.getPercentTransform(xPercent, yPercent).transform;
    }
    /**
     * @return {?}
     */
    static getQuickAnim() {
        return QUICK_ANIM_MS;
    }
}

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
class HashidConverter {
    /**
     * @param {?} key
     * @param {?} str
     * @return {?}
     */
    static encodeString(key, str) {
        /** @type {?} */
        const hashids = new Hashids(key);
        /** @type {?} */
        const charCodes = [];
        for (let i = 0; i < str.length; i++) {
            /** @type {?} */
            const code = str.charCodeAt(i);
            charCodes.push(code);
        }
        return hashids.encode(charCodes);
    }
    /**
     * @param {?} key
     * @param {?} hashid
     * @return {?}
     */
    static decodeHashids(key, hashid) {
        /** @type {?} */
        const hashids = new Hashids(key);
        /** @type {?} */
        const charCodes = hashids.decode(hashid);
        /** @type {?} */
        let str = '';
        charCodes.forEach((/**
         * @param {?} charCode
         * @return {?}
         */
        (charCode) => {
            str += String.fromCharCode(charCode);
        }));
        return str;
    }
}

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
class AudioFile {
    /**
     * @param {?} fileName
     * @param {?=} volume
     */
    constructor(fileName, volume) {
        this.fileName = fileName;
        this.volume = volume;
        this.fileName = 'sounds/' + fileName;
        this.volume = volume || .8;
    }
}
if (false) {
    /** @type {?} */
    AudioFile.prototype.fileName;
    /** @type {?} */
    AudioFile.prototype.volume;
}
class AudioPlayer {
    /**
     * @param {?} rc
     */
    constructor(rc) {
        this.rc = rc;
        this.SELECT = new AudioFile('select.mp3', 0.4);
        this.audioMap = {};
        this.rc.setupLogger(this, 'AudioFile');
    }
    /**
     * @param {?} file
     * @return {?}
     */
    play(file) {
        /** @type {?} */
        let control = this.audioMap[file.fileName];
        if (!control) {
            control = this.audioMap[file.fileName] = new Audio(file.fileName);
            control.load();
            control.volume = file.volume;
        }
        else {
            /** @type {?} */
            const isPlaying = control.currentTime > 0 && !control.paused && !control.ended && control.readyState > 2;
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
    }
}
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
class BoundedValue {
    /**
     * @param {?} initState
     * @param {?} finalState
     * @param {?} contInitState
     * @param {?} contFinalState
     */
    constructor(initState, finalState, contInitState, contFinalState) {
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
    compute(contValue) {
        /** @type {?} */
        const oldValue = this.value;
        if (contValue <= this.contLow) {
            this.value = this.elemDirUp ? this.elemLow : this.elemHigh;
        }
        else if (contValue >= this.contHigh) {
            this.value = this.elemDirUp ? this.elemHigh : this.elemLow;
        }
        else {
            /** @type {?} */
            const totalDiff = this.contHigh - this.contLow;
            /** @type {?} */
            const thisDiff = contValue - this.contLow;
            /** @type {?} */
            const elemDiff = this.elemHigh - this.elemLow;
            if (this.elemDirUp) {
                this.value = this.elemLow + elemDiff * thisDiff / totalDiff;
            }
            else {
                this.value = this.elemHigh - elemDiff * thisDiff / totalDiff;
            }
        }
        return this.value !== oldValue;
    }
    /**
     * @param {?=} digitsAfterDecimal
     * @return {?}
     */
    getDecimalValue(digitsAfterDecimal) {
        return Number(this.value.toFixed(digitsAfterDecimal || 0));
    }
    /**
     * @return {?}
     */
    isCloserToInit() {
        /** @type {?} */
        const lowDiff = this.value - this.elemLow;
        /** @type {?} */
        const highDiff = this.elemHigh - this.value;
        if (lowDiff < highDiff) {
            return this.elemDirUp;
        }
        else {
            return !this.elemDirUp;
        }
    }
}
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
class MultiStepValue {
    /**
     * @param {?} minVal
     * @param {?} viewSize
     * @param {?} count
     * @param {?=} applyTol
     * @param {?=} quickMove
     */
    constructor(minVal, viewSize, count, applyTol, quickMove) {
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
    transition(delta) {
        /** @type {?} */
        const newValue = this.currentValue - delta;
        if (newValue < this.minVal - this.tolerance)
            return this.minVal - this.tolerance;
        if (newValue > this.maxVal + this.tolerance)
            return this.maxVal + this.tolerance;
        return newValue;
    }
    /**
     * @param {?} viewSize
     * @return {?}
     */
    updateViewSize(viewSize) {
        this.viewSize = viewSize;
        /** @type {?} */
        const maxVal = this.minVal + this.viewSize * (this.count - 1);
        this.currentValue = (this.currentValue * maxVal) / this.maxVal;
        this.maxVal = maxVal;
    }
    /**
     * @param {?} count
     * @return {?}
     */
    updateCount(count) {
        this.count = count;
        this.maxVal = this.minVal + this.viewSize * (count - 1);
    }
    /**
     * @param {?} delta
     * @param {?} speed
     * @param {?=} quickRatio
     * @return {?}
     */
    final(delta, speed, quickRatio) {
        /** @type {?} */
        const newValue = this.transition(delta);
        /** @type {?} */
        const chgNeeded = (speed >= .2 ? .1 : .25) * this.viewSize;
        /** @type {?} */
        const lowerBound = this.currentIndex * this.viewSize + this.minVal;
        /** @type {?} */
        let newIndex;
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
    }
}
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
class UrlHelper {
    /**
     * @param {?} genericUrl
     * @return {?}
     */
    static getUrlParams(genericUrl) {
        /** @type {?} */
        const idx = genericUrl.indexOf('?');
        if (idx === -1)
            return null;
        /** @type {?} */
        const url = genericUrl.substring(idx + 1);
        /** @type {?} */
        const queries = url.split('&');
        /** @type {?} */
        const params = {};
        for (let i = 0; i < queries.length; i++) {
            /** @type {?} */
            const split = queries[i].split('=');
            params[split[0]] = split[1];
        }
        return params;
    }
    /**
     * @param {?} key
     * @param {?} hashids
     * @return {?}
     */
    static decodeStringFromHashids(key, hashids) {
        return HashidConverter.decodeHashids(key, hashids);
    }
    /**
     * @param {?} key
     * @param {?} hashids
     * @return {?}
     */
    static encodeStringAsHashids(key, hashids) {
        return HashidConverter.encodeString(key, hashids);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MuUtility {
    /**
     * @param {?} errObj
     * @return {?}
     */
    isOfTypeUiError(errObj) {
        return errObj.hasOwnProperty('errorCode');
    }
    /**
     * @param {?} rc
     * @return {?}
     */
    isNetworkUnhealthy(rc) {
        if (rc.bridge.isRunningInBrowser()) {
            return !navigator.onLine;
        }
        else {
            /** @type {?} */
            const netType = rc.bridge.getCordovaNetworkType();
            return netType === NetworkType.absent ||
                (netType === NetworkType.unknown && !navigator.onLine);
        }
    }
    /**
     * @param {?} number
     * @return {?}
     */
    isValidIndianMobNum(number) {
        number = this.sanitizeNumber(number);
        return new RegExp('^\\+91[9876]\\d{9}$').test(number);
    }
    /**
     * @param {?} number
     * @return {?}
     */
    get10digitMobNumber(number) {
        /** @type {?} */
        const num = this.sanitizeNumber(number);
        if (num.startsWith('+91'))
            return num.substring(3);
        if (num.startsWith('91'))
            return num.substring(2);
        else if (num.startsWith('0'))
            return num.substring(1);
        else
            return num;
    }
    /**
     * @param {?} number
     * @return {?}
     */
    sanitizeNumber(number) {
        /** @type {?} */
        let temp = number;
        if (!temp)
            return null;
        /** @type {?} */
        const startsWithPlus = temp.startsWith('+91');
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
    }
    /**
     * @param {?} rc
     * @return {?}
     */
    getNetworkType(rc) {
        return rc.bridge.isRunningInBrowser()
            ? navigator.onLine ? NetworkType.wifi : NetworkType.absent
            : rc.bridge.getCordovaNetworkType();
    }
    /**
     * @param {?} rc
     * @param {?} transServ
     * @param {?} errorMessage
     * @return {?}
     */
    getErrorText(rc, transServ, errorMessage) {
        /** @type {?} */
        let errorText;
        switch (errorMessage) {
            case XmnError.NetworkNotPresent:
                errorText = transServ.instant('cmn_toast_err_net_off');
                break;
            case XmnError.ConnectionFailed:
                if (this.isNetworkUnhealthy(rc)) {
                    errorText = transServ.instant('cmn_toast_err_net_off');
                }
                else {
                    errorText = transServ.instant('cmn_toast_err_con_failed');
                }
                break;
            case XmnError.RequestTimedOut:
            case XmnError.SendTimedOut:
                errorText = transServ.instant('cmn_toast_err_timeout');
                break;
            default:
                errorText = transServ.instant('cmn_toast_err_unknown');
        }
        return errorText;
    }
    /**
     * @param {?} rc
     * @return {?}
     */
    getLocation(rc) {
        if (rc.bridge.isRunningInBrowser()) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((/**
                 * @param {?} position
                 * @return {?}
                 */
                (position) => {
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
    }
    /**
     * @param {?} template
     * @param {?} data
     * @return {?}
     */
    expandTemplate(template, data) {
        return expandTemplate(template, data);
    }
    /**
     * @param {?} templateObj
     * @param {?} data
     * @return {?}
     */
    expandTemplateObj(templateObj, data) {
        return expandTemplateObj(templateObj, data);
    }
    /**
     * @param {?} parser
     * @return {?}
     */
    parseURLForRouter(parser) {
        if (parser.protocol !== 'http' || parser.protocol !== 'https') {
            parser.href = parser.href.replace(/.*\:\/\//, 'http://');
        }
        /** @type {?} */
        const searchObject = {};
        /** @type {?} */
        const queries = parser.search.replace(/^\?/, '').split('&');
        for (let i = 0; i < queries.length; i++) {
            if (!queries[i])
                continue;
            /** @type {?} */
            const split = queries[i].split('=');
            searchObject[split[0]] = decodeURIComponent(split[1]);
        }
        /** @type {?} */
        const pathname = parser.pathname.startsWith('/')
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
    }
    /**
     * @param {?} genericUrl
     * @return {?}
     */
    getUrlParams(genericUrl) {
        return UrlHelper.getUrlParams(genericUrl);
    }
    /**
     * @param {?} errorMessage
     * @return {?}
     */
    getErrorScreenState(errorMessage) {
        /** @type {?} */
        let errorCode;
        switch (errorMessage) {
            case XmnError.NetworkNotPresent:
                errorCode = 'NoNet';
                break;
            case XmnError.ConnectionFailed:
                errorCode = 'ConnFail';
                break;
            case XmnError.RequestTimedOut:
            case XmnError.SendTimedOut:
                errorCode = 'TimedOut';
                break;
            case XmnError.UnAuthorized:
                errorCode = 'UnAuthorized';
            default:
                errorCode = errorMessage.substring(0, Math.min(32, errorMessage.length));
        }
        return errorCode;
    }
    /**
     * @param {?} file
     * @return {?}
     */
    getBase64(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            (resolve, reject) => {
                /** @type {?} */
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (/**
                 * @return {?}
                 */
                () => resolve((/** @type {?} */ (reader.result))));
                reader.onerror = (/**
                 * @param {?} error
                 * @return {?}
                 */
                error => reject(error));
            }));
        });
    }
    /**
     * @param {?} message
     * @return {?}
     */
    getCheckSum(message) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const encoder = new TextEncoder();
            /** @type {?} */
            const data = encoder.encode(message);
            /** @type {?} */
            const buffer = yield window.crypto.subtle.digest('SHA-256', data);
            /** @type {?} */
            const hexString = this.hexString(buffer);
            return hexString;
        });
    }
    /**
     * @param {?} buffer
     * @return {?}
     */
    hexString(buffer) {
        /** @type {?} */
        const byteArray = new Uint8Array(buffer);
        /** @type {?} */
        let hexCode = '';
        /** @type {?} */
        let value;
        for (let i = 0; i < byteArray.length; i++) {
            value = byteArray[i].toString(16),
                hexCode += (value.length === 1 ? '0' + value : value);
        }
        return hexCode;
    }
    /**
     * @param {?} file
     * @param {?=} changeOrientation
     * @return {?}
     */
    getCompressedImage(file, changeOrientation = false) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            (resolve, reject) => {
                /** @type {?} */
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (/**
                 * @param {?} readerEvent
                 * @return {?}
                 */
                (readerEvent) => {
                    /** @type {?} */
                    const image = new Image();
                    image.src = readerEvent.target.result;
                    image.onload = (/**
                     * @param {?} imageEvent
                     * @return {?}
                     */
                    (imageEvent) => {
                        /** @type {?} */
                        const exif = window['EXIF'];
                        if (exif) {
                            exif.getData(file, (/**
                             * @return {?}
                             */
                            () => {
                                /** @type {?} */
                                const orientation = changeOrientation ? file.exifdata.Orientation : undefined;
                                return resolve(this.getCanvasImage(image, orientation));
                            }));
                        }
                        else {
                            return resolve(this.getCanvasImage(image));
                        }
                    });
                });
                reader.onerror = (/**
                 * @param {?} error
                 * @return {?}
                 */
                error => reject(error));
            }));
        });
    }
    /**
     * @param {?} image
     * @param {?=} orientation
     * @return {?}
     */
    getCanvasImage(image, orientation) {
        /** @type {?} */
        const canvas = document.createElement('canvas');
        /** @type {?} */
        const ctx = canvas.getContext('2d');
        /** @type {?} */
        const maxSize = 800;
        /** @type {?} */
        let width = image.width;
        /** @type {?} */
        let height = image.height;
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
        const backgroundColor = 'white';
        /** @type {?} */
        const compositeOperation = ctx.globalCompositeOperation;
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = compositeOperation;
        /** @type {?} */
        const resizedImage = canvas.toDataURL('image/jpeg', 0.7);
        return resizedImage;
    }
    //base64 without mime type
    /**
     * @param {?} base64
     * @return {?}
     */
    getBase64Size(base64) {
        /** @type {?} */
        const slicedBase64 = base64.includes('base64') ? base64.split(',')[1] : base64;
        /** @type {?} */
        let padding = 0;
        if (slicedBase64.endsWith('==')) {
            padding = 2;
        }
        else if (slicedBase64.endsWith('=')) {
            padding = 1;
        }
        /** @type {?} */
        const size = (slicedBase64.length * (0.75)) - padding;
        return (size / 1024);
    }
    // used to create a url with params
    /**
     * @param {?} url
     * @param {?} object
     * @return {?}
     */
    createNavUrl(url, object) {
        /** @type {?} */
        const navUrl = url.split('?')[0];
        /** @type {?} */
        const tempUrl = url.split('?')[1];
        /** @type {?} */
        const urlObj = JSON.parse('{"' + decodeURI(tempUrl).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
        for (let key of Object.keys(urlObj)) {
            if (key in object) {
                urlObj[key] = object[key];
            }
        }
        /** @type {?} */
        const completeUrl = navUrl + '?' + Object.keys(urlObj).map((/**
         * @param {?} key
         * @return {?}
         */
        key => key + '=' + urlObj[key])).join('&');
        return completeUrl;
    }
}

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
class TableDataManager {
    /**
     * @param {?} parentInst
     * @param {?} tableInst
     */
    constructor(parentInst, tableInst) {
        this.parentInst = parentInst;
        this.tableInst = tableInst;
        this.dataParams = (/** @type {?} */ ({}));
        this.currentKeyIndex = 0;
        this.dataObject = {};
    }
    /**
     * Method to get the table config and get the dispRows and totalDataCount and data
     * @param {?} tableConfig : To set the table config in the data table
     * @param {?} lastIndex
     * @return {?}
     */
    init(tableConfig, lastIndex) {
        this.dataParams.data = [];
        this.dispRows = tableConfig.dispRows || 0;
        this.totalDataCount = tableConfig.totalRecords || 0;
        /** @type {?} */
        const params = {
            lastIndex: lastIndex,
            data: tableConfig.data
        };
        /** @type {?} */
        const data = tableConfig.data.slice(0, this.dispRows);
        tableConfig.data = data;
        // this.tableInst.setTableConfig(tableConfig)
        this.updateData(params);
    }
    /**
     * parent will populate the data, moreAvailable and lastIndex in this method
     * @param {?} params : Updating the params by the parent so  that the data can be populated into the manager
     * @return {?}
     */
    updateData(params) {
        this.dataParams.data = params.data;
        this.dataParams.lastIndex = params.lastIndex;
        this.mapData(0);
    }
    /**
     * mapping the data into the data object
     * @private
     * @param {?} index : Index to set as key in the data object
     * @return {?}
     */
    mapData(index) {
        /** @type {?} */
        let addingIndex = this.currentKeyIndex;
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
    }
    /**
     * Calls table instance function to set table data
     * (calls TableDataMgrListener's loadMore if data is not present)
     * @param {?=} index
     * @return {?}
     */
    setTableData(index) {
        if (index >= 0)
            this.currentKeyIndex = index;
        /** @type {?} */
        const keys = Object.keys(this.dataObject);
        /** @type {?} */
        const dataKey = keys.find((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            return Number(key) === this.currentKeyIndex;
        }));
        if (dataKey) {
            /** @type {?} */
            const data = this.dataObject[dataKey];
            if (data.length === this.dispRows || (this.totalDataCount - this.currentKeyIndex) < this.dispRows) {
                // this.tableInst.setDisplayData(data)
                this.lastKeyIndex = Number(dataKey);
            }
            else {
                /** @type {?} */
                const index = this.currentKeyIndex + data.length;
                this.parentInst.loadMore(index);
                this.pendingRequest = true;
            }
            return;
        }
        this.parentInst.loadMore(this.currentKeyIndex);
        this.pendingRequest = true;
    }
    /**
     * Call from parent, clears all the data inside the manager
     * @return {?}
     */
    clearData() {
        this.totalDataCount = 0;
        this.dispRows = 0;
        this.currentKeyIndex = 0;
        this.dataParams = (/** @type {?} */ ({}));
        this.dataObject = {};
        this.pendingRequest = false;
    }
    /**
     * Method to update the data if parent wants to change any particular data in the data table
     * @param {?} data : data on which the action should be done
     * @param {?} index : index where the data is present
     * @return {?}
     */
    updateDataStatus(data, index) {
        /** @type {?} */
        const dataIndex = index - this.currentKeyIndex;
        this.dataObject[this.currentKeyIndex][dataIndex] = data;
        this.setTableData();
    }
    /**
     * Method called by parent when error occur in parent
     * @return {?}
     */
    errorOccur() {
        this.pendingRequest = false;
        this.currentKeyIndex = this.lastKeyIndex;
        // this.tableInst.onUiError()
        this.setTableData();
    }
    /**
     * Method called by parent
     * user selects different data in the data table to pass whether the data should be selectable or not
     * @param {?} data : To select the data in the data table
     * @return {?}
     */
    setSelectableData(data) {
        // this.tableInst.setSelectedItems(data)
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CYCLE_STEP = '_cycle_';
class PerformanceMetrics {
    /**
     * @param {?} taskName
     */
    constructor(taskName) {
        this.taskName = taskName;
        this.cycles = [];
        this.startTs = this.now();
    }
    /**
     * @param {?} stepName
     * @return {?}
     */
    startStep(stepName) {
        /** @type {?} */
        const now = this.now();
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
    }
    /**
     * @param {?} stepName
     * @return {?}
     */
    endStep(stepName) {
        /** @type {?} */
        const step = this.cycle.stepMap[stepName];
        if (!step) {
            console.error(stepName, 'ended without start for', this.taskName);
            return;
        }
        step.endTs = this.now();
    }
    /**
     * @return {?}
     */
    finish() {
        /** @type {?} */
        const now = this.now();
        /** @type {?} */
        const output = {
            task: this.taskName,
            totalMs: now - this.startTs,
            cycleCount: this.cycles.length,
            cyclePerf: new ResultEntry(),
            stepPerf: (/** @type {?} */ ({}))
        };
        if (this.cycle) {
            this.cycle.endTs = now;
            this.cycles.push(this.cycle);
        }
        for (let index = 0; index < this.cycles.length; index++) {
            /** @type {?} */
            const cycle = this.cycles[index];
            output.cyclePerf = this.markEntry(cycle.endTs - cycle.startTs, index, output.cyclePerf);
            for (const stepName in cycle.stepMap) {
                /** @type {?} */
                const step = cycle.stepMap[stepName];
                /** @type {?} */
                const perf = output.stepPerf[stepName];
                if (!step.endTs) {
                    console.error('You forgot to call endStep for ' + stepName + ' for cycle index:' + index);
                    continue;
                }
                output.stepPerf[stepName] = this.markEntry(step.endTs - step.startTs, index, perf);
            }
        }
        console.info('Result summary ', output);
        /** @type {?} */
        let marks = [];
        this.logEntry('all cycles', output.cyclePerf, marks);
        for (const stepName in output.stepPerf) {
            this.logEntry(stepName, output.stepPerf[stepName], marks);
        }
        marks = sortBy(marks, 'startTs');
        console.info('Highlighted cycles (having min/max cycle/step time) >>');
        for (const mark of marks) {
            console.info(mark.toString());
        }
        console.info('all cycles to deep dive >>', this.cycles);
    }
    /**
     * @private
     * @param {?} ts
     * @param {?} index
     * @param {?} entry
     * @return {?}
     */
    markEntry(ts, index, entry) {
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
    }
    /**
     * @private
     * @return {?}
     */
    now() {
        return performance ? performance.timing.navigationStart + performance.now() : Date.now();
    }
    /**
     * @private
     * @param {?} name
     * @param {?} entry
     * @param {?} insertInto
     * @return {?}
     */
    logEntry(name, entry, insertInto) {
        console.info(name + ' performance >> ' + entry);
        if (entry.minIdx !== -1) {
            /** @type {?} */
            const cycle = this.cycles[entry.minIdx];
            if (insertInto.indexOf(cycle) === -1)
                insertInto.push(cycle);
        }
        if (entry.maxIdx !== -1) {
            /** @type {?} */
            const cycle = this.cycles[entry.maxIdx];
            if (insertInto.indexOf(cycle) === -1)
                insertInto.push(cycle);
        }
    }
}
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
class BaseTime {
    /**
     * @param {?} startTs
     */
    constructor(startTs) {
        this.startTs = startTs;
    }
}
if (false) {
    /** @type {?} */
    BaseTime.prototype.startTs;
    /** @type {?} */
    BaseTime.prototype.endTs;
}
class Step extends BaseTime {
}
class Cycle extends BaseTime {
    /**
     * @param {?} index
     * @param {?} now
     * @param {?} step
     */
    constructor(index, now, step) {
        super(now);
        this.index = index;
        this.stepMap = { [step]: new Step(now) };
    }
    /**
     * @return {?}
     */
    toString() {
        /** @type {?} */
        const ts = this.endTs - this.startTs;
        return `Cycle(${this.index}) @ ${format(this.startTs, '%hh%:%mm%:%ss% %ms%')} timeTaken: ${ts.toFixed(3)}ms`;
    }
}
if (false) {
    /** @type {?} */
    Cycle.prototype.index;
    /** @type {?} */
    Cycle.prototype.stepMap;
}
class ResultEntry {
    constructor() {
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
    toString() {
        /** @type {?} */
        const average = this.count ? this.total / this.count : 0;
        return `minMs: ${this.min.toFixed(3)} ${this.max !== -1 ? 'maxMs: ' + this.max.toFixed(3) : ''} avgMs: ${average.toFixed(3)} count: ${this.count} ${this.minIdx !== -1 ? 'minIdx: ' + this.minIdx : ''} ${this.maxIdx !== -1 ? 'maxIdx: ' + this.maxIdx : ''}`;
    }
}
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
const THRESHOLD = .8
// Gutter width: we support gutters on x axis. Gutter touches are reported as a separate callback
// Gutter is always configured wrt to page dimensions, not component dimensions
;
// Gutter width: we support gutters on x axis. Gutter touches are reported as a separate callback
// Gutter is always configured wrt to page dimensions, not component dimensions
/** @type {?} */
const GUTTER_WIDTH = 10;
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
const DIRECTION = {
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
const AXIS = {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CONSOLE_FN_MAP = [];
CONSOLE_FN_MAP[LOG_LEVEL.DEBUG] = console.log;
CONSOLE_FN_MAP[LOG_LEVEL.STATUS] = console.info || console.log;
CONSOLE_FN_MAP[LOG_LEVEL.WARN] = console.warn || console.log;
CONSOLE_FN_MAP[LOG_LEVEL.ERROR] = console.error || console.log;
class InitConfigBrowser extends InitConfig$1 {
    /**
     * @param {?} runMode
     * @param {?} logLevel
     * @param {?=} tzMin
     */
    constructor(runMode, logLevel, tzMin) {
        super(logLevel, logLevel !== LOG_LEVEL.NONE, tzMin);
        if ((runMode === RUN_MODE.PROD || runMode === RUN_MODE.PRE_PROD) && logLevel !== LOG_LEVEL.NONE) {
            console.log('You must turn off logging in production mode');
        }
    }
}
class RunStateBrowser extends RunState {
}
class RCBrowserLogger extends RCLoggerBase {
    /**
     * @param {?} rc
     */
    constructor(rc) {
        super(rc);
        this.rc = rc;
    }
    /**
     * @param {?} level
     * @param {?} logStr
     * @return {?}
     */
    logToConsole(level, logStr) {
        /** @type {?} */
        const fn = CONSOLE_FN_MAP[level];
        fn.call(console, logStr);
    }
}
if (false) {
    /** @type {?} */
    RCBrowserLogger.prototype.rc;
}
/**
 * @abstract
 */
class RunContextBrowser extends RunContextBase {
    // Stores the old error handler
    // private oldOnError    : any
    /**
     * @protected
     * @param {?} initConfig
     * @param {?} runState
     * @param {?=} contextId
     * @param {?=} contextName
     */
    constructor(initConfig, runState, contextId, contextName) {
        super(initConfig, runState, contextId, contextName);
        this.initConfig = initConfig;
        this.runState = runState;
    }
    /**
     * @return {?}
     */
    preInit() {
        super.init();
        this.logger = new RCBrowserLogger(this);
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let NEXT_SESSION_ID = 1;
class TouchSession {
    constructor() {
        this.startX = -1; // indicates a uninitialized TouchSession
        this.id = NEXT_SESSION_ID++;
    }
}
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
const TOUCH_EVENT = {
    START: 'touchstart',
    MOVE: 'touchmove',
    END: 'touchend',
    CANCEL: 'touchcancel'
}
// const TOUCH_EVENT = {
//   START   : 'pointerdown',
//   MOVE    : 'pointermove',
//   END     : 'pointerup',
//   CANCEL  : 'pointercancel'
// }
;
// const TOUCH_EVENT = {
//   START   : 'pointerdown',
//   MOVE    : 'pointermove',
//   END     : 'pointerup',
//   CANCEL  : 'pointercancel'
// }
/** @type {?} */
const THRESHOLD_PIXELS = 1;
/** @type {?} */
const MAX_THRESHOLD_PIXELS = 10;
/** @type {?} */
const FAST_MIN_SPEED = 2;
/** @type {?} */
const FAST_MAX_SPEED = 8;
class Nail {
    /**
     * @param {?} rc
     * @param {?} element
     * @param {?} appComponent
     * @param {?} renderer
     * @param {?} config
     */
    constructor(rc, element, appComponent, renderer, config) {
        this.rc = rc;
        this.element = element;
        this.appComponent = appComponent;
        this.renderer = renderer;
        this.measure = false;
        this.handlers = [];
        rc.setupLogger(this, 'Nail', LOG_LEVEL.STATUS);
        this.compName = appComponent.constructor ? appComponent.constructor.name : '?';
        this.rc.isAssert() && this.rc.assert(this.rc.getName(this), config.axisX || config.axisY, 'Nail needs to be configured for at least one axes');
        this.setConfig(config);
        this.pageWidth = document.body.clientWidth;
        /** @type {?} */
        const panEventHandler = this.onNailEvent.bind(this);
        this.handlers.push(renderer.listen(element, TOUCH_EVENT.START, panEventHandler), renderer.listen(element, TOUCH_EVENT.MOVE, panEventHandler), renderer.listen(element, TOUCH_EVENT.END, panEventHandler), renderer.listen(element, TOUCH_EVENT.CANCEL, panEventHandler));
        this.animateFn = this.onRunAnimation.bind(this);
        rc.isStatus() && rc.status(rc.getName(this), 'Nail events are being monitored for', this.compName, 'with config', config);
    }
    /**
     * @param {?} config
     * @return {?}
     */
    changeConfig(config) {
        this.setConfig(config);
        // See if we can create a DOM Event object ???? TODO
        if (this.session)
            this.panEndEvent({ type: 'simulatedPanEnd' });
    }
    /**
     * @param {...?} animateParam
     * @return {?}
     */
    requestAnimate(...animateParam) {
        if (this.session) {
            this.session.animateParam = animateParam;
            if (this.session.animHandle)
                window.cancelAnimationFrame(this.session.animHandle);
            this.session.animHandle = window.requestAnimationFrame(this.animateFn);
            this.session.animSessionId = this.session.id;
        }
    }
    /**
     * @param {?} disallowLeft
     * @param {?} disallowRight
     * @return {?}
     */
    setDirections(disallowLeft, disallowRight) {
        this.config.disallowLeft = disallowLeft;
        this.config.disallowRight = disallowRight;
    }
    /**
     * @private
     * @param {?} config
     * @return {?}
     */
    setConfig(config) {
        config.threshold = config.threshold || THRESHOLD;
        config.gutterWidth = config.gutterWidth || GUTTER_WIDTH;
        this.rc.isAssert() && this.rc.assert(this.rc.getName(this), config.threshold <= 1, 'Threshold cannot be more than 1');
        this.config = config;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onNailEvent(event) {
        /** @type {?} */
        const session = this.session;
        /** @type {?} */
        const config = this.config
        // console.log(event.type, 'with',  event.touches.length, 'touches')
        // no axis is being monitored
        ;
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
            const deltaX = session.lastX - session.startX;
            /** @type {?} */
            const deltaY = session.lastY - session.startY;
            if (!session.axis) { // we try to find if we can establish the direction of movement
                if (this.measure)
                    this.session.perf.startStep('ascertain');
                /** @type {?} */
                const ascertained = this.ascertainDirection(event, deltaX, deltaY);
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
            const consumed = session.ifNail.onPanMove(event);
            if (this.measure)
                this.session.perf.endStep('onPanMove');
            if (this.measure)
                this.session.perf.endStep(TOUCH_EVENT.MOVE);
            if (consumed) {
                this.rc.isDebug() && this.rc.debug(this.rc.getName(this), this.compName, event.type, 'consumed event', { deltaX, deltaY, eventY: event.deltaY, session });
                event.preventDefault();
                event.stopPropagation();
                return true;
            }
            else {
                this.rc.isDebug() && this.rc.debug(this.rc.getName(this), this.compName, event.type, 'ignored event', { deltaX, deltaY, eventY: event.deltaY, session });
            }
        }
        else { // end or cancel event
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), this.compName, event.type, 'received');
            if (this.session)
                this.panEndEvent(event);
        }
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    panEndEvent(event) {
        if (this.measure)
            this.session.perf.startStep(event.type);
        /** @type {?} */
        const session = this.session
        // If we have not ascertained
        ;
        // If we have not ascertained
        if (session.axis) {
            event.axis = session.axis;
            /** @type {?} */
            const deltaMs = Date.now() - session.startTs;
            event.deltaY = session.lastY - session.startY;
            event.deltaX = session.lastX - session.startX;
            /** @type {?} */
            const change = Math.abs(session.axis === AXIS.X ? event.deltaX : event.deltaY);
            /** @type {?} */
            const speed = deltaMs ? (change * 1000 / (deltaMs * deltaMs)) : 0;
            /** @type {?} */
            let quickRatio = (speed - FAST_MIN_SPEED) / (FAST_MAX_SPEED - FAST_MIN_SPEED);
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
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    extractEventAttr(event) {
        /** @type {?} */
        const session = this.session;
        /** @type {?} */
        const touch = event.touches[0];
        session.lastX = touch.pageX;
        session.lastY = touch.pageY;
        if (session.startX === -1) {
            session.startX = session.lastX;
            session.startY = session.lastY;
            session.startTs = Date.now();
        }
    }
    // figure out direction of movement
    /**
     * @private
     * @param {?} event
     * @param {?} deltaX
     * @param {?} deltaY
     * @return {?}
     */
    ascertainDirection(event, deltaX, deltaY) {
        /** @type {?} */
        const session = this.session;
        /** @type {?} */
        const config = this.config;
        /** @type {?} */
        const posDx = Math.abs(deltaX);
        /** @type {?} */
        const posDy = Math.abs(deltaY);
        /** @type {?} */
        let axis = 0;
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
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), this.compName, event.type, 'Ascertained', axis, { deltaX, deltaY });
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
    }
    /**
     * @private
     * @return {?}
     */
    onRunAnimation() {
        /** @type {?} */
        const session = this.session;
        if (!session)
            return;
        this.session.animHandle = null;
        if (session.ignore || session.animSessionId !== session.id)
            return;
        session.ifNail.onPanAnimate(...session.animateParam);
    }
    /**
     * @return {?}
     */
    destroy() {
        for (const handler of this.handlers) {
            handler();
        }
        this.handlers = [];
        this.config = null;
        this.session = null;
    }
}
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
const INJECTION_PARAM = {
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
class TrackableScreen {
    /**
     * @param {?} rc
     */
    constructor(rc) {
        this.rc = rc;
    }
    /**
     * @param {?} success
     * @return {?}
     */
    onApiComplete(success) {
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // if (this.rc.userKeyVal.clientId && this.isUserVisited()) {
        //   const key = Object.keys(ComponentRoute)
        //     .find(key => ComponentRoute[key] === this.getRouteName())
        //    this.rc.userKeyVal.setScreenVisited(key)
        // }
    }
}
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
const ComponentRoutes = {
    Modal: 'modal',
    BottomIn: 'bottomIn',
    LoadingOverlay: 'loadingOvr',
    Alert: 'alert',
    Filter: 'filter'
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
const DIALOG_RESULT = {
    YES: 'YES',
    NO: 'NO',
};
class AlertDialogComponent extends TrackableScreen {
    /**
     * @param {?} rc
     */
    constructor(rc) {
        super(rc);
        this.rc = rc;
    }
    /**
     * @return {?}
     */
    getWidth() {
        return '80vw';
    }
    /**
     * @return {?}
     */
    getRouteName() {
        return ComponentRoutes.Alert;
    }
    /**
     * @return {?}
     */
    isUserVisited() {
        return true;
    }
    /*=====================================================================
                                      CALLBACKS
      =====================================================================*/
    /**
     * @param {?} queryParams
     * @return {?}
     */
    setParam(queryParams) {
        this.rc.isAssert() && this.rc.assert(this.rc.getName(this), queryParams['message'] &&
            queryParams['positiveActText'], `missing queryparams ${queryParams}`);
        this.title = queryParams['title'];
        this.message = queryParams['message'];
        this.positiveActText = queryParams['positiveActText'];
        this.negativeActText = queryParams['negativeActText'] || '';
        this.contextId = queryParams['contextId'] || '';
        this.allowBack = queryParams['canGoBack'];
        this.showCloseBtn = queryParams['showCloseBtn'] || false;
        this.positiveLink = queryParams['positiveLink'];
    }
    /**
     * @param {?} caller
     * @return {?}
     */
    setCaller(caller) {
        this.caller = caller;
    }
    /**
     * @param {?} ip
     * @param {?} showTitle
     * @return {?}
     */
    initFromParent(ip, showTitle) {
        this.myParent = ip;
    }
    /**
     * @return {?}
     */
    close() {
        this.myParent.close();
    }
    /**
     * @return {?}
     */
    closeFromParent() {
        /** @type {?} */
        const result = {
            result: this.result,
            contextId: this.contextId,
            positiveLink: this.positiveLink
        };
        this.caller.setResult(this.getRouteName(), result);
    }
    /**
     * @return {?}
     */
    isNotDismissable() {
        return true;
    }
    /**
     * @return {?}
     */
    canGoBack() {
        /** @type {?} */
        const canGoBack = this.allowBack !== undefined;
        return canGoBack ? this.allowBack : true;
    }
    /*=====================================================================
                                  HTML FUNCTIONS
      =====================================================================*/
    /**
     * @return {?}
     */
    onCancel() {
        this.result = DIALOG_RESULT.NO;
        this.close();
    }
    /**
     * @return {?}
     */
    onContinue() {
        this.result = DIALOG_RESULT.YES;
        this.allowBack = true;
        this.close();
    }
}
AlertDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-alert-dialog',
                template: "<div class=\"alert-dialog-comp\"\n  [ngClass.xl]=\"['web-alerts-dialog']\"\n  [ngClass.lg]=\"['web-alerts-dialog']\"\n  [ngClass.md]=\"['web-alerts-dialog']\"\n  [ngClass.sm]=\"['web-alerts-dialog']\">\n  <header class=\"header txt-xl-med-norm border\" *ngIf=\"title\">\n    <div class=\"header-title\">\n      {{ title }}\n    </div>\n    <div class=\"close-btn\" *ngIf=\"showCloseBtn\"\n      (click)=\"onCancel()\">\n      <i class=\"fa fa-lg fa-times\"></i>\n    </div>\n  </header>\n  <div class=\"content txt-xl-med-norm\">\n    {{ message }}\n  </div>\n  <footer class=\"footer\" [style.justifyContent]=\"negativeActText ? 'space-between' : 'center'\">\n    <button *ngIf='negativeActText' class=\"button-primary-small btn\" (click)=\"onCancel()\">\n      {{ negativeActText }}\n    </button>\n    <button class=\"button-primary-small btn\" (click)=\"onContinue()\">\n      {{ positiveActText }}\n    </button>\n  </footer>  \n</div>   ",
                styles: [".alert-dialog-comp{padding:2vw;position:relative}.header{border-bottom-style:solid;border-bottom-width:1px;display:flex;justify-content:space-between;padding-bottom:2vw}.content,.header{position:relative}.content{padding:2vw 0}.footer{align-items:center;display:flex;padding:4vw 0}.btn,.footer{position:relative}.btn{width:30vw}.web-alerts-dialog{padding:20px}.web-alerts-dialog .header{padding-bottom:20px}.web-alerts-dialog .content{padding:20px 0;position:relative}.web-alerts-dialog .footer{padding:20px 0}.web-alerts-dialog .btn{width:150px}"]
            }] }
];
/** @nocollapse */
AlertDialogComponent.ctorParameters = () => [
    { type: RunContextBrowser, decorators: [{ type: Inject, args: ['RunContext',] }] }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const ROOT_URL = '#/?launched=true';
/** @type {?} */
const hashIndex = location.href.indexOf('#');
/** @type {?} */
const baseHref = hashIndex !== -1 ? location.href.substr(0, hashIndex) : location.href;
/** @type {?} */
const BASE_HREF = baseHref;
/** @type {?} */
const PRIMARY_OUTLET = 'primary';
/** @type {?} */
const MODAL_OUTLET = 'modal';
/** @enum {number} */
const TOAST_POSITION = {
    TOP: 1, MIDDLE: 2, BOTTOM: 3,
};
TOAST_POSITION[TOAST_POSITION.TOP] = 'TOP';
TOAST_POSITION[TOAST_POSITION.MIDDLE] = 'MIDDLE';
TOAST_POSITION[TOAST_POSITION.BOTTOM] = 'BOTTOM';
/** @enum {number} */
const NavMethod = {
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
class StackItem {
}
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
class OutletEntry {
    /**
     * @param {?} component
     */
    constructor(component) {
        this.component = null;
        this.invCount = 0;
        this.component = component;
    }
}
if (false) {
    /** @type {?} */
    OutletEntry.prototype.component;
    /** @type {?} */
    OutletEntry.prototype.invCount;
    /** @type {?} */
    OutletEntry.prototype.lastParams;
}
class UiRouter {
    /**
     * @param {?} rcBrowser
     * @param {?} router
     */
    constructor(rcBrowser, router) {
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
    init(runningInBrowser, isSdkApp = false) {
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
    }
    /**
     * @param {?} routeTo
     * @param {?=} extras
     * @return {?}
     */
    navigate(routeTo, extras) {
        return __awaiter(this, void 0, void 0, function* () {
            if (extras && extras.replaceAllUrls) {
                if (this.urlStack.length - 1 > 0) {
                    extras.replaceIndex = 1;
                }
            }
            return yield this.navigateByUrl([{ outlets: { primary: routeTo, modal: null } }], extras, PRIMARY_OUTLET);
        });
    }
    /**
     * @param {?} routeTo
     * @param {?=} extras
     * @return {?}
     */
    rootNavigate(routeTo, extras) {
        return __awaiter(this, void 0, void 0, function* () {
            this.rcBrowser.isStatus() && this.rcBrowser.status(this.rcBrowser.getName(this), 'Inside RootNavigate', routeTo);
            if (!extras)
                extras = {};
            extras.replaceIndex = 0;
            return yield this.navigateByUrl([{ outlets: { primary: routeTo, modal: null } }], extras, PRIMARY_OUTLET);
        });
    }
    /**
     * @return {?}
     */
    areWeGoingBack() {
        return this.lastGoingBack;
    }
    /**
     * @return {?}
     */
    isModalActive() {
        return Object.keys(this.curCompMap).length !== 1;
    }
    /**
     * @return {?}
     */
    isShowingPopup() {
        return this.curOutlet !== PRIMARY_OUTLET;
    }
    /**
     * @private
     * @param {?} urlOrCommand
     * @param {?=} extras
     * @param {?=} outlet
     * @return {?}
     */
    navigateByUrl(urlOrCommand, extras, outlet) {
        return __awaiter(this, void 0, void 0, function* () {
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
            /** @type {?} */
            const nc_paramsId = extras.paramsId || 'qp' + Date.now();
            /** @type {?} */
            let modalRoute;
            if (extras.queryParams) {
                modalRoute = extras.queryParams.modalRoute;
            }
            this.currentQpId = nc_paramsId;
            this.curQueryParam = extras.queryParams;
            extras.queryParams = modalRoute ? { nc_paramsId, modalRoute: modalRoute } : { nc_paramsId };
            this.curOutlet = outlet || PRIMARY_OUTLET;
            /** @type {?} */
            const url = Array.isArray(urlOrCommand) ? this.router.createUrlTree(urlOrCommand, extras) : urlOrCommand;
            this.lastNavUrl = typeof url === 'string' ? url : this.router.serializeUrl(url);
            if (yield this.router.navigateByUrl(url, extras)) {
                return true;
            }
        });
    }
    /**
     * @param {?} component
     * @param {?} componentRoute
     * @param {?=} queryParams
     * @param {?=} replaceUrl
     * @param {?=} caller
     * @return {?}
     */
    popupBottomIn(component, componentRoute, queryParams, replaceUrl, caller) {
        if (!queryParams)
            queryParams = {};
        /** @type {?} */
        const repUrl = replaceUrl || false;
        this.showInModal(component, componentRoute, queryParams, ComponentRoutes.BottomIn, caller, repUrl);
    }
    /**
     * @param {?} component
     * @param {?} componentRoute
     * @param {?=} queryParams
     * @param {?=} replaceUrl
     * @param {?=} caller
     * @return {?}
     */
    popupModal(component, componentRoute, queryParams, replaceUrl, caller) {
        if (!queryParams)
            queryParams = {};
        /** @type {?} */
        const repUrl = replaceUrl || false;
        this.showInModal(component, componentRoute, queryParams, ComponentRoutes.Modal, caller, repUrl);
    }
    /**
     * @param {?} queryParams
     * @param {?} caller
     * @param {?=} replaceUrl
     * @return {?}
     */
    showAlertDialog(queryParams, caller, replaceUrl) {
        this.popupModal(AlertDialogComponent, ComponentRoutes.Alert, queryParams, replaceUrl, caller);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    hasQueryParamsById(params) {
        return !!params.nc_paramsId;
    }
    /**
     * @return {?}
     */
    getUrlStackLength() {
        return this.urlStack.length;
    }
    /**
     * @param {?=} outlet
     * @return {?}
     */
    getCurrentComponent(outlet = PRIMARY_OUTLET) {
        return this.curCompMap[outlet];
    }
    /**
     * @return {?}
     */
    getCurrentRouteName() {
        /** @type {?} */
        const topUrl = this.urlStack[this.urlStack.length - 1].url;
        return this.getRouteName(topUrl);
    }
    /**
     * @return {?}
     */
    onNavCancel() {
        this.lastNavMethod = 0;
    }
    /**
     * @return {?}
     */
    getCurQueryParams() {
        return this.curQueryParam;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    getRouteName(url) {
        /** @type {?} */
        const urlTree = this.router.parseUrl(url);
        /** @type {?} */
        const segments = urlTree.root.children.primary ? urlTree.root.children.primary.segments : undefined;
        if (!segments) {
            //we are adding dummy url (#/?launched=true) in the beginning.
            this.rcBrowser.isWarn() && this.rcBrowser.warn(this.rcBrowser.getName(this), `received invalid url ${url}`);
            return '';
        }
        if (segments.length > 1) {
            /** @type {?} */
            let path = '';
            segments.forEach((/**
             * @param {?} segment
             * @param {?} index
             * @return {?}
             */
            (segment, index) => {
                path += segment + (index < segments.length - 1 ? '/' : '');
            }));
            return path;
        }
        return segments[0].path;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    getModuleName(url) {
        /** @type {?} */
        const urlTree = this.router.parseUrl(url);
        /** @type {?} */
        const segments = urlTree.root.children.primary.segments;
        return segments[0].path;
    }
    /**
     * @return {?}
     */
    getCurrentQueryParams() {
        return this.curQueryParam;
    }
    /**
     * @param {?} params
     * @return {?}
     */
    getQueryParams(params) {
        /** @type {?} */
        const nc_paramsId = params.nc_paramsId;
        this.rcBrowser.isAssert() && this.rcBrowser.assert(this.rcBrowser.getName(this), nc_paramsId && nc_paramsId === this.currentQpId, 'Trying to retrieve non-existent params', params, this.currentQpId);
        return this.curQueryParam;
    }
    /**
     * @return {?}
     */
    clearHisory() {
        /** @type {?} */
        const distanceFromRoot = -1 * this.historyWrapper.getState().index - 1;
        this.historyWrapper.go(distanceFromRoot);
    }
    /**
     * @param {?} length
     * @return {?}
     */
    setIframeHistLength(length) {
        this.iframeHistLength = length;
    }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    updateQueryParam(name, value) {
        /** @type {?} */
        const stackItem = this.urlStack[this.urlStack.length - 1];
        /** @type {?} */
        const queryParam = stackItem.queryParam;
        this.rcBrowser.isAssert() && this.rcBrowser.assert(this.rcBrowser.getName(this), queryParam, 'Your component does not get params by id');
        queryParam[name] = value;
    }
    /**
     * @param {?} component
     * @param {?=} outlet
     * @return {?}
     */
    setComponentForOutlet(component, outlet) {
        outlet = outlet || PRIMARY_OUTLET;
        this.rcBrowser.isAssert() && this.rcBrowser.assert(this.rcBrowser.getName(this), component);
        /** @type {?} */
        const oldEntry = this.curCompMap[outlet];
        if (oldEntry && oldEntry.component === component)
            return;
        this.curCompMap[outlet] = new OutletEntry(component);
    }
    /**
     * @param {?} component
     * @param {?=} outlet
     * @return {?}
     */
    removeComponentForOutlet(component, outlet) {
        outlet = outlet || PRIMARY_OUTLET;
        this.rcBrowser.isAssert() && this.rcBrowser.assert(this.rcBrowser.getName(this), this.curCompMap[outlet].component === component);
        delete this.curCompMap[outlet];
    }
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
    showInModal(component, componentRoute, queryParams, type, caller, replaceUrl) {
        /** @type {?} */
        const compName = component.name;
        this.registerComponent(compName, component);
        queryParams[INJECTION_PARAM.INJECT] = compName;
        if (caller)
            queryParams[INJECTION_PARAM.CALLER] = caller;
        queryParams.modalRoute = '(' + componentRoute + ')';
        /** @type {?} */
        const repUrl = replaceUrl || false;
        this.rcBrowser.isStatus() && this.rcBrowser.status(this.rcBrowser.getName(this), `Popping up ${type} for ${compName}`);
        this.navigateByUrl([{ outlets: { modal: type } }], { replaceUrl: repUrl,
            queryParams: queryParams }, MODAL_OUTLET);
    }
    /**
     * @param {?} componentRoute
     * @param {?} queryParams
     * @param {?=} replaceUrl
     * @return {?}
     */
    showModalPage(componentRoute, queryParams, replaceUrl) {
        queryParams.modalRoute = '(' + componentRoute + ')';
        /** @type {?} */
        const repUrl = replaceUrl || false;
        this.navigateByUrl([{ outlets: { modal: componentRoute } }], { replaceUrl: repUrl, queryParams: queryParams }, MODAL_OUTLET);
    }
    /**
     * @param {?=} whereOrByHowMuch
     * @return {?}
     */
    goBack(whereOrByHowMuch) {
        if (!this.canGoBack())
            return;
        if (this.isModalActive()) {
            this.onPopUpClosed();
        }
        return this.goBackInternal(whereOrByHowMuch);
    }
    /**
     * @param {?=} whereOrByHowMuch
     * @return {?}
     */
    goBackInternal(whereOrByHowMuch) {
        /** @type {?} */
        const stackLen = this.urlStack.length;
        /** @type {?} */
        let index = typeof whereOrByHowMuch === 'number' ? stackLen + whereOrByHowMuch - 1 : stackLen - 2;
        /** @type {?} */
        let where = typeof whereOrByHowMuch === 'string' ? whereOrByHowMuch : '';
        this.rcBrowser.isAssert() && this.rcBrowser.assert(this.rcBrowser.getName(this), index >= 0 && index < stackLen, { stackLen, whereOrByHowMuch, where, index });
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
        const urlStack = this.urlStack[index];
        /** @type {?} */
        const ne = { replaceUrl: true };
        if (urlStack.qpId) {
            ne.paramsId = urlStack.qpId;
            ne.queryParams = urlStack.queryParam;
        }
        ne.replaceIndex = index;
        this.navigateByUrl(urlStack.url, ne, urlStack.outlet);
    }
    /*--------------------------------------------------------------------------------------------------------------
        History Stack management
      --------------------------------------------------------------------------------------------------------------*/
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    onPopState(e) {
        /** @type {?} */
        const index = this.historyWrapper.getState().index;
        /** @type {?} */
        const stackLen = this.urlStack.length;
        this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'onPopState', { stackLen, index });
        this.rcBrowser.isAssert() && this.rcBrowser.assert(this.rcBrowser.getName(this), typeof index === 'number' &&
            index < (stackLen - 1), { stackLen, index });
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
            for (let i = 0; i < stackLen; i++) {
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
            const goBackBy = index - stackLen + 1;
            this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'onPopState: Going back by', { index, goBackBy });
            this.goBackInternal(goBackBy);
        }
    }
    /**
     * @private
     * @return {?}
     */
    canCompGoBack() {
        if (!this.canGoBack() || this.isToolTipShown()) {
            /** @type {?} */
            const lastIdx = this.urlStack.length - 1;
            /** @type {?} */
            const lastItem = this.urlStack[lastIdx];
            this.historyWrapper.pushState({ index: lastIdx }, '', BASE_HREF + '#' + lastItem.url);
            this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'not going back');
            return false;
        }
        return true;
    }
    /**
     * @private
     * @return {?}
     */
    onPopUpClosed() {
        /** @type {?} */
        const lastIdx = this.urlStack.length - 1;
        /** @type {?} */
        const lastItem = this.urlStack[lastIdx];
        if (!lastItem)
            return;
        /** @type {?} */
        const comp = this.curCompMap[lastItem.outlet];
        if (!comp || !comp.component.onBackPressed)
            return;
        comp.component.onBackPressed();
    }
    /**
     * @protected
     * @return {?}
     */
    canGoBack() {
        /** @type {?} */
        const lastIdx = this.urlStack.length - 1;
        /** @type {?} */
        const lastItem = this.urlStack[lastIdx];
        if (!lastItem)
            return true;
        /** @type {?} */
        const comp = this.curCompMap[lastItem.outlet];
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
    }
    /**
     * @private
     * @param {?=} event
     * @return {?}
     */
    onNavEnd(event) {
        if (!(event instanceof NavigationEnd)) {
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
            const url = location.href;
            /** @type {?} */
            const hashPtr = url.indexOf('#');
            /** @type {?} */
            const urlPrefix = hashPtr === -1 ? url : url.substr(0, hashPtr);
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
        let refIndex;
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
        const outletEntry = this.curCompMap[this.curOutlet];
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
        const urlStack = this.urlStack[refIndex];
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
    }
    /**
     * @private
     * @param {?} outletEntry
     * @return {?}
     */
    setComponentParams(outletEntry) {
        if (!outletEntry.component.onRouterInit)
            return;
        /** @type {?} */
        const params = this.router.routerState.root.snapshot.queryParams;
        /** @type {?} */
        const qp = params.nc_paramsId ? this.curQueryParam : params;
        if (isEqual(qp, outletEntry.lastParams)) {
            this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'Skipping onRouterInit as parameters are same');
            return;
        }
        outletEntry.component.onRouterInit(qp, !outletEntry.invCount);
        outletEntry.invCount++;
        outletEntry.lastParams = qp;
    }
    /**
     * @private
     * @return {?}
     */
    syncBrowserHistory() {
        /** @type {?} */
        const browserStack = this.browserStack;
        /** @type {?} */
        const urlStack = this.urlStack;
        /** @type {?} */
        const stackLen = urlStack.length;
        /** @type {?} */
        let fromIndex = -1
        // sync browserStack
        ;
        // sync browserStack
        for (let index = 0; index < stackLen; index++) {
            if (fromIndex === -1 &&
                (browserStack.length === index || browserStack[index] !== urlStack[index].url)) {
                fromIndex = index;
                break;
            }
        }
        this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'syncBrowserHistory', { fromIndex, stackLen, browserStackLen: browserStack.length });
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
    }
    /**
     * @private
     * @return {?}
     */
    browserGotoRoot() {
        this.rcBrowser.isAssert() && this.rcBrowser.assert(this.rcBrowser.getName(this), this.historyWrapper.getState().index >= 0);
        /** @type {?} */
        const totalDistance = this.historyWrapper.getState().index;
        /** @type {?} */
        const distanceFromRoot = -1 * totalDistance - 1;
        this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'browserGotoRoot', {
            distanceFromRoot,
            stackLen: this.urlStack.length,
            browserStackLen: this.browserStack.length
        });
        this.codePop = true;
        this.historyWrapper.go(distanceFromRoot);
        if (this.iframeHistLength)
            this.iframeHistLength = 0;
    }
    /*--------------------------------------------------------------------------------------------------------------
        Register components for reference by rest of the system
      --------------------------------------------------------------------------------------------------------------*/
    /**
     * @param {?} compName
     * @param {?} component
     * @return {?}
     */
    registerComponent(compName, component) {
        /** @type {?} */
        const oldComponent = this.componentRegistry[compName];
        if (oldComponent === component)
            return;
        this.componentRegistry[compName] = component;
        this.rcBrowser.isStatus() && this.rcBrowser.status(this.rcBrowser.getName(this), 'Registered component with name', compName);
    }
    /**
     * @param {?} compName
     * @return {?}
     */
    getComponent(compName) {
        return this.componentRegistry[compName];
    }
    /**
     * @param {?} url
     * @param {?} outlet
     * @param {?} lastNavMethod
     * @return {?}
     */
    onMubbleScreenChange(url, outlet, lastNavMethod) {
    }
    /**
     * @param {?} url
     * @param {?} lastNavMethod
     * @return {?}
     */
    onMubbleScreenNavEnd(url, lastNavMethod) {
    }
    /**
     * @return {?}
     */
    notifyUserBackPress() {
        return true;
    }
    /**
     * @return {?}
     */
    notifyAppClose() {
    }
    /**
     * @return {?}
     */
    isToolTipShown() {
        return true;
    }
    /**
     * @return {?}
     */
    removeOverlayIfExists() {
    }
}
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
class HistoryWrapper {
    /**
     * @param {?} rc
     * @param {?} isSdkApp
     */
    constructor(rc, isSdkApp) {
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
    pushState(state, title, url) {
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
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    replaceState(state, title, url) {
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
    }
    /**
     * @param {?} delta
     * @return {?}
     */
    go(delta) {
        if (this.isSdkApp)
            return;
        history.go(delta);
    }
    /**
     * @return {?}
     */
    getState() {
        if (this.isSdkApp)
            return;
        return history.state;
    }
    /**
     * @return {?}
     */
    getLength() {
        if (this.isSdkApp)
            return;
        return history.length;
    }
}
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
class InjectionParentBase {
    /**
     * @param {?} rc
     * @param {?} router
     * @param {?} componentFactoryResolver
     * @param {?} route
     */
    constructor(rc, router, componentFactoryResolver, route) {
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
    onRouterInit(params, injectAt, showTitle) {
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
    }
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
    injectComponent(compName, injectAt) {
        /** @type {?} */
        const component = this.router.getComponent(compName);
        this.rc.isAssert() && this.rc.assert(this.rc.getName(this), component);
        /** @type {?} */
        const factory = this.componentFactoryResolver.resolveComponentFactory(component);
        this.icRef = injectAt.createComponent(factory);
        this.icRef.changeDetectorRef.detectChanges();
        this.injectedComponent = this.icRef.instance;
        this.rc.isStatus() && this.rc.status(this.rc.getName(this), 'Injected component with', { injected: !!this.injectedComponent, factory: !!factory });
    }
    /**
     * @return {?}
     */
    close() {
        this.childRequestedClose = true;
        this.router.goBack();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.icRef)
            this.icRef.destroy();
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const STATE = { HALF: 'HALF', FULL: 'FULL' };
/** @type {?} */
const ROUTE_ANIM_MS = 400;
/** @type {?} */
const PAN_ANIM_MS = '300ms';
/** @type {?} */
const QUICK_ANIM_MS$1 = DomHelper.getQuickAnim();
/** @type {?} */
const COMMIT_RATIO = 1 / 3;
/** @type {?} */
const FAST_COMMIT_RATIO = COMMIT_RATIO / 2;
/** @type {?} */
const QUICK_SPEED = .3;
class BottomInComponent extends InjectionParentBase {
    /**
     * @param {?} rc
     * @param {?} router
     * @param {?} route
     * @param {?} componentFactoryResolver
     * @param {?} renderer
     * @param {?} ref
     */
    constructor(rc, router, route, componentFactoryResolver, renderer, ref) {
        super(rc, router, componentFactoryResolver, route);
        this.renderer = renderer;
        this.ref = ref;
        this.__routeAnimation = null;
        this.animElem = true;
        this.title = '';
        this.state = STATE.HALF;
        this.allowFullPage = true;
        this.routeEndProcessed = false;
        rc.setupLogger(this, 'BottomIn', LOG_LEVEL.DEBUG);
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'constructor');
        if (rc.getGlobalLogLevel() === LOG_LEVEL.DEBUG) {
            window['bi'] = this;
        }
    }
    // @HostBinding('style.z-index')   zIndex   = 2000
    /**
     * @param {?} event
     * @return {?}
     */
    onHostClick(event) {
        if (this.state === STATE.HALF) {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Dismissing bottom-in due to host click');
            this.animateClose();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onRouteAnimationStart(event) {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onRouteAnimation-start', event);
        // console.log(event)
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onRouteAnimationDone(event) {
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
    }
    /**
     * @param {?} params
     * @return {?}
     */
    onRouterInit(params) {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onRouterInit');
        super.onRouterInit(params, this.injectAt, false);
        this.title = this.injectedComponent.getTitle();
        /** @type {?} */
        let halfHeight = this.injectedComponent.getHalfHeight();
        if (this.injectedComponent.getDefaultState) {
            this.state = this.injectedComponent.getDefaultState();
        }
        if (this.state === STATE.FULL) {
            halfHeight = document.body.clientHeight;
        }
        else if (halfHeight) {
            if (halfHeight > document.body.clientHeight) {
                this.rc.isError() && this.rc.error(this.rc.getName(this), 'Half height passed is incorrect', { halfHeight, clientHeight: document.body.clientHeight });
                halfHeight = 0.8 * document.body.clientHeight;
            }
            this.top = document.body.clientHeight - halfHeight;
        }
        else {
            this.allowFullPage = false;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'ngAfterViewInit')
        this.panYMax = document.body.clientHeight;
        /** @type {?} */
        const $compCont = this.compContainer.nativeElement;
        /** @type {?} */
        const compHeight = $compCont.clientHeight;
        /** @type {?} */
        const headerHeight = this.header.nativeElement.getBoundingClientRect().height;
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
            compHeight, headerHeight,
            top: this.top
        });
        this.main.nativeElement.style.transform = DomHelper.getTransform(0, this.top, 0).transform;
        this.nail = new Nail(this.rc, this.main.nativeElement, this, this.renderer, { axisX: false, axisY: true });
        this.ref.detectChanges();
    }
    /**
     * @return {?}
     */
    onPanStart() {
        this.startTop = this.compContainer.nativeElement.scrollTop;
        // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onPanStart', {
        //   panY: this.panY, state: this.state})
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onPanMove(event) {
        /** @type {?} */
        let deltaY = event.deltaY;
        if (this.compContainer.nativeElement.scrollTop) {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'cancelling panMove', { scrollTop: this.compContainer.nativeElement.scrollTop });
            return false;
        }
        if (deltaY > 0)
            deltaY -= this.startTop;
        /** @type {?} */
        let y = (this.state === STATE.HALF ? this.top : this.panYMin) + deltaY;
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
        const needAnimate = this.panY !== y;
        if (needAnimate)
            this.nail.requestAnimate(y);
        return needAnimate;
    }
    /**
     * @param {?} y
     * @return {?}
     */
    onPanAnimate(y) {
        this.animateChange(y, false);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onPanEnd(event) {
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'ngOnDestroy');
        super.ngOnDestroy();
        if (this.nail)
            this.nail.destroy();
    }
    /**
     * @param {?} runAnimation
     * @return {?}
     */
    onHalf(runAnimation) {
        this.state = STATE.HALF;
        this.animateChange(this.top, runAnimation);
    }
    /**
     * @param {?} runAnimation
     * @return {?}
     */
    onFull(runAnimation) {
        this.state = STATE.FULL;
        this.animateChange(this.panYMin, runAnimation);
    }
    /**
     * @param {?} y
     * @param {?} runAnimation
     * @return {?}
     */
    animateChange(y, runAnimation) {
        if (this.panY !== y) {
            this.panY = y;
            /** @type {?} */
            const animValue = runAnimation ? PAN_ANIM_MS : QUICK_ANIM_MS$1;
            if (this.animValue !== animValue) {
                this.animValue = animValue;
                this.main.nativeElement.style.transition = animValue;
            }
            DomHelper.setTransform(this.main.nativeElement, 0, y, 0);
        }
    }
    /**
     * @return {?}
     */
    animateClose() {
        this.injectedComponent.closeFromParent();
        this.router.goBack();
    }
    /**
     * @return {?}
     */
    onBackPressed() {
        this.backPressed = true;
    }
}
BottomInComponent.decorators = [
    { type: Component, args: [{
                selector: 'bottom-in',
                template: "<div class=\"bottom-in-comp\">\n  <div class=\"main bottom-in-container glb-animated-element\" (click)=\"onClick($event)\" #main>\n\n    <div #header>\n\n      <header *ngIf=\"allowFullPage\" class=\"test-bottom-in-toolabr bottom-in-toolbar-outline nc-toolbar\">\n        <span class=\"toolbar-title title text-body-supp text-size-medium test-bottom-in-title\">{{title}}</span>\n\n        <div *ngIf=\"state !== 'FULL'\" (click)=\"onFull(true)\" class=\"toolbar-right-ic-btn\">\n          <i class=\"modal-right-ic test-bottom-in-more fa fa-angle-up\" aria-hidden=\"true\"></i>\n        </div>\n        <div *ngIf=\"state === 'FULL'\" (click)=\"animateClose()\" class=\"toolbar-right-ic-btn\">\n          <i class=\"modal-right-ic test-bottom-in-more fa fa-angle-down\" aria-hidden=\"true\"></i>\n        </div>\n      </header>\n\n      <header *ngIf=\"!allowFullPage && title\" class=\"nc-small-toolbar text-heading\">\n        <span class=\"title test-bottom-in-title\">{{title}}</span>\n      </header>\n\n    </div>\n\n    <div class=\"component-container\" #compContainer>\n      <ng-template #injectAt></ng-template>\n    </div>\n\n  </div>\n</div>\n",
                animations: [
                    trigger('routeAnimation', [
                        transition(':enter', [
                            group([
                                query(':self', [
                                    style({
                                        opacity: 0
                                    }),
                                    animate(ROUTE_ANIM_MS, style({
                                        opacity: 1
                                    }))
                                ]),
                                query('div.main', [
                                    style(DomHelper.getPercentTransform(0, 100)),
                                    animate(ROUTE_ANIM_MS, style('*'))
                                ])
                            ])
                        ]),
                        transition(':leave', [
                            group([
                                animate(ROUTE_ANIM_MS, style({
                                    opacity: 0
                                })),
                                query('div.main', [
                                    animate(ROUTE_ANIM_MS, style({
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
BottomInComponent.ctorParameters = () => [
    { type: RunContextBrowser, decorators: [{ type: Inject, args: ['RunContext',] }] },
    { type: UiRouter },
    { type: ActivatedRoute },
    { type: ComponentFactoryResolver },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
BottomInComponent.propDecorators = {
    __routeAnimation: [{ type: HostBinding, args: ['@routeAnimation',] }],
    animElem: [{ type: HostBinding, args: ['class.glb-animated-element',] }],
    onHostClick: [{ type: HostListener, args: ['click', ['$event.target'],] }],
    onRouteAnimationStart: [{ type: HostListener, args: ['@routeAnimation.start', ['$event'],] }],
    onRouteAnimationDone: [{ type: HostListener, args: ['@routeAnimation.done', ['$event'],] }],
    main: [{ type: ViewChild, args: ['main', { static: true },] }],
    header: [{ type: ViewChild, args: ['header', { static: true },] }],
    compContainer: [{ type: ViewChild, args: ['compContainer', { static: true },] }],
    injectAt: [{ type: ViewChild, args: ['injectAt', { read: ViewContainerRef, static: true },] }],
    title: [{ type: Input }],
    state: [{ type: Input }],
    allowFullPage: [{ type: Input }]
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const ROUTE_ANIM_MS$1 = 400;
class ModalPopupComponent extends InjectionParentBase {
    /**
     * @param {?} rc
     * @param {?} router
     * @param {?} route
     * @param {?} componentFactoryResolver
     * @param {?} renderer
     * @param {?} ref
     */
    constructor(rc, router, route, componentFactoryResolver, renderer, ref) {
        super(rc, router, componentFactoryResolver, route);
        this.renderer = renderer;
        this.ref = ref;
        this.__routeAnimation = true;
        this.animElem = true;
        this.routeEndProcessed = false;
        this.width = "75vw";
        rc.setupLogger(this, 'ModalPopup', LOG_LEVEL.DEBUG);
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'constructor');
    }
    // @HostBinding('style.z-index')   zIndex   = 3000;
    // @HostBinding('style.background-color') bg   = 'rgba(0,0,0,.5)'
    /**
     * @param {?} event
     * @return {?}
     */
    onHostClick(event) {
        this.animateClose();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onRouteAnimationStart(event) {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onRouteAnimation-start', event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onRouteAnimationDone(event) {
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
    }
    /**
     * @param {?} params
     * @return {?}
     */
    onRouterInit(params) {
        super.onRouterInit(params, this.injectAt, true);
        this.width = this.injectedComponent.getWidth();
        if (this.injectedComponent.getCssClassName) {
            this.className = this.injectedComponent.getCssClassName();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'ngAfterViewInit');
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    ignoreScroll(event) {
        /** @type {?} */
        const notScrollable = this.injectedComponent.isNotScrollable
            && this.injectedComponent.isNotScrollable();
        if (notScrollable) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        this.rc.isStatus() && this.rc.status(this.rc.getName(this), 'ngOnDestroy');
    }
    /**
     * @return {?}
     */
    animateClose() {
        if (this.injectedComponent.isNotDismissable &&
            this.injectedComponent.isNotDismissable()) {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Wont dismiss popup');
        }
        else {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Dismissing modal popup in due to host click');
            this.router.goBack();
        }
    }
    /**
     * @return {?}
     */
    onBackPressed() {
        this.backPressed = true;
    }
    /**
     * @return {?}
     */
    canGoBack() {
        /** @type {?} */
        const childComponent = this.injectedComponent;
        return childComponent.canGoBack ? childComponent.canGoBack() : true;
    }
}
ModalPopupComponent.decorators = [
    { type: Component, args: [{
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
                    trigger('routeAnimation', [
                        transition(':enter', [
                            group([
                                query(':self', [
                                    style({
                                        opacity: 0
                                    }),
                                    animate(ROUTE_ANIM_MS$1, style({
                                        opacity: 1
                                    }))
                                ]),
                                query('div.modal-root-div', [
                                    style({
                                        transform: 'rotateX(90deg)'
                                    }),
                                    animate(ROUTE_ANIM_MS$1, style('*'))
                                ])
                            ])
                        ]),
                        transition(':leave', [
                            group([
                                animate(ROUTE_ANIM_MS$1, style({
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
ModalPopupComponent.ctorParameters = () => [
    { type: RunContextBrowser, decorators: [{ type: Inject, args: ['RunContext',] }] },
    { type: UiRouter },
    { type: ActivatedRoute },
    { type: ComponentFactoryResolver },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
ModalPopupComponent.propDecorators = {
    true: [{ type: HostBinding, args: ['class.glb-flex-centered',] }],
    __routeAnimation: [{ type: HostBinding, args: ['@routeAnimation',] }],
    animElem: [{ type: HostBinding, args: ['class.glb-animated-element',] }],
    onHostClick: [{ type: HostListener, args: ['click', ['$event.target'],] }],
    onRouteAnimationStart: [{ type: HostListener, args: ['@routeAnimation.start', ['$event'],] }],
    onRouteAnimationDone: [{ type: HostListener, args: ['@routeAnimation.done', ['$event'],] }],
    componentContainer: [{ type: ViewChild, args: ['componentContainer', { static: true },] }],
    injectAt: [{ type: ViewChild, args: ['injectAt', { read: ViewContainerRef, static: true },] }],
    width: [{ type: Input }],
    className: [{ type: Input }]
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
class LoadingOverlayComponent {
    constructor() {
    }
}
LoadingOverlayComponent.decorators = [
    { type: Component, args: [{
                selector: 'loading-overlay',
                template: "<div class=\"loading-overlay-comp loading-overlay-root\">\n  <div class=\"component-loader\"\n      [ngClass.xl]=\"['web-comp-width']\"\n      [ngClass.lg]=\"['web-comp-width']\"\n      [ngClass.md]=\"['web-comp-width']\"\n      [ngClass.sm]=\"['web-comp-width']\">\n      <div class=\"spinner-cont\">\n        <i class=\"spinner fa fa-spinner fa-pulse fa-3x fa-fw text-color-primary\"></i>\n      </div>\n      <div class=\"loading-text txt-xl-med-norm\">{{loadingText}}</div>\n  </div>\n</div>",
                styles: [".loading-overlay-root{background-color:rgba(0,0,0,.2);height:100vh;position:absolute;top:0;width:100vw;z-index:60}.component-loader{align-items:center;border-color:transparent;border-radius:10px;border-style:solid;display:flex;flex-flow:row;height:14vh;margin:0 auto;position:relative;top:45%;width:90%}.spinner-cont{flex:0 0 30%}.loading-text{flex:0 0 70%}.spinner{margin:0 auto 0 10%}.web-comp-width{min-width:300px;width:20%}"]
            }] }
];
/** @nocollapse */
LoadingOverlayComponent.ctorParameters = () => [];
LoadingOverlayComponent.propDecorators = {
    loadingText: [{ type: Input }]
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
const LANG_EN_TRANS = {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const muDictionary = {
    [Mubble.Lang.English]: LANG_EN_TRANS
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const TRANSLATIONS = new InjectionToken('translations');
const ɵ0 = muDictionary;
/** @type {?} */
const TRANSLATION_PROVIDERS = [
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
    Object.keys(muDictionary).forEach((/**
     * @param {?} key
     * @return {?}
     */
    (key) => {
        /** @type {?} */
        const value = muDictionary[key];
        if (dictionary[key])
            muDictionary[key] = Object.assign(value, dictionary[key]);
    }));
    return muDictionary;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const PLACEHOLDER = '%';
class TranslateService {
    /**
     * @param {?} rc
     * @param {?} _translations
     */
    constructor(rc, _translations) {
        this.rc = rc;
        this._translations = _translations;
        this.defaultLang = Mubble.Lang.English;
        this.fallback = true;
        if (Array.isArray(this._translations)) {
            /** @type {?} */
            const obj = {};
            for (const translate of this._translations) {
                /** @type {?} */
                const keys = Object.keys(translate);
                for (const key of keys) {
                    if (!obj[key]) {
                        obj[key] = translate[key];
                    }
                    else {
                        Object.assign(obj[key], translate[key]);
                    }
                }
            }
            this._translations = obj;
        }
        else {
            throw new Error(`Translations Error. Expected type array. Actual ${typeof this._translations} ${JSON.stringify(this._translations)}`);
        }
    }
    /**
     * @return {?}
     */
    getCurrentLanguage() {
        return this.currentLang || this.defaultLang;
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    setDefaultLanguage(lang) {
        this.defaultLang = lang;
    }
    /**
     * @param {?} enable
     * @return {?}
     */
    enableFallback(enable) {
        this.fallback = enable;
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    use(lang) {
        this.currentLang = lang;
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    translate(key) {
        /** @type {?} */
        let translation = key
        // found in current language
        ;
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
    }
    /**
     * @param {?} langObj
     * @param {?} lang
     * @return {?}
     */
    addTranslations(langObj, lang) {
        Object.assign(this._translations[lang], langObj);
    }
    /**
     * @param {?} key
     * @param {?=} words
     * @return {?}
     */
    instant(key, words) {
        // add optional parameter
        /** @type {?} */
        const translation = this.translate(key);
        if (!words)
            return translation;
        return this.replace(translation, words);
    }
    /**
     * @param {?=} word
     * @param {?=} words
     * @return {?}
     */
    replace(word = '', words = '') {
        /** @type {?} */
        let translation = word;
        /** @type {?} */
        const values = [].concat(words);
        values.forEach((/**
         * @param {?} e
         * @param {?} i
         * @return {?}
         */
        (e, i) => {
            translation = translation.replace(PLACEHOLDER.concat((/** @type {?} */ (i))), e);
        }));
        return translation;
    }
    /**
     * @param {?} langObj
     * @param {?} lang
     * @return {?}
     */
    addMoreTranslations(langObj, lang) {
        this._translations[lang] = Object.assign(Object.assign({}, langObj), this._translations[lang]);
    }
}
TranslateService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
TranslateService.ctorParameters = () => [
    { type: RunContextBrowser, decorators: [{ type: Inject, args: ['RunContext',] }] },
    { type: undefined, decorators: [{ type: Inject, args: [TRANSLATIONS,] }] }
];
/** @nocollapse */ TranslateService.ɵprov = ɵɵdefineInjectable({ factory: function TranslateService_Factory() { return new TranslateService(ɵɵinject("RunContext"), ɵɵinject(TRANSLATIONS)); }, token: TranslateService, providedIn: "root" });
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const CONTEXT = {
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
class FilterComponent {
    /**
     * @param {?} rc
     * @param {?} translate
     */
    constructor(rc, translate) {
        this.rc = rc;
        this.translate = translate;
        this.filterItems = [];
        this.webMode = false; //if we want to use filter component as full page
        //if we want to use filter component as full page
        this.displayCount = 1;
        this.displayMode = DISPLAY_MODE.HORIZONTAL;
        this.selectedFilter = new EventEmitter();
        this.stepSelectedFilter = new EventEmitter();
        this.filters = [];
        this.DISPLAY_MODE = DISPLAY_MODE;
        this.filterChips = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.applyBtnText = this.applyBtnTitle ? this.applyBtnTitle
            : this.translate.instant('mu_fltr_aply_fltr');
        this.initialize(CONTEXT.INIT);
    }
    /*=====================================================================
                                  UTILS
      =====================================================================*/
    /**
     * @param {?} lastFilters
     * @return {?}
     */
    updateLastAppliedFilters(lastFilters) {
        this.filterItems = lastFilters;
        this.initialize(CONTEXT.UPDATE);
    }
    /*=====================================================================
                                      HTML
      =====================================================================*/
    /**
     * @return {?}
     */
    applyFilters() {
        this.filterChips = [];
        /** @type {?} */
        const inputContInstances = this.inputContInstances.toArray();
        inputContInstances.forEach((/**
         * @param {?} inputContInstance
         * @return {?}
         */
        inputContInstance => {
            inputContInstance.onSubmit();
        }));
        if (this.hasError())
            return;
        if (!this.valueChanged()) {
            this.selectedFilter.emit([]); //empty array indicates that the previous filters and current filters are same
            return;
        }
        this.selectedFilter.emit(this.filters);
    }
    /**
     * @return {?}
     */
    clearFilters() {
        /** @type {?} */
        const inputContInstances = this.inputContInstances.toArray();
        inputContInstances.forEach((/**
         * @param {?} inputContInstance
         * @return {?}
         */
        inputContInstance => {
            inputContInstance.onSubmit();
        }));
        this.initialize(CONTEXT.CLEAR);
        this.filterChips = [];
        this.selectedFilter.emit(undefined); //on clearing, we just return undefined
    }
    /**
     * @param {?} event
     * @return {?}
     */
    setFilterItems(event) {
        this.setFilterChips(event);
        /** @type {?} */
        const index = this.filters.findIndex((/**
         * @param {?} element
         * @return {?}
         */
        element => element.id === event.id));
        this.filters[index].value = event.value;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onFilterSelected(event) {
        this.stepSelectedFilter.emit(event);
    }
    /**
     * @param {?} filterItems
     * @return {?}
     */
    resetFilters(filterItems) {
        for (const fItem of filterItems) {
            /** @type {?} */
            const currentIdx = this.filterItems.findIndex((/**
             * @param {?} val
             * @return {?}
             */
            val => val.params.id === fItem.params.id));
            if (currentIdx == -1)
                continue;
            this.filterItems.splice(currentIdx, 1, fItem);
        }
    }
    /*=====================================================================
                                      PRIVATE
      =====================================================================*/
    /**
     * @private
     * @return {?}
     */
    hasError() {
        /** @type {?} */
        const inputContInstances = this.inputContInstances.toArray();
        return inputContInstances.some((/**
         * @param {?} inputContInstance
         * @return {?}
         */
        inputContInstance => {
            return inputContInstance.hasError();
        }));
    }
    /**
     * @private
     * @return {?}
     */
    valueChanged() {
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
        for (const fItem of this.filterItems) {
            /** @type {?} */
            const index = this.filters.findIndex((/**
             * @param {?} element
             * @return {?}
             */
            element => element.id === fItem.params.id));
            /** @type {?} */
            let changed = false
            //checking if the previous filter value has changed or not according to the display type
            ;
            //checking if the previous filter value has changed or not according to the display type
            switch (fItem.params.displayType) {
                case DISPLAY_TYPE.CALENDAR_BOX:
                case DISPLAY_TYPE.INPUT_BOX:
                case DISPLAY_TYPE.SELECTION_BOX:
                case DISPLAY_TYPE.ROW_INPUT_BOX:
                case DISPLAY_TYPE.MULTI_CHECK_BOX:
                case DISPLAY_TYPE.DROPDOWN_MULTI_CHECK_BOX:
                case DISPLAY_TYPE.RADIO:
                case DISPLAY_TYPE.AUTOCOMPLETE_SELECT:
                case DISPLAY_TYPE.SLIDER:
                    (!fItem.params.value && !this.filters[index].value)
                        ? changed = false
                        : changed = fItem.params.value !== this.filters[index].value;
                    break;
                case DISPLAY_TYPE.DATE_RANGE:
                    /** @type {?} */
                    const dateRangeKeys = fItem.params.rangeKeys || ['startDate', 'endDate'];
                    ((!fItem.params.value[dateRangeKeys[0]] && !this.filters[index].value[dateRangeKeys[0]]) &&
                        (!fItem.params.value[dateRangeKeys[1]] && !this.filters[index].value[dateRangeKeys[1]]))
                        ? changed = false
                        : changed = (fItem.params.value[dateRangeKeys[0]] !== this.filters[index].value[dateRangeKeys[0]]) ||
                            (fItem.params.value[dateRangeKeys[1]] !== this.filters[index].value[dateRangeKeys[1]]);
                    break;
                case DISPLAY_TYPE.NUMBER_RANGE:
                    /** @type {?} */
                    const numRangeKeys = fItem.params.rangeKeys || ['minAmount', 'maxAmount'];
                    ((!fItem.params.value[numRangeKeys[0]] && !this.filters[index].value[numRangeKeys[0]]) &&
                        (!fItem.params.value[numRangeKeys[1]] && !this.filters[index].value[numRangeKeys[1]]))
                        ? changed = false
                        : changed = (fItem.params.value[numRangeKeys[0]] !== this.filters[index].value[numRangeKeys[0]]) ||
                            (fItem.params.value[numRangeKeys[1]] !== this.filters[index].value[numRangeKeys[1]]);
                    break;
            }
            // isEqual(existingFilterItems, this.filters), changed)
            if (changed)
                return changed;
        }
        return false;
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    initialize(context) {
        if (context === CONTEXT.INIT) {
            for (const fItem of this.filterItems) {
                this.filters.push({ id: fItem.params.id, value: fItem.params.value, mode: fItem.mode, displayType: fItem.params.displayType });
            }
        }
        else if (context === CONTEXT.CLEAR) {
            this.filters = [];
            /** @type {?} */
            const fItems = [];
            for (const fItem of this.filterItems) {
                /** @type {?} */
                const setNull = fItem.params.displayType === DISPLAY_TYPE.DATE_RANGE
                    ? { startDate: null, endDate: null }
                    : fItem.params.displayType === DISPLAY_TYPE.NUMBER_RANGE
                        ? { minAmount: null, maxAmount: null }
                        : null;
                fItem.params.value = setNull;
                fItems.push({
                    params: fItem.params,
                    mode: fItem.mode
                });
                this.filters.push({ id: fItem.params.id, value: setNull, mode: fItem.mode, displayType: fItem.params.displayType });
            }
            this.filterItems = [];
            this.filterItems = fItems;
        }
        else {
            /** @type {?} */
            const fItems = [];
            /** @type {?} */
            const filters = [];
            for (const fItem of this.filterItems) {
                /** @type {?} */
                const currentValue = this.filters.find((/**
                 * @param {?} val
                 * @return {?}
                 */
                val => val.id === fItem.params.id && fItem.params.value));
                fItem.params.value = currentValue ? currentValue.value : null;
                fItems.push({
                    params: fItem.params,
                    mode: fItem.mode,
                });
                filters.push({ id: fItem.params.id, value: fItem.params.value, mode: fItem.mode, displayType: fItem.params.displayType });
            }
            this.filterItems = [];
            this.filterItems = fItems;
            this.filters = filters;
        }
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    setFilterChips(event) {
        switch (event.displayType) {
            case DISPLAY_TYPE.CALENDAR_BOX:
                //Do we need it?
                break;
            case DISPLAY_TYPE.INPUT_BOX:
            case DISPLAY_TYPE.ROW_INPUT_BOX:
                if (event.value)
                    this.filterChips.push(event.value);
                break;
            case DISPLAY_TYPE.MULTI_CHECK_BOX:
            case DISPLAY_TYPE.DROPDOWN_MULTI_CHECK_BOX:
                if (event.value) {
                    /** @type {?} */
                    const checkboxValues = event.value;
                    checkboxValues.forEach((/**
                     * @param {?} val
                     * @return {?}
                     */
                    val => {
                        this.filterChips.push(val.value);
                    }));
                }
                break;
            case DISPLAY_TYPE.SELECTION_BOX:
            case DISPLAY_TYPE.RADIO:
            case DISPLAY_TYPE.AUTOCOMPLETE_SELECT:
            case DISPLAY_TYPE.SLIDER:
                if (event.value)
                    this.filterChips.push(event.value.value);
                break;
            case DISPLAY_TYPE.DATE_RANGE:
                //Do we need it?
                break;
            case DISPLAY_TYPE.NUMBER_RANGE:
                //Do we need it?
                break;
        }
    }
}
FilterComponent.decorators = [
    { type: Component, args: [{
                selector: 'filter',
                template: "<div  [ngClass]=\"webMode ? 'nc-web-view-filter-comp' : 'filter-comp'\"\n      [class.vertical-mode]=\"displayMode === DISPLAY_MODE.VERTICAL\"\n      [ngClass.xl]=\"webMode ? 'web-view-filter-comp' : 'web-filter-comp'\" \n      [ngClass.lg]=\"webMode ? 'web-view-filter-comp' : 'web-filter-comp'\" \n      [ngClass.md]=\"webMode ? 'web-view-filter-comp' : 'web-filter-comp'\"\n      [ngClass.sm]=\"webMode ? 'web-view-filter-comp' : 'web-filter-comp'\" mweb #parent>\n\n  <div class=\"filter-subtitle  primary-bg-light\">\n    <div class=\"head-cont\">\n      <span class=\"txt-xl-med-dark\"> {{ 'mu_fltr_sub_titl' | translate }} </span> \n      <span *ngIf=\"displayMode === DISPLAY_MODE.VERTICAL\" (click)=\"clearFilters()\"\n        class=\"txt-lg-med-norm\">\n        {{ 'mu_fltr_clr_all' | translate }} \n      </span>\n    </div>\n    <div class=\"chip-list\" *ngIf=\"filterChips.length\">\n      <div class=\"chip txt-lg-reg-dark\" *ngFor=\"let chip of filterChips\">\n          {{ chip }}\n      </div>\n    </div>\n  </div>\n\n  <div class=\"filter-content-body\">\n\n    <div class=\"single-filter-cont\" *ngFor=\"let fItem of filterItems; let i = index\"\n      adjustElements [displayInSingleRow]=\"displayCount\" [elementIndex]=\"i\" [webMode]=\"webMode\">\n      <div class=\"input-title txt-lg-bld-dark\">\n        {{ fItem.params.label }}\n\n        <span class=\"txt-lg-reg-norm error-text\" *ngIf=\"fItem.params.isRequired\">\n          {{ 'mu_fltr_rqrd' | translate }}\n        </span>\n      </div>\n\n      <div class=\"single-input-cont\">\n        <input-container\n          [inputParams]=\"fItem.params\"\n          [displayMode]=\"displayMode\"\n          [screen]=\"screen\"\n          [displayLabel]=\"false\"\n          [webMode]=\"webMode\"\n          [parentCont]=\"parent\"\n          (value)=\"setFilterItems($event)\"\n          (stepSelectedFilter)=\"onFilterSelected($event)\"\n          #inputCont>\n        </input-container>\n      </div>\n    </div>\n  </div>\n\n  <footer class=\"footer\">\n    <button class=\"button-primary btn sdk-button\" (click)=\"applyFilters()\">\n      {{ applyBtnText }}\n    </button>\n\n    <button class=\"button-primary btn sdk-button\" (click)=\"clearFilters()\"\n      *ngIf=\"displayMode !== DISPLAY_MODE.VERTICAL\">\n      {{ 'mu_fltr_clr_fltr' | translate }}\n    </button>\n  </footer>\n\n</div>",
                styles: [".filter-comp{display:flex;flex-direction:column;height:100%;width:100%}.input-title{padding:3vw 4vw 0}.filter-content-body{max-height:70%;overflow-y:auto}.filter-content-body::-webkit-scrollbar{width:5px}.filter-subtitle,.footer{padding:2% 4%}.footer{bottom:0;display:flex;justify-content:space-between;left:0;position:absolute;width:92%}.footer .button-primary{margin:0!important}.btn{width:46%}.web-filter-comp{display:flex;flex-direction:column;overflow-y:auto}.web-filter-comp .input-title{padding:10px 0 0 4%;width:120px}.web-filter-comp .filter-subtitle{padding:10px 4%}.web-filter-comp .filter-content-body{flex-direction:row}.web-filter-comp .single-input-cont{width:calc(100% - 120px)}.web-filter-comp .single-filter-cont{align-items:baseline;display:flex;flex-direction:row}.web-filter-comp .footer{display:flex;justify-content:space-between;margin:auto;padding:2% 1%;position:relative;width:98%}.web-filter-comp .footer .button-primary{margin:0 auto!important}.web-filter-comp .btn{width:43%}.web-view-filter-comp{display:flex;flex-direction:column;height:auto!important;overflow-y:auto}.web-view-filter-comp .filter-subtitle{height:10%;max-height:10%;padding:4px 6px}.web-view-filter-comp .filter-content-body{display:flex;flex-wrap:wrap;height:auto;overflow-y:auto}.web-view-filter-comp .filter-content-body::-webkit-scrollbar{width:2px}.web-view-filter-comp .btn{width:auto}.web-view-filter-comp .single-filter-cont{align-items:center;display:flex;flex-direction:row;justify-content:space-between}.web-view-filter-comp .input-title{padding:6px;width:90px}.web-view-filter-comp .single-input-cont{padding:4px 0;width:calc(100% - 90px)}.web-view-filter-comp .left{margin-left:24px;width:calc(33% - 24px)}.web-view-filter-comp .right{margin-right:24px;width:calc(33% - 24px)}.web-view-filter-comp .middle{margin:0 12px;width:calc(33% - 24px)}.web-view-filter-comp .footer{display:block;height:20%;padding:1%;position:relative;width:98%}.web-view-filter-comp .footer .button-primary{float:right;height:2rem;margin:1px 6px!important;padding:6px}.nc-web-view-filter-comp{display:flex;flex-direction:column;height:auto!important;overflow-y:auto}.nc-web-view-filter-comp .filter-subtitle{padding:2vw 5vw}.nc-web-view-filter-comp .filter-content-body{display:flex;flex-wrap:wrap;height:auto;overflow-y:auto;padding:0 5vw}.nc-web-view-filter-comp .single-filter-cont{align-items:center;display:flex;flex-direction:row;width:50%}.nc-web-view-filter-comp .input-title{width:90px}.nc-web-view-filter-comp .single-input-cont{width:calc(100% - 90px)}.nc-web-view-filter-comp .start{padding-left:4vw}.nc-web-view-filter-comp .end{padding-right:4vw}.nc-web-view-filter-comp .footer{display:flex;height:auto;padding:2vw 5vw;position:relative;width:100%}.nc-web-view-filter-comp .footer .button-primary{height:2rem;margin:1px 6px!important;padding:6px}.web-filter-comp .head-cont{display:flex;justify-content:space-between}.web-filter-comp .chip-list{display:flex;flex-wrap:wrap;padding:10px 0 0}.web-filter-comp .chip{background-color:#d8d8d8;border-radius:5px;margin:2px;padding:7px 10px;word-break:break-word}.web-view-filter-comp .head-cont{display:flex;justify-content:space-between}.web-view-filter-comp .chip-list{display:flex;flex-wrap:wrap;padding:10px 0 0}.web-view-filter-comp .chip{background-color:#d8d8d8;border-radius:5px;margin:2px;padding:7px 10px;word-break:break-word}.vertical-mode{box-shadow:0 2px 5px 0 rgba(0,0,0,.2);max-height:100%!important}.vertical-mode .filter-content-body{max-height:none!important}.vertical-mode .single-filter-cont{align-items:flex-start;border-bottom:1px solid #dedede;flex-direction:column!important;padding:0 10px;width:calc(100% - 20px)!important}.vertical-mode .checkbox{padding:5px 0!important}.vertical-mode .input-title{padding-left:0;padding-top:10px!important}.vertical-mode .button-primary{height:1rem;width:calc(100% - 12px)}.vertical-mode .single-input-cont{width:100%}"]
            }] }
];
/** @nocollapse */
FilterComponent.ctorParameters = () => [
    { type: RunContextBrowser, decorators: [{ type: Inject, args: ['RunContext',] }] },
    { type: TranslateService }
];
FilterComponent.propDecorators = {
    inputContInstances: [{ type: ViewChildren, args: ['inputCont',] }],
    filterItems: [{ type: Input }],
    screen: [{ type: Input }],
    webMode: [{ type: Input }],
    displayCount: [{ type: Input }],
    displayMode: [{ type: Input }],
    applyBtnTitle: [{ type: Input }],
    selectedFilter: [{ type: Output }],
    stepSelectedFilter: [{ type: Output }]
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
const routes = [
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
class MuComponentsRoutingModule {
}
MuComponentsRoutingModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    RouterModule.forChild(routes)
                ],
                exports: [
                    RouterModule
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TranslatePipe {
    /**
     * @param {?} _translate
     */
    constructor(_translate) {
        this._translate = _translate;
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    transform(value, args) {
        if (!value)
            return;
        return this._translate.instant(value, args); // pass in args
    }
}
TranslatePipe.decorators = [
    { type: Pipe, args: [{
                name: 'translate',
                pure: false
            },] }
];
/** @nocollapse */
TranslatePipe.ctorParameters = () => [
    { type: TranslateService }
];
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
const CUSTOM_BREAKPOINTS = [
    {
        alias: "sm",
        suffix: "sm",
        mediaQuery: "screen and (min-width: 780px) and (max-width: 959px)",
        overlapping: false
    }
];
const ɵ0$1 = CUSTOM_BREAKPOINTS;
/** @type {?} */
const CustomBreakPointsProvider = {
    provide: BREAKPOINT,
    useValue: ɵ0$1,
    multi: true
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NcAutoFocusDirective {
    /**
     * @param {?} element
     * @param {?} changeRef
     */
    constructor(element, changeRef) {
        this.element = element;
        this.changeRef = changeRef;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.element.nativeElement.focus();
        this.changeRef.detectChanges();
    }
}
NcAutoFocusDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ncAutoFocus]'
            },] }
];
/** @nocollapse */
NcAutoFocusDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const KEY_UP = 'keyup';
/** @type {?} */
const PASTE = 'paste';
/** @type {?} */
const CUT = 'cut';
/** @type {?} */
const NUMERIC = 'numeric';
/** @type {?} */
const BACKSPACE = 'Backspace';
/** @type {?} */
const pattern = /[\/\- ]/;
class NcMaxLengthDirective {
    /**
     * @param {?} element
     * @param {?} renderer
     * @param {?} ngZone
     */
    constructor(element, renderer, ngZone) {
        this.element = element;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.maxLength = 0;
        this.updatedValue = new EventEmitter();
        this.eventHandlers = [];
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.maxLength = Number(this.maxLength);
        if (typeof this.maxLength !== 'number')
            return;
        this.eventHandlers.push(this.renderer.listen(this.element.nativeElement, KEY_UP, this.eventHandler.bind(this)), this.renderer.listen(this.element.nativeElement, PASTE, this.clipBoardEventHandler.bind(this)), this.renderer.listen(this.element.nativeElement, CUT, this.clipBoardEventHandler.bind(this)));
    }
    /**
     * @protected
     * @param {?} event
     * @return {?}
     */
    handleEvent(event) {
        this.eventHandler(event);
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    clipBoardEventHandler(event) {
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                this.eventHandler(event);
            }));
        }), 0);
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    eventHandler(event) {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const element = event.srcElement;
            if (element.inputMode) {
                /** @type {?} */
                const validInput = element.inputMode === NUMERIC && element.value.trim().length
                    && !isNaN(element.value);
                if (validInput === false) {
                    /** @type {?} */
                    const currentValue = (/** @type {?} */ (element.value));
                    /** @type {?} */
                    const invalidIndex = currentValue.indexOf(event.key);
                    element.value = ((/** @type {?} */ (element.value))).substring(0, invalidIndex);
                    event.srcElement.value = element.value;
                    return;
                }
            }
            if (event.key === BACKSPACE) {
                this.emitUpdatedValue(element.value);
                return;
            }
            if (element.value.length > this.maxLength) {
                event.preventDefault();
                element.value = element.value.substring(0, this.maxLength);
            }
            if (this.format) {
                /** @type {?} */
                const formatStr = this.format;
                /** @type {?} */
                let val = element.value;
                for (let i = 0; i < element.value.length; i++) {
                    if (pattern.test(formatStr[i + 1]) && val[i + 1] !== formatStr[i + 1]) {
                        val = val.substr(0, i + 1) + formatStr[i + 1] + val.substr(i + 1);
                    }
                }
                element.value = val;
            }
            /** @type {?} */
            const scrollHeight = element.scrollHeight;
            /** @type {?} */
            const clientHeight = element.clientHeight;
            if (scrollHeight > clientHeight && element.scrollTop !== scrollHeight - clientHeight) {
                element.scrollTop = scrollHeight - clientHeight;
            }
            this.emitUpdatedValue(element.value);
            event.srcElement.value = element.value;
            return;
        }));
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    emitUpdatedValue(value) {
        this.ngZone.run((/**
         * @return {?}
         */
        () => {
            this.updatedValue.emit(value);
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        for (const eventHandler of this.eventHandlers) {
            eventHandler();
        }
        this.eventHandlers = [];
    }
}
NcMaxLengthDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ncMaxLength]'
            },] }
];
/** @nocollapse */
NcMaxLengthDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone }
];
NcMaxLengthDirective.propDecorators = {
    maxLength: [{ type: Input, args: ['ncMaxLength',] }],
    format: [{ type: Input, args: ['format',] }],
    updatedValue: [{ type: Output }]
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
class LongPressDirective {
    constructor() {
        this.timeoutId = null;
        this.intervalId = null;
        this.onLongPress = new EventEmitter();
        this.onLongPressing = new EventEmitter();
        this.isTouching = new EventEmitter();
        this.timeout = 1000;
    }
    /**
     * @return {?}
     */
    get press() {
        return this.isPressing;
    }
    /**
     * @return {?}
     */
    get longPress() {
        return this.isLongPressing;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseDown(event) {
        this.isPressing = true;
        this.isTouching.emit(true);
        this.isLongPressing = false;
        this.timeoutId = ((/** @type {?} */ (window))).setTimeout((/**
         * @return {?}
         */
        () => {
            this.isLongPressing = true;
            this.onLongPress.emit(event);
            this.intervalId = ((/** @type {?} */ (window))).setInterval((/**
             * @return {?}
             */
            () => {
                this.onLongPressing.emit(event);
            }), 30);
        }), this.timeout);
    }
    /**
     * @return {?}
     */
    onMouseLeave() {
        this.endPress();
    }
    /**
     * @private
     * @return {?}
     */
    endPress() {
        if (this.timeoutId !== null)
            clearTimeout(this.timeoutId);
        if (this.intervalId !== null)
            clearInterval(this.intervalId);
        this.isLongPressing = false;
        this.isPressing = false;
        this.isTouching.emit(false);
    }
}
LongPressDirective.decorators = [
    { type: Directive, args: [{
                selector: '[long-press]'
            },] }
];
LongPressDirective.propDecorators = {
    onLongPress: [{ type: Output }],
    onLongPressing: [{ type: Output }],
    isTouching: [{ type: Output }],
    timeout: [{ type: Input }],
    press: [{ type: HostBinding, args: ['class.press',] }],
    longPress: [{ type: HostBinding, args: ['class.long-press',] }],
    onMouseDown: [{ type: HostListener, args: ['touchstart', ['$event'],] }],
    onMouseLeave: [{ type: HostListener, args: ['touchend', ['$event'],] }]
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
class NcStyleClassDirective {
    /**
     * @param {?} element
     * @param {?} renderer
     */
    constructor(element, renderer) {
        this.element = element;
        this.renderer = renderer;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.renderer.addClass(this.element.nativeElement, this.ncClass);
    }
}
NcStyleClassDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ncClass]'
            },] }
];
/** @nocollapse */
NcStyleClassDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
NcStyleClassDirective.propDecorators = {
    ncClass: [{ type: Input, args: ['ncClass',] }]
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
class AdjustElementsDirective {
    //if implemented in web mode, only then will this adjust otherwise it will take 100% width
    /**
     * @param {?} element
     */
    constructor(element) {
        this.element = element;
        this.displayCount = 1; //number of elements to be displayed in a single row
        //element index
        this.webMode = false; //if implemented in web mode, only then will this adjust otherwise it will take 100% width
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        const webModeCss = this.calcWidth();
        if ((this.index + 1) % this.displayCount !== 0) {
            this.element.nativeElement.style.width = webModeCss.width;
            this.element.nativeElement.style.marginRight = webModeCss.marginRight;
            this.element.nativeElement.style.maxWidth = webModeCss.maxWidth;
        }
        else {
            this.element.nativeElement.style.width = webModeCss.width;
            this.element.nativeElement.style.maxWidth = webModeCss.maxWidth;
        }
    }
    /**
     * @private
     * @return {?}
     */
    calcWidth() {
        /** @type {?} */
        const webModeCss = (/** @type {?} */ ({}));
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
                let width;
                /** @type {?} */
                let marginRight;
                /** @type {?} */
                let index
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
                ;
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
    }
}
AdjustElementsDirective.decorators = [
    { type: Directive, args: [{
                selector: '[adjustElements]'
            },] }
];
/** @nocollapse */
AdjustElementsDirective.ctorParameters = () => [
    { type: ElementRef }
];
AdjustElementsDirective.propDecorators = {
    displayCount: [{ type: Input, args: ['displayInSingleRow',] }],
    index: [{ type: Input, args: ['elementIndex',] }],
    webMode: [{ type: Input, args: ['webMode',] }]
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
class NcFallbackCharDirective {
    /**
     * @param {?} element
     */
    constructor(element) {
        this.element = element;
        this.dynamicColorObj = {};
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.createDynamicColor();
        this.initialChar = this.getFirstCharacter(this.data);
        this.setColor(this.initialChar);
    }
    /**
     * @return {?}
     */
    createDynamicColor() {
        /** @type {?} */
        const l = '60%';
        /** @type {?} */
        let cac = 64;
        /** @type {?} */
        let spH = 0;
        /** @type {?} */
        let spL = 0;
        for (let i = 1; i <= 26; i++) {
            /** @type {?} */
            const h = spH + 10;
            spH += 10;
            for (let j = 0; j <= 26; j++) {
                /** @type {?} */
                const s = j ? spL + 3 : 60;
                spL += 3;
                /** @type {?} */
                const col = `hsl(${h}, ${s}%, ${l})`;
                if (j) {
                    this.dynamicColorObj[`${String.fromCharCode(cac + i)}${String.fromCharCode(cac + j)}`] = col;
                }
                else {
                    this.dynamicColorObj[String.fromCharCode(cac + i)] = col;
                }
            }
            spL = 0;
        }
    }
    /**
     * @param {?} str
     * @return {?}
     */
    getFirstCharacter(str) {
        /** @type {?} */
        const strArr = str.split(' ');
        /** @type {?} */
        const regExp = new RegExp('[a-zA-Z][a-zA-Z ]*');
        /** @type {?} */
        const charStr = strArr.filter((/**
         * @param {?} str
         * @return {?}
         */
        (str) => {
            return regExp.test(str);
        }));
        /** @type {?} */
        let initials;
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
    }
    /**
     * @param {?} key
     * @return {?}
     */
    setColor(key) {
        (/** @type {?} */ (this.dynamicColorObj[key]));
        this.element.nativeElement.innerHTML = this.initialChar;
        this.element.nativeElement.style.background = (/** @type {?} */ (this.dynamicColorObj[key]));
    }
}
NcFallbackCharDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ncFallbackChar]'
            },] }
];
/** @nocollapse */
NcFallbackCharDirective.ctorParameters = () => [
    { type: ElementRef }
];
NcFallbackCharDirective.propDecorators = {
    data: [{ type: Input, args: ['ncFallbackChar',] }],
    needOneChar: [{ type: Input, args: ['needOneChar',] }]
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
class KeyboardDirective {
    /**
     * @param {?} rc
     * @param {?} element
     * @param {?} renderer
     */
    constructor(rc, element, renderer) {
        this.rc = rc;
        this.element = element;
        this.renderer = renderer;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
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
            window.addEventListener('resize', debounce(this.handleKeyBoardEvents.bind(this), 300));
        }
    }
    /**
     * @private
     * @return {?}
     */
    handleKeyBoardEvents() {
        /** @type {?} */
        const bodyHeight = document.body.getBoundingClientRect().height;
        if (!this.originalBodyHeight)
            this.originalBodyHeight = bodyHeight;
        /** @type {?} */
        const keyboardHeight = this.originalBodyHeight - bodyHeight;
        this.rc.bridge.currKeyboardHt = -keyboardHeight;
        this.onCustomEvent();
    }
    /**
     * @private
     * @return {?}
     */
    onBlur() {
        if (this.rc.bridge.isRunningInBrowser() && !this.rc.bridge.isRunningInMWeb())
            return;
        if (this.isHeghtAuto) {
            this.renderer.removeStyle(this.parentDiv, 'height');
        }
        else {
            this.parentDiv.style.height = this.originalParentHeight + 'px';
        }
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), `onBlur original Height ${this.originalParentHeight}`);
        if (this.rc.bridge.isRunningInMWeb()) {
            window.scrollTo(0, 0);
        }
    }
    /**
     * @private
     * @return {?}
     */
    onCustomEvent() {
        if (this.rc.bridge.isRunningInBrowser() && !this.rc.bridge.isRunningInMWeb())
            return;
        /** @type {?} */
        const keyboardHeight = this.rc.bridge.currKeyboardHt;
        /** @type {?} */
        const parentDiv = this.parentDiv;
        /** @type {?} */
        const parentDivRect = parentDiv.getBoundingClientRect();
        if (document.activeElement !== this.element.nativeElement)
            return;
        if (keyboardHeight < 0) {
            this.originalParentHeight = this.parentDiv.getBoundingClientRect().height;
            parentDiv.style.height = (parentDivRect.height - keyboardHeight) + 'px';
            /** @type {?} */
            const scrollOptions = {
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
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.renderer.removeClass(this.element.nativeElement, 'mui-event-adjust-pan-screen');
    }
}
KeyboardDirective.decorators = [
    { type: Directive, args: [{
                selector: '[keyboard]'
            },] }
];
/** @nocollapse */
KeyboardDirective.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['RunContext',] }] },
    { type: ElementRef },
    { type: Renderer2 }
];
KeyboardDirective.propDecorators = {
    parentDiv: [{ type: Input, args: ['keyboard',] }]
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
class NextInpFocusDirective {
    /**
     * @param {?} rc
     */
    constructor(rc) {
        this.rc = rc;
        this.onSubmit = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onHostSubmit(event) {
        this.onEnter(event);
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    onEnter(event) {
        if (this.nextInpFocusElem) {
            this.nextInpFocusElem.focus();
        }
        else {
            this.onSubmit.emit(event);
        }
    }
}
NextInpFocusDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nextInpFocus]'
            },] }
];
/** @nocollapse */
NextInpFocusDirective.ctorParameters = () => [
    { type: RunContextBrowser, decorators: [{ type: Inject, args: ['RunContext',] }] }
];
NextInpFocusDirective.propDecorators = {
    onHostSubmit: [{ type: HostListener, args: ['keydown.enter', ['$event.target'],] }],
    nextInpFocusElem: [{ type: Input, args: ['nextInpFocus',] }],
    onSubmit: [{ type: Output }]
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
const ALLOW_CLICK_DELAY = 1000;
/** @type {?} */
const BUTTON = 'BUTTON';
class NcAllowSingleClickDirective {
    /**
     * @param {?} rc
     * @param {?} element
     * @param {?} renderer
     */
    constructor(rc, element, renderer) {
        this.rc = rc;
        this.element = element;
        this.renderer = renderer;
        this.ncClick = new EventEmitter();
        this.clickEnabled = true;
        this.originialColor = '';
    }
    /**
     * @return {?}
     */
    onMouseOver() {
        if (this.element.nativeElement.tagName === BUTTON || !this.rc.bridge.isRunningInBrowser())
            return;
        if (!this.originialColor) {
            this.originialColor = window.getComputedStyle(this.element.nativeElement, null).getPropertyValue('background-color');
        }
        this.element.nativeElement.style.background = '#f2f5f7';
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onClick($event) {
        this.applyOriginalBg();
        if (!this.clickEnabled)
            return;
        this.clickEnabled = false;
        this.allowClickDelay = this.allowClickDelay || ALLOW_CLICK_DELAY;
        setTimeout(this.allowClick.bind(this), this.allowClickDelay);
        this.ncClick.emit($event);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.element.nativeElement.style.cursor = 'pointer';
        this.renderer.listen(this.element.nativeElement, 'mouseover', this.onMouseOver.bind(this));
        this.renderer.listen(this.element.nativeElement, 'mouseout', this.applyOriginalBg.bind(this));
        this.renderer.listen(this.element.nativeElement, 'click', this.applyOriginalBg.bind(this));
    }
    /**
     * @return {?}
     */
    allowClick() {
        this.clickEnabled = true;
    }
    /*=====================================================================
                                  PRIVATE
      =====================================================================*/
    /**
     * @private
     * @return {?}
     */
    applyOriginalBg() {
        if (this.element.nativeElement.tagName === BUTTON || !this.rc.bridge.isRunningInBrowser())
            return;
        this.element.nativeElement.style.background = this.originialColor || 'initial';
    }
}
NcAllowSingleClickDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ncAllowSingleClick]'
            },] }
];
/** @nocollapse */
NcAllowSingleClickDirective.ctorParameters = () => [
    { type: RunContextBrowser, decorators: [{ type: Inject, args: ['RunContext',] }] },
    { type: ElementRef },
    { type: Renderer2 }
];
NcAllowSingleClickDirective.propDecorators = {
    allowClickDelay: [{ type: Input, args: ['ncPreventDoubleClick',] }],
    ncClick: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
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
const IMAGE_TYPE = {
    WALLET: 'WALLET',
    APP: 'APP',
    BANK: 'BANK',
    PROFILE: 'PROFILE',
};
/** @type {?} */
const APP_ICON = 'images/app-logo-hoz.jpg';
/** @type {?} */
const WALLET_ICON = 'svg-icons/ic-primary-wallet.svg';
/** @type {?} */
const BANK_ICON = 'svg-icons/ic-bank-activity-fill.svg';
/** @type {?} */
const PROFILE_ICON = 'svg-icons/ic-user-gray.svg';
class NcImgFallbackDirective {
    /**
     * @param {?} element
     */
    constructor(element) {
        this.element = element;
    }
    /**
     * @return {?}
     */
    onError() {
        if (!Array.isArray(this.data)) {
            this.setFallbackImage(this.data);
            return;
        }
        if (this.data[1] && this.data[1].r && this.data[1].g && this.data[1].b) {
            this.element.nativeElement.style.background = this.getColor(this.data[1]);
            return;
        }
        this.setFallbackImage(this.data[0]);
    }
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    setFallbackImage(type) {
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
    }
    /**
     * @private
     * @param {?} color
     * @return {?}
     */
    getColor(color) {
        return `rgb(${color.r}, ${color.g}, ${color.b})`;
    }
}
NcImgFallbackDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ncImgFallback]'
            },] }
];
/** @nocollapse */
NcImgFallbackDirective.ctorParameters = () => [
    { type: ElementRef }
];
NcImgFallbackDirective.propDecorators = {
    data: [{ type: Input }],
    onError: [{ type: HostListener, args: ['error',] }]
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
class ValidateImgDirective {
    /**
     * @param {?} element
     * @param {?} renderer
     */
    constructor(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        // { base64: string, ...args }
        this.imgLoaded = new EventEmitter();
        this.imgError = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.renderer.addClass(this.element.nativeElement, 'img-validator');
        this.element.nativeElement.src = this.payload.base64;
    }
    /**
     * @return {?}
     */
    onError() {
        this.imgError.emit(this.payload);
    }
    /**
     * @return {?}
     */
    onLoad() {
        this.imgLoaded.emit(this.payload);
    }
}
ValidateImgDirective.decorators = [
    { type: Directive, args: [{
                selector: '[validateImg]'
            },] }
];
/** @nocollapse */
ValidateImgDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
ValidateImgDirective.propDecorators = {
    payload: [{ type: Input }],
    imgLoaded: [{ type: Output }],
    imgError: [{ type: Output }],
    onError: [{ type: HostListener, args: ['error',] }],
    onLoad: [{ type: HostListener, args: ['load',] }]
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GenericPipe {
    /**
     * @param {?} rc
     * @param {?} injector
     */
    constructor(rc, injector) {
        this.rc = rc;
        this.injector = injector;
    }
    /**
     * @param {?} value
     * @param {?} pipeName
     * @param {?} pipeParams
     * @return {?}
     */
    transform(value, pipeName, pipeParams) {
        if (!pipeName)
            return value;
        /** @type {?} */
        const pipe = this.injector.get((/** @type {?} */ (pipeName)));
        if (pipe.transform && typeof pipe.transform === 'function') {
            if (pipeParams)
                return pipe.transform(value, ...pipeParams);
            return pipe.transform(value);
        }
        return value;
    }
}
GenericPipe.decorators = [
    { type: Pipe, args: [{ name: 'genericPipe' },] }
];
/** @nocollapse */
GenericPipe.ctorParameters = () => [
    { type: RunContextBrowser, decorators: [{ type: Inject, args: ['RunContext',] }] },
    { type: Injector }
];
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
class ExtractMobileNoPipe {
    /**
     * @param {?} rc
     */
    constructor(rc) {
        this.rc = rc;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    transform(value) {
        return this.rc.utils.get10digitMobNumber(value);
    }
}
ExtractMobileNoPipe.decorators = [
    { type: Pipe, args: [{
                name: 'extractMobileNo'
            },] }
];
/** @nocollapse */
ExtractMobileNoPipe.ctorParameters = () => [
    { type: RunContextBrowser, decorators: [{ type: Inject, args: ['RunContext',] }] }
];
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
const INR = 'INR';
/** @type {?} */
const CURRENCY = 'currency';
class CurrencyPipe {
    /**
     * @param {?} rc
     */
    constructor(rc) {
        this.rc = rc;
    }
    /**
     * @param {?} value
     * @param {?=} decimalReq
     * @return {?}
     */
    transform(value, decimalReq = true) {
        if (value === undefined)
            return;
        /** @type {?} */
        const options = (/** @type {?} */ ({
            currency: INR,
            style: CURRENCY,
            maximumFractionDigits: 2
        }));
        /** @type {?} */
        const formattedNumber = value.toLocaleString('en-IN', options);
        return decimalReq ? formattedNumber : formattedNumber.split('.')[0];
    }
}
CurrencyPipe.decorators = [
    { type: Pipe, args: [{
                name: 'inrcurrency'
            },] }
];
/** @nocollapse */
CurrencyPipe.ctorParameters = () => [
    { type: RunContextBrowser, decorators: [{ type: Inject, args: ['RunContext',] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    CurrencyPipe.prototype.rc;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DropDownMultiSelectComponent {
    /**
     * @param {?} rc
     * @param {?} changeRef
     */
    constructor(rc, changeRef) {
        this.rc = rc;
        this.changeRef = changeRef;
        this.isDropDownOpen = false;
        this.isSelectAll = false;
        this.showPlaceHolder = true;
        this.listOptions = [];
        this.selectedItems = new EventEmitter();
        this.selectedAll = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.rc.isAssert() && this.rc.assert(this.rc.getName(this), this.options, `missing options ${this.options}`);
        this.listOptions = JSON.parse(JSON.stringify(this.options));
    }
    /*=====================================================================
                                  UTILS
      =====================================================================*/
    /**
     * @param {?} element
     * @return {?}
     */
    onHostClick(element) {
        /** @type {?} */
        const calExpStr = ['drop-down-list', 'checkbox-cont'];
        /** @type {?} */
        let isMatched = false;
        if (this.showDropDown) {
            for (let exp of calExpStr) {
                /** @type {?} */
                const calExp = new RegExp(exp);
                isMatched = calExp.test(element.target.offsetParent.className);
                if (isMatched)
                    return;
            }
            if (!this.isDropDownOpen) {
                this.showDropDown = false;
            }
            else {
                this.isDropDownOpen = false;
            }
        }
    }
    /*=====================================================================
                                  PRIVATE
      =====================================================================*/
    /**
     * @private
     * @return {?}
     */
    handlePlaceHolder() {
        /** @type {?} */
        const index = this.listOptions.findIndex((/**
         * @param {?} option
         * @return {?}
         */
        (option) => {
            return option.selected;
        }));
        if (index !== -1)
            this.showPlaceHolder = false;
        else
            this.showPlaceHolder = true;
    }
    /*=====================================================================
                                  HTML
      =====================================================================*/
    /**
     * @return {?}
     */
    handleDropDown() {
        this.showDropDown = !this.showDropDown;
        this.isDropDownOpen = !this.isDropDownOpen;
    }
    /**
     * @param {?} event
     * @param {?} option
     * @return {?}
     */
    onCheckBoxClick(event, option) {
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onSelectAll(event) {
        if (event.checked) {
            this.showPlaceHolder = false;
            this.listOptions.forEach((/**
             * @param {?} option
             * @return {?}
             */
            (option) => {
                option.selected = true;
            }));
            this.isSelectAll = true;
        }
        else {
            this.listOptions.forEach((/**
             * @param {?} option
             * @return {?}
             */
            (option) => {
                option.selected = false;
            }));
            this.isSelectAll = false;
            this.handlePlaceHolder();
        }
        this.selectedAll.emit(event);
    }
}
DropDownMultiSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'drop-down-multi-select',
                template: "<div class=\"drop-down-multi-select-comp\"\n  [ngClass.xl]=\"['web-drop-down-multi-select']\"\n  [ngClass.lg]=\"['web-drop-down-multi-select']\"\n  [ngClass.md]=\"['web-drop-down-multi-select']\"\n  [ngClass.sm]=\"['web-drop-down-multi-select']\">\n\n  <div class=\"drop-box-cont border-primary\">\n\n    <div class=\"placeholder txt-md-med-light\" *ngIf=\"placeholder && showPlaceHolder\">\n      {{ placeholder }}\n    </div>\n\n    <div class=\"sel-items-cont\" *ngIf=\"!showPlaceHolder\">\n\n      <ng-container *ngFor=\"let option of listOptions\">\n        <div class=\"sel-item txt-sm-med-dark grey-bg\" *ngIf=\"option.selected\">\n          {{ option.value }}\n        </div>\n      </ng-container>\n\n    </div>\n\n    <div class=\"arrow-cont\">\n      <div class=\"arrow\" (click)=\"handleDropDown()\">\n        <i class=\"fa fa-2x fa-angle-down\" aria-hidden=\"true\"></i>\n      </div>\n    </div>\n\n  </div>\n\n  <div class=\"drop-down-list bg-white\" *ngIf=\"showDropDown\">\n\n    <div class=\"checkbox-cont\">\n      <mat-checkbox *ngIf=\"showSelectAll\" [value]=\"'ALL'\"\n        class=\"txt-md-med-norm checkbox\"\n        [checked]=\"isSelectAll\"\n        (change)=\"onSelectAll($event)\">\n        Select All\n      </mat-checkbox>\n\n      <mat-checkbox *ngFor=\"let option of listOptions\" [value]=\"option\"\n        class=\"txt-md-med-norm checkbox\"\n        [checked]=\"option.selected\"\n        (change)=\"onCheckBoxClick($event, option)\">\n        {{ option.value }}\n      </mat-checkbox>\n\n    </div>\n  \n  </div>\n\n</div>",
                styles: [".drop-box-cont{border-style:solid;border-width:2px;display:flex;justify-content:space-between;padding:4px 8px}.drop-down-list{border-radius:4px;box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);max-height:200px;overflow-y:auto;padding:0 10px;position:absolute;width:calc(24% - 12px);z-index:200}.sel-items-cont{display:flex;overflow-y:auto;width:calc(100% - 24px)}.placeholder,.sel-item{align-items:center;display:flex}.sel-item{margin-right:10px;padding:0 4px}.checkbox{padding:1vw 0}.checkbox-cont{display:flex;flex-direction:column;position:relative}@media screen and (max-width:1500px) and (min-width:900px){.drop-down-list{width:calc(22% - 20px)}}"]
            }] }
];
/** @nocollapse */
DropDownMultiSelectComponent.ctorParameters = () => [
    { type: RunContextBrowser, decorators: [{ type: Inject, args: ['RunContext',] }] },
    { type: ChangeDetectorRef }
];
DropDownMultiSelectComponent.propDecorators = {
    options: [{ type: Input }],
    showSelectAll: [{ type: Input }],
    placeholder: [{ type: Input }],
    selectedItems: [{ type: Output }],
    selectedAll: [{ type: Output }],
    onHostClick: [{ type: HostListener, args: ['document:click', ['$event'],] }]
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
class LoadingComponent {
    /**
     * @param {?} rc
     */
    constructor(rc) {
        this.rc = rc;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.apiLoadingBottomIn === undefined)
            this.apiLoadingBottomIn = false;
    }
}
LoadingComponent.decorators = [
    { type: Component, args: [{
                selector: 'loading',
                template: "<div class=\"loading-comp\">\n\n  <div class=\"mu-loading-root\" [ngClass]=\"customClass || 'bg-white'\"\n    [ngClass.xl]=\"['web-mu-content-div', customClass || 'bg-white']\"\n    [ngClass.lg]=\"['web-mu-content-div', customClass || 'bg-white']\"\n    [ngClass.md]=\"['web-mu-content-div', customClass || 'bg-white']\"\n    [ngClass.sm]=\"['web-mu-content-div', customClass || 'bg-white']\">\n\n    <div class=\"loading-cont\">\n\n      <div class=\"spinner-cont\" [class.spinner-cont-top]=\"apiLoadingBottomIn\">\n        <img *ngIf=\"graphicUrl\" src=\"{{graphicUrl}}\">\n        <i *ngIf=\"!graphicUrl\" class=\"spinner fa fa-spinner fa-pulse fa-3x fa-fw text-color-primary\"></i>\n      </div>\n      \n      <div class=\"loading-text txt-xl-med-norm\">\n        {{apiLoadingText}}\n      </div>\n\n    </div>\n\n  </div>\n\n</div>",
                styles: [".mu-loading-root{align-items:center;display:flex;justify-content:center}.loading-text{padding:2vw}.loading-cont{align-items:center;display:flex;flex-direction:column;justify-content:center}.web-mu-content-div{height:100%!important;width:100%!important}.web-mu-content-div .loading-text{padding:10px}"]
            }] }
];
/** @nocollapse */
LoadingComponent.ctorParameters = () => [
    { type: RunContextBrowser, decorators: [{ type: Inject, args: ['RunContext',] }] }
];
LoadingComponent.propDecorators = {
    apiLoadingText: [{ type: Input }],
    apiLoadingBottomIn: [{ type: Input }],
    customClass: [{ type: Input }],
    graphicUrl: [{ type: Input }]
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
class LoadingErrorComponent {
    /**
     * @param {?} rc
     */
    constructor(rc) {
        this.rc = rc;
        this.apiErrorAction = new EventEmitter();
    }
    /**
     * @return {?}
     */
    onErrorAction() {
        this.apiErrorAction.emit();
    }
}
LoadingErrorComponent.decorators = [
    { type: Component, args: [{
                selector: 'loading-error',
                template: "<div class=\"loading-error-comp\"\n[ngClass.xl]=\"['web-loading-error']\"\n[ngClass.lg]=\"['web-loading-error']\"\n[ngClass.md]=\"['web-loading-error']\"\n[ngClass.sm]=\"['web-loading-error']\">\n  <div class=\"mu-loading-root\">\n    <div class=\"txt-xl-med-norm error-text-cont\">\n      {{apiErrorText}}\n    </div>\n\n    <div class=\"error-btn-cont\" *ngIf=\"apiCanRetry\">\n      <button class=\"error-btn button-primary\" \n        (click)=\"onErrorAction()\">\n        {{apiRetryText}}\n      </button>\n    </div>\n  </div>\n</div>",
                styles: [".mu-loading-root{align-items:center;display:flex;flex-direction:column;justify-content:center}.error-text-cont{margin-left:5%;margin-right:5%;position:relative}.error-btn-cont{margin-top:10vh;position:relative}.error-btn{width:70vw}.web-loading-error .mu-loading-root{height:100%;width:100%}.web-loading-error .error-btn-cont{width:100%}.web-loading-error .error-btn{width:50%}.web-loading-error .error-text-cont{overflow-wrap:break-word}"]
            }] }
];
/** @nocollapse */
LoadingErrorComponent.ctorParameters = () => [
    { type: RunContextBrowser, decorators: [{ type: Inject, args: ['RunContext',] }] }
];
LoadingErrorComponent.propDecorators = {
    apiErrorText: [{ type: Input }],
    apiCanRetry: [{ type: Input }],
    apiRetryText: [{ type: Input }],
    apiErrorAction: [{ type: Output }]
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
class ToastComponent {
}
ToastComponent.decorators = [
    { type: Component, args: [{
                selector: 'toast',
                template: "<div class=\"toast-comp\" [@visibilityChanged]>\n  <div class=\"toast\"\n    [ngClass.xl]=\"['web-toast']\"\n    [ngClass.lg]=\"['web-toast']\"\n    [ngClass.md]=\"['web-toast']\"\n    [ngClass.sm]=\"['web-toast']\">\n    <span class=\"txt-xl-reg-norm toast-text\">{{toastMessage}}</span>\n  </div>\n</div>",
                animations: [
                    trigger('visibilityChanged', [
                        transition(':enter', [
                            style({ 'opacity': 0 }),
                            animate('500ms', style({ 'opacity': 1 }))
                        ]),
                        transition(':leave', [
                            style({ 'opacity': 1 }),
                            animate('500ms', style({ 'opacity': 0 }))
                        ])
                    ]),
                ],
                styles: [".toast{border-radius:25px;margin:0 auto;max-width:85vw;min-width:50vw;padding-bottom:10px;padding-top:10px;text-align:center}.web-toast{max-width:500px!important;min-width:401px!important}"]
            }] }
];
ToastComponent.propDecorators = {
    toastMessage: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    ToastComponent.prototype.toastMessage;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const SCROLL_EVENT = 'scroll';
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
class InfiniteScrollComponent {
    /**
     * @param {?} element
     * @param {?} ngZone
     * @param {?} renderer
     */
    constructor(element, ngZone, renderer) {
        this.element = element;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.items = []; //Items that have to be loaded into html in chunks
        //Items that have to be loaded into html in chunks
        this.upperBufferCount = 50; //min no. of elements that should be loaded at the top before we start removing items
        //min no. of elements that should be loaded at the top before we start removing items
        this.lowerBufferCount = 10; //min no. of elements that should be loaded at the bottom
        this.listEnd = new EventEmitter(); // list ended event to the parent 
        // list ended event to the parent 
        this.activeElement = new EventEmitter(); // active element event to the parent
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
    ngOnInit() {
        this.viewPortItems = this.items.slice(this.previousStartIdx, this.lowerBufferCount);
        this.scrollHandler = this.renderer.listen(this.element.nativeElement, SCROLL_EVENT, this.refreshList.bind(this));
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.refreshList();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.setInitHolderHeight();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.scrollHandler) {
            this.scrollHandler();
        }
    }
    /*=====================================================================
                                  PRIVATE METHODS
      =====================================================================*/
    /**
     * @private
     * @return {?}
     */
    setInitHolderHeight() {
        /** @type {?} */
        const viewPortChildren = this.scrollCont.nativeElement.children;
        /** @type {?} */
        const holderHeight = this.calculateHeight() / viewPortChildren.length * this.viewPortItems.length;
        this.renderer.setStyle(this.contentHolder.nativeElement, 'height', `${holderHeight}px`);
    }
    /**
     * @private
     * @return {?}
     */
    calculateHeight() {
        /** @type {?} */
        const viewPortChildren = this.scrollCont.nativeElement.children;
        /** @type {?} */
        let totalHeight = 0;
        for (let i = 0; i < viewPortChildren.length; i++) {
            /** @type {?} */
            const height = viewPortChildren[i].getBoundingClientRect().height;
            totalHeight += height;
        }
        return Math.ceil(totalHeight);
    }
    /**
     * @private
     * @return {?}
     */
    cacheViewedItemsHeight() {
        /** @type {?} */
        const viewPortChildren = this.scrollCont.nativeElement.children;
        /** @type {?} */
        let i = this.previousStartIdx;
        for (const child of viewPortChildren) {
            /** @type {?} */
            const height = child.getBoundingClientRect().height;
            this.itemsHeight[i] = height;
            i++;
        }
    }
    /**
     * @private
     * @return {?}
     */
    updateViewPortItems() {
        /** @type {?} */
        const viewPortChildren = this.scrollCont.nativeElement.children;
        /** @type {?} */
        const viewPortItemsHeight = this.calculateHeight();
        /** @type {?} */
        const averageHeight = Math.ceil(viewPortItemsHeight / viewPortChildren.length);
        /** @type {?} */
        const scrollTop = this.element.nativeElement.scrollTop;
        /** @type {?} */
        const containerHeight = this.element.nativeElement.getBoundingClientRect().height;
        this.cacheViewedItemsHeight();
        /** @type {?} */
        let start = this.previousStartIdx;
        /** @type {?} */
        let end = this.previousEndIdx;
        /** @type {?} */
        const elementsScrolled = Math.ceil(scrollTop / averageHeight);
        /** @type {?} */
        const elementsVisible = Math.ceil(containerHeight / averageHeight);
        start = elementsScrolled - this.upperBufferCount + elementsVisible;
        end = elementsScrolled + elementsVisible + this.lowerBufferCount;
        start = Math.max(0, start);
        end = Math.min(this.items.length, end >= 0 ? end : Infinity);
        /** @type {?} */
        let height = 0;
        if (start > this.previousStartIdx) {
            //scrolling down
            for (let i = this.previousStartIdx; i < start; i++) {
                height += this.itemsHeight[i] || averageHeight;
            }
            this.translateY += height;
        }
        else if (start < this.previousStartIdx) {
            //scrolling up
            for (let i = start; i < this.previousStartIdx; i++) {
                height += this.itemsHeight[i] || averageHeight;
            }
            this.translateY -= height;
        }
        /** @type {?} */
        const currentHolderHeight = Math.ceil(viewPortItemsHeight + this.translateY);
        /** @type {?} */
        const holderHeight = Math.ceil((averageHeight * (this.items.length - end) + currentHolderHeight));
        this.renderer.setStyle(this.contentHolder.nativeElement, 'height', `${holderHeight}px`);
        DomHelper.setTransform(this.scrollCont.nativeElement, 0, this.translateY, 0);
        if (start !== this.previousStartIdx || end !== this.previousEndIdx) {
            this.ngZone.run((/**
             * @return {?}
             */
            () => {
                this.previousStartIdx = start;
                this.previousEndIdx = end;
                this.viewPortItems = this.items.slice(start, end);
                if (this.previousEndIdx === this.items.length)
                    this.listEnd.emit(this.items.length);
            }));
        }
    }
    /**
     * @private
     * @param {?} index
     * @param {?=} highlight
     * @return {?}
     */
    scrollTo(index, highlight = false) {
        /** @type {?} */
        let totalHeight = 0;
        for (let i = 0; i < index; i++) {
            totalHeight += this.itemsHeight[i];
        }
        this.element.nativeElement.scrollTop = totalHeight;
        if (highlight) {
            //TODO: add bg color and delay
        }
        this.refreshList();
    }
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    isElementInViewPort(element) {
        /** @type {?} */
        const parentElem = this.element.nativeElement;
        /** @type {?} */
        const viewPortTop = parentElem.scrollTop;
        /** @type {?} */
        const viewPortBottom = viewPortTop + parentElem.clientHeight;
        /** @type {?} */
        const elemTop = element.offsetTop + (0.1 * element.clientHeight);
        /** @type {?} */
        const elemBottom = element.offsetTop + (0.9 * element.clientHeight);
        return (elemBottom <= viewPortBottom) && (elemTop >= viewPortTop);
    }
    /*
        if scrolling down, the first visible element from top is currentActive element else
        the last visible element is currentActive element
      */
    /**
     * @private
     * @return {?}
     */
    updateCurrActiveElemIdx() {
        /** @type {?} */
        const parentElem = this.element.nativeElement;
        /** @type {?} */
        const viewPortElements = parentElem.children[1].children;
        /** @type {?} */
        const scrolledDown = parentElem.scrollTop > this.lastScrolledTop;
        for (let index = 0; index < viewPortElements.length; index++) {
            /** @type {?} */
            const elementVisible = this.isElementInViewPort(viewPortElements[index]);
            /** @type {?} */
            const anchorId = this.viewPortItems[index].anchorId || null;
            if (elementVisible && anchorId) {
                this.currActiveElemIndex = this.previousStartIdx + index;
                if (scrolledDown)
                    break;
            }
        }
        this.lastScrolledTop = parentElem.scrollTop;
    }
    /*=====================================================================
                                        UTILS
      =====================================================================*/
    /**
     * @return {?}
     */
    scrollToTop() {
        this.element.nativeElement.scrollTop = 0;
        this.refreshList();
    }
    /**
     * @param {?} index
     * @param {?=} highlight
     * @return {?}
     */
    scrollToItem(index, highlight = false) {
        if (this.itemsHeight[index]) {
            this.scrollTo(index, highlight);
        }
        else {
            if (index < this.items.length) {
                this.viewPortItems = this.items.slice(0, index + this.lowerBufferCount);
                this.refreshList();
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.scrollTo(index, highlight);
                }), 0);
            }
        }
    }
    /**
     * @return {?}
     */
    getScrollableElement() {
        return this.element;
    }
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
    getViewedElementsId() {
        /** @type {?} */
        const parentElem = this.element.nativeElement;
        /** @type {?} */
        const viewPortElements = parentElem.children[1].children;
        /** @type {?} */
        const viewedElementsIds = [];
        this.lastActiveElemIndex = this.currActiveElemIndex;
        for (let index = 0; index < viewPortElements.length; index++) {
            /** @type {?} */
            const elementVisible = this.isElementInViewPort(viewPortElements[index]);
            /** @type {?} */
            const anchorId = this.viewPortItems[index].anchorId || null;
            if (elementVisible && anchorId) {
                viewedElementsIds.push(anchorId);
            }
        }
        this.updateCurrActiveElemIdx();
        return viewedElementsIds;
    }
    /**
     * @param {?=} firstElem
     * @return {?}
     */
    getActiveElementId(firstElem = false) {
        /** @type {?} */
        const parentElem = this.element.nativeElement;
        /** @type {?} */
        const viewPortElements = parentElem.children[1].children;
        /** @type {?} */
        let activeElementId;
        for (let index = 0; index < viewPortElements.length; index++) {
            /** @type {?} */
            const elementVisible = this.isElementInViewPort(viewPortElements[index]);
            /** @type {?} */
            const anchorId = this.viewPortItems[index].anchorId || null;
            if (elementVisible && anchorId) {
                activeElementId = anchorId;
            }
        }
        return activeElementId;
    }
    /*=====================================================================
                                  HTML FUNCTIONS
      =====================================================================*/
    /**
     * @return {?}
     */
    refreshList() {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            requestAnimationFrame((/**
             * @return {?}
             */
            () => {
                this.updateViewPortItems();
            }));
        }));
    }
}
InfiniteScrollComponent.decorators = [
    { type: Component, args: [{
                selector: 'infinite-scroll',
                template: "<div class=\"content-holder\" #contentHolder></div>\n<div class=\"content-div\" #scrollCont\n  [ngClass]=\"customClass || 'bg-primary-light'\"\n  (scroll)=\"refreshList()\">\n  <ng-content></ng-content>\n</div> ",
                styles: [":host{display:block;overflow-x:hidden;overflow-y:auto;position:relative}.content-div,:host{height:100%;width:100%}.content-div{left:0;position:absolute;top:0}.content-div::-webkit-scrollbar{display:none}.content-holder{position:relative;width:1px}"]
            }] }
];
/** @nocollapse */
InfiniteScrollComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Renderer2 }
];
InfiniteScrollComponent.propDecorators = {
    items: [{ type: Input }],
    upperBufferCount: [{ type: Input }],
    lowerBufferCount: [{ type: Input }],
    customClass: [{ type: Input }],
    listEnd: [{ type: Output }],
    activeElement: [{ type: Output }],
    scrollCont: [{ type: ViewChild, args: ['scrollCont', { static: true },] }],
    contentHolder: [{ type: ViewChild, args: ['contentHolder', { static: true },] }]
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
class InputValidator {
    /**
     * @param {?} control
     * @return {?}
     */
    static dateValidator(control) {
        /** @type {?} */
        let startDateTS = control.get('startDate').value;
        /** @type {?} */
        let endDateTS = control.get('endDate').value;
        if (startDateTS) {
            /** @type {?} */
            let isDate;
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
            let isDate;
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
    }
    /**
     * @param {?} control
     * @return {?}
     */
    static futureDateValidatorIfAllowed(control) {
        /** @type {?} */
        let startDateTS = control.get('startDate').value;
        /** @type {?} */
        let endDateTS = control.get('endDate').value;
        /** @type {?} */
        const dateNowTS = Date.now();
        if (startDateTS) {
            /** @type {?} */
            let isDate;
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
            let isDate;
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
    }
    /**
     * @param {?} control
     * @return {?}
     */
    static amountValidator(control) {
        /** @type {?} */
        const minAmount = control.get('minAmount').value
            ? control.get('minAmount').value
            : null;
        /** @type {?} */
        const maxAmount = control.get('maxAmount').value
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
    }
    /**
     * @param {?} control
     * @return {?}
     */
    static futureDateValidator(control) {
        if (!control.value)
            return null;
        /** @type {?} */
        const dateNowTS = Date.now();
        /** @type {?} */
        let date = control.value;
        if (date) {
            /** @type {?} */
            let isDate;
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
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const PERMISSION = {
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
class FileUploadComponent {
    /*rc type is any since it is of type RuncontextApp and it is app specific
        and should not be imported here
      */
    /**
     * @param {?} rc
     * @param {?} translate
     */
    constructor(rc, translate) {
        this.rc = rc;
        this.translate = translate;
        this.value = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.rc.bridge.isRunningInBrowser()) {
            if (this.uploadFileCont)
                this.uploadFileCont.nativeElement.addEventListener('change', this.onFileUpload.bind(this));
        }
    }
    /*=====================================================================
                                  PRIVATE
      =====================================================================*/
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    onFileUpload(event) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const file = event.target.files[0];
            if (!file.type.includes('image')) {
                /** @type {?} */
                const errorText = this.translate.instant('upl_invalid_mime_type');
                this.rc.uiRouter.showToast(errorText);
                return;
            }
            if (file.size > 512000) {
                /** @type {?} */
                const warnText = this.translate.instant('upl_max_size_err');
                this.rc.uiRouter.showToast(warnText);
                return;
            }
            /** @type {?} */
            const base64 = (/** @type {?} */ (yield this.rc.utils.getBase64(file)));
            /** @type {?} */
            const strippedBase64 = base64.replace(`data:${file.type};base64,`, '');
            /** @type {?} */
            const uploadDoc = {
                base64: strippedBase64,
                mimeType: file.type,
                checksum: yield this.rc.utils.getCheckSum(strippedBase64)
            };
            if (!this.uploadedDocParams)
                this.uploadedDocParams = (/** @type {?} */ ({}));
            this.uploadedDocParams = uploadDoc;
            this.uploadFileCont.nativeElement.value = null;
        });
    }
    /**
     * @private
     * @return {?}
     */
    updatePicture() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const resp = yield this.rc.bridge.takePictureFromCamera();
            if (!resp['success']) {
                this.rc.uiRouter.showToast(this.translate.instant('mu_fil_upl_unknow_err'));
                return;
            }
            /** @type {?} */
            const uploadDoc = {
                base64: resp['base64'],
                mimeType: resp['mimeType'],
                checksum: yield this.rc.utils.getCheckSum(resp['base64'])
            };
            if (!this.uploadedDocParams)
                this.uploadedDocParams = (/** @type {?} */ ({}));
            this.uploadedDocParams = uploadDoc;
            if (this.eventPropagate) {
                this.onSubmit();
            }
        });
    }
    /*=====================================================================
                                  HTML
      =====================================================================*/
    /**
     * @return {?}
     */
    takePicture() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.rc.bridge.isRunningInBrowser())
                return;
            /** @type {?} */
            const resp = yield this.rc.bridge.getPermission(PERMISSION.CAMERA, false);
            if (!resp.permGiven) {
                return;
            }
            this.rc.bridge(PERMISSION.CAMERA).then((/**
             * @param {?} permResp
             * @return {?}
             */
            (permResp) => {
                if (permResp.permGiven)
                    this.updatePicture();
            }));
        });
    }
    /**
     * @return {?}
     */
    uploadFile() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.rc.bridge.isRunningInBrowser()) {
                /** @type {?} */
                const event = new MouseEvent('click', { bubbles: false });
                this.uploadFileCont.nativeElement.dispatchEvent(event);
                return;
            }
            /** @type {?} */
            const docObj = yield this.rc.bridge.selectDocumentFile();
            if (docObj['error'])
                return;
            if (!docObj['base64']) {
                this.rc.uiRouter.showToast(this.translate.instant('cmn_toast_err_unknown'));
                return;
            }
            /** @type {?} */
            const uploadDoc = {
                base64: docObj['base64'],
                checksum: docObj['checksum'],
                mimeType: docObj['mimeType']
            };
            if (!this.uploadedDocParams)
                this.uploadedDocParams = (/** @type {?} */ ({}));
            this.uploadedDocParams = uploadDoc;
            if (this.eventPropagate) {
                this.onSubmit();
            }
        });
    }
    /**
     * @return {?}
     */
    onSubmit() {
        if (this.isRequired && (!this.uploadedDocParams || !Object.keys(this.uploadedDocParams).length)) {
            this.rc.uiRouter.showToast(this.translate.instant('mu_fil_upl_upload_err'));
        }
        else {
            this.value.emit(this.uploadedDocParams);
        }
    }
}
FileUploadComponent.decorators = [
    { type: Component, args: [{
                selector: 'file-upload',
                template: "<div class=\"upload-file-comp\"\n  [ngClass.xl]=\"['web-upl-fil-cont-div']\"\n  [ngClass.lg]=\"['web-upl-fil-cont-div']\"\n  [ngClass.md]=\"['web-upl-fil-cont-div']\"\n  [ngClass.sm]=\"['web-upl-fil-cont-div']\">\n\n  <div class=\"btn-cont\">\n    <button class=\"button-primary-small btn\" (click)=\"takePicture()\" >\n      {{ (uploadedDocParams ? 'mu_fil_upl_retake_photo' : 'mu_fil_upl_take_photo') | translate }}\n      <input class=\"upload-file\" type=\"file\" accept=\"image/*\" capture=\"camera\" #cameraCont>\n    </button>\n    <button class=\"button-primary-small btn\" (click)=\"uploadFile()\">\n      {{ (uploadedDocParams ? 'mu_fil_upl_change_text' : 'mu_fil_upl_upload_photo') | translate }}\n      <input *ngIf=\"rc.bridge.isRunningInBrowser()\" class=\"upload-file\" type=\"file\"\n        accept=\".jpg, .jpeg, .png\" #uploadFileCont>\n    </button> \n  </div>\n\n  <div class=\"preview\" *ngIf=\"uploadedDocParams\">\n    <div class=\"uploaded-document-image-cont\">\n      <img class=\"upl-doc-img\" src=\"data:image/jpg;base64,{{uploadedDocParams.base64}}\">\n    </div>\n  </div>\n\n  <!-- <div class=\"progress-bar-cont\" *ngIf=\"uploadedStatus && uploadedStatus.uploadedPercent\">\n    <mat-progress-bar\n      class=\"progress-bar\"\n      [mode]=\"'determinate'\"\n      [value]=\"uploadedStatus?.uploadedPercent\">\n    </mat-progress-bar>\n  </div> -->\n\n</div>",
                styles: [".upload-file-comp{margin:4vw 0;position:relative}.btn-cont{align-items:center;display:flex;justify-content:space-between;position:relative}.uploaded-document-image-cont{margin:0 4vw;position:relative}.upl-doc-img{width:100%}.upload-file{opacity:0;position:absolute;width:100%;z-index:-1}.preview{align-items:center;display:flex;justify-content:center;margin:6vw 0;position:relative}.doc-name{margin:4vw 0;position:relative}.progress-bar-cont{margin:10vw 0;position:relative}.btn{padding:0 2vw}.web-upl-fil-cont-div,.web-upl-fil-cont-div .progress-bar-cont{margin:20px 0}.web-upl-fil-cont-div .doc-name{margin:10px 0}.web-upl-fil-cont-div .preview{margin:20px 0}.web-upl-fil-cont-div .uploaded-document-image-cont{margin:0 20px}.web-upl-fil-cont-div .btn{max-width:45%;padding:0 10px;width:45%}"]
            }] }
];
/** @nocollapse */
FileUploadComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['RunContext',] }] },
    { type: TranslateService }
];
FileUploadComponent.propDecorators = {
    uploadFileCont: [{ type: ViewChild, args: ['uploadFileCont', { static: false },] }],
    screen: [{ type: Input }],
    eventPropagate: [{ type: Input }],
    isRequired: [{ type: Input }],
    value: [{ type: Output }]
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
class InputContainerComponent {
    /**
     * @param {?} rc
     * @param {?} formBuilder
     */
    constructor(rc, formBuilder) {
        this.rc = rc;
        this.formBuilder = formBuilder;
        this.eventPropagate = false;
        this.displayLabel = true;
        this.value = new EventEmitter();
        this.dropdownOpen = new EventEmitter();
        this.stepSelectedFilter = new EventEmitter();
        this.DISPLAY_TYPE = DISPLAY_TYPE;
        this.DISPLAY_MODE = DISPLAY_MODE;
        this.formatLabel = (/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            return value + this.sliderLabel;
        });
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.initialize();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initialize();
    }
    /**
     * @return {?}
     */
    getFilterId() {
        return this.inputParams.id;
    }
    /**
     * @param {?} inputParams
     * @return {?}
     */
    reset(inputParams) {
        this.inputParams = inputParams;
        this.initialize();
    }
    /*=====================================================================
                                  UTILS
      =====================================================================*/
    /**
     * @return {?}
     */
    onSubmit() {
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
        let params;
        /** @type {?} */
        let emitValue = true;
        switch (this.inputParams.displayType) {
            case DISPLAY_TYPE.CALENDAR_BOX:
                params = {
                    id: this.inputParams.id,
                    value: this.inputForm.value ? this.inputForm.value.getTime() : null,
                    displayType: this.inputParams.displayType
                };
                break;
            case DISPLAY_TYPE.INPUT_BOX:
            case DISPLAY_TYPE.SELECTION_BOX:
            case DISPLAY_TYPE.AUTOCOMPLETE_SELECT:
            case DISPLAY_TYPE.TEXT_AREA:
            case DISPLAY_TYPE.TOGGLE:
            case DISPLAY_TYPE.BUTTON_TOGGLE:
            case DISPLAY_TYPE.ROW_INPUT_BOX:
            case DISPLAY_TYPE.SLIDER:
                params = {
                    id: this.inputParams.id,
                    value: this.inputForm.value,
                    displayType: this.inputParams.displayType
                };
                break;
            case DISPLAY_TYPE.DATE_RANGE:
                /** @type {?} */
                const dateRangeKeys = this.inputParams.rangeKeys || ['startDate', 'endDate'];
                /** @type {?} */
                const dateRangeValue = {};
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
            case DISPLAY_TYPE.NUMBER_RANGE:
                /** @type {?} */
                const numRangeKeys = this.inputParams.rangeKeys || ['minAmount', 'maxAmount'];
                /** @type {?} */
                const numRangeValue = {};
                numRangeValue[numRangeKeys[0]] = this.numberRange.controls.minAmount.value;
                numRangeValue[numRangeKeys[1]] = this.numberRange.controls.maxAmount.value;
                params = {
                    id: this.inputParams.id,
                    value: numRangeValue,
                    displayType: this.inputParams.displayType
                };
                break;
            case DISPLAY_TYPE.IMAGE_UPLOAD:
                params = {
                    id: this.inputParams.id,
                    value: this.fileUploadParams,
                    displayType: this.inputParams.displayType
                };
                break;
            case DISPLAY_TYPE.RADIO:
            case DISPLAY_TYPE.ROW_RADIO:
                params = {
                    id: this.inputParams.id,
                    value: this.inputForm.value ? this.inputForm.value : null,
                    displayType: this.inputParams.displayType
                };
                break;
            case DISPLAY_TYPE.MULTI_CHECK_BOX:
            case DISPLAY_TYPE.DROPDOWN_MULTI_CHECK_BOX:
                params = {
                    id: this.inputParams.id,
                    value: this.inputForm.value,
                    displayType: this.inputParams.displayType
                };
                break;
        }
        if (emitValue)
            this.value.emit(params);
    }
    /**
     * @return {?}
     */
    isCalanderOpen() {
        return this.picker.opened;
    }
    /**
     * @return {?}
     */
    closeCalander() {
        this.picker.close();
    }
    /*=====================================================================
                                  HTML
      =====================================================================*/
    /**
     * @param {?} event
     * @return {?}
     */
    selectedOption(event) {
        if (event.value === 'ALL') {
            /** @type {?} */
            const values = this.inputParams.options;
            this.inputParams.options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            (option) => option.selected = true));
            this.inputForm.setValue(values);
            this.emitStepSelection(values);
        }
        else {
            this.inputForm.setValue(event.value);
            this.emitStepSelection(event.value);
        }
        if (this.eventPropagate)
            this.onSubmit();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onToggleChane(event) {
        this.inputForm.setValue(event.checked);
        if (this.eventPropagate)
            this.onSubmit();
    }
    /**
     * @param {?} event
     * @param {?=} index
     * @return {?}
     */
    onBtnToggleChange(event, index) {
        this.inputForm.setValue(event.value);
        if (this.eventPropagate)
            this.onSubmit();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    fileUploadValue(event) {
        this.fileUploadParams = event;
        if (this.eventPropagate)
            this.onSubmit();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    checkAllOptions(event) {
        if (event.checked) { // Check All options
            // Check All options
            /** @type {?} */
            const values = this.inputParams.options;
            this.inputParams.options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            (option) => option.selected = true));
            this.inputForm.setValue(values);
            this.emitStepSelection(values);
        }
        else { // Uncheck all options
            this.inputParams.options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            (option) => option.selected = false));
            this.inputForm.setValue([]);
            this.emitStepSelection([]);
        }
        if (this.eventPropagate)
            this.onSubmit();
    }
    /**
     * @param {?} option
     * @return {?}
     */
    checkedOption(option) {
        /** @type {?} */
        const value = (/** @type {?} */ (this.inputForm.value));
        if (value) {
            /** @type {?} */
            const idIndex = value.findIndex((/**
             * @param {?} val
             * @return {?}
             */
            val => val.id === option.id));
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    setChangedValues(event) {
        this.inputForm.setValue(event);
        if (this.eventPropagate)
            this.onSubmit();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    setDate(event) {
        /** @type {?} */
        const value = event.value;
        value && !this.isDateObj(value) ? this.inputForm.setValue(value.toDate())
            : this.inputForm.setValue(value);
        if (this.eventPropagate)
            this.onSubmit();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    setDateRange(event) {
        /** @type {?} */
        const sDate = this.dateRange.controls.startDate.value;
        /** @type {?} */
        const eDate = this.dateRange.controls.endDate.value;
        sDate && !this.isDateObj(sDate) ? this.dateRange.controls.startDate.setValue(sDate.toDate())
            : this.dateRange.controls.startDate.setValue(sDate);
        eDate && !this.isDateObj(eDate) ? this.dateRange.controls.endDate.setValue(eDate.toDate())
            : this.dateRange.controls.endDate.setValue(eDate);
        if (this.eventPropagate)
            this.onSubmit();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    setNumberRange(event) {
        this.numberRange.controls.minAmount.setValue(this.numberRange.controls.minAmount.value);
        this.numberRange.controls.maxAmount.setValue(this.numberRange.controls.maxAmount.value);
        if (this.eventPropagate)
            this.onSubmit();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    setAutocompleteValue(event) {
        this.inputForm.setValue(event.option.value);
        if (this.eventPropagate)
            this.onSubmit();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    displayFn(value) {
        return value && typeof value === 'object' ? value.value : value;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onSliderValueChange(event) {
        this.inputForm.setValue({ minValue: event.source.min, maxValue: event.value });
    }
    /**
     * @return {?}
     */
    hasError() {
        /** @type {?} */
        let hasError = false;
        switch (this.inputParams.displayType) {
            case DISPLAY_TYPE.CALENDAR_BOX:
            case DISPLAY_TYPE.INPUT_BOX:
            case DISPLAY_TYPE.SELECTION_BOX:
            case DISPLAY_TYPE.AUTOCOMPLETE_SELECT:
            case DISPLAY_TYPE.TEXT_AREA:
            case DISPLAY_TYPE.MULTI_CHECK_BOX:
            case DISPLAY_TYPE.RADIO:
            case DISPLAY_TYPE.ROW_RADIO:
            case DISPLAY_TYPE.TOGGLE:
            case DISPLAY_TYPE.BUTTON_TOGGLE:
            case DISPLAY_TYPE.ROW_INPUT_BOX:
                hasError = this.inputParams.isRequired
                    ? this.inputForm.invalid
                    : this.inputForm.value && this.inputForm.invalid;
                break;
            case DISPLAY_TYPE.DATE_RANGE:
                hasError = this.inputParams.isRequired
                    ? this.dateRange.invalid
                    : ((this.dateRange.controls.startDate.value && this.dateRange.controls.startDate.invalid)
                        || (this.dateRange.controls.startDate.value && !this.dateRange.controls.endDate.value)
                        || (this.dateRange.controls.endDate.value && this.dateRange.controls.endDate.invalid));
                break;
            case DISPLAY_TYPE.NUMBER_RANGE:
                hasError = this.inputParams.isRequired
                    ? this.numberRange.invalid
                    : ((this.numberRange.controls.minAmount.value && this.numberRange.controls.minAmount.invalid)
                        || (this.numberRange.controls.minAmount.value && !this.numberRange.controls.maxAmount.value)
                        || (this.numberRange.controls.maxAmount.value && this.numberRange.controls.maxAmount.invalid));
                break;
            case DISPLAY_TYPE.IMAGE_UPLOAD:
                this.fileUplInst.onSubmit();
                hasError = this.inputParams.isRequired
                    ? (!this.fileUploadParams || Object.keys(this.fileUploadParams).length === 0)
                    : false;
        }
        return hasError;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dropDownToggle(event) {
        this.dropdownOpen.emit(event);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    valueEntered(value) {
        if (this.inputParams.displayType === DISPLAY_TYPE.AUTOCOMPLETE_SELECT) {
            /** @type {?} */
            const option = this.inputParams.options.find((/**
             * @param {?} option
             * @return {?}
             */
            option => option.value === value));
            option ? this.inputForm.setValue(option)
                : this.inputForm.setValue({ id: value, value: value });
            if (this.eventPropagate)
                this.onSubmit();
        }
    }
    /*=====================================================================
                                  PRIVATE
      =====================================================================*/
    /**
     * @private
     * @return {?}
     */
    initialize() {
        /** @type {?} */
        const params = this.inputParams;
        /** @type {?} */
        const formValidations = [];
        if (params.isRequired)
            formValidations.push(Validators.required);
        if (params.validators)
            formValidations.push(Validators.pattern(params.validators.validation));
        switch (params.displayType) {
            case DISPLAY_TYPE.INPUT_BOX:
            case DISPLAY_TYPE.TEXT_AREA:
            case DISPLAY_TYPE.RADIO:
            case DISPLAY_TYPE.ROW_RADIO:
            case DISPLAY_TYPE.SELECTION_BOX:
            case DISPLAY_TYPE.TOGGLE:
            case DISPLAY_TYPE.MULTI_CHECK_BOX:
            case DISPLAY_TYPE.BUTTON_TOGGLE:
            case DISPLAY_TYPE.ROW_INPUT_BOX:
            case DISPLAY_TYPE.DROPDOWN_MULTI_CHECK_BOX:
                this.inputForm = new FormControl(params.value || null, formValidations);
                if (params.options && params.options.length) {
                    /** @type {?} */
                    const selectedValues = [];
                    params.options.forEach((/**
                     * @param {?} opt
                     * @return {?}
                     */
                    opt => {
                        if (opt.selected)
                            selectedValues.push(opt);
                    }));
                    if (selectedValues.length)
                        this.inputForm.setValue(selectedValues);
                }
                if (params.value)
                    this.inputForm.setValue(params.value);
                this.setDisabled(params.isDisabled);
                break;
            case DISPLAY_TYPE.AUTOCOMPLETE_SELECT:
                this.inputForm = new FormControl(params.value || null, formValidations);
                this.filteredOptions = this.inputForm.valueChanges.pipe(startWith(''), map((/**
                 * @param {?} value
                 * @return {?}
                 */
                value => typeof value === 'string' ? value : value.value)), map((/**
                 * @param {?} value
                 * @return {?}
                 */
                value => value ? this.filterOptions(value)
                    : this.inputParams.options.slice())));
                this.setDisabled(params.isDisabled);
                break;
            case DISPLAY_TYPE.CALENDAR_BOX:
                if (params.value)
                    params.value = new Date(params.value);
                formValidations.push(InputValidator.futureDateValidator);
                this.inputForm = new FormControl(params.value || null, formValidations);
                this.setDisabled(params.isDisabled);
                break;
            case DISPLAY_TYPE.DATE_RANGE:
                /** @type {?} */
                const dateRangeKeys = params.rangeKeys || ['startDate', 'endDate'];
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
                const valiArr = [InputValidator.dateValidator];
                if (!params.validators || !params.validators.allowFutureDate)
                    valiArr.push(InputValidator.futureDateValidatorIfAllowed);
                this.dateRange.setValidators(valiArr);
                if (params.isDisabled)
                    this.dateRange.disable();
                break;
            case DISPLAY_TYPE.NUMBER_RANGE:
                if (params.value) {
                    /** @type {?} */
                    const numRangeKeys = params.rangeKeys || ['minAmount', 'maxAmount'];
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
            case DISPLAY_TYPE.SLIDER:
                // this.numberRange = this.formBuilder.group({
                //   minAmount : [params.value['minAmount'] || null, formValidations],
                //   maxAmount : [params.value['maxAmount'] || null, formValidations]
                // },
                // {
                //   validator : [InputValidator.amountValidator]
                // })
                // if (params.isDisabled) this.numberRange.disable()
                this.inputForm = new FormControl(params.value || null, formValidations);
                if (params.options && params.options.length) {
                    /** @type {?} */
                    const selectedValues = [];
                    params.options.forEach((/**
                     * @param {?} opt
                     * @return {?}
                     */
                    opt => {
                        if (opt.selected)
                            selectedValues.push(opt);
                        this.sliderLabel = opt.id === 'formatLabel' ? (/** @type {?} */ (opt.value)) : '';
                    }));
                    if (selectedValues.length)
                        this.inputForm.setValue(selectedValues);
                }
                this.setDisabled(params.isDisabled);
                break;
        }
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    emitStepSelection(value) {
        /** @type {?} */
        const selFilter = {
            id: this.inputParams.id,
            value: value
        };
        this.stepSelectedFilter.emit(selFilter);
    }
    /**
     * @private
     * @param {?} inputText
     * @return {?}
     */
    filterOptions(inputText) {
        /** @type {?} */
        const filterValue = inputText.toLowerCase();
        return this.inputParams.options.filter((/**
         * @param {?} option
         * @return {?}
         */
        option => ((/** @type {?} */ (option.value))).toLowerCase().includes(filterValue)));
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    setDisabled(value) {
        value ? this.inputForm.disable() : this.inputForm.enable();
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    isDateObj(value) {
        /** @type {?} */
        let isDate;
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
    }
}
InputContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'input-container',
                template: "<div [ngClass]=\"webMode ? ['web-view-input-comp'] : ['input-cont-comp']\"\n  [class.vertical-mode]=\"displayMode === DISPLAY_MODE.VERTICAL\"\n  [ngClass.xl]=\"webMode ? ['web-view-input-comp'] : ['web-input-cont-comp']\"\n  [ngClass.lg]=\"webMode ? ['web-view-input-comp'] : ['web-input-cont-comp']\"\n  [ngClass.md]=\"webMode ? ['web-view-input-comp'] : ['web-input-cont-comp']\"\n  [ngClass.sm]=\"webMode ? ['web-view-input-comp'] : ['web-input-cont-comp']\">\n\n  <div class=\"label-txt txt-md-reg-norm\" *ngIf=\"displayLabel && inputParams.label && inputParams.displayType !== DISPLAY_TYPE.ROW_INPUT_BOX\">\n    {{ inputParams.label }}\n  </div>\n\n  <ng-container [ngSwitch]=\"inputParams.displayType\">\n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.INPUT_BOX\">\n\n      <div class=\"onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParams.isDisabled\">\n        <div class=\"prefix-image\" *ngIf=\"inputParams?.image?.prefixParams\">\n          <i class=\"{{ inputParams.image.prefixParams?.iconClass }}\"></i>\n          <img src=\"{{ inputParams.image.prefixParams?.imgUrl }}\">\n        </div>\n        <input matInput\n          placeholder=\"{{inputParams.placeHolder}}\"\n          type=\"{{inputParams.inputType}}\"\n          (updatedValue)=\"setChangedValues($event)\"\n          class=\"txt-md-med-norm input-cont\" \n          [formControl]=\"inputForm\"\n          name=\"input-text\"\n          [ncMaxLength]=\"inputParams.maxLength || 1000\"\n          (updatedValue)=\"inputForm.setValue($event)\"\n          textSecurity=\"inputParams.isPassword\"\n          [class.num-password-input]=\"inputParams.isPassword\"\n          autocomplete=\"off\"\n          [keyboard]=\"parentCont\"\n          >\n          <div class=\"suffix-image\" *ngIf=\"inputParams?.image?.suffixParams\">\n            <i class=\"{{ inputParams.image.suffixParams?.iconClass }}\"></i>\n            <img src=\"{{ inputParams.image.suffixParams?.imgUrl }}\">\n          </div>\n      </div>\n  \n    </ng-container> \n    \n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.TEXT_AREA\">\n\n      <div class=\"onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParams.isDisabled\">\n        <textarea matInput\n          placeholder=\"{{inputParams.placeHolder}}\"\n          type=\"{{inputParams.inputType}}\"\n          (updatedValue)=\"setChangedValues($event)\"\n          class=\"txt-md-med-norm input-cont\" \n          [formControl]=\"inputForm\"\n          name=\"input-text\"\n          [ncMaxLength]=\"inputParams.maxLength || 1000\"\n          (updatedValue)=\"inputForm.setValue($event)\"\n          textSecurity=\"inputParams.isPassword\"\n          [class.num-password-input]=\"inputParams.isPassword\"\n          autocomplete=\"off\"\n          [keyboard]=\"parentCont\"\n          >\n        </textarea> \n      </div>\n\n    </ng-container>  \n  \n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.SELECTION_BOX\">\n\n      <div class=\"onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParams.isDisabled\">\n        <mat-select [formControl]=\"inputForm\"\n          placeholder=\"{{inputParams.placeHolder}}\" \n          class=\"txt-md-med-norm input-cont\"\n          (selectionChange)=\"selectedOption($event)\"\n          (openedChange)=\"dropDownToggle($event)\">\n          <mat-option *ngIf=\"inputParams.selectAll\" [value]=\"'ALL'\"\n            class=\"txt-md-med-norm\">\n            All\n          </mat-option>\n          <mat-option *ngFor=\"let option of inputParams.options\" [value]=\"option\"\n            class=\"txt-md-med-norm\">\n            {{ option.value }}\n          </mat-option>\n        </mat-select>\n      </div>\n\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.MULTI_CHECK_BOX\">\n\n      <div class=\"checkbox-cont\">\n\n        <mat-checkbox *ngIf=\"inputParams.selectAll\" [value]=\"'ALL'\"\n          class=\"txt-md-med-norm checkbox\"\n          (change)=\"checkAllOptions($event)\">\n          Select All\n        </mat-checkbox>\n\n        <mat-checkbox *ngFor=\"let option of inputParams.options\" [value]=\"option\"\n          class=\"txt-md-med-norm checkbox\"\n          [checked]=\"option.selected\"\n          (change)=\"checkedOption(option)\">\n          {{ option.value }}\n        </mat-checkbox>\n      </div>\n  \n    </ng-container>\n    \n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.RADIO\">\n\n      <mat-radio-group [formControl]=\"inputForm\"\n        class=\"txt-md-med-norm input-cont radio-group\"\n        (change)=\"selectedOption($event)\">\n        <mat-radio-button  *ngFor=\"let option of inputParams.options\" [value]=\"option\" \n          class=\"txt-md-med-norm radio-button\"\n          [checked]=\"option.selected\">\n          {{ option.value }}\n        </mat-radio-button>\n      </mat-radio-group>\n\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.ROW_RADIO\">\n\n      <mat-radio-group [formControl]=\"inputForm\"\n        class=\"txt-md-med-norm vert-input-cont vert-radio-group\"\n        (change)=\"selectedOption($event)\">\n        <mat-radio-button  *ngFor=\"let option of inputParams.options\" [value]=\"option\" \n          class=\"txt-md-med-norm radio-button\"\n          [checked]=\"option.selected\">\n          {{ option.value }}\n        </mat-radio-button>\n      </mat-radio-group>\n\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.TOGGLE\">\n      <mat-slide-toggle class=\"toggle-cont txt-md-med-norm\"\n        [labelPosition]=\"'after'\"\n        (change)=\"onToggleChane($event)\">\n        {{ inputParams.label }}\n      </mat-slide-toggle>\n\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.CALENDAR_BOX\">\n      <div class=\"onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParams.isDisabled\">\n        <input matInput\n          [formControl]=\"inputForm\"\n          [matDatepicker]=\"picker\" \n          (dateChange)=\"setDate($event)\"\n          placeholder=\"{{inputParams.placeHolder}}\"\n          class=\"txt-md-med-norm input-cont\"\n          [keyboard]=\"parentCont\">\n        <mat-datepicker-toggle matSuffix [for]=\"picker\" disableRipple=\"false\"></mat-datepicker-toggle>\n        <mat-datepicker touchUi #picker></mat-datepicker>\n      </div>\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.DATE_RANGE\" [formGroup]=\"dateRange\">\n      <div class=\"range\">\n        <div class=\"range-onb-input-box-cont border-primary\">\n          <input matInput\n            formControlName=\"startDate\"\n            [matDatepicker]=\"startPicker\" \n            (dateChange)=\"setDateRange($event)\"\n            placeholder=\"{{inputParams.placeHolder[0]}}\"\n            class=\"txt-md-med-norm input-cont\"\n            [keyboard]=\"parentCont\">\n          <mat-datepicker-toggle matSuffix [for]=\"startPicker\" disableRipple=\"false\"></mat-datepicker-toggle>\n          <mat-datepicker touchUi #startPicker></mat-datepicker>\n        </div>\n\n        <div class=\"range-onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParams.isDisabled\">\n          <input matInput\n            formControlName=\"endDate\"\n            [matDatepicker]=\"endPicker\" \n            (dateChange)=\"setDateRange($event)\"\n            placeholder=\"{{inputParams.placeHolder[1]}}\"\n            class=\"txt-md-med-norm input-cont\"\n            [keyboard]=\"parentCont\">\n          <mat-datepicker-toggle matSuffix [for]=\"endPicker\" disableRipple=\"false\"></mat-datepicker-toggle>\n          <mat-datepicker touchUi #endPicker></mat-datepicker>\n        </div>\n      </div>\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.NUMBER_RANGE\" [formGroup]=\"numberRange\">\n      <div class=\"range\">\n        <div class=\"range-onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParams.isDisabled\">\n          <input matInput\n            placeholder=\"{{inputParams.placeHolder[0]}}\"\n            type=\"number\"\n            (input)=\"setNumberRange($event)\"\n            class=\"txt-md-med-norm input-cont\" \n            formControlName=\"minAmount\"\n            name=\"input-text\"\n            textSecurity=\"inputParams.isPassword\"\n            [class.num-password-input]=\"inputParams.isPassword\"\n            autocomplete=\"off\"\n            [keyboard]=\"parentCont\"\n            >\n        </div>\n    \n        <div class=\"range-onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParams.isDisabled\">\n          <input matInput\n            placeholder=\"{{inputParams.placeHolder[1]}}\"\n            type=\"number\"\n            (input)=\"setNumberRange($event)\"\n            class=\"txt-md-med-norm input-cont\" \n            formControlName=\"maxAmount\"\n            name=\"input-text\"\n            textSecurity=\"inputParams.isPassword\"\n            [class.num-password-input]=\"inputParams.isPassword\"\n            autocomplete=\"off\"\n            [keyboard]=\"parentCont\"\n            >\n        </div>\n      </div>\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.AUTOCOMPLETE_SELECT\">\n      <div class=\"onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParams.isDisabled\">\n        <input matInput #autoCompInput\n          type=\"text\"\n          class=\"txt-md-med-norm input-cont\" \n          placeholder=\"{{inputParams.placeHolder}}\"\n          [formControl]=\"inputForm\"\n          [matAutocomplete]=\"auto\"\n          [keyboard]=\"parentCont\"\n          (blur)=\"valueEntered(autoCompInput.value)\">\n\n        <mat-autocomplete #auto=\"matAutocomplete\" [displayWith]=\"displayFn\"\n          (optionSelected)=\"setAutocompleteValue($event)\"\n          class=\"txt-xl-med-norm input-cont\">\n          <mat-option *ngFor=\"let option of filteredOptions | async\" [value]=\"option\"\n            class=\"txt-md-med-norm\">\n            {{ option.value }}\n          </mat-option>\n        </mat-autocomplete>\n      </div>\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.BUTTON_TOGGLE\">\n      <mat-button-toggle-group name=\"toggle\" class=\"button-toggle\" #group=\"matButtonToggleGroup\">\n\n        <ng-container *ngFor=\"let option of inputParams.options ; let i = index\">\n\n          <mat-button-toggle value=\"{{option.id}}\" class=\"txt-md-reg-norm\"\n            [checked]=\"option.selected\"\n            [ngClass]=\"{ 'primary-bg' : group.value === option.id, 'text-color-white' : group.value === option.id}\"\n            (change)=\"onBtnToggleChange($event)\">\n            {{ option.value }}\n          </mat-button-toggle>\n        </ng-container>\n      </mat-button-toggle-group>\n\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.ROW_INPUT_BOX\">\n      <div class=\"input-container\">\n\n        <div class=\"label-txt txt-md-reg-norm\" *ngIf=\"displayLabel && inputParams.label\">\n          {{ inputParams.label }}\n        </div>\n\n        <div class=\"onb-input-box-cont border-primary small-box\" [class.border-disabled]=\"inputParams.isDisabled\">\n          <input matInput\n            placeholder=\"{{inputParams.placeHolder}}\"\n            type=\"{{inputParams.inputType}}\"\n            (updatedValue)=\"setChangedValues($event)\"\n            class=\"txt-md-med-norm input-cont\" \n            [formControl]=\"inputForm\"\n            name=\"input-text\"\n            [ncMaxLength]=\"inputParams.maxLength || 1000\"\n            (updatedValue)=\"inputForm.setValue($event)\"\n            textSecurity=\"inputParams.isPassword\"\n            [class.num-password-input]=\"inputParams.isPassword\"\n            autocomplete=\"off\"\n            [keyboard]=\"parentCont\">\n        </div>\n\n      </div>  \n    </ng-container>  \n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.IMAGE_UPLOAD\">\n      <file-upload\n        [screen]=\"screen\"\n        (value)=\"fileUploadValue($event)\"\n        [isRequired]=\"inputParams.isRequired\">\n      </file-upload>  \n    </ng-container> \n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.SLIDER\">\n      <mat-slider\n        thumbLabel=\"true\"\n        [displayWith]=\"formatLabel\"\n        [disabled]=\"inputParams.isDisabled\"\n        tickInterval=\"1\"\n        min=\"inputParams.options[0].value\"\n        max=\"inputParams.options[1].value\"\n        class=\"txt-md-med-norm\"\n        (change)=\"onSliderValueChange($event)\">\n        {{ inputParams.label }}\n      </mat-slider>\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"DISPLAY_TYPE.DROPDOWN_MULTI_CHECK_BOX\">\n      <drop-down-multi-select\n        [options]=\"inputParams.options\"\n        [placeholder]=\"inputParams.placeHolder\"\n        [showSelectAll]=\"inputParams.selectAll\"\n        (selectedItems)=\"checkedOption($event)\"\n        (selectedAll)=\"checkAllOptions($event)\">\n      </drop-down-multi-select>\n    </ng-container>\n\n  </ng-container>  \n\n  <div *ngIf=\"inputForm\" class=\"errors-list\">\n    <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputForm.touched && inputParams.isRequired && \n      inputForm.hasError('required')\">\n      <span *ngIf=\"inputParams.displayType === DISPLAY_TYPE.RADIO || \n        inputParams.displayType === DISPLAY_TYPE.SELECTION_BOX ||\n        inputParams.displayType === DISPLAY_TYPE.MULTI_CHECK_BOX ; else default\" class=\"err-text\">\n        {{ inputParams.validators ? inputParams.validators.validationError : ('mu_inpt_cont_sel_err' | translate) }}\n      </span>\n      <ng-template #default>\n        {{ inputParams.validators ? inputParams.validators.validationError : ('mu_inpt_cont_val_err' | translate) }}\n      </ng-template>\n    </mat-error>\n\n    <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputForm.touched && inputForm.value &&\n      inputForm.hasError('pattern')\">\n      {{ inputParams.validators ? inputParams.validators.validationError : ('mu_inpt_cont_val_err' | translate) }}\n    </mat-error>\n\n    <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputForm.touched && inputForm.errors && \n      inputForm.hasError('futureDate')\">\n      {{ 'mu_inpt_cont_futr_date_err' | translate }}\n    </mat-error>\n  </div>\n\n  <div *ngIf=\"dateRange\" class=\"errors-list\">\n    <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"dateRange.get('startDate').hasError('noStartDate')\">\n      {{ 'mu_inpt_cont_strt_date_err' | translate }}\n    </mat-error>\n  \n    <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"dateRange.get('startDate').hasError('startDateExceed')\">\n      {{ 'mu_inpt_cont_date_err' | translate }}\n    </mat-error>\n\n    <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"dateRange.get('startDate').hasError('futureDate') || \n      dateRange.get('endDate').hasError('futureDate')\">\n      {{ 'mu_inpt_cont_futr_date_err' | translate }}\n    </mat-error>\n\n    <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputParams.isRequired && \n      (dateRange.get('startDate').touched && dateRange.get('endDate').touched) &&\n      (dateRange.get('startDate').hasError('required') || dateRange.get('endDate').hasError('required'))\">\n      {{ inputParams.validators ? inputParams.validators.validationError : ('mu_inpt_cont_val_err' | translate) }}\n    </mat-error>\n\n    <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\" (dateRange.get('startDate').touched && \n      dateRange.get('endDate').touched) && dateRange.get('startDate').value && !dateRange.get('endDate').value\">\n      {{ 'mu_inpt_cont_end_date_err' | translate }}\n    </mat-error>\n  </div>\n  \n  <div *ngIf=\"numberRange\" class=\"errors-list\">\n    <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"numberRange.get('minAmount').hasError('noMinAmount')\">\n      {{ 'mu_inpt_cont_min_amnt_err' | translate }}\n    </mat-error>\n  \n    <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"numberRange.get('minAmount').hasError('minAmountExceed')\">\n      {{ 'mu_inpt_cont_amnt_err' | translate }}\n    </mat-error>\n\n    <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputParams.isRequired && \n      (numberRange.get('minAmount').touched || numberRange.get('maxAmount').touched) &&\n      (numberRange.get('minAmount').hasError('required') || numberRange.get('maxAmount').hasError('required'))\">\n      {{ inputParams.validators ? inputParams.validators.validationError : ('mu_inpt_cont_val_err' | translate) }}\n    </mat-error>\n  </div>\n\n</div>",
                styles: [".onb-input-box-cont{align-items:center;border-style:solid;border-width:2px;display:flex;margin:2% 0 0;position:relative}.button-toggle{margin:2vw 0}.input-container{align-items:center;display:flex;justify-content:space-between;position:relative}.input-container .label-txt{margin-right:2vw;width:72vw}.input-container .small-box{width:14vw}.input-container .input-cont{text-align:center}.radio-button{padding-bottom:2vw!important}.radio-group{display:flex;flex-direction:column;padding:3vw 0 0 2vw!important}.checkbox,.checkbox-cont{padding:1vw 0}.checkbox-cont{display:flex;flex-direction:column;position:relative}.range-onb-input-box-cont{align-items:center;border-style:solid;border-width:2px;display:flex;position:relative;width:46%}.input-cont,.range-onb-input-box-cont .input-cont{background:none;border:0;padding:4vw;position:relative;width:100%}.toggle-cont{margin:2vw 0}.input-cont-comp{margin:2vw 4vw;position:relative}.range{display:flex;flex-direction:row;justify-content:space-between}.errors-list{display:flex;flex-direction:column;padding-top:1vw}.web-input-cont-comp{margin:10px 20px}.web-input-cont-comp .input-cont,.web-input-cont-comp .range-onb-input-box-cont .input-cont{background:none;border:0;padding:15px;position:relative;width:100%}.web-input-cont-comp .errors-list{padding-top:5px}.web-input-cont-comp .radio-button{padding-bottom:10px!important}.web-input-cont-comp .radio-group{padding:5px 0!important}.web-view-input-comp .onb-input-box-cont{align-items:center;border-style:solid;border-width:2px;display:flex;margin:2% 0;position:relative}.web-view-input-comp .range-onb-input-box-cont{align-items:center;border-style:solid;border-width:2px;display:flex;margin:.5% 0;position:relative;width:48%}.web-view-input-comp .input-cont{background:none;border:0;padding:12px 8px;position:relative;width:100%}.web-view-input-comp .errors-list{padding-top:5px}.web-view-input-comp .radio-button{padding-bottom:10px!important}.web-view-input-comp .radio-group{padding:5px 0!important}.web-view-input-comp .vert-radio-group{padding:8px 0!important}.web-view-input-comp .vert-radio-group .radio-button{padding-right:10px!important}.vertical-mode .checkbox,.vertical-mode .radio-group{padding:5px 0!important}.vertical-mode .radio-button{padding:8px 0!important}.vertical-mode .checkbox-cont{padding:5px 0}.prefix-image,.suffix-image{padding:0 10px}"]
            }] }
];
/** @nocollapse */
InputContainerComponent.ctorParameters = () => [
    { type: RunContextBrowser, decorators: [{ type: Inject, args: ['RunContext',] }] },
    { type: FormBuilder }
];
InputContainerComponent.propDecorators = {
    picker: [{ type: ViewChild, args: [MatDatepicker, { static: false },] }],
    fileUplInst: [{ type: ViewChild, args: [FileUploadComponent, { static: false },] }],
    inputParams: [{ type: Input }],
    screen: [{ type: Input }],
    webMode: [{ type: Input }],
    parentCont: [{ type: Input }],
    eventPropagate: [{ type: Input }],
    displayMode: [{ type: Input }],
    displayLabel: [{ type: Input }],
    value: [{ type: Output }],
    dropdownOpen: [{ type: Output }],
    stepSelectedFilter: [{ type: Output }]
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
const ANIM_TRANSITION = 600;
/** @type {?} */
const KEY_ANIM_TRANS = 200;
/** @type {?} */
const EVENT_TIME_TAKEN = 250;
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
class DialerComponent {
    /**
     * @param {?} rc
     * @param {?} renderer
     * @param {?} ngZone
     */
    constructor(rc, renderer, ngZone) {
        this.rc = rc;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.eventPropagte = false;
        this.value = new EventEmitter();
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
    onHostKeyup(event) {
        this.onKeyDown(event);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const slicedItems = this.dialerParams.dialerOptions.slice(0);
        this.viewPortItems = slicedItems;
        this.selectedItem = this.dialerParams.selectedItem || this.viewPortItems[0];
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        const scrollElem = this.scrollCont.nativeElement;
        /** @type {?} */
        const viewPortChildren = scrollElem.children;
        /** @type {?} */
        const rect = viewPortChildren[1].getBoundingClientRect();
        /** @type {?} */
        const width = rect.width;
        this.contentHolder.nativeElement.style.height = `${rect.height}px`;
        this.contentHolder.nativeElement.style.width = `${width}px`;
        this.contentHolder.nativeElement.style.top = this.dialerParams.highlightPos
            ? `(${this.dialerParams.highlightPos} * ${rect.height})px`
            : `${rect.height}px`;
        this.scrollCont.nativeElement.style.top = this.dialerParams.highlightPos
            ? `(${this.dialerParams.highlightPos} * ${rect.height})px`
            : `${rect.height}px`;
        this.nail = new Nail(this.rc, this.scrollCont.nativeElement, this, this.renderer, { axisX: false, axisY: true });
        this.multiStepVal = new MultiStepValue(0, rect.height, this.dialerParams.dialerOptions.length, false, true);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
    }
    /*=====================================================================
                                  PRIVATE
      =====================================================================*/
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        /** @type {?} */
        const scrollElem = this.scrollCont.nativeElement;
        /** @type {?} */
        const viewPortChildren = scrollElem.children;
        /** @type {?} */
        const rect = viewPortChildren[1].getBoundingClientRect();
        /** @type {?} */
        const lastIndex = this.lastIndex;
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
        const currentIndex = this.multiStepVal.currentIndex;
        if (currentIndex === lastIndex)
            return;
        this.scrollCont.nativeElement.style.transition = `${KEY_ANIM_TRANS}ms`;
        DomHelper.setTransform(this.scrollCont.nativeElement, 0, -this.multiStepVal.currentValue, 0);
        this.lastIndex = this.multiStepVal.currentIndex;
        this.selectedItem = this.dialerParams.dialerOptions[this.lastIndex];
        // this.rc.audio.play(this.rc.audio.SELECT)
        if (this.sound)
            this.sound.play();
        if (this.eventPropagte)
            this.value.emit(this.selectedItem);
    }
    /*=====================================================================
                                  CALLBACKS
      =====================================================================*/
    /**
     * @return {?}
     */
    onPanStart() {
        this.scrollCont.nativeElement.style.transition = 'none';
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onPanMove(event) {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const scrollElem = this.scrollCont.nativeElement;
            /** @type {?} */
            const viewPortChildren = scrollElem.children;
            /** @type {?} */
            const rect = viewPortChildren[1].getBoundingClientRect();
            /** @type {?} */
            const deltaY = event.deltaY;
            /** @type {?} */
            const value = this.multiStepVal.transition(deltaY);
            /** @type {?} */
            const lastIndex = this.lastIndex;
            /** @type {?} */
            const newIndex = Math.round(value / rect.height);
            if (lastIndex !== newIndex) {
                if (this.sound)
                    this.sound.play();
                this.lastIndex = newIndex;
            }
            this.nail.requestAnimate(value);
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), `onPanMove ${JSON.stringify({ event, lastIndex: this.lastIndex })}`);
            this.selectedItem = this.dialerParams.dialerOptions[this.lastIndex];
        }));
        return true;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onPanAnimate(value) {
        this.ngZone.run((/**
         * @return {?}
         */
        () => {
            DomHelper.setTransform(this.scrollCont.nativeElement, 0, -value, 0);
        }));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onPanEnd(event) {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const deltaY = event.deltaY;
            /** @type {?} */
            const scrollElem = this.scrollCont.nativeElement;
            /** @type {?} */
            const viewPortChildren = scrollElem.children;
            /** @type {?} */
            const rect = viewPortChildren[1].getBoundingClientRect();
            /** @type {?} */
            const value = this.multiStepVal.transition(deltaY);
            /** @type {?} */
            const currentIndex = this.multiStepVal.currentIndex;
            this.multiStepVal.final(deltaY, event.speed, event.quickRatio);
            /** @type {?} */
            const latestIndex = this.multiStepVal.currentIndex;
            /** @type {?} */
            const newIndex = Math.round(value / rect.height);
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), `onPanEnd ${JSON.stringify({ event, lastIndex: this.lastIndex, newIndex, currentIndex, latestIndex })}`);
            if (currentIndex === latestIndex)
                return;
            this.scrollCont.nativeElement.style.transition = `${ANIM_TRANSITION}ms`;
            /** @type {?} */
            const totalDisplacement = Math.abs((event.timeTaken < EVENT_TIME_TAKEN ? currentIndex : newIndex) - latestIndex) || 1;
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), `totalDisplacement ${JSON.stringify(totalDisplacement)}`);
            /** @type {?} */
            const interval = setInterval((/**
             * @return {?}
             */
            () => {
                if (this.sound)
                    this.sound.play();
            }), ANIM_TRANSITION / totalDisplacement);
            if (latestIndex >= currentIndex) {
                for (let i = currentIndex; i <= latestIndex; i = i + 0.25) {
                    DomHelper.setTransform(this.scrollCont.nativeElement, 0, -rect.height * i, 0);
                }
            }
            else {
                for (let i = latestIndex; i < currentIndex; i = i + 0.25) {
                    DomHelper.setTransform(this.scrollCont.nativeElement, 0, rect.height * i, 0);
                }
            }
            setTimeout((/**
             * @return {?}
             */
            () => {
                clearInterval(interval);
            }), ANIM_TRANSITION);
        }));
        this.ngZone.run((/**
         * @return {?}
         */
        () => {
            DomHelper.setTransform(this.scrollCont.nativeElement, 0, -this.multiStepVal.currentValue, 0);
            this.lastIndex = this.multiStepVal.currentIndex;
            this.selectedItem = this.dialerParams.dialerOptions[this.lastIndex];
            if (this.eventPropagte)
                this.value.emit(this.selectedItem);
        }));
    }
    /*=====================================================================
                                  UTILS
      =====================================================================*/
    /**
     * @return {?}
     */
    getSelectedItem() {
        this.value.emit(this.selectedItem);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    scrollToElem(index) {
        if (index === this.multiStepVal.currentIndex)
            return;
        /** @type {?} */
        const scrollElem = this.scrollCont.nativeElement;
        /** @type {?} */
        const viewPortChildren = scrollElem.children;
        /** @type {?} */
        const rect = viewPortChildren[1].getBoundingClientRect();
        if (index > this.multiStepVal.currentIndex) {
            this.multiStepVal.final(-rect.height, 0.2);
        }
        else {
            this.multiStepVal.final(rect.height, 0.2);
        }
        this.scrollCont.nativeElement.style.transition = `${KEY_ANIM_TRANS}ms`;
        DomHelper.setTransform(this.scrollCont.nativeElement, 0, -this.multiStepVal.currentValue, 0);
        this.lastIndex = this.multiStepVal.currentIndex;
        this.selectedItem = this.dialerParams.dialerOptions[this.lastIndex];
        // this.rc.audio.play(this.rc.audio.SELECT)
        if (this.sound)
            this.sound.play();
        if (this.eventPropagte)
            this.value.emit(this.selectedItem);
    }
}
DialerComponent.decorators = [
    { type: Component, args: [{
                selector: 'dialer',
                template: "\n<div class=\"dialer-comp primary-bg\" #contentHolder></div>\n\n<div class=\"dialer-cont\" #scrollCont>\n\n  <ng-container *ngFor=\"let option of viewPortItems; let i = index\">\n\n    <div class=\"dialer-value txt-lg-reg-norm\" (click)=\"scrollToElem(i)\"\n    [class.text-color-white]=\"selectedItem.id === option.id\" tabindex=\"-1\">\n      {{ option.value }}\n    </div>  \n  </ng-container>\n\n</div>\n",
                styles: [":host{display:block;height:100%;overflow-x:hidden;overflow-y:hidden;position:relative;text-align:center;width:100%}.dialer-value{padding:2vw}.dialer-cont{overflow-x:hidden;overflow-y:hidden;position:relative;width:100%}.dialer-cont::-webkit-scrollbar{display:none}.dialer-comp{position:absolute;width:100%}.dialer-holder{position:relative}"]
            }] }
];
/** @nocollapse */
DialerComponent.ctorParameters = () => [
    { type: RunContextBrowser, decorators: [{ type: Inject, args: ['RunContext',] }] },
    { type: Renderer2 },
    { type: NgZone }
];
DialerComponent.propDecorators = {
    onHostKeyup: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    scrollCont: [{ type: ViewChild, args: ['scrollCont', { static: true },] }],
    contentHolder: [{ type: ViewChild, args: ['contentHolder', { static: true },] }],
    parentDiv: [{ type: Input }],
    dialerParams: [{ type: Input }],
    eventPropagte: [{ type: Input }],
    value: [{ type: Output }]
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MuFormContainerComponent {
    /**
     * @param {?} rc
     * @param {?} formBuilder
     * @param {?} changeRef
     */
    constructor(rc, formBuilder, changeRef) {
        this.rc = rc;
        this.formBuilder = formBuilder;
        this.changeRef = changeRef;
        this.eventPropagate = false;
        this.displayLabel = true;
        this.value = new EventEmitter();
        this.dropdownOpen = new EventEmitter();
        this.lastInpField = new EventEmitter();
        this.inputForm = (/** @type {?} */ ({}));
        this.DISPLAY_TYPE = DISPLAY_TYPE;
        this.DISPLAY_MODE = DISPLAY_MODE;
        this.maxDate = new Date();
        this.inputForm = this.formBuilder.group({});
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.initialize();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initialize();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.inputContainers = this.inputCont.toArray().map((/**
             * @param {?} val
             * @return {?}
             */
            val => val.nativeElement));
        }), 10);
    }
    /*=====================================================================
                                  UTILS
      =====================================================================*/
    /**
     * @param {?=} manual
     * @param {?=} id
     * @return {?}
     */
    onSubmit(manual = true, id) {
        for (const inputParams of this.formParams.inputParams) {
            if (this.inputForm && (inputParams.validators || inputParams.isRequired) && manual)
                this.inputForm.get(inputParams.id).markAsTouched();
        }
        if (manual && this.hasError())
            return false;
        /** @type {?} */
        const formOutputParams = (/** @type {?} */ ({}));
        for (const inputParams of this.formParams.inputParams) {
            if (id && id !== inputParams.id)
                continue;
            /** @type {?} */
            let params;
            switch (inputParams.displayType) {
                case DISPLAY_TYPE.CALENDAR_BOX:
                    params = {
                        value: this.inputForm.get(inputParams.id).value ? this.inputForm.get(inputParams.id).value.getTime() : null,
                        displayType: inputParams.displayType
                    };
                    break;
                case DISPLAY_TYPE.INPUT_BOX:
                case DISPLAY_TYPE.SELECTION_BOX:
                case DISPLAY_TYPE.AUTOCOMPLETE_SELECT:
                case DISPLAY_TYPE.TEXT_AREA:
                case DISPLAY_TYPE.TOGGLE:
                case DISPLAY_TYPE.BUTTON_TOGGLE:
                case DISPLAY_TYPE.ROW_INPUT_BOX:
                case DISPLAY_TYPE.TIME:
                    params = {
                        value: this.inputForm.get(inputParams.id).value,
                        displayType: inputParams.displayType
                    };
                    break;
                case DISPLAY_TYPE.DATE_RANGE:
                    /** @type {?} */
                    const dateFormGroup = (/** @type {?} */ (this.inputForm.get(inputParams.id)));
                    /** @type {?} */
                    const dateRangeKeys = inputParams.rangeKeys || ['startDate', 'endDate'];
                    /** @type {?} */
                    const dateValue = {};
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
                case DISPLAY_TYPE.NUMBER_RANGE:
                    /** @type {?} */
                    const numFormGroup = (/** @type {?} */ (this.inputForm.get(inputParams.id)));
                    /** @type {?} */
                    const numRangeKeys = inputParams.rangeKeys || ['minAmount', 'maxAmount'];
                    /** @type {?} */
                    const numRangeValue = {};
                    numRangeValue[numRangeKeys[0]] = numFormGroup.controls.minAmount.value,
                        numRangeValue[numRangeKeys[1]] = numFormGroup.controls.maxAmount.value;
                    params = {
                        value: numRangeValue,
                        displayType: inputParams.displayType
                    };
                    break;
                case DISPLAY_TYPE.IMAGE_UPLOAD:
                    params = {
                        value: this.fileUploadParams,
                        displayType: inputParams.displayType
                    };
                    break;
                case DISPLAY_TYPE.RADIO:
                case DISPLAY_TYPE.ROW_RADIO:
                    params = {
                        value: this.inputForm.get(inputParams.id).value || null,
                        displayType: inputParams.displayType
                    };
                    break;
                case DISPLAY_TYPE.MULTI_CHECK_BOX:
                    params = {
                        value: this.inputForm.get(inputParams.id).value,
                        displayType: inputParams.displayType
                    };
                    break;
            }
            formOutputParams[inputParams.id] = params;
        }
        this.value.emit(formOutputParams);
        return true;
    }
    /**
     * @return {?}
     */
    isCalanderOpen() {
        /** @type {?} */
        const pickers = this.picker.toArray();
        return pickers.some((/**
         * @param {?} val
         * @return {?}
         */
        val => val.opened));
    }
    /**
     * @return {?}
     */
    closeCalander() {
        /** @type {?} */
        const pickers = this.picker.toArray();
        /** @type {?} */
        const length = pickers.length;
        for (let i = 0; i < length; i++) {
            if (pickers[i].opened) {
                pickers[i].close();
                break;
            }
        }
    }
    /**
     * @return {?}
     */
    clearForm() {
        this.inputForm.reset();
    }
    /*=====================================================================
                                  HTML
      =====================================================================*/
    /**
     * @param {?} event
     * @param {?} i
     * @return {?}
     */
    selectedOption(event, i) {
        /** @type {?} */
        const inputParams = this.formParams.inputParams[i];
        this.inputForm.get(inputParams.id).setValue(event.value);
        if (this.eventPropagate)
            this.onSubmit(false, inputParams.id);
    }
    /**
     * @param {?} event
     * @param {?} i
     * @return {?}
     */
    onToggleChane(event, i) {
        /** @type {?} */
        const inputParams = this.formParams.inputParams[i];
        this.inputForm.get(inputParams.id).setValue(event.checked);
        if (this.eventPropagate)
            this.onSubmit(false, inputParams.id);
    }
    /**
     * @param {?} event
     * @param {?} i
     * @return {?}
     */
    onBtnToggleChange(event, i) {
        /** @type {?} */
        const inputParams = this.formParams.inputParams[i];
        this.inputForm.get(inputParams.id).setValue(event.value);
        if (this.eventPropagate)
            this.onSubmit(false, inputParams.id);
    }
    /**
     * @param {?} event
     * @param {?} id
     * @return {?}
     */
    fileUploadValue(event, id) {
        this.fileUploadParams = event;
        if (this.eventPropagate)
            this.onSubmit(false, id);
    }
    /**
     * @param {?} event
     * @param {?} option
     * @param {?} i
     * @return {?}
     */
    checkedOption(event, option, i) {
        /** @type {?} */
        const inputParams = this.formParams.inputParams[i];
        /** @type {?} */
        const value = (/** @type {?} */ (this.inputForm.get(inputParams.id).value));
        if (value) {
            /** @type {?} */
            const idIndex = value.findIndex((/**
             * @param {?} val
             * @return {?}
             */
            val => val.id === option.id));
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
    }
    /**
     * @param {?} event
     * @param {?} i
     * @return {?}
     */
    setChangedValues(event, i) {
        /** @type {?} */
        const inputParams = this.formParams.inputParams[i];
        this.inputForm.get(inputParams.id).setValue(event);
        if (this.eventPropagate)
            this.onSubmit(false, inputParams.id);
    }
    /**
     * @param {?} event
     * @param {?} i
     * @return {?}
     */
    setDate(event, i) {
        /** @type {?} */
        const value = event.value;
        /** @type {?} */
        const inputParams = this.formParams.inputParams[i];
        value && !this.isDateObj(value) ? this.inputForm.get(inputParams.id).setValue(value.toDate())
            : this.inputForm.get(inputParams.id).setValue(value);
        if (this.eventPropagate)
            this.onSubmit(false, inputParams.id);
    }
    /**
     * @param {?} event
     * @param {?} i
     * @return {?}
     */
    setDateRange(event, i) {
        /** @type {?} */
        const formName = this.formParams.inputParams[i].id;
        /** @type {?} */
        const dateGroup = (/** @type {?} */ (this.inputForm.get(formName)));
        /** @type {?} */
        const sDate = dateGroup.controls.startDate.value;
        /** @type {?} */
        const eDate = dateGroup.controls.endDate.value;
        sDate && !this.isDateObj(sDate) ? dateGroup.controls.startDate.setValue(sDate.toDate())
            : dateGroup.controls.startDate.setValue(sDate);
        eDate && !this.isDateObj(eDate) ? dateGroup.controls.endDate.setValue(eDate.toDate())
            : dateGroup.controls.endDate.setValue(eDate);
        if (this.eventPropagate)
            this.onSubmit(false, formName);
    }
    /**
     * @param {?} event
     * @param {?} i
     * @return {?}
     */
    setNumberRange(event, i) {
        /** @type {?} */
        const formName = this.formParams.inputParams[i].id;
        /** @type {?} */
        const numGroup = (/** @type {?} */ (this.inputForm.get(formName)));
        numGroup.controls.minAmount.setValue(numGroup.controls.minAmount.value);
        numGroup.controls.maxAmount.setValue(numGroup.controls.maxAmount.value);
        if (this.eventPropagate)
            this.onSubmit(false, formName);
    }
    /**
     * @param {?} event
     * @param {?} i
     * @return {?}
     */
    setAutocompleteValue(event, i) {
        /** @type {?} */
        const inputParams = this.formParams.inputParams[i];
        this.inputForm.get(inputParams.id).setValue(event.option.value);
        if (this.eventPropagate)
            this.onSubmit(false, inputParams.id);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    displayFn(value) {
        return value && typeof value === 'object' ? value.value : value;
    }
    /**
     * @return {?}
     */
    hasError() {
        /** @type {?} */
        let hasError = false;
        for (const inputParams of this.formParams.inputParams) {
            switch (inputParams.displayType) {
                case DISPLAY_TYPE.CALENDAR_BOX:
                case DISPLAY_TYPE.INPUT_BOX:
                case DISPLAY_TYPE.SELECTION_BOX:
                case DISPLAY_TYPE.AUTOCOMPLETE_SELECT:
                case DISPLAY_TYPE.TEXT_AREA:
                case DISPLAY_TYPE.MULTI_CHECK_BOX:
                case DISPLAY_TYPE.RADIO:
                case DISPLAY_TYPE.ROW_RADIO:
                case DISPLAY_TYPE.TOGGLE:
                case DISPLAY_TYPE.BUTTON_TOGGLE:
                case DISPLAY_TYPE.ROW_INPUT_BOX:
                case DISPLAY_TYPE.TIME:
                    hasError = inputParams.isRequired
                        ? this.inputForm.invalid
                        : this.inputForm.get(inputParams.id).value && this.inputForm.invalid;
                    break;
                case DISPLAY_TYPE.DATE_RANGE:
                    /** @type {?} */
                    const dateFormGroup = (/** @type {?} */ (this.inputForm.get(inputParams.id)));
                    hasError = inputParams.isRequired
                        ? dateFormGroup.invalid
                        : ((dateFormGroup.controls.startDate.value && dateFormGroup.controls.startDate.invalid)
                            || (dateFormGroup.controls.startDate.value && !dateFormGroup.controls.endDate.value)
                            || (dateFormGroup.controls.endDate.value && dateFormGroup.controls.endDate.invalid));
                    break;
                case DISPLAY_TYPE.NUMBER_RANGE:
                    /** @type {?} */
                    const numFormGroup = (/** @type {?} */ (this.inputForm.get(inputParams.id)));
                    hasError = inputParams.isRequired
                        ? numFormGroup.invalid
                        : ((numFormGroup.controls.minAmount.value && numFormGroup.controls.minAmount.invalid)
                            || (numFormGroup.controls.minAmount.value && !numFormGroup.controls.maxAmount.value)
                            || (numFormGroup.controls.maxAmount.value && numFormGroup.controls.maxAmount.invalid));
                    break;
                case DISPLAY_TYPE.IMAGE_UPLOAD:
                    this.fileUplInst.onSubmit();
                    hasError = inputParams.isRequired
                        ? (!this.fileUploadParams || Object.keys(this.fileUploadParams).length === 0)
                        : false;
            }
        }
        return hasError;
    }
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    dropDownToggle(event, index) {
        /** @type {?} */
        const inputParams = this.formParams.inputParams[index];
        if (!event && this.inputForm.get(inputParams.id).value) {
            if (this.inputContainers[index + 1]) {
                this.inputContainers[index + 1].focus();
            }
            else {
                this.lastInpField.emit();
            }
        }
        this.dropdownOpen.emit(event);
    }
    /**
     * @param {?} value
     * @param {?} i
     * @return {?}
     */
    valueEntered(value, i) {
        /** @type {?} */
        const inputParams = this.formParams.inputParams[i];
        if (inputParams.displayType === DISPLAY_TYPE.AUTOCOMPLETE_SELECT) {
            /** @type {?} */
            const option = inputParams.options.find((/**
             * @param {?} option
             * @return {?}
             */
            option => option.value === value));
            option ? this.inputForm.get(inputParams.id).setValue(option)
                : this.inputForm.get(inputParams.id).setValue({ id: value, value: value });
            if (this.eventPropagate)
                this.onSubmit(false, inputParams.id);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    enterOnLastInput(event) {
        this.lastInpField.emit(event);
    }
    /*=====================================================================
                                  PRIVATE
      =====================================================================*/
    /**
     * @private
     * @return {?}
     */
    initialize() {
        for (const params of this.formParams.inputParams) {
            /** @type {?} */
            const formValidations = [];
            if (params.isRequired)
                formValidations.push(Validators.required);
            if (params.validators)
                formValidations.push(Validators.pattern(params.validators.validation));
            switch (params.displayType) {
                case DISPLAY_TYPE.INPUT_BOX:
                case DISPLAY_TYPE.TEXT_AREA:
                case DISPLAY_TYPE.RADIO:
                case DISPLAY_TYPE.ROW_RADIO:
                case DISPLAY_TYPE.SELECTION_BOX:
                case DISPLAY_TYPE.TOGGLE:
                case DISPLAY_TYPE.MULTI_CHECK_BOX:
                case DISPLAY_TYPE.BUTTON_TOGGLE:
                case DISPLAY_TYPE.ROW_INPUT_BOX:
                case DISPLAY_TYPE.TIME:
                    this.inputForm.addControl(params.id, new FormControl(params.value || null, formValidations));
                    if (params.options && params.options.length) {
                        /** @type {?} */
                        const selectedValues = [];
                        params.options.forEach((/**
                         * @param {?} opt
                         * @return {?}
                         */
                        opt => {
                            if (opt.selected)
                                selectedValues.push(opt);
                        }));
                        if (selectedValues.length)
                            this.inputForm.get(params.id).setValue(selectedValues[0]);
                    }
                    this.setInputDisabled(params.id, params.isDisabled);
                    break;
                case DISPLAY_TYPE.AUTOCOMPLETE_SELECT:
                    this.inputForm.addControl(params.id, new FormControl(params.value || null, formValidations));
                    this.filteredOptions = this.inputForm.valueChanges.pipe(startWith(''), map((/**
                     * @param {?} value
                     * @return {?}
                     */
                    value => typeof value === 'string' ? value : value.value)), map((/**
                     * @param {?} value
                     * @return {?}
                     */
                    value => value ? this.filterOptions(value, params)
                        : params.options.slice())));
                    this.setInputDisabled(params.id, params.isDisabled);
                    break;
                case DISPLAY_TYPE.CALENDAR_BOX:
                    if (params.value)
                        params.value = new Date(params.value);
                    formValidations.push(InputValidator.futureDateValidator);
                    this.inputForm.addControl(params.id, new FormControl(params.value || null, formValidations));
                    this.setInputDisabled(params.id, params.isDisabled);
                    break;
                case DISPLAY_TYPE.DATE_RANGE:
                    if (!params.value)
                        params.value = {};
                    /** @type {?} */
                    const valiArr = [InputValidator.dateValidator];
                    if (!params.validators || !params.validators.allowFutureDate)
                        valiArr.push(InputValidator.futureDateValidatorIfAllowed);
                    this.inputForm.addControl(params.id, new FormGroup({
                        startDate: new FormControl(params.value['startDate'] ? new Date(params.value.startDate)
                            : null, formValidations),
                        endDate: new FormControl(params.value['endDate'] ? new Date(params.value.endDate)
                            : null, formValidations),
                    }, {
                        validators: valiArr
                    }));
                    this.setInputDisabled(params.id, params.isDisabled);
                    break;
                case DISPLAY_TYPE.NUMBER_RANGE:
                    if (!params.value)
                        params.value = {};
                    this.inputForm.addControl(params.id, new FormGroup({
                        minAmount: new FormControl(params.value['minAmount'] || null, formValidations),
                        maxAmount: new FormControl(params.value['maxAmount'] || null, formValidations),
                    }, {
                        validators: [InputValidator.amountValidator]
                    }));
                    this.setInputDisabled(params.id, params.isDisabled);
                    break;
            }
        }
        if (this.formParams.formValidators)
            this.inputForm.setValidators(this.formParams.formValidators.validation);
    }
    /**
     * @private
     * @param {?} inputText
     * @param {?} params
     * @return {?}
     */
    filterOptions(inputText, params) {
        /** @type {?} */
        const filterValue = inputText.toLowerCase();
        return params.options.filter((/**
         * @param {?} option
         * @return {?}
         */
        option => ((/** @type {?} */ (option.value))).toLowerCase().includes(filterValue)));
    }
    /**
     * @private
     * @param {?} id
     * @param {?} value
     * @return {?}
     */
    setInputDisabled(id, value) {
        value ? this.inputForm.get(id).disable() : this.inputForm.get(id).enable();
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    isDateObj(value) {
        /** @type {?} */
        let isDate;
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
    }
    /*=====================================================================
                                  UTILS
      =====================================================================*/
    /**
     * @param {?} index
     * @return {?}
     */
    focusElement(index) {
        this.inputContainers[index].focus();
    }
    /**
     * @param {?} formIds
     * @return {?}
     */
    updateValidators(formIds) {
        for (let i = 0; i < formIds.length; i++) {
            /** @type {?} */
            const form = this.inputForm.get(formIds[i]);
            if (form) {
                /** @type {?} */
                const params = this.formParams.inputParams.find((/**
                 * @param {?} val
                 * @return {?}
                 */
                val => val.id === formIds[i]));
                if (params) {
                    if (params.isDisabled) {
                        form.disable();
                    }
                    else {
                        form.enable();
                    }
                }
            }
        }
    }
}
MuFormContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'mu-form-container',
                template: "<div class=\"mu-form-container-comp\" [formGroup]=\"inputForm\"\n[class.vertical-mode]=\"displayMode === DISPLAY_MODE.VERTICAL\"\n[ngClass.xl]=\"webMode ? ['web-form-container-comp'] : ['web-view-input-comp']\"\n[ngClass.lg]=\"webMode ? ['web-form-container-comp'] : ['web-view-input-comp']\"\n[ngClass.md]=\"webMode ? ['web-form-container-comp'] : ['web-view-input-comp']\"\n[ngClass.sm]=\"webMode ? ['web-form-container-comp'] : ['web-view-input-comp']\">\n\n  <ng-container *ngFor=\"let inputParam of formParams.inputParams; let i = index\">\n    <div *ngIf=\"(inputParam.isVisible === undefined || inputParam.isVisible)\" class=\"main-input-cont\"  \n      adjustElements [displayInSingleRow]=\"displayCount\" [elementIndex]=\"i\" [webMode]=\"webMode\">\n\n      <div class=\"label-txt txt-lg-reg-norm\"\n        *ngIf=\"displayLabel && inputParam.label && inputParam.displayType !== DISPLAY_TYPE.ROW_INPUT_BOX\">\n        {{ inputParam.label }}\n        <span class=\"red-asterix error-text\" *ngIf=\"inputParam.isRequired\">\n          *\n        </span>\n      </div>\n\n      <ng-container [ngSwitch]=\"inputParam.displayType\">\n\n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.INPUT_BOX\">\n\n          <div *ngIf=\"!inputParam.withoutBorder\" \n          class=\"onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParam.isDisabled\">\n\n            <div class=\"prefix-image\" *ngIf=\"inputParam?.image?.prefixParams\">\n              <i class=\"{{ inputParam.image.prefixParams?.iconClass }}\"></i>\n              <img src=\"{{ inputParam.image.prefixParams?.imgUrl }}\">\n            </div>\n\n            <input matInput #inputCont\n            \n              placeholder=\"{{inputParam.placeHolder}}\"\n              type=\"{{inputParam.inputType || 'text'}}\"\n              [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n              (onSubmit)=\"enterOnLastInput($event)\"\n              (updatedValue)=\"setChangedValues($event, i)\"\n              class=\"txt-lg-med-norm input-cont\" \n              formControlName=\"{{ inputParam.id }}\"\n              name=\"{{ inputParam.name || 'input-text' }}\"\n              [ncMaxLength]=\"inputParam.maxLength || 1000\"\n              textSecurity=\"inputParam.isPassword\"\n              format=\"{{ inputParam.format }}\"\n              [class.num-password-input]=\"inputParam.isPassword\"\n              autocomplete=\"{{ inputParam.autoComplete || 'off'}}\"\n              [keyboard]=\"parentCont\">\n\n            <div class=\"suffix-image\" *ngIf=\"inputParam?.image?.suffixParams\">\n              <i class=\"{{ inputParam.image.suffixParams?.iconClass }}\"></i>\n              <img src=\"{{ inputParam.image.suffixParams?.imgUrl }}\">\n            </div>\n\n          </div>\n\n          <mat-form-field *ngIf=\"inputParam.withoutBorder\" class=\"onb-input-box-cont mat-input-box-cont\" \n            [class.border-disabled]=\"inputParam.isDisabled\">\n\n            <div class=\"prefix-image\" *ngIf=\"inputParam?.image?.prefixParams\">\n              <i class=\"{{ inputParam.image.prefixParams?.iconClass }}\"></i>\n              <img src=\"{{ inputParam.image.prefixParams?.imgUrl }}\">\n            </div>\n\n\n            <input matInput #inputCont\n              placeholder=\"{{inputParam.placeHolder}}\"\n              type=\"{{inputParam.inputType || 'text'}}\"\n              [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n              (onSubmit)=\"enterOnLastInput($event)\"\n              (updatedValue)=\"setChangedValues($event, i)\"\n              class=\"txt-lg-med-norm input-cont mat-input-cont\" \n              formControlName=\"{{ inputParam.id }}\"\n              name=\"{{ inputParam.name || 'input-text' }}\"\n              [ncMaxLength]=\"inputParam.maxLength || 1000\"\n              format=\"{{ inputParam.format }}\"\n              textSecurity=\"inputParam.isPassword\"\n              [class.num-password-input]=\"inputParam.isPassword\"\n              autocomplete=\"{{ inputParam.autoComplete || 'off'}}\"\n              [keyboard]=\"parentCont>\n\n            <div class=\"suffix-image\" *ngIf=\"inputParam?.image?.suffixParams\">\n              <i class=\"{{ inputParam.image.suffixParams?.iconClass }}\"></i>\n              <img src=\"{{ inputParam.image.suffixParams?.imgUrl }}\">\n            </div>\n\n          </mat-form-field>\n          \n        </ng-container> \n        \n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.TIME\">\n\n          <div *ngIf=\"!inputParam.withoutBorder\" class=\"onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParam.isDisabled\">\n\n            <input matInput #inputCont\n            \n              placeholder=\"{{inputParam.placeHolder}}\"\n              type=\"time\"\n              [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n              (onSubmit)=\"enterOnLastInput($event)\"\n              (updatedValue)=\"setChangedValues($event, i)\"\n              class=\"txt-lg-med-norm input-cont\" \n              formControlName=\"{{ inputParam.id }}\"\n              name=\"{{ inputParam.name || 'input-time' }}\"\n              [keyboard]=\"parentCont\"\n              step=\"1\">\n\n          </div>\n        </ng-container> \n        \n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.TEXT_AREA\">\n          <div class=\"onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParam.isDisabled\">\n            <textarea matInput #inputCont\n              placeholder=\"{{ inputParam.placeHolder }}\"\n              type=\"{{ inputParam.inputType || 'text' }}\"\n              (updatedValue)=\"setChangedValues($event, i)\"\n              class=\"txt-lg-med-norm input-cont\" \n              formControlName=\"{{ inputParam.id }}\"\n              name=\"{{ inputParam.name || 'input-text' }}\"\n              [ncMaxLength]=\"inputParam.maxLength || 1000\"\n              format=\"{{ inputParam.format }}\"\n              textSecurity=\"inputParam.isPassword\"\n              [class.num-password-input]=\"inputParam.isPassword\"\n              autocomplete=\"off\"\n              [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n              (onSubmit)=\"enterOnLastInput($event)\"\n              [keyboard]=\"parentCont\">\n            </textarea> \n          </div>\n        </ng-container>  \n      \n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.SELECTION_BOX\">\n\n          <ng-template #selectBox>\n\n            <mat-select #inputCont\n              formControlName=\"{{ inputParam.id }}\"\n              customTrigger=\"inputCont\"\n              [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n              (onSubmit)=\"enterOnLastInput($event)\"\n              placeholder=\"{{ inputParam.placeHolder }}\" \n              class=\"txt-lg-med-norm input-cont\"\n              (selectionChange)=\"selectedOption($event, i)\"\n              (openedChange)=\"dropDownToggle($event, i)\">\n              <mat-option *ngFor=\"let option of inputParam.options\" [value]=\"option\"\n                class=\"txt-lg-med-norm\">\n                {{ option.value }}\n              </mat-option>\n            </mat-select>\n          </ng-template>\n\n          <div *ngIf=\"!inputParam.withoutBorder\" class=\"onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParam.isDisabled\">\n\n            <ng-container>\n\n              <ng-container \n                *ngTemplateOutlet=\"selectBox\">\n              </ng-container>\n\n            </ng-container>\n\n          </div>  \n\n          <ng-container *ngIf=\"inputParam.withoutBorder\">\n\n            <mat-form-field class=\"onb-input-box-cont mat-input-box-cont\">\n\n              <mat-select #inputCont\n                formControlName=\"{{ inputParam.id }}\"\n                customTrigger=\"inputCont\"\n                [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n                (onSubmit)=\"enterOnLastInput($event)\"\n                placeholder=\"{{ inputParam.placeHolder }}\" \n                class=\"txt-lg-med-norm input-cont mat-input-cont\"\n                (selectionChange)=\"selectedOption($event, i)\"\n                (openedChange)=\"dropDownToggle($event, i)\">\n                <mat-option *ngFor=\"let option of inputParam.options\" [value]=\"option\"\n                  class=\"txt-lg-med-norm\">\n                  {{ option.value }}\n                </mat-option>\n                \n              </mat-select>\n\n            </mat-form-field>\n\n          </ng-container>\n\n        </ng-container>\n\n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.MULTI_CHECK_BOX\">\n          <div class=\"checkbox-cont\">\n            <mat-checkbox *ngFor=\"let option of inputParam.options\" [value]=\"option\"\n              class=\"txt-lg-med-norm checkbox\"\n              [checked]=\"option.selected\"\n              (change)=\"checkedOption($event, option, i)\">\n              {{ option.value }}\n            </mat-checkbox>\n          </div>\n        </ng-container>\n        \n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.RADIO\">\n          <mat-radio-group\n            formControlName=\"{{ inputParam.id }}\"\n            class=\"txt-lg-med-norm input-cont radio-group\"\n            (change)=\"selectedOption($event, i)\">\n            <mat-radio-button *ngFor=\"let option of inputParam.options\" [value]=\"option\" \n              class=\"txt-lg-med-norm radio-button\"\n              [checked]=\"option.selected\">\n              {{ option.value }}\n            </mat-radio-button>\n          </mat-radio-group>\n        </ng-container>\n\n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.ROW_RADIO\">\n          <mat-radio-group \n            formControlName=\"{{ inputParam.id }}\"\n            class=\"txt-lg-med-norm vert-input-cont vert-radio-group\"\n            (change)=\"selectedOption($event, i)\">\n            <mat-radio-button  *ngFor=\"let option of inputParam.options\" [value]=\"option\" \n              class=\"txt-lg-med-norm radio-button\"\n              [checked]=\"option.selected\">\n              {{ option.value }}\n            </mat-radio-button>\n          </mat-radio-group>\n        </ng-container>\n\n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.TOGGLE\">\n          <mat-slide-toggle class=\"toggle-cont\"\n            (change)=\"onToggleChane($event, i)\">\n          </mat-slide-toggle>\n        </ng-container>\n\n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.CALENDAR_BOX\">\n          <div class=\"onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParam.isDisabled\">\n            <input matInput #inputCont\n              formControlName=\"{{ inputParam.id }}\"\n              [matDatepicker]=\"picker\" \n              (dateChange)=\"setDate($event, i)\"\n              [max]=\"inputParam.validators && inputParam.validators.allowFutureDate ? null : maxDate\"\n              placeholder=\"{{ inputParam.placeHolder }}\"\n              class=\"txt-lg-med-norm input-cont\"\n              name=\"{{ inputParam.name || 'input-text' }}\"\n              [ncMaxLength]=\"inputParam.maxLength || 10\"\n              format=\"{{ inputParam.format }}\"\n              [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n              (onSubmit)=\"enterOnLastInput($event)\"\n              autocomplete=\"{{ inputParam.autoComplete || 'off'}}\"\n              [keyboard]=\"parentCont\">\n            <mat-datepicker-toggle matSuffix [for]=\"picker\" \n            disableRipple=\"false\"></mat-datepicker-toggle>\n            <mat-datepicker touchUi #picker></mat-datepicker>\n          </div>\n        </ng-container>\n\n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.DATE_RANGE\" formGroupName=\"{{ inputParam.id }}\">\n          <div class=\"range\">\n            <div class=\"range-onb-input-box-cont border-primary\">\n              <input matInput #inputCont\n                formControlName=\"startDate\"\n                [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n                [matDatepicker]=\"startPicker\" \n                (dateChange)=\"setDateRange($event, i)\"\n                placeholder=\"{{ inputParam.placeHolder[0] }}\"\n                class=\"txt-lg-med-norm input-cont\"\n                name=\"{{ inputParam.name || 'input-text' }}\"\n                autocomplete=\"{{ inputParam.autoComplete || 'off'}}\"\n                [keyboard]=\"parentCont\">\n              <mat-datepicker-toggle matSuffix [for]=\"startPicker\" disableRipple=\"false\"></mat-datepicker-toggle>\n              <mat-datepicker touchUi #startPicker></mat-datepicker>\n            </div>\n\n            <div class=\"range-onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParam.isDisabled\">\n              <input matInput #inputCont\n                formControlName=\"endDate\"\n                [matDatepicker]=\"endPicker\" \n                [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n                (dateChange)=\"setDateRange($event, i)\"\n                placeholder=\"{{ inputParam.placeHolder[1] }}\"\n                class=\"txt-lg-med-norm input-cont\"\n                [keyboard]=\"parentCont\">\n              <mat-datepicker-toggle matSuffix [for]=\"endPicker\" disableRipple=\"false\"></mat-datepicker-toggle>\n              <mat-datepicker touchUi #endPicker></mat-datepicker>\n            </div>\n          </div>\n        </ng-container>\n\n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.NUMBER_RANGE\" formGroupName=\"{{ inputParam.id }}\">\n          <div class=\"range\">\n            <div class=\"range-onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParam.isDisabled\">\n              <input matInput #inputCont\n                placeholder=\"{{ inputParam.placeHolder[0] }}\"\n                type=\"number\"\n                (input)=\"setNumberRange($event, i)\"\n                class=\"txt-lg-med-norm input-cont\" \n                formControlName=\"minAmount\"\n                name=\"{{ inputParam.name || 'input-text' }}\"\n                textSecurity=\"inputParam.isPassword\"\n                [class.num-password-input]=\"inputParam.isPassword\"\n                autocomplete=\"{{ inputParam.autoComplete || 'off'}}\"\n                [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n                [keyboard]=\"parentCont\">\n            </div>\n        \n            <div class=\"range-onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParam.isDisabled\">\n              <input matInput #inputCont\n                placeholder=\"{{ inputParam.placeHolder[1] }}\"\n                type=\"number\"\n                (input)=\"setNumberRange($event, i)\"\n                class=\"txt-lg-med-norm input-cont\" \n                formControlName=\"maxAmount\"\n                name=\"{{ inputParam.name || 'input-text' }}\"\n                textSecurity=\"inputParam.isPassword\"\n                [class.num-password-input]=\"inputParam.isPassword\"\n                autocomplete=\"{{ inputParam.autoComplete || 'off'}}\"\n                [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n                [keyboard]=\"parentCont\">\n            </div>\n          </div>\n        </ng-container>\n\n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.AUTOCOMPLETE_SELECT\">\n          <div class=\"onb-input-box-cont border-primary\" [class.border-disabled]=\"inputParam.isDisabled\">\n            <input matInput #autoCompInput #inputCont\n              type=\"text\"\n              class=\"txt-lg-med-norm input-cont\" \n              placeholder=\"{{ inputParam.placeHolder }}\"\n              formControlName=\"{{ inputParam.id }}\"\n              [matAutocomplete]=\"auto\"\n              [keyboard]=\"parentCont\"\n              name=\"{{ inputParam.name || 'input-text' }}\"\n              autocomplete=\"{{ inputParam.autoComplete || 'off'}}\"\n              [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n              (onSubmit)=\"enterOnLastInput($event)\"\n              (blur)=\"valueEntered(autoCompInput.value, i)\">\n\n            <mat-autocomplete #auto=\"matAutocomplete\" [displayWith]=\"displayFn\"\n              (optionSelected)=\"setAutocompleteValue($event, i)\"\n              class=\"txt-xl-med-norm input-cont\">\n              <mat-option *ngFor=\"let option of filteredOptions | async\" [value]=\"option\"\n                class=\"txt-lg-med-norm\">\n                {{ option.value }}\n              </mat-option>\n            </mat-autocomplete>\n          </div>\n        </ng-container>\n\n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.BUTTON_TOGGLE\">\n          <mat-button-toggle-group name=\"toggle\" class=\"button-toggle\" #group=\"matButtonToggleGroup\">\n\n            <ng-container *ngFor=\"let option of inputParam.options ; let j = index\">\n              <mat-button-toggle value=\"{{ option.id }}\" class=\"txt-lg-reg-norm\"\n                [checked]=\"option.selected\"\n                [ngClass]=\"{ 'primary-bg' : group.value === option.id, 'text-color-white' : group.value === option.id}\"\n                (change)=\"onBtnToggleChange($event, i)\">\n                {{ option.value }}\n              </mat-button-toggle>\n            </ng-container>\n\n          </mat-button-toggle-group>\n\n        </ng-container>\n\n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.ROW_INPUT_BOX\">\n          \n          <div class=\"input-container\">\n\n            <div class=\"label-txt txt-lg-reg-norm\" *ngIf=\"displayLabel && inputParam.label\">\n              {{ inputParam.label }} \n              <span class=\"red-asterix error-text\" *ngIf=\"inputParam.isRequired\">\n                *\n              </span>  \n            </div>\n\n            <div class=\"onb-input-box-cont border-primary small-box\" [class.border-disabled]=\"inputParam.isDisabled\">\n              <input matInput inputCont\n                placeholder=\"{{ inputParam.placeHolder }}\"\n                type=\"{{inputParam.inputType || 'text'}}\"\n                (updatedValue)=\"setChangedValues($event, i)\"\n                class=\"txt-lg-med-norm input-cont\" \n                formControlName=\"{{ inputParam.id }}\"\n                name=\"{{ inputParam.name || 'input-text' }}\"\n                [ncMaxLength]=\"inputParam.maxLength || 1000\"\n                format=\"{{ inputParam.format }}\"\n                textSecurity=\"inputParam.isPassword\"\n                [class.num-password-input]=\"inputParam.isPassword\"\n                autocomplete=\"{{ inputParam.autoComplete || 'off'}}\"\n                [nextInpFocus]=\"inputContainers ? (inputContainers[i !== (formParams.inputParams.length - 1) ? i + 1 : undefined]) : undefined\"\n                (onSubmit)=\"enterOnLastInput($event)\"\n                [keyboard]=\"parentCont\">\n            </div>\n\n          </div>  \n        </ng-container>\n\n        <ng-container *ngSwitchCase=\"DISPLAY_TYPE.IMAGE_UPLOAD\">\n          <file-upload\n            [screen]=\"screen\"\n            (value)=\"fileUploadValue($event, inputParam.id)\"\n            [isRequired]=\"inputParam.isRequired\">\n          </file-upload>  \n        </ng-container> \n\n      </ng-container>\n\n      <div *ngIf=\"inputParam.displayType !== DISPLAY_TYPE.DATE_RANGE &&\n        inputParam.displayType !== DISPLAY_TYPE.NUMBER_RANGE\" class=\"errors-list\" [class.mat-errors-list]=\"inputParam.withoutBorder\">\n\n        <mat-error class=\"txt-sm-reg-norm error-text\"\n          *ngIf=\"inputForm.get(inputParam.id).touched && inputParam.isRequired && \n          inputForm.get(inputParam.id).hasError('required')\">\n          <span *ngIf=\"inputParam.displayType === DISPLAY_TYPE.RADIO || \n            inputParam.displayType === DISPLAY_TYPE.SELECTION_BOX ||\n            inputParam.displayType === DISPLAY_TYPE.MULTI_CHECK_BOX ; else default\" class=\"err-text\">\n            {{ inputParam.validators ? inputParam.validators.validationError : ('mu_inpt_cont_sel_err' | translate) }}\n          </span>\n          <ng-template #default>\n            {{ inputParam.validators ? inputParam.validators.validationError : ('mu_inpt_cont_val_err' | translate) }}\n          </ng-template>\n        </mat-error>\n\n        <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputForm.get(inputParam.id).touched\n          && inputForm.get(inputParam.id).value && inputForm.get(inputParam.id).hasError('pattern')\">\n          {{ inputParam.validators ? inputParam.validators.validationError : ('mu_inpt_cont_val_err' | translate) }}\n        </mat-error>\n\n        <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputForm.get(inputParam.id).touched\n          && inputForm.get(inputParam.id).value && inputForm.get(inputParam.id).hasError('invalid') \n          && !inputForm.get(inputParam.id).hasError('pattern')\">\n          {{ formParams.formValidators.errorMsg }}\n        </mat-error>\n\n        <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputForm.get(inputParam.id).touched &&\n          inputForm.get(inputParam.id).errors && inputForm.get(inputParam.id).hasError('futureDate')\">\n          {{ 'mu_inpt_cont_futr_date_err' | translate }}\n        </mat-error>\n      </div>\n\n      <div *ngIf=\"inputParam.displayType === DISPLAY_TYPE.DATE_RANGE\" class=\"errors-list\">\n        <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputForm.get(inputParam.id).hasError('noStartDate')\">\n          {{ 'mu_inpt_cont_strt_date_err' | translate }}\n        </mat-error>\n\n        <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputForm.get(inputParam.id).hasError('startDateExceed')\">\n          {{ 'mu_inpt_cont_date_err' | translate }}\n        </mat-error>\n\n        <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputForm.get(inputParam.id).hasError('futureDate') || \n          inputForm.get(inputParam.id).hasError('futureDate')\">\n          {{ 'mu_inpt_cont_futr_date_err' | translate }}\n        </mat-error>\n\n        <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputParam.isRequired && \n          inputForm.get(inputParam.id).touched && inputForm.get(inputParam.id).hasError('required')\">\n          {{ inputParam.validators ? inputParam.validators.validationError : ('mu_inpt_cont_val_err' | translate) }}\n        </mat-error>\n      </div>\n\n      <div *ngIf=\"inputParam.displayType === DISPLAY_TYPE.NUMBER_RANGE\" class=\"errors-list\">\n        <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputForm.get(inputParam.id).hasError('noMinAmount')\">\n          {{ 'mu_inpt_cont_min_amnt_err' | translate }}\n        </mat-error>\n      \n        <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputForm.get(inputParam.id).hasError('minAmountExceed')\">\n          {{ 'mu_inpt_cont_amnt_err' | translate }}\n        </mat-error>\n\n        <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\"inputParam.isRequired && \n          inputForm.get(inputParam.id).touched && inputForm.get(inputParam.id).hasError('required')\">\n          {{ inputParam.validators ? inputParam.validators.validationError : ('mu_inpt_cont_val_err' | translate) }}\n        </mat-error>\n      </div>\n\n\n      <!-- <div *ngIf=\"inputForm && inputParam.displayType === DISPLAY_TYPE.DATE_RANGE\" class=\"errors-list\">\n        <mat-error class=\"txt-sm-reg-norm error-text\" *ngIf=\" (inputForm.get('startDate').touched && \n          inputForm.get('endDate').touched) && inputForm.get('startDate').value && !inputForm.get('endDate').value\">\n          {{ 'mu_inpt_cont_end_date_err' | translate }}\n        </mat-error>\n      </div> -->\n\n    </div>\n  </ng-container>  \n\n</div>",
                styles: [":host{width:100%}.onb-input-box-cont{align-items:center;border-style:solid;border-width:2px;display:flex;margin:2% 0 0;position:relative}.mat-errors-list{bottom:0;left:0;position:absolute}.mat-input-box-cont{border:none!important}.mu-form-container-comp{display:flex;flex-direction:row;flex-wrap:wrap;position:relative}.button-toggle{margin:2vw 0}.main-input-cont{margin:2vw 0;position:relative}.input-container{align-items:center;display:flex;justify-content:space-between;position:relative}.input-container .label-txt{margin-right:2vw;width:72vw}.input-container .small-box{width:14vw}.input-container .input-cont,.input-container .mat-input-cont{text-align:center}.radio-button{padding-bottom:2vw!important}.radio-group{display:flex;flex-direction:column;padding:3vw 0 0 2vw!important}.checkbox,.checkbox-cont{padding:1vw 0}.checkbox-cont{display:flex;flex-direction:column;position:relative}.range-onb-input-box-cont{align-items:center;border-style:solid;border-width:2px;display:flex;position:relative;width:46%}.input-cont,.range-onb-input-box-cont .input-cont{background:none;border:0;padding:4vw;position:relative;width:100%}.mat-input-cont{padding:0!important}.toggle-cont{margin:2vw 0}.input-cont-comp{margin:2vw 4vw;position:relative}.range{display:flex;flex-direction:row;justify-content:space-between}.errors-list{display:flex;flex-direction:column;padding-top:1vw}.web-form-container-comp .main-input-cont{margin:10px 0}.web-form-container-comp .input-cont,.web-form-container-comp .range-onb-input-box-cont .input-cont{background:none;border:0;padding:15px;position:relative;width:100%}.web-form-container-comp .main-input-cont{padding:0}.web-form-container-comp .errors-list{padding-top:5px}.web-form-container-comp .radio-button{padding-bottom:10px!important}.web-form-container-comp .radio-group{padding:5px 0!important}.web-view-input-comp .main-input-cont{margin:10px 0}.web-view-input-comp .range-onb-input-box-cont{align-items:center;border-style:solid;border-width:2px;display:flex;margin:.5% 0;position:relative;width:48%}.web-view-input-comp .mat-input-box{border:0!important}.web-view-input-comp .input-cont{background:none;border:0;padding:15px;position:relative;width:100%}.web-view-input-comp .errors-list{padding-top:5px}.web-view-input-comp .radio-button{padding-bottom:10px!important}.web-view-input-comp .radio-group{padding:5px 0!important}.web-view-input-comp .vert-radio-group{padding:8px 0!important}.web-view-input-comp .vert-radio-group .radio-button{padding-right:10px!important}.vertical-mode .checkbox,.vertical-mode .radio-group{padding:5px 0!important}.vertical-mode .radio-button{padding:8px 0!important}.vertical-mode .checkbox-cont{padding:5px 0}.prefix-image,.suffix-image{padding:0 10px}"]
            }] }
];
/** @nocollapse */
MuFormContainerComponent.ctorParameters = () => [
    { type: RunContextBrowser, decorators: [{ type: Inject, args: ['RunContext',] }] },
    { type: FormBuilder },
    { type: ChangeDetectorRef }
];
MuFormContainerComponent.propDecorators = {
    picker: [{ type: ViewChildren, args: [MatDatepicker,] }],
    fileUplInst: [{ type: ViewChild, args: [FileUploadComponent, { static: false },] }],
    inputCont: [{ type: ViewChildren, args: ['inputCont',] }],
    formParams: [{ type: Input }],
    screen: [{ type: Input }],
    webMode: [{ type: Input }],
    parentCont: [{ type: Input }],
    eventPropagate: [{ type: Input }],
    displayMode: [{ type: Input }],
    displayLabel: [{ type: Input }],
    displayCount: [{ type: Input }],
    value: [{ type: Output }],
    dropdownOpen: [{ type: Output }],
    lastInpField: [{ type: Output }]
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
class MuDataTableComponent {
    /**
     * @param {?} rc
     * @param {?} changeDet
     */
    constructor(rc, changeDet) {
        this.rc = rc;
        this.changeDet = changeDet;
        this.loadMoreData = new EventEmitter();
        this.onRowSelect = new EventEmitter();
        this.onSelectAll = new EventEmitter();
        this.onDetailClick = new EventEmitter();
        this.onCellClick = new EventEmitter();
        this.onRowEdit = new EventEmitter();
        this.onDownload = new EventEmitter();
        this.selectedFilter = new EventEmitter();
        this.selectedIndexes = {};
        this.selAllMap = {};
        this.headerFields = [];
        this.dataToDisplay = [];
        this.pageNumbers = [];
        this.filterFields = [];
        this.dataMap = {};
        this.editForm = new FormGroup({});
        this.COL_TYPE = COL_TYPE;
        this.DISPLAY_MODE = DISPLAY_MODE;
        if (rc.getLogLevel() === LOG_LEVEL.DEBUG)
            window['datatable'] = this;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.tableConfig = changes['tableConfig'].currentValue;
        this.setUpTable();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.setUpTable();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        const top = this.filterCont.nativeElement.offsetTop;
        this.filterCont.nativeElement.style.maxHeight = `calc(100% - ${top}px)`;
    }
    /*=====================================================================
                                  PRIVATE
      =====================================================================*/
    /**
     * @private
     * @return {?}
     */
    setUpTable() {
        if (this.tableConfig) {
            for (let header of this.tableConfig.headers) {
                if (header.colType === COL_TYPE.TOGGLE)
                    this.isTogglePresent = true;
                if (header.isEditable)
                    this.editForm.addControl(header.dataKey, new FormControl());
                this.headerFields.push(header.dataKey);
                if (this.tableConfig.enableFilter &&
                    (header.colType === COL_TYPE.HYPER_LINK ||
                        header.colType === COL_TYPE.TEXT)) {
                    this.filterFields.push(header.dataKey);
                }
            }
            if (this.tableConfig.selectedIndexes)
                this.tableConfig.selectedIndexes.map((/**
                 * @param {?} index
                 * @return {?}
                 */
                index => this.selectedIndexes[index] = true));
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
            const nSColWidth = this.stickyInfo.nonStickyWidth / (this.tableConfig.headers.length - this.stickyInfo.noOfCols);
            for (const header of this.tableConfig.headers) {
                if (header.widthPerc) {
                    this.stickyInfo.nonStickyWidth += header.widthPerc - nSColWidth;
                }
            }
            this.stickyInfo.nonStickyWidth = Math.max((100 - this.stickyInfo.stickyWidth), this.stickyInfo.nonStickyWidth);
        }
    }
    /**
     * Creates the page numbers needed for pagination
     * Called during initialization of table and updation of data inside table
     * @private
     * @return {?}
     */
    createPageNumbers() {
        this.pageNumbers = [];
        this.currPageIndex = this.prevPageIndex = this.pageIndex = 0;
        /** @type {?} */
        let totalPages = this.tableConfig.totalRecords / this.tableConfig.dispRows;
        if (this.tableConfig.totalRecords % this.tableConfig.dispRows)
            totalPages++;
        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++)
            this.pageNumbers.push(pageNumber);
    }
    /**
     * changes the pagenumbers according to the current selected page number
     * @private
     * @param {?} pageIndex
     * @return {?}
     */
    updatePageNumbers(pageIndex) {
        this.pageIndex = pageIndex - 2;
        if (this.pageIndex <= 0) {
            this.pageIndex = 0;
        }
        else {
            if (this.pageIndex >= (this.pageNumbers.length - 4))
                this.pageIndex = this.pageNumbers.length - 5;
        }
    }
    /**
     * sends a callback to parent with main event and row data on click of radio button, checkbox or
     * toggle button so that parent can stop the default action
     * @param {?} event
     * @param {?} rowData
     * @return {?}
     */
    rowClick(event, rowData) {
        /** @type {?} */
        const selEvent = {
            rowData: rowData,
            rowIndex: rowData['rowIndex'],
            isSelected: this.selectedIndexes[rowData['rowIndex']] ? false : true,
            browserEvent: event
        };
        this.onRowSelect.emit(selEvent);
    }
    /**
     * Changes the select all indexes map according to user preference on click of checkbox
     * @param {?} event
     * @param {?} rowData
     * @return {?}
     */
    rowSelect(event, rowData) {
        if (event.checked) {
            this.selectedIndexes[rowData['rowIndex']] = true;
        }
        else {
            this.slctAllBox.checked = false;
            this.selAllMap[this.currPageIndex] = false;
            this.selectedIndexes[rowData['rowIndex']] = false;
        }
    }
    /**
     * Selects all the rows in the page that is being displayed and a callback is
     * sent to the parent with the rows that are selected.
     * @param {?} event
     * @return {?}
     */
    selectAll(event) {
        this.slctAllBox.checked = event.checked;
        this.selAllMap[this.currPageIndex] = event.checked;
        for (let index = 0; index < (this.currPageIndex + this.tableConfig.dispRows); index++)
            this.selectedIndexes[index + (this.currPageIndex * this.tableConfig.dispRows)] = event.checked;
        /** @type {?} */
        const selAllEvent = {
            selectedRows: this.dataMap[this.currPageIndex],
            isSelected: event.checked
        };
        this.onSelectAll.emit(selAllEvent);
    }
    /**
     * Changes the select all indexes map according to user preference on click of radio button
     * @param {?} event
     * @param {?} rowData
     * @return {?}
     */
    radioSelect(event, rowData) {
        this.selectedIndexes = {};
        /** @type {?} */
        const selectedIndex = rowData['rowIndex'];
        this.selectedIndexes[selectedIndex] = true;
    }
    /**
     * Sends call back to the parent on click of an option inside moredetails along with
     * the ID of the option and rowData
     * @param {?} detKey
     * @param {?} rowData
     * @return {?}
     */
    moreDetailsClick(detKey, rowData) {
        /** @type {?} */
        const moreSelEvent = {
            id: detKey,
            rowData: rowData
        };
        this.onDetailClick.emit(moreSelEvent);
    }
    /**
     * Changes the select all indexes map according to user preference on click of toggle button
     * @param {?} event
     * @param {?} rowData
     * @return {?}
     */
    toggleRow(event, rowData) {
        this.selectedIndexes[rowData['rowIndex']] = event.checked;
    }
    /**
     * mapData creates a map of row objects that needs to be displayed in the table
     * with index as the key and array of objects as its value
     * @param {?} data the data that needs to be mapped
     * @param {?} startPageIndex - index from which data needs to be mapped
     * @return {?}
     */
    createDataMap(data, startPageIndex) {
        /** @type {?} */
        const dataSetCount = Math.ceil(data.length / this.tableConfig.dispRows);
        /** @type {?} */
        const currData = JSON.parse(JSON.stringify(data));
        for (let index = 0; index < currData.length; index++)
            currData[index]['rowIndex'] = index + (startPageIndex * this.tableConfig.dispRows);
        for (let i = 0; i < dataSetCount; i++) {
            /** @type {?} */
            const mapData = currData.splice(0, this.tableConfig.dispRows);
            /** @type {?} */
            const mapKey = startPageIndex + i;
            if (mapData.length === this.tableConfig.dispRows
                || !this.tableConfig.lazyLoad
                || (this.tableConfig.lazyLoad && this.tableConfig.totalRecords <= ((mapKey * this.tableConfig.dispRows) + mapData.length)))
                this.dataMap[mapKey] = mapData;
        }
        this.dataToDisplay = this.dataMap[startPageIndex] || [];
        this.changeDet.detectChanges();
    }
    /**
     * Called when user clicked on a page with its index as parameter.
     * Displays the data of that index from the data map, if the data does not exists,
     * a callback is given to the parent to load more data.
     * @param {?} pageIndex
     * @return {?}
     */
    onPageClick(pageIndex) {
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
    }
    /**
     * Updates the table data with new data, an optional parameter currentIndex should
     * be sent as '0' inorder to clear the refresh the table.
     * @param {?} data
     * @param {?=} currentIndex
     * @param {?=} totalRecords
     * @return {?}
     */
    updateData(data, currentIndex, totalRecords) {
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
    }
    /**
     * Method invoked by the parent in case of api loading failure which brings back
     * the table to previous state
     * @param {?=} lastAppliedFilters
     * @param {?=} isHzFilters
     * @return {?}
     */
    loadingFailed(lastAppliedFilters, isHzFilters) {
        this.currPageIndex = this.prevPageIndex;
        this.updatePageNumbers(this.currPageIndex);
        if (lastAppliedFilters) {
            /** @type {?} */
            const index = isHzFilters ? 0 : 1;
            /** @type {?} */
            const filterInsts = this.filterCompChildren.toArray();
            filterInsts[index].updateLastAppliedFilters(lastAppliedFilters);
        }
    }
    /**
     * Sends callback to the parent when the user clicks on hyperlink
     * @param {?} rowData
     * @param {?} header
     * @return {?}
     */
    cellClick(rowData, header) {
        /** @type {?} */
        const buttonEvent = {
            headerKey: header.colType === COL_TYPE.MULTI_LINE ? header.dataKeyArr[0] : header.dataKey,
            rowIndex: rowData['rowIndex']
        };
        if (header.navInfo) {
            /** @type {?} */
            const navUrl = JSON.parse(JSON.stringify(header.navInfo.navUrl));
            /** @type {?} */
            const utility = new MuUtility();
            header.navInfo.navUrl = utility.createNavUrl(navUrl, rowData);
            buttonEvent.navInfo = header.navInfo;
        }
        else {
            buttonEvent.rowData = rowData;
        }
        this.onCellClick.emit(buttonEvent);
    }
    /**
     * performs search operation on the data available in the table only if table
     * is not lazy loaded. In case of lazy loading a callback is given to parent.
     * @param {?=} inputText
     * @return {?}
     */
    search(inputText) {
        this.dataMap = {};
        /** @type {?} */
        let filteredData = [];
        if (!inputText) {
            filteredData = this.tableConfig.data;
        }
        else {
            filteredData = this.tableConfig.data.filter((/**
             * @param {?} dataRow
             * @return {?}
             */
            dataRow => {
                if (this.filterFields.filter((/**
                 * @param {?} header
                 * @return {?}
                 */
                header => dataRow[header] && dataRow[header].toString().toLowerCase()
                    .includes(inputText.toString().toLowerCase())))
                    .length)
                    return true;
            }));
        }
        this.tableConfig.totalRecords = filteredData.length;
        this.createDataMap(filteredData, 0);
        this.createPageNumbers();
    }
    /**
     * Inserts a data row at the beginning of the table by clearing the datamap
     * @param {?} obj - data object that needs to be inserted
     * @return {?}
     */
    insertRow(obj) {
        /** @type {?} */
        let newData = [];
        if (!this.tableConfig.lazyLoad) {
            this.tableConfig.data.unshift(obj);
            newData = this.tableConfig.data;
            //Need to verify
            /** @type {?} */
            let newIndexes = {};
            for (let index of Object.keys(this.selectedIndexes))
                newIndexes[Number(index) + 1] = true;
            this.selectedIndexes = {};
            this.selectedIndexes = newIndexes;
        }
        else {
            /** @type {?} */
            let firstPageData = this.dataMap[0];
            firstPageData.unshift(obj);
            firstPageData.pop();
            newData = firstPageData;
        }
        this.dataMap = {};
        this.tableConfig.totalRecords++;
        this.createDataMap(newData, 0);
        this.createPageNumbers();
    }
    /**
     * Deletes a row of given row index assuming that the index which is to deleted is currently
     * being displayed. Checks whether next page data exists in the map and reorders the sequence by
     * shifting the data, if not a callback is sent to parent to load data for that index.
     * @param {?} rowIndex - index of the data which needs to be deleted
     * @return {?}
     */
    deleteRow(rowIndex) {
        if (!this.tableConfig.lazyLoad) {
            this.tableConfig.data.splice(rowIndex, 1);
            this.dataMap = {};
            this.createDataMap(this.tableConfig.data, 0);
            this.tableConfig.totalRecords--;
            this.createPageNumbers();
            //Need to verify
            /** @type {?} */
            let newIndexes = {};
            for (let index of Object.keys(this.selectedIndexes))
                newIndexes[Number(index) - 1] = true;
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
        const keys = Object.keys(this.dataMap);
        for (const key of keys)
            if (Number(key) > this.currPageIndex)
                delete this.dataMap[key];
        this.changeDet.detectChanges();
    }
    /**
     * Enables editing the data for editable coloumns when the user clicks on edit button.
     * Sends callback to the parent with new values when user saves the data.
     * @param {?} rowData
     * @param {?} isEdit
     * @return {?}
     */
    editRow(rowData, isEdit) {
        this.selectedIndexes = {};
        if (isEdit) {
            this.selectedIndexes[rowData['rowIndex']] = true;
        }
        else {
            /** @type {?} */
            const editEvent = {
                editedValues: this.editForm.value,
                rowData: rowData,
                rowIndex: rowData['rowIndex']
            };
            this.onRowEdit.emit(editEvent);
        }
        this.editForm.reset();
    }
    /**
     * updates the data of given rowIndex, usually called after editing the data.
     * @param {?} rowIndex
     * @param {?} data
     * @return {?}
     */
    updateRow(rowIndex, data) {
        this.dataMap[this.currPageIndex][rowIndex % this.tableConfig.dispRows] = data;
    }
    /**
     * Call back from filter component on applying filters that was directly passed
     * back to the parent
     * @param {?} event
     * @return {?}
     */
    applyFilter(event) {
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
    }
    /**
     * Method invoked by parent to unselect the rows
     * @param {?} rowIndexes
     * @return {?}
     */
    unselectIndexes(rowIndexes) {
        for (const index of rowIndexes)
            this.selectedIndexes[index] = false;
        if (this.slctAllBox)
            this.slctAllBox.checked = false;
        this.selAllMap[this.currPageIndex] = false;
    }
    /**
     * Method invoked by parent to unselect the rows
     * @return {?}
     */
    downloadTableData() { }
    /**
     * @return {?}
     */
    getEditedRows() {
        /** @type {?} */
        let editedRows = [];
        Object.keys(this.dataMap).forEach((/**
         * @param {?} index
         * @return {?}
         */
        index => {
            this.dataMap[index].forEach((/**
             * @param {?} rowObject
             * @return {?}
             */
            rowObject => {
                editedRows.push(rowObject);
            }));
        }));
        return editedRows;
    }
    /**
     * Method invoked by parent to download the records in XLSX, CSV or XLS format
     * @return {?}
     */
    onDownloadClick() {
        this.menuTrigger.closeMenu();
        if (this.tableConfig.downloadFormats.length === 1) {
            this.onSelectingFormat(this.tableConfig.downloadFormats[0]);
        }
        else {
            this.menuTrigger.openMenu();
        }
    }
    /**
     * @param {?} fileFormat
     * @return {?}
     */
    onSelectingFormat(fileFormat) {
        this.onDownload.emit(fileFormat);
    }
}
MuDataTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'mu-data-table',
                template: "\n<div class=\"horz-filter\" *ngIf=\"tableConfig.horizFilterParams\">\n  <filter\n    [filterItems]=\"tableConfig.horizFilterParams\"\n    [webMode]=\"true\"\n    [displayCount]=\"3\"\n    (selectedFilter)=\"applyFilter($event)\">\n  </filter>\n</div>\n\n<div [ngClass]=\"tableConfig.vertFilterParams ? 'filter-cont' : ''\" #filterCont>\n  <div  class=\"bg-white mu-table-cont border-light\" #muTableCont>\n    \n    <div class=\"table-extras bg-white\" #tableExtras>\n      <div class=\"search-input txt-lg-med-dark text-color-primary\" \n            *ngIf=\"dataToDisplay.length && pageNumbers.length === 1\">\n        \n        Total Records : {{ tableConfig.totalRecords }}  \n      </div>\n\n      <div class=\"search-input txt-lg-med-dark text-color-primary\" \n            *ngIf=\"dataToDisplay.length && pageNumbers.length > 1\">\n\n        {{ currPageIndex * tableConfig.dispRows + 1 }} to \n        {{ ((currPageIndex + 1) * tableConfig.dispRows) <= tableConfig.totalRecords ? ((currPageIndex + 1) * tableConfig.dispRows) : tableConfig.totalRecords }} \n        of {{ tableConfig.totalRecords }} records \n      </div>\n\n      <div class=\"download text-color-primary\"  \n        [matMenuTriggerFor]=\"menu\"\n        #menuTrigger=\"matMenuTrigger\"          \n        (click)=\"onDownloadClick()\">\n        <i *ngIf=\"dataToDisplay.length && tableConfig.downloadFormats\"\n        class=\"fa fa-download\" aria-hidden=\"true\"></i>\n      </div>\n\n      <div class=\"show-menu\">\n        <mat-menu #menu=\"matMenu\"\n          [xPosition]=\"'before'\"\n          [yPosition]=\"'below'\">\n    \n          <div class=\"txt-lg-bld-norm\" *ngFor=\"let format of tableConfig.downloadFormats\">\n            <button mat-menu-item (click)=\"onSelectingFormat(format)\">\n              {{ format }}\n            </button>\n          </div>    \n        </mat-menu>\n      </div>\n    \n      <div class=\"paginator text-color-primary\" *ngIf=\"pageNumbers.length > 1\">\n        <div [ngClass]=\"{'text-color-disable' : currPageIndex === 0}\" class=\"fast-backward pagenumber\"\n            (click)=\"onPageClick(0)\">\n          <i class=\"fa fa-fast-backward\" aria-hidden=\"true\"></i>\n        </div> \n        <div [ngClass]=\"{'text-color-disable' : currPageIndex === 0}\" class=\"firstPage\" class=\"pagenumber\"\n            (click)=\"onPageClick(currPageIndex - 1)\">\n          <i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i>\n        </div>\n        <div class=\"pagenumber txt-lg-reg-dark\" *ngFor=\"let pageNumber of pageNumbers.slice(pageIndex, pageIndex + 5)\"\n          (click)=\"onPageClick(pageNumber - 1)\"\n          [ngClass]=\"currPageIndex === pageNumber - 1 ? 'sel-ind' : ''\">\n          {{ pageNumber }}\n        </div>\n        <div [ngClass]=\"{ 'text-color-disable' : currPageIndex === pageNumbers.length - 1 }\" \n            class=\"lastPage\" class=\"pagenumber\" (click)=\"onPageClick(currPageIndex + 1)\">\n          <i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i>\n        </div>\n        <div [ngClass]=\"{ 'text-color-disable' : currPageIndex === pageNumbers.length - 1 }\" \n            class=\"fast-forward pagenumber\" (click)=\"onPageClick(pageNumbers.length - 1)\">\n          <i class=\"fa fa-fast-forward\" aria-hidden=\"true\"></i>\n        </div>\n\n      </div>\n    </div>\n\n    <ng-template *ngIf=\"(stickyInfo); then stickyConfig else defaultConfig\"></ng-template>\n\n    <ng-template #stickyConfig>\n      <div class=\"sticky-container\">\n        <ng-container *ngTemplateOutlet=\"innerContent\"></ng-container>\n      </div>\n    </ng-template>\n\n    <ng-template #defaultConfig>\n      <ng-container *ngTemplateOutlet=\"innerContent\"></ng-container>\n    </ng-template>\n\n\n    <ng-template #innerContent>\n        <div class=\"primary-bg border-light\"\n        [ngClass]=\" stickyInfo ? 'headers-cont-sticky' : 'headers-cont'\"\n        [style.width]=\"stickyInfo ? (stickyInfo.stickyWidth + stickyInfo.nonStickyWidth) + '%' : ''\"\n        [style.top]=\"!stickyInfo ? tableExtras.getBoundingClientRect().height.toFixed(2)+ 'px' : ''\">\n          <div class=\"radio-btn\" *ngIf=\"tableConfig?.enableRadio\"></div>\n          <div class=\"checkbox\" *ngIf=\"tableConfig?.enableSelect && dataToDisplay.length\" >\n            <mat-checkbox (change)=\"selectAll($event)\" #slctAllBox></mat-checkbox>\n          </div>\n\n          <ng-container *ngFor=\"let header of tableConfig.headers; index as i\">\n            <div \n            class=\"txt-xl-bld-dark text-color-white\"\n            [style.position]=\"stickyInfo && (i <= (stickyInfo.noOfCols - 1)) ? 'sticky' : ''\"\n            [style.left]=\"stickyInfo && (i <= (stickyInfo.noOfCols - 1)) ? \n              (i*(stickyInfo.stickyWidth/stickyInfo.noOfCols))+'%' : ''\"\n            [style.width]=\"stickyInfo ? \n              (\n                i <= (stickyInfo.noOfCols - 1) ? \n                (stickyInfo.stickyWidth/stickyInfo.noOfCols) + '%' :\n                (header.widthPerc || stickyInfo.nonStickyWidth/(tableConfig.headers.length - stickyInfo.noOfCols)) + '%'\n                )\n              : \n              (header.widthPerc || 100/tableConfig.headers.length)+'%'\n              \"\n            [ngClass]=\"stickyInfo ? \n            (i == (stickyInfo.noOfCols - 1) ? 'header-sticky last-sticky' : 'header-sticky')\n            :\n            'header'\n            \">\n              {{ header.header }}\n            </div>\n          </ng-container>\n        </div>\n\n        <div class=\"border-light\" *ngFor=\"let rowData of dataToDisplay\"\n          [ngClass]=\"stickyInfo ? 'table-row-cont-sticky' : 'table-row-cont'\"\n          [style.width]=\"stickyInfo ? (stickyInfo.stickyWidth + stickyInfo.nonStickyWidth) + '%' : ''\"\n          [class.row-active]=\"selectedIndexes[rowData['rowIndex']] && !isTogglePresent\">\n\n          <div class=\"radio-btn\" *ngIf=\"tableConfig.enableRadio\">\n            <mat-radio-group name=\"rowRadio\">\n              <mat-radio-button \n                value=\"{{ rowData['rowIndex'] }}\" \n                (click)=\"rowClick($event, rowData)\"\n                (change)=\"radioSelect($event, rowData)\"\n                [checked]=\"selectedIndexes[rowData['rowIndex']]\">\n              </mat-radio-button>\n            </mat-radio-group>\n          </div>\n\n          <div class=\"checkbox\" *ngIf=\"tableConfig.enableSelect\">\n            <mat-checkbox\n              (click)=\"rowClick($event, rowData)\"\n              [checked]=\"selectedIndexes[rowData['rowIndex']]\"\n              (change)=\"rowSelect($event, rowData)\">\n            </mat-checkbox>\n          </div>\n\n        <ng-container *ngIf=\"dataToDisplay\">\n\n          <ng-container *ngFor=\"let header of tableConfig.headers; index as ind\">\n            <div\n              class=\"txt-md-med-norm\" \n              [style.position]=\"stickyInfo && (ind <= (stickyInfo.noOfCols - 1)) ? 'sticky' : ''\"\n              [style.left]=\"stickyInfo && (ind <= (stickyInfo.noOfCols - 1)) ? \n                (ind*(stickyInfo.stickyWidth/stickyInfo.noOfCols))+'%' : ''\"\n              [style.width]=\"stickyInfo ? \n              (\n                ind <= (stickyInfo.noOfCols - 1) ? \n                (stickyInfo.stickyWidth/stickyInfo.noOfCols) + '%' :\n                (header.widthPerc || stickyInfo.nonStickyWidth/(tableConfig.headers.length - stickyInfo.noOfCols)) + '%'\n                )\n              : \n              (header.widthPerc || 100/tableConfig.headers.length)+'%'\n              \"\n              [ngClass]=\"stickyInfo ? \n              ind == (stickyInfo.noOfCols - 1) ? 'last-sticky row-data-sticky header.customStyle' : 'row-data-sticky header.customStyle' :\n              'row-data header.customStyle'\n              \">\n          \n          <ng-container [ngSwitch]=\"header.colType\" [formGroup]=\"editForm\">\n\n            <div *ngSwitchCase=\"COL_TYPE.TEXT\" [ngClass]=\"header.elementStyle\">\n              \n              <span *ngIf=\"!(selectedIndexes[rowData['rowIndex']] && header.isEditable)\" class=\"text-cls\"> \n                {{ header.constValue || rowData[header.dataKey] | genericPipe : header.pipeParams?.pipeName : [header.pipeParams?.value] }}\n              </span> \n              <input *ngIf=\"selectedIndexes[rowData['rowIndex']] && header.isEditable\" \n                formControlName=\"{{ header.dataKey }}\"\n                value=\"{{ rowData[header.dataKey] | genericPipe : header.pipeParams?.pipeName : [header.pipeParams?.value] }}\" type=\"text\">\n            </div>\n\n            <div *ngSwitchCase=\"COL_TYPE.INPUT_EDIT\" [ngClass]=\"header.elementStyle\">\n              <input *ngIf=\"header.isEditable\" class=\"edit-input border-light\"\n                [(ngModel)]=\"rowData[header.dataKey]\" type=\"text\" \n                [ngModelOptions]=\"{standalone: true}\">\n            </div>\n            \n            <!-- Column to display multi line text along with image and icon -->\n            <div class=\"multi-line click-item\" *ngSwitchCase=\"COL_TYPE.MULTI_LINE\" [ngClass]=\"header.elementStyle\"\n                (click)=\"cellClick(rowData, header)\">\n              <div class=\"multi-line-text-align\" *ngFor=\"let colType of header.dataKeyType; let i = index\">\n                <div *ngIf=\"colType === COL_TYPE.IMAGE\">\n                  <img src=\"{{ header.multiLineKey[i] }}\">\n                </div>\n                <div *ngIf=\"colType === COL_TYPE.ICON\">\n                  <i class=\"{{ rowData[header.multiLineKey[i]] }}\"></i>\n                </div>\n                <div *ngIf=\"colType === COL_TYPE.TEXT\">\n                  <div *ngFor=\"let data of header.dataKeyArr; let j = index\" class=\"profile-align\">\n                    <div class=\"multi-line\">\n                      <div *ngIf=\"header.headerArr\"\n                        class=\"text-color-primary txt-md-med-norm header-width\"> \n                        {{ header.headerArr[j] }} \n                      </div>\n                      <div *ngIf=\"header.headerArr\" class=\"colon-width\">\n                        :\n                      </div>\n                      <div class=\"txt-md-med-norm data-width\">\n                        {{ rowData[data] }}\n                      </div>\n                    </div>  \n                  </div>\n                </div>\n              </div>\n            </div>\n            \n              <div *ngSwitchCase=\"COL_TYPE.IMAGE\" [ngClass]=\"header.elementStyle\">\n                <img src=\"{{ header.constValue || rowData[header.dataKey] }}\">\n              </div>\n\n              <div *ngSwitchCase=\"COL_TYPE.HYPER_LINK\" (click)=\"cellClick(rowData, header)\"\n                class=\"click-item text-color-primary\" [ngClass]=\"header.elementStyle\">\n                {{ header.constValue || rowData[header.dataKey] | genericPipe : header.pipeParams?.pipeName : [header.pipeParams?.value] }}\n              </div>\n\n              <div *ngSwitchCase=\"COL_TYPE.ICON\" (click)=\"cellClick(rowData, header)\" class=\"click-item\"\n                [ngClass]=\"header.elementStyle\">\n                <i class=\"{{ header.constValue || rowData[header.dataKey] }}\"></i>\n              </div>\n\n              <div *ngSwitchCase=\"COL_TYPE.BUTTON\" (click)=\"cellClick(rowData, header)\"\n                [ngClass]=\"header.elementStyle\">\n                <button class=\"table-button curs-pointer txt-lg-med-norm primary-bg\">\n                  {{ header.constValue || rowData[header.dataKey] }}\n                </button>\n              </div>\n\n              <div *ngSwitchCase=\"COL_TYPE.TOGGLE\" [ngClass]=\"header.elementStyle\">\n                <mat-slide-toggle \n                  (click)=\"rowClick($event, rowData)\"\n                  (change)=\"toggleRow($event, rowData)\"\n                  [checked]=\"selectedIndexes[rowData['rowIndex']]\">\n                </mat-slide-toggle>\n              </div>\n\n              <div *ngSwitchCase=\"COL_TYPE.MORE_DETAILS\" [ngClass]=\"header.elementStyle\">\n                <i class=\"click-item fa fa-ellipsis-v more-icon\" [matMenuTriggerFor]=\"menu\" aria-hidden=\"true\"></i>\n                <mat-menu #menu=\"matMenu\" yPosition=\"below\" xPosition=\"before\">\n                  <button mat-menu-item *ngFor=\"let option of header.constValue\" class=\"txt-lg-med-norm\" \n                  (click)=\"moreDetailsClick(option.id, rowData)\"> \n                    <span> {{ option.value }}</span>\n                  </button>\n                </mat-menu>\n              </div>\n\n              <div *ngSwitchCase=\"COL_TYPE.EDIT\" [ngClass]=\"header.elementStyle\">\n                <span class=\"click-item\" (click)=\"editRow(rowData, true)\"\n\n                *ngIf=\"!selectedIndexes[rowData['rowIndex']]\">\n                  {{ 'mu_dt_tbl_edit' | translate }}\n                </span>\n\n                <span class=\"click-item\" (click)=\"editRow(rowData, false)\"\n                *ngIf=\"selectedIndexes[rowData['rowIndex']]\">\n                  {{ 'mu_dt_tbl_save' | translate }}\n\n                </span>\n              </div>\n            </ng-container>\n          </div>\n          </ng-container>\n        </ng-container>\n      </div>\n\n      <ng-container *ngIf=\"!dataToDisplay.length\">\n        <div class=\"no-data txt-lg-med-norm\">\n          {{ 'mu_dt_tbl_empty_state' | translate }}\n        </div>\n      </ng-container>\n    </ng-template>\n\n  </div>\n\n  <div class=\"vert-filter\" *ngIf=\"tableConfig.vertFilterParams\">\n    <filter\n      [filterItems]=\"tableConfig.vertFilterParams\"\n      [displayMode]=\"DISPLAY_MODE.VERTICAL\"\n      [webMode]=\"true\"\n      [displayCount]=\"1\"\n      (selectedFilter)=\"applyFilter($event)\">\n    </filter>\n  </div>\n</div>\n\n\n",
                styles: [":host{position:relative;width:100%}.mu-table-cont{border-style:solid;border-width:1px;box-shadow:0 2px 5px 0 rgba(0,0,0,.2);display:flex;flex-direction:column;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}.filter-cont{display:flex;height:auto;overflow-y:auto}.filter-cont ::-webkit-scrollbar{display:none}.filter-cont .mu-table-cont{height:100%;overflow-y:auto;width:85%}.filter-cont::-webkit-scrollbar{display:none}.headers-cont{align-items:center;padding:10px}.headers-cont,.headers-cont-sticky{border-bottom-style:solid;border-bottom-width:1px;display:flex;justify-content:space-between;position:-webkit-sticky;position:sticky;z-index:10}.checkbox{margin-left:20px}.checkbox,.radio-btn{margin-right:20px}.table-row-cont{align-items:center;justify-content:space-between;padding:10px}.table-row-cont,.table-row-cont-sticky{border-bottom-style:solid;border-bottom-width:1px;display:flex}.row-data{padding:5px}.row-data,.row-data-sticky{align-items:center;display:flex;justify-content:flex-start;word-break:break-word}.row-data-sticky{background:#fff;padding:20px 15px}.header{padding:0 5px}.header,.header-sticky{align-items:center;display:flex;justify-content:flex-start;word-break:break-word}.header-sticky{background:#203882!important;padding:10px 15px}.sticky-container::-webkit-scrollbar{height:8px}.sticky-container{overflow:auto;scrollbar-width:8px}.last-sticky{border-right:1px solid #9a9a9a;box-shadow:1px 1px 3px -1px #888}img{width:75px}.table-button{border:none;box-shadow:1px 1px 1px 1px #dadada;color:#fff!important;height:2rem;padding:0 20px;width:100%}.click-item{cursor:pointer;padding:5px 10px}.click-item:hover{background:#d2d2d2;border-radius:5px}.curs-pointer{cursor:pointer}.row-active{background:#d2d2d2}:host::ng-deep .mat-checkbox-inner-container{height:20px;width:20px}.radio-btn{width:0}.more-icon{cursor:pointer;font-size:1.5rem}.paginator{display:flex;float:right;justify-content:space-around}.pagenumber{align-items:center;cursor:pointer;display:flex;justify-content:center;padding:10px;width:2.5%}.sel-ind{background:#add8e6}.table-row{display:flex}.table-extras{background:#fff;border-bottom:1px solid #d2d2d2;position:-webkit-sticky;position:sticky;top:0;z-index:11}input{background:#eaeaea!important;border:none;height:70%;margin:5px;padding:5px;width:100%}.row-data input{background:#f2f5f7!important}.no-data{align-items:center;border-top:1px solid #d2d2d2;display:flex;justify-content:center;padding:10px;word-break:break-word}.search-input{float:left;margin:10px}.vert-filter{margin-left:1%;width:14%}.text-cls{-moz-user-select:text;-ms-user-select:text;-webkit-user-select:text;user-select:text}.multi-line{display:flex;flex-direction:row}.header-width{width:65px}.data-width{width:100px}.row-margin{margin-top:10px}.colon-width{width:10px}.profile-align{display:flex;flex-direction:column;justify-content:center;margin-left:20px;text-align:left}.multi-line-text-align{align-items:center;display:flex}.edit-input{border:1px solid}.show-menu{position:relative}.download{cursor:pointer;float:left;margin:10px 0 0 10px}"]
            }] }
];
/** @nocollapse */
MuDataTableComponent.ctorParameters = () => [
    { type: RunContextBrowser, decorators: [{ type: Inject, args: ['RunContext',] }] },
    { type: ChangeDetectorRef }
];
MuDataTableComponent.propDecorators = {
    slctAllBox: [{ type: ViewChild, args: ['slctAllBox', { static: false },] }],
    filterCont: [{ type: ViewChild, args: ['filterCont', { static: false },] }],
    muTableCont: [{ type: ViewChild, args: ['muTableCont', { static: false },] }],
    menuTrigger: [{ type: ViewChild, args: ['menuTrigger', { static: true },] }],
    filterCompChildren: [{ type: ViewChildren, args: [FilterComponent,] }],
    tableConfig: [{ type: Input }],
    loadMoreData: [{ type: Output }],
    onRowSelect: [{ type: Output }],
    onSelectAll: [{ type: Output }],
    onDetailClick: [{ type: Output }],
    onCellClick: [{ type: Output }],
    onRowEdit: [{ type: Output }],
    onDownload: [{ type: Output }],
    selectedFilter: [{ type: Output }]
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
const KEYBOARD_MODE = {
    NORMAL: 'NORMAL',
    SHOW_DOT: 'SHOW_DOT',
};
/** @enum {string} */
const KEY_TYPE = {
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
class KeypadComponent {
    /**
     * @param {?} rc
     */
    constructor(rc) {
        this.rc = rc;
        this.keyPress = new EventEmitter();
        this.KEYBOARD_MODE = KEYBOARD_MODE;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.mode)
            this.mode = KEYBOARD_MODE.NORMAL;
    }
    /**
     * @param {?} inputNum
     * @return {?}
     */
    keyClick(inputNum) {
        /** @type {?} */
        const data = { key: inputNum, keyType: KEY_TYPE.NUMBER };
        this.keyPress.emit(data);
    }
    /**
     * @return {?}
     */
    onKeyBoardBack() {
        /** @type {?} */
        const data = { key: null, keyType: KEY_TYPE.BACK };
        this.keyPress.emit(data);
    }
    /**
     * @return {?}
     */
    onKeyBoardOk() {
        /** @type {?} */
        const data = { key: null, keyType: KEY_TYPE.DONE };
        this.keyPress.emit(data);
    }
    /**
     * @return {?}
     */
    onKeyBoardDot() {
        /** @type {?} */
        const data = { key: '.', keyType: KEY_TYPE.DOT };
        this.keyPress.emit(data);
    }
}
KeypadComponent.decorators = [
    { type: Component, args: [{
                selector: 'keypad',
                template: "<div class=\"keypad txt-xxl-med-dark\">\n  \n  <div class=\"first-row\">\n    <div matRipple class=\"key key-one\" \n      [ngClass]=\"mode === KEYBOARD_MODE.NORMAL ? 'key-normal' : 'key-dot'\"\n      (click)=\"keyClick('1')\">\n      <span class=\"text-color-primary\">1</span>\n    </div>\n    <div matRipple class=\"key key-two\" \n      [ngClass]=\"mode === KEYBOARD_MODE.NORMAL ? 'key-normal' : 'key-dot'\"\n      (click)=\"keyClick('2')\">\n      <span class=\"text-color-primary\">2</span>\n    </div>\n    <div matRipple class=\"key key-three\" \n      [ngClass]=\"mode === KEYBOARD_MODE.NORMAL ? 'key-normal' : 'key-dot'\"\n      (click)=\"keyClick('3')\">\n      <span class=\"text-color-primary\">3</span>\n    </div>\n\n    <div *ngIf=\"mode !== KEYBOARD_MODE.NORMAL\"  class=\"key key-empty\">\n      \n    </div>\n  </div>\n\n  <div class=\"second-row\">\n    <div matRipple class=\"key key-four\" \n      [ngClass]=\"mode === KEYBOARD_MODE.NORMAL ? 'key-normal' : 'key-dot'\"\n      (click)=\"keyClick('4')\">\n      <span class=\"text-color-primary\">4</span>\n    </div>\n    <div matRipple class=\"key key-five\" \n      [ngClass]=\"mode === KEYBOARD_MODE.NORMAL ? 'key-normal' : 'key-dot'\"\n      (click)=\"keyClick('5')\">\n      <span class=\"text-color-primary\">5</span>\n    </div>\n    <div matRipple class=\"key key-six\" \n      [ngClass]=\"mode === KEYBOARD_MODE.NORMAL ? 'key-normal' : 'key-dot'\"\n      (click)=\"keyClick('6')\">\n      <span class=\"text-color-primary\" >6</span>\n    </div>\n    <div *ngIf=\"mode !== KEYBOARD_MODE.NORMAL\"  class=\"key key-empty\">\n      \n    </div>\n  </div>\n\n  <div class=\"third-row\">\n    <div matRipple class=\"key key-seven\" \n      [ngClass]=\"mode === KEYBOARD_MODE.NORMAL ? 'key-normal' : 'key-dot'\"\n      (click)=\"keyClick('7')\">\n      <span class=\"text-color-primary\">7</span>\n    </div>\n    <div matRipple class=\"key key-eight\" \n      [ngClass]=\"mode === KEYBOARD_MODE.NORMAL ? 'key-normal' : 'key-dot'\"\n      (click)=\"keyClick('8')\">\n      <span class=\"text-color-primary\">8</span>\n    </div>\n    <div matRipple class=\"key key-nine\" \n      [ngClass]=\"mode === KEYBOARD_MODE.NORMAL ? 'key-normal' : 'key-dot'\"\n      (click)=\"keyClick('9')\">\n      <span class=\"text-color-primary\">9</span>\n    </div>\n    <div *ngIf=\"mode !== KEYBOARD_MODE.NORMAL\"  class=\"key key-empty\">\n      \n    </div>\n  </div>\n\n  <div class=\"fourth-row\">\n    <div matRipple class=\"key key-back\" \n      [ngClass]=\"mode === KEYBOARD_MODE.NORMAL ? 'key-normal' : 'key-dot'\"\n      (click)=\"onKeyBoardBack()\">\n      <span class=\"text-color-primary\">\n        <i class=\"fa fa-arrow-left fa-lg\" aria-hidden=\"true\"></i>\n      </span>\n    </div>\n    <div matRipple class=\"key key-zero\" \n      [ngClass]=\"mode === KEYBOARD_MODE.NORMAL ? 'key-normal' : 'key-dot'\"\n      (click)=\"keyClick('0')\">\n      <span class=\"text-color-primary\">0</span>\n    </div>\n    <div *ngIf=\"mode !== KEYBOARD_MODE.NORMAL\" \n      matRipple class=\"key key-dot\" \n      [ngClass]=\"'key-dot'\"\n      (click)=\"onKeyBoardDot()\">\n      <span class=\"text-color-primary\">.</span>\n    </div>\n    <div matRipple class=\"key\" \n      [ngClass]=\"mode === KEYBOARD_MODE.NORMAL ? 'key-normal' : 'key-ok'\"\n      (click)=\"onKeyBoardOk()\">\n      <span class=\"text-color-primary\">\n        <i class=\"fa fa-check fa-lg\" aria-hidden=\"true\"></i>\n      </span>\n    </div>\n  </div>\n\n</div>",
                styles: [".keypad{flex-direction:column;width:100vw}.zero-row{display:flex;flex-direction:row;justify-content:flex-end;padding:0 8vw 2vh}.first-row,.fourth-row,.second-row,.third-row,.zero-row{display:flex;flex-direction:row;justify-content:center;width:100vw}.typed-text-view{height:100%;width:100%}.key{padding:1vh 0}.key span{border-radius:50%;height:12vw;width:12vw}.flex-center,.key,.keypad,.key span,.typed-text-view{align-items:center;display:flex;justify-content:center}.key-normal{width:33.33vw!important}.key-dot{width:28vw}.key-empty,.key-ok{width:16vw!important}"]
            }] }
];
/** @nocollapse */
KeypadComponent.ctorParameters = () => [
    { type: RunContextBrowser, decorators: [{ type: Inject, args: ['RunContext',] }] }
];
KeypadComponent.propDecorators = {
    mode: [{ type: Input, args: ['mode',] }],
    keyPress: [{ type: Output, args: ['keyPress',] }]
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
class PageNotFoundComponent {
    /**
     * @param {?} rc
     */
    constructor(rc) {
        this.rc = rc;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /*=====================================================================
                                      HTML
      =====================================================================*/
    /**
     * @return {?}
     */
    onHomeClick() {
        // this.rc.uiRouter.rootNavigate(ComponentRoute.LandingProxy)
    }
}
PageNotFoundComponent.decorators = [
    { type: Component, args: [{
                selector: 'page-not-found',
                template: "<div class=\"nc-root-div page-not-found-comp\"\n  [ngClass.xl]=\"['web-root-div']\"\n  [ngClass.lg]=\"['web-root-div']\"\n  [ngClass.md]=\"['web-root-div']\"\n  [ngClass.sm]=\"['web-root-div']\">\n  \n  <div class=\"nc-content-div bg-pnf\"\n    [ngClass.xl]=\"['web-content-div']\"\n    [ngClass.lg]=\"['web-content-div']\"\n    [ngClass.md]=\"['web-content-div']\"\n    [ngClass.sm]=\"['web-content-div']\">\n\n    <div class=\"web-img-cont\">\n      <img class=\"pnf-img\" src='images/pnf.png'>\n    </div>\n\n    <div class=\"img-cont\">\n      <img class=\"mob-pnf-img\" src='images/pnf-mobile.png'>\n    </div>\n\n    <footer class=\"footer\">\n      <button class=\"button bg-white txt-lg-reg-dark text-color-primary\" (click)=\"onHomeClick()\">\n        {{ 'page_not_fond_vist_home' | translate }}\n      </button>\n    </footer>\n\n  </div>\n  \n</div>\n",
                styles: [".nc-content-div{height:100vh}.web-img-cont{display:none}.img-cont{height:100%}.footer{bottom:30vh;display:flex;justify-content:center;position:absolute;width:100vw}.button{height:3rem;width:92vw}.mob-pnf-img{height:100vh;width:100vw}.web-content-div{height:100%;max-height:100%!important}.web-content-div .web-img-cont{display:block;height:100%;overflow:hidden;width:100%}.web-content-div .pnf-img{height:100%;width:100%}.web-content-div .footer{top:84%;width:100%}.web-content-div .img-cont{display:none}.web-content-div .button{width:16%}"]
            }] }
];
/** @nocollapse */
PageNotFoundComponent.ctorParameters = () => [
    { type: RunContextBrowser, decorators: [{ type: Inject, args: ['RunContext',] }] }
];
if (false) {
    /**
     * @type {?}
     * @protected
     */
    PageNotFoundComponent.prototype.rc;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const KEY_UP$1 = 'keyup';
/** @type {?} */
const BACKSPACE$1 = 'Backspace';
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
class MaskingValueDirective extends NcMaxLengthDirective {
    /**
     * @param {?} element
     * @param {?} renderer
     * @param {?} ngZone
     */
    constructor(element, renderer, ngZone) {
        super(element, renderer, ngZone);
        this.element = element;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.maskedValue = new EventEmitter();
        this.updatedString = '';
        window['mask'] = this;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.maxLength = this.maskingParams.maxLength;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        const clonedInputNode = this.element.nativeElement.cloneNode(true);
        /** @type {?} */
        const parentElem = this.element.nativeElement.parentElement;
        this.renderer.appendChild(parentElem, clonedInputNode);
        this.element.nativeElement.hidden = true;
        super.ngAfterViewInit();
        if (this.element.nativeElement.value) {
            /** @type {?} */
            const value = this.element.nativeElement.value;
            /** @type {?} */
            const maskingParams = this.maskingParams;
            /** @type {?} */
            const startSkipCount = maskingParams.startSkipCount || 0;
            /** @type {?} */
            const totalSkipCount = startSkipCount + (maskingParams.endSkipCount || 0);
            this.value(value, startSkipCount, totalSkipCount);
            this.updatedString = value;
        }
        this.renderer.listen(this.element.nativeElement.nextSibling, KEY_UP$1, this.handelEvent.bind(this));
    }
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
    value(value, startSkipCount, totalSkipCount) {
        value = value.substring(0, startSkipCount)
            + value.substring(startSkipCount, totalSkipCount + 1).replace(/\w+/g, this.maskingParams.maskWith || '*')
            + value.substring(totalSkipCount + 1);
        return value;
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    handelEvent(event) {
        super.handleEvent(event);
        /** @type {?} */
        let startSkipCount = this.maskingParams.startSkipCount || 0;
        /** @type {?} */
        let endSkipCount = this.maskingParams.endSkipCount || 0;
        /** @type {?} */
        let value = event.srcElement.value;
        /** @type {?} */
        let totalSkipCount = startSkipCount + endSkipCount;
        length = value.length;
        /** @type {?} */
        const isBackPressed = event.key === BACKSPACE$1;
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
    }
}
MaskingValueDirective.decorators = [
    { type: Directive, args: [{
                selector: '[maskingValue]'
            },] }
];
/** @nocollapse */
MaskingValueDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone }
];
MaskingValueDirective.propDecorators = {
    maskingParams: [{ type: Input, args: ['maskingValue',] }],
    maskedValue: [{ type: Output }]
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
class MuBrowserModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MuBrowserModule,
            providers: [
                TRANSLATION_PROVIDERS,
            ]
        };
    }
}
MuBrowserModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    FlexLayoutModule,
                    MuComponentsRoutingModule,
                    MatFormFieldModule,
                    MatDatepickerModule,
                    MatInputModule,
                    MatSelectModule,
                    MatAutocompleteModule,
                    MatCheckboxModule,
                    MatProgressBarModule,
                    MatRadioModule,
                    MatSliderModule,
                    MatSlideToggleModule,
                    MatButtonToggleModule,
                    MatMenuModule,
                    MatCardModule,
                    MatRippleModule,
                    MatDividerModule
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
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    FlexLayoutModule,
                    MatCheckboxModule,
                    MatDatepickerModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatSelectModule,
                    MatAutocompleteModule,
                    MatRadioModule,
                    MatProgressBarModule,
                    MatSliderModule,
                    MatSlideToggleModule,
                    MatButtonToggleModule,
                    MatMenuModule,
                    MatCardModule,
                    MatDividerModule
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
const utf8Encodings = ['utf8', 'utf-8'];
class TextEncDec {
    /**
     * @param {?} encFormat
     */
    constructor(encFormat) {
        if (utf8Encodings.indexOf(encFormat) < 0 && typeof encFormat !== 'undefined' && encFormat != null) {
            throw new RangeError('Invalid encoding type. Only utf-8 is supported');
        }
    }
    /**
     * @param {?} str
     * @return {?}
     */
    encode(str) {
        if (typeof str !== 'string') {
            throw new TypeError('passed argument must be of tye string');
        }
        /** @type {?} */
        const binstr = unescape(encodeURIComponent(str));
        /** @type {?} */
        const uar = new Uint8Array(binstr.length);
        /** @type {?} */
        const split = binstr.split('');
        for (let i = 0; i < split.length; i++) {
            uar[i] = split[i].charCodeAt(0);
        }
        return uar;
    }
    /**
     * @param {?} uar
     * @return {?}
     */
    decode(uar) {
        if (typeof uar === 'undefined') {
            return '';
        }
        if (!ArrayBuffer.isView(uar)) {
            throw new TypeError('passed argument must be an array buffer view');
        }
        else {
            /** @type {?} */
            const arr = new Uint8Array(uar.buffer, uar.byteOffset, uar.byteLength);
            /** @type {?} */
            const charArr = new Array(arr.length);
            for (let i = 0; i < arr.length; i++) {
                charArr[i] = String.fromCharCode(arr[i]);
            }
            return decodeURIComponent(escape(charArr.join('')));
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const ASYM_ALGO = { name: 'RSA-OAEP', hash: { name: 'SHA-1' } };
/** @type {?} */
let arShortCode;
/** @type {?} */
let arUniqueId;
/** @type {?} */
let pwc;
class EncryptionBrowser {
    /**
     * @param {?} rc
     * @param {?} ci
     * @param {?} rsaPubKey
     * @param {?} iv
     */
    constructor(rc, ci, rsaPubKey, iv) {
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
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.syncKey = yield crypto.subtle.generateKey(this.symAlgo, true, ['encrypt', 'decrypt']);
        });
    }
    /**
     * @param {?} wsConfig
     * @return {?}
     */
    encodeHeader(wsConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const now = Date.now() * 1000;
            /** @type {?} */
            const // microseconds
            tsBuffer = yield this.encrypt(this.strToUnit8Ar(now.toString()));
            /** @type {?} */
            const encTs = (/** @type {?} */ (new Uint8Array(tsBuffer)));
            /** @type {?} */
            const tsB64 = btoa(String.fromCharCode(...encTs));
            /** @type {?} */
            const keyBuffer = yield this.encryptSymKey();
            /** @type {?} */
            const encKey = (/** @type {?} */ (new Uint8Array(keyBuffer)));
            /** @type {?} */
            const keyB64 = btoa(String.fromCharCode(...encKey));
            /** @type {?} */
            const configBuffer = yield this.encrypt(this.strToUnit8Ar(JSON.stringify(wsConfig)));
            /** @type {?} */
            const encConfig = (/** @type {?} */ (new Uint8Array(configBuffer)));
            /** @type {?} */
            const configB64 = btoa(String.fromCharCode(...encConfig));
            return `${tsB64}${keyB64}${configB64}`;
        });
    }
    /**
     * @private
     * @return {?}
     */
    encryptSymKey() {
        return __awaiter(this, void 0, void 0, function* () {
            /*
                  this.ci.syncKey: Sym key that is generated by client and then changed by server
                  this.syncKey: Public key that is used to protect this.ci.syncKey
                */
            /** @type {?} */
            const buffer = yield crypto.subtle.exportKey('raw', this.syncKey);
            /** @type {?} */
            const key = yield crypto.subtle.importKey('spki', this.rsaPubKey, ASYM_ALGO, false, ['encrypt']);
            /** @type {?} */
            const encKey = yield crypto.subtle.encrypt(ASYM_ALGO, key, buffer);
            return encKey;
        });
    }
    /**
     * @private
     * @param {?} ar
     * @return {?}
     */
    encrypt(ar) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield crypto.subtle.encrypt(this.symAlgo, this.syncKey, ar);
        });
    }
    /**
     * @private
     * @param {?} ar
     * @return {?}
     */
    decrypt(ar) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield crypto.subtle.decrypt(this.symAlgo, this.syncKey, ar);
        });
    }
    /**
     * @private
     * @param {?} ar
     * @return {?}
     */
    getArrayBuffer(ar) {
        if (ar.byteOffset === 0 && ar.byteLength === ar.buffer.byteLength)
            return (/** @type {?} */ (ar.buffer));
        return (/** @type {?} */ (ar.buffer.slice(ar.byteOffset, ar.byteOffset + ar.byteLength)));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    encodeBody(data) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const str = this.stringifyWireObjects(data);
            /** @type {?} */
            let firstPassArray;
            /** @type {?} */
            let leader = -1;
            /** @type {?} */
            let deflate = false;
            if (str.length > Encoder.MIN_SIZE_TO_COMPRESS) {
                /** @type {?} */
                const ar = yield pwc.deflate(str);
                if (ar.length < str.length) {
                    firstPassArray = ar;
                    deflate = true;
                }
            }
            if (!firstPassArray) {
                firstPassArray = this.strToUnit8Ar(str);
            }
            /** @type {?} */
            const secondPassArray = new Uint8Array(yield this.encrypt(firstPassArray));
            /** @type {?} */
            const arOut = new Uint8Array(secondPassArray.byteLength + 1);
            leader = deflate ? DataLeader.ENC_DEF_JSON : DataLeader.ENC_JSON;
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
            return arOut;
        });
    }
    /**
     * @private
     * @param {?} objects
     * @return {?}
     */
    stringifyWireObjects(objects) {
        /** @type {?} */
        const strArray = objects.map((/**
         * @param {?} wm
         * @return {?}
         */
        wm => wm.stringify()));
        return `[${strArray.join(', ')}]`;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    decodeBody(data) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const inAr = new Uint8Array(data, 1);
            /** @type {?} */
            const ar = new Uint8Array(data, 0, 1);
            /** @type {?} */
            const leader = ar[0];
            /** @type {?} */
            const temp = new Uint8Array(yield this.decrypt(inAr));
            /** @type {?} */
            let arData;
            /** @type {?} */
            let index;
            /** @type {?} */
            let decLen;
            /** @type {?} */
            let deflated = false;
            if (leader === DataLeader.BINARY) {
                /** @type {?} */
                const newLineCode = '\n'.charCodeAt(0);
                for (index = 0; index < temp.length; index++)
                    if (temp[index] === newLineCode)
                        break;
                /** @type {?} */
                const jsonStr = String.fromCharCode(...(/** @type {?} */ (temp.slice(0, index))));
                /** @type {?} */
                const wo = (/** @type {?} */ (WireObject.getWireObject(JSON.parse(jsonStr))));
                /** @type {?} */
                const outAr = temp.slice(index + 1);
                wo.data = outAr;
                arData = [wo];
                decLen = outAr.byteLength;
            }
            else {
                deflated = leader === DataLeader.DEF_JSON || leader === DataLeader.ENC_DEF_JSON;
                /** @type {?} */
                const inJsonStr = deflated ? yield pwc.inflate(temp) : this.uint8ArToStr(temp);
                /** @type {?} */
                const inJson = JSON.parse(inJsonStr);
                decLen = inJsonStr.length;
                arData = Array.isArray(inJson) ? inJson : [inJsonStr];
                for (index = 0; index < arData.length; index++) {
                    arData[index] = WireObject.getWireObject(JSON.parse(arData[index]));
                }
            }
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'decodeBody', {
                first: arData[0].name,
                messages: arData.length,
                wire: data.byteLength,
                message: decLen,
                encrypted: leader === DataLeader.ENC_JSON || leader === DataLeader.ENC_BINARY || leader === DataLeader.ENC_DEF_JSON, compressed: leader === DataLeader.BINARY ? 'binary' : deflated
            });
            return (/** @type {?} */ (arData));
        });
    }
    /**
     * @param {?} syncKey
     * @return {?}
     */
    setNewKey(syncKey) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const arEncNewKey = this.binToUnit8Ar(atob(syncKey));
            this.syncKey = yield crypto.subtle.importKey('raw', arEncNewKey, this.symAlgo, true, ['encrypt', 'decrypt']);
        });
    }
    /**
     * @return {?}
     */
    getSyncKeyB64() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const buffer = yield crypto.subtle.exportKey('raw', this.syncKey);
            /** @type {?} */
            const arr = (/** @type {?} */ (new Uint8Array(buffer)));
            return btoa(String.fromCharCode(...arr));
        });
    }
    /**
     * @param {?} binStr
     * @return {?}
     */
    binToUnit8Ar(binStr) {
        /** @type {?} */
        const cls = Uint8Array;
        return cls.from(binStr, (/**
         * @param {?} c
         * @return {?}
         */
        (c) => c.charCodeAt(0)));
    }
    /**
     * @param {?} str
     * @return {?}
     */
    strToUnit8Ar(str) {
        /** @type {?} */
        const TextEncoder = ((/** @type {?} */ (window))).TextEncoder;
        return TextEncoder ? new TextEncoder('utf-8').encode(str) : new TextEncDec('utf-8').encode(str);
    }
    /**
     * @param {?} uar
     * @return {?}
     */
    uint8ArToStr(uar) {
        /** @type {?} */
        const TextDecoder = ((/** @type {?} */ (window))).TextDecoder;
        return TextDecoder ? new TextDecoder('utf-8').decode(uar) : new TextEncDec('utf-8').decode(uar);
    }
    /**
     * @private
     * @param {?} rc
     * @param {?} code
     * @return {?}
     */
    extractShortCode(rc, code) {
        rc.isAssert() && rc.assert(rc.getName(this), code.length <= 4);
        arShortCode = new Uint8Array(4);
        for (let index = 0; index < code.length; index++) {
            /** @type {?} */
            const str = code.charAt(index);
            rc.isAssert() && rc.assert(rc.getName(this), str.match(/[a-zA-Z0-9]/));
            arShortCode[index] = str.charCodeAt(0) - 40;
        }
    }
    /**
     * @private
     * @param {?} rc
     * @param {?} id
     * @return {?}
     */
    extractUniqueId(rc, id) {
        /** @type {?} */
        let ar = id.split('.').map((/**
         * @param {?} i
         * @return {?}
         */
        i => Number(i)));
        if (ar.length > 1) {
            rc.isAssert() && rc.assert(rc.getName(this), ar.length === 3 &&
                !isNaN(ar[0]) && !isNaN(ar[1]) && !isNaN(ar[2]));
        }
        else {
            /** @type {?} */
            let num = Number(ar[0]);
            rc.isAssert() && rc.assert(rc.getName(this), !isNaN(num) && num <= 999999);
            ar[2] = num % 100;
            num = Math.floor(num / 100);
            ar[1] = num % 100;
            ar[0] = Math.floor(num / 100);
        }
        arUniqueId = Uint8Array.from(ar);
    }
}
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
class AsyncRequest {
    /**
     * @param {?} apiName
     */
    constructor(apiName) {
        this.apiName = apiName;
        this.requestId = AsyncRequest.nextRequestId++;
        this.promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        }));
    }
}
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
class PakoWorkerClient {
    /**
     * @param {?} rc
     */
    constructor(rc) {
        this.rc = rc;
        this.reqMap = {};
        /** @type {?} */
        const worker = this.worker = new Worker('js/pwc.js');
        worker.onmessage = this.onMessage.bind(this);
    }
    /**
     * @param {?} inU8Array
     * @return {?}
     */
    inflate(inU8Array) {
        return __awaiter(this, void 0, void 0, function* () {
            return (/** @type {?} */ (yield this.sendMessage('inflate', inU8Array, { to: 'string' })));
        });
    }
    /**
     * @param {?} str
     * @return {?}
     */
    deflate(str) {
        return __awaiter(this, void 0, void 0, function* () {
            return (/** @type {?} */ (yield this.sendMessage('deflate', str)));
        });
    }
    /**
     * @private
     * @param {?} apiName
     * @param {...?} params
     * @return {?}
     */
    sendMessage(apiName, ...params) {
        /** @type {?} */
        const asyncRequest = new AsyncRequest(apiName);
        this.reqMap[asyncRequest.requestId] = asyncRequest;
        this.worker.postMessage([asyncRequest.requestId, apiName, ...params]);
        return asyncRequest.promise;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMessage(event) {
        const [reqId, ...resp] = event.data;
        /** @type {?} */
        const asyncRequest = this.reqMap[reqId];
        this.rc.isAssert() && this.rc.assert(this.rc.getName(this), asyncRequest);
        delete this.reqMap[reqId];
        asyncRequest.resolve(...resp);
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const PING_SECS = 29;
/** @type {?} */
const TOLERANCE_SECS = 5;
/** @type {?} */
const RFRSH_LAST_REQ_SECS = 60;
class WsBrowser {
    /**
     * @param {?} rc
     * @param {?} ci
     * @param {?} router
     */
    constructor(rc, ci, router) {
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
    uiArToB64(ar) {
        return btoa(String.fromCharCode(...ar));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    sendEphemeralEvent(event) {
        this.rc.isAssert() && this.rc.assert(this.rc.getName(this), this.ci.provider);
        if (this.ephemeralEvents.length >= 20) {
            this.rc.isWarn() && this.rc.warn(this.rc.getName(this), 'Too many ephemeralEvents. Sizing to 20');
            while (this.ephemeralEvents.length >= 20)
                this.ephemeralEvents.shift();
        }
        this.ephemeralEvents.push(event);
    }
    /**
     * @param {?} rc
     * @param {?} data
     * @return {?}
     */
    send(rc, data) {
        /** @type {?} */
        const ws = this.ws;
        if (this.sending ||
            (ws && (ws.readyState !== WebSocket.OPEN || !this.configured || ws.bufferedAmount))) {
            rc.isStatus() && rc.status(rc.getName(this), 'Websocket is not ready right now', {
                anotherSendInProgress: this.sending,
                configured: this.configured,
                readyState: this.ws ? this.ws.readyState : 'to be created',
                bufferedAmount: this.ws.bufferedAmount
            });
            return XmnError._NotReady;
        }
        /** @type {?} */
        const objects = Array.isArray(data) ? data : [data];
        if (this.ephemeralEvents.length) {
            objects.push(...this.ephemeralEvents);
            this.ephemeralEvents.length = 0;
        }
        this.sendInternal(rc, objects);
        return null;
    }
    /**
     * @return {?}
     */
    requestClose() {
        /** @type {?} */
        const ws = this.ws;
        if (ws && ws.readyState !== WebSocket.CLOSED)
            ws.close();
    }
    /**
     * @private
     * @param {?} rc
     * @param {?} data
     * @return {?}
     */
    sendInternal(rc, data) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            let messageBody;
            this.sending = true;
            if (!this.ws) {
                this.pendingMessage = data;
                if (!this.encProvider) {
                    this.encProvider = new EncryptionBrowser(rc, this.ci, this.router.getPubKey(), this.router.getEncIV());
                    yield this.encProvider.init();
                }
                if (!this.wsProviderConfig) {
                    this.wsProviderConfig = {
                        pingSecs: PING_SECS,
                        maxOpenSecs: this.router.getMaxOpenSecs(),
                        toleranceSecs: TOLERANCE_SECS,
                        key: yield this.encProvider.getSyncKeyB64(),
                        custom: this.ci.customData
                    };
                }
                /** @type {?} */
                const url = `${this.ci.port === 443 || this.router.runAlwaysAsSecure(this.rc)
                    ? 'wss' : 'ws'}://${this.ci.host}:${this.ci.port}/${HANDSHAKE}/${this.ci.protocolVersion}/${this.ci.shortName}/`;
                /** @type {?} */
                const header = yield this.encProvider.encodeHeader(this.wsProviderConfig);
                messageBody = encodeURIComponent(header);
                this.ws = new WebSocket(url + messageBody);
                this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Opened socket with url', url + messageBody);
                this.ws.binaryType = 'arraybuffer';
                this.ws.onopen = this.onOpen.bind(this);
                this.ws.onmessage = this.onMessage.bind(this);
                this.ws.onclose = this.onClose.bind(this);
                this.ws.onerror = this.onError.bind(this);
                this.socketCreateTs = Date.now();
            }
            else {
                if (!this.isConnWithinPing(Date.now())) { // Connection expired
                    rc.isDebug() && rc.debug(rc.getName(this), `Connection expired..requesting Socket close.`);
                    this.sending = false;
                    this.connExpired = true;
                    this.requestClose();
                    return;
                }
                messageBody = yield this.encProvider.encodeBody(data);
                this.ws.send(messageBody);
                this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Sent message', { msgLen: messageBody.length,
                    messages: data.length, firstMsg: data[0].name });
            }
            /** @type {?} */
            const wireObjIsOfReq = data.some((/**
             * @param {?} wireObject
             * @return {?}
             */
            wireObject => { return wireObject.type === WIRE_TYPE.REQUEST; }));
            if (wireObjIsOfReq && this.router.canStrtLastReqTimer(this.rc)) {
                this.setLastReqTimer(rc);
            }
            this.setupTimer(rc);
            this.sending = false;
        });
    }
    /**
     * @return {?}
     */
    onOpen() {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onOpen() in', Date.now() - this.socketCreateTs, 'ms');
        this.router.providerReady();
    }
    /**
     * @param {?} msgEvent
     * @return {?}
     */
    onMessage(msgEvent) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const data = msgEvent.data;
            /** @type {?} */
            const messages = yield this.encProvider.decodeBody(data);
            yield this.router.providerMessage(this.rc, messages);
        });
    }
    /**
     * @param {?} err
     * @return {?}
     */
    onError(err) {
        this.rc.isWarn() && this.rc.warn(this.rc.getName(this), 'Websocket onError()', err);
        if (this.ci.provider) {
            this.cleanup();
            this.router.providerFailed();
        }
    }
    /**
     * @return {?}
     */
    onClose() {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Websocket onClose()');
        if (this.ci.provider) {
            this.cleanup();
            this.router.providerFailed(this.connExpired ? XmnError._ConnectionExpired : null);
        }
    }
    /**
     * @param {?} rc
     * @param {?} se
     * @return {?}
     */
    processSysEvent(rc, se) {
        return __awaiter(this, void 0, void 0, function* () {
            if (se.name === SYS_EVENT.WS_PROVIDER_CONFIG) {
                /** @type {?} */
                const config = (/** @type {?} */ (se.data));
                /** @type {?} */
                const msPingSecs = config.pingSecs;
                this.rc.isAssert() && this.rc.assert(this.rc.getName(this), msPingSecs && Number.isInteger(msPingSecs), msPingSecs);
                Object.assign(this.wsProviderConfig, config);
                if (config.key)
                    yield this.encProvider.setNewKey(config.key);
                this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'First message in', Date.now() - this.socketCreateTs, 'ms');
                this.configured = true;
                if (this.pendingMessage) {
                    this.rc.isDebug() && this.rc.debug(this.rc.getName(this), `Sending Pending Message...`);
                    yield this.send(this.rc, this.pendingMessage);
                    this.pendingMessage = null;
                }
            }
            else if (se.name === SYS_EVENT.ERROR) {
                /** @type {?} */
                const errMsg = (/** @type {?} */ (se.data));
                rc.isWarn() && rc.warn(rc.getName(this), 'processSysEvent', errMsg);
                if (this.ci.provider) {
                    this.cleanup();
                    this.router.providerFailed(errMsg.code);
                }
            }
        });
    }
    /**
     * @private
     * @param {?} requestTs
     * @return {?}
     */
    isConnWithinPing(requestTs) {
        /** @type {?} */
        const wsConfig = this.wsProviderConfig;
        /** @type {?} */
        const pingTh = this.lastMessageTs + (wsConfig.pingSecs + wsConfig.toleranceSecs) * 1000;
        /** @type {?} */
        const openTh = this.socketCreateTs + (wsConfig.maxOpenSecs - wsConfig.toleranceSecs) * 1000;
        return requestTs < pingTh && requestTs < openTh;
    }
    /**
     * @private
     * @param {?} rc
     * @return {?}
     */
    setLastReqTimer(rc) {
        return __awaiter(this, void 0, void 0, function* () {
            this.lastRequestTs = Date.now();
            this.lastRequestTimer.tickAfter(RFRSH_LAST_REQ_SECS * 1000, true);
            if (!this.sessionTimedoutSecs) {
                this.sessionTimedoutSecs = yield this.router.getSessionTimeOutSecs(rc);
            }
        });
    }
    /**
     * @private
     * @param {?} rc
     * @return {?}
     */
    setupTimer(rc) {
        this.lastMessageTs = Date.now();
        this.timerPing.tickAfter(this.wsProviderConfig.pingSecs * 1000, true);
    }
    /**
     * @private
     * @return {?}
     */
    cbRequestTimer() {
        if (!this.ci.provider)
            return 0;
        /** @type {?} */
        const now = Date.now();
        /** @type {?} */
        const diff = now - this.lastRequestTs;
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), `cbRequestTimer ${diff}, ${this.sessionTimedoutSecs}`);
        if (diff >= (this.sessionTimedoutSecs * 1000)) {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), `Session timed out. Closing session`);
            this.router.sessionTimedOut(this.rc);
            this.requestClose();
            return RFRSH_LAST_REQ_SECS * 1000;
        }
        return diff;
    }
    /**
     * @private
     * @return {?}
     */
    cbTimerPing() {
        if (!this.ci.provider)
            return 0;
        /** @type {?} */
        const now = Date.now();
        /** @type {?} */
        const diff = this.lastMessageTs + this.wsProviderConfig.pingSecs * 1000 - now;
        if (diff <= 0) {
            this.send(this.rc, [new WireSysEvent(SYS_EVENT.PING, {})]);
            return this.wsProviderConfig.pingSecs * 1000;
        }
        return diff;
    }
    /**
     * @private
     * @return {?}
     */
    cleanup() {
        if (!this.ci.provider)
            return;
        try {
            this.timerPing.remove();
            this.lastRequestTimer.remove();
            this.encProvider = (/** @type {?} */ (null));
            this.ci.provider = (/** @type {?} */ (null));
            if (this.ws)
                this.ws.close();
            this.ws = (/** @type {?} */ (null));
        }
        catch (e) { }
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const TIMEOUT_MS = 30000;
/** @type {?} */
const SEND_RETRY_MS = 1000;
/** @type {?} */
const SEND_TIMEOUT = 10000;
/** @type {?} */
const EVENT_SEND_DELAY = 1000;
/** @type {?} */
const MAX_EVENTS_TO_SEND = 5;
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
class XmnRouterBrowser {
    /**
     * @param {?} rc
     * @param {?} serverUrl
     * @param {?} ci
     * @param {?} pubKey
     * @param {?} encIV
     */
    constructor(rc, serverUrl, ci, pubKey, encIV) {
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
        const urlParser = document.createElement('a');
        urlParser.href = serverUrl;
        this.ci = (/** @type {?} */ (ci));
        this.ci.protocol = Protocol.WEBSOCKET;
        this.ci.host = urlParser.hostname;
        this.ci.port = Number(urlParser.port) || (urlParser.protocol === 'https:' ? 443 : 80);
        /** @type {?} */
        const cls = Uint8Array;
        this.pubKey = cls.from(atob(pubKey), (/**
         * @param {?} c
         * @return {?}
         */
        (c) => c.charCodeAt(0)));
        this.encIV = encIV;
        this.timerReqResend = rc.timer.register('router-resend', this.cbTimerReqResend.bind(this));
        this.timerReqTimeout = rc.timer.register('router-req-timeout', this.cbTimerReqTimeout.bind(this));
        this.timerEventTimeout = rc.timer.register('router-event-timeout', this.cbTimerEventTimeout.bind(this));
        rc.isDebug() && rc.debug(rc.getName(this), 'constructor');
    }
    /**
     * @return {?}
     */
    getPubKey() { return this.pubKey; }
    /**
     * @return {?}
     */
    getEncIV() { return this.encIV; }
    /**
     * @param {?} rc
     * @param {?} apiName
     * @param {?} data
     * @param {?=} timeoutMS
     * @return {?}
     */
    sendRequest(rc, apiName, data, timeoutMS) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const timeout = timeoutMS || TIMEOUT_MS;
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            (resolve, reject) => {
                /** @type {?} */
                const wr = new WireRequest(apiName, data, 0, resolve, reject);
                this.ongoingRequests.push(wr);
                if (!this.ci.provider)
                    this.prepareConnection(rc);
                if (!this.ci.provider.send(rc, [wr])) {
                    wr._isSent = true;
                    rc.isDebug() && rc.debug(rc.getName(this), 'sent request', wr);
                    this.timerReqTimeout.tickAfter(timeout);
                }
                else {
                    rc.isStatus() && rc.status(rc.getName(this), 'send to be retried', wr);
                    this.timerReqResend.tickAfter(SEND_RETRY_MS);
                }
            }));
        });
    }
    /**
     * @protected
     * @param {?} rc
     * @param {?} eventName
     * @param {?} data
     * @return {?}
     */
    sendPersistentEvent(rc, eventName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.ci.provider)
                this.prepareConnection(rc);
            /** @type {?} */
            const customData = this.ci.customData;
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'sendPersistentEvent', eventName, 'customData', customData && customData.clientId);
            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), customData && customData.clientId, 'You cannot send events without clientId');
            if (yield this.initEvents()) {
                /** @type {?} */
                const event = new WireEvent(eventName, data);
                /** @type {?} */
                const eventTable = new EventTable(event);
                yield eventTable.save(this.db);
                yield this.trySendingEvents(rc);
            }
        });
    }
    /**
     * @protected
     * @param {?} rc
     * @param {?} eventName
     * @param {?} data
     * @return {?}
     */
    sendEphemeralEvent(rc, eventName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.ci.provider)
                this.prepareConnection(rc);
            /** @type {?} */
            const customData = this.ci.customData;
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'sendEphemeralEvent', eventName, 'customData', customData && customData.clientId);
            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), customData && customData.clientId, 'You cannot send events without clientId');
            /** @type {?} */
            const event = new WireEphEvent(eventName, data);
            this.ci.provider.sendEphemeralEvent(event);
        });
    }
    /**
     * @param {?} eventName
     * @param {?} eventHandler
     * @return {?}
     */
    subscribeEvent(eventName, eventHandler) {
        this.rc.isAssert() && this.rc.assert(this.rc.getName(this), eventName && eventHandler);
        this.eventSubMap[eventName] = eventHandler;
    }
    /**
     * @param {?} rc
     * @return {?}
     */
    prepareConnection(rc) {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'prepareConnection', !!this.ci.provider);
        this.ci.customData = this.getCustomData(rc);
        this.ci.customData.networkType = this.getNetworkType(rc);
        this.ci.customData.networkType = this.getLocation(rc);
        if (!this.ci.provider)
            this.ci.provider = new WsBrowser(rc, this.ci, this);
    }
    /**
     * @private
     * @return {?}
     */
    initEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const customData = this.ci.customData;
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'initEvents', !!this.db);
            if (!this.db && customData && customData.clientId) {
                this.db = new XmnDb(this.ci.customData.clientId);
                yield EventTable.removeOldByTs(this.rc, this.db, Date.now() - 7 * 24 * 3600000 /* 7 days */);
            }
            return !!this.db;
        });
    }
    /**
     * @private
     * @param {?} rc
     * @return {?}
     */
    trySendingEvents(rc) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.ci.customData.networkType || this.lastEventTs) {
                rc.isDebug() && rc.debug(rc.getName(this), 'Skipping sending event as not ready', {
                    networkType: this.ci.customData.networkType,
                    lastEventTs: this.lastEventTs
                });
                return;
            }
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'trySendingEvents', !!this.db);
            /** @type {?} */
            const arEvent = yield EventTable.getOldEvents(rc, this.db);
            if (!arEvent.length)
                return;
            // We need to guard trigger from the timeout timer, while waiting to get data from event table, earlier trySendingEvents
            // has succeeded
            if (this.lastEventTs)
                return;
            for (let index = 0; index < arEvent.length; index++) {
                if (!this.ci.provider)
                    this.prepareConnection(rc);
                /** @type {?} */
                const eventTable = arEvent[index];
                /** @type {?} */
                const wireEvent = new WireEvent(eventTable.name, JSON.parse(eventTable.data), eventTable.ts);
                if (this.ci.provider.send(rc, [wireEvent]))
                    break; // failed to send
                rc.isDebug() && rc.debug(rc.getName(this), 'sent event', wireEvent);
                this.lastEventTs = wireEvent.ts / 1000;
                this.lastEventSendTs = Date.now();
                this.timerEventTimeout.tickAfter(TIMEOUT_MS, true);
                yield Mubble.uPromise.delayedPromise(EVENT_SEND_DELAY);
            }
        });
    }
    /**
     * @return {?}
     */
    providerReady() {
        return __awaiter(this, void 0, void 0, function* () {
            this.cbTimerReqResend();
            /** @type {?} */
            const customData = this.ci.customData;
            if (customData && customData.clientId) {
                if (yield this.initEvents())
                    this.trySendingEvents(this.rc); // not awaiting as it will introduce delay
            }
        });
    }
    /**
     * @param {?=} errCode
     * @return {?}
     */
    providerFailed(errCode) {
        // finishRequest removed the item from ongoingRequests array
        while (this.ongoingRequests.length) {
            /** @type {?} */
            const wr = this.ongoingRequests[0];
            this.finishRequest(this.rc, 0, errCode || XmnError.ConnectionFailed, null);
        }
        this.ongoingRequests = [];
        this.lastEventTs = 0;
        this.lastEventSendTs = 0;
    }
    /**
     * @param {?} rc
     * @param {?} arData
     * @return {?}
     */
    providerMessage(rc, arData) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let index = 0; index < arData.length; index++) {
                /** @type {?} */
                const wo = arData[index];
                rc.isDebug() && rc.debug(rc.getName(this), `providerMessage@${index}`, wo);
                switch (wo.type) {
                    case WIRE_TYPE.REQUEST:
                        this.rc.isError() && this.rc.error(this.rc.getName(this), 'Not implemented', wo);
                        break;
                    case WIRE_TYPE.EPH_EVENT:
                        /** @type {?} */
                        const handler = this.eventSubMap[wo.name];
                        if (handler) {
                            yield handler(rc, wo.name, wo.data);
                        }
                        else {
                            EventSystem.broadcast(rc, wo.name, wo.data);
                        }
                        break;
                    case WIRE_TYPE.EVENT_RESP:
                        /** @type {?} */
                        const eventResp = (/** @type {?} */ (wo));
                        rc.isAssert() && rc.assert(rc.getName(this), eventResp.ts / 1000);
                        yield EventTable.removeOldByTs(rc, this.db, eventResp.ts / 1000);
                        if (this.lastEventTs === eventResp.ts / 1000) {
                            this.lastEventTs = 0;
                            this.lastEventSendTs = 0;
                            this.timerEventTimeout.remove();
                            yield this.trySendingEvents(rc);
                        }
                        break;
                    case WIRE_TYPE.REQ_RESP:
                        /** @type {?} */
                        const resp = (/** @type {?} */ (wo));
                        /** @type {?} */
                        const index = findIndex(this.ongoingRequests, { ts: resp.ts });
                        if (index === -1) {
                            this.rc.isStatus() && this.rc.status(this.rc.getName(this), 'Got response for request that is not in progress... timed-out?', resp.name, 'sent at', new Date(resp.ts / 1000));
                            return;
                        }
                        yield this.finishRequest(this.rc, index, resp.errorCode, resp.errorMessage, resp.data);
                        break;
                    case WIRE_TYPE.SYS_EVENT:
                        yield this.processSysEvent(this.rc, wo);
                        break;
                    default:
                        this.rc.isError() && this.rc.error(this.rc.getName(this), 'Unknown message', wo);
                }
            }
        });
    }
    /**
     * @return {?}
     */
    requestClose() {
        this.ci.provider.requestClose();
    }
    /**
     * @private
     * @param {?} rc
     * @param {?} se
     * @return {?}
     */
    processSysEvent(rc, se) {
        return __awaiter(this, void 0, void 0, function* () {
            if (se.name === SYS_EVENT.WS_PROVIDER_CONFIG) {
                /** @type {?} */
                const newConfig = (/** @type {?} */ (se.data));
                yield this.updateCustomData(rc, newConfig.custom);
                this.prepareConnection(rc);
            }
            yield this.ci.provider.processSysEvent(this.rc, se);
        });
    }
    /**
     * @private
     * @return {?}
     */
    cbTimerReqResend() {
        /** @type {?} */
        const wr = this.ongoingRequests.find((/**
         * @param {?} wr
         * @return {?}
         */
        wr => !wr._isSent));
        if (!wr || !this.ci.provider)
            return 0;
        if (!this.ci.provider.send(this.rc, wr)) {
            wr._isSent = true;
            this.timerReqTimeout.tickAfter(TIMEOUT_MS);
        }
        else if ((Date.now() - wr.ts / 1000) > SEND_TIMEOUT) {
            this.finishRequest(this.rc, this.ongoingRequests.indexOf(wr), XmnError.SendTimedOut, null);
        }
        else {
            return SEND_RETRY_MS;
        }
        // We need to see if there are still messages left to be sent
        return this.ongoingRequests.find((/**
         * @param {?} wr
         * @return {?}
         */
        wr => !wr._isSent)) ? SEND_RETRY_MS : 0;
    }
    /**
     * @private
     * @return {?}
     */
    cbTimerReqTimeout() {
        /** @type {?} */
        const now = Date.now();
        /** @type {?} */
        let nextTimeout = Number.MAX_SAFE_INTEGER;
        for (let index = 0; index < this.ongoingRequests.length; index++) {
            /** @type {?} */
            const wr = this.ongoingRequests[index];
            /** @type {?} */
            const timeoutAt = wr.ts / 1000 + TIMEOUT_MS;
            if (wr._isSent) {
                if (now >= timeoutAt) {
                    this.finishRequest(this.rc, index--, XmnError.RequestTimedOut, null);
                }
                else {
                    if (nextTimeout > timeoutAt)
                        nextTimeout = timeoutAt;
                }
            }
        }
        return nextTimeout === Number.MAX_SAFE_INTEGER ? 0 : nextTimeout - now;
    }
    /**
     * @private
     * @return {?}
     */
    cbTimerEventTimeout() {
        if (!this.lastEventSendTs)
            return 0;
        /** @type {?} */
        const diff = this.lastEventSendTs + TIMEOUT_MS - Date.now();
        if (diff > 0)
            return diff;
        this.lastEventTs = 0;
        this.lastEventSendTs = 0;
        this.trySendingEvents(this.rc);
        return TIMEOUT_MS;
    }
    /**
     * @private
     * @param {?} rc
     * @param {?} index
     * @param {?} errorCode
     * @param {?} errorMessage
     * @param {?=} data
     * @return {?}
     */
    finishRequest(rc, index, errorCode, errorMessage, data) {
        /** @type {?} */
        const wr = this.ongoingRequests[index];
        /** @type {?} */
        const now = Date.now();
        this.ongoingRequests.splice(index, 1);
        if (!wr.resolve) {
            rc.isStatus() && rc.status(rc.getName(this), 'Trying to finish already finished request', errorCode, wr.name, 'created at', new Date(wr.ts / 1000), 'timeTaken', now - wr.ts / 1000, 'ms');
            return;
        }
        if (errorCode) {
            rc.isStatus() && rc.status(rc.getName(this), 'Request failed with code', errorCode, wr.name, 'created at', new Date(wr.ts / 1000), 'timeTaken', now - wr.ts / 1000, 'ms');
            wr.reject(new Mubble.uError(errorCode, errorMessage || ''));
        }
        else {
            rc.isStatus() && rc.status(rc.getName(this), 'Request succeeded', wr.name, 'created at', new Date(wr.ts / 1000), 'timeTaken', now - wr.ts / 1000, 'ms');
            wr.resolve(data);
        }
        wr.reject = null;
        wr.resolve = null;
    }
} // end of class
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
class EventTable {
    /**
     * @param {?=} event
     */
    constructor(event) {
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
    save(db) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db.transaction('rw', db.events, (/**
             * @return {?}
             */
            () => __awaiter(this, void 0, void 0, function* () {
                yield db.events.put(this);
            })));
        });
    }
    /**
     * Static functions for io
     * @param {?} rc
     * @param {?} db
     * @return {?}
     */
    static getOldEvents(rc, db) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const ar = yield db.events.orderBy('ts').limit(MAX_EVENTS_TO_SEND).toArray();
            /** @type {?} */
            const arEt = ar.map((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                /** @type {?} */
                const et = new EventTable();
                et.ts = item.ts;
                et.name = item.name;
                et.data = item.data;
                return et;
            }));
            rc.isDebug() && rc.debug(rc.getName(this), 'Retrieved events from db, count:', arEt.length);
            return arEt;
        });
    }
    /**
     * @param {?} rc
     * @param {?} db
     * @param {?} ts
     * @return {?}
     */
    static removeOldByTs(rc, db, ts) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db.transaction('rw', db.events, (/**
             * @return {?}
             */
            () => __awaiter(this, void 0, void 0, function* () {
                yield db.events.where('ts').belowOrEqual(ts).delete();
            })));
            rc.isDebug() && rc.debug(rc.getName(this), 'Deleted events from db with ts belowOrEqual:', ts);
        });
    }
}
if (false) {
    /** @type {?} */
    EventTable.prototype.ts;
    /** @type {?} */
    EventTable.prototype.name;
    /** @type {?} */
    EventTable.prototype.data;
}
// http://dexie.org/docs/Typescript.html
class XmnDb extends Dexie {
    // number: type of primary key
    /**
     * @param {?} clientId
     */
    constructor(clientId) {
        super('xmn-' + clientId);
        this.version(1).stores({
            events: 'ts'
        });
        this.events.mapToClass(EventTable);
    }
}
if (false) {
    /** @type {?} */
    XmnDb.prototype.events;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const LAST_USER = 'lastUser';
/** @type {?} */
const USERS = 'users';
/**
 * @abstract
 */
class UserKeyValue {
    /**
     * @param {?} rc
     * @param {?} storage
     */
    constructor(rc, storage) {
        this.rc = rc;
        this.storage = storage;
        this.users = {};
    }
    /**
     * @return {?}
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const users = yield this.storage.getUserKeyValue(this.rc, USERS);
            if (!users)
                return;
            this.users = JSON.parse(users);
            /** @type {?} */
            const cid = yield this.storage.getUserKeyValue(this.rc, LAST_USER);
            this.lastClientId = Number(cid);
            if (!this.lastClientId)
                return;
            this.deserialize(this.users[this.lastClientId]);
            return this;
        });
    }
    /**
     * @param {?} clientId
     * @param {?} userLinkId
     * @param {?} userName
     * @return {?}
     */
    registerNewUser(clientId, userLinkId, userName) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const obj = { clientId, userLinkId, userName };
            this.users[clientId] = obj;
            yield this.storage.setUserKeyValue(this.rc, USERS, JSON.stringify(this.users));
            if (this.lastClientId !== clientId) {
                this.lastClientId = clientId;
                yield this.storage.setUserKeyValue(this.rc, LAST_USER, String(this.lastClientId));
            }
            this.deserialize(obj);
        });
    }
    /**
     * @param {?} routeName
     * @return {?}
     */
    setScreenVisited(routeName) {
        if (!this.screenVisitedStates)
            this.screenVisitedStates = {};
        if (this.screenVisitedStates[routeName])
            return;
        this.screenVisitedStates[routeName] = true;
        this.rc.isStatus() && this.rc.status(this.rc.getName(this), 'visited screen', routeName);
        this.save(this.rc);
    }
    /**
     * @param {?} rc
     * @param {?} base64
     * @return {?}
     */
    setWebProfilePicBase64(rc, base64) {
        this._webProfilePicBase64 = base64;
        this.save(rc);
    }
    /**
     * @return {?}
     */
    logOutCurrentUser() {
        return __awaiter(this, void 0, void 0, function* () {
            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), this._sessionId || this._userLinkId, 'Trying to logout a user who is not registered');
            delete this.users[this._clientId];
            yield this.storage.setUserKeyValue(this.rc, USERS, JSON.stringify(this.users));
            if (Object.keys(this.users).length > 0) {
                /** @type {?} */
                const lastClientId = Number(Object.keys(this.users)[0]);
                yield this.switchUserOnCurrRun(lastClientId);
            }
            else {
                yield this.storage.setUserKeyValue(this.rc, LAST_USER, null);
            }
        });
    }
    /**
     * @param {?} clientId
     * @return {?}
     */
    switchUserOnCurrRun(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.lastClientId = clientId;
            yield this.storage.setUserKeyValue(this.rc, LAST_USER, String(this.lastClientId));
            this.deserialize(this.users[this.lastClientId]);
        });
    }
    /**
     * @return {?}
     */
    getAllUserLinkIds() {
        /** @type {?} */
        const ids = [];
        for (const i of Object.keys(this.users)) {
            ids.push(this.users[i]['userLinkId']);
        }
        return ids;
    }
    /**
     * @param {?} reqUserLinkId
     * @return {?}
     */
    getClientIdForUserLink(reqUserLinkId) {
        for (let clientId in this.users) {
            /** @type {?} */
            const userLinkId = this.users[clientId]['userLinkId'];
            if (userLinkId === reqUserLinkId)
                return Number(clientId);
        }
        return 0;
    }
    /**
     * @param {?} rc
     * @return {?}
     */
    save(rc) {
        return __awaiter(this, void 0, void 0, function* () {
            rc.isAssert() && rc.assert(rc.getName(this), this._clientId, 'Came to save userKeyVal before clientId');
            if (!this._sessionId && !this._userLinkId) {
                rc.isStatus() && rc.status(rc.getName(this), `not saving rc, as user session / userLinkId not present 
        ${JSON.stringify({ sessionId: this._sessionId,
                    userLinkId: this._userLinkId })}`);
                return;
            }
            rc.isDebug() && rc.debug(rc.getName(this), `saving rc obj ${rc}`);
            this.users[this._clientId] = this.serialize();
            yield this.storage.setUserKeyValue(this.rc, USERS, JSON.stringify(this.users));
            if (this.lastClientId !== this._clientId) {
                this.lastClientId = this._clientId;
                yield this.storage.setUserKeyValue(this.rc, LAST_USER, String(this.lastClientId));
            }
        });
    }
    /**
     * @param {?} clientId
     * @return {?}
     */
    getWebProfilePicBase64(clientId) {
        return this.users[clientId]['webProfilePicBase64'];
    }
    /**
     * @return {?}
     */
    getAllClientIds() { return Object.keys(this.users).map(Number); }
    /**
     * @param {?} clientId
     * @return {?}
     */
    getUserInfo(clientId) { return this.users[clientId]; }
    // Client Id
    /**
     * @return {?}
     */
    get clientId() { return this._clientId; }
    /**
     * @param {?} clientId
     * @return {?}
     */
    set clientId(clientId) {
        if (clientId === this._clientId)
            return;
        if (this._clientId && (this._sessionId || this._userLinkId)) {
            throw new Mubble.uError('INVALID_CLIENT_ID', 'Cannot change clientId once sessionId/userLinkId is set: ' +
                JSON.stringify({ new: clientId, existing: this._clientId,
                    sessionId: this._sessionId, userLinkId: this._userLinkId }));
        }
        this._clientId = clientId;
    }
    /**
     * @return {?}
     */
    get deviceId() { return this._deviceId; }
    /**
     * @param {?} deviceId
     * @return {?}
     */
    set deviceId(deviceId) {
        if (deviceId === this._deviceId)
            return;
        this._deviceId = deviceId;
    }
    /**
     * @return {?}
     */
    get sessionId() { return this._sessionId; }
    /**
     * @param {?} sessionId
     * @return {?}
     */
    set sessionId(sessionId) {
        if (sessionId === this._sessionId)
            return;
        this._sessionId = sessionId;
    }
    /**
     * @return {?}
     */
    get obopayId() { return this._obopayId; }
    /**
     * @param {?} obopayId
     * @return {?}
     */
    set obopayId(obopayId) {
        if (obopayId === this._obopayId)
            return;
        if (this._obopayId && !obopayId === null)
            throw new Mubble.uError('INVALID_OBOPAY_ID', 'Cannot set obopayId when it is already set: ' + JSON.stringify({ obopayId, existing: this._obopayId }));
        this._obopayId = obopayId;
    }
    /**
     * @return {?}
     */
    get userLinkId() { return this._userLinkId; }
    /**
     * @param {?} userLinkId
     * @return {?}
     */
    set userLinkId(userLinkId) {
        if (userLinkId === this._userLinkId)
            return;
        if (this._userLinkId && !userLinkId === null)
            throw new Mubble.uError('INVALID_USER_LINK_ID', 'Cannot set userLinkId when it is already set: ' + JSON.stringify({ userLinkId, existing: this._userLinkId }));
        this._userLinkId = userLinkId;
    }
    /**
     * @return {?}
     */
    serialize() {
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
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    deserialize(obj) {
        this._clientId = obj.clientId;
        this._userLinkId = obj.userLinkId;
        this._deviceId = obj.deviceId;
        this._sessionId = obj.sessionId;
        this._obopayId = obj.obopayId;
        this.userName = obj.userName;
        this._webProfilePicBase64 = obj.webProfilePicBase64;
        this.screenVisitedStates = obj.screenVisitedStates;
    }
    /**
     * @return {?}
     */
    $dump() {
        /** @type {?} */
        const keys = Object.getOwnPropertyNames(this);
        for (const key of keys) {
            console.info(`${key}=${JSON.stringify(this[key])}`);
        }
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const META_KEY = 'autoStore';
/** @type {?} */
const VALID_TYPES = [String, Number, Boolean, Object];
/**
 * @abstract
 */
class GlobalKeyValue {
    /**
     * @param {?} rc
     * @param {?} storage
     */
    constructor(rc, storage) {
        this.rc = rc;
        this.storage = storage;
    }
    /**
     * @return {?}
     */
    static autoStore() {
        /** @type {?} */
        let functionResult = (/**
         * @param {?} target
         * @param {?} propertyKey
         * @return {?}
         */
        function (target, propertyKey) {
            Reflect.defineMetadata(META_KEY, true, target, propertyKey);
            return {
                get: (/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    const value = this['_' + propertyKey];
                    /** @type {?} */
                    const rc = this.rc;
                    rc.isAssert() && rc.assert(rc.getName(this), value !== undefined, `You are trying to fetch ${propertyKey}=${value} before init`);
                    return value;
                }),
                set: (/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) {
                    /** @type {?} */
                    const fieldType = Reflect.getMetadata('design:type', target, propertyKey);
                    /** @type {?} */
                    const rc = this['rc'];
                    rc.isDebug() && rc.debug(rc.getName(this), `autoStore.set: propertyKey: ${propertyKey}, value: ${value}, fieldType: ${fieldType}`);
                    rc.isAssert() && rc.assert(rc.getName(this), value !== undefined);
                    rc.isAssert() && rc.assert(rc.getName(this), VALID_TYPES.indexOf(fieldType) !== -1, `Not a valid propertyKey: ${propertyKey}, fieldType: ${fieldType}`);
                    rc.isAssert() && rc.assert(rc.getName(this), value === null ? fieldType === Object : value.constructor === fieldType, `You are trying to set ${propertyKey}=${value} with invalid type ${typeof (value)}`);
                    /** @type {?} */
                    let strValue = fieldType === Object ? JSON.stringify(value) : String(value);
                    /** @type {?} */
                    const oldValue = this['_' + propertyKey]
                    // undefined indicates that GlobalKeyValue has not been initialized
                    ;
                    // undefined indicates that GlobalKeyValue has not been initialized
                    if (oldValue === undefined) {
                        rc.isDebug() && rc.debug(rc.getName(this), `Remembering default ${propertyKey}=${value}`);
                        GlobalKeyValue.fieldMap[propertyKey] = { type: fieldType, strValue };
                        return;
                    }
                    /** @type {?} */
                    const strOldValue = this['_$' + propertyKey];
                    /** @type {?} */
                    const key = propertyKey;
                    if (strOldValue === strValue)
                        return;
                    this['_' + propertyKey] = value;
                    this['_$' + propertyKey] = strValue;
                    this.storage.setGlobalKeyValue(rc, key, strValue);
                    if (rc && rc.isDebug) {
                        rc.isDebug() && rc.debug('GlobalKeyValue', `Saved key ${key}=${strValue}`);
                    }
                })
            };
        });
        return functionResult;
    }
    /**
     * @return {?}
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const rc = this.rc;
            this.extractFields(this, GlobalKeyValue.fieldMap);
            for (const name of Object.keys(GlobalKeyValue.fieldMap)) {
                /** @type {?} */
                const field = GlobalKeyValue.fieldMap[name];
                /** @type {?} */
                const strSavedValue = yield this.storage.getGlobalKeyValue(rc, name);
                /** @type {?} */
                const strDefaultValue = field.strValue;
                /** @type {?} */
                const strValue = strSavedValue || strDefaultValue;
                /** @type {?} */
                let value;
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
            }
            return this;
        });
    }
    // Need to be called only for fields of type object, when some internal property
    // has been changed
    /**
     * @return {?}
     */
    detectSaveChanges() {
        for (const name of Object.keys(GlobalKeyValue.fieldMap)) {
            /** @type {?} */
            const field = GlobalKeyValue.fieldMap[name];
            /** @type {?} */
            const type = ((/** @type {?} */ (field.type))).name;
            if (field.type !== Object)
                continue;
            this[name] = this[name]; // forces the set function to get called
        }
    }
    /**
     * @private
     * @param {?} proto
     * @param {?} fieldz
     * @return {?}
     */
    extractFields(proto, fieldz) {
        if (proto === null)
            return;
        /** @type {?} */
        const keys = Object.getOwnPropertyNames(proto);
        for (const key of keys) {
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
        return this.extractFields(Object.getPrototypeOf(proto), fieldz);
    }
    /**
     * @return {?}
     */
    $dump() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const name of Object.keys(GlobalKeyValue.fieldMap)) {
                /** @type {?} */
                const field = GlobalKeyValue.fieldMap[name];
                /** @type {?} */
                const type = ((/** @type {?} */ (field.type))).name;
                /** @type {?} */
                const memory = this[name];
                /** @type {?} */
                const store = yield this.storage.getGlobalKeyValue(this.rc, name);
                console.info({ name, type, memory, store });
            }
        });
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const Segment = {
    version: 'version'
};
/** @type {?} */
const SYNC_HASH = 'syncHashTable';
class ModelField {
    /**
     * @param {?} name
     * @param {?} type
     * @param {?} optional
     */
    constructor(name, type, optional) {
        this.name = name;
        this.type = type;
        this.optional = optional;
    }
    /**
     * @return {?}
     */
    toString() {
        return `${this.name}(${this.type})${this.optional ? ': optional' : ''}`;
    }
}
if (false) {
    /** @type {?} */
    ModelField.prototype.name;
    /** @type {?} */
    ModelField.prototype.type;
    /** @type {?} */
    ModelField.prototype.optional;
}
((/** @type {?} */ (Dexie))).debug = true;
// @dynamic
/**
 * @abstract
 */
class MasterDb extends Dexie {
    /**
     * @param {?} rc
     * @param {?} version
     * @param {?} versionSchema
     */
    constructor(rc, version, versionSchema) {
        super('MasterDb');
        this.syncHashModels = {};
        /** @type {?} */
        const modelsWithKeys = Object.keys(MasterDb.schemaKey).length;
        /** @type {?} */
        const modelsWithFields = Object.keys(MasterDb.schemaField).length;
        rc.isAssert() && rc.assert(rc.getName(this), modelsWithKeys && modelsWithFields
            && modelsWithKeys >= modelsWithFields, { modelsWithKeys, modelsWithFields });
        rc.isAssert() && rc.assert(rc.getName(this), versionSchema[0].version === 1);
        /*
          TODO ???? validate accumulated versionSchema with this.buildSchema(schema)
        */
        versionSchema[0].tableSchema[SYNC_HASH] = 'model';
        this.verifySegmentVersion(rc, version);
    }
    /**
     * @param {?} modelName
     * @param {?} classFn
     * @return {?}
     */
    static registerModelClass(modelName, classFn) {
        this.classMap.set(classFn, modelName);
    }
    /**
     * @param {?} classFn
     * @return {?}
     */
    static getModelName(classFn) {
        return this.classMap.get(classFn);
    }
    /**
     * @param {?} modelName
     * @param {?} fieldName
     * @param {?} isPrimaryKey
     * @param {?} fieldType
     * @param {?} optional
     * @return {?}
     */
    static registerSchema(modelName, fieldName, isPrimaryKey, fieldType, optional) {
        /** @type {?} */
        const field = new ModelField(fieldName, fieldType, optional);
        /** @type {?} */
        const collection = isPrimaryKey ? this.schemaKey : this.schemaField;
        /** @type {?} */
        let fields = collection[modelName];
        if (!fields)
            fields = collection[modelName] = {};
        fields[field.name] = field;
        // console.log(`${modelName}: added ${isPrimaryKey ? 'key' : 'field'} + ${field}`)
    }
    /**
     * @param {?} rc
     * @return {?}
     */
    init(rc) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const ar = yield this[SYNC_HASH].toArray();
            /** @type {?} */
            const modelMap = MasterDb.schemaKey;
            /** @type {?} */
            const models = Object.keys(modelMap);
            for (const modelName of models) {
                /** @type {?} */
                const st = ar.find((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => item.model === modelName));
                this.syncHashModels[modelName] = st ? st.hash : { ts: 0 };
            }
            rc.isDebug() && rc.debug(rc.getName(this), 'restored syncHashModels', this.syncHashModels);
        });
    }
    /**
     * @param {?} rc
     * @return {?}
     */
    onRouterAvailable(rc) {
        /** @type {?} */
        const rcb = rc;
        rcb.router.subscribeEvent(MASTER_UPDATE_EVENT, this.onMasterUpdate.bind(this));
    }
    /**
     * @param {?} rc
     * @return {?}
     */
    getSyncRequest(rc) {
        rc.isAssert() && rc.assert(rc.getName(this), Object.keys(this.syncHashModels).length);
        return { hash: this.syncHashModels, segments: ((/** @type {?} */ (rc.globalKeyVal.syncSegments))) };
    }
    /**
     * @param {?} rc
     * @param {?} classFn
     * @return {?}
     */
    getTableForClass(rc, classFn) {
        /** @type {?} */
        const modelName = MasterDb.getModelName(classFn);
        rc.isAssert() && rc.assert(rc.getName(this), modelName, 'unknown class object', classFn);
        return this.getTable(rc, modelName);
    }
    /**
     * @private
     * @param {?} rc
     * @param {?} version
     * @return {?}
     */
    verifySegmentVersion(rc, version) {
        /** @type {?} */
        let segments = (/** @type {?} */ (rc.globalKeyVal.syncSegments));
        if (!segments)
            segments = {};
        if (!segments[Segment.version])
            segments[Segment.version] = [['']];
        const [[oldVersion]] = segments[Segment.version];
        if (oldVersion !== version) {
            rc.isDebug() && rc.debug(rc.getName(this), 'version changed', { last: oldVersion, current: version });
            segments[Segment.version] = [[version]];
            rc.globalKeyVal.syncSegments = segments;
        }
        else {
            rc.isDebug() && rc.debug(rc.getName(this), 'Versions are same', { last: oldVersion, current: version });
        }
    }
    /**
     * @private
     * @param {?} schema
     * @return {?}
     */
    buildSchema(schema) {
        /** @type {?} */
        const modelMap = MasterDb.schemaKey;
        for (const modelName of Object.keys(modelMap)) {
            /** @type {?} */
            const ar = Object.keys(modelMap[modelName]);
            /** @type {?} */
            const keyStr = ar.length === 1 ? ar[0] : `[${ar.join('+')}]`;
            schema[modelName + 'Table'] = keyStr;
        }
    }
    /**
     * @param {?} rc
     * @param {?} eventName
     * @param {?} data
     * @return {?}
     */
    onMasterUpdate(rc, eventName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                /** @type {?} */
                const syncResponse = data;
                rc.isDebug() && rc.debug(rc.getName(this), 'onMasterUpdate', JSON.stringify(syncResponse));
                /** @type {?} */
                let updated = false;
                for (const modelName of Object.keys(syncResponse)) {
                    if (!((/** @type {?} */ (syncResponse))).hasOwnProperty(modelName))
                        continue;
                    /** @type {?} */
                    const modelData = syncResponse[modelName];
                    if (yield this.applyMasterData(rc, modelName, modelData))
                        updated = true;
                }
                if (updated)
                    yield this.afterMasterUpdate(rc);
            }
            catch (e) {
                /** @type {?} */
                const data = { errorMsg: e.message };
                EventSystem.broadcast(rc, "client-error", data);
                throw new Error(e);
            }
        });
    }
    /**
     * @private
     * @param {?} rc
     * @param {?} modelName
     * @param {?} modelData
     * @return {?}
     */
    applyMasterData(rc, modelName, modelData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (modelData.purge) {
                yield this.clear(rc, modelName);
                rc.isDebug() && rc.debug(rc.getName(this), modelName, 'purged');
            }
            else if (modelData.del && modelData.del.length) {
                rc.isDebug() && rc.debug(rc.getName(this), modelName, 'going to delete', modelData.del.length);
                yield this.bulkDelete(rc, modelName, modelData.del);
            }
            if (modelData.mod && modelData.mod.length) {
                rc.isDebug() && rc.debug(rc.getName(this), modelName, 'going to upsert', modelData.mod.length);
                yield this.bulkPut(rc, modelName, modelData.mod);
            }
            this.syncHashModels[modelName] = modelData.hash;
            /** @type {?} */
            const syncHashTable = this[SYNC_HASH];
            yield this.transaction('rw', syncHashTable, (/**
             * @return {?}
             */
            () => __awaiter(this, void 0, void 0, function* () {
                rc.isDebug() && rc.debug(rc.getName(this), modelName, 'going to save hash', modelData.hash);
                yield syncHashTable.put({ model: modelName, hash: modelData.hash });
            })));
            return true;
        });
    }
    /**
     * @private
     * @param {?} rc
     * @param {?} modelName
     * @return {?}
     */
    clear(rc, modelName) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const modelTable = this.getTable(rc, modelName);
            yield this.transaction('rw', modelTable, (/**
             * @return {?}
             */
            () => __awaiter(this, void 0, void 0, function* () {
                yield modelTable.clear();
            })));
        });
    }
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
    bulkPut(rc, modelName, arMod) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const modelTable = this.getTable(rc, modelName);
            for (const modelRec of arMod) {
                /** @type {?} */
                const rec = this.buildFullRec(rc, modelName, modelRec);
                rc.isDebug() && rc.debug(rc.getName(this), 'going to put with debug ', rec);
                try {
                    yield modelTable.put(rec);
                }
                catch (err) {
                    /** @type {?} */
                    const x = JSON.stringify(arMod);
                    console.log('bombed while writing', x.length, 'bytes');
                    console.log(x);
                    console.log('Dexie error stack', err.stack);
                    throw (err);
                }
            }
            console.log('wrote', JSON.stringify(arMod).length, 'bytes successfully');
        });
    }
    /**
     * @private
     * @param {?} rc
     * @param {?} modelName
     * @param {?} rec
     * @return {?}
     */
    buildKeyRec(rc, modelName, rec) {
        /** @type {?} */
        const keyMap = MasterDb.schemaKey[modelName];
        /** @type {?} */
        const outRec = {};
        for (const keyName in keyMap) {
            /** @type {?} */
            const key = keyMap[keyName];
            rc.isAssert() && rc.assert(rc.getName(this), rec[keyName] !== undefined, 'Rec missing PK', keyName, rec);
            outRec[keyName] = rec[keyName];
        }
        return outRec;
    }
    /**
     * @private
     * @param {?} rc
     * @param {?} modelName
     * @param {?} rec
     * @return {?}
     */
    buildFullRec(rc, modelName, rec) {
        /** @type {?} */
        const fieldMap = MasterDb.schemaField[modelName];
        /** @type {?} */
        const outRec = this.buildKeyRec(rc, modelName, rec);
        for (const fieldName in fieldMap) {
            /** @type {?} */
            const field = fieldMap[fieldName];
            /** @type {?} */
            const value = rec[fieldName];
            rc.isAssert() && rc.assert(rc.getName(this), field.optional && value === undefined ||
                this.validateType(field.type, value), 'Invalid value for field', fieldName, rec);
            outRec[fieldName] = rec[fieldName];
        }
        return outRec;
    }
    /**
     * @private
     * @param {?} type
     * @param {?} value
     * @return {?}
     */
    validateType(type, value) {
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
    }
    /**
     * @private
     * @param {?} rc
     * @param {?} modelName
     * @param {?} arDel
     * @return {?}
     */
    bulkDelete(rc, modelName, arDel) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const modelTable = this.getTable(rc, modelName);
            yield this.transaction('rw', modelTable, (/**
             * @return {?}
             */
            () => __awaiter(this, void 0, void 0, function* () {
                for (const modelRec of arDel) {
                    /** @type {?} */
                    const keyObj = this.buildKeyRec(rc, modelName, modelRec);
                    rc.isDebug() && rc.debug(rc.getName(this), 'bulkDelete', modelName, keyObj);
                    yield modelTable.delete(Object.keys(keyObj).map((/**
                     * @param {?} key
                     * @return {?}
                     */
                    key => keyObj[key])));
                }
            })));
        });
    }
    /**
     * @private
     * @param {?} rc
     * @param {?} modelName
     * @return {?}
     */
    getTable(rc, modelName) {
        /** @type {?} */
        const modelTable = this[modelName + 'Table'];
        rc.isAssert() && rc.assert(rc.getName(this), modelTable, 'unknown model', modelName);
        return modelTable;
    }
    // debug functions
    /**
     * @private
     * @param {?} rc
     * @param {?} modelName
     * @return {?}
     */
    $all(rc, modelName) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const modelTable = this.getTable(rc, modelName);
            /** @type {?} */
            const ar = yield modelTable.toArray();
            console.info(ar);
        });
    }
}
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
class Master {
    /**
     * @param {?=} optional
     * @return {?}
     */
    static field(optional) {
        /** @type {?} */
        let functionResult = (/**
         * @param {?} target
         * @param {?} propertyKey
         * @return {?}
         */
        function (target, propertyKey) {
            /** @type {?} */
            const type = Reflect.getMetadata('design:type', target, propertyKey);
            /** @type {?} */
            const name = MasterDb.getModelName(target.constructor);
            MasterDb.registerSchema(name, propertyKey, false, Master.getType(type), !!optional);
        });
        return functionResult;
    }
    /**
     * @param {?=} modelName
     * @return {?}
     */
    static key(modelName) {
        /** @type {?} */
        let functionResult = (/**
         * @param {?} target
         * @param {?} propertyKey
         * @return {?}
         */
        function (target, propertyKey) {
            if (modelName)
                MasterDb.registerModelClass(modelName, target.constructor);
            /** @type {?} */
            const type = Reflect.getMetadata('design:type', target, propertyKey);
            /** @type {?} */
            const name = MasterDb.getModelName(target.constructor);
            MasterDb.registerSchema(name, propertyKey, true, Master.getType(type), false);
        });
        return functionResult;
    }
    /**
     * @private
     * @param {?} fieldType
     * @return {?}
     */
    static getType(fieldType) {
        switch (fieldType) {
            case String: return 'string';
            case Number: return 'number';
            case Boolean: return 'boolean';
            case Array: return 'array';
            case Object: return 'object';
            default:
                /** @type {?} */
                const msg = 'getType: unknown field type - ' + fieldType
                // console.log(msg)
                ;
                // console.log(msg)
                throw (new Error(msg));
        }
    }
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
const GLOBAL_PREFIX = 'global';
/** @type {?} */
const CONFIG_PREFIX = 'config';
class StorageProvider {
    /**
     * @param {?} rc
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    setGlobalKeyValue(rc, key, value) {
        /** @type {?} */
        const storageKey = GLOBAL_PREFIX + '.' + key;
        localStorage.setItem(storageKey, value);
    }
    /**
     * @param {?} rc
     * @param {?} key
     * @return {?}
     */
    getGlobalKeyValue(rc, key) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const storageKey = GLOBAL_PREFIX + '.' + key;
            return localStorage.getItem(storageKey);
        });
    }
    /**
     * @param {?} rc
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    setUserKeyValue(rc, key, value) {
        localStorage.setItem(key, value);
    }
    /**
     * @param {?} rc
     * @param {?} key
     * @return {?}
     */
    getUserKeyValue(rc, key) {
        return __awaiter(this, void 0, void 0, function* () {
            return localStorage.getItem(key);
        });
    }
    /**
     * @param {?} rc
     * @param {?} config
     * @return {?}
     */
    setGcConfig(rc, config) {
        config.forEach((/**
         * @param {?} entry
         * @return {?}
         */
        (entry) => {
            /** @type {?} */
            const storageKey = `${CONFIG_PREFIX}.${entry.category}|${entry.key}`;
            localStorage.setItem(storageKey, JSON.stringify(entry.value));
            // if (rc && rc.isDebug) {
            //   rc.isDebug() && rc.debug('GcConfigKeyValue', 
            //     `Saved key ${storageKey}=${JSON.stringify(entry.value)}`)
            // }
        }));
    }
    /**
     * @param {?} rc
     * @param {?} category
     * @param {?} key
     * @return {?}
     */
    getGcConfig(rc, category, key) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const storageKey = `${CONFIG_PREFIX}.${category}|${key}`;
            return localStorage.getItem(storageKey);
        });
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ConfigKeyVal {
    /**
     * @param {?} rc
     * @param {?} storage
     */
    constructor(rc, storage) {
        this.rc = rc;
        this.storage = storage;
    }
    /**
     * @param {?} config
     * @return {?}
     */
    setConfig(config) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.storage.setGcConfig(this.rc, config);
        });
    }
    /**
     * @param {?} category
     * @param {?} key
     * @return {?}
     */
    getConfig(category, key) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const value = yield this.storage.getGcConfig(this.rc, category, key);
            if (!value) {
                this.rc.isWarn() && this.rc.warn(this.rc.getName(this), `No config found for category ${category}, key ${key}`);
                return null;
            }
            return JSON.parse(value);
        });
    }
}
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
class RoutingStrategy {
    constructor() {
        this.preserveComponents = [];
        this.myStore = {};
        this.logging = false;
    }
    /**
     * @param {?} route
     * @return {?}
     */
    shouldDetach(route) {
        if (this.logging)
            console.info('RoutingStrategy:shouldDetach', this.logSnapshot(route), route);
        return this.isRemembered(route);
    }
    /**
     * @param {?} route
     * @param {?} handle
     * @return {?}
     */
    store(route, handle) {
        if (this.logging)
            console.info('RoutingStrategy:store', this.logSnapshot(route), route);
        /** @type {?} */
        const name = this.getName(route);
        if (!name)
            return;
        this.myStore[name] = handle;
    }
    /**
     * @param {?} route
     * @return {?}
     */
    shouldAttach(route) {
        if (this.logging)
            console.info('RoutingStrategy:shouldAttach', this.logSnapshot(route), route);
        // return this.isRemembered(route)
        /** @type {?} */
        const name = this.getName(route);
        return name ? !!this.myStore[name] : false;
    }
    /**
     * @param {?} route
     * @return {?}
     */
    retrieve(route) {
        if (this.logging)
            console.info('RoutingStrategy:retrieve', this.logSnapshot(route), route);
        /** @type {?} */
        const name = this.getName(route);
        if (!name)
            return null;
        return this.myStore[name];
    }
    /**
     * @param {?} future
     * @param {?} curr
     * @return {?}
     */
    shouldReuseRoute(future, curr) {
        if (this.logging)
            console.info('RoutingStrategy:shouldReuseRoute', future, this.logSnapshot(future), curr, this.logSnapshot(curr));
        return future.routeConfig === curr.routeConfig;
    }
    /**
     * @private
     * @param {?} route
     * @return {?}
     */
    logSnapshot(route) {
        /** @type {?} */
        const name = this.getName(route);
        return (name || 'null') + ':' +
            (route.url && route.url.length ? route.url[0] : 'none');
    }
    /**
     * @private
     * @param {?} route
     * @return {?}
     */
    isRemembered(route) {
        /** @type {?} */
        const name = this.getName(route);
        return name ? this.preserveComponents.indexOf(name) !== -1 : false;
    }
    /**
     * @private
     * @param {?} route
     * @return {?}
     */
    getName(route) {
        if (!route.component)
            return '';
        return ((/** @type {?} */ (route.component))).name;
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NcPlatformLocation extends PlatformLocation {
    /**
     * @param {?} rc
     */
    constructor(rc) {
        super();
        this.rc = rc;
        rc.setupLogger(this, 'NcPlatformLocation');
        // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'constructor()')
    }
    /**
     * @return {?}
     */
    get location() {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'get location()');
        return location;
    }
    /**
     * @return {?}
     */
    getState() {
    }
    /**
     * @return {?}
     */
    getBaseHrefFromDOM() {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'getBaseHrefFromDOM()');
        return '.';
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onPopState(fn) {
        // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onPopState() ignored')
        // window.addEventListener('popstate', fn, false);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onHashChange(fn) {
        // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onHashChange() ignored')
        // window.addEventListener('hashchange', fn, false);
    }
    /**
     * @return {?}
     */
    get hostname() {
        return location.hostname;
    }
    /**
     * @return {?}
     */
    get port() {
        return location.port;
    }
    /**
     * @return {?}
     */
    get href() {
        return location.href;
    }
    /**
     * @return {?}
     */
    get protocol() {
        return location.protocol;
    }
    /**
     * @return {?}
     */
    get pathname() {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'get pathname()');
        return location.pathname;
    }
    /**
     * @return {?}
     */
    get search() {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'get search()');
        return location.search;
    }
    /**
     * @return {?}
     */
    get hash() {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'get hash()');
        return location.hash;
    }
    /**
     * @param {?} newPath
     * @return {?}
     */
    set pathname(newPath) {
        // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'set pathname()')
        // location.pathname = newPath 
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    pushState(state, title, url) {
        this.rc.isAssert() && this.rc.assert(this.rc.getName(this), false, 'pushState', 'First navigation was not done in root ngInit()');
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    replaceState(state, title, url) {
        this.rc.isAssert() && this.rc.assert(this.rc.getName(this), false, 'replaceState', 'First navigation was not done in root ngInit()');
    }
    /**
     * @return {?}
     */
    forward() {
        // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'forward()')
        // history.forward()
    }
    /**
     * @return {?}
     */
    back() {
        // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'back()')
        // history.back()
    }
}
NcPlatformLocation.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NcPlatformLocation.ctorParameters = () => [
    { type: RunContextBrowser, decorators: [{ type: Inject, args: ['RunContext',] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    NcPlatformLocation.prototype.rc;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class RoutableScreen extends TrackableScreen {
    /**
     * @param {?} rc
     */
    constructor(rc) {
        super(rc);
        this.rc = rc;
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AppLocationStrategy extends LocationStrategy {
    /**
     * @param {?} rc
     */
    constructor(rc) {
        super();
        this.rc = rc;
    }
    /**
     * @return {?}
     */
    getBaseHref() {
        return '.';
    }
    /**
     * @return {?}
     */
    path() {
        return location.pathname;
    }
    /**
     * @return {?}
     */
    prepareExternalUrl() {
        return '';
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onPopState(fn) {
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} path
     * @param {?} queryParams
     * @return {?}
     */
    pushState(state, title, path, queryParams) {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), `ignoring push state 
      ${state} , ${title}, ${path}, ${queryParams}`);
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} path
     * @param {?} queryParams
     * @return {?}
     */
    replaceState(state, title, path, queryParams) {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), `ignoring replace state
      ${state} , ${title}, ${path}, ${queryParams}`);
    }
    /**
     * @return {?}
     */
    forward() {
    }
    /**
     * @return {?}
     */
    back() {
    }
}
AppLocationStrategy.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AppLocationStrategy.ctorParameters = () => [
    { type: RunContextBrowser, decorators: [{ type: Inject, args: ['RunContext',] }] }
];
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
const API_STATE = {
    PROGRESS: 1,
    ERROR: 2,
    SUCCESS: 3,
};
API_STATE[API_STATE.PROGRESS] = 'PROGRESS';
API_STATE[API_STATE.ERROR] = 'ERROR';
API_STATE[API_STATE.SUCCESS] = 'SUCCESS';
class ApiState {
    /**
     * @param {?} rc
     * @param {?} translate
     */
    constructor(rc, translate) {
        this.rc = rc;
        this.translate = translate;
        this.retryOnFailure = false;
        this.loadingText = translate.instant('cmn_loading');
        this.errorText = translate.instant('cmn_toast_err_unknown');
        this.retryButtonText = translate.instant('cmn_btn_retry');
    }
}
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
class ApiStateBuilder {
    /**
     * @param {?} rc
     * @param {?} translate
     */
    constructor(rc, translate) {
        this.rc = rc;
        this.translate = translate;
        this.instance = new ApiState(rc, translate);
    }
    /**
     * @param {?} state
     * @return {?}
     */
    setCurrentState(state) {
        this.instance.currentState = state;
        return this;
    }
    /**
     * @param {?} text
     * @return {?}
     */
    setLoadingText(text) {
        this.instance.loadingText = text;
        return this;
    }
    /**
     * @param {?} text
     * @return {?}
     */
    setEmptyDataText(text) {
        this.instance.emptyDataText = text;
        return this;
    }
    /**
     * @param {?} text
     * @return {?}
     */
    setErrorText(text) {
        this.instance.errorText = text;
        return this;
    }
    /**
     * @param {?} text
     * @return {?}
     */
    setRetryButtonText(text) {
        this.instance.retryButtonText = text;
        return this;
    }
    /**
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    retryOnFailure() {
        (/** @type {?} */ (this)).instance.retryOnFailure = true;
        return (/** @type {?} */ (this));
    }
    /**
     * @param {?} code
     * @return {?}
     */
    setErrorCode(code) {
        this.instance.errorCode = code;
        return this;
    }
    /**
     * @return {?}
     */
    build() {
        return this.instance;
    }
}
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
 * @record
 */
function OutputParams() { }
if (false) {
    /** @type {?} */
    OutputParams.prototype.id;
    /** @type {?} */
    OutputParams.prototype.value;
    /** @type {?} */
    OutputParams.prototype.displayType;
}
/**
 * @record
 */
function FormOutputValue() { }
if (false) {
    /** @type {?} */
    FormOutputValue.prototype.value;
    /** @type {?} */
    FormOutputValue.prototype.displayType;
}
/**
 * @record
 */
function MuFormOutputParams() { }

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
var NavTransition;
(function (NavTransition) {
    NavTransition.ANIM_DURATION = 400;
    NavTransition.PAGE_TRANSITION_DURATION = NavTransition.ANIM_DURATION + 'ms';
    NavTransition.IDLE = 'idle';
    NavTransition.FORWARD = 'forward';
    NavTransition.BACKWARD = 'backward';
    NavTransition.ANIMATION_STYLE = 'ease-out';
    NavTransition.pageTransition = trigger('pageTransition', [
        transition(`${NavTransition.IDLE} => ${NavTransition.FORWARD}`, [
            query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
            group([
                query(':leave', [
                    style({ transform: 'translate3d(0, 0, 0)', zIndex: 0 })
                ], { optional: true }),
                query(':enter', [
                    style({ transform: 'translate3d(100%, 0, 0)', zIndex: 100 }),
                    animate(`${NavTransition.PAGE_TRANSITION_DURATION} ${NavTransition.ANIMATION_STYLE}`, style({
                        transform: 'translate3d(0, 0, 0)',
                        zIndex: 100
                    }))
                ], { optional: true })
            ])
        ]),
        transition(`${NavTransition.IDLE} => ${NavTransition.BACKWARD}`, [
            query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
            group([
                query(':leave', [
                    style({ transform: 'translate3d(0, 0, 0)', zIndex: 100 }),
                    animate(`${NavTransition.PAGE_TRANSITION_DURATION} ${NavTransition.ANIMATION_STYLE}`, style({
                        transform: 'translate3d(100%, 0, 0)',
                        zIndex: 100
                    }))
                ], { optional: true }),
                query(':enter', [
                    style({ transform: 'translate3d(0, 0, 0)', zIndex: 0 })
                ], { optional: true })
            ])
        ])
    ]);
})(NavTransition || (NavTransition = {}));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var BottomFlyIn;
(function (BottomFlyIn) {
    BottomFlyIn.ANIM_DURATION = '.4s';
    BottomFlyIn.STAGGER_DURATION = 50;
    BottomFlyIn.ANIMATION_STYLE = 'ease-out';
    BottomFlyIn.FLY_STATE = 'fly';
    BottomFlyIn.DONT_FLY_STATE = 'dontFly';
    BottomFlyIn.bottomFlyIn = trigger('bottomFlyIn', [
        transition(`* => ${BottomFlyIn.FLY_STATE}`, [
            query('.flex-box-child', [
                style({
                    transform: 'translate3d(0, 200%, 0)',
                    opacity: 0
                }),
                stagger(BottomFlyIn.STAGGER_DURATION, [
                    animate(`${BottomFlyIn.ANIM_DURATION} ${BottomFlyIn.ANIMATION_STYLE}`, style({
                        transform: 'translate3d(0, 0, 0)',
                        opacity: 1
                    }))
                ])
            ], { optional: true })
        ])
    ]);
})(BottomFlyIn || (BottomFlyIn = {}));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function XmnRouterBase() { }
if (false) {
    /**
     * @return {?}
     */
    XmnRouterBase.prototype.getPubKey = function () { };
    /**
     * @return {?}
     */
    XmnRouterBase.prototype.getEncIV = function () { };
    /**
     * @return {?}
     */
    XmnRouterBase.prototype.getMaxOpenSecs = function () { };
    /**
     * @param {?} rc
     * @return {?}
     */
    XmnRouterBase.prototype.canStrtLastReqTimer = function (rc) { };
    /**
     * @return {?}
     */
    XmnRouterBase.prototype.providerReady = function () { };
    /**
     * @param {?} rc
     * @param {?} arData
     * @return {?}
     */
    XmnRouterBase.prototype.providerMessage = function (rc, arData) { };
    /**
     * @param {?=} errCode
     * @return {?}
     */
    XmnRouterBase.prototype.providerFailed = function (errCode) { };
    /**
     * @param {?} rc
     * @return {?}
     */
    XmnRouterBase.prototype.getSessionTimeOutSecs = function (rc) { };
    /**
     * @param {?} rc
     * @return {?}
     */
    XmnRouterBase.prototype.sessionTimedOut = function (rc) { };
    /**
     * @param {?} rc
     * @return {?}
     */
    XmnRouterBase.prototype.runAlwaysAsSecure = function (rc) { };
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
const TIME = {
    MILL_IN_SEC: 1000,
    MILL_IN_MINUTE: 60 * 1000,
    MILL_IN_HOUR: 60 * 60 * 1000,
    MILL_IN_DAY: 24 * 60 * 60 * 1000
};
/** @type {?} */
const TYPEOF = {
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
const VerificationSettingsExp = {
    TIME_DEBUG: 5 * 60 * 1000,
    TIME_PROD: 60 * 60 * 1000
};
/** @type {?} */
const VerificationError = {
    ERR_INTERNET: 'ERR_INTERNET',
    ERR_INVALID_NUM: 'ERR_INVALID_NUM',
    ERR_NUM_LIMIT: 'ERR_NUM_LIMIT',
    ERR_ATTEMPTS_LIMIT: 'ERR_ATTEMPTS_LIMIT',
    ERR_TIMEOUT: 'ERR_TIMEOUT',
    ERR_NONE: 'ERR_NONE',
    ERR_MSISDN_FAIL: 'ERR_MSISDN_FAIL'
};
/** @type {?} */
const GcCategory = {
    Notification: 'NOTIFICATION',
    FeedbackEmail: 'FEEDBACK_EMAIL',
    SmsVerification: 'SMS_VERIFICATION',
    Help: 'HELP',
    Session: 'SESSION'
};
/** @type {?} */
const FcCategory = {
    Help: 'HELP',
    Session: 'SESSION'
};
/** @type {?} */
const GcKey = {
    GeneralConfig: 'GENERAL_CONFIG',
    FeedbackEmail: 'FEEDBACK_EMAIL'
};
/** @type {?} */
const FcKey = {
    GeneralConfig: 'GENERAL_CONFIG',
    UiConfig: 'UI_CONFIG'
};
/** @type {?} */
const GcValue = {
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
const HashidParams = {
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
const TOAST_DURATION = 5000;
/** @type {?} */
const TOAST_DURATION_DEBUG = 10000;
/** @type {?} */
const LAUNCH_CONTEXT = {
    TYPE: 'type',
    MODE: 'mode',
    DATA: 'data'
};
/** @type {?} */
const LaunchContextMode = {
    BUSINESS: 'business'
};
/** @type {?} */
const ANDROID_PERM = {
    STORAGE: 'android.permission.WRITE_EXTERNAL_STORAGE',
    CAMERA: 'android.permission.CAMERA',
    LOCATION: 'android.permission.ACCESS_FINE_LOCATION',
    CONTACTS: 'android.permission.READ_CONTACTS',
    SMS: 'android.permission.READ_SMS',
    GALLERY: 'android.permission.WRITE_EXTERNAL_STORAGE',
};
/** @type {?} */
const IOS_PERM = {
    STORAGE: 'STORAGE',
    CAMERA: 'CAMERA',
    LOCATION: 'LOCATION',
    CONTACTS: 'CONTACTS',
    SMS: 'SMS',
    GALLERY: 'PHOTOS'
};
/** @type {?} */
const BROWSER_PERM = {
    STORAGE: 'STORAGE',
    CAMERA: 'CAMERA',
    LOCATION: 'LOCATION',
    CONTACTS: 'CONTACTS',
    SMS: 'SMS',
    GALLERY: 'STORAGE'
};
/** @enum {string} */
const Permission = {
    STORAGE: 'STORAGE',
    CAMERA: 'CAMERA',
    LOCATION: 'LOCATION',
    CONTACTS: 'CONTACTS',
    SMS: 'SMS',
    GALLERY: 'GALLERY',
};
var MobileSdkResponse;
(function (MobileSdkResponse) {
    let CollectRequest;
    (function (CollectRequest) {
        let Response;
        (function (Response) {
            Response["ACKNOWLEDGED"] = "ACKNOWLEDGED";
            Response["COMPLETED"] = "COMPLETED";
            Response["DECLINED"] = "DECLINED";
        })(Response = CollectRequest.Response || (CollectRequest.Response = {}));
    })(CollectRequest = MobileSdkResponse.CollectRequest || (MobileSdkResponse.CollectRequest = {}));
})(MobileSdkResponse || (MobileSdkResponse = {}));
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MuWebApi {
    /**
     * @param {?} rc
     */
    constructor(rc) {
        this.rc = rc;
    }
    /**
     * @param {?} permission
     * @return {?}
     */
    hasPermission(permission) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.checkPermission(permission);
        });
    }
    /**
     * @param {?} permission
     * @return {?}
     */
    checkPermission(permission) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (permission) {
                case BROWSER_PERM.CAMERA:
                    /** @type {?} */
                    const permissionStatus = yield ((/** @type {?} */ (navigator))).permissions.query({ name: 'camera' });
                    return (permissionStatus.state === 'granted');
                case BROWSER_PERM.GALLERY:
                    return true;
                default:
                    if (this.rc.getGlobalLogLevel() !== LOG_LEVEL.NONE)
                        this.rc.uiRouter.showToast(`${permission} permission to be implemented`);
                    return true;
            }
        });
    }
    /**
     * @param {?} permission
     * @return {?}
     */
    getPermission(permission) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (permission) {
                case BROWSER_PERM.CAMERA:
                    try {
                        yield navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                        return true;
                    }
                    catch (err) {
                        return false;
                    }
                case BROWSER_PERM.GALLERY:
                    return true;
            }
        });
    }
    /**
     * @return {?}
     */
    getPictureFromCamera() {
        return __awaiter(this, void 0, void 0, function* () {
            // return await this.rc.uiRouter.getRoot().captureWebCamera()
            return (/** @type {?} */ ({}));
        });
    }
}
if (false) {
    /**
     * @type {?}
     * @protected
     */
    MuWebApi.prototype.rc;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MuWebBridge {
    /**
     * @param {?} rc
     */
    constructor(rc) {
        this.rc = rc;
        this.webApi = new MuWebApi(rc);
    }
    /**
     * @param {?} requestId
     * @param {?} apiName
     * @param {...?} params
     * @return {?}
     */
    handleRequest(requestId, apiName, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this[apiName]) {
                throw new Error(`Missing API ${apiName} implementation in Web bridge.`);
            }
            /** @type {?} */
            const obj = yield this[apiName](params[0]);
            this.rc.bridge.asyncResponseFromNative(requestId, obj);
        });
    }
    /*==============================================================================
                              FIREBASE
    ==============================================================================*/
    /**
     * @param {?} userId
     * @return {?}
     */
    setUserId(userId) {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), `Setting userId ${userId}`);
    }
    /**
     * @param {?} eventName
     * @param {?} eventDataStr
     * @return {?}
     */
    logEvent(eventName, eventDataStr) {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), `Logging event: ${eventName} Data: ${eventDataStr}`);
    }
    /**
     * @param {?} propName
     * @param {?} value
     * @return {?}
     */
    setUserProperty(propName, value) {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), `Setting userProperty: ${propName} Value: ${value}`);
    }
    /**
     * @protected
     * @return {?}
     */
    fingerprintScan() {
        // this.rc.uiRouter.showToast('fingerprintScan Feature not supported for Browser')
        return;
    }
    /**
     * @protected
     * @return {?}
     */
    scanBarcode() {
        // this.rc.uiRouter.showToast('scanBarcode Feature not supported for Browser')
        return null;
    }
    /**
     * @protected
     * @return {?}
     */
    payViaQr() {
        this.rc.uiRouter.showToast('payViaQr Feature not supported for Browser');
        return null;
    }
    /**
     * @protected
     * @param {?} url
     * @return {?}
     */
    openInMobileBrowser(url) {
        window.open(url);
    }
    /**
     * @protected
     * @return {?}
     */
    getNativeMigrationInfo() {
        // this.rc.uiRouter.showToast('get native migration info not supported for Browser')
        return null;
    }
    /**
     * @protected
     * @return {?}
     */
    getCurrentLocation() {
        if (navigator.geolocation) {
            // check if geolocation is supported/enabled on current browser
            navigator.geolocation.getCurrentPosition((/**
             * @param {?} position
             * @return {?}
             */
            function success(position) {
                // for when getting location is a success
                return {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
            }), (/**
             * @param {?} error_message
             * @return {?}
             */
            function error(error_message) { }));
        }
        return null;
    }
    /**
     * @protected
     * @return {?}
     */
    closeMobileBrowser() {
    }
    /**
     * @protected
     * @return {?}
     */
    getPhoneContacts() {
        return { contacts: [] };
    }
    /**
     * @protected
     * @param {?} params
     * @return {?}
     */
    hasPermission(params) {
        return __awaiter(this, void 0, void 0, function* () {
            // this.rc.uiRouter.showToast(`${permission} feature not supported for browser`)
            /** @type {?} */
            const permission = params[0];
            return { 'hasPerm': yield this.webApi.hasPermission(permission) };
        });
    }
    /**
     * @protected
     * @return {?}
     */
    requestMobNumHint() {
        this.rc.uiRouter.showToast('requestMobNumHint Feature not supported for Browser');
        return null;
    }
    /**
     * @protected
     * @return {?}
     */
    takePictureFromCamera() {
        return __awaiter(this, void 0, void 0, function* () {
            this.rc.uiRouter.showToast('takePictureFromCamera Feature not supported for Browser');
            /** @type {?} */
            const resp = yield this.webApi.getPictureFromCamera();
            return resp;
        });
    }
    /**
     * @protected
     * @return {?}
     */
    selectDocumentFile() {
        this.rc.uiRouter.showToast('selectDocumentFile Feature not supported for Browser');
        return { 'success': false };
    }
    /**
     * @protected
     * @return {?}
     */
    selectPictureFromGallery() {
        this.rc.uiRouter.showToast('selectPictureFromGallery Feature not supported for Browser');
        return { 'success': false };
    }
    /**
     * @protected
     * @param {?} params
     * @return {?}
     */
    getPermission(params) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const permission = params[0];
            /** @type {?} */
            const showRationale = params[1] || true;
            return { permissionGiven: yield this.webApi.getPermission(permission), dialogShown: true };
        });
    }
    /**
     * @protected
     * @param {?} base64Data
     * @return {?}
     */
    writeExternalStyles(base64Data) {
        this.rc.uiRouter.showToast('writeExternalStyles Feature not supported for Browser');
        return true;
    }
    /**
     * @protected
     * @param {?} filePath
     * @param {?} fileName
     * @param {?} base64Data
     * @return {?}
     */
    saveBinaryFile(filePath /* embeds ncInstanceId */, fileName, base64Data) {
        this.rc.uiRouter.showToast('saveBinaryFile Feature not supported for Browser');
        return true;
    }
    /**
     * @protected
     * @param {?} config
     * @return {?}
     */
    setNotificationConfig(config) {
    }
    /**
     * @protected
     * @return {?}
     */
    closeApp() {
        window.location.reload();
    }
    /**
     * @protected
     * @param {?=} packageName
     * @return {?}
     */
    launchAppMarket(packageName) {
        window.open(`https://play.google.com/store/apps/details?id=${packageName}`);
    }
    /**
     * @protected
     * @param {?=} email
     * @param {?=} subject
     * @param {?=} body
     * @return {?}
     */
    sendMail(email, subject, body) {
        this.rc.uiRouter.showToast(`SendMail Feature not supported for Browser`);
    }
    /**
     * @protected
     * @param {?} mobileNumber
     * @return {?}
     */
    placeCall(mobileNumber) {
        this.rc.uiRouter.showToast(`PlaceCall Feature not supported for Browser`);
    }
    /**
     * @protected
     * @param {?} pkgName
     * @return {?}
     */
    checkIfPkgInstalled(pkgName) {
        this.rc.uiRouter.showToast(`checkIfPkgInstalled Feature not supported for Browser`);
        return false;
    }
    /**
     * @protected
     * @return {?}
     */
    listenForSmsCode() {
    }
    /**
     * @protected
     * @param {?} clientTransactionId
     * @return {?}
     */
    setVerStringToken(clientTransactionId) {
    }
    /**
     * @protected
     * @param {?} text
     * @return {?}
     */
    copyToClipBoard(text) {
        this.rc.uiRouter.showToast(`copyToClipBoard Feature not supported for Browser`);
        return false;
    }
    /**
     * @protected
     * @return {?}
     */
    openSoftInputKeyboard() {
    }
    /**
     * @protected
     * @return {?}
     */
    hideSoftInputKeyboard() {
    }
    /**
     * @protected
     * @return {?}
     */
    canAuthWithFingerprint() {
        return { canAuth: false };
    }
    /**
     * @protected
     * @return {?}
     */
    logOutCurrentUser() {
        window.location.reload();
    }
    /**
     * @protected
     * @return {?}
     */
    resetApp() {
        localStorage.clear();
        window.location.reload();
    }
    /**
     * @protected
     * @return {?}
     */
    getDeviceInfo() {
        return '{}';
    }
    /**
     * @protected
     * @return {?}
     */
    setDebuggable() {
    }
}
if (false) {
    /** @type {?} */
    MuWebBridge.prototype.webApi;
    /**
     * @type {?}
     * @protected
     */
    MuWebBridge.prototype.rc;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const ANDROID = 'Android';
/** @type {?} */
const IPAD = 'iPad';
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
const State = {
    LOADING: 0,
    INITIALIZED: 1,
    SHOWN: 2 // UI being displayed, albeit busy in server requests
    ,
};
State[State.LOADING] = 'LOADING';
State[State.INITIALIZED] = 'INITIALIZED';
State[State.SHOWN] = 'SHOWN';
/** @enum {string} */
const SDK_TYPE = {
    MOBILE: 'MOBILE',
    WEB: 'WEB',
    CORDOVA: 'CORDOVA' // mobile SDK with Obopay app not installed; web invocation
    ,
};
/** @enum {string} */
const UserAgent = {
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
class InitConfig {
    /**
     * @param {?} remoteUrl
     */
    constructor(remoteUrl) {
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
}
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
class LaunchContext {
    constructor() {
        // mobile SDK package name 
        this.referrerParams = (/** @type {?} */ ({}));
        this.isUpgrade = false;
    }
}
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
class MuBridge {
    /**
     * @param {?} rc
     * @param {?} ngZone
     */
    constructor(rc, ngZone) {
        this.rc = rc;
        this.ngZone = ngZone;
        this.runningInBrowser = false;
        this.nextRequestId = 1;
        this.requestMap = {};
        this.launchContext = new LaunchContext();
        this.mobileSdkParams = (/** @type {?} */ ({}));
    }
    // WARNING: rc is not initied at this stage. Do not use
    /**
     * @param {?} remoteUrl
     * @return {?}
     */
    preInit(remoteUrl) {
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
    }
    /**
     * @return {?}
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.userAgent === UserAgent.BROWSER) {
                this.onConnectionAttr(navigator.onLine ? NetworkType.wifi : null, null);
            }
            else {
                /** @type {?} */
                const data = yield this.sendAsyncRequest('getInitData');
                this.initConfig = data['initConfig'];
                this.launchContext = data['launchContext'];
                /** @type {?} */
                const connAttr = data['connAttr'];
                this.onConnectionAttr(connAttr['netType'], connAttr['location']);
            }
            if (this.launchContext.referrerParams &&
                this.launchContext.referrerParams.mode === LaunchContextMode.BUSINESS) {
                this.sdkType = SDK_TYPE.MOBILE;
            }
        });
    }
    /**
     * @return {?}
     */
    isRunningInDev() {
        return this.initConfig.remoteUrl == 'http://localhost';
    }
    /**
     * @return {?}
     */
    isRunningInBrowser() {
        return this.runningInBrowser;
    }
    /**
     * @return {?}
     */
    isRunningInMWeb() {
        return window.navigator.userAgent.includes(ANDROID) && this.isRunningInBrowser();
    }
    /**
     * @return {?}
     */
    isRunningInIPad() {
        return window.navigator.userAgent.includes(IPAD);
    }
    /*==============================================================================
                                        STATE
    ==============================================================================*/
    /**
     * @return {?}
     */
    get state() {
        return this._state;
    }
    /**
     * @param {?} newState
     * @return {?}
     */
    set state(newState) {
        this._state = newState;
        if (this.userAgent !== UserAgent.BROWSER) {
            this.sendAsyncRequest('setStateFromJs', State[this._state]);
        }
    }
    /**
     * @return {?}
     */
    setStateShown() {
        this.state = State.SHOWN;
    }
    /*==============================================================================
                                  LAUNCH CONTEXT
    ==============================================================================*/
    /**
     * @return {?}
     */
    getDirectLink() {
        return this.launchContext.directLink;
    }
    /**
     * @param {?} directLink
     * @return {?}
     */
    setWebDirectLink(directLink) {
        this.launchContext.directLink = directLink;
    }
    /**
     * @return {?}
     */
    resetDirectLink() {
        this.launchContext.directLink = null;
    }
    /**
     * @return {?}
     */
    getReferrerParams() {
        return this.launchContext.referrerParams;
    }
    /**
     * @return {?}
     */
    isUpgrade() {
        return this.launchContext.isUpgrade;
    }
    /*==============================================================================
                                   INIT CONFIG
    ==============================================================================*/
    /**
     * @return {?}
     */
    getUserAgent() {
        return this.userAgent;
    }
    /**
     * @return {?}
     */
    getRemoteUrl() {
        return this.initConfig.remoteUrl;
    }
    /**
     * @return {?}
     */
    getAppVersion() {
        return this.initConfig.appVersion;
    }
    /**
     * @return {?}
     */
    getAppChannel() {
        return this.initConfig.appChannel;
    }
    /**
     * @return {?}
     */
    getPseudoId() {
        return this.initConfig.pseudoId;
    }
    /**
     * @return {?}
     */
    getFcmId() {
        return this.initConfig.fcmId;
    }
    /**
     * @return {?}
     */
    getAdId() {
        return this.initConfig.adId;
    }
    /**
     * @return {?}
     */
    getAppInstallTime() {
        return this.initConfig.appInstallTs;
    }
    /**
     * @return {?}
     */
    getDeviceId() {
        return '';
    }
    /**
     * @return {?}
     */
    getLocation() {
        return JSON.stringify(this.location);
    }
    /**
     * @return {?}
     */
    getCordovaNetworkType() {
        return this.netType;
    }
    /**
     * @return {?}
     */
    getLocalStoragePath() {
        return this.initConfig.localStoragePath;
    }
    /*==============================================================================
                              FIREBASE
    ==============================================================================*/
    /**
     * @param {?} userId
     * @return {?}
     */
    setUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendAsyncRequest('setUserId', String(userId));
        });
    }
    /**
     * @param {?} eventName
     * @param {?} eventDataStr
     * @return {?}
     */
    logEvent(eventName, eventDataStr) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendAsyncRequest('logEvent', eventName, eventDataStr);
        });
    }
    /**
     * @param {?} propName
     * @param {?} value
     * @return {?}
     */
    setUserProperty(propName, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendAsyncRequest('setUserProperty', propName, value);
        });
    }
    /*==============================================================================
                                     SDK
    ==============================================================================*/
    /**
     * @return {?}
     */
    isWebSdkInvocation() {
        return this.sdkType === SDK_TYPE.WEB || this.sdkType === SDK_TYPE.CORDOVA;
    }
    /**
     * @return {?}
     */
    isMobileSdkInvocation() {
        return this.sdkType === SDK_TYPE.MOBILE;
    }
    /**
     * @return {?}
     */
    isSdkInvocation() {
        return !!this.sdkType;
    }
    /**
     * @return {?}
     */
    getSdkType() {
        return this.sdkType;
    }
    /**
     * @param {?} source
     * @param {?} requestId
     * @return {?}
     */
    setMobileSdkParams(source, requestId) {
        this.mobileSdkParams.source = source;
        this.mobileSdkParams.requestId = Number(requestId);
    }
    /**
     * @return {?}
     */
    getMobileSdkSource() {
        return this.mobileSdkParams.source;
    }
    /**
     * @return {?}
     */
    getMobileSdkRequestId() {
        return this.mobileSdkParams.requestId;
    }
    /**
     * This will only get invoked for Sdk type Mobile since this is the main app and
     * any SDK invocation would happen wrt a direct link and response via Intent broadcast
     * in Android
     * @param {?} requestId
     * @param {?=} data
     * @param {?=} closeApp
     * @return {?}
     */
    onSdkSuccessResponse(requestId, data = null, closeApp = true) {
        return __awaiter(this, void 0, void 0, function* () {
            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), requestId, `RequestId is not defined`);
            if (this.sdkType !== SDK_TYPE.MOBILE) {
                this.rc.isWarn() && this.rc.warn(this.rc.getName(this), `Came to Bridge SDK response for inv other than SDK Type Mobile, returning...`);
                return;
            }
            /** @type {?} */
            const resp = Object.assign({ code: 'SUCCESS' }, data);
            yield this.onMobileSdkResponse(requestId, resp, closeApp);
        });
    }
    /**
     * @param {?} requestId
     * @param {?} data
     * @param {?} uiError
     * @param {?=} closeApp
     * @return {?}
     */
    onSdkFailureResponse(requestId, data, uiError, closeApp = true) {
        return __awaiter(this, void 0, void 0, function* () {
            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), requestId, `RequestId is not defined`);
            if (this.sdkType !== SDK_TYPE.MOBILE) {
                this.rc.isWarn() && this.rc.warn(this.rc.getName(this), `Came to Bridge SDK response for inv other than SDK Type Mobile, returning...`);
                return;
            }
            /** @type {?} */
            let resp = Object.assign({ code: 'FAILURE' }, data);
            resp = Object.assign(uiError, resp);
            yield this.onMobileSdkResponse(requestId, resp, closeApp);
        });
    }
    /**
     * @protected
     * @param {?} requestId
     * @param {?} data
     * @param {?=} closeApp
     * @return {?}
     */
    onMobileSdkResponse(requestId, data, closeApp = true) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const obj = Object.assign({ requestId, source: this.getMobileSdkSource() }, data);
            yield this.sendAsyncRequest('onMobileSdkResponse', JSON.stringify(obj), closeApp);
        });
    }
    /*==============================================================================
                                STORAGE CORDOVA
    ==============================================================================*/
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    setGlobalKeyValue(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendAsyncRequest('setGlobalKeyValue', key, value);
        });
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getGlobalKeyValue(key) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const object = yield this.sendAsyncRequest('getGlobalKeyValue', key);
            return object['value'];
        });
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    setUserKeyValue(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendAsyncRequest('setUserKeyValue', key, value);
        });
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getUserKeyValue(key) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const object = yield this.sendAsyncRequest('getUserKeyValue', key);
            return object['value'];
        });
    }
    /**
     * @param {?} config
     * @return {?}
     */
    setGcConfig(config) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendAsyncRequest('setGcConfig', config);
        });
    }
    /**
     * @param {?} category
     * @param {?} key
     * @return {?}
     */
    getGcConfig(category, key) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const object = yield this.sendAsyncRequest('getGcConfig', category, key);
            return object['value'];
        });
    }
    /*==============================================================================
                                CORDOVA ROUTER
    ==============================================================================*/
    /**
     * @return {?}
     */
    prepareConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendAsyncRequest('prepareConnection');
        });
    }
    /**
     * @param {?} api
     * @param {?} params
     * @return {?}
     */
    sendRouterRequest(api, params) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const obj = yield this.sendAsyncRequest('sendRequest', api, JSON.stringify(params));
            return (/** @type {?} */ (obj));
        });
    }
    /**
     * @param {?} name
     * @param {?} params
     * @param {?} ephemeral
     * @return {?}
     */
    sendRouterEvent(name, params, ephemeral) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendAsyncRequest('sendEvent', name, JSON.stringify(params), ephemeral);
        });
    }
    /*==============================================================================
                                  BRIDGE UTILS
    ==============================================================================*/
    /**
     * @return {?}
     */
    isAndroid() {
        return (this.userAgent === UserAgent.ANDROID);
    }
    /**
     * @return {?}
     */
    isIos() {
        return (this.userAgent === UserAgent.IOS);
    }
    /**
     * @param {?} clientId
     * @param {?=} profilePicFileName
     * @return {?}
     */
    getUserProfilePicUrl(clientId, profilePicFileName) {
        if (!this.rc.userKeyVal.getWebProfilePicBase64(clientId))
            return null;
        if (this.runningInBrowser) {
            return 'data:image/jpeg;base64,' + this.rc.userKeyVal.getWebProfilePicBase64(clientId);
        }
        // TODO - fix profile pic file name
        // const profPicFileName = profilePicFileName || this.rc.userKeyVal.profilePicFileName
        /** @type {?} */
        const profPicFileName = profilePicFileName;
        /** @type {?} */
        const url = this.getLocalStoragePath() + "/" +
            `users/${String(clientId)}` + "/" +
            profPicFileName +
            '?random+\=' + Math.random();
        return '';
    }
    /*==============================================================================
                             ASYNC REQUESTS TO CORDOVA
    ==============================================================================*/
    /**
     * @return {?}
     */
    getDeviceInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const obj = yield this.sendAsyncRequest('getDeviceInfo');
            return obj;
        });
    }
    /**
     * @return {?}
     */
    getSessionInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const obj = yield this.sendAsyncRequest('getSessionInfo');
            return (/** @type {?} */ (obj));
        });
    }
    /**
     * @return {?}
     */
    recreateSession() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const obj = yield this.sendAsyncRequest('recreateSession');
            return (/** @type {?} */ (obj));
        });
    }
    /**
     * @return {?}
     */
    getCurrentLocation() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const json = yield this.sendAsyncRequest('getCurrentLocation');
            return {
                lat: json['lat'],
                lng: json['lng']
            };
        });
    }
    /**
     * @return {?}
     */
    requestMobNumHint() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.userAgent !== UserAgent.ANDROID)
                return null;
            /** @type {?} */
            const resp = yield this.sendAsyncRequest('requestMobNumHint');
            return resp ? resp['selectedId'] : null;
        });
    }
    /**
     * @return {?}
     */
    getPhoneContacts() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const obj = yield this.sendAsyncRequest('getPhoneContacts');
            return obj['contacts'];
        });
    }
    // /**
    //  * @returns { success: boolean, base64: string, mimeType: string, cropped: boolean, failureCode: string }
    //  */
    /**
     * @return {?}
     */
    takePictureFromCamera() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const obj = yield this.sendAsyncRequest('takePictureFromCamera');
            return obj;
        });
    }
    // /**
    //  * @returns { success: boolean, base64: string, mimeType: string, cropped: boolean, failureCode: string }
    //  */
    /**
     * @return {?}
     */
    selectPictureFromGallery() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const obj = yield this.sendAsyncRequest('selectPictureFromGallery');
            return obj;
        });
    }
    // /**
    //  * @returns { base64: string, checkSum: string, mimeType: string }
    //  */
    /**
     * @return {?}
     */
    selectDocumentFile() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const obj = yield this.sendAsyncRequest('selectDocumentFile');
            return obj;
        });
    }
    /**
     * @param {?} permission
     * @param {?=} showRationale
     * @return {?}
     */
    getPermission(permission, showRationale = true) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const json = yield this.sendAsyncRequest('getPermission', this.permObj[permission], showRationale);
            return { permGiven: json['permissionGiven'], dialogShown: json['dialogShown'] };
        });
    }
    /**
     * @param {?} base64Data
     * @return {?}
     */
    writeExternalStyles(base64Data) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const json = yield this.sendAsyncRequest('writeExternalStyles', base64Data);
            return json['success'];
        });
    }
    /**
     * @param {?} filePath
     * @param {?} fileName
     * @param {?} base64Data
     * @return {?}
     */
    saveBinaryFile(filePath /* embeds ncInstanceId */, fileName, base64Data) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const json = yield this.sendAsyncRequest('saveBinaryFile', filePath, fileName, base64Data);
            return json['success'];
        });
    }
    /**
     * //  * \@returns { action: string, result: string }
     *
     * Eg. action : SAVED_PAYEES, DISMISS, SCAN
     * result : Scanned result if action is SCAN
     * @param {?} invSource
     * @return {?}
     */
    payViaQr(invSource) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const object = yield this.sendAsyncRequest('payViaQr', invSource);
            return object;
        });
    }
    /**
     * @param {?} invSource
     * @param {?} title
     * @return {?}
     */
    scanQrCode(invSource, title) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const object = yield this.sendAsyncRequest('scanQrCode', invSource, title);
            /** @type {?} */
            const scanResult = {
                result: object['result'],
                action: object['action']
            };
            return scanResult;
        });
    }
    /**
     * @param {?} invSource
     * @return {?}
     */
    scanBarcode(invSource) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.hasPermission(Permission.CAMERA))) {
                /** @type {?} */
                const resp = yield this.getPermission(Permission.CAMERA);
                if (!resp.permGiven) {
                    this.rc.uiRouter.showToast('Can\'t scan Barcode without Camera permission');
                    return null;
                }
            }
            /** @type {?} */
            const obj = yield this.sendAsyncRequest('scanBarcode', invSource);
            return obj;
        });
    }
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
    openInMobileBrowser(url) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendAsyncRequest('openInMobileBrowser', url);
        });
    }
    /**
     * @return {?}
     */
    closeMobileBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendAsyncRequest('closeMobileBrowser');
        });
    }
    /**
     * @return {?}
     */
    enableDebug() {
        return __awaiter(this, void 0, void 0, function* () {
            this.rc.setGlobalLogLevel(LOG_LEVEL.DEBUG);
            this.rc.globalKeyVal.logLevel = LOG_LEVEL.DEBUG;
            yield this.sendAsyncRequest('setDebuggable');
            this.rc.uiRouter.showToast('Log level changed to debug');
        });
    }
    /**
     * @return {?}
     */
    updateGcConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.userAgent !== UserAgent.BROWSER)
                yield this.sendAsyncRequest('updateGcConfig');
        });
    }
    /**
     * @return {?}
     */
    closeApp() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendAsyncRequest('closeApp');
        });
    }
    /**
     * @return {?}
     */
    logoutUser() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendAsyncRequest('logoutUser');
        });
    }
    /**
     * @return {?}
     */
    forgetUser() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendAsyncRequest('forgetUser');
        });
    }
    /**
     * @param {?=} packageName
     * @return {?}
     */
    launchAppMarket(packageName = '') {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendAsyncRequest('launchAppMarket', packageName);
        });
    }
    /**
     * @param {?=} email
     * @param {?=} subject
     * @param {?=} body
     * @return {?}
     */
    sendMail(email, subject, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), { email, subject });
            return yield this.sendAsyncRequest('sendMail', email || '', subject || '', body || '');
        });
    }
    /**
     * @param {?} mobileNumber
     * @return {?}
     */
    placeCall(mobileNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), `Placing call with number ${mobileNumber}`);
            yield this.sendAsyncRequest('placeCall', mobileNumber);
        });
    }
    /**
     * @param {?} pkgName
     * @return {?}
     */
    checkIfPkgInstalled(pkgName) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const obj = yield this.sendAsyncRequest('checkIfPkgInstalled', pkgName);
            return obj['installed'];
        });
    }
    /**
     * @param {?} permission
     * @return {?}
     */
    hasPermission(permission) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const obj = yield this.sendAsyncRequest('hasPermission', this.permObj[permission]);
            return obj['hasPerm'];
        });
    }
    /**
     * @return {?}
     */
    listenForSmsCode() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendAsyncRequest('listenForSmsCode');
        });
    }
    /**
     * @param {?} clientTransactionId
     * @return {?}
     */
    setVerStringToken(clientTransactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendAsyncRequest('setVerStringToken', clientTransactionId);
        });
    }
    /**
     * @param {?} text
     * @return {?}
     */
    copyToClipBoard(text) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.sendAsyncRequest('copyToClipBoard', text);
        });
    }
    /**
     * @return {?}
     */
    openSoftInputKeyboard() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.userAgent === UserAgent.ANDROID)
                yield this.sendAsyncRequest('openSoftInputKeyboard');
        });
    }
    /**
     * @return {?}
     */
    hideSoftInputKeyboard() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.userAgent === UserAgent.ANDROID)
                yield this.sendAsyncRequest('hideSoftInputKeyboard');
        });
    }
    /**
     * @return {?}
     */
    logOutCurrentUser() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.rc.userKeyVal.logOutCurrentUser();
            // const params: LogoutUser.params = {}
            //await this.rc.router.sendRequest(this.rc, LogoutUser.name, params)
            yield this.sendAsyncRequest('logoutUser');
        });
    }
    /**
     * @return {?}
     */
    resetApp() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendAsyncRequest('resetApp');
        });
    }
    /*------------------------------------------------------------------------------
      F R O M    N A T I V E
    ------------------------------------------------------------------------------*/
    /**
     * @param {?} fnName
     * @param {?} requestTag
     * @param {...?} params
     * @return {?}
     */
    asyncRequestFromNative(fnName, requestTag, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ngZone.run((/**
             * @return {?}
             */
            () => {
                this.asyncRequestFromNativeInternal(fnName, requestTag, params);
            }));
        });
    }
    /**
     * @private
     * @param {?} fnName
     * @param {?} requestTag
     * @param {...?} params
     * @return {?}
     */
    asyncRequestFromNativeInternal(fnName, requestTag, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const fn = this[fnName];
            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), typeof fn === 'function', fnName);
            /** @type {?} */
            const resp = yield fn.apply(this, params);
            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), resp && (typeof resp === 'object'), resp);
            if (this.userAgent !== UserAgent.BROWSER) {
                this.sendAsyncRequest('asyncRequestResponseFromJs', requestTag, JSON.stringify(resp));
            }
        });
    }
    /**
     * @param {?} eventName
     * @param {...?} params
     * @return {?}
     */
    eventFromNative(eventName, ...params) {
        this.ngZone.run((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const fnName = `on${eventName}`;
            /** @type {?} */
            const fn = this[fnName];
            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), typeof fn === 'function', fnName);
            fn.apply(this, params);
        }));
    }
    /*------------------------------------------------------------------------------
      E V E N T S   F R O M   N A T I V E
    ------------------------------------------------------------------------------*/
    /**
     * @private
     * @param {?} json
     * @return {?}
     */
    onUpdateCustomData(json) {
        this.rc.router.updateCustomData(this.rc, (/** @type {?} */ (json)));
    }
    /**
     * @private
     * @param {?} wo
     * @return {?}
     */
    onEphEvent(wo) {
        this.rc.router.providerMessage(this.rc, [(/** @type {?} */ (wo))]);
    }
    /**
     * @private
     * @param {?} smsBody
     * @return {?}
     */
    onVerSmsCode(smsBody) {
        // this.rc.uiRouter.getRoot().onVerificationSmsCode(smsBody)
    }
    /**
     * @private
     * @return {?}
     */
    onVerSmsTimeout() {
    }
    /**
     * @private
     * @return {?}
     */
    onMobileBrowserClosed() {
        // EventSystem.broadcast(this.rc, APP_UI_EVENT.MOBILE_BROWSER_CLOSED)
    }
    /**
     * @private
     * @param {?} factorHeight
     * @return {?}
     */
    onAdjustPan(factorHeight) {
        this.currKeyboardHt = factorHeight;
        // EventSystem.broadcast(this.rc, APP_UI_EVENT.ADJUST_PAN_FOR_SCREEN)
    }
    /**
     * @private
     * @param {?} result
     * @return {?}
     */
    onFingerprintScanResult(result) {
        // EventSystem.broadcast(this.rc, APP_UI_EVENT.FINGERPRINT_SCAN_RESULT, JSON.parse(result))
    }
    /**
     * @private
     * @param {?} netType
     * @param {?} location
     * @return {?}
     */
    onConnectionAttr(netType, location) {
        if (netType)
            this.netType = netType;
        if (!location)
            return;
        /** @type {?} */
        const lat = location['lat'];
        /** @type {?} */
        const lng = location['lng'];
        if (lat && lng) {
            this.location = location;
            // if (this.rc.router && this.rc.userKeyVal.clientId) {
            //   const locUpdReq: LocationUpdateEvent.params = { lat, lng }
            //   this.rc.router.sendEvent(this.rc, LocationUpdateEvent.name, locUpdReq, 
            //     LocationUpdateEvent.ephemeral)
            // }
        }
    }
    /**
     * @private
     * @return {?}
     */
    onScreenPause() {
        // EventSystem.broadcast(this.rc, APP_UI_EVENT.CORDOVA_SCREEN_PAUSE)
    }
    /**
     * @private
     * @return {?}
     */
    onScreenResume() {
        // EventSystem.broadcast(this.rc, APP_UI_EVENT.CORDOVA_SCREEN_RESUME)
    }
    // onLaunch(directLink: string) {
    //   if (!directLink) return
    //   this.launchContext.directLink = directLink
    //   this.rc.uiRouter.getRoot().showLanding(false, false)
    // }
    /**
     * @param {?} directLink
     * @return {?}
     */
    setDirectLink(directLink) {
        if (!directLink)
            return;
        this.launchContext.directLink = directLink;
    }
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
    sendAsyncRequest(apiName, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const nar = new NativeAsyncRequest(this.nextRequestId++, apiName);
            this.requestMap[nar.requestId] = nar;
            switch (this.userAgent) {
                case UserAgent.ANDROID:
                    window['cordova'][apiName](nar.requestId, ...params);
                    break;
                case UserAgent.IOS:
                    window['webkit'].messageHandlers.cordova.postMessage({ requestId: nar.requestId,
                        method: apiName, args: params });
                    break;
                case UserAgent.BROWSER:
                    this.webBridge.handleRequest(nar.requestId, apiName, params);
                    break;
            }
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), `Response received for sendAsyncRequest: requestid: ${nar.requestId}, 
      apiName: ${apiName}`);
            return yield nar.promise;
        });
    }
    // TODO: make private, web-bridge dependency
    /**
     * @param {?} requestId
     * @param {?} json
     * @return {?}
     */
    asyncResponseFromNative(requestId, json) {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), `asyncResponseFromNative requestId:${requestId} Response:${JSON.stringify(json)}`);
        /** @type {?} */
        const nar = this.requestMap[requestId];
        if (!nar) {
            this.rc.isError() && this.rc.error(this.rc.getName(this), 'Request id', requestId, 'is missing in request map');
            return;
        }
        delete this.requestMap[requestId];
        nar.resolve(json);
    }
}
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
class NativeAsyncRequest {
    /**
     * @param {?} requestId
     * @param {?} apiName
     */
    constructor(requestId, apiName) {
        this.requestId = requestId;
        this.apiName = apiName;
        this.promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        }));
    }
}
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
const RequestMessageId = {
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
class MuSdkBridge extends MuBridge {
    /**
     * @param {?} rc
     * @param {?} ngZone
     */
    constructor(rc, ngZone) {
        super(rc, ngZone);
        this.reqMap = {};
    }
    /**
     * @return {?}
     */
    preInit() {
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
    }
    /**
     * @return {?}
     */
    init() {
        const _super = Object.create(null, {
            init: { get: () => super.init }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.init.call(this);
            this.initSdkType();
            window.onmessage = this.onIframeMessage.bind(this);
        });
    }
    /**
     * @private
     * @return {?}
     */
    initSdkType() {
        this.sdkType = this.userAgent === UserAgent.BROWSER ? SDK_TYPE.WEB : SDK_TYPE.CORDOVA;
    }
    /*==============================================================================
                                MESSAGING
    ==============================================================================*/
    /**
     * @param {?} event
     * @return {?}
     */
    onIframeMessage(event) {
        return __awaiter(this, void 0, void 0, function* () {
            // const message = event.data as WindowMessage
            // const requestId = message.requestId,
            //       messageId = message.messageId,
            //       data      = message.data
            // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 
            //   `Came to process message ${requestId} ${messageId} ${data?JSON.stringify(data):''}`)
            // const rootComp = this.rc.uiRouter.getRoot()
            // switch (messageId) {
            //   case RequestMessageId.REQUEST_SESSION : 
            //     this.initData = <WebSessionInitData>data 
            //     await rootComp.initWebSession(requestId, this.initData)
            //     break
            //   case RequestMessageId.DIRECT_LINK :
            //     const directLink = data.directLink,
            //           dlParams   = data.dlParams
            //     await rootComp.handleDirectLink(requestId, directLink, dlParams)  
            //     break
            //   case RequestMessageId.API_REQUEST:
            //     const apiName   = data.apiName,
            //           apiParams = data.apiParams
            //     this.rc.isAssert() && this.rc.assert(this.rc.getName(this), apiName, 'Invalid API args')
            //     await rootComp.handleApiRequest(requestId, apiName, apiParams)
            //     break
            //   default:
            //     this.rc.isAssert() && this.rc.assert(this.rc.getName(this), `Invalid messageId: ${messageId}`)    
            // }
        });
    }
    /**
     * @param {?} requestId
     * @param {?} messageId
     * @param {?} code
     * @param {?=} data
     * @return {?}
     */
    postMessage(requestId, messageId, code, data) {
        if (this.sdkType === SDK_TYPE.CORDOVA) {
            this.postMessageToCordova(requestId, messageId, code, data);
            return;
        }
        if (window === parent)
            return;
        /** @type {?} */
        const response = { code, data };
        /** @type {?} */
        const message = { requestId, messageId, response };
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), `postMessage from App ${JSON.stringify(message)}`);
        window.parent.postMessage(message, '*');
    }
    /**
     * @param {?} requestId
     * @param {?=} data
     * @return {?}
     */
    onCordovaMessage(requestId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // const rootComp = this.rc.uiRouter.getRoot()
            // this.initData = data.initData
            // rootComp.initCordovaSession(requestId, this.initData)
            // const invData     = data.invData,
            //       directLink  = invData.directLink,
            //       dlParams    = invData.dlParams
            // rootComp.handleDirectLink(requestId, directLink, dlParams)
            // const nar = new CordovaAsyncRequest(requestId)
            // this.reqMap[nar.requestId] = nar
            // await nar.promise
        });
    }
    /**
     * @param {?} requestId
     * @param {?} messageId
     * @param {?} code
     * @param {?=} data
     * @return {?}
     */
    postMessageToCordova(requestId, messageId, code, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // const nar = this.reqMap[requestId]
            // if (!nar) {
            //   this.rc.isError() && this.rc.error(this.rc.getName(this), 
            //     'Request id', requestId, 'is missing in request map')
            //   return
            // }
            // delete this.reqMap[requestId]
            // const obj = { requestId, messageId, code, data }
            // nar.resolve(obj)
        });
    }
    /**
     * @param {?} requestId
     * @param {?=} data
     * @param {?=} closeApp
     * @return {?}
     */
    onSdkSuccessResponse(requestId, data = null, closeApp = true) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (this.sdkType === SDK_TYPE.WEB || this.sdkType === SDK_TYPE.CORDOVA) {
            //   const obj : ActCompInterface = {
            //     code : ActCompInterfaceCode.SUCCESS,
            //     data : data
            //   }
            //   const rootComp = this.rc.uiRouter.getRoot()
            //   rootComp.onActionComplete(requestId, obj)
            //   return
            // }
            // super.onSdkSuccessResponse(requestId, data, closeApp)
        });
    }
    /**
     * @param {?} requestId
     * @param {?} data
     * @param {?} uiError
     * @param {?=} closeApp
     * @return {?}
     */
    onSdkFailureResponse(requestId, data, uiError, closeApp = true) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (this.sdkType === SDK_TYPE.WEB || this.sdkType === SDK_TYPE.CORDOVA) {
            //   const obj : ActCompInterface = {
            //     code : ActCompInterfaceCode.FAILURE,
            //     data : uiError
            //   }
            //   const rootComp = <SdkRootComponent>this.rc.uiRouter.getRoot()
            //   rootComp.onActionComplete(requestId, obj)
            //   return
            // }
            // super.onSdkFailureResponse(requestId, data, uiError, closeApp)
        });
    }
}
if (false) {
    /** @type {?} */
    MuSdkBridge.prototype.initData;
    /**
     * @type {?}
     * @private
     */
    MuSdkBridge.prototype.reqMap;
}
class CordovaAsyncRequest {
    /**
     * @param {?} requestId
     */
    constructor(requestId) {
        this.requestId = requestId;
        this.promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        }));
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MuRouterApp extends XmnRouterBrowser {
    /**
     * @param {?} rc
     * @param {?} serverUrl
     * @param {?} ci
     * @param {?} pubKey
     * @param {?} encIV
     */
    constructor(rc, serverUrl, ci, pubKey, encIV) {
        super(rc, serverUrl, ci, pubKey, encIV);
        rc.setupLogger(this, 'RouterApp', LOG_LEVEL.DEBUG);
    }
    /**
     * @param {?} rc
     * @return {?}
     */
    getNetworkType(rc) {
        return rc.utils.getNetworkType(rc);
    }
    /**
     * @param {?} rc
     * @return {?}
     */
    getLocation(rc) {
        return rc.utils.getLocation(rc);
    }
    /**
     * @return {?}
     */
    getMaxOpenSecs() {
        return 100;
    }
    /**
     * @param {?} rc
     * @return {?}
     */
    getCustomData(rc) {
        return (/** @type {?} */ ({}));
    }
    /**
     * @return {?}
     */
    canStrtLastReqTimer() {
        return this.userLoggedIn;
    }
    /**
     * @param {?} rc
     * @return {?}
     */
    runAlwaysAsSecure(rc) {
        return false;
    }
    /**
     * @param {?} rc
     * @return {?}
     */
    getSessionTimeOutSecs(rc) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const gcConfig = (/** @type {?} */ (yield rc.gcConfigKeyVal.getConfig(GcCategory.Session, GcKey.GeneralConfig)));
            /** @type {?} */
            const sessionGc = (/** @type {?} */ (Object.assign({}, gcConfig)));
            return rc.getGlobalLogLevel() === LOG_LEVEL.DEBUG ? 20000 : sessionGc.fgTimeoutSec;
        });
    }
    /**
     * @param {?} rc
     * @return {?}
     */
    sessionTimedOut(rc) {
        rc.isStatus() && rc.status(rc.getName(this), `session timed out.`);
        this.isSessionTimedout = true;
    }
    /**
     * @param {?} rc
     * @param {?} inp
     * @return {?}
     */
    updateCustomData(rc, inp) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    /**
     * @param {?} rc
     * @return {?}
     */
    prepareConnection(rc) {
        const _super = Object.create(null, {
            prepareConnection: { get: () => super.prepareConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (rc.bridge.isRunningInBrowser())
                _super.prepareConnection.call(this, rc);
            else
                yield rc.bridge.prepareConnection();
        });
    }
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
    sendRequest(rc, api, params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!api || !params)
                throw new Error(`Invalid argument for sendRequest api: ${api} params: ${params}`);
            if (rc.utils.isNetworkUnhealthy(rc)) {
                /** @type {?} */
                const error = {
                    errorCode: XmnError.NetworkNotPresent
                };
                return error;
            }
            if (rc.bridge.isRunningInBrowser()) {
                if (this.isSessionTimedout) {
                    location.reload();
                }
                /** @type {?} */
                const resp = yield this.sendBrowserRequest(rc, api, params);
                if (rc.utils.isOfTypeUiError(resp) && resp['errorCode'] === XmnError._ConnectionExpired) {
                    return yield this.sendRequest(rc, api, params);
                }
                else {
                    return resp;
                }
            }
            else {
                /** @type {?} */
                const resp = yield rc.bridge.sendRouterRequest(api, params);
                if (resp.errorCode) {
                    /** @type {?} */
                    const error = {
                        errorCode: resp.errorCode,
                        errorMessage: resp.errorMessage
                    };
                    return (/** @type {?} */ (error));
                }
                if (resp.events)
                    yield this.handleCordovaRouterEvents(rc, resp.events);
                return resp.data;
            }
        });
    }
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
    sendEvent(rc, name, params, ephemeral) {
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
    }
    /*==============================================================================
                                MEMBER FUNCTIONS
    ===============================================================================*/
    /**
     * @protected
     * @param {?} rc
     * @param {?} events
     * @return {?}
     */
    handleCordovaRouterEvents(rc, events) {
        return __awaiter(this, void 0, void 0, function* () {
            while (events.length) {
                /** @type {?} */
                const event = (/** @type {?} */ ((/** @type {?} */ (events.shift()))))
                // Do not pass sys events to xmn-router-browser
                ;
                // Do not pass sys events to xmn-router-browser
                if (event.type === WIRE_TYPE.SYS_EVENT) {
                    rc.isAssert() && rc.assert(rc.getName(this), `Platform should handle SysEvents on its own`);
                }
                else {
                    yield this.providerMessage(rc, [WireObject.getWireObject(event)]);
                }
            }
        });
    }
    /**
     * @protected
     * @param {?} rc
     * @param {?} api
     * @param {?} params
     * @return {?}
     */
    sendBrowserRequest(rc, api, params) {
        const _super = Object.create(null, {
            sendRequest: { get: () => super.sendRequest }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.sendRequest.call(this, rc, api, params)
                .catch((/**
             * @param {?} err
             * @return {?}
             */
            err => {
                /** @type {?} */
                const error = {
                    errorCode: err.code || err.message,
                    errorMessage: err.message || ''
                };
                return error;
            }));
        });
    }
}
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
const ANALYTICS_EVENT = {
    APP_LAUNCH: 'appLaunch',
    APP_SHARE: 'appShare',
};
/** @type {?} */
const ANALYTICS_EVENT_PARAMS = {
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
class AnalyticsScreenInfo {
    /**
     * @param {?} rc
     * @param {?} screenName
     * @param {?} invocationSource
     * @param {?=} navMode
     * @param {?=} modal
     */
    constructor(rc, screenName, invocationSource, navMode, modal) {
        this.rc = rc;
        this.screenName = screenName;
        this.invocationSource = invocationSource;
        this.modal = false;
        this.eventData = (/** @type {?} */ ({}));
        rc.setupLogger(this, 'AnalyticsScreenInfo');
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Creating new AnalyticsScreen State:', screenName, 'Invocation:', invocationSource);
        this.invocationTs = Date.now();
        this.navMode = navMode !== undefined ? navMode : 'unknown';
        this.modal = modal;
    }
    /**
     * @return {?}
     */
    getInvocationSource() { return this.invocationSource; }
    /**
     * @return {?}
     */
    getScreenName() { return this.screenName; }
    /**
     * @return {?}
     */
    onScreenDestroy() {
        /** @type {?} */
        let eventName = this.modal ? 'mod_' : '';
        eventName += this.screenName + '_screen';
        this.eventData['from'] = this.invocationSource;
        this.eventData['inv_ts'] = this.invocationTs,
            this.eventData['stay_time'] = Date.now() - this.invocationTs;
        this.eventData['nav_mode'] = this.navMode;
        this.rc.userEvent.logEvent(eventName, this.eventData);
    }
    /**
     * @param {?} stateName
     * @param {?} stateValue
     * @return {?}
     */
    setScreenState(stateName, stateValue) {
        this.eventData[stateName] = stateValue;
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), `Screen state: ${stateName}, value: ${stateValue}`);
    }
    /**
     * @param {?} actionName
     * @return {?}
     */
    setScreenAction(actionName) {
        if (this.eventData.hasOwnProperty(actionName)) {
            /** @type {?} */
            let count = this.eventData[actionName];
            this.eventData[actionName] = ++count;
        }
        else {
            this.eventData[actionName] = 1;
        }
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Screen Action:', actionName, 'Count: ', this.eventData[actionName]);
    }
    /**
     * @param {?} direction
     * @return {?}
     */
    setScreenActionScroll(direction) {
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
    }
}
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
const _EVENT_PREFIX = EVENT_PREFIX + '-';
/** @type {?} */
const MAX_LOG_NAME_SIZE = 32;
/** @type {?} */
const MAX_KEY_NAME_SIZE = 24;
/** @type {?} */
const MAX_VALUE_NAME_SIZE = 36;
/** @type {?} */
const USER_PROPERTIES = {
    USER_LINK_ID: 'user_link_id',
    EMAIL_ID: 'email_id',
    APP_LANG: 'app_lng'
};
class AnalyticsEventLogger {
    /**
     * @param {?} rc
     */
    constructor(rc) {
        this.rc = rc;
        this.allowLogging = false;
        if (this.rc.userKeyVal.clientId)
            this.initLogging();
    }
    /**
     * @return {?}
     */
    initLogging() {
        this.allowLogging = true;
        this.setUserId(this.rc.userKeyVal.clientId);
        this.setAllUserProperties();
        this.sendSessionEvents();
        // EventSystem.subscribeAll([
        //   APP_UI_EVENT.UPDATE_USER_EMAIL] , this.handleEvent.bind(this))
    }
    /**
     * @private
     * @param {?} eventName
     * @return {?}
     */
    handleEvent(eventName) {
        switch (eventName) {
            // case _EVENT_PREFIX + APP_UI_EVENT.UPDATE_USER_EMAIL:
            //   this.setUserProperty(USER_PROPERTIES.EMAIL_ID, this.rc.userKeyVal.emailId)
            //   break
        }
    }
    /**
     * @private
     * @return {?}
     */
    setAllUserProperties() {
        if (this.rc.userKeyVal.userLinkId) {
            this.setUserProperty(USER_PROPERTIES.USER_LINK_ID, this.rc.userKeyVal.userLinkId);
            // this.setUserProperty(USER_PROPERTIES.EMAIL_ID, this.rc.userKeyVal.emailId)
        }
    }
    /**
     * @private
     * @return {?}
     */
    sendSessionEvents() {
        // Sending app launch session event
        this.logEvent(ANALYTICS_EVENT.APP_LAUNCH, null);
    }
    /**
     * @private
     * @param {?} userId
     * @return {?}
     */
    setUserId(userId) {
        if (!this.allowLogging || !userId)
            return;
        this.rc.isStatus() && this.rc.status(this.rc.getName(this), 'Firebase userId: ', userId);
        this.rc.bridge.setUserId(userId);
    }
    /**
     * @private
     * @param {?} propName
     * @param {?} value
     * @return {?}
     */
    setUserProperty(propName, value) {
        if (!this.allowLogging)
            return;
        /** @type {?} */
        const valid = propName != null && propName.length > 0 &&
            propName.length <= MAX_KEY_NAME_SIZE && value != null &&
            value.length > 0 && value.length <= MAX_VALUE_NAME_SIZE;
        if (!valid) {
            this.rc.isWarn() && this.rc.warn('NcFirebase', 'Invalid Firebase User Property:', propName, value);
            return;
        }
        this.rc.isStatus() && this.rc.status(this.rc.getName(this), 'Firebase userProperty:: Name: ', propName, 'Value: ', value);
        this.rc.bridge.setUserProperty(propName, value);
    }
    /**
     * @param {?} routeName
     * @param {?} sharePkg
     * @return {?}
     */
    logAppShare(routeName, sharePkg) {
        /** @type {?} */
        const eventData = (/** @type {?} */ ({}));
        eventData[ANALYTICS_EVENT_PARAMS.SCREEN] = routeName;
        this.logEvent(ANALYTICS_EVENT.APP_SHARE, eventData);
    }
    /**
     * @param {?} eventName
     * @param {?} eventData
     * @return {?}
     */
    logEvent(eventName, eventData) {
        if (!this.allowLogging) {
            this.rc.isStatus() && this.rc.status(this.rc.getName(this), 'Cannot send Firebase event, Allow logging false');
            return;
        }
        this.logPublicEvent(eventName, eventData);
    }
    /**
     * @param {?} eventName
     * @param {?} eventData
     * @return {?}
     */
    logPublicEvent(eventName, eventData) {
        if (eventName == null || eventName.length === 0 || eventName.length >= MAX_LOG_NAME_SIZE) {
            this.rc.isWarn() && this.rc.warn('NcFirebase', 'Firebase eventName invalid: empty OR length > 32 characters, exiting...');
            return;
        }
        eventData = this.checkNValidateBundle(eventData);
        this.rc.isStatus() && this.rc.status('NcFirebase', 'Logging Firebase event:', eventName, JSON.stringify(eventData));
        this.rc.bridge.logEvent(eventName, JSON.stringify(eventData));
    }
    /**
     * @private
     * @param {?} bundle
     * @return {?}
     */
    checkNValidateBundle(bundle) {
        if (bundle === null)
            return (/** @type {?} */ ({}));
        /** @type {?} */
        let eventData = (/** @type {?} */ ({}));
        for (let key in bundle) {
            /** @type {?} */
            const val = bundle[key];
            /** @type {?} */
            const inValidKey = key !== this.validKey(key);
            /** @type {?} */
            const inValidValue = typeof (val) === 'string' && val !== this.validStringValue(String(val));
            /** @type {?} */
            const inValidValueType = !(typeof (val) === 'string' || typeof (val) === 'number');
            if (inValidKey || inValidValue || inValidValueType) {
                /** @type {?} */
                const objVal = inValidKey ? key : String(val);
                this.rc.isWarn() && this.rc.warn('NcFirebase', 'Invalid key : value pair inside event:', objVal, inValidValue, inValidValueType);
            }
            else {
                eventData[key] = bundle[key];
            }
        }
        return eventData;
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    validKey(key) {
        if (key.length > 0 && key.length <= MAX_KEY_NAME_SIZE)
            return key;
        this.rc.isWarn() && this.rc.warn('NcFirebase', 'FireBase Key length is 0 || > 24 Characters...');
        return key.substring(0, MAX_KEY_NAME_SIZE);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    validStringValue(value) {
        if (value.length > 0 && value.length <= MAX_VALUE_NAME_SIZE)
            return value;
        this.rc.isWarn() && this.rc.warn('NcFirebase', 'FireBase Value length is 0 || > 36 Characters...');
        return value.substring(0, MAX_VALUE_NAME_SIZE);
    }
}
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
const NavMode = {
    Launch: 'page_launch',
    Next: 'page_next',
    Back: 'page_back',
    Dialog: 'page_dialog'
};
/** @type {?} */
const INVOCATION_LAUNCH = 'launch';
/** @type {?} */
const INVOCATION_RELAUNCH = 'relaunch';
class AnalyticsScreenManager {
    /**
     * @param {?} rc
     */
    constructor(rc) {
        this.rc = rc;
        this.pendingTabActions = {};
        this.pendingTabStates = {};
        rc.setupLogger(this, 'AnalyticsScreenManager');
        this.lastScreenName = '';
        this.currModalState = null;
        // EventSystem.subscribe(APP_UI_EVENT.CORDOVA_SCREEN_PAUSE, this.onScreenPause.bind(this))
        // EventSystem.subscribe(APP_UI_EVENT.CORDOVA_SCREEN_RESUME, this.onScreenResume.bind(this))
        if (rc.getGlobalLogLevel() === LOG_LEVEL.DEBUG)
            window['screenmanager'] = this;
    }
    /**
     * @return {?}
     */
    getCurrentScreenName() {
        return this.currModalState != null ? this.currModalState.getScreenName()
            : this.currScreenState.getScreenName();
    }
    /**
     * @param {?} eventUrl
     * @param {?} outlet
     * @param {?} lastNavMethod
     * @return {?}
     */
    onNavEnd(eventUrl, outlet, lastNavMethod) {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Inside onNavEnd', eventUrl, lastNavMethod);
        /** @type {?} */
        let screenName;
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
            let modalName = eventUrl.match(/.*=\((.*)\)/)[1];
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
        let navMode;
        /** @type {?} */
        let invSrc;
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
    }
    /**
     * @param {?} tabRoutes
     * @return {?}
     */
    setCurrentTabRoutes(tabRoutes) {
        this.currTabRoutes = tabRoutes;
    }
    /**
     * @param {?} currScreenName
     * @param {?} tabIndex
     * @return {?}
     */
    onTabNavEnd(currScreenName, tabIndex) {
        /** @type {?} */
        const tabScreenName = this.getFbaseScreenName(currScreenName);
        if (this.currTabScreenState)
            this.currTabScreenState.onScreenDestroy();
        this.lastTabSceenName = this.currTabRoutes[tabIndex];
        /** @type {?} */
        const invSource = this.currTabScreenState ? this.currTabScreenState.getScreenName()
            : INVOCATION_LAUNCH;
        this.currTabScreenState = new AnalyticsScreenInfo(this.rc, tabScreenName, invSource);
        this.digestPendingTabScreen(tabIndex);
    }
    /**
     * @return {?}
     */
    onTabDestroy() {
        this.currTabScreenState.onScreenDestroy();
        this.currTabScreenState = null;
    }
    /**
     * @param {?} screenName
     * @param {?} direction
     * @return {?}
     */
    logScreenActionScroll(screenName, direction) {
        screenName = this.getFbaseScreenName(screenName);
        if (this.currModalState && this.currModalState.getScreenName() === screenName) {
            this.currModalState.setScreenActionScroll(direction);
        }
        else {
            this.currScreenState.setScreenActionScroll(direction);
        }
    }
    /**
     * @param {?} screenName
     * @param {?} actionName
     * @return {?}
     */
    logScreenAction(screenName, actionName) {
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
    }
    /**
     * @param {?} screenName
     * @param {?} stateName
     * @param {?} stateValue
     * @return {?}
     */
    logScreenState(screenName, stateName, stateValue) {
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
            this.rc.isError() && this.rc.error(this.rc.getName(this), `Invalid screen state', ${screenName}, ${stateName}, 'Expected screen name ', ${this.currScreenState.getScreenName()}`);
        }
    }
    /**
     * @private
     * @param {?} screenName
     * @param {?} actionName
     * @return {?}
     */
    onTabScreenAction(screenName, actionName) {
        if (this.lastTabSceenName === screenName && this.currTabScreenState) {
            this.currTabScreenState.setScreenAction(actionName);
        }
        else {
            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), this.currTabRoutes.indexOf(screenName) !== -1, `invalid tab screen name ${screenName} ${actionName}`);
            /** @type {?} */
            let actions = this.pendingTabActions[screenName];
            if (!actions)
                actions = [];
            actions.push(actionName);
            this.pendingTabActions[screenName] = actions;
        }
    }
    /**
     * @private
     * @param {?} screenName
     * @param {?} stateName
     * @param {?} stateValue
     * @return {?}
     */
    onTabScreenState(screenName, stateName, stateValue) {
        if (this.lastTabSceenName === screenName && this.currTabScreenState) {
            this.currTabScreenState.setScreenState(stateName, stateValue);
        }
        else {
            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), this.currTabRoutes.indexOf(screenName) !== -1, `invalid tab screen name ${screenName} ${stateName}`);
            /** @type {?} */
            let routeTabState = this.pendingTabStates[screenName];
            if (!routeTabState)
                routeTabState = {};
            routeTabState[stateName] = stateValue;
            this.pendingTabStates[screenName] = routeTabState;
        }
    }
    /**
     * @private
     * @param {?} tabIndex
     * @return {?}
     */
    digestPendingTabScreen(tabIndex) {
        /** @type {?} */
        const currScreenName = this.currTabRoutes[tabIndex]
        // Digest route Actions
        ;
        // Digest route Actions
        /** @type {?} */
        const actions = this.pendingTabActions[currScreenName];
        if (actions) {
            actions.forEach((/**
             * @param {?} action
             * @return {?}
             */
            action => {
                this.currTabScreenState.setScreenAction(action);
            }));
            this.pendingTabActions[currScreenName] = [];
        }
        // Digest route States
        /** @type {?} */
        const states = this.pendingTabStates[currScreenName];
        if (states) {
            for (let key in states) {
                this.currTabScreenState.setScreenState(key, states[key]);
            }
            this.pendingTabStates[currScreenName] = {};
        }
    }
    /**
     * @return {?}
     */
    onScreenPause() {
        if (this.currModalState)
            this.currModalState.onScreenDestroy();
        if (this.currTabScreenState)
            this.currTabScreenState.onScreenDestroy();
        this.currScreenState.onScreenDestroy();
    }
    /**
     * @private
     * @return {?}
     */
    onScreenResume() {
        if (this.currModalState)
            this.currModalState = new AnalyticsScreenInfo(this.rc, this.currModalState.getScreenName(), this.currModalState.getInvocationSource(), INVOCATION_RELAUNCH, true);
        if (this.currTabScreenState)
            this.currTabScreenState = new AnalyticsScreenInfo(this.rc, this.currTabScreenState.getScreenName(), this.currTabScreenState.getInvocationSource(), INVOCATION_RELAUNCH);
        this.currScreenState = new AnalyticsScreenInfo(this.rc, this.currScreenState.getScreenName(), this.currScreenState.getInvocationSource(), INVOCATION_RELAUNCH);
    }
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    getFbaseScreenName(url) {
        /** @type {?} */
        let screenName;
        /** @type {?} */
        const paramIdx = url.indexOf('?');
        screenName = url.substring(0, paramIdx > 0 ? paramIdx : url.length).replace('%2F', '/');
        /** @type {?} */
        const moduleIdx = screenName.indexOf('/');
        if (moduleIdx !== -1)
            screenName = screenName.substring(moduleIdx + 1, screenName.length);
        return screenName;
    }
}
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
class MuUiRouter extends UiRouter {
    /**
     * @param {?} rc
     * @param {?} router
     * @param {?} translate
     */
    constructor(rc, router, translate) {
        super(rc, router);
        this.rc = rc;
        this.translate = translate;
        rc.setupLogger(this, 'AppUiRouter', LOG_LEVEL.DEBUG);
        if (rc.getGlobalLogLevel() === LOG_LEVEL.DEBUG) {
            window['uiRouter'] = this;
        }
        rc.uiRouter = this;
        this.analyticsScreenMgr = new AnalyticsScreenManager(rc);
    }
    /**
     * @param {?} appProtocol
     * @param {?} appHost
     * @return {?}
     */
    setAppProtoAndHost(appProtocol, appHost) {
        this.appHost = appHost;
        this.appProtocol = appProtocol;
    }
    /**
     * @param {?} toastMessage
     * @param {?=} stay
     * @param {?=} position
     * @return {?}
     */
    showToast(toastMessage, stay, position) {
    }
    /**
     * @param {?=} overlayText
     * @return {?}
     */
    showOverlay(overlayText = this.translate.instant('cmn_loading')) {
        //   this.rootComp.showOverlay(overlayText)
    }
    /**
     * @return {?}
     */
    removeOverlay() {
        // this.rootComp.removeOverlay()
    }
    /**
     * Parse URL of the form route?params
     * @param {?} navUrl
     * @return {?}
     */
    getRoutingInfoForNavUrl(navUrl) {
        navUrl = `${this.appProtocol}://${this.appHost}/` + navUrl;
        return this.getRoutingInfo(navUrl);
    }
    /**
     * Parse URL of the form protocol://host/route?params
     * @param {?} directLink
     * @return {?}
     */
    getRoutingInfo(directLink) {
        /** @type {?} */
        const dlObj = this.rc.utils.parseURLForRouter(directLink);
        /** @type {?} */
        const routingInfo = {
            routeTo: dlObj.pathname,
            queryParams: dlObj.searchObject || {},
            hostName: dlObj.hostname
        };
        if (routingInfo.queryParams[HashidParams.LogLevel]) {
            /** @type {?} */
            const logLevel = Number(routingInfo.queryParams[HashidParams.LogLevel]);
            if (this.rc.globalKeyVal.logLevel !== logLevel && logLevel === LOG_LEVEL.DEBUG) {
                this.rc.bridge.enableDebug();
            }
        }
        return routingInfo;
    }
    /**
     * @param {?} directLink
     * @param {?=} ncExtracs
     * @return {?}
     */
    navigateByDirectLink(directLink, ncExtracs) {
        /** @type {?} */
        const routingInfo = this.getRoutingInfoForNavUrl(directLink);
        ncExtracs = ncExtracs || {};
        /** @type {?} */
        const params = {
            queryParams: routingInfo.queryParams
        };
        for (const key in ncExtracs) {
            if (!params[key]) {
                params[key] = ncExtracs[key];
            }
        }
        this.navigate(routingInfo.routeTo, params);
    }
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
    onDeviceBack() {
        this.rc.isStatus() && this.rc.status(this.rc.getName(this), 'Device back');
        window.setTimeout((/**
         * @return {?}
         */
        () => {
            if (this.urlStack.length === 1) {
                if (this.warnedUser) {
                    this.analyticsScreenMgr.logScreenAction(this.analyticsScreenMgr.getCurrentScreenName(), 'close_app');
                    this.notifyAppClose();
                }
                else {
                    this.showToast(this.translate.instant('cmn_press_back'));
                    this.warnedUser = true;
                }
            }
            else {
                this.analyticsScreenMgr.logScreenAction(this.analyticsScreenMgr.getCurrentScreenName(), 'sys_back');
                this.goBack();
            }
        }), 0);
    }
    /**
     * @param {?} tabRoutes
     * @return {?}
     */
    setCurrentTabRoutes(tabRoutes) {
        this.analyticsScreenMgr.setCurrentTabRoutes(tabRoutes);
    }
    /**
     * @param {?} currScreenName
     * @param {?} currentIndex
     * @return {?}
     */
    onTabNavEnd(currScreenName, currentIndex) {
        this.analyticsScreenMgr.onTabNavEnd(currScreenName, currentIndex);
    }
    /**
     * @return {?}
     */
    onTabDestroy() {
        this.analyticsScreenMgr.onTabDestroy();
    }
    /**
     * @param {?} screen
     * @param {?} direction
     * @return {?}
     */
    logScreenActionScroll(screen, direction) {
        this.analyticsScreenMgr.logScreenActionScroll(screen.getRouteName(), direction);
    }
    /**
     * @param {?} screen
     * @param {?} actionName
     * @return {?}
     */
    logScreenAction(screen, actionName) {
        this.analyticsScreenMgr.logScreenAction(screen.getRouteName(), actionName);
    }
    /**
     * @param {?} screen
     * @param {?} stateName
     * @param {?} stateValue
     * @return {?}
     */
    logScreenState(screen, stateName, stateValue) {
        this.analyticsScreenMgr.logScreenState(screen.getRouteName(), stateName, stateValue);
    }
    /**
     * @return {?}
     */
    getRoot() {
        return {
            /**
             * @return {?}
             */
            getBusinessId() {
                return '';
            },
            /**
             * @param {?} data
             * @return {?}
             */
            onPayUResponse(data) {
            },
            /**
             * @param {?} e
             * @return {?}
             */
            handleError(e) {
                // YTODO - should implement handle error
                this.rc.isStatus() && this.rc.status(this.rc.getName(this), `Came to handleError inside library: ${e}`);
                // this.showError(e.message)
                // this.showJS()
            }
        };
    }
}
MuUiRouter.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MuUiRouter.ctorParameters = () => [
    { type: RunContextBrowser, decorators: [{ type: Inject, args: ['RunContext',] }] },
    { type: Router },
    { type: TranslateService }
];
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
const APP_UI_EVENT = {
    USER_CARD_ACTIVATED: 'user-card-activated',
    YSE_RESPONSE: 'yse-response'
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RunContextJest extends RunContextBrowser {
    /**
     * @param {?} initConfig
     * @param {?} runState
     * @param {?=} contextId
     * @param {?=} contextName
     */
    constructor(initConfig, runState, contextId, contextName) {
        super(initConfig, runState, contextId, contextName);
    }
    /**
     * @param {?=} contextId
     * @param {?=} contextName
     * @return {?}
     */
    copyConstruct(contextId, contextName) {
        /** @type {?} */
        const newRc = new RunContextJest(this.initConfig, this.runState, contextId, contextName);
        this.clone(newRc);
        return newRc;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ANALYTICS_EVENT, ANALYTICS_EVENT_PARAMS, ANDROID_PERM, API_STATE, APP_UI_EVENT, AXIS, AdjustElementsDirective, AlertDialogComponent, AnalyticsEventLogger, AnalyticsScreenInfo, AnalyticsScreenManager, ApiState, ApiStateBuilder, AppLocationStrategy, AudioPlayer, BROWSER_PERM, BottomFlyIn, BottomInComponent, BoundedValue, ComponentRoutes, ConfigKeyVal, CurrencyPipe, CustomBreakPointsProvider, DIALOG_RESULT, DIRECTION, DialerComponent, DomHelper, DropDownMultiSelectComponent, EVENT_PREFIX, EncryptionBrowser, EventSystem, ExtractMobileNoPipe, FcCategory, FcKey, FileUploadComponent, FilterComponent, GUTTER_WIDTH, GcCategory, GcKey, GcValue, GenericPipe, GlobalKeyValue, HashidConverter, HashidParams, IMAGE_TYPE, INJECTION_PARAM, IOS_PERM, InfiniteScrollComponent, InitConfigBrowser, InjectionParentBase, InputContainerComponent, InputValidator, KEYBOARD_MODE, KEY_TYPE, KeyboardDirective, KeypadComponent, LANG_EN_TRANS, LAUNCH_CONTEXT, LaunchContextMode, LoadingComponent, LoadingErrorComponent, LoadingOverlayComponent, LongPressDirective, MODAL_OUTLET, MaskingValueDirective, Master, MasterDb, MobileSdkResponse, ModalPopupComponent, MuBridge, MuBrowser, MuBrowserModule, MuComponentsRoutingModule, MuDataTableComponent, MuFormContainerComponent, MuRouterApp, MuSdkBridge, MuUiRouter, MuUtility, MuWebApi, MuWebBridge, MultiStepValue, Nail, NavMethod, NavTransition, NcAllowSingleClickDirective, NcAutoFocusDirective, NcFallbackCharDirective, NcImgFallbackDirective, NcMaxLengthDirective, NcPlatformLocation, NcStyleClassDirective, NextInpFocusDirective, PERMISSION, PRIMARY_OUTLET, PageNotFoundComponent, PerformanceMetrics, Permission, RCBrowserLogger, RoutableScreen, RoutingStrategy, RunContextBrowser, RunContextJest, RunStateBrowser, SDK_TYPE, STATE, Segment, State, StorageProvider, THRESHOLD, TIME, TOAST_DURATION, TOAST_DURATION_DEBUG, TOAST_POSITION, TRANSLATIONS, TRANSLATION_PROVIDERS, TYPEOF, TableDataManager, TextEncDec, ToastComponent, TrackableScreen, TranslatePipe, TranslateService, USERS, UiRouter, UrlHelper, UserAgent, UserKeyValue, ValidateImgDirective, VerificationError, VerificationSettingsExp, WsBrowser, XmnRouterBrowser, getTranslations, mergeDictionaries, muDictionary, XmnRouterBrowser as ɵa };
//# sourceMappingURL=mubble-browser.js.map
