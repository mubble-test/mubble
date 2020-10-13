export declare enum COL_TYPE {
    ICON = "ICON",
    IMAGE = "IMAGE",
    BUTTON = "BUTTON",
    TEXT = "TEXT",
    EDIT = "EDIT",
    TOGGLE = "TOGGLE",
    HYPER_LINK = "HYPER_LINK",
    MORE_DETAILS = "MORE_DETAILS",
    MULTI_LINE = "MULTI_LINE",
    INPUT_EDIT = "INPUT_EDIT"
}
export interface PipeParams {
    pipeName: string;
    value?: any;
}
export interface MuMultiLineParms {
    multiLineKey?: COL_TYPE[];
    dataKeyType: string[];
    dataKeyArr: string[];
    headerArr: string[];
}
export interface NavInfo {
    pageTitle?: string;
    logName: string;
    navUrl: string;
    btnName?: string;
    rootNav?: boolean;
}
export interface TableHeader {
    header: string;
    dataKey?: string;
    colType: COL_TYPE;
    pipeParams?: PipeParams;
    pipeParmas?: PipeParams;
    customStyle?: string;
    constValue?: any;
    enableSort?: boolean;
    widthPerc?: number;
    isEditable?: boolean;
    multiLineKey?: string[];
    dataKeyType?: string[];
    dataKeyArr?: string[];
    headerArr?: string[];
    elementStyle?: string;
    navInfo?: NavInfo;
}
export interface FilterItem {
    params: InputParams;
    mode?: FILTER_MODE;
}
export interface InputParams {
    id: string;
    displayType: DISPLAY_TYPE;
    placeHolder: string | string[];
    label?: string;
    options?: SelectionBoxParams[];
    selectAll?: boolean;
    inputType?: string;
    maxLength?: number;
    value?: any;
    isPassword?: boolean;
    validators?: ValidatorsParams;
    isRequired?: boolean;
    isDisabled?: boolean;
    image?: FilterImage;
    requiredIf?: string;
    disabledIf?: string;
    withoutBorder?: boolean;
    sectionIds?: string[];
    autoComplete?: string;
    name?: string;
    format?: string;
    maskLength?: number;
    isVisible?: boolean;
    rangeKeys?: string[];
    selectAllText?: string;
    unselectAllText?: string;
    emitStepSelection?: boolean;
}
export interface StepSelectedFilter {
    id: string | number;
    value: any;
}
export interface MuFomrValidation {
    validation: any[];
    errorMsg: string;
}
export interface MuFormValidation {
    validation: any[];
    errorMsg: string;
}
export interface MuFormParams {
    inputParams: InputParams[];
    formValidators?: MuFormValidation | MuFomrValidation;
}
export declare enum DISPLAY_TYPE {
    ROW_INPUT_BOX = "ROW_INPUT_BOX",
    INPUT_BOX = "INPUT_BOX",
    SELECTION_BOX = "SELECTION_BOX",
    CALENDAR_BOX = "CALENDAR_BOX",
    DATE_RANGE = "DATE_RANGE",
    NUMBER_RANGE = "NUMBER_RANGE",
    AUTOCOMPLETE_SELECT = "AUTO_COMPLETE_SELECT",
    RADIO = "RADIO",
    ROW_RADIO = "ROW_RADIO",
    TEXT_AREA = "TEXT_AREA",
    IMAGE_UPLOAD = "IMAGE_UPLOAD",
    TOGGLE = "TOGGLE",
    MULTI_CHECK_BOX = "MULTI_CHECK_BOX",
    BUTTON_TOGGLE = "BUTTON_TOGGLE",
    SLIDER = "SLIDER",
    TIME = "TIME",
    DROPDOWN_MULTI_CHECK_BOX = "DROPDOWN_MULTI_CHECK_BOX"
}
export interface SelectionBoxParams {
    id: string | number;
    value: string | number;
    selected?: boolean;
}
export interface ValidatorsParams {
    allowFutureDate?: boolean;
    rangeInputsReqd?: boolean;
    validation?: string | RegExp;
    validationError: string;
}
export declare enum DISPLAY_MODE {
    HORIZONTAL = "HORIZONTAL",
    VERTICAL = "VERTICAL"
}
export interface ImageParams {
    imgUrl?: string;
    iconClass?: string;
}
export interface FilterImage {
    prefixParams?: ImageParams;
    suffixParams?: ImageParams;
}
export declare enum FILTER_MODE {
    SEARCH = "SEARCH",
    MATCH = "MATCH",
    RANGE = "RANGE",
    SORT = "SORT"
}
export declare enum SORT_MODE {
    ASC = "ASC",
    DESC = "DESC"
}
export interface FilterParams {
    mode: FILTER_MODE;
    params: {
        [key: string]: string;
    };
}
export interface MuSelectedFilter {
    id: string;
    mode: FILTER_MODE;
    value: any;
    displayType?: DISPLAY_TYPE;
    displayMode?: DISPLAY_MODE;
}
export interface MuStickyTableConfig {
    noOfCols: number;
    stickyWidth: number;
    nonStickyWidth?: number;
}
