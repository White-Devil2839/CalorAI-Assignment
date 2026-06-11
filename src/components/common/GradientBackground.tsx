import { useEffect, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '../../theme/tokens';

/**
 * Dark vertical gradient + optional green bloom near the bottom edge.
 * When `animated`, the bloom slowly drifts/pulses (bonus: subtle background motion).
 * It's a single UI-thread Reanimated layer (opacity + transform) — no per-frame JS,
 * no blur — so it stays cheap even on the gesture-heavy Swipe screen.
 */
export default function GradientBackground({
  glow = true,
  animated = false,
  children,
}: {
  glow?: boolean;
  animated?: boolean;
  children?: ReactNode;
}) {
  const t = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      t.value = withRepeat(withTiming(1, { duration: 7000, easing: Easing.inOut(Easing.ease) }), -1, true);
    }
  }, [animated, t]);

  const bloomStyle = useAnimatedStyle(() => {
    if (!animated) return {};
    return {
      opacity: 0.55 + t.value * 0.45,
      transform: [
        { translateX: -12 + t.value * 24 },
        { translateY: -16 + t.value * 26 },
        { scale: 1 + t.value * 0.1 },
      ],
    };
  });

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[colors.bgTop, colors.bgMid, colors.bgBottom]}
        locations={[0, 0.55, 1]}
        style={StyleSheet.absoluteFill}
      />
      {glow && (
        <Animated.View style={[StyleSheet.absoluteFill, bloomStyle]} pointerEvents="none">
          <LinearGradient
            colors={['transparent', 'transparent', colors.greenGlow]}
            locations={[0, 0.65, 1]}
            start={{ x: 0.15, y: 0.2 }}
            end={{ x: 0.95, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgBottom },
});
