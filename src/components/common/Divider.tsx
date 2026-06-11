import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { colors } from '../../theme/tokens';

export default function Divider({
  vertical,
  style,
}: {
  vertical?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[vertical ? styles.v : styles.h, style]} />;
}

const styles = StyleSheet.create({
  h: { height: StyleSheet.hairlineWidth, backgroundColor: colors.glassBorder, alignSelf: 'stretch' },
  v: { width: StyleSheet.hairlineWidth, backgroundColor: colors.glassBorder, alignSelf: 'stretch' },
});
