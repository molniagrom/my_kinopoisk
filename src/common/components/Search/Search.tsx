import React from 'react';
import Pagination from '@mui/material/Pagination';
import { useSearchParams } from 'react-router-dom';

import s from './Search.module.css';
import SearchForm from '../SearchForm/SearchForm.tsx';
import { useFetchSearcheMoviesByTitleQuery } from '@/features/films/moviesApi.ts';
import Film from '../Film/Film.tsx';
import MovieCardSkeleton from '../Skeletons/MovieCardSkeleton.tsx';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') ?? '';
  const [inputValue, setInputValue] = React.useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = React.useState(initialQuery);
  const [page, setPage] = React.useState(1);

  const { data, isFetching } = useFetchSearcheMoviesByTitleQuery(
    { query: submittedQuery, page },
    {
      skip: submittedQuery.trim() === '',
    }
  );
  const { data: suggestionsData } = useFetchSearcheMoviesByTitleQuery(
    { query: inputValue },
    {
      skip: inputValue.trim() === '',
    }
  );

  React.useEffect(() => {
    setInputValue(initialQuery);
    setSubmittedQuery(initialQuery);
    setPage(1);
  }, [initialQuery]);

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();
    setPage(1);
    setSubmittedQuery(trimmedValue);

    if (!trimmedValue) {
      setSearchParams({});
      return;
    }

    setSearchParams({ query: trimmedValue });
  };

  const handleClear = () => {
    setInputValue('');
    setSubmittedQuery('');
    setPage(1);
    setSearchParams({});
  };

  const totalPages = data?.total_pages ?? 0;
  const results = data?.results ?? [];

  const suggestions = suggestionsData?.results.map((movie) => movie.original_title) ?? [];

  return (
    <section className={s.page}>
      <header className={s.header}>
        <h1>Search</h1>
        <p className={s.subtitle}>Find movies by title and explore the results.</p>
      </header>

      <div className={s.formWrap}>
        <SearchForm
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSubmit}
          onClear={handleClear}
          suggestions={suggestions}
        />
      </div>

      {submittedQuery.trim() === '' ? (
        <div className={s.message}>Enter a movie title to start searching</div>
      ) : !isFetching && results.length === 0 ? (
        <div className={s.message}>No matches found for "{submittedQuery}"</div>
      ) : (
        <>
          <div className={s.grid}>
            {isFetching && results.length === 0
              ? Array.from({ length: 12 }).map((_, index) => <MovieCardSkeleton key={`search-skel-${index}`} />)
              : null}
            {results
              .filter((movie) => movie.poster_path !== null)
              .map((movie) => (
                <Film
                  key={movie.id}
                  movieId={movie.id}
                  title={movie.original_title}
                  releaseDate={movie.release_date}
                  voteAverage={movie.vote_average}
                  posterPath={movie.poster_path as string}
                />
              ))}
          </div>
          {totalPages > 1 && (
            <div className={s.pagination}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_event, value) => setPage(value)}
                color="primary"
              />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Search;
