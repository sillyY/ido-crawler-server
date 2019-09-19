"use strict";
/// <reference path="../../typings/zhui.d.ts" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("../../utils/request");
const utils_1 = require("../../utils");
const log_1 = require("../../utils/log");
class Zhui {
    constructor() {
        this.request = new request_1.default('http://api.zhuishushenqi.com');
    }
    fetch(url, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let [res, err] = yield utils_1.errorCapture(this.request.fetch.bind(this.request), url, ...args);
            if (err) {
                log_1.default.error(err);
            }
            return res;
        });
    }
    getStatistics() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.fetch('/cats/lv2/statistics');
        });
    }
    getCategories(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.fetch('/book/by-categories', params);
        });
    }
    getCats() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.fetch('/cats/lv2');
        });
    }
    getSource(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.fetch('/toc', { view: 'summary', book: id });
        });
    }
    test() {
        return __awaiter(this, void 0, void 0, function* () {
            var d = yield this.getSource('53e56ee335f79bb626a496c9');
            log_1.default.success(d);
        });
    }
}
exports.default = Zhui;
//# sourceMappingURL=index.js.map