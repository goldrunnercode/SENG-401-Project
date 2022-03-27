import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecipeViewComponent } from '../recipe-view/recipe-view.component';

export interface recipe{
  r_id?: number;
  title: string,
  category: string,
  cuisine: string,
  vegetarian: boolean,
  glutenFree: boolean,
  image: string,
  author: string,
  ingredients: string[],
  instructions: string[]
};

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  @Input() recipeCard: recipe | undefined;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openRecipe(): void {
    const dialogRef = this.dialog.open(RecipeViewComponent, {
      width: '600px',
      data: this.recipeCard,
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }

}
