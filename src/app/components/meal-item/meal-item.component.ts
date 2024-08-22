import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../app.reducers';
import { selectAll } from '../../meal/selectors';
import * as MealsActions from '../../meal/actions'
import { Meal, SelectedMeal } from '../../meal';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-meal-item',
  standalone: true,
  imports: [],
  templateUrl: './meal-item.component.html',
  styleUrl: './meal-item.component.scss'
})
export class MealItemComponent implements OnInit, OnDestroy {

  @Input({ }) public isFavorite = false; 
  @Input({ required: true }) public id = '';
  @Input({ required: true }) public mealName = '...';
  @Input({ required: true }) public photo = '';
  
  private router = inject(Router);
  private store = inject(Store<IAppState>);
  private destroy$ = new Subject<void>();

  mealReducer$ = this.store.select(selectAll);
  favorites: Meal[] = []; 
  selected?: SelectedMeal; 
  
  ngOnInit(): void {
    this.mealReducer$
    .pipe( takeUntil(this.destroy$) )
    .subscribe(e => {
      this.favorites = e.favorites;
      this.selected = e.selected;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openMealDetail() {
    this.router.navigate(['/meal/details', this.id]);
  }

  toggleFavoriteMeal (e: MouseEvent) {

    e.preventDefault();
    e.stopPropagation();

    if(!this.id) return;

    if(!this.isFavorite) {
      this.store.dispatch(MealsActions.set({ favorites: [...this.favorites, { idMeal: this.id, strMeal: this.mealName, strMealThumb: this.photo }] }));
    } else {
      this.store.dispatch(MealsActions.set({ favorites: this.favorites.filter(e => e.idMeal !== this.id) }));
    }

  }
}
