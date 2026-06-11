import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Glass from '../glass/Glass';
import TabItem from './TabItem';
import SearchFab from './SearchFab';
import { navigate } from '../../navigation/navRef';
import { ROUTES } from '../../navigation/routes';
import { colors, radii } from '../../theme/tokens';
import { navShadow } from '../../theme/shadows';

/** Routes where the bar is hidden (the Swipe screen uses action buttons instead). */
const HIDDEN = new Set<string>([ROUTES.Swipe]);

/**
 * App-level, always-mounted glass nav bar. It animates its OWN opacity/translateY
 * based on the active route (passed from App.tsx) and navigates via navigationRef
 * — so no navigator ever mounts/unmounts it.
 */
export default function GlassTabBar({ routeName }: { routeName?: string }) {
  const insets = useSafeAreaInsets();
  const visible = routeName ? !HIDDEN.has(routeName) : true;

  const v = useSharedValue(visible ? 1 : 0);
  useEffect(() => {
    v.value = withTiming(visible ? 1 : 0, { duration: 220 });
  }, [visible, v]);

  const style = useAnimatedStyle(() => ({
    opacity: v.value,
    transform: [{ translateY: (1 - v.value) * 36 }],
  }));

  const startActive = routeName === ROUTES.Intro;
  const faqActive = routeName === ROUTES.Faq;
  const profileActive = routeName === ROUTES.Results;
  const searchActive = routeName === ROUTES.Search;

  return (
    <Animated.View
      pointerEvents={visible ? 'box-none' : 'none'}
      style={[styles.container, { bottom: insets.bottom + 12 }, style]}
    >
      <View style={[styles.pillWrap, navShadow]}>
        <Glass radius={radii.pill} style={styles.pill}>
          <TabItem
            renderIcon={(c, s) => <Ionicons name="home" size={s} color={c} />}
            label="Start"
            active={startActive}
            onPress={() => navigate(ROUTES.Intro)}
          />
          <TabItem
            renderIcon={(c, s) => <Ionicons name="help" size={s} color={c} />}
            label="FAQ"
            active={faqActive}
            onPress={() => navigate(ROUTES.Faq)}
          />
          <TabItem
            renderIcon={(c, s) => <MaterialCommunityIcons name="carrot" size={s} color={c} />}
            label="Taste Profile"
            active={profileActive}
            onPress={() => navigate(ROUTES.Results)}
          />
        </Glass>
      </View>
      <SearchFab onPress={() => navigate(ROUTES.Search)} active={searchActive} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  pillWrap: { borderRadius: radii.pill, backgroundColor: colors.bgMid },
  pill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 8 },
});
