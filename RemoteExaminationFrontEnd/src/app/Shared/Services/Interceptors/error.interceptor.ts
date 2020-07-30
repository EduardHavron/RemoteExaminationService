import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthorizationService} from '../Auth/authorization.service';
import {Router} from '@angular/router';
import {CustomToastrService} from '../CustomToastr/custom-toastr.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthorizationService,
              private router: Router,
              private customToastrService: CustomToastrService,
              private translateService: TranslateService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authenticationService.logout();
        this.router.navigate(['authorize/login'])
          .then(() => {
            this.customToastrService.showToast('top-right',
              'danger',
              '3000',
              this.translateService.instant('Session expired, please login again'),
              this.translateService.instant('Error'));
          });
      }
      if (err.status === 400) {
        this.customToastrService.showToast('top-right',
          'danger',
          '3000',
          this.translateService.instant('Incorrect request, please review submitted data'),
          this.translateService.instant('Error'));
      }
      if (err.status === 500 || err.status === 502 || err.status === 503 || err.status === 504) {
        this.customToastrService.showToast('top-right',
          'danger',
          '3000',
          this.translateService.instant('Server error, servers might be overloaded'),
          this.translateService.instant('Error'));
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
