import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BookService} from "../services/book.service";
import {ActivatedRoute, Router} from "@angular/router";
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
  public displayedColumns: string[] = ['title', 'author', 'pages'];
  public dataSource = new MatTableDataSource<Book>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(filter(params => params.query))
      .subscribe(params => {
        this.keyword = params.query.split('-').join(' ');
      });
    this.isLoadingResults = true;
    this.getResults();
  }

  public getResults = () => {
    this.bookService.getBooksByQuery(this.keyword, '40')
      .subscribe(res => {
        this.isLoadingResults = false;
        this.dataSource.data = res as Book[];
      })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  public getIsbn(book: any): string {
    if (book.isbn !== undefined) {
      return String(book.isbn)
    } else {
      console.log("no isbn!")
      return '0'
    }
  }
}
