import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl = 'http://localhost:8008/user/';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(this.apiUrl);
  }

  deleteUser(id?: number) {
    console.log("DELETE USER: ", id)
    return this.http.delete<User>(this.apiUrl + id);
  }

  createUser(user: User) {
    let newUser = {
      email: user.email,
      password: user.password,
      fname: user.fname,
      lname: user.lname,
      isAdmin: 0
    }
    if(user.isAdmin){
      newUser.isAdmin = 1;
    }
    
    
    return this.http.post<User>(this.apiUrl, JSON.stringify(newUser));
  }

  updateUser(user: User){
    return this.http.put<User>(this.apiUrl, user);
  }
}
