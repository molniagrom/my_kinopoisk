export type LatestTrailerItem = {
  id: number;
  title: string;
  backdrop_path: string | null;
  mediaType: 'movie' | 'tv';
};

export type TrailerVideo = {
  type: string;
  site: string;
  official: boolean;
  key: string;
  published_at: string;
};

export type TrailerCardProps = {
  item: {
    id: number;
    title: string;
    backdrop_path: string | null;
    mediaType: 'movie' | 'tv';
  };
  badgeLabel?: string;
  formatMeta: (publishedAt?: string) => string;
};