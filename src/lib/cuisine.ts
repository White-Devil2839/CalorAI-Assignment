import type { Food } from '../types';

/**
 * foods.json has no per-food cuisine field, so we derive it from tags/category.
 * If the data ever gains a `cuisine` field, short-circuit here in one line.
 */
export const TAG_TO_CUISINE: Record<string, string> = {
  italian: 'Italian',
  mexican: 'Mexican',
  japanese: 'Japanese',
  mediterranean: 'Mediterranean',
  // light heuristics so more foods map to *something*
  comfort: 'American',
  'red-meat': 'American',
  noodles: 'Japanese',
  rice: 'Japanese',
};

export const CATEGORY_TO_CUISINE: Record<string, string> = {
  // categories are protein/carb/vegetable/other — intentionally sparse;
  // tags carry the cuisine signal.
};

const CUISINE_EMOJI: Record<string, string> = {
  Italian: '🍝',
  Mexican: '🌮',
  Japanese: '🍣',
  Mediterranean: '🫒',
  American: '🍔',
  Other: '🍽️',
};

export function cuisineOf(food: Food): string | null {
  for (const t of food.tags) {
    const c = TAG_TO_CUISINE[t.toLowerCase()];
    if (c) return c;
  }
  return CATEGORY_TO_CUISINE[food.category] ?? null;
}

export const cuisineEmoji = (name: string): string => CUISINE_EMOJI[name] ?? '🍽️';
