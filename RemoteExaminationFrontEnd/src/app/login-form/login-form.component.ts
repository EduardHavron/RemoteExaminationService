import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from '../Services/Auth/authorization.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthorizationService,
              private router: Router) {
this.form = this.fb.group({
email: ['', Validators.required],
password: ['', Validators.required]
});
  }
login() {
  const val = this.form.value;
  if (val.email && val.password) {
    this.authService.signIn(val.email, val.password)
      .subscribe(
        () => {
          this.router.navigateByUrl('/');
        }
      );
  }
}
  ngOnInit() {
  }

}
