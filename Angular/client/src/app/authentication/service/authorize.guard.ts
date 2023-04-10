import { Injectable } from "@angular/core";
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthorizeService } from "./authorize.service";

@Injectable()
export class AuthorizeGuard implements CanActivate, CanActivateChild {

  constructor(
    private authorizeService: AuthorizeService,
    private router: Router,
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authorizeService.isAuthenticated()) {
      return true;
    }

    this.authorizeService.logout();
    this.router.navigate(['/authentication/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}
