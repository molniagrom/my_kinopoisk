import s from './filteredMovies.module.css';

const FilteredMoviesHeader = () => (
  <header className={s.header}>
    <h1>Filtered Movies</h1>
    <p className={s.subtitle}>Combine sorting, rating, and genres to get the exact list you want.</p>
  </header>
);

export default FilteredMoviesHeader;
