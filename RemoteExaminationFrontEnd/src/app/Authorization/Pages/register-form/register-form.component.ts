import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from '../../../Shared/Services/Auth/authorization.service';
import {Router} from '@angular/router';
import {NbToastRef, NbToastrService} from '@nebular/theme';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  form: FormGroup;
  checked: boolean;

  constructor(private fb: FormBuilder,
              private authService: AuthorizationService,
              private router: Router,
              private toastrService: NbToastrService) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.checked = false;
  }

  signIn() {
    const val = this.form.value;
    if (val.email && val.password) {
      this.authService.signUp(val.email, val.password, this.checked)
        .subscribe(
          () => {
            this.showToastSuccessful('top-right', 'success', 3000);
            this.router.navigateByUrl('authorize/login');
          }
        );
    }
  }

  toggle(checked: boolean) {
    this.checked = checked;
  }
  showToastSuccessful(position, status, duration) {
    this.toastrService.show(
      'Registration is successful',
      `Success!`,
      {position, status, duration});
  }
  ngOnInit() {
  }
}
