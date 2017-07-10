import {Component, OnInit} from "@angular/core";
import {MenuItem} from "primeng/primeng";

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styles: []
})
export class IssueFormComponent implements OnInit {

  private items: Array<MenuItem>;

  constructor() {
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Email Functions',
        items: [
          {
            label: 'Make stock response',
            icon: 'fa-plus'
          },
          {
            label: 'Do not make stock response',
            icon: 'fa-minus'
          }]
      },
      {
        label: 'Email Response Functions',
        items: [
          {
            label: 'Send Response Email',
            icon: 'fa-mail-forward'
          },
          {
            label: 'Preview Email',
            icon: 'fa-envelope-o',
          },
          {
            label: 'Edit Email',
            icon: 'fa-edit'
          }
        ]
      }
    ];
  }

}
