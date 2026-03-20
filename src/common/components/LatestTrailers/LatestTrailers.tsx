import { useMemo, useRef, useState } from 'react';

const tabs = ['Popular', 'Streaming', 'On TV', 'For Rent', 'In Theaters'];

type TrailerItem = {
  id: string;
  title: string;
  meta: string;
  badge?: string;
  imageUrl: string;
};

const trailersByTab: Record<string, TrailerItem[]> = {
  Popular: [
    {
      id: 'popular-1',
      title: 'Echoes of Tomorrow',
      meta: 'Official Trailer • 2:12',
      badge: 'New',
      imageUrl: 'https://image.tmdb.org/t/p/w780/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg',
    },
    {
      id: 'popular-2',
      title: 'Orion Drift',
      meta: 'Teaser • 1:04',
      imageUrl: 'https://image.tmdb.org/t/p/w780/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg',
    },
    {
      id: 'popular-3',
      title: 'Velvet Horizon',
      meta: 'Official Trailer • 2:28',
      badge: 'Exclusive',
      imageUrl: 'https://image.tmdb.org/t/p/w780/7VsJyT4f6bNIW6s0sVQeJ9sK3J0.jpg',
    },
  ],
  Streaming: [
    {
      id: 'stream-1',
      title: 'Signal in the Mist',
      meta: 'Season 2 Episode Trailer • 2:14',
      badge: 'Streaming',
      imageUrl: 'https://image.tmdb.org/t/p/w780/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg',
    },
    {
      id: 'stream-2',
      title: 'Neon Fragments',
      meta: 'First Look • 1:36',
      imageUrl: 'https://image.tmdb.org/t/p/w780/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg',
    },
    {
      id: 'stream-3',
      title: 'Dustline',
      meta: 'Official Trailer • 2:03',
      imageUrl: 'https://image.tmdb.org/t/p/w780/2u7zbn8EudG6kLlBzUYqP8RyFU4.jpg',
    },
  ],
  'On TV': [
    {
      id: 'tv-1',
      title: 'Black Harbor',
      meta: 'Season Finale • 1:48',
      badge: 'On TV',
      imageUrl: 'https://image.tmdb.org/t/p/w780/1e1t6E6D9kJ4V0B2pJmohzF4VYH.jpg',
    },
    {
      id: 'tv-2',
      title: 'Crossfade',
      meta: 'Episode Trailer • 2:05',
      imageUrl: 'https://image.tmdb.org/t/p/w780/6cZbexuXUZJ6yZ7F9QDDpR4wV0G.jpg',
    },
    {
      id: 'tv-3',
      title: 'Winterline',
      meta: 'Sneak Peek • 1:27',
      imageUrl: 'https://image.tmdb.org/t/p/w780/5IGQG8Pah7qgqjJ5pB2kH4a8ZB1.jpg',
    },
  ],
  'For Rent': [
    {
      id: 'rent-1',
      title: 'Orbitfall',
      meta: 'In Theaters March 2026',
      badge: 'For Rent',
      imageUrl: 'https://image.tmdb.org/t/p/w780/2a7p5XQW2PZQm3B3s9pWJ8d1CF8.jpg',
    },
    {
      id: 'rent-2',
      title: 'Night Circuit',
      meta: 'Official Trailer • 2:22',
      imageUrl: 'https://image.tmdb.org/t/p/w780/9SSEUrSqhljBMzRe4aBTh17rUaC.jpg',
    },
    {
      id: 'rent-3',
      title: 'Violet Run',
      meta: 'Teaser • 1:11',
      imageUrl: 'https://image.tmdb.org/t/p/w780/6iw6MifT2MUM9JZg2w7V7XJAzX5.jpg',
    },
  ],
  'In Theaters': [
    {
      id: 'theaters-1',
      title: 'Nova Strike',
      meta: 'In Theaters April 2026',
      badge: 'In Theaters',
      imageUrl: 'https://image.tmdb.org/t/p/w780/8Gxv8gSFCU0XGDykEG4WbS2F6yG.jpg',
    },
    {
      id: 'theaters-2',
      title: 'Glass City',
      meta: 'Official Trailer • 2:19',
      imageUrl: 'https://image.tmdb.org/t/p/w780/4o5Y4vVdK3J4kG3q5S8M7pYTBv5.jpg',
    },
    {
      id: 'theaters-3',
      title: 'Pulse Divide',
      meta: 'Teaser • 0:58',
      imageUrl: 'https://image.tmdb.org/t/p/w780/7Yuf6kQ8cb5qgD7HkqQnJ8k3tW7.jpg',
    },
  ],
};

export const LatestTrailers = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const listRef = useRef<HTMLDivElement | null>(null);

  const trailers = useMemo(() => trailersByTab[activeTab] ?? [], [activeTab]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!listRef.current) return;
    const offset = direction === 'left' ? -520 : 520;
    listRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section className="relative bg-[var(--paper-bg)]">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20 lg:px-12">
        <h2
          className="mb-7 text-left text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold uppercase tracking-[0.04em] text-[var(--metal-silver-bright)]"
          style={{ fontFamily: "Geist Variable, 'Segoe UI', Tahoma, Verdana, sans-serif" }}
        >
          Latest Trailers
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-2 md:gap-6 md:pb-0">
          {tabs.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium uppercase tracking-wide transition-all md:text-base ${
                  isActive
                    ? 'border-transparent bg-gradient-to-r from-[var(--decepticon-purple)] to-[var(--decepticon-purple-bright)] text-white shadow-[var(--cta-shadow)]'
                    : 'border-[var(--surface-border)] bg-[var(--surface-3)] text-[var(--text-muted)] hover:scale-105 hover:border-[var(--decepticon-purple-bright)]'
                }`}
                style={{ fontFamily: "Geist Variable, 'Segoe UI', Tahoma, Verdana, sans-serif" }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="group relative mt-8 md:mt-10">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => handleScroll('left')}
            className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--surface-2)] text-[var(--icon-color)] shadow-md opacity-0 transition-opacity group-hover:opacity-100 md:flex"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => handleScroll('right')}
            className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--surface-2)] text-[var(--icon-color)] shadow-md opacity-0 transition-opacity group-hover:opacity-100 md:flex"
          >
            ›
          </button>

          <div
            ref={listRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 scrollbar-thin md:gap-6"
          >
            {trailers.map((item) => (
              <article
                key={item.id}
                className="min-w-[85vw] flex-shrink-0 snap-start overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--surface-border)] bg-[var(--surface-1)] shadow-[var(--surface-shadow-soft)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[var(--surface-shadow)] sm:min-w-[480px] md:min-w-[520px]"
              >
                <div className="relative h-[200px] bg-[var(--metal-black)] sm:h-[220px] md:h-[240px]">
                  <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full border-[3px] border-white/30 bg-gradient-to-br from-[var(--decepticon-purple)] to-[var(--decepticon-purple-bright)] shadow-[var(--cta-shadow)] backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 md:h-[96px] md:w-[96px]">
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-10 w-10 text-white md:h-12 md:w-12"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 px-6 py-5">
                  {item.badge ? (
                    <span className="w-fit rounded-full bg-[var(--chip-bg)] px-3 py-1 text-xs uppercase text-[var(--decepticon-purple-bright)]">
                      {item.badge}
                    </span>
                  ) : null}
                  <h3
                    className="text-[1.15rem] font-bold text-[var(--text-main)] md:text-[1.3rem]"
                    style={{ fontFamily: "Geist Variable, 'Segoe UI', Tahoma, Verdana, sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] md:text-base">{item.meta}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestTrailers;
