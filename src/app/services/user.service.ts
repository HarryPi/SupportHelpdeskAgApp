import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {CompanyDto} from "../Models/company-dto";
import {PsUserDto} from "../Models/ps-user-dto";
import {AuthService} from "./auth.service";
import {Subject} from "rxjs/Subject";


@Injectable()
export class UserService {
  private userSubject: Subject<PsUserDto[]> = new Subject();
  private companySubject: Subject<CompanyDto> = new Subject();

  constructor(private http: Http, private authService: AuthService) {
  }

  public getAllUsersForCompany(companyId: number): Subject<CompanyDto> {
    this.authService.getToken().toPromise().then(t => {
      this.http.get('https://helpdesk.presentationsolutions.eu/api/companies/' + companyId, {
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
      this.http.get('https://helpdesk.presentationsolutions.eu/api/psUsers',
        {headers: new Headers({'Authorization': `Bearer ${t.toString()}`})}
      ).toPromise()
        .then(res => {
          this.userSubject.next(res.json());
        });
    });
    return this.userSubject;
  }

}
