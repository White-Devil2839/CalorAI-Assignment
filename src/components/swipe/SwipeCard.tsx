import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import GlassCard from '../glass/GlassCard';
import FoodCardContent from './FoodCardContent';
import DirectionOverlay from './DirectionOverlay';
import { CARD_H, CARD_W } from '../../theme/layout';
import { radii } from '../../theme/tokens';
import type { Food, SwipeDirection } from '../../types';

export interface SwipeCardHandle {
  swipe: (dir: SwipeDirection) => void;
}

interface SwipeCardProps {
  food: Food;
  isTop: boolean;
  /** 0 = top, 1 = next, 2 = next2. */
  depth: number;
  onDecide: (dir: SwipeDirection, foodId: number) => void;
}

const SPRING = { damping: 18, stiffness: 180, mass: 0.6 };
const V_THRESH = 800;
const DURATION = 260;

const SwipeCard = forwardRef<SwipeCardHandle, SwipeCardProps>(function SwipeCard(
  { food, isTop, depth, onDecide },
  ref
) {
  const { width, height } = useWindowDimensions();
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);
  const d = useSharedValue(depth);

  // animate depth changes (a card rising as it becomes the top card)
  useEffect(() => {
    d.value = withTiming(depth, { duration: 220 });
  }, [depth, d]);

  const SWIPE_X = width * 0.28;
  const SWIPE_Y = height * 0.22;
  // half-diagonal so a rotated card still fully clears the corner
  const half = Math.hypot(CARD_W, CARD_H) / 2;
  const OFF_X = width / 2 + half;
  const OFF_Y = height / 2 + half;

  const finish = (dir: SwipeDirection) => onDecide(dir, food.id);

  const commit = (dir: SwipeDirection) => {
    'worklet';
    const cb = (finished?: boolean) => {
      'worklet';
      if (finished) runOnJS(finish)(dir);
    };
    if (dir === 'like') {
      tx.value = withTiming(OFF_X, { duration: DURATION }, cb);
      ty.value = withTiming(ty.value + 40, { duration: DURATION });
    } else if (dir === 'dislike') {
      tx.value = withTiming(-OFF_X, { duration: DURATION }, cb);
      ty.value = withTiming(ty.value + 40, { duration: DURATION });
    } else if (dir === 'superlike') {
      ty.value = withTiming(-OFF_Y, { duration: DURATION }, cb);
    } else {
      ty.value = withTiming(OFF_Y, { duration: DURATION }, cb);
    }
  };

  // Buttons reuse the EXACT same commit path as a manual fling.
  useImperativeHandle(ref, () => ({
    swipe: (dir: SwipeDirection) => {
      runOnUI(commit)(dir);
    },
  }));

  const pan = Gesture.Pan()
    .enabled(isTop)
    .activeOffsetX([-12, 12])
    .activeOffsetY([-12, 12])
    .onUpdate((e) => {
      tx.value = e.translationX;
      ty.value = e.translationY;
    })
    .onEnd((e) => {
      const absX = Math.abs(e.translationX);
      const absY = Math.abs(e.translationY);
      const horizontal = absX > absY;
      if (horizontal && (absX > SWIPE_X || Math.abs(e.velocityX) > V_THRESH)) {
        commit(e.translationX > 0 ? 'like' : 'dislike');
      } else if (!horizontal && (absY > SWIPE_Y || Math.abs(e.velocityY) > V_THRESH)) {
        commit(e.translationY < 0 ? 'superlike' : 'unsure');
      } else {
        tx.value = withSpring(0, SPRING);
        ty.value = withSpring(0, SPRING);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rot = interpolate(tx.value, [-width, 0, width], [-10, 0, 10], Extrapolation.CLAMP);
    const scale = interpolate(d.value, [0, 1, 2], [1, 0.94, 0.88], Extrapolation.CLAMP);
    const stackY = interpolate(d.value, [0, 1, 2], [0, 16, 30], Extrapolation.CLAMP);
    return {
      transform: [
        { translateX: tx.value },
        { translateY: ty.value + stackY },
        { rotateZ: `${rot}deg` },
        { scale },
      ],
      opacity: interpolate(d.value, [0, 1, 2, 3], [1, 1, 1, 0], Extrapolation.CLAMP),
    };
  });

  const card = (
    <Animated.View style={[styles.card, animatedStyle]}>
      <GlassCard radius={radii.card} style={styles.fill} contentStyle={styles.fill} intensity={22}>
        <FoodCardContent food={food} />
        {isTop && <DirectionOverlay tx={tx} ty={ty} />}
      </GlassCard>
    </Animated.View>
  );

  if (!isTop) return card;
  return <GestureDetector gesture={pan}>{card}</GestureDetector>;
});

export default SwipeCard;

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: CARD_W,
    height: CARD_H,
  },
  fill: { flex: 1 },
});
