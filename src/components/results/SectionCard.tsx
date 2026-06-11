import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import GlassCard from '../glass/GlassCard';
import AppText from '../common/AppText';
import Divider from '../common/Divider';
import { colors } from '../../theme/tokens';

interface SectionCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/** A titled glass card (emoji+title header, optional subtitle, divider, body). */
export default function SectionCard({ title, subtitle, children, style }: SectionCardProps) {
  return (
    <GlassCard style={style} contentStyle={styles.content}>
      <AppText variant="title" style={styles.title}>
        {title}
      </AppText>
      {subtitle ? (
        <AppText variant="caption" color={colors.textMuted} style={styles.subtitle}>
          {subtitle}
        </AppText>
      ) : null}
      <Divider style={styles.divider} />
      <View>{children}</View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingVertical: 18 },
  title: { fontSize: 18, lineHeight: 24 },
  subtitle: { marginTop: 2 },
  divider: { marginTop: 12, marginBottom: 2 },
});
