import { Injectable, Output, EventEmitter } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { API } from './../app.constant';
import { JwtHelper } from 'angular2-jwt';
import { User } from '../models/User';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';

@Injectable()
export class UsersService {
  @Output() currentUserChanged = new EventEmitter(true);

  jwtHelper: JwtHelper = new JwtHelper();
  currentUser: User.IUser;

  constructor(private http: HttpClient, private authHttp: AuthHttp) {}

  /**
   * Login and set localStorage token
   *
   * @param {User.IUser} user
   * @memberof UsersService
   */
  login(user: User.IUser): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http
      .post<User.ILogin>(environment.api + API.USERS.LOGIN, user, httpOptions)
      .map(data => {
        if (data) {
          this.currentUser = this.jwtHelper.decodeToken(data.jwt);

          // set token in localStorage
          localStorage.setItem('token', data.jwt);
          localStorage.setItem('refresh_token', data.refresh_token);

          // emit to current user side bar
          this.currentUserChanged.emit();
        }
      });
  }

  /**
   * Logout user
   *
   * @returns {Observable<void>}
   * @memberof UsersService
   */
  logout(): Observable<void> {
    const body: object = {
      refresh_token: localStorage.refresh_token
    };

    return this.authHttp
      .delete(environment.api + API.USERS.LOGIN, { body })
      .map(data => {
        this.removeTokens();
      });
  }

  /**
   * Remove tokens
   *
   * @memberof UsersService
   */
  removeTokens(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
  }

  /**
   * Get Current User from API
   *
   * @param {string} token
   * @returns {Observable<Object>}
   * @memberof UsersService
   */
  getMe(): Observable<Object> {
    return this.authHttp
      .get(environment.api + API.USERS.ME)
      .map(response => response.json());
  }

  /**
   * Get is user is logged in or not checking for token expired and if token exist, also refresh token if its needed
   *
   * @returns {boolean}
   * @memberof UsersService
   */
  isLoggedIn(): boolean {
    const { token } = localStorage;
    let isExpired: boolean;

    if (!token) {
      return false;
    }

    try {
      isExpired = !this.jwtHelper.isTokenExpired(token);

      // if (isExpired) {
      //   this.refreshToken()
      //   .subscribe();
      // }
    } catch (error) {
      isExpired = false;
      this.removeTokens();
      return isExpired;
    }
    return isExpired;
  }

  /**
   * Refresh token and set new one on localStorage
   *
   * @returns
   * @memberof UsersService
   */
  private refreshToken() {
    const body = {
      refresh_token: localStorage.refresh_token
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http
      .post(environment.api + API.USERS.REFRESH, body, httpOptions)
      .map((data: any) => {
        // set token in localStorage
        localStorage.removeItem('token');
        localStorage.setItem('token', data.jwt);
      });
  }

  registration(user: User.ISignUp) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http
      .post<User.ILogin>(environment.api + API.USERS.SIGNUP, user, httpOptions)
      .map(data => {
        localStorage.setItem('token', data.jwt);
        localStorage.setItem('refresh_token', data.refresh_token);
      });
  }
}
