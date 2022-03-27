import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
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
  //subscription!: Subscription;


  constructor(public dialog: MatDialog, public app: MenuBarComponent, private router: Router) {

  }

  openDialog() {
    const dialogRef = this.dialog.open(SignInDialogComponent, {
      width: '350px',
      data: {email: this.email, password: this.password, submit: this.submit},
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


          const currentUser = {
            email: this.email,
            password: this.password,
            fname: 'Eli',
            lname: 'St. James',
            isAdmin: false // change to whatever the service returns for the isAdmin part
          }

          //verify user

          //sign user in
          this.app.signIn(currentUser);

          //reset form
          this.email = "";
          this.password = "";
          this.router.navigate(['/'])
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
