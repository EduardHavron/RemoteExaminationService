import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationService} from './Shared/Services/Auth/authorization.service';
import {IUser} from './Shared/Models/UserAuth/IUser';
import {TranslateService} from '@ngx-translate/core';
import {NgxTranslateServiceWrapperService} from './Shared/Services/Translation/ngx-translate-service-wrapper.service';
import {CustomToastrService} from './Shared/Services/CustomToastr/custom-toastr.service';
import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  faBars = faBars;
  currentUser: IUser;
  currentLang: BehaviorSubject<string>;
  isEn: boolean;
  menuState = false;
  items;
  constructor(
    private router: Router,
    private authenticationService: AuthorizationService,
    private customToastrService: CustomToastrService,
    private translateService: TranslateService,
    private translateServiceManager: NgxTranslateServiceWrapperService) {
    this.authenticationService.currentUserSubject.subscribe(x => this.currentUser = x);
    if (!this.translateServiceManager.getLocalization()) {
      this.translateServiceManager.setLocalization('en');
      this.isEn = true;
    }
    this.translateServiceManager.useCurrentLocalization();
    this.currentLang = new BehaviorSubject<string>((this.translateServiceManager.getLocalization()));
    this.isEn = this.translateServiceManager.getLocalization() === 'en';
  }
  ngOnInit() {
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


  changeLanguage() {
    if (!this.isEn) {
      this.localeEN();
    } else {
      this.localeUA();
    }
  }

  private localeUA() {
    this.translateServiceManager.localeUA();
    this.currentLang.next('ua');
  }

  private localeEN() {
    this.translateServiceManager.localeEN();
    this.currentLang.next('en');
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/authorize/login'])
      .then(() => {
        this.customToastrService.showToast('top-right',
          'success',
          3000,
          this.translateService.instant('You logged out of system'),
          this.translateService.instant('Success'));
      });
  }

  triggerMenu() {
    const menu = $('#menu');
    if (this.menuState) {
      menu.attr('state', 'collapsed');
      menu.attr('ng-reflect-state', 'collapsed');
      menu.removeClass('compacted');
      menu.addClass('collapsed');
      this.menuState = false;
    } else {
      menu.attr('state', 'compacted');
      menu.attr('ng-reflect-state', 'compacted');
      menu.removeClass('collapsed');
      menu.addClass('compacted');
      this.menuState = true;
    }
  }
}
