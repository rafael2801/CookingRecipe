export interface Meal {
    strMeal: string,
    strMealThumb: string,
    idMeal: string
}

export interface SelectedMeal {
    meals?: Meal[],
    country?: string,
    mealId?: string,
    active?: boolean,
    showAll?: boolean
}

export interface MealState {
    desserts: Meal[],
    favorites: Meal[],
    selected: SelectedMeal
}