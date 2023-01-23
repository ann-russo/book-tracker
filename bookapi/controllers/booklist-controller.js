const { Router } = require ('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user-model')
const booklist = require('../models/bookDB-model')


class booklistController{

    async addBookToDB(req, res){
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

            try{
                const result = await book.save();
                const {password, ...data} = await result.toJSON()
                //res.send(data)
                res.send({
                    resultcode: 'OK',
                    resulttext: 'Added book to DB',
                })
            }catch (e) {
                console.log(e)
                res.send({
                    resultcode: 'ERROR',
                    resulttext: 'ERROR adding Book to DB',
                })
            }
        } else {
            let response = {
                resultcode: 'ERROR',
                resulttext: 'Book already exists in DB' //TODO change verification to book can be added multiple times for different users
            };
            res.send(response)
        }
    }

    async findbooks(req, res){
        //user authenticated?
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

        const cookie = req.cookies['jwt']
        const claims = jwt.verify(cookie, 'secret')
        const user = await User.findOne({_id: claims._id})
        console.log("affected User: ", user, "userid" , user.id)
        let findVariable = {}
        findVariable.id = user.id;
        if(req.body.status){findVariable.status = req.body.status};
        if(req.body.public){findVariable.public = req.body.public};
        let result = await booklist.find(findVariable)
        console.log(result)
        res.send(JSON.stringify(result))
    }
}


module.exports = new booklistController();