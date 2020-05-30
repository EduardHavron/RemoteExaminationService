import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { AuthorizationService} from './Services/Auth/authorization.service';
import { Auth} from './Models/UserAuth/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: Auth;
  title = 'RemoteExaminationFrontEnd';

  constructor(
  private router: Router,
  private authenticationService: AuthorizationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/login');
  }
}
