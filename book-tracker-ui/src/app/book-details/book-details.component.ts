import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Book} from "../models/book";
import {BookStatus} from "../models/bookstatus";
import {FormControl, Validators} from "@angular/forms";
import { Location } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  providers: [MatSnackBar]
})
export class BookDetailsComponent implements OnInit {
  url: string = 'http://localhost:3080/api/books?isbn=';
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
    private http: HttpClient,
    private location: Location,
    private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const isbn: string = params['isbn'];
      this.url += isbn + ("&amount=1")
      this.http.get(this.url).subscribe({
        next: book => this.saveBookData(book),
        error: error => console.log(error)
      })
    })
  }

  saveBookData(fetchedBook: any) {
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
      genre: newBook.genre
    }
  }

  goBackToPrevPage(): void {
    this.location.back();
  }

  hasDescription(book: Book): boolean {
    return book.description !== undefined;
  }

  addToList(status: BookStatus): void {
    const url = 'http://localhost:3080/api/booklist/addbook'
    this.book.status = status.statusId
    this.http.post(url, this.book).subscribe({
      next: response => this.showFeedback(response),
      error: err => console.log(err)
    })
  }

  showFeedback(response: Object): void {
    const feedbackMessage = Object.values(response)[0] + ': ' + Object.values(response)[1]
    this._snackBar.open(feedbackMessage, 'OK');
  }
}
