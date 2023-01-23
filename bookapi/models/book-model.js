


/*
* One Book with all possible properties (javascript knows only one constructor -> let parameter empty if not used)
*/
class Book{
    constructor(title, author, year, description, genre, isbn, noofpages, cover) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.description = description;
        this.genre = genre;
        this.isbn = isbn;
        this.noofpages = noofpages;
        this.cover = cover;
    }

}


/*
* list of books
 */
class BookList{
    static book_id  = 0;

    constructor() {
        this.booklist = new Map();
    }

    addBook(book){
        BookList.book_id = BookList.book_id++;
        this.getBooklistasMap().set(book);
    }

    getBooklistasMap(){
        return this.booklist.get();
    }
}

const model = new BookList();
module.exports = {model, Book: Book};

