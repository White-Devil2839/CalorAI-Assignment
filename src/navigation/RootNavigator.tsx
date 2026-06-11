import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroScreen from '../screens/IntroScreen';
import SwipeScreen from '../screens/SwipeScreen';
import ResultsScreen from '../screens/ResultsScreen';
import FaqScreen from '../screens/FaqScreen';
import SearchScreen from '../screens/SearchScreen';
import type { RootStackParamList } from './routes';
import { colors } from '../theme/tokens';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * A simple stack (Intro -> Swipe -> Results, plus FAQ + Search). The persistent
 * glass "tab bar" is rendered at the app level (see App.tsx), NOT as a navigator
 * tab bar — this sidesteps react-navigation's documented tab-bar show/hide glitch
 * and lets the bar fade out cleanly on the Swipe screen.
 */
export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Intro"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bgBottom },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Swipe" component={SwipeScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
      <Stack.Screen name="Faq" component={FaqScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}
