const { Router } = require ('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user-model')
const booklist = require('../models/bookDB-model')
const routes = Router();


routes.post('/addbook', async (req, res) => {

    try {
        const cookie = req.cookies['jwt']
        const claims = jwt.verify(cookie, 'secret')

        if (!claims) {
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }
    } catch (e) {
        return res.status(401).send({
            message: 'unauthenticated'
        })
    }

    let bookInDB = await booklist.findOne({title: req.body.title})

    if(!bookInDB){
        const cookie = req.cookies['jwt']
        const claims = jwt.verify(cookie, 'secret')
        const user = await User.findOne({_id: claims._id})

        const book = new booklist({
            id: user.id,
            email: user.email,
            title: req.body.title,
            status: req.body.status,
            author: req.body.author,
            year: req.body.year,
            description: req.body.description,
            genre: req.body.genre,
            isbn: req.body.isbn,
            noofpages: req.body.noofpages,
            cover: req.body.cover,
            public: req.body.public,
        })

        const result = await book.save();
        const {password, ...data} = await result.toJSON()
        res.send(data)
    } else {
        let response = {
            resultcode: 'ERROR',
            resulttext: 'Book already exists in DB'
        };
        res.send(response)
    }
})

//TODO add functionality for displaying collection of own books, filtered by the different types of list
//TODO move to controller instead of routes

module.exports = routes;