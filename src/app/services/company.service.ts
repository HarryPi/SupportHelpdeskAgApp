import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {CompanyDto} from "../Models/company-dto";
import {AuthService} from "./auth.service";
import {Subject} from "rxjs/Subject";

@Injectable()
export class CompanyService {
  private companySubject: Subject<CompanyDto[]> = new Subject();

  constructor(private http: Http, private authService: AuthService) {
  }

  public getAllCompanies(): Subject<CompanyDto[]> {
    this.authService.getToken().toPromise().then(t => {
      this.http.get('https://helpdesk.presentationsolutions.eu/api/companies', {
        headers: new Headers({'Authorization': `Bearer ${t.toString()}`})
      }).toPromise()
        .then(res => {
          this.companySubject.next(res.json());
        });
    });
    return this.companySubject;
  }

}
