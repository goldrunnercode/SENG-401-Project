
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { recipe } from '../recipe/recipe.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from '../app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule} from "@angular/material/tabs";
import { ImageCropperModule } from 'ngx-image-cropper';
import {MatStepperModule} from "@angular/material/stepper";
import { MatListModule } from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ContentComponent} from './content.component';

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ContentComponent],
      imports: [
        NoopAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatIconModule,
        MatMenuModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        AppRoutingModule,
        MatMenuModule,
        MatIconModule,
        MatGridListModule,
        MatCardModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatDialogModule,
        MatInputModule,
        FormsModule,
        MatSelectModule,
        MatRadioModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTabsModule,
        ImageCropperModule,
        MatStepperModule,
        MatListModule,
        MatProgressSpinnerModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    spyOn(window.console, 'log');
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  //This tests the posting recipe function
  it('should post recipe', () => {
    const rec: recipe = {
      r_id: 8,
      title: 'potato',
      category: 'Chinese',
      cuisine: 'Fish',
      vegetarian: true,
      glutenFree: false,
      image: 'string',
      author: 'Tyler',
      ingredients: ['potaot'],
      instructions: ['Dont mess up']
    };
    component.postRecipe(rec);
    expect(window.console.log).toHaveBeenCalled();
  });

  //This tests the posting recipe function
  it('should delete recipe', () => {
    const rec: recipe = {
      r_id: 8,
      title: 'potato',
      category: 'Chinese',
      cuisine: 'Fish',
      vegetarian: true,
      glutenFree: false,
      image: 'string',
      author: 'Tyler',
      ingredients: ['potaot'],
      instructions: ['Dont mess up']
    };
    component.postRecipe(rec);
    component.deleteRecipe(8);
    expect(window.console.log).toHaveBeenCalled();
  });

  //Tests the filer content function
  it('should filter content', () => {
    component.recipeFilter.categories = ['cat', 'dog'];
    component.recipeFilter.cuisines = ['fish', 'cake'];
    component.recipeFilter.gluten = true;
    component.recipeFilter.veg = true;
    component.recipeFilter.name = 'Fish cake';
    const rec: recipe = {
      r_id: 8,
      title: 'potato',
      category: 'cat',
      cuisine: 'fish',
      vegetarian: true,
      glutenFree: true,
      image: 'string',
      author: 'Tyler',
      ingredients: ['potaot'],
      instructions: ['Dont mess up']
    };
    const recs :recipe[] = [];
    recs[0] = rec;

    const recs2 :recipe[] = component.filterContent(recs);

    expect(component.filterContent(recs)).toBeTruthy();
  });

  //Tests the substring function
  it('should find substring', () => {
    
    expect(component.isSubstring('cod', 'coding')).toBeTrue();
  });

});
