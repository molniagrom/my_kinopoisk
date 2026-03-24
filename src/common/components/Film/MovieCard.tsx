import { Link, useLocation } from 'react-router-dom';
import React from 'react';

import styles from './MovieCard.module.css';
import { moviePagePath } from '../../routing/paths.ts';
import FilmFavoriteButton from './FilmFavoriteButton.tsx';
import FilmRatingBadge from './FilmRatingBadge.tsx';

interface MovieCardProps {
  movieId: number;
  title: string;
  releaseDate?: string;
  voteAverage: number;
  posterPath: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movieId, title, releaseDate, voteAverage, posterPath }) => {
  const location = useLocation();
  const formattedDate = releaseDate
    ? new Date(releaseDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      })
    : '';

  return (
    <Link to={moviePagePath(movieId)} state={{ from: location }} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title} className={styles.poster} />
          <FilmFavoriteButton movieId={movieId} />
          <FilmRatingBadge voteAverage={voteAverage} />
        </div>

        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          {formattedDate ? <p className={styles.date}>{formattedDate}</p> : null}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
