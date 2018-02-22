import { Idea } from './../models/Idea';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';
import { API } from './../app.constant';
import { Observable } from 'rxjs/Observable';
import { JwtHttp } from 'angular2-jwt-refresh';
import { Router } from '@angular/router';
import 'rxjs/Rx';

@Injectable()
export class IdeasService {
  constructor(private jwtHttp: JwtHttp, private router: Router) {}

  /**
   * Create new idea
   *
   * @param {string} body
   * @returns {Observable<Object>}
   * @memberof IdeasService
   */
  createNewIdea(body: Idea.Body): Observable<Object> {
    return this.jwtHttp
      .post(environment.api + API.IDEAS.CREATE, body)
      .map(response => response.json())
      .catch((error: Response) => {
        return this.getUnAuthErrorHandler(error);
      });
  }

  /**
   * Get Ideas
   *
   * @param {number} page
   * @returns {Observable<Object>}
   * @memberof IdeasService
   */
  getIdeas(page: number): Observable<Object> {
    return this.jwtHttp
      .get(environment.api + API.IDEAS.GET + `?page=${page}`)
      .map(response => {
        return {
          page: page,
          data: response.json()
        };
      })
      .catch((error: Response) => {
        return this.getUnAuthErrorHandler(error);
      });
  }

  /**
   * Get All Ideas recursive
   *
   * @returns {Observable<Object>}
   * @memberof IdeasService
   */
  getAllIdeas() {
    return this.getIdeas(1).expand((res: any) => {
      return res.data && res.data.length === 10
        ? this.getIdeas(res.page + 1)
        : Observable.empty();
    });
  }

  /**
   * Delete idea
   *
   * @param {string} id
   * @returns {Observable<Object>}
   * @memberof IdeasService
   */
  deleteIdea(id: string): Observable<Object> {
    return this.jwtHttp
      .delete(environment.api + API.IDEAS.DELETE + id)
      .map(response => response.json())
      .catch((error: Response) => {
        return this.getUnAuthErrorHandler(error);
      });
  }

  /**
   * Delete idea
   *
   * @param {string} id
   * @param {string} body
   * @returns {Observable<Object>}
   * @memberof IdeasService
   */
  updateIdea(body: Idea.Get): Observable<Object> {
    return this.jwtHttp
      .put(environment.api + API.IDEAS.UPDATE + body.id, body)
      .map(response => response.json())
      .catch((error: Response) => {
        return this.getUnAuthErrorHandler(error);
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
