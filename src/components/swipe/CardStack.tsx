import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import SwipeCard, { type SwipeCardHandle } from './SwipeCard';
import { useHaptics } from '../../hooks/useHaptics';
import { FOODS } from '../../data/foods';
import { useSwipeStore, TOTAL } from '../../state/swipeStore';
import type { SwipeDirection } from '../../types';

export interface CardStackHandle {
  swipe: (dir: SwipeDirection) => void;
}

const VISIBLE = 3;

/** The swipeable deck. Renders <=3 cards; only the top one is interactive. */
const CardStack = forwardRef<CardStackHandle>(function CardStack(_props, ref) {
  const index = useSwipeStore((s) => s.index);
  const decide = useSwipeStore((s) => s.decide);
  const { impact } = useHaptics();
  const topRef = useRef<SwipeCardHandle>(null);

  useImperativeHandle(ref, () => ({
    swipe: (dir: SwipeDirection) => topRef.current?.swipe(dir),
  }));

  // Prefetch the next couple of card images so they don't hitch on reveal.
  useEffect(() => {
    const next = [FOODS[index + 1], FOODS[index + 2]].filter(Boolean).map((f) => f.image);
    if (next.length) Image.prefetch(next);
  }, [index]);

  const handleDecide = useCallback(
    (dir: SwipeDirection, foodId: number) => {
      impact(dir);
      decide(foodId, dir);
    },
    [impact, decide]
  );

  // Build back-to-front so the top card paints last (no zIndex reliance).
  const cards = [];
  const remaining = Math.min(VISIBLE, TOTAL - index);
  for (let depth = remaining - 1; depth >= 0; depth--) {
    const food = FOODS[index + depth];
    if (!food) continue;
    cards.push(
      <SwipeCard
        key={food.id}
        ref={depth === 0 ? topRef : undefined}
        food={food}
        isTop={depth === 0}
        depth={depth}
        onDecide={handleDecide}
      />
    );
  }

  return <View style={styles.stack}>{cards}</View>;
});

export default CardStack;

const styles = StyleSheet.create({
  stack: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
