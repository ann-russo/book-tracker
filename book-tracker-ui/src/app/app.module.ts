import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { LoginComponent } from './auth/login/login.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
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
import {HeaderComponent} from "./home/header/header.component";
import { BooksCardsComponent } from './home/books-cards/books-cards.component';
import {MatTableModule} from "@angular/material/table";
import { HttpClientModule } from '@angular/common/http';
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {BookListService} from "./services/book-list.service";
import {BookService} from "./services/book.service";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AuthService} from "./services/auth/auth.service";
import {AuthGuardService} from "./services/auth/auth-guard.service";
import {StorageService} from "./services/storage.service";
import {UserService} from "./services/user.service";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {httpInterceptorProviders} from "./helpers/http.interceptor";
import {HeaderSearchDialogComponent} from "./home/header/header-search-dialog/header-search-dialog.component";
import { BookSearchComponent } from './book-search/book-search.component';
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {KeyValuePipe} from "@angular/common";
import { EditAccountComponent } from './account-settings/edit-account/edit-account.component';
import { AccountOverviewComponent } from './account-settings/account-overview/account-overview.component';
import { DeleteAccountComponent } from './account-settings/delete-account/delete-account.component';
import { BookGenreComponent } from './book-genre/book-genre.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    AccountSettingsComponent,
    BookDetailsComponent,
    BookListComponent,
    PageNotFoundComponent,
    HomeComponent,
    WelcomeComponent,
    WelcomeLinksComponent,
    HeaderComponent,
    HeaderSearchDialogComponent,
    BooksCardsComponent,
    BookSearchComponent,
    EditAccountComponent,
    AccountOverviewComponent,
    DeleteAccountComponent,
    BookGenreComponent
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
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    KeyValuePipe,
    MatChipsModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [
    AppRoutingModule,
    httpInterceptorProviders,
    BookListService,
    BookService,
    AuthService,
    AuthGuardService,
    StorageService,
    UserService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
