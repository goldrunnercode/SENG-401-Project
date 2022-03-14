import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SignInDialogComponent } from '../sign-in-dialog/sign-in-dialog.component';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email !: string
  password !: string
  submit !: boolean

  constructor(public dialog: MatDialog){}

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
