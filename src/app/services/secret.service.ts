import { Injectable } from '@angular/core';
import {AdalService} from "ng2-adal/core";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SecretService {
  public get adalConfig(): any {
    return {
      tenant: 'presentationsolutions.eu',
      clientId: '602b7808-ff84-484a-9037-a84233f88208',
      redirectUri: window.location.origin + '/',
      postLogoutRedirectUri: window.location.origin + '/'
    };
  }
}
