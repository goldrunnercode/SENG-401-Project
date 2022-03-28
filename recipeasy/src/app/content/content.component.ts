import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Filter } from '../Filter';
import { recipe } from '../recipe/recipe.component';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  public innerWidth: any;
  isHandset: boolean = false;
  recipes: recipe[] = [];

  recipeFilter: Filter = {
    categories: [],
    cuisines: [],
    veg: false,
    gluten: false,
    name: ''
  };
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
    this.recipeFilter = this.recipesService.getFilters();
    console.log(this.recipeFilter);
    this.recipesService.getRecipes().subscribe((recipes) => {
      console.log(recipes);
      this.recipes = recipes as recipe[];
      console.log(this.recipes);
      this.recipes = this.filterContent(this.recipes);
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

  deleteRecipe(id?:number) {
    this.recipesService.deleteRecipe(id).subscribe(() => {});
    console.log("vehicle deleted");
    console.log(this.recipes);
    this.router.navigate(['/loading-page'])
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
  }

  filterContent(filteredRecipes: recipe[]): recipe[] {
    
    if(this.recipeFilter.categories.length != 0){
      filteredRecipes = filteredRecipes.filter((recipe) => this.recipeFilter.categories.includes(recipe.category.toLowerCase()));
    }

    if(this.recipeFilter.cuisines.length != 0){
      filteredRecipes = filteredRecipes.filter((recipe) => this.recipeFilter.cuisines.includes(recipe.cuisine.toLowerCase()));
    }

    if(this.recipeFilter.veg){
      filteredRecipes = filteredRecipes.filter((recipe) => recipe.vegetarian == true)
    }

    if(this.recipeFilter.gluten){
      filteredRecipes = filteredRecipes.filter((recipe) => recipe.glutenFree == true)
    }

    if(this.recipeFilter.name != ''){
      filteredRecipes = filteredRecipes.filter((recipe) => this.isSubstring(this.recipeFilter.name.toLowerCase().replace(/[^a-z0-9]+/gi, ''), recipe.title.toLowerCase().replace(/[^a-z0-9]+/gi, '')));
    }

    return filteredRecipes;
  }

  isSubstring(str1: string, str2: string): boolean {
    let m = str1.length;
    let n = str2.length;

    for(let i = 0; i < (n-m)+1; i++){
      var j;
      for(j = 0; j < m; j++){
        if(str2[i+j] != str1[j]){
          break;
        }
      }
      if(j == m){
        return true;
      }
      
    }
    return false;
  }

}
