import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { ROUTES } from 'constants/routes';
import { Edit, ArrowBack } from "@mui/icons-material";

const AppProjectHeader = ({ project, edit = false }) => {
  const { id, title } = project;
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" color="inherit" component="h1" noWrap sx={{ flexGrow: 1 }}>
          <Button component={Link} to={ edit ? `/project/${id}` : ROUTES.HOME } style={{ color: '#fff', fontSize: 20, textTransform: 'none' }}>
            <ArrowBack fontSize="medium" sx={{ mr: 2 }} /> { edit ? `Back to project - "${title}"` : 'Projects List App' }
          </Button>
        </Typography>

        {!edit && <IconButton component={Link} to={`/project/${id}/edit`} style={{ color: '#fff' }}><Edit fontSize="large" /></IconButton>}
      </Toolbar>
    </AppBar>
  );
}

export default AppProjectHeader;
