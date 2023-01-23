const model = require("../models/book-model");
const bookRequest = require("../models/book-requests");
require("request");
const fetch = require('node-fetch');

//TODO add required authentication for usage of API
class BookController{
    getBooks(req, resRequest) {
        let incomingRequest = extractRequestValues(req);
        console.log("Retrieved values:", "searchText:", incomingRequest.searchText, "isbn:", incomingRequest.isbn, "author:", incomingRequest.author, "random book:", incomingRequest.rand, "amount of requested books:", incomingRequest.amount);

        let searchText = incomingRequest.searchText, searchIsbn = incomingRequest.isbn,
            searchAuthor = incomingRequest.author, searchRandom = incomingRequest.rand,
            searchAmount = incomingRequest.amount;

        let query = "q?=";

        if (searchText) {
            query += searchText
        }
        if (searchIsbn) {
            query += "+isbn:" + searchIsbn
        }
        if (searchAuthor) {
            query += "+inauthor:" + searchAuthor
        }

        let maxResults = 40; //the maximum possible by the Google api, set to requested value if exists
        if (searchAmount) {
            if(searchAmount <= 40){ //values bigger than 40 not allowed by the api
                maxResults = searchAmount;
            }
        }

        //if all parameters are empty return error //TODO add maybe other  useful combinations
        if (searchRandom === undefined && searchText === undefined && searchIsbn === undefined && searchAuthor === undefined) {
            resRequest.send("error not enough variables defined") //TODO send as json / reasonable request
        }

        console.log("Currently executed query:", query);

        let propertiesObject = {q: query, maxResults: maxResults};
        let apiurl = ('https://www.googleapis.com/books/v1/volumes');
        let options = {method: 'GET'}; //set method and other possible options.. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

        fetchData(apiurl, propertiesObject, options).then((data) => {
            resRequest.send(createJson(data));
        }).catch((e) => {
            console.log(e);
        });
    }
}

/*
create expected JSON
 */
function createJson(input) {
    let jsonBookList = [];
    for (let j in input) {
        if(!input.hasOwnProperty((j))) {
            continue; // current property not a direct property of input
        }
        if(j === "items"){ // find delivered items
            console.log(j)
            for (let x in j) {
                if((input[j][x])) {
                    console.log(input[j][x]);
                    let item = {}
                    item ["title"] = input[j][x].volumeInfo.title;
                    item ["author"] = input[j][x].volumeInfo.authors;
                    item ["year"] = input[j][x].volumeInfo.publishedDate;
                    item ["description"] = input[j][x].volumeInfo.description;
                    item ["genre"] = input[j][x].volumeInfo.categories;
                    item ["language"] = input[j][x].volumeInfo.language;
                    let isbnJson = input[j][x].volumeInfo.industryIdentifiers;
                    let isbnNumber;

                    for (let i in isbnJson) {
                        console.log("isbnJson:", isbnJson[i]);
                        if(isbnJson[i].type === "ISBN_13"){
                            isbnNumber = isbnJson[i].identifier;
                            console.log("my isbn:", isbnNumber);
                            item ["isbn"] = isbnNumber;
                        } else {
                            isbnNumber = isbnJson[i].identifier;
                        }
                    }
                    item ["noofpages"] = input[j][x].volumeInfo.pageCount;
                    item ["cover"] = input[j][x].volumeInfo.imageLinks.smallThumbnail;
                    jsonBookList.push(item);
                }
            }
        }
    }
    return JSON.stringify(jsonBookList);
}


async function fetchData(url, properties, options){
    const response = await fetch(url + '?' + new URLSearchParams(properties), options)
    return response.json();
}


function extractRequestValues(req){
    return new bookRequest(req.query.querytext, req.query.isbn, req.query.author, req.query.category, req.query.rand, req.query.amount);
}

module.exports = new BookController();