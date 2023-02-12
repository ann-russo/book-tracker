const bcrypt = require("bcryptjs");
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");

class UserController {

    async register(req, res) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        let userInDb = await User.findOne({email: req.body.email})
        let userid = 0; // 0 if db is empty
        try {
            let maxUserID = await User.findOne().sort({"id": -1})
            userid = maxUserID.id + 1;
        } catch (e) {
            userid = 0; //no user found
        }

        let email = req.body.email;
        let username = req.body.username;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let birthdate = req.body.birthdate;
        let country = req.body.country;
        let prefLang = req.body.prefLang;

        console.log("Adding new user with id ", userid);

        if (!userInDb) {
            console.log("User not known - adding to DB");
            try {
                const user = new User({
                    id: userid,
                    email: email,
                    username: username,
                    password: hashedPassword,
                    firstname: firstname,
                    lastname: lastname,
                    birthdate: birthdate,
                    country: country,
                    prefLang: prefLang,
                })
                const result = await user.save()
                const {password, ...data} = await result.toJSON()
                res.send(data)
            } catch (e) {
                let response = {
                    resultcode: 'ERROR',
                    resulttext: 'Error creating user - maybe you are missing some parameters?'
                };
                res.send(response)
            }

        } else {
            let response = {
                resultcode: 'ERROR',
                resulttext: 'Email address already is use'
            };
            res.send(response)
        }
    }


    async login(req, res) {
        //TODO add headers again, excluded them as login was not possible
        //res.headers.append('Access-Control-Allow-Origin', 'http://localhost:3080');
        //res.headers.append('Access-Control-Allow-Credentials', 'true');

        const user = await User.findOne({email: req.body.email})

        if (!user) {
            return res.status(404).send({
                resultcode: 'ERROR',
                resulttext: 'Email not found'
            })
        }

        if (!await bcrypt.compare(req.body.password, user.password)) {
            return res.status(400).send({
                resultcode: 'ERROR',
                resulttext: 'Wrong password'
            })
        }

        const token = jwt.sign({_id: user._id}, "secret")
        res.json({
            token: token,
            user: user
        })
    }


    async userLoggedIn(req, res) {
        try {
            const cookie = req.cookies['jwt']
            const claims = jwt.verify(cookie, 'secret')
            if (!claims) {
                return res.status(401).send({
                    resultcode: 'ERROR',
                    resulttext: 'User is not authenticated'
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
                resulttext: 'User is not authenticated'
            })
        }
    }


    async logoutUser(req, res) {
        res.cookie('jwt', '', {maxAge: 0})
        res.send({
            resultcode: 'OK',
            resulttext: 'User successfully logged out.'
        })
    }

    async updateUser(req, res) {
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

        if (req.body.password) { //updating password only when update is requested by user
            const salt = await bcrypt.genSalt(10)

            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            try {
                await User.collection.findOneAndUpdate({id: user.id}, {$set: {password: hashedPassword}})
            } catch (e) {
            }
            console.log("error updating password..")
        }

        try {
            await User.collection.findOneAndUpdate({id: user.id}, {
                $set: {
                    email: req.body.email,
                    username: req.body.username,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    birthdate: req.body.birthdate,
                    country: req.body.country,
                    prefLang: req.body.prefLang,
                }
            })
            let response = {
                resultcode: 'OK',
                resulttext: 'User updated successfully'
            };
            res.send(response)
        } catch (e) {
            let response = {
                resultcode: 'ERROR',
                resulttext: 'Error updating User - maybe youre missing some Parameters?'
            };
            res.send(response)
        }
    }
}

module.exports = new UserController();