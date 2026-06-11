import { Platform } from 'react-native';

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

/**
 * The ONE switch that governs glass rendering.
 *
 * On Expo Go (Android) expo-blur defaults to a non-blurred semi-transparent view,
 * and the real `dimezisBlurView` is janky during react-native-screens transitions
 * and only blurs same-window content — so we deliberately render a tuned solid
 * frost on Android instead (same border/overlay/radius as iOS). See <Glass>.
 */
export const ENABLE_BLUR = IS_IOS;
