import { Component } from '@angular/core';
import {Location} from "@angular/common";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css'],
  providers: [UserService]
})
export class DeleteAccountComponent {

  constructor(
    private location: Location,
    private router: Router,
    private userService: UserService) {
  }

  goBackToPrevPage(): void {
    this.location.back();
  }

  deleteAccount(): void {
    console.log("Delete account initiated")
    /*
    this.userService.deleteUser().subscribe({
      next: res => {
        console.log(res);
        this.router.navigate(['/']);
      },
      error: err => console.log(err)
    })
     */
  }
}
