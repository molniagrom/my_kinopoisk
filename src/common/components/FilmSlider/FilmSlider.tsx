import React, { useState, useRef } from 'react';
import type { ReactNode, FC } from 'react';
import s from './FilmSlider.module.css';

interface FilmSliderProps {
    children: ReactNode;
}

export const FilmSlider: FC<FilmSliderProps> = ({ children }) => {
    const itemsRef = useRef<HTMLDivElement>(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!itemsRef.current) return;
        setIsDown(true);
        itemsRef.current.classList.add(s.active);
        const x = e.pageX - itemsRef.current.offsetLeft;
        setStartX(x);
        setScrollLeft(itemsRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        if (!itemsRef.current) return;
        setIsDown(false);
        itemsRef.current.classList.remove(s.active);
    };

    const handleMouseUp = () => {
        if (!itemsRef.current) return;
        setIsDown(false);
        itemsRef.current.classList.remove(s.active);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDown || !itemsRef.current) return;
        e.preventDefault();
        const x = e.pageX - itemsRef.current.offsetLeft;
        const walk = (x - startX) * 2; // scroll-fast
        itemsRef.current.scrollLeft = scrollLeft - walk;
    };

    const moveSlider = (direction: 'prev' | 'next') => {
        if (!itemsRef.current) return;
        // Calculate how much to scroll. Let's scroll by about 80% of the container width.
        const scrollAmount = itemsRef.current.clientWidth * 0.8;
        
        if (direction === 'next') {
            itemsRef.current.scrollLeft += scrollAmount;
        } else {
            itemsRef.current.scrollLeft -= scrollAmount;
        }
    };

    return (
        <div className={s.wrapper}>
            <div 
                className={s.items} 
                ref={itemsRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {children}
            </div>
            <button className={`${s.navButton} ${s.btnPrev}`} onClick={() => moveSlider('prev')}>‹</button>
            <button className={`${s.navButton} ${s.btnNext}`} onClick={() => moveSlider('next')}>›</button>
        </div>
    );
};
