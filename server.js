const express = require('express')
const app = express()
const port = process.env.PORT || 3080
const dist = process.cwd()+"/book-tracker-ui/dist/book-tracker-ui/"

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


app.use(express.json())
app.use(express.static(dist));

//include routes for user api
app.use(cookieParser());

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.set('page-size', '20');
    res.set('Access-Control-Expose-Headers', 'page-size')
    next();
});

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3080', 'http://localhost:4200', 'http://localhost:8080', 'http://localhost:80', 'http://127.0.0.1:3080']
}))

app.use('/api/users', userRouter); //TODO during implementation add registered info when required...
app.use('/api/booklist', booklistRouter);
app.use('/api', bookRouter);

app.get('/', (req,res) => {
    res.sendFile(dist+"index.html");
});

/**
 * Redirect to index.html
 */
app.route('/*').get(function (req, res) {
    return res.sendFile(path.join(dist + 'index.html'));
});

app.listen(port, (error)=> {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is up on port ' + port)
    }
})

const mongodbUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/book-tracker';
mongoose.set('strictQuery', false);
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to the database')
})
