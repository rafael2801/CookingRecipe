import { Meal } from "../meal";

export interface SelectedItem {
    name: string,
    active: boolean,
    meals: Meal[]
}