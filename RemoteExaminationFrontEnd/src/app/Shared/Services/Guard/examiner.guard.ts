import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthorizationService} from '../Auth/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class ExaminerGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthorizationService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authenticationService.isExaminer || this.authenticationService.isAdmin;
  }
}
