import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SpinnerService} from '../Spinner/spinner.service';

@Injectable()
export class HttpProgressInterceptor implements HttpInterceptor {

  constructor(
    private authorizationService: SpinnerService // my personal service for the progress bar - replace with your own
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.reportProgress) {
      // only intercept when the request is configured to report its progress
      return next.handle(req).pipe(
        tap((event: HttpEvent<any>) => {
          if (event.type === HttpEventType.DownloadProgress) {
            // here we get the updated progress values, call your service or what ever here
            this.authorizationService.updateProgress(true); // display & update progress bar
          } else if (event.type === HttpEventType.Response) {
            this.authorizationService.updateProgress(false); // hide progress bar
          }
        }, error => {
          this.authorizationService.updateProgress(false); // hide progress bar
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
