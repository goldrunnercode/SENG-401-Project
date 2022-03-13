import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  isOpen = false;
  recipeFilter = [];
  categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert'];
  cuisines = ['Indian', 'Mexican', 'Chinese', 'Vietnamese', 'Italian', 'American'];
  categoryFilter: string[] = [];
  cuisineFilter: string[] = [];
  vegetarian: boolean = false;
  glutenFree: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  filterCategory(category: any) {
    if (category.checked) {
      this.categoryFilter.push(category.source.value);
      console.log(`category ${category.source.value} is selected`);
    }
  }

  filterCuisine(cuisine: any) {
    if (cuisine.checked) {
      this.cuisineFilter.push(cuisine.source.value);
      console.log(`cuisine ${cuisine.source.value} is selected`);
    }
  }

  // filterVeg(veg: any){
  //   if(veg.checked){
  //     this.vegetarian = !this.vegetarian;
  //     console.log("vegetarian is selected")
  //   }
  // }

  // filterGluten(gluten: any){
  //   if(gluten.checked){
  //     console.log("gluten free is selected")
  //   }
  // }

  filterRecipes() {
    console.log(`categories ${this.categoryFilter}`);
    console.log(`cuisines ${this.cuisineFilter}`);
    console.log(`vegetarian ${this.vegetarian}`);
    console.log(`gluten free ${this.glutenFree}`);
    console.log("filter applied");
  }

  clearFilters() {
    console.log("clearing filters");
    this.categoryFilter = [];
    this.cuisineFilter = [];
    this.vegetarian = false;
    this.glutenFree = false;
    this.isOpen = false;
  }
}
