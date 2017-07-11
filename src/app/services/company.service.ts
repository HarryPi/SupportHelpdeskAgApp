import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {AdalService} from "ng2-adal/core";
import {CompanyDto} from "../Models/company-dto";

@Injectable()
export class CompanyService {

  constructor(private http: Http, private adalService: AdalService) { }

  get getAllCompanies(): Promise<Array<CompanyDto>> {
    return this.http.get('https://helpdesk.presentationsolutions.eu/api/companies', {
      headers: new Headers({'Authorization': `Bearer ${this.adalService.getCachedToken(this.adalService.config.clientId)}`})
    }).toPromise()
      .then(res => {
        return <CompanyDto[]>res.json();
      });
  }

}
