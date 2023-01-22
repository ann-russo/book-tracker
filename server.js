const express = require('express')
const app = express()
const port = process.env.PORT || 3080
const dist = process.cwd()+"/book-tracker-ui/dist/book-tracker-ui/"

const bookRouter = require ('./bookapi/routes/book-router');
const userRouter = require ('./bookapi/routes/user-routes');
/*
 * mongodb configuration
 */
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'book-tracker';
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./bookapi/models/user-model");
const bcrypt = require("bcryptjs");


app.use(express.json())
app.use(express.static(dist));



//include routes for user api

app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3080', 'http://localhost:8080', 'http://localhost:80', 'http://127.0.0.1:3080']
}))




app.use('/api/users', userRouter); //TODO during implementation add registered info when required...




//include book api
app.use('/api', bookRouter);

app.get('/', (req,res) => {
    res.sendFile(dist+"index.html");
});



app.listen(port, (error)=> {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is up on port ' + port)
    }
})




mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/book-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('connected to the database')
})



/*
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }
    console.log("asdfdfj")
    //const db = client.db(databaseName)
    /*
    db.collection('users').insertOne({
        email: 'test@example.com',
        password: 'test'
    })
})
 */






