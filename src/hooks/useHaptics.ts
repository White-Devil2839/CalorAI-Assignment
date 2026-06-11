import { useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import type { SwipeDirection } from '../types';

/** Thin wrapper over expo-haptics. No-ops silently on unsupported devices/sims. */
export function useHaptics() {
  const impact = useCallback((dir: SwipeDirection) => {
    switch (dir) {
      case 'superlike':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
        break;
      case 'like':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
        break;
      case 'dislike':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
        break;
      default:
        Haptics.selectionAsync().catch(() => {});
    }
  }, []);

  const tick = useCallback(() => {
    Haptics.selectionAsync().catch(() => {});
  }, []);

  return { impact, tick };
}
