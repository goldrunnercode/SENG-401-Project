import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppComponent, User } from '../app.component';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { UsersService } from '../services/users.service';
import { SignInDialogComponent } from '../sign-in-dialog/sign-in-dialog.component';
//import {AuthenticationService} from '../services/authentication.service';
//import {Subscription} from "rxjs"



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email !: string
  password !: string
  submit !: boolean
  users?: User[];
  validLogin : boolean = true;
  //subscription!: Subscription;


  constructor(public dialog: MatDialog, public app: MenuBarComponent, private router: Router, private usersService: UsersService) {

  }

  openDialog() {
    const dialogRef = this.dialog.open(SignInDialogComponent, {
      width: '350px',
      data: {email: '', password: '', submit: this.submit, validLogin: this.validLogin},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result.submit != undefined){
        console.log("user clicked sign in")
        if(result.email && result.password){
          this.email = result.email;
          this.password = result.password;
          console.log(this.email)
          console.log(this.password)


          // have to check if the user is admin
        

          //verify user
          this.usersService.getUsers().subscribe((users) => {
            this.users = users as User[];
            console.log(this.users);
            for(let i = 0; i < users.length; i++){
              console.log(result.email);
              console.log(users[i].email)
              if(result.email == users[i].email){
                console.log('found match');
              }
            }
            this.users = this.users.filter((user: User) => (user.email === result.email && user.password == result.password));
            console.log(this.users);

            if(this.users.length == 0){
              this.validLogin = false;
              console.log("Invalid login");
              this.openDialog();
            }
            else{
              this.validLogin = true;
              let current = this.users[0];
              this.app.signIn(current);
              this.router.navigate(['/'])
            }
          })
          //reset form
          this.email = "";
          this.password = "";
          
        }
        else{
          alert("Please fill in all fields")
        }
      }
      else{
        console.log("canceled sign in")
      }

    });
  }

  ngOnInit(): void {}



}
