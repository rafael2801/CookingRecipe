import { createSelector } from '@ngrx/store';
import { MealState } from './';
import { IAppState } from '../app.reducers';

export const selectMealState = (state: IAppState) => state.meal;

export const selectAll = createSelector(
    selectMealState,
    (state: MealState) => state
);
