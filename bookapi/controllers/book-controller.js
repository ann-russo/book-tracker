const model = require("../models/book-model");


class BookController{

    getTest(req, res){
        res.send('test api....');
    }



}


module.exports = new BookController();