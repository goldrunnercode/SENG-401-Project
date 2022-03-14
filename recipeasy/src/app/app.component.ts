import { Component, Inject } from '@angular/core';

export class CurrentUser {
  email!: string;
  password!: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipeasy';
  current!: CurrentUser;
  signed_in = false;


  onSigneIn(): void{

  }

  onSignOut(): void {
    if(this.current.email == undefined){
      alert("You are already signed out");
    }
    else{

    }
  }
}


