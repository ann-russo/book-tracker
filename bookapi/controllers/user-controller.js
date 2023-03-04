const bcrypt = require("bcryptjs");
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const booklist = require("../models/bookDB-model");

class UserController {

    async register(req, res) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        let userInDb = await User.findOne({email: req.body.email})

        if (userInDb) {
            return res.status(400).send({
                resultcode: 'ERROR',
                resulttext: 'Entered email address is already in use.'
            })
        } else {
            console.log("User not known - adding to DB");
        }

        let userid = 0; // 0 if db is empty
        try {
            let maxUserID = await User.findOne().sort({"id": -1})
            userid = maxUserID.id + 1;
        } catch (e) {
            userid = 0; //no user found
        }
        console.log("Adding new user with id ", userid);

        try {
            const user = new User({
                id: userid,
                email: req.body.email,
                username: req.body.username,
                password: hashedPassword,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                birthdate: req.body.birthdate,
                country: req.body.country,
                prefLang: req.body.prefLang,
            })
            const result = await user.save()
            const {password, ...data} = await result.toJSON()

            const token = jwt.sign({_id: user._id}, "secret")
            res.cookie('jwt', token, {
                httpOnly: false,
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            })

            res.send({
                resultcode: 'OK',
                resulttext: 'Registration successful',
                data: data
            })

        } catch (e) {
            res.send({
                resultcode: 'ERROR',
                resulttext: 'Error creating user - maybe you are missing some parameters?'
            });
        }
    }


    async login(req, res) {
        const user = await User.findOne({email: req.body.email})
        if (!user) {
            return res.status(404).send({
                resultcode: 'ERROR',
                resulttext: 'Entered email not found in system.'
            })
        }

        if (!await bcrypt.compare(req.body.password, user.password)) {
            return res.status(400).send({
                resultcode: 'ERROR',
                resulttext: 'Entered password is incorrect.'
            })
        }

        const token = jwt.sign({_id: user._id}, "secret")
        res.cookie('jwt', token, {
            httpOnly: false,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        res.send({
            resultcode: 'OK',
            resulttext: 'Login successful'
        })
    }

    async logoutUser(req, res) {
        res.cookie('jwt', '', {maxAge: 0})
        res.send({
            resultcode: 'OK',
            resulttext: 'User successfully logged out.'
        })
    }


    async getUserData(req, res) {
        const cookie = req.cookies['jwt']
        try {
            const claims = jwt.verify(cookie, 'secret')
            const user = await User.findOne({_id: claims._id})
            if (!claims) {
                return res.status(401).send({
                    resultcode: 'ERROR',
                    resulttext: 'User not authenticated!'
                })
            } else {
                res.send(user);
            }

        } catch (e) {
            return res.status(401).send({
                resultcode: 'ERROR',
                resulttext: 'User not authenticated!'
            })
        }
    }

    async updateUser(req, res) {
        console.log("Updating user with data: ", req.body)

        const cookie = req.cookies['jwt']
        const claims = jwt.verify(cookie, 'secret')
        if (!claims) {
            return res.status(401).send({
                resultcode: 'ERROR',
                resulttext: 'User not authenticated!'
            })
        }

        const user = await User.findOne({_id: claims._id})
        console.log("User in DB has ID: ", user.id)

        if (req.body.password) { //updating password only when update is requested by user
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)

            try {
                await User.collection.findOneAndUpdate({id: user.id}, {$set: {password: hashedPassword}})
            } catch (e) {
                console.log("Error updating password!")
                res.send({
                    resultcode: 'ERROR',
                    resulttext: 'Could not update password'
                });
            }
        }

        try {
            if (req.body.email !== undefined) {
                await User.collection.findOneAndUpdate({id: user.id}, {$set: {email: req.body.email}})
            }
            if (req.body.username !== undefined) {
                await User.collection.findOneAndUpdate({id: user.id}, {$set: {username: req.body.username}})
            }
            if (req.body.firstname !== undefined) {
                await User.collection.findOneAndUpdate({id: user.id}, {$set: {firstname: req.body.firstname}})
            }
            if (req.body.lastname !== undefined) {
                await User.collection.findOneAndUpdate({id: user.id}, {$set: {lastname: req.body.lastname}})
            }
            if (req.body.birthdate !== undefined) {
                await User.collection.findOneAndUpdate({id: user.id}, {$set: {birthdate: req.body.birthdate}})
            }
            if (req.body.country !== undefined) {
                await User.collection.findOneAndUpdate({id: user.id}, {$set: {country: req.body.country}})
            }
            if (req.body.prefLang !== undefined) {
                await User.collection.findOneAndUpdate({id: user.id}, {$set: {prefLang: req.body.prefLang}})
            }

            res.send({
                resultcode: 'OK',
                resulttext: 'User updated successfully'
            });

        } catch (e) {
            res.send({
                resultcode: 'ERROR',
                resulttext: 'Error updating user - maybe you are missing some parameters?'
            });
        }
    }

    async deleteuser(req, res) {
        const cookie = req.cookies['jwt']
        const claims = jwt.verify(cookie, 'secret')
        if (!claims) {
            return res.status(401).send({
                resultcode: 'ERROR',
                resulttext: 'User not authenticated!'
            })
        }

        const user = await User.findOne({_id: claims._id})
        await booklist.deleteMany({id: user.id}) // delete books assigned to user
        const deleteUserResult = await User.deleteOne({_id: claims._id})
        res.cookie('jwt', '', {maxAge: 0}) //logout user

        res.send({
            resultcode: 'OK',
            resulttext: 'Deleted User + assigned Books',
            resultdetails: deleteUserResult
        });
    }

}

module.exports = new UserController();