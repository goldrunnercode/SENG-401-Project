import { Component, OnInit } from '@angular/core';
import { User } from '../app.component';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  allUsers: User[] = [];

  constructor(
    private userService : UsersService,
    ){
      this.userService.getUsers().subscribe((data) => { this.allUsers = data as User[]; })
    }

  ngOnInit(): void {
  }

}
