import {Injectable} from '@angular/core';
import {AdalService} from 'ng2-adal/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(private adalService: AdalService) {
  }

  public getToken(): Observable<string> {
    try {
      return new Observable((observer) => {
        let token: string;
        token = this.adalService.getCachedToken(this.adalService.config.clientId);
        if (!token) {
          this.adalService.acquireToken(this.adalService.config.clientId).toPromise().then(t => {
            token = t.toString();
            this.adalService.handleWindowCallback();
            observer.next(token);
            observer.complete();

          }, t => {
            this.adalService.login();
            this.adalService.handleWindowCallback();
          });
        } else {
          observer.next(token);
          observer.complete();
        }
      });
    }catch (e) {
      this.adalService.login();
      this.adalService.handleWindowCallback();
      this.getToken();
    }
  }
}

