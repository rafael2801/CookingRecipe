import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { DessertService } from '../../services/dessert.service';
import { Store } from '@ngrx/store';
import { IAppState } from '../../app.reducers';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { MealState, SelectedMeal } from '../../meal';
import { selectAll } from '../../meal/selectors';
import * as MealsActions from '../../meal/actions'
import { FormsModule } from '@angular/forms';
import { MealItemComponent } from '../../components/meal-item/meal-item.component';
import { CommonModule, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { countries as CountryNames } from '../../constants/countryNames';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, MealItemComponent, NgClass, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  private router = inject(Router);
  private destroy$ = new Subject<void>();
  private store = inject(Store<IAppState>);

  mealReducer?: MealState;
  selectedMeal?: SelectedMeal;
  showAllMeals = signal<boolean>(false);
  searchCountries = signal('');

  countries = signal(CountryNames);

  filteredCountries = computed(() => {
    return this.countries().filter(country =>
      country.toLowerCase().includes(this.searchCountries().toLowerCase())
    );
  });

  ngOnInit(): void {
    this.store.select(selectAll)
    .pipe( takeUntil(this.destroy$) )
    .subscribe(e => {
      this.mealReducer = e;
    });
    this.store.dispatch(MealsActions.getDesserts());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectItem(item: string) {
    this.router.navigate(['/meal', item]);
  }

  chooseMeal(mealId: string) {
    this.router.navigate(['/meal/details', mealId]);
  }
}
