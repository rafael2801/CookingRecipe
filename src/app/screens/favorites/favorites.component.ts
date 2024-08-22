import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../app.reducers';
import * as MealsActions from '../../meal/actions'
import { MealState, SelectedMeal } from '../../meal';
import { selectAll } from '../../meal/selectors';
import { BehaviorSubject, combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MealItemComponent } from '../../components/meal-item/meal-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [FormsModule, CommonModule, MealItemComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit, OnDestroy {
  
  private router = inject(Router);
  private store = inject(Store<IAppState>);
  private destroy$ = new Subject<void>();

  mealReducer$: Observable<MealState> = this.store.select(selectAll);
  selectedMeal?: SelectedMeal;
  showAllMeals = signal<boolean>(false);
  searchMealSignal: string = '';
  searchMeal$: Observable<string> = new BehaviorSubject(this.searchMealSignal);;
  
  ngOnInit(): void {
    this.mealReducer$
    .pipe( takeUntil(this.destroy$) )
    .subscribe(e => { 
      console.log(e)
      this.selectedMeal = e.selected; 
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  filteredMeals$ = combineLatest([
    this.mealReducer$,
    this.searchMeal$,
  ]).pipe(
    map(([state, searchTerm]) => {
      const meals = state.favorites || [];
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

  onSearchMealChange(value: string) {
    this.searchMealSignal = value;
    (this.searchMeal$ as BehaviorSubject<string>).next(value);
  }

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
    this.router.navigate([''])
  }
}
