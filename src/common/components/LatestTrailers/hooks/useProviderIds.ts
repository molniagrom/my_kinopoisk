import { useEffect, useMemo, useState } from 'react';
import { useGetMovieWatchProvidersQuery } from '@/features/films/moviesApi.ts';
import {
  defaultLanguage,
  defaultRegion,
  providersStorageKey,
  rentProviderNames,
  streamingProviderNames,
} from '../constants.ts';

type ProviderCache = {
  streaming: string;
  rent: string;
};

export const useProviderIds = () => {
  const { data: watchProviders, isFetching } = useGetMovieWatchProvidersQuery({
    watch_region: defaultRegion,
    language: defaultLanguage,
  });

  const providerMap = useMemo(() => {
    const map = new Map<string, number>();
    watchProviders?.results?.forEach((provider) => {
      map.set(provider.provider_name, provider.provider_id);
    });
    return map;
  }, [watchProviders]);

  const [cachedProviderIds] = useState<ProviderCache>(() => {
    if (typeof window === 'undefined') return { streaming: '', rent: '' };
    const raw = window.localStorage.getItem(providersStorageKey);
    if (!raw) return { streaming: '', rent: '' };
    try {
      return JSON.parse(raw) as ProviderCache;
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
      providersStorageKey,
      JSON.stringify({ streaming: streamingProviderIds, rent: rentProviderIds })
    );
  }, [streamingProviderIds, rentProviderIds]);

  return { streamingProviderIds, rentProviderIds, isFetching };
};
