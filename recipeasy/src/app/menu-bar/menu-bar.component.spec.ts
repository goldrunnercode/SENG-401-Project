
import {MenuBarComponent} from './menu-bar.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';


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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule} from "@angular/material/tabs";
import { ImageCropperModule } from 'ngx-image-cropper';
import {MatStepperModule} from "@angular/material/stepper";
import { MatListModule } from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthenticationService } from '../services/authentication.service';

describe('MenuBarComponent', () => {
  let component: MenuBarComponent;
  let fixture: ComponentFixture<MenuBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBarComponent ],
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
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    spyOn(window, "alert");
    spyOn(window.console, 'log');
    fixture = TestBed.createComponent(MenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sign in', () => {
      component.current.email = '123@yahoo.com'
      component.signIn(component.current);
    expect(window.console.log).toHaveBeenCalled();
  });

  it('should view profile', () => {
    component.viewProfile();
  expect(component.authService.getProfile).toHaveBeenCalled();
});

it('should sign out', () => {
    component.signed_in = true;
    component.onSignOut();
  expect(window.console.log).toHaveBeenCalled();
});

it('should throw alert', () => {
    component.signed_in = false;
    component.onSignOut();
    expect(alert).toHaveBeenCalledWith("You are already signed out");
});


});