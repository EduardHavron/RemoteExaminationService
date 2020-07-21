import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from '../../../Shared/Services/Auth/authorization.service';
import {Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthorizationService,
              private router: Router,
              private toastrService: NbToastrService) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const val = this.form.value;
    if (val.email && val.password) {
      this.authService.signIn({email: val.email, password: val.password})
        .subscribe(
          () => {
            this.router.navigate(['/dashboard'])
              .then(() => {
                this.showToastSuccessful('top-right',
                  'success',
                  1500);
              });
          }
        );
    }
  }

  showToastSuccessful(position, status, duration) {
    this.toastrService.show(
      'Вы успешно авторизировались',
      'Успех!',
      {position, status, duration});
  }

  ngOnInit() {
  }
}
