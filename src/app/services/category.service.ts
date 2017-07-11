import { Injectable } from '@angular/core';
import {AdalService} from 'ng2-adal/core';
import {Http, Headers} from '@angular/http';
import {IssueCategoryDto} from "../Models/issue-category-dto";

@Injectable()
export class CategoryService {

  constructor(private http: Http, private adalService: AdalService) { }

  get getAllCategories(): Promise<IssueCategoryDto[]>{
    const headers: Headers = new Headers({
      'Authorization': 'Bearer ' + this.adalService.getCachedToken(this.adalService.config.clientId)
    });
    return this.http.get('https://helpdesk.presentationsolutions.eu/api/issueCategories', {headers: headers})
      .toPromise()
      .then(res => {
        return <IssueCategoryDto[]> res.json();
      });
  }
}
