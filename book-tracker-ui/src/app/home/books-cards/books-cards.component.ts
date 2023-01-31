import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";

let apiAddress = 'localhost'

export interface BookCard {
  title?: string;
  author?: string;
  cover?: string;
  year?: string;
  noofpages?: number;
  description?: string;
  isbn?: string;
  language?: string;
  genre?: string;
}

let BOOK_DATA: BookCard[] = [];

@Component({
  selector: 'app-books-cards',
  templateUrl: './books-cards.component.html',
  styleUrls: ['./books-cards.component.css']
})
export class BooksCardsComponent implements OnInit, OnDestroy {
  dataSourceCardOne: BookCard[] = []
  dataSourceCardTwo: BookCard[] = []
  dataSourceCardThree: BookCard[] = []
  urlCardOne: string = 'http://' + apiAddress + ':3080/api/books?author=Shakespeare&amount=10'
  urlCardTwo: string = 'http://' + apiAddress + ':3080/api/books?querytext=programmierung&amount=10'
  urlCardThree: string = 'http://' + apiAddress + ':3080/api/books?querytext=potter&author=rowling&langRestrict=en&amount=10'


  constructor(
    private http: HttpClient,
    private sanitization: DomSanitizer) {
  }

  ngOnInit(): void {
    this.requestBookCategory(this.urlCardOne, 1)
    this.requestBookCategory(this.urlCardTwo, 2)
    this.requestBookCategory(this.urlCardThree, 3)
  }

  ngOnDestroy(): void {
    this.resetData()
  }

  resetData(): void {
    BOOK_DATA = []
    this.dataSourceCardOne = []
    this.dataSourceCardTwo = []
  }

  requestBookCategory(url: string, cardRow: number): void {
    this.http.get(url).subscribe({
      next: books => this.extractBooks(books, cardRow),
      error: error => console.log(error)
    })
  }
  extractBooks(books: any, cardRow: number): void {
    for (let book of books) {
      let newBook = {
        author: book.author,
        cover: book.cover,
        description: book.description,
        isbn: book.isbn,
        noofpages: book.noofpages,
        title: book.title,
        year: book.year,
        language: book.language,
        genre: book.genre
      }
      BOOK_DATA.push(newBook)
      console.log(newBook)
    }

    if (cardRow === 1) {
      this.dataSourceCardOne = BOOK_DATA
    }
    if (cardRow === 2) {
      this.dataSourceCardTwo = BOOK_DATA
    }
    if (cardRow === 3) {
      this.dataSourceCardThree = BOOK_DATA
    }
    BOOK_DATA = []
  }
  isTooLong(description: string|undefined): boolean {
    return description !== undefined && description.length > 200;
  }

  getCoverUrl(book: BookCard) {
    let cover = book.cover
    return this.sanitization.bypassSecurityTrustStyle('url(\'' + cover + '\')');
  }
}
