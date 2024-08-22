import { createReducer, on } from '@ngrx/store';
import * as MealActions from './actions';
import { MealState } from '.';

export const initialState: MealState = {
    favorites: [],
    desserts: [],
    selected: {
      active: false,
      country: '',
      meals: [],
      showAll: false
    }
};

export const mealReducer = createReducer(
  initialState,
  on(MealActions.getDesserts, state => state),
  on(MealActions.getCountryMeals, state => state),
  on(MealActions.set, (state, payload) => ({ ...state, ...payload })),
);