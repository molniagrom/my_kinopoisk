import styles from '../MovieDetailPage.module.css';
import Film from '../../Film/Film.tsx';
import type { Movie } from '@/features/films/filmsApi.types.ts';

type SimilarMoviesSectionProps = {
  movies: Movie[];
};

export const SimilarMoviesSection = ({ movies }: SimilarMoviesSectionProps) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Похожие фильмы</h2>
      <div className={styles.similarGrid}>
        {movies.map((item) => (
          <Film
            key={item.id}
            movieId={item.id}
            title={item.original_title}
            releaseDate={item.release_date}
            voteAverage={item.vote_average}
            posterPath={item.poster_path as string}
          />
        ))}
      </div>
    </div>
  );
};

export default SimilarMoviesSection;
