import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import AppText from './AppText';
import { shadow } from '../../theme/shadows';
import { colors } from '../../theme/tokens';

interface FoodThumbProps {
  uri: string;
  size?: number;
  /** Shown if the remote image fails (some provided URLs are duplicated/odd). */
  fallbackEmoji?: string;
  /** Subtle ring + shadow so a sharp thumb pops off a blurred backdrop. */
  ring?: boolean;
}

/** Circular food thumbnail with cached remote image + emoji fallback on error. */
export default function FoodThumb({ uri, size = 104, fallbackEmoji = '🍽️', ring = true }: FoodThumbProps) {
  const [failed, setFailed] = useState(false);

  return (
    <View style={[{ borderRadius: size / 2, backgroundColor: colors.bgMid }, ring && shadow(8, 0.5, 14)]}>
      <View
        style={[
          styles.wrap,
          { width: size, height: size, borderRadius: size / 2 },
          ring && styles.ring,
        ]}
      >
        {failed ? (
          <AppText style={{ fontSize: size * 0.5 }}>{fallbackEmoji}</AppText>
        ) : (
          <Image
            source={{ uri }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            transition={250}
            cachePolicy="memory-disk"
            onError={() => setFailed(true)}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grayCircle,
  },
  ring: {
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.55)',
  },
});
