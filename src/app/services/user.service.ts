import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AdalService} from 'ng2-adal/core';
import {CompanyDto} from '../Models/company-dto';
import {PsUserDto} from "../Models/ps-user-dto";


@Injectable()
export class UserService {

  constructor(private http: Http, private adalService: AdalService) { }

   public getAllUsersForCompany(companyId: number): Promise<CompanyDto> {
    return this.http.get('https://helpdesk.presentationsolutions.eu/api/companies/' + companyId, {
      headers: new Headers({'Authorization': `Bearer ${this.adalService.getCachedToken(this.adalService.config.clientId)}`})
    }).toPromise()
      .then(res => {
        return <CompanyDto>res.json();
      });
  }
  public get getAllPsUsers(): Promise<Array<PsUserDto>>{
    return this.http.get('https://helpdesk.presentationsolutions.eu/api/psUsers',
      {headers: new Headers({'Authorization': `Bearer ${this.adalService.getCachedToken(this.adalService.config.clientId)}`})}
      ).toPromise()
      .then(res => {
        return <PsUserDto[]> res.json();
      });
  }

}
