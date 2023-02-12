import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {MyErrorStateMatcher} from "../shared/my-error-state-matcher";
import {StorageService} from "../../services/storage.service";
import {AuthGuardService} from "../../services/auth/auth-guard.service";
import {setCookie} from 'typescript-cookie'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService, AuthGuardService]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userData!: User;
  loading = false;
  submitted = false;
  isLoggedIn = false;
  isLoginFailed = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private storageService: StorageService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailFormControl: new FormControl('', [Validators.required, Validators.email]),
      passwordFormControl: new FormControl('', [Validators.required])
    })

    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
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
      next: res => {
        setCookie('jwt', res.token, { expires: 1 })
        this.storageService.saveUser(res.user);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/home']);
      },
      error: err => {
        console.log(err);
        this.loading = false;
        this.isLoginFailed = true;
      }
    })
  }

}
