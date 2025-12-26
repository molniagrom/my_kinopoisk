import { Link } from "react-router-dom";
import { Path } from '../../common/routing/Routing';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import tmdbLogo from '../../assets/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MyAvatar from '../MyAvatar/MyAvatar';
import s from './header.module.css';
import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const navLinks = [
    { label: 'Main', path: Path.Main },
    { label: 'Category Movies', path: Path.CategoryMovies },
    { label: 'Filtered Movies', path: Path.FilteredMovies },
    { label: 'Search', path: Path.Search },
    { label: 'Favorites', path: Path.Favorites },
];

export const Header = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar className={s.header} position="static">
            <Toolbar className={s.toolbar}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        component="img"
                        src={tmdbLogo}
                        alt="TMDB Logo"
                        sx={{
                            height: 40,
                            mr: 3,
                        }}
                    />
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                        {navLinks.map((link) => (
                            <Button
                                key={link.path}
                                color="inherit"
                                component={Link}
                                to={link.path}
                                sx={{
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        color: '#c8e6c9',
                                        transform: 'scale(1.05)'
                                    }
                                }}
                            >
                                {link.label}
                            </Button>
                        ))}
                    </Box>
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
                    <AddCircleIcon sx={{ fontSize: 40 }} />
                    <MyAvatar src="https://i.pravatar.cc/150?img=3" alt="User Avatar" size={40} />
                    <Button color="success" variant="contained">log out</Button>
                    <SearchIcon sx={{ fontSize: 30, cursor: 'pointer' }} />
                    <NotificationsIcon sx={{ fontSize: 30, cursor: 'pointer' }} />
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenu}
                    >
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
                        sx={{ mt: '40px' }}
                    >
                        {navLinks.map((link) => (
                            <MenuItem key={link.path} onClick={handleClose} component={Link} to={link.path}>
                                {link.label}
                            </MenuItem>
                        ))}
                        <MenuItem onClick={handleClose}>
                            <AddCircleIcon sx={{ mr: 1 }} /> Add
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <SearchIcon sx={{ mr: 1 }} /> Search
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <NotificationsIcon sx={{ mr: 1 }} /> Notifications
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <MyAvatar src="https://i.pravatar.cc/150?img=3" alt="User Avatar" size={24} />
                            <span style={{ marginLeft: '8px' }}>Profile</span>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Button color="success" variant="contained" size="small" fullWidth>log out</Button>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;