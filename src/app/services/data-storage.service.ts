import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private recipeService: RecipeService,
    private http: Http) { }

  storeRecipes() {
    return this.http.put('https://ng-recipe-book-7281c.firebaseio.com/recipes.json', this.recipeService.getRecipes())
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }

  getRecipes() {
    return this.http.get('https://ng-recipe-book-7281c.firebaseio.com/recipes.json').pipe(
      map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for(let recipe of recipes) {
            if(!recipe['ingredients'])
              recipe['ingredients'] = [];
          }
          return recipes;
        }
      )
    )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
