import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {StorageService} from "../services/storage.service";

export interface AccountData {
  type: string;
  value: any;
}

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})

export class AccountSettingsComponent implements OnInit {
  displayedColumns: string[] = ['type', 'value'];
  userData: AccountData[] = [];
  typesOfData: string[] = ['Email address', 'Username', 'Password',
    'First name', 'Last name', 'Date of birth', 'Country', 'Preferred language']
  dataSource = this.userData

  constructor(
    public dialog: MatDialog,
    private storageService: StorageService) {}

  ngOnInit(): void {
    for (const [key, value] of Object.entries(this.storageService.getUser())) {
      let element: AccountData = {
        type: key,
        value: value
      }
      this.userData.push(element)
    }
    this.userData = this.userData.filter(x => x.type !== "_id" && x.type !== "id" && x.type !== "__v")
    const isPassword = (element: any) => element.type === "password"
    const indexPassword = this.userData.findIndex(isPassword)
    this.userData[indexPassword] = {
      type: 'password',
      value: ''
    }

    this.dataSource = this.userData
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
