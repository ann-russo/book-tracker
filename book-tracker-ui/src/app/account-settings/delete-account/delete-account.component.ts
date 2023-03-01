import { Component } from '@angular/core';
import {Location} from "@angular/common";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss'],
  providers: [UserService, MatSnackBar]
})
export class DeleteAccountComponent {

  constructor(
    private location: Location,
    private router: Router,
    private userService: UserService,
    private storageService: StorageService,
    private _snackBar: MatSnackBar) {
  }

  goBackToPrevPage(): void {
    this.location.back();
  }

  deleteAccount(): void {
    this.userService.deleteUser().subscribe({
      next: res => {
        this.showFeedback(res);
        setTimeout(() => {
          this.storageService.clean();
          this.router.navigate(['/']);
        }, 3000);
      },
      error: err => this.showFeedback(err)
    })
  }

  showFeedback(response: Object): void {
    const feedbackMessage = Object.values(response)[0] + ': ' + Object.values(response)[1]
    this._snackBar.open(feedbackMessage, "", {
      duration: 3000,
    });
  }
}
