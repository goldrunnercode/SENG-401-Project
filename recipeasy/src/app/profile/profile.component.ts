import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import {User} from "../app.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = {
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  };

  tmp !: User;

  subscription!: Subscription;

  constructor( private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.subscription = this.authService.profileInfo().subscribe((current) => this.user = current);
    console.log(this.user.email);
    console.log(this.user.password);
    console.log(this.user.first_name);
    console.log(this.user.last_name);
  }

}
