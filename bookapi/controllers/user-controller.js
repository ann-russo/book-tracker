const model = require("../models/book-model");
const bookrequest = require("../models/book-requests");
const request = require("request");
const {response} = require("express");
const fetch = require('node-fetch');
const bcrypt = require("bcryptjs");
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')
//const {first} = require("rxjs");


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

        if(req.body.username){

        }else{

        }
        let username = req.body.username;
        let firstName = req.body.firstname;
        let lastName = req.body.lastname;
        let birthdate = req.body.birthdate;
        let country = req.body.country;
        let prefLang = req.body.preflang;
        let email = req.body.email;


        console.log("Adding new User with id..: ", userid);
        if (!userInDb){
            console.log("user not known add to DB");
            try{
                const user = new User({
                    id: userid,
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    birthdate: birthdate,
                    country: country,
                    prefLang: prefLang,
                    email: email,
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

            res.send({
                resultcode: 'OK',
                resulttext: 'User is logged in'
            })

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

    async updateUser(req, res){
        console.log("updating user....")

        const cookie = req.cookies['jwt']
        const claims = jwt.verify(cookie, 'secret')

        if (!claims) {
            return res.status(401).send({
                resultcode: 'ERROR',
                resulttext: 'User not authenticated.'
            })
        }

        const user = await User.findOne({_id: claims._id})
        console.log("user inDB...", user.id)


        if(req.body.password){ //updating password only when update is requested by user
            const salt = await bcrypt.genSalt(10)

            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            try{

                await User.collection.findOneAndUpdate({id: user.id}, {$set: { password: hashedPassword }})
            }catch(e){}
           console.log("error updating password..")
        }

        try{
            await User.collection.findOneAndUpdate({id: user.id}, {$set: { username: req.body.username, firstname: req.body.firstname, lastname: req.body.lastname, birthdate: req.body.birthdate, country: req.body.country, prefLang: req.body.preflang, email: req.body.email }})
            let response = {
                resultcode: 'OK',
                resulttext: 'User updated successfully'
            };
            res.send(response)
        } catch (e){
            let response = {
                resultcode: 'ERROR',
                resulttext: 'Error updating User - maybe youre missing some Parameters?'
            };
            res.send(response)
        }
    }
}

module.exports = new UserController();