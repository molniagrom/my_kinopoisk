import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import tmdbLogo
  from '../../../assets/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MyAvatar from '../MyAvatar/MyAvatar';
import s from './header.module.css';
import {useState} from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Path} from '../../routing/paths.ts';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import LightModeIcon from '@mui/icons-material/LightMode';
import defaultAvatar from '../../../assets/avatardefault_92824.webp';
import {useAppDispatch, useAppSelector} from '@/common/hooks/useAppHooks.ts';
import {selectAuthSessionId, selectIsAuthorized, selectThemeMode} from '@/features/selectors.ts';
import {toggleTheme} from '@/features/theme/themeSlice';
import {useCreateRequestTokenMutation, useGetAccountQuery} from '@/features/api/authApi.ts';
import {clearSession} from '@/features/auth/authSlice.ts';
import {setAppError} from '@/app/appSlice.ts';
import SearchForm from '../SearchForm/SearchForm.tsx';
import { useFetchSearcheMoviesByTitleQuery } from '@/features/films/moviesApi.ts';
import CloseIcon from '@mui/icons-material/Close';

const navLinks = [
  { label: 'Main', path: Path.Main },
  { label: 'Category', path: Path.CategoryMovies },
  { label: 'Filtered', path: Path.FilteredMovies },
  { label: 'Search', path: Path.Search },
  { label: 'Favorites', path: Path.Favorites },
];

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectThemeMode);
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const sessionId = useAppSelector(selectAuthSessionId);
  const isDarkTheme = themeMode === 'dark';
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [searchValue, setSearchValue] = useState('');
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

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const { data: suggestionsData } = useFetchSearcheMoviesByTitleQuery(
    { query: searchValue },
    { skip: !isSearchOpen || searchValue.trim() === '' }
  );

  const suggestions = suggestionsData?.results.map((movie) => movie.original_title) ?? [];

  const handleSearchSubmit = () => {
    const trimmed = searchValue.trim();
    if (!trimmed) {
      navigate(Path.Search);
      return;
    }
    navigate(`${Path.Search}?query=${encodeURIComponent(trimmed)}`);
  };

  const handleSearchClear = () => {
    setSearchValue('');
    navigate(Path.Search);
  };

  return (
    <AppBar className={s.header} position="static">
      {isSearchOpen ? (
        <Toolbar className={s.toolbar}>
          <Box className={s.leftArea}>
            <Box component="img" src={tmdbLogo} alt="TMDB Logo" className={s.logo} />
            <Box className={s.desktopNav}>
              {navLinks.map((link) => (
                <Button key={link.path} color="inherit" className={s.navButton} component={Link} to={link.path}>
                  {link.label}
                </Button>
              ))}
            </Box>
          </Box>
          <Box className={s.rightArea}>
            <Box className={s.actions}>
              <MyAvatar src={avatarSrc} alt="User Avatar" size={40} />
              <Button className={s.logoutButton} variant="contained" onClick={handleAuthClick}>
                {isAuthorized ? 'log out' : 'log in'}
              </Button>
              <SearchIcon className={s.menuIcon} onClick={() => setIsSearchOpen(false)} />
              <NotificationsIcon className={s.menuIcon} />
              <IconButton
                color="inherit"
                aria-label="toggle theme"
                onClick={() => dispatch(toggleTheme())}
                size="large"
              >
                {isDarkTheme ? <LightModeIcon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          </Box>
          <Box className={s.mobileArea}>
            <IconButton size="large" edge="end" color="inherit" aria-label="menu" onClick={handleMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
              className={s.menuOffset}
            >
              {navLinks.map((link) => (
                <MenuItem key={link.path} onClick={handleClose} component={Link} to={link.path}>
                  {link.label}
                </MenuItem>
              ))}

              <MenuItem
                onClick={() => {
                  handleClose();
                  setIsSearchOpen(false);
                }}
              >
                <SearchIcon className={s.menuItemIcon} /> Search
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <NotificationsIcon className={s.menuItemIcon} /> Notifications
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <MyAvatar src={avatarSrc} alt="User Avatar" size={24} />
                <span className={s.menuItemText}>Profile</span>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(toggleTheme());
                  handleClose();
                }}
              >
                {isDarkTheme ? (
                  <LightModeIcon className={s.menuItemIcon} />
                ) : (
                  <Brightness4Icon className={s.menuItemIcon} />
                )}
                <span className={s.menuItemText}>Toggle theme</span>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleAuthClick();
                }}
              >
                <Button className={s.logoutButton} variant="contained" size="small" fullWidth>
                  {isAuthorized ? 'log out' : 'log in'}
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      ) : (
        <Box className={s.searchRowOpen}>
          <Box className={s.searchDebugLabel}>SEARCH OPEN</Box>
          <div className={s.searchFormWrap}>
            <SearchForm
              value={searchValue}
              onChange={setSearchValue}
              onSubmit={handleSearchSubmit}
              onClear={handleSearchClear}
              placeholder="Search movies..."
              buttonLabel="Go"
              suggestions={suggestions}
            />
          </div>
          <IconButton aria-label="close search" onClick={() => setIsSearchOpen(true)} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      )}
    </AppBar>
  );
};

export default Header;
