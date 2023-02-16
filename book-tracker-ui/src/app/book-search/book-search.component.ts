import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BookService} from "../services/book.service";
import {ActivatedRoute} from "@angular/router";
import {filter, merge, startWith, switchMap} from 'rxjs/operators';
import {Book} from "../models/book";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

let BOOK_DATA: Book[] = []

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css'],
  providers: [BookService]
})
export class BookSearchComponent implements OnInit {
  keyword: string = '';
  public displayedColumns: string[] = ['title', 'author', 'pages'];
  public dataSource = new MatTableDataSource<Book>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(filter(params => params.query))
      .subscribe(params => {
        this.keyword = params.query.split('-').join(' ');
      });
    this.getResults();
  }

  public getResults = () => {
    this.bookService.getBooksByQuery(this.keyword, '40')
      .subscribe(res => {
        this.dataSource.data = res as Book[];
      })
  }

}
