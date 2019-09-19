import * as mongoose from 'mongoose';

import Database  from './index'

const BookSchema = new mongoose.Schema({
    name: String,
    major: String,
    chapters: [mongoose.Schema.Types.Mixed],
    create_time: String
})

class Book extends Database {
    constructor(){
        super()
        this.initDatabase()
    }

    setBook() {
        
    }
}