import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AppComponent} from '../app.component';
import { User } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl = 'http://localhost:8008/user';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(this.apiUrl);
  }

  deleteUser(id : number) {
    return this.http.delete<User>(this.apiUrl + '/' + id);
  }
}
