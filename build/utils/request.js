"use strict";
/// <reference path="../typings/ajax.d.ts" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const qs = require("qs");
const index_1 = require("./index");
class Request {
    constructor(baseURL) {
        this.baseURL = '';
        this._axios = axios_1.default.create({
            baseURL,
            timeout: 60000,
            headers: {
                'content-type': 'application/json',
            },
        });
    }
    fetch(url = '', data = {}, type = 'get', origin = false, sort = true) {
        let options = null;
        data = sort ? index_1.optionSort(data) : data;
        type = type.toLowerCase();
        if (type === 'get') {
            options = {
                params: data
            };
        }
        else if (type === 'post') {
            options = qs.stringify(data, { arrayFormat: 'repeat' });
        }
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let res = yield this._axios[type](url, options);
                resolve(res.data);
            }
            catch (err) {
                reject(err);
            }
        }));
    }
    get(url, data, sort = true) {
        data = sort ? index_1.optionSort(data) : data;
        let options = {
            data
        };
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let res = yield this._axios.get(url, options);
            }
            catch (e) {
                reject(e);
            }
        }));
    }
    post(url, data, sort = true) {
        data = sort ? index_1.optionSort(data) : data;
        let options = qs.stringify(data, { arrayFormat: 'repeat' });
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let res = yield this._axios.post(url, options);
            }
            catch (e) {
                reject(e);
            }
        }));
    }
}
exports.default = Request;
//# sourceMappingURL=request.js.map