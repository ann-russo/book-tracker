import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Book} from "../models/book";
import {Observable, Observer} from "rxjs";
import {BookListService} from "../services/book-list.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {EditBookDialogComponent} from "./edit-book-dialog/edit-book-dialog.component";

export interface ListTab {
  label: string;
  content: any;
}

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: [BookListService, MatSnackBar]
})
export class BookListComponent implements OnInit {
  asyncTabs!: Observable<ListTab[]>;
  allBooks!: Book[];
  public displayedColumns = ['position', 'cover', 'title'];
  public dataSource = new MatTableDataSource<Book>();

  constructor(
    private bookListService: BookListService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) {
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

  ngOnInit() {
    this.bookListService.getList().subscribe({
      next: bookListAll => {
        this.allBooks = bookListAll as Book[];
      }
    })
  }

  getPagesRead(book: Book): number {
    if (book.noofpagesread != null) {
      return book.noofpagesread;
    } else {
      return 0;
    }
  }

  getPagesReadTotal(books: Book[]): number {
    let total = 0;
    for (let i = 0; i < books.length; ++i) {
      if (books[i].noofpagesread != null) {
        total += Number(books[i].noofpagesread!);
      }
    }
    return total;
  }
  editBookEntry(book: Book): void {
    const dialogRef = this.dialog.open(EditBookDialogComponent, {
      data: {
        book: book,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.data !== undefined) {
        const updatedBook = result.data.book;
        this.bookListService.updateBook(updatedBook).subscribe({
          next: res => this.showFeedback(res),
          error: err => this.showFeedback(err)
        })
      }
    });
  }

  deleteBookEntry(book: Book):void {
    this.bookListService.deleteBook(book).subscribe({
      next: res => this.showFeedback(res),
      error: err => this.showFeedback(err)
    })
  }

  showFeedback(response: Object): void {
    const feedbackMessage = Object.values(response)[0] + ': ' + Object.values(response)[1]
    const snackBarRef = this._snackBar.open(feedbackMessage, 'OK');
    snackBarRef.afterDismissed().subscribe(() => {
      window.location.reload();
    })
  }
}
