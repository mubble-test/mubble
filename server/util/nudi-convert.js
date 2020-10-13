"use strict";
/*------------------------------------------------------------------------------
   About      : Convert Nudi Text to Unicode
   
   Created on : Mon Jan 15 2018
   Author     : Christy George
   
   Copyright (c) 2018 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.NudiConvertor = void 0;
const baraha_mapping_1 = require("./baraha-mapping");
class NudiConvertor {
    static processText(rc, text) {
        const words = text.split(/ +/); // (' ')
        const op_words = [];
        let widx = 0;
        for (var w of words) {
            this.DEBUG && rc.isDebug() && rc.debug(rc.getName(this), 'Processing Word [' + (widx + 1) + ']:', w);
            const wo = this.processWord(rc, w);
            op_words.push(wo);
            widx++;
        }
        return { wordCount: widx, unicode: op_words.join(' ') };
    }
    static processWord(rc, word) {
        // Initiate and output Array
        let i = 0;
        const max_len = word.length;
        let op = [];
        while (i < max_len) {
            // For each letter in word, jump if data[0] is more than zero
            // If additional chars used in ASCII to improve readability,
            // which doesn't have any significant in Unicode
            if (word[i] in baraha_mapping_1.ignore_list) {
                i += 1;
                continue;
            }
            // Find the mapping data
            this.DEBUG && rc.isDebug() && rc.debug(rc.getName(this), 'Processing Mapping:', word, Buffer.from(word, 'binary').toString('hex'), op);
            const data = this.findMapping(rc, op, word, i);
            this.DEBUG && rc.isDebug() && rc.debug(rc.getName(this), 'Mapping:', op, i, '=>', data.op, data.n);
            // Add to final list
            op = data.op;
            // Jump if data[0]>0 which means found a match for more than
            // one letter combination
            i += (1 + data.n);
        }
        // Return processed
        return op.join('');
    }
    static findMapping(rc, op, txt, current_pos) {
        // Finds mapping in reverse order, For Example if input string
        // is abcde then itteration will be for abcde, abcd, abc, ab, a
        // Only when mapping available the index jumps, say if mapping availabale for ab
        // then subtract length of ab while processing next
        // Combination length, if length remaining is less than max len then
        // Consider length remaining as max length
        // remaining length = len(txt) - current_pos
        let max_len = 4;
        let remaining = txt.length - current_pos;
        if (remaining < 5)
            max_len = (remaining - 1);
        // Number of letters found mapping, will be returned to caller and
        // used to jump the index (Zero if one char found mapping)
        let n = 0;
        // Loop 4 to 0 or max to 0
        // Controller which checks direct mapping,
        // arkavattu, vattaksharagalu and broken cases
        this.DEBUG && rc.isDebug() && rc.debug(rc.getName(this), 'Processing Range:', 'MAXLEN=' + max_len, this.range(max_len, -1, -1), txt, '/', txt.substring(current_pos), op);
        const rangeArr = this.range(max_len, -1, -1);
        for (var i of rangeArr) {
            const substr_till = current_pos + i + 1;
            const t = txt.substring(current_pos, substr_till); // txt[current_pos:substr_till]
            this.DEBUG && rc.isDebug() && rc.debug(rc.getName(this), '===> Processing Range Value [' + i + ']:', op.length, 'OP:', op, 'CP=', current_pos, 'I=', i, substr_till, t, 'MAP=' + baraha_mapping_1.mapping[t], (baraha_mapping_1.mapping[t] ? this.stringToHex(baraha_mapping_1.mapping[t]) : 'N/F'));
            if (t in baraha_mapping_1.mapping) {
                const lastop = op[op.length - 1];
                if (this.DEBUG) {
                    rc.isDebug() && rc.debug(rc.getName(this), '===> \tFound Mapping [' + i + ']', t, baraha_mapping_1.mapping[t], op.length, !!(op.length), op[op.length - 1], lastop);
                    if (lastop)
                        rc.isDebug() && rc.debug(rc.getName(this), '===> \tLast Op Found', lastop, lastop.search(/\u0CCD$/));
                    else
                        rc.isDebug() && rc.debug(rc.getName(this), '===> \tLast Op Not Found');
                }
                // If prev char is halant and current char is not vattakshara?
                // then it must be seperated using ZWJ (Zero Width Joiner), so that it will not
                // mix with prev char. 
                // if (len(op) > 0 and re.search("್$", op[-1]) != None:
                const buffer = Buffer.from(baraha_mapping_1.mapping[t], 'binary');
                this.DEBUG && rc.isDebug() && rc.debug(rc.getName(this), 'Mapping:‍', baraha_mapping_1.mapping[t], buffer.toString('hex'), lastop);
                if (op.length > 0 && lastop.search(/್$/) != -1) { // lastop.search(/\u0CCD$/) != -1) {
                    this.DEBUG && rc.isDebug() && rc.debug(rc.getName(this), 'ZWJ Found:', baraha_mapping_1.mapping[t], buffer.toString('hex'), lastop);
                    op.push(this.ZWJ);
                }
                // Direct mapping case
                op.push(baraha_mapping_1.mapping[t]);
                // Update Jump by number
                n = i;
                // Break and return to caller since we found the mapping
                // for given input
                this.DEBUG && rc.isDebug() && rc.debug(rc.getName(this), 'Break!');
                break;
            }
            else if (i == 0) { // Try without processing till reaches to last char 
                op = op.join('').split('');
                this.DEBUG && rc.isDebug() && rc.debug(rc.getName(this), 'OP => 1:', op, t, 'arka:', (t in baraha_mapping_1.ascii_arkavattu), (t in baraha_mapping_1.vattaksharagalu), (t in baraha_mapping_1.broken_cases));
                // If Last in this batch
                if (t in baraha_mapping_1.ascii_arkavattu)
                    op = this.processArkavattu(rc, op, t); // Arkavattu
                else if (t in baraha_mapping_1.vattaksharagalu)
                    op = this.processVattakshara(rc, op, t); // # Vattakshara
                else if (t in baraha_mapping_1.broken_cases)
                    op = this.processBrokenCases(rc, op, t); // Broken cases
                else
                    op.push(t); // No match
                this.DEBUG && rc.isDebug() && rc.debug(rc.getName(this), 'OP => 2:', op);
            }
        }
        return { n, op };
    }
    static processVattakshara(rc, letters, t) {
        // Current char is t, which is ASCII code of vattakshara
        // Rearrangement of string needed, If prev char is dependent vowel
        // then it has to be moved after vattakshara
        // If no dependent vowel then it is "ಅ" kaara, Ex: ಕ, ಗ
        // Vattakshara shares same code as of base letter, but halant is added before
        // Ex: ತಿಮ್ಮಿ in ASCII: ತಿ + ಮಿ + ma_vattu
        // in Unicode: ತ + dependent vowel ಇ + ಮ + halant + ಮ + dependent vowel ಇ
        // If atleast one letter in letters, to find the last letter value
        const last_letter = (letters.length > 0) ? letters[letters.length - 1] : '';
        // If atleast two letters in letters, to find the second last letter value
        const second_last = (letters.length > 1) ? letters[letters.length - 2] : '';
        this.DEBUG && rc.isDebug() && rc.debug(rc.getName(this), 'Vattakshara', letters, t, '=', second_last, '/', last_letter, '=', baraha_mapping_1.ascii_arkavattu[t], '/', '್');
        const found = (baraha_mapping_1.dependent_vowels.indexOf(last_letter) >= 0);
        if (found) {
            this.DEBUG && rc.isDebug() && rc.debug(rc.getName(this), 'Found Dependent Vowel');
            // If last letter/prev letter to vattakshara is dependent vowel
            // add dependent vowel at the end, after halant + base letter(=vattakshara)
            letters[letters.length - 1] = "್";
            letters.push(baraha_mapping_1.vattaksharagalu[t]);
            letters.push(last_letter);
        }
        else {
            this.DEBUG && rc.isDebug() && rc.debug(rc.getName(this), 'Not Found Dependent Vowel');
            // If "ಅ" kaara, just append halant + base letter
            // No worry about rearranging
            letters.push("್");
            letters.push(baraha_mapping_1.vattaksharagalu[t]);
        }
        // Return converted
        return letters;
    }
    static processArkavattu(rc, letters, t) {
        // Example: ವರ್ಷ in ASCII ವ + ಷ + arkavattu
        // in Unicode ವ + ರ + halant + ಷ
        // If atleast one letter in letters, to find the last letter value    
        const last_letter = (letters.length > 0) ? letters[letters.length - 1] : '';
        // If atleast two letters in letters, to find the second last letter value        
        const second_last = (letters.length > 1) ? letters[letters.length - 2] : '';
        this.DEBUG && rc.isDebug() && rc.debug(rc.getName(this), 'Arkavattu', letters, t, '=', second_last, '/', last_letter, '=', baraha_mapping_1.ascii_arkavattu[t], '/', '್');
        // Rearrangement according to above example
        const found = (baraha_mapping_1.dependent_vowels.indexOf(last_letter) >= 0);
        if (found) {
            this.DEBUG && rc.isDebug() && rc.debug(rc.getName(this), 'Found Dependent Vowel');
            letters[letters.length - 2] = baraha_mapping_1.ascii_arkavattu[t];
            letters[letters.length - 1] = '್';
            letters.push(second_last);
            letters.push(last_letter);
        }
        else {
            this.DEBUG && rc.isDebug() && rc.debug(rc.getName(this), 'Not Found Dependent Vowel');
            letters[letters.length - 1] = baraha_mapping_1.ascii_arkavattu[t];
            letters.push("್");
            letters.push(last_letter);
        }
        // Return converted
        return letters;
    }
    static processBrokenCases(rc, letters, t) {
        // Since ASCII mapping are based on shapes some of the shapes
        // give trouble with direct conversion
        // Ex: ಕೀರ್ತಿ and ಕೇಳಿ In ASCII: deerga has same code in both but in
        // Unicode both are different, So if prev char is "ಇ" kaara then
        // behave differently and also with "ಎ" kaara
        // Look at the prev char and also current char t and decide on the single unicode
        // dependent vowel and substitute.
        // Note prev char + current char = new char (Except ಉ kaara, ಕು = ಕ + ಉ kaara)
        // since prev char is not dependent vowel
        // If atleast one letter in letters, to find the last letter value    
        const last_letter = (letters.length > 0) ? letters[letters.length - 1] : '';
        // Get dependent vowel mapping with respect to input "t"
        const broken_case_mapping = baraha_mapping_1.broken_cases[t]["mapping"];
        if (last_letter in broken_case_mapping) {
            // If mapping exists
            letters[letters.length - 1] = broken_case_mapping[last_letter];
        }
        else {
            // For ಉ kaara, no mapping, substitute the value
            letters.push(baraha_mapping_1.broken_cases[t]["value"]);
        }
        // Return the converted
        return letters;
    }
    static range(start, stop, step) {
        if (typeof stop == 'undefined') {
            // one param defined
            stop = start;
            start = 0;
        }
        if (typeof step == 'undefined') {
            step = 1;
        }
        if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
            return [];
        }
        var result = [];
        for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
            result.push(i);
        }
        return result;
    }
    static stringToHex(tmp) {
        var str = '', i = 0, tmp_len = tmp.length, c;
        for (; i < tmp_len; i += 1) {
            c = tmp.charCodeAt(i);
            str += c.toString(16) + ' ';
        }
        return str;
    }
}
exports.NudiConvertor = NudiConvertor;
NudiConvertor.DEBUG = false;
NudiConvertor.ZWJ = '‍'; // <U+200D> = Zero Width Joiner
//# sourceMappingURL=nudi-convert.js.map