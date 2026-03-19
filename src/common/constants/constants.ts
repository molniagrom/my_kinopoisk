export const AUTH_TOKEN = 'auth-token';
export const THEME_STORAGE_KEY = 'theme-mode';
export const PAGE_SIZE = 4;

// Constant for the number of movies displayed at a time
export const MOVIES_TO_SHOW = 6;

export const FILTERED_DEFAULT_SORT = 'popularity.desc';
export const FILTERED_DEFAULT_RATING: [number, number] = [0, 10];

export const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Popularity (desc)' },
  { value: 'popularity.asc', label: 'Popularity (asc)' },
  { value: 'vote_average.desc', label: 'Rating (desc)' },
  { value: 'vote_average.asc', label: 'Rating (asc)' },
  { value: 'primary_release_date.desc', label: 'Release date (desc)' },
  { value: 'primary_release_date.asc', label: 'Release date (asc)' },
  { value: 'title.asc', label: 'Title (A-Z)' },
  { value: 'title.desc', label: 'Title (Z-A)' },
] as const;
