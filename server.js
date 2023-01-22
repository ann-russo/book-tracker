const express = require('express')
const app = express()
const port = process.env.PORT || 3080
const dist = process.cwd()+"/book-tracker-ui/dist/book-tracker-ui/"

const bookRouter = require ('./bookapi/routes/book-router');

/*
 * mongodb configuration
 */
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'book-tracker'

app.use(express.json())
app.use(express.static(dist));

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


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    db.collection('users').insertOne({
        email: 'test@example.com',
        password: 'test'
    })
})




