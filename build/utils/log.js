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
    time() {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    }
    success(msg) {
        log(`[✔] ${chalk_1.default.whiteBright(this.time())} ${chalk_1.default.green(msg !== null && typeof msg === 'object' ? JSON.stringify(msg) : msg)}`);
    }
    error(e) {
        log(`[✖] ${chalk_1.default.whiteBright(this.time())} ${chalk_1.default.red(e !== null && typeof e === 'object' ? JSON.stringify(e) : e)}`);
    }
    fatal(e) {
        log(`[☠] ${chalk_1.default.whiteBright(this.time())} ${chalk_1.default.red.bold(e !== null && typeof e === 'object' ? JSON.stringify(e) : e)}`);
    }
    warning(msg) {
        log(`[⚠] ${chalk_1.default.whiteBright(this.time())} ${chalk_1.default.yellow(msg !== null && typeof msg === 'object' ? JSON.stringify(msg) : msg)}`);
    }
    info(msg) {
        log(`[ℹ] ${chalk_1.default.whiteBright(this.time())} ${chalk_1.default.blue(msg !== null && typeof msg === 'object' ? JSON.stringify(msg) : msg)}`);
    }
}
exports.default = new Log();
//# sourceMappingURL=log.js.map