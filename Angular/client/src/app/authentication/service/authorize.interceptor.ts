import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthorizeService } from "./authorize.service";

@Injectable()
export class AuthorizeInterceptor implements HttpInterceptor {

  constructor(
    private authorizeService: AuthorizeService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authorizeService.isAuthenticated) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authorizeService.token}`,
        }
      });
    }
    return next.handle(request);
  }
}
