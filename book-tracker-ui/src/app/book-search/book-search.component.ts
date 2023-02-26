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
  styleUrls: ['./book-search.component.scss'],
  providers: [BookService]
})
export class BookSearchComponent implements OnInit, AfterViewInit {
  keyword: string = '';
  isLoadingResults = true;
  selectedSortOption = '';
  selectedSortDirection = '';

  public sortOptions = ['Author', 'Title', 'Pages'];
  public sortDirections = ['Ascending', 'Descending'];
  public displayedColumns: string[] = ['cover', 'title'];
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

  public sortTable(): void {
    if (this.selectedSortOption === 'Author') {
      this.sortByAuthor();
    }
    if (this.selectedSortOption === 'Title') {
      this.sortByTitle();
    }
    if (this.selectedSortOption === 'Pages') {
      this.sortByPages();
    }
    this.paginator.pageIndex = 0;
  }

  public sortByAuthor(): void {
    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      if (this.selectedSortDirection === 'Descending') {
        return a.author < b.author ? 1 : -1;
      } else {
        return a.author < b.author ? -1 : 1;
      }
    });
  }

  public sortByTitle(): void {
    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      if (this.selectedSortDirection === 'Descending') {
        return a.title < b.title ? 1 : -1;
      } else {
        return a.title < b.title ? -1 : 1;
      }
    });
  }

  public sortByPages(): void {
    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      if (this.selectedSortDirection === 'Descending') {
        return b.noofpages - a.noofpages
      } else {
        return a.noofpages - b.noofpages;
      }
    });
  }

  public scrollUp(): void {
    setTimeout(() => window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    }));
  }

  public hasGenre(book: Book): boolean {
    return book.genre !== undefined;
  }

  public hasPages(book: Book): boolean {
    return book.noofpages !== undefined;
  }
}
