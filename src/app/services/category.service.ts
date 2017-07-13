import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {IssueCategoryDto} from "../Models/issue-category-dto";
import {AuthService} from "./auth.service";
import {Subject} from "rxjs/Subject";

@Injectable()
export class CategoryService {
  private categorySubject: Subject<IssueCategoryDto[]> = new Subject();

  constructor(private http: Http, private authService: AuthService) {
  }

  public getAllCategories(): Subject<IssueCategoryDto[]> {
    this.authService.getToken().toPromise().then(t => {
      this.http.get('https://helpdesk.presentationsolutions.eu/api/issueCategories', {
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
