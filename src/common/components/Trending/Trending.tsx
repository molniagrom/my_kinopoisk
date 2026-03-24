import { useGetPopularMoviesQuery } from '@/features/films/moviesApi.ts';
import s from './Trending.module.css';
import { FilmSlider } from '../FilmSlider/FilmSlider.tsx';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../routing/paths.ts';
import MovieCardSkeleton from '../Skeletons/MovieCardSkeleton.tsx';
import MovieCard from "@/common/components/Film/MovieCard.tsx";

export const Trending = () => {
  const { data, isLoading, isError } = useGetPopularMoviesQuery({ region: 'MD', page: 1, language: 'ru-RU' });
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className={s.trending}>
        <h2 className={s.sectionTitle}>Trending</h2>
        <FilmSlider>
          {Array.from({ length: 6 }).map((_, index) => (
            <MovieCardSkeleton key={`trend-skel-${index}`} />
          ))}
        </FilmSlider>
      </div>
    );
  }

  if (isError || !data) {
    return <div className={s.trending}>Ошибка при загрузке популярных фильмов.</div>;
  }

  const onClickHandler = () => {
    navigate(Path.CategoryMovies);
  };

  return (
    <div className={s.trending}>
      <h2 className={s.sectionTitle}>Trending</h2>
      <FilmSlider>
        {data.results
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
      </FilmSlider>
      <Button onClick={onClickHandler}>View More</Button>
    </div>
  );
};

