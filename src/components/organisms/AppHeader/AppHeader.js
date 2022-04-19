import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button} from '@mui/material';
import {ROUTES} from 'constants/routes';
import {getToken, removeToken} from 'utils/auth/cookies';

const AppHeader = () => {
  const token = getToken();
  const navigate = useNavigate();
  const logOut = () => {
    removeToken();
    navigate(ROUTES.SIGNIN);
  }

  return (
    <AppBar position='relative'>
      <Toolbar>
        <Typography variant='h6' color='inherit' component='h1' noWrap sx={{flexGrow: 1}}>
          Projects List App
        </Typography>
        {token
          ?
          <Button onClick={logOut} data-testid='log-out' variant='contained' color='error'>Logout</Button>
          :
          <>
            <Button to={ROUTES.SIGNIN} component={Link} data-testid='sign-in' variant='outlined' color='white' sx={{mr: 3}}>Sign In</Button>
            <Button to={ROUTES.SIGNUP} component={Link} data-testid='sign-up' variant='contained' color='secondary'>Sign Up</Button>
          </>
        }
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
