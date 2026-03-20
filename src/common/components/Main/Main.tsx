import s from './main.module.css';
import { Welcome } from '../Welcome/Welcome.tsx';
import { Trending } from '../Trending/Trending.tsx';
import LatestTrailers from '../LatestTrailers/LatestTrailers.tsx';

export const Main = () => {
  return (
    <div className={s.main}>
      <Welcome />
      <Trending />
      <LatestTrailers />
    </div>
  );
};

export default Main;
