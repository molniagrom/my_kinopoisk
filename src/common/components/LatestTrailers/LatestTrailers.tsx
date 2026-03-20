import { useEffect, useMemo, useRef, useState } from 'react';
import {
  useGetPopularMoviesQuery,
  useGetTvOnTheAirQuery,
  useGetMovieWatchProvidersQuery,
  useDiscoverMoviesQuery,
} from '@/features/films/moviesApi.ts';
import TrailerCard from './TrailerCard.tsx';

const tabs = ['Popular', 'Streaming', 'On TV', 'For Rent', 'In Theaters'];
const streamingProviderNames = ['Netflix', 'Amazon Prime Video', 'Disney Plus', 'Hulu', 'Max', 'Paramount Plus'];
const rentProviderNames = ['Apple TV', 'Amazon Video', 'Google Play Movies', 'Vudu', 'Microsoft Store', 'YouTube'];

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value));

const buildMeta = (publishedAt?: string) => {
  if (!publishedAt) return 'Official Trailer';
  return `Official Trailer • ${formatDate(publishedAt)}`;
};

export const LatestTrailers = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const listRef = useRef<HTMLDivElement | null>(null);

  const { data: popularMovies, isFetching: isPopularFetching } = useGetPopularMoviesQuery({
    page: 1,
    language: 'en-US',
    region: 'US',
  });
  const { data: tvOnTheAir, isFetching: isTvFetching } = useGetTvOnTheAirQuery({ page: 1, language: 'en-US' });
  const { data: watchProviders, isFetching: isProvidersFetching } = useGetMovieWatchProvidersQuery({
    watch_region: 'US',
    language: 'en-US',
  });

  const providerMap = useMemo(() => {
    const map = new Map<string, number>();
    watchProviders?.results?.forEach((provider) => {
      map.set(provider.provider_name, provider.provider_id);
    });
    return map;
  }, [watchProviders]);

  const [cachedProviderIds] = useState<{ streaming: string; rent: string }>(() => {
    if (typeof window === 'undefined') return { streaming: '', rent: '' };
    const raw = window.localStorage.getItem('providerIds:us');
    if (!raw) return { streaming: '', rent: '' };
    try {
      return JSON.parse(raw) as { streaming: string; rent: string };
    } catch {
      return { streaming: '', rent: '' };
    }
  });

  const streamingProviderIds = useMemo(() => {
    const value =
      streamingProviderNames
        .map((name) => providerMap.get(name))
        .filter((id): id is number => Boolean(id))
        .join('|') || cachedProviderIds.streaming;
    return value;
  }, [providerMap, cachedProviderIds.streaming]);

  const rentProviderIds = useMemo(() => {
    const value =
      rentProviderNames
        .map((name) => providerMap.get(name))
        .filter((id): id is number => Boolean(id))
        .join('|') || cachedProviderIds.rent;
    return value;
  }, [providerMap, cachedProviderIds.rent]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!streamingProviderIds && !rentProviderIds) return;
    window.localStorage.setItem(
      'providerIds:us',
      JSON.stringify({ streaming: streamingProviderIds, rent: rentProviderIds })
    );
  }, [streamingProviderIds, rentProviderIds]);

  const today = useMemo(() => new Date(), []);
  const releaseEnd = useMemo(() => today.toISOString().slice(0, 10), [today]);
  const releaseStart = useMemo(() => {
    const date = new Date(today);
    date.setDate(date.getDate() - 60);
    return date.toISOString().slice(0, 10);
  }, [today]);

  const { data: streamingMovies, isFetching: isStreamingFetching } = useDiscoverMoviesQuery(
    {
      language: 'en-US',
      region: 'US',
      watch_region: 'US',
      with_watch_providers: streamingProviderIds || undefined,
      with_watch_monetization_types: 'flatrate|free|ads',
      sort_by: 'popularity.desc',
      include_video: true,
      page: 1,
    },
    { skip: false }
  );
  const { data: rentMovies, isFetching: isRentFetching } = useDiscoverMoviesQuery(
    {
      language: 'en-US',
      region: 'US',
      watch_region: 'US',
      with_watch_providers: rentProviderIds || undefined,
      with_watch_monetization_types: 'rent',
      sort_by: 'popularity.desc',
      include_video: true,
      page: 1,
    },
    { skip: false }
  );
  const { data: inTheatersMovies, isFetching: isInTheatersFetching } = useDiscoverMoviesQuery({
    language: 'en-US',
    region: 'US',
    sort_by: 'release_date.desc',
    with_release_type: '2',
    'primary_release_date.gte': releaseStart,
    'primary_release_date.lte': releaseEnd,
    include_video: true,
    page: 1,
  });

  const items = useMemo(() => {
    if (activeTab === 'Popular') {
      return (popularMovies?.results ?? []).map((movie) => ({
        id: movie.id,
        title: movie.title,
        backdrop_path: movie.backdrop_path,
        mediaType: 'movie' as const,
      }));
    }
    if (activeTab === 'Streaming') {
      return (streamingMovies?.results ?? []).map((movie) => ({
        id: movie.id,
        title: movie.title,
        backdrop_path: movie.backdrop_path,
        mediaType: 'movie' as const,
      }));
    }
    if (activeTab === 'On TV') {
      return (tvOnTheAir?.results ?? []).map((show) => ({
        id: show.id,
        title: show.name,
        backdrop_path: show.backdrop_path,
        mediaType: 'tv' as const,
      }));
    }
    if (activeTab === 'For Rent') {
      return (rentMovies?.results ?? []).map((movie) => ({
        id: movie.id,
        title: movie.title,
        backdrop_path: movie.backdrop_path,
        mediaType: 'movie' as const,
      }));
    }
    return (inTheatersMovies?.results ?? []).map((movie) => ({
      id: movie.id,
      title: movie.title,
      backdrop_path: movie.backdrop_path,
      mediaType: 'movie' as const,
    }));
  }, [activeTab, popularMovies, streamingMovies, tvOnTheAir, rentMovies, inTheatersMovies]);

  const isLoading =
    isPopularFetching ||
    isTvFetching ||
    isProvidersFetching ||
    isStreamingFetching ||
    isRentFetching ||
    isInTheatersFetching;
  const badgeLabel = activeTab === 'Popular' ? undefined : activeTab;

  const handleScroll = (direction: 'left' | 'right') => {
    if (!listRef.current) return;
    const offset = direction === 'left' ? -520 : 520;
    listRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section className="relative bg-[var(--paper-bg)]">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20 lg:px-12">
        <h2
          className="mb-7 text-left text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold uppercase tracking-[0.04em] text-[var(--metal-silver-bright)]"
          style={{ fontFamily: "Geist Variable, 'Segoe UI', Tahoma, Verdana, sans-serif" }}
        >
          Latest Trailers
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-2 md:gap-6 md:pb-0">
          {tabs.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium uppercase tracking-wide transition-all md:text-base ${
                  isActive
                    ? 'border-transparent bg-gradient-to-r from-[var(--decepticon-purple)] to-[var(--decepticon-purple-bright)] text-white shadow-[var(--cta-shadow)]'
                    : 'border-[var(--surface-border)] bg-[var(--surface-3)] text-[var(--text-muted)] hover:scale-105 hover:border-[var(--decepticon-purple-bright)]'
                }`}
                style={{ fontFamily: "Geist Variable, 'Segoe UI', Tahoma, Verdana, sans-serif" }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="group relative mt-8 md:mt-10">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => handleScroll('left')}
            className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--surface-2)] text-[var(--icon-color)] shadow-md opacity-0 transition-opacity group-hover:opacity-100 md:flex"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => handleScroll('right')}
            className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--surface-2)] text-[var(--icon-color)] shadow-md opacity-0 transition-opacity group-hover:opacity-100 md:flex"
          >
            ›
          </button>

          <div
            ref={listRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 scrollbar-thin md:gap-6"
          >
            {isLoading ? (
              <div className="min-w-[85vw] flex-shrink-0 rounded-[var(--radius-2xl)] border border-[var(--surface-border)] bg-[var(--surface-1)] p-6 text-[var(--text-muted)] sm:min-w-[480px] md:min-w-[520px]">
                Загрузка трейлеров...
              </div>
            ) : null}
            {!isLoading && items.length === 0 ? (
              <div className="min-w-[85vw] flex-shrink-0 rounded-[var(--radius-2xl)] border border-[var(--surface-border)] bg-[var(--surface-1)] p-6 text-[var(--text-muted)] sm:min-w-[480px] md:min-w-[520px]">
                Трейлеры не найдены.
              </div>
            ) : null}
            {items.slice(0, 12).map((item) => (
              <TrailerCard key={`${item.mediaType}-${item.id}`} item={item} badgeLabel={badgeLabel} formatMeta={buildMeta} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestTrailers;
