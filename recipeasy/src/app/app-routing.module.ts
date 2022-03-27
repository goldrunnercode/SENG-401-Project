import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { ContentComponent } from './content/content.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import {PostRecipeComponent} from "./post-recipe/post-recipe.component";
import { AllUsersComponent } from './all-users/all-users.component';
import { LoadingPageComponent } from './visuals/loading-page/loading-page.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: '', component: ContentComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'post-recipe', component: PostRecipeComponent },
  { path: 'all-users', component: AllUsersComponent },
  { path: 'loading-page', component: LoadingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
