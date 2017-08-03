import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {AuthGuardService} from './Guards/auth-guard.service';
import {SecretService} from './services/secret.service';
import {IssuesService} from './services/issues.service';
import {AppRoutingModule} from './app-routing.module';
import {AdalService} from 'ng2-adal/core';
import {IssuesModule} from "./issues/issues.module";
import {CompanyService} from "./services/company.service";
import {UserService} from "./services/user.service";
import {CategoryService} from "./services/category.service";
import {AuthService} from "./services/auth.service";
import {ApplicationService} from "./services/application.service";
import {SolutionsService} from "./services/solutions.service";
import {AzureService} from "./services/azure.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    CoreModule,
    AppRoutingModule,
    IssuesModule
  ],
  providers: [
    AuthGuardService,
    SecretService,
    IssuesService,
    AdalService,
    CompanyService,
    UserService,
    CategoryService,
    SolutionsService,
    AuthService,
    AzureService,
    ApplicationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
