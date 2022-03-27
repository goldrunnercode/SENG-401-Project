import {Component, HostListener} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {from, Observable} from "rxjs";
import {images} from './images';
import { RecipesService } from '../services/recipes.service';
import { Router } from '@angular/router';
import { recipe } from '../recipe/recipe.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  public innerWidth: any;
  isHandset: boolean = false;
  recipes: recipe[] = [];
  /** Based on the screen size, switch from standard to one column per row */
  isHandsetObserver: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }
      return false;
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private recipesService: RecipesService, private router: Router) {
    this.recipesService.getRecipes().subscribe((recipes) => {
      console.log(recipes);
      this.recipes = recipes as recipe[];
    })
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.isHandsetObserver.subscribe(currentObserverValue => {
      this.isHandset = currentObserverValue;
      console.log(this.innerWidth);
    })
  }

  postRecipe(recipe: recipe) {
    this.recipesService.postRecipe(recipe).subscribe((recipe:recipe) => (this.recipes.push(recipe)));
    console.log("vehicle added");
    console.log(this.recipes);
    this.router.navigate(['/loading-page'])
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
  }

  // colSize = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return 2;
  //     }
  //     return 1;
  //   })
  // );

  // recipes = [
  //   {
  //     r_id: 0,
  //     title: 'Pizza',
  //     ingredients: ['dough','sauce', 'toppings'],
  //     instructions : ['roll dough','put on sauce', 'put on toppings', 'cook'],
  //     category: 'Dinner',
  //     cuisine: 'Italian',
  //     vegetarian: true, 
  //     glutenFree: false, 
  //     image: '1647019464547.jpeg',
  //     author: 'user44@email.com'
  //   },
  //   {
  //     r_id: 1,
  //     title: 'Sauce',
  //     ingredients: ['tomato','pepper', 'oil'],
  //     instructions : ['cut up ingredients','blend'],
  //     category: 'Lunch',
  //     cuisine: 'Italian',
  //     vegetarian: true, 
  //     glutenFree: true, 
  //     image: '1647019464547.jpeg',
  //     author: 'user20@email.com'
  //   },
  //   {
  //     r_id: 2,
  //     title: 'Hambuger',
  //     ingredients: ['meat','buns', 'ketchup'],
  //     instructions :   ['smash meat','cook', 'put on toppings'],
  //     category: 'dinner',
  //     cuisine: 'american',
  //     vegetarian: false, 
  //     glutenFree: false, 
  //     image: '1647019464547.jpeg',
  //     author: 'user49@email.com'
  //   },
  //   {
  //     r_id: 3,
  //     title: 'Pizza',
  //     ingredients: ['dough','sauce', 'toppings'],
  //     instructions : ['roll dough','put on sauce', 'put on toppings', 'cook'],
  //     category: 'dinner',
  //     cuisine: 'italian',
  //     vegetarian: false, 
  //     glutenFree: true, 
  //     image: '1647019464547.jpeg',
  //     author: 'user44@email.com'
  //   },
  //   {
  //     r_id: 4,
  //     title: 'Sauce',
  //     ingredients: ['tomato','pepper', 'oil'],
  //     instructions : ['cut up ingredients','blend'],
  //     category: 'lunch',
  //     cuisine: 'italian',
  //     vegetarian: true, 
  //     glutenFree: false, 
  //     image: '1647019464547.jpeg',
  //     author: 'user20@email.com'
  //   },
  //   {
  //     r_id: 5,
  //     title: 'Hambuger',
  //     ingredients: ['meat','buns', 'ketchup'],
  //     instructions :   ['smash meat','cook', 'put on toppings'],
  //     category: 'dinner',
  //     cuisine: 'american',
  //     vegetarian: false, 
  //     glutenFree: false, 
  //     image: '1647019464547.jpeg',
  //     author: 'user49@email.com'
  //   },
  //   {
  //     r_id: 6,
  //     title: 'Pizza',
  //     ingredients: ['dough','sauce', 'toppings'],
  //     instructions : ['roll dough','put on sauce', 'put on toppings', 'cook'],
  //     category: 'dinner',
  //     cuisine: 'italian',
  //     vegetarian: true, 
  //     glutenFree: false, 
  //     image: '1647019464547.jpeg',
  //     author: 'user44@email.com'
  //   },
  //   {
  //     r_id: 7,
  //     title: 'Sauce',
  //     ingredients: ['tomato','pepper', 'oil'],
  //     instructions : ['cut up ingredients','blend'],
  //     category: 'lunch',
  //     cuisine: 'italian',
  //     vegetarian: true, 
  //     glutenFree: true, 
  //     image: '1647019464547.jpeg',
  //     author: 'user20@email.com'
  //   },
  //   {
  //     r_id: 8,
  //     title: 'Hambuger',
  //     ingredients: ['meat','buns', 'ketchup'],
  //     instructions :   ['smash meat','cook', 'put on toppings'],
  //     category: 'dinner',
  //     cuisine: 'american',
  //     vegetarian: false, 
  //     glutenFree: false, 
  //     image: '1647019464547.jpeg',
  //     author: 'user49@email.com'
  //   },

  // ];

  
}
