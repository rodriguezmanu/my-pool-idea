import { Idea, Get } from './../models/Idea';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { API } from './../app.constant';


@Injectable()
export class IdeasService {
  constructor(private authHttp: AuthHttp) {}

  /**
   * Create new idea
   *
   * @param {string} body
   * @returns {Observable<Object>}
   * @memberof IdeasService
   */
  createNewIdea(body: Idea.Body): Observable<Object> {
    return this.authHttp
      .post(environment.api + API.IDEAS.CREATE, { body })
      .map(response => response.json());
  }

  /**
   * Get Ideas
   *
   * @param {number} page
   * @returns {Observable<Object>}
   * @memberof IdeasService
   */
  getIdeas(page: number): Observable<Object> {
    return this.authHttp
      .get(environment.api + API.IDEAS.GET)
      .map(response => response.json());
  }

  /**
   * Delete idea
   *
   * @param {string} id
   * @returns {Observable<Object>}
   * @memberof IdeasService
   */
  deleteIdea(id: string): Observable<Object> {
    return this.authHttp
      .delete(environment.api + API.IDEAS.DELETE + id)
      .map(response => response.json());
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
    return this.authHttp
      .put(environment.api + API.IDEAS.UPDATE + body.id, { body })
      .map(response => response.json());
  }
}
