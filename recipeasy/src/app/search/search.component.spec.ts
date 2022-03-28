import { SearchComponent } from './search.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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


describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
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
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Should check through the filer category function
  it('should filter category ', () => {
    let category : any = {
      checked: false,
    }
    component.filterCategory(category);
    expect(window.console.log()).toHaveBeenCalled();
  });

  //Should check through the filer cuisine function
  it('should filter cusine ', () => {
    let category : any = {
      checked: false,
    }
    component.filterCuisine(category);
    expect(window.console.log()).toHaveBeenCalled();
  });


  //Should check the state of the input
  it('should return false ', () => {
    expect(component.checkState('Chinese')).toBeFalse();
  });

   //Should check the state of the input
   it('should return true ', () => {
     component.categoryFilter.push('Chinese');
    expect(component.checkState('Chinese')).toBeTrue();
  });

   //Should filter through the recipies
   it('should filter recipies ', () => {
    component.filterRecipes();
    expect(window.console.log()).toHaveBeenCalled();
 });

  //Should clear the filers
  it('should clear all the filters', () => {
    component.clearFilters();
    expect(component.isOpen).toBeFalse();
 });

});
