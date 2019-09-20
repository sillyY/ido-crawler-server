import * as mongoose from 'mongoose'
import * as moment from 'moment'

import Database from './index'
import Log from '../utils/log'

const log = new Log()
log.withTag('Stat-Database-Service')

const StatisticsSchema = new mongoose.Schema(
  {
    major: String,
    totals: Number
  },
  {
    id: true,
    timestamps: {
      createdAt: 'create_time',
      updatedAt: 'update_time'
    }
  }
)

class Stat extends Database {
  constructor() {
    super()
    this.initDatabase()
  }

  setStat(data) {
    const Statistics = mongoose.model('statistics', StatisticsSchema)
    Statistics.findOneAndUpdate(
      {
        major: data.major
      },
      data,
      {upsert:true},
      function(err, docs) {
        if (err) {
          log.error(err)
        }
        log.info(docs)
        log.success(`<${data.major}>保存成功`)
      }
    )
  }
}

export default  Stat
