import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {MyErrorStateMatcher} from "../shared/my-error-state-matcher";
import {LANGUAGES} from "../../models/languages";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [UserService]
})

@Injectable()
export class RegistrationComponent implements OnInit {
  registerForm!: FormGroup;
  userData!: User;
  loading = false;
  submitted = false;
  hidePassword = true;
  isSignupFailed = false;
  errorMessage = '';
  matcher = new MyErrorStateMatcher();
  listCountries: string[] = ['Austria', 'Germany', 'Switzerland'];
  listLanguages = LANGUAGES;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private storageService: StorageService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      emailFormControl: new FormControl('', [Validators.required, Validators.email]),
      usernameFormControl: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=[^a-z\\n]*[a-z])[A-Za-z._-]*[0-9][A-Za-z0-9._-]*$')]),
      firstnameFormControl: new FormControl(''),
      lastnameFormControl: new FormControl(''),
      birthdateFormControl: new FormControl(''),
      countryFormControl: new FormControl(''),
      prefLangFormControl: new FormControl('')
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.userData = {
      email: this.registerForm.controls['emailFormControl'].value,
      username: this.registerForm.controls['usernameFormControl'].value,
      password: this.registerForm.controls['passwordFormControl'].value,
      firstname: this.registerForm.controls['firstnameFormControl'].value,
      lastname: this.registerForm.controls['lastnameFormControl'].value,
      birthdate: this.registerForm.controls['birthdateFormControl'].value,
      country: this.registerForm.controls['countryFormControl'].value,
      prefLang: this.registerForm.controls['prefLangFormControl'].value,
    };

    this.userService.registerUser(this.userData).subscribe({
      next: res => {
        console.log(res);
        this.storageService.saveLang(this.userData.prefLang);
        this.router.navigate(['/home']);
      },
      error: err => {
        this.handleError(err);
      }
    })
  }

  handleError(error: Object): void {
    this.loading = false;
    this.isSignupFailed = true;
    this.errorMessage = Object.values(error)[7].resultcode + ": " + Object.values(error)[7].resulttext;
  }
}
