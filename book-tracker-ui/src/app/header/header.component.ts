import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

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

  constructor(public dialog: MatDialog) {
    this.searchKeyword = '';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(HeaderSearchDialogComponent, {
      data: {searchKeyword: this.searchKeyword},
      position: {
        top: '0px',
        left: '0px',
        right: '0px'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'header-search-dialog.component',
  templateUrl: '/search-dialog/header-search-dialog.component.html',
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
