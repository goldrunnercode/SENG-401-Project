import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Subscription } from 'rxjs';
import { recipe } from '../recipe/recipe.component';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  @Input() recipe: recipe = {
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
  };
  newItem: string = '';
  
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  subscription!: Subscription;
  duplicate = false;

  constructor(private _formBuilder: FormBuilder, 
    private recipesService: RecipesService, private router: Router) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  titleInputted(): boolean {
    if(this.recipe.title == ''){
      return false;
    }
    return true;
  }

  allFilled(): boolean {
    if(!this.titleInputted() || !this.imageChosen()) {
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
    if(this.recipe.ingredients.indexOf(this.newItem) > -1){
      this.newItem = '';
      this.duplicate = true;
      return;
    }
    this.recipe.ingredients.push(this.newItem);
    this.newItem = '';
  }

  addInstruction(){
    if(this.recipe.instructions.indexOf(this.newItem) > -1){
      console.log('duplicate');
      this.newItem = '';
      this.duplicate = true;
      return;
    }
    this.recipe.instructions.push(this.newItem);
    this.newItem = '';
  }

  removeIngredient(ingredient: string) {
    this.recipe.ingredients = this.recipe.ingredients.filter((item) => item !== ingredient)
  }
  
  removeInstruction(instruction: string) {
    this.recipe.instructions = this.recipe.instructions.filter((step) => step !== instruction)
  }

  imageChangedEvent: any = '';

  imageChosen(): boolean {
    if(this.recipe.image == ''){
      this.isLinear = true;
      return false;
    }
    this.isLinear = false;
    return true;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.recipe.image = <string>event.base64;
  }
  imageLoaded() {
    /* show cropper */
  }
  cropperReady() {
    /* cropper ready */
  }
  loadImageFailed() {
    /* show message */
  }

  onSubmit(): void {
    //save uploaded image
    console.log(this.recipe.author);
    console.log(this.recipe.title);
    console.log(this.recipe.vegetarian);
    console.log(this.recipe.glutenFree);
    console.log(this.recipe.category);
    console.log(this.recipe.cuisine);
    console.log(this.recipe.ingredients);
    console.log(this.recipe.instructions);

    // Send new vehicle to api
    this.recipesService.updateRecipe(this.recipe)
    this.router.navigate(['/'])
  }

}
