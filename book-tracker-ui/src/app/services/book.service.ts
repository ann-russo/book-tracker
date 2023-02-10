import {Injectable} from "@angular/core";
import {Book} from "../models/book";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn:'root'
})
export class BookService {
  private books: Book[] = [];
  private api: string = 'http://localhost:3080/api/books';
  constructor(private http: HttpClient) {
  }

  private getBooks(url: string): Book[] {
    this.http.get(url).subscribe(res => {
      this.books = res as Book[];
    })
    return this.books;
  }

  public getBookByIsbn(isbn: string): Book[] {
    const url = this.api + '?isbn=' + isbn + '&amount=1';
    return this.getBooks(url);
  }

  public getBooksByAuthor(author: string, amount: string): Book[] {
    const url = this.api + '?author=' + author + '&amount=' + amount;
    return this.getBooks(url);
  }

  public getBooksByQuery(query: string, amount: string): Book[] {
    const url = this.api + '?querytext=' + query + '&amount=' + amount;
    return this.getBooks(url);
  }

  public getBooksByQueryAndAuthor(query: string, author: string, amount: string): Book[] {
    const url = this.api + '?querytext=' + query + '&author=' + author + '&amount' + amount;
    return this.getBooks(url);
  }
}
