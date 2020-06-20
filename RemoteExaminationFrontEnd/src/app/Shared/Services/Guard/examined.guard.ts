import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../Auth/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class ExaminedGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthorizationService
  ) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authenticationService.isExamined || this.authenticationService.isAdmin;
  }
}
