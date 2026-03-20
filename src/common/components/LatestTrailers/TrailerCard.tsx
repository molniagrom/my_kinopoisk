import { useGetMovieVideosQuery, useGetTvVideosQuery } from '@/features/films/moviesApi.ts';
import type {TrailerCardProps, TrailerVideo} from "@/common/components/LatestTrailers/TypeTrailerCard.ts";

const buildYouTubeUrl = (key: string) => `https://www.youtube.com/watch?v=${key}`;
const buildYouTubePreview = (key: string) => `https://img.youtube.com/vi/${key}/maxresdefault.jpg`;

const pickTrailer = (videos: { results: TrailerVideo[] }) => {
  const candidates = videos.results
    .filter((video) => video.type === 'Trailer' && video.site === 'YouTube')
    .sort((a, b) => {
      if (a.official !== b.official) return a.official ? -1 : 1;
      return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
    });
  return candidates[0];
};

export const TrailerCard = ({ item, badgeLabel, formatMeta }: TrailerCardProps) => {
  const movieQuery = useGetMovieVideosQuery(
    { movieId: item.id, language: 'en-US' },
    { skip: item.mediaType !== 'movie' }
  );
  const tvQuery = useGetTvVideosQuery({ tvId: item.id, language: 'en-US' }, { skip: item.mediaType !== 'tv' });
  const data = item.mediaType === 'movie' ? movieQuery.data : tvQuery.data;
  const isFetching = item.mediaType === 'movie' ? movieQuery.isFetching : tvQuery.isFetching;
  const trailer = data ? pickTrailer(data) : undefined;

  if (isFetching) {
    return (
      <article className="min-w-[85vw] flex-shrink-0 snap-start overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--surface-border)] bg-[var(--surface-1)] p-6 text-[var(--text-muted)] shadow-[var(--surface-shadow-soft)] sm:min-w-[480px] md:min-w-[520px]">
        Загрузка трейлера...
      </article>
    );
  }

  if (!trailer) {
    return null;
  }

  const imageUrl = item.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${item.backdrop_path}`
    : buildYouTubePreview(trailer.key);
  const videoUrl = buildYouTubeUrl(trailer.key);

  return (
    <article className="min-w-[85vw] flex-shrink-0 snap-start overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--surface-border)] bg-[var(--surface-1)] shadow-[var(--surface-shadow-soft)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[var(--surface-shadow)] sm:min-w-[480px] md:min-w-[520px]">
      <div className="relative h-[200px] bg-[var(--metal-black)] sm:h-[220px] md:h-[240px]">
        <img src={imageUrl} alt={item.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <a
            href={videoUrl}
            target="_blank"
            rel="noreferrer"
            className="flex h-[80px] w-[80px] items-center justify-center rounded-full border-[3px] border-white/30 bg-gradient-to-br from-[var(--decepticon-purple)] to-[var(--decepticon-purple-bright)] shadow-[var(--cta-shadow)] backdrop-blur-sm transition-transform duration-300 hover:scale-110 md:h-[96px] md:w-[96px]"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-10 w-10 text-white md:h-12 md:w-12"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-6 py-5">
        {badgeLabel ? (
          <span className="w-fit rounded-full bg-[var(--chip-bg)] px-3 py-1 text-xs uppercase text-[var(--decepticon-purple-bright)]">
            {badgeLabel}
          </span>
        ) : null}
        <h3
          className="text-[1.15rem] font-bold text-[var(--text-main)] md:text-[1.3rem]"
          style={{ fontFamily: "Geist Variable, 'Segoe UI', Tahoma, Verdana, sans-serif" }}
        >
          {item.title}
        </h3>
        <p className="text-sm text-[var(--text-muted)] md:text-base">{formatMeta(trailer.published_at)}</p>
      </div>
    </article>
  );
};

export default TrailerCard;
