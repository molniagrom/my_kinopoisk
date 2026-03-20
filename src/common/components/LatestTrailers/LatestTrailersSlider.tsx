import clsx from 'clsx';
import type { RefObject } from 'react';
import TrailerCard from './TrailerCard.tsx';
import { trailersPageSize } from './constants.ts';
import styles from './LatestTrailers.module.css';
import type { LatestTrailerItem } from './types.ts';

type LatestTrailersSliderProps = {
  items: LatestTrailerItem[];
  isLoading: boolean;
  badgeLabel?: string;
  onScroll: (direction: 'left' | 'right') => void;
  listRef: RefObject<HTMLDivElement>;
  formatMeta: (publishedAt?: string) => string;
};

export const LatestTrailersSlider = ({
  items,
  isLoading,
  badgeLabel,
  onScroll,
  listRef,
  formatMeta,
}: LatestTrailersSliderProps) => {
  return (
    <div className={styles.sliderWrap}>
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => onScroll('left')}
        className={clsx(styles.scrollButton, styles.scrollButtonLeft)}
      >
        {'<'}
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => onScroll('right')}
        className={clsx(styles.scrollButton, styles.scrollButtonRight)}
      >
        {'>'}
      </button>

      <div ref={listRef} className={styles.slider}>
        {isLoading ? <div className={styles.stateCard}>Loading trailers...</div> : null}
        {!isLoading && items.length === 0 ? <div className={styles.stateCard}>No trailers found.</div> : null}
        {items.slice(0, trailersPageSize).map((item) => (
          <TrailerCard key={`${item.mediaType}-${item.id}`} item={item} badgeLabel={badgeLabel} formatMeta={formatMeta} />
        ))}
      </div>
    </div>
  );
};

export default LatestTrailersSlider;
