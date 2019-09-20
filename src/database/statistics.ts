import * as mongoose from 'mongoose'
import * as moment from 'moment'

import Database from './index'
import Log from '../utils/log'

const log = new Log()
log.withTag('Stat-Database-Service')

const statisticsSchema = new mongoose.Schema(
  {
    major: String,
    totals: Number
  }
)

class Stat extends Database {
  constructor() {
    super()
    this.initDatabase()
  }

  save(data) {
    const Statistics = mongoose.model('statistics', statisticsSchema)
    Statistics.find({},function(mst,msg){
        var room = new Statistics(data)
        room.save();
    })
    // Statistics.findOneAndUpdate(
    //   {
    //     major: data.major
    //   },
    //   data,
    //   function(err, docs) {
    //     if (err) {
    //       log.error(err)
    //     }
    //     log.info(docs)
    //     log.success(`<${data.major}>保存成功`)
    //   }
    // )
  }
}

export default Stat
