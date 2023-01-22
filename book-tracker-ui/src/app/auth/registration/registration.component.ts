import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ErrorStateMatcher} from "@angular/material/core";
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

@Injectable()
export class RegistrationComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  matcher = new MyErrorStateMatcher();
  listCountries: string[] = ['Austria', 'Germany', 'Switzerland']
  listLanguages: string[] = ['English', 'German']
  url: string = 'http://localhost:3080/api/users/registration'

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      emailFormControl: new FormControl('', [Validators.required, Validators.email]),
      usernameFormControl: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(6)]),
      firstNameFormControl: new FormControl(''),
      lastNameFormControl: new FormControl(''),
      birthDateFormControl: new FormControl(''),
      countryFormControl: new FormControl(''),
      prefLangFormControl: new FormControl(''),
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    let userData = {
      "email": this.registerForm.controls['emailFormControl'].value,
      "username": this.registerForm.controls['usernameFormControl'].value,
      "password": this.registerForm.controls['passwordFormControl'].value,
      "birthdate": this.registerForm.controls['birthDateFormControl'].value,
      "firstName": this.registerForm.controls['firstNameFormControl'].value,
      "lastName": this.registerForm.controls['lastNameFormControl'].value,
      "country": this.registerForm.controls['countryFormControl'].value,
      "prefLang": this.registerForm.controls['prefLangFormControl'].value,
    };

    console.log(userData)
    this.loading = true;
    this.http.post(this.url, userData)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/login'])
        },
        error => {
          console.log(error.error)
          this.loading = false;
        });
  }
}
