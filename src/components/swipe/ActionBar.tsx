import { StyleSheet, View } from 'react-native';
import CircleActionButton from './CircleActionButton';
import type { SwipeDirection } from '../../types';

interface ActionBarProps {
  onAction: (dir: SwipeDirection) => void;
  disabled?: boolean;
}

/** The four circular buttons. Each routes through the SAME swipe(dir) path. */
export default function ActionBar({ onAction, disabled }: ActionBarProps) {
  return (
    <View style={styles.row}>
      <CircleActionButton variant="dislike" label="Swipe Left" onPress={() => onAction('dislike')} disabled={disabled} />
      <CircleActionButton variant="unsure" label="Not Sure" onPress={() => onAction('unsure')} disabled={disabled} />
      <CircleActionButton variant="superlike" label="Super Like" onPress={() => onAction('superlike')} disabled={disabled} />
      <CircleActionButton variant="like" label="Swipe Right" onPress={() => onAction('like')} disabled={disabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
});
