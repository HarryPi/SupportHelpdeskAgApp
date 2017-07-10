import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {IssuesComponent} from "./issues.component";
import {AuthGuardService} from "../Guards/auth-guard.service";

const routes: Routes = [
  {path: 'dashboard', component: IssuesComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})

export class IssueRoutingModule { }
