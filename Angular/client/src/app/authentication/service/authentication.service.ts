import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ConfirmInvitation } from '../model/confirm-invitation.model';
import { Credentials } from '../model/credentials.model';
import { ForgotPassword } from '../model/forgot-password.model';
import { Invitation } from '../model/invitation.model';
import { Register } from '../model/register.model';
import { ResetPassword } from '../model/reset-password.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable()
export class AuthenticationService {

  public webApiUrl = environment.webApiUrl;
  public controller = 'authentication';
  public attemps = 0;

  constructor(protected http: HttpClient) {
    this.webApiUrl += `${this.controller}`;
  }

  register(entity: Register): Observable<{}> {
    return this.http.post(`${this.webApiUrl}/register`, entity)
      .pipe(retry(this.attemps), catchError(this.handleError));
  }

  invite(entity: Invitation): Observable<{}> {
    return this.http.post(`${this.webApiUrl}/invite`, entity)
      .pipe(retry(this.attemps), catchError(this.handleError));
  }

  login(entity: Credentials): Observable<{}> {
    return this.http.post(`${this.webApiUrl}/login`, entity)
      .pipe(retry(this.attemps), catchError(this.handleError));
  }

  forgotPassword(entity: ForgotPassword): Observable<{}> {
    return this.http.post(`${this.webApiUrl}/forgot-password`, entity)
      .pipe(retry(this.attemps), catchError(this.handleError));
  }

  confirmEmail(userId: string, code: string): Observable<{}> {
    return this.http.get(`${this.webApiUrl}/confirm-email?userId=${userId}&code=${code}`)
      .pipe(retry(this.attemps), catchError(this.handleError));
  }

  resetPassword(entity: ResetPassword): Observable<{}> {
    return this.http.post(`${this.webApiUrl}/reset-password`, entity)
      .pipe(retry(this.attemps), catchError(this.handleError));
  }

  confirmInvitation(entity: ConfirmInvitation): Observable<{}> {
    return this.http.post(`${this.webApiUrl}/confirm-invitation`, entity)
      .pipe(retry(this.attemps), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {

    return throwError(`Backend returned code ${error.status} ` +
      `Message: ${error.message} ` +
      `Body was ${JSON.stringify(error.error)}`);

    // if (error.error instanceof ErrorEvent) {
    //     // A client-side or network error occurred. Handle it accordingly.
    //     return throwError('Oh! Something wrong happend. Could you please refresh the page and try again?');
    // }
    // // The backend returned an unsuccessful response code.
    // // The response body may contain clues as to what went wrong,
    // console.error(`Backend returned code ${error.status}` + `Body was ${error.error}`);
    // return throwError('Oh! Something wrong happend with our platform. Could you please try again or maybe later?');
  }
}
