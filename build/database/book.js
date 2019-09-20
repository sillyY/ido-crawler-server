"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const index_1 = require("./index");
const log_1 = require("../utils/log");
const log = new log_1.default();
log.withTag('Stat-Database-Service');
const BookSchema = new mongoose.Schema({
    name: String,
    link: String,
    major: String,
    chapters: [mongoose.Schema.Types.Mixed]
}, {
    id: true,
    timestamps: {
        createdAt: 'create_time',
        updatedAt: 'update_time'
    }
});
class Book extends index_1.default {
    constructor() {
        super();
        this.initDatabase();
    }
    setBook(data) {
        const Book = mongoose.model('books', BookSchema);
        Book.findOneAndUpdate({
            name: data.name
        }, data, { upsert: true }, function (err, docs) {
            if (err) {
                log.error(err);
            }
            log.success(`<${data.name}>保存成功`);
        });
    }
}
exports.default = Book;
//# sourceMappingURL=book.js.map