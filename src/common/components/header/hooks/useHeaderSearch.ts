import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchSearcheMoviesByTitleQuery } from '@/features/films/moviesApi.ts';
import { Path } from '@/common/routing/paths.ts';

export const useHeaderSearch = () => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const { data: suggestionsData } = useFetchSearcheMoviesByTitleQuery(
    { query: searchValue },
    { skip: isSearchOpen || searchValue.trim() === '' }
  );

  const suggestions = suggestionsData?.results.map((movie) => movie.original_title) ?? [];

  const openSearch = () => setIsSearchOpen(false);
  const closeSearch = () => setIsSearchOpen(true);

  const handleSearchSubmit = () => {
    const trimmed = searchValue.trim();
    if (!trimmed) {
      setSearchValue('');
      setIsSearchOpen(true);
      navigate(Path.Search);
      return;
    }
    setSearchValue('');
    setIsSearchOpen(true);
    navigate(`${Path.Search}?query=${encodeURIComponent(trimmed)}`);
  };

  const handleSearchClear = () => {
    setSearchValue('');
    setIsSearchOpen(true);
    navigate(Path.Search);
  };

  return {
    isSearchOpen,
    searchValue,
    setSearchValue,
    suggestions,
    openSearch,
    closeSearch,
    handleSearchSubmit,
    handleSearchClear,
  };
};

export default useHeaderSearch;
