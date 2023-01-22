const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        unique: true,
        required: true
    },
    status: { //1,2,3,4 = currently reading, plan to read, finsihed, cancelled
        type: String,
        unique: true,
        required: false
    },
    author: {
        type: String,
        unique: true,
        required: false
    },
    year: {
        type: String,
        unique: true,
        required: false
    },
    description: {
        type: String,
        unique: true,
        required: false
    },
    genre: {
        type: String,
        unique: true,
        required: false
    },
    isbn: {
        type: String,
        unique: true,
        required: false
    },
    noofpages: {
        type: String,
        unique: true,
        required: false
    },
    cover: {
        type: String,
        unique: true,
        required: false
    },
    public: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('BooksUser', bookSchema)