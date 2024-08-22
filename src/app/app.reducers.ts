import { ActionReducerMap } from "@ngrx/store";
import { mealReducer } from "./meal/reducer";
import { MealState } from "./meal";

export interface IAppState {
    meal: MealState
}

export const appReducers: ActionReducerMap<IAppState> = {
    meal: mealReducer
}