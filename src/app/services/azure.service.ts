import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {AuthService} from './auth.service';
import {Observable} from "rxjs/Observable";


@Injectable()
export class AzureService {

  private readonly baseUrl = 'https://localhost:44318/api';

  constructor(private http: Http, private auth: AuthService) { }

  public postBlob(file: FormData): Observable<string> {
    return new Observable(observer => {
      this.auth.getToken().subscribe(t => {
        this.http.post(
          `${this.baseUrl}/v1/blob`, file,
          {headers: new Headers({'Authorization': `Bearer ${t.toString()}`})
          }).toPromise().then(res => {
            observer.next(res.json())
            observer.complete();
          },
          rej => {
            observer.error(rej.toString());
          });
      });

    });
  }
}
