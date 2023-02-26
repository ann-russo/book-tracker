import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../services/book.service";
import {MatTableDataSource} from "@angular/material/table";
import {Book} from "../models/book";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {GenreEntry, GENRES} from "../models/genres";

@Component({
  selector: 'app-book-genre',
  templateUrl: './book-genre.component.html',
  styleUrls: ['./book-genre.component.scss']
})
export class BookGenreComponent implements OnInit, AfterViewInit {
  genre: GenreEntry[] = [];
  isLoadingResults: boolean = true;
  selectedSortOption = '';
  selectedSortDirection = '';

  public displayedColumns = ['cover', 'title'];
  public sortOptions = ['Author', 'Title', 'Pages'];
  public sortDirections = ['Ascending', 'Descending'];
  public dataSource = new MatTableDataSource<Book>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const query = params['genre'];
      this.genre = GENRES.filter(x => x.link === query);
      this.bookService.getBooksByGenre(this.genre[0].link, 'en').subscribe({
        next: books => this.dataSource.data = books as Book[],
        error: error => console.log(error)
      })
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.isLoadingResults = false;
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
