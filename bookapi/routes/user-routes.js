const { Router } = require ('express');
const controller = require('../controllers/user-controller');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user-model')
const routes = Router();

//routes.get('/test', controller.getTest);
//routes.get('/books', controller.getBooks);

//TODO simplify json responses e.g. error and then error.text = the detail of the error

//routes.get("/messages", res.send("test")); //test message..

routes.post('/registration', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
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
            res.send("Error creating user - missing parameters?")
        }

    } else{
        console.log("user already known, send error...");
        res.send("Email already exists");
    }
})

routes.post('/login', async (req, res) => {
    //res.headers.append('Access-Control-Allow-Origin', 'http://localhost:3080'); //TODO add headers again, excluded them as login was not possible..
    //res.headers.append('Access-Control-Allow-Credentials', 'true');

    const user = await User.findOne({email: req.body.email})

    if (!user) {
        return res.status(404).send({
            message: 'user not found'
        })
    }

    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: 'invalid credentials'
        })
    }

    const token = jwt.sign({_id: user._id}, "secret")
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    res.send({
        message: 'success'
    })
})

routes.get('/user', async (req, res) => {
    try {
        const cookie = req.cookies['jwt']

        const claims = jwt.verify(cookie, 'secret')

        if (!claims) {
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }

        const user = await User.findOne({_id: claims._id})

        const {password, ...data} = await user.toJSON()

        res.send(data)
    } catch (e) {
        return res.status(401).send({
            message: 'unauthenticated'
        })
    }
})

routes.post('/logout', (req, res) => {
    res.cookie('jwt', '', {maxAge: 0})

    res.send({
        message: 'success'
    })
})


//TODO add function for updating userdata..


module.exports = routes;