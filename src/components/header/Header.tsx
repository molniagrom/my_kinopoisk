import { Link } from "react-router-dom";
import { Path } from '../../common/routing/Routing';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

export const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" component={Link} to={Path.Main}>Main</Button>
                <Button color="inherit" component={Link} to={Path.CategoryMovies}>Category Movies</Button>
                <Button color="inherit" component={Link} to={Path.FilteredMovies}>Filtered Movies</Button>
                <Button color="inherit" component={Link} to={Path.Search}>Search</Button>
                <Button color="inherit" component={Link} to={Path.Favorites}>Favorites</Button>
            </Toolbar>
        </AppBar>
    );
};

// add routing-header in project

export default Header;