import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BookStatus} from "../../models/bookstatus";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Book} from "../../models/book";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {RatingChangeEvent} from "angular-star-rating";

export interface DialogData {
  book: Book
}

@Component({
  selector: 'edit-book-dialog-component',
  templateUrl: 'edit-book-dialog.component.html',
  styleUrls: ['edit-book-dialog.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class EditBookDialogComponent implements OnInit {
  selectedStatus = '';
  currentScore: number = 1;
  dataForm!: FormGroup;
  bookStatuses: BookStatus[] = [
    {statusId: 1, statusName: "Currently Reading"},
    {statusId: 2, statusName: "Plan to read"},
    {statusId: 3, statusName: "Finished"},
    {statusId: 4, statusName: "Dropped"}
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditBookDialogComponent>) {
    this.setStatus();
  }

  ngOnInit() {
    this.buildForm();
  }

  setStatus(): void {
    const index = this.bookStatuses.findIndex(x => x.statusId === this.data.book.status);
    const currentStatus = this.bookStatuses[index];
    if (currentStatus) {
      this.selectedStatus = currentStatus.statusName;
    }
  }

  getStatusAsNumber(name: string): number | undefined {
    const index = this.bookStatuses.findIndex(x => x.statusName === name);
    return this.bookStatuses[index].statusId;
  }

  getMaxNoOfPages(): number {
    if (this.data.book.noofpages != null) {
      return this.data.book.noofpages;
    } else {
      return 10000;
    }
  }

  onRatingChange($event: RatingChangeEvent) {
    this.currentScore = $event.rating;
  }

  buildForm(): void {
    this.dataForm = this.formBuilder.group({
      status: new FormControl(this.selectedStatus),
      noofpagesread: new FormControl(this.data.book.noofpagesread, [Validators.min(0), Validators.max(this.getMaxNoOfPages())]),
      startdate: new FormControl(this.data.book.startdate),
      finishdate: new FormControl(this.data.book.finishdate),
      notes: new FormControl(this.data.book.notes, [Validators.maxLength(1000)])
    });
    this.currentScore = Number(this.data.book.score);
  }

  get formControl() { return this.dataForm.controls; }

  onSubmit(): void {
    if (this.dataForm.invalid) {
      return;
    }

    this.data.book.status = this.getStatusAsNumber(this.dataForm.controls['status'].value);
    this.data.book.noofpagesread = this.dataForm.controls['noofpagesread'].value;
    this.data.book.startdate = this.dataForm.controls['startdate'].value;
    this.data.book.finishdate = this.dataForm.controls['finishdate'].value;
    this.data.book.notes = this.dataForm.controls['notes'].value;
    this.data.book.score = String(this.currentScore);
    this.dialogRef.close({data: this.data})
  }
}
