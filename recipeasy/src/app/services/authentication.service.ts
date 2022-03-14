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
    password: ''
  };

  constructor(private http: HttpClient) { }

  signIn(user: any): void {
    this.user.email = user.email;
    this.user.password = user.password;
    this.signed_in = true;
    this.subject.next(this.signed_in);
  }

  signOut(): void {
    this.signed_in = false;
    this.user.email = '';
    this.user.password = '';
    this.subject.next(this.signed_in);
  }

  authenticateUser(): Observable<any> {
    return this.subject.asObservable();
  }
}
