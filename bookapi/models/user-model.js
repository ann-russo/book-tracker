const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        index: true
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, 'Email is required'],
        maxlength: [128, 'Email can\'t be greater than 128 characters'],
        index: true
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [4, 'Username can\'t be smaller than 2 characters'],
        maxlength: [20, 'Username can\'t be greater than 64 characters']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    firstname: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    birthdate: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    prefLang: {
        type: String,
        required: false
    },
})

module.exports = mongoose.model('User', userSchema)