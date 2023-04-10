import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthorizeService } from "./authorize.service";

@Injectable()
export class AuthorizeErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authorizeService: AuthorizeService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(catchError(err => {
        if (err.status === 401) {
          if (this.authorizeService.isExpiredToken()) {
            this.authorizeService.logout();
            this.router.navigate(['/authentication/login']);
            return throwError(err);
          }
          this.router.navigate(['/authentication/unauthorized']);
          return throwError(err);
        }
        return throwError(err);
      }));
  }
}
