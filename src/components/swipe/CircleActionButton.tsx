import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AppText from '../common/AppText';
import GlowCircle from '../common/GlowCircle';
import { shadow } from '../../theme/shadows';
import { colors } from '../../theme/tokens';

export type ActionVariant = 'dislike' | 'unsure' | 'superlike' | 'like';

interface CircleActionButtonProps {
  variant: ActionVariant;
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

type Conf = {
  size: number;
  icon: keyof typeof Ionicons.glyphMap;
  iconSize: number;
  bg?: string;
  gradient?: [string, string];
  glow: string;
};

const CONFIG: Record<ActionVariant, Conf> = {
  dislike: { size: 64, icon: 'close', iconSize: 30, bg: colors.red, glow: colors.redGlow },
  unsure: { size: 56, icon: 'help', iconSize: 24, bg: colors.grayCircle, glow: 'rgba(255,255,255,0.45)' },
  superlike: { size: 56, icon: 'star', iconSize: 24, gradient: [colors.superA, colors.superB], glow: colors.superGlow },
  like: { size: 64, icon: 'heart', iconSize: 30, bg: colors.green, glow: colors.greenGlowStrong },
};

export default function CircleActionButton({ variant, label, onPress, disabled }: CircleActionButtonProps) {
  const c = CONFIG[variant];

  // Glow blooms only while pressed (clean at rest), giving tactile feedback.
  const active = useSharedValue(0);
  const glowStyle = useAnimatedStyle(() => ({ opacity: active.value }));

  return (
    <View style={styles.item}>
      <View style={[styles.circleWrap, { width: c.size, height: c.size }]}>
        <Animated.View style={[StyleSheet.absoluteFill, styles.circleWrap, glowStyle]} pointerEvents="none">
          <GlowCircle size={c.size} color={c.glow} />
        </Animated.View>
        <Pressable
          onPress={onPress}
          disabled={disabled}
          onPressIn={() => {
            active.value = withTiming(1, { duration: 110 });
          }}
          onPressOut={() => {
            active.value = withTiming(0, { duration: 220 });
          }}
          accessibilityRole="button"
          accessibilityLabel={label}
          style={({ pressed }) => [
            styles.circle,
            { width: c.size, height: c.size, borderRadius: c.size / 2, backgroundColor: c.bg ?? 'transparent' },
            shadow(6, 0.35, 10),
            pressed && { transform: [{ scale: 0.92 }] },
            disabled && { opacity: 0.4 },
          ]}
        >
          {c.gradient && (
            <LinearGradient
              colors={c.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[StyleSheet.absoluteFill, { borderRadius: c.size / 2 }]}
            />
          )}
          <Ionicons name={c.icon} size={c.iconSize} color={colors.white} />
        </Pressable>
      </View>
      <AppText variant="navLabel" color={colors.textMuted} style={styles.label}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  item: { alignItems: 'center' },
  circleWrap: { alignItems: 'center', justifyContent: 'center' },
  circle: { alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  label: { marginTop: 10 },
});
