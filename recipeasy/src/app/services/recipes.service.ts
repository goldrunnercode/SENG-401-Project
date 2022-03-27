import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AppComponent} from '../app.component';
import { Filter } from '../Filter';
import { recipe } from '../recipe/recipe.component';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private apiUrl = 'http://localhost:8008/recipe/';

  recipeFilter: Filter = {
    categories: [],
    cuisines: [],
    veg: false,
    gluten: false,
    name: ''
  };


  allRecipes: recipe[] = [];


  constructor(private http: HttpClient) {

  }

  getFilters(): Filter { return this.recipeFilter; }

  updateDatabase1(): Observable<any> {
    return this.http.delete('http://localhost:8008/update');
  }

  updateDatabase2(): Observable<any> {
    return this.http.delete('http://localhost:8008/update2');
  }

  updateDatabase3(): Observable<any> {
    return this.http.delete('http://localhost:8008/update3');
  }

  setFilter(newFilter: Filter){this.recipeFilter = newFilter;}

  getRecipes(): Observable<recipe[]> {
    return this.http.get<recipe[]>(this.apiUrl);
  }

  postRecipe(recipe: recipe): Observable<recipe> {
    return this.http.post<recipe>(this.apiUrl, JSON.stringify(recipe));
  }

  deleteRecipe(id?:number): Observable<recipe>{
    return this.http.delete<recipe>(this.apiUrl+id);
  }

}
