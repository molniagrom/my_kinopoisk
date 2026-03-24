import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Link } from 'react-router-dom';

import MyAvatar from '../MyAvatar/MyAvatar';
import s from './header.module.css';

type HeaderMobileMenuProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  navLinks: Array<{ label: string; path: string }>;
  avatarSrc: string;
  isAuthorized: boolean;
  isDarkTheme: boolean;
  onOpenMenu: (event: React.MouseEvent<HTMLElement>) => void;
  onCloseMenu: () => void;
  onOpenSearch: () => void;
  onToggleTheme: () => void;
  onAuthClick: () => void;
};

export const HeaderMobileMenu = ({
  anchorEl,
  open,
  navLinks,
  avatarSrc,
  isAuthorized,
  isDarkTheme,
  onOpenMenu,
  onCloseMenu,
  onOpenSearch,
  onToggleTheme,
  onAuthClick,
}: HeaderMobileMenuProps) => {
  return (
    <Box className={s.mobileArea}>
      <IconButton size="large" edge="end" color="inherit" aria-label="menu" onClick={onOpenMenu}>
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
        onClose={onCloseMenu}
        className={s.menuOffset}
      >
        {navLinks.map((link) => (
          <MenuItem key={link.path} onClick={onCloseMenu} component={Link} to={link.path}>
            {link.label}
          </MenuItem>
        ))}

        <MenuItem
          onClick={() => {
            onCloseMenu();
            onOpenSearch();
          }}
        >
          <SearchIcon className={s.menuItemIcon} /> Search
        </MenuItem>
        <MenuItem onClick={onCloseMenu}>
          <NotificationsIcon className={s.menuItemIcon} /> Notifications
        </MenuItem>
        <MenuItem onClick={onCloseMenu}>
          <MyAvatar src={avatarSrc} alt="User Avatar" size={24} />
          <span className={s.menuItemText}>Profile</span>
        </MenuItem>
        <MenuItem
          onClick={() => {
            onToggleTheme();
            onCloseMenu();
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
            onCloseMenu();
            onAuthClick();
          }}
        >
          <Button className={s.logoutButton} variant="contained" size="small" fullWidth>
            {isAuthorized ? 'log out' : 'log in'}
          </Button>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default HeaderMobileMenu;
