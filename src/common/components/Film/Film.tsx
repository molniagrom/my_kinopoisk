import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './film.module.css';
import { moviePagePath } from '../../routing/paths.ts';

interface MovieCardProps {
  movieId: number;
  title: string;
  releaseDate: string;
  voteAverage: number;
  posterPath: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movieId, title, releaseDate, voteAverage, posterPath }) => {
  const location = useLocation();
  const formattedDate = new Date(releaseDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  const percentage = Math.round(voteAverage * 10);

  return (
    <Link to={moviePagePath(movieId)} state={{ from: location }} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title} className={styles.poster} />
          <button className={styles.menuButton}>❤</button>
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
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.date}>{formattedDate}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
