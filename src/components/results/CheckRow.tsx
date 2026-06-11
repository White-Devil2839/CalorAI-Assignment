import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppText from '../common/AppText';
import Divider from '../common/Divider';
import { colors } from '../../theme/tokens';

export type RowBadge = 'check-green' | 'heart-blue' | 'check-blue';

const BADGES: Record<RowBadge, { color: string; icon: keyof typeof Ionicons.glyphMap }> = {
  'check-green': { color: colors.green, icon: 'checkmark' },
  'heart-blue': { color: colors.blue, icon: 'heart' },
  'check-blue': { color: colors.blue, icon: 'checkmark' },
};

export default function CheckRow({
  label,
  badge = 'check-blue',
  isLast,
}: {
  label: string;
  badge?: RowBadge;
  isLast?: boolean;
}) {
  const b = BADGES[badge];
  return (
    <View>
      <View style={styles.row}>
        <View style={[styles.badge, { backgroundColor: b.color }]}>
          <Ionicons name={b.icon} size={14} color={colors.white} />
        </View>
        <AppText variant="rowLabel" style={styles.label}>
          {label}
        </AppText>
      </View>
      {!isLast && <Divider />}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 13 },
  badge: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  label: { marginLeft: 14, flex: 1 },
});
