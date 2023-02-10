import {Book} from "../models/book";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class BookListService {
  private bookList: Book[] = [];
  private api: string = 'http://localhost:3080/api/booklist';
  constructor(private http: HttpClient) {
  }

  private getBooks(url: string): Book[] {
    this.http.get(url).subscribe(res => {
      this.bookList = res as Book[];
    })
    return this.bookList;
  }

  public addBook(book: Book): Object {
    const url = this.api + '/addbook';
    return this.http.post(url, book).subscribe(res => {
      return res;
    });
  }

  private deleteBook(url: string): void {
    //TODO call deleteBook method in backend (issue #5)
  }

  public getBookList(sorted: boolean, status?: number): Book[] {
    const url = this.api + '/findbooks';
    const bookList = this.getBooks(url);

    if (sorted && status !== undefined) {
      return this.getSortedBookList(bookList, status);
    } else {
      return bookList;
    }
  }

  public getSortedBookList(books: Book[], status: number): Book[] {
    return books.filter(function (book) {
      return book.status === status;
    });
  }
}
