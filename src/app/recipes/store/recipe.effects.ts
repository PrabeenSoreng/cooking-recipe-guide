import { Effect, Actions, ofType } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as RecipeActions from './recipe.actions';
import * as fromRecipe from './recipe.reducres';
import { switchMap, map, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../recipe.model";

@Injectable()
export class RecipeEffects {
    @Effect()
    recipeFetch = this.actions$.pipe(
        ofType(RecipeActions.FETCH_RECIPES),
        switchMap((action: RecipeActions.FetchRecipes) => {
            return this.httpClient.get<Recipe[]>('https://ng-recipe-book-7281c.firebaseio.com/recipes.json',
            {
                observe: 'body',
                responseType: 'json'
            })
        }),
      map(
        (recipes) => {
          for(let recipe of recipes) {
            if(!recipe['ingredients'])
              recipe['ingredients'] = [];
          }
          return {
              type: RecipeActions.SET_RECIPES,
              payload: recipes
          };
        }
      )
    );

    @Effect({dispatch: false})
    recipeStore = this.actions$.pipe(
        ofType(RecipeActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([action, state]) => {
            return this.httpClient.put('https://ng-recipe-book-7281c.firebaseio.com/recipes.json', state.recipes, 
            {
                observe: 'body'
            })
        })
    );

    constructor(
        private store: Store<fromRecipe.RecipeState>,
        private httpClient: HttpClient,
        private actions$: Actions) {}
}