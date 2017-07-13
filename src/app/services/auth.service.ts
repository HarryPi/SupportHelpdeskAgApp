import {Injectable} from "@angular/core";
import {AdalService} from "ng2-adal/core";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthService {

  constructor(private adalService: AdalService){}

  public  getToken(): Observable<string> {
    try {
      return this.adalService.acquireToken(this.adalService.config.clientId).map(
        token => token.toString()
      );
    } catch (e) {
      this.adalService.login();
      this.getToken();
    };
  }


}
