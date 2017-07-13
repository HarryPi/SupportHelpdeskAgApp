import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {IssueDto} from "../Models/issue-dto";
import {AuthService} from "./auth.service";
import {AdalService} from "ng2-adal/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class IssuesService {
  private issueSubject: Subject<IssueDto[]> = new Subject();

  constructor(private http: Http, private authService: AuthService, private adalService: AdalService) {
  }

  public onGoingIssues(): Subject<IssueDto[]> {
    this.authService.getToken().toPromise().then(t => {
      this.http.get('https://helpdesk.presentationsolutions.eu/api/Issues/GetIssuesByFlag/32', {
        headers: new Headers({'Authorization': `Bearer ${t.toString()}`})
      }).toPromise()
        .then(res => {
          this.issueSubject.next(res.json());
        });
    });
    return this.issueSubject;
  }

  public myIssues(): Subject<IssueDto[]> {
    this.authService.getToken().toPromise().then(t => {
      this.http.get(`https://helpdesk.presentationsolutions.eu/api/Issues/GetIssuesByFlag/32?psUserEmail=${this.adalService.userInfo.userName}`, {
        headers: new Headers({'Authorization': `Bearer ${t.toString()}`})
      }).toPromise()
        .then(res => {
          this.issueSubject.next(res.json());
        });
    });
    return this.issueSubject;
  }
}
