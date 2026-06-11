import { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import GlassCard from '../glass/GlassCard';
import AppText from '../common/AppText';
import Divider from '../common/Divider';
import PagedCarousel from '../common/PagedCarousel';
import { CARD_W } from '../../theme/layout';
import { colors } from '../../theme/tokens';

export interface HighlightCol {
  emoji: string;
  label: string;
}

/** One bordered card whose inner 3-column content pages horizontally (Figma "Key Highlights"). */
export default function HighlightsCarousel({ pages }: { pages: HighlightCol[][] }) {
  return (
    <GlassCard style={styles.card} contentStyle={styles.content}>
      <PagedCarousel
        data={pages}
        pageWidth={CARD_W}
        renderPage={(cols) => (
          <View style={styles.row}>
            {cols.map((c, i) => (
              <Fragment key={`${c.label}-${i}`}>
                {i > 0 && <Divider vertical style={styles.vdiv} />}
                <View style={styles.col}>
                  <AppText style={styles.emoji}>{c.emoji}</AppText>
                  <AppText variant="label" color={colors.textPrimary} center style={styles.label}>
                    {c.label}
                  </AppText>
                </View>
              </Fragment>
            ))}
          </View>
        )}
      />
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: { marginTop: 12 },
  content: { paddingVertical: 22 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', paddingHorizontal: 10 },
  col: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  vdiv: { height: 46 },
  emoji: { fontSize: 30, lineHeight: 36 },
  label: { marginTop: 8, fontSize: 14, lineHeight: 18 },
});
