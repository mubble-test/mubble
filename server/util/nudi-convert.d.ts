import { RunContextServer } from '../rc-server';
export declare type NudiUnicodeText = {
    wordCount: number;
    unicode: string;
};
export declare class NudiConvertor {
    private static DEBUG;
    private static ZWJ;
    static processText(rc: RunContextServer, text: string): NudiUnicodeText;
    private static processWord;
    private static findMapping;
    private static processVattakshara;
    private static processArkavattu;
    private static processBrokenCases;
    private static range;
    private static stringToHex;
}
