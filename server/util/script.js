"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ask = void 0;
const readline = require("readline");
function ask(msg) {
    return new Promise(function (resolve) {
        function innerAsk() {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question(msg + ' ', function (answer) {
                rl.close();
                answer = answer.trim();
                if (!answer)
                    return innerAsk();
                resolve(answer);
            });
        }
        innerAsk();
    });
}
exports.ask = ask;
//# sourceMappingURL=script.js.map