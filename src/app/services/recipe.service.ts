import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('A test recipe',
    'This is simply a test','https://media2.s-nbcnews.com/j/newscms/2018_35/1363730/rachel-hollis-chicken-fingers-today-main-180828_b9b2a726ec8654e3f9f7435ce26588fb.today-inline-large.jpg'),
    new Recipe('Another test recipe',
    'This is simply a test','https://media2.s-nbcnews.com/j/newscms/2018_35/1363730/rachel-hollis-chicken-fingers-today-main-180828_b9b2a726ec8654e3f9f7435ce26588fb.today-inline-large.jpg')
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  constructor() { }
}
