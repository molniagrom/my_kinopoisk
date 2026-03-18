import { useGetMovieByIdQuery, useGetMovieCreditsQuery, useGetSimilarMoviesQuery } from '@/features/films/moviesApi.ts';
import { ACTOR_PLACEHOLDER, BACKDROP_PLACEHOLDER, POSTER_PLACEHOLDER } from '@/common/constants';

export const useMovieDetailData = (movieId?: string) => {
  const parsedId = Number(movieId);
  const skip = Number.isNaN(parsedId);
  const { data: movie, isFetching } = useGetMovieByIdQuery({ movieId: parsedId }, { skip });
  const { data: credits } = useGetMovieCreditsQuery({ movieId: parsedId }, { skip });
  const { data: similarMovies } = useGetSimilarMoviesQuery({ movieId: parsedId }, { skip });

  const posterUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : POSTER_PLACEHOLDER;
  const backdropUrl = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : BACKDROP_PLACEHOLDER;
  const releaseYear = movie?.release_date ? new Date(movie.release_date).getFullYear() : '—';
  const runtime = movie?.runtime ? `${movie.runtime} мин` : '—';
  const cast = credits?.cast?.slice(0, 6) ?? [];
  const similar = similarMovies?.results?.filter((item) => item.poster_path !== null).slice(0, 6) ?? [];

  return {
    parsedId,
    skip,
    isFetching,
    movie,
    posterUrl,
    backdropUrl,
    releaseYear,
    runtime,
    cast,
    similar,
    actorPlaceholder: ACTOR_PLACEHOLDER,
  };
};
