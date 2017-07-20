import { Injectable } from '@angular/core';
import {AdalService} from "ng2-adal/core";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SecretService {
  public get adalConfig(): any {
    return {
      tenant: 'presentationsolutions.eu',
      clientId: '930cdbae-12b8-409d-94c8-8e64ed1f2254',
      redirectUri: window.location.origin + '/',
      postLogoutRedirectUri: window.location.origin + '/'
    };
  }
}
