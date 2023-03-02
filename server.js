const express = require('express')
const app = express()
const dist = process.cwd()+"/public/"

const bookRouter = require ('./bookapi/routes/book-router');
const userRouter = require ('./bookapi/routes/user-routes');
const booklistRouter = require ('./bookapi/routes/booklist-router');

/*
 * mongodb configuration
 */
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const mongodbUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/book-tracker';

console.log(process.env)

mongoCFG = {
    useNewUrlParser: true,
    ssl: true,
    replicaSet: 'cluster0-shard-0',
    authSource: 'admin',
    retryWrites: true,
    useUnifiedTopology: true,
}

mongoose.connect(mongodbUrl, mongoCFG)
    .then(() => {
        console.log("Connected to Mongo database!");
    })
    .catch(err => {
        console.error("App starting error:", err.stack);
    });

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

app.use('/api/users', userRouter); //TODO during implementation add registered info when required...
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