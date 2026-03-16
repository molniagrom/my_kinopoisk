import { Link, useLocation } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import styles from './film.module.css';
import { moviePagePath } from '../../routing/paths.ts';
import { useAppSelector } from '@/common/hooks/useAppHooks.ts';
import { selectAuthAccountId, selectAuthSessionId, selectIsAuthorized } from '@/features/selectors.ts';
import { useGetMovieAccountStatesQuery, useMarkFavoriteMutation } from '@/features/api/authApi.ts';
import React, { useState } from 'react';

interface MovieCardProps {
  movieId: number;
  title: string;
  releaseDate?: string;
  voteAverage: number;
  posterPath: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movieId, title, releaseDate, voteAverage, posterPath }) => {
  const location = useLocation();
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const sessionId = useAppSelector(selectAuthSessionId);
  const accountId = useAppSelector(selectAuthAccountId);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { data: accountStates } = useGetMovieAccountStatesQuery(
    {
      movieId,
      sessionId: sessionId ?? '',
    },
    {
      skip: !isAuthorized || !sessionId,
    }
  );
  const [markFavorite] = useMarkFavoriteMutation();
  const formattedDate = releaseDate
    ? new Date(releaseDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      })
    : '';

  const percentage = Math.round(voteAverage * 10);
  const isFavorite = isAuthorized && Boolean(accountStates?.favorite);

  const onFavoriteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isAuthorized) {
      setIsAuthModalOpen(true);
      return;
    }

    if (sessionId && accountId) {
      markFavorite({ accountId, sessionId, mediaId: movieId, favorite: !isFavorite });
    }
  };

  return (
    <>
      <Link to={moviePagePath(movieId)} state={{ from: location }} className={styles.cardLink}>
        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <img src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title} className={styles.poster} />
            <button
              type="button"
              className={`${styles.menuButton} ${isFavorite ? styles.menuButtonActive : ''}`}
              onClick={onFavoriteClick}
              aria-label="Toggle favorite"
            >
              <svg className={styles.heartIcon} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21s-7.2-4.6-9.6-9C.9 8.4 2.5 5 5.8 4.3c1.9-.4 3.8.3 5 1.7 1.2-1.4 3.1-2.1 5-1.7C19.5 5 21.1 8.4 21.6 12c-2.4 4.4-9.6 9-9.6 9z" />
              </svg>
            </button>
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
            {formattedDate ? <p className={styles.date}>{formattedDate}</p> : null}
          </div>
        </div>
      </Link>
      <Dialog open={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)}>
        <DialogTitle>Нужен аккаунт</DialogTitle>
        <DialogContent>Добавлять фильмы в избранное можно только после входа в аккаунт TMDB.</DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAuthModalOpen(false)} variant="contained">
            Понятно
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MovieCard;
