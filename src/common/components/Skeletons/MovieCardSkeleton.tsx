import Skeleton from '@mui/material/Skeleton';

import s from './MovieCardSkeleton.module.css';

export const MovieCardSkeleton = () => {
  return (
    <div className={s.card}>
      <Skeleton variant="rectangular" className={s.poster} />
      <Skeleton variant="text" className={s.title} />
      <Skeleton variant="text" className={s.subtitle} />
    </div>
  );
};

export default MovieCardSkeleton;
