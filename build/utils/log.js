"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const chalk_1 = require("chalk");
const log = console.log;
const _toString = Object.prototype.toString;
// 是否是有效对象
function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}
exports.isObject = isObject;
class Log {
    constructor() {
        this.tip = '';
    }
    withTag(tip) {
        this.tip = tip;
    }
    time() {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    }
    success(msg) {
        let tip = this.tip ? ` [${this.tip}] ` : ' ';
        log(`[✔]${tip}${chalk_1.default.whiteBright(this.time())} ${chalk_1.default.green(msg !== null && typeof msg === 'object' ? JSON.stringify(msg) : msg)}`);
    }
    error(e) {
        let tip = this.tip ? ` [${this.tip}] ` : ' ';
        log(`[✖]${tip}${chalk_1.default.whiteBright(this.time())} ${chalk_1.default.red(e !== null && typeof e === 'object' ? JSON.stringify(e) : e)}`);
    }
    fatal(e) {
        let tip = this.tip ? ` [${this.tip}] ` : ' ';
        log(`[☠]${tip}${chalk_1.default.whiteBright(this.time())} ${chalk_1.default.red.bold(e !== null && typeof e === 'object' ? JSON.stringify(e) : e)}`);
    }
    warning(msg) {
        let tip = this.tip ? ` [${this.tip}] ` : ' ';
        log(`[⚠]${tip}${chalk_1.default.whiteBright(this.time())} ${chalk_1.default.yellow(msg !== null && typeof msg === 'object' ? JSON.stringify(msg) : msg)}`);
    }
    info(msg) {
        let tip = this.tip ? ` [${this.tip}] ` : ' ';
        log(`[ℹ]${tip}${chalk_1.default.whiteBright(this.time())} ${chalk_1.default.blue(msg !== null && typeof msg === 'object' ? JSON.stringify(msg) : msg)}`);
    }
}
exports.default = Log;
//# sourceMappingURL=log.js.map