import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class AzureService {

  private readonly baseUrl = 'https://localhost:44318/api';

  constructor(private http: Http, private auth: AuthService) { }

  public postBlob(file: FormData): Subject<string> {
    const observable: Subject<string> = new Subject();

    this.auth.getToken().toPromise().then(t => {
      this.http.post(
        `${this.baseUrl}/v1/blob`, file,
        {headers: new Headers({'Authorization': `Bearer ${t.toString()}`})
        }).toPromise().then(res => {
          observable.next(res.json());
          observable.complete();
        },
        rej => {
          observable.error(rej.toString());
        });
    });
    return observable;
  }

  public postAttachment(file: FormData): Observable<string> {
    return new Observable(observer => {
      this.auth.getToken().toPromise().then(t => {
        this.http.post(`https://localhost:44318/api/v1/issues/attachment`,
          file,
          {headers: new Headers({'Authorization': `Bearer ${t.toString()}`})}
          ).toPromise().then(res => {
            observer.next(res.json());
            observer.complete();
        },
          fail => {
            observer.error(fail.toString());
          });
      });
    });
  }
}
