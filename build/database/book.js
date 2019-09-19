"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const index_1 = require("./index");
const BookSchema = new mongoose.Schema({
    name: String,
    major: String,
    chapters: [mongoose.Schema.Types.Mixed],
    create_time: String
});
class Book extends index_1.default {
    constructor() {
        super();
        this.initDatabase();
    }
    setBook() {
    }
}
//# sourceMappingURL=book.js.map