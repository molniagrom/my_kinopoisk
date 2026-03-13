import { useEffect, useRef } from 'react';

import { useAppDispatch } from '@/common/hooks/useAppHooks.ts';
import { setPage } from '@/features/filteredMovies/filteredMoviesSlice.ts';

type UseInfiniteScrollArgs = {
  hasMore: boolean;
  isFetching: boolean;
  page: number;
};

export const useInfiniteScroll = ({ hasMore, isFetching, page }: UseInfiniteScrollArgs) => {
  const dispatch = useAppDispatch();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) {
      observerRef.current?.disconnect();
      return;
    }

    if (!sentinelRef.current) {
      return;
    }

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching) {
          dispatch(setPage(page + 1));
        }
      },
      { rootMargin: '200px 0px' }
    );

    observerRef.current.observe(sentinelRef.current);

    return () => observerRef.current?.disconnect();
  }, [dispatch, hasMore, isFetching, page]);

  return { sentinelRef };
};
