import s from './categoryMovies.module.css';
import { PopularMovies } from './PopularMovies/PopularMovies.tsx';
import TopRatedSection from './TopRatedSection.tsx';
import { NowPlaying } from './NowPlaying/NowPlaying.tsx';
import { Upcoming } from './Upcoming/Upcoming.tsx';

export const CategoryMovies = () => {
  return (
    <div className={s.categoryMovies}>
      <PopularMovies />
      <TopRatedSection />
      <NowPlaying />
      <Upcoming />
    </div>
  );
};
