import {Component, OnInit} from '@angular/core';
import {MyErrorStateMatcher} from "../../auth/shared/my-error-state-matcher";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StorageService} from "../../services/storage.service";
import {LANGUAGES} from "../../models/languages";

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],
  providers: [UserService, MatSnackBar]
})
export class EditAccountComponent implements OnInit {
  hide = true;
  matcher = new MyErrorStateMatcher();
  dataForm!: FormGroup;
  currentData!: User;
  updatedUser: MyUser = {}
  listCountries: string[] = ['Austria', 'Germany', 'Switzerland']
  listLanguages = LANGUAGES;
  selectedDate = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private storageService: StorageService) {

  }

  ngOnInit() {
    this.buildForm();
    this.userService.getUserData().subscribe(res => {
      this.currentData = res;
      this.dataForm.patchValue({
        email: this.currentData.email,
        username: this.currentData.username,
        birthdate: this.selectedDate,
        firstname: this.currentData.firstname,
        lastname: this.currentData.lastname,
        country: this.currentData.country,
        prefLang: this.currentData.prefLang
      })
    })
  }

  buildForm(): void {
    this.dataForm = this.formBuilder.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      password: new FormControl('', [Validators.minLength(8), Validators.pattern('^(?=[^a-z\\n]*[a-z])[A-Za-z._-]*[0-9][A-Za-z0-9._-]*$')]),
      birthdate: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      country: new FormControl(''),
      prefLang: new FormControl('')
    });
  }

  get f() { return this.dataForm.controls; }

  goBackToPrevPage(): void {
    this.location.back();
  }

  isValid(dataForm: FormGroup): boolean {
    return !(dataForm.invalid || !dataForm.touched);
  }

  addEvent(event: MatDatepickerInputEvent<any>) {
    // @ts-ignore
    this.updatedUser['birthdate'] = event.value
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      return;
    }

    Object.keys(this.dataForm.controls).forEach(key => {
      if (this.dataForm.controls[key].touched && this.dataForm.controls[key].value?.length > 0) {
        // @ts-ignore
        this.updatedUser[key] = this.dataForm.controls[key].value;
      } else {
        console.log("unchanged: ", this.dataForm.controls[key].value)
      }
    });

    this.userService.updateUser(this.updatedUser).subscribe({
      next: res => {
        this.storageService.saveLang(this.updatedUser);
        this.showFeedback(res);
      },
      error: err => {
        this.showFeedback(err);
      }
    })
  }

  showFeedback(response: Object): void {
    const feedbackMessage = Object.values(response)[0] + ': ' + Object.values(response)[1]
    const snackBarRef = this._snackBar.open(feedbackMessage, 'OK');
    snackBarRef.afterDismissed().subscribe(() => {
      window.location.reload();
    })
  }
}

export type MyUser = {
    email?: string;
    username?: string;
    password?: string;
    firstname?: string;
    lastname?: string;
    birthdate?: string | Date;
    country?: string;
    prefLang?: string;
}
