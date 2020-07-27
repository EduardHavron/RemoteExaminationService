import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot} from '@angular/router';
import {AuthorizationService} from '../Services/Auth/authorization.service';
import {Observable} from 'rxjs';
import {NbToastrService} from '@nebular/theme';

@Injectable({providedIn: 'root'})
export class UnauthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthorizationService,
    private toastrService: NbToastrService
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
        this.showToast('top-right',
          'danger',
          3000,
          'Вы уже авторизированы',
          'Ошибка');
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
        this.showToast('top-right',
          'danger',
          3000,
          'Вы уже авторизированы',
          'Ошибка');
      });
    return false;
  }

  private showToast(position, status, duration, message: string, title: string) {
    this.toastrService.show(
      message,
      title,
      {preventDuplicates: true, position, status, duration});
  }
}
