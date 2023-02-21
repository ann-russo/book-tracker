import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Book} from "../models/book";
import {BookStatus} from "../models/bookstatus";
import {FormControl, Validators} from "@angular/forms";
import { Location } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BookService} from "../services/book.service";
import {BookListService} from "../services/book-list.service";


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  providers: [MatSnackBar, BookService, BookListService]
})
export class BookDetailsComponent implements OnInit {
  book!: Book;
  selectedStatus!: BookStatus;
  statusControl = new FormControl<BookStatus | null>(null, Validators.required);
  lists: BookStatus[] = [
    {statusId: 1, statusName: "Currently Reading"},
    {statusId: 2, statusName: "Plan to read"},
    {statusId: 3, statusName: "Finished"},
    {statusId: 4, statusName: "Dropped"}
  ];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private _snackBar: MatSnackBar,
    private bookService: BookService,
    private bookListService: BookListService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const isbn: string = params['isbn'];
      this.bookService.getBookByIsbn(isbn).subscribe({
        next: book => this.extractBook(book),
        error: error => console.log(error)
      })
    })
  }

  extractBook(fetchedBook: any) {
    const newBook = fetchedBook[0]
    this.book = {
      title: newBook.title,
      author: newBook.author,
      cover: newBook.cover,
      description: newBook.description,
      isbn: newBook.isbn,
      noofpages: newBook.noofpages,
      year: newBook.year,
      language: newBook.language,
      genre: newBook.genre,
      retailPrice: newBook.retailPrice,
      retailPriceCurrency: newBook.retailPriceCurrency,
      buyLink: newBook.buyLink
    }
  }

  goBackToPrevPage(): void {
    this.location.back();
  }

  hasDescription(book: Book): boolean {
    return book.description !== undefined;
  }

  hasLink(book: Book): boolean {
    return book.buyLink !== undefined;
  }

  addToList(status: BookStatus): void {
    this.book.status = status.statusId
    this.bookListService.addBook(this.book).subscribe({
        next: response => this.showFeedback(response),
        error: err => console.log(err)
      })
  }

  showFeedback(response: Object): void {
    const feedbackMessage = Object.values(response)[0] + ': ' + Object.values(response)[1]
    this._snackBar.open(feedbackMessage, 'OK');
  }
}
