import { Main } from "../../components/Main/Main"
import { Routes, Route } from "react-router-dom"
import CategoryMovies from "../../components/CategoryMovies/CategoryMovies"
import FilteredMovies from "../../components/FilteredMovies/FilteredMovies"
import Search from "../../components/Search/Search"
import Favorites from "../../components/Favorites/Favorites"
import { PageNotFound } from "../../components/PageNotFound/PageNotFound"


export const Path = {
  Main: "/",
  CategoryMovies: "/categoryMovies",
  FilteredMovies: "/filteredMovies",
  Search: "/search",
  Favorites: "/favorites",
//   Login: "login",
  NotFound: "*",
} as const

export const Routing = () => {

  return (
    <Routes>
      <Route path={Path.Main} element={<Main />} />
      <Route path={Path.CategoryMovies} element={<CategoryMovies />} />
      <Route path={Path.FilteredMovies} element={<FilteredMovies />} />
      <Route path={Path.Search} element={<Search />} />
      <Route path={Path.Favorites} element={<Favorites />} />
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}
