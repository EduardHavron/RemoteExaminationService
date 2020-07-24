import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from '../../../Shared/Services/Auth/authorization.service';
import {Router} from '@angular/router';
import {CustomToastrService} from '../../../Shared/Services/NbToastr/custom-toastr.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  form: FormGroup;
  checked = false;

  constructor(private fb: FormBuilder,
              private authService: AuthorizationService,
              private router: Router,
              private customToastrService: CustomToastrService) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signUp() {
    const val = this.form.value;
    if (val.email && val.password) {
      this.authService.signUp({email: val.email, password: val.password, role: this.checked})
        .subscribe(
          () => {
            this.router.navigateByUrl('authorize/login')
              .then(() => {
                this.customToastrService.showToast('top-right',
                  'success',
                  3000,
                  'Вы успешно зарегистрировались, теперь вы можете авторизоваться в системе',
                  'Успех');
              });
          }
        );
    }
  }

  toggle(checked: boolean) {
    this.checked = checked;
  }

  ngOnInit() {
  }
}
