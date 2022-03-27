import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContentComponent } from '../content/content.component';
import { AuthenticationService } from '../services/authentication.service';

interface recipeData{
  r_id?: number,
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
    public authService: AuthenticationService, private content: ContentComponent) { }

  ngOnInit(): void {
  }

  deleteRecipe(id?: number): void {
    // delete resipe

    this.content.deleteRecipe(id)
    
  }

}
