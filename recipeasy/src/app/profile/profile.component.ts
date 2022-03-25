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
  edit: boolean = false;
  editToggleString:string = "Edit Profile";
  editUser: User = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    isAdmin: false
  };
  user: User = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    isAdmin: false
  };

  constructor( private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getProfile();
    this.editUser.email = this.user.email;
    this.editUser.password = this.user.password;
    this.editUser.first_name = this.user.first_name;
    this.editUser.last_name = this.user.last_name;
  }
  onEdit(){
    this.edit = !this.edit;
    if(this.edit == true) this.editToggleString = "Cancel";
    else this.editToggleString = "Edit Profile";
  }
  editMode():boolean{
    return this.edit;
  }
  editProfile(){
    this.edit = false;
    this.user = this.editUser;
  }
  onDelete(){
    
  }
}
