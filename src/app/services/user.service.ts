import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {PsUser} from "../Models/ps-user";
import {AuthService} from "./auth.service";
import {Subject} from "rxjs/Subject";
import {Person} from "../Models/person";


@Injectable()
export class UserService {
  private userSubject: Subject<PsUser[]> = new Subject();
  private companySubject: Subject<Person[]> = new Subject();
  private readonly baseUrl = 'https://localhost:44318/api';
  constructor(private http: Http, private authService: AuthService) {
  }

  public getAllUsersForCompany(companyId: number): Subject<Person[]> {
    this.authService.getToken().toPromise().then(t => {
      this.http.get( this.baseUrl + '/v1/users/' + companyId, {
        headers: new Headers({'Authorization': `Bearer ${t.toString()}`})
      }).toPromise()
        .then(res => {
          this.companySubject.next(res.json());
        });
    });
    return this.companySubject;
  }

  public getAllPsUsers(): Subject<PsUser[]> {
    this.authService.getToken().toPromise().then(t => {
      this.http.get(`${this.baseUrl}/v1/psUsers`,
        {headers: new Headers({'Authorization': `Bearer ${t.toString()}`})}
      ).toPromise()
        .then(res => {
          this.userSubject.next(res.json());
        });
    });
    return this.userSubject;
  }

}
