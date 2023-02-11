import {Injectable} from "@angular/core";
import {Book} from "../models/book";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn:'root'
})
export class BookService {
  private api: string = 'http://localhost:3080/api/books';
  constructor(private http: HttpClient) {
  }

  public getBookByIsbn(isbn: string): Observable<Book[]> {
    const url = this.api + '?isbn=' + isbn + '&amount=1';
    return this.http.get<Book[]>(url);
  }

  public getBooksByAuthor(author: string, amount: string): Observable<Book[]> {
    const url = this.api + '?author=' + author + '&amount=' + amount;
    return this.http.get<Book[]>(url);
  }

  public getBooksByQuery(query: string, amount: string): Observable<Book[]> {
    const url = this.api + '?querytext=' + query + '&amount=' + amount;
    return this.http.get<Book[]>(url);
  }

  public getBooksByQueryAndAuthor(query: string, author: string, amount: string): Observable<Book[]> {
    const url = this.api + '?querytext=' + query + '&author=' + author + '&langRestrict=en&amount=' + amount;
    return this.http.get<Book[]>(url);
  }
}
