import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";
import {KeyValuePipe} from "@angular/common";
import {map} from "rxjs";

export interface AccountData {
  key: string;
  value: any;
}

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss'],
  providers: [UserService, KeyValuePipe]
})
export class AccountOverviewComponent implements OnInit {
  displayedColumns: string[] = ['key', 'value'];
  dataSource = new MatTableDataSource<AccountData>();
  userData: any[] = []

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private keyValue: KeyValuePipe) {

  }

  ngOnInit(): void {
    this.userService.getUserData().pipe(map(result => {
      this.userData = result;
      const filteredUserData = this.keyValue.transform(result)
        .filter(x => x.key !== "__v" && x.key !== "_id" && x.key !== "id" && x.key !== "password");
      this.dataSource.data = filteredUserData as AccountData[]
    })).subscribe();
  }
}
