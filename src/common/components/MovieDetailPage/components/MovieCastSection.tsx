import styles from '../MovieDetailPage.module.css';
import type { CastMember } from '@/features/films/filmsApi.types.ts';

type MovieCastSectionProps = {
  cast: CastMember[];
  placeholderUrl: string;
};

export const MovieCastSection = ({ cast, placeholderUrl }: MovieCastSectionProps) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Актеры (в главных ролях)</h2>
      <div className={styles.castGrid}>
        {cast.map((actor) => {
          const actorPhoto = actor.profile_path
            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
            : placeholderUrl;
          return (
            <div key={actor.id} className={styles.castCard}>
              <img src={actorPhoto} alt={actor.name} className={styles.castPhoto} />
              <div className={styles.castInfo}>
                <span className={styles.castName}>{actor.name}</span>
                <span className={styles.castRole}>{actor.character}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieCastSection;
