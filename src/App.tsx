import { useEffect } from 'react';

import './App.css';
import { Routing } from './common/routing/Routing.tsx';
import Header from './common/components/header/Header.tsx';
import { Footer } from './common/components/Footer/Footer.tsx';
import { useAppSelector } from './app/hooks.ts';

function App() {
  const themeMode = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [themeMode]);

  return (
    <div className="app">
      <Header />
      <main className="appMain">
        <Routing />
      </main>
      <Footer />
    </div>
  );
}

export default App;
