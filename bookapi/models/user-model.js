const mongoose = require('mongoose')
const {Int32} = require("mongodb");

//TODO add unique id or use email!
const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        maxlength: [128, 'Email can\'t be greater than 128 characters'],
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
        minlength: [2, 'Name can\'t be smaller than 2 characters'],
        maxlength: [64, 'Name can\'t be greater than 64 characters']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    birthdate: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: false,
        minlength: [2, 'Name can\'t be smaller than 2 characters'],
        maxlength: [64, 'Name can\'t be greater than 64 characters']
    },
    lastName: {
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