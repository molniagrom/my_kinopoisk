import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, type To } from 'react-router-dom';

import styles from '../MovieDetailPage.module.css';

type MovieDetailHeaderProps = {
  title: string;
  backTarget: To;
  tagline?: string | null;
};

export const MovieDetailHeader = ({ title, backTarget, tagline }: MovieDetailHeaderProps) => {
  return (
    <>
      <div className={styles.headerRow}>
        <h1>{title}</h1>
        <Button component={Link} to={backTarget} variant="outlined" startIcon={<ArrowBackIcon />} size="small">
          Назад
        </Button>
      </div>
      {tagline && <p className={styles.tagline}>{tagline}</p>}
    </>
  );
};

export default MovieDetailHeader;
