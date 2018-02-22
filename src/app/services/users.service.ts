import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { API } from './../app.constant';
import { JwtHelper } from 'angular2-jwt';
import { User } from '../models/User';
import { JwtHttp } from 'angular2-jwt-refresh';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class UsersService {
  @Output() currentUserChanged = new EventEmitter(true);

  jwtHelper: JwtHelper = new JwtHelper();
  currentUser: User.IUser;

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHttp: JwtHttp
  ) {
    if (localStorage.getItem('token')) {
      this.getMe().subscribe((user: User.IUser) => {
        this.currentUser = user;

        this.router.navigate(['/ideas']);

        // emit to current user side bar
        this.currentUserChanged.emit(user);
      });
    }
  }

  /**
   * Login and set localStorage token
   *
   * @param {User.IUser} user
   * @memberof UsersService
   */
  login(user: User.IUser): Observable<void> {
    return this.http
      .post<User.ILogin>(environment.api + API.USERS.LOGIN, user)
      .map((data: User.ILogin) => {
        if (data) {
          this.setTokens(data.jwt, data.refresh_token);

          this.getMe().subscribe((response: User.IUser) => {
            this.currentUser = response;
            // emit to current user side bar
            this.currentUserChanged.emit(response);
          });
        }
      });
  }

  /**
   * Set Tokens in localStorage
   *
   * @param {string} jwt
   * @param {string} refresh
   * @memberof UsersService
   */
  setTokens(jwt: string, refresh: string): void {
    localStorage.setItem('token', jwt);
    localStorage.setItem('refresh_token', refresh);
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

    return this.jwtHttp
      .delete(environment.api + API.USERS.LOGIN, { body })
      .map((data) => {
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
    return this.jwtHttp
      .get(environment.api + API.USERS.ME)
      .map((response) => response.json())
      .catch((error: Response) => {
        return this.getUnAuthErrorHandler(error);
      });
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

    if (this.currentUser) {
      return !!this.currentUser.email;
    }

    try {
      isExpired = !this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      isExpired = false;
    }

    return isExpired;
  }

  /**
   * Registration API
   *
   * @param {User.ISignUp} user
   * @returns
   * @memberof UsersService
   */
  registration(user: User.ISignUp) {
    return this.http
      .post<User.ILogin>(environment.api + API.USERS.SIGNUP, user)
      .map(data => {
        this.setTokens(data.jwt, data.refresh_token);
      });
  }

  /**
   * Get handler error fror 401 unauthorize
   *
   * @param {Response} error
   * @returns {Observable<Response>}
   * @memberof IdeasService
   */
  getUnAuthErrorHandler(error: Response): Observable<Response> {
    if (error.status === 401) {
      this.router.navigate(['/login']);
    }
    return Observable.throw(error);
  }
}
