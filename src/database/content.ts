import * as mongoose from 'mongoose';

import Database  from './index'

const ContentSchema = new mongoose.Schema({
    name: String,
    chapter: String,
    create_time: String,
    content: String
})
