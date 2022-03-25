import { Component, OnInit, HostListener } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {from, Observable} from "rxjs";
import {images} from '../content/images';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css']
})
export class MyRecipesComponent implements OnInit {

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

  constructor(private breakpointObserver: BreakpointObserver) { }

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

  recipes = [
    {
      r_id: 0,
      title: 'Pizza',
      ingredients: ['dough','sauce', 'toppings'],
      instructions : ['roll dough','put on sauce', 'put on toppings', 'cook'],
      category: 'Dinner',
      cuisine: 'Italian',
      vegetarian: true, 
      glutenFree: false, 
      image: images[1],
      author: 'user44@email.com'
    },
    {
      r_id: 1,
      title: 'Sauce',
      ingredients: ['tomato','pepper', 'oil'],
      instructions : ['cut up ingredients','blend'],
      category: 'Lunch',
      cuisine: 'Italian',
      vegetarian: true, 
      glutenFree: true, 
      image: images[1],
      author: 'user20@email.com'
    },
    {
      r_id: 2,
      title: 'Hambuger',
      ingredients: ['meat','buns', 'ketchup'],
      instructions :   ['smash meat','cook', 'put on toppings'],
      category: 'dinner',
      cuisine: 'american',
      vegetarian: false, 
      glutenFree: false, 
      image: images[1],
      author: 'user49@email.com'
    },
    {
      r_id: 3,
      title: 'Pizza',
      ingredients: ['dough','sauce', 'toppings'],
      instructions : ['roll dough','put on sauce', 'put on toppings', 'cook'],
      category: 'dinner',
      cuisine: 'italian',
      vegetarian: false, 
      glutenFree: true, 
      image: images[1],
      author: 'user44@email.com'
    },
    {
      r_id: 4,
      title: 'Sauce',
      ingredients: ['tomato','pepper', 'oil'],
      instructions : ['cut up ingredients','blend'],
      category: 'lunch',
      cuisine: 'italian',
      vegetarian: true, 
      glutenFree: false, 
      image: images[1],
      author: 'user20@email.com'
    },
    {
      r_id: 5,
      title: 'Hambuger',
      ingredients: ['meat','buns', 'ketchup'],
      instructions :   ['smash meat','cook', 'put on toppings'],
      category: 'dinner',
      cuisine: 'american',
      vegetarian: false, 
      glutenFree: false, 
      image: images[1],
      author: 'user49@email.com'
    },
    {
      r_id: 6,
      title: 'Pizza',
      ingredients: ['dough','sauce', 'toppings'],
      instructions : ['roll dough','put on sauce', 'put on toppings', 'cook'],
      category: 'dinner',
      cuisine: 'italian',
      vegetarian: true, 
      glutenFree: false, 
      image: images[0],
      author: 'user44@email.com'
    },
    {
      r_id: 7,
      title: 'Sauce',
      ingredients: ['tomato','pepper', 'oil'],
      instructions : ['cut up ingredients','blend'],
      category: 'lunch',
      cuisine: 'italian',
      vegetarian: true, 
      glutenFree: true, 
      image: images[0],
      author: 'user20@email.com'
    },
    {
      r_id: 8,
      title: 'Hambuger',
      ingredients: ['meat','buns', 'ketchup'],
      instructions :   ['smash meat','cook', 'put on toppings'],
      category: 'dinner',
      cuisine: 'american',
      vegetarian: false, 
      glutenFree: false, 
      image: images[0],
      author: 'user49@email.com'
    },

  ];

}