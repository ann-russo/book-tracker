import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {GENRES} from "../../models/genres";
import {UserService} from "../../services/user.service";
import {HeaderSearchDialogComponent} from "./header-search-dialog/header-search-dialog.component";

export interface DialogData {
  searchKeyword: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [UserService]
})
export class HeaderComponent {
  searchKeyword: string = '';
  genres = GENRES;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(HeaderSearchDialogComponent, {
      data: {
        searchKeyword: this.searchKeyword
      },
      maxWidth: '100vw',
      width: '100%',
      position: {
        top: '0px'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.searchKeyword = result;
        const nameInRoute: String = this.searchKeyword.split(' ').join('-');
        this.router.navigate(
          ['search'],
          { queryParams: { query: nameInRoute } , relativeTo: this.route});
      }
    });
  }

  logOut(): void {
    this.userService.logoutUser().subscribe({
      next: res => {
        console.log(res);
        //this.storageService.clean();
        this.router.navigate(['/'])
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
