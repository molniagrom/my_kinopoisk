import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import s from './header.module.css';
import tmdbLogo from '../../../assets/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg';
import { navLinks } from './header.constants.ts';
import { useHeaderAuth } from './hooks/useHeaderAuth.ts';
import { useHeaderSearch } from './hooks/useHeaderSearch.ts';
import { useAppDispatch } from '@/common/hooks/useAppHooks.ts';
import { toggleTheme } from '@/features/theme/themeSlice';
import HeaderDesktopNav from './HeaderDesktopNav.tsx';
import HeaderDesktopActions from './HeaderDesktopActions.tsx';
import HeaderMobileMenu from './HeaderMobileMenu.tsx';
import HeaderSearchBar from './HeaderSearchBar.tsx';

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();

  const { avatarSrc, isAuthorized, isDarkTheme, handleAuthClick } = useHeaderAuth();
  const {
    isSearchOpen,
    searchValue,
    setSearchValue,
    suggestions,
    openSearch,
    closeSearch,
    handleSearchSubmit,
    handleSearchClear,
  } = useHeaderSearch();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar className={s.header} position="static">
      {isSearchOpen ? (
        <Toolbar className={s.toolbar}>
          <HeaderDesktopNav logoSrc={tmdbLogo} navLinks={navLinks} />
          <HeaderDesktopActions
            avatarSrc={avatarSrc}
            isAuthorized={isAuthorized}
            isDarkTheme={isDarkTheme}
            onAuthClick={handleAuthClick}
            onOpenSearch={openSearch}
            onToggleTheme={() => dispatch(toggleTheme())}
          />
          <HeaderMobileMenu
            anchorEl={anchorEl}
            open={open}
            navLinks={navLinks}
            avatarSrc={avatarSrc}
            isAuthorized={isAuthorized}
            isDarkTheme={isDarkTheme}
            onOpenMenu={handleMenuOpen}
            onCloseMenu={handleMenuClose}
            onOpenSearch={openSearch}
            onToggleTheme={() => dispatch(toggleTheme())}
            onAuthClick={handleAuthClick}
          />
        </Toolbar>
      ) : (
        <HeaderSearchBar
          value={searchValue}
          suggestions={suggestions}
          onChange={setSearchValue}
          onSubmit={handleSearchSubmit}
          onClear={handleSearchClear}
          onClose={closeSearch}
        />
      )}
    </AppBar>
  );
};

export default Header;
