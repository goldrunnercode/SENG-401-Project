import {Component, HostListener} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs/operators";
import {User} from "../app.component"
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  emailTaken = false;

  accountForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  isHandset: boolean = false;
  public innerWidth: any;

  constructor(private breakpointObserver: BreakpointObserver, private fb: FormBuilder, private userService: UsersService, private router: Router) {}

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

  allFilled(): boolean {
    if(this.accountForm.get('email')?.value == ''){
      return false;
    }
    if(this.accountForm.get('password')?.value == ''){
      return false;
    }
    if(this.accountForm.get('firstName')?.value == ''){
      return false;
    }
    if(this.accountForm.get('lastName')?.value == ''){
      return false;
    }
    return true;
  }

  onSubmit(): void {

    

    let newUser: User = {
      p_id: undefined,
      email: this.accountForm.get('email')?.value,
      password: this.accountForm.get('password')?.value,
      fname: this.accountForm.get('firstName')?.value,
      lname: this.accountForm.get('lastName')?.value,
      isAdmin: false
    }

    this.userService.getUsers().subscribe((users) => {
      let currentUsers = users.filter(user => user.email === newUser.email);
      if(currentUsers.length > 0) {
        this.emailTaken = true;
        this.accountForm.patchValue({email: ''});
        return;
      }
      
      this.emailTaken = false;
      this.userService.createUser(newUser).subscribe((user) => {console.log(user)});
      this.router.navigate(['/']);
    });
  }
}
