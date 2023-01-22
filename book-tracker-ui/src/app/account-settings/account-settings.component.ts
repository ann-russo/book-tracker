import { Component } from '@angular/core';

export interface UserData {
  type: string;
  value: string;
}

const USER_DATA: UserData[] = [
  { type: 'Email address', value: 'test@example.com'},
  { type: 'Username', value: 'User1'},
  { type: 'Password', value: ''},
  { type: 'First Name', value: 'Anna'},
  { type: 'Last Name', value: 'Hello'},
  { type: 'Birthdate', value: '23.10.1999'},
  { type: 'Country', value: 'Austria'},
  { type: 'Preferred Language', value: 'English'},
];

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})



export class AccountSettingsComponent {
  displayedColumns: string[] = ['Data Type', 'Data'];
  dataSource = USER_DATA;
}
