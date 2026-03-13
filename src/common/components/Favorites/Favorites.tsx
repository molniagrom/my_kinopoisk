
import s from './Favorites.module.css';
import Film from '../Film/Film.tsx';
import { getFavorites } from '@/common/utils/favoritesStorage.ts';
import {useEffect, useState} from "react";

export const Favorites = () => {
  const [favorites, setFavorites] = useState(getFavorites());

  useEffect(() => {
    const handleFavoritesChange = () => {
      setFavorites(getFavorites());
    };

    window.addEventListener('favorites:changed', handleFavoritesChange);
    window.addEventListener('storage', handleFavoritesChange);

    return () => {
      window.removeEventListener('favorites:changed', handleFavoritesChange);
      window.removeEventListener('storage', handleFavoritesChange);
    };
  }, []);

  return (
    <section className={s.page}>
      <header className={s.header}>
        <h1>Любимые фильмы</h1>
        <p className={s.subtitle}>Фильмы, которые вы отметили как избранные.</p>
      </header>

      {favorites.length === 0 ? (
        <div className={s.emptyState}>Список пуст. Добавьте фильмы в «Любимые» на карточке.</div>
      ) : (
        <div className={s.grid}>
          {favorites.map((movie) => (
            <Film
              key={movie.id}
              movieId={movie.id}
              title={movie.title}
              voteAverage={movie.voteAverage}
              posterPath={movie.posterUrl}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;
