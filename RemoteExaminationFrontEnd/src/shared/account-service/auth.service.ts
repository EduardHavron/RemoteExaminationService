import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  readonly rootUrl = 'http://localhost:5101/api/auth/';


  constructor(private client: HttpClient) { }

  loginUser(form: FormGroup) {
    return this.client.post(this.rootUrl + 'login', form.value);
  }

  registerUser(form: FormGroup) {
    return this.client.post(this.rootUrl + 'registerUser', form.value);
  }
}
