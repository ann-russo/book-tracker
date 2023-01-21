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
  listCountries: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      emailFormControl: new FormControl('', [Validators.required, Validators.email]),
      usernameFormControl: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(14)]),
      passwordFormControl: new FormControl('', [Validators.required]),
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
    let email = this.registerForm.get('Email')?.value;
    let password = this.registerForm.get('Password')?.value;

    // TODO check in backend if email exists
    // TODO send data to backend and save in database

    let registrationOk = true;
    if (registrationOk) {
      this.router.navigate(['/home'])
    }
  }
}
