import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthorizationService} from '../Auth/authorization.service';
import {Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthorizationService,
              private router: Router,
              private toastrService: NbToastrService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authenticationService.logout();
        this.router.navigate(['authorize/login'])
          .then(() => {
          this.showToast('top-right',
            'danger',
            '3000',
            'Истек срок сессии, пожалуйста, авторизируйтесь заново',
            'Ошибка авторизации');
        });
      }
      if (err.status === 400) {
        this.showToast('top-right',
          'danger',
          '3000',
          'Неверный запрос, пожалуйста, проверьте отправляемые данные',
          'Ошибка');
      }
      if (err.status === 500 || err.status === 502 || err.status === 503 || err.status === 504) {
        this.showToast('top-right',
          'danger',
          '3000',
          'Ошибка сервера, возможно, сервера перегружены.',
          'Ошибка сервера');
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }

  showToast(position, status, duration, message: string, title: string) {
    this.toastrService.show(
      message,
      title,
      {preventDuplicates: true, position, status, duration});
  }
}
