import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SpinnerService} from '../Spinner/spinner.service';

@Injectable()
// @ts-ignore
export class HttpProgressInterceptor implements HttpInterceptor {

  constructor(
    private spinnerService: SpinnerService // my personal service for the progress bar - replace with your own
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.reportProgress) {
      this.spinnerService.updateProgress(true);
      return next.handle(req)
        .pipe(finalize(() => this.spinnerService.updateProgress(false)));
    } else {
      return next.handle(req);
    }
  }
}
