import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ContentComponent } from './content/content.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OverlayModule } from '@angular/cdk/overlay';
import { SignInComponent } from './sign-in/sign-in.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SignInDialogComponent } from './sign-in-dialog/sign-in-dialog.component';
import { MatInputModule } from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateAccountComponent } from './create-account/create-account.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule} from "@angular/material/tabs";
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PostRecipeComponent } from './post-recipe/post-recipe.component';
import {MatStepperModule} from "@angular/material/stepper";
import { MatList, MatListModule } from '@angular/material/list';
import { RecipesService } from './services/recipes.service';
import { UsersService } from './services/users.service';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    SearchComponent,
    ContentComponent,
    SignInComponent,
    SignInDialogComponent,
    CreateAccountComponent,
    MenuBarComponent,
    RecipeComponent,
    RecipeViewComponent,
    PostRecipeComponent,
    MyRecipesComponent,
    EditRecipeComponent
  ],
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
  ],
  providers: [AuthenticationService, RecipesService,UsersService, EditRecipeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
