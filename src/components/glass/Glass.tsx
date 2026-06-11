import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ENABLE_BLUR } from '../../theme/platform';
import { colors, radii } from '../../theme/tokens';

export interface GlassProps {
  radius?: number;
  intensity?: number;
  /** Override the base fill (e.g. for the nav pill). */
  fill?: string;
  bordered?: boolean;
  /** Subtle top-edge sheen. */
  highlight?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

/**
 * The single frosted-glass surface used everywhere (cards, nav, buttons, badges).
 *
 * iOS  → real expo-blur BlurView + translucent white overlay.
 * Android → tuned opaque-ish solid frost (no BlurView — see theme/platform.ts).
 *
 * The DECORATION (overlay, top sheen, hairline border, radius) is identical on
 * both platforms; only the base technique differs, so layout never shifts.
 */
export default function Glass({
  radius = radii.card,
  intensity = 25,
  fill,
  bordered = true,
  highlight = true,
  style,
  children,
}: GlassProps) {
  return (
    <View
      style={[
        {
          borderRadius: radius,
          overflow: 'hidden',
          borderWidth: bordered ? StyleSheet.hairlineWidth : 0,
          borderColor: colors.glassBorder,
        },
        style,
      ]}
    >
      {ENABLE_BLUR ? (
        <>
          <BlurView intensity={intensity} tint="dark" style={StyleSheet.absoluteFill} />
          <View
            style={[StyleSheet.absoluteFill, { backgroundColor: fill ?? colors.glassFillIOS }]}
            pointerEvents="none"
          />
        </>
      ) : (
        <View
          style={[StyleSheet.absoluteFill, { backgroundColor: fill ?? colors.glassFillAndroid }]}
          pointerEvents="none"
        />
      )}

      {highlight && (
        <LinearGradient
          colors={[colors.glassHighlight, 'transparent']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.6 }}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
      )}

      {children}
    </View>
  );
}
