import { createNavigationContainerRef } from '@react-navigation/native';
import type { RootStackParamList } from './routes';

/** Lives in its own module so the app-level glass nav bar can drive navigation
 *  without importing App.tsx (avoids a circular dependency). */
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: keyof RootStackParamList) {
  if (navigationRef.isReady()) navigationRef.navigate(name as never);
}
