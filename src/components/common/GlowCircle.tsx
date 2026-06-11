import { StyleSheet, View } from 'react-native';

interface GlowCircleProps {
  size: number;
  color: string;
}

/**
 * Soft colored glow behind a circular button. Two stacked translucent rings —
 * NOT shadow/elevation (Android elevation can't be colored), so it looks
 * identical on both platforms. Render as the first child of a center-aligned box.
 */
export default function GlowCircle({ size, color }: GlowCircleProps) {
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.center]}>
      <View
        style={{
          position: 'absolute',
          width: size + 40,
          height: size + 40,
          borderRadius: (size + 40) / 2,
          backgroundColor: color,
          opacity: 0.16,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: size + 18,
          height: size + 18,
          borderRadius: (size + 18) / 2,
          backgroundColor: color,
          opacity: 0.38,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
});
