import { Platform, type ViewStyle } from 'react-native';

/**
 * Cross-platform depth. iOS uses layered shadow props; Android uses elevation.
 * Apply to an OUTER wrapper view — shadows are clipped by `overflow:'hidden'`,
 * which the rounded glass surfaces need.
 */
export const shadow = (elevation = 8, opacity = 0.35, radius = 14): ViewStyle =>
  Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: Math.round(elevation / 2) },
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
    android: { elevation },
    default: {},
  }) as ViewStyle;

export const cardShadow = shadow(10, 0.4, 18);
export const navShadow = shadow(12, 0.3, 16);
