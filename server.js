const express = require('express')
const app = express()
const port = process.env.PORT || 3080
const dist = process.cwd()+"/book-tracker-ui/dist/book-tracker-ui/"

const bookRouter = require ('./bookapi/routes/book-router');

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

