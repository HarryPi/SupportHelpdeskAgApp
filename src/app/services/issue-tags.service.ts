import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {Headers, Http} from "@angular/http";
import {IssueTags} from "../Models/issue-tags";

@Injectable()
export class IssueTagsService {

  private readonly baseUrl: string = 'https://localhost:44318/api';

  constructor(private auth: AuthService, private http: Http) { }

  public getTagsForCategory(categoryId: number): Promise<IssueTags[]> {
    const promise = new Promise((resolve, reject) => {
      resolve(this.auth.getToken().toPromise().then(t => {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${t.toString()}`);
        this.http.get(`${this.baseUrl}/v1/tags`, {headers: headers}).toPromise().then( res =>{
          return res.json();
        });
      }));
    });
    return promise;
  }

}
