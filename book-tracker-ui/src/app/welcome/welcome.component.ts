import { Component } from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  title = 'Book Tracker';
  constructor(
    private auth: AuthService,
    private router: Router) {
    if (auth.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }
}
