import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
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
          Projects List App
        </Typography>
        { token
          ?
            <Button onClick={logOut} variant="contained" color="error">Logout</Button>
          :
            <>
              <Button to={ ROUTES.SIGNIN } component={Link} variant="outlined" color="white" sx={{ mr: 3 }} >Sign In</Button>
              <Button to={ ROUTES.SIGNUP } component={Link} variant="contained" color="secondary">Sign Up</Button>
            </>
        }
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
