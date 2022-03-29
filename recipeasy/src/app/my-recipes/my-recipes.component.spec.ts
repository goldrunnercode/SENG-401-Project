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
import { MyRecipesComponent } from './my-recipes.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


describe('MyRecipesComponent', () => {
  let component: MyRecipesComponent;
  let fixture: ComponentFixture<MyRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRecipesComponent ],
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
    spyOn(window.console, 'log');
    fixture = TestBed.createComponent(MyRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should adjust window size', () => {
    component.onResize(Event);
    expect(window.console.log).toHaveBeenCalled();
  });
});
