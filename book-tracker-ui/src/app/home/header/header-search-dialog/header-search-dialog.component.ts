import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../header.component";

@Component({
  selector: 'header-search-dialog.component',
  templateUrl: '/header-search-dialog.component.html',
  styleUrls: ['./header-search-dialog.component.scss'],
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
