import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Router, ActivatedRoute } from '@angular/router';
import {  Observable } from 'rxjs';
import * as fromRecipe from '../store/recipe.reducres';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  
  constructor(
    private store: Store<fromRecipe.RecipeState>,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.recipeState = this.store.select('recipes');
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
