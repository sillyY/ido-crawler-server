import * as mongoose from 'mongoose'

import Database from './index'
import Log from '../utils/log'

const log = new Log()
log.withTag('Stat-Database-Service')

const BookSchema = new mongoose.Schema(
  {
    name: String,
    link: String,
    major: String,
    chapters: [mongoose.Schema.Types.Mixed]
  },
  {
    id: true,
    timestamps: {
      createdAt: 'create_time',
      updatedAt: 'update_time'
    }
  }
)

class Book extends Database {
  constructor() {
    super()
    this.initDatabase()
  }

  setBook(data) {
    const Book = mongoose.model('books', BookSchema)
    Book.findOneAndUpdate(
      {
        name: data.name
      },
      data,
      { upsert: true },
      function(err, docs) {
        if (err) {
          log.error(err)
        }
        log.success(`<${data.name}>保存成功`)
      }
    )
  }
}
export default Book
