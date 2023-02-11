import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {MyErrorStateMatcher} from "../shared/my-error-state-matcher";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userData!: User;
  loading = false;
  submitted = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailFormControl: new FormControl('', [Validators.required, Validators.email]),
      passwordFormControl: new FormControl('', [Validators.required])
    })
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.userData = {
      email: this.loginForm.controls['emailFormControl'].value,
      password: this.loginForm.controls['passwordFormControl'].value
    };

    this.loading = true;
    this.userService.loginUser(this.userData).subscribe({
      next: res => this.router.navigate(['/home']),
      error: err => {
        console.log(err);
        this.loading = false;
      }
    })
  }

}
