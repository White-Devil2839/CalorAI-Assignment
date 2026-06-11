import type { ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import AppText from '../common/AppText';
import { colors } from '../../theme/tokens';

interface TabItemProps {
  renderIcon: (color: string, size: number) => ReactNode;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

export default function TabItem({ renderIcon, label, active, disabled, onPress }: TabItemProps) {
  const color = active ? colors.green : disabled ? colors.textFaint : colors.textMuted;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || !onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      style={({ pressed }) => [styles.item, pressed && !disabled && { opacity: 0.6 }]}
    >
      {renderIcon(color, 22)}
      <AppText variant="navLabel" color={color} style={styles.label}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14, paddingVertical: 4 },
  label: { marginTop: 3 },
});
