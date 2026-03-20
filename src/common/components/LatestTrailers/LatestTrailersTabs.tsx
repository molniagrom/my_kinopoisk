import clsx from 'clsx';
import styles from './LatestTrailers.module.css';

type LatestTrailersTabsProps = {
  tabs: string[];
  activeTab: string;
  onSelect: (value: string) => void;
};

export const LatestTrailersTabs = ({ tabs, activeTab, onSelect }: LatestTrailersTabsProps) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onSelect(tab)}
            className={clsx(styles.tabButton, isActive ? styles.tabButtonActive : styles.tabButtonInactive)}
            style={{ fontFamily: "Geist Variable, 'Segoe UI', Tahoma, Verdana, sans-serif" }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default LatestTrailersTabs;
