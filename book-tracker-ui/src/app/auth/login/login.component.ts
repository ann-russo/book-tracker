import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ErrorStateMatcher} from "@angular/material/core";
import {first} from "rxjs";
import {HttpClient} from "@angular/common/http";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  matcher = new MyErrorStateMatcher();
  url: string = 'https://localhost:3080/api/users/login'

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient) {
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

    let userData = {
      "email": this.loginForm.controls['emailFormControl'].value,
      "password": this.loginForm.controls['passwordFormControl'].value
    };

    this.loading = true;
    this.http.post(this.url, userData)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/home'])
        },
        error => {
          console.log(error.error)
          this.loading = false;
        });
  }

}
