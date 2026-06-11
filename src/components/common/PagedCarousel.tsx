import { useState, type ReactNode } from 'react';
import {
  ScrollView,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import Pagination from './Pagination';
import { CARD_W } from '../../theme/layout';

interface PagedCarouselProps<T> {
  data: T[];
  renderPage: (item: T, i: number) => ReactNode;
  showDots?: boolean;
  /** Width of one page (defaults to the full content-card width). */
  pageWidth?: number;
  /** Horizontal padding inside the scroll content (for full-width-card carousels). */
  outerPadding?: number;
  onPage?: (i: number) => void;
}

/**
 * Horizontal one-page-at-a-time carousel with a synced dot indicator.
 * Snaps by `pageWidth` (not pagingEnabled) so it behaves identically on iOS and
 * Android regardless of the ScrollView's own measured width.
 */
export default function PagedCarousel<T>({
  data,
  renderPage,
  showDots = true,
  pageWidth = CARD_W,
  outerPadding = 0,
  onPage,
}: PagedCarouselProps<T>) {
  const [index, setIndex] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / pageWidth);
    if (i !== index && i >= 0 && i < data.length) {
      setIndex(i);
      onPage?.(i);
    }
  };

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={pageWidth}
        snapToAlignment="start"
        disableIntervalMomentum
        decelerationRate="fast"
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={outerPadding ? { paddingHorizontal: outerPadding } : undefined}
      >
        {data.map((item, i) => (
          <View key={i} style={{ width: pageWidth }}>
            {renderPage(item, i)}
          </View>
        ))}
      </ScrollView>
      {showDots && data.length > 1 && <Pagination count={data.length} index={index} />}
    </View>
  );
}
