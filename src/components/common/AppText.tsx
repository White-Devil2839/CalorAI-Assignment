import { Text, type StyleProp, type TextProps, type TextStyle } from 'react-native';
import { colors, type as typeTokens } from '../../theme/tokens';

type Variant = keyof typeof typeTokens;

interface AppTextProps extends TextProps {
  variant?: Variant;
  color?: string;
  center?: boolean;
  style?: StyleProp<TextStyle>;
}

/** Caps font scaling on big headings so large-font Android never clips lineHeights. */
const MAX_SCALE: Partial<Record<Variant, number>> = {
  display: 1.15,
  title: 1.15,
  swipeText: 1.15,
};

export default function AppText({
  variant = 'body',
  color = colors.textPrimary,
  center,
  style,
  ...rest
}: AppTextProps) {
  return (
    <Text
      maxFontSizeMultiplier={MAX_SCALE[variant] ?? 1.3}
      style={[
        typeTokens[variant],
        { color, includeFontPadding: false } as TextStyle,
        center && { textAlign: 'center' },
        style,
      ]}
      {...rest}
    />
  );
}
