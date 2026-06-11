import { StyleSheet, View } from 'react-native';
import { colors } from '../../theme/tokens';

export default function Pagination({ count, index }: { count: number; index: number }) {
  return (
    <View style={styles.row}>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={[styles.dot, i === index && styles.active]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignSelf: 'center', gap: 6, marginTop: 14 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.22)' },
  active: { backgroundColor: colors.white, opacity: 0.95 },
});
