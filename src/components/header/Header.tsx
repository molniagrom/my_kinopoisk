import { Link } from "react-router-dom";
import { Path } from '../../common/routing/Routing';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
// import { ReactComponent as MySvgIcon } from '../../assets/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg';

export const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                {/* <MySvgIcon /> */}
                <Button color="inherit" component={Link} to={Path.Main} sx={{ '&:hover': { color: '#e0e0e0' } }}>Main</Button>
                <Button color="inherit" component={Link} to={Path.CategoryMovies} sx={{ '&:hover': { color: '#e0e0e0' } }}>Category Movies</Button>
                <Button color="inherit" component={Link} to={Path.FilteredMovies} sx={{ '&:hover': { color: '#e0e0e0' } }}>Filtered Movies</Button>
                <Button color="inherit" component={Link} to={Path.Search} sx={{ '&:hover': { color: '#e0e0e0' } }}>Search</Button>
                <Button color="inherit" component={Link} to={Path.Favorites} sx={{ '&:hover': { color: '#e0e0e0' } }}>Favorites</Button>
            </Toolbar>
        </AppBar>
    );
};

// add routing-header in project

export default Header;