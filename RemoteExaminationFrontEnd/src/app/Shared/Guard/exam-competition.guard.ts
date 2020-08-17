import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthorizationService} from '../Services/Auth/authorization.service';
import {CustomToastrService} from '../Services/CustomToastr/custom-toastr.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ExamCompetitionGuard implements CanActivate {
  constructor(private router: Router,
              private authenticationService: AuthorizationService,
              private customToastrService: CustomToastrService,
              private translateService: TranslateService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authenticationService.isAdmin) {
      return true;
    }
    if (this.authenticationService.isExamined) {
      const examId = next.params.examId;
      const localItem = localStorage.getItem(examId);
      if (localItem === 'approved') {
        return true;
      }
    }
    return false;
  }

  canLoad(
    route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authenticationService.isAdmin) {
      return true;
    }
    if (this.authenticationService.isExamined) {
      const examId = route.params.examId;
      const localItem = localStorage.getItem(examId);
      if (localItem === 'approved') {
        return true;
      }
    }
    return false;
  }
}
