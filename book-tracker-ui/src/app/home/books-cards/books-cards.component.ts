import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface BookCard {
  title?: string;
  author?: string;
  cover?: string;
  year?: string;
  noofpages?: number;
  description?: string;
  isbn?: string;
  language?: string;
}

let BOOK_DATA: BookCard[] = [];

@Component({
  selector: 'app-books-cards',
  templateUrl: './books-cards.component.html',
  styleUrls: ['./books-cards.component.css']
})
export class BooksCardsComponent implements OnInit, OnDestroy {
  dataSource1: BookCard[] = []
  url1: string = 'http://localhost:3080/api/books?author=Shakespeare&amount=5'
  url2: string = 'http://localhost:3080/api/books?searchText=programmierung&amount=5'

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.requestBookCategory(this.url1)
    this.requestBookCategory(this.url2)
  }

  ngOnDestroy(): void {
    BOOK_DATA.length = 0
    this.dataSource1.length = 0
  }

  requestBookCategory(url: string): void {
    this.http.get(url).subscribe({
      next: books => this.extractBooks(books),
      error: error => console.log(error)
    })
  }

  extractBooks(books: any): void {
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
      }
      BOOK_DATA.push(newBook)
      console.log(newBook)
    }
    this.dataSource1 = BOOK_DATA

    for (let item of this.dataSource1) {
      if (item.description !== undefined && item.description.length > 200) {
        item.description = item.description.slice(0, 200) + "(...)"
      }
    }
  }
}
