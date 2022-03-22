import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface recipeData{
  title: string,
  ingredients: string[],
  instructions: string[],
  category: string,
  cuisine: string,
  vegetarian: boolean,
  glutenFree: boolean,
  image: string,
  author: string
};
@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: recipeData
    ) { }

  ngOnInit(): void {
  }

}
