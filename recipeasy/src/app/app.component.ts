import { Component } from '@angular/core';

export interface User {
  p_id?: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
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


