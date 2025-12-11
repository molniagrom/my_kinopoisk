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
import s from './Header.module.css';

const navLinks = [
    { label: 'Main', path: Path.Main },
    { label: 'Category Movies', path: Path.CategoryMovies },
    { label: 'Filtered Movies', path: Path.FilteredMovies },
    { label: 'Search', path: Path.Search },
    { label: 'Favorites', path: Path.Favorites },
];

export const Header = () => {
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
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    />
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <AddCircleIcon sx={{ fontSize: 40 }} />
                    <MyAvatar src="https://i.pravatar.cc/150?img=3" alt="User Avatar" size={40} />
                    <Button color="success" variant="contained">log out</Button>
                    <SearchIcon sx={{ fontSize: 30, cursor: 'pointer' }} />
                    <NotificationsIcon sx={{ fontSize: 30, cursor: 'pointer' }} />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

// add routing-header in project

export default Header;