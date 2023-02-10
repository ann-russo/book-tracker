import { Component } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Book} from "../models/book";
import {Observable, Observer} from "rxjs";
import {BookListService} from "../services/book-list.service";

export interface ListTab {
  label: string;
  content: any;
}

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [BookListService]
})
export class BookListComponent {
  asyncTabs!: Observable<ListTab[]>;
  public displayedColumns = ['position', 'cover', 'title'];
  public dataSource = new MatTableDataSource<Book>();

  constructor(private bookListService: BookListService) {
    const sorted: boolean = true;
    const books: Book[] = this.bookListService.getBookList(false);

    this.asyncTabs = new Observable((observer: Observer<ListTab[]>) => {
      setTimeout(() => {
        observer.next([
          {label: 'Currently Reading', content: this.dataSource.data = this.bookListService.getBookList(sorted, 1)},
          {label: 'Plan to Read', content: this.dataSource.data = this.bookListService.getBookList(sorted, 2)},
          {label: 'Completed', content: this.dataSource.data = this.bookListService.getBookList(sorted, 3)},
          {label: 'Dropped', content: this.dataSource.data = this.bookListService.getBookList(sorted, 4)}
        ]);
      }, 1000);
    })
  }
}
