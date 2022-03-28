import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Filter } from '../Filter';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  isOpen = false;
  recipeFilter = [];
  categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert'];
  cuisines = ['Indian', 'Mexican', 'Chinese', 'Vietnamese', 'Italian', 'American', 'Canadian'];
  categoryFilter: string[] = [];
  cuisineFilter: string[] = [];
  vegetarian: boolean = false;
  glutenFree: boolean = false;
  name: string = '';

  constructor(private recipesService: RecipesService, private router: Router) { }

  ngOnInit(): void {
  }

  filterCategory(category: any) {
    if (category.checked) {
      this.categoryFilter.push(category.source.value);
    }else{
      this.categoryFilter = this.categoryFilter.filter(c => c !== category.source.value);
    }
    console.log("category filter: ", this.categoryFilter);
  }

  filterCuisine(cuisine: any) {
    if (cuisine.checked) {
      this.cuisineFilter.push(cuisine.source.value);
    }else{
      this.cuisineFilter = this.cuisineFilter.filter(c => c !== cuisine.source.value);
    }
    console.log("cuisine filter: ", this.cuisineFilter);
  }

  checkState(input: any){
    if(this.categoryFilter.includes(input) || this.cuisineFilter.includes(input)){
      return true;
    }
    return false;
  }

  filterRecipes() {
    let filter:Filter = {
      categories: this.categoryFilter,
      cuisines: this.cuisineFilter,
      veg: this.vegetarian,
      gluten: this.glutenFree,
      name: this.name
    }
    console.log("Recipe filters: ", filter);
    this.isOpen = false;
    this.recipesService.setFilter(filter);
    this.router.navigate(['/loading-page']);
  }

  clearFilters() {
    console.log("clearing filters");
    this.categoryFilter = [];
    this.cuisineFilter = [];
    this.vegetarian = false;
    this.glutenFree = false;
    this.name = '';
    this.filterRecipes();
  }
}
