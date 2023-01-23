const model = require("../models/book-model");
const bookrequest = require("../models/book-requests");
const request = require("request");
const {response} = require("express");
const fetch = require('node-fetch');
const bcrypt = require("bcryptjs");
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");


//TODO move functions out from model into controller....
class UserController{

    async register(req, res){
        const salt = await bcrypt.genSalt(10)
        console.log("passwort ist.;..", req.body.password)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        let userInDb = await User.findOne({email: req.body.email})


        let userid = 0; // 0 if db is empty
        try{
            let maxUserID = await User.findOne().sort({"id" : -1 })
            userid =  maxUserID.id + 1;
        } catch(e){
            userid = 0; //no user found
        }

        console.log("Adding new User with id..: ", userid);
        if (!userInDb){
            console.log("user not known add to DB");
            try{
                const user = new User({
                    id: userid,
                    username: req.body.username,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    birthdate: req.body.birthdate,
                    country: req.body.country,
                    prefLang: req.body.prefLang,
                    email: req.body.email,
                    password: hashedPassword,
                })
                const result = await user.save()
                const {password, ...data} = await result.toJSON()
                res.send(data)
            } catch (e){
                let response = {
                    resultcode: 'ERROR',
                    resulttext: 'Error creating User - maybe youre missing some Parameters?'
                };
                res.send(response)
            }

        } else{
            let response = {
                resultcode: 'ERROR',
                resulttext: 'Email already known'
            };
            res.send(response)
        }
    }


    async login(req, res){
        //res.headers.append('Access-Control-Allow-Origin', 'http://localhost:3080'); //TODO add headers again, excluded them as login was not possible..
        //res.headers.append('Access-Control-Allow-Credentials', 'true');

        const user = await User.findOne({email: req.body.email})

        if (!user) {
        return res.status(404).send({
                                        resultcode: 'ERROR',
                                        resulttext: 'User not found.'
                                    })
        }

        if (!await bcrypt.compare(req.body.password, user.password)) {
            return res.status(400).send({
                resultcode: 'ERROR',
                resulttext: 'Invalid Credentials'
            })
        }

        const token = jwt.sign({_id: user._id}, "secret")
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        res.send({
            resultcode: 'OK',
            resulttext: 'Login successful'
        })
    }


    async userLoggedIn(req,res){
        try {
            const cookie = req.cookies['jwt']

            const claims = jwt.verify(cookie, 'secret')

            if (!claims) {
                return res.status(401).send({
                    resultcode: 'ERROR',
                    resulttext: 'User not authenticated.'
                })
            }

            const user = await User.findOne({_id: claims._id})

            const {password, ...data} = await user.toJSON()

            res.send(data)
            } catch (e) {
                return res.status(401).send({
                    resultcode: 'ERROR',
                    resulttext: 'User not authenticated.'
                })
            }
        }



    async logoutUser(req, res){
        res.cookie('jwt', '', {maxAge: 0})

        res.send({
            resultcode: 'OK',
            resulttext: 'User successfully logged out.'
        })
    }

}

module.exports = new UserController();