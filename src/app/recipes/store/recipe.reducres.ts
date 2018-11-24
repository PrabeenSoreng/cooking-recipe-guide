import { Recipe } from "../recipe.model";
import { Ingredient } from "src/app/shared/ingredient.model";
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducres';

export interface RecipeState extends fromApp.AppState{
    recipes: State;
}

export interface State {
    recipes: Recipe[];
}

const initialState = {
    recipes: [
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
      ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch(action.type) {
        case RecipeActions.SET_RECIPES: {
            return {
                ...state,
                recipes: [...action.payload]
            };
        }
        case RecipeActions.ADD_RECIPE: {
            return {
                ...state,
                recipes: [...state.recipes, action.paylaod]
            };
        }
        case RecipeActions.UPDATE_RECIPE: {
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: recipes
            };
        }
        case RecipeActions.DELETE_RECIPE: {
            const recipes = [...state.recipes];
            recipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: recipes
            };
        }
        default:
            return state;
    }
}