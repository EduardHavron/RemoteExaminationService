import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot} from '@angular/router';
import {AuthorizationService} from '../Services/Auth/authorization.service';
import {Observable} from 'rxjs';
import {CustomToastrService} from '../Services/CustomToastr/custom-toastr.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable({providedIn: 'root'})
export class UnauthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthorizationService,
    private customToastrService: CustomToastrService,
    private translateService: TranslateService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService
      .currentUserSubject
      .getValue();
    if (!currentUser) {
      return true;
    }

    this.router.navigate(['/dashboard'])
      .then(() => {
        this.customToastrService.showToast('top-right',
          'danger',
          3000,
          this.translateService.instant('You already authorized'),
          this.translateService.instant('Error'));
      });
    return false;
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this.authenticationService
      .currentUserSubject
      .getValue();

    if (!currentUser) {
      return true;
    }

    this.router.navigate(['/dashboard'])
      .then(() => {
        this.customToastrService.showToast('top-right',
          'danger',
          3000,
          this.translateService.instant('You already authorized'),
          this.translateService.instant('Error'));
      });
    return false;
  }
}
