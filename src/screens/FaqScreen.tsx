import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GradientBackground from '../components/common/GradientBackground';
import GlassButton from '../components/glass/GlassButton';
import GlassCard from '../components/glass/GlassCard';
import AppText from '../components/common/AppText';
import { colors } from '../theme/tokens';
import { H_PADDING, NAV_BAR_HEIGHT } from '../theme/layout';
import type { RootStackParamList } from '../navigation/routes';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Faq'>;

const FAQS: { q: string; a: string }[] = [
  {
    q: 'How does the taste profile work?',
    a: 'Swipe right on foods you love and left on the ones you don’t. Your choices build a personalized profile we use to recommend meals you’ll actually enjoy.',
  },
  {
    q: 'What do the four buttons do?',
    a: 'Swipe left = dislike, right = like, up (★) = super-like, down (?) = not sure. You can drag the card in any direction or tap the matching button.',
  },
  {
    q: 'Can I undo a swipe?',
    a: 'Yes — tap the undo arrow at the top-right of the swipe screen to bring the last card back.',
  },
  {
    q: 'How is my profile generated?',
    a: 'It’s computed from your swipes: taste traits, lifestyle hints, favorite cuisines, and your loved / disliked / super-liked foods. Super-likes count double.',
  },
  {
    q: 'Is my data sent anywhere?',
    a: 'No. Everything runs on-device with no account, login, or backend.',
  },
];

export default function FaqScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();

  return (
    <GradientBackground animated>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 10,
          paddingHorizontal: H_PADDING,
          paddingBottom: insets.bottom + NAV_BAR_HEIGHT + 70,
        }}
      >
        <GlassButton
          size={40}
          onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Intro'))}
          accessibilityLabel="Back"
        >
          <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
        </GlassButton>

        <AppText variant="display" style={styles.title}>
          FAQ
        </AppText>
        <AppText variant="body" color={colors.textMuted} style={styles.subtitle}>
          Everything you need to know about building your taste profile.
        </AppText>

        {FAQS.map((item, i) => (
          <GlassCard key={i} style={styles.card} contentStyle={styles.cardContent}>
            <AppText variant="title" style={styles.q}>
              {item.q}
            </AppText>
            <AppText variant="body" color={colors.textMuted} style={styles.a}>
              {item.a}
            </AppText>
          </GlassCard>
        ))}
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  title: { marginTop: 16 },
  subtitle: { marginTop: 6 },
  card: { marginTop: 14 },
  cardContent: { paddingHorizontal: 20, paddingVertical: 18 },
  q: { fontSize: 17, lineHeight: 23 },
  a: { marginTop: 8 },
});
