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
  user: User = {
    email: '',
    password: '',
    fname: '',
    lname: '',
    isAdmin: false
  };

  constructor(private http: HttpClient) { }

  signIn(user: any): void {
    this.signed_in = true;
    this.user.email = user.email;
    this.user.password = user.password;
    this.user.fname = user.fname;
    this.user.lname = user.lname;
    this.user.isAdmin = user.isAdmin;
  }

  signOut(): void {
    this.signed_in = false;
    this.user.email = '';
    this.user.password = '';
    this.user.fname = '';
    this.user.lname = '';
    this.user.isAdmin = false;
  }

  getProfile(): User {
    return this.user;
  }

  isSignedIn(): boolean {
    return this.signed_in;
  }


}
