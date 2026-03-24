import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, type To } from 'react-router-dom';

import styles from '../MovieDetailPage.module.css';
import FilmFavoriteButton from '@/common/components/Film/FilmFavoriteButton.tsx';

type MovieDetailHeaderProps = {
  title: string;
  backTarget: To;
  movieId: number;
  tagline?: string | null;
};

export const MovieDetailHeader = ({ title, backTarget, movieId, tagline }: MovieDetailHeaderProps) => {
  return (
    <>
      <div className={styles.headerRow}>
        <h1>{title}</h1>
        <div className={styles.headerActions}>
          <FilmFavoriteButton movieId={movieId} className={styles.detailFavoriteButton} />
          <Button component={Link} to={backTarget} variant="outlined" startIcon={<ArrowBackIcon />} size="small">
            Back
          </Button>
        </div>
      </div>
      {tagline && <p className={styles.tagline}>{tagline}</p>}
    </>
  );
};

export default MovieDetailHeader;
