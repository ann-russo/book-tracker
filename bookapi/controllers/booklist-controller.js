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

        const cookie = req.cookies['jwt']
        const claims = jwt.verify(cookie, 'secret')
        const user = await User.findOne({_id: claims._id})
        let bookInDB = await booklist.findOne({title: req.body.title, id: user.id})

        if(!bookInDB){
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
                language: req.body.language
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
                resulttext: 'Book already exists in DB'
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
        let findVariable = {}
        findVariable.id = user.id;
        if(req.body.status){findVariable.status = req.body.status};
        if(req.body.public){findVariable.public = req.body.public};
        let result = await booklist.find(findVariable)
        res.send(JSON.stringify(result))
    }

    async deleteBook(req, res){
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
        //console.log("affected User: ", user, "userid" , user.id)

        try{
            const result = await booklist.deleteOne({_id: req.body._id})
            if (result.deletedCount === 1) {
                let response = {
                    resultcode: 'OK',
                    resulttext: 'Book deleted successfully'
                };
                res.send(response)
            }else{
                let response = {
                    resultcode: 'ERROR',
                    resulttext: 'No Book matching _id'
                };
                res.send(response)
            }

        }catch (e) {
            let response = {
                resultcode: 'ERROR',
                resulttext: 'Error Deleting Book'
            };
            res.send(response)
        }

    }

    async updatebook(req,res){
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
        let bookInDB = await booklist.findOne({title: req.body.title, id: user.id})


        if(bookInDB){
            const book = {
                status: req.body.status,
                author: req.body.author,
                year: req.body.year,
                description: req.body.description,
                genre: req.body.genre,
                isbn: req.body.isbn,
                noofpages: req.body.noofpages,
                cover: req.body.cover,
                public: req.body.public,
                language: req.body.language
            }

            try{
                const result = await booklist.findOneAndUpdate({title: req.body.title, id: user.id}, book)
                const {password, ...data} = await result.toJSON()
                res.send({
                    resultcode: 'OK',
                    resulttext: 'Successfully Updated Book information',
                })
            }catch (e) {
                console.log(e)
                res.send({
                    resultcode: 'ERROR',
                    resulttext: 'ERROR updating Book Data',
                })
            }

        } else {
            let response = {
                resultcode: 'ERROR',
                resulttext: 'Book not found in DB'
            };
            res.send(response)
        }

    }

}

module.exports = new booklistController();