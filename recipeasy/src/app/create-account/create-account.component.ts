import {Component, HostListener} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs/operators";

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
  isHandset: boolean = false;
  public innerWidth: any;

  constructor(private breakpointObserver: BreakpointObserver, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.isHandsetObserver.subscribe(currentObserverValue => {
      this.isHandset = currentObserverValue;
      console.log(this.innerWidth);
    })
  }

  isHandsetObserver: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }
      return false;
    })
  );

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
    console.log(this.innerWidth);
  }

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
