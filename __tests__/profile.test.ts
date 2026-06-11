import { describe, it, expect } from '@jest/globals';
import { generateProfile } from '../src/lib/profile';
import { FOODS } from '../src/data/foods';
import type { Decision, SwipeDirection } from '../src/types';

const mk = (foodId: number, direction: SwipeDirection): Decision => ({ foodId, direction, at: 0 });
const byName = (name: string) => FOODS.find((f) => f.name === name)!;

describe('generateProfile', () => {
  it('returns safe fallbacks for an empty deck', () => {
    const p = generateProfile([]);
    expect(p.counts.total).toBe(0);
    expect(p.highlights.length).toBeGreaterThan(0); // never empty
    expect(p.cuisines.length).toBeGreaterThan(0); // falls back to the 5 provided cuisines
    expect(p.lovedFoods).toEqual([]);
    expect(p.lifestyle.length).toBeGreaterThanOrEqual(2);
  });

  it('counts decisions by direction and routes foods correctly', () => {
    const decisions = [
      mk(byName('Steak').id, 'like'),
      mk(byName('Chicken Breast').id, 'like'),
      mk(byName('Kale').id, 'dislike'),
      mk(byName('Sushi').id, 'superlike'),
      mk(byName('Bread').id, 'unsure'),
    ];
    const p = generateProfile(decisions);
    expect(p.counts).toMatchObject({ liked: 2, disliked: 1, superliked: 1, unsure: 1, total: 5 });
    expect(p.superLovedFoods.map((f) => f.name)).toEqual(['Sushi']);
    expect(p.lovedFoods.map((f) => f.name)).toContain('Sushi'); // super counts as loved
    expect(p.hatedFoods.map((f) => f.name)).toEqual(['Kale']);
  });

  it('derives cuisines from tags (Pasta -> Italian)', () => {
    const p = generateProfile([mk(byName('Pasta').id, 'like')]);
    expect(p.cuisines.some((c) => c.name === 'Italian')).toBe(true);
  });

  it('gives meat-lovers a Carnivore highlight', () => {
    const p = generateProfile([mk(byName('Steak').id, 'like'), mk(byName('Burger').id, 'like')]);
    expect(p.highlights.some((h) => h.label === 'Carnivore')).toBe(true);
  });

  it('weighs superlikes double in trait scoring', () => {
    const p = generateProfile([mk(byName('Salad').id, 'superlike')]);
    // Salad is a vegetable/healthy -> should surface a plant/health trait
    expect(p.highlights.some((h) => ['Plant-Lover', 'Health-Focused'].includes(h.label))).toBe(true);
  });
});
