import type { FC, ReactNode } from 'react';
import SliderShell from '../SliderShell/SliderShell.tsx';
import s from './FilmSlider.module.css';

interface FilmSliderProps {
  children: ReactNode;
}

export const FilmSlider: FC<FilmSliderProps> = ({ children }) => {
  return (
    <SliderShell
      wrapperClassName={s.wrapper}
      viewportClassName={s.items}
      activeViewportClassName={s.active}
      navButtonClassName={s.navButton}
      prevButtonClassName={s.btnPrev}
      nextButtonClassName={s.btnNext}
      prevLabel="<"
      nextLabel=">"
    >
      {children}
    </SliderShell>
  );
};
