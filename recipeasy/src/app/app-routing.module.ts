import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { ContentComponent } from './content/content.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import {PostRecipeComponent} from "./post-recipe/post-recipe.component";

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: '', component: ContentComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'post-recipe', component: PostRecipeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
