const model = require("../models/book-model");
const bookrequest = require("../models/book-requests");
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
        let requestincoming = extractRequestValues(req);
        console.log("retrieved values..: ", "searchText: ",requestincoming.searchText, "isbn: ",requestincoming.isbn, "author: ",requestincoming.author, "random book true: ", requestincoming.rand, "amount of requested books: " , requestincoming.amount);


        let SearchText = requestincoming.searchText, SearchIsbn = requestincoming.isbn, SearchAuthor = requestincoming.author, SearchRandom = requestincoming.rand, SearchAmount = requestincoming.amount;
        let query = "q?=";
        if(SearchText){query += SearchText};
        if(SearchIsbn){query += "+isbn:" + SearchIsbn};
        if(SearchAuthor){query += "+inauthor:" + SearchAuthor};
        let maxresults = 40; //the maximum possible by the google api, set to requested value if exists
        if(SearchAmount){maxresults =  SearchAmount};
        //console.log(SearchRandom);
        if(SearchRandom && SearchText === undefined && SearchIsbn === undefined && SearchAuthor === undefined){
            query = "test"; // execute when all other parameters are empty and really any amount of random books is requested
        }

        //if all parameters are empty return error //TODO add maybe other  useful combinations
        if(SearchRandom === undefined && SearchText === undefined && SearchIsbn === undefined && SearchAuthor === undefined) {
            resRequest.send("error not enough variables defined") //TODO send as json / reasonable request
        }

        console.log("currently executed query:..", query);

        //let searchParameters =
        var propertiesObject = { q:query, maxResults: maxresults };


        request('https://www.googleapis.com/books/v1/volumes', { json: true, qs:propertiesObject }, (err, res, body) => {
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
    var requestobject = new bookrequest(req.query.querytext, req.query.isbn, req.query.author, req.query.category, req.query.rand, req.query.amount);
    return requestobject;
}



module.exports = new BookController();