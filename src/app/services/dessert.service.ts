import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { Meal } from '../meal';
import { MealDetails } from '../interfaces/mealDetails';

@Injectable({
  providedIn: 'root'
})
export class DessertService {

  private base: string = environment.base;

  constructor(private http: HttpClient) { }

  getDesserts (): Observable<Meal[]> {
    return this.http.get<{ meals: Meal[] }>(this.base + 'json/v1/1/filter.php?c=Dessert')
    .pipe(map(e => e.meals));
  }

  getRecipesForCountry(countryName: string) {
    return this.http.get<{ meals: Meal[] }>(this.base + 'json/v1/1/filter.php?a=' + countryName)
    .pipe(map(e => e.meals))
  }

  getMealById(id: string) {
    return this.http.get<{ meals: MealDetails[] }>(this.base + 'json/v1/1/lookup.php?i=' + id)
      .pipe(map(e => e.meals?.[0]))
  }
}
