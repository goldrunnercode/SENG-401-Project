import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  accountForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  onSubmit(): void {

    // @ts-ignore
    if(this.accountForm.get('firstName').value == null){
      alert("All fields are required.");
      return;
    }
    // @ts-ignore
    if(this.accountForm.get('lastName').value == null){
      alert("All fields are required.");
      return;
    }
    // @ts-ignore
    if(this.accountForm.get('email').value == null){
      alert("All fields are required.");
      return;
    }
    // @ts-ignore
    if(this.accountForm.get('password').value == null){
      alert("All fields are required.");
      return;
    }

    // Add new user
    this.router.navigate(['../content']);
    alert("Account Created.\nSign in to access account");

  }
}
