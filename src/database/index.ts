import * as mongoose from 'mongoose';
import Log from '../utils/log'
import { DATABASE } from '../utils/config'
import {errorCapture} from '../utils'

const log = new Log()
log.withTag('Database-Service')

class Database {
    async initDatabase() {
        let [res, err] = await errorCapture(this.connect)
        if(err) {
            log.error(err)
        }
    }
    connect() {
        return new Promise((resolve, reject) => {
            const db = mongoose.connect(`mongodb://${DATABASE.root}:${DATABASE.password}@${DATABASE.server}:${DATABASE.port}/${DATABASE.db}`, { useNewUrlParser: true }, err => {
                if (err) {
                  reject(err)
                } else {
                  log.success('链接数据库成功')
                  resolve()
                }
              })
        })    
    }

}

export default Database