import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {CoreModule} from "./core/core.module";
import { IssuesComponent } from './issues/issues.component';
import {AuthGuardService} from "./Guards/auth-guard.service";
import {IssueModule} from "./issues/issue.module";
import {AppRoutingModule} from "./app-routing.module";
import {AdalService} from "ng2-adal/core";
import {SecretService} from "./services/secret.service";
import {IssuesService} from "./services/issues.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    AppRoutingModule,
    IssueModule
  ],
  providers: [
    AuthGuardService,
    AdalService,
    SecretService,
    IssuesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
