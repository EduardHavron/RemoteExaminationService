import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {delay, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SpinnerService} from '../Spinner/spinner.service';

@Injectable()
// @ts-ignore
export class HttpProgressInterceptor implements HttpInterceptor {

  constructor(
    private spinnerService: SpinnerService // my personal service for the progress bar - replace with your own
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.reportProgress) {
      this.spinnerService.updateProgress(true);
      return next.handle(req).pipe(
        tap((event: HttpEvent<any>) => {
          if (event.type === HttpEventType.DownloadProgress) {
            // here we get the updated progress values, call your service or what ever here
            this.spinnerService.updateProgress(true); // display & update progress bar
          } else if (event.type === HttpEventType.Response) {
            this.spinnerService.updateProgress(false); // hide progress bar
          } else {
            this.spinnerService.updateProgress(false);
          }
        }, error => {
          this.spinnerService.updateProgress(false); // hide progress bar
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
