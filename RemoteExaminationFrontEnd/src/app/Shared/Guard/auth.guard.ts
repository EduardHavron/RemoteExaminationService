import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthorizationService} from '../Services/Auth/authorization.service';
import {Observable} from 'rxjs';
import {NbToastrService} from '@nebular/theme';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthorizationService,
    private toastrService: NbToastrService
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
      this.showToast('top-right',
        'danger',
        3000,
        'У вас недостаточно прав для просмотра этой страницы',
        'Ошибка!');
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
        this.showToast('top-right',
          'danger',
          3000,
          'У вас недостаточно прав для просмотра этой страницы',
          'Ошибка!');
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
