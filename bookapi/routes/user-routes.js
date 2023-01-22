const { Router } = require ('express');
const controller = require('../controllers/user-controller');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user-model')
const routes = Router();

//routes.get('/test', controller.getTest);
//routes.get('/books', controller.getBooks);


//routes.get("/messages", res.send("test")); //test message..

routes.post('/register', async (req, res) => {


    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    console.log("received data")
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    })
    console.log("saving now into DB...")
    const result = await user.save()

    const {password, ...data} = await result.toJSON()

    res.send(data)

})


module.exports = routes;