import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

export interface DialogData {
  searchKeyword: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchKeyword: string;
  url: string = 'https://localhost:3080/api/users/logout'

  constructor(
    public dialog: MatDialog,
    private router: Router) {
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
    let request = new XMLHttpRequest();
    request.open("POST", this.url);
    request.withCredentials = true;
    this.router.navigate(['/'])
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
