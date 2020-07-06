import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot} from '@angular/router';
import {AuthorizationService} from '../Services/Auth/authorization.service';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UnauthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthorizationService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (!currentUser) {
      // not logged in so return true
      return true;
    }

    // logged in so redirect to login page with the return url
    this.router.navigateByUrl('/dashboard');
    return false;
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this.authenticationService.currentUserValue;

    if (!currentUser) {
      return true;
    }

    this.router.navigate(['/dashboard']);
    return false;
  }
}
