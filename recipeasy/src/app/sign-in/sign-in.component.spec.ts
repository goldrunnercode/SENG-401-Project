import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInComponent } from './sign-in.component';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule} from "@angular/material/tabs";
import { ImageCropperModule } from 'ngx-image-cropper';
import { AppRoutingModule } from '../app-routing.module';
import {MatStepperModule} from "@angular/material/stepper";
import { MatList, MatListModule } from '@angular/material/list';
import { UsersService } from '../services/users.service';
import { ContentComponent } from '../content/content.component';
import { EditRecipeComponent } from '../edit-recipe/edit-recipe.component';
import { RecipesService } from '../services/recipes.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthenticationService } from '../services/authentication.service';
import {FlexLayoutModule} from "@angular/flex-layout";




describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
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
        MatProgressSpinnerModule,
        FlexLayoutModule,
      ],
      providers: [AuthenticationService, RecipesService,UsersService, EditRecipeComponent, ContentComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  

});
