"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const index_1 = require("./index");
const log_1 = require("../utils/log");
const log = new log_1.default();
log.withTag('Stat-Database-Service');
const BookSchema = new mongoose.Schema({
    id: Number,
    name: String,
    link: String
}), MajorSchema = new mongoose.Schema({
    id: Number,
    major: String,
    books: [BookSchema],
    totals: Number
}), AllBookSchema = new mongoose.Schema({
    major: String,
    name: String,
    link: String
});
class Major extends index_1.default {
    constructor() {
        super();
        this.initDatabase();
    }
    setMajor() {
        const Allbook = mongoose.model('allbooks', AllBookSchema);
        const MajorModel = mongoose.model('major', MajorSchema);
        log.info('开始查询书籍表');
        Allbook.find({}, (err, docs) => {
            if (err) {
                log.error(`查询allbooks表Error: ${err}`);
            }
            let data = [], i = 0, len = docs.length;
            for (; i < len; i++) {
                let value = docs[i], index = data.findIndex((v, i) => {
                    return v.major === value.major;
                });
                if (index === -1) {
                    data.push({
                        id: data.length + 1,
                        major: value.major,
                        books: [].concat({
                            id: 1,
                            name: value.name,
                            link: value.link
                        }),
                        totals: 1
                    });
                }
                else {
                    let current = data[index].books;
                    data[index].books = current.concat({
                        id: current.length + 1,
                        name: value.name,
                        link: value.link
                    });
                    data[index].totals = current.length + 1;
                }
            }
            MajorModel.insertMany(data, function (err, docs) {
                if (err)
                    console.error(err);
                log.success('保存完成');
            });
        });
    }
}
exports.default = Major;
//# sourceMappingURL=major.js.map