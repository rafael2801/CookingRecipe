import { Component, inject, signal } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Meal, MealState, SelectedMeal } from '../../meal';
import { Store } from '@ngrx/store';
import { IAppState } from '../../app.reducers';
import { selectAll } from '../../meal/selectors';
import { CommonModule } from '@angular/common';
import * as MealsActions from '../../meal/actions'
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MealItemComponent } from '../../components/meal-item/meal-item.component';

@Component({
  selector: 'app-country-meal-list',
  standalone: true,
  imports: [CommonModule, MealItemComponent, FormsModule],
  templateUrl: './country-meal-list.component.html',
  styleUrl: './country-meal-list.component.scss'
})
export class CountryMealListComponent {

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private store = inject(Store<IAppState>);

  mealReducer$: Observable<MealState> = this.store.select(selectAll);
  selectedMeal?: SelectedMeal;
  showAllMeals = signal<boolean>(false);
  searchMealSignal: string = '';
  searchMeal$: Observable<string> = new BehaviorSubject(this.searchMealSignal);;
  
  ngOnInit(): void {
    
    this.store.dispatch(MealsActions.getCountryMeals({ countryName: this.route.snapshot.params['country'] }));

    this.mealReducer$.subscribe(e => {
      this.selectedMeal = e.selected;
    });
    
  }

  onSearchMealChange(value: string) {
    this.searchMealSignal = value;
    (this.searchMeal$ as BehaviorSubject<string>).next(value);
  }

  filteredMeals$ = combineLatest([
    this.mealReducer$,
    this.searchMeal$,
  ]).pipe(
    map(([state, searchTerm]) => {
      const meals = state.selected?.meals || [];
      const showAll = state.selected?.showAll || false;
      return meals
        .filter((meal, index) => showAll ? index < 9 : index < 6)
        .filter(meal => meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(e => ({
          ...e,
          isFavorite: !!state.favorites.find(fav => fav.idMeal === e.idMeal)
        }))
    })
  );

  toggleMealsVisible() {
    this.showAllMeals.set(!this.showAllMeals());
    this.store.dispatch(MealsActions.set({
      selected: {
        ...this.selectedMeal,
        showAll: !this.selectedMeal?.showAll
    }
    }));
  }

  removeFilter () {
    this.router.navigate(['']);
  }
}
