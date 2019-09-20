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
/// <reference path="../typings/biquge.d.ts" />
const cheerio = require("cheerio");
const request_1 = require("../utils/request");
const log_1 = require("../utils/log");
const utils_1 = require("../utils");
const statistics_1 = require("../database/statistics");
const log = new log_1.default();
log.withTag('Biquge-Service');
const BIQUGE_URL = 'http://www.xbiquge.la';
class Biquge {
    constructor() {
        this.majors = [];
        this.request = new request_1.default(BIQUGE_URL);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getStatistics();
            const stat = new statistics_1.default();
            // 获取目录
            let promises = this.majors.map(v => stat.save({ major: v.major, totals: v.books.length }));
            yield Promise.all(promises);
            // 
        });
    }
    fetch(url, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let [res, err] = yield utils_1.errorCapture(this.request.fetch.bind(this.request), url, ...args);
            if (err) {
                log.error(err);
            }
            return res;
        });
    }
    getStatistics() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.fetch('/xiaoshuodaquan/');
            const $ = cheerio.load(res), novellist = $('.novellist');
            let arr = [], i = 0, len = novellist.length;
            for (; i < len; i++) {
                const children = novellist[i].children;
                let opts = {
                    major: '',
                    books: []
                };
                $(children).each(function (i, element) {
                    if (element.name === 'h2') {
                        opts.major = $(this).text();
                    }
                    else if (element.name == 'ul') {
                        const books = element.children;
                        $(books).each(function (idx, ele) {
                            const text = $(this).text(), link = $(this)
                                .find('a')
                                .attr('href');
                            if (text && text !== '\n\n') {
                                opts.books.push({
                                    name: $(this).text(),
                                    link
                                });
                            }
                        });
                    }
                    if (opts.major && opts.books.length) {
                        arr.push(opts);
                    }
                });
            }
            // 拆分major
            for (let value of arr) {
                let major = value.major.replace(/大全列表/g, '').replace(/小说/g, '');
                let stats = major.split('、');
                stats.map(v => this.majors.push({ major: v, books: value.books }));
            }
        });
    }
    getChapters(link) {
        return __awaiter(this, void 0, void 0, function* () {
            let arr = [];
            const res = yield this.fetch(link);
            const $ = cheerio.load(res), chapters = $('#list dl').children();
            $(chapters).each(function (index, element) {
                const name = $(this).text(), link = $(this)
                    .find('a')
                    .attr('href');
                arr.push({
                    name,
                    link: BIQUGE_URL + link
                });
            });
            return arr;
        });
    }
    getContent(link) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.fetch(link);
            const $ = cheerio.load(res), content = $('#content').text();
            return content;
        });
    }
}
exports.default = new Biquge();
//# sourceMappingURL=biquge.js.map