import { create } from 'zustand';
import type { Decision, SwipeDirection } from '../types';
import { FOODS } from '../data/foods';

export const TOTAL = FOODS.length;

interface SwipeState {
  /** Append-only decision log — the single source of truth. */
  decisions: Decision[];
  /** Pointer into the deck. */
  index: number;
  /** Food ids in decided order, for undo. */
  history: number[];
  decide: (foodId: number, direction: SwipeDirection) => void;
  undo: () => void;
  reset: () => void;
}

/**
 * One small store. Selector subscriptions keep the 60fps swipe screen from
 * re-rendering wholesale. The store mutates ONCE per committed swipe, never per
 * drag frame (all per-frame motion lives in Reanimated shared values).
 */
export const useSwipeStore = create<SwipeState>((set) => ({
  decisions: [],
  index: 0,
  history: [],
  decide: (foodId, direction) =>
    set((s) => ({
      decisions: [...s.decisions, { foodId, direction, at: Date.now() }],
      index: s.index + 1,
      history: [...s.history, foodId],
    })),
  undo: () =>
    set((s) =>
      s.decisions.length === 0
        ? s
        : {
            decisions: s.decisions.slice(0, -1),
            index: Math.max(0, s.index - 1),
            history: s.history.slice(0, -1),
          }
    ),
  reset: () => set({ decisions: [], index: 0, history: [] }),
}));
