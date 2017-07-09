import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {AdalService} from "ng2-adal/core";

@Injectable()
export class IssuesService {

  constructor(private http: Http, private adalService: AdalService) { }

}
