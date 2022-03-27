import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.css']
})
export class LoadingPageComponent implements OnInit {

  constructor(private router: Router, private recipesService: RecipesService) { }

  ngOnInit(): void {
    
    this.recipesService.updateDatabase1().subscribe(() => {console.log('update 1 done')});
    setTimeout(() => {}, 500)
    this.recipesService.updateDatabase2().subscribe(() => {console.log('update 2 done')});
    setTimeout(() => {}, 500)
    this.recipesService.updateDatabase3().subscribe(() => {console.log('update 3 done')});
    setTimeout(() => {this.router.navigate(['/'])}, 1000)
    
  }

}