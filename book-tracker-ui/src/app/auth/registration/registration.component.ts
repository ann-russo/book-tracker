import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ErrorStateMatcher} from "@angular/material/core";

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
export class RegistrationComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  matcher = new MyErrorStateMatcher();
  listCountries: string[] = ['Austria', 'Germany', 'Switzerland']
  listLanguages: string[] = ['English', 'German']

  constructor(
    private router: Router,
    private formBuilder: FormBuilder) {
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

    this.loading = true;
    const { email, username, password, firstName, lastName, birthDate, country, prefLang } = this.registerForm.value


    // TODO check in backend if email exists
    // TODO send data to backend and save in database
    /*
    this.authService.register(username, email, password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );

    let registrationOk = true;
    if (registrationOk) {
      this.router.navigate(['/home'])
    }

     */
  }
}
