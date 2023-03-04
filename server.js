const express = require('express')
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express()
const mongoose = require("mongoose");
const path = require("path");

const bookRouter = require ('./bookapi/routes/book-router');
const userRouter = require ('./bookapi/routes/user-routes');
const booklistRouter = require ('./bookapi/routes/booklist-router');

const dist = process.cwd()+"/public/"
const mongodbUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/book-tracker';

mongoose.set('strictQuery', false);
mongoose.connect(mongodbUrl, {useNewUrlParser: true})
    .then(() => console.log('Connected to the DB'))
    .catch(err => console.error('Error while connecting to DB', err));
module.exports = {mongoose}

app.use(cors());
app.use(express.json())
app.use(express.static(dist));
app.use(cookieParser());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use('/api/users', userRouter);
app.use('/api/booklist', booklistRouter);
app.use('/api', bookRouter);

app.get('/', (req,res) => {
    res.sendFile(dist+"index.html");
});

app.route('/*').get(function (req, res) {
    return res.sendFile(path.join(dist + 'index.html'));
});

const port = process.env.PORT || 3080
app.listen(port, () => {
    console.log("Listening on port " + port);
});