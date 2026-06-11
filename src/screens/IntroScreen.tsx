import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GradientBackground from '../components/common/GradientBackground';
import GlassButton from '../components/glass/GlassButton';
import GlassCard from '../components/glass/GlassCard';
import AppText from '../components/common/AppText';
import PillButton from '../components/common/PillButton';
import { useSwipeStore } from '../state/swipeStore';
import { colors } from '../theme/tokens';
import { H_PADDING, NAV_BAR_HEIGHT } from '../theme/layout';
import type { RootStackParamList } from '../navigation/routes';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Intro'>;

export default function IntroScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const reset = useSwipeStore((s) => s.reset);

  const start = () => {
    reset();
    navigation.navigate('Swipe');
  };

  return (
    <GradientBackground animated>
      <View style={[styles.root, { paddingTop: insets.top + 12 }]}>
        <GlassButton
          size={44}
          onPress={() => (navigation.canGoBack() ? navigation.goBack() : undefined)}
          accessibilityLabel="Back"
        >
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </GlassButton>

        <AppText variant="display" style={styles.title}>
          Design Your{'\n'}Food Plan
        </AppText>

        <Animated.View
          entering={FadeInDown.duration(500).springify().damping(18)}
          style={[styles.cardSlot, { marginBottom: insets.bottom + NAV_BAR_HEIGHT + 40 }]}
        >
          <GlassCard style={styles.card} contentStyle={styles.cardContent}>
            <AppText center style={styles.emoji}>
              😋
            </AppText>
            <AppText variant="title" center style={styles.heading}>
              Build Your Taste Profile
            </AppText>
            <AppText variant="body" center color={colors.textMuted} style={styles.line}>
              Swipe right on foods you love, left on foods you don't.
            </AppText>
            <AppText variant="body" center color={colors.textMuted} style={styles.subline}>
              This helps us recommend meals you'll love eating.
            </AppText>
            <PillButton label="Start Swiping" onPress={start} style={styles.cta} />
            <AppText variant="caption" center color={colors.textMuted} style={styles.takes}>
              Takes about 2 minutes.
            </AppText>
          </GlassCard>
        </Animated.View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: H_PADDING },
  title: { marginTop: 20 },
  cardSlot: { flex: 1, marginTop: 26 },
  card: { flex: 1 },
  cardContent: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 26 },
  emoji: { fontSize: 60, lineHeight: 70 },
  heading: { marginTop: 18 },
  line: { marginTop: 18 },
  subline: { marginTop: 18 },
  cta: { marginTop: 30 },
  takes: { marginTop: 16 },
});
