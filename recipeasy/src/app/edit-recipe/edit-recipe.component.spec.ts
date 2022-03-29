import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';

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
import { EditRecipeComponent } from './edit-recipe.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';




describe('EditRecipeComponent', () => {
  let component: EditRecipeComponent ;
  let fixture: ComponentFixture<EditRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRecipeComponent],
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
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  //Test should create a stimple edit-recipe component
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //This is testing a titleInput that should be false
  it("testing titleInputted False", () => {
    
    expect(component.titleInputted()).toBeFalse();
  });

    //This is testing a titleInput that should be true
    it("testing titleInputted True", () => {
      component.recipe.title = 'My Title';
      expect(component.titleInputted()).toBeTrue();
    });

     //This is testing a allFilled that should be true
     it("testing allFilled True", () => {
       component.recipe.title = 'My Title';
      component.recipe.image = 'My Image';
      expect(component.allFilled()).toBeTrue();
    });  
    
    //This is testing listInputFilled that should be true
    it("testing listInputFilled True", () => {
      component.newItem = 'My Item';
      expect(component.listInputFilled()).toBeTrue();
    });  

    //This is testing a addingIngredient that should be true
    it("testing adding potato to recipe", () => {
      component.newItem = 'Potato';
      component.addIngredient();
      expect(component.recipe.ingredients[0]).toBe('Potato');
    });

    //This is testing a adding duplicate ingreident
    it("testing adding Duplicate Item", () => {
      component.newItem = 'Potato';
      component.addIngredient();
      component.newItem = 'Potato';
      component.addIngredient();
      expect(component.duplicate).toBeTrue();
    });

    //This is testing a addingInstruction that should be true
    it("testing adding Instruction to recipe", () => {
      component.newItem = 'Do Stuff';
      component.addInstruction();
      expect(component.recipe.instructions[0]).toBe('Do Stuff');
    });

    //This is testing a adding duplicate ingreident
    it("testing adding Duplicate Instuction", () => {
      component.newItem = 'Do Stuff';
      component.addInstruction();
      component.newItem = 'Do Stuff';
      component.addInstruction();
      expect(component.duplicate).toBeTrue();
    });

    //Checking On Submit
    it("testing on Submit", () => {
      component.onSubmit();
      expect(window.console.log()).toHaveBeenCalled();
    });

});
