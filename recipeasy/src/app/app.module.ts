import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from "@angular/material/stepper";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AllUsersComponent } from './all-users/all-users.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { PostRecipeComponent } from './post-recipe/post-recipe.component';
import { ProfileComponent } from './profile/profile.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { RecipeComponent } from './recipe/recipe.component';
import { SearchComponent } from './search/search.component';
import { AuthenticationService } from './services/authentication.service';
import { RecipesService } from './services/recipes.service';
import { UsersService } from './services/users.service';
import { SignInDialogComponent } from './sign-in-dialog/sign-in-dialog.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserComponent } from './user/user.component';
import { LoadingPageComponent } from './visuals/loading-page/loading-page.component';

@NgModule({
  declarations: [
    AppComponent,
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
    EditRecipeComponent,
    AllUsersComponent,
    UserComponent,
    LoadingPageComponent
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
    MatProgressSpinnerModule,
    FlexLayoutModule,
  ],
  providers: [AuthenticationService, RecipesService,UsersService, EditRecipeComponent, ContentComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
