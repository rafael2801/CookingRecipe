import { createAction, props } from '@ngrx/store';
import { MealState } from '.';

export const getDesserts = createAction('[Meal] getDesserts');
export const getCountryMeals = createAction('[Meal] getCountryMeals', props<{ countryName: string }>());
export const set = createAction('[Meal] set', props<Partial<MealState>>());