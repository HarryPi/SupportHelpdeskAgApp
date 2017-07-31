import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {AuthService} from "./auth.service";
import {SolutionDto} from "../Models/solution-dto";
import {Subject} from "rxjs/Subject";

@Injectable()
export class SolutionsService {

  private stockResponseSubject: Subject<SolutionDto[]> = new Subject<SolutionDto[]>();
  private baseUrl = 'https://localhost:44318/api';

  constructor(private authService: AuthService, private http: Http) {
  }

  public getStockResponsesForCategory(categoryId: number): Subject<SolutionDto[]> {
    this.authService.getToken().toPromise().then(t => {

      const headers = new Headers();
      headers.append('Authorization', `Bearer ${t.toString()}`);

      this.http.get(`${this.baseUrl}/v1/stockResponses/${categoryId}`, {
        headers: headers
      }).toPromise().then(res => {
        this.stockResponseSubject.next(res.json());
      });
    });
    return this.stockResponseSubject;
  }
}
