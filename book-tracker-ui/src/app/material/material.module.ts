import { NgModule } from '@angular/core';
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {KeyValuePipe} from "@angular/common";
import { StarRatingModule } from 'angular-star-rating';


@NgModule({
  declarations: [],
  imports: [
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    KeyValuePipe,
    StarRatingModule.forRoot()
  ],
  exports: [
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    KeyValuePipe
  ]
})
export class MaterialModule { }
