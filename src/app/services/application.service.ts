import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {AuthService} from "./auth.service";
import {PslApplication} from "../Models/psl-application";
import {Subject} from "rxjs/Subject";

@Injectable()
export class ApplicationService {
  private appSubject: Subject<PslApplication[]> = new Subject();

  constructor(private authService: AuthService, private http: Http) {
  }

  public getAllPslApplications(): Subject<Array<PslApplication>> {
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
