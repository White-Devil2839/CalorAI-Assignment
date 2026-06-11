import { useCallback, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import RootNavigator from './src/navigation/RootNavigator';
import GlassTabBar from './src/components/nav/GlassTabBar';
import { navigationRef } from './src/navigation/navRef';
import { colors } from './src/theme/tokens';

const navTheme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: colors.bgBottom, card: colors.bgBottom },
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  const [routeName, setRouteName] = useState<string | undefined>(undefined);

  const syncRoute = useCallback(() => {
    setRouteName(navigationRef.getCurrentRoute()?.name);
  }, []);

  if (!fontsLoaded && !fontError) {
    // Native splash stays up until the first real render.
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.bgBottom }}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <NavigationContainer ref={navigationRef} theme={navTheme} onReady={syncRoute} onStateChange={syncRoute}>
          <RootNavigator />
        </NavigationContainer>
        <GlassTabBar routeName={routeName} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
