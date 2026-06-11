import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { colors, radii } from '../../theme/tokens';

const MIN = 0.03; // never reads as empty

/** Reanimated green progress fill. `value` is 0..1. Animates on commit, not per frame. */
export default function ProgressBar({ value }: { value: number }) {
  const w = useSharedValue(Math.max(MIN, value));

  useEffect(() => {
    w.value = withTiming(Math.max(MIN, Math.min(1, value)), { duration: 280 });
  }, [value, w]);

  const fillStyle = useAnimatedStyle(() => ({ width: `${w.value * 100}%` }));

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.fill, fillStyle]}>
        <View style={styles.topEdge} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.progressTrack,
    overflow: 'hidden',
  },
  fill: { height: 8, borderRadius: radii.pill, backgroundColor: colors.green },
  topEdge: {
    position: 'absolute',
    top: 0,
    left: 4,
    right: 4,
    height: 1.5,
    borderRadius: 1,
    backgroundColor: colors.greenBright,
    opacity: 0.8,
  },
});
