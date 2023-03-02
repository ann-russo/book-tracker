import {Book} from "../models/book";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {BASE_URL} from "../../main";

const BOOKLIST_API = BASE_URL + '/api/booklist/';

@Injectable({
  providedIn:'root'
})
export class BookListService {
  private bookList: Book[] = [];
  constructor(private http: HttpClient) {
  }

  private getBooks(url: string): Book[] {
    this.http.get(url).subscribe(res => {
      this.bookList = res as Book[];
    })
    return this.bookList;
  }

  public addBook(book: Book): Observable<any> {
    const url = BOOKLIST_API + 'addbook';
    return this.http.post(url, book);
  }

  public deleteBook(book: Book): Observable<any> {
    const url = BOOKLIST_API + 'deletebook';
    return this.http.delete(url, {body: book});
  }

  public getBookList(sorted: boolean, status?: number): Book[] {
    const url = BOOKLIST_API + 'findbooks';
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

  public getList(): Observable<any> {
    const url = BOOKLIST_API + 'findbooks';
    return this.http.get(url);
  }

  public updateBook(book: Book): Observable<any> {
    const url = BOOKLIST_API + 'updatebook';
    return this.http.patch(url, book);
  }
}
