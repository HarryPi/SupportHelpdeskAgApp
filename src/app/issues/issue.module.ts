import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IssuesComponent} from "./issues.component";
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {IssueRoutingModule} from "./issue-routing.module";

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    SharedModule,
    IssueRoutingModule
  ],
  declarations: [IssuesComponent],
  exports: [IssueRoutingModule]
})
export class IssueModule { }
