import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import Glass, { type GlassProps } from './Glass';
import { cardShadow } from '../../theme/shadows';
import { colors, radii } from '../../theme/tokens';

interface GlassCardProps extends Omit<GlassProps, 'style'> {
  /** Outer wrapper style (margins, flex, sizing). */
  style?: StyleProp<ViewStyle>;
  /** Inner content padding / layout. */
  contentStyle?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

/**
 * Glass surface + depth. The shadow lives on an OUTER opaque wrapper because
 * `overflow:'hidden'` on the Glass clips shadows. Android elevation needs a
 * solid background + matching radius on that wrapper to cast correctly.
 */
export default function GlassCard({
  radius = radii.card,
  style,
  contentStyle,
  children,
  ...glass
}: GlassCardProps) {
  return (
    <View style={[{ borderRadius: radius, backgroundColor: colors.bgMid }, cardShadow, style]}>
      <Glass radius={radius} style={contentStyle} {...glass}>
        {children}
      </Glass>
    </View>
  );
}
