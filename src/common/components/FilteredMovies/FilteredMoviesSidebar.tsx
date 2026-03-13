import { Button, FormControl, InputLabel, MenuItem, Select, Slider } from '@mui/material';

import s from './filteredMovies.module.css';
import { SORT_OPTIONS } from '@/common/constants';
import { useGetMovieGenresQuery } from '@/features/films/moviesApi.ts';

type FilteredMoviesSidebarProps = {
  sortBy: string;
  ratingRange: [number, number];
  selectedGenres: number[];
  onSortChange: (value: string) => void;
  onRatingChange: (_event: Event, value: number | number[]) => void;
  onToggleGenre: (genreId: number) => void;
  onReset: () => void;
};

const FilteredMoviesSidebar = ({
  sortBy,
  ratingRange,
  selectedGenres,
  onSortChange,
  onRatingChange,
  onToggleGenre,
  onReset,
}: FilteredMoviesSidebarProps) => {
  const { data: genresData, isLoading: isGenresLoading, isError: isGenresError } = useGetMovieGenresQuery({});

  return (
    <aside className={s.sidebar}>
      <div className={s.block}>
        <h2>Sorting</h2>
        <FormControl fullWidth size="small">
          <InputLabel id="sort-label">Sort by</InputLabel>
          <Select
            labelId="sort-label"
            value={sortBy}
            label="Sort by"
            onChange={(event) => onSortChange(event.target.value as string)}
          >
            {SORT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className={s.block}>
        <h2>Rating</h2>
        <div className={s.ratingHeader}>
          <span>
            {ratingRange[0].toFixed(1)} - {ratingRange[1].toFixed(1)}
          </span>
          <span className={s.ratingHint}>Step 0.1</span>
        </div>
        <Slider
          value={ratingRange}
          onChange={onRatingChange}
          min={0}
          max={10}
          step={0.1}
          valueLabelDisplay="auto"
          disableSwap
        />
      </div>

      <div className={s.block}>
        <div className={s.blockHeader}>
          <h2>Genres</h2>
          {isGenresLoading && <span className={s.loadingText}>Loading...</span>}
        </div>
        {isGenresError && <p className={s.errorText}>Could not load genres.</p>}
        <div className={s.genres}>
          {(genresData?.genres ?? []).map((genre) => (
            <button
              key={genre.id}
              type="button"
              className={`${s.genreButton} ${selectedGenres.includes(genre.id) ? s.genreActive : ''}`}
              onClick={() => onToggleGenre(genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      <Button variant="outlined" onClick={onReset}>
        Reset filters
      </Button>
    </aside>
  );
};

export default FilteredMoviesSidebar;
