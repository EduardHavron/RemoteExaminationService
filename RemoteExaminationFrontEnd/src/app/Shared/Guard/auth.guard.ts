import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthorizationService} from '../Services/Auth/authorization.service';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  private user: any = null;

  constructor(
    private router: Router,
    private authenticationService: AuthorizationService
  ) {
    authenticationService.currentUser.subscribe((x) => {
      this.user = x;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.user) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigateByUrl('/authorize');
    return false;
  }

  canLoad(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.user) {
      return true;
    }

    this.router.navigate(['/authorize']);
    return false;
  }
}
