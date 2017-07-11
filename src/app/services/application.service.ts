import { Injectable } from '@angular/core';
import {AdalService} from 'ng2-adal/core';
import {Headers, Http} from '@angular/http';
import {AuthService} from "./auth.service";
import {PslApplicationDto} from "../Models/psl-application-dto";

@Injectable()
export class ApplicationService {

  constructor(private authService: AuthService, private http: Http){}

  public get getAllPslApplications(): Promise<Array<PslApplicationDto>>{
    return this.http.get('https://helpdesk.presentationsolutions.eu/api/pslApplications', {headers: new Headers({
      'Authorization': `Bearer ${this.authService.getToken}`
    })})
      .toPromise()
      .then(res => {
        return <PslApplicationDto[]>res.json();
      });
  }

}
