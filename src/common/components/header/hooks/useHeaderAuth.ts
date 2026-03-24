import { useAppDispatch, useAppSelector } from '@/common/hooks/useAppHooks.ts';
import { selectAuthSessionId, selectIsAuthorized, selectThemeMode } from '@/features/selectors.ts';
import { useCreateRequestTokenMutation, useGetAccountQuery } from '@/features/api/authApi.ts';
import { clearSession } from '@/features/auth/authSlice.ts';
import { setAppError } from '@/app/appSlice.ts';
import { Path } from '@/common/routing/paths.ts';
import defaultAvatar from '../../../../assets/avatardefault_92824.webp';

export const useHeaderAuth = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectThemeMode);
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const sessionId = useAppSelector(selectAuthSessionId);
  const isDarkTheme = themeMode === 'dark';
  const [createRequestToken] = useCreateRequestTokenMutation();
  const { data: accountData } = useGetAccountQuery(
    { sessionId: sessionId ?? '' },
    {
      skip: !sessionId,
    }
  );

  const avatarSrc = !isAuthorized
    ? defaultAvatar
    : accountData?.avatar?.tmdb?.avatar_path
      ? `https://image.tmdb.org/t/p/w200${accountData.avatar.tmdb.avatar_path}`
      : accountData?.avatar?.gravatar?.hash
        ? `https://www.gravatar.com/avatar/${accountData.avatar.gravatar.hash}`
        : defaultAvatar;

  const handleAuthClick = async () => {
    if (isAuthorized) {
      dispatch(clearSession());
      return;
    }

    try {
      const result = await createRequestToken().unwrap();
      const redirectTo = `${window.location.origin}${Path.AuthCallback}`;
      const authUrl = `https://www.themoviedb.org/authenticate/${result.request_token}?redirect_to=${encodeURIComponent(redirectTo)}`;
      window.location.href = authUrl;
    } catch {
      dispatch(setAppError('Не удалось начать авторизацию. Попробуйте снова.'));
    }
  };

  return {
    avatarSrc,
    isAuthorized,
    isDarkTheme,
    handleAuthClick,
  };
};

export default useHeaderAuth;
