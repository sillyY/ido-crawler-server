import * as mongoose from 'mongoose';

import Database  from './index'
import Log from '../utils/log'

const log = new Log()
log.withTag('Stat-Database-Service')

const statisticsSchema = new mongoose.Schema({
    major: String,
    majorId: Number,
    totals: Number
})

class Stat extends Database {
    constructor(){
        super()
        this.initDatabase()
    }

    save(data) {
        const Statistics = mongoose.model("statistics", statisticsSchema)
        let u = new Statistics(data)
        u.save(function(err) {
            if(err) {
                log.error(err)
            }

            log.success('保存成功')
        })
    }
}

export default Stat