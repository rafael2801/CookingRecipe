import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../app.reducers';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MealState, SelectedMeal } from '../../meal';
import { selectAll } from '../../meal/selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  private router = inject(Router);
  private destroy$ = new Subject<void>();
  private store = inject(Store<IAppState>);

  mealReducer$: Observable<MealState> = this.store.select(selectAll);
  selectedMeal?: SelectedMeal;

  ngOnInit(): void {
    this.mealReducer$
    .pipe( takeUntil(this.destroy$) )
    .subscribe(e => {
      this.selectedMeal = e.selected;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeToFavorites() { this.router.navigate(['/favorites']) }

  toHome() { this.router.navigate(['']) }
}
