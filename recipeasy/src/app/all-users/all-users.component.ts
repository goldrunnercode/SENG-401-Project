import { Component, OnInit } from '@angular/core';
import { User } from '../app.component';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  //allUsers: User[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  allUsers: User[] = [
    {
      p_id: 0,
      email: 'ehstjames@gmail.com',
      password: 'jhskjdfhsdkf',
      first_name: 'Eli',
      last_name: 'St. james',
      isAdmin:false
    },
    {
      p_id: 0,
      email: 'ehstjames@gmail.com',
      password: 'jhskjdfhsdkf',
      first_name: 'Eli',
      last_name: 'St. james',
      isAdmin:false
    },
    {
      p_id: 0,
      email: 'ehstjames@gmail.com',
      password: 'jhskjdfhsdkf',
      first_name: 'Eli',
      last_name: 'St. james',
      isAdmin:false
    },
    {
      p_id: 0,
      email: 'ehstjames@gmail.com',
      password: 'jhskjdfhsdkf',
      first_name: 'Eli',
      last_name: 'St. james',
      isAdmin:false
    },
    {
      p_id: 0,
      email: 'ehstjames@gmail.com',
      password: 'jhskjdfhsdkf',
      first_name: 'Eli',
      last_name: 'St. james',
      isAdmin:false
    },
  ]

}
