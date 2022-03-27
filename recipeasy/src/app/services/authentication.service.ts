import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {AppComponent} from '../app.component';
import { User } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8008/user'
  private signed_in: boolean = false;
  private subject = new Subject<any>();
  private userSubject = new Subject<User>();
  user: User = {
    email: '',
    password: '',
    fname: '',
    lname: '',
    isAdmin: true  // true if the user is admin
  };

  constructor(private http: HttpClient) { }

  signIn(user: any): void {
    this.user.email = user.email;
    this.user.password = user.password;
    this.user.fname = user.fname;
    this.user.lname = user.lname;
    this.signed_in = true;
    this.subject.next(this.signed_in);
  }

  signOut(): void {
    this.signed_in = false;
    this.user.email = '';
    this.user.password = '';
    this.user.fname = '';
    this.user.lname = '';
    this.subject.next(this.signed_in);
  }

  getProfile(): User {
    return this.user;
  }

  authenticateUser(): Observable<any> {
    return this.subject.asObservable();
  }

  profileInfo(): Observable<User> {
    return this.userSubject.asObservable();
  }


}
