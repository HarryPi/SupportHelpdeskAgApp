import { Component, OnInit } from '@angular/core';
import {IssuesService} from "../services/issues.service";
import {IssueDto} from "../Models/issue-dto";

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  issues: IssueDto[];
  loading: boolean;
  constructor(private issueService: IssuesService) { }

  ngOnInit() {
    this.loading = true;
    this.issueService.allOngoingIssues.then(issues => {
      this.issues = issues;
      this.loading = false;
      console.log(issues);
    });
  }

}
