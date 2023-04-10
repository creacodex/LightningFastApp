import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { EntitiesResult } from 'src/app/model/entities-result.model';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

export class WebApiService<T> {

  public webApiUrl = environment.webApiUrl;
  public attemps = 1;

  constructor(protected http: HttpClient, protected controller: string) {
    this.webApiUrl += `${controller}`;
  }

  list(): Observable<T[]>;
  list(id: string): Observable<T[]>;
  list(page: number, pageSize: number, orderBy: string, isAscending: boolean, searchField: string, searchValue: string): Observable<EntitiesResult<T>>;

  list(pageOrId?: number | string, pageSize?: number, orderBy?: string, isAscending?: boolean, searchField?: string, searchValue?: string): Observable<T[] | EntitiesResult<T>> {
    if(typeof pageOrId === 'number') {
      return this.http.get<EntitiesResult<T>>(
        `${this.webApiUrl}?page=${pageOrId}&pageSize=${pageSize}&orderBy=${orderBy}&isAscending=${isAscending}&searchField=${searchField}&searchValue=${searchValue}`
        ).pipe(retry(this.attemps), catchError(this.handleError));
    } else if (typeof pageOrId === 'string') {
      return this.http.get<T[]>(`${this.webApiUrl}/list/${pageOrId}`)
        .pipe(retry(this.attemps), catchError(this.handleError));
    } else if (typeof pageOrId == 'undefined') {
      return this.http.get<T[]>(`${this.webApiUrl}/list`)
        .pipe(retry(this.attemps), catchError(this.handleError));
    }
  }

  find(id: string): Observable<T> {
    return this.http.get<T>(`${this.webApiUrl}/${id}`)
      .pipe(retry(this.attemps), catchError(this.handleError));
  }

  add(entity: T): Observable<{}> {
    return this.http.post(`${this.webApiUrl}`, entity)
      .pipe(retry(this.attemps), catchError(this.handleError));
  }

  update(entity: T): Observable<{}> {
    return this.http.put(`${this.webApiUrl}`, entity, httpOptions)
      .pipe(retry(this.attemps), catchError(this.handleError));
  }

  delete(id: string): Observable<{}> {
    return this.http.delete(`${this.webApiUrl}/${id}`)
      .pipe(retry(this.attemps), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {

    return throwError(`Backend returned code ${error.status} ` +
      `Message: ${error.message} ` +
      `Body was ${JSON.stringify(error.error)}`);

    //   if (error.error instanceof ErrorEvent) {
    //     // A client-side or network error occurred. Handle it accordingly.
    //     return throwError('Oh! Something wrong happend. Could you please refresh the page and try again?');
    //   }
    //   // The backend returned an unsuccessful response code.
    //   // The response body may contain clues as to what went wrong,
    //   console.error(`Backend returned code ${error.status}` + `Body was ${error.error}`);
    //   return throwError('Oh! Something wrong happend with our platform. Could you please try again or maybe later?');
  }
}
