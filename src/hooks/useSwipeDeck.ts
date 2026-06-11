import { FOODS } from '../data/foods';
import { useSwipeStore, TOTAL } from '../state/swipeStore';

/** Read-side facade over the deck + store for screens. */
export function useSwipeDeck() {
  const index = useSwipeStore((s) => s.index);
  const decide = useSwipeStore((s) => s.decide);
  const undo = useSwipeStore((s) => s.undo);
  const canUndo = useSwipeStore((s) => s.decisions.length > 0);

  return {
    deck: FOODS,
    total: TOTAL,
    index,
    isDone: index >= TOTAL,
    progress: index / TOTAL,
    current: FOODS[index],
    decide,
    undo,
    canUndo,
  };
}
