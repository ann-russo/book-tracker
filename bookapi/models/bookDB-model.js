const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    id: {
        type: Number,
        maxlength: [128, 'Email can\'t be greater than 128 characters'],
        unique: false,
        index: true
    },
    email: {
        type: String,
        unique: false,
        required: true
    },
    title: {
        type: String,
        unique: false,
        required: true
    },
    status: { //1,2,3,4 = currently reading, plan to read, finsihed, cancelled
        type: String,
        unique: false,
        required: false
    },
    author: {
        type: String,
        unique: false,
        required: false
    },
    year: {
        type: String,
        unique: false,
        required: false
    },
    description: {
        type: String,
        unique: false,
        required: false
    },
    genre: {
        type: String,
        unique: false,
        required: false
    },
    isbn: {
        type: String,
        unique: false,
        required: false
    },
    noofpages: {
        type: String,
        unique: false,
        required: false
    },
    cover: {
        type: String,
        unique: false,
        required: false
    },
    public: {
        type: String,
        unique: false,
        required: false
    }
})

module.exports = mongoose.model('BooksUser', bookSchema)