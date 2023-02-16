import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../services/book.service";

@Component({
  selector: 'app-book-genre',
  templateUrl: './book-genre.component.html',
  styleUrls: ['./book-genre.component.css']
})
export class BookGenreComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const genre: string = params['genre'];
      this.bookService.getBooksByGenre(genre).subscribe({
        next: books => console.log(books),
        error: error => console.log(error)
      })
    })
  }
}
