import { Dimensions } from 'react-native';

/**
 * Static layout constants. Used for carousel snap math and the swipe card box.
 * Gesture thresholds that must survive rotation use useWindowDimensions() at call
 * sites instead of these module-scope values.
 */
export const H_PADDING = 20;

const { width, height } = Dimensions.get('window');

export const SCREEN_W = width;
export const SCREEN_H = height;

/** Full-bleed content width inside the screen padding. */
export const CARD_W = width - H_PADDING * 2;

/** Swipe card height — tall, capped so it never overflows short devices. */
export const CARD_H = Math.min(Math.round(height * 0.56), Math.round(CARD_W * 1.34));

/** Bottom glass nav reserved space (so scroll content clears it). */
export const NAV_BAR_HEIGHT = 64;
