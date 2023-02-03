import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Book} from "../models/book";
import {FormControl, Validators} from "@angular/forms";
import { Location } from '@angular/common';

interface BookStatus {
  statusName: string;
}

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  url: string = 'http://localhost:3080/api/books?isbn=';
  book!: Book;
  selectedStatus!: BookStatus;
  statusControl = new FormControl<BookStatus | null>(null, Validators.required);
  lists: BookStatus[] = [
    {statusName: "Reading"},
    {statusName: "Finished"},
    {statusName: "Plan to read"},
    {statusName: "Dropped"},
  ];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const isbn: string = params['isbn'];
      this.url += isbn + ("&amount=1")
      this.http.get(this.url).subscribe({
        next: book => this.saveBookData(book),
        error: error => console.log(error)
      })
      console.log("book isbn:", isbn)
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
    console.log("Book added to list with status " + status.statusName)
  }
}
