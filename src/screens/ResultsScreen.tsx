import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GradientBackground from '../components/common/GradientBackground';
import GlassButton from '../components/glass/GlassButton';
import AppText from '../components/common/AppText';
import HighlightsCarousel, { type HighlightCol } from '../components/results/HighlightsCarousel';
import LifestyleCard from '../components/results/LifestyleCard';
import FoodPrefCarousel, { type FoodPrefPage } from '../components/results/FoodPrefCarousel';
import { useSwipeStore } from '../state/swipeStore';
import { generateProfile } from '../lib/profile';
import { colors } from '../theme/tokens';
import { H_PADDING, NAV_BAR_HEIGHT } from '../theme/layout';
import type { RootStackParamList } from '../navigation/routes';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Results'>;

export default function ResultsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const decisions = useSwipeStore((s) => s.decisions);

  const profile = useMemo(() => generateProfile(decisions), [decisions]);

  const highlightPages: HighlightCol[][] = useMemo(() => {
    const traits = profile.highlights.slice(0, 3);
    const cuisineCols = profile.cuisines.slice(0, 3).map((c) => ({ emoji: c.emoji, label: `${c.name} Food` }));
    const pages: HighlightCol[][] = [traits];
    if (cuisineCols.length) pages.push(cuisineCols);
    return pages;
  }, [profile]);

  const foodPages: FoodPrefPage[] = useMemo(
    () => [
      {
        title: '❤️ Foods You Love',
        subtitle: "We'll Recommend These",
        items: profile.lovedFoods.map((f) => f.name),
        badge: 'heart-blue',
        emptyText: 'Swipe right on foods to fill this in.',
      },
      {
        title: '🚫 Foods You Hate',
        subtitle: 'These will never be on the menu',
        items: profile.hatedFoods.map((f) => f.name),
        badge: 'check-blue',
        emptyText: 'Swipe left on foods to fill this in.',
      },
      {
        title: '🍽️ Your Favorite Cuisines',
        subtitle: 'Flavors you love, all in one place',
        items: profile.cuisines.map((c) => c.name),
        badge: 'check-blue',
        emptyText: 'Like more foods to discover cuisines.',
      },
      {
        title: '🌟 Foods You Super-Liked',
        subtitle: 'Your absolute favorites',
        items: profile.superLovedFoods.map((f) => f.name),
        badge: 'heart-blue',
        emptyText: 'Super-like foods while swiping to fill this in.',
      },
    ],
    [profile]
  );

  return (
    <GradientBackground glow={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 10,
          paddingBottom: insets.bottom + NAV_BAR_HEIGHT + 70,
        }}
      >
        <View style={styles.headerPad}>
          <GlassButton
            size={40}
            onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Intro'))}
            accessibilityLabel="Back"
          >
            <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
          </GlassButton>

          <AppText variant="display" style={styles.title}>
            Your Taste Profile
          </AppText>
          <AppText variant="body" color={colors.textMuted} style={styles.subtitle}>
            Tailored to your unique needs. We'll use this for recommendations and meals plans
          </AppText>
          <AppText variant="label" color={colors.textMuted} style={styles.kicker}>
            Key Highlights:
          </AppText>
        </View>

        <View style={styles.pad}>
          <HighlightsCarousel pages={highlightPages} />
        </View>

        <View style={styles.pad}>
          <LifestyleCard items={profile.lifestyle} />
        </View>

        <FoodPrefCarousel pages={foodPages} />
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  headerPad: { paddingHorizontal: H_PADDING },
  pad: { paddingHorizontal: H_PADDING },
  title: { marginTop: 16 },
  subtitle: { marginTop: 6 },
  kicker: { marginTop: 22, marginBottom: 2 },
});
