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



import { CreateAccountComponent } from './create-account.component';

describe('CreateAccountComponent', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAccountComponent ],
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
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('OnSubmit no firstName', () => {
    component.onSubmit();
    expect(alert).toHaveBeenCalledWith("All fields are required.");
  });

  it('OnSubmit no lastName', () => {
    component.accountForm.controls['firstName'].setValue('Dave');
    component.onSubmit();
    expect(alert).toHaveBeenCalledWith("All fields are required.");
  });

  it('OnSubmit no email', () => {
    component.accountForm.controls['firstName'].setValue('Dave');
    component.accountForm.controls['lastName'].setValue('Jones');
    component.onSubmit();
    expect(alert).toHaveBeenCalledWith("All fields are required.");
  });

  it('OnSubmit no password', () => {
    component.accountForm.controls['firstName'].setValue('Dave');
    component.accountForm.controls['lastName'].setValue('Jones');
    component.accountForm.controls['email'].setValue('hiYo123@gmail.com');
    component.onSubmit();
    expect(alert).toHaveBeenCalledWith("All fields are required.");
  });

  it('OnSubmit account created', () => {
    component.accountForm.controls['firstName'].setValue('Dave');
    component.accountForm.controls['lastName'].setValue('Jones');
    component.accountForm.controls['email'].setValue('hiYo123@gmail.com');
    component.accountForm.controls['password'].setValue('password');
    component.onSubmit();
    expect(alert).toHaveBeenCalledWith("Account Created.\nSign in to access account");
  });
  
});
