import { RunContextServer } from '../rc-server';
export declare type TrieValue = any;
export declare type TrieResult = {
    wrd: string;
    val: TrieValue;
} | undefined;
export declare class TrieNode {
    character: string;
    value: TrieResult;
    children: Map<string, TrieNode>;
    constructor(key?: string);
}
export declare class Trie {
    private root;
    private addCount;
    private dupCount;
    constructor();
    stats(rc: RunContextServer): {
        addCount: number;
        dupCount: number;
    };
    insert(rc: RunContextServer, word: string, value: TrieValue): boolean;
    searchWords(rc: RunContextServer, words: Array<string>): TrieValue;
    searchLeading(rc: RunContextServer, string: string): TrieValue;
    private searchLongest;
    search(rc: RunContextServer, word: string): TrieValue;
    private getNode;
}
