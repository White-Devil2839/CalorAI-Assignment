import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GradientBackground from '../components/common/GradientBackground';
import ProgressBar from '../components/common/ProgressBar';
import GlassButton from '../components/glass/GlassButton';
import CardStack, { type CardStackHandle } from '../components/swipe/CardStack';
import ActionBar from '../components/swipe/ActionBar';
import { useSwipeDeck } from '../hooks/useSwipeDeck';
import { colors } from '../theme/tokens';
import { H_PADDING } from '../theme/layout';
import type { RootStackParamList } from '../navigation/routes';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Swipe'>;

export default function SwipeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const { progress, isDone, undo, canUndo } = useSwipeDeck();
  const stackRef = useRef<CardStackHandle>(null);

  // When the deck is exhausted, replace (so back doesn't re-enter an empty deck).
  useEffect(() => {
    if (isDone) {
      const t = setTimeout(() => navigation.replace('Results'), 220);
      return () => clearTimeout(t);
    }
  }, [isDone, navigation]);

  return (
    <GradientBackground animated>
      <View style={[styles.root, { paddingTop: insets.top + 10 }]}>
        <View style={styles.header}>
          <View style={styles.progressWrap}>
            <ProgressBar value={progress} />
          </View>
          {canUndo && (
            <GlassButton size={36} onPress={undo} accessibilityLabel="Undo last swipe">
              <Ionicons name="arrow-undo" size={16} color={colors.textPrimary} />
            </GlassButton>
          )}
        </View>

        <CardStack ref={stackRef} />

        <View style={[styles.actions, { paddingBottom: insets.bottom + 16 }]}>
          <ActionBar onAction={(dir) => stackRef.current?.swipe(dir)} disabled={isDone} />
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: H_PADDING },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, height: 40 },
  progressWrap: { flex: 1 },
  actions: { paddingTop: 12 },
});
