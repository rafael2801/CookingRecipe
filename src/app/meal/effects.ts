import { inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { DessertService } from "../services/dessert.service"
import * as MealActions from './actions'
import { map, switchMap, withLatestFrom } from "rxjs"
import { IAppState } from "../app.reducers"
import { Store } from "@ngrx/store"
import { selectAll } from "./selectors"

export const getMealsEffect = createEffect(
  (actions$ = inject(Actions), dessertService = inject(DessertService)) => {
    return actions$
      .pipe(
        ofType(MealActions.getDesserts),
        switchMap(() => dessertService.getDesserts()
          .pipe(
            map(desserts => MealActions.set({ desserts }))
          )
        )
      )
  }, { functional: true }
)

export const getCountryMealsEffect = createEffect(
  (actions$ = inject(Actions), dessertService = inject(DessertService), store = inject(Store<IAppState>)) => {
    return actions$
      .pipe(
        ofType(MealActions.getCountryMeals),
        withLatestFrom(store.select(selectAll)),
        switchMap(([action, state]) => dessertService.getRecipesForCountry(action.countryName)
          .pipe(
            map(meals => MealActions.set({
              selected: {
                ...state.selected,
                meals,
                active: true,
                country: action.countryName,
              }
            }))
          )
        )
      )
  }, { functional: true }
)