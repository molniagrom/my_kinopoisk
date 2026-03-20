import { useRef, useState } from 'react';
import { latestTrailersTabs } from './constants.ts';
import { buildTrailerMeta } from './utils.ts';
import { useLatestTrailersData } from './hooks/useLatestTrailersData.ts';
import styles from './LatestTrailers.module.css';
import LatestTrailersSlider from './LatestTrailersSlider.tsx';
import LatestTrailersTabs from './LatestTrailersTabs.tsx';

export const LatestTrailers = () => {
  const [activeTab, setActiveTab] = useState(latestTrailersTabs[0]);
  const listRef = useRef<HTMLDivElement | null>(null);

  const { items, isLoading } = useLatestTrailersData(activeTab);
  const badgeLabel = activeTab === 'Popular' ? undefined : activeTab;

  const handleScroll = (direction: 'left' | 'right') => {
    if (!listRef.current) return;
    const offset = direction === 'left' ? -520 : 520;
    listRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2
          className={styles.title}
          style={{ fontFamily: "Geist Variable, 'Segoe UI', Tahoma, Verdana, sans-serif" }}
        >
          Latest Trailers
        </h2>

        <LatestTrailersTabs tabs={latestTrailersTabs} activeTab={activeTab} onSelect={setActiveTab} />

        <LatestTrailersSlider
          items={items}
          isLoading={isLoading}
          badgeLabel={badgeLabel}
          onScroll={handleScroll}
          listRef={listRef}
          formatMeta={buildTrailerMeta}
        />

      </div>
    </section>
  );
};

export default LatestTrailers;
