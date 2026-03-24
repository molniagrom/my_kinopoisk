import styles from '../MovieDetailPage.module.css';
import type { MovieDetail } from '@/features/films/filmsApi.types.ts';
import MovieDetailHeader from './MovieDetailHeader.tsx';
import type { To } from 'react-router-dom';

type MovieDetailInfoProps = {
  movie: MovieDetail;
  posterUrl: string;
  releaseYear: number | string;
  runtime: string;
  backTarget: To;
};

export const MovieDetailInfo = ({ movie, posterUrl, releaseYear, runtime, backTarget }: MovieDetailInfoProps) => {
  return (
    <>
      <div className={styles.posterWrapper}>
        <img src={posterUrl} alt={movie.title} className={styles.poster} />
      </div>
      <div className={styles.details}>
        <MovieDetailHeader title={movie.title} backTarget={backTarget} movieId={movie.id} tagline={movie.tagline} />
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
            <strong>Бюджет:</strong> {movie.budget ? `$${movie.budget.toLocaleString()}` : '—'}
          </div>
          <div>
            <strong>Сборы:</strong> {movie.revenue ? `$${movie.revenue.toLocaleString()}` : '—'}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetailInfo;
