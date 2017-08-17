import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {IssueCategory} from "../Models/issue-category";
import {AuthService} from "./auth.service";
import {Subject} from "rxjs/Subject";

@Injectable()
export class CategoryService {
  private categorySubject: Subject<IssueCategory[]> = new Subject();
  private readonly baseUrl = 'https://localhost:44318/api';
  constructor(private http: Http, private authService: AuthService) {
  }

  public getAllCategories(): Subject<IssueCategory[]> {
    this.authService.getToken().toPromise().then(t => {
      this.http.get(`${this.baseUrl}/v1/categories`, {
        headers: new Headers({
          'Authorization': `Bearer ${t.toString()}`
        })
      })
        .toPromise()
        .then(res => {
          this.categorySubject.next(res.json());
        });
    });
    return this.categorySubject;
  }
}
