import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IssuesRoutingModule} from "./issues-routing.module";
import {IssuesComponent} from "./issues.component";
import {DataTableModule, DropdownModule, FileUploadModule, MenubarModule, MultiSelectModule} from "primeng/primeng";
import {IssueFormComponent} from "./issue-form/issue-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IssuesRoutingModule,
    DataTableModule,
    MenubarModule,
    DropdownModule,
    FormsModule,
    BrowserAnimationsModule,
    MultiSelectModule,
    FileUploadModule,
  ],
  declarations: [IssuesComponent, IssueFormComponent],
  exports: [
    IssuesRoutingModule,
    IssuesComponent
  ]
})
export class IssuesModule { }
