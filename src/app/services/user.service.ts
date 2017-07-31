import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {PsUserDto} from "../Models/ps-user-dto";
import {AuthService} from "./auth.service";
import {Subject} from "rxjs/Subject";
import {PersonDto} from "../Models/person-dto";


@Injectable()
export class UserService {
  private userSubject: Subject<PsUserDto[]> = new Subject();
  private companySubject: Subject<PersonDto[]> = new Subject();
  private readonly baseUrl = 'https://localhost:44318/api';
  constructor(private http: Http, private authService: AuthService) {
  }

  public getAllUsersForCompany(companyId: number): Subject<PersonDto[]> {
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

  public getAllPsUsers(): Subject<PsUserDto[]> {
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
