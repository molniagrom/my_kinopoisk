import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

import s from './header.module.css';

type HeaderDesktopNavProps = {
  logoSrc: string;
  navLinks: Array<{ label: string; path: string }>;
};

export const HeaderDesktopNav = ({ logoSrc, navLinks }: HeaderDesktopNavProps) => {
  return (
    <Box className={s.leftArea}>
      <Box component="img" src={logoSrc} alt="TMDB Logo" className={s.logo} />
      <Box className={s.desktopNav}>
        {navLinks.map((link) => (
          <Button key={link.path} color="inherit" className={s.navButton} component={Link} to={link.path}>
            {link.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default HeaderDesktopNav;
