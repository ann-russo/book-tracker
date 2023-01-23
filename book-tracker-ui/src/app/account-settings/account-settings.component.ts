import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

export interface PeriodicElement {
  name: string;
  position: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 'Email address', name: 'name@example.com'},
  {position: 'Username', name: 'User1'},
  {position: 'Password', name: ''},
  {position: 'Birthdate', name: '25.12.1996'},
  {position: 'First Name', name: 'Anna'},
  {position: 'Last Name', name: 'Blabla'},
  {position: 'Country', name: 'Austria'},
  {position: 'Preferred Language', name: 'German'},
];

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})

export class AccountSettingsComponent {
  displayedColumns: string[] = ['position', 'name'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, dialogChoice: string): void {
    if (dialogChoice === 'edit') {
      this.dialog.open(DialogEditData, {
        width: '400px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
    if (dialogChoice === 'delete') {
      this.dialog.open(DialogDeleteAccount, {
        width: '400px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
  }
}

@Component({
  selector: 'dialog-delete-account',
  templateUrl: 'dialog-delete-account/dialog-delete-account.html',
})
export class DialogDeleteAccount {
  constructor(public dialogRefDelete: MatDialogRef<DialogDeleteAccount>) {}

}

@Component({
  selector: 'dialog-edit-data',
  templateUrl: 'dialog-edit-data/dialog-edit-data.html',
})
export class DialogEditData {
  constructor(public dialogRefEdit: MatDialogRef<DialogEditData>) {}
}
