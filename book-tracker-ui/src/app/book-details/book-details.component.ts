import {Component, OnInit} from '@angular/core';
import {BookCard, BookService} from "../home/books-cards/books-cards.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit{
  isbn: string|null = ''
  book: any

  constructor(
    public activatedRoute: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.isbn = params.get('isbn');
      this.book = this.bookService.getBook(this.isbn);
    })
  }
}
