import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { getToken, removeToken } from 'utils/auth/cookies';

const AppHeader = () => {
  const token = getToken();
  const navigate = useNavigate();
  const logOut = () => {
    removeToken();
    navigate(ROUTES.SIGNIN);
  }

  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" color="inherit" component="h1" noWrap sx={{ flexGrow: 1 }}>
          <Link to={ROUTES.HOME} title={'HOME'} style={{color: '#fff'}}>TODO List App</Link>
        </Typography>

        { token
          ?
            <Button onClick={logOut} variant="contained">Logout</Button>
          :
            <>
              <Button to={ROUTES.SIGNIN} component={Link} variant="contained" style={{color: '#fff'}} sx={{ mr: 3 }} >Sign In</Button>
              <Button to={ROUTES.SIGNUP} component={Link} variant="contained">Sign Up</Button>
            </>
        }
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
