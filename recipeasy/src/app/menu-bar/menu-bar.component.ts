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
    fname: '',
    lname: '',
    isAdmin: false
  };
  signed_in = false;
  subscription!: Subscription;

  constructor(public authService: AuthenticationService) {

  }

  ngOnInit(): void {
    
    
    
  }

  viewProfile(): void {
    this.authService.getProfile();
  }

  signIn(user: User): void{
    console.log(user.email);
    console.log(user.password);
    this.authService.signIn(user);
    this.signed_in = true;
    this.current = this.authService.getProfile();
  }

  onSignOut(): void {
    console.log(this.signed_in);
    if(this.signed_in){
      this.signed_in = false;
      this.authService.signOut();
    }
    else{
      alert("You are already signed out");
    }
  }

}
