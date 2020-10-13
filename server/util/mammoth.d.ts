import { RunContextServer } from '../rc-server';
export declare const mammoth: any;
export interface MTransformCbT {
    (rc: RunContextServer, element: MParagraph): MParagraph;
}
export declare type MOptions = {
    includeDefaultStyleMap: boolean;
    transformDocument: MTransformCbT;
    styleMap: Array<string>;
};
export declare enum MType {
    document = "document",
    paragraph = "paragraph",
    run = "run",
    text = "text",
    tab = "tab",
    hyperlink = "hyperlink",
    noteReference = "noteReference",
    image = "image",
    note = "note",
    commentReference = "commentReference",
    comment = "comment",
    table = "table",
    tableRow = "tableRow",
    tableCell = "tableCell",
    "break" = "break",
    bookmarkStart = "bookmarkStart"
}
export declare type MText = {
    type: MType.text | MType.tab;
    value: string;
};
export declare type MElementBase = {
    type: MType;
    children: Array<MRun> | Array<MText>;
    styleId: string | null;
    styleName: string | null;
};
export declare enum MVerticalAlignment {
    baseline = "baseline",
    superscript = "superscript",
    subscript = "subscript"
}
export declare type MRun = MElementBase & {
    isBold: boolean;
    isUnderline: boolean;
    isItalic: boolean;
    isStrikethrough: boolean;
    isSmallCaps: boolean;
    verticalAlignment: MVerticalAlignment;
    fontSize: number;
    fontColor: string;
    font: string;
};
export declare type MParagraph = MElementBase & {
    numbering: string | null;
    alignment: string | null;
    indent: {
        start: string | null;
        end: string | null;
        firstLine: string | null;
        hanging: string | null;
    };
};
