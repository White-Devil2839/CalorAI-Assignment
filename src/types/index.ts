export type Category = 'protein' | 'carb' | 'vegetable' | 'other';

/** The four swipe gestures. left=dislike, right=like, up=superlike, down=unsure. */
export type SwipeDirection = 'like' | 'dislike' | 'superlike' | 'unsure';

export interface Food {
  id: number;
  name: string;
  image: string;
  category: Category;
  tags: string[];
}

export interface Cuisine {
  id: number;
  name: string;
  emoji: string;
  description: string;
}

export interface Decision {
  foodId: number;
  direction: SwipeDirection;
  at: number;
}

/** Output of generateProfile() — drives the entire Results screen. */
export interface TasteProfile {
  highlights: { emoji: string; label: string }[];
  lifestyle: string[];
  lovedFoods: Food[];
  hatedFoods: Food[];
  superLovedFoods: Food[];
  cuisines: { name: string; emoji: string }[];
  counts: { liked: number; disliked: number; superliked: number; unsure: number; total: number };
}
