import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {CompanyDto} from "../Models/company-dto";
import {AuthService} from "./auth.service";
import {Subject} from "rxjs/Subject";

@Injectable()
export class CompanyService {
  private companySubject: Subject<CompanyDto[]> = new Subject();
  private readonly baseUrl = 'https://localhost:44318/api';

  constructor(private http: Http, private authService: AuthService) {
  }

  public getAllCompanies(): Subject<CompanyDto[]> {
    this.authService.getToken().toPromise().then(t => {
      this.http.get(`${this.baseUrl}/v1/companies`, {
        headers: new Headers({'Authorization': `Bearer ${t.toString()}`})
      }).toPromise()
        .then(res => {
          this.companySubject.next(res.json());
        });
    });
    return this.companySubject;
  }

}
