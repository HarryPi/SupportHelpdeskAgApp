import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IssuesRoutingModule} from './issues-routing.module';
import {IssuesComponent} from './issues.component';
import {DataTableModule, MenubarModule} from "primeng/primeng";
import { IssueFormComponent } from './issue-form/issue-form.component';

@NgModule({
  imports: [
    CommonModule,
    IssuesRoutingModule,
    DataTableModule,
    MenubarModule
  ],
  declarations: [IssuesComponent, IssueFormComponent],
  exports: [
    IssuesRoutingModule,
    IssuesComponent
  ]
})
export class IssuesModule { }
