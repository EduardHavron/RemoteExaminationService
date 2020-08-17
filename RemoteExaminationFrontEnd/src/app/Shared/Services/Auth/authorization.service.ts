import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../../Models/UserAuth/IUser';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {IRegister} from '../../Models/UserAuth/IRegister';
import * as jwt_decode from 'jwt-decode';
import {Role} from '../../Enum/rolesEnum';
import {environment} from '../../../../environments/environment';
import {ILogin} from '../../Models/UserAuth/ILogin';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  public currentUserSubject: BehaviorSubject<IUser>;
  private url = environment.apiPath + 'Account/';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject
      < IUser > (this.getTokenValue());
  }

  get isAdmin(): boolean {
    const currentUser = this.currentUserSubject.getValue();

    if (currentUser) {
      return currentUser.role === Role.Admin;
    }

    return false;
  }

  get isExamined(): boolean {
    const currentUser = this.currentUserSubject.getValue();

    if (currentUser) {
      return currentUser.role === Role.Examined;
    }

    return false;
  }

  get isExaminer(): boolean {
    const currentUser = this.currentUserSubject.getValue();
    if (currentUser) {
      return currentUser.role === Role.Examiner;
    }
  }

  signUp(user: IRegister) {
    return this.http.post<IRegister>(this.url + 'SignUp/', user, {reportProgress: true});
  }

  signIn(user: ILogin): Observable<any> {
    return this.http.post<IUser>(this.url + 'SignIn/', user, {reportProgress: true})
      .pipe(
        tap(res => {
          if (res && res.token) {
            localStorage.setItem('token', JSON.stringify(res));
            const userInfo = this.getTokenValue();
            this.currentUserSubject.next(userInfo);
          }
        })
      );
  }


  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  private getTokenValue(): IUser {
    const jsonToken = JSON.parse(localStorage.getItem('token'));
    if (jsonToken && jsonToken.token) {
      const tokenValue = jwt_decode(jsonToken.token);
      const role = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
      return {
        role: tokenValue[role],
        token: jsonToken.token
      };
    }
  }

}
