import * as mongoose from 'mongoose'
import * as moment from 'moment'

import Database from './index'
import Log from '../utils/log'

const log = new Log()
log.withTag('Stat-Database-Service')

const BookSchema = new mongoose.Schema({
    id: Number,
    name: String,
    link: String
  }),
  MajorSchema = new mongoose.Schema({
    id: Number,
    major: String,
    books: [BookSchema],
    totals: Number
  }),
  AllBookSchema = new mongoose.Schema({
    major: String,
    name: String,
    link: String
  })

class Major extends Database {
  constructor() {
    super()
    this.initDatabase()
  }

  setMajor() {
    const Allbook = mongoose.model('allbooks', AllBookSchema)
    const MajorModel = mongoose.model('major', MajorSchema)

    log.info('开始查询书籍表')
    Allbook.find({}, (err, docs: any) => {
      if (err) {
        log.error(`查询allbooks表Error: ${err}`)
      }
      let data = [],
        i = 0,
        len = docs.length

      for (; i < len; i++) {
        let value = docs[i],
          index = data.findIndex((v, i) => {
            return v.major === value.major
          })
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
          })
        } else {
          let current = data[index].books
          data[index].books = current.concat({
            id: current.length + 1,
            name: value.name,
            link: value.link
          })
          data[index].totals = current.length + 1
        }

        
      }
      MajorModel.insertMany(data, function(err, docs) {
        if (err) console.error(err)
        log.success('保存完成')
      })
    })
  }
}

export default Major
