import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
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
    private http: Http,
    private authService: AuthService) { }

  storeRecipes() {
    const token = this.authService.getIdToken();

    return this.http.put('https://ng-recipe-book-7281c.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes())
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }

  getRecipes() {
    const token = this.authService.getIdToken();

    return this.http.get('https://ng-recipe-book-7281c.firebaseio.com/recipes.json?auth=' + token).pipe(
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
