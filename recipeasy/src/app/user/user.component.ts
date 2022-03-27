import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../app.component';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() userCard: User | undefined;

  constructor(
    private userService : UsersService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  banUser(id: any) {
    this.userService.deleteUser(id).subscribe(() => {});
    this.router.navigate(['/loading-page']);
  }
}
