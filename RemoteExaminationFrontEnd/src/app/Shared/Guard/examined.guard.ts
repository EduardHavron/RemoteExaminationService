import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthorizationService} from '../Services/Auth/authorization.service';
import {CustomToastrService} from '../Services/CustomToastr/custom-toastr.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ExaminedGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private authenticationService: AuthorizationService,
    private customToastrService: CustomToastrService,
    private translateService: TranslateService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authenticationService.isAdmin || this.authenticationService.isExamined) {
      return true;
    } else {
      this.router.navigate(['/'])
        .then(() => {
          this.customToastrService.showToast('top-right',
            'danger',
            3000,
            this.translateService.instant('You don\'t have permission to load this page'),
            this.translateService.instant('Error'));
        });
    }
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authenticationService.isAdmin || this.authenticationService.isExamined) {
      return true;
    } else {
      this.router.navigate(['/'])
        .then(() => {
          this.customToastrService.showToast('top-right',
            'danger',
            3000,
            this.translateService.instant('You don\'t have permission to load this page'),
            this.translateService.instant('Error'));
        });
    }
  }
}
