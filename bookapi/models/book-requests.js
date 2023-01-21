/*
store information from a request accessable in one object
 */


class bookrequest{
    constructor(searchText, isbn, author, category, rand, amount) {
        this.searchText = searchText;
        this.isbn = isbn;
        this.author = author;
        this.category = category;
        this.rand = rand;
        this.amount = amount;
    }
}

module.exports = bookrequest;