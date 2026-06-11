import { View } from 'react-native';
import PagedCarousel from '../common/PagedCarousel';
import SectionCard from './SectionCard';
import CheckRow, { type RowBadge } from './CheckRow';
import AppText from '../common/AppText';
import { CARD_W, H_PADDING } from '../../theme/layout';
import { colors } from '../../theme/tokens';

export interface FoodPrefPage {
  title: string;
  subtitle: string;
  items: string[];
  badge: RowBadge;
  emptyText: string;
}

/** Full-card horizontal carousel: Foods You Love / Hate / Cuisines / Super-Liked. */
export default function FoodPrefCarousel({ pages }: { pages: FoodPrefPage[] }) {
  return (
    <PagedCarousel
      data={pages}
      pageWidth={CARD_W}
      outerPadding={H_PADDING}
      renderPage={(page) => (
        <SectionCard title={page.title} subtitle={page.subtitle} style={{ marginTop: 16 }}>
          {page.items.length === 0 ? (
            <View style={{ paddingVertical: 16 }}>
              <AppText variant="caption" color={colors.textMuted}>
                {page.emptyText}
              </AppText>
            </View>
          ) : (
            page.items.map((label, i) => (
              <CheckRow
                key={`${label}-${i}`}
                label={label}
                badge={page.badge}
                isLast={i === page.items.length - 1}
              />
            ))
          )}
        </SectionCard>
      )}
    />
  );
}
