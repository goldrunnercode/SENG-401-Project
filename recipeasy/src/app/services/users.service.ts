import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  createUser(user: User) {
    let newUser = {
      email: user.email,
      password: user.password,
      fname: user.fname,
      lname: user.lname,
      isAdmin: user.isAdmin
    }
    return this.http.post<User>(this.apiUrl, JSON.stringify(newUser));
  }
}
