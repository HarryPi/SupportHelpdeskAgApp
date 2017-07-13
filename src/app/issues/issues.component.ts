import {Component, OnInit} from "@angular/core";
import {IssuesService} from "../services/issues.service";
import {IssueDto} from "../Models/issue-dto";
import {CompletionFlag} from "../Models/completion-flag.enum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  issues: IssueDto[] = [];
  loading = false;
  completionFlag = CompletionFlag;
  constructor(private issueService: IssuesService, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    if (this.router.url.includes('dashboard')) {
      this.issueService.onGoingIssues().subscribe(issues => {
        this.issues = issues;
        this.loading = false;
      });
    } else if (this.router.url.includes('myIssues')) {
      this.issueService.myIssues().subscribe(issues => {
        this.issues = issues;
        this.loading = false;
      });
    }
  }

}
