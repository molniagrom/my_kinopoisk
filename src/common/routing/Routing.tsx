import { CategoryMovies } from '../components/CategoryMovies/CategoryMovies.tsx';
import FilteredMovies from '../components/FilteredMovies/FilteredMovies.tsx';
import { Main } from '../components/Main/Main.tsx';
import { Routes, Route } from 'react-router-dom';
import Favorites from '../components/Favorites/Favorites.tsx';
import { PageNotFound } from '../components/PageNotFound/PageNotFound.tsx';
import MovieDetailPage from '../components/MovieDetailPage/MovieDetailPage.tsx';
import AuthCallback from '../components/AuthCallback/AuthCallback.tsx';
import { Path } from './paths.ts';
import Search from "@/common/components/Search/Search.tsx";
export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Main} element={<Main />} />
      <Route path={Path.CategoryMovies} element={<CategoryMovies />} />
      <Route path={Path.FilteredMovies} element={<FilteredMovies />} />
      <Route path={Path.Search} element={<Search />} />
      <Route path={Path.Favorites} element={<Favorites />} />
      <Route path={Path.AuthCallback} element={<AuthCallback />} />
      <Route path={Path.MovieDetails} element={<MovieDetailPage />} />
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  );
};
