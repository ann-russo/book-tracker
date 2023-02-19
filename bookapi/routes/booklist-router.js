const { Router } = require ('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user-model')
const booklist = require('../models/bookDB-model')
const bookController = require("../controllers/booklist-controller");
const routes = Router();


routes.post('/addbook', bookController.addBookToDB)
routes.get('/findbooks', bookController.findbooks)
routes.delete('/deletebook', bookController.deleteBook)
routes.patch('/updatebook', bookController.updatebook)

//TODO add functionality for displaying collection of own books, filtered by the different types of list
//TODO move to controller instead of routes

module.exports = routes;