import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {GENRES} from "../../models/genres";
import {UserService} from "../../services/user.service";
import {StorageService} from "../../services/storage.service";

export interface DialogData {
  searchKeyword: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UserService]
})
export class HeaderComponent {
  searchKeyword: string;
  genres = GENRES;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private storageService: StorageService) {
    this.searchKeyword = '';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(HeaderSearchDialogComponent, {
      data: {searchKeyword: this.searchKeyword},
      position: {
        top: '0px'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logOut(): void {
    this.userService.logoutUser().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        this.router.navigate(['/'])
      },
      error: err => {
        console.log(err);
      }
    })
  }
}

@Component({
  selector: 'header-search-dialog.component',
  templateUrl: '/header-search-dialog/header-search-dialog.component.html',
})
export class HeaderSearchDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<HeaderSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
