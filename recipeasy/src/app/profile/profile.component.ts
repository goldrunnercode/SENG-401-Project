import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from "../app.component";
import { AuthenticationService } from '../services/authentication.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  edit: boolean = false;
  editToggleString:string = "Edit Profile";
  editUser: User = {
    p_id: undefined,
    email: '',
    password: '',
    fname: '',
    lname: '',
    isAdmin: false
  };
  user: User = {
    p_id: undefined,
    email: '',
    password: '',
    fname: '',
    lname: '',
    isAdmin: false
  };

  constructor( 
    private authService: AuthenticationService,
    private userService: UsersService,
    private router: Router,
    ) {
  }

  ngOnInit(): void {
    this.user = this.authService.getProfile();
    this.editUser.p_id = this.user.p_id;
    this.editUser.email = this.user.email;
    this.editUser.password = this.user.password;
    this.editUser.fname = this.user.fname;
    this.editUser.lname = this.user.lname;
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
    this.userService.updateUser(this.user).subscribe(() => {});
  }
  onDelete(){
    this.userService.deleteUser(this.user.p_id).subscribe((user) => {console.log(user)});
    this.router.navigate(['/loading-page'])
  }
}
