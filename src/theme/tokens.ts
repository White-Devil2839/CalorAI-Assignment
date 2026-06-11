import type { TextStyle } from 'react-native';

/**
 * Single source of truth for the visual language.
 * All hexes are INFERRED from the Figma (dark frosted aesthetic) and live here
 * so the whole app can be re-tuned in one place.
 */
export const colors = {
  // backgrounds (vertical gradient, slightly lighter at top, green bloom at bottom)
  bgTop: '#16181D',
  bgMid: '#0C0D11',
  bgBottom: '#0A0A0C',
  greenGlow: 'rgba(95,211,122,0.12)',

  // green accent
  green: '#5FD37A',
  greenBright: '#7CE08C',
  greenDeep: '#3FA85E',
  onGreen: '#06140A', // black-ish label on the green pill

  // superlike (blue -> purple)
  superA: '#5B8DEF',
  superB: '#9B6BF0',
  superGlow: '#7B7BEF',

  // danger
  red: '#FF4D4D',
  redDeep: '#D63A3A',
  redGlow: 'rgba(255,77,77,0.45)',
  greenGlowStrong: 'rgba(95,211,122,0.55)',

  // results rows
  blue: '#3B82F6',
  grayCircle: '#3A3D44',

  // glass
  glassFillIOS: 'rgba(255,255,255,0.08)',
  glassFillAndroid: 'rgba(22,24,28,0.72)',
  glassBorder: 'rgba(255,255,255,0.16)',
  glassHighlight: 'rgba(255,255,255,0.07)',

  // progress
  progressTrack: 'rgba(255,255,255,0.10)',

  // text
  textPrimary: '#FFFFFF',
  textMuted: '#9BA0A6',
  textFaint: 'rgba(155,160,166,0.75)',

  white: '#FFFFFF',
  black: '#000000',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
} as const;

export const radii = {
  card: 26,
  cardSm: 20,
  pill: 999,
  circle: 999,
  badge: 12,
  sm: 12,
} as const;

/** @expo-google-fonts/inter family names. */
export const fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extrabold: 'Inter_800ExtraBold',
} as const;

type TypeToken = Required<Pick<TextStyle, 'fontSize' | 'lineHeight' | 'fontFamily'>> &
  Pick<TextStyle, 'letterSpacing'>;

export const type = {
  display: { fontSize: 34, lineHeight: 40, fontFamily: fonts.extrabold, letterSpacing: 0.2 },
  title: { fontSize: 24, lineHeight: 30, fontFamily: fonts.bold },
  swipeText: { fontSize: 22, lineHeight: 28, fontFamily: fonts.bold },
  body: { fontSize: 16, lineHeight: 22, fontFamily: fonts.regular },
  ctaLabel: { fontSize: 17, lineHeight: 22, fontFamily: fonts.bold },
  rowLabel: { fontSize: 16, lineHeight: 20, fontFamily: fonts.medium },
  label: { fontSize: 13, lineHeight: 16, fontFamily: fonts.semibold },
  navLabel: { fontSize: 11, lineHeight: 13, fontFamily: fonts.semibold },
  caption: { fontSize: 13, lineHeight: 18, fontFamily: fonts.regular },
} satisfies Record<string, TypeToken>;
