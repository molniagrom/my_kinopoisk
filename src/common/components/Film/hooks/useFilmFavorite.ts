import { useState } from 'react';
import { useAppSelector } from '@/common/hooks/useAppHooks.ts';
import { selectAuthAccountId, selectAuthSessionId, selectFavoriteIds, selectIsAuthorized } from '@/features/selectors.ts';
import { useMarkFavoriteMutation } from '@/features/api/authApi.ts';

type UseFilmFavoriteParams = {
  movieId: number;
};

export const useFilmFavorite = ({ movieId }: UseFilmFavoriteParams) => {
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const sessionId = useAppSelector(selectAuthSessionId);
  const accountId = useAppSelector(selectAuthAccountId);
  const favoriteIds = useAppSelector(selectFavoriteIds);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [markFavorite] = useMarkFavoriteMutation();

  const isFavorite = isAuthorized && favoriteIds.includes(movieId);

  const toggleFavorite = async () => {
    if (!isAuthorized) {
      setIsAuthModalOpen(true);
      return;
    }

    if (sessionId && accountId) {
      try {
        await markFavorite({ accountId, sessionId, mediaId: movieId, favorite: !isFavorite }).unwrap();
      } catch {
        // optimistic update rollback happens in authApi.onQueryStarted
      }
    }
  };

  return {
    isFavorite,
    isAuthModalOpen,
    setIsAuthModalOpen,
    toggleFavorite,
  };
};

export default useFilmFavorite;
