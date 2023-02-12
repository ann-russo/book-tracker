import {Injectable} from "@angular/core";
import {Book} from "../models/book";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const BOOK_API = 'http://localhost:3080/api/books?';

@Injectable({
  providedIn:'root'
})
export class BookService {
  constructor(private http: HttpClient) {
  }

  public getBookByIsbn(isbn: string): Observable<Book[]> {
    const url = BOOK_API + 'isbn=' + isbn + '&amount=1';
    return this.http.get<Book[]>(url);
  }

  public getBooksByAuthor(author: string, amount: string): Observable<Book[]> {
    const url = BOOK_API + 'author=' + author + '&amount=' + amount;
    return this.http.get<Book[]>(url);
  }

  public getBooksByQuery(query: string, amount: string): Observable<Book[]> {
    const url = BOOK_API + 'querytext=' + query + '&amount=' + amount;
    return this.http.get<Book[]>(url);
  }

  public getBooksByQueryAndAuthor(query: string, author: string, amount: string): Observable<Book[]> {
    const url = BOOK_API + 'querytext=' + query + '&author=' + author + '&langRestrict=en&amount=' + amount;
    return this.http.get<Book[]>(url);
  }

  public getBooksByGenre(genre: string): Observable<Book[]> {
    const url = BOOK_API + 'subject=' + genre;
    return this.http.get<Book[]>(url);
  }
}
