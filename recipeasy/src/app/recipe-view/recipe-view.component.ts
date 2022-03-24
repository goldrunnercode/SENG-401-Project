import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from '../services/authentication.service';

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
  editMode: boolean = false;
  deleteMode: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: recipeData,
    public authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  deleteRecipe(): void {
    // delete resipe

    
  }

}
