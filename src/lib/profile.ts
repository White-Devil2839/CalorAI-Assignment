import type { Decision, Food, TasteProfile } from '../types';
import { getFoodById, CUISINES } from '../data/foods';
import { cuisineOf, cuisineEmoji } from './cuisine';

const dedupe = (foods: Food[]): Food[] => {
  const seen = new Set<number>();
  return foods.filter((f) => (seen.has(f.id) ? false : (seen.add(f.id), true)));
};

const count = (foods: Food[], pred: (f: Food) => boolean) => foods.filter(pred).length;
const hasTag = (f: Food, tag: string) => f.tags.includes(tag);

/** Taste-trait rules. Each scores the loved foods; top scorers become highlights. */
const TRAIT_RULES: { emoji: string; label: string; score: (foods: Food[]) => number }[] = [
  { emoji: '🥩', label: 'Carnivore', score: (fs) => count(fs, (f) => hasTag(f, 'red-meat') || hasTag(f, 'poultry')) * 2 + count(fs, (f) => f.category === 'protein' && !hasTag(f, 'fish') && !hasTag(f, 'plant-based')) },
  { emoji: '🐟', label: 'Pescatarian', score: (fs) => count(fs, (f) => hasTag(f, 'fish') || hasTag(f, 'seafood')) * 2 },
  { emoji: '🥗', label: 'Plant-Lover', score: (fs) => count(fs, (f) => f.category === 'vegetable' || hasTag(f, 'plant-based') || hasTag(f, 'vegan')) },
  { emoji: '🍝', label: 'Carb-Lover', score: (fs) => count(fs, (f) => f.category === 'carb') },
  { emoji: '🥑', label: 'Health-Focused', score: (fs) => count(fs, (f) => hasTag(f, 'healthy') || hasTag(f, 'whole-grain') || hasTag(f, 'green')) },
  { emoji: '🍔', label: 'Comfort-Seeker', score: (fs) => count(fs, (f) => hasTag(f, 'comfort') || hasTag(f, 'indulgent')) },
  { emoji: '🍳', label: 'Breakfast-Person', score: (fs) => count(fs, (f) => hasTag(f, 'breakfast')) * 2 },
  { emoji: '🍇', label: 'Fruit-Lover', score: (fs) => count(fs, (f) => hasTag(f, 'fruit')) * 2 },
];

/** Lifestyle chips inferred from loved tags; padded to feel complete. */
function computeLifestyle(loved: Food[]): string[] {
  const chips: string[] = [];
  const proteinScore = count(loved, (f) => hasTag(f, 'protein') || hasTag(f, 'lean'));
  const vegScore = count(loved, (f) => f.category === 'vegetable');
  const healthScore = count(loved, (f) => hasTag(f, 'healthy') || hasTag(f, 'green') || hasTag(f, 'whole-grain'));
  const comfortScore = count(loved, (f) => hasTag(f, 'comfort') || hasTag(f, 'indulgent'));

  chips.push('Active');
  if (proteinScore >= 2) chips.push('Gym-Goer');
  if (vegScore >= 2) chips.push('Plant-Forward');
  if (healthScore >= 2) chips.push('Health-Conscious');
  if (comfortScore >= 2) chips.push('Comfort-Friendly');
  if (chips.length < 3) chips.push('Balanced Eater');

  return chips.slice(0, 4);
}

/**
 * Pure, deterministic: swipes -> the whole Results screen.
 * Superlikes weigh double. Every section has an empty-state fallback.
 */
export function generateProfile(decisions: Decision[]): TasteProfile {
  const byDir = (dir: Decision['direction']) =>
    decisions
      .filter((d) => d.direction === dir)
      .map((d) => getFoodById(d.foodId))
      .filter((f): f is Food => Boolean(f));

  const liked = byDir('like');
  const superliked = byDir('superlike');
  const disliked = byDir('dislike');
  const unsure = byDir('unsure');

  // weighted pool for trait/lifestyle scoring
  const loved = [...superliked, ...superliked, ...liked];

  // Highlights
  let highlights = TRAIT_RULES.map((r) => ({ emoji: r.emoji, label: r.label, value: r.score(loved) }))
    .filter((r) => r.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 3)
    .map(({ emoji, label }) => ({ emoji, label }));
  if (highlights.length === 0) highlights = [{ emoji: '😋', label: 'Adventurous Eater' }];

  // Cuisines ranked by liked/super count
  const cuisineCounts = new Map<string, number>();
  [...liked, ...superliked].forEach((f) => {
    const c = cuisineOf(f);
    if (c) cuisineCounts.set(c, (cuisineCounts.get(c) ?? 0) + 1);
  });
  let cuisines = [...cuisineCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => ({ name, emoji: cuisineEmoji(name) }));
  if (cuisines.length === 0) {
    cuisines = CUISINES.map((c) => ({ name: c.name, emoji: c.emoji })); // fallback: explore these
  }

  return {
    highlights,
    lifestyle: computeLifestyle(loved),
    lovedFoods: dedupe([...superliked, ...liked]),
    hatedFoods: dedupe(disliked),
    superLovedFoods: dedupe(superliked),
    cuisines,
    counts: {
      liked: liked.length,
      disliked: disliked.length,
      superliked: superliked.length,
      unsure: unsure.length,
      total: decisions.length,
    },
  };
}
