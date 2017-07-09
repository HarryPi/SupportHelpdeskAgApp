import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AdalService} from "ng2-adal/core";

@Injectable()
export class AuthGuardService implements CanActivate{
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.adalService.userInfo.isAuthenticated) {
      this.adalService.login();
    }
    return true;
  }
  constructor(private adalService: AdalService){

  }
}
