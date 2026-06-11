import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import AppText from '../common/AppText';
import { colors, fonts, radii } from '../../theme/tokens';

interface Props {
  tx: SharedValue<number>;
  ty: SharedValue<number>;
}

/**
 * The four drag badges (Yes / No / Superlike / Unsure). Opacity is derived from
 * tx/ty so each fades in toward its edge; dominance weighting keeps only the
 * dominant-axis badge visible on diagonal drags.
 */
export default function DirectionOverlay({ tx, ty }: Props) {
  const yes = useAnimatedStyle(() => {
    const horiz = interpolate(Math.abs(tx.value) - Math.abs(ty.value), [0, 30], [0, 1], Extrapolation.CLAMP);
    const mag = interpolate(tx.value, [20, 110], [0, 1], Extrapolation.CLAMP);
    return { opacity: mag * horiz };
  });
  const no = useAnimatedStyle(() => {
    const horiz = interpolate(Math.abs(tx.value) - Math.abs(ty.value), [0, 30], [0, 1], Extrapolation.CLAMP);
    const mag = interpolate(tx.value, [-110, -20], [1, 0], Extrapolation.CLAMP);
    return { opacity: mag * horiz };
  });
  const superlike = useAnimatedStyle(() => {
    const vert = interpolate(Math.abs(ty.value) - Math.abs(tx.value), [0, 30], [0, 1], Extrapolation.CLAMP);
    const mag = interpolate(ty.value, [-110, -20], [1, 0], Extrapolation.CLAMP);
    return { opacity: mag * vert };
  });
  const unsure = useAnimatedStyle(() => {
    const vert = interpolate(Math.abs(ty.value) - Math.abs(tx.value), [0, 30], [0, 1], Extrapolation.CLAMP);
    const mag = interpolate(ty.value, [20, 110], [0, 1], Extrapolation.CLAMP);
    return { opacity: mag * vert };
  });

  return (
    <>
      <Animated.View style={[styles.badge, styles.yes, yes]}>
        <AppText style={styles.badgeText} color={colors.black}>
          Yes
        </AppText>
      </Animated.View>

      <Animated.View style={[styles.badge, styles.no, no]}>
        <AppText style={styles.badgeText} color={colors.white}>
          No
        </AppText>
      </Animated.View>

      <Animated.View style={[styles.pillWrap, styles.top, superlike]}>
        <LinearGradient
          colors={[colors.superA, colors.superB]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.pill}
        >
          <AppText style={styles.pillText} color={colors.black}>
            Superlike 🌟
          </AppText>
        </LinearGradient>
      </Animated.View>

      <Animated.View style={[styles.pillWrap, styles.bottom, unsure]}>
        <Animated.View style={[styles.pill, styles.unsurePill]}>
          <AppText style={styles.pillText} color={colors.black}>
            Unsure
          </AppText>
        </Animated.View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: radii.badge + 6,
  },
  badgeText: { fontFamily: fonts.extrabold, fontSize: 26, lineHeight: 30 },
  yes: { top: 26, right: 24, backgroundColor: colors.green, transform: [{ rotate: '12deg' }] },
  no: { top: 26, left: 24, backgroundColor: colors.red, transform: [{ rotate: '-12deg' }] },

  pillWrap: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
  top: { top: 24 },
  bottom: { bottom: 28 },
  pill: { paddingHorizontal: 22, paddingVertical: 10, borderRadius: radii.pill },
  unsurePill: { backgroundColor: '#E4E4E7' },
  pillText: { fontFamily: fonts.bold, fontSize: 18, lineHeight: 22 },
});
