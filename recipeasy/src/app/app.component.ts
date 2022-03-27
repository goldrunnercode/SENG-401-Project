import { Component } from '@angular/core';

export interface User {
  p_id?: number;
  email: string;
  password: string;
  fname: string;
  lname: string;
  isAdmin: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipeasy';
}


