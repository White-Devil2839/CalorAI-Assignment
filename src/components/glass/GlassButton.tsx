import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Glass from './Glass';
import { shadow } from '../../theme/shadows';
import { colors } from '../../theme/tokens';

interface GlassButtonProps {
  size?: number;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  accessibilityLabel?: string;
}

/** Circular glass button (e.g. the back chevron, the search FAB). */
export default function GlassButton({
  size = 44,
  onPress,
  disabled,
  style,
  children,
  accessibilityLabel,
}: GlassButtonProps) {
  return (
    <View style={[{ borderRadius: size / 2, backgroundColor: colors.bgMid }, shadow(5, 0.3, 8), style]}>
      <Pressable
        onPress={onPress}
        disabled={disabled || !onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        style={({ pressed }) => [pressed && !disabled && { opacity: 0.7 }]}
      >
        <Glass radius={size / 2}>
          <View style={[styles.center, { width: size, height: size }]}>{children}</View>
        </Glass>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
});
