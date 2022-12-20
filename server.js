const express = require('express')
const app = express()
const port = process.env.PORT || 3080
const dist = process.cwd()+"/book-tracker-ui/dist/book-tracker-ui/"

app.use(express.json())
app.use(express.static(dist));


app.get('/', (req,res) => {
    res.sendFile(dist+"index.html");
});


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})