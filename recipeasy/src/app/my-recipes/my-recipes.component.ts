import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { User } from '../app.component';
import { recipe } from '../recipe/recipe.component';
import { RecipesService } from '../services/recipes.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css']
})
export class MyRecipesComponent implements OnInit {

  recipes: recipe[] = [];
  user: User = {
    email: '',
    password: '',
    fname: '',
    lname: '',
    isAdmin: false
  };

  public innerWidth: any;
  isHandset: boolean = false;
  /** Based on the screen size, switch from standard to one column per row */
  isHandsetObserver: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }
      return false;
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private recipeService: RecipesService,
    private authService: AuthenticationService,
    ) { 
    this.user = this.authService.getProfile();
    this.recipeService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes as recipe[];
      this.recipes = this.recipes.filter(r => r.author === this.user.email)
    })
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.isHandsetObserver.subscribe(currentObserverValue => {
      this.isHandset = currentObserverValue;
      console.log(this.innerWidth);
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
    console.log(this.innerWidth);
  }
}
