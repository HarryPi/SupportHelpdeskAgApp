import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IssuesComponent} from './issues.component';
import {AuthGuardService} from '../Guards/auth-guard.service';
import {RouterModule, Routes} from '@angular/router';
import {IssueFormComponent} from "./issue-form/issue-form.component";

const routes: Routes = [
  {path: 'dashboard', component: IssuesComponent, canActivate: [AuthGuardService]},
  {path: 'myIssues', component: IssuesComponent, canActivate: [AuthGuardService]},
  {path: 'newIssue', component: IssueFormComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class IssuesRoutingModule { }
