import { useEffect } from 'react';

import './App.css';
import { Routing } from './common/routing/Routing.tsx';
import Header from './common/components/header/Header.tsx';
import { Footer } from './common/components/Footer/Footer.tsx';
import { useAppDispatch, useAppSelector } from './common/hooks/useAppHooks.ts';
import { selectAppError, selectAuthAccountId, selectAuthSessionId, selectThemeMode } from './features/selectors.ts';
import { useGetAccountQuery } from './features/api/authApi.ts';
import { setAccountId } from './features/auth/authSlice.ts';
import { THEME_STORAGE_KEY } from './common/constants';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { clearAppError } from './app/appSlice.ts';

function App() {
  const themeMode = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();
  const sessionId = useAppSelector(selectAuthSessionId);
  const accountId = useAppSelector(selectAuthAccountId);
  const appError = useAppSelector(selectAppError);
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

  const handleCloseError = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(clearAppError());
  };

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
      <Snackbar open={Boolean(appError)} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert
          onClose={handleCloseError}
          severity="error"
          variant="filled"
          sx={{ backgroundColor: '#c8102e', color: '#fff' }}
        >
          {appError}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
