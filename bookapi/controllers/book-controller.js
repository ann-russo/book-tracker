const model = require("../models/book-model");
const request = require("request");
const {response} = require("express");

class BookController{

    getTest(req, res){
        res.send('test api....');
    }

    getBooksTest(req, res){
        let myBook = new model.Book("testtilte","author","year","desc","genre","isbn","33","cover");
        res.send(myBook); // return book as JSON
    }


    getBooks(req, resRequest){

        let resul = extractRequestValues(req);
        console.log(resul);
        request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            resRequest.send(body);
            //let response = body.url;
            //console.log(body.url);
            //console.log(body.explanation);
        });
        //res.send(response);
    }
}


/*
required values:
    SearchParameter:
	Text
	ISBN
	Author
	Category/Genre
	random = true
		Count: Amount of books
 */
function extractRequestValues(req){
    let searchText = req.query.queryText;
    let isbn = req.query.isbn;
    let author = req.query.author;
    let category = req.query.category;
    let random = req.query.random;
    return searchText, isbn, author, category, random();
}

module.exports = new BookController();