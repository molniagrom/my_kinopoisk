
import s from './Favorites.module.css';
import MovieCard from '../MovieCard.tsx';
import { useAppSelector } from '@/common/hooks/useAppHooks.ts';
import { selectAuthAccountId, selectAuthSessionId, selectIsAuthorized } from '@/features/selectors.ts';
import { useGetAccountFavoritesQuery } from '@/features/api/authApi.ts';

export const Favorites = () => {
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const sessionId = useAppSelector(selectAuthSessionId);
  const accountId = useAppSelector(selectAuthAccountId);
  const { data: favoritesData, isFetching } = useGetAccountFavoritesQuery(
    {
      accountId: accountId ?? 0,
      sessionId: sessionId ?? '',
      page: 1,
    },
    {
      skip: !isAuthorized,
    }
  );
  const favoritesToRender = favoritesData?.results ?? [];

  return (
    <section className={s.page}>
      <header className={s.header}>
        <h1>Любимые фильмы</h1>
        <p className={s.subtitle}>Фильмы, которые вы отметили как избранные.</p>
      </header>

      {!isAuthorized ? (
        <div className={s.emptyState}>Войдите в аккаунт, чтобы видеть любимые фильмы.</div>
      ) : !isFetching && favoritesToRender.length === 0 ? (
        <div className={s.emptyState}>Список пуст. Добавьте фильмы в «Любимые» на карточке.</div>
      ) : (
        <div className={s.grid}>
          {favoritesToRender
            .filter((movie) => movie.poster_path !== null)
            .map((movie) => (
              <MovieCard
                key={movie.id}
                movieId={movie.id}
                title={movie.original_title}
                releaseDate={movie.release_date}
                voteAverage={movie.vote_average}
                posterPath={movie.poster_path as string}
              />
            ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;

