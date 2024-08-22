import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../app.reducers';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Meal, MealState, SelectedMeal } from '../../meal';
import { selectAll } from '../../meal/selectors';
import * as MealsActions from '../../meal/actions'
import { DessertService } from '../../services/dessert.service';
import { MealDetails } from '../../interfaces/mealDetails';
import { CommonModule } from '@angular/common';
import { SafePipePipe } from '../../pipes/safe-pipe.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { countries } from '../../constants/countryNames';

@Component({
  selector: 'app-meal-details',
  standalone: true,
  imports: [CommonModule, SafePipePipe],
  templateUrl: './meal-details.component.html',
  styleUrl: './meal-details.component.scss'
})
export class MealDetailsComponent implements OnInit {

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private store = inject(Store<IAppState>);
  private destroy$ = new Subject<void>();
  private dessertService = inject(DessertService);
  
  id = this.route.snapshot.params['id'];

  isFavorite = false;
  favorites: Meal[] = [];
  mealDetails = signal<MealDetails | null>(null);

  mealReducer$: Observable<MealState> = this.store.select(selectAll);
  selectedMeal?: SelectedMeal;

  ngOnInit(): void {

    this.dessertService.getMealById(this.id)
      .pipe( takeUntil(this.destroy$) )
      .subscribe(e => {
        this.mealDetails.set(e)
      });

    this.mealReducer$
    .pipe( takeUntil(this.destroy$) )
    .subscribe(e => {
      this.selectedMeal = e.selected;
      this.favorites = e.favorites;
      this.isFavorite = !!e.favorites.find(e => e.idMeal === this.id);
    });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleFavoriteMeal (e: MouseEvent) {

    e.preventDefault();
    e.stopPropagation();

    if(!this.id) return;

    if(!this.isFavorite) {
      this.store.dispatch(MealsActions.set({ 
        favorites: [
          ...this.favorites, 
          { 
            idMeal: this.id, 
            strMeal: this.mealDetails()?.['name'] || this.mealDetails()?.strMeal || '', 
            strMealThumb: this.mealDetails()?.strMealThumb || '' 
          }
        ] 
      }));
    } else {
      this.store.dispatch(MealsActions.set({ favorites: this.favorites.filter(e => e.idMeal !== this.id) }));
    }

  }

  backToHome() {
    this.router.navigate(['']);
  }

  getIngredients(meal?: MealDetails | null) {

    if(!meal) return [];

    const fullIngredient = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      
      if ((ingredient && measure)) {
        fullIngredient.push(measure + ' ' + ingredient);
      } else if (ingredient && !measure) {
        fullIngredient.push(ingredient);
      }
    }

    return fullIngredient;
  }

  isFlagAvailable(): boolean {
    const area = this.mealDetails()?.strArea;
    return countries.includes(area || '');
  }
}
