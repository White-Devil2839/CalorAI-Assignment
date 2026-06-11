import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import AppText from './AppText';
import { shadow } from '../../theme/shadows';
import { colors, radii } from '../../theme/tokens';

interface PillButtonProps {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

/** The bright-green CTA pill with a black label ("Start Swiping"). */
export default function PillButton({ label, onPress, style }: PillButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.btn,
        shadow(6, 0.45, 14),
        pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
        style,
      ]}
    >
      <AppText variant="ctaLabel" color={colors.onGreen}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.greenBright,
    borderRadius: radii.pill,
    paddingVertical: 16,
    paddingHorizontal: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
