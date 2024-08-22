import { Routes } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { MealDetailsComponent } from './screens/meal-details/meal-details.component';
import { CountryMealListComponent } from './screens/country-meal-list/country-meal-list.component';
import { FavoritesComponent } from './screens/favorites/favorites.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'favorites',
        component: FavoritesComponent
    },
    {
        path: 'meal/details/:id',
        component: MealDetailsComponent
    },
    {
        path: 'meal/:country',
        component: CountryMealListComponent,
    },
];
