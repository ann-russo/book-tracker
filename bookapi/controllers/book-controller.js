const bookRequest = require("../models/book-requests");
require("request");
const fetch = require('node-fetch');
const {json} = require("express");

class BookController {
    getBooks(req, resRequest) {
        let incomingRequest = extractRequestValues(req);
        console.log(
            "Retrieved values:", "searchText:", incomingRequest.searchText, "isbn:", incomingRequest.isbn, "author:", incomingRequest.author,
            "random book:", incomingRequest.rand, "amount of requested books:", incomingRequest.amount, "language of the book:", incomingRequest.language, "category: ", incomingRequest.category);

        let searchText = incomingRequest.searchText, searchIsbn = incomingRequest.isbn,
            searchAuthor = incomingRequest.author, searchRandom = incomingRequest.rand,
            searchAmount = incomingRequest.amount, searchLanguage = incomingRequest.language,
            searchCategory = incomingRequest.category;

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
        if (searchCategory) {
            query += "+subject:" + '"' + searchCategory + '"'
        }

        // The maximum possible value by the Google API, set to requested value if exists
        let maxResults = 40;
        if (searchAmount) {
            if (searchAmount <= 40) {
                maxResults = searchAmount;
            }
        }

        // If all parameters are empty, return error
        if (searchRandom === undefined &&
            searchText === undefined &&
            searchIsbn === undefined &&
            searchAuthor === undefined &&
            searchCategory === undefined) {
            let response = {
                resultcode: 'ERROR',
                resulttext: 'Not enough variables defined'
            };
            resRequest.send(response)
        }

        console.log("Currently executed query: ", query);

        let propertiesObject = {
            q: query,
            maxResults: maxResults,
            langRestrict: searchLanguage
        };

        console.log("Sending request using the following properties: ", propertiesObject)

        let apiurl = ('https://www.googleapis.com/books/v1/volumes');
        let options = {method: 'GET'};

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
    let count = 0;
    let jsonBookList = [];
    console.log("Total items according to Google API: ", input.totalItems)
    for (let j in input) {
        if (!input.hasOwnProperty((j))) {
            continue; // current property not a direct property of input
        }

        if (j === "items") { // find delivered items
            for (let x in input[j]) {
                let item = {}
                item ["title"] = input[j][x].volumeInfo.title;
                count += 1;
                item ["number"] = count;
                item ["author"] = input[j][x].volumeInfo.authors;
                item ["year"] = input[j][x].volumeInfo.publishedDate;
                item ["description"] = input[j][x].volumeInfo.description;
                item ["genre"] = input[j][x].volumeInfo.categories;
                item ["language"] = input[j][x].volumeInfo.language;
                item["saleability"] = input[j][x].saleInfo.saleability;
                let sale = false;
                if (input[j][x].saleInfo.saleability == "FOR_SALE") {
                    sale = true;
                    item["retailPrice"] = input[j][x].saleInfo.retailPrice.amount;
                    item["retailPriceCurrency"] = input[j][x].saleInfo.retailPrice.currencyCode;
                    item["buyLink"] = input[j][x].saleInfo.buyLink;
                }
                let isbnJson = input[j][x].volumeInfo.industryIdentifiers;
                let isbnNumber;
                for (let i in isbnJson) {
                    if (isbnJson[i].type === "ISBN_13") {
                        isbnNumber = isbnJson[i].identifier;
                        item ["isbn"] = isbnNumber;
                    } else if (isbnJson[i].type === "ISBN_10") {
                        isbnNumber = isbnJson[i].identifier;
                    }
                }
                item ["noofpages"] = input[j][x].volumeInfo.pageCount;
                item ["cover"] = input[j][x].volumeInfo.imageLinks?.smallThumbnail;
                if (isbnNumber) { //add book only if ISBN Exists and maybe buylink?..
                    jsonBookList.push(item);
                }
            }
        }
    }
    return JSON.stringify(jsonBookList);
}


async function fetchData(url, properties, options) {
    const response = await fetch(url + '?' + new URLSearchParams(properties), options)
    return response.json();
}


function extractRequestValues(req) {
    return new bookRequest(req.query.querytext, req.query.isbn, req.query.author, req.query.category, req.query.rand, req.query.amount, req.query.language);
}

module.exports = new BookController();