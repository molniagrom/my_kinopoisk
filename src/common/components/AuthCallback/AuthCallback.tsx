import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import s from './AuthCallback.module.css';
import { useCreateSessionMutation } from '@/features/api/authApi.ts';
import { useAppDispatch } from '@/common/hooks/useAppHooks.ts';
import { setSessionId } from '@/features/auth/authSlice.ts';
import { Path } from '@/common/routing/paths.ts';

export const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [createSession] = useCreateSessionMutation();
  const [message, setMessage] = useState(() => {
    const requestToken = searchParams.get('request_token');
    const approved = searchParams.get('approved');

    if (!requestToken || approved !== 'true') {
      return 'Авторизация не подтверждена. Попробуйте снова.';
    }

    return 'Завершаем авторизацию...';
  });

  useEffect(() => {
    const requestToken = searchParams.get('request_token');
    const approved = searchParams.get('approved');

    if (!requestToken || approved !== 'true') {
      return;
    }

    const finalizeAuth = async () => {
      try {
        const result = await createSession({ requestToken }).unwrap();
        dispatch(setSessionId(result.session_id));
        navigate(Path.Favorites, { replace: true });
      } catch {
        setMessage('Не удалось создать сессию. Попробуйте снова.');
      }
    };

    finalizeAuth();
  }, [createSession, dispatch, navigate, searchParams]);

  return (
    <section className={s.page}>
      <h1 className={s.title}>TMDB Авторизация</h1>
      <p className={s.subtitle}>{message}</p>
    </section>
  );
};

export default AuthCallback;
