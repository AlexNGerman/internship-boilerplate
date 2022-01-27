import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const AppHeader = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          component="h1"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          <Link to="/" title={'HOME'} style={{color: '#fff'}}>{'TODO List App'}</Link>
        </Typography>

        <Button to='/sign-in' component={Link} variant="contained" style={{color: '#fff'}} sx={{ mr: 3 }} >Sign In</Button>
        <Button to='/sign-up' component={Link} variant="contained">Sign Up</Button>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
