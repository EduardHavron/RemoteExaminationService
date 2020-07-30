import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthorizationService} from '../Services/Auth/authorization.service';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {CustomToastrService} from '../Services/CustomToastr/custom-toastr.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthorizationService,
    private customToastrService: CustomToastrService,
    private translateService: TranslateService
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authenticationService
      .currentUserSubject
      .getValue();
    if (user) {
      return true;
    }

    this.router.navigate(['/authorize'])
      .then(() => {
        this.customToastrService.showToast('top-right',
          'danger',
          3000,
          this.translateService.instant('You don\'t have permission to view this page'),
          this.translateService.instant('Error'));
      });
    return false;
  }

  canLoad(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.authenticationService
      .currentUserSubject
      .getValue();
    if (user) {
      return true;
    }

    this.router.navigate(['/authorize'])
      .then(() => {
        this.customToastrService.showToast('top-right',
          'danger',
          3000,
          this.translateService.instant('You don\'t have permission to load this page'),
          this.translateService.instant('Error'));
      });
    return false;
  }
}
