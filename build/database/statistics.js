"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const index_1 = require("./index");
const log_1 = require("../utils/log");
const log = new log_1.default();
log.withTag('Stat-Database-Service');
const statisticsSchema = new mongoose.Schema({
    major: String,
    totals: Number
});
class Stat extends index_1.default {
    constructor() {
        super();
        this.initDatabase();
    }
    save(data) {
        const Statistics = mongoose.model("statistics", statisticsSchema);
        let u = new Statistics(data);
        u.save(function (err) {
            if (err) {
                log.error(err);
            }
            log.success('保存成功');
        });
    }
}
exports.default = Stat;
//# sourceMappingURL=statistics.js.map