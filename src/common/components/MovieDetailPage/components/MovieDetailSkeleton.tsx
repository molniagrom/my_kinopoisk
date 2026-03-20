import Skeleton from '@mui/material/Skeleton';

import styles from '../MovieDetailPage.module.css';

export const MovieDetailSkeleton = () => {
  return (
    <div className={styles.page}>
      <Skeleton variant="rectangular" className={styles.backdrop} />
      <div className={styles.content}>
        <div className={styles.posterWrapper}>
          <Skeleton variant="rectangular" className={styles.poster} />
        </div>
        <div className={styles.details}>
          <Skeleton variant="text" width="60%" height={44} />
          <Skeleton variant="text" width="40%" />
          <div className={styles.metaRow}>
            <Skeleton variant="text" width={140} />
            <Skeleton variant="text" width={160} />
            <Skeleton variant="text" width={120} />
          </div>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </div>
      </div>
      <div className={styles.section}>
        <Skeleton variant="text" width="30%" height={32} />
        <div className={styles.castGrid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={`cast-skel-${index}`} variant="rectangular" className={styles.castPhoto} />
          ))}
        </div>
      </div>
      <div className={styles.section}>
        <Skeleton variant="text" width="30%" height={32} />
        <div className={styles.similarGrid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={`similar-skel-${index}`} variant="rectangular" className={styles.poster} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailSkeleton;
