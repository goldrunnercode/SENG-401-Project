import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 2, rows: 1 },
          { title: 'Card 2', cols: 2, rows: 1 },
          { title: 'Card 3', cols: 2, rows: 1 },
          { title: 'Card 4', cols: 2, rows: 1 },
          { title: 'Card 5', cols: 2, rows: 1 },
          { title: 'Card 6', cols: 2, rows: 1 },
          { title: 'Card 7', cols: 2, rows: 1 },
          { title: 'Card 8', cols: 2, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 1, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 1 },
        { title: 'Card 4', cols: 1, rows: 1 },
        { title: 'Card 5', cols: 1, rows: 1 },
        { title: 'Card 6', cols: 1, rows: 1 },
        { title: 'Card 7', cols: 1, rows: 1 },
        { title: 'Card 8', cols: 1, rows: 1 }
      ];
    })
  );

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
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      author: 'user44@email.com'
    },
    {
      title: 'Sauce',
      ingredients: ['tomato','pepper', 'oil'],
      instructions : ['cut up ingredients','blend'],
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      author: 'user20@email.com'
    },
    {
      title: 'Hambuger',
      ingredients: ['meat','buns', 'ketchup'],
      instructions : ['smash meat','cook', 'put on toppings'],
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      author: 'user49@email.com'
    },
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}
}
