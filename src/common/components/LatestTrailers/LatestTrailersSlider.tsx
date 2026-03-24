import SliderShell from '../SliderShell/SliderShell.tsx';
import TrailerCard from './TrailerCard.tsx';
import { trailersPageSize } from './constants.ts';
import styles from './LatestTrailers.module.css';
import type { LatestTrailerItem } from './types.ts';

type LatestTrailersSliderProps = {
  items: LatestTrailerItem[];
  isLoading: boolean;
  badgeLabel?: string;
  formatMeta: (publishedAt?: string) => string;
};

export const LatestTrailersSlider = ({ items, isLoading, badgeLabel, formatMeta }: LatestTrailersSliderProps) => {
  return (
    <SliderShell
      wrapperClassName={styles.sliderWrap}
      viewportClassName={styles.slider}
      navButtonClassName={styles.scrollButton}
      prevButtonClassName={styles.scrollButtonLeft}
      nextButtonClassName={styles.scrollButtonRight}
      scrollOffset={520}
    >
      {isLoading ? <div className={styles.stateCard}>Loading trailers...</div> : null}
      {!isLoading && items.length === 0 ? <div className={styles.stateCard}>No trailers found.</div> : null}
      {items.slice(0, trailersPageSize).map((item) => (
        <TrailerCard key={`${item.mediaType}-${item.id}`} item={item} badgeLabel={badgeLabel} formatMeta={formatMeta} />
      ))}
    </SliderShell>
  );
};

export default LatestTrailersSlider;
