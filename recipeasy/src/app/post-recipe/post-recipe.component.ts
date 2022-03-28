import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {recipe} from '../recipe/recipe.component';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../app.component';
import { RecipesService } from '../services/recipes.service';
import { ContentComponent } from '../content/content.component';


@Component({
  selector: 'app-post-recipe',
  templateUrl: './post-recipe.component.html',
  styleUrls: ['./post-recipe.component.css']
})
export class PostRecipeComponent implements OnInit {
  new: recipe = {
    r_id: undefined,
    title: '',
    ingredients: [],
    instructions: [],
    category: '',
    cuisine: '',
    vegetarian: false,
    glutenFree: false,
    image: '',
    author: ''
  }

  currentUser: User = {
    email: '',
    password: '',
    fname: '',
    lname: '',
    isAdmin: false
  }

  newItem: string = '';
  title: string = '';
  selectedCuisine = 'indian';
  selectedCategory = 'breakfast';
  specs!: FormGroup;
  isLinear = true;
  vegetarian = false;
  glutenFree = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  duplicate = false;
  subscription!: Subscription;

  constructor(private _formBuilder: FormBuilder, fb: FormBuilder, private content: ContentComponent, private authService: AuthenticationService, private recipesService: RecipesService) {
    this.specs = fb.group({
      vegetarian: false,
      gluten_free: false
    })
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getProfile()
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  titleInputted(): boolean {
    if(this.title == ''){
      return false;
    }
    return true;
  }

  /**
   * Checks to see is if an imput field has text in it
   * @returns true if input field has text, else returns false
   */
  listInputFilled(): boolean {
    if(this.newItem == ''){
      return false;
    }
    this.duplicate = false;
    return true;
  }

  addIngredient(){
    if(this.new.ingredients.indexOf(this.newItem) > -1){
      this.newItem = '';
      this.duplicate = true;
      return;
    }
    this.new.ingredients.push(this.newItem);
    this.newItem = '';
  }

  addInstruction(){
    if(this.new.instructions.indexOf(this.newItem) > -1){
      console.log('duplicate');
      this.newItem = '';
      this.duplicate = true;
      return;
    }
    this.new.instructions.push(this.newItem);
    this.newItem = '';
  }

  removeIngredient(ingredient: string) {
    this.new.ingredients = this.new.ingredients.filter((item) => item !== ingredient)
  }
  
  removeInstruction(instruction: string) {
    this.new.instructions = this.new.instructions.filter((step) => step !== instruction)
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  allFilled(): boolean {
    
    return true;
  }
  
  onSubmit(): void {
    
    //save uploaded image
    this.new.author = this.currentUser.email;
    this.new.title = this.title;
    this.new.category = this.selectedCategory;
    this.new.cuisine = this.selectedCuisine;
    this.new.vegetarian = this.vegetarian;
    this.new.glutenFree = this.glutenFree;
    this.new.image = 'image.lol';

    console.log(this.new.author);
    console.log(this.new.title);
    console.log(this.new.vegetarian);
    console.log(this.new.glutenFree);
    console.log(this.new.category);
    console.log(this.new.cuisine);
    console.log(this.new.ingredients);
    console.log(this.new.instructions);
    console.log(this.new.image);

    // Send new recipe to api
    this.content.postRecipe(this.new);
  }

}
