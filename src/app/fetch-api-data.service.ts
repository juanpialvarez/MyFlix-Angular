import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://myflix94.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})

/**
 * Class FetchApiDataService
 * Includes all functions relating to obtaining data from the API
 */
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  private _refreshrequired = new Subject<void>();

  get Refreshrequired() {
    return this._refreshrequired;
  }

  /**
   * Registers a user
   * @return {Observable<any>}
   */
  userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Logs a user in
   * @return {Observable<any>}
   * In body returns token and user
   */
  userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Logs a user in
   * @return {Observable<any>}
   * In body returns list of all movie objects
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get single movie
   * @param {string} title the title of a movie.
   * @return {Observable<any>}
   * In body returns a single movie object.
   */

  getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movie/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get director
   * @param {string} name name of a director.
   * @return {Observable<any>}
   * In body returns a single director object.
   */

  getDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'director/' + name, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get genre
   * @param {string} genre name of a director.
   * @return {Observable<any>}
   * In body returns a single genre object.
   */

  getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'genre/' + genre, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get user
   * @return {Observable<any>}
   * In body returns a single user object.
   */

  getUser(): Observable<any> {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + user, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(tap(() => this.Refreshrequired.next()))
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Add movie to user favorites
   * @param {string} movieId the ID of a specific movie
   * @return {Observable<any>}
   */

  addFavoriteMovie(movieId: string): Observable<any> {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .put(
        apiUrl + 'users/' + user + '/movies/' + movieId,
        { movieId: movieId },
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Change user name
   * @param {string} newUserName the new name specified by a user
   * @return {Observable<any>}
   * In body returns user object
   */

  changeUserName(newUserName: string): Observable<any> {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .put(
        `${apiUrl}users/username/${user}/${newUserName}`,
        { newName: newUserName },
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Deletes movie from user favorites
   * @param {string} movieId the ID of a specific movie
   * @return {Observable<any>}
   */

  deleteFavoriteMovie(movieId: string): Observable<any> {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/' + user + '/movies/' + movieId, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Deletes user
   * @return {Observable<any>}
   */
  deleteUser(): Observable<any> {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/' + user, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status},` + `Error body is: ${error.error}`
      );
    }
    return throwError(() => 'Something bad happened; please try again later');
  }
}
