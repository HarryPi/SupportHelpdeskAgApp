import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AdalService} from 'ng2-adal/core';
import 'rxjs/add/operator/toPromise';
import {IssueDto} from '../Models/issue-dto';

@Injectable()
export class IssuesService {

  constructor(private http: Http, private adalService: AdalService) { }

  get onGoingIssues(): Promise<Array<IssueDto>> {
    return this.http.get('https://helpdesk.presentationsolutions.eu/api/Issues/GetIssuesByFlag/32', {
      headers: new Headers({'Authorization': 'Bearer ' + this.adalService.getCachedToken(this.adalService.config.clientId)})
    })
      .toPromise()
      .then(res => { return <IssueDto[]>res.json(); });
  }
  get myIssues(): Promise<Array<IssueDto>> {
    return this.http.
    get(`https://helpdesk.presentationsolutions.eu/api/Issues/GetIssuesByFlag/32?psUserEmail=${this.adalService.userInfo.userName}`, {
      headers: new Headers({'Authorization': 'Bearer ' + this.adalService.getCachedToken(this.adalService.config.clientId)})
    })
      .toPromise()
      .then(res => { return <IssueDto[]>res.json(); });
  }
}
