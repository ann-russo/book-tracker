import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { LoginComponent } from './auth/login/login.component';
import {
  AccountSettingsComponent,
  DialogDeleteAccount,
  DialogEditData
} from './account-settings/account-settings.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookListComponent } from './book-list/book-list.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import { HomeComponent } from './home/home.component';
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatSelectCountryModule} from "@angular-material-extensions/select-country";
import {MatNativeDateModule} from "@angular/material/core";
import { WelcomeComponent } from './welcome/welcome.component';
import { WelcomeLinksComponent } from './welcome/welcome-links/welcome-links.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTabsModule} from "@angular/material/tabs";
import { TableComponent } from './book-list/table/table.component';
import {HeaderComponent, HeaderSearchDialogComponent} from "./home/header/header.component";
import { BooksCardsComponent } from './home/books-cards/books-cards.component';
import {MatTableModule} from "@angular/material/table";
import { HttpClientModule } from '@angular/common/http';
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    AccountSettingsComponent,
    DialogDeleteAccount,
    DialogEditData,
    BookDetailsComponent,
    BookListComponent,
    PageNotFoundComponent,
    HomeComponent,
    WelcomeComponent,
    WelcomeLinksComponent,
    TableComponent,
    HeaderComponent,
    HeaderSearchDialogComponent,
    BooksCardsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatSelectCountryModule,
        MatToolbarModule,
        MatMenuModule,
        MatTooltipModule,
        MatDialogModule,
        MatTabsModule,
        MatTableModule,
        HttpClientModule,
        MatDividerModule,
        MatCardModule,
    ],
  providers: [AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
