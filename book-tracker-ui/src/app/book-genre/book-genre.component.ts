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
  public displayedColumns = ['cover', 'title'];
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
        next: books => {
          this.dataSource.data = books as Book[];
        },
        error: error => console.log(error)
      })
    })
    this.isLoadingResults = false;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
