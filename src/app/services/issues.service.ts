import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";
import {AdalService} from "ng2-adal/core";
import "rxjs/add/operator/toPromise";
import {IssueDto} from "../Models/issue-dto";

@Injectable()
export class IssuesService {

  constructor(private http: Http, private adalService: AdalService) {}

  get allOngoingIssues(){
    return this.http.get('https://helpdesk.presentationsolutions.eu/api/Issues/GetIssuesByFlag/32',
      {headers: new Headers({'Authorization': 'Bearer ' + this.adalService.getCachedToken(this.adalService.config.clientId)})})
      .toPromise()
      .then(res => <Array<IssueDto>> res.json())
      .then(data => {
        return data;
      })
  }
}
