import { useEffect } from 'react';
import { useLocation, useParams, type Location } from 'react-router-dom';

import { Path } from '../../routing/paths.ts';
import styles from './MovieDetailPage.module.css';
import { useMovieDetailData } from './hooks/useMovieDetailData.ts';
import MovieDetailInfo from './components/MovieDetailInfo.tsx';
import MovieCastSection from './components/MovieCastSection.tsx';
import SimilarMoviesSection from './components/SimilarMoviesSection.tsx';
import MovieDetailState from './components/MovieDetailState.tsx';

export const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId?: string }>();
  const location = useLocation();
  const backTarget = (location.state as { from?: Location } | null)?.from ?? Path.Main;
  const { skip, isFetching, movie, posterUrl, backdropUrl, releaseYear, runtime, cast, similar, actorPlaceholder } =
    useMovieDetailData(movieId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [movieId]);

  if (skip) {
    return <MovieDetailState backTarget={backTarget} variant="invalid" />;
  }

  if (isFetching && !movie) {
    return <MovieDetailState backTarget={backTarget} variant="loading" />;
  }

  if (!movie) {
    return <MovieDetailState backTarget={backTarget} variant="notFound" />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.backdrop} style={{ backgroundImage: `url(${backdropUrl})` }} />
      <div className={styles.content}>
        <MovieDetailInfo
          movie={movie}
          posterUrl={posterUrl}
          releaseYear={releaseYear}
          runtime={runtime}
          backTarget={backTarget}
        />
      </div>
      <MovieCastSection cast={cast} placeholderUrl={actorPlaceholder} />
      <SimilarMoviesSection movies={similar} />
    </div>
  );
};

export default MovieDetailPage;
