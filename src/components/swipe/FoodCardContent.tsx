import { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import AppText from '../common/AppText';
import FoodThumb from '../common/FoodThumb';
import { swipePhrase } from '../../lib/strings';
import { colors } from '../../theme/tokens';
import type { Food } from '../../types';

export default function FoodCardContent({ food }: { food: Food }) {
  const [bgFailed, setBgFailed] = useState(false);

  return (
    <View style={styles.wrap}>
      {/* Blurred full-bleed backdrop of the same (cached) photo — fills the card
          so the large dark area reads intentional. blurRadius keeps it cross-platform
          (no BlurView), and a dim gradient preserves text contrast. */}
      {!bgFailed && (
        <Image
          source={{ uri: food.image }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          blurRadius={Platform.OS === 'ios' ? 30 : 18}
          cachePolicy="memory-disk"
          transition={250}
          onError={() => setBgFailed(true)}
        />
      )}
      <LinearGradient
        colors={['rgba(10,10,12,0.55)', 'rgba(10,10,12,0.72)', 'rgba(10,10,12,0.90)']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      {/* subtle green-tinted glow so it ties into the theme */}
      <LinearGradient
        colors={['transparent', colors.greenGlow]}
        start={{ x: 0.5, y: 0.4 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      <View style={styles.content}>
        <FoodThumb uri={food.image} size={116} fallbackEmoji="🍽️" />
        <AppText variant="swipeText" center style={styles.text}>
          {swipePhrase(food)}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28 },
  text: { marginTop: 30 },
});
