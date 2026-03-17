import s from './welcome.module.css';
import { type CSSProperties, useEffect, useState } from 'react';
import { useFetchSearcheMoviesByTitleQuery, useGetPopularMoviesBackdropQuery } from '@/features/films/moviesApi.ts';
import { getRandomNumber } from '../../utils/utils.ts';
import SearchForm from '../SearchForm/SearchForm.tsx';
import { useNavigate } from 'react-router-dom';
import { Path } from '@/common/routing/paths.ts';

export function Welcome() {
  const [inputValue, setInputValue] = useState('');

  const { data: searchData } = useFetchSearcheMoviesByTitleQuery(
    { query: inputValue },
    {
      skip: inputValue.trim() === '',
    }
  );
  const { data: popularMoviesData } = useGetPopularMoviesBackdropQuery();
  const navigate = useNavigate();

  const [randomBackdropPath, setRandomBackdropPath] = useState<string | null>(null);

  useEffect(() => {
    const moviesWithBackdrop = popularMoviesData?.results.filter((movie) => movie.backdrop_path);

    if (!moviesWithBackdrop?.length) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const randomIndex = getRandomNumber(moviesWithBackdrop.length);
      setRandomBackdropPath(moviesWithBackdrop[randomIndex].backdrop_path);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [popularMoviesData]);

  // Pass the image URL via a CSS variable
  const welcomeStyle = randomBackdropPath
    ? ({
        '--backdrop-url': `url("https://image.tmdb.org/t/p/original${randomBackdropPath}")`,
      } as CSSProperties)
    : undefined;

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) {
      return;
    }

    navigate(`${Path.Search}?query=${encodeURIComponent(trimmedValue)}`);
  };

  const suggestions = searchData?.results.map((movie) => movie.original_title) ?? [];

  return (
    <div className={s.welcome} style={welcomeStyle}>
      <section className={s.hero__content}>
        <div className={s.content__wrapper}>
          <div className={s.text}>
            <h1>Welcome.</h1>
            <p>Millions of movies, TV shows and people to discover. Explore now.</p>
          </div>
          <div className={s.hero__search}>
            <SearchForm
              value={inputValue}
              onChange={setInputValue}
              onSubmit={handleSubmit}
              onClear={() => setInputValue('')}
              placeholder="Enter a movie title"
              suggestions={suggestions}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
