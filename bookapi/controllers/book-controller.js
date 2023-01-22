const model = require("../models/book-model");
const bookrequest = require("../models/book-requests");
const request = require("request");
const {response} = require("express");
const fetch = require('node-fetch');


class BookController{

    getTest(req, res){
        res.send('test api....');
    }

    getBooksTest(req, res){
        let myBook = new model.Book("testtilte","author","year","desc","genre","isbn","33","cover");
        res.send(myBook); // return book as JSON
    }


    getBooks(req, resRequest) {
        let requestincoming = extractRequestValues(req);
        console.log("retrieved values..: ", "searchText: ", requestincoming.searchText, "isbn: ", requestincoming.isbn, "author: ", requestincoming.author, "random book true: ", requestincoming.rand, "amount of requested books: ", requestincoming.amount);


        let SearchText = requestincoming.searchText, SearchIsbn = requestincoming.isbn,
            SearchAuthor = requestincoming.author, SearchRandom = requestincoming.rand,
            SearchAmount = requestincoming.amount;
        let query = "q?=";
        if (SearchText) {
            query += SearchText
        }
        ;
        if (SearchIsbn) {
            query += "+isbn:" + SearchIsbn
        }
        ;
        if (SearchAuthor) {
            query += "+inauthor:" + SearchAuthor
        }
        ;
        let maxresults = 40; //the maximum possible by the google api, set to requested value if exists
        if (SearchAmount) {
            if(SearchAmount<=40){ //values bigger than 40 not allowed by the api
                maxresults = SearchAmount;
            }
        }
        ;
        //console.log(SearchRandom);
        if (SearchRandom && SearchText === undefined && SearchIsbn === undefined && SearchAuthor === undefined) {
            query = "test"; // execute when all other parameters are empty and really any amount of random books is requested
        }

        //if all parameters are empty return error //TODO add maybe other  useful combinations
        if (SearchRandom === undefined && SearchText === undefined && SearchIsbn === undefined && SearchAuthor === undefined) {
            resRequest.send("error not enough variables defined") //TODO send as json / reasonable request
        }

        console.log("currently executed query:..", query);

        var propertiesObject = {q: query, maxResults: maxresults};
        let apiurl = ('https://www.googleapis.com/books/v1/volumes');


        let jsonResponse
        let options = {method: 'GET'}; //set method and other possible options.. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

        fetchData(apiurl, propertiesObject, options).then((data) => {
            jsonResponse = data;
            //resRequest.send(jsonResponse);
            resRequest.send(createJson(jsonResponse));
        }).catch((e) => {
            console.log(e);
        });
        
    }

}



/*
create expected JSON
 */
function createJson(input){
    let output = [];
    jsonBookList = [];
    let jsonBook = [];
    for(let j in input){
        if(!input.hasOwnProperty((j))){
            continue; //current property not a direct property of input
        }

        if(j == "items"){ //find delivered items
            console.log(j)
            for (let x in j){
                if((input[j][x])){
                    console.log(input[j][x]);
                    item = {}
                    item ["title"] = input[j][x].volumeInfo.title;
                    item ["author"] = input[j][x].volumeInfo.author;
                    item ["year"] = input[j][x].volumeInfo.publishedDate;
                    item ["description"] = input[j][x].volumeInfo.description;
                    item ["genre"] = input[j][x].volumeInfo.categories;
                    item ["isbn"] = input[j][x].volumeInfo.industryIdentifiers;
                    item ["noofpages"] = input[j][x].volumeInfo.pageCount;
                    item ["cover"] = input[j][x].volumeInfo.imageLinks.smallThumbnail;
                    jsonBookList.push(item);
                }
            }
        }
    }

    //output = input;
    return JSON.stringify(jsonBookList);
}


async function fetchData(url, properties, options){
    const response = await fetch(url + '?' + new URLSearchParams(properties), options)
    const resData = response.json();
    //console.log(resData);
    return resData;
};


function extractRequestValues(req){
    var requestobject = new bookrequest(req.query.querytext, req.query.isbn, req.query.author, req.query.category, req.query.rand, req.query.amount);
    return requestobject;
}



module.exports = new BookController();