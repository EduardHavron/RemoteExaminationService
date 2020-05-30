import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Auth} from '../../Models/UserAuth/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private url = 'https://localhost:5001/api/Account';
  constructor(private http: HttpClient) { }

  signUp(User: Auth) {
    return this.http.post(this.url + 'SignUp', User);
  }

  signIn(User: Auth) {
    return this.http.post(this.url + 'SignIn', User);
  }
}
