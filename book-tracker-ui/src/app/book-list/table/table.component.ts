import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../../models/book";
import {MatTableDataSource} from "@angular/material/table";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  public displayedColumns = ['cover', 'title'];
  public dataSource = new MatTableDataSource<Book>();

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchBooks();
  }

  public fetchBooks = () => {
    const url = 'http://localhost:3080/api/booklist/findbooks'
    this.http.get(url)
      .subscribe(res => {
        this.dataSource.data = res as Book[];
      });
  }



}
