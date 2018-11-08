import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe('Tasty Schnitzel',
    'Just awesome!','https://lh3.googleusercontent.com/WePLa6gulCpK4DZzCUmxFL9dscR7VCnuf4LMfgugFH-uh65q9QGvMKXAlPbw1mA0S5Yrc1SeqRrvbEVvlRKRcpwlOuVN_0PwNieBaE0=w600-l68',
    [
      new Ingredient('Meat', 1),
      new Ingredient('French Fries', 20)
    ]),
    new Recipe('Big Fat Burger',
    'What else you need to say?','https://static1.squarespace.com/static/55488e38e4b0f2df4ca91881/t/5829ea74be6594017ea4e8a6/1479142015229/?format=750w', [
      new Ingredient('Buns', 2),
      new Ingredient('Meat', 3),
      new Ingredient('French Fries', 30)
    ])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
