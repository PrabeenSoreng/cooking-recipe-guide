import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private recipeService: RecipeService,
    private httpClient: HttpClient,
    private authService: AuthService) { }

  storeRecipes() {
    return this.httpClient.put('https://ng-recipe-book-7281c.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
      observe: 'body'
    })
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }

  getRecipes() {
    return this.httpClient.get<Recipe[]>('https://ng-recipe-book-7281c.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      map(
        (recipes) => {
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
