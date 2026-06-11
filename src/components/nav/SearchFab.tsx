import { Ionicons } from '@expo/vector-icons';
import GlassButton from '../glass/GlassButton';
import { colors } from '../../theme/tokens';

/** Standalone glass circle with a search icon. */
export default function SearchFab({ onPress, active }: { onPress?: () => void; active?: boolean }) {
  return (
    <GlassButton size={52} onPress={onPress} accessibilityLabel="Search foods">
      <Ionicons name="search" size={20} color={active ? colors.green : colors.textPrimary} />
    </GlassButton>
  );
}
