import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {AuthService} from "./auth.service";
import {PslApplicationDto} from "../Models/psl-application-dto";
import {Subject} from "rxjs/Subject";

@Injectable()
export class ApplicationService {
  private appSubject: Subject<PslApplicationDto[]> = new Subject();

  constructor(private authService: AuthService, private http: Http) {
  }

  public getAllPslApplications(): Subject<Array<PslApplicationDto>> {
    const tokenSubscription = this.authService.getToken().subscribe(token => {
      this.http.get('https://helpdesk.presentationsolutions.eu/api/pslApplications', {
        headers: new Headers({
          'Authorization': `Bearer ${token.toString()}`
        })
      })
        .toPromise()
        .then(res => {
          this.appSubject.next(res.json());
          tokenSubscription.unsubscribe();
        });
    });
    return this.appSubject;
  }

}
