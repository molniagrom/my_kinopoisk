import { Link, useLocation, useParams, type Location } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useGetMovieByIdQuery } from '@/features/films/moviesApi.ts';
import { Path } from '../../routing/paths.ts';
import styles from './movieDetail.module.css';

const POSTER_PLACEHOLDER = 'https://placehold.co/500x750?text=No+Poster&background=2a2f33';
const BACKDROP_PLACEHOLDER = 'https://placehold.co/1200x675?text=No+Backdrop&background=0a0c0f';

export const MovieDetail = () => {
  const { movieId } = useParams<{ movieId?: string }>();
  const location = useLocation();
  const backTarget = (location.state as { from?: Location } | null)?.from ?? Path.Main;
  const parsedId = Number(movieId);
  const skip = Number.isNaN(parsedId);
  const { data: movie, isFetching } = useGetMovieByIdQuery({ movieId: parsedId }, { skip });

  if (skip) {
    return (
      <div className={styles.message}>
        <p>Некорректный идентификатор фильма.</p>
        <Button component={Link} to={backTarget} variant="contained" startIcon={<ArrowBackIcon />}>
          Вернуться на главную
        </Button>
      </div>
    );
  }

  if (isFetching && !movie) {
    return <div className={styles.loader}>Загрузка фильма...</div>;
  }

  if (!movie) {
    return (
      <div className={styles.message}>
        <p>Фильм не найден.</p>
        <Button component={Link} to={backTarget} variant="contained" startIcon={<ArrowBackIcon />}>
          Вернуться
        </Button>
      </div>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : POSTER_PLACEHOLDER;
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : BACKDROP_PLACEHOLDER;
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '—';
  const runtime = movie.runtime ? `${movie.runtime} мин` : '—';

  return (
    <div className={styles.page}>
      <div className={styles.backdrop} style={{ backgroundImage: `url(${backdropUrl})` }} />
      <div className={styles.content}>
        <div className={styles.posterWrapper}>
          <img src={posterUrl} alt={movie.title} className={styles.poster} />
        </div>
        <div className={styles.details}>
          <div className={styles.headerRow}>
            <h1>{movie.title}</h1>
            <Button
              component={Link}
              to={backTarget}
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              size="small"
            >
              Назад
            </Button>
          </div>
          {movie.tagline && <p className={styles.tagline}>{movie.tagline}</p>}
          <div className={styles.metaRow}>
            <span>Год: {releaseYear}</span>
            <span>Длительность: {runtime}</span>
            <span>Статус: {movie.status}</span>
          </div>
          <p className={styles.overview}>{movie.overview}</p>
          <div className={styles.chipRow}>
            {movie.genres.map((genre) => (
              <span key={genre.id} className={styles.genreChip}>
                {genre.name}
              </span>
            ))}
          </div>
          <div className={styles.statsRow}>
            <div>
              <strong>Рейтинг:</strong> {movie.vote_average.toFixed(1)} ({movie.vote_count} голосов)
            </div>
            <div>
              <strong>Бюджет:</strong>{' '}
              {movie.budget ? `$${movie.budget.toLocaleString()}` : '—'}
            </div>
            <div>
              <strong>Сборы:</strong>{' '}
              {movie.revenue ? `$${movie.revenue.toLocaleString()}` : '—'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
