import { useGetMovieVideosQuery, useGetTvVideosQuery } from '@/features/films/moviesApi.ts';
import styles from './TrailerCard.module.css';
import type {TrailerCardProps, TrailerVideo} from "@/common/components/LatestTrailers/types.ts";

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
      <article className={styles.card}>
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
    <article className={styles.card}>
      <div className={styles.media}>
        <img src={imageUrl} alt={item.title} />
        <div className={styles.playWrap}>
          <a href={videoUrl} target="_blank" rel="noreferrer" className={styles.playButton}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.playIcon} fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </a>
        </div>
      </div>
      <div className={styles.content}>
        {badgeLabel ? <span className={styles.badge}>{badgeLabel}</span> : null}
        <h3 className={styles.title} style={{ fontFamily: "Geist Variable, 'Segoe UI', Tahoma, Verdana, sans-serif" }}>
          {item.title}
        </h3>
        <p className={styles.meta}>{formatMeta(trailer.published_at)}</p>
      </div>
    </article>
  );
};

export default TrailerCard;
