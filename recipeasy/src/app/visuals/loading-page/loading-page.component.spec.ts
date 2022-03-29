import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingPageComponent } from './loading-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ContentComponent } from 'src/app/content/content.component';
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
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule} from "@angular/material/tabs";
import { ImageCropperModule } from 'ngx-image-cropper';
import {MatStepperModule} from "@angular/material/stepper";
import { MatListModule } from '@angular/material/list';
import { RecipesService } from 'src/app/services/recipes.service';
import { UsersService } from 'src/app/services/users.service';
import { EditRecipeComponent } from 'src/app/edit-recipe/edit-recipe.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FlexLayoutModule} from "@angular/flex-layout";

describe('LoadingPageComponent', () => {
  let component: LoadingPageComponent;
  let fixture: ComponentFixture<LoadingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingPageComponent ],
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
    fixture = TestBed.createComponent(LoadingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
