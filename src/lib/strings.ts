import type { Food } from '../types';

/** Card statement copy, matching the Figma's "I love eating salads" pattern. */
export const swipePhrase = (food: Food): string => `I love eating ${food.name.toLowerCase()}`;
