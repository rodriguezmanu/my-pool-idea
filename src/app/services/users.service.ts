import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { API } from './../app.constant';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  /**
   * Login and set localStorage token
   *
   * @param {any} user
   * @memberof UsersService
   */
  login(user): Observable<any> {

    // @todo add interceptor
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }
    )};

    return this.http
      .post(API.URL + API.LOGIN, user, httpOptions)
      .map(data => {
        if (data) {
          localStorage.setItem('token', JSON.stringify(data));
        }
      });
  }
}
