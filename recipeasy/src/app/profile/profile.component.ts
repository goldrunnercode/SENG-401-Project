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

  constructor( private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getProfile();
  }

}
