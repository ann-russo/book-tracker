/*
store information from a request accessable in one object
 */


class bookrequest{
    constructor(searchText, isbn, author, category, rand, amount, language) {
        this.searchText = searchText;
        this.isbn = isbn;
        this.author = author;
        this.category = category;
        this.rand = rand;
        this.amount = amount;
        this.language = language;
    }
}

module.exports = bookrequest;