import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from '../../../Shared/Services/Auth/authorization.service';
import {Router} from '@angular/router';
import {CustomToastrService} from '../../../Shared/Services/CustomToastr/custom-toastr.service';
import {TranslateService} from '@ngx-translate/core';
import {SpinnerService} from '../../../Shared/Services/Spinner/spinner.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder,
              private authService: AuthorizationService,
              private router: Router,
              private customToastrService: CustomToastrService,
              private translateService: TranslateService,
              private spinnerService: SpinnerService) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.spinnerService.isLoading.subscribe(value => this.isLoading = value);
  }

  login() {
    const val = this.form.value;
    if (val.email && val.password) {
      this.authService.signIn({email: val.email, password: val.password})
        .subscribe(
          () => {
            this.router.navigate(['/dashboard'])
              .then(() => {
                this.customToastrService.showToast('top-right',
                  'success',
                  3000,
                  this.translateService.instant('You successfully authorized'),
                  this.translateService.instant('Success'));
              });
          }
        );
    }
  }

  ngOnInit() {
  }
}
