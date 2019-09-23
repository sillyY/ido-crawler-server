"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const log_1 = require("../utils/log");
const config_1 = require("../utils/config");
const utils_1 = require("../utils");
const log = new log_1.default();
log.withTag('Database-Service');
class Database {
    initDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            let [res, err] = yield utils_1.errorCapture(this.connect);
            if (err) {
                log.error(err);
            }
        });
    }
    connect() {
        return new Promise((resolve, reject) => {
            const db = mongoose.connect(`mongodb://${config_1.DATABASE.root}:${config_1.DATABASE.password}@${config_1.DATABASE.server}:${config_1.DATABASE.port}/${config_1.DATABASE.db}`, { useUnifiedTopology: true, useNewUrlParser: true, keepAlive: true }, err => {
                if (err) {
                    reject(err);
                }
                else {
                    log.success('链接数据库成功');
                    resolve();
                }
            });
        });
    }
}
exports.default = Database;
//# sourceMappingURL=index.js.map