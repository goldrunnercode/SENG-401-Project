import {PostRecipeComponent} from './post-recipe.component';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from '../app-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule} from "@angular/material/tabs";
import { ImageCropperModule } from 'ngx-image-cropper';
import {MatStepperModule} from "@angular/material/stepper";
import {MatListModule } from '@angular/material/list';

describe('MenuBarComponent', () => {
  let component: PostRecipeComponent;
  let fixture: ComponentFixture<PostRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostRecipeComponent ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        AppRoutingModule,
        MatMenuModule,
        MatIconModule,
        MatGridListModule,
        MatCardModule,
        LayoutModule,
        MatFormFieldModule,
        MatCheckboxModule,
        OverlayModule,
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
        NoopAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Checking if there is a title, should be false
  it('should not have a title', () => {
    expect(component.titleInputted()).toBeFalse();
  });

  //Checking if there is a title, it should be true
  it('should have a title', () => {
      component.title = 'Soup';
    expect(component.titleInputted()).toBeTrue();
  });

  //Checking if there is a inputField, should be false
  it('should not have a input field', () => {
    expect(component.listInputFilled()).toBeFalse();
  });

  //Checking if there is a input field, it should be true
  it('should have a listInputFilled', () => {
      component.newItem = 'Cheese';
    expect(component.listInputFilled()).toBeTrue();
  });

  //Adding an ingredient
  it('adding an ingredient, should be Cheese', () => {
    component.newItem = 'Cheese';
    component.addIngredient();
    expect(component.new.ingredients[0]).toBe('Cheese');
    });

//Adding duplicate ingredient
it('should turn duplicates true', () => {
    component.newItem = 'Cheese';
    component.addIngredient();
    component.newItem = 'Cheese';
    component.addIngredient();
    expect(component.duplicate).toBeTrue();
    });

    //Adding an instruction
  it('adding an instruction, should be Stir', () => {
    component.newItem = 'Stir';
    component.addInstruction();
    expect(component.new.instructions[0]).toBe('Stir');
    });

//Adding duplicate instruction
it('should turn duplicates true', () => {
    component.newItem = 'Stir';
    component.addInstruction();
    component.newItem = 'Stir';
    component.addInstruction();
    expect(component.duplicate).toBeTrue();
    });


    //See if an image is chosen
it('should return false', () => {
    expect(component.imageChosen()).toBeFalse();
    });

    //See if an image is chosen, when one has been selected
it('should return true', () => {
    component.croppedImage = 'Im a image';
    expect(component.imageChosen()).toBeTrue();
    });

    //See if all is filled when empty
it('should not be all filled', () => {
    expect(component.allFilled()).toBeFalse();
    });

    //See if all is filled when full
it('should be all filled', () => {
    component.title = 'I am a title';
    component.croppedImage = 'I am a image';
    expect(component.allFilled()).toBeTrue();
    });

    //On submit variables should be stored in new 
it('should store values in new', () => {
    component.title = 'I am a title';
    component.onSubmit();
    expect(component.new.title).toBe('I am a title');
    });  

});