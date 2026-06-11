import raw from './foods.json';
import type { Food, Cuisine } from '../types';

export const FOODS: Food[] = raw.foods as Food[];
export const CUISINES: Cuisine[] = raw.cuisines as Cuisine[];

export const getFoodById = (id: number): Food | undefined =>
  FOODS.find((f) => f.id === id);
