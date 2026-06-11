import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GradientBackground from '../components/common/GradientBackground';
import GlassButton from '../components/glass/GlassButton';
import Glass from '../components/glass/Glass';
import AppText from '../components/common/AppText';
import FoodThumb from '../components/common/FoodThumb';
import Divider from '../components/common/Divider';
import { FOODS } from '../data/foods';
import { colors, radii } from '../theme/tokens';
import { H_PADDING, NAV_BAR_HEIGHT } from '../theme/layout';
import type { Food } from '../types';
import type { RootStackParamList } from '../navigation/routes';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Search'>;

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FOODS;
    return FOODS.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        f.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  const renderItem = ({ item }: { item: Food }) => (
    <View style={styles.row}>
      <FoodThumb uri={item.image} size={46} ring={false} fallbackEmoji="🍽️" />
      <View style={styles.rowText}>
        <AppText variant="rowLabel">{item.name}</AppText>
        <AppText variant="caption" color={colors.textMuted} style={styles.tags}>
          {item.category} · {item.tags.join(', ')}
        </AppText>
      </View>
    </View>
  );

  return (
    <GradientBackground animated>
      <View style={[styles.root, { paddingTop: insets.top + 10 }]}>
        <GlassButton
          size={40}
          onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Intro'))}
          accessibilityLabel="Back"
        >
          <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
        </GlassButton>

        <AppText variant="display" style={styles.title}>
          Search
        </AppText>

        <Glass radius={radii.pill} style={styles.searchBar}>
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search foods, tags, cuisines…"
            placeholderTextColor={colors.textFaint}
            style={styles.input}
            autoCorrect={false}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <Ionicons name="close-circle" size={18} color={colors.textMuted} onPress={() => setQuery('')} />
          )}
        </Glass>

        <FlatList
          data={results}
          keyExtractor={(f) => String(f.id)}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <Divider />}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + NAV_BAR_HEIGHT + 70, paddingTop: 6 }}
          ListEmptyComponent={
            <AppText variant="body" color={colors.textMuted} style={styles.empty}>
              No foods match “{query.trim()}”.
            </AppText>
          }
        />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: H_PADDING },
  title: { marginTop: 16, marginBottom: 14 },
  searchBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 10, marginBottom: 8 },
  input: { flex: 1, color: colors.textPrimary, fontSize: 16, padding: 0 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 14 },
  rowText: { flex: 1 },
  tags: { marginTop: 2 },
  empty: { textAlign: 'center', marginTop: 40 },
});
