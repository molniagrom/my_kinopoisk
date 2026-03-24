import React from 'react';

import styles from './MovieCard.module.css';
import { useFilmFavorite } from './hooks/useFilmFavorite.ts';
import FavoriteAuthDialog from './FavoriteAuthDialog.tsx';

type FilmFavoriteButtonProps = {
  movieId: number;
  className?: string;
};

export const FilmFavoriteButton = ({ movieId, className }: FilmFavoriteButtonProps) => {
  const { isFavorite, isAuthModalOpen, setIsAuthModalOpen, toggleFavorite } = useFilmFavorite({ movieId });

  const onFavoriteClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    await toggleFavorite();
  };

  return (
    <>
      <button
        type="button"
        className={`${styles.menuButton} ${isFavorite ? styles.menuButtonActive : ''} ${className ?? ''}`}
        onClick={onFavoriteClick}
        aria-label="Toggle favorite"
      >
        <svg className={styles.heartIcon} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21s-7.2-4.6-9.6-9C.9 8.4 2.5 5 5.8 4.3c1.9-.4 3.8.3 5 1.7 1.2-1.4 3.1-2.1 5-1.7C19.5 5 21.1 8.4 21.6 12c-2.4 4.4-9.6 9-9.6 9z" />
        </svg>
      </button>
      <FavoriteAuthDialog open={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default FilmFavoriteButton;
