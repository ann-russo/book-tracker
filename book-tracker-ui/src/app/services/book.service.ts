import {Injectable} from "@angular/core";
import {Book} from "../models/book";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BASE_URL} from "../../main";

const BOOK_API = BASE_URL + '/api/books?';

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

  public getBooksByAuthor(author: string, language: string, amount: string): Observable<Book[]> {
    const url = BOOK_API + 'author=' + author + '&language=' + language + '&amount=' + amount;
    return this.http.get<Book[]>(url);
  }

  public getBooksByQuery(query: string, language: string, amount: string): Observable<Book[]> {
    const url = BOOK_API + 'querytext=' + query + '&language=' + language + '&amount=' + amount;
    return this.http.get<Book[]>(url);
  }

  public getBooksByQueryAndAuthor(query: string, author: string, language: string, amount: string): Observable<Book[]> {
    const url = BOOK_API + 'querytext=' + query + '&author=' + author + '&language=' + language + '&amount=' + amount;
    return this.http.get<Book[]>(url);
  }

  public getBooksByGenre(category: string, language: string): Observable<Book[]> {
    const url = BOOK_API + 'category=' + category + '&language=' + language;
    return this.http.get<Book[]>(url);
  }
}
