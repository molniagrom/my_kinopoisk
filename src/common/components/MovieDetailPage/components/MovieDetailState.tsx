import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, type To } from 'react-router-dom';

import styles from '../MovieDetailPage.module.css';

type MovieDetailStateProps = {
  backTarget: To;
  variant: 'invalid' | 'notFound' | 'loading';
};

export const MovieDetailState = ({ backTarget, variant }: MovieDetailStateProps) => {
  if (variant === 'loading') {
    return <div className={styles.loader}>Загрузка фильма...</div>;
  }

  const message =
    variant === 'invalid' ? 'Некорректный идентификатор фильма.' : 'Фильм не найден.';
  const buttonLabel = variant === 'invalid' ? 'Вернуться на главную' : 'Вернуться';

  return (
    <div className={styles.message}>
      <p>{message}</p>
      <Button component={Link} to={backTarget} variant="contained" startIcon={<ArrowBackIcon />}>
        {buttonLabel}
      </Button>
    </div>
  );
};

export default MovieDetailState;
