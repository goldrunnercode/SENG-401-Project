import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AppComponent} from '../app.component';
import { recipe } from '../recipe/recipe.component';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private apiUrl = 'http://localhost:8008/recipe/';


  allRecipes: recipe[] = [];


  constructor(private http: HttpClient) {

  }

  getRecipes(): Observable<recipe[]> {
    return this.http.get<recipe[]>(this.apiUrl);
  }

  postRecipe(recipe: recipe): Observable<recipe> {
    return this.http.post<recipe>(this.apiUrl, recipe);
  }

}
