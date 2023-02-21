import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BookService} from "../services/book.service";
import {ActivatedRoute} from "@angular/router";
import {filter} from 'rxjs/operators';
import {Book} from "../models/book";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css'],
  providers: [BookService]
})
export class BookSearchComponent implements OnInit, AfterViewInit {
  keyword: string = '';
  isLoadingResults = true;
  public displayedColumns: string[] = ['title', 'author', 'noofpages'];
  public dataSource = new MatTableDataSource<Book>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(filter(params => params.query))
      .subscribe(params => {
        this.keyword = params.query.split('-').join(' ');
      });
    this.isLoadingResults = true;

    if (this.isNumber(this.keyword)) {
      this.getResultByIsbn();
    } else {
      this.getResults();
    }
  }

  getResultByIsbn() {
    this.bookService.getBookByIsbn(this.keyword)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.dataSource.data = res as Book[];
      })
  }

  public getResults = () => {
    this.bookService.getBooksByQuery(this.keyword, 'en', '40')
      .subscribe(res => {
        this.isLoadingResults = false;
        this.dataSource.data = res as Book[];
      })
  }

  public isNumber(value: string | number): boolean {
    return ((value != null) &&
      (value !== '') &&
      !isNaN(Number(value.toString())));
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  public getPages(book: any): number {
    if (book.noofpages !== undefined) {
      return Number(book.noofpages);
    } else {
      return 0;
    }
  }
}
