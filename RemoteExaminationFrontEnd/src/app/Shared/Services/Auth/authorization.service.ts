import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Auth} from '../../Models/UserAuth/auth';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Register} from '../../Models/UserAuth/register';
import * as jwt_decode from 'jwt-decode';
import {Role} from '../../Enum/enum';
import {ApiConfig} from '../Shared/Config/api-config';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  public currentUser: Observable<Auth>;
  private url = ApiConfig.apiPath + 'Account/';
  private currentUserSubject: BehaviorSubject<Auth>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Auth>(this.getTokenValue());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Auth {
    return this.currentUserSubject.value;
  }

  get isAdmin(): boolean {
    const currentUser = this.currentUserSubject.value;

    if (currentUser) {
      return currentUser.role === Role.Admin;
    }

    return false;
  }

  get isExamined(): boolean {
    const currentUser = this.currentUserSubject.value;

    if (currentUser) {
      return currentUser.role === Role.Examined;
    }

    return false;
  }

  get isExaminer(): boolean {
    const currentUser = this.currentUserSubject.value;
    if (currentUser) {
      return currentUser.role === Role.Examiner;
    }
  }

  signUp(email: string, password: string, isExaminer: boolean) {
    return this.http.post<Register>(this.url + 'SignUp/', {email, password, isExaminer});
  }

  signIn(email: string, password: string): Observable<any> {
    return this.http.post<Auth>(this.url + 'SignIn/', {email, password})
      .pipe(
        tap(res => {
          if (res && res.token) {
            window.localStorage.setItem('token', JSON.stringify(res));
            const userInfo = this.getTokenValue();
            this.currentUserSubject.next(userInfo);
            this.currentUser = Observable.create(userInfo);
          }
        })
      );
  }

  logout() {
    window.localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.currentUser = null;
  }

  private getTokenValue(): Auth {
    const jsonToken = JSON.parse(window.localStorage.getItem('token'));
    if (jsonToken && jsonToken.token) {
      const tokenValue = jwt_decode(jsonToken.token);
      const role = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
      return {
        role: tokenValue[role],
        email: tokenValue.email,
        password: tokenValue.password,
        token: jsonToken.token
      };
    }
  }
}
