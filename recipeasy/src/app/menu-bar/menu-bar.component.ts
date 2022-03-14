import { Component, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../app.component';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  current: User = {
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  };
  signed_in = false;
  subscription!: Subscription;

  constructor(private authService: AuthenticationService) {

  }

  ngOnInit(): void {
    this.subscription = this.authService.authenticateUser().subscribe((value) => (this.signed_in = value));
  }

  viewProfile(): void {
    this.authService.getProfile();
  }

  signIn(user: User): void{
    console.log(user.email);
    console.log(user.password);
    this.authService.signIn(user);
  }

  onSignOut(): void {
    console.log(this.signed_in);
    if(this.signed_in){
      this.authService.signOut();
    }
    else{
      alert("You are already signed out");
    }
  }

}
