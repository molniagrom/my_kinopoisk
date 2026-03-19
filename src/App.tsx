import { useEffect } from 'react';

import './App.css';
import { Routing } from './common/routing/Routing.tsx';
import Header from './common/components/header/Header.tsx';
import { Footer } from './common/components/Footer/Footer.tsx';
import { useAppDispatch, useAppSelector } from './common/hooks/useAppHooks.ts';
import { selectAuthAccountId, selectAuthSessionId, selectThemeMode } from './features/selectors.ts';
import { useGetAccountQuery } from './features/api/authApi.ts';
import { setAccountId } from './features/auth/authSlice.ts';
import { THEME_STORAGE_KEY } from './common/constants';

function App() {
  const themeMode = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();
  const sessionId = useAppSelector(selectAuthSessionId);
  const accountId = useAppSelector(selectAuthAccountId);
  const { data: accountData } = useGetAccountQuery(
    { sessionId: sessionId ?? '' },
    {
      skip: !sessionId,
    }
  );

  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
  }, [themeMode]);

  useEffect(() => {
    if (accountData?.id && accountId !== accountData.id) {
      dispatch(setAccountId(accountData.id));
    }
  }, [accountData, accountId, dispatch]);

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
