import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Auth} from '../../Models/UserAuth/auth';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private url = 'https://localhost:5001/api/Account/';
  private currentUserSubject: BehaviorSubject<Auth>;
  public currentUser: Observable<Auth>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Auth>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Auth {
    return this.currentUserSubject.value;
  }

  signUp(email: string, password: string) {
    return this.http.post<Auth>(this.url + 'SignUp', {email, password}) ;
  }

  signIn(email: string, password: string) {
    return this.http.post<Auth>(this.url + 'SignIn', {email, password}).pipe(map(auth => {
      localStorage.setItem('currentUser', JSON.stringify(auth));
      this.currentUserSubject.next(auth);
      return auth;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
