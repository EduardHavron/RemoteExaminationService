import {Component} from '@angular/core';
import {RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent} from '@angular/router';
import {AuthorizationService} from './Shared/Services/Auth/authorization.service';
import {Auth} from './Shared/Models/UserAuth/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: Auth;
  title = 'RemoteExaminationFrontEnd';
  public isShowingRouteLoadIndicator: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthorizationService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.isShowingRouteLoadIndicator = false;
    let asyncLoadCount = 0;
    router.events.subscribe(
      (event: RouterEvent): void => {

        if (event instanceof RouteConfigLoadStart) {

          asyncLoadCount++;

        } else if (event instanceof RouteConfigLoadEnd) {

          asyncLoadCount--;

        }
        this.isShowingRouteLoadIndicator = !!asyncLoadCount;
      }
    );
  }

  get isAuthenticated(): boolean {
    return this.currentUser != null;
  }

  get isAdmin(): boolean {
    return this.authenticationService.isAdmin;
  }

  get isExaminer(): boolean {
    return this.authenticationService.isExaminer;
  }

  get isExamined(): boolean {
    return this.authenticationService.isExamined;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/authorize/login');
  }
}
