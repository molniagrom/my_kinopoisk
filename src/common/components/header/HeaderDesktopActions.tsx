import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import LightModeIcon from '@mui/icons-material/LightMode';

import MyAvatar from '../MyAvatar/MyAvatar';
import s from './header.module.css';

type HeaderDesktopActionsProps = {
  avatarSrc: string;
  isAuthorized: boolean;
  isDarkTheme: boolean;
  onAuthClick: () => void;
  onOpenSearch: () => void;
  onToggleTheme: () => void;
};

export const HeaderDesktopActions = ({
  avatarSrc,
  isAuthorized,
  isDarkTheme,
  onAuthClick,
  onOpenSearch,
  onToggleTheme,
}: HeaderDesktopActionsProps) => {
  return (
    <Box className={s.rightArea}>
      <Box className={s.actions}>
        <MyAvatar src={avatarSrc} alt="User Avatar" size={40} />
        <Button className={s.logoutButton} variant="contained" onClick={onAuthClick}>
          {isAuthorized ? 'log out' : 'log in'}
        </Button>
        <SearchIcon className={s.menuIcon} onClick={onOpenSearch} />
        <NotificationsIcon className={s.menuIcon} />
        <IconButton color="inherit" aria-label="toggle theme" onClick={onToggleTheme} size="large">
          {isDarkTheme ? <LightModeIcon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default HeaderDesktopActions;
