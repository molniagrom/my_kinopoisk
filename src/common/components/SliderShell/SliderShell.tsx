import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import type { ReactNode } from 'react';

type SliderShellProps = {
  children: ReactNode;
  wrapperClassName: string;
  viewportClassName: string;
  navButtonClassName: string;
  prevButtonClassName: string;
  nextButtonClassName: string;
  activeViewportClassName?: string;
  prevAriaLabel?: string;
  nextAriaLabel?: string;
  prevLabel?: ReactNode;
  nextLabel?: ReactNode;
  scrollFactor?: number;
  scrollOffset?: number;
  draggable?: boolean;
};

export const SliderShell = ({
  children,
  wrapperClassName,
  viewportClassName,
  navButtonClassName,
  prevButtonClassName,
  nextButtonClassName,
  activeViewportClassName,
  prevAriaLabel = 'Scroll left',
  nextAriaLabel = 'Scroll right',
  prevLabel = '<',
  nextLabel = '>',
  scrollFactor = 0.8,
  scrollOffset,
  draggable = true,
}: SliderShellProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggable || !viewportRef.current) return;
    setIsDragging(true);
    const x = e.pageX - viewportRef.current.offsetLeft;
    setStartX(x);
    setStartScrollLeft(viewportRef.current.scrollLeft);
  };

  const stopDragging = () => {
    if (!draggable) return;
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggable || !isDragging || !viewportRef.current) return;
    e.preventDefault();
    const x = e.pageX - viewportRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    viewportRef.current.scrollLeft = startScrollLeft - walk;
  };

  const moveSlider = (direction: 'prev' | 'next') => {
    if (!viewportRef.current) return;
    const distance = scrollOffset ?? viewportRef.current.clientWidth * scrollFactor;
    viewportRef.current.scrollBy({
      left: direction === 'next' ? distance : -distance,
      behavior: 'smooth',
    });
  };

  return (
    <div className={wrapperClassName}>
      <div
        ref={viewportRef}
        className={clsx(viewportClassName, isDragging && activeViewportClassName)}
        onMouseDown={handleMouseDown}
        onMouseLeave={stopDragging}
        onMouseUp={stopDragging}
        onMouseMove={handleMouseMove}
      >
        {children}
      </div>
      <button
        type="button"
        aria-label={prevAriaLabel}
        onClick={() => moveSlider('prev')}
        className={clsx(navButtonClassName, prevButtonClassName)}
      >
        {prevLabel}
      </button>
      <button
        type="button"
        aria-label={nextAriaLabel}
        onClick={() => moveSlider('next')}
        className={clsx(navButtonClassName, nextButtonClassName)}
      >
        {nextLabel}
      </button>
    </div>
  );
};

export default SliderShell;
