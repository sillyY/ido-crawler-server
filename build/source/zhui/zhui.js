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
const request_1 = require("../../utils/request");
const index_1 = require("../../utils/index");
class Zhui {
    constructor() {
        this.request = new request_1.default('api.zhuishushenqi.com');
        this.getStatistics();
    }
    getStatistics() {
        return __awaiter(this, void 0, void 0, function* () {
            let [res, err] = yield index_1.errorCapture(this.request.fetch, '/cats/lv2/statistics');
            console.log(res);
        });
    }
}
