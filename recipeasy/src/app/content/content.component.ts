import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {Observable} from "rxjs";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {

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

  ngOnInit(): void {
    this.isHandsetObserver.subscribe(currentObserverValue => {
      this.isHandset = currentObserverValue;
    })
  }

  // colSize = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return 2;
  //     }
  //     return 1;
  //   })
  // );

  recipes = [
    {
      title: 'Pizza',
      ingredients: ['dough','sauce', 'toppings'],
      instructions : ['roll dough','put on sauce', 'put on toppings', 'cook'],
      image: '../assets/post-images/image0.jpeg',
      author: 'user44@email.com'
    },
    {
      title: 'Sauce',
      ingredients: ['tomato','pepper', 'oil'],
      instructions : ['cut up ingredients','blend'],
      image: '../assets/post-images/image0.jpeg',
      author: 'user20@email.com'
    },
    {
      title: 'Hambuger',
      ingredients: ['meat','buns', 'ketchup'],
      instructions : ['smash meat','cook', 'put on toppings'],
      image: '../assets/post-images/image0.jpeg',
      author: 'user49@email.com'
    },
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}
}
