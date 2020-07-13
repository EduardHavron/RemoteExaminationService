import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationService} from './Shared/Services/Auth/authorization.service';
import {Auth} from './Shared/Models/UserAuth/auth';
import {NbToastrService} from '@nebular/theme';

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
    private authenticationService: AuthorizationService,
    private toastrService : NbToastrService
  ) {
    this.authenticationService.currentUserSubject.subscribe(x => this.currentUser = x);
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
    this.router.navigate(['/authorize/login'])
      .then(() => {
        this.showToast('top-right',
          'success',
          3000,
          'Вы вышли из системы',
          'Успех');
      });
  }

  private showToast(position, status, duration, message: string, title: string) {
    this.toastrService.show(
      message,
      title,
      {preventDuplicates: true, position, status, duration});
  }
}
