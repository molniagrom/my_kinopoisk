import styles from './MovieCard.module.css';

type FilmRatingBadgeProps = {
  voteAverage: number;
};

export const FilmRatingBadge = ({ voteAverage }: FilmRatingBadgeProps) => {
  const percentage = Math.round(voteAverage * 10);

  return (
    <div className={styles.ratingBadge}>
      <div className={styles.percentage}>
        {percentage}
        <span className={styles.percentSymbol}>%</span>
      </div>
      <svg className={styles.svg}>
        <circle className={styles.circleBg} cx="19" cy="19" r="17" />
        <circle
          className={styles.circleProgress}
          cx="19"
          cy="19"
          r="17"
          style={{ strokeDashoffset: 106 - (106 * percentage) / 100 }}
        />
      </svg>
    </div>
  );
};

export default FilmRatingBadge;
