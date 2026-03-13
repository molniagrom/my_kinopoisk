export type FavoriteMovie = {
  id: number;
  title: string;
  posterUrl: string;
  voteAverage: number;
};

const FAVORITES_STORAGE_KEY = 'favoriteMovies';

const readFavorites = (): FavoriteMovie[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as FavoriteMovie[]) : [];
  } catch {
    return [];
  }
};

const writeFavorites = (favorites: FavoriteMovie[]) => {
  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  window.dispatchEvent(new CustomEvent('favorites:changed'));
};

export const getFavorites = () => readFavorites();

export const isFavoriteMovie = (movieId: number) => readFavorites().some((movie) => movie.id === movieId);

export const toggleFavoriteMovie = (movie: FavoriteMovie) => {
  const favorites = readFavorites();
  const exists = favorites.some((item) => item.id === movie.id);
  const nextFavorites = exists ? favorites.filter((item) => item.id !== movie.id) : [...favorites, movie];
  writeFavorites(nextFavorites);
  return nextFavorites;
};
