import { Component } from '@angular/core';

export interface User {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipeasy';
}


