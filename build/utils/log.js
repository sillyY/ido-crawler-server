"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const chalk_1 = require("chalk");
const log = console.log;
class Log {
    time() {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    }
    success(msg) {
        log(`[✔] ${chalk_1.default.whiteBright(this.time())} ${chalk_1.default.green(msg)}`);
    }
    error(e) {
        log(`[✖] ${chalk_1.default.whiteBright(this.time())} ${chalk_1.default.red(e)}`);
    }
    fatal(e) {
        log(`[☠] ${chalk_1.default.whiteBright(this.time())} ${chalk_1.default.red.bold(e)}`);
    }
    warning(msg) {
        log(`[⚠] ${chalk_1.default.whiteBright(this.time())} ${chalk_1.default.yellow(msg)}`);
    }
    info(msg) {
        log(`[ℹ] ${chalk_1.default.whiteBright(this.time())} ${chalk_1.default.blue(msg)}`);
    }
}
exports.default = new Log();
//# sourceMappingURL=log.js.map